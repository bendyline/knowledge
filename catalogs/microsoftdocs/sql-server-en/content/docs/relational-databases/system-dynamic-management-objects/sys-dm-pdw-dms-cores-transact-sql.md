---
title: "sys.dm_pdw_dms_cores (Transact-SQL)"
description: sys.dm_pdw_dms_cores (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/07/2017"
ms.service: sql
ms.subservice: data-warehouse
ms.topic: "reference"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---
# sys.dm_pdw_dms_cores (Transact-SQL)

**Applies to:**
 


 


  Holds information about all DMS services running on the Compute nodes of the appliance. It lists one row per service instance, which is currently one row per node.

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
 
  
| Column Name | Data Type | Description | Range |
| --- | --- | --- | --- |
| dms_core_id | **int** | Unique numeric id associated with this DMS core.<br /><br /> Key for this view. | Set to the pdw_node_id of the node that this DMS core is running on. |
| pdw_node_id | **int** | ID of the node on which this DMS service is running. | See node_id in [sys.dm_pdw_nodes &#40;Transact-SQL&#41;](sys-dm-pdw-nodes-transact-sql.md). |
| status | **nvarchar(32)** | Current status of the DMS service. | Information not available. |
|  |
  
 For information about the maximum rows retained by this view, see the Metadata section in the [Capacity limits](https://learn.microsoft.com/azure/sql-data-warehouse/sql-data-warehouse-service-capacity-limits#metadata) topic.  
  
## Related content

- [Azure Synapse Analytics dynamic management objects](azure-synapse-analytics-dynamic-management-objects.md)
