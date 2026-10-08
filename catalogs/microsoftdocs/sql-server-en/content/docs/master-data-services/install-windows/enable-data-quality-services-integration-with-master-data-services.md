---
title: Enable Data Quality Services Integration
description: In the Master Data Services add-in for Excel, matching functionality is provided by Data Quality Services (DQS).
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Enable Data Quality Services Integration with Master Data Services


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
  Add-in for Excel 
, matching functionality is provided by Data Quality Services (DQS). This functionality must be enabled to be used.  
  
## Prerequisites  
  
-   A  Master Data Services 
 web application and database must exist.  
  
-   The Data Quality Services feature and the Data Quality Client must be installed on the same  SQL Server 
 instance that hosts the MDS database. For more information, see [Install Data Quality Services](../../data-quality-services/install-windows/install-data-quality-services.md).  
  
### To enable Data Quality Services integration  
  
1.  Open  Master Data Services Configuration Manager 
.  
  
2.  In the left pane, click **Web Configuration**.  
  
3.  On the **Web Configuration** page, select the website and web application.  
  
4.  In the **Enable DQS Integration** section, click **Enable integration with Data Quality Services**.  
  
5.  On the confirmation dialog box, click **OK**.  
  
## Related content

- [Data Quality Matching in the MDS Add-in for Excel](../microsoft-excel-add-in/data-quality-matching-in-the-mds-add-in-for-excel.md)
- [Master Data Services Add-in for Microsoft Excel](../microsoft-excel-add-in/master-data-services-add-in-for-microsoft-excel.md)
- [Installation Tasks for Master Data Services](install-master-data-services.md)
