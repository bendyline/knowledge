---
title: Deploy and Connect to SQL Server Linux Containers
description: Explore how SQL Server can be deployed on Linux containers and learn about various tools to connect to SQL Server from inside and outside the container
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: install-set-up-deploy
ms.custom:
  - intro-deployment
  - linux-related-content
  - sfi-ropc-blocked
  - ignite-2025
zone_pivot_groups: cs1-command-shell
monikerRange: ">=sql-server-linux-2017 || >=sql-server-2017"
---
# Deploy and connect to SQL Server Linux containers


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article explains how to deploy and connect to SQL Server Linux containers.

> **Note:**  
>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


For other deployment scenarios, see:

- [Windows](../../database-engine/install-windows/install-sql-server.md)
- [Linux](../install-upgrade/setup.md)
- [Container cluster on Azure or Red Hat OpenShift](../install-upgrade/quickstart-containers-azure.md)

This article specifically focuses on using the `mcr.microsoft.com/mssql/server` image. SQL Server deployments in Windows containers aren't covered by support. For development and testing, you can create your own custom container images to work with SQL Server in Windows containers. Sample files are available on [GitHub](https://github.com/microsoft/mssql-docker/blob/master/windows/mssql-server-windows-developer/dockerfile_1). Sample files are for reference only.

> **Important:**  
> Before choosing to run a SQL Server container for production use cases, review the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/database-engine/install/windows/support-policy-sql-server) to ensure that you're running on a supported configuration.

This 6-minute video provides an introduction into running SQL Server on containers:

> [!VIDEO https://channel9.msdn.com/Shows/Data-Exposed/SQL-Server-2019-in-Containers/player?WT.mc_id=dataexposed-c9-niner]

## Pull and run the container image

To pull and run the Docker container images for  SQL Server 
, follow the prerequisites and steps in the following quickstart:

- [SQL Server 2025](../install-upgrade/quickstart-install-docker.md?view=sql-server-ver17&preserve-view=true)
- [SQL Server 2022](../install-upgrade/quickstart-install-docker.md?view=sql-server-ver16&preserve-view=true)
- [SQL Server 2019](../install-upgrade/quickstart-install-docker.md?view=sql-server-ver15&preserve-view=true)
- [SQL Server 2017](../install-upgrade/quickstart-install-docker.md?view=sql-server-2017&preserve-view=true)

This configuration article provides additional usage scenarios in the following sections.

## Connect and query

You can connect and query SQL Server in a container from either outside the container or from within the container. The following sections explain both scenarios.

### Tools outside the container

You can connect to an instance of  SQL Server 
 using any familiar  SQL Server 
 client tool, such as **[sqlcmd](../../tools/sqlcmd/sqlcmd-utility.md)**, [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/), or the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md).

The following example uses **`sqlcmd`** to connect to SQL Server running in a container. The IP address in the connection string is the IP address of the host machine that is running the container.

> **Note:**  
> Newer versions of **`sqlcmd`** (in **mssql-tools18**) are secure by default. If using version 18 or higher, you need to add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

**Applies to: cs1-bash**


```bash
sqlcmd -S 10.3.2.4 -U sa -P '<password>'
```



**Applies to: cs1-powershell**


```powershell
sqlcmd -S 10.3.2.4 -U sa -P "<password>"
```



**Applies to: cs1-cmd**


```cmd
sqlcmd -S 10.3.2.4 -U sa -P "<password>"
```



If you mapped a host port that wasn't the default `1433`, add that port to the connection string. For example, if you specified `-p 1400:1433` in your `docker run` command, then connect by explicitly specifying port 1400.

**Applies to: cs1-bash**


```bash
sqlcmd -S 10.3.2.4,1400 -U sa -P '<password>'
```



**Applies to: cs1-powershell**


```powershell
sqlcmd -S 10.3.2.4,1400 -U sa -P "<password>"
```



**Applies to: cs1-cmd**


```cmd
sqlcmd -S 10.3.2.4,1400 -U sa -P "<password>"
```



### Tools inside the container

Starting with  SQL Server 2017 (14.x) 
, the [SQL Server command-line tools](../install-upgrade/setup-tools.md) are included in the container image. If you attach to the image with an interactive command prompt, you can run the tools locally.

