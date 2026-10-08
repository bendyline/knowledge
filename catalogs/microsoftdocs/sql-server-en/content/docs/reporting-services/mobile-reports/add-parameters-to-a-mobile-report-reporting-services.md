---
title: "Add parameters to a mobile report"
description: Reporting Services mobile report can have parameters, so report readers can filter your reports. Such a report can also be the target of a drillthrough.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Add parameters to a mobile report

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


You can create a  Reporting Services 
 mobile report with parameters, so you and your report readers can filter your reports. A report with parameters can also be the target of a [drillthrough from a source report](add-drillthrough-from-a-mobile-report-to-other-mobile-reports-or-urls.md). 

To create a mobile report with parameters, you start with a shared dataset with at least one parameter. Read about [creating parameters in a shared dataset](../report-data/create-a-shared-dataset-or-embedded-dataset-report-builder-and-ssrs.md). Mobile reports don't support null value(s) for default parameters, so make sure your parameters have default values other than null.

After you add parameters to a mobile report, you create a URL to [open the report with query string parameters](open-a-mobile-report-with-specific-query-string-parameters-reporting-services.md). 

1. In the top bar of the  Reporting Services 
 web portal, select **New** > **Mobile Report**.  
  
   Screenshot of the New menu and the Mobile Report option.
  
     
1. Select the **Data** tab.   
  
1. Select **Add Data**.  
  
1. Select **Report Server**, then select a server.  
  
1. Navigate to the shared datasets on the server and select one that has parameters.  
  
   In the grid, you see the data in the dataset. The green circle with brackets **{ }** marks a dataset with a parameter.  
     
   Screenshot of the TimeChartLoD with the brackets highlighted.
  
1. Select the cog on the tab, then select **Param {}**.  
  
   Screenshot of the cog with the Param {} option highlighted.
  
  
1. Select the report element that passes values to the parameter.  
  
   Screenshot of the Set dataset parameters screen.
  
     
1. Select **Preview** to see how the report looks. In this report, the selection list is using the Category parameter.

   Screenshot of the preview of the report with the Selection list 1 called out.
 
   
1. When you select a value in the selection list, the report is filtered to that value, in this case, Accessories.

   Screenshot of the preview of the report with the Selection list 1 called out and the Accessories option selected.
   
  
### Related content 
-  [Open a mobile report with specific query string parameters](open-a-mobile-report-with-specific-query-string-parameters-reporting-services.md)
-  [Add drillthrough from a mobile report to other mobile reports or URLs](add-drillthrough-from-a-mobile-report-to-other-mobile-reports-or-urls.md)
-  [Create a shared or embedded dataset](../report-data/create-a-shared-dataset-or-embedded-dataset-report-builder-and-ssrs.md)
- [Create and publish mobile reports with SQL Server Mobile Report Publisher](create-mobile-reports-with-sql-server-mobile-report-publisher.md)
