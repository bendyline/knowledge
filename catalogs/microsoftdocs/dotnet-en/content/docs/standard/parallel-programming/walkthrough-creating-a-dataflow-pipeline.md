---
title: "Walkthrough: Creating a Dataflow Pipeline"
description: Create a dataflow pipeline, which is a series of components, or dataflow blocks. A dataflow block does a certain task to contribute to a larger goal.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "dataflow pipelines, creating with TPL"
  - "Task Parallel Library, dataflows"
  - "TPL dataflow library, creating dataflow pipeline"
ms.topic: tutorial
---
# Walkthrough: Creating a Dataflow Pipeline

Although you can use the [System.Threading.Tasks.Dataflow.DataflowBlock.Receive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.Receive*), [System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*), and [System.Threading.Tasks.Dataflow.DataflowBlock.TryReceive*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.TryReceive*) methods to receive messages from source blocks, you can also connect message blocks to form a *dataflow pipeline*. A dataflow pipeline is a series of components, or *dataflow blocks*, each of which performs a specific task that contributes to a larger goal. Every dataflow block in a dataflow pipeline performs work when it receives a message from another dataflow block. An analogy to this is an assembly line for automobile manufacturing. As each vehicle passes through the assembly line, one station assembles the frame, the next one installs the engine, and so on. Because an assembly line enables multiple vehicles to be assembled at the same time, it provides better throughput than assembling complete vehicles one at a time.

 This document demonstrates a dataflow pipeline that downloads the book *The Iliad of Homer* from a website and searches the text to match individual words with words that reverse the first word's characters. The formation of the dataflow pipeline in this document consists of the following steps:

1. Create the dataflow blocks that participate in the pipeline.

2. Connect each dataflow block to the next block in the pipeline. Each block receives as input the output of the previous block in the pipeline.

3. For each dataflow block, create a continuation task that sets the next block to the completed state after the previous block finishes.

4. Post data to the head of the pipeline.

5. Mark the head of the pipeline as completed.

6. Wait for the pipeline to complete all work.

## Prerequisites

 Read [Dataflow](dataflow-task-parallel-library.md) before you start this walkthrough.

## Creating a Console Application

 In Visual Studio, create a Visual C# or Visual Basic Console Application project. Install the System.Threading.Tasks.Dataflow NuGet package.

