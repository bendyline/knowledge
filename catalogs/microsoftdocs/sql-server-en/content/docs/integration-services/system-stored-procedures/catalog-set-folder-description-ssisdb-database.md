---
title: "catalog.set_folder_description (SSISDB Database)"
description: "catalog.set_folder_description (SSISDB Database)"
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.set_folder_description (SSISDB Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Sets the description of a folder in the  Integration Services 
 catalog.  
  
## Syntax  
  
```sql  
catalog.set_folder_description [ @folder_name = ] folder_name  
    , [ @folder_description = ] folder_description  
```  
  
## Arguments  
 [ @folder_name = ] *folder_name*  
 The name of the folder. The *folder_name* is **nvarchar(128)**.  
  
 [ @folder_description = ] *folder_description*  
 The description of the folder. The *folder_description* is **nvarchar(MAX)**.  
  
## Return Code Value  
 None  
  
## Result Sets  
 None  
  
## Permissions  
 This stored procedure requires one of the following permissions:  
  
-   Membership to the **ssis_admin** database role  
  
-   Membership to the **sysadmin** server role  
  
## Errors and Warnings  
 The stored procedure returns a message to confirm the setting of new folder description.
