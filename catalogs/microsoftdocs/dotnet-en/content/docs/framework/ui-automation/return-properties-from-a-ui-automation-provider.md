---
title: "Return Properties from a UI Automation Provider"
description: See how a UI Automation provider can return properties of an element to client applications in .NET.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "providers, UI Automation, returning properties"
  - "properties, returned by UI Automation providers"
  - "UI Automation, providers returning properties"
ms.topic: how-to
---
# Return Properties from a UI Automation Provider

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic contains sample code that shows how a UI Automation provider can return properties of an element to client applications.

 For any property it does not explicitly support, the provider must return `null` (`Nothing` in Visual Basic). This ensures that UI Automation attempts to obtain the property from another source, such as the host window provider.

## Example

 [UIAFragmentProvider_snip#117 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListFragment.cs#117)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListFragment.cs.md)
 [UIAFragmentProvider_snip#117 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListFragment.vb#117)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListFragment.vb.md)

## See also

- [UI Automation Providers Overview](ui-automation-providers-overview.md)
- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)
