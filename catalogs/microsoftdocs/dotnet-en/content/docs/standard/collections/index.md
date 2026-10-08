---
title: "Collections and Data Structures"
description: Learn how to use collections and data structures in .NET. Use generic and non-generic collections in thread-safe operations.
ms.date: 10/20/2025
ms.custom: devdivchpfy22
helpviewer_keywords:
  - "grouping data in collections"
  - "objects [.NET], grouping in collections"
  - "Array class, grouping data in collections"
  - "threading [.NET], safety"
  - "Collections classes"
  - "collections [.NET]"
ms.assetid: 60cc581f-1db5-445b-ba04-a173396bf872
---

# Collections and Data Structures

Similar data can often be handled more efficiently when stored and manipulated as a collection. You can use the [System.Array](https://learn.microsoft.com/search/?terms=System.Array) class or the classes in the [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections), [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic), [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent), and [System.Collections.Immutable](https://learn.microsoft.com/search/?terms=System.Collections.Immutable) namespaces to add, remove, and modify either individual elements or a range of elements in a collection.

There are two main types of collections; generic collections and non-generic collections. Generic collections are type-safe at compile time. Because of this, generic collections typically offer better performance. Generic collections accept a type parameter when they're constructed. They don't require that you cast to and from the [System.Object](https://learn.microsoft.com/search/?terms=System.Object) type when you add or remove items from the collection. In addition, most generic collections are supported in Windows Store apps. Non-generic collections store items as [System.Object](https://learn.microsoft.com/search/?terms=System.Object), require casting, and most aren't supported for Windows Store app development. However, you might see non-generic collections in older code.

In .NET Framework 4 and later versions, the collections in the [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace provide efficient thread-safe operations for accessing collection items from multiple threads. The immutable collection classes in the [System.Collections.Immutable](https://learn.microsoft.com/search/?terms=System.Collections.Immutable) namespace ([NuGet package](https://www.nuget.org/packages/System.Collections.Immutable)) are inherently thread-safe because operations are performed on a copy of the original collection, and the original collection can't be modified.

<a name="BKMK_Commoncollectionfeatures"></a>

## Common collection features

All collections provide methods for adding, removing, or finding items in the collection. In addition, all collections that directly or indirectly implement the [System.Collections.ICollection](https://learn.microsoft.com/search/?terms=System.Collections.ICollection) interface or the [System.Collections.Generic.ICollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601) interface share these features:

- **The ability to enumerate the collection**

    .NET collections either implement [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) or [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) to enable the collection to be iterated through. An enumerator can be thought of as a movable pointer to any element in the collection. The [foreach, in](../../csharp/language-reference/statements/iteration-statements.md#the-foreach-statement) statement and the [For Each...Next Statement](../../visual-basic/language-reference/statements/for-each-next-statement.md) use the enumerator exposed by the [System.Collections.IEnumerable.GetEnumerator*](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable.GetEnumerator*) method and hide the complexity of manipulating the enumerator. In addition, any collection that implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) is considered a *queryable type* and can be queried with LINQ. LINQ queries provide a common pattern for accessing data. They're typically more concise and readable than standard `foreach` loops and provide filtering, ordering, and grouping capabilities. LINQ queries can also improve performance. For more information, see [LINQ to Objects (C#)](../../csharp/linq/get-started/introduction-to-linq-queries.md), [LINQ to Objects (Visual Basic)](../../visual-basic/programming-guide/concepts/linq/linq-to-objects.md), [Parallel LINQ (PLINQ)](../parallel-programming/introduction-to-plinq.md), [Introduction to LINQ Queries (C#)](../../csharp/linq/get-started/introduction-to-linq-queries.md), and [Basic Query Operations (Visual Basic)](../../visual-basic/programming-guide/concepts/linq/basic-query-operations.md).

- **The ability to copy the collection contents to an array**

    All collections can be copied to an array using the `CopyTo` method. However, the order of the elements in the new array is based on the sequence in which the enumerator returns them. The resulting array is always one-dimensional with a lower bound of zero.

In addition, many collection classes contain the following features:

- **Capacity and Count properties**

    The capacity of a collection is the number of elements it can contain. The count of a collection is the number of elements it actually contains. Some collections hide the capacity or the count or both.

    Most collections automatically expand in capacity when the current capacity is reached. The memory is reallocated, and the elements are copied from the old collection to the new one. This design reduces the code required to use the collection. However, the performance of the collection might be negatively affected. For example, for [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601), if [System.Collections.Generic.List`1.Count*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Count*) is less than [System.Collections.Generic.List`1.Capacity*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Capacity*), adding an item is an O(1) operation. If the capacity needs to be increased to accommodate the new element, adding an item becomes an O(`n`) operation, where `n` is [System.Collections.Generic.List`1.Count*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Count*). The best way to avoid poor performance caused by multiple reallocations is to set the initial capacity to be the estimated size of the collection.

    A [System.Collections.BitArray](https://learn.microsoft.com/search/?terms=System.Collections.BitArray) is a special case; its capacity is the same as its length, which is the same as its count.

- **A consistent lower bound**

    The lower bound of a collection is the index of its first element. All indexed collections in the [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) namespaces have a lower bound of zero, meaning they're 0-indexed. [System.Array](https://learn.microsoft.com/search/?terms=System.Array) has a lower bound of zero by default, but a different lower bound can be defined when creating an instance of the **Array** class using [System.Array.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Array.CreateInstance*).

- **Synchronization for access from multiple threads** ([System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) classes only).

    Non-generic collection types in the [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) namespace provide some thread safety with synchronization; typically exposed through the [System.Collections.ICollection.SyncRoot*](https://learn.microsoft.com/search/?terms=System.Collections.ICollection.SyncRoot*) and  [System.Collections.ICollection.IsSynchronized](https://learn.microsoft.com/search/?terms=System.Collections.ICollection.IsSynchronized) members. These collections aren't thread-safe by default. If you require scalable and efficient multi-threaded access to a collection, use one of the classes in the [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace or consider using an immutable collection. For more information, see [Thread-Safe Collections](thread-safe/index.md).

<a name="BKMK_Choosingacollection"></a>

## Choose a collection

In general, you should use generic collections. The following table describes some common collection scenarios and the collection classes you can use for those scenarios. If you're new to generic collections, the following table will help you choose the generic collection that works best for your task:

| I want to… | Generic collection options | Non-generic collection options | Thread-safe or immutable collection options |
| --- | --- | --- | --- |
| Store items as key/value pairs for quick look-up by key | [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) | [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable)<br /><br /> (A collection of key/value pairs that are organized based on the hash code of the key.) | [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602)<br /><br /> [System.Collections.ObjectModel.ReadOnlyDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyDictionary%602)<br /><br /> [System.Collections.Immutable.ImmutableDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableDictionary%602) |
| Access items by index | [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) | [System.Array](https://learn.microsoft.com/search/?terms=System.Array)<br /><br /> [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) | [System.Collections.Immutable.ImmutableList`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableList%601)<br /><br /> [System.Collections.Immutable.ImmutableArray](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableArray) |
| Use items first-in-first-out (FIFO) | [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601) | [System.Collections.Queue](https://learn.microsoft.com/search/?terms=System.Collections.Queue) | [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601)<br /><br /> [System.Collections.Immutable.ImmutableQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableQueue%601) |
| Use data Last-In-First-Out (LIFO) | [System.Collections.Generic.Stack`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Stack%601) | [System.Collections.Stack](https://learn.microsoft.com/search/?terms=System.Collections.Stack) | [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601)<br /><br /> [System.Collections.Immutable.ImmutableStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableStack%601) |
| Access items sequentially | [System.Collections.Generic.LinkedList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedList%601) | No recommendation | No recommendation |
| Receive notifications when items are removed or added to the collection. (implements [System.ComponentModel.INotifyPropertyChanged](https://learn.microsoft.com/search/?terms=System.ComponentModel.INotifyPropertyChanged) and [System.Collections.Specialized.INotifyCollectionChanged](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.INotifyCollectionChanged)) | [System.Collections.ObjectModel.ObservableCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%601) | No recommendation | No recommendation |
| A sorted collection | [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) | [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) | [System.Collections.Immutable.ImmutableSortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedDictionary%602)<br /><br /> [System.Collections.Immutable.ImmutableSortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601) |
| A set for mathematical functions | [System.Collections.Generic.HashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.HashSet%601)<br /><br /> [System.Collections.Generic.SortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedSet%601) | No recommendation | [System.Collections.Immutable.ImmutableHashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableHashSet%601)<br /><br /> [System.Collections.Immutable.ImmutableSortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601) |

### Algorithmic complexity of collections

When choosing a [collection class](selecting-a-collection-class.md), it's worth considering potential tradeoffs in performance. Use the following table to reference how various mutable collection types compare in algorithmic complexity to their corresponding immutable counterparts. Often immutable collection types are less performant but provide immutability - which is often a valid comparative benefit.

| Mutable | Amortized | Worst Case | Immutable | Complexity |
| --- | --- | --- | --- | --- |
| `Stack<T>.Push` | O(1) | O(`n`) | `ImmutableStack<T>.Push` | O(1) |
| `Queue<T>.Enqueue` | O(1) | O(`n`) | `ImmutableQueue<T>.Enqueue` | O(1) |
| `List<T>.Add` | O(1) | O(`n`) | `ImmutableList<T>.Add` | O(log `n`) |
| `List<T>.Item[Int32]` | O(1) | O(1) | `ImmutableList<T>.Item[Int32]` | O(log `n`) |
| `List<T>.Enumerator` | O(`n`) | O(`n`) | `ImmutableList<T>.Enumerator` | O(`n`) |
| `HashSet<T>.Add`, lookup | O(1) | O(`n`) | `ImmutableHashSet<T>.Add` | O(log `n`) |
| `SortedSet<T>.Add` | O(log `n`) | O(`n`) | `ImmutableSortedSet<T>.Add` | O(log `n`) |
| `Dictionary<T>.Add` | O(1) | O(`n`) | `ImmutableDictionary<T>.Add` | O(log `n`) |
| `Dictionary<T>` lookup | O(1) | O(1) – or strictly O(`n`) | `ImmutableDictionary<T>` lookup | O(log `n`) |
| `SortedDictionary<T>.Add` | O(log `n`) | O(`n` log `n`) | `ImmutableSortedDictionary<T>.Add` | O(log `n`) |

A `List<T>` can be efficiently enumerated using either a `for` loop or a `foreach` loop. An `ImmutableList<T>`, however, does a poor job inside a `for` loop, due to the O(log `n`) time for its indexer. Enumerating an `ImmutableList<T>` using a `foreach` loop is efficient because `ImmutableList<T>` uses a binary tree to store its data instead of an array like `List<T>` uses. An array can be quickly indexed into, whereas a binary tree must be walked down until the node with the desired index is found.

Additionally, `SortedSet<T>` has the same complexity as `ImmutableSortedSet<T>` because they both use binary trees. The significant difference is that `ImmutableSortedSet<T>` uses an immutable binary tree. Since `ImmutableSortedSet<T>` also offers a [System.Collections.Immutable.ImmutableSortedSet`1.Builder](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601.Builder) class that allows mutation, you can have both immutability and performance.

<a name="BKMK_RelatedTopics"></a>

## Related articles

| Title | Description |
| --- | --- |
| [Selecting a Collection Class](selecting-a-collection-class.md) | Describes the different collections and helps you select one for your scenario. |
| [Commonly Used Collection Types](commonly-used-collection-types.md) | Describes commonly used generic and non-generic collection types such as [System.Array](https://learn.microsoft.com/search/?terms=System.Array), [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601), and [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602). |
| [When to Use Generic Collections](when-to-use-generic-collections.md) | Discusses the use of generic collection types. |
| [Comparisons and Sorts Within Collections](comparisons-and-sorts-within-collections.md) | Discusses the use of equality comparisons and sorting comparisons in collections. |
| [Sorted Collection Types](sorted-collection-types.md) | Describes sorted collections performance and characteristics. |
| [Hashtable and Dictionary Collection Types](hashtable-and-dictionary-collection-types.md) | Describes the features of generic and non-generic hash-based dictionary types. |
| [Thread-Safe Collections](thread-safe/index.md) | Describes collection types such as [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) and [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601) that support safe and efficient concurrent access from multiple threads. |
| [System.Collections.Immutable](https://learn.microsoft.com/search/?terms=System.Collections.Immutable) | Introduces the immutable collections and provides links to the collection types. |

<a name="BKMK_Reference"></a>

## Reference

- [System.Array](https://learn.microsoft.com/search/?terms=System.Array)
- [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections)
- [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent)
- [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic)
- [System.Collections.Specialized](https://learn.microsoft.com/search/?terms=System.Collections.Specialized)
- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [System.Collections.Immutable](https://learn.microsoft.com/search/?terms=System.Collections.Immutable)
