---
description: "public keyword - C# Reference"
title: "public keyword"
ms.date: 01/22/2026
f1_keywords:
  - "public"
  - "public_CSharpKeyword"
helpviewer_keywords:
  - "public keyword [C#]"
---
# public (C# reference)

Use the `public` keyword as an access modifier for types and type members. Public access is the most permissive access level. The following example shows that you can access public members without any restrictions:

```csharp
class SampleClass
{
    public int x; // No access restrictions.
}
```

For more information, see [Access Modifiers](../../programming-guide/classes-and-structs/access-modifiers.md) and [Accessibility Levels](accessibility-levels.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


In the following example, two classes are declared, `PointTest` and `Program`. The public members `x` and `y` of `PointTest` are accessed directly from `Program`.

[language="csharp" source="./snippets/csrefKeywordsModifiers.cs" id="13"::: (complete source file; reference: ./snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

If you change the `public` access level to [private](private.md) or [protected](protected.md), you get the error message:

'PointTest.y' is inaccessible due to its protection level.

## C# language specification  

For more information, see [Declared accessibility](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/basic-concepts.md#742-declared-accessibility) in the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.

## See also

- [Access Modifiers](../../programming-guide/classes-and-structs/access-modifiers.md)
- [C# Keywords](index.md)
- [Access Modifiers](access-modifiers.md)
- [Accessibility Levels](accessibility-levels.md)
- [Modifiers](index.md)
- [private](private.md)
- [protected](protected.md)
- [internal](internal.md)
