---
title: Match Similar Data
description: Match Similar Data (MDS Add-in for Excel)
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
# Match Similar Data (MDS Add-in for Excel)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
  Add-in for Excel 
, use Data Quality Services (DQS) functionality to find similarities in your data.  
  
 To perform this procedure, you can:  
  
-   Use the default Data Quality Services knowledge base, or  
  
-   Create your own custom DQS knowledge base and matching policy. For more information, see [Create a Matching Policy](../../data-quality-services/create-a-matching-policy.md).  
  
## Prerequisites  
  
-   You must have a worksheet that contains MDS-managed data. For more information, see [Export Data to Excel from Master Data Services](export-data-to-excel-from-master-data-services.md).  
  
-   Optional. You can combine other data with the MDS-managed data before checking for similarities. For more information, see [Combine Data (MDS Add-in for Excel)](combine-data-mds-add-in-for-excel.md).  
  
### To find similarities by using the default knowledge base  
  
1.  From the worksheet that contains MDS-managed data, in the **Data Quality** group, click **Match Data**.  
  
2.  In the **Match Data** dialog box, from the **DQS Knowledge Base** list, select **DQS Data (default)**.  
  
3.  For each column that contains data you want to match, add a row in the dialog box. For information about the fields in this dialog box, see [How to Set Matching Rule Parameters](../../data-quality-services/create-a-matching-policy.md#MatchingRules).  
  
4.  When the total of all weight values equals 100 percent, click **OK**.  
  
### To find similarities by using a custom knowledge base  
  
1.  From the worksheet that contains MDS-managed data, in the **Data Quality** group, click **Match Data**.  
  
2.  From the **DQS Knowledge Base** list, select the name of your custom knowledge base.  
  
3.  For each column in the worksheet, select a DQS domain.  
  
4.  When all DQS domains are mapped to columns in the worksheet, click **OK**.  
  
## Related content

- [Data Quality Matching in the MDS Add-in for Excel](data-quality-matching-in-the-mds-add-in-for-excel.md)
- [Data Matching](../../data-quality-services/data-matching.md)
- [Data Quality Matching Columns (MDS Add-in for Excel)](data-quality-matching-columns-mds-add-in-for-excel.md)
