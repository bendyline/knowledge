---
title: "sys.fn_virtualservernodes (Transact-SQL)"
description: "sys.fn_virtualservernodes (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/26/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "fn_virtualservernodes"
  - "fn_virtualservernodes_TSQL"
helpviewer_keywords:
  - "nodes [Faillover Clustering], virtual servers"
  - "nodes [Faillover Clustering]"
  - "virtual servers [Faillover Clustering]"
  - "failover clustering [SQL Server], nodes"
  - "fn_virtualservernodes function"
  - "sys.fn_virtualservernodes function"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sys.fn_virtualservernodes (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns a list of failover clustered instance nodes on which an instance of  SQL Server 
 can run. This information is useful in failover clustering environments.  
  
> **Important:**
>  This  Microsoft 
  SQL Server 2012 (11.x) 
 system function is included for backward compatibility. We recommend that you use [sys.dm_os_cluster_nodes &#40;Transact-SQL&#41;](../system-dynamic-management-objects/sys-dm-os-cluster-nodes-transact-sql.md) instead.  
  
 
  
## Syntax  
  
```  
  
fn_virtualservernodes()  
```  
  
## Tables Returned  
 If the current server is a clustered server, **fn_virtualservernodes** returns a list of failover clustered instance nodes on which this instance of  SQL Server 
 has been defined.  
  
 If the current server instance is not a clustered server, **fn_virtualservernodes** returns an empty rowset.  
  
## Permissions  
 The user must have VIEW SERVER STATE permission for the instance of  SQL Server 
.  

### Permissions for SQL Server 2022 and later

Requires `VIEW SERVER PERFORMANCE STATE` permission on the server.

## Examples
 The following example uses `fn_virtualservernodes` to query on a clustered server instance:  
  
```  
SELECT * FROM fn_virtualservernodes();  
```  
  
  Here's the result set. 
  
  
 NodeName  
  
 -------\-  
  
 SS3-CLUSN1  
  
 SS3-CLUSN2  
  
## Related content

- [sys.dm_os_cluster_nodes (Transact-SQL)](../system-dynamic-management-objects/sys-dm-os-cluster-nodes-transact-sql.md)
- [sys.fn_servershareddrives (Transact-SQL)](sys-fn-servershareddrives-transact-sql.md)
