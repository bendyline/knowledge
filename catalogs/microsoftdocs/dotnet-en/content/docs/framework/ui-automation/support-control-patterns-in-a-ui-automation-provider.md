---
title: "Support Control Patterns in a UI Automation Provider"
description: Understand how to implement support control patterns on a UI Automation provider so that client applications can manipulate controls and get data from them.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "control patterns, supporting in UI Automation provider"
  - "UI Automation, supporting control patterns in provider"
ms.topic: how-to
---
# Support Control Patterns in a UI Automation Provider

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

This topic shows how to implement one or more control patterns on a UI Automation provider so that client applications can manipulate controls and get data from them.

## Support Control Patterns

1. Implement the appropriate interfaces for the control patterns that the element should support, such as [System.Windows.Automation.Provider.IInvokeProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IInvokeProvider) for [System.Windows.Automation.InvokePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern).

2. Return the object containing your implementation of each control interface in your implementation of [System.Windows.Automation.Provider.IRawElementProviderSimple.GetPatternProvider*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderSimple.GetPatternProvider*)

## Example 1

The following example shows an implementation of [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider) for a single-selection custom list box. It returns three properties and gets the currently selected item.

[UIAFragmentProvider_snip#119 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListPattern.cs#119)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListPattern.cs.md)
[UIAFragmentProvider_snip#119 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListPattern.vb#119)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListPattern.vb.md)

## Example 2

The following example shows an implementation of [System.Windows.Automation.Provider.IRawElementProviderSimple.GetPatternProvider*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderSimple.GetPatternProvider*) that returns the class implementing [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider). Most list box controls would support other patterns as well, but in this example a null reference (`Nothing` in Microsoft Visual Basic .NET) is returned for all other pattern identifiers.

[UIAFragmentProvider_snip#120 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListFragment.cs#120)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListFragment.cs.md)
[UIAFragmentProvider_snip#120 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListFragment.vb#120)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListFragment.vb.md)

## See also

- [UI Automation Providers Overview](ui-automation-providers-overview.md)
- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)
