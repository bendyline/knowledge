---
title: "Server Configuration: Agent XPs"
description: Discover how to use the Agent XPs option to enable SQL Server Agent extended stored procedures. View an example that uses this option.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "Agent XPs option"
  - "extended stored procedures [SQL Server], SQL Server Agent"
---
# Server configuration: Agent XPs


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the `Agent XPs` option to enable the  SQL Server 
 Agent extended stored procedures on this server. When this option isn't enabled, the  SQL Server 
 Agent node isn't available in  SQL Server Management Studio 
 Object Explorer.

When you use the  SQL Server Management Studio 
 tool to start the  SQL Server 
 Agent service, these extended stored procedures are enabled automatically. For more information, see [Surface area configuration](../../relational-databases/security/surface-area-configuration.md).

> **Note:**  
>  Management Studio
 Object Explorer doesn't display the contents of the  SQL Server 
 Agent node unless these extended stored procedures are enabled regardless of the  SQL Server 
 Agent service state.

The possible values are:

| Value | Description |
| --- | --- |
| `0` (default) | SQL Server |
 | Agent extended stored procedures aren't available |
| `1` | SQL Server |
 | Agent extended stored procedures are available |

The setting takes effect immediately without a server stop and restart.

## Examples

The following example enables the  SQL Server 
 Agent extended stored procedures.

1. Connect to the Database Engine from Microsoft SQL Server Management Studio.
1. Select **New Query** from the menu.
1. Copy and paste the following example into the query window, and select **Execute**.

```sql
EXEC sp_configure 'show advanced options', 1;
GO
RECONFIGURE;
GO
EXEC sp_configure 'Agent XPs', 1;
GO
RECONFIGURE
GO
```

## Related content

- [Automated Administration Tasks (SQL Server Agent)](https://learn.microsoft.com/ssms/agent/automated-administration-tasks-sql-server-agent)
- [Start, Stop, or Pause the SQL Server Agent Service](https://learn.microsoft.com/ssms/agent/start-stop-or-pause-the-sql-server-agent-service)
