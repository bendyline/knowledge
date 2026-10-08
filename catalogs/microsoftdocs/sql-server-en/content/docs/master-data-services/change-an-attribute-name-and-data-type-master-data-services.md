---
title: Change an Attribute Name and Data Type
description: Change an Attribute Name and Data Type (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "attributes [Master Data Services], changing name"
---
# Change an Attribute Name and Data Type (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can change the name of an attribute.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To change an attribute name and type  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, select the row for the entity that you want to create an attribute for.  
  
4.  Click **Attributes**.  
  
5.  On the **Manage Attributes** page, do one of the following.  
  
    -   If the attribute is for leaf members, select **Leaf** from the **Member Types** list box.  
  
    -   If the attribute is for consolidated members, select **Consolidated** from the **Member Types** list box.  
  
    -   If the attribute is for collections, select **Collection** from the **Member Types** list box.  
  
6.  Select the row for the attribute you want to edit, and then click **Edit**.  
  
7.  In the **Name** box, type the updated name of the attribute. For a list of words that should not be used as attribute names, see [Reserved Words (Master Data Services)](reserved-words-master-data-services.md).  
  
8.  From the **Attribute type** list, select another type.  
  
9. Click **Save**.  
  
## Related content

- [Create a Text Attribute (Master Data Services)](create-a-text-attribute-master-data-services.md)
- [Delete an Attribute (Master Data Services)](delete-an-attribute-master-data-services.md)
- [Attributes (Master Data Services)](attributes-master-data-services.md)
