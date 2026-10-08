---
title: "sys.system_views (Transact-SQL)"
description: sys.system_views (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.system_views_TSQL"
  - "system_views"
  - "system_views_TSQL"
  - "sys.system_views"
helpviewer_keywords:
  - "sys.system_views catalog view"
dev_langs:
  - "TSQL"
---
# sys.system_views (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Contains one row for each system view that is shipped with  SQL Server 
. All system views are contained in the schemas named **sys** or **INFORMATION_SCHEMA**.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| \<inherited columns> |  | For a list of columns that this view inherits, see [sys.objects (Transact-SQL)](sys-objects-transact-sql.md). |
| **is_replicated** | **bit** | 1 = View is replicated. |
| **has_replication_filter** | **bit** | 1 = View has a replication filter. |
| **has_opaque_metadata** | **bit** | 1 = VIEW_METADATA option specified for view. For more information, see [CREATE VIEW &#40;Transact-SQL&#41;](../../t-sql/statements/create-view-transact-sql.md). |
| **has_unchecked_assembly_data** | **bit** | 1 = Table contains persisted data that depends on an assembly whose definition changed during the last ALTER ASSEMBLY. Will be reset to 0 after the next successful DBCC CHECKDB or DBCC CHECKTABLE. |
| **with_check_option** | **bit** | 1 = WITH CHECK OPTION was specified in the view definition. |
| **is_date_correlation_view** | **bit** | 1 = View was created automatically by the system to store correlation information between **datetime** columns. Creation of this view was enabled by setting DATE_CORRELATION_OPTIMIZATION to ON. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [DBCC CHECKDB (Transact-SQL)](../../t-sql/database-console-commands/dbcc-checkdb-transact-sql.md)
- [DBCC CHECKTABLE (Transact-SQL)](../../t-sql/database-console-commands/dbcc-checktable-transact-sql.md)
- [ALTER ASSEMBLY (Transact-SQL)](../../t-sql/statements/alter-assembly-transact-sql.md)
