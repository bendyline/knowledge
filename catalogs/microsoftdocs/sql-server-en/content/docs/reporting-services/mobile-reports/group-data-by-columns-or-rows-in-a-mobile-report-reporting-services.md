---
title: "Group data by columns or rows in a mobile report | Reporting Services"
description: In Mobile Report Publisher, you can organize data by columns or by rows in many types of charts. This article illustrates data structured by columns or by rows.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Group data by columns or rows in a mobile report | Reporting Services

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


You can organize data by columns or by rows in many types of charts in Mobile Report Publisher 
. Follow along in this step-by-step article.

In time, totals, pie, and funnel charts, you can organize the data by rows or by columns. 
* Organizing by columns is useful if a table has several columns of data you'd like to compare. 
* Organizing by rows works better if one column in the table contains the names of the different categories. 

The following steps use a comparison totals table with the simulated data in Mobile Report Publisher 
 to illustrate the difference between structuring the data by rows or by columns in a chart.  

1. Drag a **Comparison totals chart** from the **Layout** tab to the design surface and make it bigger.

1. Select the **Data** tab. You see the SimulatedTable table contains a series of columns, **Metric1** through **Metric5** and **Comparison1** through **Comparison5**. 

   Screenshot of mobile report data group columns.

1. In the **Data properties** pane, **Main Series** is **SimulatedTable**. Select the arrow in the box next to **Main Series**, and you see **Metric1** through **Metric5** selected.

   Screenshot of the options next to the Main Series.


   You see same for **Comparison Series**. **Comparison1** through **Comparison5** are selected.
   
1. Select **Preview**.

   Screenshot of the preview of the Comparisons Totals Chart.

   Each bar in the chart represents one column in the table. The thicker bars are the Metrics columns and the thinner bars are the Comparison columns.

1. Select the back arrow in the upper-left corner to leave preview mode.

1. On the **Layout** tab, in the **Visual properties** pane change **Data structure** from **By columns** to **By rows**.  

1. Select the **Data** tab. Now the SimulatedTable table has a **Category** column along with the **Metric** and **Comparison** columns, with Category A through E. 

   Screenshot of mobile report data group rows.

1.  In the **Data properties** pane, there's now a Category Column box, which lists the Category column from SimulatedTable. In Main Series, you can pick which column to use for the values. By default, Mobile Report Publisher 
 selects Metric1 through Metric5 for the Main Series and Comparison1 through Comparison5 for the Comparison Series. 

    Screenshot of the options next to the Comparison Series.

1. Select **Preview**.

   Screenshot of the preview of the updated Comparisons Totals Chart.

   Now each bar in the chart represents the values for each category in the Category column.

### Related content
* [Visualizations in Reporting Services mobile reports](add-visualizations-to-reporting-services-mobile-reports.md)
