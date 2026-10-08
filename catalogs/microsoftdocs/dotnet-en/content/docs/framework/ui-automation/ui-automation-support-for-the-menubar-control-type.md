---
title: "UI Automation Support for the MenuBar Control Type"
description: Get information about UI Automation support for the MenuBar control type. Learn the required tree structure, properties, control patterns, and events.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, Menu Bar control type"
  - "control types, Menu Bar"
  - "Menu Bar control type"
ms.assetid: c1202b21-c1f0-4560-853c-7b99bd73ad97
---
# UI Automation Support for the MenuBar Control Type

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic provides information about UI Automation support for the [System.Windows.Automation.ControlType.MenuBar](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.MenuBar) control type. In UI Automation, a control type is a set of conditions that a control must meet in order to use the [System.Windows.Automation.AutomationElement.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ControlTypeProperty) property. The conditions include specific guidelines for UI Automation tree structure, UI Automation property values and control patterns.

 Menu bar controls are an example of controls that implement the MenuBar control type. Menu bars provide a means for users to activate commands and options contained in an application.

 The following sections define the required UI Automation tree structure, properties, control patterns, and events for the MenuBar control type. The UI Automation requirements apply to all list controls, whether Windows Presentation Foundation (WPF), Win32, or Windows Forms.

<a name="Required_UI_Automation_Tree_Structure"></a>

## Required UI Automation Tree Structure

 The following table depicts the control view and the content view of the UI Automation tree that pertains to menu bar controls and describes what can be contained in each view. For more information on the UI Automation tree, see [UI Automation Tree Overview](ui-automation-tree-overview.md).

| Control View | Content View |
| --- | --- |
| MenuBar<br /><br /> -   MenuItem (1 or more)<br />-   Other controls (0 or many) | MenuBar<br /><br /> -   MenuItem (1 or more)<br />-   Other controls (0 or many) |

 Menu bar controls can contain other controls such as edit controls and combo boxes within its structure. These additional controls correspond to the "other controls" listed above in the control and content views.

<a name="Required_UI_Automation_Properties"></a>

## Required UI Automation Properties

 The following table lists the UI Automation properties whose value or definition is especially relevant to the menu bar controls. For more information on UI Automation properties, see [UI Automation Properties for Clients](ui-automation-properties-for-clients.md).

| UI Automation Property | Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) | See notes. | The value exposed by this property must include all of the controls contained within it. |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) | See notes. | The menu bar control does not need a name unless an application has more than one menu bar. If there is more than one menu bar in an application, then this property should be used to expose distinguishing names, such as "Formatting" or "Outlining." |
| [System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty) | `Null` | Menu bar controls never have a label. |
| [System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty) | MenuBar | This value is the same for all UI frameworks. |
| [System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty) | "menu bar" | Localized string corresponding to the MenuBar control type. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty) | True | The menu bar control is always included in the content view of the UI Automation tree. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty) | True | The menu bar control is always included in the control view of the UI Automation tree. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) | See notes. | The value of this property depends on whether the control is viewable on the screen. |
| [System.Windows.Automation.AutomationElementIdentifiers.OrientationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.OrientationProperty) | Depends | This property exposes whether the menu bar control is horizontal or vertical. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty) | True | Menu bar controls are keyboard-focusable because the controls they contain can take keyboard focus. |
| [System.Windows.Automation.AutomationElementIdentifiers.HelpTextProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.HelpTextProperty) | See notes. | No scenarios for when Help text is required for a menu bar control. |
| [System.Windows.Automation.AutomationElementIdentifiers.AcceleratorKeyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AcceleratorKeyProperty) | `Null` | Menu bars never have accelerator keys. |
| [System.Windows.Automation.AutomationElementIdentifiers.AccessKeyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AccessKeyProperty) | "ALT" | Pressing the ALT key should always bring focus to the menu bar within the application. |

<a name="Required_UI_Automation_Control_Patterns"></a>

## Required UI Automation Control Patterns

 The following table lists the UI Automation control patterns required to be supported by menu bar controls. For more information on control patterns, see [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md).

| Control Pattern | Support | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.IExpandCollapseProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IExpandCollapseProvider) | Depends | If the control can be expanded or collapsed, implement [System.Windows.Automation.Provider.IExpandCollapseProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IExpandCollapseProvider). |
| [System.Windows.Automation.Provider.IDockProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IDockProvider) | Depends | If the control can be docked to different parts of the screen, implement [System.Windows.Automation.Provider.IDockProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IDockProvider). |
| [System.Windows.Automation.Provider.ITransformProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider) | Depends | If the control can be resized, rotated or moved it must implement [System.Windows.Automation.Provider.ITransformProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider). |

<a name="Required_UI_Automation_Events"></a>

## Required UI Automation Events

 The following table lists the UI Automation events required to be supported by all menu bar controls. For more information on events, see [UI Automation Events Overview](ui-automation-events-overview.md).

| UI Automation Event | Support/Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty) property-changed event. | Required | None |
| [System.Windows.Automation.ExpandCollapsePatternIdentifiers.ExpandCollapseStateProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ExpandCollapsePatternIdentifiers.ExpandCollapseStateProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent) | Required | None |

## See also

- [System.Windows.Automation.ControlType.MenuBar](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.MenuBar)
- [UI Automation Control Types Overview](ui-automation-control-types-overview.md)
- [UI Automation Overview](ui-automation-overview.md)
