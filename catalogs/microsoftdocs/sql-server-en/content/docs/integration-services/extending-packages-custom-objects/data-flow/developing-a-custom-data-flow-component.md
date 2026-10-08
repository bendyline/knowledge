---
title: "Developing a Custom Data Flow Component"
description: "Developing a Custom Data Flow Component"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "data flow task [Integration Services], extending"
  - "data flow [Integration Services], extending"
  - "extending data flow task [Integration Services]"
  - "components [Integration Services], data flow"
dev_langs:
  - "VB"
  - "CSharp"
---
# Developing a Custom Data Flow Component


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The data flow task consists of components that connect to a variety of data sources and then transform and route that data at high speed.  Microsoft 
  SQL Server 
  Integration Services 
 provides an extensible object model that lets developers create custom sources, transformations, and destinations that you can use in  SQL Server Data Tools (SSDT) 
 and in deployed packages. This section contains topics that will guide you in developing custom data flow components.  
  
## In This Section  
 [Creating a Custom Data Flow Component](creating-a-custom-data-flow-component.md)  
 Describes the initial steps in creating a custom data flow component.  
  
 [Design-time Methods of a Data Flow Component](design-time-methods-of-a-data-flow-component.md)  
 Describes the design-time methods to implement in a custom data flow component.  
  
 [Run-time Methods of a Data Flow Component](run-time-methods-of-a-data-flow-component.md)  
 Describes the run-time methods to implement in a custom data flow component.  
  
 [Execution Plan and Buffer Allocation](execution-plan-and-buffer-allocation.md)  
 Describes the data flow execution plan and the allocation of data buffers.  
  
 [Working with Data Types in the Data Flow](working-with-data-types-in-the-data-flow.md)  
 Explains how the data flow maps  Integration Services 
 data types to .NET Framework managed data types.  
  
 [Validating a Data Flow Component](validating-a-data-flow-component.md)  
 Explains the methods used to validate component configuration and to reconfigure component metadata.  
  
 [Implementing External Metadata](implementing-external-metadata.md)  
 Explains how to use external metadata columns for data validation.  
  
 [Raising and Defining Events in a Data Flow Component](raising-and-defining-events-in-a-data-flow-component.md)  
 Explains how to raise predefined and custom events.  
  
 [Logging and Defining Log Entries in a Data Flow Component](logging-and-defining-log-entries-in-a-data-flow-component.md)  
 Explains how to create and write to custom log entries.  
  
 [Using Error Outputs in a Data Flow Component](using-error-outputs-in-a-data-flow-component.md)  
 Explains how to redirect error rows to an alternative output.  
  
 [Upgrading the Version of a Data Flow Component](upgrading-the-version-of-a-data-flow-component.md)  
 Explains how to update saved component metadata when a new version of your component is first used.  
  
 [Developing a User Interface for a Data Flow Component](developing-a-user-interface-for-a-data-flow-component.md)  
 Explains how to implement a custom editor for a component.  
  
 [Developing Specific Types of Data Flow Components](../../extending-packages-custom-objects-data-flow-types/developing-specific-types-of-data-flow-components.md)  
 Contains information about developing the three types of data flow components: sources, transformations, and destinations.  
  
### Information Common to All Custom Objects  
 For information that is common to all the type of custom objects that you can create in  Integration Services 
, see the following topics:  
  
 [Developing Custom Objects for Integration Services](../developing-custom-objects-for-integration-services.md)  
 Describes the basic steps in implementing all types of custom objects for  Integration Services 
.  
  
 [Persisting Custom Objects](../persisting-custom-objects.md)  
 Describes custom persistence and explains when it is necessary.  
  
 [Building, Deploying, and Debugging Custom Objects](../building-deploying-and-debugging-custom-objects.md)  
 Describes the techniques for building, signing, deploying, and debugging custom objects.  
  
### Information about Other Custom Objects  
 For information on the other types of custom objects that you can create in  Integration Services 
, see the following topics:  
  
 [Developing a Custom Task](../task/developing-a-custom-task.md)  
 Discusses how to program custom tasks.  
  
 [Developing a Custom Connection Manager](../connection-manager/developing-a-custom-connection-manager.md)  
 Discusses how to program custom connection managers.  
  
 [Developing a Custom Log Provider](../log-provider/developing-a-custom-log-provider.md)  
 Discusses how to program custom log providers.  
  
 [Developing a Custom ForEach Enumerator](../foreach-enumerator/developing-a-custom-foreach-enumerator.md)  
 Discusses how to program custom enumerators.  
  
## Related content

- [Microsoft.SqlServer.Dts.Pipeline](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline)
- [Microsoft.SqlServer.Dts.Pipeline.Wrapper](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper)
- [Microsoft.SqlServer.Dts.Pipeline.Design](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Design)
- [Integration Services error and message reference](../../integration-services-error-and-message-reference.md)
- [Extending the Data Flow with the Script Component](../../extending-packages-scripting/data-flow-script-component/extending-the-data-flow-with-the-script-component.md)
- [Comparing Scripting Solutions and Custom Objects](../../extending-packages-scripting/comparing-scripting-solutions-and-custom-objects.md)
