---
title: "Collections"
description: Learn about collections in C#, which are used to work with groups of objects. Collections have different characteristics regarding adding and removing elements, modifying elements, and enumerating the collection elements.
ms.date: 01/14/2026
---
# Collections

The .NET runtime provides many collection types that store and manage groups of related objects. Some of the collection types, such as [System.Array](https://learn.microsoft.com/search/?terms=System.Array), [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601), and [System.Memory`1](https://learn.microsoft.com/search/?terms=System.Memory%601), are recognized [in the C# language](built-in-types.md). In addition, interfaces like [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) are recognized in the language for enumerating the elements of a collection.

Collections provide a flexible way to work with groups of objects. You can classify different collections by these characteristics:

- **Element access**: Every collection can be enumerated to access each element in order. Some collections access elements by *index*, the element's position in an ordered collection. The most common example is [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601). Other collections access elements by *key*, where a *value* is associated with a single *key*. The most common example is [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602). You choose between these collection types based on how your app accesses elements.
- **Performance profile**: Every collection has different performance profiles for actions like adding an element, finding an element, or removing an element. You can pick a collection type based on the operations used most in your app.
- **Grow and shrink dynamically**: Most collections support adding or removing elements dynamically. Notably, [System.Array](https://learn.microsoft.com/search/?terms=System.Array), [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601), and [System.Memory`1](https://learn.microsoft.com/search/?terms=System.Memory%601) don't.

In addition to those characteristics, the runtime provides specialized collections that prevent adding or removing elements or modifying the elements of the collection. Other specialized collections provide safety for concurrent access in multithreaded apps.

You can find all the collection types in the [.NET API reference](https://learn.microsoft.com/dotnet/api/?term=collection). For more information, see [Commonly Used Collection Types](../../../standard/collections/commonly-used-collection-types.md) and [Selecting a Collection Class](../../../standard/collections/selecting-a-collection-class.md).

> **Note:**
> For the examples in this article, you might need to add [using directives](../keywords/using-directive.md) for the `System.Collections.Generic` and `System.Linq` namespaces.

[Arrays](arrays.md) are represented by [System.Array](https://learn.microsoft.com/search/?terms=System.Array) and have syntax support in the C# language. This syntax provides more concise declarations for array variables.

[System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) is a [`ref struct`](./ref-struct.md) type that provides a snapshot over a sequence of elements without copying those elements. The compiler enforces safety rules to ensure the `Span` can't be accessed after the sequence it references is no longer in scope. It's used in many .NET APIs to improve performance. [System.Memory`1](https://learn.microsoft.com/search/?terms=System.Memory%601) provides similar behavior when you can't use a `ref struct` type.

Beginning with C# 12, all of the collection types can be initialized by using a [Collection expression](../operators/collection-expressions.md).

## Indexable collections

An *indexable collection* is a collection where you can access each element by using its index. An element's *index* is the number of elements before it in the sequence. Therefore, the element referenced by index `0` is the first element, index `1` is the second, and so on. These examples use the [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) class. It's the most common indexable collection.

The following example creates and initializes a list of strings, removes an element, and adds an element to the end of the list. After each modification, it iterates through the strings by using a [foreach](../statements/iteration-statements.md#the-foreach-statement) statement or a `for` loop:

[language="csharp" source="./snippets/shared/Collections.cs" id="SnippetCreateList"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)

The following example removes elements from a list by index. Instead of a `foreach` statement, it uses a `for` statement that iterates in descending order. The [System.Collections.Generic.List`1.RemoveAt*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.RemoveAt*) method causes elements after a removed element to have a lower index value.

[language="csharp" source="./snippets/shared/Collections.cs" id="SnippetRemoveItemByIndex"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)

For the type of elements in the [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601), you can also define your own class. In the following example, the `Galaxy` class that the [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) uses is defined in the code.

[language="csharp" source="./snippets/shared/Collections.cs" id="SnippetCustomList"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)

For more information about indices, see the [Explore indexes and ranges](../../tutorials/ranges-indexes.md) article.

## Key/value pair collections

These examples use the [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) class. It's the most common dictionary collection. A dictionary collection enables you to access elements in the collection by using the key of each element. Each addition to the dictionary consists of a value and its associated key.

The following example creates a `Dictionary` collection and iterates through the dictionary by using a `foreach` statement.

[language="csharp" source="./snippets/shared/Collections.cs" id="SnippetDictionary"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)

The following example uses the [System.Collections.Generic.Dictionary`2.ContainsKey*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.ContainsKey*) method and the [System.Collections.Generic.Dictionary`2.Item*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.Item*) property of `Dictionary` to quickly find an item by key. The `Item` property enables you to access an item in the `elements` collection by using the `elements[symbol]` in C#.

[language="csharp" source="./snippets/shared/Collections.cs" id="SnippetFindInDictionary"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)

The following example uses the [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) method to quickly find an item by key.

[language="csharp" source="./snippets/shared/Collections.cs" id="SnippetFindInDictionary2"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)

## Iterators

An *iterator* is used to perform a custom iteration over a collection. An iterator can be a method or a `get` accessor. An iterator uses a [yield return](../statements/yield.md) statement to return each element of the collection one at a time.

You call an iterator by using a [foreach](../statements/iteration-statements.md#the-foreach-statement) statement. Each iteration of the `foreach` loop calls the iterator. When a `yield return` statement is reached in the iterator, an expression is returned, and the current location in code is retained. Execution restarts from that location the next time that the iterator is called.

For more information, see [Iterators (C#)](../../programming-guide/concepts/iterators.md).

The following example uses an iterator method. The iterator method has a `yield return` statement that is inside a `for` loop. In the `ListEvenNumbers` method, each iteration of the `foreach` statement body creates a call to the iterator method, which proceeds to the next `yield return` statement.

[language="csharp" source="./snippets/shared/Collections.cs" id="SnippetIteratorMethod"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)

## LINQ and collections

You can use language-integrated query (LINQ) to access collections. LINQ queries provide filtering, ordering, and grouping capabilities. For more information, see [Getting Started with LINQ in C#](../../linq/index.md).

The following example runs a LINQ query against a generic `List`. The LINQ query returns a different collection that contains the results.

[language="csharp" source="./snippets/shared/Collections.cs" id="ShowLINQ"::: (complete source file; reference: ./snippets/shared/Collections.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/Collections.cs.md)
