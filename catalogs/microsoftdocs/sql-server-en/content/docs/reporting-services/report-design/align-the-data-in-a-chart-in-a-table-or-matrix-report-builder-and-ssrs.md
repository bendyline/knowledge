---
title: "Align the data in a paginated report chart in a table or matrix"
description: Discover uses for paginated report sparklines and data bars in Report Builder. These small, simple charts convey information with the minimum amount of detail.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Align the data in a paginated report chart in a table or matrix (Report Builder)

  **Applies to:**
 


  Sparklines and data bars are small, simple charts that convey information with little extraneous detail in a paginated report. In a paginated report, when you check this option, the values in your sparklines and data bars align across the different cells in the table or matrix. They align even if there are missing values in the data they're based on.  
  
 Screenshot of sparklines and data bars in a table.
 
  
 In this image, the column chart shows daily sales for each employee. For days that an employee has no sales, the chart leaves a blank and aligns subsequent days horizontally. It also aligns the charts vertically by making the sizes of the different charts relative to each other. For more information, see [Sparklines and data bars (Report Builder)](sparklines-and-data-bars-report-builder-and-ssrs.md).  
  
## Align the data in a sparkline or data bar  
  
1.  [Add a sparkline or data bar](add-sparklines-and-data-bars-report-builder-and-ssrs.md) to a table or matrix.  
  
1. Select the sparkline or data bar, and then choose **Horizontal Axis Properties** or **Vertical Axis Properties**.  
  
1.  On the **Axis Options** tab, check the **Align axes in** box, and then in the list box, select the group on which to align the axis.  
  
1.  Select **OK**.
  
## Related content

- [Charts in a paginated report (Report Builder)](charts-report-builder-and-ssrs.md)
- [Add sparklines and data bars in a paginated report (Report Builder)](add-sparklines-and-data-bars-report-builder-and-ssrs.md)
