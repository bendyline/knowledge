---
title: "Invoke a Control Using UI Automation"
description: Use UI Automation to find a control matching certain property conditions, create an AutomationElement, get an InvokePattern, and use Invoke on the control.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "invoking controls"
  - "UI Automation, invoking controls"
  - "controls, invoking"
ms.topic: how-to
---
# Invoke a Control Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic demonstrates how to perform the following tasks:

- Find a control that matches specific property conditions by walking the control view of the UI Automation tree for the target application.

- Create an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) for each control.

- Obtain an [System.Windows.Automation.InvokePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern) object from any UI Automation element found that supports the [System.Windows.Automation.InvokePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern) control pattern.

- Use [System.Windows.Automation.InvokePattern.Invoke*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern.Invoke*) to invoke the control from a client event handler.

## Example

 This example uses the [System.Windows.Automation.AutomationElement.TryGetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCurrentPattern*) method of the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) class to generate an [System.Windows.Automation.InvokePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern) object and invoke a control by using the [System.Windows.Automation.InvokePattern.Invoke*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern.Invoke*) method.

[InvokePatternApp#1100 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/InvokePatternApp/CSharp/InvokePatternApp/InvokePatternApp.cs#1100)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/InvokePatternApp/CSharp/InvokePatternApp/InvokePatternApp.cs.md)
[InvokePatternApp#1100 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/InvokePatternApp/VisualBasic/InvokePatternClient/Client.vb#1100)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/InvokePatternApp/VisualBasic/InvokePatternClient/Client.vb.md)
[InvokePatternApp#1102 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/InvokePatternApp/CSharp/InvokePatternApp/InvokePatternApp.cs#1102)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/InvokePatternApp/CSharp/InvokePatternApp/InvokePatternApp.cs.md)
[InvokePatternApp#1102 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/InvokePatternApp/VisualBasic/InvokePatternClient/Client.vb#1102)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/InvokePatternApp/VisualBasic/InvokePatternClient/Client.vb.md)

## See also

- [InvokePattern, ExpandCollapsePattern, and TogglePattern Sample](https://github.com/Microsoft/WPF-Samples/tree/main/Accessibility/InvokePattern)
