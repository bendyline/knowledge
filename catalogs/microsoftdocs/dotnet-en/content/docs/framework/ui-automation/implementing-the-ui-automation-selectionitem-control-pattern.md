---
title: "Implementing the UI Automation SelectionItem Control Pattern"
description: See guidelines and conventions to implement the SelectionItem control pattern in UI Automation. Know required members for the ISelectionItemProvider interface.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "Selection Item control pattern"
  - "UI Automation, Selection Item control pattern"
  - "control patterns, Selection Item"
ms.assetid: 76b0949a-5b23-4cfc-84cc-154f713e2e12
---
# Implementing the UI Automation SelectionItem Control Pattern

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic introduces guidelines and conventions for implementing [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider), including information about properties, methods, and events. Links to additional references are listed at the end of the overview.

 The [System.Windows.Automation.SelectionItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern) control pattern is used to support controls that act as individual, selectable child items of container controls that implement [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider). For examples of controls that implement the SelectionItem control pattern, see [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md).

<a name="Implementation_Guidelines_and_Conventions"></a>

## Implementation Guidelines and Conventions

 When implementing the Selection Item control pattern, note the following guidelines and conventions:

- Single-selection controls that manage child controls that implement [System.Windows.Automation.Provider.IRawElementProviderFragmentRoot](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderFragmentRoot), such as the **Screen Resolution** slider in the **Display Properties** dialog box, should implement [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider) and their children should implement both [System.Windows.Automation.Provider.IRawElementProviderFragment](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderFragment) and [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider).

<a name="Required_Members_for_the_IValueProvider_Interface"></a>

## Required Members for ISelectionItemProvider

The following properties, methods, and events are required for implementing [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider).

| Required members | Member type | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.ISelectionItemProvider.IsSelected](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.IsSelected) | Property | None |
| [System.Windows.Automation.Provider.ISelectionItemProvider.SelectionContainer](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.SelectionContainer) | Property | None |
| [System.Windows.Automation.Provider.ISelectionItemProvider.AddToSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.AddToSelection*) | Method | None |
| [System.Windows.Automation.Provider.ISelectionItemProvider.RemoveFromSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.RemoveFromSelection*) | Method | None |
| [System.Windows.Automation.Provider.ISelectionItemProvider.Select*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.Select*) | Method | None |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent) | Event | Raised when a selection change results in a single selected item. |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent) | Event | Raised when an item is added to a multi-selection container. |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent) | Event | Raised when an item is removed from a multi-selection container. |
| [System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent) | Event | Raised when a selection in a container has changed significantly and requires sending more [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent) and [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent) events than the [System.Windows.Automation.Provider.AutomationInteropProvider.InvalidateLimit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.AutomationInteropProvider.InvalidateLimit) constant permits. |

- If a [System.Windows.Automation.SelectionItemPattern.Select*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern.Select*), [System.Windows.Automation.SelectionItemPattern.AddToSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern.AddToSelection*), or [System.Windows.Automation.SelectionItemPattern.RemoveFromSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern.RemoveFromSelection*) operation results in a single selected item, raise [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent); otherwise, raise [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent) or [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent) as appropriate.

<a name="Exceptions"></a>

## Exceptions

 Providers must throw the following exceptions.

| Exception type | Condition |
| --- | --- |
| [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) | When any of the following are attempted:<br /><br /> -   [System.Windows.Automation.Provider.ISelectionItemProvider.RemoveFromSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.RemoveFromSelection*) is called on a single-selection container where [System.Windows.Automation.SelectionPattern.IsSelectionRequiredProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern.IsSelectionRequiredProperty) = `true` and an element is already selected.<br />-   [System.Windows.Automation.Provider.ISelectionItemProvider.RemoveFromSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.RemoveFromSelection*) is called on a multiple-selection container where [System.Windows.Automation.SelectionPattern.IsSelectionRequiredProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern.IsSelectionRequiredProperty) = `true` and only one element is selected.<br />-   [System.Windows.Automation.Provider.ISelectionItemProvider.AddToSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.AddToSelection*) is called on a single-selection container where [System.Windows.Automation.SelectionPattern.CanSelectMultipleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern.CanSelectMultipleProperty) = `false` and another element is already selected. |

## See also

- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [Support Control Patterns in a UI Automation Provider](support-control-patterns-in-a-ui-automation-provider.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [Implementing the UI Automation Selection Control Pattern](implementing-the-ui-automation-selection-control-pattern.md)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
- [Fragment Provider Sample](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms771502\(v=vs.90\))
