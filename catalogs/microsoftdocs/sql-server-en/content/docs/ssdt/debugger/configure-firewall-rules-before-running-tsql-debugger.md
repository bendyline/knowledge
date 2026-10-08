---
title: Configure Firewall Rules Before Running the T-SQL Debugger
description: Learn how to configure the Windows Firewall rules before running the Transact-SQL (T-SQL) debugger when connected to a SQL Server in SQL Server Management Studio.
author: dzsquared
ms.author: drskwier
ms.reviewer: randolphwest
ms.date: 09/09/2025
ms.service: sql
ms.subservice: ssdt
ms.topic: how-to
---
# Configure firewall rules before running the Transact-SQL debugger


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Windows Firewall rules must be configured to enable  Transact-SQL  debugging when connected to an instance of the  Database Engine 
 that is running on a different computer than the  Database Engine 
 Query Editor.

## Configure the Transact-SQL debugger

The  Transact-SQL  debugger includes both server-side and client-side components. The server-side debugger components are installed with each instance of the  SQL Server Database Engine 
. The client-side debugger components are included:

- When you install Microsoft Visual Studio 2019 or later versions

- When you install  SQL Server Data Tools (SSDT) 
 from the web download

There are no configuration requirements to run the  Transact-SQL  debugger when  SQL Server Data Tools 
 is running on the same computer as the instance of the  SQL Server Database Engine 
. However, to run the  Transact-SQL  debugger when connected to a remote instance of the  Database Engine 
, program and port rules in the Windows Firewall must be enabled on both computers. If you get errors attempting to open a remote debugging session, ensure the following firewall rules are defined on your computer.

Use the **Windows Firewall with Advanced Security** application to manage the firewall rules. In both  Windows 7 
 and  Windows Server 2008 R2 
, open **Control Panel**, open **Windows Firewall**, and select **Advanced settings**. In  Windows Server 2008 R2 
, you can also open **Service Manager**, expand **Configuration** in the left pane, and expand **Windows Firewall with Advanced Security**.

> **Caution:**  
> Enabling rules in the Windows Firewall can expose your computer to security threats that the firewall is designed to block. Enabling rules for remote debugging unblocks the ports and programs listed in this article.

## Firewall rules on the server

On the computer that is running the instance of the  Database Engine 
, use **Windows Firewall with Advanced Security** to specify the following information:

- Add an inbound program rule for `sqlservr.exe`. You must have a rule for each instance that needs to support remote debugging sessions.

  1. In **Windows Firewall with Advanced Security**, in the left pane, right-click **Inbound Rules**, and then select **New Rule** in the action pane.

  1. In the **Rule Type** dialog, select **Program**, and then select **Next**.

  1. In the **Program** dialog, select **This program path:** and enter the full path to `sqlservr.exe` for this instance. By default, `sqlservr.exe` is installed in `C:\Program Files\Microsoft SQL Server\MSSQL16.<InstanceName>\MSSQL\Binn`, where `<InstanceName>` is `MSSQLSERVER` for the default instance, and the instance name for any named instance.

  1. In the **Action** dialog, select **Allow the connection**, and select **Next**.

  1. In the **Profile** dialog, select any profiles that describe the computer connection environment when you want to open a debugging session with the instance, and select **Next**.

  1. In the **Name** dialog, type a name and description for this rule and select **Finish**.

  1. In the **Inbound Rules** list, right-click the rule you created, and then select **Properties** in the action pane.

  1. Select the **Protocols and Ports** tab.

  1. Select **TCP** in the **Protocol type:** box, select **RPC Dynamic Ports** in the **Local port:** box, select **Apply**, and then select **OK**.

- Add an inbound program rule for `svchost.exe` to enable Distributed Component Object Model (DCOM) communications from remote debugger sessions.

  1. In **Windows Firewall with Advanced Security**, in the left pane, right-click **Inbound Rules**, and then select **New Rule** in the action pane.

  1. In the **Rule Type** dialog, select **Program**, and then select **Next**.

  1. In the **Program** dialog, select **This program path:** and enter the full path to `svchost.exe`. By default, `svchost.exe` is installed in `%systemroot%\System32\svchost.exe`.

  1. In the **Action** dialog, select **Allow the connection**, and select **Next**.

  1. In the **Profile** dialog, select any profiles that describe the computer connection environment when you want to open a debugging session with the instance, and select **Next**.

  1. In the **Name** dialog, type a name and description for this rule and select **Finish**.

  1. In the **Inbound Rules** list, right-click the rule you created, and then select **Properties** in the action pane.

  1. Select the **Protocols and Ports** tab.

  1. Select **TCP** in the **Protocol type:** box, select **RPC Endpoint Mapper** in the **Local port:** box, select **Apply**, and then select **OK**.

