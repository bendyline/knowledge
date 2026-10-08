---
title: "Configure Client Protocols"
description: Learn various ways of configuring the protocols that client applications use in SQL Server. Supported protocols include TCP/IP, named pipes, and shared memory.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: install-set-up-deploy
helpviewer_keywords:
  - "default protocols"
  - "network protocols [SQL Server], client configuration"
  - "TCP/IP [SQL Server], client protocols"
  - "disabling client protocols"
  - "ordering protocols [SQL Server]"
  - "protocols [SQL Server], order for client computers"
  - "configure client protocols"
  - "client protocols [SQL Server]"
  - "protocols [SQL Server], client configuration"
  - "default protocols, client"
---
# Configure client protocols


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to configure client protocols used by client applications in  SQL Server 
 by using  SQL Server 
 Configuration Manager. Microsoft  SQL Server 
 supports client communication with the TCP/IP network protocol and the named pipes protocol. The shared memory protocol is also available if the client is connecting to an instance of the  Database Engine 
 on the same computer. There are three common methods of selecting the protocol.

- Configure all client applications to use the same network protocol by setting the protocol order in  SQL Server 
 Configuration Manager.

- Configure a single client application to use a different network protocol by creating an alias. For more information, see [Create or delete a server alias for use by a client](create-or-delete-a-server-alias-for-use-by-a-client.md).

- Some client applications, such as sqlcmd.exe, can specify the protocol as part of the connection string. For more information, see [Connect to SQL Server with sqlcmd](../../tools/sqlcmd/sqlcmd-connect-database-engine.md).

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

<a id="EnableDisable"></a>

### Enable or disable a client protocol

1. In  SQL Server 
 Configuration Manager, expand **SQL Server Native Client Configuration**, right-click **Client Protocols**, and then select **Properties**.

1. Select a protocol in the **Disabled Protocols** box, and then select **Enable**, to enable a protocol.

1. Select a protocol in the **Enabled Protocols** box, and then select **Disable**, to disable a protocol.

<a id="ChangeDefault"></a>

### Change the default protocol or the protocol order for client computers

1. In  SQL Server 
 Configuration Manager, expand **SQL Server Native Client Configuration**, right-click **Client Protocols**, and then select **Properties**.

1. In the **Enabled Protocols** box, select **Move Up** or **Move Down**, to change the order in which protocols are tried, when attempting to connect to  SQL Server 
. The top protocol in the **Enabled Protocols** box is the default protocol.

    SQL Server 
 Configuration Manager creates registry entries for the server alias configurations and default client network library. However, the application doesn't install either the  SQL Server 
 client network libraries or the network protocols. The  SQL Server 
 client network libraries are installed during  SQL Server 
 Setup; the network protocols are installed as part of Microsoft Windows Setup (or through **Networks** in **Control Panel**). A particular network protocol might not be available as part of Windows Setup. For more information about installing these network protocols, see the vendor documentation.

<a id="Configure"></a>

### Configure a client to use TCP/IP

1. In  SQL Server 
 Configuration Manager, expand **SQL Server Native Client Configuration**, right-click **Client Protocols**, and then select **Properties**.

1. In the **Enabled Protocols** box, select the up and down arrows to change the order in which protocols are tried, when attempting to connect to SQL Server. The top protocol in the **Enabled Protocols** box is the default protocol.

The shared memory protocol is enabled separately by checking the **Enabled Shared Memory Protocol** box.

## Related content

- [Server configuration: remote login timeout](configure-the-remote-login-timeout-server-configuration-option.md)
