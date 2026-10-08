---
title: "UI Automation Support for the Spinner Control Type"
description: Get information about UI Automation support for the Spinner control type. Learn the required tree structure, properties, control patterns, and events.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, Spinner control type"
  - "Spinner control type"
  - "control types, Spinner"
ms.assetid: 3a29d185-65d8-42e3-bcc3-7f43e96f40c5
---
# UI Automation Support for the Spinner Control Type

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic provides information about UI Automation support for the Spinner control type. In UI Automation, a control type is a set of conditions that a control must meet in order to use the [System.Windows.Automation.AutomationElement.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ControlTypeProperty) property. The conditions include specific guidelines for UI Automation tree structure, UI Automation property values and control patterns.

 Spinner controls are used to select from a domain of items or a range of numbers.

 The following sections define the required UI Automation tree structure, properties, control patterns, and events for the Spinner control type. The UI Automation requirements apply to all spinner controls, whether Windows Presentation Foundation (WPF), Win32, or Windows Forms.

<a name="Required_UI_Automation_Tree_Structure"></a>

## Required UI Automation Tree Structure

 The following table depicts the control view and the content view of the UI Automation tree that pertain to spinner controls when they support the Range Value, Value, and Selection control patterns and describes what can be contained in each view. For more information on the UI Automation tree, see [UI Automation Tree Overview](ui-automation-tree-overview.md).

 **Range Value or Value control pattern**

| Control View | Content View |
| --- | --- |
| Spinner<br /><br /> -   Edit (0 or 1)<br />-   Button (2) | Spinner |

 **Selection control pattern**

| Control View | Content View |
| --- | --- |
| Spinner<br /><br /> -   Edit (0 or 1)<br />-   Button (2)<br />-   List Item (0 or more) | Spinner<br /><br /> -   ListItem (0 or more) |

 To ensure that the two buttons in the control view subtree can be distinguished by automated test tools, assign the `SmallIncrement` or `SmallDecrement` `AutomationId` as appropriate. For some implementations, the associated Edit control may be a peer of the Spinner control.

<a name="Required_UI_Automation_Properties"></a>

## Required UI Automation Properties

 The following table lists the UI Automation properties whose value or definition is especially relevant to spinner controls. For more information on UI Automation properties, see [UI Automation Properties for Clients](ui-automation-properties-for-clients.md).

| UI Automation Property | Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationIdProperty) | See notes. | The value of this property needs to be unique across all controls in an application. |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) | See notes. | The outermost rectangle that contains the whole control. |
| [System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ClickablePointProperty) | See notes. | The spinner control's clickable point gives focus to the edit portion of the control. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsKeyboardFocusableProperty) | See notes. | If the control can receive keyboard focus, it must support this property. |
| [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty) | See notes. | The spinner control typically gets its name from a static text label. |
| [System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LabeledByProperty) | See notes. | Spinner controls have a static text label. |
| [System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.ControlTypeProperty) | Spinner | This value is the same for all UI frameworks. |
| [System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty) | "spinner" | Localized string corresponding to the Spinner control type. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsContentElementProperty) | True | The spinner control must always be content. |
| [System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsControlElementProperty) | True | The Spinner control must always be a control. |

<a name="Required_UI_Automation_Control_Patterns_and_Properties"></a>

## Required UI Automation Control Patterns and Properties

 The following table lists the UI Automation control patterns required to be supported by spinner controls. For more information about control patterns, see [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md).

| Control Pattern/Pattern Property | Support/Value | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider) | Depends | Spinner controls that have a list of items to be selected must support this pattern. |
| [System.Windows.Automation.Provider.ISelectionProvider.CanSelectMultiple](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider.CanSelectMultiple) | False | Spinner controls are always single selection containers. |
| [System.Windows.Automation.Provider.IRangeValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRangeValueProvider) | Depends | Spinner controls that span a numeric range can support this pattern. |
| [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider) | Depends | Spinner controls that span a discrete set of options or numbers can support this pattern. |

<a name="Required_UI_Automation_Events"></a>

## Required UI Automation Events

 The following table lists the UI Automation events required to be supported by all spinner controls. For more information on events, see [UI Automation Events Overview](ui-automation-events-overview.md).

| UI Automation Event | Support | Notes |
| --- | --- | --- |
| [System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPatternIdentifiers.InvalidatedEvent) | Depends | None |
| [System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.BoundingRectangleProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsOffscreenProperty) property-changed event. | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.IsEnabledProperty) property-changed event. | Required | None |
| [System.Windows.Automation.ValuePatternIdentifiers.ValueProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePatternIdentifiers.ValueProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.RangeValuePatternIdentifiers.ValueProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePatternIdentifiers.ValueProperty) property-changed event. | Depends | None |
| [System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AutomationFocusChangedEvent) | Required | None |
| [System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.StructureChangedEvent) | Required | None |

## See also

- [System.Windows.Automation.ControlType.Spinner](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.Spinner)
- [UI Automation Control Types Overview](ui-automation-control-types-overview.md)
- [UI Automation Overview](ui-automation-overview.md)
