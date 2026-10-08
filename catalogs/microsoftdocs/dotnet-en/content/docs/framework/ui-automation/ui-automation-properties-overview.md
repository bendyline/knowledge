---
title: "UI Automation Properties Overview"
description: See a broad overview of Microsoft UI Automation properties. Learn about property identifiers, properties by category, localization, and properties and events.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, properties"
  - "properties, UI Automation"
ms.assetid: a6c31d7b-b33e-49b3-b5c1-31a345f9b7c8
---
# UI Automation Properties Overview

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 UI Automation providers expose properties on Microsoft UI Automation elements. These properties enable UI Automation client applications to discover information about pieces of the user interface (UI), especially controls, including both static and dynamic data.

 This section gives a broad overview of Microsoft UI Automation properties. More specific information is given in the following topics:

- [UI Automation Properties for Clients](ui-automation-properties-for-clients.md)

- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)

<a name="Property_Identifiers"></a>

## Property Identifiers

 Every property is identified by a number and a name. The names of properties are used only for debugging and diagnosis. Providers use the numeric IDs to identify incoming property requests. Client applications, however, only use [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty), which encapsulates the number and name, to identify properties they wish to retrieve.

 [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty) objects representing particular properties are available as fields in various classes. For security reasons, UI Automation providers obtain these objects from a separate set of classes that are contained in Uiautomationtypes.dll.

 The following table categorizes properties by the classes that contain the [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty)IDs.

| Kinds of properties | Clients get IDs from | Providers get IDs from |
| --- | --- | --- |
| Properties common to all elements (see following tables) | [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) | [System.Windows.Automation.AutomationElementIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers) |
| Position of a docking window | [System.Windows.Automation.DockPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.DockPattern) | [System.Windows.Automation.DockPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.DockPatternIdentifiers) |
| State of an element that can expand and collapse | [System.Windows.Automation.ExpandCollapsePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ExpandCollapsePattern) | [System.Windows.Automation.ExpandCollapsePatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ExpandCollapsePatternIdentifiers) |
| Properties of an item in a grid | [System.Windows.Automation.GridItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridItemPattern) | [System.Windows.Automation.GridItemPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridItemPatternIdentifiers) |
| Properties of a grid | [System.Windows.Automation.GridPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridPattern) | [System.Windows.Automation.GridPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridPatternIdentifiers) |
| Current and supported view of an element that has multiple views | [System.Windows.Automation.MultipleViewPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.MultipleViewPattern) | [System.Windows.Automation.MultipleViewPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.MultipleViewPatternIdentifiers) |
| Properties of an element that moves over a range of values, such as a slider | [System.Windows.Automation.RangeValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern) | [System.Windows.Automation.RangeValuePatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePatternIdentifiers) |
| Properties of a scrolling window | [System.Windows.Automation.ScrollPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPattern) | [System.Windows.Automation.ScrollPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers) |
| Status and container of an item that can be selected, as in a list | [System.Windows.Automation.SelectionItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern) | [System.Windows.Automation.SelectionItemPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPatternIdentifiers) |
| Properties of a control that contains selection items | [System.Windows.Automation.SelectionPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern) | [System.Windows.Automation.SelectionPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPatternIdentifiers) |
| Column and row headers of an item in a table | [System.Windows.Automation.TableItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TableItemPattern) | [System.Windows.Automation.TableItemPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TableItemPatternIdentifiers) |
| Column and row headers, and orientation, of a table | [System.Windows.Automation.TablePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TablePattern) | [System.Windows.Automation.TablePatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TablePatternIdentifiers) |
| State of a toggle control | [System.Windows.Automation.TogglePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TogglePattern) | [System.Windows.Automation.TogglePatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TogglePatternIdentifiers) |
| Capabilities of an element that can be moved, rotated, or resized | [System.Windows.Automation.TransformPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPattern) | [System.Windows.Automation.TransformPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPatternIdentifiers) |
| Value and read/write capabilities of an element that has a value | [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern) | [System.Windows.Automation.ValuePatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePatternIdentifiers) |
| Capabilities and state of a window | [System.Windows.Automation.WindowPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPattern) | [System.Windows.Automation.WindowPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPatternIdentifiers) |

