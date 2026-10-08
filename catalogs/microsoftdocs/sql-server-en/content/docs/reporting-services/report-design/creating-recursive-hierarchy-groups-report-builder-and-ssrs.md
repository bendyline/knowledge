---
title: "Creating recursive hierarchy groups in a paginated report"
description: Discover uses for recursive hierarchy groups in a paginated report in Report Builder. Display hierarchical data such as employees in an organizational chart.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Creating recursive hierarchy groups in a paginated report (Report Builder)

  **Applies to:**
 


To display recursive data in paginated reports (where the relationship between parent and child is represented by fields in the dataset), set the data region group expression based on the child field and set the Parent property based on the parent field.  
  
 Displaying hierarchical data is a common use for recursive hierarchy groups, for example, employees in an organizational chart. The dataset includes a list of employees and the managers, where the manager names also appear in the list of employees.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## Creating Recursive Hierarchies  
 To build a recursive hierarchy in a tablix data region, you must set the group expression to the field that specifies the child data and the Parent property of the group to the field that specifies the parent data. For example, for a dataset that includes fields for employee ID and manager ID where employees report to managers, set the group expression to employee ID and the Parent property to manager ID.  
  
 A group that is defined as a recursive hierarchy (that is, a group that uses the Parent property) can have only one group expression. You can use the **Level** function in text box padding to indent employee names based on their level in the hierarchy.  
  
 For more information, see [Add or Delete a Group in a Data Region (Report Builder and SSRS)](add-or-delete-a-group-in-a-data-region-report-builder-and-ssrs.md) and  [Create a Recursive Hierarchy Group (Report Builder and SSRS)](create-a-recursive-hierarchy-group-report-builder-and-ssrs.md).  
  
### Aggregate Functions that support Recursion  
 You can use Reporting Services aggregate functions that accept the parameter *Recursive* to calculate summary data for a recursive hierarchy. The following functions accept **Recursive** as a parameter: [Sum](report-builder-functions-sum-function.md), [Avg](report-builder-functions-avg-function.md), [Count](report-builder-functions-count-function.md), [CountDistinct](report-builder-functions-countdistinct-function.md), [CountRows](report-builder-functions-countrows-function.md), [Max](report-builder-functions-max-function.md), [Min](report-builder-functions-min-function.md), [StDev](report-builder-functions-stdev-function.md), [StDevP](report-builder-functions-stdevp-function.md), [Sum](report-builder-functions-sum-function.md), [Var](report-builder-functions-var-function.md), and [VarP](report-builder-functions-varp-function.md). For more information, see [Aggregate Functions Reference (Report Builder and SSRS)](report-builder-functions-aggregate-functions-reference.md).  
  
## Related content

- [Tables, matrices, and lists in Report Builder paginated reports](tables-matrices-and-lists-report-builder-and-ssrs.md)
- [Tablix data region in a paginated report (Report Builder)](tablix-data-region-report-builder-and-ssrs.md)
- [Report Builder functions - aggregate functions reference in paginated reports (Report Builder)](report-builder-functions-aggregate-functions-reference.md)
- [Tables in paginated reports (Report Builder)](tables-report-builder-and-ssrs.md)
- [Create a matrix in a paginated report (Report Builder)](create-a-matrix-report-builder-and-ssrs.md)
- [Create invoices and forms with lists in a paginated report (Report Builder)](create-invoices-and-forms-with-lists-report-builder-and-ssrs.md)
