---
title: "Implementing the UI Automation Transform Control Pattern"
description: Review guidelines and conventions to implement the Transform control pattern in UI Automation. Know required members for the ITransformProvider interface.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "control patterns, Transform"
  - "Transform control pattern"
  - "UI Automation, Transform control pattern"
ms.assetid: 5f49d843-5845-4800-9d9c-56ce0d146844
---
# Implementing the UI Automation Transform Control Pattern

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic introduces guidelines and conventions for implementing [System.Windows.Automation.Provider.ITransformProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider), including information about properties, methods, and events. Links to additional references are listed at the end of the topic.

 The [System.Windows.Automation.TransformPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPattern) control pattern is used to support controls that can be moved, resized, or rotated within a two-dimensional space. For examples of controls that implement this control pattern, see [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md).

<a name="Implementation_Guidelines_and_Conventions"></a>

## Implementation Guidelines and Conventions

 When implementing the Transform control pattern, note the following guidelines and conventions:

- Support for this control pattern is not limited to objects on the desktop. This control pattern must also be supported by the children of a container object if the children can be moved, resized, or rotated freely within the boundaries of the container.

- An object cannot be moved, resized, or rotated such that its resulting screen location would be completely outside the coordinates of its container and therefore inaccessible to the keyboard or mouse (for example, when a top-level window is moved off-screen or a child object is moved outside the boundaries of the container's viewport). In these cases, the object is placed as close to the requested screen coordinates as possible with the top or left coordinates overridden to be within the container boundaries.

- For multi-monitor systems, if an object is moved, resized, or rotated completely outside the combined desktop screen coordinates, the object is placed on the primary monitor as close to the requested coordinates as possible.

- All parameters and property values are absolute and independent of locale.

<a name="Required_Members_for_the_IValueProvider_Interface"></a>

## Required Members for ITransformProvider

 The following properties and methods are required for implementing [System.Windows.Automation.Provider.ITransformProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider).

| Required members | Member type | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.ITransformProvider.CanMove](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.CanMove) | Property | None |
| [System.Windows.Automation.Provider.ITransformProvider.CanResize](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.CanResize) | Property | None |
| [System.Windows.Automation.Provider.ITransformProvider.CanRotate](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.CanRotate) | Property | None |
| [System.Windows.Automation.Provider.ITransformProvider.Move*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.Move*) | Method | None |
| [System.Windows.Automation.Provider.ITransformProvider.Resize*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.Resize*) | Method | None |
| [System.Windows.Automation.Provider.ITransformProvider.Rotate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.Rotate*) | Method | None |

 This control pattern has no associated events.

<a name="Exceptions"></a>

## Exceptions

 Providers must throw the following exceptions.

| Exception Type | Condition |
| --- | --- |
| [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) | [System.Windows.Automation.Provider.ITransformProvider.Move*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.Move*)<br /><br /> -   If the [System.Windows.Automation.TransformPatternIdentifiers.CanMoveProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPatternIdentifiers.CanMoveProperty) is false. |
| [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) | [System.Windows.Automation.Provider.ITransformProvider.Resize*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.Resize*)<br /><br /> -   If the [System.Windows.Automation.TransformPatternIdentifiers.CanResizeProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPatternIdentifiers.CanResizeProperty) is false. |
| [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) | [System.Windows.Automation.Provider.ITransformProvider.Rotate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITransformProvider.Rotate*)<br /><br /> -   If the [System.Windows.Automation.TransformPatternIdentifiers.CanRotateProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPatternIdentifiers.CanRotateProperty) is false. |

## See also

- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [Support Control Patterns in a UI Automation Provider](support-control-patterns-in-a-ui-automation-provider.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
