---
title: "catalog.set_customized_logging_level_description"
description: "catalog.set_customized_logging_level_description"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.set_customized_logging_level_description 


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

  Changes the description of an existing customized logging level. For more info about customized logging levels, see [Integration Services (SSIS) Logging](../performance/integration-services-ssis-logging.md).  
  
## Syntax  
  
```sql  
catalog.set_customized_logging_level_description [ @level_name = ] level_name  
    , [ @level_description = ] level_description  
```  
  
## Arguments  
 [ @level_name = ] *level_name*  
 The name of an existing customized logging level.  
  
 The *level_name* is **nvarchar(128)**.  
  
 [ @level_description = ] *level_description*  
 The new description for the  specified customized logging level.  
  
 The *level_description* is **nvarchar(1024)**.  
  
## Remarks  
  
## Return Codes  
 0 (success)  
  
 When the stored procedure fails, it throws an error.  
  
## Result Set  
 None  
  
## Permissions  
 This stored procedure requires one of the following permissions:  
  
-   Membership in the **ssis_admin** database role  
  
-   Membership in the **sysadmin** server role  
  
## Errors and Warnings  
 The following list describes conditions that cause the stored procedure to fail.  
  
-   The user does not have the required permissions.
