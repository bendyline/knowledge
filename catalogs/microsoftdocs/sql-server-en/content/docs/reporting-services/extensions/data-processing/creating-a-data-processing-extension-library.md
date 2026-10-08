---
title: "Create a data processing extension library"
description: Learn how to create a Reporting Services data processing extension. View sample code, and see which namespace and library file requirements you need to meet.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "data processing extensions [Reporting Services], namespace assignments"
  - "library [Reporting Services]"
  - "assigning namespaces to extensions"
---
# Create a data processing extension library
  Each  Reporting Services 
 data processing extension you create should be assigned to a unique namespace and built into a library or assembly file. The exact name of the namespace isn't important, but it must be unique and not shared with any other extension.  Microsoft 
 uses the namespace [Microsoft.ReportingServices.DataProcessing](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing) for the data processing extensions that ship with  Reporting Services 
. You should create your own unique namespaces for your company's data processing extensions.  
  
 The following example shows the code to begin a  Reporting Services 
 data processing extension, which uses the namespaces that contain the data processing interfaces and any utility classes.  
  
```vb  
Imports System  
Imports Microsoft.ReportingServices.DataProcessing  
Imports Microsoft.ReportingServices.Interfaces  
  
Namespace CompanyName.ExtensionName  
   ...  
```  
  
```csharp  
using System;  
using Microsoft.ReportingServices.DataProcessing;  
using Microsoft.ReportingServices.Interfaces;  
  
namespace CompanyName.ExtensionName  
{  
   ...  
```  
  
 When compiling a  Reporting Services 
 data processing extension, you must supply to the compiler a reference to Microsoft.ReportingServices.Interfaces.dll, because the data processing extension interfaces are contained there. The [Microsoft.ReportingServices.DataProcessing](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing) namespace is needed to implement the data processing extension interfaces, and the [Microsoft.ReportingServices.Interfaces](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces) namespace is needed to implement the [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) interface. For example, if all the files containing the code to implement a  Reporting Services 
 data processing extension written in C# were in a single directory with the extension .cs, the following command would be issued from that directory to compile the files stored in CompanyName.ExtensionName.dll.  
  
```csharp  
csc /t:library /out:CompanyName.ExtensionName.dll *.cs /r:System.dll /r:Microsoft.ReportingServices.Interfaces.dll  
```  
  
 The following code example shows the command that would be used for  Microsoft 
  Visual Basic  files with the extension .vb.  
  
```vb  
vbc /t:library /out:CompanyName.ExtensionName.dll *.vb /r:System.dll /r:Microsoft.ReportingServices.Interfaces.dll  
```  
  
> **Note:**  
>  You can also design, develop, and build your data processing extension using  Visual Studio 
. For more information about developing assemblies in  Visual Studio 
, see your  Visual Studio 
 documentation.  
  
## Related content

- [Reporting Services extensions](../reporting-services-extensions.md)
- [Implement a data processing extension](implementing-a-data-processing-extension.md)
- [Reporting Services extension library](../reporting-services-extension-library.md)
