---
title: "Previous function in a paginated report"
description: The Previous Function in Report Builder returns the value or the specified aggregate value for the previous instance of an item in a paginated report.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Report Builder functions - Previous function in a paginated report (Report Builder)

  **Applies to:**
 


  Returns the value or the specified aggregate value for the previous instance of an item within the specified scope in a paginated report.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Syntax  
  
```  
  
Previous(expression, scope)  
```  
  
#### Parameters  
 *expression*  
 (**Variant** or **Binary**) The expression to use to identify the data and for which to retrieve the previous value, for example, `Fields!Fieldname.Value` or `Sum(Fields!Fieldname.Value)`.  
  
 *scope*  
 (**String**) Optional. The name of a group or data region, or null (**Nothing** in  Visual Basic ), that specifies the scope from which to retrieve the previous value specified by *expression*.  
  
## Return Type  
 Returns a **Variant** or **Binary**.  
  
## Remarks  
 The **Previous** function returns the previous value for the expression evaluated in the specified scope after all sorting and filtering have been applied.  
  
 If *expression* does not contain an aggregate, the **Previous** function defaults to the current scope for the report item.  
  
 In a details group, use **Previous** to specify the value of a field reference in the previous instance of the detail row.  
  
> **Note:**  
>  The **Previous** function only supports field references in the details group. For example, in a text box in the details group, `=Previous(Fields!Quantity.Value)` returns the data for the field `Quantity` from the previous row. In the first row, this expression returns a null (**Nothing** in  Visual Basic ).  
  
 If *expression* contains an aggregate function that uses a default scope, **Previous** aggregates the data within the previous instance of the scope specified in the aggregate function call.  
  
 If *expression* contains an aggregate function that specifies a scope other than the default, the *scope* parameter for the **Previous** function must be a containing scope for the scope specified in the aggregate function call.  
  
 The functions **Level**, **InScope**, **Aggregate** and **Previous** cannot be used in the *expression* parameter. Specifying the *recursive* parameter for any aggregate function is not supported.  
  
 For more information, see [Aggregate Functions Reference (Report Builder and SSRS)](report-builder-functions-aggregate-functions-reference.md) and [Expression Scope for Totals, Aggregates, and Built-in Collections (Report Builder and SSRS)](expression-scope-for-totals-aggregates-and-built-in-collections.md).  
  
## Examples  
  
### Description  
 The following code example, when placed in the default data row of a data region, provides the value for the field `LineTotal` in the previous row.  
  
### Code  
  
```  
=Previous(Fields!LineTotal.Value)  
```  
  
### Description  
 The following example shows an expression that calculates the sum of sales on a specific day of the month and the previous value for that day of the month in a previous year. The expression is added to a cell in a row that belongs to the child group `GroupbyDay`. Its parent group is `GroupbyMonth`, which has a parent group `GroupbyYear`. The expression displays the results for GroupbyDay (the default scope) and then for `GroupbyYear` (the parent of the parent group `GroupbyMonth`).  
  
 For example, for a data region with a parent group named `Year`, its child group named `Month`, and its child group named `Day` (3 nested levels). The expression `=Previous(Sum(Fields!Sales.Value,"Day"),"Year")` in a row associated with the group `Day` returns the sales value for the same day and month for the previous year.  
  
### Code  
  
```  
=Sum(Fields!Sales.Value) & " " & Previous(Sum(Fields!Sales.Value,"GroupbyDay"),"GroupbyYear")  
```  
  
## Related content

- [Expression uses in paginated reports (Report Builder)](expression-uses-in-reports-report-builder-and-ssrs.md)
- [Expression examples in Report Builder paginated reports](expression-examples-report-builder-and-ssrs.md)
- [Data types in expressions in a paginated report (Report Builder)](data-types-in-expressions-report-builder-and-ssrs.md)
- [Expression scope for totals, aggregates, and built-in collections in a paginated report (Report Builder)](expression-scope-for-totals-aggregates-and-built-in-collections.md)
