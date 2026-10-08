---
title: "UI Automation Events for Clients"
description: Read about how Microsoft UI Automation events are used by UI Automation clients in .NET. UI Automation allows clients to subscribe to events of interest.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, events for clients"
  - "events, UI Automation clients"
---
# UI Automation Events for Clients

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic describes how Microsoft UI Automation events are used by UI Automation clients.

 UI Automation allows clients to subscribe to events of interest. This capability improves performance by eliminating the need to continually poll all the UI elements in the system to see if any information, structure, or state has changed.

 Efficiency is also improved by the ability to listen for events only within a defined scope. For example, a client can listen for focus change events on all UI Automation elements in the tree, or on just one element and its descendants.

> **Note:**
> Do not assume that all possible events are raised by a Microsoft UI Automation provider. For example, not all property changes cause events to be raised by the standard proxy providers for Windows Forms and Win32 controls.

 For a broader view of UI Automation events, see [UI Automation Events Overview](ui-automation-events-overview.md).

<a name="Subscribing_to_Events"></a>

## Subscribing to Events

 Client applications subscribe to events of a particular kind by registering an event handler, using one of the following methods.

| Method | Event Type | Event Arguments Type | Delegate Type |
| --- | --- | --- | --- |
| [System.Windows.Automation.Automation.AddAutomationFocusChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationFocusChangedEventHandler*) | Focus change | [System.Windows.Automation.AutomationFocusChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationFocusChangedEventArgs) | [System.Windows.Automation.AutomationFocusChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationFocusChangedEventHandler) |
| [System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*) | Property change | [System.Windows.Automation.AutomationPropertyChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationPropertyChangedEventArgs) | [System.Windows.Automation.AutomationPropertyChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationPropertyChangedEventHandler) |
| [System.Windows.Automation.Automation.AddStructureChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddStructureChangedEventHandler*) | Structure change | [System.Windows.Automation.StructureChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.StructureChangedEventArgs) | [System.Windows.Automation.StructureChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.StructureChangedEventHandler) |
| [System.Windows.Automation.Automation.AddAutomationEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationEventHandler*) | All other events, identified by an [System.Windows.Automation.AutomationEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEvent) | [System.Windows.Automation.AutomationEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEventArgs) or [System.Windows.Automation.WindowClosedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowClosedEventArgs) | [System.Windows.Automation.AutomationEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEventHandler) |

 Before calling the method, you must create a delegate method to handle the event. If you prefer, you can handle different kinds of events in a single method, and pass this method in multiple calls to one of the methods in the table. For example, a single [System.Windows.Automation.AutomationEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEventHandler) can be set up to handle various events differently according to the [System.Windows.Automation.AutomationEventArgs.EventId*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEventArgs.EventId*).

> **Note:**
> To process window-closed events, cast the argument type that is passed to the event handler as [System.Windows.Automation.WindowClosedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowClosedEventArgs). Because the Microsoft UI Automation element for the window is no longer valid, you cannot use the `sender` parameter to retrieve information; use [System.Windows.Automation.WindowClosedEventArgs.GetRuntimeId*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowClosedEventArgs.GetRuntimeId*) instead.

> **Caution:**
> If your application might receive events from its own UI, do not use your application's UI thread to subscribe to events, or to unsubscribe. Doing so might lead to unpredictable behavior. For more information, see [UI Automation Threading Issues](ui-automation-threading-issues.md).

 On shutdown, or when UI Automation events are no longer of interest to the application, UI Automation clients should call one of the following methods.

| Method | Description |
| --- | --- |
| [System.Windows.Automation.Automation.RemoveAutomationEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAutomationEventHandler*) | Unregisters an event handler that was registered by using [System.Windows.Automation.Automation.AddAutomationEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationEventHandler*). |
| [System.Windows.Automation.Automation.RemoveAutomationFocusChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAutomationFocusChangedEventHandler*) | Unregisters an event handler that was registered by using [System.Windows.Automation.Automation.AddAutomationFocusChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationFocusChangedEventHandler*). |
| [System.Windows.Automation.Automation.RemoveAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAutomationPropertyChangedEventHandler*) | Unregisters an event handler that was registered by using [System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*). |
| [System.Windows.Automation.Automation.RemoveAllEventHandlers*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAllEventHandlers*) | Unregisters all registered event handlers. |

 For example code, see [Subscribe to UI Automation Events](subscribe-to-ui-automation-events.md).

## See also

- [Subscribe to UI Automation Events](subscribe-to-ui-automation-events.md)
- [UI Automation Events Overview](ui-automation-events-overview.md)
- [UI Automation Properties Overview](ui-automation-properties-overview.md)
- [TrackFocus Sample](https://github.com/Microsoft/WPF-Samples/tree/main/Accessibility/FocusTracker)
