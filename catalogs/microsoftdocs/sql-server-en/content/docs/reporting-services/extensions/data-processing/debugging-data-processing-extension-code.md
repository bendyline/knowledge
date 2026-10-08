---
title: "Debug data processing extension code"
description: Discover how to use Microsoft .NET Framework debugging tools to analyze your data processing extension code and locate errors in it.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "debugging data processing extensions [Reporting Services]"
  - "troubleshooting [Reporting Services], data processing extensions"
  - "data processing extensions [Reporting Services], debugging"
---
# Debug data processing extension code
  The  Microsoft 
  .NET Framework 
 provides several debugging tools that can help you analyze your data processing extension code and locate errors in it. The tool that works best depends on what you are trying to accomplish. This example uses  Visual Studio 2008 
.  
  
#### Debug your data processing extension code  
  
1.  Launch  Visual Studio 2008 
, and open your data processing extension project.  
  
2.  Build the project, and deploy your data processing extension assembly and the accompanying .pdb file to the Report Designer. For more information about deployment, see [Deploy a data processing extension to Report Designer](deploying-a-data-processing-extension-to-report-designer.md).  
  
3.  Open a new Report Project in  Visual Studio 
 while leaving your data processing extension code open in a separate window of  Visual Studio 
.  
  
4.  Navigate to the window of  Visual Studio 
 that contains your data processing extension project and set some break points in your code.  
  
5.  With the data processing extension project window still active, select **Attach to Process** on the **Debug** menu.  
  
     The **Attach to Process** dialog opens.  
  
6.  From the list of processes, select the devenv.exe process that corresponds to your Report Project and choose **Attach**.  
  
7.  Define your report data source using the **Report Data** tab of the Report Project. You most likely use the generic Query Designer to execute a query against your custom data source. This action should invoke the debugger and execute code corresponding to your break points.  
  
8.  Step through your code using the F11 key. For more information about using  Visual Studio 
 for debugging, see your  Visual Studio 
 documentation.  
  
## Related content

- [Deploy a data processing extension](deploying-a-data-processing-extension.md)
- [Reporting Services extensions](../reporting-services-extensions.md)
- [Implement a data processing extension](implementing-a-data-processing-extension.md)
- [Reporting Services extension library](../reporting-services-extension-library.md)
