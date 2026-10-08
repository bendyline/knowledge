---
title: "Connect to SQL Server with Proxy Server-SQL Server Config Manager"
description: "Learn how to use SQL Server Configuration Manager to connect to SQL Server through a proxy server. See how to use Remote WinSock (RWS) to listen remotely."
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "Remote WinSock"
  - "RWS"
  - "LATs"
  - "proxy servers [SQL Server]"
  - "connections [SQL Server], proxy server"
  - "Microsoft Proxy Server [SQL Server]"
  - "local address tables [SQL Server]"
---
# Connect to SQL Server through a proxy server (SQL Server Configuration Manager)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to connect to SQL Server through a proxy server in  SQL Server 
 by using SQL Server Configuration Manager. To listen remotely by way of Remote WinSock (RWS), define the local address table (LAT) for the proxy server so that the listening node address is outside the range of LAT entries.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

1. Follow the steps in [Configure SQL Server to listen on a specific TCP port](configure-a-server-to-listen-on-a-specific-tcp-port.md) to determine which TCP/IP ports are used by the  Database Engine 
, or to configure the  Database Engine 
 to use a desired port.

1. In your proxy server, define the local address table (LAT) for the proxy server so that the listening node address is outside the range of LAT entries. For more information, see your proxy server documentation.

> **Note:**  
> This article applies to on-premises  SQL Server 
. For connection issues related to  SQL Database
, see [Troubleshoot connection issues to Azure SQL Database](https://learn.microsoft.com/azure/sql-database/sql-database-troubleshoot-common-connection-issues).
