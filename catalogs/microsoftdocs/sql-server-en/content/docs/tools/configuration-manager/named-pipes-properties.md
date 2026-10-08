---
title: "Named Pipes Properties"
description: Use the Protocol page on the Named Pipes Properties dialog box to view or change the named pipe that SQL Server listens to when using the Named Pipes protocol.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/15/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: ui-reference
ms.collection:
  - data-tools
helpviewer_keywords:
  - "pipes [SQL Server]"
  - "listening [SQL Server], pipes"
  - "pipes [SQL Server], listening on pipes"
  - "Named Pipes [SQL Server], listening on pipes"
monikerRange: ">=sql-server-2017"
---
# Named Pipes properties


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


Use the **Protocol** page on the **Named Pipes Properties** dialog box to view or change the named pipe that  SQL Server 
 listens to, when using the Named Pipes protocol.

 SQL Server 
 must be restarted to enable or disable the protocol, or change the named pipe.

## Options

#### Enabled

Possible values are **Yes** and **No**.

#### Pipe Name

Specifies the named pipe on which  SQL Server 
 listens. By default,  SQL Server 
 listens on: `\\.\pipe\sql\query` for the default instance and `\\.\pipe\MSSQL$<instancename>\sql\query` for a named instance. This field is limited to 2,047 characters.

## Create an alternate named pipe

To change the named pipe, type the new pipe name in the **Pipe Name** box and then stop and restart  SQL Server 
. Since `sql\query` is well known as the named pipe used by  SQL Server 
, changing the pipe can help reduce the risk of attack by malicious programs.

### Example

Type `\\.\pipe\unit\app` to listen on the `unit\app` pipe.

Type `\\.\pipe\acct` to listen on the `acct` pipe.

## Related content

- [Enable or disable a server network protocol](../../database-engine/configure-windows/enable-or-disable-a-server-network-protocol.md)
- [Choosing a Network Protocol](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/ms187892\(v=sql.130\))
- [Creating a Valid Connection String Using Named Pipes](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/ms189307\(v=sql.130\))
