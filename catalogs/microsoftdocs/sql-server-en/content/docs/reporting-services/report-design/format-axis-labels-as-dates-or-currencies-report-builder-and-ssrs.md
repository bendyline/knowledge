---
title: "Format axis labels as dates or currencies in a paginated report"
description: Specify a date or time interval for an x-axis by formatting the axis labels and setting the type of axis interval to a valid interval in a paginated report.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Format axis labels as dates or currencies in a paginated report (Report Builder)

  **Applies to:**
 


When you show properly formatted DateTime values on an axis in a paginated report, a chart will automatically display these values as days. To specify a date/time interval for the x-axis, such as an interval of months or an interval of hours, you must format the axis labels and set the type of axis interval to a valid date or time interval.  
  
> **Note:**  
>  In column and scatter charts, the horizontal, or x-axis, is the category axis. In bar charts, the vertical, or y-axis, is the category axis.  
  
 In order to format time intervals correctly, the values displayed on the x-axis must evaluate to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) data type. If your field has a data type of [System.String](https://learn.microsoft.com/search/?terms=System.String), the chart will not calculate intervals as dates or times. For more information, see [Charts (Report Builder and SSRS)](charts-report-builder-and-ssrs.md).  
  
 When a numeric value is added to the y-axis, by default, the chart does not format the number before displaying it. If your numeric field is a sales figure, consider formatting the numbers as currencies to increase the readability of the chart.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## To format x-axis labels as monthly intervals  
  
1.  Right-click the horizontal, or x-axis, of the chart, and select **HorizontalAxis Properties**.  
  
2.  In the **HorizontalAxis Properties** dialog box, select **Number**.  
  
3.  From the **Category** list, select **Date**. From the **Type** list, select a date format to apply to the x-axis labels.  
  
4.  Select **Axis Options.**  
  
5.  In **Interval**, type **1**. In **Interval type** property, select **Months**.  
  
    > **Note:**  
    >  If you do not specify an interval type, the chart will calculate intervals in terms of days.  
  
6.  Select **OK**.
  
## To format y-axis labels using a currency format  
  
1.  Right-click the vertical, or y-axis, of the chart, and select **VerticalAxis Properties**.  
  
2.  In the **VerticalAxis Properties** dialog box, select **Number**.  
  
3.  From the **Category** list, select **Currency**. From the **Symbol** list, select a currency format to apply to the y-axis labels.  
  
4.  Select **OK**.
  
## Related content

- [Formatting axis labels on a paginated report chart (Report Builder)](formatting-axis-labels-on-a-chart-report-builder-and-ssrs.md)
- [Formatting a chart in a paginated report (Report Builder)](formatting-a-chart-report-builder-and-ssrs.md)
- [Specify a logarithmic scale in a paginated report (Report Builder)](specify-a-logarithmic-scale-report-builder-and-ssrs.md)
- [Specify an axis interval in a paginated report (Report Builder)](specify-an-axis-interval-report-builder-and-ssrs.md)
