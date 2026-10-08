---
title: "UI Automation Events Overview"
description: See an overview of Microsoft UI Automation event notification. Review the types of events, UI Automation event identifiers, and UI Automation event arguments.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, providers"
  - "UI Automation, events"
  - "clients, UI Automation"
  - "events, UI Automation"
  - "providers, UI Automation"
  - "UI Automation, clients"
ms.assetid: 69eebd8b-39ed-40e7-93cc-4457c4caf746
---
# UI Automation Events Overview

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 Microsoft UI Automation event notification is a key feature for assistive technologies such as screen readers and screen magnifiers. These UI Automation clients track events that are raised by UI Automation providers when something happens in the UI and use the information to notify end users.

 Efficiency is improved by allowing provider applications to raise events selectively, depending on whether any clients are subscribed to those events, or not at all, if no clients are listening for any events.

<a name="Types_of_Events"></a>

## Types of Events

 UI Automation events fall into the following categories.

| Event | Description |
| --- | --- |
| Property change | Raised when a property on an UI Automation element or control pattern changes. For example, if a client needs to monitor an application's check box control, it can register to listen for a property change event on the [System.Windows.Automation.TogglePattern.TogglePatternInformation.ToggleState](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TogglePattern.TogglePatternInformation.ToggleState) property. When the check box control is checked or unchecked, the provider raises the event and the client can act as necessary. |
| Element action | Raised when a change in the UI results from end user or programmatic activity; for example, when a button is clicked or invoked through [System.Windows.Automation.InvokePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern). |
| Structure change | Raised when the structure of the UI Automation tree changes. The structure changes when new UI items become visible, hidden, or removed on the desktop. |
| Global desktop change | Raised when actions of global interest to the client occur, such as when the focus shifts from one element to another, or when a window closes. |

 Some events do not necessarily mean that the state of the UI has changed. For example, if the user tabs to a text entry field and then clicks a button to update the field, a `TextChangedEvent` is raised even if the user did not actually change the text. When processing an event, it may be necessary for a client application to check whether anything has actually changed before taking action.

 The following events may be raised even when the state of the UI has not changed.

- `AutomationPropertyChangedEvent` (depending on the property that has changed)

- `ElementSelectedEvent`

- `InvalidatedEvent`

- `TextChangedEvent`

<a name="UI_Automation_Event_Identifiers"></a>

## UI Automation Event Identifiers

 Microsoft UI Automation events are identified by [System.Windows.Automation.AutomationEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEvent) objects. The [System.Windows.Automation.AutomationIdentifier.Id](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationIdentifier.Id) property contains a value that uniquely identifies the kind of event.

 The possible values for [System.Windows.Automation.AutomationIdentifier.Id*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationIdentifier.Id*) are given in the following table, along with the type used for event arguments. Note that the identifiers used by clients and providers are identically named fields from different classes.

