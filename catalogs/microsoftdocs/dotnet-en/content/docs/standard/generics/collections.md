---
description: "Learn more about: Generic collections in .NET"
title: "Generic Collections in .NET"
ms.date: "02/15/2018"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "generics [.NET], collections"
  - "generic collections [.NET]"
  - "generic types [.NET]"
---
# Generic collections in .NET

 The .NET class library provides a number of generic collection classes in the [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic) and [System.Collections.ObjectModel](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel) namespaces. For more detailed information about these classes, see [Commonly Used Collection Types](../collections/commonly-used-collection-types.md).

## System.Collections.Generic

 Many of the generic collection types are direct analogs of nongeneric types. [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) is a generic version of [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable); it uses the generic structure [System.Collections.Generic.KeyValuePair`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.KeyValuePair%602) for enumeration instead of [System.Collections.DictionaryEntry](https://learn.microsoft.com/search/?terms=System.Collections.DictionaryEntry).

 [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) is a generic version of [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList). There are generic [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601) and [System.Collections.Generic.Stack`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Stack%601) classes that correspond to the nongeneric versions.

 There are generic and nongeneric versions of [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602). Both versions are hybrids of a dictionary and a list. The [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) generic class is a pure dictionary and has no nongeneric counterpart.

 The [System.Collections.Generic.LinkedList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedList%601) generic class is a true linked list. It has no nongeneric counterpart.

## System.Collections.ObjectModel

 The [System.Collections.ObjectModel.Collection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%601) generic class provides a base class for deriving your own generic collection types. The [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) class provides an easy way to produce a read-only collection from any type that implements the [System.Collections.Generic.IList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IList%601) generic interface. The [System.Collections.ObjectModel.KeyedCollection`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.KeyedCollection%602) generic class provides a way to store objects that contain their own keys.

## Other generic types

 The [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601) generic structure allows you to use value types as if they could be assigned `null`. This can be useful when working with database queries, where fields that contain value types can be missing. The generic type parameter can be any value type.

> **Note:**
> In C# and Visual Basic, it is not necessary to use [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601) explicitly because the language has syntax for nullable types. See [Nullable value types (C# reference)](../../csharp/language-reference/builtin-types/nullable-value-types.md) and [Nullable value types (Visual Basic)](../../visual-basic/programming-guide/language-features/data-types/nullable-value-types.md).

 The [System.ArraySegment`1](https://learn.microsoft.com/search/?terms=System.ArraySegment%601) generic structure provides a way to delimit a range of elements within a one-dimensional, zero-based array of any type. The generic type parameter is the type of the array's elements.

 The [System.EventHandler`1](https://learn.microsoft.com/search/?terms=System.EventHandler%601) generic delegate eliminates the need to declare a delegate type to handle events, if your event follows the event-handling pattern used by .NET. For example, suppose you have created a `MyEventArgs` class, derived from [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs), to hold the data for your event. You can then declare the event as follows:
 [Conceptual.Generics.Overview#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.generics.overview/cs/source2.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.generics.overview/cs/source2.cs.md)
 [Conceptual.Generics.Overview#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.generics.overview/vb/source2.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.generics.overview/vb/source2.vb.md)

## See also

- [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic)
- [System.Collections.ObjectModel](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel)
- [Generics](index.md)
- [Generic Delegates for Manipulating Arrays and Lists](delegates-for-manipulating-arrays-and-lists.md)
- [Generic Interfaces](interfaces.md)
