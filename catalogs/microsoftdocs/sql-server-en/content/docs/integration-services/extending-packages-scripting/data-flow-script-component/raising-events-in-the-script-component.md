---
title: "Raising Events in the Script Component"
description: "Raising Events in the Script Component"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "Script component [Integration Services], raising events"
---
# Raising Events in the Script Component


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Events provide a way to report errors, warnings, and other information, such as task progress or status, to the containing package. The package provides event handlers for managing event notifications. The Script component can raise events by calling methods on the [Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.ComponentMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.ComponentMetaData%252A) property of the **ScriptMain** class. For more information about how  Integration Services 
 packages handle events, see [Integration Services (SSIS) Event Handlers](../../integration-services-ssis-event-handlers.md).  
  
 Events can be logged to any log provider that is enabled in the package. Log providers store information about events in a data store. The Script component can also use the [Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.Log%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.Log%252A) method to log information to a log provider without raising an event. For more information about how to use the [Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.Log%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.Log%252A) method, see the following section.  
  
 To raise an event, the Script task calls one of the following methods of the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100) interface exposed by the [Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.ComponentMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.ScriptComponent.ComponentMetaData%252A) property:  
  
| Event | Description |
| --- | --- |
| [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireCustomEvent%252A) | Raises a user-defined custom event in the package. |
| [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireError%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireError%252A) | Informs the package of an error condition. |
| [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireInformation%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireInformation%252A) | Provides information to the user. |
| [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireProgress%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireProgress%252A) | Informs the package of the progress of the component. |
| [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireWarning%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSComponentMetaData100.FireWarning%252A) | Informs the package that the component is in a state that warrants user notification, but is not an error condition. |
  
 Here is a simple example of raising an Error event:  
  
 `Dim myMetadata as IDTSComponentMetaData100`  
  
 `myMetaData = Me.ComponentMetaData`  
  
 `myMetaData.FireError(...)`  
  
## Related content

- [Integration Services (SSIS) Event Handlers](../../integration-services-ssis-event-handlers.md)
