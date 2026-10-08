---
title: Apply Business Rules
description: Apply Business Rules (MDS Add-in for Excel)
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
# Apply Business Rules (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
  Add-in for Excel 
 apply business rules when you want to validate data and confirm that it is valid. You can correct validations and re-publish the data.  
  
> **Note:**  
>  Data validation occurs automatically when you publish data. For more information, see [Validation (Master Data Services)](../validation-master-data-services.md).  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have access to the **Explorer** functional area.  
  
-   You must have an active worksheet that contains MDS-managed data.  
  
### To apply business rules  
  
1.  In the **Publish and Validate** group, click **Apply Rules**.  
  
    > **Note:**  
    >  The number of members (rows) that are validated at one time depends on a setting in  Master Data Services Configuration Manager 
. For more information, see [Business Rule Settings](../system-settings-master-data-services.md#BusinessRules).  
  
2.  The data is validated against business rules and two status columns are displayed. If these columns are not displayed automatically, in the **Publish and Validate** group, click **Show Status** to view them.  
  
## Related content

- [Overview: Importing Data from Excel (MDS Add-in for Excel)](overview-importing-data-from-excel-mds-add-in-for-excel.md)
