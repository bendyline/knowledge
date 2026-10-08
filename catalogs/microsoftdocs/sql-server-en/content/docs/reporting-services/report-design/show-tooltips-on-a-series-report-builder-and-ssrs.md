---
title: "Show ToolTips on a series in a paginated report"
description: Learn how to add a ToolTip to each data point on the series of a chart in a paginated report to display related information in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Show ToolTips on a series in a paginated report (Report Builder)

  **Applies to:**
 


  You can add a ToolTip to each data point on the series of a chart to display information related to the data point, such as the group name, the value of the data point, or the percentage of the data point relative to the series total. When users hover over the data point in a rendered paginated report, they'll see this information.  
  
 You cannot add a ToolTip to a calculated series.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## To specify a ToolTip on each data point  
  
1.  Right-click on the series or right-click on the field in the **Values** area, and click **Series Properties**.  
  
2.  Click **Series Data** and, for the **ToolTip** property, type in a string or expression. You can use any chart-specific keyword to represent another element on the chart. For more information, see [Formatting Data Points on a Chart (Report Builder and SSRS)](formatting-data-points-on-a-chart-report-builder-and-ssrs.md).  
  
## Related content

- [Formatting data points on a paginated report chart (Report Builder)](formatting-data-points-on-a-chart-report-builder-and-ssrs.md)
- [Chart legend - change item text in a paginated report (Report Builder)](chart-legend-change-item-text-report-builder.md)
- [Formatting series colors on a paginated report chart (Report Builder)](formatting-series-colors-on-a-chart-report-builder-and-ssrs.md)
- [Add a drillthrough action on a paginated report (Report Builder)](add-a-drillthrough-action-on-a-report-report-builder-and-ssrs.md)
