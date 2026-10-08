---
title: "Data for Reporting Services mobile reports"
description: After you import data into SQL Server Mobile Report Publisher, mobile report creation and design is the same, whether data is from Excel files or shared datasets.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Data for Reporting Services mobile reports

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


The SQL Server Mobile Report Publisher
 data model is simple. Data is imported into Mobile Report Publisher 
 as a collection of datasets. Formal relationships between datasets aren't necessary. Lookups from one dataset to another work as long as the key values match. The mobile report runtime handles date/time aggregations and they match between different datasets, even if the date/time data granularity is different between datasets.   
  
You can import data from two types of sources:   
  
* **Local Excel files**: Select an Excel document and pick which worksheet(s) to import. After import, the data is stored within the mobile report definition. To refresh the data from the original Excel file, use the **Refresh Data** command in the upper-right corner on the Mobile Report Publisher 
 **Data** tab. Read more about [preparing Excel data for SSRS mobile reports](prepare-excel-data-for-reporting-services-mobile-reports.md).  
  
* **SQL Server Mobile Report Publisher shared datasets**: Browse the list of published datasets on the server and select the ones to add to the mobile report. Mobile reports based on server data always stay connected to the original server datasets and reflect the latest state of the data on the server. See a [list of supported data sources](../report-data/data-sources-supported-by-reporting-services-ssrs.md).   
  
  Read more about [getting data from shared datasets in Mobile Report Publisher](get-data-from-shared-datasets-in-reporting-services-mobile-reports.md).  
  
After you import data into Mobile Report Publisher 
, the rest of the mobile report creation and design experience is the same, regardless of where the data came from.   
  
## Connect mobile report elements to data 
  
Each SQL Server Mobile Report Publisher element contains one or more data settings. For example, the Radial Gauge element contains two data settings: Main Value and Comparison Value. Each of these settings points to exactly one field (column) in a specific dataset.   
  
The mobile report runtime provides aggregated values for the gauge, based on user selections. The Comparison Value of the same Radial Gauge instance can be bound to a field from a different dataset.   
  
### Related content 
-  [Prepare data for Reporting Services mobile reports](prepare-data-for-reporting-services-mobile-reports.md)
- [Create and publish mobile reports with SQL Server Mobile Report Publisher](create-mobile-reports-with-sql-server-mobile-report-publisher.md)  
- [Get data from shared datasets](get-data-from-shared-datasets-in-reporting-services-mobile-reports.md)
- [Retain date formatting for Analysis Services data in mobile reports](retain-date-formatting-for-analysis-services-in-mobile-reports.md)
