---
title: "Hide legend items on the paginated report chart"
description: Discover how to choose paginated report items that appear on the legend to display the essential data in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Chart legend - hide items in a paginated report (Report Builder)

  **Applies to:**
 


By default, any series added to a non-Shape chart in a paginated report will be added as an item in the legend. For pie, donut, funnel, and pyramid charts, any series added to the chart will add individual data points in the legend.  
  
 You can hide any item on the legend. When you hide a legend item, it will still appear in the chart. This is useful in situations where you do not want to show more information for a series that is added to the chart. For example, if you have added a calculated series like a moving average to the chart, you may want to hide this entry in the legend so that more information is only shown for the original series.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## To hide an item from display in the legend  
  
1.  Right-click on the series you want to hide and select **Series Properties**.  
  
2.  Click **Legend**. Select the **Do not show this series in a legend** option.  
  
    > **Note:**  
    >  You cannot hide a series for one group and not for the others. If you have added a field to the **Series Groups** area, all series belonging to this group will be hidden.  
  
## Related content

- [Chart legend - formatting the legend on a paginated report chart (Report Builder)](chart-legend-formatting-report-builder.md)
- [Formatting data points on a paginated report chart (Report Builder)](formatting-data-points-on-a-chart-report-builder-and-ssrs.md)
- [Chart legend - change item text in a paginated report (Report Builder)](chart-legend-change-item-text-report-builder.md)
- [Add a moving average to a chart in a paginated report (Report Builder)](add-a-moving-average-to-a-chart-report-builder-and-ssrs.md)
