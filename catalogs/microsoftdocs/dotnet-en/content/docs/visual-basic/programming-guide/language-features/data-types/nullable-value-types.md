---
description: "Learn more about: Nullable Value Types (Visual Basic)"
title: "Nullable Value Types"
ms.date: 07/20/2015
f1_keywords:
  - "vb.Nullable"
helpviewer_keywords:
  - "nullable types [Visual Basic]"
  - "? [Visual Basic]"
  - "types [Visual Basic], nullable"
  - "nullable types [Visual Basic]"
  - "data types [Visual Basic], nullable"
ms.assetid: 9ac3b602-6f96-4e6d-96f7-cd4e81c468a6
---
# Nullable Value Types (Visual Basic)

Sometimes you work with a value type that does not have a defined value in certain circumstances. For example, a field in a database might have to distinguish between having an assigned value that is meaningful and not having an assigned value. Value types can be extended to take either their normal values or a null value. Such an extension is called a *nullable type*.

Each nullable value type is constructed from the generic [System.Nullable`1](https://learn.microsoft.com/search/?terms=System.Nullable%601) structure. Consider a database that tracks work-related activities. The following example constructs a nullable `Boolean` type and declares a variable of that type. You can write the declaration in three ways:

[VbVbalrNullableValue#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

The variable `ridesBusToWork` can hold a value of `True`, a value of `False`, or no value at all. Its initial default value is no value at all, which in this case could mean that the information has not yet been obtained for this person. In contrast, `False` could mean that the information has been obtained and the person does not ride the bus to work.

You can declare variables and properties with nullable value types, and you can declare an array with elements of a nullable value type. You can declare procedures with nullable value types as parameters, and you can return a nullable value type from a `Function` procedure.

You cannot construct a nullable type on a reference type such as an array, a `String`, or a class. The underlying type must be a value type. For more information, see [Value Types and Reference Types](value-types-and-reference-types.md).

## Using a Nullable Type Variable

The most important members of a nullable value type are its [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) and [System.Nullable`1.Value](https://learn.microsoft.com/search/?terms=System.Nullable%601.Value) properties. For a variable of a nullable value type, [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) tells you whether the variable contains a defined value. If [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) is `True`, you can read the value from [System.Nullable`1.Value*](https://learn.microsoft.com/search/?terms=System.Nullable%601.Value*). Note that both [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) and [System.Nullable`1.Value*](https://learn.microsoft.com/search/?terms=System.Nullable%601.Value*) are `ReadOnly` properties.

### Default Values

When you declare a variable with a nullable value type, its [System.Nullable`1.HasValue](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue) property has a default value of `False`. This means that by default the variable has no defined value, instead of the default value of its underlying value type. In the following example, the variable `numberOfChildren` initially has no defined value, even though the default value of the `Integer` type is 0.

[VbVbalrNullableValue#2 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

A null value is useful to indicate an undefined or unknown value. If `numberOfChildren` had been declared as `Integer`, there would be no value that could indicate that the information is not currently available.

### Storing Values

You store a value in a variable or property of a nullable value type in the typical way. The following example assigns a value to the variable `numberOfChildren` declared in the previous example.

[VbVbalrNullableValue#3 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#3)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

If a variable or property of a nullable value type contains a defined value, you can cause it to revert to its initial state of not having a value assigned. You do this by setting the variable or property to `Nothing`, as the following example shows.

[VbVbalrNullableValue#4 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#4)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

> **Note:**
> Although you can assign `Nothing` to a variable of a nullable value type, you cannot test it for `Nothing` by using the equal sign. Comparison that uses the equal sign, `someVar = Nothing`, always evaluates to `Nothing`. You can test the variable's [System.Nullable`1.HasValue](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue) property for `False`, or test by using the `Is` or `IsNot` operator.

### Retrieving Values

To retrieve the value of a variable of a nullable value type, you should first test its [System.Nullable`1.HasValue](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue) property to confirm that it has a value. If you try to read the value when [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*) is `False`, Visual Basic throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception. The following example shows the recommended way to read the variable `numberOfChildren` of the previous examples.

[VbVbalrNullableValue#5 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#5)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

## Comparing Nullable Types

When nullable `Boolean` variables are used in Boolean expressions, the result can be `True`, `False`, or `Nothing`. The following is the truth table for `And` and `Or`. Because `b1` and `b2` now have three possible values, there are nine combinations to evaluate.

| b1 | b2 | b1 And b2 | b1 Or b2 |
| --- | --- | --- | --- |
| `Nothing` | `Nothing` | `Nothing` | `Nothing` |
| `Nothing` | `True` | `Nothing` | `True` |
| `Nothing` | `False` | `False` | `Nothing` |
| `True` | `Nothing` | `Nothing` | `True` |
| `True` | `True` | `True` | `True` |
| `True` | `False` | `False` | `True` |
| `False` | `Nothing` | `False` | `Nothing` |
| `False` | `True` | `False` | `True` |
| `False` | `False` | `False` | `False` |

When the value of a Boolean variable or expression is `Nothing`, it is neither `true` nor `false`. Consider the following example.

[VbVbalrNullableValue#6 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#6)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

In this example, `b1 And b2` evaluates to `Nothing`. As a result, the `Else` clause is executed in each `If` statement, and the output is as follows:

`Expression is not true`

`Expression is not false`

> **Note:**
> `AndAlso` and `OrElse`, which use short-circuit evaluation, must evaluate their second operands when the first evaluates to `Nothing`.

## Propagation

If one or both of the operands of an arithmetic, comparison, shift, or type operation is a nullable value type, the result of the operation is also a nullable value type. If both operands have values that are not `Nothing`, the operation is performed on the underlying values of the operands, as if neither were a nullable value type. In the following example, variables `compare1` and `sum1` are implicitly typed. If you rest the mouse pointer over them, you will see that the compiler infers nullable value types for both of them.

[VbVbalrNullableValue#7 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#7)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

If one or both operands have a value of `Nothing`, the result will be `Nothing`.

[VbVbalrNullableValue#8 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb#8)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrNullableValue/VB/Class1.vb.md)

## Using Nullable Types with Data

A database is one of the most important places to use nullable value types. Not all database objects currently support nullable value types, but the designer-generated table adapters do. See [TableAdapter support for nullable types](https://learn.microsoft.com/visualstudio/data-tools/fill-datasets-by-using-tableadapters#tableadapter-support-for-nullable-types).

## See also

- [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException)
- [System.Nullable`1.HasValue*](https://learn.microsoft.com/search/?terms=System.Nullable%601.HasValue*)
- [Data Types](index.md)
- [Value Types and Reference Types](value-types-and-reference-types.md)
- [Troubleshooting Data Types](troubleshooting-data-types.md)
- [Fill datasets by using TableAdapters](https://learn.microsoft.com/visualstudio/data-tools/fill-datasets-by-using-tableadapters)
- [If Operator](../../../language-reference/operators/if-operator.md)
- [Local Type Inference](../variables/local-type-inference.md)
- [Is Operator](../../../language-reference/operators/is-operator.md)
- [IsNot Operator](../../../language-reference/operators/isnot-operator.md)
- [Nullable Value Types (C#)](../../../../csharp/language-reference/builtin-types/nullable-value-types.md)