<a name="Properties_by_Category"></a>

## Properties by Category

 The following tables categorize the properties whose IDs are found in [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) and [System.Windows.Automation.AutomationElementIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers). These properties are common to all controls. All but a few of them are likely to be static over the lifetime of the provider application; most dynamic properties are associated with control patterns.

 The **Property Access** column lists any other accessors for each property, in addition to [System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*) and [System.Windows.Automation.AutomationElement.GetCachedPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPropertyValue*). For more information on getting properties in a client application, see [UI Automation Properties for Clients](ui-automation-properties-for-clients.md).

> **Note:**
> For specific information about each property, follow the link in the **Property Access** column.

### Display Characteristics

| Property identifier | Property access |
| --- | --- |
| [System.Windows.Automation.AutomationElement.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.BoundingRectangleProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.BoundingRectangle*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.BoundingRectangle*) |
| [System.Windows.Automation.AutomationElement.CultureProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.CultureProperty) | n/a |
| [System.Windows.Automation.AutomationElement.HelpTextProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.HelpTextProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.HelpText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.HelpText*) |
| [System.Windows.Automation.AutomationElement.IsOffscreenProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsOffscreenProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsOffscreen](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsOffscreen) |
| [System.Windows.Automation.AutomationElement.OrientationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.OrientationProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.Orientation*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.Orientation*) |

### Element Type

| Property identifier | Property access |
| --- | --- |
| [System.Windows.Automation.AutomationElement.ControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ControlTypeProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.ControlType*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.ControlType*) |
| [System.Windows.Automation.AutomationElement.IsContentElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsContentElementProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsContentElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsContentElement) |
| [System.Windows.Automation.AutomationElement.IsControlElementProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsControlElementProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsControlElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsControlElement) |
| [System.Windows.Automation.AutomationElement.ItemTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ItemTypeProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.ItemType*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.ItemType*) |
| [System.Windows.Automation.AutomationElement.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.LocalizedControlTypeProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.LocalizedControlType*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.LocalizedControlType*) |

### Identification

| Property identifier | Property access |
| --- | --- |
| [System.Windows.Automation.AutomationElement.AutomationIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationIdProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.AutomationId*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.AutomationId*) |
| [System.Windows.Automation.AutomationElement.ClassNameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ClassNameProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.ClassName*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.ClassName*) |
| [System.Windows.Automation.AutomationElement.FrameworkIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FrameworkIdProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.FrameworkId*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.FrameworkId*) |
| [System.Windows.Automation.AutomationElement.LabeledByProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.LabeledByProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.LabeledBy*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.LabeledBy*) |
| [System.Windows.Automation.AutomationElement.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.NameProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.Name*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.Name*) |
| [System.Windows.Automation.AutomationElement.ProcessIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ProcessIdProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.ProcessId](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.ProcessId) |
| [System.Windows.Automation.AutomationElement.RuntimeIdProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.RuntimeIdProperty) | [System.Windows.Automation.AutomationElement.GetRuntimeId*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetRuntimeId*) |
| [System.Windows.Automation.AutomationElement.NativeWindowHandleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.NativeWindowHandleProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.NativeWindowHandle*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.NativeWindowHandle*) |

### Interaction

| Property identifier | Property access |
| --- | --- |
| [System.Windows.Automation.AutomationElement.AcceleratorKeyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AcceleratorKeyProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.AcceleratorKey*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.AcceleratorKey*) |
| [System.Windows.Automation.AutomationElement.AccessKeyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AccessKeyProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.AccessKey*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.AccessKey*) |
| [System.Windows.Automation.AutomationElement.ClickablePointProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ClickablePointProperty) | [System.Windows.Automation.AutomationElement.GetClickablePoint*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetClickablePoint*) |
| [System.Windows.Automation.AutomationElement.HasKeyboardFocusProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.HasKeyboardFocusProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.HasKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.HasKeyboardFocus) |
| [System.Windows.Automation.AutomationElement.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsEnabledProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsEnabled](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsEnabled) |
| [System.Windows.Automation.AutomationElement.IsKeyboardFocusableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsKeyboardFocusableProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsKeyboardFocusable](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsKeyboardFocusable) |

