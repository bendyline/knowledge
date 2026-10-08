---
title: Change row height or column width in a Report Builder paginated report
description: Learn how to set the column width or fixed row height with text box properties for rendered paginated reports in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
# customer intent: As a Report Builder user, I want to learn how to set the column width or row height so that I can adjust my reports to visually fit my data.
---
# Change row height or column width in a Report Builder paginated report

  **Applies to:**
 


When you set a row height, you're specifying the maximum height for the row in the rendered paginated report. However, by default text boxes in the row are set to grow vertically to accommodate their data at run-time. This setting can cause a row to expand beyond the height that you specify. To set a fixed row height, you must change the text box properties so they don't automatically expand.  
  
When you set a column width, you specify the maximum width for the column in the rendered report. Columns don't automatically adjust horizontally to accommodate text.  
  
If a cell in a row or column contains a rectangle or data region, the height and width of the contained item determines the minimum height and width of the cell. For more information, see [Rendering behaviors in a paginated report (Report Builder)](rendering-behaviors-report-builder-and-ssrs.md).  
  
> **Note:**  
>   You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Change row height by moving row handles
  
1. In **Design** view, choose anywhere in the tablix data region to select it. Gray row handles appear on the outside border of the tablix data region.
  
1. Hover over the row handle edge that you want to expand. A double-headed arrow appears.

    Screenshot of a table highlighting the double-headed arrow at the edge of a row.
  
1. Select the edge of the row and move it higher or lower to adjust the row height.  
  
## Change row height by setting cell properties  
  
1. In **Design** view, choose a cell in the table row.  

    Screenshot of a table with a cell selected.
  
1. In the **Properties** pane go to **Position > Size**, and then modify the **Height** property.

     Screenshot of the Properties Pane for the selected table cell

1. Select anywhere outside the **Properties** pane to update the table height.

## Prevent a row from automatically expanding vertically  
  
1. In **Design** view, choose anywhere in the tablix data region to select it. Gray row handles appear on the outside border of the tablix data region.  
  
1. Select the row handle and choose the row.  
  
1. In the **Properties** pane under **General**, set **CanGrow** to **False**.

    Screenshot of the Properties Pane for the selected table cell highlighting the CanGrow property.
  
    > **Note:**  
    > If you can't see the **Properties** pane, from the **View** menu, select **Properties**.  
  
## Change column width  
  
1. In **Design** view, select anywhere in the tablix data region to select it. Gray column handles appear on the outside border of the tablix data region.  
  
1. Hover over the column handle edge that you want to expand. A double-headed arrow appears.

    Screenshot of a table highlighting the double-headed arrow at the edge of a column.
  
1. Select the edge of the column, and move it left or right to adjust the column width.  
  
## Related content

- [Tablix data region in a paginated report (Report Builder)](tablix-data-region-report-builder-and-ssrs.md)
- [Cells, rows, & columns in a tablix in a paginated report (Report Builder)](tablix-data-region-cells-rows-and-columns-report-builder-and-ssrs.md)
- [Tables in paginated reports (Report Builder)](tables-report-builder-and-ssrs.md)
