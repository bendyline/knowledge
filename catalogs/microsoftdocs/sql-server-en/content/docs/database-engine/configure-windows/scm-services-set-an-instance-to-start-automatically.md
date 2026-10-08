---
title: Set an Instance to Start Automatically (SQL Server Configuration Manager)
description: Find out how to set an instance of SQL Server to start automatically. Learn about the default configuration, and see how to set the start mode to automatic.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/16/2026
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "automatic SQL Server startup"
  - "SQL Server, automatic startup"
  - "starting SQL Server, automatically"
---
# SQL Server Configuration Manager: Set an instance to start automatically


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to set an instance of  SQL Server 
 to start automatically in  SQL Server 
 by using SQL Server Configuration Manager. During setup,  SQL Server 
 is normally configured to start automatically. If this was not done, you can change that setting at any time.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

Open SQL Server Configuration Manager from the Windows Start menu.

Because SQL Server Configuration Manager is a snap-in for the  Microsoft 
 Management Console program and not a stand-alone program, SQL Server Configuration Manager might not appear as an application in newer versions of Windows.

From the Windows **Start** menu, type `SQLServerManager17.msc` (for  SQL Server 2025 (17.x) 
). For other versions of  SQL Server 
, replace `17` with the appropriate number. Selecting `SQLServerManager17.msc` opens SQL Server Configuration Manager.

You can pin SQL Server Configuration Manager to the Start menu or taskbar when you right-click `SQLServerManager17.msc`, and then select **Open file location**. In File Explorer, right-click `SQLServerManager17.msc`, and then select **Pin to Start** or **Pin to taskbar**.


### Set an instance of SQL Server to start automatically

1. In **SQL Server Configuration Manager**, expand **Services**, and then select **SQL Server**.

1. In the details pane, right-click the name of the instance you want to start automatically, and then select **Properties**.

1. In the **SQL Server \<**_instancename_**> Properties** dialog box, set **Start Mode** to **Automatic**.

1. Select **OK**, and then close  SQL Server 
 Configuration Manager.

## Related content

- [SQL Server Configuration Manager: Prevent automatic startup of an instance](scm-services-prevent-automatic-startup-of-an-instance.md)
- [SQL Server Configuration Manager: Connect to another computer](scm-services-connect-to-another-computer.md)
- [Configure WMI to Show Server Status in SQL Server Tools](https://learn.microsoft.com/ssms/configure-wmi-to-show-server-status-in-sql-server-tools)
