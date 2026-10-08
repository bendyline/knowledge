---
title: "Displaying a series with multiple data ranges on a paginated report chart"
description: Discover ways to improve readability of your paginated report charts using scale breaks, filters, and by separating the data ranges in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---

# Displaying a series with multiple data ranges on a paginated report chart (Report Builder)

  **Applies to:**
 


  Chart will use the minimum and maximum values of a series to calculate the axis scale in a paginated report. When a series on your chart contains more than one range of data, the data points can become obscured, and only a few data points to be seen easily on the chart. For example, suppose a report displays daily sales totals over a period of 30 days.  
  
 Chart with multiple data ranges  
  
 For most of the month, the sales are between 10 and 40. However, a one-week sales marketing campaign has caused a sudden sales increase at the beginning of April. This change in sales data produces an uneven distribution of data points that reduces the overall readability of the chart.  
  
 There are different ways to improve readability:  
  
-   **Enable scale breaks**. If your data forms two or more sets of data ranges, use a scale break to remove the gap between the ranges. A scale break is a stripe drawn across the plotting area to denote a break between the high and low values of a series.  
  
-   **Filter out unnecessary values**. If you have data points that are obscuring the important data range to be displayed on the chart, remove the unwanted points using a report filter. For information on how to add a filter to the chart in Report Builder, see [Add Dataset Filters, Data Region Filters, and Group Filters (Report Builder and SSRS)](add-dataset-filters-data-region-filters-and-group-filters.md).  
  
-   **Plot each data range as a separate series for multiple series comparison**. If you have more than two data ranges, consider separating the data ranges into separate series. For more information, see [Multiple Series on a Chart (Report Builder and SSRS)](multiple-series-on-a-chart-report-builder-and-ssrs.md).  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Displaying Multiple Data Ranges Using Scale Breaks  
 When you enable a scale break, the chart calculates where to draw a line across the chart. You must have sufficient separation between ranges to draw a scale break. By default, a scale break can be added only if there is a separation between the data ranges of at least 25% of the chart.  
  
 Chart with scale break  
  
> **Note:**  
>  You cannot specify where to place a scale break on a chart. You can, however, modify how the scale break is calculated, described later in this topic.  
  
 If you enable a scale break but it does not appear, even though there is sufficient distance between the data ranges, you can set the CollapsibleSpaceThreshold property to a value less than 25. The CollapsibleSpaceThreshold specifies the percent of collapsible space required between the data ranges. For more information, see [Add Scale Breaks to a Chart (Report Builder and SSRS)](add-scale-breaks-to-a-chart-report-builder-and-ssrs.md).  
  
 Charts support up to five scale breaks per chart; however, displaying more than one scale break can cause the chart to become unreadable. If you have more than two data ranges, consider using a different method for displaying this data. For more information, see [Multiple Series on a Chart (Report Builder and SSRS)](multiple-series-on-a-chart-report-builder-and-ssrs.md).  
  
## Unsupported Scale Break Scenarios  
 Scale breaks are not supported in the following chart scenarios:  
  
-   The chart is 3-D enabled.  
  
-   A logarithmic value axis has been specified.  
  
-   The value axis minimum or maximum has been explicitly set.  
  
-   The chart type is polar, radar, pie, donut, funnel, pyramid, or any stacked chart.  
  
 An example of chart with scale breaks is available as a sample report. For more information about downloading this sample report and others, see [Report Builder and Report Designer sample reports](../tools/reporting-services-tools.md).

## Related content

- [Multiple series on a paginated report chart (Report Builder)](multiple-series-on-a-chart-report-builder-and-ssrs.md)
- [Formatting a chart in a paginated report (Report Builder)](formatting-a-chart-report-builder-and-ssrs.md)
- [3D, bevel, and others in a paginated report (Report Builder)](chart-effects-3d-bevel-and-other-report-builder.md)
- [Charts in a paginated report (Report Builder)](charts-report-builder-and-ssrs.md)
- [Axis Properties Dialog Box, Axis Options](https://learn.microsoft.com/previous-versions/sql/)
- [Collect small slices on a paginated report pie chart (Report Builder)](collect-small-slices-on-a-pie-chart-report-builder-and-ssrs.md)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
