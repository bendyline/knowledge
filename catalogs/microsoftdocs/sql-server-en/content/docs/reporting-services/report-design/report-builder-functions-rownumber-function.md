---
title: "RowNumber function in a paginated report"
description: Use the RowNumber function in Report Builder to return a running count of the number of rows in a paginated report for the specified scope.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Report Builder functions - RowNumber function in a paginated report (Report Builder)

  **Applies to:**
 


  Returns a running count of the number of rows for the specified scope in a paginated report.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Syntax  
  
```  
  
RowNumber(scope)  
```  
  
#### Parameters  
 *scope*  
 (**String**) The name of a dataset, data region, or group, or null (**Nothing** in  Visual Basic ), that specifies the context in which to evaluate the number of rows. **Nothing** specifies the outermost context, usually the report dataset.  
  
## Remarks  
 **RowNumber** returns a running value of the count of rows within the specified scope, just as [RunningValue](report-builder-functions-runningvalue-function.md) returns the running value of an aggregate function. When you specify a scope, you specify when to reset the row count to 1.  
  
 *scope* cannot be an expression. *scope* must be a containing scope. Typical scopes, from the outermost to the innermost containment, are report dataset, data region, row groups or column groups.  
  
 To increment values across columns, specify a scope that is the name of a column group. To increment numbers down rows, specify a scope that is the name of a row group.  
  
> **Note:**  
>  Including aggregates that specify both a row group and a column group in a single expression is not supported.  
  
 For more information, see [Aggregate Functions Reference (Report Builder and SSRS)](report-builder-functions-aggregate-functions-reference.md) and [Expression Scope for Totals, Aggregates, and Built-in Collections (Report Builder and SSRS)](expression-scope-for-totals-aggregates-and-built-in-collections.md).  
  
## Code Example  
 The following is an expression that you can use for the **BackgroundColor** property of a Tablix data region detail row to alternate the color of detail rows for each group, always beginning with White.  
  
```  
=IIF(RowNumber("GroupbyCategory") Mod 2, "White", "PaleGreen")  
```  
  
## Related content

- [Expression uses in paginated reports (Report Builder)](expression-uses-in-reports-report-builder-and-ssrs.md)
- [Expression examples in Report Builder paginated reports](expression-examples-report-builder-and-ssrs.md)
- [Data types in expressions in a paginated report (Report Builder)](data-types-in-expressions-report-builder-and-ssrs.md)
- [Expression scope for totals, aggregates, and built-in collections in a paginated report (Report Builder)](expression-scope-for-totals-aggregates-and-built-in-collections.md)
