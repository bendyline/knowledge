---
title: "Find a UI Automation Element Based on a Property Condition"
description: Find a UI Automation element based on a property condition. Locate an element within the UI Automation tree based on a specific property or properties.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "elements, finding by property conditions"
  - "UI Automation, finding elements by property conditions"
ms.topic: how-to
---
# Find a UI Automation Element Based on a Property Condition

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

This article contains example code that shows how to locate an element within the UI Automation tree based on a specific property or properties.

## Example

 In the following example, a set of property conditions are specified that identify a certain element (or elements) of interest in the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) tree. A search for all matching elements is then performed with the [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*) method that incorporates a series of [System.Windows.Automation.AndCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AndCondition) Boolean operations to limit the number of matching elements.

> **Note:**
> When searching from the [System.Windows.Automation.AutomationElement.RootElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.RootElement*), you should try to obtain only direct children. A search for descendants might iterate through hundreds or even thousands of elements, possibly resulting in a stack overflow. If you are attempting to obtain a specific element at a lower level, you should start your search from the application window or from a container at a lower level.

[InvokePatternApp#1100 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/InvokePatternApp/CSharp/InvokePatternApp/InvokePatternApp.cs#1100)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/InvokePatternApp/CSharp/InvokePatternApp/InvokePatternApp.cs.md)
[InvokePatternApp#1100 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/InvokePatternApp/VisualBasic/InvokePatternClient/Client.vb#1100)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/InvokePatternApp/VisualBasic/InvokePatternClient/Client.vb.md)

## See also

- [InvokePattern and ExpandCollapsePattern Menu Item Sample](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms771636\(v=vs.90\))
- [Obtaining UI Automation Elements](obtaining-ui-automation-elements.md)
- [Use the AutomationID Property](use-the-automationid-property.md)
