---
title: "sp_external_policy_refresh (Transact-SQL)"
description: Reference documentation to explain sp_external_policy_refresh (Transact-SQL) system stored procedure.
author: srdan-bozovic-msft
ms.author: srbozovi
ms.reviewer: randolphwest
ms.date: 09/23/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_external_policy_refresh_TSQL"
  - "sp_external_policy_refresh"
helpviewer_keywords:
  - "sp_external_policy_refresh system stored procedure"
dev_langs:
  - "TSQL"
---
# sp_external_policy_refresh (Transact-SQL)


**Applies to:**
 


 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)




> **Important:**  
> Microsoft Purview access policies for Azure SQL Database, Azure SQL Managed Instance, and Azure Arc-enabled SQL Server 2022 retire on October 30, 2027. Migrate the access these policies grant to SQL native roles and permissions. For more information, see [Retirement of Microsoft Purview access policies for SQL](../security/purview-access-policies-retirement.md).

Forces immediate download of latest published policies for the whole instance (for every database).

> **Note:**  
> If there are any ongoing pull requests by the background task or by another user, the request waits until the former task is finished and starts a new pull. – This ensures that the result of calling this proc explicitly always results in a refreshed cache.

## Syntax

```syntaxsql
sp_external_policy_refresh [ @type = ] 'type'
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### [ @type = ] '*type*'

Type can be `reload` (complete policy download) or `update` (incremental policy download). Default type is `update`.

## Return code values

`0` (success) or a nonzero number (failure).

## Permissions

Requires `ALTER SERVER STATE` (covered by `CONTROL SERVER`) permission.

## Examples

### A. Complete policy refresh

The following example downloads complete set of policies.

```sql
EXECUTE sp_external_policy_refresh @type = 'reload';
```

### B. Incremental policy refresh

The following example downloads policies incrementally by using the default type 'update'.

```sql
EXECUTE sp_external_policy_refresh;
```

## Related content

- [Provision access by data owner for Azure SQL Database](https://learn.microsoft.com/azure/purview/how-to-policies-data-owner-azure-sql-db)
- [Provision access by data owner for SQL Server on Azure Arc-enabled servers](https://learn.microsoft.com/azure/purview/how-to-policies-data-owner-arc-sql-server)
