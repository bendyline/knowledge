---
title: "Enable Navigation in a UI Automation Fragment Provider"
description: Read an example that shows how to enable navigation in a UI Automation provider for an element that's within a fragment.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "UI Automation, enabling navigation in provider"
  - "navigation, enabling in UI Automation provider"
ms.topic: how-to
---
# Enable Navigation in a UI Automation Fragment Provider

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic contains example code that shows how to enable navigation in a UI Automation provider for an element that is within a fragment.

## Example

 The following example code implements [System.Windows.Automation.Provider.IRawElementProviderFragment.Navigate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderFragment.Navigate*) for a list item within a list. The parent element is the list box element, and the sibling elements are other items in the list collection. The method returns `null` (`Nothing` in Visual Basic) for directions that are not valid; in this case, [System.Windows.Automation.Provider.NavigateDirection.FirstChild](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.NavigateDirection.FirstChild) and [System.Windows.Automation.Provider.NavigateDirection.LastChild](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.NavigateDirection.LastChild), because the element has no children.

 [UIAFragmentProvider_snip#103 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListItemFragment.cs#103)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListItemFragment.cs.md)
 [UIAFragmentProvider_snip#103 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListItemFragment.vb#103)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListItemFragment.vb.md)

## See also

- [UI Automation Providers Overview](ui-automation-providers-overview.md)
- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)