> **Note:**
> The TPL dataflow library (the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the [📦 System.Threading.Tasks.Dataflow NuGet package](https://www.nuget.org/packages/System.Threading.Tasks.Dataflow).


 Add the following code to your project to create the basic application.

 [TPLDataflow_Palindromes#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs.md)
 [TPLDataflow_Palindromes#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromesemptymain.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromesemptymain.vb.md)

## Creating the Dataflow Blocks

 Add the following code to the `Main` method to create the dataflow blocks that participate in the pipeline. The table that follows summarizes the role of each member of the pipeline.

 [TPLDataflow_Palindromes#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs.md)
 [TPLDataflow_Palindromes#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb.md)

| Member | Type | Description |
| --- | --- | --- |
| `downloadString` | [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) | Downloads the book text from the Web. |
| `createWordList` | [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) | Separates the book text into an array of words. |
| `filterWordList` | [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) | Removes short words and duplicates from the word array. |
| `findReversedWords` | [System.Threading.Tasks.Dataflow.TransformManyBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformManyBlock%602) | Finds all words in the filtered word array collection whose reverse also occurs in the word array. |
| `printReversedWords` | [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) | Displays words and the corresponding reverse words to the console. |

 Although you could combine multiple steps in the dataflow pipeline in this example into one step, the example illustrates the concept of composing multiple independent dataflow tasks to perform a larger task. The example uses [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) to enable each member of the pipeline to perform an operation on its input data and send the results to the next step in the pipeline. The `findReversedWords` member of the pipeline is a [System.Threading.Tasks.Dataflow.TransformManyBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformManyBlock%602) object because it produces multiple independent outputs for each input. The tail of the pipeline, `printReversedWords`, is an [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) object because it performs an action on its input, and does not produce a result.

## Forming the Pipeline

 Add the following code to connect each block to the next block in the pipeline.

 When you call the [System.Threading.Tasks.Dataflow.DataflowBlock.LinkTo*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.LinkTo*) method to connect a source dataflow block to a target dataflow block, the source dataflow block propagates data to the target block as data becomes available. If you also provide [System.Threading.Tasks.Dataflow.DataflowLinkOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowLinkOptions) with [System.Threading.Tasks.Dataflow.DataflowLinkOptions.PropagateCompletion](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowLinkOptions.PropagateCompletion) set to true, successful or unsuccessful completion of one block in the pipeline will cause completion of the next block in the pipeline.

 [TPLDataflow_Palindromes#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs.md)
 [TPLDataflow_Palindromes#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb.md)

## Posting Data to the Pipeline

 Add the following code to post the URL of the book *The Iliad of Homer* to the head of the dataflow pipeline.

 [TPLDataflow_Palindromes#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs.md)
 [TPLDataflow_Palindromes#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb.md)

 This example uses [System.Threading.Tasks.Dataflow.DataflowBlock.Post*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.Post*) to synchronously send data to the head of the pipeline. Use the [System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*) method when you must asynchronously send data to a dataflow node.

## Completing Pipeline Activity

 Add the following code to mark the head of the pipeline as completed. The head of the pipeline propagates its completion after it processes all buffered messages.

 [TPLDataflow_Palindromes#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs.md)
 [TPLDataflow_Palindromes#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb.md)

 This example sends one URL through the dataflow pipeline to be processed. If you send more than one input through a pipeline, call the [System.Threading.Tasks.Dataflow.IDataflowBlock.Complete*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.IDataflowBlock.Complete*) method after you submit all the input. You can omit this step if your application has no well-defined point at which data is no longer available or the application does not have to wait for the pipeline to finish.

## Waiting for the Pipeline to Finish

 Add the following code to wait for the pipeline to finish. The overall operation is finished when the tail of the pipeline finishes.

 [TPLDataflow_Palindromes#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs.md)
 [TPLDataflow_Palindromes#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb.md)

 You can wait for dataflow completion from any thread or from multiple threads at the same time.

## The Complete Example

 The following example shows the complete code for this walkthrough.

 [TPLDataflow_Palindromes#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_palindromes/cs/dataflowpalindromes.cs.md)
 [TPLDataflow_Palindromes#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_palindromes/vb/dataflowpalindromes.vb.md)

## Next Steps

 This example sends one URL to process through the dataflow pipeline. If you send more than one input value through a pipeline, you can introduce a form of parallelism into your application that resembles how parts might move through an automobile factory. When the first member of the pipeline sends its result to the second member, it can process another item in parallel as the second member processes the first result.

 The parallelism that is achieved by using dataflow pipelines is known as *coarse-grained parallelism* because it typically consists of fewer, larger tasks. You can also use a more *fine-grained parallelism* of smaller, short-running tasks in a dataflow pipeline. In this example, the `findReversedWords` member of the pipeline uses [PLINQ](introduction-to-plinq.md) to process multiple items in the work list in parallel. The use of fine-grained parallelism in a coarse-grained pipeline can improve overall throughput.

 You can also connect a source dataflow block to multiple target blocks to create a *dataflow network*. The overloaded version of the [System.Threading.Tasks.Dataflow.DataflowBlock.LinkTo*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlock.LinkTo*) method takes a [System.Predicate`1](https://learn.microsoft.com/search/?terms=System.Predicate%601) object that defines whether the target block accepts each message based on its value. Most dataflow block types that act as sources offer messages to all connected target blocks, in the order in which they were connected, until one of the blocks accepts that message. By using this filtering mechanism, you can create systems of connected dataflow blocks that direct certain data through one path and other data through another path. For an example that uses filtering to create a dataflow network, see [Walkthrough: Using Dataflow in a Windows Forms Application](walkthrough-using-dataflow-in-a-windows-forms-application.md).

## See also

- [Dataflow](dataflow-task-parallel-library.md)
