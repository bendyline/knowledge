---
description: "Learn more about: Walkthrough: Using Dataflow in a Windows Forms Application"
title: "Walkthrough: Using Dataflow in a Windows Forms Application"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "TPL dataflow library, in Windows Forms"
  - "Task Parallel Library, dataflows"
  - "Windows Forms, and TPL"
ms.topic: tutorial
---
# Walkthrough: Using Dataflow in a Windows Forms Application

This article demonstrates how to create a network of dataflow blocks that perform image processing in a Windows Forms application.

 This example loads image files from the specified folder, creates a composite image, and displays the result. The example uses the dataflow model to route images through the network. In the dataflow model, independent components of a program communicate with one another by sending messages. When a component receives a message, it performs some action and then passes the result to another component. Compare this with the control flow model, in which an application uses control structures, for example, conditional statements, loops, and so on, to control the order of operations in a program.

## Prerequisites

 Read [Dataflow](dataflow-task-parallel-library.md) before you start this walkthrough.

> **Note:**
> The TPL dataflow library (the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the [📦 System.Threading.Tasks.Dataflow NuGet package](https://www.nuget.org/packages/System.Threading.Tasks.Dataflow).


## Sections

 This walkthrough contains the following sections:

- [Creating the Windows Forms Application](#winforms)

- [Creating the Dataflow Network](#network)

- [Connecting the Dataflow Network to the User Interface](#ui)

- [The Complete Example](#complete)

<a name="winforms"></a>

## Creating the Windows Forms Application

 This section describes how to create the basic Windows Forms application and add controls to the main form.

### To Create the Windows Forms Application

1. In Visual Studio, create a Visual C# or Visual Basic **Windows Forms Application** project. In this document, the project is named `CompositeImages`.

2. On the form designer for the main form, Form1.cs (Form1.vb for Visual Basic), add a [System.Windows.Forms.ToolStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStrip) control.

3. Add a [System.Windows.Forms.ToolStripButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripButton) control to the [System.Windows.Forms.ToolStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStrip) control. Set the [System.Windows.Forms.ToolStripItem.DisplayStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.DisplayStyle) property to [System.Windows.Forms.ToolStripItemDisplayStyle.Text](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItemDisplayStyle.Text) and the [System.Windows.Forms.ToolStripItem.Text](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.Text) property to **Choose Folder**.

4. Add a second [System.Windows.Forms.ToolStripButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripButton) control to the [System.Windows.Forms.ToolStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStrip) control. Set the [System.Windows.Forms.ToolStripItem.DisplayStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.DisplayStyle) property to [System.Windows.Forms.ToolStripItemDisplayStyle.Text](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItemDisplayStyle.Text), the [System.Windows.Forms.ToolStripItem.Text](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.Text) property to **Cancel**, and the [System.Windows.Forms.ToolStripItem.Enabled](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.Enabled) property to `False`.

5. Add a [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox) object to the main form. Set the [System.Windows.Forms.Control.Dock](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Dock) property to [System.Windows.Forms.DockStyle.Fill](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DockStyle.Fill).

<a name="network"></a>

## Creating the Dataflow Network

 This section describes how to create the dataflow network that performs image processing.

### To Create the Dataflow Network

1. Add a reference to System.Threading.Tasks.Dataflow.dll to your project.

2. Ensure that Form1.cs (Form1.vb for Visual Basic) contains the following `using` (`Using` in Visual Basic) statements:

     [TPLDataflow_CompositeImages#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

3. Add the following data members to the `Form1` class:

     [TPLDataflow_CompositeImages#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

4. Add the following method, `CreateImageProcessingNetwork`, to the `Form1` class. This method creates the image processing network.

     [TPLDataflow_CompositeImages#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

5. Implement the `LoadBitmaps` method.

     [TPLDataflow_CompositeImages#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

6. Implement the `CreateCompositeBitmap` method.

     [TPLDataflow_CompositeImages#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

    > **Note:**
    > The C# version of the `CreateCompositeBitmap` method uses pointers to enable efficient processing of the [System.Drawing.Bitmap](https://learn.microsoft.com/search/?terms=System.Drawing.Bitmap) objects. Therefore, you must enable the **Allow unsafe code** option in your project in order to use the [unsafe](../../csharp/language-reference/keywords/unsafe.md) keyword. For more information about how to enable unsafe code in a Visual C# project, see [Build Page, Project Designer (C#)](https://learn.microsoft.com/visualstudio/ide/reference/build-page-project-designer-csharp).

 The following table describes the members of the network.

| Member | Type | Description |
| --- | --- | --- |
| `loadBitmaps` | [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) | Takes a folder path as input and produces a collection of [System.Drawing.Bitmap](https://learn.microsoft.com/search/?terms=System.Drawing.Bitmap) objects as output. |
| `createCompositeBitmap` | [System.Threading.Tasks.Dataflow.TransformBlock`2](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.TransformBlock%602) | Takes a collection of [System.Drawing.Bitmap](https://learn.microsoft.com/search/?terms=System.Drawing.Bitmap) objects as input and produces a composite bitmap as output. |
| `displayCompositeBitmap` | [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) | Displays the composite bitmap on the form. |
| `operationCancelled` | [System.Threading.Tasks.Dataflow.ActionBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ActionBlock%601) | Displays an image to indicate that the operation is canceled and enables the user to select another folder. |

 To connect the dataflow blocks to form a network, this example uses the [System.Threading.Tasks.Dataflow.ISourceBlock`1.LinkTo*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601.LinkTo*) method. The [System.Threading.Tasks.Dataflow.ISourceBlock`1.LinkTo*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ISourceBlock%601.LinkTo*) method contains an overloaded version that takes a [System.Predicate`1](https://learn.microsoft.com/search/?terms=System.Predicate%601) object that determines whether the target block accepts or rejects a message. This filtering mechanism enables message blocks to receive only certain values. In this example, the network can branch in one of two ways. The main branch loads the images from disk, creates the composite image, and displays that image on the form. The alternate branch cancels the current operation. The [System.Predicate`1](https://learn.microsoft.com/search/?terms=System.Predicate%601) objects enable the dataflow blocks along the main branch to switch to the alternative branch by rejecting certain messages. For example, if the user cancels the operation, the dataflow block `createCompositeBitmap` produces `null` (`Nothing` in Visual Basic) as its output. The dataflow block `displayCompositeBitmap` rejects `null` input values, and therefore, the message is offered to `operationCancelled`. The dataflow block `operationCancelled` accepts all messages and therefore, displays an image to indicate that the operation is canceled.

 The following illustration shows the image processing network:

 Illustration that shows the image processing network.

 Because the `displayCompositeBitmap` and `operationCancelled` dataflow blocks act on the user interface, it is important that these actions occur on the user-interface thread. To accomplish this, during construction, these objects each provide an [System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions) object that has the [System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler) property set to [System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*). The [System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*) method creates a [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler) object that performs work on the current synchronization context. Because the `CreateImageProcessingNetwork` method is called from the handler of the **Choose Folder** button, which runs on the user-interface thread, the actions for the `displayCompositeBitmap` and `operationCancelled` dataflow blocks also run on the user-interface thread.

 This example uses a shared cancellation token instead of setting the [System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken) property because the [System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken) property permanently cancels dataflow block execution. A cancellation token enables this example to reuse the same dataflow network multiple times, even when the user cancels one or more operations. For an example that uses [System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken) to permanently cancel the execution of a dataflow block, see [How to: Cancel a Dataflow Block](how-to-cancel-a-dataflow-block.md).

<a name="ui"></a>

## Connecting the Dataflow Network to the User Interface

 This section describes how to connect the dataflow network to the user interface. The creation of the composite image and cancellation of the operation are initiated from the **Choose Folder** and **Cancel** buttons. When the user chooses either of these buttons, the appropriate action is initiated in an asynchronous manner.

### To Connect the Dataflow Network to the User Interface

1. On the form designer for the main form, create an event handler for the [System.Windows.Forms.ToolStripItem.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.Click) event for the **Choose Folder** button.

2. Implement the [System.Windows.Forms.ToolStripItem.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.Click) event for the **Choose Folder** button.

     [TPLDataflow_CompositeImages#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

3. On the form designer for the main form, create an event handler for the [System.Windows.Forms.ToolStripItem.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.Click) event for the **Cancel** button.

4. Implement the [System.Windows.Forms.ToolStripItem.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItem.Click) event for the **Cancel** button.

     [TPLDataflow_CompositeImages#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

<a name="complete"></a>

## The Complete Example

 The following example shows the complete code for this walkthrough.

 [TPLDataflow_CompositeImages#100 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs#100)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_compositeimages/cs/compositeimages/form1.cs.md)

 The following illustration shows typical output for the common \Sample Pictures\ folder.

 The Windows Forms Application

## See also

- [Dataflow](dataflow-task-parallel-library.md)
