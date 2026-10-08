---
title: Secure SQL Server Linux Containers
description: Understand the different ways to secure SQL Server Linux containers and how you can run containers as different non-root users on the host.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: how-to
ms.custom:
  - engagement-fy23
  - linux-related-content
  - sfi-ropc-blocked
  - ignite-2025
monikerRange: ">=sql-server-linux-2017 || >=sql-server-2017"
---

# Secure SQL Server Linux containers


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


 SQL Server 2017 (14.x) 
 containers start up as the root user by default, which can cause some security concerns. This article talks about security options that you have when running  SQL Server 
 Linux containers, and how to build a  SQL Server 
 container as a non-root user.

The examples in this article assume that you're using Docker, but you can apply the same principles to other container orchestration tools including Kubernetes.

<a id="buildnonrootcontainer"></a>

## Build and run non-root SQL Server 2017 containers

Follow these steps to build a  SQL Server 2017 (14.x) 
 container that starts up as the `mssql` (non-root) user.

> **Note:**  
> Containers for  SQL Server 2019 (15.x) 
 and later versions automatically start up as non-root, while  SQL Server 2017 (14.x) 
 containers start as root by default. For more information, see [Run container as a different non-root user on the host](#nonrootuser).

1. Download the [sample Dockerfile for non-root SQL Server containers](https://raw.githubusercontent.com/microsoft/mssql-docker/master/linux/preview/examples/mssql-server-linux-non-root/Dockerfile) and save it as `Dockerfile`.

1. Run the following command in the directory that contains the Dockerfile to build the non-root  SQL Server 
 container:

   ```bash
   cd <path to Dockerfile directory>
   docker build -t 2017-latest-non-root .
   ```

1. Start the container.

   > **Important:**  
   > The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" --cap-add SYS_PTRACE --name sql1 -p 1433:1433 -d 2017-latest-non-root
   ```

   > **Note:**  
   > The `--cap-add SYS_PTRACE` flag is required for non-root  SQL Server 
 containers to generate dumps for troubleshooting purposes.

1. Check that the container is running as a non-root user:

   ```bash
   docker exec -it sql1 bash
   ```

   Run `whoami`, which returns the user running within the container.

   ```bash
   whoami
   ```

<a id="nonrootuser"></a>

## Run container as a different non-root user on the host

To run the  SQL Server 
 container as a different non-root user, add the `-u` flag to the `docker run` command. The non-root container has the restriction that it must run as part of the `root` group unless a volume is mounted to `/var/opt/mssql` that the non-root user can access. The `root` group doesn't grant any extra root permissions to the non-root user.

### Run as a user with a UID 4000

You can start  SQL Server 
 with a custom UID. For example, the following command starts  SQL Server 
 with UID 4000:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" --cap-add SYS_PTRACE -u 4000:0 -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

> **Warning:**  
> Make sure that the  SQL Server 
 container has a named user such as `mssql` or `root`. Otherwise, **`sqlcmd`** can't run within the container. You can check if the  SQL Server 
 container is running as a named user by running `whoami` within the container.

### Run the non-root container as the root user

You can run the non-root container as the root user if necessary, which also grants all file permissions automatically to the container, because it has higher privileges.

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -u 0:0 -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

### Run as a user on your host machine

You can start  SQL Server 
 with an existing user on the host machine with the following command:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" --cap-add SYS_PTRACE -u $(id -u myusername):0 -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

### Run as a different user and group

You can start  SQL Server 
 with a custom user and group. In this example, the mounted volume has permissions configured for the user or group on the host machine.

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" --cap-add SYS_PTRACE -u $(id -u myusername):$(id -g myusername) -v /path/to/mssql:/var/opt/mssql -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

<a id="storagepermissions"></a>

## Configure persistent storage permissions for non-root containers

To allow the non-root user to access database files that are on mounted volumes, make sure that the user or group you run the container under can read from and write to the persistent file storage.

You can get the current ownership of the database files with this command.

```bash
ls -ll <database file dir>
```

Run one of the following commands if  SQL Server 
 doesn't have access to persisted database files.

### Grant the root group read/write access to the database files

Grant the root group permissions to the following directories so that the non-root  SQL Server 
 container has access to database files.

```bash
chgrp -R 0 <database file dir>
chmod -R g=u <database file dir>
```

### Set the non-root user as the owner of the files

The owner can be the default non-root user, or any other non-root user you'd like to specify. In this example, you set UID 10001 as the non-root user.

```bash
chown -R 10001:0 <database file dir>
```

## Encrypt connections to SQL Server Linux containers

> **Important:**  
> When you configure Active Directory authentication or encryption options such as Transparent Data Encryption (TDE) and TLS for  SQL Server 
 on Linux or containers, there are several files, such as the keytab, certificates, and machine key, that are created by default under the folder `/var/opt/mssql/secrets`, and access to which is restricted by default to `mssql` and `root` users. When you configure persistent storage for  SQL Server 
 containers, use the same access strategy, ensuring that the path on the host or shared volume that is mapped to the `/var/opt/mssql/secrets` folder inside the container is protected and accessible only to the `mssql` and `root` users on the host as well. If the access to this path/folder is compromised, a malicious user can gain access to these critical files, compromising the encryption hierarchy and/or Active Directory configurations.

To encrypt connections to  SQL Server 
 Linux containers, you need a certificate with the following [requirements](../security/encrypted-connections.md#requirements-for-certificates).

Following is an example of how the connection can be encrypted to  SQL Server 
 Linux containers. Here you use a self-signed certificate, which shouldn't be used for production scenarios. For such environments, you should use CA certificates instead.

1. Create a self-signed certificate, which is suited for test and non-production environments only.

   ```bash
   openssl req -x509 -nodes -newkey rsa:2048 -subj '/CN=sql1.contoso.com' -keyout /container/sql1/mssql.key -out /container/sql1/mssql.pem -days 365
   ```

   In the previous code sample, `sql1` is the hostname of the SQL container, so when connecting to this container the name used in the connection string is going to be `sql1.contoso.com,5434`. You must also ensure that the folder path `/container/sql1/` already exists before running the previous command.

1. Ensure you set the right permissions on the `mssql.key` and `mssql.pem` files, so you avoid errors when you mount the files to the  SQL Server 
 container:

   ```bash
   chmod 440 /container/sql1/mssql.pem
   chmod 440 /container/sql1/mssql.key
   ```

1. Now create a `mssql.conf` file with the following content to enable server initiated encryption. For client initiated encryption, change the last line to `forceencryption = 0`.

   ```ini
   [network]
   tlscert = /etc/ssl/certs/mssql.pem
   tlskey = /etc/ssl/private/mssql.key
   tlsprotocols = 1.2
   forceencryption = 1
   ```

   > **Note:**  
   > For some Linux distributions, the path for storing the certificate and key could also be `/etc/pki/tls/certs/` and `/etc/pki/tls/private/` respectively. Verify the path before updating the `mssql.conf` for  SQL Server 
 containers. The location you set in the `mssql.conf` is the location where  SQL Server 
 in the container is going to search for the certificate and its key. In this case, that location is `/etc/ssl/certs/` and `/etc/ssl/private/`.

   The `mssql.conf` file is also created under the same folder location `/container/sql1/`. After running the above steps, you should have three files: `mssql.conf`, `mssql.key`, and `mssql.pem` in the `sql1` folder.

1. Deploy the  SQL Server 
 container with the following command (replace `<password>` with a valid password):

   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 5434:1433 --name sql1 -h sql1 -v /container/sql1/mssql.conf:/var/opt/mssql/mssql.conf -v /container/sql1/mssql.pem:/etc/ssl/certs/mssql.pem -v /container/sql1/mssql.key:/etc/ssl/private/mssql.key -d mcr.microsoft.com/mssql/server:2019-latest
   ```

   In the previous command, you mounted the `mssql.conf`, `mssql.pem`, and `mssql.key` files to the container and mapped the  SQL Server 
 default port 1433 in the container to port 5434 on the host.

   > **Note:**  
   > If you use Red Hat Enterprise Linux 8 and later versions, you can also use `podman run` command instead of `docker run`.

Follow the "Register the certificate on your client machine" and "Example connection strings" sections documented in [Client initiated encryption](../security/encrypted-connections.md?tabs=client#overview) to start encrypting connections to  SQL Server 
 on Linux containers.

## Related content

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

- Get started with  SQL Server 2017 (14.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md?view=sql-server-2017&preserve-view=true)



<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

- Get started with  SQL Server 2019 (15.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md?view=sql-server-ver15&preserve-view=true)



<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

- Get started with  SQL Server 2022 (16.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md?view=sql-server-ver16&preserve-view=true)



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

- Get started with  SQL Server 2025 (17.x) 
 container images on Docker by going through the [quickstart](../install-upgrade/quickstart-install-docker.md?view=sql-server-ver17&preserve-view=true)



- [Deploy and connect to SQL Server Linux containers](deploy.md)

- [Configure and customize SQL Server Linux containers](configure.md)

- [Troubleshoot SQL Server Docker containers](troubleshoot.md)
