---
title: Folder and File Permissions
description: Folder and File Permissions (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "security [Master Data Services], file and folder"
  - "folders [Master Data Services]"
  - "files [Master Data Services]"
---
# Folder and File Permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  When you install  Master Data Services 
, folders and files are installed in the file system at the installation path you specify for  SQL Server 
 shared features. If you use the default installation path for  SQL Server 
 shared features, the installation path for  Master Data Services 
 is *drive*:\Program Files\Microsoft SQL Server\130\Master Data Services. Although you can change the shared features installation path, be aware of permissions that are inherited from the parent folder and permissions that are explicitly set for  Master Data Services 
.  
  
## Inherited Permissions  
 The **Microsoft SQL Server** folder, the **Master Data Services** folder, and most subfolders and files inherit permissions from the parent folder specified in  SQL Server 
 Setup. If you choose the default installation location, the parent folder that permissions are inherited from is *drive*:\Program Files. The following table describes the default permissions for **Program Files**.  
  
> **Note:**  
>  If you modify default permissions for **Program Files**, or you choose a different installation location, the  Master Data Services 
 folders and files inherit permissions from their parent folder accordingly, and the permissions might differ from those described in the following table.  
  
###### Program Files Default Permissions  
  
| Group or account name | Permissions |
| --- | --- |
| CREATOR OWNER | Special permissions |
| SYSTEM | Special permissions |
| Administrators | Special permissions |
| Users | Read & execute, List folder contents, Read |
| TrustedInstaller | List folder contents, Special permissions |
  
## Explicit Permissions  
 The **MDSTempDir** folder and the  Master Data Services 
 Web.config file (in the **WebApplication** folder) do not inherit permissions. They have permissions that are set explicitly when you install  Master Data Services 
, regardless of the installation path you choose. Do not modify these permissions.  
  
###### MDSTempDir Permissions  
  
| Group or account name | Permissions |
| --- | --- |
| SYSTEM | Modify, Read & execute, List folder contents, Read, Write |
| Administrators | Modify, Read & execute, List folder contents, Read, Write |
| MDS_ServiceAccounts | Modify, Read & execute, List folder contents, Read, Write |
  
###### Web.config Permissions  
  
| Group or account name | Permissions |
| --- | --- |
| SYSTEM | Full control, Modify, Read & execute, Read, Write |
| Administrators | Full control, Modify, Read & execute, Read, Write |
| MDS_ServiceAccounts | Read & execute, Read |
  
 For more information about the contents of the  Master Data Services 
 Web.config file, see [Web Configuration Reference (Master Data Services)](web-configuration-reference-master-data-services.md).  
  
## Related content

- [Installation Tasks for Master Data Services](install-windows/install-master-data-services.md)
