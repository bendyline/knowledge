---
title: "catalog.object_versions (SSISDB Database)"
description: "catalog.object_versions (SSISDB Database)"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.object_versions (SSISDB Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

  Displays the versions of objects in the  Integration Services 
 catalog. In this release, only versions of projects are supported in this view.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| object_version_lsn | **bigint** | The unique identifier (ID) of the object version. This number is not guaranteed to be sequential. |
| object_id | **bigint** | The unique ID of the object. |
| object_type | **smallint** | The type of object. A value of `20` will be displayed for projects. |
| object_name | **sysname(nvarchar(128))** | The name of the object. |
| description | **nvarchar(1024)** | The description of the project. |
| created_by | **nvarchar(128)** | The name of the user who added the object to the catalog. |
| created_time | **datetimeoffset** | The date and time at which the object was added to the catalog. |
| restored_by | **nvarchar(128)** | The name of the user who restored the object. |
| last_restored_time | **datetimeoffset** | The date and time at which the object was last restored. |
  
## Remarks  
 This view displays a row for each version of an object in the catalog.  
  
## Permissions  
 To see rows in this view, you must have one of the following permissions:  
  
-   READ permission on the object  
  
-   Membership to the **ssis_admin** database role  
  
-   Membership in the **sysadmin** server role.  
  
> **Note:**  
>  Row-level security is enforced; only rows that you have permission to view are displayed.
