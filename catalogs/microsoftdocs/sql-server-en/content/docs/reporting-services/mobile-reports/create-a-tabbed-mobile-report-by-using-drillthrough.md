---
title: "Create a tabbed mobile report by using drillthrough | Reporting Services mobile reports"
description: Learn how to create a Reporting Services mobile report that looks and acts like a tabbed report by using drillthrough and parameters.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Create a tabbed mobile report by using drillthrough

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


Learn how to create a  Reporting Services 
 mobile report that looks and acts like a tabbed report by using drillthrough and parameters.

For example, in this report, the gauges across the top act like tabs. When you select the Transportation gauge, the data in the rest of the chart is filtered to the transportation data.

Screenshot showing a Financials - Transportation report with the Transportation gauge selected.

Behind the scenes, this report is really a set of five separate reports, each with a different parameter that filters the report to match the gauge selected at the top of the report. You create all five reports first, then for each of the five reports, you make the other four gauges into drillthroughs to the other four reports.

Here are the steps for this example.

## Create the basic report

1. Create a report called Sales, with five gauges:

    * Sales
    * Transportation
    * Fuel
    * Storage
    * Misc Expenses

   Screenshot of a report called Sales with five gauges.

    
1. Set **Accent** to **On** for the Sales gauge, so it contrasts with the rest of the report--in this case, white on black.

    Screenshot of the Sales gauge with a red arrow pointing to the Accent slider in the On position.

1. Save it to a  Reporting Services 
 report server.

## Make copies of the report

1. Make four copies of the Sales report and name them: 

    * Transportation
    * Fuel
    * Storage
    * Misc Expenses

1. Save them to the  Reporting Services 
 report server.

## Set the gauge as a drillthrough

In this section, you set each gauge, other than the Sales gauge, as a drillthrough to its respective report.

1. In the Sales report, select the Transportation gauge.

    Screenshot of the Sales report with a red arrow from the Transportation gauge to the Drillthrough target option.

1. With the **Layout** tab selected, in the **Visual properties** pane, select **Drillthrough target**.

1. Select **Mobile report**.

1. Navigate to and select the report that is the destination for the drillthrough--in this case, "Financials - Transportation."

    Screenshot of the Open from server dialog box with the Financials - Transportation option called out.


1. In **Configure target report**, select the parameter to filter the report, and select **Apply**.

   Screenshot of the Configure target report section showing the Financials - Transportation Report parameters.

   
1. Repeat these steps for each of the other gauges in the Sales report. 

## Set the gauges for the other reports

1.  Open the Transportation report, set the Sales gauge as a drillthrough to the Sales report, and the other three gauges as drillthroughs to their respective reports.

1. Still in the Transportation report, set **Accent** for the Transportation gauge to **On**, contrast with the rest of the report.

1. Repeat these steps for the Fuel, Storage, and Misc Expenses reports. 

## View the report in the web portal

1. Go to the  Reporting Services 
 report server and open one of the reports. 

1. Notice that each of the gauges has a drillthrough icon in the upper-right corner.

    Screenshot of the Fuel gauge.


1. Select one of the gauges to go to the report filtered to that gauge's data.

   Screenshot showing a Financials - Transportation report with a red arrow pointing to the Transportation gauge, which also has a red box around it.


### Related content
	
* [Add parameters to a mobile report](add-parameters-to-a-mobile-report-reporting-services.md)
* [Add drillthrough from a mobile report to other mobile reports or URLs](add-drillthrough-from-a-mobile-report-to-other-mobile-reports-or-urls.md)
