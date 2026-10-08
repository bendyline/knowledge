---
description: "The `field` contextual keyword - access the compiler synthesized backing field for a property"
title: "The `field` contextual keyword"
ms.date: 01/21/2026
f1_keywords: 
  - "field_CSharpKeyword"
helpviewer_keywords: 
  - "field keyword [C#]"
---
# `field` - Field backed property declarations

Use the contextual keyword `field`, introduced in C# 14, in a property accessor to access the compiler-synthesized backing field of a property. By using this syntax, you can define the body of a `get` or `set` accessor and let the compiler generate the other accessor as it would in an automatically implemented property.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The addition of the `field` contextual keyword provides a smooth path to add benefits such as range checking to an automatically implemented property. This practice is shown in the following example:

[language="csharp" source="./snippets/PropertyAccessors.cs" id="FieldBackedProperty"::: (complete source file; reference: ./snippets/PropertyAccessors.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/PropertyAccessors.cs.md)

You might implement the `Hours` property as an automatically implemented property. Then, you discover that you want to protect against a negative value. Use `field` and provide range checking in the `set` accessor. You don't need to declare the backing field by hand or provide a body for the `get` accessor.

For more information, see the [Properties](../../programming-guide/classes-and-structs/properties.md) and [Indexers](../../programming-guide/indexers/index.md) articles.

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.
