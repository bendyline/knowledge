---
title: "UI Automation Control Patterns Overview"
description: See an overview of UI Automation control patterns. Control patterns let you categorize and expose a control's functionality regardless of type or appearance.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "control patterns"
  - "UI Automation, control patterns"
ms.assetid: cc229b33-234b-469b-ad60-f0254f32d45d
---
# UI Automation Control Patterns Overview

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This overview introduces Microsoft UI Automation control patterns. Control patterns provide a way to categorize and expose a control's functionality independent of the control type or the appearance of the control.

 UI Automation uses control patterns to represent common control behaviors. For example, you use the Invoke control pattern for controls that can be invoked (such as buttons) and the Scroll control pattern for controls that have scroll bars (such as list boxes, list views, or combo boxes). Because each control pattern represents a separate functionality, they can be combined to describe the full set of functionality supported by a particular control.

> **Note:**
> Aggregate controls—built with child controls that provide the user interface (UI) for functionality exposed by the parent—should implement all control patterns normally associated with each child control. In turn, those same control patterns are not required to be implemented by the child controls.

<a name="uiautomation_control_pattern_includes"></a>

## UI Automation Control Pattern Components

 Control patterns support the methods, properties, events, and relationships needed to define a discrete piece of functionality available in a control.

- The relationship between a UI Automation element and its parent, children and siblings describes the element's structure within the UI Automation tree.

- The methods allow UI Automation clients to manipulate the control.

- The properties and events provide information about the control pattern's functionality as well as information about the state of the control.

 Control patterns relate to UI as interfaces relate to Component Object Model (COM) objects. In COM, you can query an object to ask what interfaces it supports and then use those interfaces to access functionality. In UI Automation, UI Automation clients can ask a control which control patterns it supports and then interact with the control through the properties, methods, events, and structures exposed by the supported control patterns. For example, for a multiline edit box, UI Automation providers implement [System.Windows.Automation.Provider.IScrollProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IScrollProvider). When a client knows that an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) supports the [System.Windows.Automation.ScrollPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPattern) control pattern, it can use the properties, methods, and events exposed by that control pattern to manipulate the control, or access information about the control.

<a name="uiautomation_control_pattern_client_provider"></a>

## UI Automation Providers and Clients

 UI Automation providers implement control patterns to expose the appropriate behavior for a specific piece of functionality supported by the control.

 UI Automation clients access methods and properties of UI Automation control pattern classes and use them to get information about the UI, or to manipulate the UI. These control pattern classes are found in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace (for example, [System.Windows.Automation.InvokePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern) and [System.Windows.Automation.SelectionPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern)).

 Clients use [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) methods (such as [System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*) or [System.Windows.Automation.AutomationElement.GetCachedPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPropertyValue*)) or the common language runtime (CLR) accessors to access the UI Automation properties on a pattern. Each control pattern class has a field member (for example, [System.Windows.Automation.InvokePattern.Pattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern.Pattern) or [System.Windows.Automation.SelectionPattern.Pattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern.Pattern)) that identifies that control pattern and can be passed as a parameter to [System.Windows.Automation.AutomationElement.GetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPattern*) or [System.Windows.Automation.AutomationElement.GetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPattern*) to retrieve that pattern for an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement).

<a name="uiautomation_control_patterns_dynamic"></a>

## Dynamic Control Patterns

 Some controls do not always support the same set of control patterns. Control patterns are considered supported when they are available to a UI Automation client. For example, a multiline edit box enables vertical scrolling only when it contains more lines of text than can be displayed in its viewable area. Scrolling is disabled when enough text is removed so that scrolling is no longer required. For this example, the ScrollPattern control pattern is dynamically supported depending on the current state of the control (how much text is in the edit box).

<a name="Control_Pattern_Classes_and_Interfaces"></a>

## Control Pattern Classes and Interfaces

 The following table describes the UI Automation control patterns. The table also lists the classes used by UI Automation clients to access the control patterns, as well as the interfaces used by UI Automation providers to implement them.

