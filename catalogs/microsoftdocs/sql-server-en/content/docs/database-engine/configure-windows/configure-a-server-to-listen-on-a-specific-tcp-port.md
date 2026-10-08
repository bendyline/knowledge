---
title: Configure SQL Server to Listen on a Specific TCP Port
description: Learn how to use SQL Server Configuration Manager to configure the Database Engine to listen on a specific fixed port other than the default port, 1433.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: install-set-up-deploy
ms.custom:
  - sfi-image-nochange
helpviewer_keywords:
  - "fixed port"
  - "static ports"
  - "ports [SQL Server], assigning numbers"
  - "assigning port numbers"
  - "dynamic ports [SQL Server]"
  - "TCP/IP [SQL Server], port numbers"
---
# Configure SQL Server to listen on a specific TCP port


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to configure an instance of the  SQL Server Database Engine 
 to listen on a specific fixed port by using SQL Server Configuration Manager. If enabled, the default instance of the  SQL Server Database Engine 
 listens on TCP port 1433. Named instances of the  Database Engine 
 and  SQL Server Compact 
 are configured for [dynamic ports](../../tools/configuration-manager/tcp-ip-properties-ip-addresses-tab.md). This means they select an available port when the  SQL Server 
 service is started. When you connect to a named instance through a firewall, configure the  Database Engine 
 to listen on a specific port, so that the appropriate port can be opened in the firewall.

> **Note:**  
> Because port 1433 is the known standard for  SQL Server 
, some organizations specify that the  SQL Server 
 port number should be changed to enhance security. This might be helpful in some environments. However, the TCP/IP architecture permits a [port scanner](https://wikipedia.org/wiki/Port_scanner) to query for open ports, so changing the port number isn't considered a robust security measure.

For more information about the default Windows Firewall settings, and a description of the TCP ports that affect the  Database Engine 
, Analysis Services, Reporting Services, and Integration Services, see [Configure the Windows Firewall to allow SQL Server access](../../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md).

> **Tip:**  
> When selecting a port number, consult the [Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/port-numbers) for a list of port numbers that are assigned to specific applications. Select an unassigned port number. For more information, see [The default dynamic port range for TCP/IP has changed since Windows Vista and in Windows Server 2008](https://learn.microsoft.com/troubleshoot/windows-server/networking/default-dynamic-port-range-tcpip-chang).

## Remarks

The  Database Engine 
 begins listening on a new port when restarted. However the  SQL Server 
 Browser service monitors the registry and reports the new port number as soon as the configuration is changed, even though the  Database Engine 
 might not be using it. Restart the  Database Engine 
 to ensure consistency and avoid connection failures.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

#### Assign a TCP/IP port number to the SQL Server Database Engine

1. In SQL Server Configuration Manager, in the console pane, expand **SQL Server Network Configuration**, select **Protocols for \<instance name>**, and then in the right pane double-click **TCP/IP**.

   > **Note:**  
   > If you have trouble opening  SQL Server 
 Configuration Manager, see [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md).

1. In the **TCP/IP Properties** dialog box, on the **IP Addresses** tab, several IP addresses appear in the format **IP1**, **IP2**, up to **IPAll**. One of these entries is for the IP address of the loopback adapter, `127.0.0.1`. Additional IP addresses appear for each IP address on the computer. (You might see both IP version 4 and IP version 6 addresses.) Right-click each address, and then select **Properties** to identify the IP address that you want to configure.

1. If the **TCP Dynamic Ports** dialog box contains `0`, indicating the  Database Engine 
 is listening on dynamic ports, delete the `0`.

   Screenshot showing the TCP ports.

1. In the **IP *n*** **Properties** area box, in the **TCP Port** box, type the port number you want this IP address to listen on, and then select **OK**. Multiple ports might be specified by separating them with a comma. Select **OK**.

   If the **Listen All** setting on the **Protocol** tab is set to *Yes*, then only **TCP Port** and **TCP Dynamic Port** values under the **IPAll** section are used, and individual **IP *n*** sections are ignored in their entirety. If the **Listen All** setting is set to *No*, then the **TCP Port** and **TCP Dynamic Port** settings under the **IPAll** section are ignored, and the **TCP Port**, **TCP Dynamic Port**, and **Enabled** settings on the individual **IP *n*** sections are used instead.

   Each **IP *n*** section has an **Enabled** setting with a default value of "No" which causes  SQL Server 
 to ignore this IP address even if it has a port defined.

1. In the console pane, select **SQL Server Services**.

1. In the details pane, right-click **SQL Server (**\<instance name>**)** and then select **Restart**, to stop and restart  SQL Server 
.

## Connect

After you configure  SQL Server 
 to listen on a specific port, there are three ways to connect to a specific port with a client application:

- To connect to the  Database Engine 
 instance by name, run the  SQL Server 
 Browser service on the server.
- Create an alias on the client, specifying the port number.
- Program the client to connect using a custom connection string.

## Related content

- [Create or delete a server alias for use by a client](create-or-delete-a-server-alias-for-use-by-a-client.md)
- [SQL Server Browser service (Database Engine and SSAS)](sql-server-browser-service-database-engine-and-ssas.md)
