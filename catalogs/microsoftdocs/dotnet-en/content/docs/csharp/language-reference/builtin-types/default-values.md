---
title: "Default values of built-in types"
description: "Learn the default values of C# types such as bool, char, int, float, double, and more."
ms.date: 01/14/2026
helpviewer_keywords:
  - "default [C#]"
  - "parameterless constructor [C#]"
---
# Default values of C# types (C# reference)

The following table shows the default values of C# types:

| Type | Default value |
| --- | --- |
| Any [reference type](../keywords/reference-types.md) | `null` |
| Any [built-in integral numeric type](integral-numeric-types.md) | 0 (zero) |
| Any [built-in floating-point numeric type](floating-point-numeric-types.md) | 0 (zero) |
| [bool](bool.md) | `false` |
| [char](char.md) | `'\0'` (U+0000) |
| [enum](enum.md) | The value produced by the expression `(E)0`, where `E` is the enum identifier. |
| [struct](struct.md) | The value produced by setting all value-type fields to their default values and all reference-type fields to `null`. |
| Any [nullable value type](nullable-value-types.md) | An instance for which the [System.Nullable`1.HasValue](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue) property is `false` and the [System.Nullable`1.Value](https://learn.microsoft.com/search/?terms=System.Nullable%601.Value) property is undefined. That default value is also known as the *null* value of a nullable value type. |


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


## Default value expressions

Use the [`default` operator](../operators/default.md#default-operator) to produce the default value of a type, as the following example shows:

```csharp
int a = default(int);
```

You can use the [`default` literal](../operators/default.md#default-literal) to initialize a variable with the default value of its type:

```csharp
int a = default;
```

## Parameterless constructor of a value type

For a value type, the *implicit* parameterless constructor also produces the default value of the type, as the following example shows:

```csharp
var n = new System.Numerics.Complex();
Console.WriteLine(n);  // output: (0, 0)
```

At runtime, if the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance represents a value type, you can use the [System.Activator.CreateInstance(System.Type)](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance(System.Type)) method to call the parameterless constructor and get the default value of the type.

> **Note:**
> A [structure type](struct.md) (which is a value type) can have an [explicit parameterless constructor](struct.md#struct-initialization-and-default-values) that returns a non-default value of the type. To get the default value of a type, use the `default` operator or the `default` literal.

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [Default values](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/variables.md#93-default-values)
- [Default constructors](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/types.md#833-default-constructors)
- [Parameterless struct constructors](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#1689-constructors)
- [Auto default structs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#16881-field-initializers)

## See also

- [Constructors](../../programming-guide/classes-and-structs/constructors.md)
