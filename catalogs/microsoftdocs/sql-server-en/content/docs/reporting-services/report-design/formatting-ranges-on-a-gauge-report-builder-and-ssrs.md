---
title: "Formatting ranges on a gauge in a paginated report"
description: Visually indicate with a gauge range in a paginated report when the pointer value has gone into a certain span of values in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Formatting ranges on a gauge in a paginated report (Report Builder)

  **Applies to:**
 


 In a paginated report, the gauge range is a zone or area on the gauge scale that indicates an important subsection of values on the gauge. Using a gauge range, you can visually indicate when the pointer value has gone into a certain span of values. Ranges are defined by a start value and an end value.  
  
 You can also use ranges to define different sections of a gauge. For example, on a gauge with values from 0 to 10, you can define a red range that has a value from 0 to 3, a yellow range that has a value from 4 to 7 and a green range that has a value from 8 to 10. If the start value that you specified is greater than the end value that you specified, the values are swapped so that the start value is the end value and the end value is the start value.  
  
 You can position the range in the same way that you position pointers on a scale. The **Position** and **Distance from scale** properties determine the position of the range. For more information, see [Gauges (Report Builder and SSRS)](gauges-report-builder-and-ssrs.md).  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Related content

- [Formatting scales on a gauge in a paginated report (Report Builder)](formatting-scales-on-a-gauge-report-builder-and-ssrs.md)
- [Formatting pointers on a gauge in a paginated report (Report Builder)](formatting-pointers-on-a-gauge-report-builder-and-ssrs.md)
- [Set a minimum or maximum on a gauge in a paginated report (Report Builder)](set-a-minimum-or-maximum-on-a-gauge-report-builder-and-ssrs.md)
- [Tutorial: Add a KPI to your report (Report Builder)](../tutorial-adding-a-kpi-to-your-report-report-builder.md)
- [Gauges in a paginated report (Report Builder)](gauges-report-builder-and-ssrs.md)
