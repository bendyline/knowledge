---
title: ".NET 6 breaking change: DataGridView-related APIs throw InvalidOperationException"
description: Learn about the breaking change in .NET 6 where some APIs related to DataGridView throw an exception if the object's DataGridViewCellAccessibleObject.Owner value is null.
ms.date: 03/29/2021
---
# DataGridView-related APIs now throw InvalidOperationException

Some APIs related to [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) now throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) if the object's [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) value is `null`.

## Change description

In previous .NET versions, the affected APIs throw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) when they are invoked and the [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) property value is `null`. Starting in .NET 6, these APIs throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) instead of a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) if the [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) property value is `null` when they're invoked.

## Change category

This change affects [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

Throwing an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) conforms to the behavior of the .NET runtime. It also improves the debugging experience by clearly communicating the invalid property.

## Version introduced

.NET 6

## Recommended action

Review your code and, if necessary, update it to prevent constructing the affected types with the [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) property as `null`.

## Affected APIs

The following table lists the affected properties and methods:

- [System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Bounds](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Bounds)
- [System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.DefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.DefaultAction)
- [System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Name](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Name)
- [System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Navigate(System.Windows.Forms.AccessibleNavigation)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Navigate(System.Windows.Forms.AccessibleNavigation))
- [System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.State](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.State)

## See also

- [DataGridView-related APIs throw InvalidOperationException (.NET 5)](../5.0/null-owner-causes-invalidoperationexception.md)
