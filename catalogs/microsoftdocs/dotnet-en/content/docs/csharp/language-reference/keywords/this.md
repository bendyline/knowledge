---
title: "The this keyword"
description: The `this` keyword clarifies access to the current instance of a type, or declares an indexer on the type.
ms.date: 01/22/2026
f1_keywords: 
  - "this"
  - "this_CSharpKeyword"
helpviewer_keywords: 
  - "this keyword [C#]"
---
# The this keyword

The `this` keyword refers to the current instance of the class. It also serves as a modifier for the first parameter of an extension method.

> **Note:**
> This article discusses the use of `this` to refer to the receiver instance in the current member. For more information about its use in extension methods, see the [`extension`](extension.md) keyword.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Common uses of `this` include:

- Qualifying members hidden by similar names, such as:
  [language="csharp" source="./snippets/csrefKeywordsAccess.cs" id="snippet4"::: (complete source file; reference: ./snippets/csrefKeywordsAccess.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsAccess.cs.md)
- Passing an object as a parameter to other methods.

  ```csharp
  CalcTax(this);
  ```

- Declaring [indexers](../../programming-guide/indexers/index.md), such as:
  [language="csharp" source="./snippets/csrefKeywordsAccess.cs" id="snippet5"::: (complete source file; reference: ./snippets/csrefKeywordsAccess.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsAccess.cs.md)

Static member functions exist at the class level and not as part of an object. They don't have a `this` pointer. Referring to `this` in a static method is an error.

In the following example, the parameters `name` and `alias` hide fields with the same names. The `this` keyword qualifies those variables as `Employee` class members. The `this` keyword also specifies the object for the method `CalcTax`, which belongs to another class.

[language="csharp" source="./snippets/csrefKeywordsAccess.cs" id="snippet3"::: (complete source file; reference: ./snippets/csrefKeywordsAccess.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsAccess.cs.md)

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [Member-access qualification preferences (IDE0003 and IDE0009)](../../../fundamentals/code-analysis/style-rules/ide0003-ide0009.md)
- [C# Keywords](index.md)
- [base](base.md)
- [Methods](../../programming-guide/classes-and-structs/methods.md)
