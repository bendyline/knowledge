---
title: "Docker: Run Containers for SQL Server on Linux"
description: This quickstart shows how to use Docker to run the SQL Server Linux container images. You connect to a database and run a query.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: quickstart
ms.custom:
  - intro-quickstart
  - kr2b-contr-experiment
  - linux-related-content
  - sfi-ropc-blocked
  - ignite-2025
zone_pivot_groups: cs1-command-shell
monikerRange: ">=sql-server-linux-2017 || >=sql-server-2017"
---
# Quickstart: Run SQL Server Linux container images with Docker


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

In this quickstart, you use Docker to pull and run the  SQL Server 2017 (14.x) 
 Linux container image, [mssql-server-linux](https://mcr.microsoft.com/product/mssql/server/about). Then you can connect with **`sqlcmd`** to create your first database and run queries.

> **Note:**  
>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).

> **Warning:**  
> When you stop and remove a container, you permanently delete your  SQL Server 
 data in the container. For more information on preserving your data, [create and copy a backup file out of the container](../migrate/tutorial-restore-backup-sql-server-container.md) or use a [container data persistence technique](../containers/configure.md#persist).

This quickstart creates  SQL Server 2017 (14.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)



<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

In this quickstart, you use Docker to pull and run the  SQL Server 2019 (15.x) 
 Linux container image, [mssql-server-linux](https://mcr.microsoft.com/product/mssql/server/about). Then you can connect with **`sqlcmd`** to create your first database and run queries.

> **Note:**  
>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).

> **Warning:**  
> When you stop and remove a container, you permanently delete your  SQL Server 
 data in the container. For more information on preserving your data, [create and copy a backup file out of the container](../migrate/tutorial-restore-backup-sql-server-container.md) or use a [container data persistence technique](../containers/configure.md#persist).

This quickstart creates  SQL Server 2019 (15.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)



<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

In this quickstart, you use Docker to pull and run the  SQL Server 2022 (16.x) 
 Linux container image, [mssql-server-linux](https://mcr.microsoft.com/product/mssql/server/about). Then you can connect with **`sqlcmd`** to create your first database and run queries.

> **Note:**  
>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).

> **Warning:**  
> When you stop and remove a container, you permanently delete your  SQL Server 
 data in the container. For more information on preserving your data, [create and copy a backup file out of the container](../migrate/tutorial-restore-backup-sql-server-container.md) or use a [container data persistence technique](../containers/configure.md#persist).

This quickstart creates  SQL Server 2022 (16.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

In this quickstart, you use Docker to pull and run the  SQL Server 2025 (17.x) 
 Linux container image, [mssql-server-linux](https://mcr.microsoft.com/product/mssql/server/about). Then you can connect with **`sqlcmd`** to create your first database and run queries.

> **Note:**  
>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).

> **Warning:**  
> When you stop and remove a container, you permanently delete your  SQL Server 
 data in the container. For more information on preserving your data, [create and copy a backup file out of the container](../migrate/tutorial-restore-backup-sql-server-container.md) or use a [container data persistence technique](../containers/configure.md#persist).

This quickstart creates  SQL Server 2025 (17.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)



This image consists of  SQL Server 
 running on Linux, based on Ubuntu. You can use it with the Docker Engine 1.8+ on Linux.

Starting with  SQL Server 2022 (16.x) 
 CU 14 and  SQL Server 2019 (15.x) 
 CU 28, the container images include the [mssql-tools18](setup-tools.md#install-tools-on-linux) package. Microsoft ODBC 18 tools use the `/opt/mssql-tools18/bin` directory instead of `/opt/mssql-tools/bin`. For more information about changes and security enhancements, see [ODBC Driver 18.0 for SQL Server Released](https://techcommunity.microsoft.com/blog/sqlserver/odbc-driver-18-0-for-sql-server-released/3169228).

The examples in this article use the `docker` command. However, most of these commands also work with Podman. Podman provides a command-line interface similar to the Docker Engine. You can [find out more about Podman](https://docs.podman.io/en/latest).

> **Important:**  
> **`sqlcmd`** doesn't currently support the `MSSQL_PID` parameter when creating containers. If you use the **`sqlcmd`** instructions in this quickstart, you create a container with the Developer edition of  SQL Server 
. Use the command-line interface (CLI) instructions to create a container using the license of your choice. For more information, see [Deploy and connect to SQL Server Linux containers](../containers/deploy.md).

<a id="requirements"></a>

## Prerequisites

- Docker Engine 1.8 or later versions on any supported Linux distribution. For more information, see [Install Docker](https://docs.docker.com/engine/installation/).

<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

- For more information on hardware requirements and processor support, see [Hardware and software requirements for SQL Server 2017](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2017.md).



<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

- For more information on hardware requirements and processor support, see [Hardware and software requirements for SQL Server 2019](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2019.md).



<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

- For more information on hardware requirements and processor support, see [Hardware and software requirements for SQL Server 2022](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2022.md).



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

- For more information on hardware requirements and processor support, see [Hardware and software requirements for SQL Server 2025](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md).



- Docker `overlay2` storage driver. This driver is the default for most users. If you aren't using this storage provider and need to change it, see the instructions and warnings in the [Docker documentation for configuring overlay2](https://docs.docker.com/engine/storage/drivers/overlayfs-driver/#configure-docker-with-the-overlay-or-overlay2-storage-driver).

- Install the latest **[sqlcmd](../../tools/sqlcmd/sqlcmd-utility.md?&tabs=go)** on your Docker host.

- At least 2 GB of disk space.

- At least 2 GB of RAM.

- [System requirements for SQL Server on Linux](setup.md#system).

<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

<a id="pullandrun2017"></a>

## Pull and run the SQL Server Linux container image

Before starting the following steps, make sure that you select your preferred shell (**bash**, **PowerShell**, or **cmd**) at the top of this article.

**Applies to: cs1-bash**

For the bash commands in this article, the `sudo` command is used. If you don't want to use `sudo` to run Docker, you can configure a `docker` group and add users to that group. For more information, see [Post-installation steps for Linux](https://docs.docker.com/engine/install/linux-postinstall).


## [CLI](#tab/cli)

### Pull the container image from the registry

Pull the  SQL Server 2017 (14.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
sudo docker pull mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-powershell**


```powershell
docker pull mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-cmd**


```cmd
docker pull mcr.microsoft.com/mssql/server:2017-latest
```



This quickstart creates  SQL Server 2017 (14.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)

The previous command pulls the latest  SQL Server 2017 (14.x) 
 Linux container image. To pull a specific image, add a colon and the tag name, such as `mcr.microsoft.com/mssql/server:2017-GA-ubuntu`. For available images, see the [Microsoft Artifact Registry](https://mcr.microsoft.com/product/mssql/server/tags).

### Run the container

To run the Linux container image with Docker, use the following command in your selected shell.

> **Important:**  
> The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

**Applies to: cs1-bash**


```bash
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d \
   mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-powershell**


If you're using PowerShell Core, replace the double quotes with single quotes.

```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
   -p 1433:1433 --name sql1 --hostname sql1 `
   -d `
   mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
   -p 1433:1433 --name sql1 --hostname sql1 ^
   -d ^
   mcr.microsoft.com/mssql/server:2017-latest
```



> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.
 If you don't follow these password requirements, the container can't set up  SQL Server 
, and stops working. You can examine the error log by using the [`docker logs`](https://docs.docker.com/reference/cli/docker/container/logs) command.

By default, this quickstart creates a container with the Developer edition of  SQL Server 
. The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).

The following table provides a description of the parameters in the previous `docker run` example:

| Parameter | Description |
| --- | --- |
| `-e "ACCEPT_EULA=Y"` | Set the `ACCEPT_EULA` variable to any value to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_SA_PASSWORD=<password>"` | Specify your own strong password that is at least eight characters and meets the [Password policy](../../relational-databases/security/password-policy.md). Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_COLLATION=<SQL_Server_collation>"` | Specify a custom  SQL Server |
 | collation, instead of the default `SQL_Latin1_General_CP1_CI_AS`. |
| `-p 1433:1433` | Map a TCP port on the host environment (first value) with a TCP port in the container (second value). In this example,  SQL Server |
 | is listening on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `-d` | Run the container in the background (daemon). |
| `mcr.microsoft.com/mssql/server:2017-latest` | The  SQL Server |
 | Linux container image. |

## [sqlcmd](#tab/sqlcmd)

### Pull and run the container

Pull and run the  SQL Server 2017 (14.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql --tag 2017-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql --tag 2017-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql --tag 2017-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



This quickstart creates  SQL Server 2017 (14.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)

The previous command uses the latest  SQL Server 2017 (14.x) 
 Linux container image. If you want to pull a specific image, change the tag name, such as `2017-GA-ubuntu`. To see all available images, run the following command:

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql get-tags
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql get-tags
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql get-tags
```



The following table provides a description of the parameters in the previous `sqlcmd create mssql` example:

| Parameter | Description |
| --- | --- |
| `--accept-eula` | Include the `--accept-eula` flag to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `--port 1433` | Map a TCP port on the host environment and a TCP port in the container. In this example,  SQL Server |
 | listens on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `--tag 2017-latest` | Specify the  SQL Server |
 | Linux container image tag. |

---

### View list of containers

1. To view your Docker containers, use the `docker ps` command.

   **Applies to: cs1-bash**


   ```bash
   sudo docker ps -a
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker ps -a
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker ps -a
   ```



   The output looks similar to the following example:

   ```output
   CONTAINER ID   IMAGE                                        COMMAND                    CREATED         STATUS         PORTS                                       NAMES
   d4a1999ef83e   mcr.microsoft.com/mssql/server:2017-latest   "/opt/mssql/bin/perm..."   2 minutes ago   Up 2 minutes   0.0.0.0:1433->1433/tcp, :::1433->1433/tcp   sql1
   ```

1. If the `STATUS` column shows a status of `Up`, then  SQL Server 
 is running in the container and listening on the port specified in the `PORTS` column. If the `STATUS` column for your  SQL Server 
 container shows `Exited`, see [Troubleshoot SQL Server Docker containers](../containers/troubleshoot.md). The server is ready for connections once the  SQL Server 
 error logs display the message: `SQL Server is now ready for client connections. This is an informational message; no user action is required`. You can review the  SQL Server 
 error log inside the container using the command:

   ```bash
   sudo docker exec -t sql1 cat /var/opt/mssql/log/errorlog | grep connection
   ```

   The `--hostname` parameter, as discussed previously, changes the internal name of the container to a custom value. This value is the name you see returned in the following Transact-SQL (T-SQL) query:

   ```sql
   SELECT @@SERVERNAME,
          SERVERPROPERTY('ComputerNamePhysicalNetBIOS'),
          SERVERPROPERTY('MachineName'),
          SERVERPROPERTY('ServerName');
   ```

   Setting `--hostname` and `--name` to the same value is a good way to easily identify the target container.

1. As a final step, [change your SA password](#sapassword) in a production environment, because the `MSSQL_SA_PASSWORD` is visible in `ps -eax` output and stored in the environment variable of the same name.



<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

<a id="pullandrun2019"></a>

## Pull and run the SQL Server Linux container image

Before starting the following steps, make sure that you select your preferred shell (**bash**, **PowerShell**, or **cmd**) at the top of this article.

**Applies to: cs1-bash**

For the bash commands in this article, the `sudo` command is used. If you don't want to use `sudo` to run Docker, you can configure a `docker` group and add users to that group. For more information, see [Post-installation steps for Linux](https://docs.docker.com/engine/install/linux-postinstall).


## [CLI](#tab/cli)

### Pull the container image from the registry

Pull the  SQL Server 2019 (15.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
docker pull mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-powershell**


```powershell
docker pull mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-cmd**


```cmd
docker pull mcr.microsoft.com/mssql/server:2019-latest
```



This quickstart creates  SQL Server 2019 (15.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)

The previous command pulls the latest  SQL Server 2019 (15.x) 
 Linux container image. To pull a specific image, add a colon and the tag name, such as `mcr.microsoft.com/mssql/server:2019-GA-ubuntu`. For available images, see the [Microsoft Artifact Registry](https://mcr.microsoft.com/product/mssql/server/tags).

### Run the container

To run the Linux container image with Docker, use the following command in your selected shell.

> **Important:**  
> The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

**Applies to: cs1-bash**


```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d \
   mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-powershell**


If you're using PowerShell Core, replace the double quotes with single quotes.

```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
   -p 1433:1433 --name sql1 --hostname sql1 `
   -d `
   mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
   -p 1433:1433 --name sql1 --hostname sql1 ^
   -d ^
   mcr.microsoft.com/mssql/server:2019-latest
```



> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.
 If you don't follow these password requirements, the container can't set up  SQL Server 
, and stops working. You can examine the error log by using the [`docker logs`](https://docs.docker.com/reference/cli/docker/container/logs) command.

By default, this quickstart creates a container with the Developer edition of  SQL Server 
. The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).

The following table provides a description of the parameters in the previous `docker run` example:

| Parameter | Description |
| --- | --- |
| `-e "ACCEPT_EULA=Y"` | Set the `ACCEPT_EULA` variable to any value to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_SA_PASSWORD=<password>"` | Specify your own strong password that is at least eight characters and meets the [Password policy](../../relational-databases/security/password-policy.md). Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_COLLATION=<SQL_Server_collation>"` | Specify a custom  SQL Server |
 | collation, instead of the default `SQL_Latin1_General_CP1_CI_AS`. |
| `-p 1433:1433` | Map a TCP port on the host environment (first value) with a TCP port in the container (second value). In this example,  SQL Server |
 | is listening on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `-d` | Run the container in the background (daemon). |
| `mcr.microsoft.com/mssql/server:2019-latest` | The  SQL Server |
 | Linux container image. |

## [sqlcmd](#tab/sqlcmd)

### Pull and run the container

Pull and run the  SQL Server 2019 (15.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql --tag 2019-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql --tag 2019-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql --tag 2019-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



This quickstart creates  SQL Server 2019 (15.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)

The previous command uses the latest  SQL Server 2019 (15.x) 
 Linux container image. If you want to pull a specific image, change the tag name, such as `2019-GA-ubuntu-16.04`. To see all available images, run the following command:

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql get-tags
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql get-tags
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql get-tags
```



By default, this quickstart creates a container with the Developer edition of  SQL Server 
. The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).

The following table provides a description of the parameters in the previous `sqlcmd create mssql` example:

| Parameter | Description |
| --- | --- |
| `--accept-eula` | Include the `--accept-eula` flag to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `--port 1433` | Map a TCP port on the host environment and a TCP port in the container. In this example,  SQL Server |
 | listens on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `--tag 2019-latest` | Specify the  SQL Server |
 | Linux container image tag. |

---

### View list of containers

1. To view your Docker containers, use the `docker ps` command.

   **Applies to: cs1-bash**


   ```bash
   docker ps -a
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker ps -a
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker ps -a
   ```



   The output looks similar to the following example:

   ```output
   CONTAINER ID   IMAGE                                        COMMAND                    CREATED         STATUS         PORTS                                       NAMES
   d4a1999ef83e   mcr.microsoft.com/mssql/server:2019-latest   "/opt/mssql/bin/perm..."   2 minutes ago   Up 2 minutes   0.0.0.0:1433->1433/tcp, :::1433->1433/tcp   sql1
   ```

1. If the `STATUS` column shows a status of `Up`, then  SQL Server 
 is running in the container and listening on the port specified in the `PORTS` column. If the `STATUS` column for your  SQL Server 
 container shows `Exited`, see [Troubleshoot SQL Server Docker containers](../containers/troubleshoot.md). The server is ready for connections once the  SQL Server 
 error logs display the message: `SQL Server is now ready for client connections. This is an informational message; no user action is required`. You can review the  SQL Server 
 error log inside the container using the command:

   ```bash
   docker exec -t sql1 cat /var/opt/mssql/log/errorlog | grep connection
   ```

   The `--hostname` parameter, as discussed previously, changes the internal name of the container to a custom value. This value is the name you see returned in the following T-SQL query:

   ```sql
   SELECT @@SERVERNAME,
          SERVERPROPERTY('ComputerNamePhysicalNetBIOS'),
          SERVERPROPERTY('MachineName'),
          SERVERPROPERTY('ServerName');
   ```

   Setting `--hostname` and `--name` to the same value is a good way to easily identify the target container.

1. As a final step, [change your SA password](#sapassword) in a production environment, because the `MSSQL_SA_PASSWORD` is visible in `ps -eax` output and stored in the environment variable of the same name.



<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

<a id="pullandrun2022"></a>

## Pull and run the SQL Server Linux container image

Before starting the following steps, make sure that you select your preferred shell (**bash**, **PowerShell**, or **cmd**) at the top of this article.

**Applies to: cs1-bash**

For the bash commands in this article, the `sudo` command is used. If you don't want to use `sudo` to run Docker, you can configure a `docker` group and add users to that group. For more information, see [Post-installation steps for Linux](https://docs.docker.com/engine/install/linux-postinstall).


## [CLI](#tab/cli)

### Pull the container image from the registry

Pull the  SQL Server 2022 (16.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


```powershell
docker pull mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-cmd**


```cmd
docker pull mcr.microsoft.com/mssql/server:2022-latest
```



This quickstart creates  SQL Server 2022 (16.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)

The previous command pulls the latest  SQL Server 2022 (16.x) 
 Linux container image. To pull a specific image, add a colon and the tag name, such as `mcr.microsoft.com/mssql/server:2022-GA-ubuntu`. For available images, see the [Microsoft Artifact Registry](https://mcr.microsoft.com/product/mssql/server/tags).

### Run the container

To run the Linux container image with Docker, use the following command in your selected shell.

> **Important:**  
> The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

**Applies to: cs1-bash**


```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d \
   mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


If you're using PowerShell Core, replace the double quotes with single quotes.

```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
   -p 1433:1433 --name sql1 --hostname sql1 `
   -d `
   mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
   -p 1433:1433 --name sql1 --hostname sql1 ^
   -d ^
   mcr.microsoft.com/mssql/server:2022-latest
```



> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.
 If you don't follow these password requirements, the container can't set up  SQL Server 
, and stops working. You can examine the error log by using the [`docker logs`](https://docs.docker.com/reference/cli/docker/container/logs) command.

By default, this quickstart creates a container with the Developer edition of  SQL Server 
. The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).

The following table provides a description of the parameters in the previous `docker run` example:

| Parameter | Description |
| --- | --- |
| `-e "ACCEPT_EULA=Y"` | Set the `ACCEPT_EULA` variable to any value to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_SA_PASSWORD=<password>"` | Specify your own strong password that is at least eight characters and meets the [Password policy](../../relational-databases/security/password-policy.md). Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_COLLATION=<SQL_Server_collation>"` | Specify a custom  SQL Server |
 | collation, instead of the default `SQL_Latin1_General_CP1_CI_AS`. |
| `-p 1433:1433` | Map a TCP port on the host environment (first value) with a TCP port in the container (second value). In this example,  SQL Server |
 | is listening on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `-d` | Run the container in the background (daemon). |
| `mcr.microsoft.com/mssql/server:2022-latest` | The  SQL Server |
 | Linux container image. |

<a id="sapassword"></a>

## Change the system administrator password

The system administrator account (`sa`) is created on the  SQL Server 
 instance during the setup process. After you create your  SQL Server 
 container, run `echo $MSSQL_SA_PASSWORD` in the container to discover the `MSSQL_SA_PASSWORD` environment variable you specified. For security purposes, you should change your `sa` password in a production environment.

1. Choose a strong password to use for the `sa` account. Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Use `docker exec` to run **`sqlcmd`** to change the password using T-SQL. In the following example, the old and new passwords are read from user input.

   **Applies to: cs1-bash**


   ```bash
   docker exec -it sql1 /opt/mssql-tools18/bin/sqlcmd \
   -S localhost -U sa \
    -P "$(read -sp "Enter current SA password: "; echo "${REPLY}")" \
    -Q "ALTER LOGIN sa WITH PASSWORD=\"$(read -sp "Enter new SA password: "; echo "${REPLY}")\""
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker exec -it sql1 /opt/mssql-tools18/bin/sqlcmd `
      -S localhost -U sa -P "<password>" `
      -Q "ALTER LOGIN sa WITH PASSWORD='<new-password>'"
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker exec -it sql1 /opt/mssql-tools18/bin/sqlcmd ^
      -S localhost -U sa -P "<password>" ^
      -Q "ALTER LOGIN sa WITH PASSWORD='<new-password>'"
   ```



   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


   Recent versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

## Disable the SA account as a best practice

> **Important:**  
> You need these credentials for later steps. Be sure to write down the user ID and password that you enter here.

When you connect to your  SQL Server 
 instance using the system administrator (`sa`) account for the first time after installation, it's important for you to follow these steps, and then immediately disable the `sa` account as a security best practice.

1. Create a new login, and make it a member of the **sysadmin** server role.

   - Depending on whether you have a container or non-container deployment, enable Windows authentication, and create a new Windows-based login and add it to the **sysadmin** server role.

     - [Tutorial: Use adutil to configure Active Directory authentication with SQL Server on Linux](../security/authentication/adutil-tutorial.md)

     - [Tutorial: Configure Active Directory authentication with SQL Server on Linux containers](../containers/tutorial-adutil.md)

   - Otherwise, create a login using  SQL Server 
 authentication, and add it to the **sysadmin** server role.

1. Connect to the  SQL Server 
 instance using the new login you created.

1. Disable the `sa` account, as recommended for security best practice.


## [sqlcmd](#tab/sqlcmd)

### Pull and run the container

Pull and run the  SQL Server 2022 (16.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql --tag 2022-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql --tag 2022-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql --tag 2022-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



This quickstart creates  SQL Server 2022 (16.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true#pullandrun2025)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)

The previous command uses the latest  SQL Server 2022 (16.x) 
 Linux container image. If you want to pull a specific image, change the tag name, such as `2022-CU11-ubuntu-22.04`. To see all available images, run the following command:

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql get-tags
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql get-tags
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql get-tags
```



By default, this quickstart creates a container with the Developer edition of  SQL Server 
. The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).

The following table provides a description of the parameters in the previous `sqlcmd create mssql` example:

| Parameter | Description |
| --- | --- |
| `--accept-eula` | Include the `--accept-eula` flag to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `--port 1433` | Map a TCP port on the host environment and a TCP port in the container. In this example,  SQL Server |
 | listens on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `--tag 2022-latest` | Specify the  SQL Server |
 | Linux container image tag. |

**`sqlcmd`** disables the `sa` password and creates a new login based on the current user when it creates a container. Use the following command to view your login information. You need it in later steps.

**Applies to: cs1-bash**


```bash
sudo sqlcmd config view --raw
```



**Applies to: cs1-powershell**


```powershell
sqlcmd config view --raw
```



**Applies to: cs1-cmd**


```cmd
sqlcmd config view --raw
```



---

### View list of containers

1. To view your Docker containers, use the `docker ps` command.

   **Applies to: cs1-bash**


   ```bash
   docker ps -a
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker ps -a
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker ps -a
   ```



   The output looks similar to the following example:

   ```output
   CONTAINER ID   IMAGE                                        COMMAND                    CREATED         STATUS         PORTS                                       NAMES
   d4a1999ef83e   mcr.microsoft.com/mssql/server:2022-latest   "/opt/mssql/bin/perm..."   2 minutes ago   Up 2 minutes   0.0.0.0:1433->1433/tcp, :::1433->1433/tcp   sql1
   ```

1. If the `STATUS` column shows a status of `Up`, then  SQL Server 
 is running in the container and listening on the port specified in the `PORTS` column. If the `STATUS` column for your  SQL Server 
 container shows `Exited`, see [Troubleshoot SQL Server Docker containers](../containers/troubleshoot.md). The server is ready for connections once the  SQL Server 
 error logs display the message: `SQL Server is now ready for client connections. This is an informational message; no user action is required`. You can review the  SQL Server 
 error log inside the container using the command:

   ```bash
   docker exec -t sql1 cat /var/opt/mssql/log/errorlog | grep connection
   ```

   The `--hostname` parameter, as discussed previously, changes the internal name of the container to a custom value. This value is the name you see returned in the following T-SQL query:

   ```sql
   SELECT @@SERVERNAME,
          SERVERPROPERTY('ComputerNamePhysicalNetBIOS'),
          SERVERPROPERTY('MachineName'),
          SERVERPROPERTY('ServerName');
   ```

   Setting `--hostname` and `--name` to the same value is a good way to easily identify the target container.



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

<a id="pullandrun2025"></a>

## Pull and run the SQL Server Linux container image

Before starting the following steps, make sure that you select your preferred shell (**bash**, **PowerShell**, or **cmd**) at the top of this article.

**Applies to: cs1-bash**

For the bash commands in this article, the `sudo` command is used. If you don't want to use `sudo` to run Docker, you can configure a `docker` group and add users to that group. For more information, see [Post-installation steps for Linux](https://docs.docker.com/engine/install/linux-postinstall).


## [CLI](#tab/cli)

### Pull the container image from the registry

Pull the  SQL Server 2025 (17.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
docker pull mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-powershell**


```powershell
docker pull mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-cmd**


```cmd
docker pull mcr.microsoft.com/mssql/server:2025-latest
```



This quickstart creates  SQL Server 2025 (17.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)

The previous command pulls the latest  SQL Server 2025 (17.x) 
 Linux container image. To pull a specific image, add a colon and the tag name, such as `mcr.microsoft.com/mssql/server:2025-GA-ubuntu`. For available images, see the [Microsoft Artifact Registry](https://mcr.microsoft.com/product/mssql/server/tags).

### Run the container

To run the Linux container image with Docker, use the following command in your selected shell.

> **Important:**  
> The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

**Applies to: cs1-bash**


```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d \
   mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-powershell**


If you're using PowerShell Core, replace the double quotes with single quotes.

```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
   -p 1433:1433 --name sql1 --hostname sql1 `
   -d `
   mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
   -p 1433:1433 --name sql1 --hostname sql1 ^
   -d ^
   mcr.microsoft.com/mssql/server:2025-latest
```



> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.
 If you don't follow these password requirements, the container can't set up  SQL Server 
, and stops working. You can examine the error log by using the [`docker logs`](https://docs.docker.com/reference/cli/docker/container/logs) command.

By default, this quickstart creates a container with the Developer edition of  SQL Server 
. The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).

The following table provides a description of the parameters in the previous `docker run` example:

| Parameter | Description |
| --- | --- |
| `-e "ACCEPT_EULA=Y"` | Set the `ACCEPT_EULA` variable to any value to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_SA_PASSWORD=<password>"` | Specify your own strong password that is at least eight characters and meets the [Password policy](../../relational-databases/security/password-policy.md). Required setting for the  SQL Server |
 | image. |
| `-e "MSSQL_COLLATION=<SQL_Server_collation>"` | Specify a custom  SQL Server |
 | collation, instead of the default `SQL_Latin1_General_CP1_CI_AS`. |
| `-p 1433:1433` | Map a TCP port on the host environment (first value) with a TCP port in the container (second value). In this example,  SQL Server |
 | is listening on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `-d` | Run the container in the background (daemon). |
| `mcr.microsoft.com/mssql/server:2025-latest` | The  SQL Server |
 | Linux container image. |

<a id="sapassword"></a>

## Change the system administrator password

The system administrator account (`sa`) is created on the  SQL Server 
 instance during the setup process. After you create your  SQL Server 
 container, run `echo $MSSQL_SA_PASSWORD` in the container to discover the `MSSQL_SA_PASSWORD` environment variable you specified. For security purposes, you should change your `sa` password in a production environment.

1. Choose a strong password to use for the `sa` account. Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Use `docker exec` to run **`sqlcmd`** to change the password using T-SQL. In the following example, the old and new passwords are read from user input.

   **Applies to: cs1-bash**


   ```bash
   docker exec -it sql1 /opt/mssql-tools18/bin/sqlcmd \
   -S localhost -U sa \
    -P "$(read -sp "Enter current SA password: "; echo "${REPLY}")" \
    -Q "ALTER LOGIN sa WITH PASSWORD=\"$(read -sp "Enter new SA password: "; echo "${REPLY}")\""
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker exec -it sql1 /opt/mssql-tools18/bin/sqlcmd `
      -S localhost -U sa -P "<password>" `
      -Q "ALTER LOGIN sa WITH PASSWORD='<new-password>'"
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker exec -it sql1 /opt/mssql-tools18/bin/sqlcmd ^
      -S localhost -U sa -P "<password>" ^
      -Q "ALTER LOGIN sa WITH PASSWORD='<new-password>'"
   ```



   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


   Recent versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

## Disable the SA account as a best practice

> **Important:**  
> You need these credentials for later steps. Be sure to write down the user ID and password that you enter here.

When you connect to your  SQL Server 
 instance using the system administrator (`sa`) account for the first time after installation, it's important for you to follow these steps, and then immediately disable the `sa` account as a security best practice.

1. Create a new login, and make it a member of the **sysadmin** server role.

   - Depending on whether you have a container or non-container deployment, enable Windows authentication, and create a new Windows-based login and add it to the **sysadmin** server role.

     - [Tutorial: Use adutil to configure Active Directory authentication with SQL Server on Linux](../security/authentication/adutil-tutorial.md)

     - [Tutorial: Configure Active Directory authentication with SQL Server on Linux containers](../containers/tutorial-adutil.md)

   - Otherwise, create a login using  SQL Server 
 authentication, and add it to the **sysadmin** server role.

1. Connect to the  SQL Server 
 instance using the new login you created.

1. Disable the `sa` account, as recommended for security best practice.


## [sqlcmd](#tab/sqlcmd)

### Pull and run the container

Pull and run the  SQL Server 2025 (17.x) 
 Linux container image from the Microsoft Container Registry.

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql --tag 2025-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql --tag 2025-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql --tag 2025-latest --hostname sql1 --name sql1 --port 1433 --accept-eula
```



This quickstart creates  SQL Server 2025 (17.x) 
 containers. If you prefer to create Linux containers for different versions of  SQL Server 
, see:

- [SQL Server 2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true#pullandrun2022)
- [SQL Server 2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true#pullandrun2019)
- [SQL Server 2017](quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true#pullandrun2017)

The previous command uses the latest  SQL Server 2025 (17.x) 
 Linux container image. If you want to pull a specific image, change the tag name, such as `2025-ubuntu-GA-22.04`. To see all available images, run the following command:

**Applies to: cs1-bash**


```bash
sudo sqlcmd create mssql get-tags
```



**Applies to: cs1-powershell**


```powershell
sqlcmd create mssql get-tags
```



**Applies to: cs1-cmd**


```cmd
sqlcmd create mssql get-tags
```



By default, this quickstart creates a container with the Developer edition of  SQL Server 
. The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).

The following table provides a description of the parameters in the previous `sqlcmd create mssql` example:

| Parameter | Description |
| --- | --- |
| `--accept-eula` | Include the `--accept-eula` flag to confirm your acceptance of the End-User Licensing Agreement. Required setting for the  SQL Server |
 | image. |
| `--port 1433` | Map a TCP port on the host environment and a TCP port in the container. In this example,  SQL Server |
 | listens on TCP 1433 in the container and this container port is then exposed to TCP port 1433 on the host. |
| `--name sql1` | Specify a custom name for the container rather than a randomly generated one. If you run more than one container, you can't reuse this same name. |
| `--hostname sql1` | Used to explicitly set the container hostname. If you don't specify the hostname, it defaults to the container ID, which is a randomly generated system GUID. |
| `--tag 2025-latest` | Specify the  SQL Server |
 | Linux container image tag. |

**`sqlcmd`** disables the `sa` password and creates a new login based on the current user when it creates a container. Use the following command to view your login information. You need it in later steps.

**Applies to: cs1-bash**


```bash
sudo sqlcmd config view --raw
```



**Applies to: cs1-powershell**


```powershell
sqlcmd config view --raw
```



**Applies to: cs1-cmd**


```cmd
sqlcmd config view --raw
```



---

### View list of containers

1. To view your Docker containers, use the `docker ps` command.

   **Applies to: cs1-bash**


   ```bash
   docker ps -a
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker ps -a
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker ps -a
   ```



   The output looks similar to the following example:

   ```output
   CONTAINER ID   IMAGE                                        COMMAND                    CREATED         STATUS         PORTS                                       NAMES
   d4a1999ef83e   mcr.microsoft.com/mssql/server:2025-latest   "/opt/mssql/bin/perm..."   2 minutes ago   Up 2 minutes   0.0.0.0:1433->1433/tcp, :::1433->1433/tcp   sql1
   ```

1. If the `STATUS` column shows a status of `Up`, then  SQL Server 
 is running in the container and listening on the port specified in the `PORTS` column. If the `STATUS` column for your  SQL Server 
 container shows `Exited`, see [Troubleshoot SQL Server Docker containers](../containers/troubleshoot.md). The server is ready for connections once the  SQL Server 
 error logs display the message: `SQL Server is now ready for client connections. This is an informational message; no user action is required`. You can review the  SQL Server 
 error log inside the container using the command:

   ```bash
   docker exec -t sql1 cat /var/opt/mssql/log/errorlog | grep connection
   ```

   The `--hostname` parameter, as discussed previously, changes the internal name of the container to a custom value. This value is the name you see returned in the following T-SQL query:

   ```sql
   SELECT @@SERVERNAME,
          SERVERPROPERTY('ComputerNamePhysicalNetBIOS'),
          SERVERPROPERTY('MachineName'),
          SERVERPROPERTY('ServerName');
   ```

   Setting `--hostname` and `--name` to the same value is a good way to easily identify the target container.



## Connect to SQL Server

The following steps use the  SQL Server 
 command-line tool, [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md), inside the container to connect to  SQL Server 
.

1. Use the `docker exec -it` command to start an interactive Bash shell inside your running container. In the following example, `sql1` is the name specified by the `--name` parameter when you created the container.

   **Applies to: cs1-bash**


   ```bash
   docker exec -it sql1 "bash"
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker exec -it sql1 "bash"
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker exec -it sql1 "bash"
   ```



<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

2. Once inside the container, connect locally with **`sqlcmd`**, using its full path.

   ```bash
   /opt/mssql-tools/bin/sqlcmd -S localhost -U <userid> -P "<password>"
   ```

   Recent versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

   You can omit the password on the command-line to be prompted to enter it. For example:

   ```bash
   /opt/mssql-tools/bin/sqlcmd -S localhost -U <userid>
   ```



<!--SQL Server 2019 on Linux and later versions-->
**Applies to: \>=sql-server-linux-ver15 || >=sql-server-ver15**

2. Once inside the container, connect locally with **`sqlcmd`**, using its full path.

   ```bash
   /opt/mssql-tools18/bin/sqlcmd -S localhost -U <userid> -P "<password>"
   ```

   Recent versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux, and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

   You can omit the password on the command-line to be prompted to enter it. For example:

   ```bash
   /opt/mssql-tools18/bin/sqlcmd -S localhost -U <userid>
   ```



1. If successful, you reach a **`sqlcmd`** command prompt: `1>`.

## Create and query data

The following sections show you how to use **`sqlcmd`** and T-SQL to create a new database, add data, and run a query.

### Create a new database

The following steps create a new database named `TestDB`.

1. From the **`sqlcmd`** command prompt, paste the following T-SQL command to create a test database:

   ```sql
   CREATE DATABASE TestDB;
   ```

1. On the next line, write a query to return the name of all of the databases on your server:

   ```sql
   SELECT name
   FROM sys.databases;
   ```

1. The previous two commands aren't run immediately. Type `GO` on a new line to run the previous commands:

   ```sql
   GO
   ```

### Insert data

Next, create a new table named `Inventory` and insert two new rows.

1. From the **`sqlcmd`** command prompt, switch context to the new `TestDB` database:

   ```sql
   USE TestDB;
   ```

1. Create a new table named `Inventory`:

   ```sql
   CREATE TABLE Inventory
   (
       id INT,
       name NVARCHAR (50),
       quantity INT
   );
   ```

1. Insert data into the new table:

   ```sql
   INSERT INTO Inventory
   VALUES (1, 'banana', 150);

   INSERT INTO Inventory
   VALUES (2, 'orange', 154);
   ```

1. Type `GO` to run the previous commands:

   ```sql
   GO
   ```

### Select data

Now, run a query to return data from the `Inventory` table.

1. From the **`sqlcmd`** command prompt, enter a query that returns rows from the `Inventory` table where the quantity is greater than 152:

   ```sql
   SELECT *
   FROM Inventory
   WHERE quantity > 152;
   ```

1. Run the command:

   ```sql
   GO
   ```

### Exit the sqlcmd command prompt

1. To end your **`sqlcmd`** session, type `QUIT`:

   ```sql
   QUIT
   ```

1. To exit the interactive command prompt in your container, type `exit`. Your container continues to run after you exit the interactive Bash shell.

<a id="connectexternal"></a>

## Connect from outside the container

## [CLI](#tab/cli)

You can connect to the  SQL Server 
 instance on your Docker machine from any external Linux, Windows, or macOS tool that supports SQL connections. The external tool uses the IP address for the host machine.

The following steps use **`sqlcmd`** outside of your container to connect to  SQL Server 
 running in the container. These steps assume that you already have the  SQL Server 
 command-line tools installed outside of your container. The same principles apply when using other tools, but the process of connecting is unique to each tool.

1. Run **`sqlcmd`** specifying the IP address and the port mapped to port 1433 in your container. In this example, the port is the same as port 1433 on the host machine. If you specified a different mapped port on the host machine, use it here. You also need to open the appropriate inbound port on your firewall to allow the connection.

   Recent versions of **`sqlcmd`** are secure by default. If the connection doesn't succeed, and you're using version 18 or higher, add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

   **Applies to: cs1-bash**


   ```bash
   sudo sqlcmd -S <ip_address>,1433 -U <userid> -P "<password>"
   ```



   **Applies to: cs1-powershell**


   ```powershell
   sqlcmd -S <ip_address>,1433 -U <userid> -P "<password>"
   ```



   **Applies to: cs1-cmd**


   ```cmd
   sqlcmd -S <ip_address>,1433 -U <userid> -P "<password>"
   ```



   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Run T-SQL commands. When finished, type `QUIT`.

## [sqlcmd](#tab/sqlcmd)

You can connect to the  SQL Server 
 instance on your Docker machine from any external Linux, Windows, or macOS tool that supports SQL connections. The external tool uses the IP address for the host machine.

The following steps use **`sqlcmd`** outside of your container to connect to  SQL Server 
 running in the container. The same principles apply when using other tools, but the process of connecting is unique to each tool.

1. Run **`sqlcmd`** in the same session you used to create your container. It keeps track of the connection information through contexts, so you can easily connect at any time. Use `sqlcmd config view` to view your available contexts.

   **Applies to: cs1-bash**


   ```bash
   sudo sqlcmd
   ```



   **Applies to: cs1-powershell**


   ```powershell
   sqlcmd query
   ```



   **Applies to: cs1-cmd**


   ```cmd
   sqlcmd query
   ```



1. Run T-SQL commands. When finished, type `QUIT`.

---

Other common tools to connect to  SQL Server 
 include:

- [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md)
- [SQL Server Management Studio](../sql-server-linux-manage-ssms.md)
- [PowerShell](../sql-server-linux-manage-powershell-core.md)

## Remove your container

## [CLI](#tab/cli)

If you want to remove the  SQL Server 
 container used in this quickstart, run the following commands:

**Applies to: cs1-bash**


```bash
docker stop sql1
docker rm sql1
```



**Applies to: cs1-powershell**


```powershell
docker stop sql1
docker rm sql1
```



**Applies to: cs1-cmd**


```cmd
docker stop sql1
docker rm sql1
```



## [sqlcmd](#tab/sqlcmd)

If you want to remove the  SQL Server 
 container used in this quickstart, run the following command:

**Applies to: cs1-bash**


```bash
sudo sqlcmd delete --force
```



**Applies to: cs1-powershell**


```powershell
sqlcmd delete --force
```



**Applies to: cs1-cmd**


```cmd
sqlcmd delete --force
```



---

## Docker demo

After you finish using the  SQL Server 
 Linux container image for Docker, you might want to know how Docker is used to improve development and testing. The following video shows how Docker can be used in a continuous integration and deployment scenario.

&nbsp;

> [!VIDEO https://channel9.msdn.com/Events/Connect/2017/T152/player]

## Related tasks

- [Run multiple SQL Server containers](../containers/deploy.md#multiple)
- [Persist your data](../containers/configure.md#persist)

## Related content

- [Restore a SQL Server database in a Linux container](../migrate/tutorial-restore-backup-sql-server-container.md)
- [Troubleshoot SQL Server Docker containers](../containers/troubleshoot.md)
- [mssql-docker GitHub repository](https://github.com/microsoft/mssql-docker)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).
