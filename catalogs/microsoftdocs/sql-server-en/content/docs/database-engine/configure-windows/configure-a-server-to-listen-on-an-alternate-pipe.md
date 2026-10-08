---
title: "Configure a Server to Listen on an Alternate Pipe"
description: Find out how to configure the named pipe that the SQL Server Database Engine listens on. Learn how to connect a client application to a specific named pipe.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "Named Pipes [SQL Server], configuring"
  - "listening [SQL Server], pipes"
  - "pipes [SQL Server], alternate"
  - "alternate pipes [SQL Server]"
---
# Configure a server to listen on an alternate pipe


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to configure a server to listen on an alternate pipe in  SQL Server 
 by using SQL Server Configuration Manager. By default, the default instance of  SQL Server Database Engine 
 listens on named pipe `\\.\pipe\sql\query`. Named instances of  SQL Server Database Engine 
 and  SQL Server Compact 
 listen on other pipes.

There are three ways to connect to a specific named pipe with a client application:

- Run the  SQL Server 
 Browser service on the server.

- Create an alias on the client, specifying the named pipe.

- Program the client to connect using a custom connection string.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

1. In SQL Server Configuration Manager, in the console pane, expand **SQL Server Network Configuration**, and then select expand **Protocols for** *\<instance name>*.

1. In the details pane, right-click **Named Pipes**, and then select **Properties**.

1. On the **Protocol** tab, in the **Pipe Name** box, type the pipe you want the  Database Engine 
 to listen on, and then select **OK**.

1. In the console pane, select **SQL Server Services**.

1. In the details pane, right-click **SQL Server (**\<instance name>**)** and then select **Restart**, to stop and restart  SQL Server 
.

When  SQL Server 
 is listening on an alternate pipe, there are three ways to connect to a specific named pipe with a client application:

- Run the  SQL Server 
 Browser service on the server.

- Create an alias on the client, specifying the named pipe.

- Program the client to connect using a custom connection string.

## Related content

- [Create or delete a server alias for use by a client](create-or-delete-a-server-alias-for-use-by-a-client.md)
- [Server network configuration](server-network-configuration.md)
