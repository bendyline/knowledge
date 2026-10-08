---
title: "Run-time Methods of a Data Flow Component"
description: "Run-time Methods of a Data Flow Component"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "run-time [Integration Services]"
  - "data flow components [Integration Services], run-time methods"
dev_langs:
  - "VB"
  - "CSharp"
---
# Run-time Methods of a Data Flow Component


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  At run time, the data flow task examines the sequence of components, prepares an execution plan, and manages a pool of worker threads that execute the work plan. The task loads rows of data from sources, processes them through transformations, then saves them to destinations.  
  
## Sequence of Method Execution  
 During the execution of a data flow component, a subset of the methods in the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent) base class is called. The methods, and the sequence in which they are called, are always the same, with the exception of the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) and [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) methods. These two methods are called based on the existence and configuration of a component's [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSInput100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSInput100) and [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutput100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutput100) objects.  
  
 The following list shows the methods in the order in which they are called during component execution. Note that [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A), when called, is always called before [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A).  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.AcquireConnections%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.AcquireConnections%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReleaseConnections%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReleaseConnections%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrepareForExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrepareForExecute%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.AcquireConnections%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.AcquireConnections%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PostExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PostExecute%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReleaseConnections%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReleaseConnections%252A)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Cleanup%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Cleanup%252A)  
  
### PrimeOutput Method  
 The [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.PrimeOutput%252A) method is called when a component has at least one output, attached to a downstream component through an [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSPath100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSPath100) object, and the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutput100.SynchronousInputID%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutput100.SynchronousInputID%252A) property of the output is zero. The [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.PrimeOutput%252A) method is called for source components and for transformations with asynchronous outputs. Unlike the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) method described below, the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) method is only called once for each component that requires it.  
  
### ProcessInput Method  
 The [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.ProcessInput%252A) method is called for components that have at least one input attached to an upstream component by an [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSPath100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSPath100) object. The [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSRuntimeComponent100.ProcessInput%252A) method is called for destination components and for transformations with synchronous outputs. [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) is called repeatedly until there are no more rows to process from upstream components.  
  
## Working with Inputs and Outputs  
 At run time, data flow components perform the following tasks:  
  
-   Source components add rows.  
  
-   Transformation components with synchronous outputs receive rows provided by source components.  
  
-   Transformation components with asynchronous outputs receive rows and add rows.  
  
-   Destination components receive rows and then load them into a destination.  
  
 During execution, the data flow task allocates [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer) objects that contain all the columns defined in the output column collections of a sequence of components. For example, if each of four components in a data flow sequence adds one output column to its output column collection,the buffer that is provided to each component contains four columns, one for each output column per component. Because of this behavior, a component sometimes receives buffers that contain columns it does not use.  
  
 Since the buffers received by your component may contain columns that the component will not use, you must locate the columns that you want to use in your component's input and output column collections in the buffer provided to the component by the data flow task. You do this by using the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSBufferManager100.FindColumnByLineageID%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSBufferManager100.FindColumnByLineageID%252A) method of the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.BufferManager%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.BufferManager%252A) property. For performance reasons, this task is ordinarily performed during the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%252A) method, rather than in [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) or [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A).  
  
 [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%252A) is called before the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) and [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) methods, and is the first opportunity for a component to perform this work after the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.BufferManager%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.BufferManager%252A) becomes available to the component. During this method, the component should locate its columns in the buffers and store this information internally so the columns can be used in either the  [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) or [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) methods.  
  
 The following code example demonstrates how a transformation component with a synchronous output locates its input columns in the buffer during [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PreExecute%252A).  
  
```csharp  
private int []bufferColumnIndex;  
public override void PreExecute()  
{  
    IDTSInput100 input = ComponentMetaData.InputCollection[0];  
    bufferColumnIndex = new int[input.InputColumnCollection.Count];  
  
    for( int x=0; x < input.InputColumnCollection.Count; x++)  
    {  
        IDTSInputColumn100 column = input.InputColumnCollection[x];  
        bufferColumnIndex[x] = BufferManager.FindColumnByLineageID( input.Buffer, column.LineageID);  
    }  
}  
```  
  
```vb  
Dim bufferColumnIndex As Integer()  
  
    Public Overrides Sub PreExecute()  
  
        Dim input As IDTSInput100 = ComponentMetaData.InputCollection(0)  
  
        ReDim bufferColumnIndex(input.InputColumnCollection.Count)  
  
        For x As Integer = 0 To input.InputColumnCollection.Count  
  
            Dim column As IDTSInputColumn100 = input.InputColumnCollection(x)  
            bufferColumnIndex(x) = BufferManager.FindColumnByLineageID(input.Buffer, column.LineageID)  
  
        Next  
  
    End Sub  
```  
  
