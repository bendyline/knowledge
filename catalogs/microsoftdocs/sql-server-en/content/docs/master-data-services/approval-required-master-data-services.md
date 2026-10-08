---
title: Approval Required
description: Approval Required (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Approval Required (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, the administrator can set an entity to Approval Required. All the changes on this entity would require one of the entity administrators to review and approve the changes.  
  
> **Note:**  
>  Changes made on leaf members requires approval. The changes made on deprecated explicit hierarchies and collections  bypass the approval.  
>   
>  Changes made by the staging table process bypass the approval.  
>   
>  Changes made by a business rule bypass the approval.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the System Administration functional area  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md)  
  
-   An entity must exist. For more information, see [Create an Entity (Master Data Services)](create-an-entity-master-data-services.md)  
  
## To enable Approval Required for an entity  
  
1.  In  Master Data Services 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid, and then click **Entities**.  
  
3.  On the **Manage Entity** page, from the grid, select the row for the entity that you want to enable  **Approval Required** for.  
  
4.  Click **Edit**, select **Approval Required**, and then click **Save**.  
  
## Related content

- [Changesets (Master Data Services)](changesets-master-data-services.md)