1. Use the `docker exec -it` command to start an interactive Bash shell inside your running container. In the following example `e69e056c702d` is the container ID.

   ```bash
   docker exec -it e69e056c702d "bash"
   ```

   > **Tip:**  
   > You don't always have to specify the entire container ID. You only have to specify enough characters to uniquely identify it. So in this example, it might be enough to use `e6` or `e69` rather than the full ID. To find out the container ID, run the command `docker ps -a`.

1. Once inside the container, connect locally with **`sqlcmd`** by using its full path.

   ```bash
   /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P '<password>'
   ```

   > **Note:**  
   > Newer versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

1. When finished with **`sqlcmd`**, type `exit`.

1. When finished with the interactive command prompt, type `exit`. Your container continues to run after you exit the interactive Bash shell.

<a id="version"></a>

## Check the container version

If you want to know the version of SQL Server in a running container, run the following command to display it. Replace `<Container ID or name>` with the target container ID or name. Replace `<password>` with the SQL Server password for the system administrator (`sa`) account.

**Applies to: cs1-bash**


```bash
docker exec -it <Container ID or name> /opt/mssql-tools18/bin/sqlcmd \
-S localhost -U sa -P '<password>' \
-Q 'SELECT @@VERSION'
```

> **Note:**  
> Newer versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.



**Applies to: cs1-powershell**


```powershell
docker exec -it <Container ID or name> /opt/mssql-tools18/bin/sqlcmd `
-S localhost -U sa -P "<password>" `
-Q "SELECT @@VERSION"
```

> **Note:**  
> Newer versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.



**Applies to: cs1-cmd**


```cmd
docker exec -it <Container ID or name> /opt/mssql-tools18/bin/sqlcmd ^
-S localhost -U sa -P "<password>" ^
-Q "SELECT @@VERSION"
```

> **Note:**  
> Newer versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.



You can also identify the SQL Server version and build number for a target container image. The following command displays the SQL Server version and build information for the `mcr.microsoft.com/mssql/server:2022-latest` image. It does this by running a new container with an environment variable `PAL_PROGRAM_INFO=1`. The resulting container instantly exits, and the `docker rm` command removes it.

**Applies to: cs1-bash**


```bash
docker run -e PAL_PROGRAM_INFO=1 --name sqlver \
-ti mcr.microsoft.com/mssql/server:2022-latest && \
docker rm sqlver
```



**Applies to: cs1-powershell**


```powershell
docker run -e PAL_PROGRAM_INFO=1 --name sqlver `
-ti mcr.microsoft.com/mssql/server:2022-latest; `
docker rm sqlver
```



**Applies to: cs1-cmd**


```cmd
docker run -e PAL_PROGRAM_INFO=1 --name sqlver ^
-ti mcr.microsoft.com/mssql/server:2022-latest && ^
docker rm sqlver
```



The previous commands display version information similar to the following output:

```output
sqlservr
  Version 16.0.1000.6
  Build ID d81e9b6de06534e649bd57dd609aa3050f5e380f361b7f8a80a80eeb71e7422c
  Build Type release
  Git Version 2aede92f
  Built at Tue Nov 01 06:11:40 GMT 2022

PAL
  Build ID 754097e8f0db68f559e1cbc9d46952ac9fd518b5da9f12964ef40fc9033720e3
  Build Type release
  Git Version d88e3e1130
  Built at Tue Nov 01 06:08:02 GMT 2022

Packages
  system.security                         mssql-16.0.1000.6_26_official-release
  system.certificates                     mssql-16.0.1000.6_26_official-release
  sqlagent                                16.0.1000.6
  system.wmi                              10.0.17763.2061.202107231
  system.netfx                            4.7.0.0.202104262
  system                                  mssql-16.0.1000.6_26_official-release
  system.common                           10.0.17763.2061.202107231
  sqlservr                                16.0.1000.6
  secforwarderxplat                       16.0.1000.6
```

<a id="tags"></a>

## Run a specific SQL Server container image

> **Note:**  
>
> - Starting with  SQL Server 2019 (15.x) 
 CU3, Ubuntu 18.04 is supported.
> - Starting with  SQL Server 2019 (15.x) 
 CU10, Ubuntu 20.04 is supported.
> - You can retrieve a list of all available tags for mssql/server at <https://mcr.microsoft.com/v2/mssql/server/tags/list>.

