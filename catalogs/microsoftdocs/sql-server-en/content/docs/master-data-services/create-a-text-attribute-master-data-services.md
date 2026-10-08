---
title: Create a Text Attribute
description: Create a Text Attribute (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "attributes [Master Data Services], creating text attributes"
  - "creating text attributes [Master Data Services]"
---
# Create a Text Attribute (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create a text attribute when you want users to enter a text string as an attribute value.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   An entity must exist to create the attribute for. For more information, see [Create an Entity (Master Data Services)](create-an-entity-master-data-services.md).  
  
## Attribute Information  
 For each created attribute, a row with seven columns is added to the grid. The following table describes the columns.  
  
| Column | Description |
| --- | --- |
| Status | The attribute status.<br /><br /> When you click Save, the Icon for updating status image displays, indicating that the attribute is updating.<br /><br /> If there are errors when creating or editing an attribute, the Icon for error status image displays.<br /><br /> Otherwise, the status is OK and the Icon for OK status image displays. |
| Name | The attribute name. |
| Display Name | The attribute display name. |
| Description | The attribute description. |
| Display Pixel Width | The attribute width. |
| Type and Properties | The type and data type information of the attribute. |
| Enable Change Tracking | Specifies whether the attribute is enabled for change tracking and shows the group number in parentheses. |
  
 When you click an attribute, the following information displays.  
  
-   **Created By**: The name of the user who created the attribute.  
  
-   **On**: The date and time when the attribute was created.  
  
-   **Updated By**: the name of the user who last updated the attribute.  
  
-   **On**: The date and time when the attribute was last updated.  
  
### To create a text attribute  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, select a model from the grid and then click **Entities**.  
  
3.  On the **Manage Entity** page, select the row for the entity that you want to create an attribute for.  
  
4.  Click **Attributes**.  
  
5.  On the **Manage Attributes** page, do one of the following and then click **Add**.  
  
    -   If the attribute is for leaf members, select **Leaf** from the **Member Types** list box.  
  
    -   If the attribute is for consolidated members, select **Consolidated** from the **Member Types** list box.  
  
    -   If the attribute is for collections, select **Collection** from the **Member Types** list box.  
  
6.  In the **Name** box, type a name for the attribute. For a list of words that should not be used as attribute names, see [Reserved Words (Master Data Services)](reserved-words-master-data-services.md).  
  
7.  Optionally, type a display name, and type a description for the attribute in the **Description** box.  
  
8.  In the **Display pixel width** box, type the width of the attribute column to be displayed in the **Explorer** grid.  
  
9. From the **Attribute type** list, select **Free-form**.  
  
10. From the **Data type** list, select **Text**.  
  
11. In the **Length** box, type the maximum number of characters allowed.  
  
12. Optionally, select **Enable change tracking** to track changes to groups of attributes. For more information, see [Add Attributes to a Change Tracking Group (Master Data Services)](add-attributes-to-a-change-tracking-group-master-data-services.md).  
  
13. Click **Save**.  
  
## Related content

- [Attributes (Master Data Services)](attributes-master-data-services.md)
- [Change an Attribute Name and Data Type (Master Data Services)](change-an-attribute-name-and-data-type-master-data-services.md)
- [Create a Domain-Based Attribute (Master Data Services)](create-a-domain-based-attribute-master-data-services.md)
- [Create a File Attribute (Master Data Services)](create-a-file-attribute-master-data-services.md)
