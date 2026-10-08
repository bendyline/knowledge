---
description: "Learn more about: How to: Perform Action When a Dataflow Block Receives Data"
title: "How to: Perform Action When a Dataflow Block Receives Data"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Task Parallel Library, dataflows"
  - "TPL dataflow library, receiving data"
ms.assetid: fc2585dc-965e-4632-ace7-73dd02684ed3
---
# How to: Perform Action When a Dataflow Block Receives Data

*Execution dataflow block* types call a user-provided delegate when they receive data. The [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601), [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602), and [System.Threading.Tasks.Dataflow.TransformManyBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformManyBlock%602) classes are execution dataflow block types. You can use the `delegate` keyword (`Sub` in Visual Basic), [System.Action`1](https://learn.microsoft.com/search/?terms=System.Action%601), [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602), or a lambda expression when you provide a work function to an execution dataflow block. This document describes how to use [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602) and lambda expressions to perform action in execution blocks.

> **Note:**
> The TPL dataflow library (the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the [📦 System.Threading.Tasks.Dataflow NuGet package](https://www.nuget.org/packages/System.Threading.Tasks.Dataflow).


## Example

 The following example uses dataflow to read a file from disk and computes the number of bytes in that file that are equal to zero. It uses [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) to read the file and compute the number of zero bytes, and [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) to print the number of zero bytes to the console. The [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) object specifies a [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602) object to perform work when the blocks receive data. The [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) object uses a lambda expression to print to the console the number of zero bytes that are read.

 [TPLDataflow_ExecutionBlocks#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_executionblocks/cs/dataflowexecutionblocks.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_executionblocks/cs/dataflowexecutionblocks.cs.md)
 [TPLDataflow_ExecutionBlocks#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_executionblocks/vb/dataflowexecutionblocks.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_executionblocks/vb/dataflowexecutionblocks.vb.md)

 Although you can provide a lambda expression to a [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) object, this example uses [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602) to enable other code to use the `CountBytes` method. The [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) object uses a lambda expression because the work to be performed is specific to this task and is not likely to be useful from other code. For more information about how lambda expressions work in the Task Parallel Library, see [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md).

 The section Summary of Delegate Types in the [Dataflow](dataflow-task-parallel-library.md) document summarizes the delegate types that you can provide to [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601), [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602), and [System.Threading.Tasks.Dataflow.TransformManyBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformManyBlock%602) objects. The table also specifies whether the delegate type operates synchronously or asynchronously.

## Robust Programming

 This example provides a delegate of type [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602) to the [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) object to perform the task of the dataflow block synchronously. To enable the dataflow block to behave asynchronously, provide a delegate of type `Func<T, Task<TResult>>` to the dataflow block. When a dataflow block behaves asynchronously, the task of the dataflow block is complete only when the returned [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object finishes. The following example modifies the `CountBytes` method and uses the [async](../../csharp/language-reference/keywords/async.md) and [await](../../csharp/language-reference/operators/await.md) operators ([Async](../../visual-basic/language-reference/modifiers/async.md) and [Await](../../visual-basic/language-reference/operators/await-operator.md) in Visual Basic) to asynchronously compute the total number of bytes that are zero in the provided file. The [System.IO.FileStream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.ReadAsync*) method performs file read operations asynchronously.

 [TPLDataflow_ExecutionBlocks#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_executionblocks/cs/dataflowexecutionblocks.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_executionblocks/cs/dataflowexecutionblocks.cs.md)
 [TPLDataflow_ExecutionBlocks#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_executionblocks/vb/dataflowexecutionblocks.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_executionblocks/vb/dataflowexecutionblocks.vb.md)

 You can also use asynchronous lambda expressions to perform action in an execution dataflow block. The following example modifies the [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) object that is used in the previous example so that it uses a lambda expression to perform the work asynchronously.

 [TPLDataflow_ExecutionBlocks#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_executionblocks/cs/dataflowexecutionblocks.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_executionblocks/cs/dataflowexecutionblocks.cs.md)
 [TPLDataflow_ExecutionBlocks#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_executionblocks/vb/dataflowexecutionblocks.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_executionblocks/vb/dataflowexecutionblocks.vb.md)

## See also

- [Dataflow](dataflow-task-parallel-library.md)
