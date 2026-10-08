---
title: Configure and Customize SQL Server Docker Containers
description: Understand the different ways to customize SQL Server Docker Containers and how you can configure it based on your requirements.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 07/14/2026
ms.service: sql
ms.subservice: linux
ms.topic: troubleshooting
ms.custom:
  - linux-related-content
  - build-2025
  - sfi-ropc-blocked
zone_pivot_groups: cs1-command-shell
monikerRange: ">=sql-server-linux-2017 || >=sql-server-2017"
---
# Configure and customize SQL Server Linux containers


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article explains how you can configure and customize  SQL Server 
 Linux containers using Docker. You can persist your data, move files from and to containers, and change default settings.

> **Tip:**  
> You can use **`sqlcmd`** (Go) to create a new instance of  SQL Server 
 in a container for development purposes. For more information, see [Create and query a SQL Server container](../../tools/sqlcmd/sqlcmd-use-utility.md#create-and-query-a-sql-server-container).

<a id="customcontainer"></a>

## Create a customized container

You can create your own [Dockerfile](https://docs.docker.com/reference/dockerfile/#usage) to build a customized  SQL Server 
 container. For more information, see [a demo that combines SQL Server and a Node application](https://github.com/twright-msft/mssql-node-docker-demo-app). If you do create your own Dockerfile, be aware of the foreground process, because this process controls the life of the container. If it exits, the container shuts down. For example, if you want to run a script and start  SQL Server 
, make sure that the  SQL Server 
 process is the right-most command. All other commands are run in the background. The following command illustrates this inside a Dockerfile:

```bash
/usr/src/app/do-my-sql-commands.sh & /opt/mssql/bin/sqlservr
```

If you reversed the commands in the previous example, the container would shut down when the do-my-sql-commands.sh script completes.

<a id="persist"></a>

## Persist your data

Your  SQL Server 
 configuration changes and database files are persisted in the container even if you restart the container with `docker stop` and `docker start`. However, if you remove the container with `docker rm`, everything in the container is deleted, including  SQL Server 
 and your databases. The following section explains how to use *data volumes* to persist your database files even if the associated containers are deleted.

> **Important:**  
> For  SQL Server 
, it's critical that you understand data persistence in Docker. In addition to the discussion in this section, see Docker's documentation on [how to manage data in Docker containers](https://docs.docker.com/engine/storage/volumes).

### Mount a host directory as a data volume

The first option is to mount a directory on your host as a data volume in your container. To do that, use the `docker run` command with the `-v <host directory>:/var/opt/mssql` flag, where `<host directory>` is any given path. For instance: `C:\SQL` on Windows, or `~/sqlvolumes` on Linux. This allows the data to be restored between container executions.

> **Note:**  
> Containers for  SQL Server 2019 (15.x) 
 and later versions automatically start up as non-root, while  SQL Server 2017 (14.x) 
 containers start as root by default. For more information on running  SQL Server 
 containers as non-root, see [Secure SQL Server Linux containers](security.md).

> **Important:**  
> The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 \
-v <host directory>/data:/var/opt/mssql/data \
-v <host directory>/log:/var/opt/mssql/log \
-v <host directory>/secrets:/var/opt/mssql/secrets \
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 `
-v <host directory>/data:/var/opt/mssql/data `
-v <host directory>/log:/var/opt/mssql/log `
-v <host directory>/secrets:/var/opt/mssql/secrets `
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 ^
-v <host directory>/data:/var/opt/mssql/data ^
-v <host directory>/log:/var/opt/mssql/log ^
-v <host directory>/secrets:/var/opt/mssql/secrets ^
-d mcr.microsoft.com/mssql/server:2017-latest
```





<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 \
-v <host directory>/data:/var/opt/mssql/data \
-v <host directory>/log:/var/opt/mssql/log \
-v <host directory>/secrets:/var/opt/mssql/secrets \
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 `
-v <host directory>/data:/var/opt/mssql/data `
-v <host directory>/log:/var/opt/mssql/log `
-v <host directory>/secrets:/var/opt/mssql/secrets `
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 ^
-v <host directory>/data:/var/opt/mssql/data ^
-v <host directory>/log:/var/opt/mssql/log ^
-v <host directory>/secrets:/var/opt/mssql/secrets ^
-d mcr.microsoft.com/mssql/server:2019-latest
```





<!--SQL Server 2022 on Linux-->
**Applies to: \>=sql-server-linux-ver16 || >=sql-server-ver16**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 \
-v <host directory>/data:/var/opt/mssql/data \
-v <host directory>/log:/var/opt/mssql/log \
-v <host directory>/secrets:/var/opt/mssql/secrets \
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 `
-v <host directory>/data:/var/opt/mssql/data `
-v <host directory>/log:/var/opt/mssql/log `
-v <host directory>/secrets:/var/opt/mssql/secrets `
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 ^
-v <host directory>/data:/var/opt/mssql/data ^
-v <host directory>/log:/var/opt/mssql/log ^
-v <host directory>/secrets:/var/opt/mssql/secrets ^
-d mcr.microsoft.com/mssql/server:2022-latest
```





> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


This technique also enables you to share and view the files on the host outside of Docker.

### Use a named data volume

The second option is to use a named data volume. You can create a named data volume by specifying a volume name instead of a host directory with the `-v` parameter. The following example creates a shared data volume named `sqlvolume`.

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 \
-v sqlvolume:/var/opt/mssql \
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 `
-v sqlvolume:/var/opt/mssql `
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 ^
-v sqlvolume:/var/opt/mssql ^
-d mcr.microsoft.com/mssql/server:2017-latest
```




<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 \
-v sqlvolume:/var/opt/mssql \
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 `
-v sqlvolume:/var/opt/mssql `
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 ^
-v sqlvolume:/var/opt/mssql ^
-d mcr.microsoft.com/mssql/server:2019-latest
```




<!--SQL Server 2022 on Linux-->
**Applies to: \>=sql-server-linux-ver16 || >=sql-server-ver16**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 \
-v sqlvolume:/var/opt/mssql \
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 `
-v sqlvolume:/var/opt/mssql `
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 ^
-v sqlvolume:/var/opt/mssql ^
-d mcr.microsoft.com/mssql/server:2022-latest
```





> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


This technique for implicitly creating a data volume in the run command doesn't work with older versions of Docker. In that case, use the explicit steps outlined in the Docker documentation, [Creating and mounting a data volume container](https://docs.docker.com/engine/storage/volumes/#creating-and-mounting-a-data-volume-container).

Even if you stop and remove this container, the data volume persists. You can view it with the `docker volume ls` command.

```bash
docker volume ls
```

If you then create another container with the same volume name, the new container uses the same  SQL Server 
 data contained in the volume.

To remove a data volume, use the `docker volume rm` command.

> **Warning:**  
> If you delete the data volume, any  SQL Server 
 data in the volume is *permanently* deleted.

### Backup and restore

In addition to these container techniques, you can also use standard  SQL Server 
 backup and restore techniques. You can use backup files to protect your data or to move the data to another  SQL Server 
 instance. For more information, see [Back up and restore SQL Server databases on Linux](../business-continuity/backup-restore/database-backup-restore.md).

> **Warning:**  
> If you do create backups, make sure to create or copy the backup files outside of the container. Otherwise, if the container is removed, the backup files are also deleted.

## Enable VDI backup and restore in containers

Virtual Device Interface (VDI) backup and restore operations are supported in  SQL Server 
 container deployments beginning with CU15 for  SQL Server 2019 (15.x) 
 and CU28 for  SQL Server 2017 (14.x) 
. Follow these steps to enable VDI-based backup or restore for  SQL Server 
 containers:

1. When deploying  SQL Server 
 containers, use the `--shm-size` option. To begin, set the sizing to 1 GB, as shown in the following command. Replace `<password>` with a valid password.

   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
   --shm-size 1g \
   -p 1433:1433 \
   --name sql19 \
   --hostname sql19 \
   -d mcr.microsoft.com/mssql/server:2019-latest
   ```

   The option `--shm-size` allows you to configure the size of the shared memory directory (`/dev/shm`) inside the container, which is set to 64 MB by default. This default size of the shared memory is insufficient to support VDI backups. We recommend that you configure this to a minimum of 1 GB when you deploy  SQL Server 
 containers and want to support VDI backups.

1. You must also enable the `memory.enablecontainersharedmemory` parameter in `mssql.conf` inside the container. You can mount `mssql.conf` at the deployment of the container using the `-v` option as described in the [Persist your data](#persist) section, or after you deploy the container by manually updating `mssql.conf` inside the container. Here's a sample `mssql.conf` file with the `memory.enablecontainersharedmemory` setting set to `true`.

   ```ini
   [memory]
   enablecontainersharedmemory = true
   ```

## Copy files from a container

To copy a file out of the container, use the following command:

```bash
docker cp <Container ID>:<Container path> <host path>
```

You can get the container ID by running the command `docker ps -a`.

**Example:**

**Applies to: cs1-bash**


```bash
docker cp d6b75213ef80:/var/opt/mssql/log/errorlog /tmp/errorlog
```



**Applies to: cs1-powershell**


```powershell
docker cp d6b75213ef80:/var/opt/mssql/log/errorlog C:\Temp\errorlog
```



**Applies to: cs1-cmd**


```cmd
docker cp d6b75213ef80:/var/opt/mssql/log/errorlog C:\Temp\errorlog
```



## Copy files into a container

To copy a file into the container, use the following command:

```bash
docker cp <Host path> <Container ID>:<Container path>
```

**Example:**

**Applies to: cs1-bash**


```bash
docker cp /tmp/mydb.mdf d6b75213ef80:/var/opt/mssql/data
```



**Applies to: cs1-powershell**


```powershell
docker cp C:\Temp\mydb.mdf d6b75213ef80:/var/opt/mssql/data
```



**Applies to: cs1-cmd**


```cmd
docker cp C:\Temp\mydb.mdf d6b75213ef80:/var/opt/mssql/data
```



<a id="tz"></a>

## Configure the time zone

To run  SQL Server 
 in a Linux container with a specific time zone, configure the `TZ` environment variable. For more information, see [Configure the time zone for SQL Server 2022 and later versions on Linux](../configure/time-zone.md). To find the right time zone value, run the `tzselect` command from a Linux `bash` prompt:

```bash
tzselect
```

After you select the time zone, `tzselect` displays output similar to the following example:

```output
The following information has been given:

    United States
    Pacific

Therefore TZ='America/Los_Angeles' will be used.
```

You can use this information to set the same environment variable in your Linux container. The following example shows how to run  SQL Server 
 in a container in the `America/Los_Angeles` time zone:

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

**Applies to: cs1-bash**


```bash
sudo docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 --name sql1 \
-e 'TZ=America/Los_Angeles' \
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-powershell**


```powershell
sudo docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 --name sql1 `
-e "TZ=America/Los_Angeles" `
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-cmd**


```cmd
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 --name sql1 ^
-e "TZ=America/Los_Angeles" ^
-d mcr.microsoft.com/mssql/server:2017-latest
```




<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

**Applies to: cs1-bash**


```bash
sudo docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 --name sql1 \
-e 'TZ=America/Los_Angeles' \
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-powershell**


```powershell
sudo docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 --name sql1 `
-e "TZ=America/Los_Angeles" `
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-cmd**


```cmd
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 --name sql1 ^
-e "TZ=America/Los_Angeles" ^
-d mcr.microsoft.com/mssql/server:2019-latest
```




<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

**Applies to: cs1-bash**


```bash
sudo docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 --name sql1 \
-e 'TZ=America/Los_Angeles' \
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


```powershell
sudo docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 --name sql1 `
-e "TZ=America/Los_Angeles" `
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-cmd**


```cmd
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 --name sql1 ^
-e "TZ=America/Los_Angeles" ^
-d mcr.microsoft.com/mssql/server:2022-latest
```




<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

**Applies to: cs1-bash**


```bash
sudo docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-p 1433:1433 --name sql1 \
-e 'TZ=America/Los_Angeles' \
-d mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-powershell**


```powershell
sudo docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-p 1433:1433 --name sql1 `
-e "TZ=America/Los_Angeles" `
-d mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-cmd**


```cmd
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-p 1433:1433 --name sql1 ^
-e "TZ=America/Los_Angeles" ^
-d mcr.microsoft.com/mssql/server:2025-latest
```





> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


## Change the `tempdb` path

It's a good practice to keep your `tempdb` database separate from your user databases.

1. Connect to the  SQL Server 
 instance, and then run the following Transact-SQL (T-SQL) script. If there are more files associated with `tempdb`, you need to move them as well.

   ```sql
   ALTER DATABASE tempdb
       MODIFY FILE (NAME = tempdev, FILENAME = '/var/opt/mssql/tempdb/tempdb.mdf');
   GO

   ALTER DATABASE tempdb
       MODIFY FILE (NAME = templog, FILENAME = '/var/opt/mssql/tempdb/templog.ldf');
   GO
   ```

1. Verify that the `tempdb` file location has been modified, using the following T-SQL script:

   ```sql
   SELECT *
   FROM sys.sysaltfiles
   WHERE dbid = 2;
   ```

1. You must restart the  SQL Server 
 container for these changes to take effect.

   **Applies to: cs1-bash**


   ```bash
   docker stop sql1
   docker start sql1
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker stop sql1
   docker start sql1
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker stop sql1
   docker start sql1
   ```



1. Open an interactive `bash` session to connect to the container.

   **Applies to: cs1-bash**


   ```bash
   docker exec -it sql1 bash
   ```



   **Applies to: cs1-powershell**


   ```powershell
   docker exec -it sql1 bash
   ```



   **Applies to: cs1-cmd**


   ```cmd
   docker exec -it sql1 bash
   ```



   Once connected to the interactive shell, run the following command to check the location of `tempdb`:

   ```bash
   ls /var/opt/mssql/tempdb/
   ```

   If the move was successful, you see similar output:

   ```output
   tempdb.mdf templog.ldf
   ```

<a id="changefilelocation"></a>

## Change the default file location

Add the `MSSQL_DATA_DIR` variable to change your data directory in your `docker run` command, then mount a volume to that location that your container's user has access to.

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-e 'MSSQL_DATA_DIR=/my/file/path' \
-v /my/host/path:/my/file/path \
-p 1433:1433 \
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-e "MSSQL_DATA_DIR=/my/file/path" `
-v /my/host/path:/my/file/path `
-p 1433:1433 `
-d mcr.microsoft.com/mssql/server:2017-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-e "MSSQL_DATA_DIR=/my/file/path" ^
-v /my/host/path:/my/file/path ^
-p 1433:1433 ^
-d mcr.microsoft.com/mssql/server:2017-latest
```





<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-e 'MSSQL_DATA_DIR=/my/file/path' \
-v /my/host/path:/my/file/path \
-p 1433:1433 \
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-e "MSSQL_DATA_DIR=/my/file/path" `
-v /my/host/path:/my/file/path `
-p 1433:1433 `
-d mcr.microsoft.com/mssql/server:2019-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-e "MSSQL_DATA_DIR=/my/file/path" ^
-v /my/host/path:/my/file/path ^
-p 1433:1433 ^
-d mcr.microsoft.com/mssql/server:2019-latest
```





<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-e 'MSSQL_DATA_DIR=/my/file/path' \
-v /my/host/path:/my/file/path \
-p 1433:1433 \
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-e "MSSQL_DATA_DIR=/my/file/path" `
-v /my/host/path:/my/file/path `
-p 1433:1433 `
-d mcr.microsoft.com/mssql/server:2022-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-e "MSSQL_DATA_DIR=/my/file/path" ^
-v /my/host/path:/my/file/path ^
-p 1433:1433 ^
-d mcr.microsoft.com/mssql/server:2022-latest
```





<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

**Applies to: cs1-bash**


```bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' \
-e 'MSSQL_DATA_DIR=/my/file/path' \
-v /my/host/path:/my/file/path \
-p 1433:1433 \
-d mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-powershell**


```powershell
docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=<password>" `
-e "MSSQL_DATA_DIR=/my/file/path" `
-v /my/host/path:/my/file/path `
-p 1433:1433 `
-d mcr.microsoft.com/mssql/server:2025-latest
```



**Applies to: cs1-cmd**


```cmd
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" ^
-e "MSSQL_DATA_DIR=/my/file/path" ^
-v /my/host/path:/my/file/path ^
-p 1433:1433 ^
-d mcr.microsoft.com/mssql/server:2025-latest
```





## Use `mssql-conf` to configure SQL Server inside a container

You can use the [mssql-conf tool](../configure/mssql-conf.md) to set parameters in  SQL Server 
 containers.

For example, you can set a memory limit for the instance using the following steps:

1. Connect directly to the container using `docker exec` as the root user. Replace `sqlcontainer` with your container name.

   ```bash
   docker exec -u root -it sqlcontainer "bash"
   ```

1. Use **`mssql-conf`** to change a setting. This example changes the `memory.memorylimitmb` setting to 2 GB (2,048 MB).

   ```bash
   /opt/mssql/bin/mssql-conf set memory.memorylimitmb 2048
   ```

## Custom Docker container examples

For examples of custom Docker containers, see <https://github.com/microsoft/mssql-docker/tree/master/linux/preview/examples>. The examples include:

- [Dockerfile example with Full-Text Search](https://github.com/microsoft/mssql-docker/blob/master/linux/preview/examples/mssql-agent-fts-ha-tools/Dockerfile)
- [Dockerfile example for RHEL 7 and SQL Server 2019](https://github.com/microsoft/mssql-docker/tree/master/linux/preview/examples/mssql-rhel7-sql2019)
- [Dockerfile example for RHEL 8 and SQL Server 2017](https://github.com/microsoft/mssql-docker/tree/master/linux/preview/examples/mssql-rhel8-sql2017)
- [Dockerfile example for Ubuntu 20.04 and SQL Server 2019 with Full-Text Search, PolyBase, and Tools](https://github.com/microsoft/mssql-docker/blob/master/linux/preview/examples/mssql-polybase-fts-tools/Dockerfile)

For information on how to build and run Docker containers using Dockerfiles, see the [ML Services samples](https://github.com/microsoft/mssql-docker/tree/master/linux/preview/examples/mssql-mlservices) on GitHub.

## Control group (cgroup) v2 support

 SQL Server 
 detects and honors control group (cgroup) v2 constraints, starting with  SQL Server 2025 (17.x) 
 and  SQL Server 2022 (16.x) 
 Cumulative Update (CU) 20. These constraints provide fine-grained control in the Linux kernel over CPU and memory resources, and improve resource isolation in Docker, Kubernetes, and OpenShift environments.

In earlier versions, containerized deployments on Kubernetes clusters (for example, Azure Kubernetes Service v1.25+) could experience out of memory (OOM) errors because  SQL Server 
 didn't enforce memory limits defined in container specifications. Support for cgroup v2 addresses this problem.

### Check cgroup version

```bash
stat -fc %T /sys/fs/cgroup
```

The results are as follows:

| Result | Description |
| --- | --- |
| `cgroup2fs` | You use cgroup v2 |
| `cgroup` | You use cgroup v1 |

### Switch to cgroup v2

The easiest path is choosing a distribution that supports cgroup v2 out of the box.

If you need to switch manually, add the following parameter to your GRUB configuration:

```text
systemd.unified_cgroup_hierarchy=1
```

Then update GRUB. For example, on Ubuntu, run:

```bash
sudo update-grub
```

On Red Hat Enterprise Linux (RHEL), run:

```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

### CPU limit reporting with cgroup v2

When you configure CPU limits using cgroup v2,  SQL Server 
 doesn't show the configured CPU core count in the error log. Instead, it continues to report the total number of host CPUs.

To align  SQL Server 
 scheduler and query plans (for example, parallelism decisions) with the intended CPU count defined in cgroup v2, apply the following configuration.

#### Configure processor affinity

Explicitly set  SQL Server 
 processor affinity to match the cgroup execution quota. In the following example, the cgroup quota is four CPUs on an eight-core host:

```sql
ALTER SERVER CONFIGURATION
SET PROCESS AFFINITY CPU = 0 TO 3;
```

This configuration ensures that  SQL Server 
 creates schedulers only for the intended number of CPUs. For more information, see [ALTER SERVER CONFIGURATION](../../t-sql/statements/alter-server-configuration-transact-sql.md) and [Use PROCESS AFFINITY for Node and/or CPUs](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-performance-best-practices.md#use-process-affinity-for-node-andor-cpus).

#### Enable trace flag 8002 (recommended)

Enable trace flag 8002 to use soft affinity at the SQLPAL layer:

```bash
sudo /opt/mssql/bin/mssql-conf traceflag 8002 on
```

By default, schedulers are bound to specific CPUs defined in the affinity mask. Trace flag 8002 allows schedulers to move across CPUs instead, which generally improves performance while still respecting affinity and cgroup constraints. For more information, see [DBCC TRACEON - Trace Flags](../../t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql.md#tf8002).

Restart  SQL Server 
 after enabling the trace flag.

#### Expected behavior

After restart:

-  SQL Server 
 creates only the number of schedulers defined by the affinity setting (for example, four schedulers).

- The Linux kernel continues to enforce the cgroup v2 CPU execution quota.

- Query optimization and parallelism decisions are based on the intended CPU count, rather than the total host CPUs.

> **Note:**  
> The  SQL Server 
 error log might continue to display the total host CPU count. This logging and display behavior doesn't affect actual CPU usage, scheduler creation, or CPU enforcement by cgroup v2 or processor affinity.

For more information, see the following resources:

- [Quickstart: Deploy a SQL Server Linux container to Kubernetes using Helm charts](kubernetes-deploy-helm-charts.md)
- [Control Group v2 (Linux Kernel documentation)](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)


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

- [Troubleshoot SQL Server Docker containers](troubleshoot.md)

- [Secure SQL Server Linux containers](security.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).
