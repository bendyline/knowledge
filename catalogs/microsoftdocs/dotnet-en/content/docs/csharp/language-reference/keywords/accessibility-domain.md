---
description: "Accessibility Domain - C# Reference"
title: "Accessibility Domain"
ms.date: 01/21/2026
helpviewer_keywords: 
  - "accessibility domain [C#]"
---
# Accessibility domain (C# reference)

The accessibility domain of a member specifies the program sections where you can reference that member. If the member is nested within another type, both the [accessibility level](accessibility-levels.md) of the member and the accessibility domain of the immediately containing type determine its accessibility domain.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The accessibility domain of a top-level type always includes at least the program text of the project where you declare it. In other words, the domain includes all source files in the project. The accessibility domain of a nested type always includes at least the program text of the type where you declare it. In other words, the domain is the type body, which includes all nested types. The accessibility domain of a nested type never exceeds that of the containing type. The following example demonstrates these concepts.

This example contains a top-level type, `T1`, and two nested classes, `M1` and `M2`. The classes contain fields that have different declared accessibilities. In the `Main` method, a comment follows each statement to indicate the accessibility domain of each member. The statements that try to reference the inaccessible members are commented out. If you want to see the compiler errors caused by referencing an inaccessible member, remove the comments one at a time.

[language="csharp" source="snippets/csrefKeywordsModifiers.cs" id="4"::: (complete source file; reference: snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

## C# Language Specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [C# Keywords](index.md)
- [Access Modifiers](access-modifiers.md)
- [Accessibility Levels](accessibility-levels.md)
- [Restrictions on Using Accessibility Levels](restrictions-on-using-accessibility-levels.md)
- [Access Modifiers](../../programming-guide/classes-and-structs/access-modifiers.md)
- [public](public.md)
- [private](private.md)
- [protected](protected.md)
- [internal](internal.md)
