---
title: "Developing a Custom ForEach Enumerator"
description: "Developing a Custom ForEach Enumerator"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "custom foreach enumerators [Integration Services]"
  - "custom foreach enumerators [Integration Services], about custom foreach enumerators"
  - "foreach enumerators [Integration Services]"
---
# Developing a Custom ForEach Enumerator


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


   Integration Services 
 uses foreach enumerators to iterate over the items in a collection and perform the same tasks for each element.  Integration Services 
 includes a variety of foreach enumerators that support the most commonly used collections, such as all the files in a folder, all the tables in a database, or all the elements of a list stored in a package variable. If the foreach enumerators and collections that are provided do not entirely meet your requirements, you can create a custom foreach enumerator.  
  
 To create a custom foreach enumerator, you have to create a class that inherits from the [Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator) base class, apply the [Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute) attribute to your new class, and override the important methods and properties of the base class, including the [Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator.GetEnumerator%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator.GetEnumerator%252A) method.  
  
## In This Section  
 This section describes how to create, configure, and code a custom foreach enumerator and its custom user interface.  
  
 [Creating a Custom Foreach Enumerator](creating-a-custom-foreach-enumerator.md)  
 Describes how to create the classes for a custom foreach enumerator project.  
  
 [Coding a Custom Foreach Enumerator](coding-a-custom-foreach-enumerator.md)  
 Describes how to implement a custom foreach enumerator by overriding the methods and properties of the base class.  
  
 [Developing a User Interface for a Custom ForEach Enumerator](developing-a-user-interface-for-a-custom-foreach-enumerator.md)  
 Describes how to implement the user interface class and the form that is used to configure the custom foreach enumerator.  
  
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
  
 [Developing a Custom Log Provider](../log-provider/developing-a-custom-log-provider.md)  
 Discusses how to program custom log providers.  
  
 [Developing a Custom Data Flow Component](../data-flow/developing-a-custom-data-flow-component.md)  
 Discusses how to program custom data flow sources, transformations, and destinations.
