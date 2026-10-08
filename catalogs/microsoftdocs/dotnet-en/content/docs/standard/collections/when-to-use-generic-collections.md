---
description: "Learn more about: When to use generic collections"
title: "When to Use Generic Collections"
ms.date: 04/30/2020
helpviewer_keywords:
  - "collections [.NET], generic"
  - "generic collections [.NET]"
ms.assetid: e7b868b1-11fe-4ac5-bed3-de68aca47739
---

# When to use generic collections

Using generic collections gives you the automatic benefit of type safety without having to derive from a base collection type and implement type-specific members. Generic collection types also generally perform better than the corresponding nongeneric collection types (and better than types that are derived from nongeneric base collection types) when the collection elements are value types, because with generics, there's no need to box the elements.

For programs that target .NET Standard 1.0 or later, use the generic collection classes in the [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace when multiple threads might be adding or removing items from the collection concurrently. Additionally, when immutability is desired, consider the generic collection classes in the [System.Collections.Immutable](https://learn.microsoft.com/search/?terms=System.Collections.Immutable) namespace.

The following generic types correspond to existing collection types:

- [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) is the generic class that corresponds to [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList).

- [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) and [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) are the generic classes that correspond to [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable).

- [System.Collections.ObjectModel.Collection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%601) is the generic class that corresponds to [System.Collections.CollectionBase](https://learn.microsoft.com/search/?terms=System.Collections.CollectionBase). [System.Collections.ObjectModel.Collection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%601) can be used as a base class, but unlike [System.Collections.CollectionBase](https://learn.microsoft.com/search/?terms=System.Collections.CollectionBase), it is not abstract, which makes it much easier to use.

- [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) is the generic class that corresponds to [System.Collections.ReadOnlyCollectionBase](https://learn.microsoft.com/search/?terms=System.Collections.ReadOnlyCollectionBase). [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) is not abstract and has a constructor that makes it easy to expose an existing [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) as a read-only collection.

- The [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601), [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601), [System.Collections.Immutable.ImmutableQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableQueue%601), [System.Collections.Immutable.ImmutableArray`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableArray%601), [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602), and [System.Collections.Immutable.ImmutableSortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601) generic classes correspond to the respective nongeneric classes with the same names.

## Additional Types

Several generic collection types do not have nongeneric counterparts. They include the following:

- [System.Collections.Generic.LinkedList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedList%601) is a general-purpose linked list that provides O(1) insertion and removal operations.

- [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) is a sorted dictionary with O(log `n`) insertion and retrieval operations, which makes it a useful alternative to [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602).

- [System.Collections.ObjectModel.KeyedCollection`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.KeyedCollection%602) is a hybrid between a list and a dictionary, which provides a way to store objects that contain their own keys.

- [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) implements a collection class with bounding and blocking functionality.

- [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601) provides fast insertion and removal of unordered elements.

### Immutable builders

When you desire immutability functionality in your app, the [System.Collections.Immutable](https://learn.microsoft.com/search/?terms=System.Collections.Immutable) namespace offers generic collection types you can use. All of the immutable collection types offer `Builder` classes that can optimize performance when you're performing multiple mutations. The `Builder` class batches operations in a mutable state. When all mutations have been completed, call the `ToImmutable` method to "freeze" all nodes and create an immutable generic collection, for example, an [System.Collections.Immutable.ImmutableList`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableList%601).

The `Builder` object can be created by calling the nongeneric `CreateBuilder()` method. From a `Builder` instance, you can call `ToImmutable()`. Likewise, from the `Immutable*` collection, you can call `ToBuilder()` to create a builder instance from the generic immutable collection. The following are the various `Builder` types.

- [System.Collections.Immutable.ImmutableArray`1.Builder](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableArray%601.Builder)
- [System.Collections.Immutable.ImmutableDictionary`2.Builder](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableDictionary%602.Builder)
- [System.Collections.Immutable.ImmutableHashSet`1.Builder](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableHashSet%601.Builder)
- [System.Collections.Immutable.ImmutableList`1.Builder](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableList%601.Builder)
- [System.Collections.Immutable.ImmutableSortedDictionary`2.Builder](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedDictionary%602.Builder)
- [System.Collections.Immutable.ImmutableSortedSet`1.Builder](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601.Builder)

## LINQ to Objects

The LINQ to Objects feature enables you to use LINQ queries to access in-memory objects as long as the object type implements the [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) or [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) interface. LINQ queries provide a common pattern for accessing data; are typically more concise and readable than standard `foreach` loops; and provide filtering, ordering, and grouping capabilities. LINQ queries can also improve performance. For more information, see [LINQ to Objects (C#)](../../csharp/linq/get-started/introduction-to-linq-queries.md), [LINQ to Objects (Visual Basic)](../../visual-basic/programming-guide/concepts/linq/linq-to-objects.md), and [Parallel LINQ (PLINQ)](../parallel-programming/introduction-to-plinq.md).

## Additional Functionality

Some of the generic types have functionality that is not found in the nongeneric collection types. For example, the [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) class, which corresponds to the nongeneric [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) class, has a number of methods that accept generic delegates, such as the [System.Predicate`1](https://learn.microsoft.com/search/?terms=System.Predicate%601) delegate that allows you to specify methods for searching the list, the [System.Action`1](https://learn.microsoft.com/search/?terms=System.Action%601) delegate that represents methods that act on each element of the list, and the [System.Converter`2](https://learn.microsoft.com/search/?terms=System.Converter%602) delegate that lets you define conversions between types.

The [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) class allows you to specify your own [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601) generic interface implementations for sorting and searching the list. The [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) and [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) classes also have this capability. In addition, these classes let you specify comparers when the collection is created. In similar fashion, the [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) and [System.Collections.ObjectModel.KeyedCollection`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.KeyedCollection%602) classes let you specify your own equality comparers.

## See also

- [Collections and Data Structures](index.md)
- [Commonly Used Collection Types](commonly-used-collection-types.md)
- [Generics](../generics/index.md)
