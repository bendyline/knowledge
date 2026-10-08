---
title: "The base keyword"
description: Learn about the base keyword, which is used to access members of the base class from within a derived class in C#.
ms.date: 01/21/2026
f1_keywords: 
  - "base"
  - "BaseClass.BaseClass"
  - "base_CSharpKeyword"
helpviewer_keywords: 
  - "base keyword [C#]"
---
# The base keyword

Use the `base` keyword to access members of the base class from within a derived class. Use it if you want to:

- Call a method on the base class that's overridden by another method.
- Specify which base-class constructor to call when creating instances of the derived class.

You can access the base class only in a constructor, in an instance method, and in an instance property accessor. Using the `base` keyword from within a static method produces an error.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The base class you access is the base class you specify in the class declaration. For example, if you specify `class ClassB : ClassA`, you access the members of ClassA from ClassB, regardless of the base class of ClassA.

In this example, both the base class `Person` and the derived class `Employee` have a method named `GetInfo`. By using the `base` keyword, you can call the `GetInfo` method of the base class from within the derived class.

[language="csharp" source="./snippets/csrefKeywordsAccess.cs" id="snippet1"::: (complete source file; reference: ./snippets/csrefKeywordsAccess.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsAccess.cs.md)

This example shows how to specify the base-class constructor to call when creating instances of a derived class.

[language="csharp" source="./snippets/csrefKeywordsAccess.cs" id="snippet2"::: (complete source file; reference: ./snippets/csrefKeywordsAccess.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsAccess.cs.md)

For more examples, see [new](new-modifier.md), [virtual](virtual.md), and [override](override.md).

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [C# Keywords](index.md)
- [The `this` keyword](this.md)
