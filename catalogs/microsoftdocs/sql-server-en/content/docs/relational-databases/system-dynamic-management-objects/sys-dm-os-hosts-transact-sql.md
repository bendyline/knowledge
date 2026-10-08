---
title: "sys.dm_os_hosts (Transact-SQL)"
description: sys.dm_os_hosts (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/27/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_os_hosts_TSQL"
  - "dm_os_hosts"
  - "dm_os_hosts_TSQL"
  - "sys.dm_os_hosts"
helpviewer_keywords:
  - "sys.dm_os_hosts dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest"
---
# sys.dm_os_hosts (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  Returns all the hosts currently registered in an instance of  SQL Server 
. This view also returns the resources that are used by these hosts.  
  
> **Note:**  
>  To call this from  Azure Synapse Analytics , use the name **sys.dm_pdw_nodes_os_hosts**.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
 
  
| Column name | Data type | Description |
| --- | --- | --- |
| **host_address** | **varbinary(8)** | Internal memory address of the host object. |
| **type** | **nvarchar(60)** | Type of hosted component. For example,<br /><br /> SOSHOST_CLIENTID_SERVERSNI= SQL Server Native Interface<br /><br /> SOSHOST_CLIENTID_SQLOLEDB = SQL Server Native Client OLE DB Provider<br /><br /> SOSHOST_CLIENTID_MSDART = Microsoft Data Access Run Time |
| **name** | **nvarchar(32)** | Name of the host. |
| **enqueued_tasks_count** | **int** | Total number of tasks that this host has placed onto queues in  SQL Server |
| . |
| **active_tasks_count** | **int** | Number of currently running tasks that this host has placed onto queues. |
| **completed_ios_count** | **int** | Total number of I/Os issued and completed through this host. |
| **completed_ios_in_bytes** | **bigint** | Total byte count of the I/Os completed through this host. |
| **active_ios_count** | **int** | Total number of I/O requests related to this host that are currently waiting to complete. |
| **default_memory_clerk_address** | **varbinary(8)** | Memory address of the memory clerk object associated with this host. For more information, see [sys.dm_os_memory_clerks &#40;Transact-SQL&#41;](sys-dm-os-memory-clerks-transact-sql.md). |
| **pdw_node_id** | **int** | **Applies to**:  Azure Synapse Analytics <br /><br /> The identifier for the node that this distribution is on. |
  
## Permissions

On  SQL Server 
 and SQL Managed Instance, requires `VIEW SERVER STATE` permission.

On SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.   

### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Remarks  
  SQL Server 
 allows components, such as an OLE DB provider, that are not part of the  SQL Server 
 executable to allocate memory and participate in non-preemptive scheduling. These components are hosted by  SQL Server 
, and all resources allocated by these components are tracked. Hosting allows  SQL Server 
 to better account for resources used by components external to the  SQL Server 
 executable.  
  
## Relationship Cardinalities  
  
| From | To | Relationship |
| --- | --- | --- |
| sys.dm_os_hosts. default_memory_clerk_address | sys.dm_os_memory_clerks. memory_clerk_address | one to one |
| sys.dm_os_hosts. host_address | sys.dm_os_memory_clerks. host_address | one to one |
  
## Examples  
 The following example determines the total amount of memory committed by a hosted component.  
  
|  |
| --- |
| **Applies to**:  SQL Server 2012 (11.x) |
 | and later. |
  
```  
SELECT h.type, SUM(mc.pages_kb) AS committed_memory  
FROM sys.dm_os_memory_clerks AS mc   
INNER JOIN sys.dm_os_hosts AS h   
    ON mc.memory_clerk_address = h.default_memory_clerk_address  
GROUP BY h.type;  
```  
  
## Related content

- [sys.dm_os_memory_clerks (Transact-SQL)](sys-dm-os-memory-clerks-transact-sql.md)
- [SQL Server Operating System related dynamic management views (Transact-SQL)](sql-server-operating-system-related-dynamic-management-views-transact-sql.md)
