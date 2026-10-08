---
title: "Get Supported UI Automation Control Patterns"
description: Read an example that shows how to retrieve supported control pattern objects from UI Automation elements.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "control patterns, getting"
  - "UI Automation, getting control patterns"
  - "getting, control patterns"
ms.topic: how-to
---
# Get Supported UI Automation Control Patterns

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how to retrieve control pattern objects from UI Automation elements.

### Obtain All Control Patterns

1. Get the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) whose control patterns you are interested in.

2. Call [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) to get all control patterns from the element.

> **Caution:**
> It is strongly recommended that a client not use [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*). Performance can be severely affected as this method calls [System.Windows.Automation.AutomationElement.GetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPattern*) internally for each existing control pattern. If possible, a client should call [System.Windows.Automation.AutomationElement.GetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPattern*) for the key patterns of interest.

### Obtain a Specific Control Pattern

1. Get the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) whose control patterns you are interested in.

2. Call [System.Windows.Automation.AutomationElement.GetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPattern*) or [System.Windows.Automation.AutomationElement.TryGetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCurrentPattern*) to query for a specific pattern. These methods are similar, but if the pattern is not found, [System.Windows.Automation.AutomationElement.GetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPattern*) raises an exception, and [System.Windows.Automation.AutomationElement.TryGetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCurrentPattern*) returns `false`.

## Example

 The following example retrieves an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) for a list item and obtains a [System.Windows.Automation.SelectionItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern) from that element.

 [UIAClient_snip#103 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#103)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#103 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#103)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

## See also

- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
