---
title: "UI Automation Support for the Window Control Type"
description: Get information about UI Automation support for the Window control type. Learn the required tree structure, properties, control patterns, and events.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, Window control type"
  - "Window control type"
  - "control types, Window"
ms.assetid: 53be78a6-cdcc-4af3-a464-5927d19c54e8
---
# UI Automation Support for the Window Control Type

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic provides information about UI Automation support for the Window control type. In UI Automation, a control type is a set of conditions that a control must meet in order to use the [System.Windows.Automation.AutomationElement.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ControlTypeProperty) property. The conditions include specific guidelines for UI Automation tree structure, UI Automation property values, and control patterns.

 The window control consists of the window frame, which contains child objects such as title bar, client, and other objects.

 The UI Automation requirements in the following sections apply to all controls that implement the Window control type, whether Windows Presentation Foundation (WPF), Win32, or Windows Forms.

## Required UI Automation Tree Structure

 The following table depicts the control view and the content view of the UI Automation tree that pertains to window controls and describes what can be contained in each view. For more information on the UI Automation tree, see [UI Automation Tree Overview](ui-automation-tree-overview.md).

| Control View | Content View |
| --- | --- |
| Window | Window |

## Required UI Automation Properties

 The following table lists the UI Automation properties whose value or definition is especially relevant to window controls. For more information about UI Automation properties, see [UI Automation Properties for Clients](ui-automation-properties-for-clients.md).

| UI Automation Property | Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty) | See notes. | The value of this property needs to be unique across all controls in an application. |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) | See notes. | The outermost rectangle that contains the whole control. |
| [System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty) | See notes. | The window control must have a clickable point that will result in causing the window to become selected or unselected. |
| [System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty) | Window | This value is the same for all UI frameworks. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty) | True | The window control must always be content. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty) | True | The window control must always be a control. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty) | See notes. | If the control can receive keyboard focus, it must support this property. |
| [System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty) | `null` | Window controls do not have a static Window label. |
| [System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty) | "window" | Localized string corresponding to the Window control type. |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) | See notes. | The window control always contains a primary Window element that relates to what the user would associate as the most semantic identifier for the item. |

## Required UI Automation Control Patterns

 The following table lists the UI Automation control patterns required to be supported by window controls. For more information on control patterns, see [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md).

| Control Pattern | Support | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.IDockProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IDockProvider) | Conditional | Must be supported if the window has the ability to be docked. |
| [System.Windows.Automation.Provider.ITransformProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider) | Required | Enables the window to be moved, resized, or rotated on the screen. |
| [System.Windows.Automation.Provider.IWindowProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IWindowProvider) | Required | Enables specific operations for the window. |

## Required UI Automation Events

 The following table lists the UI Automation events required to be supported by all window controls. For more information about events, see [UI Automation Events Overview](ui-automation-events-overview.md).

| UI Automation Event | Support | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.AsyncContentLoadedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AsyncContentLoadedEvent) | Required | None |
| [System.Windows.Automation.AutomationElement.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationFocusChangedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.LayoutInvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LayoutInvalidatedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElement.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.StructureChangedEvent) | Required | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.HorizontallyScrollableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.HorizontallyScrollableProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.HorizontalScrollPercentProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.HorizontalScrollPercentProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.HorizontalViewSizeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.HorizontalViewSizeProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.VerticalScrollPercentProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.VerticalScrollPercentProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.VerticallyScrollableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.VerticallyScrollableProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.ScrollPatternIdentifiers.VerticalViewSizeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers.VerticalViewSizeProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.WindowPatternIdentifiers.WindowClosedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowClosedEvent) | Required | None |
| [System.Windows.Automation.WindowPatternIdentifiers.WindowOpenedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowOpenedEvent) | Required | None |
| [System.Windows.Automation.WindowPatternIdentifiers.WindowVisualStateProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers.WindowVisualStateProperty) property-changed event. | Depends | None |

## See also

- [System.Windows.Automation.ControlType.Window](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.Window)
- [UI Automation Control Types Overview](ui-automation-control-types-overview.md)
- [UI Automation Overview](ui-automation-overview.md)
