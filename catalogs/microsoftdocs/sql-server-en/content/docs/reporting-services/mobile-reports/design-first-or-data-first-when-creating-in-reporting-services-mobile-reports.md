---
title: "Design first or data first when creating in Reporting Services mobile reports"
description: Mobile Report Publisher supports data-first and design-first approaches to creating reports. Import all data first, or create a design, then import data.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Design first or data first when creating in Reporting Services mobile reports

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.

  
With SQL Server Mobile Report Publisher
, you can quickly create mobile reports that scale well to any screen size, on a design surface with adjustable grid rows and columns, and flexible mobile report elements.   
  
When creating mobile reports, you have your choice of two basic approaches: start with the data first, or start with the design first. Mobile Report Publisher 
 supports both.   
  
## Design first  
  
The following diagram shows the components of the Mobile Report Publisher 
 layout view:   
  
Screenshot of the components of the mobile report.
 
In the design-first approach, you create a mobile report layout first without importing any data. This is a good way to create a mobile report when you are not sure if the data is formatted correctly. Without real data, gallery elements are automatically bound to generated simulated data, which you can export and use as a template to describe the required data.  
  
## Data first  
The data-first approach is to import all required data first, then design the mobile report and set data properties on the mobile report elements. This has the advantage of allowing you to connect each element to real data when you add it to the layout. When using a data-first approach, be sure that your real data is formatted correctly for use with Mobile Report Publisher 
.   
  
 The following diagram shows all the components of the Mobile Report Publisher 
 data view:  
  
DIagram of the components of the data view.
 
  
### Related content  
- [Create and publish mobile reports with SQL Server Mobile Report Publisher](create-mobile-reports-with-sql-server-mobile-report-publisher.md)
