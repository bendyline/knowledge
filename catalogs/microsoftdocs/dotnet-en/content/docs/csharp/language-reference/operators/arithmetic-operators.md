---
title: "Arithmetic operators"
description: "Learn about C# operators that perform multiplication, division, remainder, addition, and subtraction operations with numeric types."
ms.date: 01/20/2026
author: pkulikov
f1_keywords:
  - "++_CSharpKeyword"
  - "--_CSharpKeyword"
  - "*_CSharpKeyword"
  - "/_CSharpKeyword"
  - "%_CSharpKeyword"
  - "+_CSharpKeyword"
  - "-_CSharpKeyword"
  - "%=_CSharpKeyword"
  - "*=_CSharpKeyword"
helpviewer_keywords:
  - "arithmetic operators [C#]"
  - "checked operators [C#]"
  - "increment operator [C#]"
  - "++ operator [C#]"
  - "decrement operator [C#]"
  - "-- operator [C#]"
  - "multiplication operator [C#]"
  - "* operator [C#]"
  - "division operator [C#]"
  - "/ operator [C#]"
  - "remainder operator [C#]"
  - "% operator [C#]"
  - "addition operator [C#]"
  - "+ operator [C#]"
  - "subtraction operator [C#]"
  - "- operator [C#]"
---
# Arithmetic operators (C# reference)

The following operators perform arithmetic operations with operands of numeric types:

