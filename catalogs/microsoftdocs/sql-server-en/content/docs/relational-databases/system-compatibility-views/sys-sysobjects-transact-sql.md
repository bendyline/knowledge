---
title: "sys.sysobjects (Transact-SQL)"
description: "Contains one row for each object that is created within a database, such as a constraint, default, log, rule, and stored procedure."
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 09/10/2022
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sysobjects_TSQL"
  - "sysobjects"
  - "sysobjects_TSQL"
  - "sys.sysobjects"
helpviewer_keywords:
  - "sys.sysobjects compatibility view"
  - "sysobjects system table"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric"
---
# sys.sysobjects (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Contains one row for each object that is created within a database, such as a constraint, default, log, rule, and stored procedure.

> **Important:**  
>   This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   


| Column name | Data type | Description |
| --- | --- | --- |
| name | **sysname** | Object name |
| id | **int** | Object identification number |
| xtype | **char(2)** | Object type. Can be one of the following object types:<br /><br />AF = Aggregate function (CLR)<br />C = CHECK constraint<br />D = Default or DEFAULT constraint<br />F = FOREIGN KEY constraint<br />L = Log<br />FN = Scalar function<br />FS = Assembly (CLR) scalar-function<br />FT = Assembly (CLR) table-valued function<br />IF = In-lined table-function<br />IT = Internal table<br />P = Stored procedure<br />PC = Assembly (CLR) stored-procedure<br />PK = PRIMARY KEY constraint (type is K)<br />RF = Replication filter stored procedure<br />S = System table<br />SN = Synonym<br />SO = Sequence<br />SQ = Service queue<br />TA = Assembly (CLR) DML trigger<br />TF = Table function<br />TR = SQL DML Trigger<br />TT = Table type<br />U = User table<br />UQ = UNIQUE constraint (type is K)<br />V = View<br />X = Extended stored procedure |
| uid | **smallint** | Schema ID of the owner of the object. For databases upgraded from an earlier version of  SQL Server |
| , the schema ID is equal to the user ID of the owner. Overflows or returns NULL if the number of users and roles exceeds 32,767.<br /><br />**Important:** If you use any of the following  SQL Server |
 | DDL statements, you must use the [sys.objects](../system-catalog-views/sys-objects-transact-sql.md) catalog view instead of `sys.sysobjects`.<br /><br />CREATE \| ALTER \| DROP USER<br /><br />CREATE \| ALTER \| DROP ROLE<br /><br />CREATE \| ALTER \| DROP APPLICATION ROLE<br /><br />CREATE SCHEMA<br /><br />ALTER AUTHORIZATION ON OBJECT |
| info | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| status | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| base_schema_ver | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| replinfo | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| parent_obj | **int** | Object identification number of the parent object. For example, the table ID if it is a trigger or constraint. |
| crdate | **datetime** | Date the object was created. |
| ftcatid | **smallint** | Identifier of the full-text catalog for all user tables registered for full-text indexing, and 0 for all user tables that are not registered. |
| schema_ver | **int** | Version number that is incremented every time the schema for a table changes. Always returns 0. |
| stats_schema_ver | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| type | **char(2)** | Object type. Can be one of the following values:<br /><br />AF = Aggregate function (CLR)<br />C = CHECK constraint<br />D = Default or DEFAULT constraint<br />F = FOREIGN KEY constraint<br />FN = Scalar function<br />FS = Assembly (CLR) scalar-function<br />FT = Assembly (CLR) table-valued functionIF = In-lined table-function<br />IT - Internal table<br />K = PRIMARY KEY or UNIQUE constraint<br />L = Log<br />P = Stored procedure<br />PC = Assembly (CLR) stored-procedure<br />R = Rule<br />RF = Replication filter stored procedure<br />S = System table<br />SN = Synonym<br />SQ = Service queue<br />TA = Assembly (CLR) DML trigger<br />TF = Table function<br />TR = SQL DML Trigger<br />TT = Table type<br />U = User table<br />V = View<br />X = Extended stored procedure |
| userstat | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| sysstat | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| indexdel | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| refdate | **datetime** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| version | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| deltrig | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| instrig | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| updtrig | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| seltrig | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| category | **int** | Used for publication, constraints, and identity. |
| cache | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |

## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
