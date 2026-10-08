---
title: "Level function in a paginated report"
description: Discover the Level function in Report Builder. This function returns the current level of depth in a recursive hierarchy in a paginated report.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Report Builder functions - Level function in a paginated report (Report Builder)

  **Applies to:**
 


  Returns the current level of depth in a recursive hierarchy in a paginated report.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Syntax  
  
```  
  
Level(scope)  
```  
  
#### Parameters  
 *scope*  
 (**String**) (Optional). The name of a dataset, group, or data region that contains the report items to which to apply the aggregate function. If *scope* is not specified, the current scope is used.  
  
## Return Type  
 Returns an **Integer**. If *scope* specifies a dataset or data region, or specifies a nonrecursive grouping (that is, a grouping with no **Parent** element), **Level** returns 0. If *scope* is omitted, it returns the level of the current scope.  
  
## Remarks  
 The value returned by the **Level** function is zero based; that is, the first level in a hierarchy is 0.  
  
 The **Level** function can be used to provide indentation in a recursive hierarchy, such as an employee list.  
  
 For more information about recursive hierarchies, see [Creating Recursive Hierarchy Groups (Report Builder and SSRS)](creating-recursive-hierarchy-groups-report-builder-and-ssrs.md).  
  
## Example  
 The following code example provides the level of row in the Employees group:  
  
```  
=Level("Employees")  
```  
  
## Related content

- [Expression uses in paginated reports (Report Builder)](expression-uses-in-reports-report-builder-and-ssrs.md)
- [Expression examples in Report Builder paginated reports](expression-examples-report-builder-and-ssrs.md)
- [Data types in expressions in a paginated report (Report Builder)](data-types-in-expressions-report-builder-and-ssrs.md)
- [Expression scope for totals, aggregates, and built-in collections in a paginated report (Report Builder)](expression-scope-for-totals-aggregates-and-built-in-collections.md)
