---
description: "Learn more about: Sorted Collection Types"
title: "Sorted Collection Types"
ms.date: 04/30/2020
helpviewer_keywords:
  - "SortedDictionary collection type"
  - "SortedList class, grouping data in collections"
  - "grouping data in collections, SortedList collection type"
  - "SortedList collection type"
  - "collections [.NET], SortedList collection type"
ms.assetid: 3db965b2-36a6-4b12-b76e-7f074ff7275a
---

# Sorted Collection Types

The [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) class, the [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) generic class, and the [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) generic class are similar to the [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) class and the [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) generic class in that they implement the [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary) interface, but they maintain their elements in sort order by key, and they do not have the O(1) insertion and retrieval characteristic of hash tables. The three classes have several features in common:

- All three classes implement the [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary) interface. The two generic classes also implement the [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602) generic interface.

- Each element is a key/value pair for enumeration purposes.

   > **Note:**
   > The nongeneric [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) class returns [System.Collections.DictionaryEntry](https://learn.microsoft.com/search/?terms=System.Collections.DictionaryEntry) objects when enumerated, although the two generic types return [System.Collections.Generic.KeyValuePair`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.KeyValuePair%602) objects.

- Elements are sorted according to a [System.Collections.IComparer](https://learn.microsoft.com/search/?terms=System.Collections.IComparer) implementation (for nongeneric [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList)) or a [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601) implementation (for the two generic classes).

- Each class provides properties that return collections containing only the keys or only the values.

The following table lists some of the differences between the two sorted list classes and the [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) class.

| [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) nongeneric class and [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) generic class | [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) generic class |
| --- | --- |
| The properties that return keys and values are indexed, allowing efficient indexed retrieval. | No indexed retrieval. |
| Retrieval is O(log `n`). | Retrieval is O(log `n`). |
| Insertion and removal are generally O(`n`); however, insertion is O(log `n`) for data that are already in sort order, so that each element is added to the end of the list. (This assumes that a resize is not required.) | Insertion and removal are O(log `n`). |
| Uses less memory than a [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602). | Uses more memory than the [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) nongeneric class and the [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) generic class. |

For sorted lists or dictionaries that must be accessible concurrently from multiple threads, you can add sorting logic to a class that derives from [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602). When considering immutability, the following corresponding immutable types follow similar sorting semantics: [System.Collections.Immutable.ImmutableSortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601) and [System.Collections.Immutable.ImmutableSortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedDictionary%602).

> **Note:**
> For values that contain their own keys (for example, employee records that contain an employee ID number), you can create a keyed collection that has some characteristics of a list and some characteristics of a dictionary by deriving from the [System.Collections.ObjectModel.KeyedCollection`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.KeyedCollection%602) generic class.

The [System.Collections.Generic.SortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedSet%601) class provides a self-balancing tree that maintains data in sorted order after insertions, deletions, and searches. This class and the [System.Collections.Generic.HashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.HashSet%601) class implement the [System.Collections.Generic.ISet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ISet%601) interface.

## See also

- [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary)
- [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602)
- [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602)
- [Commonly Used Collection Types](commonly-used-collection-types.md)
