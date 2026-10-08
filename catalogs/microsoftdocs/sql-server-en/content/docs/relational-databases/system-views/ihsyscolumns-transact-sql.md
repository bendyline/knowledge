---
title: "IHsyscolumns (Transact-SQL)"
description: "IHsyscolumns (Transact-SQL)"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "IHsyscolumns"
  - "IHsyscolumns_TSQL"
helpviewer_keywords:
  - "IHsyscolumns view"
dev_langs:
  - "TSQL"
---
# IHsyscolumns (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  The **IHsyscolumns** view exposes column information for articles published from a non-SQL Server Publisher. This view is stored in the distributiondatabase.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | The name of the column or procedure parameter. |
| **id** | **int** | The object ID of the table to which this column belongs, or the ID of the stored procedure with which this parameter is associated. |
| **xtype** | **tinyint** | The physical storage type from [sys.systypes (Transact-SQL)](../system-compatibility-views/sys-systypes-transact-sql.md). |
| **typestat** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **xusertype** | **tinyint** | The ID of extended user-defined data type. |
| **length** | **bigint** | The maximum physical storage length from [sys.systypes (Transact-SQL)](../system-compatibility-views/sys-systypes-transact-sql.md). |
| **xprec** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **xscale** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **colid** | **int** | The column or parameter ID. |
| **xoffset** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **bitpos** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **reserved** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **colstat** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **cdefault** | **int** | The ID of the default for this column. |
| **domain** | **int** | The ID of the rule or CHECK constraint for this column. |
| **number** | **int** | The Subprocedure number when the procedure is grouped (**0** for nonprocedure entries). |
| **colorder** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **autoval** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **offset** | **int** | The offset into the row in which this column appears. |
| **collationid** | **int** | The ID of the collation of the column. NULL for non-character based columns. |
| **language** | **int** | The language identifier for the column. |
| **status** | **int** | The bitmap used to describe a property of the column or the parameter:<br /><br /> **0x08** = Column allows null values.<br /><br /> **0x10** = ANSI padding was in effect when **varchar** or **varbinary** columns were added. Trailing blanks are preserved for **varchar** and trailing zeros are preserved for **varbinary** columns.<br /><br /> **0x40** = Parameter is an OUTPUT parameter.<br /><br /> **0x80** = Column is an identity column. |
| **type** | **int** | The physical storage type from [sys.systypes (Transact-SQL)](../system-compatibility-views/sys-systypes-transact-sql.md). |
| **usertype** | **tinyint** | The ID of user-defined data type from [sys.systypes (Transact-SQL)](../system-compatibility-views/sys-systypes-transact-sql.md). |
| **printfmt** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **prec** | **int** | The level of precision for this column. |
| **scale** | **int** | The scale for this column. |
| **iscomputed** | **int** | The flag indicating whether the column is computed:<br /><br /> **0** = Noncomputed.<br /><br /> **1** = Computed. |
| **isoutparam** | **int** | Indicates whether the procedure parameter is an output parameter:<br /><br /> **1** = True.<br /><br /> **0** = False. |
| **isnullable** | **int** | Indicates whether the column allows null values:<br /><br /> **1** = True.<br /><br /> **0** = False. |
| **collation** | **int** | The name of the collation of the column. NULL for non-character based columns. |
| **tdscollation** | **int** | The name of the collation of the column when returned in a tabular data stream (TDS). |
  
## Related content

- [Heterogeneous Database Replication](../replication/non-sql/heterogeneous-database-replication.md)
- [Replication Tables (Transact-SQL)](../system-tables/replication-tables-transact-sql.md)
- [Replication Views (Transact-SQL)](replication-views-transact-sql.md)
- [sys.columns (Transact-SQL)](../system-catalog-views/sys-columns-transact-sql.md)
