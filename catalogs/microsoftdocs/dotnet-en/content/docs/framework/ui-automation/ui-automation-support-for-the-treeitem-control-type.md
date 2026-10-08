---
title: "UI Automation Support for the TreeItem Control Type"
description: Get information about UI Automation support for the TreeItem control type. Learn the required tree structure, properties, control patterns, and events.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "control types, Tree Item"
  - "Tree Item control type"
  - "UI Automation, Tree Item control type"
ms.assetid: 229f341a-477f-434e-b877-4db9973068eb
---
# UI Automation Support for the TreeItem Control Type

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic provides information about UI Automation support for the TreeItem control type. In UI Automation, a control type is a set of conditions that a control must meet in order to use the [System.Windows.Automation.AutomationElement.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ControlTypeProperty) property. The conditions include specific guidelines for UI Automation tree structure, UI Automation property values and control patterns.

 The TreeItem control type represents a node within a tree container. Each node might contain other nodes, called child nodes. Parent nodes, or nodes that contain child nodes, can be displayed as expanded or collapsed.

 The following sections define the required UI Automation tree structure, properties, control patterns, and events for the TreeItem control type. The UI Automation requirements apply to all tree item controls, whether Windows Presentation Foundation (WPF), Win32, or Windows Forms.

<a name="Required_UI_Automation_Tree_Structure"></a>

## Required UI Automation Tree Structure

 The following table depicts the control view and the content view of the UI Automation tree that pertains to tree item controls and describes what can be contained in each view. For more information on the UI Automation tree, see [UI Automation Tree Overview](ui-automation-tree-overview.md).

| Control View | Content View |
| --- | --- |
| TreeItem<br /><br /> -   CheckBox (0 or 1)<br />-   Image (0 or 1)<br />-   Button (0 or 1)<br />-   TreeItem (0 or more) | TreeItem<br /><br /> -   TreeItem (0 or more) |

 Tree item controls can have zero or more tree item children in the content view of the UI Automation tree. If the tree item control has functionality beyond what is exposed in the control patterns listed below, then the control should be based on the Data Item control type.

 Collapsed tree items will not display in the control view or content view until they become expanded and visible (or, can be scrolled into view).

 The control view can contain additional details for a control, including an associated image or a button. For example, an item in an outline view might contain an image as well as a button to expand or collapse the outline. These detail objects don't appear in the content view because the information is already represented by the parent tree item. Tree items that are scrolled off the screen will appear in both the control and content views of the UI Automation tree and should have the [System.Windows.Automation.AutomationElement.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsOffscreenProperty) set to true.

<a name="Required_UI_Automation_Properties"></a>

## Required UI Automation Properties

 The following table lists the UI Automation properties whose value or definition is especially relevant to list controls. For more information on UI Automation properties, see [UI Automation Properties for Clients](ui-automation-properties-for-clients.md).

| UI Automation Property | Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty) | See notes. | The value of this property needs to be unique across all controls in an application. |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) | See notes. | The outermost rectangle that contains the whole control. |
| [System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty) | See notes. | This property must return a location of the item that will cause the item to change selection state or become focused. |
| [System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty) | TreeItem | This value is the same for all UI frameworks. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty) | True | The list control is always included in the content view of the UI Automation tree. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty) | True | The list control is always included in the control view of the UI Automation tree. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) | See notes. | This property is set to indicate when a tree item control is scrolled off the screen. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty) | See notes. | If the control can receive keyboard focus, it must support this property. |
| [System.Windows.Automation.AutomationElementIdentifiers.ItemTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ItemTypeProperty) | See notes. | If the tree item control uses a visual icon to indicate that is a particular type of object, then this property must be supported and indicate what the object is. |
| [System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty) | `Null` | Tree item controls are self-labeling. |
| [System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty) | "tree item" | Localized string corresponding to the TreeItem control type. |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) | See notes. | This property exposes the text displayed for each tree item control. |

<a name="Required_UI_Automation_Control_Patterns"></a>

## Required UI Automation Control Patterns

 The following table lists the UI Automation control patterns required to be supported by list controls. For more information on control patterns, see [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md).

| Control Pattern/Pattern Property | Support/Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.IInvokeProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IInvokeProvider) | Depends | Implement this control pattern if the tree item has a separate, actionable command. |
| [System.Windows.Automation.Provider.IExpandCollapseProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IExpandCollapseProvider) | Yes | All tree items can be expanded or collapsed. |
| [System.Windows.Automation.Provider.IExpandCollapseProvider.ExpandCollapseState*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IExpandCollapseProvider.ExpandCollapseState*) | Expanded, Collapsed, or Leaf Node | Tree items will be leaf nodes when they are not expanded or collapsed. |
| [System.Windows.Automation.Provider.IScrollItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IScrollItemProvider) | Depends | Implement this control pattern if the tree container supports the Scroll control pattern. |
| [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider) | Depends | Implement this control pattern if it is possible to have an active selection that is maintained when the user returns to the tree container. |
| [System.Windows.Automation.Provider.ISelectionItemProvider.SelectionContainer](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.SelectionContainer) | Yes | This property will expose the same container for all items within the container. |
| [System.Windows.Automation.Provider.IToggleProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IToggleProvider) | Depends | Implement this control pattern if the tree item has an associated check box. |

<a name="Required_UI_Automation_Events"></a>

## Required UI Automation Events

 The following table lists the UI Automation events required to be supported by all tree item controls. For more information about events, see [UI Automation Events Overview](ui-automation-events-overview.md).

| UI Automation Event | Support | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.ItemStatusProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ItemStatusProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent) | Required | None |
| [System.Windows.Automation.ExpandCollapsePatternIdentifiers.ExpandCollapseStateProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ExpandCollapsePatternIdentifiers.ExpandCollapseStateProperty) property-changed event. | Required | None |
| [System.Windows.Automation.InvokePatternIdentifiers.InvokedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePatternIdentifiers.InvokedEvent) | Depends | None |
| [System.Windows.Automation.MultipleViewPatternIdentifiers.CurrentViewProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.MultipleViewPatternIdentifiers.CurrentViewProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementAddedToSelectionEvent) | Depends | None |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent) | Depends | None |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent) | Depends | None |
| [System.Windows.Automation.TogglePatternIdentifiers.ToggleStateProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TogglePatternIdentifiers.ToggleStateProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ValuePatternIdentifiers.ValueProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePatternIdentifiers.ValueProperty) property-changed event. | Depends | None |

## See also

- [System.Windows.Automation.ControlType.TreeItem](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.TreeItem)
- [UI Automation Control Types Overview](ui-automation-control-types-overview.md)
- [UI Automation Overview](ui-automation-overview.md)
