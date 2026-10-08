---
title: "Add scale breaks to a paginated report chart"
description: Find out about using a scale break to display two distinct ranges in the same paginated report chart area in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---

# Add scale breaks to a paginated report chart (Report Builder)

  **Applies to:**
 


  A scale break is a stripe drawn across the plotting area of a chart to denote a pause continuity between the high and low values on a value axis. This axis is usually the vertical, or y-axis. Use a scale break to display two distinct ranges in the same chart area in a paginated report.  
  
 Screenshot of a chart with a scale break.
  
  
> **Note:**  
>  You can't specify where to place a scale break on your chart. The chart uses its own calculations based on the values in your dataset to determine whether there is sufficient separation between data ranges to draw a scale break on the value axis, or y-axis, at run time.  
  
 An example of a chart with scale breaks is available as a sample report. For more information about downloading this sample report and others, see [Report Builder and Report Designer sample reports](../tools/reporting-services-tools.md).
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
### Enable scale breaks on the chart  
  
1.  Right-click the vertical axis, and then select **Axis Properties**. The **VerticalAxis Properties** dialog opens.  
  
1.  Select the **Enable scale breaks** box.  
  
### Change the style of the scale break  
  
1.  Open the **Properties** pane.  
  
1.  On the design surface, right-click on the y-axis of the chart. The properties for the y-axis object, named Chart Axis by default, are displayed in the **Properties** pane.  
  
1.  In the **Scale** section, expand the **ScaleBreakStyle** property.  
  
1.  Change the values for **ScaleBreakStyle** properties, such as **BreakLineType** and **Spacing**. For more information about scale break properties, see [Display a series with multiple data ranges on a chart (Report Builder)](displaying-a-series-with-multiple-data-ranges-on-a-chart.md).  

## Related content

- [Charts in a paginated report (Report Builder)](charts-report-builder-and-ssrs.md)
- [Formatting a chart in a paginated report (Report Builder)](formatting-a-chart-report-builder-and-ssrs.md)
- [Axis Properties dialog, axis options](https://learn.microsoft.com/previous-versions/sql/)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
