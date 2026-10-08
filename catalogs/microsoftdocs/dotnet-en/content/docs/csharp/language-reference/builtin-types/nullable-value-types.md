---
title: "Nullable value types"
description: Learn about C# nullable value types and how to use them
ms.date: 01/14/2026
helpviewer_keywords:
  - "nullable value types [C#]"
---
# Nullable value types (C# reference)

A *nullable value type* `T?` represents all values of its underlying [value type](value-types.md) `T` and an additional [null](../keywords/null.md) value. For example, you can assign any of the following three values to a `bool?` variable: `true`, `false`, or `null`. An underlying value type `T` can't be a nullable value type itself.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Any nullable value type is an instance of the generic [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601) structure. You can refer to a nullable value type with an underlying type `T` in any of the following interchangeable forms: `Nullable<T>` or `T?`.

Typically, use a nullable value type when you need to represent the undefined value of an underlying value type. For example, a Boolean, or `bool`, variable can only be either `true` or `false`. However, in some applications a variable value can be undefined or missing. For example, a database field may contain `true` or `false`, or it might contain no value at all, that is, `NULL`. You can use the `bool?` type in that scenario.

## Declaration and assignment

Because a value type is implicitly convertible to the corresponding nullable value type, you can assign a value to a variable of a nullable value type as you do that for its underlying value type. You can also assign the `null` value. For example:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="Declaration"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

The default value of a nullable value type represents `null`. It's an instance whose [System.Nullable`1.HasValue](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue) property returns `false`.

## Examination of an instance of a nullable value type

