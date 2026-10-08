---
description: "Declare compile time constants with the `const` keyword"
title: "The const keyword"
ms.date: 01/21/2026
f1_keywords: 
  - "const_CSharpKeyword"
  - "const"
helpviewer_keywords: 
  - "const keyword [C#]"
---
# The const keyword

Use the `const` keyword to declare a constant field or a local constant. Constant fields and locals aren't variables and can't be modified. Constants can be numbers, Boolean values, strings, or a null reference. Don't create a constant to represent information that you expect to change over time. For example, don't use a constant field to store the price of a service, a product version number, or the brand name of a company. These values can change over time, and because compilers propagate constants, other code compiled with your libraries needs to be recompiled to see the changes. See also the [readonly](readonly.md) keyword. For example:

```csharp
const int X = 0;
public const double GravitationalConstant = 6.673e-11;
private const string ProductName = "Visual C#";
```

[Interpolated strings](../tokens/interpolated.md) can be constants if all expressions used are also constant strings. This feature can improve the code that builds constant strings:

```csharp
const string Language = "C#";
const string Platform = ".NET";
const string FullProductName = $"{Platform} - Language: {Language}";
```


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The type of a constant declaration specifies the type of the members that the declaration introduces. The initializer of a local constant or a constant field must be a constant expression that the compiler can implicitly convert to the target type.

A constant expression is an expression that the compiler can fully evaluate at compile time. Therefore, the only possible values for constants of reference types are strings and a null reference.

You can declare multiple constants in a single constant declaration, such as:

```csharp
public const double X = 1.0, Y = 2.0, Z = 3.0;
```

The `static` modifier isn't allowed in a constant declaration.

A constant can participate in a constant expression, as follows:

```csharp
public const int C1 = 5;
public const int C2 = C1 + 100;
```

> **Note:**
> The [readonly](readonly.md) keyword differs from the `const` keyword. You can only initialize a `const` field at the declaration of the field. You can initialize a `readonly` field either at the declaration or in a constructor. Therefore, `readonly` fields can have different values depending on the constructor used. Also, although a `const` field is a compile-time constant, the `readonly` field can be used for run-time constants, as in this line: `public static readonly uint l1 = (uint)DateTime.Now.Ticks;`

## Examples

[language="csharp" source="./snippets/csrefKeywordsModifiers.cs" id="5"::: (complete source file; reference: ./snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

The following example shows how to declare a local constant:

[language="csharp" source="./snippets/csrefKeywordsModifiers.cs" id="6"::: (complete source file; reference: ./snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [Constants](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/classes.md#154-constants)
- [Constant expressions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1226-constant-expressions)

## See also

- [C# keywords](index.md)
- [readonly](readonly.md)
