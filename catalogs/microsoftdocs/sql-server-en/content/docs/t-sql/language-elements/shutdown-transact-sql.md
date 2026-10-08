---
title: "SHUTDOWN (Transact-SQL)"
description: SHUTDOWN immediately stops SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.date: 01/16/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "SHUTDOWN_TSQL"
  - "SHUTDOWN"
helpviewer_keywords:
  - "SQL Server, stopping"
  - "shutting down SQL Server"
  - "SHUTDOWN statement"
  - "stopping SQL Server"
  - "immediately stopping SQL Server"
dev_langs:
  - "TSQL"
---
# SHUTDOWN (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Immediately stops SQL Server.



## Syntax

```syntaxsql
SHUTDOWN [ WITH NOWAIT ]
```

## Arguments

#### WITH NOWAIT

Optional. Shuts down  SQL Server 
 without performing checkpoints in every database.  SQL Server 
 exits after attempting to terminate all user processes. When the server restarts, a rollback operation occurs for incomplete transactions.

## Remarks

Unless the `WITH NOWAIT` option is used, `SHUTDOWN` shuts down  SQL Server 
 by:

1. Disabling logins (except for members of the **sysadmin** and **serveradmin** fixed server roles).

   > **Note:**  
   > To display a list of all current users, run `sp_who`.

1. Waiting for currently running Transact-SQL statements or stored procedures to finish. To display a list of all active processes and locks, run `sp_who` and `sp_lock`, respectively.

1. Inserting a checkpoint in every database.

Using the `SHUTDOWN` statement minimizes the amount of automatic recovery work needed when members of the **sysadmin** fixed server role restart  SQL Server 
.

Other tools and methods can also be used to stop  SQL Server 
. Each of these issues a checkpoint in all databases. You can flush committed data from the data cache and stop the server:

- By using  SQL Server 
 Configuration Manager.

- By running `net stop mssqlserver` from a command prompt for a default instance, or by running `net stop mssql$<instancename>` from a command prompt for a named instance.

- By using Services in Control Panel.

If `sqlservr.exe` was started from the command prompt, pressing **Ctrl**+**C** shuts down  SQL Server 
. However, pressing **Ctrl**+**C** doesn't insert a checkpoint.

> **Note:**  
> Using any of these methods to stop  SQL Server 
 sends the `SERVICE_CONTROL_STOP` message to  SQL Server 
.

## Permissions

`SHUTDOWN` permissions are assigned to members of the **sysadmin** and **serveradmin** fixed server roles, and they aren't transferable.

## Related content

- [CHECKPOINT (Transact-SQL)](checkpoint-transact-sql.md)
- [sys.sp_lock (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-lock-transact-sql.md)
- [sys.sp_who (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-who-transact-sql.md)
- [sqlservr application](../../tools/sqlservr-application.md)
- [Start, stop, pause, resume, and restart SQL Server services](../../database-engine/configure-windows/start-stop-pause-resume-restart-sql-server-services.md)
