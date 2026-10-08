---
description: "The C# get keyword declares a get accessor in a property or indexer. It defines the code to retrieve the value of the property or indexed property."
title: "The get keyword: property accessor"
ms.date: 01/21/2026
f1_keywords: 
  - "get_CSharpKeyword"
  - "get"
helpviewer_keywords: 
  - "get keyword [C#]"
---
# The `get` keyword

The `get` keyword defines an *accessor* method in a property or indexer that returns the property value or the indexer element. For more information, see [Properties](../../programming-guide/classes-and-structs/properties.md), [Automatically implemented Properties](../../programming-guide/classes-and-structs/auto-implemented-properties.md), and [Indexers](../../programming-guide/indexers/index.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


For simple cases where a property's `get` and `set` accessors perform no other operation than setting or retrieving a value in a private backing field, take advantage of the C# compiler's support for automatically implemented properties. The following example implements `Hours` as an automatically implemented property.

[language="csharp" source="./snippets/PropertyAccessors.cs" id="AutoImplementedProperties"::: (complete source file; reference: ./snippets/PropertyAccessors.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/PropertyAccessors.cs.md)

> **Important:**
> You can't use automatically implemented properties for [interface property declarations](../../programming-guide/classes-and-structs/interface-properties.md) or the implementing declaration for a [partial property](partial-member.md). The compiler interprets syntax matching an automatically implemented property as the declaring declaration, not an implementing declaration.

Often, the `get` accessor consists of a single statement that returns a value, as it did in the previous example. You can implement the `get` accessor as an expression-bodied member. The following example implements both the `get` and the `set` accessor as expression-bodied members.

[language="csharp" source="./snippets/PropertyAccessors.cs" id="GetSetExpressions"::: (complete source file; reference: ./snippets/PropertyAccessors.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/PropertyAccessors.cs.md)

You might find that you need to implement one of the accessor bodies. Use a field backed property to let the compiler generate one accessor while you write the other by hand. Use the `field` keyword, added in C# 14, to access the compiler synthesized backing field:

[language="csharp" source="./snippets/PropertyAccessors.cs" id="FieldBackedProperty"::: (complete source file; reference: ./snippets/PropertyAccessors.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/PropertyAccessors.cs.md)

The following example defines both a `get` and a `set` accessor for a property named `Seconds`. It uses a private field named `_seconds` to back the property value.

[language="csharp" source="./snippets/PropertyAccessors.cs" id="GetSetAccessors"::: (complete source file; reference: ./snippets/PropertyAccessors.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/PropertyAccessors.cs.md)

## C# Language Specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [C# Keywords](index.md)
- [Properties](../../programming-guide/classes-and-structs/properties.md)
