---
title: "Add a custom map to a Reporting Services mobile report"
description: You can add a custom map to a Reporting Services mobile report. This article describes how to load and connect data to a custom map.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Add a custom map to a Reporting Services mobile report

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


Custom maps require two files:  
* An .SHP file for shape geometries  
* A .DBF file for metadata  
  
For more information about custom maps, see [Custom maps in Reporting Services mobile reports](custom-maps-in-reporting-services-mobile-reports.md).  
  
Store the two files in the same folder. The file names of the two must match, for example, `canada.shp` and `canada.dbf`. The first column of the metadata in the DBF file is used to match with the key value of the corresponding shape's name, or key. This value is to be used when populating the map with data.
  
## Load a custom map  
  
1. On the **Layout** tab, select a map type: **Gradient Heat Map**, **Range Stop Heat Map**, or **Bubble Map**, drag it to the design surface, and make it the size you want.  
  
   Screenshot of the Maps gallery with the Bubble Map highlighted.
  
1. In **Layout** view, select the **Visual Properties** panel, choose **Map**, and then select **Custom Map From File**.   
  
   Screenshot of the option to select a custom map highlighted.
  
1. In the **Open** dialog, browse to the location of the SHP and DBF files and select both of them.   
  
   Screenshot of the selected SHP and DBF files.
  
## Connect data to a custom map  
When you first add the custom map to your report, Mobile Report Publisher 
 populates it with simulated geography data.  
  
Screenshot of the simulated geography table.
  
Displaying real data in your custom map is the same as displaying data in the built-in maps. Follow the steps in [Maps in Reporting Services mobile reports](maps-in-reporting-services-mobile-reports.md) to display your data.  
  
### Related content
- [Custom maps in Reporting Services mobile reports](custom-maps-in-reporting-services-mobile-reports.md)  
- [Maps in Reporting Services mobile reports](maps-in-reporting-services-mobile-reports.md)  
- [Create and publish mobile reports with SQL Server Mobile Report Publisher](create-mobile-reports-with-sql-server-mobile-report-publisher.md)
