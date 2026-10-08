---
title: "sys.dm_os_cluster_nodes (Transact-SQL)"
description: sys.dm_os_cluster_nodes (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/27/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_os_cluster_nodes_TSQL"
  - "dm_os_cluster_nodes_TSQL"
  - "dm_os_cluster_nodes"
  - "sys.dm_os_cluster_nodes"
helpviewer_keywords:
  - "sys.dm_os_cluster_nodes dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest"
---
# sys.dm_os_cluster_nodes (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 



 

Returns one row for each node in the failover cluster instance configuration. If the current instance is a failover clustered instance, it returns a list of nodes on which this failover cluster instance (formerly "virtual server") has been defined. If the current server instance is not a failover clustered instance, it returns an empty rowset.  
  
> **Note:**  
> To call this from  Azure Synapse Analytics , use the name **sys.dm_pdw_nodes_os_cluster_nodes**.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **NodeName** | **sysname** | Name of a node in the  SQL Server |
 | failover cluster instance (virtual server) configuration. |
| status | **int** | Status of the node in a  SQL Server |
 | failover cluster instance: 0, 1, 2, 3, -1. For more information, see [GetClusterNodeState Function](https://learn.microsoft.com/windows/win32/api/clusapi/nf-clusapi-getclusternodestate). |
| status_description | **nvarchar(20)** | Description of the status of the  SQL Server |
 | failover cluster node.<br /><br /> 0 = up<br /><br /> 1 = down<br /><br /> 2 = paused<br /><br /> 3 = joining<br /><br /> -1 = unknown |
| is_current_owner | bit | 1 means this node is the current owner of the  SQL Server |
 | failover cluster resource. |
| pdw_node_id | **int** | **Applies to**:  Azure Synapse Analytics <br /><br /> The identifier for the node that this distribution is on. |
  
## Remarks  
 When failover clustering is enabled, the  SQL Server 
 instance can run on any of the nodes of the failover cluster that are designated as part of the  SQL Server 
 failover cluster instance (virtual server) configuration.  
  
> **Note:**  
> This view replaces the fn_virtualservernodes function, which will be deprecated in a future release.  
  
## Permissions  
 Requires VIEW SERVER STATE permission on the instance of  SQL Server 
.  
  
### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Examples  
 The following example uses sys. dm_os_cluster_nodes to return the nodes on a clustered server instance.  
  
```  
SELECT NodeName, status, status_description, is_current_owner   
FROM sys.dm_os_cluster_nodes;  
```  
  
  Here's the result set. 
  
  
| NodeName | status | status_description | is_current_owner |
| --- | --- | --- | --- |
| node1 | 0 | up | 1 |
| node2 | 0 | up | 0 |
| Node3 | 1 | down | 0 |
  
## Related content

- [sys.dm_os_cluster_properties (Transact-SQL)](sys-dm-os-cluster-properties-transact-sql.md)
- [sys.dm_io_cluster_shared_drives (Transact-SQL)](sys-dm-io-cluster-shared-drives-transact-sql.md)
- [sys.fn_virtualservernodes (Transact-SQL)](../system-functions/sys-fn-virtualservernodes-transact-sql.md)
- [System dynamic management views and functions](system-dynamic-management-objects.md)
