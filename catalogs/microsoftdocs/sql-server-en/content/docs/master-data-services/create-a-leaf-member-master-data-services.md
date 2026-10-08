---
title: Create a Leaf Member
description: Create a Leaf Member (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "leaf members [Master Data Services], creating"
  - "creating leaf members [Master Data Services]"
  - "members [Master Data Services], creating leaf members"
---
# Create a Leaf Member (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Manager 
, create a leaf member when you want to add master data to your system. If you want to add data in bulk, use staging tables instead. For more information, see  [Import Data from Tables (Master Data Services)](import-data-from-tables-master-data-services.md)  
  
 You can also use  Master Data Services 
  Add-in for Excel 
 to import data.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
-   You must have a minimum of **Create** or **Update** permission to the leaf model object for the entity you are adding a member to. The Create permission enables you to create a member and edit only the Code attribute. The Update permission enables you to update other attributes.  
  
     For more information, see [Security (Master Data Services)](security-master-data-services.md).  
  
### To create a leaf member  
  
1.  On the  Master Data Manager 
 home page, from the **Model** list, select a model.  
  
2.  If you are a user, select an open version from the **Version** list. If you are an administrator, select a version with open or locked status from the **Version** list.  
  
3.  Click **Explorer**.  
  
4.  From the menu bar, point to **Entities** and click the name of the entity you want to add a member to.  
  
5.  Click **Add member**.  
  
6.  In the **Details** pane, complete the fields.  
  
     If an attribute is domain-based and a filter has been applied to the attribute, the list of attribute values will be constrained by the filter parent attribute.  
  
     For more information about filter parent attributes and domain-based attributes, see [Create a Domain-Based Attribute (Master Data Services)](create-a-domain-based-attribute-master-data-services.md)  
  
7.  Optional. In the **Annotations** box, type a comment about why the member was added. All users who have access to the member can view the annotation.  
  
8.  Click **OK**.  
  
## Related content

- [Create a Consolidated Member (Master Data Services)](create-a-consolidated-member-master-data-services.md)
- [Members (Master Data Services)](members-master-data-services.md)
