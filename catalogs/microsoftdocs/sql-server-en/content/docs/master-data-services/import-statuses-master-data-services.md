---
title: Import Statuses
description: Import Statuses (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Import Statuses (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the **Integration Management** functional area, on the **Staging Batches** page, the following statuses are possible.  
  
| Status | Description | Status_ID |
| --- | --- | --- |
| Queued to run | The batch has not started processing. | 1 |
| Running | The batch is processing. | 2 |
| Completed | The batch has finished processing. | 3 |
| Queued to clear | The batch has finished processing and will be cleared. | 4 |
| Cleared | The batch has been cleared. | 5 |
  
## Related content

- [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md)
