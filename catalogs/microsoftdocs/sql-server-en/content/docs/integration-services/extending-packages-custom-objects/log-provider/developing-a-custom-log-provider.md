---
title: "Developing a Custom Log Provider"
description: "Developing a Custom Log Provider"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "SSIS packages, log providers"
  - "custom log providers [Integration Services]"
  - "SQL Server Integration Services packages, log providers"
  - "log providers [Integration Services]"
  - "packages [Integration Services], logs"
  - "Integration Services packages, log providers"
---
# Developing a Custom Log Provider


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


   Integration Services 
 has extensive logging capabilities that make it possible to capture events that occur during package execution.  Integration Services 
 includes a variety of log providers that enable logs to be created and stored in formats such as XML, text, database, or in the Windows event log. If the log providers and the output formats that are provided do not entirely meet your requirements, you can create a custom log provider.  
  
 To create a custom log provider, you have to create a class that inherits from the [Microsoft.SqlServer.Dts.Runtime.LogProviderBase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.LogProviderBase) base class, apply the [Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute) attribute to your new class, and override the important methods and properties of the base class, including the [Microsoft.SqlServer.Dts.Runtime.LogProviderBase.ConfigString%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.LogProviderBase.ConfigString%252A) property and the [Microsoft.SqlServer.Dts.Runtime.LogProviderBase.Log%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.LogProviderBase.Log%252A) method.  
  
## In This Section  
 This section describes how to create, configure, and code a custom log provider.  
  
 [Creating a Custom Log Provider](creating-a-custom-log-provider.md)  
 Describes how to create the classes for a custom log provider project.  
  
 [Coding a Custom Log Provider](coding-a-custom-log-provider.md)  
 Describes how to implement a custom log provider by overriding the methods and properties of the base class.  
  
 [Developing a User Interface for a Custom Log Provider](developing-a-user-interface-for-a-custom-log-provider.md)  
 Custom user interfaces for custom log providers are not supported in  SQL Server 
  Integration Services 
.  
  
## Related Topics  
  
### Information Common to all Custom Objects  
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
  
 [Developing a Custom ForEach Enumerator](../foreach-enumerator/developing-a-custom-foreach-enumerator.md)  
 Discusses how to program custom enumerators.  
  
 [Developing a Custom Data Flow Component](../data-flow/developing-a-custom-data-flow-component.md)  
 Discusses how to program custom data flow sources, transformations, and destinations.
