---
title: "Scatter charts in a paginated report"
description: Find out how to use scatter charts in a paginated report, with values represented by point positions on a chart, to compare aggregated data across categories in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Scatter charts in a paginated report (Report Builder)

  **Applies to:**
 


  A scatter chart displays a series as a set of points in a paginated report. Values are represented by the position of the points on the chart. Categories are represented by different markers on the chart. Scatter charts are typically used to compare aggregated data across categories. For more information on how to add data to a scatter chart, see [Charts (Report Builder and SSRS)](charts-report-builder-and-ssrs.md)  
  
 The following illustration shows an example of a scatter chart.  
  
 Scatter chart  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Variations  
  
-   **Bubble.** Bubble charts display the difference between two values of a data point based on the size of the bubble. The larger the bubble, the larger the difference between the two values.  
  
-   **3-D Bubble**. A bubble chart displayed in 3-D.  
  
## Data Considerations for a Scatter Chart  
  
-   Scatter charts are commonly used for displaying and comparing numeric values, such as scientific, statistical, and engineering data.  
  
-   Use the scatter chart when you want to compare large numbers of data points without regard to time. The more data that you include in a scatter chart, the better the comparisons that you can make.  
  
-   The bubble chart requires two values (top and bottom) per data point.  
  
-   Scatter charts are ideal for handling the distribution of values and clusters of data points. This is the best chart type if your dataset contains many points (for example, several thousand points). Displaying multiple series on a point chart is visually distracting and should be avoided. In this scenario, consider using a line chart.  
  
-   By default, scatter charts display data points as circles. If you have multiple series on a scatter chart, consider changing the marker shape of each point to be square, triangle, diamond, or another shape.  
  
## Related content

- [Charts in a paginated report (Report Builder)](charts-report-builder-and-ssrs.md)
- [Chart types in a paginated report (Report Builder)](chart-types-report-builder-and-ssrs.md)
- [Formatting a chart in a paginated report (Report Builder)](formatting-a-chart-report-builder-and-ssrs.md)
- [Line charts in a paginated report (Report Builder)](line-charts-report-builder-and-ssrs.md)
