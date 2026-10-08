---
title: "Get the Toggle State of a Check Box Using UI Automation"
description: See a code example that shows how to get the toggle state of a control (such as a check box) using Microsoft UI Automation.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "UI Automation, getting toggle states of check boxes"
  - "check boxes, getting toggle states of"
  - "getting, toggle states of check boxes"
ms.topic: how-to
---
# Get the Toggle State of a Check Box Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how to use Microsoft UI Automation to get the toggle state of a control.

## Example

 This example uses the [System.Windows.Automation.AutomationElement.GetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPattern*) method of the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) class to obtain a [System.Windows.Automation.TogglePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TogglePattern) object from a control and return its [System.Windows.Automation.ToggleState](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ToggleState) property.

 [NavigatingWithTreeWalker#1200 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/NavigatingWithTreeWalker/CSharp/ClientClass.cs#1200)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/NavigatingWithTreeWalker/CSharp/ClientClass.cs.md)
 [NavigatingWithTreeWalker#1200 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/NavigatingWithTreeWalker/visualbasic/clientclass.vb#1200)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/NavigatingWithTreeWalker/visualbasic/clientclass.vb.md)
