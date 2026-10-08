---
title: "catalog.delete_folder (SSISDB Database)"
description: "catalog.delete_folder (SSISDB Database)"
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.delete_folder (SSISDB Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Deletes a folder from the  Integration Services 
 catalog.  
  
## Syntax  
  
```sql  
catalog.delete_folder [ @folder_name = ] folder_name  
```  
  
## Arguments  
 [ @folder_name = ] *folder_name*  
 The name of the folder that is to be deleted. The *folder_name* is **nvarchar(128)**.  
  
## Return Code Value  
 None  
  
## Result Sets  
 None  
  
## Permissions  
 This stored procedure requires one of the following permissions:  
  
-   Membership to the **ssis_admin** database role  
  
-   Membership to the **sysadmin** server role  
  
## Errors and Warnings  
 Returns a message to confirm the deletion of the folder.
