---
title: "Generic types and methods"
description: Learn how to use generic types and methods in C#, including consuming common generic collections, type inference, constraints, collection expressions, dictionary expressions, and covariance and contravariance.
ms.date: 04/10/2026
ms.topic: concept-article
ai-usage: ai-assisted
---
# Generic types and methods

> **Tip:**
> **New to developing software?** Start with the [Get started](../../tour-of-csharp/tutorials/index.md) tutorials first. You'll encounter generics as soon as you use collections like `List<T>`.
>
> **Experienced in another language?** C# generics are similar to generics in Java or templates in C++, but with full runtime type information and no type erasure. Skim the [collection expressions](#collection-expressions) and [covariance and contravariance](#covariance-and-contravariance) sections for C#-specific patterns.

*Generics* let you write code that works with any type while keeping full type safety. Instead of writing separate classes or methods for `int`, `string`, and every other type you need, write one version with one or more *type parameters* (such as `T`, or `TKey` and `TValue`) and specify the actual types when you use it. The compiler checks types at compile time, so you don't need runtime casts or risk `InvalidCastException`.

You encounter generics constantly in everyday C#. Collections, async return types, delegates, and LINQ all rely on generic types:

[language="csharp" source="snippets/generics/Program.cs" ID="EverydayGenerics"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

In each case, the type argument in angle brackets (`<int>`, `<string>`, `<decimal>`) tells the generic type what kind of data it holds or operates on. The compiler enforces type safety. You can't accidentally add a `string` to a `List<int>`.

## Consuming generic types

More often, you *consume* generic types from the .NET class library rather than creating your own. The following sections show the most common generic types you'll use.

### Generic collections

The [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic) namespace provides type-safe collection classes. Always use these collections instead of nongeneric collections like [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList):

[language="csharp" source="snippets/generics/Program.cs" ID="GenericCollections"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

Generic collections prevent type errors at runtime because the errors surface at compile time instead. These collections also avoid boxing for value types, which improves performance.

### Generic methods

A generic method declares its own type parameter. The compiler often *infers* the type argument from the values you pass, so you don't need to specify it explicitly:

[language="csharp" source="snippets/generics/Program.cs" ID="GenericMethods"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

In the call `Print(42)`, the compiler infers `T` as `int` from the argument. You can write `Print<int>(42)` explicitly, but type inference keeps the code cleaner.

## Collection expressions

Collection expressions (C# 12) provide a concise syntax for creating collections. Use square brackets instead of constructor calls or initializer syntax:

[language="csharp" source="snippets/generics/Program.cs" ID="CollectionExpressions"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

The *spread operator* (`..`) inlines the elements of one collection into another, which is useful for combining sequences:

[language="csharp" source="snippets/generics/Program.cs" ID="SpreadOperator"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

Collection expressions work with arrays, `List<T>`, `Span<T>`, `ImmutableArray<T>`, and any type that supports the collection builder pattern. For the complete syntax reference, see [Collection expressions](../../language-reference/operators/collection-expressions.md).

## Dictionary initialization

You can initialize dictionaries concisely with indexer initializers. This syntax uses square brackets to set key-value pairs:

[language="csharp" source="snippets/generics/Program.cs" ID="DictionaryExpressions"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

You can merge dictionaries by copying one and applying overrides:

[language="csharp" source="snippets/generics/Program.cs" ID="DictionarySpread"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

## Type constraints

*Constraints* restrict which type arguments a generic type or method accepts. Constraints let you call methods or access properties on the type parameter that wouldn't be available on `object` alone:

[language="csharp" source="snippets/generics/Program.cs" ID="BasicConstraints"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

The most common constraints are:

| Constraint | Meaning |
| --- | --- |
| `where T : class` | `T` must be a reference type |
| `where T : struct` | `T` must be a non-nullable value type |
| `where T : new()` | `T` must have a public parameterless constructor |
| `where T : BaseClass` | `T` must derive from `BaseClass` |
| `where T : IInterface` | `T` must implement `IInterface` |

You can combine constraints: `where T : class, IComparable<T>, new()`. Less common constraints include `where T : System.Enum`, `where T : System.Delegate`, and `where T : unmanaged` for specialized scenarios. For the complete list, see [Constraints on type parameters](../../programming-guide/generics/constraints-on-type-parameters.md).

## Covariance and contravariance

*Covariance* and *contravariance* describe how generic types behave with inheritance. They determine whether you can use a more derived or less derived type argument than originally specified:

[language="csharp" source="snippets/generics/Program.cs" ID="Variance"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

- **Covariance** (`out T`): An `IEnumerable<Dog>` can be used where `IEnumerable<Animal>` is expected because `Dog` derives from `Animal`. The `out` keyword on the type parameter enables this. Covariant type parameters can only appear in output positions (return types).
- **Contravariance** (`in T`): An `Action<Animal>` can be used where `Action<Dog>` is expected because any action that handles `Animal` can also handle `Dog`. The `in` keyword enables this. Contravariant type parameters can only appear in input positions (parameters).

Many built-in interfaces and delegates are already variant: `IEnumerable<out T>`, `IReadOnlyList<out T>`, `Func<out TResult>`, and `Action<in T>`. You benefit from variance automatically when working with these types. For an in-depth treatment of designing variant interfaces and delegates, see [Covariance and contravariance](../../programming-guide/concepts/covariance-contravariance/index.md).

## Create your own generic types

You can define your own generic classes, structs, interfaces, and methods. The following example shows a simple generic linked list for illustration. In practice, use [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) or another built-in collection:

[language="csharp" source="snippets/generics/Program.cs" ID="CustomGeneric"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

[language="csharp" source="snippets/generics/Program.cs" ID="UseCustomGeneric"::: (complete source file; reference: snippets/generics/Program.cs)](../../../../_code/docs/csharp/fundamentals/types/snippets/generics/Program.cs.md)

Generic types aren't limited to classes. You can define generic `interface`, `struct`, and `record` types. For more information about designing generic algorithms and complex constraint combinations, see [Generics in .NET](../../../standard/generics/index.md).

## See also

- [Generics in .NET](../../../standard/generics/index.md)
- [Collection expressions](../../language-reference/operators/collection-expressions.md)
- [Constraints on type parameters](../../programming-guide/generics/constraints-on-type-parameters.md)
- [Covariance and contravariance](../../programming-guide/concepts/covariance-contravariance/index.md)
- [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic)
