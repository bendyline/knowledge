---
title: Change the Service Startup Account (SQL Server Configuration Manager)
description: Learn how to change the service accounts that SQL Server and many of its services use. View limitations and restrictions on changes in service accounts.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/16/2026
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "SQL Server services, startup account changes"
  - "startup accounts [SQL Server]"
  - "changing startup accounts for services"
---
# SQL Server Configuration Manager: Change the service startup account


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to use SQL Server Configuration Manager to change the startup options of  SQL Server 
 services and to change the service accounts that are used by the  SQL Server Database Engine 
,  SQL Server 
 Agent,  SQL Server 
 Browser,  SQL Server 
  Analysis Services 
, and  SQL Server 
  Integration Services 
 with  SQL Server Management Studio 
,  Transact-SQL , or PowerShell. For more information about how to select an appropriate service account, see [Configure Windows service accounts and permissions](configure-windows-service-accounts-and-permissions.md).

> **Important:**  
> When you change the service startup account for the  Database Engine 
 and  SQL Server 
 Agent, the  SQL Server 
 service (the  Database Engine 
) must be restarted for the change to take effect. When the service is restarted, all databases associated with that instance of  SQL Server 
 will be unavailable until the service successfully restarts. If you have to change the service startup account of  SQL Server 
 or  SQL Server 
 Agent, make sure that you do so during regularly scheduled maintenance or when the databases can be taken offline without interrupting daily operations.

## Limitations

- Clustered servers

  Changing the service account that is used by  SQL Server 
 or  SQL Server 
 Agent must be performed from the active node of the  SQL Server 
 cluster.

  When you run on  Windows Server 2008 
 (in a non-default configuration using Domain groups), changing the service account that is used by  SQL Server 
 or  SQL Server 
 Agent requires SQL Server Configuration Manager to stop  SQL Server 
 by taking the resource groups offline.

- SKU Upgrade ( SQL Server Express 
 to non-Express SKU)

  During  SQL Server Express 
 installation, the  SQL Server 
 Agent service is configured to use the Network Service account but disabled. SQL Server Configuration Manager can change the account assigned for the  SQL Server 
 Agent service   but the service can't be enabled or started. After SKU upgrade from  SQL Server Express 
 to non-Express, the  SQL Server 
 Agent service isn't automatically enabled, but can be enabled when needed by using the SQL Server Configuration Manager and changing the service start mode to Manual or Automatic.

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

1. In SQL Server Configuration Manager, select **SQL Server Services**.

1. In the details pane, right-click the name of the  SQL Server 
 instance for which you want to change the service startup account, and then select **Properties**.

1. In the **SQL Server \<**_instancename_**> Properties** dialog box, select the **Log On** tab, and select a **Log on as** account type.

1. After selecting the new service startup account, select **OK**.

   A message box asks whether you want to restart the  SQL Server 
 service.

1. Select **Yes**, and then close SQL Server Configuration Manager.

## Related content

- [Start, stop, pause, resume, and restart SQL Server services](start-stop-pause-resume-restart-sql-server-services.md)
- [Configure WMI to Show Server Status in SQL Server Tools](https://learn.microsoft.com/ssms/configure-wmi-to-show-server-status-in-sql-server-tools)