| Control Pattern Class | Provider Interface | Description |
| --- | --- | --- |
| [System.Windows.Automation.DockPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.DockPattern) | [System.Windows.Automation.Provider.IDockProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IDockProvider) | Used for controls that can be docked in a docking container. For example, toolbars or tool palettes. |
| [System.Windows.Automation.ExpandCollapsePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ExpandCollapsePattern) | [System.Windows.Automation.Provider.IExpandCollapseProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IExpandCollapseProvider) | Used for controls that can be expanded or collapsed. For example, menu items in an application such as the **File** menu. |
| [System.Windows.Automation.GridPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridPattern) | [System.Windows.Automation.Provider.IGridProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IGridProvider) | Used for controls that support grid functionality such as sizing and moving to a specified cell. For example, the large icon view in Windows Explorer or simple tables without headers in Microsoft Word. |
| [System.Windows.Automation.GridItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridItemPattern) | [System.Windows.Automation.Provider.IGridItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IGridItemProvider) | Used for controls that have cells within grids. The individual cells should support the GridItem pattern. For example, each cell in Microsoft Windows Explorer detail view. |
| [System.Windows.Automation.InvokePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern) | [System.Windows.Automation.Provider.IInvokeProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IInvokeProvider) | Used for controls that can be invoked, such as a button. |
| [System.Windows.Automation.MultipleViewPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.MultipleViewPattern) | [System.Windows.Automation.Provider.IMultipleViewProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IMultipleViewProvider) | Used for controls that can switch between multiple representations of the same set of information, data, or children. For example, a list view control where data is available in thumbnail, tile, icon, list, or detail views. |
| [System.Windows.Automation.RangeValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern) | [System.Windows.Automation.Provider.IRangeValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRangeValueProvider) | Used for controls that have a range of values that can be applied to the control. For example, a spinner control containing years might have a range of 1900 to 2010, while another spinner control presenting months would have a range of 1 to 12. |
| [System.Windows.Automation.ScrollPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPattern) | [System.Windows.Automation.Provider.IScrollProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IScrollProvider) | Used for controls that can scroll. For example, a control that has scroll bars that are active when there is more information than can be displayed in the viewable area of the control. |
| [System.Windows.Automation.ScrollItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollItemPattern) | [System.Windows.Automation.Provider.IScrollItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IScrollItemProvider) | Used for controls that have individual items in a list that scrolls. For example, a list control that has individual items in the scroll list, such as a combo box control. |
| [System.Windows.Automation.SelectionPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern) | [System.Windows.Automation.Provider.ISelectionProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionProvider) | Used for selection container controls. For example, list boxes and combo boxes. |
| [System.Windows.Automation.SelectionItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern) | [System.Windows.Automation.Provider.ISelectionItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ISelectionItemProvider) | Used for individual items in selection container controls, such as list boxes and combo boxes. |
| [System.Windows.Automation.TablePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TablePattern) | [System.Windows.Automation.Provider.ITableProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITableProvider) | Used for controls that have a grid as well as header information. For example, Microsoft Excel worksheets. |
| [System.Windows.Automation.TableItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TableItemPattern) | [System.Windows.Automation.Provider.ITableItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITableItemProvider) | Used for items in a table. |
| [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) | [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider) | Used for edit controls and documents that expose textual information. |
| [System.Windows.Automation.TogglePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TogglePattern) | [System.Windows.Automation.Provider.IToggleProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IToggleProvider) | Used for controls where the state can be toggled. For example, check boxes and checkable menu items. |
| [System.Windows.Automation.TransformPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPattern) | [System.Windows.Automation.Provider.ITransformProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider) | Used for controls that can be resized, moved, and rotated. Typical uses for the Transform control pattern are in designers, forms, graphical editors, and drawing applications. |
| [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern) | [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider) | Allows clients to get or set a value on controls that do not support a range of values. For example, a date time picker. |
| [System.Windows.Automation.WindowPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPattern) | [System.Windows.Automation.Provider.IWindowProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IWindowProvider) | Exposes information specific to windows, a fundamental concept to the Microsoft Windows operating system. Examples of controls that are windows are top-level application windows (Microsoft Word, Microsoft Windows Explorer, and so on), multiple-document interface (MDI) child windows, and dialogs. |

## See also

- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md)
- [UI Automation Overview](ui-automation-overview.md)
- [UI Automation Properties for Clients](ui-automation-properties-for-clients.md)
- [UI Automation Events for Clients](ui-automation-events-for-clients.md)
