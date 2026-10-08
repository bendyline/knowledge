---
title: "Implement UI Automation Providers in a Client Application"
description: See an example of how to implement a client-side UI Automation provider in an application. Note that this is an uncommon scenario.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "client-side UI Automation provider, implementation within applications"
  - "UI Automation, implementing client-side provider within application"
ms.topic: how-to
---
# Implement UI Automation Providers in a Client Application

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic contains example code that shows how to implement a client-side UI Automation provider within an application.

 This is an uncommon scenario. Most often, a UI Automation client application uses server-side providers, or client-side providers that reside in a DLL.

## Example

 The following example code implements a simple provider for a console window. The code does not have any useful functionality, but is intended to demonstrate the basic steps in setting up a provider within client code and registering it by using [System.Windows.Automation.ClientSettings.RegisterClientSideProviders*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ClientSettings.RegisterClientSideProviders*).

 [UIAClientSideProvider_snip#201 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClientSideProvider_snip/CSharp/ClientImplementationProgram.cs#201)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClientSideProvider_snip/CSharp/ClientImplementationProgram.cs.md)
 [UIAClientSideProvider_snip#201 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClientSideProvider_snip/visualbasic/clientimplementationprogram.vb#201)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClientSideProvider_snip/visualbasic/clientimplementationprogram.vb.md)

## See also

- [UI Automation Providers Overview](ui-automation-providers-overview.md)
- [Register a Client-Side Provider Assembly](register-a-client-side-provider-assembly.md)
- [Create a Client-Side UI Automation Provider](create-a-client-side-ui-automation-provider.md)
- [Client-Side UI Automation Provider Implementation](client-side-ui-automation-provider-implementation.md)
