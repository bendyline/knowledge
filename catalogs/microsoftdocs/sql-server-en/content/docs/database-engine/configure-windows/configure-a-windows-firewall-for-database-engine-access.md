---
title: "Configure Windows Firewall for Database Engine Access"
description: Find out how to configure Windows Firewall so that client computers can access an instance of the SQL Server Database Engine through the firewall.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: install-set-up-deploy
helpviewer_keywords:
  - "connections [SQL Server], firewall systems"
  - "firewall systems, [Database Engine]"
  - "security [SQL Server], firewalls"
---
# Configure Windows Firewall for Database Engine access


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to configure Windows Firewall for  Database Engine 
 access in  SQL Server 
 by using SQL Server Configuration Manager. Firewall systems help prevent unauthorized access to computer resources. To access an instance of the  SQL Server Database Engine 
 through a firewall, you must configure the firewall on the computer running  SQL Server 
 to allow access.

For more information about the default Windows Firewall settings, and a description of the TCP ports that affect the  Database Engine 
, Analysis Services, Reporting Services, and Integration Services, see [Configure the Windows Firewall to allow SQL Server access](../../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md). There are many firewall systems available. For information specific to your system, see the firewall documentation.

The principal steps to allow access are:

1. Configure the  Database Engine 
 to use a specific TCP/IP port. The default instance of the  Database Engine 
 uses port 1433, but that can be changed. The port used by the  Database Engine 
 is listed in the  SQL Server 
 error log. Instances of  SQL Server Express 
,  SQL Server Compact 
, and named instances of the  Database Engine 
 use dynamic ports. To configure these instances to use a specific port, see [Configure SQL Server to listen on a specific TCP port](configure-a-server-to-listen-on-a-specific-tcp-port.md).

1. Configure the firewall to allow access to that port for authorized users or computers.

The  SQL Server 
 Browser service lets users connect to instances of the  Database Engine 
 that aren't listening on port 1433 without knowing the port number. To use  SQL Server 
 Browser, you must open UDP port 1434. To promote the most secure environment, leave the  SQL Server 
 Browser service stopped, and configure clients to connect using the port number.

By default, Windows enables the Windows Firewall, which closes port 1433 to prevent Internet computers from connecting to a default instance of  SQL Server 
 on your computer. Connections to the default instance using TCP/IP aren't possible unless you open port 1433. The basic steps to configure the Windows Firewall are provided in the following procedures. For more information, see the Windows documentation.

As an alternative to configuring  SQL Server 
 to listen on a fixed port and opening the port, you can list the  SQL Server 
 executable (Sqlservr.exe) as an exception to the blocked programs. Use this method when you want to continue to use dynamic ports. Only one instance of  SQL Server 
 can be accessed in this way.

## Security

Opening ports in your firewall can leave your server exposed to malicious attacks. Make sure that you understand firewall systems before you open ports. For more information, see [Security considerations for a SQL Server installation](../../sql-server/install/security-considerations-for-a-sql-server-installation.md).

<a id="SSMSProcedure"></a>

## Use Windows Firewall with Advanced Security

The following procedures configure the Windows Firewall by using the Windows Firewall with Advanced Security Microsoft Management Console (MMC) snap-in. The Windows Firewall with Advanced Security only configures the current profile. For more information about the Windows Firewall with Advanced Security, see [Configure the Windows Firewall to allow SQL Server access](../../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md).

### Open a port in the Windows Firewall for TCP access

1. On the **Start** menu, select **Run**, type **WF.msc**, and then select **OK**.

1. In the **Windows Firewall with Advanced Security** application, in the left pane, right-click **Inbound Rules**, and then select **New Rule** in the action pane.

1. In the **Rule Type** dialog box, select **Port**, and then select **Next**.

1. In the **Protocol and Ports** dialog box, select **TCP**. Select **Specific local ports**, and then type the port number of the instance of the  Database Engine 
, such as `1433` for the default instance. Select **Next**.

1. In the **Action** dialog box, select **Allow the connection**, and then select **Next**.

1. In the **Profile** dialog box, select any profiles that describe the computer connection environment when you want to connect to the  Database Engine 
, and then select **Next**.

1. In the **Name** dialog box, type a name and description for this rule, and then select **Finish**.

### Open access to SQL Server when using dynamic ports

1. On the **Start** menu, select **Run**, type **WF.msc**, and then select **OK**.

1. In the **Windows Firewall with Advanced Security**, in the left pane, right-click **Inbound Rules**, and then select **New Rule** in the action pane.

1. In the **Rule Type** dialog box, select **Program**, and then select **Next**.

1. In the **Program** dialog box, select **This program path**. Select **Browse**, and navigate to the instance of  SQL Server 
 that you want to access through the firewall, and then select **Open**. By default,  SQL Server 
 is at `C:\Program Files\Microsoft SQL Server\MSSQLXX.MSSQLSERVER\MSSQL\Binn\Sqlservr.exe`. Select **Next**. The `MSSQLXX` version is specific to your version of SQL Server.

1. In the **Action** dialog box, select **Allow the connection**, and then select **Next**.

1. In the **Profile** dialog box, select any profiles that describe the computer connection environment when you want to connect to the  Database Engine 
, and then select **Next**.

1. In the **Name** dialog box, type a name and description for this rule, and then select **Finish**.

## Related content

- [Azure SQL Database IP firewall rules](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure)
