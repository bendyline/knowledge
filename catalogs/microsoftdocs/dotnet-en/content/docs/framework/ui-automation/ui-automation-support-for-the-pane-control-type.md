---
title: "UI Automation Support for the Pane Control Type"
description: Get information about UI Automation support for the Pane control type. Learn the required tree structure, properties, control patterns, and events.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, Pane control type"
  - "Pane control type"
  - "control types, Pane"
ms.assetid: 79761191-4449-4630-899c-9cbdb8867d3f
---
# UI Automation Support for the Pane Control Type

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic provides information about UI Automation support for the Pane control type. In UI Automation, a control type is a set of conditions that a control must meet in order to use the [System.Windows.Automation.AutomationElement.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ControlTypeProperty) property. The conditions include specific guidelines for UI Automation tree structure, UI Automation property values and control patterns.

 The Pane control type is used to represent an object within a frame or document window. Users can navigate between pane controls and within the contents of the current pane, but cannot navigate between items in different panes. Thus, pane controls represent a level of grouping lower than windows or documents, but above individual controls. The user navigates between panes by pressing TAB, F6, or CTRL+TAB, depending on the context. No specific keyboard navigation is required by the Pane control type.

 The following sections define the required UI Automation tree structure, properties, control patterns, and events for the Pane control type. The UI Automation requirements apply to all list controls, whether Windows Presentation Foundation (WPF), Win32, or Windows Forms.

<a name="Required_UI_Automation_Tree_Structure"></a>

## Required UI Automation Tree Structure

 The following table depicts the control view and the content view of the UI Automation tree that pertains to pane controls and describes what can be contained in each view. For more information on the UI Automation tree, see [UI Automation Tree Overview](ui-automation-tree-overview.md).

| Control View | Content View |
| --- | --- |
| Pane | Pane |

<a name="Required_UI_Automation_Properties"></a>

## Required UI Automation Properties

 The following table lists the UI Automation properties whose value or definition is especially relevant to pane controls. For more information on UI Automation properties, see [UI Automation Properties for Clients](ui-automation-properties-for-clients.md).

| UI Automation Property | Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty) | See notes. | The value of this property needs to be unique across all controls in an application. |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) | See notes. | The outermost rectangle that contains the whole control. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty) | See notes. | If the control can receive keyboard focus, it must support this property. |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) | See notes. | The value for this property must always be a clear, concise and meaningful title. |
| [System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty) | See notes. | This property exposes a clickable point of the pane control that causes the pane to become focused when it is clicked. |
| [System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty) | See notes. | Pane controls typically do not have a static label. If there is a static text label, it should be exposed through this property. |
| [System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty) | Pane | This value is the same for all UI frameworks. |
| [System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty) | "pane" | Localized string corresponding to the Pane control type. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty) | True | Pane controls are always included in the content view of the UI Automation tree. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty) | True | Pane controls are always included in the control view of the UI Automation tree. |
| [System.Windows.Automation.AutomationElementIdentifiers.HelpTextProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.HelpTextProperty) | "" | The help text for pane controls should explain why the purpose of the frame and how it relates to other frames. A description is necessary if the purpose and relationship of frames is not clear from the value of the `NameProperty`. " |
| [System.Windows.Automation.AutomationElementIdentifiers.AccessKeyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AccessKeyProperty) | See notes. | If a specific key combination gives focus to the pane then that information should be exposed through this property. |

<a name="Required_UI_Automation_Control_Patterns"></a>

## Required UI Automation Control Patterns

 The following table lists the UI Automation control patterns required to be supported by all pane controls. For more information on control patterns, see [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md).

| Control Pattern | Support | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.ITransformProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider) | Depends | Implement this control pattern if the pane control can be moved, resized, or rotated on the screen. |
| [System.Windows.Automation.Provider.IWindowProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IWindowProvider) | Never | If you need to implement this control pattern, your control should be based on the [System.Windows.Automation.ControlType.Window](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.Window) control type. |
| [System.Windows.Automation.Provider.IDockProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IDockProvider) | Depends | Implement this control pattern if the pane control can be docked. |
| [System.Windows.Automation.Provider.IScrollProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IScrollProvider) | Depends | Implement this control pattern if the pane control can be scrolled. |

<a name="Required_UI_Automation_Events"></a>

## Required UI Automation Events

 The following table lists the UI Automation events required to be supported by all pane controls. For more information on events, see [UI Automation Events Overview](ui-automation-events-overview.md).

| UI Automation Event | Support/Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.WindowPatternIdentifiers.WindowClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowClosedEvent) | Never | None |
| [System.Windows.Automation.WindowPatternIdentifiers.WindowOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowOpenedEvent) | Never | None |
| [System.Windows.Automation.AutomationElementIdentifiers.AsyncContentLoadedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AsyncContentLoadedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty) property-changed event. | Required | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.HorizontallyScrollableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.HorizontallyScrollableProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.HorizontalScrollPercentProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.HorizontalScrollPercentProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.HorizontalViewSizeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.HorizontalViewSizeProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.VerticalScrollPercentProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.VerticalScrollPercentProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.VerticallyScrollableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.VerticallyScrollableProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.VerticalViewSizeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.VerticalViewSizeProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.WindowPatternIdentifiers.WindowVisualStateProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowVisualStateProperty) property-changed event. | Never | None |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent) | Required | None |

<a name="Pane_Control_Type_Example"></a>

## Pane Control Type Example

 The following image illustrates a control that implements the Pane control type.

 Screenshot of applet window with two panes

| UI Automation Tree - Control View | UI Automation Tree - Content View |
| --- | --- |
| <ul><li>Pane</li><li>Tree (Scroll Pattern)<br /><br /> <ul><li>TreeItem</li><li>Pane</li><li>Edit (Scroll Pattern</li></ul></li></ul> | -   Pane<br />-   Tree (Scroll Pattern)<br />-   TreeItem<br />-   …Pane<br />-   Edit<br />-   (Scroll Pattern) |

## See also

- [System.Windows.Automation.ControlType.Pane](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.Pane)
- [UI Automation Control Types Overview](ui-automation-control-types-overview.md)
- [UI Automation Overview](ui-automation-overview.md)
