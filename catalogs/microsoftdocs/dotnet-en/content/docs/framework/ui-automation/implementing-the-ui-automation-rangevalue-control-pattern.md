---
title: "Implementing the UI Automation RangeValue Control Pattern"
description: Review guidelines and conventions for implementing the RangeValue control pattern in UI Automation. See required members for the IRangeValueProvider interface.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "control patterns, Range Value"
  - "Range Value control pattern"
  - "UI Automation, Range Value control pattern"
ms.assetid: 225feaa4-918e-418b-938e-7389338d0a69
---
# Implementing the UI Automation RangeValue Control Pattern

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic introduces guidelines and conventions for implementing [System.Windows.Automation.Provider.IRangeValueProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRangeValueProvider), including information about events and properties. Links to additional references are listed at the end of the topic.

 The [System.Windows.Automation.RangeValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern) control pattern is used to support controls that can be set to a value within a range. For examples of controls that implement this control pattern, see [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md).

<a name="Implementation_Guidelines_and_Conventions"></a>

## Implementation Guidelines and Conventions

 When implementing the Range Value control pattern, note the following guidelines and conventions:

- Controls allow recalibration of their supported properties based upon locale or user preference. An example of this is a thermometer control that can be set to display the temperature in Fahrenheit or Celsius.

- Controls that have ambiguous range values, such as progress bars or sliders, should have those values normalized.

 Progress bar.
Example of a Progress Bar Where Value Is of Type Integer and Minimum and Maximum Property Values Are Normalized to 0 and 100, Respectively

<a name="Required_Members_for_the_IRangeValueProvider"></a>

## Required Members for IRangeValueProvider

| Required member | Member type | Notes |
| --- | --- | --- |
| [System.Windows.Automation.RangeValuePattern.IsReadOnlyProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.IsReadOnlyProperty) | Property | None |
| [System.Windows.Automation.RangeValuePattern.ValueProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.ValueProperty) | Property | None |
| [System.Windows.Automation.RangeValuePattern.LargeChangeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.LargeChangeProperty) | Property | None |
| [System.Windows.Automation.RangeValuePattern.SmallChangeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.SmallChangeProperty) | Property | None |
| [System.Windows.Automation.RangeValuePattern.MaximumProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.MaximumProperty) | Property | None |
| [System.Windows.Automation.RangeValuePattern.MinimumProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.MinimumProperty) | Property | None |
| [System.Windows.Automation.RangeValuePattern.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.SetValue*) | Methods | None |

 This control pattern has no associated events.

<a name="Exceptions"></a>

## Exceptions

 Providers must throw the following exceptions.

| Exception type | Condition |
| --- | --- |
| [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException) | [System.Windows.Automation.RangeValuePattern.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.SetValue*) is called with a value that is either greater than [System.Windows.Automation.RangeValuePattern.MaximumProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.MaximumProperty) or less than [System.Windows.Automation.RangeValuePattern.MinimumProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.RangeValuePattern.MinimumProperty). |

## See also

- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [Support Control Patterns in a UI Automation Provider](support-control-patterns-in-a-ui-automation-provider.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
