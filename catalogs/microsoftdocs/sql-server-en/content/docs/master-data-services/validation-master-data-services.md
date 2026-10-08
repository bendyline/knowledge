---
title: Validation
description: Data is validated to ensure its accuracy, either automatically or based on business rules that you create in Master Data Services.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Validation (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, data is validated to ensure its accuracy. Some validation occurs automatically, and other validation is based on business rules that are created by administrators.  
  
## When Data Validation Occurs  
 Validation occurs at different times, and is displayed differently in the  Master Data Services 
 web application.  
  
| Validation Type | Standards Determined by | When it Occurs | Displayed in the MasterData Manager web UI as | Displayed in the Add-in for Excel as | Is Data Saved to the MDS Repository? |
| --- | --- | --- | --- | --- | --- |
| Business rule validation | An MDS administrator | Automatically when a user adds or edits data.<br /><br /> Manually when a user applies business rules.<br /><br /> Manually when an administrator in the **Version Management** functional area of the  Master Data Manager |
 | web application validates a version against business rules. | Validation Errors | ValidationStatus | Yes |
| Data type and content validation | An MDS administrator, when creating model objects (for example, an attribute's length or data type) | Automatically when a user adds or edits data | Input Errors | InputStatus | No |
| Data type and content validation | SQL Server |
 | or  Master Data Services |
| Automatically when a user adds or edits data | Input Errors | InputStatus | No |
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Create business rules and publish them, so that data is validated against them. | [Create and Publish a Business Rule (Master Data Services)](create-and-publish-a-business-rule-master-data-services.md) |
| Validate a version of data against business rules. Administrators only. | [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md) |
| Validate specific subsets of data against business rules. All users with permission to the **Explorer** functional area. | [Validate Specific Members against Business Rules (Master Data Services)](validate-specific-members-against-business-rules-master-data-services.md) |
| Validate specific subsets of data against business rules. All users with permission to the **Explorer** functional area and using the  Add-in for Excel |
| . | [Apply Business Rules (MDS Add-in for Excel)](microsoft-excel-add-in/apply-business-rules-mds-add-in-for-excel.md) |
  
## Related content

- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
