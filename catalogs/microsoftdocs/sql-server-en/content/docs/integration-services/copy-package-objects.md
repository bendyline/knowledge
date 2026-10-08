---
title: "Copy Package Objects"
description: "Copy Package Objects"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
helpviewer_keywords:
  - "control flow [Integration Services], copying objects"
  - "copying package objects [Integration Services]"
  - "data flow [Integration Services], copying objects"
  - "connection managers [Integration Services], copying"
---
# Copy Package Objects


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  This topic describes how to copy control flow items, data flow items, and connection managers within a package or between packages.  
  
### To copy control and data flow items  
  
1.  In  SQL Server Data Tools (SSDT) 
, open the  Integration Services 
 project that contains the packages that you want work with.  
  
2.  In Solution Explorer, double-click the packages that you want to copy between.  
  
3.  In  SSIS 
 Designer, click the tab for the package that contains the items to copy and click the **Control Flow**, **Data Flow**, or **Event Handlers** tab.  
  
4.  Select the control flow or data flow items to copy. You can either select items one at a time by pressing the Shift key and clicking the item or select items as a group by dragging the pointer across the items you want to select.  
  
    > **Important:**  
    >  The precedence constraints and paths that connect items are not selected automatically when you select the two items that they connect. To copy an ordered workflow-a segment of control flow or data flow-make sure to also copy the precedence constrains and the paths.  
  
5.  Right-click a selected item and click **Copy**.  
  
6.  If copying items to a different package, click the package that you want to copy to, and then click the appropriate tab for the item type.  
  
    > **Important:**  
    >  You cannot copy a data flow to a package unless the package contains at least one Data Flow task.  
  
7.  Right-click and click **Paste**.  
  
### To copy connection managers  
  
1.  In  SQL Server Data Tools (SSDT) 
, open the  Integration Services 
 project that contains the package that you want to work with.  
  
2.  In Solution Explorer, double-click the package.  
  
3.  In  SSIS 
 Designer, click the **Control Flow**, **Data Flow**, or **Event Handler** tab.  
  
4.  In the **Connection Managers** area, right-click the connection manager, and then click **Copy**. You can copy only one connection manager at a time.  
  
5.  If you are copying items to a different package, click the package that you want to copy to and then click the **Control Flow**, **Data Flow**, or **Event Handler** tab.  
  
6.  Right-click in the **Connection Managers** area and click **Paste**.  
  
## Related content

- [Control Flow](control-flow/control-flow.md)
- [Data Flow](data-flow/data-flow.md)
- [Integration Services (SSIS) Connections](connection-manager/integration-services-ssis-connections.md)
- [Integration Services (SSIS) Projects and Solutions](integration-services-ssis-projects-and-solutions.md)
