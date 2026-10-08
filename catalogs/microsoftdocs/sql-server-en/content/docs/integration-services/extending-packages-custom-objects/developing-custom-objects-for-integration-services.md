---
title: "Developing Custom Objects for Integration Services"
description: "Developing Custom Objects for Integration Services"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "custom user interface [Integration Services]"
  - "custom objects [Integration Services]"
---
# Developing Custom Objects for Integration Services


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  When the control flow and data flow objects that are included with  SQL Server 
  Integration Services 
 do not completely meet your requirements, you can develop many types of custom objects on your own including:  
  
-   **Custom tasks**.  
  
-   **Custom connection managers.** Connect to external data sources that are not currently supported.  
  
-   **Custom log providers.** Log package events in formats that are not currently supported.  
  
-   **Custom enumerators.** Support iteration over a set of objects or values formats that are not currently supported.  
  
-   **Custom data flow components.** Can be configured as sources, transformations, or destinations.  
  
 The  Integration Services 
 object model facilitates this custom development with base classes that provide a consistent and reliable framework for your custom implementation.  
  
 If you do not have to reuse custom functionality across multiple packages, the Script task and the Script component give you the full power of a managed programming language with significantly less infrastructure code to write. For more information, see [Comparing Scripting Solutions and Custom Objects](../extending-packages-scripting/comparing-scripting-solutions-and-custom-objects.md).  
  
## Steps in Developing a Custom Object for Integration Services  
 When you develop a custom object for use in  Integration Services 
, you develop a Class Library (a DLL) that will be loaded at design time and run time by SSIS Designer and by the  Integration Services 
 runtime. The most important methods that you must implement are not methods that you call from your own code, but methods that the runtime calls at appropriate times to initialize and validate your component and to invoke its functionality.  
  
 Here are the steps that you follow in developing a custom object:  
  
1.  Create a new project of type Class Library in your preferred managed programming language.  
  
2.  Inherit from the appropriate base class, as shown in the following table.  
  
3.  Apply the appropriate attribute to your new class, as shown in the following table.  
  
4.  Override the methods of the base class as required and write code for the custom functionality of your object.  
  
5.  Optionally, build a custom user interface for your component. For ease of deployment, you may want to develop the user interface as a separate project within the same solution, and to build it as a separate assembly.  
  
6.  Optionally, display a link to samples and Help content for the custom object, in the **SSIS Toolbox**.  
  
7.  Build, deploy, and debug your new custom object as described in [Building, Deploying, and Debugging Custom Objects](building-deploying-and-debugging-custom-objects.md).  
  
## Base Classes, Attributes, and Important Methods  
 This table provides an easy reference to the most important elements in the  Integration Services 
 object model for each type of custom object that you can develop.  
  
| Custom object | Base class | Attribute | Important methods |
| --- | --- | --- | --- |
| Task | [Microsoft.SqlServer.Dts.Runtime.Task](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Task) | [Microsoft.SqlServer.Dts.Runtime.DtsTaskAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsTaskAttribute) | [Microsoft.SqlServer.Dts.Runtime.Task.Execute%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Task.Execute%252A) |
| Connection manager | [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase) | [Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute) | [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.AcquireConnection%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.AcquireConnection%252A), [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.ReleaseConnection%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.ReleaseConnection%252A) |
| Log provider | [Microsoft.SqlServer.Dts.Runtime.LogProviderBase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.LogProviderBase) | [Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute) | [Microsoft.SqlServer.Dts.Runtime.LogProviderBase.OpenLog%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.LogProviderBase.OpenLog%252A), [Microsoft.SqlServer.Dts.Runtime.LogProviderBase.Log%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.LogProviderBase.Log%252A), [Microsoft.SqlServer.Dts.Runtime.LogProviderBase.CloseLog%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.LogProviderBase.CloseLog%252A) |
| Enumerator | [Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator) | [Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute) | [Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator.GetEnumerator%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumerator.GetEnumerator%252A) |
| Data flow component | [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent) | [Microsoft.SqlServer.Dts.Pipeline.DtsPipelineComponentAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.DtsPipelineComponentAttribute) | [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProvideComponentProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProvideComponentProperties%252A), [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.PrimeOutput%252A), [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ProcessInput%252A) |
  
## Providing Links to Samples and Help Content  
 To display a link in the **SSIS Toolbox** to samples and Help content for a custom object written in managed code, use the following properties.  
  
