---
title: "Subscribe to UI Automation Events"
description: See how to subscribe to events raised by UI Automation providers. The example code registers an event handler for the event raised when a control is invoked.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "UI Automation, subscribing to events"
  - "subscribing to UI Automation events"
  - "events, subscribing to"
  - "listening for events"
ms.topic: how-to
---
# Subscribe to UI Automation Events

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how to subscribe to events raised by UI Automation providers.

## Example 1

 The following example code registers an event handler for the event that is raised when a control such as a button is invoked, and removes it when the application form closes. The event is identified by an [System.Windows.Automation.AutomationEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEvent) passed as a parameter to [System.Windows.Automation.Automation.AddAutomationEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationEventHandler*).

 [UIAClient_snip#101 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#101)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#101 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#101)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

## Example 2

 The following example shows how to use Microsoft UI Automation to subscribe to an event that is raised when the focus changes. The event handler is unregistered in a method that could be called on application shutdown, or when notification of UI events is no longer required.

 [UIAClient_snip#102 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#102)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#102 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#102)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

## See also

- [System.Windows.Automation.Automation.AddAutomationEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationEventHandler*)
- [System.Windows.Automation.Automation.RemoveAllEventHandlers*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAllEventHandlers*)
- [System.Windows.Automation.Automation.RemoveAutomationEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAutomationEventHandler*)
- [UI Automation Events Overview](ui-automation-events-overview.md)
