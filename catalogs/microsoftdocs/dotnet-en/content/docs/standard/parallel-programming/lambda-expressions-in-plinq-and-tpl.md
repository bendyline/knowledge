---
description: "Learn more about: Lambda Expressions in PLINQ and TPL"
title: "Lambda Expressions in PLINQ and TPL"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Func delegate, creating with lambda expression"
  - "Action delegate, creating with lambda expression"
  - "lambda expressions, with Action and Func"
ms.assetid: 645b2c17-29d0-4ffa-8684-430743cc2f2d
---
# Lambda Expressions in PLINQ and TPL

The Task Parallel Library (TPL) contains many methods that take one of the [System.Func`1](https://learn.microsoft.com/search/?terms=System.Func%601) or [System.Action](https://learn.microsoft.com/search/?terms=System.Action) family of delegates as input parameters. You use these delegates to pass in your custom program logic to the parallel loop, task or query. The code examples for TPL as well as PLINQ use lambda expressions to create instances of those delegates as inline code blocks. This topic provides a brief introduction to Func and Action and shows you how to use lambda expressions in the Task Parallel Library and PLINQ.

> **Note:**
> For more information about delegates in general, see [Delegates](../../csharp/programming-guide/delegates/index.md) and [Delegates](../../visual-basic/programming-guide/language-features/delegates/index.md). For more information about lambda expressions in C# and Visual Basic, see [Lambda Expressions](../../csharp/language-reference/operators/lambda-expressions.md) and [Lambda Expressions](../../visual-basic/programming-guide/language-features/procedures/lambda-expressions.md).

## Func Delegate

A `Func` delegate encapsulates a method that returns a value. In a `Func` signature, the last, or rightmost, type parameter always specifies the return type. One common cause of compiler errors is to attempt to pass in two input parameters to a [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602); in fact this type takes only one input parameter. .NET defines 17 versions of `Func`: [System.Func`1](https://learn.microsoft.com/search/?terms=System.Func%601), [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602), [System.Func`3](https://learn.microsoft.com/search/?terms=System.Func%603), and so on up through [System.Func`17](https://learn.microsoft.com/search/?terms=System.Func%6017).

## Action Delegate

A [System.Action](https://learn.microsoft.com/search/?terms=System.Action) delegate encapsulates a method (Sub in Visual Basic) that does not return a value. In an `Action` type signature, the type parameters represent only input parameters. Like `Func`, .NET defines 17 versions of `Action`, from a version that has no type parameters up through a version that has 16 type parameters.

## Example

The following example for the [System.Threading.Tasks.Parallel.ForEach``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``1%7D%2CSystem.Func%7B``0%2CSystem.Threading.Tasks.ParallelLoopState%2C``1%2C``1%7D%2CSystem.Action%7B``1%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%601%257D%252CSystem.Func%257B%60%600%252CSystem.Threading.Tasks.ParallelLoopState%252C%60%601%252C%60%601%257D%252CSystem.Action%257B%60%601%257D%2529) method shows how to express both Func and Action delegates by using lambda expressions.

[System.Threading.Tasks.Parallel#02 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.threading.tasks.parallel/cs/parallelforeach.cs#02)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.threading.tasks.parallel/cs/parallelforeach.cs.md)
[System.Threading.Tasks.Parallel#02 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.threading.tasks.parallel/vb/parallelforeach.vb#02)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.threading.tasks.parallel/vb/parallelforeach.vb.md)

## See also

- [Parallel Programming](index.md)