- Unary [`++` (increment)](#increment-operator-), [`--` (decrement)](#decrement-operator---), [`+` (plus)](#unary-plus-and-minus-operators), and [`-` (minus)](#unary-plus-and-minus-operators) operators
- Binary [`*` (multiplication)](#multiplication-operator-), [`/` (division)](#division-operator-), [`%` (remainder)](#remainder-operator-), [`+` (addition)](#addition-operator-), and [`-` (subtraction)](#subtraction-operator--) operators

All [integral](../builtin-types/integral-numeric-types.md) and [floating-point](../builtin-types/floating-point-numeric-types.md) numeric types support these operators.

The `int`, `uint`, `long`, and `ulong` types define all these operators. The other integral types (`sbyte`, `byte`, `short`, `ushort`, and `char`) define only the `++` and `--` operators. For the other operators, if you use the integral types `sbyte`, `byte`, `short`, `ushort`, or `char` as operands, the values are converted to the `int` type and the result type is `int`. If the operands are different integral or floating-point types, their values are converted to the closest containing type, if such a type exists. For more information, see the [Numeric promotions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1247-numeric-promotions) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md). The `++` and `--` operators are defined for all integral and floating-point numeric types and the [char](../builtin-types/char.md) type. The result type of a [compound assignment expression](#compound-assignment) is the type of the left-hand operand.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


## Increment operator ++

The unary increment operator `++` increments its operand by 1. The operand must be a variable, a [property](../../programming-guide/classes-and-structs/properties.md) access, or an [indexer](../../programming-guide/indexers/index.md) access.

The increment operator is supported in two forms: the postfix increment operator, `x++`, and the prefix increment operator, `++x`.

### Postfix increment operator

The result of `x++` is the value of `x` *before* the operation, as the following example shows:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="PostfixIncrement"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

### Prefix increment operator

The result of `++x` is the value of `x` *after* the operation, as the following example shows:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="PrefixIncrement"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

## Decrement operator --

The unary decrement operator `--` decrements its operand by 1. The operand must be a variable, a [property](../../programming-guide/classes-and-structs/properties.md) access, or an [indexer](../../programming-guide/indexers/index.md) access.

The decrement operator is available in two forms: the postfix decrement operator, `x--`, and the prefix decrement operator, `--x`.

### Postfix decrement operator

The result of `x--` is the value of `x` *before* the operation, as the following example shows:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="PostfixDecrement"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

### Prefix decrement operator

The result of `--x` is the value of `x` *after* the operation, as the following example shows:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="PrefixDecrement"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

## Unary plus and minus operators

The unary `+` operator returns the value of its operand. The unary `-` operator computes the numeric negation of its operand.

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="UnaryPlusAndMinus"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

The [ulong](../builtin-types/integral-numeric-types.md) type doesn't support the unary `-` operator.

## Multiplication operator *

The multiplication operator `*` computes the product of its operands:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="Multiplication"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

The unary `*` operator is the [pointer indirection operator](pointer-related-operators.md#pointer-indirection-operator-).

## Division operator /

The division operator `/` divides its left-hand operand by its right-hand operand.

### Integer division

For the operands of integer types, the result of the `/` operator is of an integer type and equals the quotient of the two operands rounded toward zero:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="IntegerDivision"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

To get the quotient of the two operands as a floating-point number, use the `float`, `double`, or `decimal` type:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="IntegerAsFloatingPointDivision"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

### Floating-point division

For the `float`, `double`, and `decimal` types, the `/` operator returns the quotient of the two operands:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="FloatingPointDivision"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

If one operand is `decimal`, the other operand can't be `float` or `double`, because neither `float` nor `double` has an implicit conversion to `decimal`. You must explicitly convert the `float` or `double` operand to the `decimal` type. For more information about conversions between numeric types, see [Built-in numeric conversions](../builtin-types/numeric-conversions.md).

## Remainder operator %

The remainder operator `%` computes the remainder after dividing its left-hand operand by its right-hand operand.

### Integer remainder

For operands of integer types, the result of `a % b` is the value produced by $a - \frac{a}{b} \times b$. The sign of the non-zero remainder matches the sign of the left-hand operand, as the following example shows:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="IntegerRemainder"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

Use the [System.Math.DivRem*](https://learn.microsoft.com/search/?terms=System.Math.DivRem*) method to compute both integer division and remainder results.

### Floating-point remainder

For the `float` and `double` operands, the result of `x % y` for the finite `x` and `y` is the value `z` such that

- The sign of `z`, if non-zero, matches the sign of `x`.
- The absolute value of `z` comes from the calculation $|x| - n \times |y|$, where `n` is the largest integer less than or equal to $\frac{|x|}{|y|}$. Here, $|x|$ and $|y|$ represent the absolute values of `x` and `y`, respectively.

> **Note:**
> This method of computing the remainder is similar to the method used for integer operands, but it differs from the IEEE 754 specification. If you need the remainder operation that complies with the IEEE 754 specification, use the [System.Math.IEEERemainder*](https://learn.microsoft.com/search/?terms=System.Math.IEEERemainder*) method.

For information about the behavior of the `%` operator with non-finite operands, see the [Remainder operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12134-remainder-operator) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

For `decimal` operands, the remainder operator `%` works the same as the [remainder operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/language-reference/operators/\[System.Decimal.op_Modulus\(System.Decimal,System.Decimal\)]\(https://learn.microsoft.com/search/?terms=System.Decimal.op_Modulus\(System.Decimal%2CSystem.Decimal\)\)) of the [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) type.

The following example demonstrates how the remainder operator behaves with floating-point operands:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="FloatingPointRemainder"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

## Addition operator +

The addition operator `+` computes the sum of its operands:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="Addition"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

You can also use the `+` operator for string concatenation and delegate combination. For more information, see the [`+` and `+=` operators](addition-operator.md) article.

## Subtraction operator -

The subtraction operator `-` subtracts the right-hand operand from the left-hand operand:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="Subtraction"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

You can also use the `-` operator to remove a delegate. For more information, see the [`-` and `-=` operators](subtraction-operator.md).

## Compound assignment

For a binary operator `op`, a compound assignment expression of the form

```csharp
x op= y
```

Is equivalent to

```csharp
x = x op y
```

Except that `x` is only evaluated once.

The following example demonstrates the usage of compound assignment with arithmetic operators:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="CompoundAssignment"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

Because of [numeric promotions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1247-numeric-promotions), the result of the `op` operation might not be implicitly convertible to the type `T` of `x`. In such a case, if `op` is a predefined operator and the result of the operation is explicitly convertible to the type `T` of `x`, a compound assignment expression of the form `x op= y` is equivalent to `x = (T)(x op y)`, except that `x` is only evaluated once. The following example demonstrates that behavior:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="CompoundAssignmentWithCast"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

In the preceding example, value `44` is the result of converting value `300` to the `byte` type.

> **Note:**
> In the [checked overflow-checking context](../statements/checked-and-unchecked.md), the preceding example throws an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException). For more information, see the [Integer arithmetic overflow](#integer-arithmetic-overflow) section.

You also use the `+=` and `-=` operators to subscribe to and unsubscribe from an [event](../keywords/event.md), respectively. For more information, see [How to subscribe to and unsubscribe from events](../../programming-guide/events/how-to-subscribe-to-and-unsubscribe-from-events.md).

## Operator precedence and associativity

The following list orders arithmetic operators in groups from highest precedence to lowest precedence:

- ([Primary](index.md#operator-precedence)) operators: postfix increment `x++` and decrement `x--` operators.
- ([Unary](index.md#operator-precedence)) operators: prefix increment `++x` and decrement `--x` operators, and unary `+` and `-` operators.
- ([Multiplicative](index.md#operator-precedence)) operators: `*`, `/`, and `%` operators.
- ([Additive](index.md#operator-precedence)) operators: binary `+` and `-` operators.

Binary arithmetic operators are left-associative. That is, the compiler evaluates operators with the same precedence level from left to right.

Use parentheses, `()`, to change the order of evaluation imposed by operator precedence and associativity.

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="PrecedenceAndAssociativity"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

For the complete list of C# operators ordered by precedence level, see the [Operator precedence](index.md#operator-precedence) section of the [C# operators](index.md) article.

## Arithmetic overflow and division by zero

When the result of an arithmetic operation is outside the range of possible finite values of the involved numeric type, the behavior of an arithmetic operator depends on the type of its operands.

### Integer arithmetic overflow

Integer division by zero always throws a [System.DivideByZeroException](https://learn.microsoft.com/search/?terms=System.DivideByZeroException).

If integer arithmetic overflow occurs, the overflow-checking context, which can be [checked or unchecked](../statements/checked-and-unchecked.md), controls the resulting behavior:

- In a checked context, if overflow happens in a constant expression, a compile-time error occurs. Otherwise, when the operation is performed at run time, an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) is thrown.
- In an unchecked context, the result is truncated by discarding any high-order bits that don't fit in the destination type.

> **Note:**
> Integer division has a special case where an [System.ArithmeticException](https://learn.microsoft.com/search/?terms=System.ArithmeticException) can be thrown even in an unchecked context. When the left operand is the minimum value of a signed integer type (`int.MinValue` or `long.MinValue`) and the right operand is `-1`, the result cannot be represented in the destination type. The .NET runtime throws an [System.ArithmeticException](https://learn.microsoft.com/search/?terms=System.ArithmeticException) in this case, as shown in the following example:
>
> [language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="IntegerDivisionOverflow"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

Along with the [checked and unchecked](../statements/checked-and-unchecked.md) statements, you can use the `checked` and `unchecked` operators to control the overflow-checking context, in which an expression is evaluated:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="CheckedUnchecked"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

By default, arithmetic operations occur in an *unchecked* context.

### Floating-point arithmetic overflow

Arithmetic operations by using the `float` and `double` types never throw an exception. The result of arithmetic operations using those types can be one of special values that represent infinity and not-a-number:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="FloatingPointOverflow"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

For the operands of the `decimal` type, arithmetic overflow always throws an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException). Division by zero always throws a [System.DivideByZeroException](https://learn.microsoft.com/search/?terms=System.DivideByZeroException).

## Round-off errors

Because of general limitations in the floating-point representation of real numbers and floating-point arithmetic, round-off errors can occur in calculations that use floating-point types. The result of an expression might differ from the expected mathematical result. The following example demonstrates several such cases:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="RoundOffErrors"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

For more information, see the remarks at the [System.Double](https://learn.microsoft.com/dotnet/api/system.double#remarks), [System.Single](https://learn.microsoft.com/dotnet/api/system.single#remarks), or [System.Decimal](https://learn.microsoft.com/dotnet/api/system.decimal#remarks) reference pages.

## Operator overloadability

You can [overload](operator-overloading.md) the unary (`++`, `--`, `+`, and `-`) and binary (`*`, `/`, `%`, `+`, and `-`) arithmetic operators for a user-defined type. When you overload a binary operator, you also implicitly overload the corresponding compound assignment operator. Starting with C# 14, a user-defined type can explicitly overload the compound assignment operators (`op=`) to provide a more efficient implementation. Typically, a type overloads these operators because the value can be updated in place, rather than allocating a new instance to store the result of the operation. If a type doesn't provide an explicit overload, the compiler generates the implicit overload.

### User-defined checked operators

When you overload an arithmetic operator, you can use the `checked` keyword to define the *checked* version of that operator. The following example shows how to do that:

[language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="CheckedOperator"::: (complete source file; reference: snippets/shared/ArithmeticOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ArithmeticOperators.cs.md)

When you define a checked operator, you must also define the corresponding operator without the `checked` modifier. A [checked context](../statements/checked-and-unchecked.md) calls the checked operator, and an [unchecked context](../statements/checked-and-unchecked.md) calls the operator without the `checked` modifier.

When you define both versions of an operator, their behavior differs only when the result of an operation is too large to represent in the result type as follows:

- A checked operator throws an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException).
- An operator without the `checked` modifier returns an instance representing a *truncated* result.

For information about the difference in behavior of the built-in arithmetic operators, see the [Arithmetic overflow and division by zero](#arithmetic-overflow-and-division-by-zero) section.

You can use the `checked` modifier only when you overload any of the following operators:

- Unary `++`, `--`, and `-` operators
- Binary `*`, `/`, `+`, and `-` operators
- Compound assignment `*=`, `/=`, `+=`, and `-=` operators (C# 14 and later)
- [Explicit conversion operators](user-defined-conversion-operators.md)

> **Note:**
> The `checked` modifier doesn't affect the overflow-checking context within its body. The default context is defined by the value of the [**CheckForOverflowUnderflow**](../compiler-options/language.md#checkforoverflowunderflow) compiler option. Use the [`checked` and `unchecked` statements](../statements/checked-and-unchecked.md) to explicitly specify the overflow-checking context, as the example at the beginning of this section demonstrates.

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [Postfix increment and decrement operators](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12816-postfix-increment-and-decrement-operators)
- [Prefix increment and decrement operators](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1297-prefix-increment-and-decrement-operators)
- [Unary plus operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1292-unary-plus-operator)
- [Unary minus operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1293-unary-minus-operator)
- [Multiplication operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12132-multiplication-operator)
- [Division operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12133-division-operator)
- [Remainder operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12134-remainder-operator)
- [Addition operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12135-addition-operator)
- [Subtraction operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12136-subtraction-operator)
- [Compound assignment](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12245-compound-assignment)
- [The checked and unchecked operators](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12820-the-checked-and-unchecked-operators)
- [Numeric promotions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1247-numeric-promotions)
- [User defined compound assignment](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharplang/proposals/csharp-14.0/user-defined-compound-assignment.md)

## See also

- [C# operators and expressions](index.md)
- [System.Math](https://learn.microsoft.com/search/?terms=System.Math)
- [System.MathF](https://learn.microsoft.com/search/?terms=System.MathF)
- [Numerics in .NET](../../../standard/numerics.md)
