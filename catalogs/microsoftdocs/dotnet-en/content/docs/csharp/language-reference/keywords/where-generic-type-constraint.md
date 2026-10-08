---
description: "where (generic type constraint) - C# Reference"
title: "where (generic type constraint)"
ms.date: 01/22/2026
f1_keywords:
  - "whereconstraint"
  - "whereconstraint_CSharpKeyword"
  - "classconstraint_CSharpKeyword"
  - "structconstraint_CSharpKeyword"
  - "enumconstraint_CSharpKeyword"
  - "allows_CsharpKeyword"
helpviewer_keywords:
  - "where (generic type constraint) [C#]"
---
# where (generic type constraint) (C# Reference)

In a generic definition, use the `where` clause to specify constraints on the types that you use as arguments for type parameters in a generic type, method, delegate, or local function. You can specify interfaces, base classes, or require a generic type to be a reference, value, or unmanaged type. These constraints declare capabilities that the type argument must have. Place the `where` clause after any declared base class or implemented interfaces.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


For example, you can declare a generic class, `AGenericClass`, such that the type parameter `T` implements the [System.IComparable`1](https://learn.microsoft.com/search/?terms=System.IComparable%601) interface:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet1"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

> **Note:**
> For more information on the where clause in a query expression, see [where clause](where-clause.md).

The `where` clause can also include a base class constraint. The base class constraint states that a type to use as a type argument for that generic type has the specified class as a base class, or is that base class. If you use the base class constraint, it must appear before any other constraints on that type parameter. Some types are disallowed as a base class constraint: [System.Object](https://learn.microsoft.com/search/?terms=System.Object), [System.Array](https://learn.microsoft.com/search/?terms=System.Array), and [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType). The following example shows the types that you can specify as a base class:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet2"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

In a nullable context, the compiler enforces the nullability of the base class type. If the base class is non-nullable (for example `Base`), the type argument must be non-nullable. If the base class is nullable (for example `Base?`), the type argument can be either a nullable or non-nullable reference type. The compiler issues a warning if the type argument is a nullable reference type when the base class is non-nullable.

The `where` clause can specify that the type is a `class` or a `struct`. The `struct` constraint removes the need to specify a base class constraint of `System.ValueType`. The `System.ValueType` type can't be used as a base class constraint. The following example shows both the `class` and `struct` constraints:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet3"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

In a nullable context, the `class` constraint requires a type to be a non-nullable reference type. To allow nullable reference types, use the `class?` constraint, which allows both nullable and non-nullable reference types.

The `where` clause can include the `notnull` constraint. The `notnull` constraint limits the type parameter to non-nullable types. The type can be a [value type](../builtin-types/value-types.md) or a non-nullable reference type. The `notnull` constraint is available for code compiled in a [`nullable enable` context](../builtin-types/nullable-reference-types.md#nullable-context). Unlike other constraints, if a type argument violates the `notnull` constraint, the compiler generates a warning instead of an error. Warnings are only generated in a `nullable enable` context.

The addition of nullable reference types introduces a potential ambiguity in the meaning of `T?` in generic methods. If `T` is a `struct`, `T?` is the same as [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601). However, if `T` is a reference type, `T?` means that `null` is a valid value. The ambiguity arises because overriding methods can't include constraints. The new `default` constraint resolves this ambiguity. Add it when a base class or interface declares two overloads of a method, one that specifies the `struct` constraint, and one that doesn't have either the `struct` or `class` constraint applied:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="BaseClass"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

Use the `default` constraint to specify that your derived class overrides the method without the constraint in your derived class, or explicit interface implementation. It's only valid on methods that override base methods, or explicit interface implementations:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="DerivedClass"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

> **Important:**
> You can use generic declarations that include the `notnull` constraint in a nullable oblivious context, but the compiler doesn't enforce the constraint.

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="NotNull"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

The `where` clause can also include an `unmanaged` constraint. The `unmanaged` constraint limits the type parameter to types known as [unmanaged types](../builtin-types/unmanaged-types.md). The `unmanaged` constraint makes it easier to write low-level interop code in C#. This constraint enables reusable routines across all unmanaged types. The `unmanaged` constraint can't be combined with the `class` or `struct` constraint. The `unmanaged` constraint enforces that the type must be a `struct`:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet4"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

The `where` clause can also include a constructor constraint, `new()`. That constraint makes it possible to create an instance of a type parameter by using the `new` operator. The [new() Constraint](new-constraint.md) lets the compiler know that any type argument supplied must have an accessible parameterless constructor. For example:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet5"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

The `new()` constraint appears last in the `where` clause, unless it's followed by the `allows ref struct` anti-constraint. The `new()` constraint can't be combined with the `struct` or `unmanaged` constraints. All types satisfying those constraints must have an accessible parameterless constructor, making the `new()` constraint redundant.

This anti-constraint declares that the type argument for `T` can be a `ref struct` type. For example:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="SnippetRefStruct"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

The generic type or method must obey ref safety rules for any instance of `T` because it might be a `ref struct`. The `allows ref struct` clause can't be combined with the `class` or `class?` constraint. The `allows ref struct` anti-constraint must follow all constraints for that type argument.

With multiple type parameters, use one `where` clause for each type parameter, for example:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet6"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

You can also attach constraints to type parameters of generic methods, as shown in the following example:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet7"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

The syntax to describe type parameter constraints on delegates is the same as that of methods:

[language="csharp" source="snippets/GenericWhereConstraints.cs" ID="Snippet8"::: (complete source file; reference: snippets/GenericWhereConstraints.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/GenericWhereConstraints.cs.md)

For information on generic delegates, see [Generic Delegates](../../programming-guide/generics/generic-delegates.md).

For details on the syntax and use of constraints, see [Constraints on Type Parameters](../../programming-guide/generics/constraints-on-type-parameters.md).

## C# language specification

 For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [Introduction to Generics](../../fundamentals/types/generics.md)
- [new Constraint](new-constraint.md)
- [Constraints on Type Parameters](../../programming-guide/generics/constraints-on-type-parameters.md)
