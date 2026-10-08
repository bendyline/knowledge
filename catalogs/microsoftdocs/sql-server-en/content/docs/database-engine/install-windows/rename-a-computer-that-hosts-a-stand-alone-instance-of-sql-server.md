---
title: "Rename a Computer That Hosts a Stand-Alone Instance of SQL Server"
description: When you rename a computer that hosts an instance of SQL Server, update the system metadata stored in sys.servers.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: how-to
helpviewer_keywords:
  - "remote login errors [SQL Server]"
  - "standalone computer names [SQL Server]"
  - "names [SQL Server], standalone instances of SQL Server"
  - "renaming standalone instances of SQL Server"
  - "sysservers system table"
  - "removing remote logins"
  - "deleting remote logins"
  - "dropping remote logins"
monikerRange: ">=sql-server-2017"
---
# Rename a computer that hosts a stand-alone instance of SQL Server


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


When you change the name of the computer that is running  SQL Server 
, the new name is recognized during  SQL Server 
 startup. You don't have to run Setup again to reset the computer name. Instead, use the following steps to update system metadata that is stored in `sys.servers` and reported by the system function `@@SERVERNAME`. Update system metadata to reflect computer name changes for remote connections and applications that use `@@SERVERNAME`, or that query the server name from `sys.servers`.

The following steps can't be used to rename an instance of  SQL Server 
. They can be used only to rename the part of the instance name that corresponds to the computer name. For example, you can change a computer named `MB1` that hosts an instance of  SQL Server 
 named `Instance1` to another name, such as `MB2`. However, the instance part of the name, `Instance1`, remains unchanged. In this example, the `\\<ComputerName>\<InstanceName>` would be changed from `\\MB1\Instance1` to `\\MB2\Instance1`.

## Prerequisites

Before you begin the renaming process, review the following information:

- When an instance of  SQL Server 
 is part of a  SQL Server 
 failover cluster, the computer renaming process differs from a computer that hosts a stand-alone instance. For more information, see [Rename a SQL Server Failover Cluster Instance](../../sql-server/failover-clusters/install/rename-a-sql-server-failover-cluster-instance.md).

-  SQL Server 
 doesn't support renaming computers that are involved in replication, except when you use log shipping with replication. The secondary computer in log shipping can be renamed if the primary computer is permanently lost. For more information, see [Log Shipping and Replication (SQL Server)](../log-shipping/log-shipping-and-replication-sql-server.md).

- When you rename a computer that is configured to use  Reporting Services 
,  Reporting Services 
 might not be available after the computer name change. For more information, see [Rename a report server computer](../../reporting-services/report-server/rename-a-report-server-computer.md).

- When you rename a computer that is configured to use database mirroring, you must turn off database mirroring before the renaming operation. Then, re-establish database mirroring with the new computer name. Metadata for database mirroring isn't updated automatically to reflect the new computer name. Use the following steps to update system metadata.

- Users who connect to  SQL Server 
 through a Windows group that uses a hard-coded reference to the computer name might not be able to connect to  SQL Server 
. This issue can occur after the rename if the Windows group specifies the old computer name. To ensure that such Windows groups have  SQL Server 
 connectivity following the renaming operation, update the Windows group to specify the new computer name.

You can connect to  SQL Server 
 by using the new computer name after you restart  SQL Server 
. To ensure that `@@SERVERNAME` returns the updated name of the local server instance, you should manually run the following procedure that applies to your scenario. The procedure you use depends on whether you're updating a computer that hosts a default or named instance of  SQL Server 
.

## Rename a computer that hosts a stand-alone instance of SQL Server

- For a renamed computer that hosts a default instance of  SQL Server 
, run the following procedures:

  ```sql
  EXECUTE sp_dropserver '<old_name>';
  GO

  EXECUTE sp_addserver '<new_name>', local;
  GO
  ```

  Restart the instance of  SQL Server 
.

- For a renamed computer that hosts a named instance of  SQL Server 
, run the following procedures:

  ```sql
  EXECUTE sp_dropserver '<old_name\instancename>';
  GO

  EXECUTE sp_addserver '<new_name\instancename>', local;
  GO
  ```

  Restart the instance of  SQL Server 
.

## After the rename operation

After a computer is renamed, any connections that used the old computer name must connect by using the new name.

## Verify rename operation

- Select information from either `@@SERVERNAME` or `sys.servers`. The `@@SERVERNAME` function returns the new name, and the `sys.servers` table shows the new name. The following example shows the use of `@@SERVERNAME`.

  ```sql
  SELECT @@SERVERNAME AS 'Server Name';
  ```

## Additional considerations

### Remote logins

If the computer has any remote logins, running `sp_dropserver` might generate an error similar to the following output:

```output
Server: Msg 15190, Level 16, State 1, Procedure sp_dropserver, Line 44 There are still remote logins for the server 'SERVER1'.
```

To resolve the error, you must drop remote logins for this server.

- For a default instance, run the following procedure:

  ```sql
  EXECUTE sp_dropremotelogin old_name;
  GO
  ```

- For a named instance, run the following procedure:

  ```sql
  EXEC sp_dropremotelogin old_name\instancename;
  GO
  ```

### Linked server configurations

The computer renaming operation affects linked server configurations. Use `sp_addlinkedserver` or `sp_setnetname` to update computer name references. For more information, see the [sp_addlinkedserver](../../relational-databases/system-stored-procedures/sp-addlinkedserver-transact-sql.md) or [sp_setnetname](../../relational-databases/system-stored-procedures/sp-setnetname-transact-sql.md).

### Client alias names

The computer renaming operation affects client aliases that use named pipes. For example, if an alias `PROD_SRVR` was created to point to `SRVR1` and uses the named pipes protocol, the pipe name looks like `\\SRVR1\pipe\sql\query`. After the computer is renamed, the path of the named pipe will no longer be valid. For more information about named pipes, see the [Creating a Valid Connection String Using Named Pipes](https://learn.microsoft.com/previous-versions/sql/sql-server-2008/ms189307\(v=sql.100\)).

## Related content

- [SQL Server installation guide](install-sql-server.md)
