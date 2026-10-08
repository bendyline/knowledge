---
title: Prevent Automatic Startup of an Instance (SQL Server Configuration Manager)
description: Find out how to prevent an instance of SQL Server from starting automatically. See how to set the start mode to manual to accomplish this task.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/16/2026
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "automatic SQL Server startup"
  - "SQL Server, stopping"
  - "SQL Server, automatic startup"
  - "canceling automatic startup"
  - "stopping SQL Server"
  - "preventing automatic startups [SQL Server]"
---
# SQL Server Configuration Manager: Prevent automatic startup of an instance


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to prevent an instance of  SQL Server 
 from starting automatically in  SQL Server 
 by using SQL Server Configuration Manager.  SQL Server 
 is normally configured to start automatically. You can change that by setting the start mode for the instance to manual.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

Open SQL Server Configuration Manager from the Windows Start menu.

Because SQL Server Configuration Manager is a snap-in for the  Microsoft 
 Management Console program and not a stand-alone program, SQL Server Configuration Manager might not appear as an application in newer versions of Windows.

From the Windows **Start** menu, type `SQLServerManager17.msc` (for  SQL Server 2025 (17.x) 
). For other versions of  SQL Server 
, replace `17` with the appropriate number. Selecting `SQLServerManager17.msc` opens SQL Server Configuration Manager.

You can pin SQL Server Configuration Manager to the Start menu or taskbar when you right-click `SQLServerManager17.msc`, and then select **Open file location**. In File Explorer, right-click `SQLServerManager17.msc`, and then select **Pin to Start** or **Pin to taskbar**.


### Prevent automatic startup of an instance of SQL Server

1. In SQL Server Configuration Manager, expand **Services**, and then select **SQL Server**.

1. In the details pane, right-click **MSSQLServer**, and then select **Properties.**

1. In the **SQL Server \<**_instancename_**> Properties** dialog box, on the **Service** tab, in the **General** box, set the value of **Start Mode** to **Manual**.

1. Select **OK** to close the **SQL Server \<**_instancename_**> Properties** dialog box, and then close  SQL Server 
 Configuration Manager.

## Related content

- [Start, stop, pause, resume, and restart SQL Server services](start-stop-pause-resume-restart-sql-server-services.md)
