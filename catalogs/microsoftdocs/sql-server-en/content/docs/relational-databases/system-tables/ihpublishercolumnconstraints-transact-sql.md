---
title: "IHpublishercolumnconstraints (Transact-SQL)"
description: IHpublishercolumnconstraints (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "IHpublishercolumnconstraints"
  - "IHpublishercolumnconstraints_TSQL"
helpviewer_keywords:
  - "IHpublishercolumnconstraints system table"
dev_langs:
  - "TSQL"
---
# IHpublishercolumnconstraints (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  The **IHpublishercolumnconstraints** system table maps columns of a non-SQL Server publication in the [IHpublishercolumns](ihpublishercolumns-transact-sql.md) system table to constraints in the [IHpublisherconstraints](ihpublisherconstraints-transact-sql.md) system table. This table is stored in the distribution database.  
  
## Definition  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **publishercolumn_id** | **int** | Identifies the column from [IHpublishercolumns](ihpublishercolumns-transact-sql.md) with an associated constraint. |
| **publisherconstraint_id** | **int** | Identifies a constraint from [IHpublisherconstraints](ihpublisherconstraints-transact-sql.md) associated with the column. |
| **indid** | **int** | Indicates position of the column in the published table. |
  
## Related content

- [Heterogeneous Database Replication](../replication/non-sql/heterogeneous-database-replication.md)
- [Replication Tables (Transact-SQL)](replication-tables-transact-sql.md)
- [Replication Views (Transact-SQL)](../system-views/replication-views-transact-sql.md)
