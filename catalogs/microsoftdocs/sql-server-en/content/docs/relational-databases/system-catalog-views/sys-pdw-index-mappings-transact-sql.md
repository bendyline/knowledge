---
title: "sys.pdw_index_mappings (Transact-SQL)"
description: sys.pdw_index_mappings (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: data-warehouse
ms.topic: "reference"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---
# sys.pdw_index_mappings (Transact-SQL)

**Applies to:**
 


 


  Maps the logical indexes to the physical name used on Compute nodes as reflected by a unique combination of **object_id** of the table holding the index and the **index_id** of a particular index within that table.  
  
| Column Name | Data Type | Description | Range |
| --- | --- | --- | --- |
| object_id | **int** | The object ID for the logical table on which this index exists. See [sys.objects (Transact-SQL)](sys-objects-transact-sql.md).<br /><br /> **physical_name** and **object_id** form the key for this view. |  |
| index_id | **nvarchar(32)** | The ID for the index. See [sys.indexes (Transact-SQL)](sys-indexes-transact-sql.md). |  |
| physical_name | **nvarchar(36)** | The name of the index in the databases on the Compute nodes.<br /><br /> **physical_name** and **object_id** form the key for this view. |  |
  
## Related content

- [Azure Synapse Analytics catalog views](azure-synapse-analytics-catalog-views.md)
- [sys.pdw_table_mappings (Transact-SQL)](sys-pdw-table-mappings-transact-sql.md)
- [sys.pdw_permanent_table_mappings (Transact-SQL)](sys-pdw-permanent-table-mappings-transact-sql.md)
- [sys.pdw_database_mappings (Transact-SQL)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/sys-pdw-database-mappings-transact-sql.md)
