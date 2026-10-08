---
title: Connect to an MDS Repository
description: In the Master Data Services Add-in for Excel, you must connect to a Master Data Services repository before you can load or publish data.
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
# Connect to an MDS Repository (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
  Add-in for Excel 
, you must connect to an MDS repository before you can load or publish data.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **Explorer** functional area.  
  
### To connect to an MDS repository  
  
1.  In the MDS  Add-in for Excel 
, on the **Master Data** tab, in the **Connect and Load** group, click the arrow under the **Connect** button and click **Manage Connections**.  
  
2.  On the **Manage Connections** dialog box, in the **New connection** section, click **Create a new connection**.  
  
3.  Click **New**.  
  
4.  On the **Add New Connection** dialog box, in the **Description** field, type a description for your connection. This connection will be displayed when you click the arrow under the **Connect** button on the toolbar.  
  
5.  In the **MDS server address** box, type the URL of the  Master Data Manager 
 web application, for example `https://contoso/mds`.  
  
    > **Note:**  
    >  Ensure that you use the computer name; do not use "localhost".  
  
6.  Click **OK**. The name is displayed in the **Existing Connections** section.  
  
7.  Optionally, click **Test** to test the connection. A confirmation or error dialog is displayed. Click **OK** to close it.  
  
8.  Click **Connect**. The **Master Data Services** pane is displayed.  
  
## Related content

- [Connections (MDS Add-in for Excel)](connections-mds-add-in-for-excel.md)
- [Export Data to Excel from Master Data Services](export-data-to-excel-from-master-data-services.md)
- [Filter Data before Exporting (MDS Add-in for Excel)](filter-data-before-exporting-mds-add-in-for-excel.md)
