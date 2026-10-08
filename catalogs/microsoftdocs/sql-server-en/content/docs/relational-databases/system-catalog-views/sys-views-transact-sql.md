---
title: sys.views (Transact-SQL)
description: sys.views (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "05/24/2022"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.views_TSQL"
  - "sys.views"
helpviewer_keywords:
  - "sys.views catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---

# sys.views (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains a row for each view object, with **sys.objects.type** = V.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **\<inherited columns>** |  | For a list of columns that this view inherits, see [sys.objects (Transact-SQL)](sys-objects-transact-sql.md) |
| **is_replicated** | **bit** | 1 = View is replicated. |
| **has_replication_filter** | **bit** | 1 = View has a replication filter. |
| **has_opaque_metadata** | **bit** | 1 = VIEW_METADATA option specified for view. For more information, see [CREATE VIEW &#40;Transact-SQL&#41;](../../t-sql/statements/create-view-transact-sql.md). |
| **has_unchecked_assembly_data** | **bit** | 1 = View contains persisted data that depends on an assembly whose definition changed during the last ALTER ASSEMBLY. Resets to 0 after the next successful DBCC CHECKDB or DBCC CHECKTABLE. |
| **with_check_option** | **bit** | 1 = WITH CHECK OPTION was specified in the view definition. |
| **is_date_correlation_view** | **bit** | 1 = View was created automatically by the system to store correlation information between datetime columns. Creation of this view was enabled by setting DATE_CORRELATION_OPTIMIZATION to ON. |
| **ledger_view_type** | **tinyint** | **Applies to**: Starting with  SQL Server 2022 (16.x) |
| ,  Azure SQL Database |
| . <br/><br/>The numeric value indicating if a view is a ledger view for an updatable ledger table.<br/><br/>0 = NON_LEDGER_VIEW<br/>1 = LEDGER_VIEW<br /><br />For more information on database ledger, see [Ledger](https://learn.microsoft.com/azure/azure-sql/database/ledger-overview). |
| **ledger_view_type_desc** | **nvarchar(60)** | **Applies to**: Starting with  SQL Server 2022 (16.x) |
| ,  Azure SQL Database |
| . <br/><br/>The text description of a value in the ledger_view_type column:<br/><br/>NON_LEDGER_VIEW<br/>LEDGER_VIEW |
| **is_dropped_ledger_view** | **bit** | **Applies to**: Starting with  SQL Server 2022 (16.x) |
| ,  Azure SQL Database |
| . <br/><br/>Indicates a ledger view that has been dropped. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [ALTER ASSEMBLY (Transact-SQL)](../../t-sql/statements/alter-assembly-transact-sql.md)
- [DBCC CHECKDB (Transact-SQL)](../../t-sql/database-console-commands/dbcc-checkdb-transact-sql.md)
- [DBCC CHECKTABLE (Transact-SQL)](../../t-sql/database-console-commands/dbcc-checktable-transact-sql.md)
- [Querying the SQL Server System Catalog FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/querying-the-sql-server-system-catalog-faq.yml)
