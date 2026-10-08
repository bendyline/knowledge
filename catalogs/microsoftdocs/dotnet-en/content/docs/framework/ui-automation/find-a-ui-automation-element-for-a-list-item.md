---
title: "Find a UI Automation Element for a List Item"
description: See an example that shows how to find a UI Automation element for a list item when the index of the item is known.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "list items, finding elements for"
  - "elements, finding for list items"
  - "UI Automation, finding elements for List items"
ms.topic: how-to
---
# Find a UI Automation Element for a List Item

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how to retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) for an item within a list when the index of the item is known.

## Example

 The following example shows two ways of retrieving a specified item from a list, one using [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker) and the other using [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*).

 The first technique tends to be faster for Win32 controls, but the second is faster for Windows Presentation Foundation (WPF) controls.

 [UIAClient_snip#184 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#184)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#184 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#184)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

## See also

- [Obtaining UI Automation Elements](obtaining-ui-automation-elements.md)
