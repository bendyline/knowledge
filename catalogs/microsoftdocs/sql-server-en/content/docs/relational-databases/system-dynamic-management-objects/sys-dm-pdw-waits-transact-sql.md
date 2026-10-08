---
title: "sys.dm_pdw_waits (Transact-SQL)"
description: sys.dm_pdw_waits (Transact-SQL)
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
# sys.dm_pdw_waits (Transact-SQL)

**Applies to:**
 


 


  Holds information about all wait states encountered during execution of a request or query, including locks, waits on transmission queues, and so on.

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
  
  
| Column Name | Data Type | Description | Range |
| --- | --- | --- | --- |
| wait_id | **bigint** | Unique numeric id associated with the wait state.<br /><br /> Key for this view. | Unique across all waits in the system. |
| session_id | **nvarchar(32)** | ID of the session on which the wait state occurred. | See session_id in [sys.dm_pdw_exec_sessions &#40;Transact-SQL&#41;](sys-dm-pdw-exec-sessions-transact-sql.md). |
| type | **nvarchar(255)** | Type of wait this entry represents. | Information not available. |
|  |
| object_type | **nvarchar(255)** | Type of object that is affected by the wait. | Information not available. |
|  |
| object_name | **nvarchar(386)** | Name or GUID of the specified object that was affected by the wait. |  |
| request_id | **nvarchar(32)** | ID of the request on which the wait state occurred. | See request_id in [sys.dm_pdw_exec_requests &#40;Transact-SQL&#41;](sys-dm-pdw-exec-requests-transact-sql.md). |
| request_time | **datetime** | Time at which the wait state was requested. |  |
| acquire_time | **datetime** | Time at which the lock or resource was acquired. |  |
| state | **nvarchar(50)** | State of the wait state. | Information not available. |
|  |
| priority | **int** | Priority of the waiting item. | Information not available. |
|  |
  
## Related content

- [Azure Synapse Analytics dynamic management objects](azure-synapse-analytics-dynamic-management-objects.md)
- [sys.dm_pdw_wait_stats (Transact-SQL)](sys-dm-pdw-wait-stats-transact-sql.md)
