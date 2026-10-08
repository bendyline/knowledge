---
title: "sp_monitor (Transact-SQL)"
description: sp_monitor displays statistics about SQL Server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_monitor_TSQL"
  - "sp_monitor"
helpviewer_keywords:
  - "sp_monitor"
dev_langs:
  - "TSQL"
---
# sp_monitor (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Displays statistics about  SQL Server 
.



## Syntax

```syntaxsql
sp_monitor
[ ; ]
```

## Arguments

None.

## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Description |
| --- | --- |
| `last_run` | Time `sp_monitor` was last run. |
| `current_run` | Time `sp_monitor` is being run. |
| `seconds` | Number of elapsed seconds since `sp_monitor` was run. |
| `cpu_busy` | Number of seconds that the server computer's CPU has done  SQL Server |
 | work. |
| `io_busy` | Number of seconds that  SQL Server |
 | spent doing input and output operations. |
| `idle` | Number of seconds that  SQL Server |
 | was idle. |
| `packets_received` | Number of input packets read by  SQL Server |
| . |
| `packets_sent` | Number of output packets written by  SQL Server |
| . |
| `packet_errors` | Number of errors encountered by  SQL Server |
 | while reading and writing packets. |
| `total_read` | Number of reads by  SQL Server |
| . |
| `total_write` | Number of writes by  SQL Server |
| . |
| `total_errors` | Number of errors encountered by  SQL Server |
 | while reading and writing. |
| `connections` | Number of logins or attempted logins to  SQL Server |
| . |

## Remarks

 SQL Server 
 keeps track, through a series of functions, of how much work was done. Executing `sp_monitor` displays the current values returned by these functions and shows how much they have changed since the last time the procedure was run.

For each column, the statistic is printed in the form *number*(*number*)-*number*% or *number*(*number*). The first *number* refers to the number of seconds (for `cpu_busy`, `io_busy`, and `idle`) or the total number (for the other variables) since  SQL Server 
 was restarted. The *number* in parentheses refers to the number of seconds or total number since the last time `sp_monitor` was run. The percentage is the percentage of time since `sp_monitor` was last run. For example, if the report shows `cpu_busy` as `4250(215)-68%`, the CPU was busy 4,250 seconds since  SQL Server 
 was last started up, 215 seconds since `sp_monitor` was last run, and 68 percent of the total time since `sp_monitor` was last run.

## Permissions

Requires membership in the **sysadmin** fixed server role, or execute permission directly on this stored procedure.

## Examples

The following example reports information about how busy  SQL Server 
 has been.

```sql
USE master;
GO

EXECUTE sp_monitor;
```

 Here's the result set. 


```output
last_run                   current_run                seconds
-----------------------    -----------------------    ---------
2024-05-01 15:27:51.287    2024-08-21 17:20:34.097    9683563

cpu_busy           io_busy         idle
---------------    -------------   --------------------
14452(14451)-0%    2555(2554)-0%   4371742(4371629)-45%

packets_received       packets_sent    packet_errors
----------------       ------------    -------------
18032(17993)           64572(64533)    0(0)

total_read     total_write   total_errors    connections
-----------    -----------   -------------   --------------
1593(1593)     4687(4687)    0(0)            155625(155557)
```

## Related content

- [sys.sp_who (Transact-SQL)](sp-who-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
