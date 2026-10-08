---
title: "Work with simulated data in Reporting Services mobile reports"
description: When you place a gallery element on the design surface, Mobile Report Publisher generates simulated data for it. Design your prototypes with the simulated data.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Work with simulated data in Reporting Services mobile reports

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


When you place a gallery element on the design surface, Mobile Report Publisher 
 immediately generates simulated data for that element. This data serves many useful purposes when creating mobile reports.   
  
Screenshot of the simulated data.

  
Simulated data helps when taking a design-based approach to mobile report creation. Initially populating elements with simulated data allows you to create mobile report prototypes quickly without having to address specific data requirements. These mobile reports can then be evaluated for the overall aesthetics and effectiveness.  
  
## Create an Excel file with simulated data as a template  
  
Simulated data also provides a template that accurately represents the data requirements of a particular mobile report design.   
  
-  Select **Export All Data** in the Data View.   
  
Mobile Report Publisher 
 generates an Excel document containing the simulated data, allowing for quick substitution of actual data, ready for import.   
  
## How simulated data behaves  
  
The simulated data generated is tailored specifically to the mobile report you're creating. As you place more elements on the design surface, the associated simulated data grows and changes to provide the best possible experience short of real data. This evolution ensures that extra fields and filter possibilities are available. This availability is in case you add extra series to chart visualizations or expand the scope of one or more mobile report elements another way.  
  
As mentioned previously, you can export simulated data to an Excel file, creating a perfect data template for the associated mobile report. You can  swap in your own real data into the Excel file and import it back into the Mobile Report Publisher 
.   
  
After all controls are bound to real data, simulated tables that are no longer in use are automatically removed from the mobile report. You can't remove simulated tables still referenced by elements on the design surface.  
  
> **Note:**  
> Simulated data does not add to the overall mobile report footprint because it's not serialized with the mobile report, but generated on-the-fly at runtime.  
  
### Related content  
- [Create and publish mobile reports with SQL Server Mobile Report Publisher](create-mobile-reports-with-sql-server-mobile-report-publisher.md)
