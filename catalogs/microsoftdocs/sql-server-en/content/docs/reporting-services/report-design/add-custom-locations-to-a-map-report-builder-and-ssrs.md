---
title: "Add custom locations to a map in a paginated report"
description: Learn how to add custom locations to a map you added to a paginated report in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
f1_keywords:
  - "MICROSOFT.REPORTDESIGNER.MAPPOINT.POINTTEMPLATE"
---
# Add custom locations to a map in a paginated report (Report Builder)

  **Applies to:**
 


  After you add a map to a paginated report, you can add your own point locations.  
  
 Display properties for all points on a layer are controlled by setting options for the point properties for the layer. For a selected embedded point, you can override the display properties.  
  
> **Note:**  
>  When you override the layer display properties for the embedded point, the changes that you make are not reversible.  
  
 For more information, see [Vary polygon, line, and point display by rules and analytical data (Report Builder)](vary-polygon-line-and-point-display-by-rules-and-analytical-data.md).  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Add a point layer  
  
1.  On the report design surface, select the map to display the **Map** pane.  
  
1.  On the toolbar, select **Add Layer**.  
  
1.  From the list, select **Add Point Layer**. A point layer with no points is added to the map. By default, the point layer is ready for embedded points.  
  
## Add a custom point  
  
1.  On the report design surface, select the map to display the **Map** pane.  
  
1.  In the **Map** pane, right-click a point layer that has type **Embedded**, and then select **Add Point**. The cursor changes to crosshairs.  
  
1.  To add a point, select a location on the map. An embedded point is added to the selected layer at the selected location.  
  
## Customize the display for an embedded point  
  
1.  Right-click the point, and then select **Point Properties**. The **Map Embedded Point Properties** dialog opens.  
  
1.  Select **Override point options for this layer**. Multiple property pages appear in the left pane.  
  
1.  Select the pages and set the display properties that you want to apply to this point.  
  
## Related content

- [Maps in a paginated report (Report Builder)](maps-report-builder-and-ssrs.md)
- [Vary polygon, line, and point display in a paginated report by rules and analytical data (Report Builder)](vary-polygon-line-and-point-display-by-rules-and-analytical-data.md)
