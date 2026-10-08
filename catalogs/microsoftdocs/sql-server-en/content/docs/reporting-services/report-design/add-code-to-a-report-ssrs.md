---
title: "Add code to a paginated report"
description: Find out how to call your own custom code for any expression you have in your paginated report in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "code [Reporting Services]"
  - "custom code [Reporting Services]"
  - "expressions [Reporting Services], code"
  - "adding code"
  - "reports [Reporting Services], code"
---
# Add code to a paginated report (Report Builder)

  **Applies to:**
 


  In any expression, you can call your own custom code in a paginated report. You can provide code in the following two ways:  
  
-   Embed code written in  Visual Basic  directly in your report. If your code refers to a  Microsoft 
  .NET Framework 
 that isn't [System.Math](https://learn.microsoft.com/search/?terms=System.Math) or [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert), you must add the reference to the report. For more information, see [Add an assembly reference to a report (SSRS)](add-an-assembly-reference-to-a-report-ssrs.md). For more information about other references you can make from your code, see [Custom code and assembly references in Expressions in Report Designer](custom-code-and-assembly-references-in-expressions-in-report-designer-ssrs.md).  
  
-   Provide a custom code assembly by using the  .NET Framework 
. If you provide a custom assembly, you must install it on both the computer where you author the report and the report server where you view the report. For more information, see [Use custom assemblies with reports](../custom-assemblies/using-custom-assemblies-with-reports.md).  
  
### Add embedded code to a report  
  
1.  In **Design** view, right-click the design surface outside the border of the report and select **Report Properties**.  
  
1.  Select **Code**.  
  
1.  In **Custom code**, enter the code. Errors in the code produce warnings when the report runs. The following example creates a custom function named `ChangeWord` that replaces the word `Bike` with `Bicycle`.  
  
    ```  
    Public Function ChangeWord(ByVal s As String) As String  
       Dim strBuilder As New System.Text.StringBuilder(s)  
       If s.Contains("Bike") Then  
          strBuilder.Replace("Bike", "Bicycle")  
          Return strBuilder.ToString()  
          Else : Return s  
       End If  
    End Function  
    ```  
  
1.  The following example shows how to pass a dataset field named Category to this function in an expression:  
  
    ```  
    =Code.ChangeWord(Fields!Category.Value)  
    ```  
  
     If you add this expression to a table cell that displays category values, whenever the word `Bike` is in the dataset field for that row, the table cell value displays the word `Bicycle` instead.  
  
## Related content

- [Expressions in a paginated report (Report Builder)](expressions-report-builder-and-ssrs.md)
- [Expression examples in Report Builder paginated reports](expression-examples-report-builder-and-ssrs.md)
- [Parameters collection references in a paginated report (Report Builder)](built-in-collections-parameters-collection-references-report-builder.md)
