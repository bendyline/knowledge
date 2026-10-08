---
title: "Add or delete a group in a paginated report chart"
description: Find out how to add or delete groups, and how to create groups or nested groups in a paginated report by dragging dataset fields in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Add or delete a group in a paginated report chart (Report Builder)

  **Applies to:**
 


In paginated reports, select the chart data region to display the **Chart Data** pane. Create groups by dragging dataset fields to the **Category Groups** and **Series Groups** areas. To add nested groups, add multiple fields to the area.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Add a parent or child group to a chart  
  
1.  On the report design surface, select the chart. The **Chart Data** pane appears.  
  
1.  Drag a field from the **Report Data** window to the **Category Groups** or **Series Groups** area. To add a parent group, position the cursor in front of an existing group. To add a child group, position the cursor after an existing group.  
  
## Edit a category group on a chart  
  
1.  On the report design surface, select the chart. The **Chart Data** pane appears.  
  
1.  Right-click the group in the **Category Groups** area, and then select **Category Group Properties**.  
  
1.  Add or remove group expressions, filters, sort expressions, and group variables.  
  
1.  Select **OK**.
  
## Edit a series group on a chart  
  
1.  On the report design surface, select the chart. The **Chart Data** pane appears.  
  
1.  Right-click the group in the **Series Groups** area, and then select **Series Group Properties**.  
  
1.  Add or remove group expressions, filters, sort expressions, and group variables.  
  
1.  Select **OK**.
  
## Delete a group from a chart  
  
1.  On the report design surface, select the chart. The **Chart Data** pane appears.  
  
1.  Right-click the group in the **Category Groups** or **Series Groups** area, and then select **Delete**.  
  
## Related content

- [Charts in a paginated report (Report Builder)](charts-report-builder-and-ssrs.md)
