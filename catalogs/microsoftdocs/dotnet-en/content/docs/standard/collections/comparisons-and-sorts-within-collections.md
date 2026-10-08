---
title: "Comparisons and Sorts Within Collections"
description: Do comparisons & sorts using the System.Collections classes in .NET, which help in finding an element to remove or returning the value of a key-and-value pair.
ms.date: 04/30/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "sorting data, collections"
  - "IComparable.CompareTo method"
  - "Collections classes"
  - "Equals method"
  - "collections [.NET], comparisons"
ms.assetid: 5e4d3b45-97f0-423c-a65f-c492ed40e73b
---

# Comparisons and sorts within collections

The [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) classes perform comparisons in almost all the processes involved in managing collections, whether searching for the element to remove or returning the value of a key-and-value pair.

Collections typically utilize an equality comparer and/or an ordering comparer. Two constructs are used for comparisons.

<a name="BKMK_Checkingforequality"></a>

## Check for equality

Methods such as `Contains`, [System.Collections.IList.IndexOf*](https://learn.microsoft.com/search/?terms=System.Collections.IList.IndexOf*), [System.Collections.Generic.List`1.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.LastIndexOf*), and `Remove` use an equality comparer for the collection elements. If the collection is generic, then items are compared for equality according to the following guidelines:

- If type T implements the [System.IEquatable`1](https://learn.microsoft.com/search/?terms=System.IEquatable%601) generic interface, then the equality comparer is the [System.IEquatable`1.Equals*](https://learn.microsoft.com/search/?terms=System.IEquatable%601.Equals*) method of that interface.

- If type T does not implement [System.IEquatable`1](https://learn.microsoft.com/search/?terms=System.IEquatable%601), [System.Object.Equals*](https://learn.microsoft.com/search/?terms=System.Object.Equals*) is used.

In addition, some constructor overloads for dictionary collections accept an [System.Collections.Generic.IEqualityComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEqualityComparer%601) implementation, which is used to compare keys for equality. For an example, see the [System.Collections.Generic.Dictionary`2.%23ctor*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.%2523ctor*) constructor.

<a name="BKMK_Determiningsortorder"></a>

## Determine sort order

Methods such as `BinarySearch` and `Sort` use an ordering comparer for the collection elements. The comparisons can be between elements of the collection, or between an element and a specified value. For comparing objects, there is the concept of a `default comparer` and an `explicit comparer`.

The default comparer relies on at least one of the objects being compared to implement the **IComparable** interface. It is a good practice to implement **IComparable** on all classes which are used as values in a list collection or as keys in a dictionary collection. For a generic collection, equality comparison is determined according to the following:

- If type T implements the [System.IComparable`1](https://learn.microsoft.com/search/?terms=System.IComparable%601) generic interface, then the default comparer is the [System.IComparable`1.CompareTo%28`0%29](https://learn.microsoft.com/search/?terms=System.IComparable%601.CompareTo%2528%600%2529) method of that interface

- If type T implements the non-generic [System.IComparable](https://learn.microsoft.com/search/?terms=System.IComparable) interface, then the default comparer is the [System.IComparable.CompareTo%28System.Object%29](https://learn.microsoft.com/search/?terms=System.IComparable.CompareTo%2528System.Object%2529) method of that interface.

- If type T doesn't implement either interface, then there is no default comparer, and a comparer or comparison delegate must be provided explicitly.

To provide explicit comparisons, some methods accept an **IComparer** implementation as a parameter. For example, the [System.Collections.Generic.List`1.Sort*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Sort*) method accepts an [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601) implementation.

The current culture setting of the system can affect the comparisons and sorts within a collection. By default, the comparisons and sorts in the **Collections** classes are culture-sensitive. To ignore the culture setting and therefore obtain consistent comparison and sorting results, use the [System.Globalization.CultureInfo.InvariantCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture*) with member overloads that accept a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo). For more information, see [Perform culture-insensitive string operations in collections](../../core/extensions/performing-culture-insensitive-string-operations-in-collections.md) and [Perform culture-insensitive string operations in arrays](../../core/extensions/performing-culture-insensitive-string-operations-in-arrays.md).

<a name="BKMK_Equalityandsortexample"></a>

## Equality and sort example

The following code demonstrates an implementation of [System.IEquatable`1](https://learn.microsoft.com/search/?terms=System.IEquatable%601) and [System.IComparable`1](https://learn.microsoft.com/search/?terms=System.IComparable%601) on a simple business object. In addition, when the object is stored in a list and sorted, you will see that calling the [System.Collections.Generic.List`1.Sort](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Sort) method results in the use of the default comparer for the `Part` type, and the [System.Collections.Generic.List`1.Sort%28System.Comparison%7B`0%7D%29](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Sort%2528System.Comparison%257B%600%257D%2529) method implemented by using an anonymous method.

[System.Collections.Generic.List.Sort#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.collections.generic.list.sort/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.collections.generic.list.sort/cs/program.cs.md)
[System.Collections.Generic.List.Sort#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.collections.generic.list.sort/vb/module1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.collections.generic.list.sort/vb/module1.vb.md)

## See also

- [System.Collections.IComparer](https://learn.microsoft.com/search/?terms=System.Collections.IComparer)
- [System.IEquatable`1](https://learn.microsoft.com/search/?terms=System.IEquatable%601)
- [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601)
- [System.IComparable](https://learn.microsoft.com/search/?terms=System.IComparable)
- [System.IComparable`1](https://learn.microsoft.com/search/?terms=System.IComparable%601)
