---
title: "Last function in a paginated report"
description: The Last function returns the final value in a set of data in a paginated report after all sorting and filtering have been applied at the specified scope in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Report Builder functions - Last function in a paginated report (Report Builder)

  **Applies to:**
 


  Returns the last value in the given scope of the specified expression in a paginated report.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Syntax  
  
```  
  
Last(expression, scope)  
```  
  
#### Parameters  
 *expression*  
 (**Variant** or **Binary**) The expression on which to perform the aggregation, for example, `=Fields!Fieldname.Value`.  
  
 *scope*  
 (**String**) (Optional) The name of a dataset, data region, or group that contains the report items to which to apply the function. If *scope* is not specified, the current scope is used.  
  
## Return Type  
 Determined by the type of expression.  
  
## Remarks  
 The **Last** function returns the final value in a set of data after all sorting and filtering have been applied at the specified scope.  
  
 The **Last** function cannot be used in group filter expressions with anything except the current (default) scope.  
  
 You can also use **Last** in a page header to return the last value from the **ReportItems** collection for a page in order to produce dictionary-style headings that display the first and last entries on a page.  
  
 The value of *scope* must be a string constant and cannot be an expression. For outer aggregates or aggregates that do not specify other aggregates, *scope* must refer to the current scope or a containing scope. For aggregates of aggregates, nested aggregates can specify a child scope.  
  
 *Expression* can contain calls to nested aggregate functions with the following exceptions and conditions:  
  
-   *Scope* for nested aggregates must be the same as, or contained by, the scope of the outer aggregate. For all distinct scopes in the expression, one scope must be in a child relationship to all other scopes.  
  
-   *Scope* for nested aggregates cannot be the name of a dataset.  
  
-   *Expression* must not contain **First**, **Last**, **Previous**, or **RunningValue** functions.  
  
-   *Expression* must not contain nested aggregates that specify *recursive*.  
  
 For more information, see [Aggregate Functions Reference (Report Builder and SSRS)](report-builder-functions-aggregate-functions-reference.md) and [Expression Scope for Totals, Aggregates, and Built-in Collections (Report Builder and SSRS)](expression-scope-for-totals-aggregates-and-built-in-collections.md).  
  
 For more information about recursive aggregates, see [Creating Recursive Hierarchy Groups (Report Builder and SSRS)](creating-recursive-hierarchy-groups-report-builder-and-ssrs.md).  
  
## Example  
 The following code example returns the last product number in the `Category` group of a data region.  
  
```  
=Last(Fields!ProductNumber.Value, "Category")  
```  
  
## Related content

- [Expression uses in paginated reports (Report Builder)](expression-uses-in-reports-report-builder-and-ssrs.md)
- [Expression examples in Report Builder paginated reports](expression-examples-report-builder-and-ssrs.md)
- [Data types in expressions in a paginated report (Report Builder)](data-types-in-expressions-report-builder-and-ssrs.md)
- [Expression scope for totals, aggregates, and built-in collections in a paginated report (Report Builder)](expression-scope-for-totals-aggregates-and-built-in-collections.md)