- If the domain policy requires network communications to be done through IPsec, you must also add inbound rules opening UDP port 4500 and UDP port 500.

## Firewall rules on the client

On the computer that is running the  Database Engine 
 Query Editor, configure the Windows Firewall to allow remote debugging.

If you get errors attempting to open a remote debugging session, you can manually configure the program and port exceptions by using **Windows Firewall with Advanced Security** to configure firewall rules:

- Add a program entry for svchost:

  1. In **Windows Firewall with Advanced Security**, in the left pane, right-click **Inbound Rules**, and then select **New Rule** in the action pane.

  1. In the **Rule Type** dialog, select **Program**, and then select **Next**.

  1. In the **Program** dialog, select **This program path:** and enter the full path to `svchost.exe`. By default, `svchost.exe` is installed in `%systemroot%\System32\svchost.exe`.

  1. In the **Action** dialog, select **Allow the connection**, and select **Next**.

  1. In the **Profile** dialog, select any profiles that describe the computer connection environment when you want to open a debugging session with the instance, and select **Next**.

  1. In the **Name** dialog, type a name and description for this rule and select **Finish**.

  1. In the **Inbound Rules** list, right-click the rule you created, and then select **Properties** in the action pane.

  1. Select the **Protocols and Ports** tab.

  1. Select **TCP** in the **Protocol type:** box, select **RPC Endpoint Mapper** in the **Local port:** box, select **Apply**, and then select **OK**.

- Add a program entry for the application hosting the  SQL Server Data Tools 
  Database Engine 
 Query Editor. If you need to open remote debugging sessions from multiple installations of  SQL Server Data Tools 
 on the same computer, you must add a program rule for both:

  1. In **Windows Firewall with Advanced Security**, in the left pane, right-click **Inbound Rules**, and then select **New Rule** in the action pane.

  1. In the **Rule Type** dialog, select **Program**, and then select **Next**.

  1. In the **Program** dialog, select **This program path:** and enter one of these three values.

     - For  SQL Server Data Tools 
 enter the full path to `devenv.exe`:

       1. By default, the `devenv.exe` for Visual Studio 2022 is in `C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE`.

       1. By default, the `devenv.exe` for Visual Studio 2019 is in `C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\Common7\IDE`.

       1. You can find the path to `devenv.exe` from the shortcut you use to launch  SQL Server Data Tools 
. Right-click the shortcut and select **Properties**. The executable and path are listed in the **Target** box.

  1. In the **Action** dialog, select **Allow the connection**, and select **Next**.

  1. In the **Profile** dialog, select any profiles that describe the computer connection environment when you want to open a debugging session with the instance, and select **Next**.

  1. In the **Name** dialog, type a name and description for this rule and select **Finish**.

  1. In the **Inbound Rules** list, right-click the rule you created, and then select **Properties** in the action pane.

  1. Select the **Protocols and Ports** tab.

  1. Select **TCP** in the **Protocol type:** box, select **RPC Dynamic Ports** in the **Local port:** box, select **Apply**, and then select **OK**.

## Requirements for starting the debugger

All attempts to start the  Transact-SQL  debugger must also meet the following requirements:

-  SQL Server Data Tools 
 must be running under a Windows account that is a member of the **sysadmin** fixed server role.

- The  Database Engine 
 Query Editor window must be connected by using either a Windows Authentication or  SQL Server 
 Authentication login that is a member of the **sysadmin** fixed server role.

- The  Database Engine 
 Query Editor window must be connected to an instance of the  SQL Server Database Engine 
. You can't run the debugger when the Query Editor window is connected to an instance that is in single-user mode.

- The server needs to communicate back to the client via RPC. The account under which SQL Server service is running must have authenticated permissions to the client.

## Related content

- [Transact-SQL debugger](transact-sql-debugger.md)
- [Run the Transact-SQL debugger](run-transact-sql-debugger.md)
- [Step through Transact-SQL code](step-through-transact-sql-code.md)
- [Debug stored procedures](debug-stored-procedures.md)
- [Transact-SQL debugger information](transact-sql-debugger-information.md)
