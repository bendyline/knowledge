---
title: "Using custom assemblies with reports"
description: Develop a custom code assembly using the Microsoft .NET Framework so you can reference the assembly from within your report definition files.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: custom-assemblies
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "custom assemblies [Reporting Services]"
  - "assemblies [Reporting Services], custom"
  - "custom assemblies [Reporting Services], about custom assemblies"
---
# Using custom assemblies with reports
  In  Reporting Services 
, you can write custom code for report item values, styles, and formatting. For example, you can use custom code to format currencies based on locale, flag certain values with special formatting, or apply other business rules that are in practice for your company. One way to include this code in your reports is to create a custom code assembly using the  Microsoft 
  .NET Framework 
 that you can reference from within your report definition files. The server calls the functions in your custom assemblies when a report is run. Custom assemblies can be used to retrieve specialized functions that you plan to use in your reports.  
  
## In this section  
 [Referencing Assemblies in an RDL File](referencing-assemblies-in-an-rdl-file.md)  
 Describes how to reference your custom assemblies in a report definition language file.  
  
 [Deploying a Custom Assembly](deploying-a-custom-assembly.md)  
 Describes how to deploy a custom assembly to Report Designer and the report server.  
  
 [Using Strong-Named Custom Assemblies](using-strong-named-custom-assemblies.md)  
 Describes how to use custom assemblies with strong names.  
  
 [Asserting Permissions in Custom Assemblies](asserting-permissions-in-custom-assemblies.md)  
 Describes how to deploy custom assemblies with limited and specific permissions and how to assert those permissions in code.  
  
 [Accessing Custom Assemblies Through Expressions](accessing-custom-assemblies-through-expressions.md)  
 Describes how to call custom assembly methods as report expressions in your report definitions.  
  
 [Initializing Custom Assembly Objects](initializing-custom-assembly-objects.md)  
 Describes how to initialize values for custom assembly objects called from a report.  
  
 [How to: Debug Custom Assemblies](how-to-debug-custom-assemblies.md)  
 Describes how to debug your custom assembly code.  
  
## Related content

- [Report Definition Language (SSRS)](../reports/report-definition-language-ssrs.md)
