---
description: "Learn more about: How to: Specify a Task Scheduler in a Dataflow Block"
title: "How to: Specify a Task Scheduler in a Dataflow Block"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "TPL dataflow library, linking to task scheduler in TPL"
  - "Task Parallel Library, dataflows"
  - "task scheduler, linking from TPL"
ms.assetid: 27ece374-ed5b-49ef-9cec-b20db34a65e8
---
# How to: Specify a Task Scheduler in a Dataflow Block

This document demonstrates how to associate a specific task scheduler when you use dataflow in your application. The example uses the [System.Threading.Tasks.ConcurrentExclusiveSchedulerPair](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ConcurrentExclusiveSchedulerPair) class in a Windows Forms application to show when reader tasks are active and when a writer task is active. It also uses the [System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*) method to enable a dataflow block to run on the user-interface thread.

> **Note:**
> The TPL dataflow library (the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the [📦 System.Threading.Tasks.Dataflow NuGet package](https://www.nuget.org/packages/System.Threading.Tasks.Dataflow).


## To Create the Windows Forms Application

1. Create a Visual C# or Visual Basic **Windows Forms Application** project. In the following steps, the project is named `WriterReadersWinForms`.

2. On the form designer for the main form, Form1.cs (Form1.vb for Visual Basic), add four [System.Windows.Forms.CheckBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.CheckBox) controls. Set the [System.Windows.Forms.Control.Text](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Text) property to **Reader 1** for `checkBox1`, **Reader 2** for `checkBox2`, **Reader 3** for `checkBox3`, and **Writer** for `checkBox4`. Set the [System.Windows.Forms.Control.Enabled](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Enabled) property for each control to `False`.

3. Add a [System.Windows.Forms.Timer](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Timer) control to the form. Set the [System.Windows.Forms.Timer.Interval](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Timer.Interval) property to `2500`.

## Adding Dataflow Functionality

 This section describes how to create the dataflow blocks that participate in the application and how to associate each one with a task scheduler.

### To Add Dataflow Functionality to the Application

1. In your project, add a reference to System.Threading.Tasks.Dataflow.dll.

2. Ensure that Form1.cs (Form1.vb for Visual Basic) contains the following `using` directives (`Imports` in Visual Basic).

     [TPLDataflow_WriterReadersWinForms#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs.md)
     [TPLDataflow_WriterReadersWinForms#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb.md)

3. Add a [System.Threading.Tasks.Dataflow.BroadcastBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BroadcastBlock%601) data member to the `Form1` class.

     [TPLDataflow_WriterReadersWinForms#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs.md)
     [TPLDataflow_WriterReadersWinForms#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb.md)

4. In the `Form1` constructor, after the call to `InitializeComponent`, create an [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) object that toggles the state of [System.Windows.Forms.CheckBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.CheckBox) objects.

     [TPLDataflow_WriterReadersWinForms#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs.md)
     [TPLDataflow_WriterReadersWinForms#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb.md)

5. In the `Form1` constructor, create a [System.Threading.Tasks.ConcurrentExclusiveSchedulerPair](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ConcurrentExclusiveSchedulerPair) object and four [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) objects, one [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) object for each [System.Windows.Forms.CheckBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.CheckBox) object. For each [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) object, specify an [System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions) object that has the [System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler) property set to the [System.Threading.Tasks.ConcurrentExclusiveSchedulerPair.ConcurrentScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ConcurrentExclusiveSchedulerPair.ConcurrentScheduler) property for the readers, and the [System.Threading.Tasks.ConcurrentExclusiveSchedulerPair.ExclusiveScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ConcurrentExclusiveSchedulerPair.ExclusiveScheduler) property for the writer.

     [TPLDataflow_WriterReadersWinForms#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs.md)
     [TPLDataflow_WriterReadersWinForms#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb.md)

6. In the `Form1` constructor, start the [System.Windows.Forms.Timer](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Timer) object.

     [TPLDataflow_WriterReadersWinForms#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs.md)
     [TPLDataflow_WriterReadersWinForms#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb.md)

7. On the form designer for the main form, create an event handler for the [System.Windows.Forms.Timer.Tick](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Timer.Tick) event for the timer.

8. Implement the [System.Windows.Forms.Timer.Tick](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Timer.Tick) event for the timer.

     [TPLDataflow_WriterReadersWinForms#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs.md)
     [TPLDataflow_WriterReadersWinForms#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb.md)

 Because the `toggleCheckBox` dataflow block acts on the user interface, it is important that this action occur on the user-interface thread. To accomplish this, during construction this object provides an [System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions) object that has the [System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler) property set to [System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*). The [System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*) method creates a [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler) object that performs work on the current synchronization context. Because the `Form1` constructor is called from the user-interface thread, the action for the `toggleCheckBox` dataflow block also runs on the user-interface thread.

 This example also uses the [System.Threading.Tasks.ConcurrentExclusiveSchedulerPair](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ConcurrentExclusiveSchedulerPair) class to enable some dataflow blocks to act concurrently, and another dataflow block to act exclusive with respect to all other dataflow blocks that run on the same [System.Threading.Tasks.ConcurrentExclusiveSchedulerPair](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ConcurrentExclusiveSchedulerPair) object. This technique is useful when multiple dataflow blocks share a resource and some require exclusive access to that resource, because it eliminates the requirement to manually synchronize access to that resource. The elimination of manual synchronization can make code more efficient.

## Example

 The following example shows the complete code for Form1.cs (Form1.vb for Visual Basic).

 [TPLDataflow_WriterReadersWinForms#100 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs#100)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/form1.cs.md)
 [TPLDataflow_WriterReadersWinForms#100 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb#100)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/vb/writerreaderswinforms/form1.vb.md)

## See also

- [Dataflow](dataflow-task-parallel-library.md)
