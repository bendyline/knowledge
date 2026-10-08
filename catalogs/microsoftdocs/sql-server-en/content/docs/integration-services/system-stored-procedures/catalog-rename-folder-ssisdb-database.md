---
title: "catalog.rename_folder (SSISDB Database)"
description: "catalog.rename_folder (SSISDB Database)"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.rename_folder (SSISDB Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Renames a folder in the  Integration Services 
 catalog.  
  
## Syntax  
  
```sql  
catalog.rename_folder [ @old_name = ] old_name , [ @new_name = ] new_name  
```  
  
## Arguments  
 [ @old_name = ] *old_name*  
 The original name of the folder. The *old_name* is **nvarchar(128)**.  
  
 [ @new_name = ] *new_name*  
 The new name of the folder. The *new_name* is **nvarchar(128)**.  
  
## Return Code Value  
 None  
  
## Result Sets  
 None  
  
## Permissions  
 This stored procedure requires one of the following permissions:  
  
-   Membership to the **ssis_admin** database role  
  
-   Membership to the **sysadmin** server role  
  
## Errors and Warnings  
 The following list describes some conditions that may raise an error or warning:  
  
-   The original folder name is not valid  
  
-   The new name has already been used on an existing folder
