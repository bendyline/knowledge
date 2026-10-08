---
title: "Change the order of a paginated report parameter"
description: Learn how to change the order of paginated report parameters when you have a dependent parameter that is listed out of order in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Change the order of a paginated report parameter (Report Builder)

  **Applies to:**
 


  Change the order of paginated report parameters when you have a dependent parameter that is listed before the parameter it's dependent on. Parameter order is important when you have cascading parameters, or when you want to show users the default value for one parameter before they choose values for other parameters. A dependent report parameter contains a reference, in either its default values query or valid values query, to a query parameter that points to a report parameter that is after it in the parameter list in the **Report Data** pane.  
  
 The order that you see parameters display on the report viewer toolbar when you run the report, is determined by the order of the parameters in the **Report Data** pane and the location of the parameters in the custom parameters pane. For more information, see [Customize the Parameters pane in a report (Report Builder)](customize-the-parameters-pane-in-a-report-report-builder.md)  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Change the order of report parameters  
  
You can change the order of report parameters by doing either of the following actions:  
  
-   Select a parameter in the **Report Data** pane, and use the up and down arrow buttons to move the parameter higher or lower in the list, as shown in the following image. When you change the order of the parameter in the **Report Data** pane, the location of the parameter in the parameters pane is changed.  
  
     Screenshot of where you change the order of the parameters in the Report Data pane
  
-   In the parameters pane, drag the parameter to a new column or row in the pane. When you change the location of the parameter in the pane, the parameter order changes in the **Report Data** pane. For more information about moving parameters in the pane, see [Customize the Parameters pane in a Report (Report Builder)](customize-the-parameters-pane-in-a-report-report-builder.md).  
  
## Related content

- [Paginated report parameters in Report Builder](report-parameters-report-builder-and-report-designer.md)
- [Add cascading parameters to a paginated report (Report Builder)](add-cascading-parameters-to-a-report-report-builder-and-ssrs.md)
- [Tutorial: Add parameters to your report (Report Builder)](../tutorial-add-a-parameter-to-your-report-report-builder.md)
- [Add dataset filters, data region filters, and group filters to a paginated report (Report Builder)](add-dataset-filters-data-region-filters-and-group-filters.md)
- [Parameters collection references in a paginated report (Report Builder)](built-in-collections-parameters-collection-references-report-builder.md)
