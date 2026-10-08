---
title: "Extending Packages with Scripting"
description: "Extending Packages with Scripting"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Integration Services, scripting"
  - "SSIS, scripting"
  - "scripts [Integration Services], about scripting"
---
# Extending Packages with Scripting


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  If you find that the built-in components  Integration Services 
 do not meet your requirements, you can extend the power of  Integration Services 
 by coding your own extensions. You have two discrete options for extending your packages: you can write code within the powerful wrappers provided by the Script task and the Script component, or you can create custom  Integration Services 
 extensions from scratch by deriving from the base classes provided by the  Integration Services 
 object model.  
  
 This section explores the simpler of the two options - extending packages with scripting.  
  
 The Script task and the Script component let you extend both the control flow and the data flow of an  Integration Services 
 package with very little coding. Both objects use the  Microsoft 
  Visual Studio 
 Tools for Applications (VSTA) development environment and the  Microsoft 
 Visual Basic or  Microsoft 
 Visual C# programming languages, and benefit from all the functionality offered by the  Microsoft 
  .NET Framework 
 class library, as well as custom assemblies. The Script task and the Script component let the developer create custom functionality without having to write all the infrastructure code that is typically required when developing a custom task or custom data flow component.  
  
## In This Section  
 [Comparing the Script Task and the Script Component](comparing-the-script-task-and-the-script-component.md)  
 Discusses the similarities and differences between the Script task and the Script component.  
  
 [Comparing Scripting Solutions and Custom Objects](comparing-scripting-solutions-and-custom-objects.md)  
 Discusses the criteria to use in choosing between a scripting solution and the development of a custom object.  
  
 [Referencing Other Assemblies in Scripting Solutions](referencing-other-assemblies-in-scripting-solutions.md)  
 Discusses the steps required to reference and use external assemblies and namespaces in a scripting project.  
  
 [Extending the Package with the Script Task](task/extending-the-package-with-the-script-task.md)  
 Discusses how to create custom tasks by using the Script task. A task is typically called one time per package execution, or one time for each data source opened by a package.  
  
 [Extending the Data Flow with the Script Component](data-flow-script-component/extending-the-data-flow-with-the-script-component.md)  
 Discusses how to create custom data flow sources, transformations, and destinations by using the Script component. A data flow component is typically called one time for each row of data that is processed.  
  
## Related content

- [Integration Services error and message reference](../integration-services-error-and-message-reference.md)
- [Extending Packages with Custom Objects](../extending-packages-custom-objects/extending-packages-with-custom-objects.md)
- [Building Packages Programmatically](../building-packages-programmatically/building-packages-programmatically.md)
- [SQL Server Integration Services](../sql-server-integration-services.md)
