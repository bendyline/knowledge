---
title: "Network Protocols and Network Libraries"
description: A server can be configured to monitor multiple network protocols. You can change the configuration using the SQL Server Configuration Manager.
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/07/2025
ms.service: sql
ms.subservice: install
ms.topic: how-to
helpviewer_keywords:
  - "protocols [SQL Server]"
  - "configuration options [SQL Server], protocols"
  - "network libraries [SQL Server]"
  - "protocols [SQL Server], about network protocols"
  - "pipes [SQL Server]"
  - "network protocols [SQL Server]"
  - "default SQL Server configurations"
  - "library [SQL Server]"
  - "network protocols [SQL Server], about network protocols"
  - "configuration options [SQL Server], libraries"
---
# Network protocols and network libraries


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 on Windows


A server can listen on, or monitor, multiple network protocols at one time. However, each protocol must be configured. If a particular protocol isn't configured, the server can't listen on that protocol. After installation, you can change the protocol configurations using the  SQL Server 
 Configuration Manager.

## Default SQL Server network configuration

A default instance of  SQL Server 
 is configured for TCP/IP port 1433, and named pipe \\\\.\pipe\sql\query.  SQL Server 
 named instances are configured for TCP dynamic ports, with a port number assigned by the operating system.

If you can't use dynamic port addresses (for example, when  SQL Server 
 connections must pass through a firewall server configured to pass through specific port addresses). Select an unassigned port number. Port number assignments are managed by the Internet Assigned Numbers Authority and are listed at [https://www.iana.org](https://go.microsoft.com/fwlink/?LinkId=48844).

To enhance security, network connectivity isn't fully enabled when  SQL Server 
 is installed. To enable, disable, and configure network protocols after Setup is complete, use the  SQL Server 
 Network Configuration area of the  SQL Server 
 Configuration Manager.

## Server message block protocol

Servers in the perimeter network should have all unnecessary protocols disabled, including Server Message Block (SMB). Web servers and Domain Name System (DNS) servers don't require SMB. This protocol should be disabled to counter the threat of user enumeration.

### Effects of disabling SMB

Disabling SMB blocks the  SQL Server 
 or Windows Cluster service from accessing the remote file share. Don't disable SMB if you do or plan to do one of the following:

- Use Windows Cluster Node and File Share Majority Quorum mode
- Specify an SMB file share as the data directory during  SQL Server 
 installation
- Create a database file on an SMB file share

### Disable SMB

1. On the **Start** menu, point to **Settings**, and then select **Network and Dial-up Connections**.

   Right-click the Internet-facing connection, and then select **Properties**.

1. Select the **Client for Microsoft Networks** check box, and then select **Uninstall**.

1. Follow the uninstall steps.

1. Select **File and Printer Sharing for Microsoft Networks**, and then select **Uninstall**.

1. Follow the uninstall steps.

### Disable SMB on servers accessible from the internet

- In the Local Area Connection properties, use the **Transmission Control Protocol/Internet Protocol (TCP/IP) properties** dialog box to remove **File and Printer Sharing for Microsoft Networks** and **Client for Microsoft Networks**.

## Endpoints

 SQL Server 
 introduces a new concept for  SQL Server 
 connections; the connection is represented on the server end by a  Transact-SQL  *endpoint*. Permissions can be granted, revoked, and denied for  Transact-SQL  endpoints. By default, all users have permissions to access an endpoint unless the permissions are denied or revoked by a member of the sysadmin group or by the endpoint owner. The `GRANT`, `REVOKE`, and `DENY ENDPOINT` syntax uses an endpoint ID that the administrator must get from the endpoint's catalog view.

 SQL Server 
 Setup creates  Transact-SQL  endpoints for all supported network protocols, and for the dedicated administrator connection.

 Transact-SQL  endpoints created by  SQL Server 
 Setup are as follows:

-  Transact-SQL  local machine
-  Transact-SQL  named pipes
-  Transact-SQL  default TCP

For more information about endpoints, see [Configure the Database Engine to listen on multiple TCP ports](../../database-engine/configure-windows/configure-the-database-engine-to-listen-on-multiple-tcp-ports.md) and [Endpoints Catalog Views](../../relational-databases/system-catalog-views/endpoints-catalog-views-transact-sql.md).

For more information about  SQL Server 
 network configurations, see [Server network configuration](../../database-engine/configure-windows/server-network-configuration.md).

## Related content

- [Surface area configuration](../../relational-databases/security/surface-area-configuration.md)
- [Security considerations for a SQL Server installation](security-considerations-for-a-sql-server-installation.md)
- [Plan a SQL Server installation](planning-a-sql-server-installation.md)
