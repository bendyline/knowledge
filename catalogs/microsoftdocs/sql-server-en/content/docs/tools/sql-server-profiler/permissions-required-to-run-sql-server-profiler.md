---
title: Permissions Required
titleSuffix: SQL Server Profiler
description: Find out which permissions you need to run SQL Server Profiler and replay traces, and learn which checks are performed during replays.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/05/2025
ms.service: sql
ms.subservice: profiler
ms.topic: concept-article
ms.collection:
  - data-tools
---

# Permissions required to run SQL Server Profiler


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





By default, running  SQL Server Profiler 
 requires the same user permissions as the Transact-SQL stored procedures that are used to create traces. To run  SQL Server Profiler 
, users must be granted the `ALTER TRACE` permission. For more information, see [GRANT Server Permissions](../../t-sql/statements/grant-server-permissions-transact-sql.md).

> **Note:**  
> SQL Trace and  SQL Server Profiler 
 are deprecated. The `Microsoft.SqlServer.Management.Trace` namespace that contains the Microsoft SQL Server Trace and Replay objects is also deprecated.
>
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 
>
> Use Extended Events instead. For more information on [Extended Events overview](../../relational-databases/extended-events/extended-events.md), see [Quickstart: Extended Events](../../relational-databases/extended-events/quick-start-extended-events-in-sql-server.md) and [Use the SSMS XEvent Profiler](../../relational-databases/extended-events/use-the-ssms-xe-profiler.md).

## Remarks

- Query plans and query text, captured by SQL Trace as well as by other means, for example, dynamic management views (DMVs), dynamic management functions (DMFs), and Extended Events, can contain sensitive information. Therefore, the permissions `ALTER TRACE`, `SHOWPLAN`, and the covering permission `VIEW SERVER STATE` should be granted to only users who need these permissions to fulfill their job functions, based on the principle of least privilege.

  Additionally, we recommend that you only save Showplan files or trace files that contain Showplan-related events to a location that uses the NTFS file system and restrict access to users who are authorized to view potentially sensitive information.

-  SQL Server Profiler 
 for Analysis Services workloads are supported.

- When you try to connect to an Azure SQL Database from  SQL Server Profiler 
, it incorrectly throws a misleading error message:

  ```output
  In order to run a trace against SQL Server, you must be a member of **sysadmin** fixed server role or have the ALTER TRACE permission.
  ```

  The message should state that Azure SQL Database isn't supported by  SQL Server Profiler 
.

## Permissions used to replay traces

Replaying traces also requires that the user who is replaying the trace have the `ALTER TRACE` permission.

However, during replay,  SQL Server Profiler 
 uses the `EXECUTE AS` command if an Audit Login event is encountered in the trace that is being replayed.  SQL Server Profiler 
 uses the `EXECUTE AS` command to impersonate the user who is associated with the login event.

If  SQL Server Profiler 
 encounters a login event in a trace that is being replayed, the following permission checks are performed:

1. `User1`, who has the `ALTER TRACE` permission, starts replaying a trace.

1. A login event for `User2` is encountered in the replayed trace.

1.  SQL Server Profiler 
 uses the `EXECUTE AS` command to impersonate `User2`.

1.  SQL Server 
 attempts to authenticate `User2`, and depending on the results, one of the following occurs:

    1. If `User2` can't be authenticated,  SQL Server Profiler 
 returns an error, and continues replaying the trace as `User1`.

    1. If `User2` is successfully authenticated, replaying the trace as `User2` continues.

1. Permissions for `User2` are checked on the target database, and depending on the results, one of the following scenarios occurs:

    1. If `User2` has permissions on the target database, impersonation has succeeded, and the trace is replayed as `User2`.

    1. If `User2` doesn't have permissions on the target database, the server checks for a `Guest` user on that database.

1. Existence of a `Guest` user is checked on the target database, and depending on the results, one of the following occurs:

    1. If a `Guest` account exists, the trace is replayed as the `Guest` account.

    1. If no `Guest` account exists on the target database, an error is returned and the trace is replayed as `User1`.

The following diagram shows this process of checking permission when replaying traces:

Screenshot of SQL Server Profiler replay trace permissions.

## Related content

- [SQL Server Profiler stored procedures (Transact-SQL)](../../relational-databases/system-stored-procedures/sql-server-profiler-stored-procedures-transact-sql.md)
- [Replay Traces](replay-traces.md)
- [Create a trace (SQL Server Profiler)](create-a-trace-sql-server-profiler.md)
- [Replay a trace table (SQL Server Profiler)](replay-a-trace-table-sql-server-profiler.md)
- [Replay a trace file (SQL Server Profiler)](replay-a-trace-file-sql-server-profiler.md)
