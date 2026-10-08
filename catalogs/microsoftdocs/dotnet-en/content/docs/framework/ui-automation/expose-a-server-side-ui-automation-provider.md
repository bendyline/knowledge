---
title: "Expose a Server-side UI Automation Provider"
description: View an example that shows how to expose a server-side UI Automation provider that's hosted in a System.Windows.Forms.Control window.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "expose a server-side UI Automation provider"
  - "UI Automation, server-side provider, exposing"
  - "server-side UI Automation provider, exposing"
ms.topic: how-to
---
# Expose a Server-side UI Automation Provider

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic contains example code that shows how to expose a server-side UI Automation provider that is hosted in a [System.Windows.Forms.Control](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control) window.

 The example overrides the window procedure to trap WM_GETOBJECT, which is the message sent by the UI Automation core service when a client application requests information about the window.

## Example

 [UIAFragmentProvider_snip#116 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListFragment.cs#116)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAFragmentProvider_snip/CSharp/ListFragment.cs.md)
 [UIAFragmentProvider_snip#116 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListFragment.vb#116)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAFragmentProvider_snip/VisualBasic/ListFragment.vb.md)

## See also

- [UI Automation Providers Overview](ui-automation-providers-overview.md)
- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)
