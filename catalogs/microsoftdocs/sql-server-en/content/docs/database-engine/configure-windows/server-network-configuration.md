---
title: "Server Network Configuration"
description: Become familiar with SQL Server network configuration tasks. View information on enabling protocols, configuring encryption, registering SPNs, and other actions.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: concept-article
helpviewer_keywords:
  - "Named Pipes [SQL Server], configuring"
  - "connections [SQL Server], server network configuration"
  - "Database Engine [SQL Server], network configurations"
  - "server network configuration [SQL Server]"
  - "protocols [SQL Server], choosing"
  - "ports [SQL Server], changing"
  - "server configuration [SQL Server]"
---
# Server network configuration


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Server network configuration tasks include enabling protocols, modifying the port or pipe used by a protocol, configuring encryption, configuring the  SQL Server 
 Browser service, exposing or hiding the  SQL Server Database Engine 
 on the network, and registering the Server Principal Name. Most of the time, you don't have to change the server network configuration. Only reconfigure the server network protocols if special network requirements.

Network configuration for  SQL Server 
 is done using  SQL Server 
 Configuration Manager. For earlier versions of  SQL Server 
, use the Server Network Utility that ships with those products.

## Protocols

Use  SQL Server 
 Configuration Manager to enable or disable the protocols used by  SQL Server 
, and to configure the options available for the protocols. More than one protocol can be enabled. You must enable all protocols that you want clients to use. All protocols have equal access to the server. For information about which protocols you should use, see [Enable or disable a server network protocol](enable-or-disable-a-server-network-protocol.md) and [Default SQL Server network protocol configuration](default-sql-server-network-protocol-configuration.md).

### Change a port

You can configure the TCP/IP protocol to listen on a designated port. By default, the default instance of the  Database Engine 
 listens on TCP port 1433. Named instances of the  Database Engine 
 and  SQL Server Compact 
 are configured for dynamic ports. This means they select an available port when the  SQL Server 
 service is started. The  SQL Server 
 Browser service helps clients identify the port when they connect.

When configured for dynamic ports, the port used by  SQL Server 
 might change each time it's started. When connecting to  SQL Server 
 through a firewall, you must open the port used by  SQL Server 
. Configure  SQL Server 
 to use a specific port, so you can configure the firewall to allow communication to the server. For more information, see [Configure SQL Server to listen on a specific TCP port](configure-a-server-to-listen-on-a-specific-tcp-port.md).

### Change a named pipe

You can configure the named pipe protocol to listen on a designated named pipe. By default, the default instance of  SQL Server Database Engine 
 listens on pipe \\\\.\pipe\sql\query for the default instance and \\\\.\pipe\MSSQL$*\<instancename>*\sql\query for a named instance. The  Database Engine 
 can only listen on one named pipe, but you can change the pipe to another name if you wish. The  SQL Server 
 Browser service helps clients identify the pipe when they connect. For more information, see [Configure a server to listen on an alternate pipe](configure-a-server-to-listen-on-an-alternate-pipe.md).

## Force encryption

The  Database Engine 
 can be configured to require encryption when communicating with client applications. For more information, see [Encrypt connections to SQL Server by importing a certificate](configure-sql-server-encryption.md).

## Extended protection for authentication

Support for Extended Protection for Authentication by using channel binding and service binding is available for operating systems that support Extended Protection. For more information, see [Connect to the database engine with Extended Protection](connect-to-the-database-engine-using-extended-protection.md).

## Authenticate using Kerberos

 SQL Server 
 supports Kerberos authentication. For more information, see [Register a Service Principal Name for Kerberos connections](register-a-service-principal-name-for-kerberos-connections.md) and [Microsoft Kerberos Configuration Manager for SQL Server](https://www.microsoft.com/download/details.aspx?id=39046).

### Register a Server Principal Name (SPN)

The Kerberos authentication service uses an SPN to authenticate a service. For more information, see [Register a Service Principal Name for Kerberos connections](register-a-service-principal-name-for-kerberos-connections.md).

SPNs might also be used to make client authentication more secure when connecting with NTLM. For more information, see [Connect to the database engine with Extended Protection](connect-to-the-database-engine-using-extended-protection.md).

## SQL Server Browser service

The  SQL Server 
 Browser service runs on the server, and helps client computers to find instances of  SQL Server 
. The  SQL Server 
 Browser service doesn't need to be configured, but must be running under some connection scenarios. For more information about  SQL Server 
 Browser, see [SQL Server Browser service (Database Engine and SSAS)](sql-server-browser-service-database-engine-and-ssas.md).

## Hide SQL Server

When running,  SQL Server 
 Browser responds to queries, with the name, version, and connection information for each installed instance. For  SQL Server 
, the **HideInstance** flag, indicates that  SQL Server 
 Browser shouldn't respond with information about this server instance. Client applications can still connect, but they must know the required connection information. For more information, see [Hide an instance of SQL Server Database Engine](hide-an-instance-of-sql-server-database-engine.md).

## Related content

- [Client network configuration](client-network-configuration.md)
- [Manage the Database Engine services](manage-the-database-engine-services.md)
