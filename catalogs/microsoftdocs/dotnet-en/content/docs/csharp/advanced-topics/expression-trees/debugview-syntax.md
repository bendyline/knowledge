---
title: Syntax used by DebugView property
description: Describes the special syntax used by the DebugView property to produce a string representation of expression trees
author: zspitz
ms.date: 03/06/2023
helpviewer_keywords:
- "expression trees"
- "debugview"
---
# DebugView syntax

The **DebugView** property (available only when debugging) provides a string rendering of expression trees. Most of the syntax is fairly straightforward to understand; the special cases are described in the following sections.

Each example is followed by a block comment, containing the **DebugView**.

## ParameterExpression

[System.Linq.Expressions.ParameterExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ParameterExpression) variable names are displayed with a `$` symbol at the beginning.

If a parameter doesn't have a name, it's assigned an automatically generated name, such as `$var1` or `$var2`.

```csharp
ParameterExpression numParam =  Expression.Parameter(typeof(int), "num");
/*
    $num
*/

ParameterExpression numParam =  Expression.Parameter(typeof(int));
/*
    $var1
*/
```

## ConstantExpression

For [System.Linq.Expressions.ConstantExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ConstantExpression) objects that represent integer values, strings, and `null`, the value of the constant is displayed.

For numeric types that have standard suffixes as C# literals, the suffix is added to the value. The following table shows the suffixes associated with various numeric types.

| Type | Keyword | Suffix |
| --- | --- | --- |
| [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | [uint](../../language-reference/builtin-types/integral-numeric-types.md) | U |
| [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | [long](../../language-reference/builtin-types/integral-numeric-types.md) | L |
| [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) | [ulong](../../language-reference/builtin-types/integral-numeric-types.md) | UL |
| [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | [double](../../language-reference/builtin-types/floating-point-numeric-types.md) | D |
| [System.Single](https://learn.microsoft.com/search/?terms=System.Single) | [float](../../language-reference/builtin-types/floating-point-numeric-types.md) | F |
| [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) | [decimal](../../language-reference/builtin-types/floating-point-numeric-types.md) | M |

```csharp
int num = 10;
ConstantExpression expr = Expression.Constant(num);
/*
    10
*/

double num = 10;
ConstantExpression expr = Expression.Constant(num);
/*
    10D
*/
```

## BlockExpression

If the type of a [System.Linq.Expressions.BlockExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.BlockExpression) object differs from the type of the last expression in the block, the type is displayed within angle brackets (`<` and `>`). Otherwise, the type of the [System.Linq.Expressions.BlockExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.BlockExpression) object isn't displayed.

```csharp
BlockExpression block = Expression.Block(Expression.Constant("test"));
/*
    .Block() {
        "test"
    }
*/

BlockExpression block =  Expression.Block(typeof(Object), Expression.Constant("test"));
/*
    .Block<System.Object>() {
        "test"
    }
*/
```

## LambdaExpression

[System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) objects are displayed together with their delegate types.

If a lambda expression doesn't have a name, it's assigned an automatically generated name, such as `#Lambda1` or `#Lambda2`.

```csharp
LambdaExpression lambda =  Expression.Lambda<Func<int>>(Expression.Constant(1));
/*
    .Lambda #Lambda1<System.Func'1[System.Int32]>() {
        1
    }
*/

LambdaExpression lambda =  Expression.Lambda<Func<int>>(Expression.Constant(1), "SampleLambda", null);
/*
    .Lambda #SampleLambda<System.Func'1[System.Int32]>() {
        1
    }
*/
```

## LabelExpression

If you specify a default value for the [System.Linq.Expressions.LabelExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LabelExpression) object, this value is displayed before the [System.Linq.Expressions.LabelTarget](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LabelTarget) object.

The `.Label` token indicates the start of the label. The `.LabelTarget` token indicates the destination of the target to jump to.

If a label doesn't have a name, it's assigned an automatically generated name, such as `#Label1` or `#Label2`.

```csharp
LabelTarget target = Expression.Label(typeof(int), "SampleLabel");
BlockExpression block = Expression.Block(
    Expression.Goto(target, Expression.Constant(0)),
    Expression.Label(target, Expression.Constant(-1))
);
/*
    .Block() {
        .Goto SampleLabel { 0 };
        .Label
            -1
        .LabelTarget SampleLabel:
    }
*/

LabelTarget target = Expression.Label();
BlockExpression block = Expression.Block(
    Expression.Goto(target),
    Expression.Label(target)
);
/*
    .Block() {
        .Goto #Label1 { };
        .Label
        .LabelTarget #Label1:
    }
*/
```

## Checked Operators

Checked operators are displayed with the `#` symbol in front of the operator. For example, the checked addition operator is displayed as `#+`.

```csharp
Expression expr = Expression.AddChecked( Expression.Constant(1), Expression.Constant(2));
/*
    1 #+ 2
*/

Expression expr = Expression.ConvertChecked( Expression.Constant(10.0), typeof(int));
/*
    #(System.Int32)10D
*/
```
