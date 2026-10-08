---
title: "sys.syscomments (Transact-SQL)"
description: "sys.syscomments (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.syscomments_TSQL"
  - "syscomments"
  - "syscomments_TSQL"
  - "sys.syscomments"
helpviewer_keywords:
  - "sys.syscomments compatibility view"
  - "syscomments system table"
dev_langs:
  - "TSQL"
---
# sys.syscomments (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains entries for each view, rule, default, trigger, CHECK constraint, DEFAULT constraint, and stored procedure within the database. The **text** column contains the original SQL definition statements.  
  
> **Important:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  We recommend that you use sys.sql_modules instead. For more information, see [sys.sql_modules (Transact-SQL)](../system-catalog-views/sys-sql-modules-transact-sql.md).  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **id** | **int** | Object ID to which this text applies. |
| **number** | **smallint** | Number within procedure grouping, if grouped.<br /><br /> 0 = Entries are not procedures. |
| **colid** | **smallint** | Row sequence number for object definitions that are longer than 4,000 characters. |
| **status** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **ctext** | **varbinary(8000)** | The raw bytes of the SQL definition statement. |
| **texttype** | **smallint** | 0 = User-supplied comment<br /><br /> 1 = System-supplied comment<br /><br /> 4 = Encrypted comment |
| **language** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **encrypted** | **bit** | Indicates whether the procedure definition is obfuscated.<br /><br /> 0 = Not obfuscated<br /><br /> 1 = Obfuscated<br /><br /> **\*\* Important \*\*** To obfuscate stored procedure definitions, use CREATE PROCEDURE with the ENCRYPTION keyword. |
| **compressed** | **bit** | Always returns 0. This indicates that the procedure is compressed. |
| **text** | **nvarchar(4000)** | Actual text of the SQL definition statement.<br /><br /> The semantics of the decoded expression are equivalent to the original text; however, there are no syntactic guarantees. For example, white spaces are removed from the decoded expression.<br /><br /> This  SQL Server 2000 (8.x) |
| -compatible view obtains information from current  SQL Server |
 | structures and can return more characters than the **nvarchar(4000)** definition. **sp_help** returns **nvarchar(4000)** as the data type of the text column. When working with **syscomments** consider using **nvarchar(max)**. For new development work, do not use **syscomments**. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
