---
title: "sp_revoke_proxy_from_subsystem (Transact-SQL)"
description: sp_revoke_proxy_from_subsystem revokes access to a subsystem from a proxy.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_revoke_login_from_subsystem"
  - "sp_revoke_login_from_subsystem_TSQL"
helpviewer_keywords:
  - "sp_revoke_proxy_from_subsystem"
dev_langs:
  - "TSQL"
---
# sp_revoke_proxy_from_subsystem (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Revokes access to a subsystem from a proxy.



## Syntax

```syntaxsql
dbo.sp_revoke_proxy_from_subsystem
    { [ @proxy_id = ] proxy_id
        | [ @proxy_name = ] N'proxy_name' }
    , { [ @subsystem_id = ] subsystem_id
        | [ @subsystem_name = ] N'subsystem_name' }
[ ; ]
```

## Arguments

#### [ @proxy_id = ] *proxy_id*

The proxy identification number of the proxy to revoke access from. *@proxy_id* is **int**, with a default of `NULL`.

Either *@proxy_id* or *@proxy_name* must be specified, but both can't be specified.

#### [ @proxy_name = ] N'*proxy_name*'

The name of the proxy to revoke access from. *@proxy_name* is **sysname**, with a default of `NULL`.

Either *@proxy_id* or *@proxy_name* must be specified, but both can't be specified.

#### [ @subsystem_id = ] *subsystem_id*

The ID number of the subsystem to revoke access to. *@subsystem_id* is **int**, with a default of `NULL`.

Either *@subsystem_id* or *@subsystem_name* must be specified, but both can't be specified.

The following table lists the values for each subsystem.

| Value | Description |
| --- | --- |
| `2` <sup>1</sup> | ActiveX Script |
| `3` | Operating System (CmdExec) |
| `4` | Replication Snapshot Agent |
| `5` | Replication Log Reader Agent |
| `6` | Replication Distribution Agent |
| `7` | Replication Merge Agent |
| `8` | Replication Queue Reader Agent |
| `9` | Analysis Services Command |
| `10` | Analysis Services Query |
| `11` | SSIS |
 | package execution |
| `12` | PowerShell Script |

<sup>1</sup> The ActiveX Scripting subsystem will be removed from  SQL Server 
 Agent in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.

#### [ @subsystem_name = ] N'*subsystem_name*'

The name of the subsystem to revoke access to. *@subsystem_name* is **sysname**, with a default of `NULL`.

Either *@subsystem_id* or *@subsystem_name* must be specified, but both can't be specified.

The following table lists the values for each subsystem.

| Value | Description |
| --- | --- |
| `ActiveScripting` <sup>1</sup> | ActiveX Script |
| `CmdExec` | Operating System (CmdExec) |
| `Snapshot` | Replication Snapshot Agent |
| `LogReader` | Replication Log Reader Agent |
| `Distribution` | Replication Distribution Agent |
| `Merge` | Replication Merge Agent |
| `QueueReader` | Replication Queue Reader Agent |
| `ANALYSISQUERY` | Analysis Services Command |
| `ANALYSISCOMMAND` | Analysis Services Query |
| `Dts` | SSIS |
 | package execution |
| `PowerShell` | PowerShell Script |

<sup>1</sup> The ActiveX Scripting subsystem will be removed from  SQL Server 
 Agent in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.

## Remarks

Revoking access to a subsystem doesn't change the permissions for the principal specified in the proxy.

> **Note:**  
> To determine which job steps reference a proxy, right-click the **Proxies** node under **SQL Server Agent** in Microsoft  SQL Server Management Studio 
, and then select **Properties**. In the **Proxy Account Properties** dialog box, select the **References** page to view all job steps that reference this proxy.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example revokes access to the  SSIS 
 subsystem for the proxy `Catalog application proxy`.

```sql
USE msdb;
GO

EXECUTE dbo.sp_revoke_proxy_from_subsystem
    @proxy_name = 'Catalog application proxy',
    @subsystem_name = N'Dts';
```

## Related content

- [SQL Server Agent stored procedures (Transact-SQL)](sql-server-agent-stored-procedures-transact-sql.md)
- [Implement SQL Server Agent Security](https://learn.microsoft.com/ssms/agent/implement-sql-server-agent-security)
- [sp_grant_proxy_to_subsystem (Transact-SQL)](sp-grant-proxy-to-subsystem-transact-sql.md)
