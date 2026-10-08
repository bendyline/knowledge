---
title: "DROP EXTERNAL RESOURCE POOL (Transact-SQL)"
description: DROP EXTERNAL RESOURCE POOL (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "08/06/2020"
ms.service: sql
ms.subservice: machine-learning-services
ms.topic: reference
f1_keywords:
  - "DROP EXTERNAL RESOURCE POOL"
  - "DROP_EXTERNAL_RESOURCE_POOL_TSQL"
helpviewer_keywords:
  - "DROP EXTERNAL RESOURCE POOL statement"
dev_langs:
  - "TSQL"
---
# DROP EXTERNAL RESOURCE POOL (Transact-SQL)

**Applies to:**
 

 and later versions 


 

Deletes a Resource Governor external resource pool used to define resources for external processes. 

**Applies to: \>=sql-server-2017 || >=sql-server-linux-ver15**
For Machine Learning Services 
, the external pool governs `rterm.exe`, `python.exe`, `BxlServer.exe`, and other processes spawned by them.


External resource pools are created by using [CREATE EXTERNAL RESOURCE POOL (Transact-SQL)](create-external-resource-pool-transact-sql.md) and modified by using [ALTER EXTERNAL RESOURCE POOL (Transact-SQL)](alter-external-resource-pool-transact-sql.md).  
  

  
## Syntax  
  
```syntaxsql
DROP EXTERNAL RESOURCE POOL pool_name  
```  
  
## Arguments

*pool_name*  
The name of the external resource pool to be deleted.  
  
## Remarks

You cannot drop an external resource pool if it contains workload groups.  

You cannot drop the Resource Governor default or internal pools.  

When you are executing DDL statements, we recommend that you be familiar with Resource Governor states. For more information, see [Resource Governor](../../relational-databases/resource-governor/resource-governor.md).  

## Permissions

Requires `CONTROL SERVER` permission.  

## Examples

The following example drops the external resource pool named `ex_pool`.  

```sql
DROP EXTERNAL RESOURCE POOL ex_pool;  
GO  
ALTER RESOURCE GOVERNOR RECONFIGURE;  
GO  
```  

## Related content

- [Server configuration: external scripts enabled](../../database-engine/configure-windows/external-scripts-enabled-server-configuration-option.md)
- [CREATE EXTERNAL RESOURCE POOL (Transact-SQL)](create-external-resource-pool-transact-sql.md)
- [ALTER EXTERNAL RESOURCE POOL (Transact-SQL)](alter-external-resource-pool-transact-sql.md)
- [DROP WORKLOAD GROUP (Transact-SQL)](drop-workload-group-transact-sql.md)
- [DROP RESOURCE POOL (Transact-SQL)](drop-resource-pool-transact-sql.md)
