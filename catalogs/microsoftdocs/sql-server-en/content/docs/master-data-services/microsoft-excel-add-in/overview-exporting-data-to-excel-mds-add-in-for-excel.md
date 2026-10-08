---
title: Exporting Data to Excel
description: "Overview: Exporting Data to Excel (MDS Add-in for Excel)"
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
# Overview: Exporting Data to Excel (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
  Add-in for Excel 
, you must export data from the MDS repository into an active Excel worksheet before you can work with it. When you are done working with the data, import it to the MDS repository so other users can share it.  
  
 The data you can export  is limited to the data you have permission to access. Permission to access data is set in the  Master Data Manager 
 web application or set programmatically.  
  
 When you export  large amounts of data, you can set warnings that are displayed when the data that might take a long time to load. To do this, in the **Options** group, click **Settings**. On the **Data** tab, select the **Display filter warning for large data sets**.  
  
> **Warning:**  
>  An MDS-enabled workbook must be opened and updated only in Excel with the MDS Add-in for Excel. Opening an MDS-enabled workbook in Excel on a computer in which the MDS Excel Add-in is not installed is not supported, and could cause corruption of the workbook file. If you want to share data with someone else, email a shortcut query file to them, rather than saving the worksheet and emailing it. For more information on the query, see [Email a Shortcut Query File (MDS Add-in for Excel)](email-a-shortcut-query-file-mds-add-in-for-excel.md).  
  
## Filtering Data  
 You can filter data before exporting to limit the amount of data that you're going to download. This includes choosing which attributes (columns) you want to load, the order you want to display the attributes, and the members (rows of data) you want to work with. For more info see [Filter Data before Exporting (MDS Add-in for Excel)](filter-data-before-exporting-mds-add-in-for-excel.md).  
  
## Connect Automatically and Load Frequently-Used Data  
 If you want to always connect to the same server and export the same set of data, you can create shortcut query files, which contain connection and filter information. For more information about query files, see [Shortcut Query Files (MDS Add-in for Excel)](shortcut-query-files-mds-add-in-for-excel.md).  
  
## Refreshing Data  
 Data in the MDS repository may be updated by other users after you export it. You can retrieve this data without losing changes you've made to non-MDS data. For more information, see [Refreshing Data (MDS Add-in for Excel)](refreshing-data-mds-add-in-for-excel.md).  
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Filter MDS data before you load it into Excel. | [Filter Data before Exporting (MDS Add-in for Excel)](filter-data-before-exporting-mds-add-in-for-excel.md) |
| Load MDS data into Excel. | [Export Data to Excel from Master Data Services](export-data-to-excel-from-master-data-services.md) |
| Change the order of columns before you download data. | [Reorder Columns (MDS Add-in for Excel)](reorder-columns-mds-add-in-for-excel.md) |
  
## Related content

- [Connections (MDS Add-in for Excel)](connections-mds-add-in-for-excel.md)
- [Shortcut Query Files (MDS Add-in for Excel)](shortcut-query-files-mds-add-in-for-excel.md)
- [Master Data Services Add-in for Microsoft Excel](master-data-services-add-in-for-microsoft-excel.md)
- [Security (Master Data Services)](../security-master-data-services.md)