There are scenarios where you might not want to use the latest SQL Server container image. To run a specific SQL Server container image, use the following steps:

1. Identify the Docker `tag` for the release you want to use. To view the available tags, see the [Microsoft Container Registry](https://mcr.microsoft.com/product/mssql/server/tags).

1. Pull the SQL Server container image with the tag. For example, to pull the `2019-CU18-ubuntu-20.04` image, replace `<image_tag>` in the following command with `2019-CU18-ubuntu-20.04`.

   ```bash
   docker pull mcr.microsoft.com/mssql/server:<image_tag>
   ```

1. To run a new container with that image, specify the tag name in the `docker run` command. In the following command, replace `<image_tag>` with the version you want to run. Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


   > **Important:**  
   > The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

   **Applies to: cs1-bash**


   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1401:1433 -d mcr.microsoft.com/mssql/server:<image_tag>
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:<image_tag>
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:<image_tag>
   ```



These steps can also be used to downgrade an existing container. For example, you might want to roll back or downgrade a running container for troubleshooting or testing. To downgrade a running container, you must be using a persistence technique for the data folder. Follow the same steps outlined in the [upgrade section](#upgrade), but specify the tag name of the older version when you run the new container.

<!--SQL Server 2019 on Linux-->
**Applies to: \>=sql-server-linux-ver15 || >=sql-server-ver15**

<a id="rhel"></a>

## Run RHEL-based container images

The documentation for SQL Server Linux container images points to Ubuntu-based containers. Beginning with  SQL Server 2019 (15.x) 
, you can use containers based on Red Hat Enterprise Linux (RHEL). An example of the image for RHEL will look like `mcr.microsoft.com/mssql/rhel/server:2019-CU15-rhel-8`.

For example, the following command pulls the Cumulative Update 18 container image for  SQL Server 2019 (15.x) 
 that uses RHEL 8:

**Applies to: cs1-bash**


```bash
docker pull mcr.microsoft.com/mssql/rhel/server:2019-CU18-rhel-8.4
```



**Applies to: cs1-powershell**


```powershell
docker pull mcr.microsoft.com/mssql/rhel/server:2019-CU18-rhel-8.4
```



**Applies to: cs1-cmd**


```cmd
docker pull mcr.microsoft.com/mssql/rhel/server:2019-CU18-rhel-8.4
```





<a id="production"></a>

## Run production container images

The [quickstart](../install-upgrade/quickstart-install-docker.md) runs the free Developer edition of SQL Server from the Microsoft Container Registry. Most of the information still applies if you want to run production container images, such as Enterprise, Standard, or Web editions. However, there are a few differences that are outlined here.

> **Note:**  
> Web edition isn't available in  SQL Server 2025 (17.x) 
 and later versions.

- You can only use SQL Server in a production environment if you have a valid license. You can [obtain a free SQL Server Express production license](https://go.microsoft.com/fwlink/?linkid=857693). SQL Server Standard and Enterprise edition licenses are available through [Microsoft Volume Licensing](https://www.microsoft.com/licensing).

- The Developer container image can be configured to run the production editions as well.

To run a production edition, review the requirements and run procedures in the [quickstart](../install-upgrade/quickstart-install-docker.md). You must specify your production edition with the `MSSQL_PID` environment variable. The following example shows how to run the latest  SQL Server 2022 (16.x) 
 container image for the Enterprise Core edition.

Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


**Applies to: cs1-bash**


```bash
docker run --name sqlenterprise \
-e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-e 'MSSQL_PID=EnterpriseCore' -p 1433:1433 \
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


```powershell
docker run --name sqlenterprise `
-e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
-e "MSSQL_PID=EnterpriseCore" -p 1433:1433 `
-d "mcr.microsoft.com/mssql/server:2022-latest"
```



**Applies to: cs1-cmd**


```cmd
docker run --name sqlenterprise ^
-e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-e "MSSQL_PID=EnterpriseCore" -p 1433:1433 ^
-d "mcr.microsoft.com/mssql/server:2022-latest"
```



> **Important:**  
> By passing the value `Y` to the environment variable `ACCEPT_EULA` and an edition value to `MSSQL_PID`, you express that you have a valid and existing license for the edition and version of SQL Server that you intend to use. You also agree that your use of SQL Server software running in a container image will be governed by the terms of your SQL Server license.

For a full list of possible values for `MSSQL_PID`, see [Configure SQL Server settings with environment variables on Linux](../configure/environment-variables.md).

<a id="multiple"></a>

## Run multiple SQL Server containers

Docker provides a way to run multiple SQL Server containers on the same host machine. Use this approach for scenarios that require multiple instances of SQL Server on the same host. Each container must expose itself on a different port.

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

The following example creates two  SQL Server 2017 (14.x) 
 containers and maps them to ports `1401` and `1402` on the host machine.

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1401:1433 -d mcr.microsoft.com/mssql/server:2017-latest
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1402:1433 -d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2017-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2017-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2017-latest
```




<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

The following example creates two  SQL Server 2019 (15.x) 
 containers and maps them to ports `1401` and `1402` on the host machine.

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1401:1433 -d mcr.microsoft.com/mssql/server:2019-latest
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1402:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2019-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2019-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```




<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

The following example creates two  SQL Server 2022 (16.x) 
 containers and maps them to ports `1401` and `1402` on the host machine.

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1401:1433 -d mcr.microsoft.com/mssql/server:2022-latest
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1402:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```




<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

The following example creates two  SQL Server 2025 (17.x) 
 containers and maps them to ports `1401` and `1402` on the host machine.

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1401:1433 -d mcr.microsoft.com/mssql/server:2025-latest
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1402:1433 -d mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2025-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1401:1433 -d mcr.microsoft.com/mssql/server:2025-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1402:1433 -d mcr.microsoft.com/mssql/server:2025-latest
```





> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


Now there are two instances of SQL Server running in separate containers. Clients can connect to each SQL Server instance by using the IP address of the container host and the port number for the container.

> **Note:**  
> Newer versions of **`sqlcmd`** (in **mssql-tools18**) are secure by default. If using version 18 or higher, you need to add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

**Applies to: cs1-bash**


```bash
sqlcmd -S 10.3.2.4,1401 -U sa -P '<password>'
sqlcmd -S 10.3.2.4,1402 -U sa -P '<password>'
```



**Applies to: cs1-powershell**


```powershell
sqlcmd -S 10.3.2.4,1401 -U sa -P "<password>"
sqlcmd -S 10.3.2.4,1402 -U sa -P "<password>"
```



**Applies to: cs1-cmd**


```cmd
sqlcmd -S 10.3.2.4,1401 -U sa -P "<password>"
sqlcmd -S 10.3.2.4,1402 -U sa -P "<password>"
```



<a id="upgrade"></a>

## Upgrade SQL Server in containers

To upgrade the container image with Docker, first identify the tag for the release for your upgrade. Pull this version from the registry with the `docker pull` command:

```bash
docker pull mcr.microsoft.com/mssql/server:<image_tag>
```

This updates the SQL Server image for any new containers you create, but it doesn't update SQL Server in any running containers. To do this, you must create a new container with the latest SQL Server container image and migrate your data to that new container.

1. Make sure you use one of the [data persistence techniques](configure.md#persist) for your existing SQL Server container. This enables you to start a new container with the same data.

1. Stop the SQL Server container with the `docker stop` command.

1. Create a new SQL Server container with `docker run` and specify either a mapped host directory or a data volume container. Make sure to use the specific tag for your SQL Server upgrade. The new container now uses a new version of SQL Server with your existing SQL Server data.

   > **Important:**  
   > Upgrade is only supported between release candidate previews and GA at this time.

1. Verify your databases and data in the new container.

1. Optionally, remove the old container with `docker rm`.

## Related content

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

- Get started with  SQL Server 2017 (14.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md?view=sql-server-2017&preserve-view=true)



<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

- Get started with  SQL Server 2019 (15.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md)



<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

- Get started with  SQL Server 2022 (16.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md)



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

- Get started with  SQL Server 2025 (17.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md)



- [Configure and customize SQL Server Linux containers](configure.md)
- See the [mssql-docker GitHub repository](https://github.com/Microsoft/mssql-docker) for resources, feedback, and known issues
- [Troubleshoot SQL Server Docker containers](troubleshoot.md)
- [High availability for SQL Server containers](../business-continuity/containers/high-availability-overview.md)
- [Secure SQL Server Linux containers](security.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).
