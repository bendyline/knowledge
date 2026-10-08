---
title: "Custom report item implementation requirements"
description: Learn about the development and deployment requirements that you need for custom report item implementations.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: custom-report-items
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "custom report items"
---
# Custom report item implementation requirements
  This article discusses the prerequisites for developing and deploying custom report items.  
  
## Development and deployment requirements  
 Developing a custom report item for  Reporting Services 
 requires the following criteria:  
  
-   Administrative access to a server running  Microsoft 
  SQL Server 
 with  Reporting Services 
 and  SQL Server Data Tools (SSDT) 
.  
  
-    Microsoft 
  Visual Studio 2005 
 or newer with the  Microsoft 
  .NET Framework 
 software development kit (SDK) installed.  
  
-   Access to the  .NET Framework 
 SDK documentation.  
  
-   Familiarity with component authoring and the component model namespaces in  Visual Studio 
.  
  
## Language and namespace requirements  
  SQL Server 
 custom report items fully support the  .NET Framework 
. You can develop custom report items using your choice of .NET-compliant languages.  
  
  Visual Studio 
 offers the developer many tools and features to simplify and accelerate the iterative cycles of coding, debugging, and testing and to make deployment easier. The  .NET Framework 
 SDK includes  Visual Basic  and C# compilers and related tools.  
  
-   Custom report items use the **Microsoft.ReportDesigner** and [Microsoft.ReportingServices.Interfaces](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces) namespaces. These are stored in the Microsoft.ReportingServices.Designer.DLL and Microsoft.ReportingServices.Interfaces.DLL assemblies, which are installed as part of  Reporting Services 
.  
  
-   Custom report item design-time components need to implement interfaces from the [System.ComponentModel](https://learn.microsoft.com/search/?terms=System.ComponentModel) namespace in the  .NET Framework 
. The [System.ComponentModel](https://learn.microsoft.com/search/?terms=System.ComponentModel) is documented in the  .NET Framework 
 SDK documentation.  

## Related content

- [Creating a custom report item run-time component](creating-a-custom-report-item-run-time-component.md)
- [Creating a custom report item design-time component](creating-a-custom-report-item-design-time-component.md)
- [How to deploy a custom report item](how-to-deploy-a-custom-report-item.md)
- [Custom report item class libraries](custom-report-item-class-libraries.md)