### Adding Rows  
 Components supply rows to downstream components by adding rows to [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer) objects. The data flow task provides an array of output buffers - one for each [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutput100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutput100) object that is connected to a downstream component - as a parameter to the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) method. Source components and transformation components with asynchronous outputs add rows to the buffers and call the [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.SetEndOfRowset%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.SetEndOfRowset%252A) method when they are finished adding rows. The data flow task manages the output buffers that it supplies to components and, as a buffer becomes full, automatically moves the rows in the buffer to the next component. The [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) method is called one time per component, unlike  the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) method, which is called repeatedly.  
  
 The following code example demonstrates how a component adds rows to its output buffers during the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A) method, then calls the [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.SetEndOfRowset%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.SetEndOfRowset%252A) method.  
  
```csharp  
public override void PrimeOutput( int outputs, int []outputIDs,PipelineBuffer []buffers)  
{  
    for( int x=0; x < outputs; x++ )  
    {  
        IDTSOutput100 output = ComponentMetaData.OutputCollection.GetObjectByID( outputIDs[x]);  
        PipelineBuffer buffer = buffers[x];  
  
        // TODO: Add rows to the output buffer.  
    }  
    foreach( PipelineBuffer buffer in buffers )  
    {  
        /// Notify the data flow task that no more rows are coming.  
        buffer.SetEndOfRowset();  
    }  
}  
```  
  
```vb  
public overrides sub PrimeOutput( outputs as Integer , outputIDs() as Integer ,buffers() as PipelineBuffer buffers)  
  
    For x As Integer = 0 To outputs.MaxValue  
  
        Dim output As IDTSOutput100 = ComponentMetaData.OutputCollection.GetObjectByID(outputIDs(x))  
        Dim buffer As PipelineBuffer = buffers(x)  
  
        ' TODO: Add rows to the output buffer.  
  
    Next  
  
    For Each buffer As PipelineBuffer In buffers  
  
        ' Notify the data flow task that no more rows are coming.  
        buffer.SetEndOfRowset()  
  
    Next  
  
End Sub  
```  
  
 For more information about developing components that add rows to output buffers, see [Developing a Custom Source Component](../../extending-packages-custom-objects-data-flow-types/developing-a-custom-source-component.md) and [Developing a Custom Transformation Component with Asynchronous Outputs](../../extending-packages-custom-objects-data-flow-types/developing-a-custom-transformation-component-with-asynchronous-outputs.md).  
  
### Receiving Rows  
 Components receive rows from upstream components in [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer) objects. The data flow task provides a [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer) object that contains the rows added to the data flow by upstream components as a parameter to the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) method. This input buffer can be used to examine and modify the rows and columns in the buffer, but cannot be used to add or remove rows. The [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) method is called repeatedly until there are no more available buffers. The last time it is called, the [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.EndOfRowset%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.EndOfRowset%252A) property is **true**. You can iterate over the collection of rows in the buffer by using the [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.NextRow%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.NextRow%252A) method, which advances the buffer to the next row. This method returns **false** when the buffer is on the last row in the collection. You do not have to check the [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.EndOfRowset%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.EndOfRowset%252A) property unless you have to perform an additional action after the last rows of data have been processed.  
  
 The following text shows the correct pattern for using the [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.NextRow%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.NextRow%252A) method and the [Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.EndOfRowset%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineBuffer.EndOfRowset%252A) property:  
  
 `while (buffer.NextRow())`  
  
 `{`  
  
 `// Do something with each row.`  
  
 `}`  
  
 `if (buffer.EndOfRowset)`  
  
 `{`  
  
 `// Optionally, do something after all rows have been processed.`  
  
 `}`  
  
 The following code example demonstrates how a component processes the rows in input buffers during the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) method.  
  
```csharp  
public override void ProcessInput( int inputID, PipelineBuffer buffer )  
{  
    {  
        IDTSInput100 input = ComponentMetaData.InputCollection.GetObjectByID(inputID);  
        while( buffer.NextRow())  
        {  
            // TODO: Examine the columns in the current row.  
        }  
}  
```  
  
```vb  
Public Overrides Sub ProcessInput(ByVal inputID As Integer, ByVal buffer As PipelineBuffer)  
  
        Dim input As IDTSInput100 = ComponentMetaData.InputCollection.GetObjectByID(inputID)  
        While buffer.NextRow() = True  
  
            ' TODO: Examine the columns in the current row.  
        End While  
  
End Sub  
```  
  
 For more information about developing components that receive rows in input buffers, see [Developing a Custom Destination Component](../../extending-packages-custom-objects-data-flow-types/developing-a-custom-destination-component.md) and [Developing a Custom Transformation Component with Synchronous Outputs](../../extending-packages-custom-objects-data-flow-types/developing-a-custom-transformation-component-with-synchronous-outputs.md).  
  
## Related content

- [Design-time Methods of a Data Flow Component](design-time-methods-of-a-data-flow-component.md)
