---
title: "Pointer related operators - access memory and dereference memory locations"
description: "Learn about C# operators that you can use when working with pointers. You use these operators to access memory, index memory locations and dereference the storage at a memory location"
ms.date: 06/16/2026
author: pkulikov
f1_keywords: 
  - "->_CSharpKeyword"
helpviewer_keywords: 
  - "pointer related operators [C#]"
  - "address-of operator [C#]"
  - "& operator [C#]"
  - "pointer indirection operator [C#]"
  - "dereference operator [C#]"
  - "* operator [C#]"
  - "pointer member access operator [C#]"
  - "-> operator [C#]"
  - "pointer element access [C#]"
  - "[] operator [C#]"
  - "pointer arithmetic [C#]"
  - "pointer increment [C#]"
  - "pointer decrement [C#]"
  - "pointer comparison [C#]"
---
# Pointer related operators - take the address of variables, dereference storage locations, and access memory locations

The pointer operators enable you to take the address of a variable (`&`), dereference a pointer (`*`), compare pointer values, and add or subtract pointers and integers.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Use the following operators to work with pointers:

- Unary [`&` (address-of)](#address-of-operator-) operator: to get the address of a variable
- Unary [`*` (pointer indirection)](#pointer-indirection-operator-) operator: to get the variable pointed to by a pointer
- The [`->` (member access)](#pointer-member-access-operator--) and [`[]` (element access)](#pointer-element-access-operator-) operators
- Arithmetic operators [`+`, `-`, `++`, and `--`](#pointer-arithmetic-operators)
- Comparison operators [`==`, `!=`, `<`, `>`, `<=`, and `>=`](#pointer-comparison-operators)

For information about pointer types, see [Pointer types](../unsafe-code.md#pointer-types).

> **Note:**
> Most operations with pointers require an [unsafe](../keywords/unsafe.md) context, and you must compile unsafe code with the [**AllowUnsafeBlocks**](../compiler-options/language.md#allowunsafeblocks) compiler option.
> The [memory safety](../unsafe-code.md#the-updated-memory-safety-model-preview) preview feature available in C# 15 lets you use the address-of `&` operator outside an `unsafe` context. Even when enabled, the pointer indirection, member access, and element access operators that read or write the pointed-to memory still require an `unsafe` context.

## <a name="address-of-operator-"></a> Address-of operator &amp;

The unary `&` operator returns the address of its operand:

[language="csharp" source="snippets/shared/PointerOperators.cs" id="AddressOf"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

The operand of the `&` operator must be a fixed variable. *Fixed* variables are variables that reside in storage locations the [garbage collector](../../../standard/garbage-collection/index.md) doesn't affect. In the preceding example, the local variable `number` is a fixed variable because it resides on the stack. Variables that reside in storage locations the garbage collector can affect (for example, relocate) are called *movable* variables. Object fields and array elements are examples of movable variables. You can get the address of a movable variable if you "fix", or "pin", it by using a [`fixed` statement](../statements/fixed.md). The obtained address is valid only inside the block of a `fixed` statement. The following example shows how to use a `fixed` statement and the `&` operator:

[language="csharp" source="snippets/shared/PointerOperators.cs" id="AddressOfFixed"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

You can't get the address of a constant or a value.

For more information about fixed and movable variables, see the [Fixed and moveable variables](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#244-fixed-and-moveable-variables) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

The binary `&` operator computes the [logical AND](boolean-logical-operators.md#logical-and-operator-) of its Boolean operands or the [bitwise logical AND](bitwise-and-shift-operators.md#logical-and-operator-) of its integral operands.

## Pointer indirection operator *

The unary pointer indirection operator `*` accesses the variable to which its operand points. It's also known as the dereference operator. The operand of the `*` operator must be of a pointer type.

[language="csharp" source="snippets/shared/PointerOperators.cs" id="PointerIndirection"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

You can't apply the `*` operator to an expression of type `void*`.

The binary `*` operator computes the [product](arithmetic-operators.md#multiplication-operator-) of its numeric operands.

## Pointer member access operator `->`

The `->` operator combines [pointer indirection](#pointer-indirection-operator-) and [member access](member-access-operators.md#member-access-expression-). If `x` is a pointer of type `T*` and `y` is an accessible member of type `T`, an expression of the form

```csharp
x->y
```

is equivalent to

```csharp
(*x).y
```

The following example demonstrates the usage of the `->` operator:

[language="csharp" source="snippets/shared/PointerOperators.cs" id="MemberAccess"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

You can't use the `->` operator on an expression of type `void*`.

## Pointer element access operator `[]`

For an expression `p` of a pointer type, a pointer element access of the form `p[n]` is evaluated as `*(p + n)`. The value `n` must be of a type implicitly convertible to `int`, `uint`, `long`, or `ulong`. For information about the behavior of the `+` operator with pointers, see the [Addition or subtraction of an integral value to or from a pointer](#add-or-subtract-an-integral-value-to-or-from-a-pointer) section.

The following example demonstrates how to access array elements by using a pointer and the `[]` operator:

[language="csharp" source="snippets/shared/PointerOperators.cs" id="ElementAccess"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

In the preceding example, a [`stackalloc` expression](stackalloc.md) allocates a block of memory on the stack.

> **Note:**
> The pointer element access operator doesn't check for out-of-bounds errors.

You can't use `[]` for pointer element access with an expression of type `void*`.

You can also use the `[]` operator for [array element or indexer access](member-access-operators.md#indexer-operator-).

## Pointer arithmetic operators

You can perform the following arithmetic operations with pointers:

- Add or subtract an integral value to or from a pointer
- Subtract two pointers
- Increment or decrement a pointer

You can't perform those operations with pointers of type `void*`.

For information about supported arithmetic operations by using numeric types, see [Arithmetic operators](arithmetic-operators.md).

### Add or subtract an integral value to or from a pointer

For a pointer `p` of type `T*` and an expression `n` of a type implicitly convertible to `int`, `uint`, `long`, or `ulong`, addition and subtraction work as follows:

- Both `p + n` and `n + p` give you a pointer of type `T*`. You get this pointer by adding `n * sizeof(T)` to the address that `p` points to.
- The `p - n` expression gives you a pointer of type `T*`. You get this pointer by subtracting `n * sizeof(T)` from the address that `p` points to.

The [`sizeof` operator](sizeof.md) gets the size of a type in bytes.

The following example shows how to use the `+` operator with a pointer:

[language="csharp" source="snippets/shared/PointerOperators.cs" id="AddNumber"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

### Pointer subtraction

For two pointers `p1` and `p2` of type `T*`, the expression `p1 - p2` gives you the difference between the addresses that `p1` and `p2` point to, divided by `sizeof(T)`. The result is of type `long`. In other words, `p1 - p2` is calculated as `((long)(p1) - (long)(p2)) / sizeof(T)`.

The following example shows pointer subtraction:

[language="csharp" source="snippets/shared/PointerOperators.cs" id="SubtractPointers"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

### Pointer increment and decrement

The `++` increment operator [adds](#add-or-subtract-an-integral-value-to-or-from-a-pointer) 1 to its pointer operand. The `--` decrement operator [subtracts](#add-or-subtract-an-integral-value-to-or-from-a-pointer) 1 from its pointer operand.

Both operators support two forms: postfix (`p++` and `p--`) and prefix (`++p` and `--p`). The result of `p++` and `p--` is the value of `p` *before* the operation. The result of `++p` and `--p` is the value of `p` *after* the operation.

The following example demonstrates the behavior of both postfix and prefix increment operators:

[language="csharp" source="snippets/shared/PointerOperators.cs" id="Increment"::: (complete source file; reference: snippets/shared/PointerOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/PointerOperators.cs.md)

## Pointer comparison operators

You can use the `==`, `!=`, `<`, `>`, `<=`, and `>=` operators to compare operands of any pointer type, including `void*`. These operators compare the addresses given by the two operands as if they're unsigned integers.

For information about the behavior of those operators for operands of other types, see the [Equality operators](equality-operators.md) and [Comparison operators](comparison-operators.md) articles.

## Operator precedence

The following list orders pointer related operators in groups starting from the highest precedence to the lowest:

- ([Primary](index.md#operator-precedence)) operators: postfix increment `x++` and decrement `x--` operators and the `->` and `[]` operators.
- ([Unary](index.md#operator-precedence)) operators: prefix increment `++x` and decrement `--x` operators and the address-of `&` and indirection `*` operators.
- ([Additive](index.md#operator-precedence)) operators: binary `+` and `-` operators.
- ([Relational and type-testing](index.md#operator-precedence)) operators: comparison `<`, `>`, `<=`, and `>=` operators.
- ([Equality](index.md#operator-precedence)) operators: `==` and `!=` operators.

Use parentheses, `()`, to change the order of evaluation imposed by operator precedence.

For the complete list of C# operators ordered by precedence level, see the [Operator precedence](index.md#operator-precedence) section of the [C# operators](index.md) article.

## Operator overloading

You can't overload the pointer-related operators `&`, `*`, `->`, and `[]` in a user-defined type.

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [Fixed and moveable variables](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#244-fixed-and-moveable-variables)
- [The address-of operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2465-the-address-of-operator)
- [Pointer indirection](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2462-pointer-indirection)
- [Pointer member access](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2463-pointer-member-access)
- [Pointer element access](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2464-pointer-element-access)
- [Pointer arithmetic](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2467-pointer-arithmetic)
- [Pointer increment and decrement](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2466-pointer-increment-and-decrement)
- [Pointer comparison](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2468-pointer-comparison)

## See also

- [C# operators and expressions](index.md)
- [Unsafe code, pointer types, and function pointers](../unsafe-code.md)
- [unsafe keyword](../keywords/unsafe.md)
- [fixed statement](../statements/fixed.md)
- [stackalloc expression](stackalloc.md)
- [sizeof operator](sizeof.md)