To check an instance of a nullable value type for `null` and get a value of an underlying type, use the [`is` operator with a type pattern](../operators/type-testing-and-cast.md#type-testing-with-pattern-matching):

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="PatternMatching"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

You can always use the following read-only properties to check and get a value of a nullable value type variable:

- [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) shows whether an instance of a nullable value type has a value of its underlying type.

- [System.Nullable`1.Value*](https://learn.microsoft.com/search/?terms=System.Nullable%601.Value*) gets the value of an underlying type if [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) is `true`. If [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) is `false`, the [System.Nullable`1.Value](https://learn.microsoft.com/search/?terms=System.Nullable%601.Value) property throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException).

The following example uses the `HasValue` property to check whether the variable contains a value before displaying it:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="HasValue"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

You can also compare a variable of a nullable value type with `null` instead of using the `HasValue` property, as the following example shows:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="CompareWithNull"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

## Conversion from a nullable value type to an underlying type

If you want to assign a value of a nullable value type to a non-nullable value type variable, you might need to specify the value to assign in place of `null`. Use the [null-coalescing operator `??`](../operators/null-coalescing-operator.md) to do that. You can also use the [System.Nullable`1.GetValueOrDefault(`0)](https://learn.microsoft.com/search/?terms=System.Nullable%601.GetValueOrDefault(%600)) method for the same purpose:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="NullCoalescing"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

If you want to use the [default](default-values.md) value of the underlying value type in place of `null`, use the [System.Nullable`1.GetValueOrDefault](https://learn.microsoft.com/search/?terms=System.Nullable%601.GetValueOrDefault) method.

You can also explicitly cast a nullable value type to a non-nullable type, as the following example shows:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="Cast"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

At run time, if the value of a nullable value type is `null`, the explicit cast throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException).

A non-nullable value type `T` is implicitly convertible to the corresponding nullable value type `T?`.

## Lifted operators

A nullable value type `T?` supports the predefined unary and binary [operators](../operators/index.md) or any overloaded operators that a value type `T` supports. These operators, also known as *lifted operators*, return `null` if one or both operands are `null`. Otherwise, the operator uses the contained values of its operands to calculate the result. For example:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="LiftedOperator"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

> **Note:**
> For the `bool?` type, the predefined `&` and `|` operators don't follow the rules described in this section: the result of an operator evaluation can be non-null even if one of the operands is `null`. For more information, see the [Nullable Boolean logical operators](../operators/boolean-logical-operators.md#nullable-boolean-logical-operators) section of the [Boolean logical operators](../operators/boolean-logical-operators.md) article.

For the [comparison operators](../operators/comparison-operators.md) `<`, `>`, `<=`, and `>=`, if one or both operands are `null`, the result is `false`. Otherwise, the contained values of operands are compared. Don't assume that because a particular comparison (for example, `<=`) returns `false`, the opposite comparison (`>`) returns `true`. The following example shows that 10 is

- neither greater than or equal to `null`
- nor less than `null`

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="ComparisonOperators"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

For the [equality operator](../operators/equality-operators.md#equality-operator-) `==`, if both operands are `null`, the result is `true`. If only one of the operands is `null`, the result is `false`. Otherwise, the contained values of operands are compared.

For the [inequality operator](../operators/equality-operators.md#inequality-operator-) `!=`, if both operands are `null`, the result is `false`. If only one of the operands is `null`, the result is `true`. Otherwise, the contained values of operands are compared.

If a [user-defined conversion](../operators/user-defined-conversion-operators.md) exists between two value types, the same conversion can also be used between the corresponding nullable value types.

## Boxing and unboxing

The following rules apply when you [box](../../programming-guide/types/boxing-and-unboxing.md) an instance of a nullable value type `T?`:

- If [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) returns `false`, the boxing operation returns the null reference.
- If [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) returns `true`, the boxing operation boxes the corresponding value of the underlying value type `T`, not the instance of [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601).

You can unbox a boxed value of a value type `T` to the corresponding nullable value type `T?`, as the following example shows:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="Boxing"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

## How to identify a nullable value type

The following example shows how to determine whether a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance represents a constructed nullable value type, that is, the [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601) type with a specified type parameter `T`:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="IsTypeNullable"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

As the example shows, you use the [typeof](../operators/type-testing-and-cast.md#the-typeof-operator) operator to create a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance.

If you want to determine whether an instance is of a nullable value type, don't use the [System.Object.GetType*](https://learn.microsoft.com/search/?terms=System.Object.GetType*) method to get a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance to test by using the preceding code. When you call the [System.Object.GetType*](https://learn.microsoft.com/search/?terms=System.Object.GetType*) method on an instance of a nullable value type, the instance is [boxed](#boxing-and-unboxing) to [System.Object](https://learn.microsoft.com/search/?terms=System.Object). Because boxing a non-null instance of a nullable value type is equivalent to boxing a value of the underlying type, [System.Object.GetType*](https://learn.microsoft.com/search/?terms=System.Object.GetType*) returns a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance that represents the underlying type of a nullable value type:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="GetType"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

Also, don't use the [is](../operators/type-testing-and-cast.md#the-is-operator) operator to determine whether an instance is of a nullable value type. As the following example shows, you can't distinguish types of a nullable value type instance and its underlying type instance by using the `is` operator:

[language="csharp" source="snippets/shared/NullableValueTypes.cs" id="IsOperator"::: (complete source file; reference: snippets/shared/NullableValueTypes.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/NullableValueTypes.cs.md)

Instead, use the [System.Nullable.GetUnderlyingType*](https://learn.microsoft.com/search/?terms=System.Nullable.GetUnderlyingType*) method from the first example and the [typeof](../operators/type-testing-and-cast.md#the-typeof-operator) operator to check if an instance is of a nullable value type.

> **Note:**
> The methods described in this section don't apply to [nullable reference types](nullable-reference-types.md).

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [Nullable types](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/types.md#8312-nullable-value-types)
- [Lifted operators](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1248-lifted-operators)
- [Implicit nullable conversions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/conversions.md#1026-implicit-nullable-conversions)
- [Explicit nullable conversions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/conversions.md#1034-explicit-nullable-conversions)
- [Lifted conversion operators](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/conversions.md#1062-lifted-conversions)

## See also

- [What exactly does 'lifted' mean?](https://learn.microsoft.com/archive/blogs/ericlippert/what-exactly-does-lifted-mean)
- [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601)
- [System.Nullable](https://learn.microsoft.com/search/?terms=System.Nullable)
- [System.Nullable.GetUnderlyingType*](https://learn.microsoft.com/search/?terms=System.Nullable.GetUnderlyingType*)
- [Nullable reference types](nullable-reference-types.md)
