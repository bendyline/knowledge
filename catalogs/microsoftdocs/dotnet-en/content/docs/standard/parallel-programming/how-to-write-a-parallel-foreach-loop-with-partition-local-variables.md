---
title: "How to: Write a Parallel.ForEach loop with partition-local variables"
description: See an example of how to write a Parallel.ForEach loop that uses partition-local variables in .NET.
ms.date: "06/26/2018"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "parallel foreach loop, how to use local state"
ms.assetid: 24b10041-b30b-45cb-aa65-66cf568ca76d
---
# How to: Write a Parallel.ForEach loop with partition-local variables

The following example shows how to write a [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) method that uses partition-local variables. When a [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) loop executes, it divides its source collection into multiple partitions. Each partition has its own copy of the partition-local variable. A partition-local variable is similar to a [thread-local variable](https://learn.microsoft.com/search/?terms=System.Threading.ThreadLocal%601), except that multiple partitions can run on a single thread.

The code and parameters in this example closely resemble the corresponding [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) method. For more information, see [How to: Write a Parallel.For Loop with Thread-Local Variables](how-to-write-a-parallel-for-loop-with-thread-local-variables.md).

To use a partition-local variable in a [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) loop, you must call one of the method overloads that takes two type parameters. The first type parameter, `TSource`, specifies the type of the source element, and the second type parameter, `TLocal`, specifies the type of the partition-local variable.

## Example

The following example calls the [System.Threading.Tasks.Parallel.ForEach``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``1%7D%2CSystem.Func%7B``0%2CSystem.Threading.Tasks.ParallelLoopState%2C``1%2C``1%7D%2CSystem.Action%7B``1%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%601%257D%252CSystem.Func%257B%60%600%252CSystem.Threading.Tasks.ParallelLoopState%252C%60%601%252C%60%601%257D%252CSystem.Action%257B%60%601%257D%2529) overload to compute the sum of an array of one million elements. This overload has four parameters:

- `source`, which is the data source. It must implement [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601). The data source in our example is the one million member `IEnumerable<Int32>` object returned by the [System.Linq.Enumerable.Range*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Range*) method.

- `localInit`, or the function that initializes the partition-local variable. This function is called once for each partition in which the [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) operation executes. Our example initializes the partition-local variable to zero.

- `body`, a [System.Func`4](https://learn.microsoft.com/search/?terms=System.Func%604) that is invoked by the parallel loop on each iteration of the loop. Its signature is `Func\<TSource, ParallelLoopState, TLocal, TLocal>`. You supply the code for the delegate, and the loop passes in the input parameters, which are:

  - The current element of the [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601).

  - A [System.Threading.Tasks.ParallelLoopState](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ParallelLoopState) variable that you can use in your delegate's code to examine the state of the loop.

  - The partition-local variable.

  Your delegate returns the partition-local variable, which is then passed to the next iteration of the loop that executes in that particular partition. Each loop partition maintains a separate instance of this variable.

  In the example, the delegate adds the value of each integer to the partition-local variable, which maintains a running total of the values of the integer elements in that partition.

- `localFinally`, an `Action<TLocal>` delegate that the [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) invokes when the looping operations in each partition have completed. The [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) method passes your `Action<TLocal>` delegate the final value of the partition-local variable for this loop partition, and you provide the code that performs the required action for combining the result from this partition with the results from the other partitions. This delegate can be invoked concurrently by multiple tasks. Because of this, the example uses the [System.Threading.Interlocked.Add%28System.Int32%40%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked.Add%2528System.Int32%2540%252CSystem.Int32%2529) method to synchronize access to the `total` variable. Because the delegate type is an [System.Action`1](https://learn.microsoft.com/search/?terms=System.Action%601), there is no return value.

[TPL_Parallel#04 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_parallel/cs/foreachthreadlocal.cs#04)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_parallel/cs/foreachthreadlocal.cs.md)
[TPL_Parallel#04 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_parallel/vb/foreachthreadlocal.vb#04)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_parallel/vb/foreachthreadlocal.vb.md)

## See also

- [Data Parallelism](data-parallelism-task-parallel-library.md)
- [How to: Write a Parallel.For Loop with Thread-Local Variables](how-to-write-a-parallel-for-loop-with-thread-local-variables.md)
- [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md)
