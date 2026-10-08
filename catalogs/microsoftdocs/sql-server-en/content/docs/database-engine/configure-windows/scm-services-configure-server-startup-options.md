---
title: Configure Server Startup Options (SQL Server Configuration Manager)
description: Learn how to set options that the SQL Server Database Engine uses when it starts. View limitations and restrictions on making changes to startup parameters.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/16/2026
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "parameters [SQL Server], startup options"
  - "SQL Server, startup options"
  - "SQL Server, startup parameters"
  - "single-user mode [SQL Server], starting in"
  - "startup options [SQL Server]"
  - "startup parameters [SQL Server]"
  - "SQL Server services, setting startup options"
  - "SQL Server services, setting startup parameters"
---
# SQL Server Configuration Manager: Configure server startup options


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to configure startup options that are used every time the  Database Engine 
 starts in  SQL Server 
 by using  SQL Server 
 Configuration Manager. For a list of startup options, see [Database Engine Service startup options](database-engine-service-startup-options.md).

## Limitations

 SQL Server 
 Configuration Manager writes startup parameters to the registry. They take effect upon the next startup of the  Database Engine 
.

On a cluster, changes must be made on the active server when  SQL Server 
 is online, which take effect when the  Database Engine 
 is restarted. The registry update of the startup options on the other node will occur upon the next failover.

In  SQL Server 2022 (16.x) 
 and later versions, when you set the **Start Mode** for a  SQL Server 
 service to *Automatic* in Configuration Manager, the service starts in *Automatic (Delayed Start)* mode instead, even though the **Start Mode** shows as *Automatic*.

## Permissions

Configuring server startup options is restricted to users who can change the related entries in the registry. This includes the following users.

- Members of the local administrators group.

- The domain account that is used by  SQL Server 
, if the  Database Engine 
 is configured to run under a domain account.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

Open SQL Server Configuration Manager from the Windows Start menu.

Because SQL Server Configuration Manager is a snap-in for the  Microsoft 
 Management Console program and not a stand-alone program, SQL Server Configuration Manager might not appear as an application in newer versions of Windows.

From the Windows **Start** menu, type `SQLServerManager17.msc` (for  SQL Server 2025 (17.x) 
). For other versions of  SQL Server 
, replace `17` with the appropriate number. Selecting `SQLServerManager17.msc` opens SQL Server Configuration Manager.

You can pin SQL Server Configuration Manager to the Start menu or taskbar when you right-click `SQLServerManager17.msc`, and then select **Open file location**. In File Explorer, right-click `SQLServerManager17.msc`, and then select **Pin to Start** or **Pin to taskbar**.


### Configure startup options

1. In  SQL Server 
 Configuration Manager, select **SQL Server Services**.

1. In the right pane, right-click **SQL Server (***<instance_name>***)**, and then select **Properties**.

1. On the **Startup Parameters** tab, in the **Specify a startup parameter** box, type the parameter, and then select **Add**.

   For example, to start in single-user mode, type `-m` in the **Specify a startup parameter** box and then select **Add**. (When you restart  SQL Server 
 in single-user mode, stop the  SQL Server 
 Agent. Otherwise,  SQL Server 
 Agent might connect first and prevent you from connecting as a second user.)

   The following screenshot shows the Startup Parameters tab in the SQL Server Properties dialog, where you can modify startup parameters.

   Screenshot of the SQL Server (MSSQLSERVER) Properties dialog, with the Startup Parameters tab selected.

1. Select **OK**.

1. Restart the  Database Engine 
.

   > **Warning:**  
   > After you're finished using single-user mode, in the Startup Parameters box, select the `-m` parameter in the **Existing Parameters** box, and then select **Remove**. Restart the  Database Engine 
 to restore  SQL Server 
 to the typical multi-user mode.

- Don't use double quotes around startup parameter values even if they contain spaces or special characters.

-  SQL Server 
 Configuration Manager doesn't support dashes (`-`) and slashes (`/`) in startup parameter values.

## Related content

- [Single-user mode for SQL Server](start-sql-server-in-single-user-mode.md)
- [Connect to SQL Server when system administrators are locked out](connect-to-sql-server-when-system-administrators-are-locked-out.md)
- [Start, stop, or pause the SQL Server Agent service](https://learn.microsoft.com/ssms/agent/start-stop-or-pause-the-sql-server-agent-service)
- [Database Engine Service startup options](database-engine-service-startup-options.md)