| Client Identifier | Provider identifier | Event Arguments Type |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElement.AsyncContentLoadedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AsyncContentLoadedEvent) | [System.Windows.Automation.AutomationElementIdentifiers.AsyncContentLoadedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AsyncContentLoadedEvent) | [System.Windows.Automation.AsyncContentLoadedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AsyncContentLoadedEventArgs) |
| [System.Windows.Automation.SelectionItemPattern.ElementAddedToSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern.ElementAddedToSelectionEvent)<br /><br /> [System.Windows.Automation.SelectionItemPattern.ElementRemovedFromSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern.ElementRemovedFromSelectionEvent)<br /><br /> [System.Windows.Automation.SelectionItemPattern.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern.ElementSelectedEvent)<br /><br /> [System.Windows.Automation.SelectionPattern.InvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern.InvalidatedEvent)<br /><br /> [System.Windows.Automation.InvokePattern.InvokedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern.InvokedEvent)<br /><br /> [System.Windows.Automation.AutomationElement.LayoutInvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.LayoutInvalidatedEvent)<br /><br /> [System.Windows.Automation.AutomationElement.MenuClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.MenuClosedEvent)<br /><br /> [System.Windows.Automation.AutomationElement.MenuOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.MenuOpenedEvent)<br /><br /> [System.Windows.Automation.TextPattern.TextChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.TextChangedEvent)<br /><br /> [System.Windows.Automation.TextPattern.TextSelectionChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.TextSelectionChangedEvent)<br /><br /> [System.Windows.Automation.AutomationElement.ToolTipClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ToolTipClosedEvent)<br /><br /> [System.Windows.Automation.AutomationElement.ToolTipOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ToolTipOpenedEvent)<br /><br /> [System.Windows.Automation.WindowPattern.WindowOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPattern.WindowOpenedEvent) | [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent)<br /><br /> [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent)<br /><br /> [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent)<br /><br /> [System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent)<br /><br /> [System.Windows.Automation.InvokePatternIdentifiers.InvokedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePatternIdentifiers.InvokedEvent)<br /><br /> [System.Windows.Automation.AutomationElementIdentifiers.LayoutInvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LayoutInvalidatedEvent)<br /><br /> [System.Windows.Automation.AutomationElementIdentifiers.MenuClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.MenuClosedEvent)<br /><br /> [System.Windows.Automation.AutomationElementIdentifiers.MenuOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.MenuOpenedEvent)<br /><br /> [System.Windows.Automation.TextPatternIdentifiers.TextChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPatternIdentifiers.TextChangedEvent)<br /><br /> [System.Windows.Automation.TextPatternIdentifiers.TextSelectionChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPatternIdentifiers.TextSelectionChangedEvent)<br /><br /> [System.Windows.Automation.AutomationElementIdentifiers.ToolTipClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ToolTipClosedEvent)<br /><br /> [System.Windows.Automation.AutomationElementIdentifiers.ToolTipOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ToolTipOpenedEvent)<br /><br /> [System.Windows.Automation.WindowPatternIdentifiers.WindowOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowOpenedEvent) | [System.Windows.Automation.AutomationEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEventArgs) |
| [System.Windows.Automation.AutomationElement.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationFocusChangedEvent) | [System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent) | [System.Windows.Automation.AutomationFocusChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationFocusChangedEventArgs) |
| [System.Windows.Automation.AutomationElement.AutomationPropertyChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationPropertyChangedEvent) | [System.Windows.Automation.AutomationElementIdentifiers.AutomationPropertyChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationPropertyChangedEvent) | [System.Windows.Automation.AutomationPropertyChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationPropertyChangedEventArgs) |
| [System.Windows.Automation.AutomationElement.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.StructureChangedEvent) | [System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent) | [System.Windows.Automation.StructureChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.StructureChangedEventArgs) |
| [System.Windows.Automation.WindowPattern.WindowClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPattern.WindowClosedEvent) | [System.Windows.Automation.WindowPatternIdentifiers.WindowClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowClosedEvent) | [System.Windows.Automation.WindowClosedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowClosedEventArgs) |

<a name="UI_Automation_Event_Arguments"></a>

## UI Automation Event Arguments

 The following classes encapsulate event arguments.

| Class | Description |
| --- | --- |
| [System.Windows.Automation.AsyncContentLoadedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AsyncContentLoadedEventArgs) | Contains information about the asynchronous loading of content, including the percentage of loading completed. |
| [System.Windows.Automation.AutomationEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEventArgs) | Contains information about a simple event that requires no extra data. |
| [System.Windows.Automation.AutomationFocusChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationFocusChangedEventArgs) | Contains information about a change in input focus from one element to another. Events of this type are raised by the UI Automation system, not by providers. |
| [System.Windows.Automation.AutomationPropertyChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationPropertyChangedEventArgs) | Contains information about a change in a property value of an element or control pattern. |
| [System.Windows.Automation.StructureChangedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.StructureChangedEventArgs) | Contains information about a change in the UI Automation tree. |
| [System.Windows.Automation.WindowClosedEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowClosedEventArgs) | Contains information about a window closing. |

 All the event argument classes contain an [System.Windows.Automation.AutomationEventArgs.EventId*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEventArgs.EventId*) member. This identifier is encapsulated in an [System.Windows.Automation.AutomationEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEvent).

 The [System.Windows.Automation.AutomationEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationEvent) objects used to identify events are obtained by providers from fields in [System.Windows.Automation.AutomationElementIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers) and control pattern identifier classes such as [System.Windows.Automation.DockPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.DockPatternIdentifiers). The equivalent fields are obtained by client applications from fields in [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) and control pattern classes such as [System.Windows.Automation.DockPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.DockPattern).

 For a list of event identifiers, see [UI Automation Events for Clients](ui-automation-events-for-clients.md).

## See also

- [UI Automation Events for Clients](ui-automation-events-for-clients.md)
- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)
- [Subscribe to UI Automation Events](subscribe-to-ui-automation-events.md)
