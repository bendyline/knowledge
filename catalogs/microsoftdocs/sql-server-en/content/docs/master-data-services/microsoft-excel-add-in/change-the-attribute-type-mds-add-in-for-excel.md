---
title: Change the Attribute Type
description: Change the Attribute Type (MDS Add-in for Excel)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - microsoft-excel-add-in
  - build-2025
---
# Change the Attribute Type (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
  Add-in for Excel 
, administrators can change the attribute type when the data type or number of allowed characters is incorrect.  
  
 If you want to change the attribute type to create a constrained list (domain-based attribute), see [Create a Domain-based Attribute (MDS Add-in for Excel)](create-a-domain-based-attribute-mds-add-in-for-excel.md).  
  
> **Note:**  
>  You cannot update the type or length of the **Name** or **Code** columns.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** and **Explorer** functional areas.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](../administrators-master-data-services.md).  
  
-   There must be an existing model, entity, and attribute.  
  
### To change the attribute type  
  
1.  In Excel, load the entity that contains the column (attribute) you want to change. For more information, see [Export Data to Excel from Master Data Services](export-data-to-excel-from-master-data-services.md).  
  
2.  Click any cell in the column you want to change.  
  
3.  In the **Build Model** group, click **Attribute Properties**.  
  
4.  In the **Attribute Properties** dialog box, update settings as needed.  
  
5.  Click **OK**.  
  
## What happens when you change the attribute type?  
 If there is any dependency on the attribute, such as the attribute is referenced by any MDS business rule or derived hierarchy, you cannot change the data type of the attribute. You get an error stating that the attribute type cannot be modified because it is referenced by an object.  
  
 If there is any error during data type conversion for the attribute values, MDS does the following.  
  
-   Changes the data type of the attribute.  
  
-   Generates a copy of the attribute with the suffix "_old" that contains the previous values. This is called a deprecated attribute.  
  
## Related content

- [Attributes (Master Data Services)](../attributes-master-data-services.md)
- [Building a Model (MDS Add-in for Excel)](building-a-model-mds-add-in-for-excel.md)
