---
title: Change the Entity Transaction Log Type
description: Change the Entity Transaction Log Type (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Change the Entity Transaction Log Type (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  You can change the transaction log type of an entity, to attribute, member, or none.  
  
| Transaction Log Type | Description |
| --- | --- |
| Attribute | Entity change logs are saved at the attribute level.<br /><br /> The transaction log is saved, as it is for  SQL Server 2014 (12.x) |
  | Master Data Services |
| . |
| Member | Entity change logs as saved at the row level.<br /><br /> Any attribute change triggers a new row revision.<br /><br /> When using row transaction log type, the entity is stored as a slowly changing dimension Type 4. Type 2 subscription view and Type 4 (History) subscription view are supported. For more information, see [Subscription View Formats (Master Data Services)](subscription-view-formats-master-data-services.md)<br /><br /> Provides better performance. |
| None | No change logs are saved.<br /><br /> Provides the best performance. |
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the System Administration functional area.For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   The entity must exist. For more information, see [Create an Entity (Master Data Services)](create-an-entity-master-data-services.md).  
  
 **To change the transaction log type**  
  
1.  In Master Data Manager, click **System Administration**.  
  
2.  On the **Manage Model** page, select the row for the model  of the entity that you want to edit and then click **Entities**.  
  
3.  On the **Manage Entity** page, select the row for  the entity that you want to update and then click **Edit**.  
  
4.  Choose the transaction log type in the dropdown list.  
  
5.  Click **Save**.
