---
title: "Breaking change: Some APIs throw ArgumentNullException"
description: Learn about the breaking change in .NET 6 where some APIs validate arguments and now throw an ArgumentNullException.
ms.date: 11/04/2021
---
# Some APIs throw ArgumentNullException

Some APIs now validate input parameters and throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) where previously they threw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), if invoked with `null` input arguments.

## Change description

In previous .NET versions, the affected APIs throw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) if invoked with an argument that's `null`.

Starting in .NET 6, the affected APIs throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) if invoked with an argument that's `null`.

## Change category

This change affects [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

Throwing [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) conforms to .NET Runtime behavior. It provides a better debug experience by clearly communicating which argument caused the exception.

## Version introduced

.NET 6

## Recommended action

- Review and, if necessary, update your code to prevent passing `null` input arguments to the affected APIs.
- If your code handles [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), replace or add an additional handler for [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException).

## Affected APIs

The following table lists the affected APIs and specific parameters:

| Method/property | Parameter name |
| --- | --- |
| [System.Windows.Forms.TreeNodeCollection.Item(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeNodeCollection.Item(System.Int32)) | `index` |
| [System.Windows.Forms.DrawTreeNodeEventArgs.%23ctor(System.Drawing.Graphics,System.Windows.Forms.TreeNode,System.Drawing.Rectangle,System.Windows.Forms.TreeNodeStates)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DrawTreeNodeEventArgs.%2523ctor(System.Drawing.Graphics%2CSystem.Windows.Forms.TreeNode%2CSystem.Drawing.Rectangle%2CSystem.Windows.Forms.TreeNodeStates)) | `graphics` |
| [System.Windows.Forms.DataGridViewRowStateChangedEventArgs.%23ctor(System.Windows.Forms.DataGridViewRow,System.Windows.Forms.DataGridViewElementStates)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewRowStateChangedEventArgs.%2523ctor(System.Windows.Forms.DataGridViewRow%2CSystem.Windows.Forms.DataGridViewElementStates)) | `dataGridViewRow` |
| [System.Windows.Forms.DataGridViewColumnStateChangedEventArgs.%23ctor(System.Windows.Forms.DataGridViewColumn,System.Windows.Forms.DataGridViewElementStates)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewColumnStateChangedEventArgs.%2523ctor(System.Windows.Forms.DataGridViewColumn%2CSystem.Windows.Forms.DataGridViewElementStates)) | `dataGridViewColumn` |

## See also

- [TreeNodeCollection.Item throws exception if node is assigned elsewhere](treenodecollection-item-throws-argumentexception.md)
