---
title: "Debug a Script by Setting Breakpoints in a Script Task and Script Component"
description: "Debug a Script by Setting Breakpoints in a Script Task and Script Component"
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "breakpoints [Integration Services]"
  - "scripts [Integration Services], breakpoints"
---
# Debug a Script by Setting Breakpoints in a Script Task and Script Component


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  This procedure describes how to set breakpoints in the scripts that are used in the Script task and Script component.  
  
 After you set breakpoints in the script, the **Set Breakpoints - \<object name>** dialog box lists the breakpoints, along with the built-in breakpoints.  
  
> **Important:**  
>  Under certain circumstances, breakpoints in the Script task and Script component are ignored. For more information, see the **Debugging the Script Task** section in [Coding and Debugging the Script Task](task/coding-and-debugging-the-script-task.md) and the **Debugging the Script Component** section in [Coding and Debugging the Script Component](data-flow-script-component/coding-and-debugging-the-script-component.md).  
  
### To set a breakpoint in script  
  
1.  In  SQL Server Data Tools (SSDT) 
, open the  Integration Services 
 project that contains the package you want.  
  
2.  Double-click the package that contains the script in which you want to set breakpoints.  
  
3.  To open the Script task, click the **Control Flow** tab, and then double-click the Script task.  
  
4.  To open the Script component, click the **Data Flow** tab, and then double-click the Script component.  
  
5.  Click **Script** and then click **Edit Script**.  
  
6.  In  Microsoft 
  Visual Studio 
 Tools for Applications (VSTA), locate the line of script on which you want to set a breakpoint, right-click that line, point to **Breakpoint**, and then click **Insert Breakpoint**.  
  
     The breakpoint icon appears on the line of code.  
  
7.  On the **File** menu, click **Exit**.  
  
8.  Click **OK**.  
  
9. To save the package, click **Save Selected Items** on the **File** menu.
