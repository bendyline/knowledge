---
title: "sp_dbmmonitorhelpmonitoring (Transact-SQL)"
description: sp_dbmmonitorhelpmonitoring returns the current update period.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_dbmmonitorhelpmonitoring"
  - "sp_dbmmonitorhelpmonitoring_TSQL"
helpviewer_keywords:
  - "sp_dbmmonitorhelpmonitoring"
  - "database mirroring [SQL Server], monitoring"
dev_langs:
  - "TSQL"
---
# sp_dbmmonitorhelpmonitoring (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns the current update period.



## Syntax

```syntaxsql
sp_dbmmonitorhelpmonitoring
[ ; ]
```

## Arguments

None.

## Return code values

None.

## Result set

Returns the current update period, that is, the number of minutes between updates of database mirroring status table. This value ranges from 1 to 120 minutes.

## Permissions

Requires membership in the **sysadmin** fixed server role, or execute permission directly on this stored procedure.

## Examples

The following example returns the current update period.

```sql
EXECUTE sp_dbmmonitorhelpmonitoring;
```

## Related content

- [Monitoring Database Mirroring (SQL Server)](../../database-engine/database-mirroring/monitoring-database-mirroring-sql-server.md)
- [sys.sp_dbmmonitorresults (Transact-SQL)](sp-dbmmonitorresults-transact-sql.md)
