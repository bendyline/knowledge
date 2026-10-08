---
title: "sys.sp_helpreplicationoption (Transact-SQL)"
description: sp_helpreplicationoption shows the types of replication options enabled for a server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_helpreplicationoption"
  - "sp_helpreplicationoption_TSQL"
helpviewer_keywords:
  - "sp_helpreplicationoption"
dev_langs:
  - "TSQL"
---
# sys.sp_helpreplicationoption (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Shows the types of replication options enabled for a server. This stored procedure is executed at any server on any database.



## Syntax

```syntaxsql
sys.sp_helpreplicationoption [ [ @optname = ] N'optname' ]
[ ; ]
```

## Arguments

#### [ @optname = ] N'*optname*'

The name of the replication option to query for. *@optname* is **sysname**, with a default of `NULL`.

| Value | Description |
| --- | --- |
| `transactional` | A result set is returned when transactional replication is enabled. |
| `merge` | A result set is returned when merge replication is enabled. |
| `NULL` (default) | A result set isn't returned. |

## Result set

| Column name | Data type | Description |
| --- | --- | --- |
| `optname` | **sysname** | Name of the replication option and can be one of the following values:<br /><br />`transactional`<br />`merge` |
| `value` | **bit** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `major_version` | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `minor_version` | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `revision` | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `install_failures` | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_helpreplicationoption` is used to get information about replication options enabled on a particular server. To get information on a particular database, use `sp_helpreplicationdboption`.

## Permissions

Execute permissions default to the **public** role.

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
