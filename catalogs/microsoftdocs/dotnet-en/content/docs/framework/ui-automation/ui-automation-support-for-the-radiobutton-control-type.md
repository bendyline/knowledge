---
title: "UI Automation Support for the RadioButton Control Type"
description: Get information about UI Automation support for the RadioButton control type. Learn the required tree structure, properties, control patterns, and events.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "control types, Radio Button"
  - "UI Automation, Radio Button control type"
  - "RadioButton control type"
ms.assetid: 87170464-7857-41f1-bcf7-bb41be31cb53
---
# UI Automation Support for the RadioButton Control Type

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic provides information about UI Automation support for the RadioButton control type. In UI Automation, a control type is a set of conditions that a control must meet in order to use the [System.Windows.Automation.AutomationElement.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ControlTypeProperty) property. The conditions include specific guidelines for UI Automation tree structure, UI Automation property values and control patterns.

 A radio button consists of a round button and application-defined text (a label), an icon, or a bitmap that indicates a choice the user can make by selecting the button. An application typically uses radio buttons in a group box to permit the user to choose from a set of related, but mutually exclusive options. For example, the application might present a group of radio buttons from which the user can select a format preference for text selected in the client area. The user could select a left-aligned, right-aligned, or centered format by selecting the corresponding radio button. Typically, the user can select only one option at a time from a set of radio buttons.

 The following sections define the required UI Automation tree structure, properties, control patterns, and events for the RadioButton control type. The UI Automation requirements apply to all list controls, whether Windows Presentation Foundation (WPF), Win32, or Windows Forms.

<a name="Required_UI_Automation_Tree_Structure"></a>

## Required UI Automation Tree Structure

 The following table depicts the control view and the content view of the UI Automation tree that pertains to radio button controls and describes what can be contained in each view. For more information on the UI Automation tree, see [UI Automation Tree Overview](ui-automation-tree-overview.md).

| Control View | Content View |
| --- | --- |
| RadioButton | RadioButton |

 There are no children in the control view or the content view.

<a name="Required_UI_Automation_Properties"></a>

## Required UI Automation Properties

 The following table lists the UI Automation properties whose value or definition is especially relevant to the RadioButton control type. For more information on UI Automation properties, see [UI Automation Properties for Clients](ui-automation-properties-for-clients.md).

| UI Automation Property | Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty) | See notes. | The value of this property needs to be unique across all controls in an application. |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) | See notes. | The outermost rectangle that contains the whole control. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty) | See notes. | If the control can receive keyboard focus, it must support this property. |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) | See notes. | The radio button control’s name is the text that is displayed beside the button that maintains selection state. |
| [System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty) | See notes. | The radio button control’s clickable point MUST be a point that sets selection on the radio button if clicked with a mouse pointer. |
| [System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty) | `Null` | Radio buttons are self-labeling controls. |
| [System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty) | RadioButton | This value is the same for all UI frameworks. |
| [System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty) | "radio button" | Localized string corresponding to the RadioButton Control Type. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty) | True | The radio button control is always included in the content view of the UI Automation tree. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty) | True | The radio button control is always included in the control view of the UI Automation tree. |

<a name="Required_UI_Automation_Control_Patterns"></a>

## Required UI Automation Control Patterns

 The following table lists the UI Automation control patterns required to be supported by all radio button controls. For more information on control patterns, see [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md).

| Control Pattern/Control Pattern Property | Support/Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider) | Yes | All radio button controls must support the Selection Item pattern to enable themselves to be selected. |
| [System.Windows.Automation.Provider.ISelectionItemProvider.SelectionContainer](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider.SelectionContainer) | See notes. | The `SelectionContainerProperty` must always be completed so that a UI Automation client can determine what other radio buttons within a specific context relate to one another.  For the Win32 version of the radio button, this property will not be supported because it is not possible to obtain this information from that legacy framework. |
| [System.Windows.Automation.Provider.IToggleProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IToggleProvider) | Never | The radio button cannot cycle through its state once it has been set.  This pattern must never be supported on radio button. |

<a name="Required_UI_Automation_Events"></a>

## Required UI Automation Events

 The following table lists the UI Automation events required to be supported by all radio button controls. For more information on events, see [UI Automation Events Overview](ui-automation-events-overview.md).

| UI Automation Event | Support | Notes |
| --- | --- | --- |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementRemovedFromSelectionEvent) | Required | None |
| [System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers.ElementSelectedEvent) | Required | None |
| [System.Windows.Automation.TogglePatternIdentifiers.ToggleStateProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TogglePatternIdentifiers.ToggleStateProperty) property-changed event. | Never | None |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent) | Required | None |

## See also

- [System.Windows.Automation.ControlType.RadioButton](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.RadioButton)
- [UI Automation Control Types Overview](ui-automation-control-types-overview.md)
- [UI Automation Overview](ui-automation-overview.md)
