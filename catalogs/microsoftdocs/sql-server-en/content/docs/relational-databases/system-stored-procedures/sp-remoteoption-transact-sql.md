---
title: "sys.sp_remoteoption (Transact-SQL)"
description: sp_remoteoption displays or changes options for a remote login defined on the local server running SQL Server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_remoteoption_TSQL"
  - "sp_remoteoption"
helpviewer_keywords:
  - "sp_remoteoption"
dev_langs:
  - "TSQL"
---
# sys.sp_remoteoption (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Displays or changes options for a remote login defined on the local server running  SQL Server 
.

> **Note:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. `sp_remoteoption` doesn't change any options and returns an error message. It's supported for backward compatibility only.



## Syntax

```syntaxsql
sys.sp_remoteoption
    [ @remoteserver = ] N'remoteserver'
    [ , [ @loginame = ] N'loginame' ]
    [ , [ @remotename = ] N'remotename' ]
    [ , [ @optname = ] 'optname' ]
    [ , [ @optvalue = ] 'optvalue' ]
[ ; ]
```

## Remarks

This stored procedure returns the following error message:

`The trusted option in remote login mapping is no longer supported.`

## Related content

- [Linked servers (Database Engine)](../linked-servers/linked-servers-database-engine.md)
