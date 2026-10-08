---
title: Validate a Version Against Business Rules
description: Validate a Version against Business Rules (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "validating versions [Master Data Services]"
  - "validating versions [Master Data Services], about validating versions"
  - "versions [Master Data Services], validating"
  - "business rules [Master Data Services], applying to all members"
---
# Validate a Version against Business Rules (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, validate a version to apply business rules to all members in the model version.  
  
 This procedure explains how to use the  Master Data Manager 
 web application to validate data. If you have permission in the MDS database, you can use a stored procedure instead. For more information, see [Validation Stored Procedure (Master Data Services)](validation-stored-procedure-master-data-services.md).  
  
> **Note:**  
>  All members must pass validation before a version can be committed.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Version Management** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   The version's status must be **Open** or **Locked**.  
  
-   On the **Validate Versions** page, members must exist with a status other than **Validation succeeded**.  
  
### To validate a version  
  
1.  In  Master Data Manager 
, click **Version Management**.  
  
2.  On the **Manage Versions** page, from the menu bar, click **Validate Version**.  
  
3.  On the **Validate Versions** page, select the model and version you want to validate.  
  
4.  Click **Validate**.  
  
5.  In the confirmation dialog box, click **OK**.  
  
    > **Note:**  
    >  When the progress indicator is no longer displayed, the version has finished validation.  
  
## Related content

- [Validation Statuses (Master Data Services)](validation-statuses-master-data-services.md)
- [Validation Stored Procedure (Master Data Services)](validation-stored-procedure-master-data-services.md)
- [Versions (Master Data Services)](versions-master-data-services.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
- [Validate Specific Members against Business Rules (Master Data Services)](validate-specific-members-against-business-rules-master-data-services.md)
- [Lock a Version (Master Data Services)](lock-a-version-master-data-services.md)
