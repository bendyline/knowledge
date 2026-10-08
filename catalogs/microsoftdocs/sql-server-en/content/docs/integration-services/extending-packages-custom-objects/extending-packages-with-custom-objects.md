---
title: "Extending Packages with Custom Objects"
description: "Extending Packages with Custom Objects"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
---
# Extending Packages with Custom Objects


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  If you find that the components provided in  Integration Services 
 do not meet your requirements, you can extend the power of  Integration Services 
 by coding your own extensions. You have two discrete options for extending your packages: you can write code within the powerful wrappers provided by the Script task and the Script component, or you can create custom  Integration Services 
 extensions from scratch by deriving from the base classes provided by the  Integration Services 
 object model.  
  
 This section explores the more advanced of the two options - extending packages with custom objects.  
  
 When your custom  Integration Services 
 solution requires more flexibility than the Script task and the Script component provide, or when you need a component that you can reuse in multiple packages, the  Integration Services 
 object model lets you build custom tasks, data flow components, and other package objects in managed code from the ground up.  
  
## In This Section  
 [Developing Custom Objects for Integration Services](developing-custom-objects-for-integration-services.md)  
 Discusses the custom objects that can be created for  Integration Services 
, and summarizes the essential steps and settings.  
  
 [Persisting Custom Objects](persisting-custom-objects.md)  
 Discusses the default persistence of custom objects, and the process of implementing custom persistence.  
  
 [Building, Deploying, and Debugging Custom Objects](building-deploying-and-debugging-custom-objects.md)  
 Discusses the common approaches to building, deploying and testing the various types of custom objects.  
  
 [Developing a Custom Task](task/developing-a-custom-task.md)  
 Describes the process of coding a custom task.  
  
 [Developing a Custom Connection Manager](connection-manager/developing-a-custom-connection-manager.md)  
 Describes the process of coding a custom connection manager.  
  
 [Developing a Custom Log Provider](log-provider/developing-a-custom-log-provider.md)  
 Describes the process of coding a custom log provider.  
  
 [Developing a Custom ForEach Enumerator](foreach-enumerator/developing-a-custom-foreach-enumerator.md)  
 Describes the process of coding a custom enumerator.  
  
 [Developing a Custom Data Flow Component](data-flow/developing-a-custom-data-flow-component.md)  
 Discusses how to program custom data flow sources, transformations, and destinations.  
  
## Related content

- [Integration Services error and message reference](../integration-services-error-and-message-reference.md)
- [Extending Packages with Scripting](../extending-packages-scripting/extending-packages-with-scripting.md)
- [Building Packages Programmatically](../building-packages-programmatically/building-packages-programmatically.md)
- [Comparing Scripting Solutions and Custom Objects](../extending-packages-scripting/comparing-scripting-solutions-and-custom-objects.md)
- [SQL Server Integration Services](../sql-server-integration-services.md)
