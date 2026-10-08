---
title: "sys.pdw_table_mappings (Transact-SQL)"
description: sys.pdw_table_mappings (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "06/01/2018"
ms.service: sql
ms.subservice: data-warehouse
ms.topic: "reference"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---
# sys.pdw_table_mappings (Transact-SQL)

**Applies to:**
 


 


  Ties user tables to internal object names by **object_id**.  
  
| Column Name | Data Type | Description | Range |
| --- | --- | --- | --- |
| physical_name | **nvarchar(36)** | The physical name for the table.<br /><br /> **physical_name** and **object_id** form the key for this view. |  |
| object_id | **int** | The object ID for the table. See [sys.objects (Transact-SQL)](sys-objects-transact-sql.md).<br /><br /> **physical_name** and **object_id** form the key for this view. |  |
  
## Related content

- [Azure Synapse Analytics catalog views](azure-synapse-analytics-catalog-views.md)
- [sys.pdw_index_mappings (Transact-SQL)](sys-pdw-index-mappings-transact-sql.md)
- [sys.pdw_database_mappings (Transact-SQL)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/sys-pdw-database-mappings-transact-sql.md)
