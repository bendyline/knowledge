---
title: "catalog.folders (SSISDB Database)"
description: "catalog.folders (SSISDB Database)"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.folders (SSISDB Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

  Displays the folders in the  Integration Services 
 catalog.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| id | **bigint** | The unique identifier of the folder. |
| name | **sysname(nvarchar(128)** | The name of the folder, which is unique within the  Integration Services |
 | catalog. |
| description | **nvarchar(1024)** | The description of the folder. |
| created_by_sid | **varbinary(85)** | The security identifier (SID) of the user who created the folder. |
| created_by_name | **nvarchar(128)** | The name of the user who created the folder. |
| created_time | **datetimeoffset(7)** | The date and time at which the folder was created. |
  
## Remarks  
 This view displays a row for each folder in the catalog.  
  
## Permissions  
 This view requires one of the following permissions:  
  
-   READ permission on the folder  
  
-   Membership to the **ssis_admin** database role  
  
-   Membership to the **sysadmin** server role  
  
> **Note:**  
>  When you have permission to perform an operation on the server, you also have permission to view information about the operation. Row-level security is enforced; only rows that you have permission to view are displayed.
