---
description: "private keyword - C# Reference"
title: "private keyword"
ms.date: 01/22/2026
f1_keywords: 
  - "private_CSharpKeyword"
  - "private"
helpviewer_keywords: 
  - "private keyword [C#]"
---
# private (C# Reference)

The `private` keyword is a member access modifier.

> This article covers `private` access. The `private` keyword is also part of the [`private protected`](private-protected.md) access modifier.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Private access is the least permissive access level. You can access private members only within the body of the class or the struct where you declare them, as shown in the following example:

```csharp
class Employee
{
    private int _i;
    double _d;   // private access by default
}
```

Nested types in the same body can also access those private members.

If you reference a private member outside the class or the struct where you declare it, the compiler returns an error.

For a comparison of `private` with the other access modifiers, see [Accessibility Levels](accessibility-levels.md) and [Access Modifiers](../../programming-guide/classes-and-structs/access-modifiers.md).

In this example, the `Employee` class contains two private data members, `_name` and `_salary`. As private members, member methods are the only way to access them. The example adds public methods named `GetName` and `Salary` to allow controlled access to the private members. The `_name` member is accessed by way of a public method, and the `_salary` member is accessed by way of a public read-only property. For more information, see [Properties](../../programming-guide/classes-and-structs/properties.md).

[language="csharp" source="./snippets/csrefKeywordsModifiers.cs" id="10"::: (complete source file; reference: ./snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

## C# language specification  

For more information, see [Declared accessibility](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/basic-concepts.md#742-declared-accessibility) in the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.

## See also

- [C# Keywords](index.md)
- [Access Modifiers](access-modifiers.md)
- [Accessibility Levels](accessibility-levels.md)
- [Modifiers](index.md)
- [public](public.md)
- [protected](protected.md)
- [internal](internal.md)
