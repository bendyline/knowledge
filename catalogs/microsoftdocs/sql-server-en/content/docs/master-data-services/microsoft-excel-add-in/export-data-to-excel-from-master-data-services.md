---
title: Export Data to Excel
description: Export Data to Excel from Master Data Services
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
# Export Data to Excel from Master Data Services


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
  Add-in for Excel 
, you must export data from the MDS repository in order to work with it.  
  
 If you want to filter the dataset before loading, see [Filter Data before Exporting (MDS Add-in for Excel)](filter-data-before-exporting-mds-add-in-for-excel.md) instead.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
### To export data from MDS into Excel  
  
1.  Open Excel and on the **Master Data** tab, connect to an MDS repository. For more information, see [Connect to an MDS Repository (MDS Add-in for Excel)](connect-to-an-mds-repository-mds-add-in-for-excel.md).  
  
2.  In the **Master Data Explorer** pane, select a model and version. The list of entities is populated.  
  
    -   If the **Master Data Explorer** pane is not visible, in the **Connect and Load** group, click **Show Explorer**.  
  
    -   If the **Master Data Explorer** pane is disabled, it is because the existing sheet already contains MDS-managed data. To enable the pane, open a new worksheet.  
  
3.  In the **Master Data Explorer** pane, in the list of entities, double-click the entity you want to load.  
  
    > **Note:**  
    >  -   Only the first one million members are loaded into Excel. To filter the list before loading, on the ribbon in the **Connect and Load** group, click **Filter**.  
    > -   In columns that are constrained lists (domain-based attributes), by default only the first 25,000 values are loaded. You can change this number in the MaximumDbaEntitySize property in the excelusersettings.config file located on the computer that Excel is installed on. This file is located in C:\Users\\<user\>\AppData\Local\Microsoft\Microsoft SQL Server\130\MasterDataServices\\.  
    >   
    >      If a domain-based attribute has number of values that exceeds the MaximumDbEntitySize property setting, the list of values is not loaded.  
  
    > **Note:**  
    >  When you load text-delimited data using the Add-in for Microsoft Excel with 32-bit Excel, and the settings for the **Cell Count to Load** and **Cell Count to Publish** properties are both set to the maximum of 1000, an out-of-memory error will occur. You have to use 64-bit Excel to use the maximum settings for **Cell Count to Load** and **Cell Count to Publish**.  
  
## Related content

- [Overview: Exporting Data to Excel (MDS Add-in for Excel)](overview-exporting-data-to-excel-mds-add-in-for-excel.md)
- [Filter Dialog Box (MDS Add-in for Excel)](filter-dialog-box-mds-add-in-for-excel.md)
- [Overview: Importing Data from Excel (MDS Add-in for Excel)](overview-importing-data-from-excel-mds-add-in-for-excel.md)
- [Import Data from Excel to Master Data Services (MDS Add-in for Excel)](import-data-from-excel-to-master-data-services-mds-add-in-for-excel.md)
