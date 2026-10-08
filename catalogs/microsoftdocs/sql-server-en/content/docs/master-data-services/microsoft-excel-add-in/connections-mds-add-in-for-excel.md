---
title: Connections
description: To download data to the Master Data Services Add-in for Excel, first create a connection. Each time you start Excel, you must connect to a repository.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - microsoft-excel-add-in
  - build-2025
---
# Connections (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  To download data in to the  Master Data Services 
  Add-in for Excel 
, you must first create a connection. A connection is how the  Master Data Services 
 web service knows which MDS database to connect to.  
  
 The connection string is usually the URL of the  Master Data Manager 
 web application, for example `https://contoso/mds`.  
  
 Each time you start Excel, you must connect to an MDS repository. The only exception is when the active spreadsheet already contains MDS-managed data. In this case, a connection is automatically made each time you refresh or publish data in the sheet.  
  
 You can create multiple connections. The most recently-accessed connection is considered the default.  
  
 Multiple users can be connected at the same time. However, conflicts can arise when multiple users attempt to publish the same data. For more information, see [Overview: Importing Data from Excel (MDS Add-in for Excel)](overview-importing-data-from-excel-mds-add-in-for-excel.md).  
  
## Connect Automatically and Load Frequently-Used Data  
 If you want to always connect to the same server and load the same set of data, you can create shortcut query files, which contain connection and filter information. For more information about query files, see [Shortcut Query Files (MDS Add-in for Excel)](shortcut-query-files-mds-add-in-for-excel.md).  
  
## Data Quality Services  
 The  Add-in for Excel 
 has Data Quality Services functionality to help you match data before publishing it to the MDS repository. When you make a connection, if a DQS database is installed on the same instance of  SQL Server 
 as the MDS database, you will be able to view DQS buttons on the ribbon. If the DQS_Main database does not exist on the instance, these buttons are not displayed and data quality functionality is not available.  
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Create a connection to a  Master Data Services |
 | database. | [Connect to an MDS Repository (MDS Add-in for Excel)](connect-to-an-mds-repository-mds-add-in-for-excel.md) |
| Load MDS data into Excel. | [Export Data to Excel from Master Data Services](export-data-to-excel-from-master-data-services.md) |
| Filter MDS data before you load it into Excel. | [Filter Data before Exporting (MDS Add-in for Excel)](filter-data-before-exporting-mds-add-in-for-excel.md) |
  
## Related content

- [Overview: Exporting Data to Excel (MDS Add-in for Excel)](overview-exporting-data-to-excel-mds-add-in-for-excel.md)
- [Shortcut Query Files (MDS Add-in for Excel)](shortcut-query-files-mds-add-in-for-excel.md)
- [Master Data Services Add-in for Microsoft Excel](master-data-services-add-in-for-microsoft-excel.md)
