---
title: "Stock charts in a paginated report"
description: Display financial or scientific data using up to four values per data point in a paginated report using markers such as lines or triangles in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---

# Stock charts in a paginated report (Report Builder)

  **Applies to:**
 


  A stock chart in a paginated report is specifically designed for financial or scientific data that uses up to four values per data point. These values align with the high, low, open and close values that are used to plot financial stock data. This chart type displays opening and closing values by using markers, which are typically lines or triangles. In the following example, the opening values are shown by the markers on the left, and the closing values are shown by the markers on the right.  
  
 Stock chart  
  
 An example of a stock chart is available as a sample Report Builder report. For more information about downloading this sample report and others, see [Report Builder and Report Designer sample reports](../tools/reporting-services-tools.md).
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Variations  
  
-   **Candlestick**. The candlestick chart is a specialized form of the stock chart, wherein boxes are used to show the range between the open and close values. Like the stock chart, the candlestick chart can display up to four values per data point.  
  
## Data Considerations for Stock Charts  
  
-   When presenting many stock data points, such as annual stock price trend, it is difficult to distinguish each open, close, high and low value of each data point. In this scenario, consider using a line chart instead of a stock chart.  
  
-   When axis labels are generated, labeling usually begins at zero.  In general, stock prices do not fluctuate to the same degree as other data sets. For this reason, you may want to disable the axis labels from starting at zero, in order to get a better view of your data. To do this, set **IncludeZero** to **false** in the **Axis Properties** dialog box or the Properties window. For more information about how the chart generates axis labels, see [Formatting Axis Labels on a Chart (Report Builder and SSRS)](formatting-axis-labels-on-a-chart-report-builder-and-ssrs.md).  
  
-   Report Builder provides many calculated formulas for use with stock charts, including Price Indicator, Relative Strength Index, MACD and more.  

## Related content

- [Range charts in a paginated report (Report Builder)](range-charts-report-builder-and-ssrs.md)
- [Charts in a paginated report (Report Builder)](charts-report-builder-and-ssrs.md)
- [Formatting a chart in a paginated report (Report Builder)](formatting-a-chart-report-builder-and-ssrs.md)
- [Axis Properties Dialog Box, Axis Options](https://learn.microsoft.com/previous-versions/sql/)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
