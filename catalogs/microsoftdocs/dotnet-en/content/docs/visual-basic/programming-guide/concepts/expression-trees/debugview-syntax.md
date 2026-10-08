---
title: Syntax used by DebugView property
description: Learn about the special syntax used by the DebugView property to produce a string representation of expression trees in Visual Basic.
author: zspitz
ms.author: wiwagn
ms.date: 02/14/2021
ms.topic: language-reference
helpviewer_keywords:
- "expression trees"
- "debugview"
---

# DebugView syntax (expression trees)

The **DebugView** property (available only when debugging) provides a string rendering of expression trees. Most of the syntax is fairly straightforward to understand; the special cases are described in the following sections.

Each example is followed by a comment block containing the **DebugView**.

## ParameterExpression

[System.Linq.Expressions.ParameterExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ParameterExpression) variable names are displayed with a "$" symbol at the beginning.

If a parameter does not have a name, it is assigned an automatically generated name, such as `$var1` or `$var2`.

### Examples

```vb
Dim numParam As ParameterExpression = Expression.Parameter(GetType(Integer), "num")
'
'    $num
'

Dim numParam As ParameterExpression = Expression.Parameter(GetType(Integer))
'
'    $var1
'
```

## ConstantExpressions

For [System.Linq.Expressions.ConstantExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ConstantExpression) objects that represent integer values, strings, and `null`, the value of the constant is displayed.

For some numeric types, a suffix is added to the value:

| Type | Keyword | Suffix |
| --- | --- | --- |
| [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | [UInteger](../../../language-reference/data-types/uinteger-data-type.md) | U |
| [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | [Long](../../../language-reference/data-types/long-data-type.md) | L |
| [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) | [ULong](../../../language-reference/data-types/ulong-data-type.md) | UL |
| [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | [Double](../../../language-reference/data-types/double-data-type.md) | D |
| [System.Single](https://learn.microsoft.com/search/?terms=System.Single) | [Single](../../../language-reference/data-types/single-data-type.md) | F |
| [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) | [Decimal](../../../language-reference/data-types/decimal-data-type.md) | M |

### Examples

```vb
Dim num as Integer = 10
Dim expr As ConstantExpression = Expression.Constant(num)
'
'    10
'

Dim num As Double = 10
Dim expr As ConstantExpression = Expression.Constant(num)
'
'    10D
'
```

## BlockExpression

If the type of a [System.Linq.Expressions.BlockExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.BlockExpression) object differs from the type of the last expression in the block, the type is displayed within angle brackets (`<` and `>`). Otherwise, the type of the [System.Linq.Expressions.BlockExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.BlockExpression) object is not displayed.

### Examples

```vb
Dim block As BlockExpression = Expression.Block(Expression.Constant("test"))
'
'    .Block() {
'        "test"
'    }
'

Dim block As BlockExpression = Expression.Block(
    GetType(Object),
    Expression.Constant("test")
)
'
'    .Block<System.Object>() {
'        "test"
'    }
'
```

## LambdaExpression

[System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) objects are displayed together with their delegate types.

If a lambda expression does not have a name, it is assigned an automatically generated name, such as `#Lambda1` or `#Lambda2`.

### Examples

```vb
Dim lambda As LambdaExpression = Expression.Lambda(Of Func(Of Integer))(
    Expression.Constant(1)
)
'
'    .Lambda #Lambda1<System.Func'1[System.Int32]>() {
'        1
'    }
'

Dim lambda As LambdaExpression = Expression.Lambda(Of Func(Of Integer))(
    Expression.Constant(1),
    "SampleLambda",
    Nothing
)
'
'    .Lambda #SampleLambda<System.Func'1[System.Int32]>() {
'        1
'    }
'
```

## LabelExpression

If you specify a default value for the [System.Linq.Expressions.LabelExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LabelExpression) object, this value is displayed before the [System.Linq.Expressions.LabelTarget](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LabelTarget) object.

The `.Label` token indicates the start of the label. The `.LabelTarget` token indicates the destination of the target to jump to.

If a label does not have a name, it is assigned an automatically generated name, such as `#Label1` or `#Label2`.

### Examples

```vb
Dim target As LabelTarget = Expression.Label(GetType(Integer), "SampleLabel")
Dim label1 As BlockExpression = Expression.Block(
    Expression.Goto(target, Expression.Constant(0)),
    Expression.Label(target, Expression.Constant(-1))
)
'
'    .Block() {
'        .Goto SampleLabel { 0 };
'        .Label
'            -1
'        .LabelTarget SampleLabel:
'    }
'

Dim target As LabelTarget = Expression.Label()
Dim block As BlockExpression = Expression.Block(
    Expression.Goto(target),
    Expression.Label(target)
)
'
'    .Block() {
'        .Goto #Label1 { };
'        .Label
'        .LabelTarget #Label1:
'    }
'
```

## Checked Operators

Checked operators are displayed with the `#` symbol in front of the operator. For example, the checked addition operator is displayed as `#+`.

### Examples

```vb
Dim expr As Expression = Expression.AddChecked(
    Expression.Constant(1),
    Expression.Constant(2)
)
'
'     1 #+ 2
'

Dim expr As Expression = Expression.ConvertChecked(
    Expression.Constant(10.0),
    GetType(Integer)
)
'
'    #(System.Int32)10D
'
```
