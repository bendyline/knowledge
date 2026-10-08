---
title: "Raising and Defining Events in a Data Flow Component"
description: "Raising and Defining Events in a Data Flow Component"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "data flow components [Integration Services], events"
  - "events [Integration Services], custom"
  - "custom events [Integration Services]"
  - "custom data flow components [Integration Services], events"
  - "events [Integration Services], raising"
  - "predefined events [Integration Services]"
dev_langs:
  - "VB"
  - "CSharp"
---
# Raising and Defining Events in a Data Flow Component


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Component developers can raise a subset of the events defined in the [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents) interface by calling the methods exposed on the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%252A) property. You can also define custom events by using the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.EventInfos%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.EventInfos%252A) collection, and raise them during execution by using the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%252A) method. This section describes how to create and raise an event, and provides guidelines on when you should raise events at design time.  
  
## Raising Events  
 Components raise events by using the **Fire\<X>** methods of the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100) interface. You can raise events during component design and execution. Typically, during component design, the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireError%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireError%252A) and [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireWarning%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireWarning%252A) methods are called during validation. These events display messages in the **Error List** pane of  SQL Server Data Tools (SSDT) 
 and provide feedback to users of the component when a component is incorrectly configured.  
  
 Components can also raise events at any point during execution. Events allow component developers to provide feedback to users of the component as it executes. Calling the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireError%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireError%252A) method during execution is likely to fail the package.  
  
## Defining and Raising Custom Events  
  
### Defining a Custom Event  
 Custom events are created by calling the [Microsoft.SqlServer.Dts.Runtime.Wrapper.IDTSEventInfos100.Add%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Wrapper.IDTSEventInfos100.Add%252A) method of the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.EventInfos%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.EventInfos%252A) collection. This collection is set by the data flow task and provided as a property to the component developer through the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent) base class. This class contains custom events defined by the data flow task and custom events defined by the component during the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.RegisterEvents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.RegisterEvents%252A) method.  
  
 The custom events of a component are not persisted in the package XML. Therefore, the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.RegisterEvents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.RegisterEvents%252A) method is called during both design and execution to allow the component to define the events it raises.  
  
 The *allowEventHandlers* parameter of the [Microsoft.SqlServer.Dts.Runtime.Wrapper.IDTSEventInfos100.Add%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Wrapper.IDTSEventInfos100.Add%252A) method specifies whether the component allows [Microsoft.SqlServer.Dts.Runtime.DtsEventHandler](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsEventHandler) objects to be created for the event. Note that [Microsoft.SqlServer.Dts.Runtime.DtsEventHandlers](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsEventHandlers) are synchronous. Therefore the component does not resume execution until an [Microsoft.SqlServer.Dts.Runtime.DtsEventHandler](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsEventHandler) attached to the custom event has finished executing. If the *allowEventHandlers* parameter is **true**, each parameter of the event is automatically made available to any [Microsoft.SqlServer.Dts.Runtime.DtsEventHandler](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsEventHandler) objects through variables that are created and populated automatically by the  SQL Server 
  Integration Services 
 runtime.  
  
### Raising a Custom Event  
 Components raise custom events by calling the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%252A) method, and providing the name, text, and parameters of the event. If the *allowEventHandlers* parameter is **true**, any [Microsoft.SqlServer.Dts.Runtime.DtsEventHandlers](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsEventHandlers) that are created for the custom event are executed by the  SSIS 
 run-time engine.  
  
### Custom Event Sample  
 The following code example shows a component that defines a custom event during the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.RegisterEvents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.RegisterEvents%252A) method, and then raises the event at run time by calling the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%252A) method.  
  
```csharp  
public override void RegisterEvents()  
{  
    string [] parameterNames = new string[2]{"RowCount", "StartTime"};  
    ushort [] parameterTypes = new ushort[2]{ DtsConvert.VarTypeFromTypeCode(TypeCode.Int32), DtsConvert.VarTypeFromTypeCode(TypeCode.DateTime)};  
    string [] parameterDescriptions = new string[2]{"The number of rows to sort.", "The start time of the Sort operation."};  
    EventInfos.Add("StartingSort","Fires when the component begins sorting the rows.",false,ref parameterNames, ref parameterTypes, ref parameterDescriptions);  
}  
public override void ProcessInput(int inputID, PipelineBuffer buffer)  
{  
    while (buffer.NextRow())  
    {  
       // Process buffer rows.  
    }  
  
    IDTSEventInfo100 eventInfo = EventInfos["StartingSort"];  
    object []arguments = new object[2]{buffer.RowCount, DateTime.Now };  
    ComponentMetaData.FireCustomEvent("StartingSort", "Beginning sort operation.", ref arguments, ComponentMetaData.Name, ref FireSortEventAgain);  
}  
```  
  
```vb  
Public  Overrides Sub RegisterEvents()   
  Dim parameterNames As String() = New String(2) {"RowCount", "StartTime"}   
  Dim parameterTypes As System.UInt16() = New System.UInt16(2) {DtsConvert.VarTypeFromTypeCode(TypeCode.Int32), DtsConvert.VarTypeFromTypeCode(TypeCode.DateTime)}   
  Dim parameterDescriptions As String() = New String(2) {"The number of rows to sort.", "The start time of the Sort operation."}   
  EventInfos.Add("StartingSort", "Fires when the component begins sorting the rows.", False, parameterNames, parameterTypes, parameterDescriptions)   
End Sub   
  
Public  Overrides Sub ProcessInput(ByVal inputID As Integer, ByVal buffer As PipelineBuffer)   
  While buffer.NextRow   
  End While   
  Dim eventInfo As IDTSEventInfo100 = EventInfos("StartingSort")   
  Dim arguments As Object() = New Object(2) {buffer.RowCount, DateTime.Now}   
  ComponentMetaData.FireCustomEvent("StartingSort", _  
    "Beginning sort operation.", arguments, _  
    ComponentMetaData.Name, FireSortEventAgain)   
End Sub  
```  

## Related content

- [Integration Services (SSIS) Event Handlers](../../integration-services-ssis-event-handlers.md)
