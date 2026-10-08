---
title: ".NET 5 breaking change: DataGridView-related APIs throw InvalidOperationException"
description: Learn about the breaking change in .NET 5 where some APIs related to DataGridView throw an exception if the object's DataGridViewCellAccessibleObject.Owner value is null.
ms.date: 09/18/2020
---
# DataGridView-related APIs throw InvalidOperationException

Some APIs related to [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) now throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) if the object's [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) value is `null`.

## Change description

In previous .NET versions, the affected APIs throw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) when they are invoked and the [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) property value is `null`. Starting in .NET 5, these APIs throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) instead of a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) if the [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) property value is `null` when they're invoked.

## Reason for change

Throwing an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) conforms to the behavior of the .NET runtime. It also improves the debugging experience by clearly communicating the invalid property.

## Version introduced

.NET 5.0

## Recommended action

Review your code and, if necessary, update it to prevent constructing the affected types with the [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) property as `null`.

## Affected APIs

The following table lists the affected APIs:

> 
>
> | Affected method or property | Validated property | Version added |
> | --- | --- | --- |
> | [System.Windows.Forms.DataGridViewButtonCell.DataGridViewButtonCellAccessibleObject.DoDefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewButtonCell.DataGridViewButtonCellAccessibleObject.DoDefaultAction) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.DefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.DefaultAction) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.State](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.State) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.DoDefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.DoDefaultAction) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Bounds](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Bounds) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.DefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.DefaultAction) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Name](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Name) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Parent](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Parent) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.DoDefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.DoDefaultAction) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Navigate(System.Windows.Forms.AccessibleNavigation)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Navigate(System.Windows.Forms.AccessibleNavigation)) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewImageCell.DataGridViewImageCellAccessibleObject.DoDefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewImageCell.DataGridViewImageCellAccessibleObject.DoDefaultAction) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |
> | [System.Windows.Forms.DataGridViewLinkCell.DataGridViewLinkCellAccessibleObject.DoDefaultAction](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewLinkCell.DataGridViewLinkCellAccessibleObject.DoDefaultAction) | [System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner) | 5.0 |

## See also

- [DataGridView-related APIs throw InvalidOperationException (.NET 6)](../6.0/null-owner-causes-invalidoperationexception.md)

<!--

### Affected APIs

- `M:System.Windows.Forms.DataGridViewButtonCell.DataGridViewButtonCellAccessibleObject.DoDefaultAction`
- `P:System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.DefaultAction`
- `P:System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.State`
- `M:System.Windows.Forms.DataGridViewCheckBoxCell.DataGridViewCheckBoxCellAccessibleObject.DoDefaultAction`
- `P:System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Bounds`
- `P:System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.DefaultAction`
- `P:System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Name`
- `P:System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Parent`
- `M:System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.DoDefaultAction`
- `M:System.Windows.Forms.DataGridViewColumnHeaderCell.DataGridViewColumnHeaderCellAccessibleObject.Navigate(System.Windows.Forms.AccessibleNavigation)`
- `M:System.Windows.Forms.DataGridViewImageCell.DataGridViewImageCellAccessibleObject.DoDefaultAction`
- `M:System.Windows.Forms.DataGridViewLinkCell.DataGridViewLinkCellAccessibleObject.DoDefaultAction`

### Category

Windows Forms

-->
