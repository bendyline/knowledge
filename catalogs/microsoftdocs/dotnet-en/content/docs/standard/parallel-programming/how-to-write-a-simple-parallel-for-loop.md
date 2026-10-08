---
title: "How to: Write a Simple Parallel.For Loop"
description: Learn to write Parallel.For loops in .NET in which you don't need to cancel the loop, break out of loop iterations, or maintain any thread-local state.
ms.date: "07/16/2021"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Parallel.For, How to Write"
  - "for loop, parallel construction in .NET"
  - "parallel for loops, how to use"
ms.assetid: 9029ba7f-a9d1-4526-8c84-c88716dba5d4
---
# How to: Write a Simple Parallel.For Loop

This topic contains two examples that illustrate the [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) method. The first uses the [System.Threading.Tasks.Parallel.For%28System.Int64%2CSystem.Int64%2CSystem.Action%7BSystem.Int64%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For%2528System.Int64%252CSystem.Int64%252CSystem.Action%257BSystem.Int64%257D%2529) method overload, and the second uses the [System.Threading.Tasks.Parallel.For%28System.Int32%2CSystem.Int32%2CSystem.Action%7BSystem.Int32%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For%2528System.Int32%252CSystem.Int32%252CSystem.Action%257BSystem.Int32%257D%2529) overload, the two simplest overloads of the [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) method. You can use these two overloads of the [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) method when you do not need to cancel the loop, break out of the loop iterations, or maintain any thread-local state.

> **Note:**
> This documentation uses lambda expressions to define delegates in TPL. If you are not familiar with lambda expressions in C# or Visual Basic, see [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md).

The first example calculates the size of files in a single directory. The second computes the product of two matrices.

## Directory size example

This example is a simple command-line utility that calculates the total size of files in a directory. It expects a single directory path as an argument, and reports the number and total size of the files in that directory. After verifying that the directory exists, it uses the [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) method to enumerate the files in the directory and determine their file sizes. Each file size is then added to the `totalSize` variable. Note that the addition is performed by calling the [System.Threading.Interlocked.Add*](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked.Add*) so that the addition is performed as an atomic operation. Otherwise, multiple tasks could try to update the `totalSize` variable simultaneously.

[Conceptual.Parallel.For#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.parallel.for/cs/for1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.parallel.for/cs/for1.cs.md)
[Conceptual.Parallel.For#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.parallel.for/vb/for1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.parallel.for/vb/for1.vb.md)

## Matrix and stopwatch example

This example uses the [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) method to compute the product of two matrices. It also shows how to use the [System.Diagnostics.Stopwatch](https://learn.microsoft.com/search/?terms=System.Diagnostics.Stopwatch) class to compare the performance of a parallel loop with a non-parallel loop. Note that, because it can generate a large volume of output, the example allows output to be redirected to a file.

[TPL_Parallel#01 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_parallel/cs/simpleparallelfor.cs#01)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_parallel/cs/simpleparallelfor.cs.md)
[TPL_Parallel#01 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_parallel/vb/simpleparallelfor.vb#01)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_parallel/vb/simpleparallelfor.vb.md)

When parallelizing any code, including loops, one important goal is to utilize the processors as much as possible without over parallelizing to the point where the overhead for parallel processing negates any performance benefits. In this particular example, only the outer loop is parallelized because there is not very much work performed in the inner loop. The combination of a small amount of work and undesirable cache effects can result in performance degradation in nested parallel loops. Therefore, parallelizing the outer loop only is the best way to maximize the benefits of concurrency on most systems.

## The Delegate

The third parameter of this overload of [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) is a delegate of type `Action<int>` in C# or `Action(Of Integer)` in Visual Basic. An `Action` delegate, whether it has zero, one or sixteen type parameters, always returns void. In Visual Basic, the behavior of an `Action` is defined with a `Sub`. The example uses a lambda expression to create the delegate, but you can create the delegate in other ways as well. For more information, see [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md).

## The Iteration Value

The delegate takes a single input parameter whose value is the current iteration. This iteration value is supplied by the runtime and its starting value is the index of the first element on the segment (partition) of the source that is being processed on the current thread.

If you require more control over the concurrency level, use one of the overloads that takes a [System.Threading.Tasks.ParallelOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ParallelOptions) input parameter, such as: [System.Threading.Tasks.Parallel.For%28System.Int32%2CSystem.Int32%2CSystem.Threading.Tasks.ParallelOptions%2CSystem.Action%7BSystem.Int32%2CSystem.Threading.Tasks.ParallelLoopState%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For%2528System.Int32%252CSystem.Int32%252CSystem.Threading.Tasks.ParallelOptions%252CSystem.Action%257BSystem.Int32%252CSystem.Threading.Tasks.ParallelLoopState%257D%2529).

## Return Value and Exception Handling

[System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) returns use a [System.Threading.Tasks.ParallelLoopResult](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ParallelLoopResult) object when all threads have completed. This return value is useful when you are stopping or breaking loop iteration manually, because the [System.Threading.Tasks.ParallelLoopResult](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ParallelLoopResult) stores information such as the last iteration that ran to completion. If one or more exceptions occur on one of the threads, a [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) will be thrown.

In the code in this example, the return value of [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) is not used.

## Analysis and Performance

You can use the Performance Wizard to view CPU usage on your computer. As an experiment, increase the number of columns and rows in the matrices. The larger the matrices, the greater the performance difference between the parallel and sequential versions of the computation. When the matrix is small, the sequential version will run faster because of the overhead in setting up the parallel loop.

Synchronous calls to shared resources, like the Console or the File System, will significantly degrade the performance of a parallel loop. When measuring performance, try to avoid calls such as [System.Console.WriteLine*](https://learn.microsoft.com/search/?terms=System.Console.WriteLine*) within the loop.

## Compile the Code

Copy and paste this code into a Visual Studio project.

## See also

- [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*)
- [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*)
- [Data Parallelism](data-parallelism-task-parallel-library.md)
- [Parallel Programming](index.md)
