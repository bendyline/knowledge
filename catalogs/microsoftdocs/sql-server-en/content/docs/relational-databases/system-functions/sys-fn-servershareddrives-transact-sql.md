---
title: "sys.fn_servershareddrives (Transact-SQL)"
description: "sys.fn_servershareddrives (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/26/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "fn_servershareddrives"
  - "fn_servershareddrives_TSQL"
helpviewer_keywords:
  - "fn_servershareddrives function"
  - "shared drives [SQL Server]"
  - "names [SQL Server], shared drives"
  - "sys.fn_serversharedrives function"
dev_langs:
  - "TSQL"
---
# sys.fn_servershareddrives (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Returns the names of shared drives used by the clustered server.  
  
> **Important:**  
>  This   SQL Server 
 system function is included for backward compatibility. We recommend that you use [sys.dm_io_cluster_valid_path_names &#40;Transact-SQL&#41;](../system-dynamic-management-objects/sys-dm-io-cluster-valid-path-names-transact-sql.md) instead.  
  
 
  
## Syntax  
  
```  
  
fn_servershareddrives()  
```  
  
## Tables Returned  
 If the current server is a clustered server, **fn_servershareddrives** returns the drive name of the shared drives.  
  
 If the current server instance is not a clustered server, **fn_servershareddrives** returns an empty rowset.  
  
## Remarks  
 `fn_servershareddrives` returns a list of shared drives used by this clustered server. These shared drives belong to the same cluster group as the  Microsoft 
  SQL Server 
 resource. Further, the  SQL Server 
 resource is dependent on these drives.  
  
 This function is helpful in identifying drives available to users.  
  
## Permissions  
 The user must have VIEW SERVER STATE permission for the  SQL Server 
 instance.  

### Permissions for SQL Server 2022 and later

Requires `VIEW SERVER PERFORMANCE STATE` permission on the server.

## Examples
 The following example uses `fn_servershareddrives` to query on a clustered server instance:  
  
```  
SELECT * FROM fn_servershareddrives();  
```  
  
  Here's the result set. 
  
  
 DriveName  
  
 -------\-  
  
 m  
  
 n  
  
## Related content

- [sys.dm_io_cluster_valid_path_names (Transact-SQL)](../system-dynamic-management-objects/sys-dm-io-cluster-valid-path-names-transact-sql.md)
- [sys.dm_io_cluster_shared_drives (Transact-SQL)](../system-dynamic-management-objects/sys-dm-io-cluster-shared-drives-transact-sql.md)
- [sys.fn_virtualservernodes (Transact-SQL)](sys-fn-virtualservernodes-transact-sql.md)
