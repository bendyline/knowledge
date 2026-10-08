---
description: "Learn more about: How to: Execute Expression Trees (Visual Basic)"
title: "How to: Execute Expression Trees"
ms.date: 07/20/2015
ms.assetid: 9dfb5ab3-f48f-417e-975f-f8f6f1cdc18d
---
# How to: Execute Expression Trees (Visual Basic)

This topic shows you how to execute an expression tree. Executing an expression tree may return a value, or it may just perform an action such as calling a method.

 Only expression trees that represent lambda expressions can be executed. Expression trees that represent lambda expressions are of type [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) or [System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601). To execute these expression trees, call the [System.Linq.Expressions.LambdaExpression.Compile*](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression.Compile*) method to create an executable delegate, and then invoke the delegate.

> **Note:**
> If the type of the delegate is not known, that is, the lambda expression is of type [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) and not [System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601), you must call the [System.Delegate.DynamicInvoke*](https://learn.microsoft.com/search/?terms=System.Delegate.DynamicInvoke*) method on the delegate instead of invoking it directly.

 If an expression tree does not represent a lambda expression, you can create a new lambda expression that has the original expression tree as its body, by calling the [System.Linq.Expressions.Expression.Lambda``1%28System.Linq.Expressions.Expression%2CSystem.Collections.Generic.IEnumerable%7BSystem.Linq.Expressions.ParameterExpression%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression.Lambda%60%601%2528System.Linq.Expressions.Expression%252CSystem.Collections.Generic.IEnumerable%257BSystem.Linq.Expressions.ParameterExpression%257D%2529) method. Then, you can execute the lambda expression as described earlier in this section.

## Example

 The following code example demonstrates how to execute an expression tree that represents raising a number to a power by creating a lambda expression and executing it. The result, which represents the number raised to the power, is displayed.

```vb
' The expression tree to execute.
Dim be As BinaryExpression = Expression.Power(Expression.Constant(2.0R), Expression.Constant(3.0R))

' Create a lambda expression.
Dim le As Expression(Of Func(Of Double)) = Expression.Lambda(Of Func(Of Double))(be)

' Compile the lambda expression.
Dim compiledExpression As Func(Of Double) = le.Compile()

' Execute the lambda expression.
Dim result As Double = compiledExpression()

' Display the result.
MsgBox(result)

' This code produces the following output:
' 8
```

## Compile the code

- Include the System.Linq.Expressions namespace.

## See also

- [Expression Trees (Visual Basic)](index.md)
- [How to: Modify Expression Trees (Visual Basic)](how-to-modify-expression-trees.md)
