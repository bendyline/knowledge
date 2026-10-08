---
title: "catalog.update_master_address (SSISDB Database)"
description: "catalog.update_master_address (SSISDB Database)"
ms.date: "07/18/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
monikerRange: ">= sql-server-2017"
---
# catalog.update_master_address (SSISDB Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 



 and later versions


Update the  Integration Services 
 Scale Out Master endpoint.

## Syntax

```sql
catalog.update_master_address [ @MasterAddress = ] masterAddress
```

## Arguments
[ @MasterAddress = ] *masterAddress*  
The Scale Out Master endpoint. The *masterAddress* is **nvarchar**.  

 ## Return Code Value  
 0 (success)  
  
## Result Sets  
 None  

## Permissions  
 This stored procedure requires one of the following permissions:  
   
-   Membership to the **ssis_admin** database role  
  
-   Membership to the **sysadmin** server role
