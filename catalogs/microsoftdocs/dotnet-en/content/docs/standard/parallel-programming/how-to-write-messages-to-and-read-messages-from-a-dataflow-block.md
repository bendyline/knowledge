---
description: "Learn more about: How to: Write and read messages from a Dataflow block"
title: "How to: Write and read messages from a Dataflow block"
ms.date: 09/10/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Task Parallel Library, dataflows"
  - "TPL dataflow library, reading and writing messages"
ms.assetid: 1a9bf078-aa82-46eb-b95a-f87237f028c5
---

# How to: Write and read messages from a Dataflow block

This article describes how to use the Task Parallel Library (TPL) Dataflow Library to write messages to and read messages from a dataflow block. The TPL Dataflow Library provides both synchronous and asynchronous methods for writing messages to and reading messages from a dataflow block. This article shows how to use the [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) class. The [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) class buffers messages and behaves as both a message source and a message target.

> **Note:**
> The TPL dataflow library (the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the [📦 System.Threading.Tasks.Dataflow NuGet package](https://www.nuget.org/packages/System.Threading.Tasks.Dataflow).


## Writing and reading synchronously

The following example uses the [System.Threading.Tasks.Dataflow.DataflowBlock.Post*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.Post*) method to write to a [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) dataflow block and the [System.Threading.Tasks.Dataflow.DataflowBlock.Receive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.Receive*) method to read from the same object.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs" id="2"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb" id="2"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb.md)

You can also use the [System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.IReceivableSourceBlock%601.TryReceive*) method to read from a dataflow block, as shown in the following example. The [System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.IReceivableSourceBlock%601.TryReceive*) method does not block the current thread and is useful when you occasionally poll for data.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs" id="3"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb" id="3"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb.md)

Because the [System.Threading.Tasks.Dataflow.DataflowBlock.Post*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.Post*) method acts synchronously, the [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) object in the previous examples receives all data before the second loop reads data. The following example extends the first example by using [System.Threading.Tasks.Task.WhenAll(System.Threading.Tasks.Task\[\])](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll(System.Threading.Tasks.Task%5B%5D)) to read from and write to the message block concurrently. Because [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) awaits all the asynchronous operations that are executing concurrently, the values are not written to the [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) object in any specific order.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs" id="4"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb" id="4"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb.md)

## Writing and reading asynchronously

The following example uses the [System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*) method to asynchronously write to a [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) object and the [System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*) method to asynchronously read from the same object. This example uses the [async](../../csharp/language-reference/keywords/async.md) and [await](../../csharp/language-reference/operators/await.md) operators ([Async](../../visual-basic/language-reference/modifiers/async.md) and [Await](../../visual-basic/language-reference/operators/await-operator.md) in Visual Basic) to asynchronously send data to and read data from the target block. The [System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*) method is useful when you must enable a dataflow block to postpone messages. The [System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*) method is useful when you want to act on data when that data becomes available. For more information about how messages propagate among message blocks, see the section Message Passing in [Dataflow](dataflow-task-parallel-library.md).

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs" id="5"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb" id="5"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb.md)

## A complete example

The following example shows all of the code for this article.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs" id="1"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_readwrite/cs/dataflowreadwrite.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb" id="1"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_readwrite/vb/dataflowreadwrite.vb.md)

## Next steps

This example shows how to read from and write to a message block directly. You can also connect dataflow blocks to form *pipelines*, which are linear sequences of dataflow blocks, or *networks*, which are graphs of dataflow blocks. In a pipeline or network, sources asynchronously propagate data to targets as that data becomes available. For an example that creates a basic dataflow pipeline, see [Walkthrough: Creating a Dataflow Pipeline](walkthrough-creating-a-dataflow-pipeline.md). For an example that creates a more complex dataflow network, see [Walkthrough: Using Dataflow in a Windows Forms Application](walkthrough-using-dataflow-in-a-windows-forms-application.md).

## See also

- [Dataflow (Task Parallel Library)](dataflow-task-parallel-library.md)
