---
title: "catalog.create_environment (SSISDB Database)"
description: "catalog.create_environment (SSISDB Database)"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.create_environment (SSISDB Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Creates an environment in the  Integration Services 
 catalog.  
  
## Syntax  
  
```sql  
catalog.create_environment [ @folder_name = ] folder_name  
     , [ @environment_name = ] environment_name  
  [  , [ @environment_description = ] environment_description ]  
```  
  
## Arguments  
 [@folder_name =] *folder_name*  
 The name of the folder to contain the environment. The *folder_name* is **nvarchar(128)**.  
  
 [@environment_name =] *environment_name*  
 The name of the environment. The *environment_name* is **nvarchar(128)**.  
  
 [@environment_description=] *environment_description*  
 An optional description of the environment. The *environment_description* is **nvarchar(1024)**.  
  
## Return Code Value  
 0 (success)  
  
## Result Sets  
 None  
  
## Permissions  
 This stored procedure requires one of the following permissions:  
  
-   READ and MODIFY permissions on the folder  
  
-   Membership to the **ssis_admin** database role  
  
-   database role  
  
-   Membership to the **sysadmin** server role  
  
## Errors and Warnings  
 The following list describes some conditions that may raise an error or warning:  
  
-   The folder name cannot be found  
  
-   An environment that has the same name already exists in the specified folder  
  
## Remarks  
 The environment name must be unique within the folder.
