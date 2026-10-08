---
title: "@@SERVICENAME (Transact-SQL)"
description: "@@SERVICENAME returns the name of the registry key under which the SQL Server Database Engine is running."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 07/02/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@SERVICENAME_TSQL"
  - "@@SERVICENAME"
helpviewer_keywords:
  - "@@SERVICENAME function"
  - "names [SQL Server], registry keys"
  - "registry keys [SQL Server]"
dev_langs:
  - TSQL
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017"
---
# @@SERVICENAME (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Returns the name of the registry key under which  SQL Server 
 is running.

If the current instance is the default instance, `@@SERVICENAME` returns `MSSQLSERVER`. If the current instance is a named instance, `@@SERVICENAME` returns the instance name.



## Syntax

```syntaxsql
@@SERVICENAME
```

## Return types

**nvarchar**

## Remarks

 SQL Server 
 runs as a service named `MSSQLServer`.

## Examples

The following example shows using `@@SERVICENAME` for a default instance.

```sql
SELECT @@SERVICENAME AS 'Service Name';
```

 Here's the result set. 


```output
Service Name
------------------------------
MSSQLSERVER
```

The following example shows using `@@SERVICENAME` for the named instance `localhost\SQL2025`.

```sql
SELECT @@SERVICENAME AS 'Service Name';
```

 Here's the result set. 


```output
Service Name
------------------------------
SQL2025
```

## Related content

- [Manage the Database Engine services](../../database-engine/configure-windows/manage-the-database-engine-services.md)
