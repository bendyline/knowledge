---
title: "sp_MShasdbaccess (Transact-SQL)"
description: sp_MShasdbaccess lists the name and owner of all the databases to which the user has access.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_MShasdbaccess"
  - "sp_MShasdbaccess_TSQL"
helpviewer_keywords:
  - "sp_MShasdbaccess"
dev_langs:
  - "TSQL"
---
# sp_MShasdbaccess (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Lists the name and owner of all the databases to which the user has access.



## Syntax

```syntaxsql
sp_MShasdbaccess
[ ; ]
```

## Arguments

None.

## Return code values

`0` (success) or `1` (failure).

## Permissions

Execute permission is granted to the **public** role.

## Related content

- [sys.sysdatabases (Transact-SQL)](../system-compatibility-views/sys-sysdatabases-transact-sql.md)
