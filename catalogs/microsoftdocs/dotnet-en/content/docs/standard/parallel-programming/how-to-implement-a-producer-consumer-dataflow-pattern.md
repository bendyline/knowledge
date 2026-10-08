---
title: "How to: Implement a producer-consumer dataflow pattern"
description: Understand how to implement a producer-consumer dataflow pattern using the TPL Dataflow Library in .NET.
ms.date: 09/24/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "TPL dataflow library, implementing producer-consumer pattern"
  - "Task Parallel Library, dataflows"
  - "producer-consumer patterns, implementing [TPL]"
ms.assetid: 47a1d38c-fe9c-44aa-bd15-937bd5659b0b
---

# How to: Implement a producer-consumer dataflow pattern

In this article, you'll learn how to use the TPL dataflow library to implement a producer-consumer pattern. In this pattern, the *producer* sends messages to a message block, and the *consumer* reads messages from that block.

> **Note:**
> The TPL dataflow library (the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the [📦 System.Threading.Tasks.Dataflow NuGet package](https://www.nuget.org/packages/System.Threading.Tasks.Dataflow).


## Example

The following example demonstrates a basic producer-consumer model that uses dataflow. The `Produce` method writes arrays that contain random bytes of data to a [System.Threading.Tasks.Dataflow.ITargetBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ITargetBlock%601) object and the `Consume` method reads bytes from a [System.Threading.Tasks.Dataflow.ISourceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601) object. By acting on the [System.Threading.Tasks.Dataflow.ISourceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601) and [System.Threading.Tasks.Dataflow.ITargetBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ITargetBlock%601) interfaces, instead of their derived types, you can write reusable code that can act on a variety of dataflow block types. This example uses the [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) class. Because the [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) class acts as both a source block and as a target block, the producer and the consumer can use a shared object to transfer data.

 The `Produce` method calls the [System.Threading.Tasks.Dataflow.DataflowBlock.Post*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.Post*) method in a loop to synchronously write data to the target block. After the `Produce` method writes all data to the target block, it calls the [System.Threading.Tasks.Dataflow.IDataflowBlock.Complete*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.IDataflowBlock.Complete*) method to indicate that the block will never have additional data available. The `Consume` method uses the [async](../../csharp/language-reference/keywords/async.md) and [await](../../csharp/language-reference/operators/await.md) operators ([Async](../../visual-basic/language-reference/modifiers/async.md) and [Await](../../visual-basic/language-reference/operators/await-operator.md) in Visual Basic) to asynchronously compute the total number of bytes that are received from the [System.Threading.Tasks.Dataflow.ISourceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601) object. To act asynchronously, the `Consume` method calls the [System.Threading.Tasks.Dataflow.DataflowBlock.OutputAvailableAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.OutputAvailableAsync*) method to receive a notification when the source block has data available and when the source block will never have additional data available.

 [TPLDataflow_ProducerConsumer#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_producerconsumer/cs/dataflowproducerconsumer.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_producerconsumer/cs/dataflowproducerconsumer.cs.md)
 [TPLDataflow_ProducerConsumer#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_producerconsumer/vb/dataflowproducerconsumer.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_producerconsumer/vb/dataflowproducerconsumer.vb.md)

## Robust programming

 The preceding example uses just one consumer to process the source data. If you have multiple consumers in your application, use the [System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.IReceivableSourceBlock%601.TryReceive*) method to read data from the source block, as shown in the following example.

 [TPLDataflow_ProducerConsumer#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_producerconsumer/cs/dataflowproducerconsumer.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_producerconsumer/cs/dataflowproducerconsumer.cs.md)
 [TPLDataflow_ProducerConsumer#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_producerconsumer/vb/dataflowproducerconsumer.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_producerconsumer/vb/dataflowproducerconsumer.vb.md)

 The [System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.IReceivableSourceBlock%601.TryReceive*) method returns `False` when no data is available. When multiple consumers must access the source block concurrently, this mechanism guarantees that data is still available after the call to [System.Threading.Tasks.Dataflow.DataflowBlock.OutputAvailableAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.OutputAvailableAsync*).

## See also

- [Dataflow](dataflow-task-parallel-library.md)
