---
title: "Server Configuration: SMO and DMO XPs"
description: Learn how to enable SQL Server Management Object (SMO) extended stored procedures on a server. View information on the SMO and DMO XPs configuration option.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/17/2026
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
---
# Server configuration: SMO and DMO XPs


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the `SMO and DMO XPs` option to enable  SQL Server 
 Management Objects (SMO) extended stored procedures on this server.

Starting in  SQL Server 2012 (11.x) 
, DMO is removed from  SQL Server 
.

The following table describes the possible values:

| Value | Description |
| --- | --- |
| `0` | SMO XPs aren't available. |
| `1` (default) | SMO XPs are available. |

The setting takes effect immediately.

## Examples

The following example enables SMO extended stored procedures.

```sql
EXECUTE sp_configure 'show advanced options', 1;
GO

RECONFIGURE;
GO

EXECUTE sp_configure 'SMO and DMO XPs', 1;
GO

RECONFIGURE;
GO
```

## Related content

- [SQL Server Management Objects (SMO) Programming Guide](../../relational-databases/server-management-objects-smo/sql-server-management-objects-smo-programming-guide.md)
