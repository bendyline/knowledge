---
title: "Change a chart type in a paginated report"
description: Learn how to change your paginated report chart type at any point in report design. Improve interpretation with characteristics appropriate for your data in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Change a chart type in a paginated report (Report Builder)

  **Applies to:**
 


When you first insert a chart into a paginated report, the **Select Chart Type** dialog appears. If you cancel this dialog, a Column chart type is added by default.  
  
 At any point when designing the report, you can change the chart type to something more suitable to the report. It's important to select the correct chart type for your data so that it can be interpreted correctly. You should understand each chart type's characteristics to determine what chart type is best suited for your data. For more information, see [Chart types (Report Builder)](chart-types-report-builder-and-ssrs.md).  
  
 When multiple series display on a chart, you might want to change the chart type of an individual series. You can only change the chart type of an individual series if the chart type is Area, Column, Line, or Scatter. For all other chart types, all series in your chart are changed to the selected chart type.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Change the chart type  
  
1.  In Design view, right-click the chart and then select **Change Chart Type**.  
  
    > **Note:**  
    >  When there are multiple series on a chart, you must right-click on the series, not the chart, which you want to change.  
  
1.  In the **SelectChart Type** dialog, select a chart type from the list.  
  
## Related content

- [Charts in a paginated report (Report Builder)](charts-report-builder-and-ssrs.md)
- [Gauges in a paginated report (Report Builder)](gauges-report-builder-and-ssrs.md)
- [Add a chart to a paginated report (Report Builder)](add-a-chart-to-a-report-report-builder-and-ssrs.md)