### Support for Patterns

| Property identifier | Property access |
| --- | --- |
| [System.Windows.Automation.AutomationElement.IsDockPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsDockPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsExpandCollapsePatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsExpandCollapsePatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsGridItemPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsGridItemPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsGridPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsGridPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsInvokePatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsInvokePatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsMultipleViewPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsMultipleViewPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsRangeValuePatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsRangeValuePatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsScrollItemPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsScrollItemPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsScrollPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsScrollPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsSelectionItemPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsSelectionItemPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsSelectionPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsSelectionPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsTableItemPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsTableItemPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsTablePatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsTablePatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsTextPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsTextPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsTogglePatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsTogglePatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsTransformPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsTransformPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsValuePatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsValuePatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |
| [System.Windows.Automation.AutomationElement.IsWindowPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsWindowPatternAvailableProperty) | [System.Windows.Automation.AutomationElement.GetSupportedPatterns*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedPatterns*) |

### Miscellaneous

| Property identifier | Property access |
| --- | --- |
| [System.Windows.Automation.AutomationElement.IsRequiredForFormProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsRequiredForFormProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsRequiredForForm](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsRequiredForForm) |
| [System.Windows.Automation.AutomationElement.IsPasswordProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsPasswordProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsPassword](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsPassword) |
| [System.Windows.Automation.AutomationElement.ItemStatusProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.ItemStatusProperty) | [System.Windows.Automation.AutomationElement.AutomationElementInformation.ItemStatus*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.ItemStatus*) |

<a name="Localization"></a>

## Localization

 UI Automation providers should present the following properties in the language of the operating system:

- [System.Windows.Automation.AutomationElementIdentifiers.AcceleratorKeyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AcceleratorKeyProperty)

- [System.Windows.Automation.AutomationElementIdentifiers.AccessKeyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.AccessKeyProperty)

- [System.Windows.Automation.AutomationElementIdentifiers.HelpTextProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.HelpTextProperty)

- [System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LocalizedControlTypeProperty)

- [System.Windows.Automation.AutomationElementIdentifiers.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.NameProperty)

<a name="Properties_and_Events"></a>

## Properties and Events

 Closely tied in with the properties in UI Automation is the concept of property-changed events. For dynamic properties, the client application needs a way to know that a property value has changed, so that it can update its cache of information or react to the new information in some other way.

 Providers raise events when something in the UI changes. For example, if a check box is selected or cleared, a property-changed event is raised by the provider's implementation of the Toggle pattern. Providers can raise events selectively, depending on whether any clients are listening for events, or listening for specific events.

 Not all property changes raise events; that is entirely up to the implementation of the UI Automation provider for the element. For example, the standard proxy providers for list boxes do not raise an event when the [System.Windows.Automation.SelectionPattern.SelectionProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern.SelectionProperty) changes. In this case, the application instead must listen for an [System.Windows.Automation.SelectionItemPattern.ElementSelectedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionItemPattern.ElementSelectedEvent).

 Clients listen for events by subscribing to them. Subscribing to events means creating delegate methods that can handle the events, and then passing the methods to UI Automation along with the specific events that will be dealt with in those methods. For property-changed events in particular, clients must implement [System.Windows.Automation.AutomationPropertyChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationPropertyChangedEventHandler).

## See also

- [Caching in UI Automation Clients](caching-in-ui-automation-clients.md)
- [UI Automation Properties for Clients](ui-automation-properties-for-clients.md)
- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)
- [Find a UI Automation Element Based on a Property Condition](find-a-ui-automation-element-based-on-a-property-condition.md)
- [Return Properties from a UI Automation Provider](return-properties-from-a-ui-automation-provider.md)
- [Raise Events from a UI Automation Provider](raise-events-from-a-ui-automation-provider.md)
