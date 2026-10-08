---
title: "Implementing the UI Automation Selection Control Pattern"
description: Review guidelines and conventions for implementing the Selection control pattern in UI Automation. See required members for the ISelectionProvider interface.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "Selection control pattern"
  - "UI Automation, Selection control pattern"
  - "control patterns, Selection"
ms.assetid: 449c3068-a5d6-4f66-84c6-1bcc7dd4d209
---
# Implementing the UI Automation Selection Control Pattern

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic introduces guidelines and conventions for implementing [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider), including information about events and properties. Links to additional references are listed at the end of the topic.

 The [System.Windows.Automation.SelectionPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern) control pattern is used to support controls that act as containers for a collection of selectable child items. The children of this element must implement [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider). For examples of controls that implement this control pattern, see [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md).

<a name="Implementation_Guidelines_and_Conventions"></a>

## Implementation Guidelines and Conventions

 When implementing the Selection control pattern, note the following guidelines and conventions:

- Controls that implement [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider) allow either single or multiple child items to be selected. For example, list box, list view, and tree view support multiple selections whereas combo box, slider, and radio button group support single selection.

- Controls that have a minimum, maximum, and continuous range, such as the **Volume** slider control, should implement [System.Windows.Automation.Provider.IRangeValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRangeValueProvider) instead of [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider).

- Single-selection controls that manage child controls that implement [System.Windows.Automation.Provider.IRawElementProviderFragmentRoot](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderFragmentRoot), such as the **Screen Resolution** slider in the **Display Properties** dialog box or the **Color Picker** selection control from Microsoft Word (illustrated below), should implement [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider); their children should implement both [System.Windows.Automation.Provider.IRawElementProviderFragment](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderFragment) and [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider).

 Color picker with yellow highlighted.
Example of Color Swatch String Mapping

- Menus do not support [System.Windows.Automation.SelectionPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern). If you are working with menu items that include both graphics and text (such as the **Preview Pane** items in the **View** menu in Microsoft Outlook) and need to convey state, you should implement [System.Windows.Automation.Provider.IToggleProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IToggleProvider).

<a name="Required_Members_for_ISelectionProvider"></a>

## Required Members for ISelectionProvider

 The following properties, methods, and events are required for the [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider) interface.

| Required members | Type | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.ISelectionProvider.CanSelectMultiple](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider.CanSelectMultiple) | Property | Should support property changed events using [System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*) and [System.Windows.Automation.Automation.RemoveAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAutomationPropertyChangedEventHandler*). |
| [System.Windows.Automation.Provider.ISelectionProvider.IsSelectionRequired](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider.IsSelectionRequired) | Property | Should support property changed events using [System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*) and [System.Windows.Automation.Automation.RemoveAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RemoveAutomationPropertyChangedEventHandler*). |
| [System.Windows.Automation.Provider.ISelectionProvider.GetSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider.GetSelection*) | Method | None |
| [System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent) | Event | Raised when a selection in a container has changed significantly and requires sending more addition and removal events than the [System.Windows.Automation.Provider.AutomationInteropProvider.InvalidateLimit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.AutomationInteropProvider.InvalidateLimit) constant permits. |

 The [System.Windows.Automation.Provider.ISelectionProvider.IsSelectionRequired](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider.IsSelectionRequired) and [System.Windows.Automation.Provider.ISelectionProvider.CanSelectMultiple](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider.CanSelectMultiple) properties can be dynamic. For example, the initial state of a control might not have any items selected by default, indicating that [System.Windows.Automation.Provider.ISelectionProvider.IsSelectionRequired](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider.IsSelectionRequired) is `false`. However, after an item is selected, the control must always have at least one item selected. Similarly, in rare cases, a control might allow multiple items to be selected on initialization, but subsequently allow only single selections to be made.

<a name="Exceptions"></a>

## Exceptions

 Providers must throw the following exceptions.

| Exception Type | Condition |
| --- | --- |
| [System.Windows.Automation.ElementNotEnabledException](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ElementNotEnabledException) | If the control is not enabled. |
| [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) | If the control is hidden. |

## See also

- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [Support Control Patterns in a UI Automation Provider](support-control-patterns-in-a-ui-automation-provider.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [Implementing the UI Automation SelectionItem Control Pattern](implementing-the-ui-automation-selectionitem-control-pattern.md)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
