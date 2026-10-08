---
title: "Server Configuration: filestream access level"
description: "Become familiar with the filestream_access_level option. See how it changes the FILESTREAM access level for an instance of SQL Server."
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/09/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "FILESTREAM [SQL Server], access level"
  - "filestream access level"
---
# Server configuration: filestream access level


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the `filestream access level` option to change the FILESTREAM access level for this instance of  SQL Server 
.

Before this option has any effect, the Windows administration settings for FILESTREAM must be enabled. You can enable these settings when you install  SQL Server 
 or by using  SQL Server 
 Configuration Manager.

| Value | Definition |
| --- | --- |
| `0` | Disables FILESTREAM support for this instance. |
| `1` | Enables FILESTREAM for  Transact-SQL  access. |
| `2` | Enables FILESTREAM for  Transact-SQL  and Win32 streaming access. |
| `3` | Enables FILESTREAM for  Transact-SQL , Win32 streaming access, and remote clients. |

## Remarks

If you plan on using FILESTREAM in a local environment only, you don't need to enable remote access.

## Related content

- [SQL Server installation guide](../install-windows/install-sql-server.md)
- [Enable and configure FILESTREAM](../../relational-databases/blob/enable-and-configure-filestream.md)
