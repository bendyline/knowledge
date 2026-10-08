---
description: "Learn more about: How to: Speed Up Small Loop Bodies"
title: "How to: Speed Up Small Loop Bodies"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "parallel loops, how to speed up"
ms.assetid: c7a66677-cb59-4cbf-969a-d2e8fc61a6ce
---
# How to: Speed Up Small Loop Bodies

When a [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) loop has a small body, it might perform more slowly than the equivalent sequential loop, such as the [for](../../csharp/language-reference/statements/iteration-statements.md#the-for-statement) loop in C# and the [For](https://learn.microsoft.com/previous-versions/visualstudio/visual-studio-2008/44kykk21\(v=vs.90\)) loop in Visual Basic. Slower performance is caused by the overhead involved in partitioning the data and the cost of invoking a delegate on each loop iteration. To address such scenarios, the [System.Collections.Concurrent.Partitioner](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.Partitioner) class provides the [System.Collections.Concurrent.Partitioner.Create*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.Partitioner.Create*) method, which enables you to provide a sequential loop for the delegate body, so that the delegate is invoked only once per partition, instead of once per iteration. For more information, see [Custom Partitioners for PLINQ and TPL](custom-partitioners-for-plinq-and-tpl.md).

## Example

 [TPL_Partitioners#01 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_partitioners/cs/partitioner01.cs#01)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_partitioners/cs/partitioner01.cs.md)
 [TPL_Partitioners#01 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_partitioners/vb/partitionercreate01.vb#01)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_partitioners/vb/partitionercreate01.vb.md)

 The approach demonstrated in this example is useful when the loop performs a minimal amount of work. As the work becomes more computationally expensive, you will probably get the same or better performance by using a [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) or [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) loop with the default partitioner.

## See also

- [Data Parallelism](data-parallelism-task-parallel-library.md)
- [Custom Partitioners for PLINQ and TPL](custom-partitioners-for-plinq-and-tpl.md)
- [Iterators (C#)](../../csharp/programming-guide/concepts/iterators.md)
- [Iterators (Visual Basic)](../../visual-basic/programming-guide/concepts/iterators.md)
- [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md)
