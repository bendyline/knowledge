---
title: "Breaking change: TreeNodeCollection.Item(Int32) throws ArgumentException for in-use node"
description: Learn about the breaking change in .NET 6 where TreeNodeCollection.Item(Int32) now throws an ArgumentException if the node being assigned is already assigned to a TreeView.
ms.date: 01/19/2021
---
# TreeNodeCollection.Item throws exception if node is assigned elsewhere

[System.Windows.Forms.TreeNodeCollection.Item(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeNodeCollection.Item(System.Int32)) throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) if the node being assigned is already bound to another [System.Windows.Forms.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeView) or to this [System.Windows.Forms.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeView) at a different index.

## Change description

In previous .NET versions, you can assign a tree node to a collection even if it's already bound to a [System.Windows.Forms.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeView). This can lead to duplicated nodes. Starting in .NET 6, [System.Windows.Forms.TreeNodeCollection.Item(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeNodeCollection.Item(System.Int32)) throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) if the node being assigned is already bound to another [System.Windows.Forms.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeView) or to this [System.Windows.Forms.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeView) at a different index.

## Change category

This change affects [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

Validating the input parameter is consistent with the behavior of other `TreeNodeCollection` APIs.

## Version introduced

.NET 6

## Recommended action

Make sure to unbind a `TreeNode` before assigning it to the collection.

## Affected APIs

[System.Windows.Forms.TreeNodeCollection.Item(System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeNodeCollection.Item(System.Int32))

<!--

### Affected APIs

- `P:System.Windows.Forms.TreeNodeCollection.Item(System.Int32)`

### Category

Windows Forms

-->
