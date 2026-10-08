---
title: Troubleshoot SQL Server on Linux
description: Troubleshoot SQL Server running on Linux or in a Linux container. Learn where to find information about supported features and known limitations.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: troubleshooting
ms.custom:
  - linux-related-content
---
# Troubleshoot SQL Server on Linux


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article describes how to troubleshoot  SQL Server 
 running on Linux or in a Linux container.

When troubleshooting  SQL Server 
 on Linux, see:

- [Release information](sql-server-linux-release-notes.md)
- [Known issues](sql-server-linux-known-issues.md)
- [Frequently asked questions](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml)

<a id="connection"></a>

## Troubleshoot connection failures

If you have difficulty connecting to your Linux  SQL Server 
 instance, there are a few things to check.

- If you're unable to connect locally using `localhost`, try using the IP address 127.0.0.1 instead. It's possible that `localhost` isn't properly mapped to this address.

- Verify that the server name or IP address is reachable from your client machine.

  To find the IP address of your Ubuntu machine, you can run the `ifconfig` command as in the following example:

  ```bash
  sudo ifconfig eth0 | grep 'inet addr'
  ```

  For Red Hat, you can use the `ip addr` command as in the following example:

  ```bash
  sudo ip addr show eth0 | grep "inet"
  ```

  > **Tip:**  
  > One exception to this technique relates to Azure VMs. For Azure VMs, [find the public IP for the VM in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart#connect).

- If applicable, check that you opened the  SQL Server 
 port (default 1433) on the firewall.

- For Azure VMs, check that you have a [network security group rule for the default SQL Server port](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart#remote).

- Verify that the user name and password don't contain any typos, extra spaces, or incorrect casing.

- Try to explicitly set the protocol and port number with the server name like the following example: `tcp:servername,1433`.

- Network connectivity issues can also cause connection errors and timeouts. After verifying your connection information and network connectivity, try the connection again.

## Manage the SQL Server service

The following section shows how to manage the execution of  SQL Server 
 Linux containers. To manage services for Linux, see [Start, stop, and restart SQL Server services on Linux](sql-server-linux-start-stop-restart-sql-server-services.md).

### Manage the execution of the SQL Server Linux container

You can get the status and container ID of the most recently created  SQL Server 
 Linux container by running the following command. The ID is under the `CONTAINER ID` column.

   ```bash
   sudo docker ps -l
   ```

You can stop or restart the  SQL Server 
 service as needed using the following commands:

   ```bash
   sudo docker stop <container_id>
   sudo docker restart <container_id>
   ```

> **Tip:**  
> For more troubleshooting tips for Linux containers, see [Troubleshoot SQL Server Docker containers](containers/troubleshoot.md).

## Access the log files

The  SQL Server Database Engine 
 logs to the `/var/opt/mssql/log/errorlog` file in both the Linux and container installations. You need to be in **superuser** mode to browse this directory.

The installer writes logs to `/var/opt/mssql/setup-<installation_timestamp>`.

You can browse the `errorlog` files with any UTF-16 compatible tool like **vim** or **cat** as follows:

```bash
sudo cat errorlog
```

If you prefer, you can also convert the files to UTF-8 to read them with **more** or **less** with the following command:

```bash
sudo iconv -f UTF-16LE -t UTF-8 <errorlog> -o <output errorlog file>
```

## Extended Events

Extended Events can be queried via a SQL command. For more information, see [Extended Events overview](../relational-databases/extended-events/extended-events.md).

## Crash dumps

Look for dumps in the log directory in Linux. Check under the `/var/opt/mssql/log` directory for Linux core dumps (`.tar.gz2` extension) or SQL minidumps (`.mdmp` extension).

For example, to view core dumps:

```bash
sudo ls /var/opt/mssql/log | grep '\.tar\.gz2$'
```

For SQL minidumps, use this script:

```bash
sudo ls /var/opt/mssql/log | grep '\.mdmp$'
```

## Start SQL Server in minimal configuration or in single-user mode

### Start SQL Server in minimal configuration mode

This mode is useful if the setting of a configuration value (for example, over-committing memory) prevents the server from starting.

   ```bash
   sudo -u mssql /opt/mssql/bin/sqlservr -f
   ```

### Start SQL Server in single-user mode

Sometimes you might have to start an instance of  SQL Server 
 in single-user mode by using the startup option `-m`. For more information, see [startup parameters](../database-engine/configure-windows/database-engine-service-startup-options.md#other-startup-options). For example, you might want to change server configuration options or recover a damaged `master` database or other system database.

For example, use the following script to start  SQL Server 
 in single-user mode:

   ```bash
   sudo -u mssql /opt/mssql/bin/sqlservr -m
   ```

This script starts  SQL Server 
 in single-user mode, limiting connections to the **`sqlcmd`** client (the application name `SQLCMD` must be capitalized):

   ```bash
   sudo -u mssql /opt/mssql/bin/sqlservr -m"SQLCMD"
   ```

You should always start  SQL Server 
 on Linux with the `mssql` user to prevent future startup issues. For example: `sudo -u mssql /opt/mssql/bin/sqlservr [STARTUP OPTIONS]`

If you accidentally start  SQL Server 
 with another user, you must change ownership of  SQL Server 
 database files back to the `mssql` user before you start  SQL Server 
 with **systemd**. For example, to change ownership of all database files under `/var/opt/mssql` to the `mssql` user, run the following command:

   ```bash
   chown -R mssql:mssql /var/opt/mssql/
   ```

## Rebuild system databases

As a last resort, you can choose to rebuild the `master` and `model` databases back to default versions.

> **Warning:**  
> This process is dangerous, because you can **delete all  SQL Server 
 system data** that you have configured, including information about your user databases (but not the user databases themselves).

You need to attach the user databases to the instance afterwards. It also deletes other information stored in the system databases, including:

- database master key (DMK) information
- any certificates loaded in `master`
- the password for the `sa` account
- job-related information from `msdb`
- Database Mail information from `msdb`
- `sp_configure` options

You aren't able to reattach any user databases encrypted with [transparent data encryption (TDE)](../relational-databases/security/encryption/transparent-data-encryption.md) unless your certificates and private keys are also backed up.

Only use these steps if you understand the implications.

1. Stop  SQL Server 
  Database Engine 


   ```bash
   sudo systemctl stop mssql-server
   ```

1. Run `sqlservr` with the `force-setup` parameter:

   ```bash
   sudo -u mssql /opt/mssql/bin/sqlservr --force-setup
   ```

   You should always start  SQL Server 
 on Linux with the `mssql` user to prevent future startup issues.

1. After you see the message "Recovery is complete", press **Ctrl+C**. This shuts down  SQL Server 
.

1. Reconfigure the `sa` password.

   ```bash
   sudo /opt/mssql/bin/mssql-conf set-sa-password
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Start  SQL Server 
 and reconfigure the server, including restoring or reattaching any user databases.

   ```bash
   sudo systemctl start mssql-server
   ```

## Improve performance

Many factors affect performance, including database design, hardware, and workload demands. If you're looking to improve performance, start by reviewing the best practices articles:

- [Performance best practices: Storage, kernel, CPU, and network for SQL Server on Linux](configure/performance-best-practices-operating-system.md)
- [Performance best practices: SQL Server memory on Linux](configure/performance-best-practices-sql-server-memory.md)

Then, explore some of the available tools for troubleshooting performance problems.

- [Monitor performance by using the Query Store](../relational-databases/performance/monitoring-performance-by-using-the-query-store.md)
- [System dynamic management views and functions](../relational-databases/system-dynamic-management-objects/system-dynamic-management-objects.md)
- [Performance Dashboard in SQL Server Management Studio](https://learn.microsoft.com/archive/blogs/sql_server_team/new-in-ssms-performance-dashboard-built-in)

## Common issues

1. You can't connect to your remote  SQL Server 
 instance.

   See [Troubleshoot connection failures](#connection).

1. You experience the error message: `ERROR: Hostname must be 15 characters or less.`

   This is a known issue that happens whenever the name of the machine that is trying to install the  SQL Server 
 package is longer than 15 characters. There are currently no workarounds other than changing the name of the machine. You can do this by editing both `/etc/hostname` and `/etc/hosts`, changing the hostname, saving each file, and restarting the computer.

1. The system administrator (`sa`) password must be reset, which stops the  SQL Server 
 service temporarily.

   If you forget the `sa` password or need to reset it for some other reason, follow these steps.

   Sign in to the host terminal, run the following commands and follow the prompts to reset the `sa` password:

   ```bash
   sudo systemctl stop mssql-server
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Special characters in passwords can cause errors or login failures.

   If you use some characters in the  SQL Server 
 password, you might need to escape them with a backslash when you use them on the Linux command line. For example, you must escape the dollar sign (`$`) anytime you use it in a terminal command/shell script:

   - Doesn't work:

     ```bash
     sudo sqlcmd -S myserver -U sa -P Test$$
     ```

   - Does work:

     ```bash
     sudo sqlcmd -S myserver -U sa -P Test\$\$
     ```

## Related content

- [Special characters](https://tldp.org/LDP/abs/html/special-chars.html)
- [Escaping](https://tldp.org/LDP/abs/html/escapingsection.html)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](../sql-server/sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../sql-server/sql-server-docs-contribute.md).
