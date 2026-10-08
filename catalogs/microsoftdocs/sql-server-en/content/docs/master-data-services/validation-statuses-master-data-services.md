---
title: Validation Statuses
description: Validation Statuses (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Validation Statuses (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the **Version Management** functional area, on the **Validate Version** page, the following statuses are possible.  
  
| Status | Description |
| --- | --- |
| Waiting to be validated | All newly created members that are waiting to be validated. |
| Waiting to be revalidated | Existing members that are waiting to be validated. |
| Validation succeeded | Members that passed business rule validation. |
| Validation failed | Members that failed business rule validation. |
| Waiting for dependent member revalidation | Updated consolidated members waiting to be validated along with child members. |
  
## Related content

- [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md)
- [Versions (Master Data Services)](versions-master-data-services.md)
