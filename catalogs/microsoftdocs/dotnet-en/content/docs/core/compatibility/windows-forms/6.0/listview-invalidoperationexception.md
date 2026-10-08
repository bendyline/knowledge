---
title: "Breaking change: ListViewGroupCollection methods throw new InvalidOperationException"
description: Learn about the breaking change in .NET 6 where some ListViewGroupCollection methods throw a new InvalidOperationException if the ListView is in virtual mode.
ms.date: 09/23/2021
---
# ListViewGroupCollection methods throw new InvalidOperationException

Previously, an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) was thrown if [System.Windows.Forms.ListViewGroupCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroupCollection) methods were invoked on a [System.Windows.Forms.ListView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView) in virtual mode *and* the [System.Windows.Forms.Control.Handle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Handle) had already been created. Starting in .NET 6, these [System.Windows.Forms.ListViewGroupCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroupCollection) methods now only check if the [System.Windows.Forms.ListView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView) is in virtual mode. If it is, they throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) with a more descriptive message.

## Previous behavior

Consider the following code that adds a [System.Windows.Forms.ListViewGroup](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroup) to a [System.Windows.Forms.ListView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView):

```csharp
ListViewGroup group1 = new ListViewGroup
{
    Header = "CollapsibleGroup1",
    CollapsedState = ListViewGroupCollapsedState.Expanded
};

listView.Groups.Add(group1);
```

This code produced an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) with the following message:

**When the ListView is in virtual mode, you cannot enumerate through the ListView items collection using an enumerator or call GetEnumerator. Use the ListView items indexer instead and access an item by index value.**

## New behavior

The same code from the [Previous behavior](#previous-behavior) section produces an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) with the following message:

**You cannot add groups to the ListView groups collection when the ListView is in virtual mode.**

## Change category

This change affects [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

The new [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) message is more understandable. In addition, it closes a workaround where the developer could add a [System.Windows.Forms.ListViewGroup](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroup) to the [System.Windows.Forms.ListView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView) before the [System.Windows.Forms.Control.Handle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Handle) was created.

## Version introduced

.NET 6 RC 2

## Recommended action

- Review and, if necessary, update your code so that it doesn't add a [System.Windows.Forms.ListViewGroup](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroup) to a [System.Windows.Forms.ListView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView) in virtual mode.
- If your code handles [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exceptions, you may need to update the message to reflect that the [System.Windows.Forms.ListView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView) is in virtual mode.

## Affected APIs

- [System.Windows.Forms.ListViewGroupCollection.Add*](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroupCollection.Add*)
- [System.Windows.Forms.ListViewGroupCollection.AddRange*](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroupCollection.AddRange*)
- [System.Windows.Forms.ListViewGroupCollection.Insert(System.Int32,System.Windows.Forms.ListViewGroup)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroupCollection.Insert(System.Int32%2CSystem.Windows.Forms.ListViewGroup))
