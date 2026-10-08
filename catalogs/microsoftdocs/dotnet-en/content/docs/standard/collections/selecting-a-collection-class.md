---
title: "Selecting a Collection Class"
description: Learn how to decide which collection class in .NET to choose. Using the wrong type can restrict your use of the collection.
ms.date: "03/18/2019"
helpviewer_keywords:
  - "last-in-first-out collections"
  - "first-in-first-out collections"
  - "collections [.NET], selecting collection class"
  - "indexed collections"
  - "Collections classes"
  - "grouping data in collections, selecting collection class"
ms.assetid: ba049f9a-ce87-4cc4-b319-3f75c8ddac8a
---

# Selecting a Collection Class

Be sure to choose your collection class carefully. Using the wrong type can restrict your use of the collection.

> **Important:**
> Avoid using the types in the [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) namespace. The generic and concurrent versions of the collections are recommended because of their greater type safety and other improvements.

Consider the following questions:

- Do you need a sequential list where the element is typically discarded after its value is retrieved?

  - If yes, consider using the [System.Collections.Queue](https://learn.microsoft.com/search/?terms=System.Collections.Queue) class or the [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601) generic class if you need first-in, first-out (FIFO) behavior. Consider using the [System.Collections.Stack](https://learn.microsoft.com/search/?terms=System.Collections.Stack) class or the [System.Collections.Generic.Stack`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Stack%601) generic class if you need last-in, first-out (LIFO) behavior. For safe access from multiple threads, use the concurrent versions, [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601) and [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601). For immutability, consider the immutable versions, [System.Collections.Immutable.ImmutableQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableQueue%601) and [System.Collections.Immutable.ImmutableStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableStack%601).

  - If not, consider using the other collections.

- Do you need to access the elements in a certain order, such as FIFO, LIFO, or random?

  - The [System.Collections.Queue](https://learn.microsoft.com/search/?terms=System.Collections.Queue) class, as well as the [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601), [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601), and [System.Collections.Immutable.ImmutableQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableQueue%601) generic classes all offer FIFO access. For more information, see [When to Use a Thread-Safe Collection](thread-safe/when-to-use-a-thread-safe-collection.md).

  - The [System.Collections.Stack](https://learn.microsoft.com/search/?terms=System.Collections.Stack) class, as well as the [System.Collections.Generic.Stack`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Stack%601), [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601), and [System.Collections.Immutable.ImmutableStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableStack%601) generic classes all offer LIFO access. For more information, see [When to Use a Thread-Safe Collection](thread-safe/when-to-use-a-thread-safe-collection.md).

  - The [System.Collections.Generic.LinkedList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedList%601) generic class allows sequential access either from the head to the tail, or from the tail to the head.

- Do you need to access each element by index?

  - The [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) and [System.Collections.Specialized.StringCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringCollection) classes and the [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) generic class offer access to their elements by the zero-based index of the element. For immutability, consider the immutable generic versions, [System.Collections.Immutable.ImmutableArray`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableArray%601) and [System.Collections.Immutable.ImmutableList`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableList%601).

  - The [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable), [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList), [System.Collections.Specialized.ListDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.ListDictionary), and [System.Collections.Specialized.StringDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringDictionary) classes, and the [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) and [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) generic classes offer access to their elements by the key of the element. Additionally, there are immutable versions of several corresponding types: [System.Collections.Immutable.ImmutableHashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableHashSet%601), [System.Collections.Immutable.ImmutableDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableDictionary%602), [System.Collections.Immutable.ImmutableSortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601), and [System.Collections.Immutable.ImmutableSortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedDictionary%602).

  - The [System.Collections.Specialized.NameObjectCollectionBase](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameObjectCollectionBase) and [System.Collections.Specialized.NameValueCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameValueCollection) classes, and the [System.Collections.ObjectModel.KeyedCollection`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.KeyedCollection%602) and [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) generic classes offer access to their elements by either the zero-based index or the key of the element.

- Will each element contain one value, a combination of one key and one value, or a combination of one key and multiple values?

  - One value: Use any of the collections based on the [System.Collections.IList](https://learn.microsoft.com/search/?terms=System.Collections.IList) interface or the [System.Collections.Generic.IList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IList%601) generic interface. For an immutable option, consider the [System.Collections.Immutable.IImmutableList`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableList%601) generic interface.

  - One key and one value: Use any of the collections based on the [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary) interface or the [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602) generic interface. For an immutable option, consider the [System.Collections.Immutable.IImmutableSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableSet%601) or [System.Collections.Immutable.IImmutableDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableDictionary%602) generic interfaces.

  - One value with embedded key: Use the [System.Collections.ObjectModel.KeyedCollection`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.KeyedCollection%602) generic class.

  - One key and multiple values: Use the [System.Collections.Specialized.NameValueCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameValueCollection) class.

- Do you need to sort the elements differently from how they were entered?

  - The [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) class sorts its elements by their hash codes.

  - The [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) class, and the [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) and [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) generic classes sort their elements by the key. The sort order is based on the implementation of the [System.Collections.IComparer](https://learn.microsoft.com/search/?terms=System.Collections.IComparer) interface for the [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) class and on the implementation of the [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601) generic interface for the [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) and [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) generic classes. Of the two generic types, [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) offers better performance than [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602), while [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) consumes less memory.

  - [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) provides a [System.Collections.ArrayList.Sort*](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList.Sort*) method that takes an [System.Collections.IComparer](https://learn.microsoft.com/search/?terms=System.Collections.IComparer) implementation as a parameter. Its generic counterpart, the [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) generic class, provides a [System.Collections.Generic.List`1.Sort*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Sort*) method that takes an implementation of the [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601) generic interface as a parameter.

- Do you need fast searches and retrieval of information?

  - [System.Collections.Specialized.ListDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.ListDictionary) is faster than [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) for small collections (10 items or fewer). The [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) generic class provides faster lookup than the [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) generic class. The multi-threaded implementation is [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602). [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601) provides fast multi-threaded insertion for unordered data. For more information about both multi-threaded types, see [When to Use a Thread-Safe Collection](thread-safe/when-to-use-a-thread-safe-collection.md).

- Do you need collections that accept only strings?

  - [System.Collections.Specialized.StringCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringCollection) (based on [System.Collections.IList](https://learn.microsoft.com/search/?terms=System.Collections.IList)) and [System.Collections.Specialized.StringDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringDictionary) (based on [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary)) are in the [System.Collections.Specialized](https://learn.microsoft.com/search/?terms=System.Collections.Specialized) namespace.

  - In addition, you can use any of the generic collection classes in the [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic) namespace as strongly typed string collections by specifying the [System.String](https://learn.microsoft.com/search/?terms=System.String) class for their generic type arguments. For example, you can declare a variable to be of type [List\<String>](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) or [Dictionary\<String,String>](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602).

## LINQ to Objects and PLINQ

LINQ to Objects enables developers to use LINQ queries to access in-memory objects as long as the object type implements [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) or [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601). LINQ queries provide a common pattern for accessing data, are typically more concise and readable than standard `foreach` loops, and provide filtering, ordering, and grouping capabilities. For more information, see [LINQ to Objects (C#)](../../csharp/linq/get-started/introduction-to-linq-queries.md) and [LINQ to Objects (Visual Basic)](../../visual-basic/programming-guide/concepts/linq/linq-to-objects.md).

PLINQ provides a parallel implementation of LINQ to Objects that can offer faster query execution in many scenarios, through more efficient use of multi-core computers. For more information, see [Parallel LINQ (PLINQ)](../parallel-programming/introduction-to-plinq.md).

## See also

- [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections)
- [System.Collections.Specialized](https://learn.microsoft.com/search/?terms=System.Collections.Specialized)
- [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic)
- [Thread-Safe Collections](thread-safe/index.md)
