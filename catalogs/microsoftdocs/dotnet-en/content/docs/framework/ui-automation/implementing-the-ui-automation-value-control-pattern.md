---
title: "Implementing the UI Automation Value Control Pattern"
description: Review guidelines and conventions to implement the Value control pattern in UI Automation. Know required members for the IValueProvider interface.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "control patterns, Value"
  - "UI Automation, Value control pattern"
  - "Value control pattern"
---
# Implementing the UI Automation Value Control Pattern

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic introduces guidelines and conventions for implementing [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider), including information on events and properties. Links to additional references are listed at the end of the topic.

 The [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern) control pattern is used to support controls that have an intrinsic value not spanning a range and that can be represented as a string. This string can be editable, depending on the control and its settings. For examples of controls that implement this pattern, see [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md).

<a name="Implementation_Guidelines_and_Conventions"></a>

## Implementation Guidelines and Conventions

 When implementing the Value control pattern, note the following guidelines and conventions:

- Controls such as [System.Windows.Automation.ControlType.ListItem](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.ListItem) and [System.Windows.Automation.ControlType.TreeItem](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.TreeItem) must support [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern) if the value of any of the items is editable, regardless of the current edit mode of the control. The parent control must also support [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern) if the child items are editable.

 Editable list item.
Example of an Editable List Item

- Single-line edit controls support programmatic access to their contents by implementing [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider). However, multi-line edit controls do not implement [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider); instead they provide access to their content by implementing [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider).

- To retrieve the textual contents of a multi-line edit control, the control must implement [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider). However, [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider) does not support setting the value of a control.

- [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider) does not support the retrieval of formatting information or substring values. Implement [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider) in these scenarios.

- [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider) must be implemented by controls such as the **Color Picker** selection control from Microsoft Word (illustrated below), which supports string mapping between a color value (for example, "yellow") and an equivalent internal RGB structure.

 Color picker with yellow highlighted.
Example of Color Swatch String Mapping

- A control should have its [System.Windows.Automation.AutomationElement.IsEnabledProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsEnabledProperty) set to `true` and its [System.Windows.Automation.ValuePattern.IsReadOnlyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.IsReadOnlyProperty) set to `false` before allowing a call to [System.Windows.Automation.Provider.IValueProvider.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider.SetValue*).

<a name="Required_Members_for_the_IValueProvider_Interface"></a>

## Required Members for IValueProvider

 The following properties and methods are required for implementing [System.Windows.Automation.Provider.IValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IValueProvider).

| Required members | Member type | Notes |
| --- | --- | --- |
| [System.Windows.Automation.ValuePattern.IsReadOnlyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.IsReadOnlyProperty) | Property | None |
| [System.Windows.Automation.ValuePattern.ValueProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.ValueProperty) | Property | None |
| [System.Windows.Automation.ValuePattern.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.SetValue*) | Method | None |

<a name="Exceptions"></a>

## Exceptions

 Providers must throw the following exceptions.

| Exception type | Condition |
| --- | --- |
| [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) | [System.Windows.Automation.ValuePattern.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.SetValue*)<br /><br /> -   If locale-specific information is passed to a control in an incorrect format such as an incorrectly formatted date. |
| [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) | [System.Windows.Automation.ValuePattern.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.SetValue*)<br /><br /> -   If a new value cannot be converted from a string to a format the control recognizes. |
| [System.Windows.Automation.ElementNotEnabledException](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ElementNotEnabledException) | [System.Windows.Automation.ValuePattern.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.SetValue*)<br /><br /> -   When an attempt is made to manipulate a control that is not enabled. |

## See also

- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [Support Control Patterns in a UI Automation Provider](support-control-patterns-in-a-ui-automation-provider.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [ValuePattern Insert Text Sample](https://github.com/Microsoft/WPF-Samples/tree/main/Accessibility/InsertText)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
