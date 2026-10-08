---
title: Filter Data Before Exporting
description: Filter Data before Exporting (MDS Add-in for Excel)
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
# Filter Data before Exporting (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
  Add-in for Excel 
, filter data when you want to limit the size or scope of data that you are exporting to Excel.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
### To filter data before exporting  
  
1.  Open Excel and on the **Master Data** tab, connect to an MDS repository. For more information, see [Connect to an MDS Repository (MDS Add-in for Excel)](connect-to-an-mds-repository-mds-add-in-for-excel.md).  
  
2.  In the **Master Data Explorer** pane, select a model and version. The list of entities is populated.  
  
    -   If the **Master Data Explorer** pane is not visible, in the **Connect and Load** group, click **Show Explorer**.  
  
    -   If the **Master Data Explorer** pane is disabled, it is because the existing sheet already contains MDS-managed data. To enable the pane, open a new worksheet.  
  
3.  In the **Master Data Explorer** pane, in the list of entities, click the entity you want to filter.  
  
4.  On the ribbon, in the **Connect and Load** group, click **Filter**.  
  
5.  Complete the **Filter** dialog box by selecting the attributes (columns) to display, setting the order of the columns, and if needed, filtering the data so fewer rows are returned. View the **Summary** pane for how much data will be returned. For more information, see [Filter Dialog Box (MDS Add-in for Excel)](filter-dialog-box-mds-add-in-for-excel.md).  
  
6.  Click **Load Data**. The sheet is populated with MDS-managed data.  
  
    > **Note:**  
    >  -   Only the first one million members are loaded into Excel.  
    > -   In columns that are constrained lists (domain-based attributes), by default only the first 25000 values are loaded.  
  
## Related content

- [Overview: Exporting Data to Excel (MDS Add-in for Excel)](overview-exporting-data-to-excel-mds-add-in-for-excel.md)
- [Filter Dialog Box (MDS Add-in for Excel)](filter-dialog-box-mds-add-in-for-excel.md)
- [Reorder Columns (MDS Add-in for Excel)](reorder-columns-mds-add-in-for-excel.md)
- [Import Data from Excel to Master Data Services (MDS Add-in for Excel)](import-data-from-excel-to-master-data-services-mds-add-in-for-excel.md)