-   [Microsoft.SqlServer.Dts.Pipeline.DTSPipelineComponentAttribute.SamplesTag\*](https://learn.microsoft.com/dotnet/api/microsoft.sqlserver.dts.pipeline.dtspipelinecomponentattribute.samplestag)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.DTSPipelineComponentAttribute.HelpCollection\*](https://learn.microsoft.com/dotnet/api/microsoft.sqlserver.dts.pipeline.dtspipelinecomponentattribute.helpcollection)  
  
-   [Microsoft.SqlServer.Dts.Pipeline.DTSPipelineComponentAttribute.HelpKeyword\*](https://learn.microsoft.com/dotnet/api/microsoft.sqlserver.dts.pipeline.dtspipelinecomponentattribute.helpkeyword)  
  
-   [Microsoft.SqlServer.Dts.Runtime.DTSTaskAttribute.SamplesTag\*](https://learn.microsoft.com/dotnet/api/microsoft.sqlserver.dts.runtime.dtstaskattribute.samplestag)  
  
-   [Microsoft.SqlServer.Dts.Runtime.DTSTaskAttribute.HelpCollection\*](https://learn.microsoft.com/dotnet/api/microsoft.sqlserver.dts.runtime.dtstaskattribute.helpcollection)  
  
-   [Microsoft.SqlServer.Dts.Runtime.DTSTaskAttribute.HelpKeyword\*](https://learn.microsoft.com/dotnet/api/microsoft.sqlserver.dts.runtime.dtstaskattribute.helpkeyword)  
  
 To display a link to samples and Help content for a custom object written in native code, add entries in the Registry Script (.rgs) file for SamplesTag, HelpKeyword, and HelpCollection. The following is an example.  
  
 `val HelpKeyword = s 'sql11.dts.designer.executepackagetask.F1'`  
  
 `val SamplesTag = s 'ExecutePackageTask'`  
  
## Providing a Custom User Interface  
 To allow users of your custom object to configure its properties, you may have to develop a custom user interface also. In those cases where a custom user interface is not strictly required, you may choose to create one to provide a more user-friendly interface than the default editor.  
  
 In a custom user interface project or assembly, you generally have two classes -a class that implements an  Integration Services 
 interface for user interfaces for the specific type of custom object, and the Windows form that it displays to gather information from the user. The interfaces that you implement have only a few methods, and a custom user interface is not difficult to develop.  
  
> **Note:**  
>  Many  Integration Services 
 log providers have a custom user interface that implements [Microsoft.SqlServer.Dts.Runtime.Design.IDtsLogProviderUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Design.IDtsLogProviderUI) and replaces the **Configuration** text box with a filtered dropdown list of available connection managers. However custom user interfaces for custom log providers are not implemented in this release of  Integration Services 
. Specifying a value for the [Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute.UITypeName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute.UITypeName%252A) property of the [Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsLogProviderAttribute) has no effect.  
  
 The following table provides an easy reference to the interfaces that you must implement when you develop a custom user interface for each type of custom object. It also explains what the user sees if you choose not to develop a custom user interface for your object, or if you fail to link your object to its user interface by using the **UITypeName** property in the object's attribute. Although the powerful Advanced Editor may be satisfactory for a data flow component, the Properties window is a less user-friendly solution for tasks and connection managers, and a custom ForEach enumerator cannot be configured at all without a custom form.  
  
| Custom object | Base class for user interface | Default editing behavior if no custom user interface is provided |
| --- | --- | --- |
| Task | [Microsoft.SqlServer.Dts.Runtime.Design.IDtsTaskUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Design.IDtsTaskUI) | Properties window only |
| Connection manager | [Microsoft.SqlServer.Dts.Runtime.Design.IDtsConnectionManagerUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Design.IDtsConnectionManagerUI) | Properties window only |
| Log provider | [Microsoft.SqlServer.Dts.Runtime.Design.IDtsLogProviderUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Design.IDtsLogProviderUI)<br /><br /> (Not implemented in  Integration Services |
| ) | Text box in **Configuration** column |
| Enumerator | [Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI) | Properties window only. Enumerator Configuration area of editor is empty. |
| Data flow component | [Microsoft.SqlServer.Dts.Pipeline.Design.IDtsComponentUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Design.IDtsComponentUI) | Advanced Editor |
  
## Related content

- [Visual Studio solution build process give a warning about indirect dependency on the .NET Framework assembly due to SSIS references](https://learn.microsoft.com/archive/blogs/jason_howell/visual-studio-2010-solution-build-process-give-a-warning-about-indirect-dependency-on-the-net-framework-assembly-due-to-ssis-references)
- [Persisting Custom Objects](persisting-custom-objects.md)
- [Building, Deploying, and Debugging Custom Objects](building-deploying-and-debugging-custom-objects.md)
