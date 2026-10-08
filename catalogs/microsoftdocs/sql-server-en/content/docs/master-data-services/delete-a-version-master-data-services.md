---
title: Delete a Version
description: Delete a Version (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "versions [Master Data Services], deleting"
  - "deleting versions [Master Data Services]"
---
# Delete a Version (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, delete a version when you are sure you no longer need the master data associated with the version. After you delete a version, you cannot retrieve the associated master data.  
  
> **Warning:**  
>  If a model has only one version and you delete it, the model becomes unusable.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to view the mdm.viw_SYSTEM_SCHEMA_VERSION view and to execute the mds.udpVersionDelete stored procedure in the  Master Data Services 
 database. For more information, see [Database Object Security (Master Data Services)](database-object-security-master-data-services.md).  
  
### To delete a version  
  
1.  Open  SQL Server Management Studio 
 and connect to the  Database Engine 
 instance for your  Master Data Services 
 database.  
  
2.  Open the mdm.viw_SYSTEM_SCHEMA_VERSION view.  
  
3.  Find the version of the model you want to delete and copy the value in the **ID** field.  
  
4.  Create a new query.  
  
5.  Type the following text, replacing *version_ID* with the value you copied in step 2.  
  
    ```  
    EXEC [mdm].[udpVersionDelete] @Version_ID='version_ID'  
    ```  
  
6.  Run the query.  
  
    > **Note:**  
    >  You may have to wait a few minutes before the Web application reflects the change.  
  
## Related content

- [Versions (Master Data Services)](versions-master-data-services.md)
- [Copy a Version (Master Data Services)](copy-a-version-master-data-services.md)
