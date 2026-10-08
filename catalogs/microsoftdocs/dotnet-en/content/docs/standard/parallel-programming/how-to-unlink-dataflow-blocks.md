---
description: "Learn more about: How to: Unlink Dataflow Blocks"
title: "How to: Unlink Dataflow Blocks"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "dataflow blocks, unlinking in TPL"
  - "Task Parallel Library, dataflows"
  - "TPL dataflow library, unlinking dataflow blocks"
ms.assetid: 40f0208d-4618-47f7-85cf-4913d07d2d7d
---
# How to: Unlink Dataflow Blocks

This document describes how to unlink a target dataflow block from its source.

> **Note:**
> The TPL dataflow library (the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the [📦 System.Threading.Tasks.Dataflow NuGet package](https://www.nuget.org/packages/System.Threading.Tasks.Dataflow).


## Example

 The following example creates three [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) objects, each of which calls the `TrySolution` method to compute a value. This example requires only the result from the first call to `TrySolution` to finish.

 [TPLDataflow_ReceiveAny#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_receiveany/cs/dataflowreceiveany.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_receiveany/cs/dataflowreceiveany.cs.md)
 [TPLDataflow_ReceiveAny#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_receiveany/vb/dataflowreceiveany.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_receiveany/vb/dataflowreceiveany.vb.md)

 To receive the value from the first [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) object that finishes, this example defines the `ReceiveFromAny(T)` method. The `ReceiveFromAny(T)` method accepts an array of [System.Threading.Tasks.Dataflow.ISourceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601) objects and links each of these objects to a [System.Threading.Tasks.Dataflow.WriteOnceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.WriteOnceBlock%601) object. When you use the [System.Threading.Tasks.Dataflow.ISourceBlock`1.LinkTo*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601.LinkTo*) method to link a source dataflow block to a target block, the source propagates messages to the target as data becomes available. Because the [System.Threading.Tasks.Dataflow.WriteOnceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.WriteOnceBlock%601) class accepts only the first message that it is offered, the `ReceiveFromAny(T)` method produces its result by calling the [System.Threading.Tasks.Dataflow.DataflowBlock.Receive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.Receive*) method. This produces the first message that is offered to the [System.Threading.Tasks.Dataflow.WriteOnceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.WriteOnceBlock%601) object. The [System.Threading.Tasks.Dataflow.ISourceBlock`1.LinkTo*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601.LinkTo*) method has an overloaded version that takes an [System.Threading.Tasks.Dataflow.DataflowLinkOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowLinkOptions) object with a [System.Threading.Tasks.Dataflow.DataflowLinkOptions.MaxMessages](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowLinkOptions.MaxMessages) property that, when it is set to `1`, instructs the source block to unlink from the target after the target receives one message from the source. It is important for the [System.Threading.Tasks.Dataflow.WriteOnceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.WriteOnceBlock%601) object to unlink from its sources because the relationship between the array of sources and the [System.Threading.Tasks.Dataflow.WriteOnceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.WriteOnceBlock%601) object is no longer required after the [System.Threading.Tasks.Dataflow.WriteOnceBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.WriteOnceBlock%601) object receives a message.

 To enable the remaining calls to `TrySolution` to end after one of them computes a value, the `TrySolution` method takes a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) object that is canceled after the call to `ReceiveFromAny(T)` returns. The [System.Threading.SpinWait.SpinUntil*](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait.SpinUntil*) method returns when this [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) object is canceled.

## See also

- [Dataflow](dataflow-task-parallel-library.md)
