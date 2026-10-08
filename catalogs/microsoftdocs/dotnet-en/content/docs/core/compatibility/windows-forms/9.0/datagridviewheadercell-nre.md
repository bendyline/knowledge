---
title: "Breaking change: No exception if DataGridView is null"
description: Learn about the breaking change in .NET 9 for Windows Forms where DataGridViewHeaderCell methods no longer throw an exception if the DataGridView property is null.
ms.date: 01/16/2024
---
# No exception if DataGridView is null

Previously, a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) was thrown in [System.Windows.Forms.DataGridViewHeaderCell.MouseDownUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseDownUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)), [System.Windows.Forms.DataGridViewHeaderCell.MouseEnterUnsharesRow(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseEnterUnsharesRow(System.Int32)), [System.Windows.Forms.DataGridViewHeaderCell.MouseLeaveUnsharesRow(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseLeaveUnsharesRow(System.Int32)), and [System.Windows.Forms.DataGridViewHeaderCell.MouseUpUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseUpUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)) if the [System.Windows.Forms.DataGridViewElement.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewElement.DataGridView) property was null. That behavior was unexpected and incorrect. These methods have been updated to simply return `false` if `DataGridView` is `null`.

## Version introduced

.NET 9 Preview 1

## Previous behavior

Previously, the [affected methods](#affected-apis) threw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) when `DataGridViewHeaderCell.DataGridView` was `null`.

## New behavior

Starting in .NET 9, the [affected methods](#affected-apis) return `false` if the `DataGridViewHeaderCell.DataGridView` property is `null`

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change).

## Reason for change

The previous behavior was incorrect.

## Recommended action

If you were relying on the code to throw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) in this scenario, change your code to check the return value instead.

## Affected APIs

- [System.Windows.Forms.DataGridViewHeaderCell.MouseDownUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseDownUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs))
- [System.Windows.Forms.DataGridViewHeaderCell.MouseEnterUnsharesRow(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseEnterUnsharesRow(System.Int32))
- [System.Windows.Forms.DataGridViewHeaderCell.MouseLeaveUnsharesRow(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseLeaveUnsharesRow(System.Int32))
- [System.Windows.Forms.DataGridViewHeaderCell.MouseUpUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewHeaderCell.MouseUpUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs))
