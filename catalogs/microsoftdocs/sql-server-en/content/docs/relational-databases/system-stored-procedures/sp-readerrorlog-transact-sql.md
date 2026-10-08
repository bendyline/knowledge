---
title: "sys.sp_readerrorlog (Transact-SQL)"
description: sp_readerrorlog allows you to read the contents of the SQL Server or SQL Server Agent error log file and filter on keywords.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_readerrorlog_TSQL"
  - "sp_readerrorlog"
helpviewer_keywords:
  - "sp_readerrorlog"
dev_langs:
  - "TSQL"
---
# sys.sp_readerrorlog (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Allows you to read the contents of the SQL Server or SQL Server Agent error log file and filter on keywords.



## Syntax

```syntaxsql
sys.sp_readerrorlog
    [ [ @p1 = ] p1 ]
    [ , [ @p2 = ] p2 ]
    [ , [ @p3 = ] N'p3' ]
    [ , [ @p4 = ] N'p4' ]
[ ; ]
```

## Arguments

#### [ @p1 = ] *p1*

The integer value of the log you want to view. *@p1* is **int**, with a default of `0`. The current error log has a value of `0`. The previous is `1` (`ERRORLOG.1`), the one before previous is 2 (`ERRORLOG.2`), and so on.

#### [ @p2 = ] *p2*

The integer value for the product whose log you want to view. *@p2* is **int**, with a default of `NULL`. Use `1` for SQL Server or `2` SQL Server Agent. If a value isn't specified, the SQL Server product is used.

#### [ @p3 = ] N'*p3*'

The string value for a string you want to filter on when viewing the error log. *@p3* is **nvarchar(4000)**, with a default of `NULL`.

#### [ @p4 = ] N'*p4*'

The string value for an extra string you want to filter on to further refine the search when viewing the error log. *@p4* is **nvarchar(4000)**, with a default of `NULL`. This parameter provides an extra filter to the first string search *@p3*.

## Return code values

None.

## Result set

Displays the content of the requested error log. If filter strings are used, only the lines that match those strings are displayed.

## Remarks

Every time  SQL Server 
 is started, the current error log is renamed to `ERRORLOG.1`; `ERRORLOG.1` becomes `ERRORLOG.2`, `ERRORLOG.2` becomes `ERRORLOG.3`, and so on. `sp_readerrorlog` enables you to read any of these error log files as long as the files exist.

## Permissions

 SQL Server 2019 (15.x) 
 and earlier versions require VIEW SERVER STATE permission on the server.

 SQL Server 2022 (16.x) 
 and later versions require either `VIEW ANY ERROR LOG` or `VIEW SERVER PERFORMANCE STATE` permission on the server.

## Examples

The following example cycles the  SQL Server 
 error log.

### A. Read the current SQL Server error log

```sql
EXECUTE sp_readerrorlog;
```

### B. Show the previous SQL Server Agent error log

```sql
EXECUTE sp_readerrorlog 1, 2;
```

### C. Find log messages that indicate a database is starting up

```sql
EXECUTE sp_readerrorlog 0, 1, 'database', 'start';
```

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [sp_cycle_errorlog (Transact-SQL)](sp-cycle-errorlog-transact-sql.md)
- [sp_cycle_agent_errorlog (Transact-SQL)](sp-cycle-agent-errorlog-transact-sql.md)
