---
title: Structure types
description: "Structure types (struct) give C# lightweight, data-centric value types. See how value semantics, copying, and boxing work, and when to choose a class instead."
ms.date: 01/14/2026
f1_keywords:
  - "struct_CSharpKeyword"
helpviewer_keywords:
  - "struct keyword [C#]"
  - "struct type [C#]"
  - "structure type [C#]"
---
# Structure types (C# reference)

A *structure type* (or *struct type*) is a [value type](value-types.md) that can encapsulate data and related functionality.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Use the `struct` keyword to define a structure type:

[language="csharp" source="snippets/shared/StructType.cs" id="StructExample"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

For information about `ref struct` and `readonly ref struct` types, see the [ref structure types](ref-struct.md) article.

Structure types have *value semantics*. That is, a variable of a structure type contains an instance of the type. By default, the system copies variable values on assignment, when passing an argument to a method, and when returning a method result. For structure-type variables, the system copies an instance of the type. For more information, see [Value types](value-types.md).

Typically, you use structure types to design small data-centric types that provide little or no behavior. For example, .NET uses structure types to represent a number (both [integer](integral-numeric-types.md) and [real](floating-point-numeric-types.md)), a [Boolean value](bool.md), a [Unicode character](char.md), and a [time instance](https://learn.microsoft.com/search/?terms=System.DateTime). If you're focused on the behavior of a type, consider defining a [class](../keywords/class.md). Class types have *reference semantics*. That is, a variable of a class type contains a reference to an instance of the type, not the instance itself.

Because structure types have value semantics, we recommend you define *immutable* structure types.

## `readonly` struct

Use the `readonly` modifier to declare that a structure type is immutable. All data members of a `readonly` struct must be read-only as follows:

- Any field declaration must have the [`readonly` modifier](../keywords/readonly.md).
- Any property, including automatically implemented ones, must be read-only or [`init` only](../keywords/init.md). Init-only setters are only available from [C# version 9 onwards](../../whats-new/csharp-version-history.md).

This rule guarantees that no member of a `readonly` struct modifies the state of the struct. All other instance members except constructors are implicitly [`readonly`](#readonly-instance-members).

> **Note:**
> In a `readonly` struct, a data member of a mutable reference type still can mutate its own state. For example, you can't replace a [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) instance, but you can add new elements to it.

The following code defines a `readonly` struct with init-only property setters:

[language="csharp" source="snippets/shared/StructType.cs" id="ReadonlyStruct"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

## `readonly` instance members

Use the `readonly` modifier to declare that an instance member doesn't modify the state of a struct. If you can't declare the whole structure type as `readonly`, use the `readonly` modifier to mark the instance members that don't modify the state of the struct.

Within a `readonly` instance member, you can't assign to the structure's instance fields. However, a `readonly` member can call a non-`readonly` member. In that case, the compiler creates a copy of the structure instance and calls the non-`readonly` member on that copy. As a result, the original structure instance isn't modified.

Typically, you apply the `readonly` modifier to the following kinds of instance members:

- Methods:

  [language="csharp" source="snippets/shared/StructType.cs" id="ReadonlyMethod"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

  You can also apply the `readonly` modifier to methods that override methods declared in [System.Object](https://learn.microsoft.com/search/?terms=System.Object):

  [language="csharp" source="snippets/shared/StructType.cs" id="ReadonlyOverride"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

- Properties and indexers:

  [language="csharp" source="snippets/shared/StructType.cs" id="ReadonlyProperty"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

  If you need to apply the `readonly` modifier to both accessors of a property or indexer, apply it in the declaration of the property or indexer.

  > **Note:**
  > The compiler declares a `get` accessor of an [automatically implemented property](../../programming-guide/classes-and-structs/auto-implemented-properties.md) as `readonly`, regardless of the presence of the `readonly` modifier in a property declaration.

  You can apply the `readonly` modifier to a property or indexer with an `init` accessor:

  [language="csharp" source="snippets/shared/StructType.cs" id="ReadonlyWithInit"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

You can apply the `readonly` modifier to static fields of a structure type, but not to any other static members, such as properties or methods.

The compiler can make use of the `readonly` modifier for performance optimizations. For more information, see [Avoiding allocations](../../advanced-topics/performance/index.md).

## Nondestructive mutation

Use the [`with` expression](../operators/with-expression.md) to create a copy of a structure-type instance with the specified properties and fields changed. Use [object initializer](../../programming-guide/classes-and-structs/object-and-collection-initializers.md) syntax to specify which members to modify and their new values, as the following example shows:

[language="csharp" source="snippets/shared/StructType.cs" id="WithExpression"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

## `record` struct

You can define record structure types. Record types provide built-in functionality for encapsulating data. You can define both `record struct` and `readonly record struct` types. A record struct can't be a [`ref struct`](ref-struct.md). For more information and examples, see [Records](record.md).

## Inline arrays

Starting with C# 12, you can declare *inline arrays* as a `struct` type:

[language="csharp" source="snippets/shared/StructType.cs" id="DeclareInlineArray"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

An inline array is a structure that contains a contiguous block of N elements of the same type. It's a safe-code equivalent of the [fixed buffer](../unsafe-code.md#fixed-size-buffers) declaration available only in unsafe code. An inline array is a `struct` with the following characteristics:

- It contains a single field.
- The struct doesn't specify an explicit layout.

In addition, the compiler validates the [System.Runtime.CompilerServices.InlineArrayAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.InlineArrayAttribute) attribute:

- The length must be greater than zero (`> 0`).
- The target type must be a struct.

In most cases, you can access an inline array like an array, both to read and write values. You can also use the [range](../operators/member-access-operators.md#range-operator-) and [index](../operators/member-access-operators.md#indexer-access) operators.

There are minimal restrictions on the type of the single field of an inline array. It can't be a pointer type:

[language="csharp" source="snippets/shared/StructType.cs" id="DeclareInlineArrayWithPointer"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

But it can be any reference type, or any value type:

[language="csharp" source="snippets/shared/StructType.cs" id="DeclareInlineArrayWithReferenceType"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

You can use inline arrays with almost any C# data structure.

Inline arrays are an advanced language feature. They're intended for high-performance scenarios where an inline, contiguous block of elements is faster than other alternative data structures. You can learn more about inline arrays from [§16.6 Inline arrays](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#166-inline-arrays) in the C# standard.

## Struct initialization and default values

A variable of a `struct` type directly contains the data for that `struct`. This direct data storage creates a distinction between an uninitialized `struct`, which has its default value, and an initialized `struct`, which stores values set by constructing it. For example, consider the following code:

[language="csharp" source="snippets/shared/StructType.cs" id="ParameterlessConstructor"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

As the preceding example shows, the [default value expression](../operators/default.md) ignores a parameterless constructor and produces the [default value](default-values.md) of the structure type. Structure-type array instantiation also ignores a parameterless constructor and produces an array populated with the default values of a structure type.

The most common situation where you see default values is in arrays or in other collections where internal storage includes blocks of variables. The following example creates an array of 30 `TemperatureRange` structures, each of which has the default value:

```csharp
// All elements have default values of 0:
TemperatureRange[] lastMonth = new TemperatureRange[30];
```

All of a struct's member fields must be *definitely assigned* when created because `struct` types directly store their data. The `default` value of a struct *definitely assigns* all fields to 0. All fields must be definitely assigned when a constructor is invoked. You initialize fields by using the following mechanisms:

- Add *field initializers* to any field or auto-implemented property.
- Initialize any fields or auto properties in the body of the constructor.

If you don't initialize all fields in a struct, the compiler adds code to the constructor that initializes those fields to the default value. A struct assigned to its `default` value is initialized to the 0-bit pattern. A struct initialized with `new` is initialized to the 0-bit pattern, followed by executing any field initializers and a constructor.

[language="csharp" source="snippets/shared/StructType.cs" id="FieldInitializer"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

Every `struct` has a `public` parameterless constructor. If you write a parameterless constructor, it must be public. If a struct declares any field initializers, it must explicitly declare a constructor. That constructor need not be parameterless. If a struct declares a field initializer but no constructors, the compiler reports an error. Any explicitly declared constructor (with parameters, or parameterless) executes all field initializers for that struct. All fields without a field initializer or an assignment in a constructor are set to the [default value](default-values.md). For more information, see the [C# language specification—Constructors](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#1689-constructors).

Beginning with C# 12, `struct` types can define a [primary constructor](../../programming-guide/classes-and-structs/instance-constructors.md#primary-constructors) as part of its declaration. Primary constructors provide a concise syntax for constructor parameters that can be used throughout the `struct` body, in any member declaration for that struct.

If all instance fields of a structure type are accessible, you can also instantiate it without the `new` operator. In that case, you must initialize all instance fields before the first use of the instance. The following example shows how to do that:

[language="csharp" source="snippets/shared/StructType.cs" id="SnippetWithoutNew"::: (complete source file; reference: snippets/shared/StructType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/StructType.cs.md)

For the [built-in value types](value-types.md#built-in-value-types), use the corresponding literals to specify a value of the type.

## Limitations with the design of a structure type

Structs have most of the capabilities of a [class](../keywords/class.md) type. There are some exceptions:

- A structure type can't inherit from other class or structure type and it can't be the base of a class. However, a structure type can implement [interfaces](../keywords/interface.md).
- You can't declare a [finalizer](../../programming-guide/classes-and-structs/finalizers.md) within a structure type.
- A constructor of a structure type must initialize all instance fields of the type.

## Passing structure-type variables by reference

When you pass a structure-type variable to a method as an argument or return a structure-type value from a method, the whole instance of a structure type is copied. Pass by value can affect the performance of your code in high-performance scenarios that involve large structure types. You can avoid value copying by passing a structure-type variable by reference. Use the `ref`, `out`, `in`, or `ref readonly` method parameter modifiers to indicate that an argument must be [passed by reference](../keywords/method-parameters.md#reference-parameters). Use [ref returns](../statements/jump-statements.md#the-return-statement) to return a method result by reference. For more information, see [Avoid allocations](../../advanced-topics/performance/index.md).

## `struct` constraint

Use the `struct` keyword in the [`struct` constraint](../../programming-guide/generics/constraints-on-type-parameters.md) to specify that a type parameter is a non-nullable value type. Both structure and [enumeration](enum.md) types satisfy the `struct` constraint.

## Conversions

For any structure type (except [`ref struct`](ref-struct.md) types), [boxing and unboxing](../../programming-guide/types/boxing-and-unboxing.md) conversions exist to and from the [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType) and [System.Object](https://learn.microsoft.com/search/?terms=System.Object) types. Boxing and unboxing conversions also exist between a structure type and any interface that it implements.

## C# language specification

For more information, see the [Structs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md), specifically the following clauses:

- [Readonly structs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#1622-struct-modifiers)
- [Readonly instance members](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#163-struct-members)
- [Parameterless struct constructors](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#1689-constructors)
- [Allow `with` expression on structs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1210-with-expressions)
- [Record structs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#165-record-structs)

You can also read about [Auto default structs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/structs.md#16881-field-initializers) in the C# language specification.

## See also

- [The C# type system](../../fundamentals/types/index.md)
- [Design guidelines - Choosing between class and struct](../../../standard/design-guidelines/choosing-between-class-and-struct.md)
- [Design guidelines - Struct design](../../../standard/design-guidelines/struct.md)
- [Resolve errors and warnings with inline array declarations](../compiler-messages/inline-array-errors.md)
