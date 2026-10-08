---
title: "sp_delete_database_firewall_rule (Azure SQL Database)"
description: sp_delete_database_firewall_rule removes database-level firewall setting from your Azure SQL Database.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: azure-sql-database
ms.topic: "reference"
f1_keywords:
  - "sp_delete_database_firewall_rule"
  - "sp_delete_database_firewall_rule_TSQL"
  - "sys.sp_delete_database_firewall_rule"
  - "sys.sp_delete_database_firewall_rule_TSQL"
helpviewer_keywords:
  - "sp_delete_database_firewall_rule procedure"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current"
---
# sp_delete_database_firewall_rule (Azure SQL Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Removes database-level firewall setting from your  Azure SQL Database 
. Database firewall rules can be configured and deleted for the `master` database, and for user databases on  SQL Database
.

## Syntax

```syntaxsql
sp_delete_database_firewall_rule [ @name = ] [ N ] 'name'
[ ; ]
```

## Arguments

#### [ @name = ] [ N ] '*name*'

The name of the database-level firewall setting to be removed. *@name* is **nvarchar(128)** with no default value. The Unicode prefix `N` is optional for  SQL Database
.

## Permissions

Only the server-level principal login created by the provisioning process, or a Microsoft Entra admin assigned as admin, can delete database-level firewall rules.


> **Note:**  
> [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/new-name) was previously known as Azure Active Directory (Azure AD).

## Examples

The following example removes the database-level firewall setting named `Example DB Setting 1`.

```sql
EXECUTE sp_delete_database_firewall_rule N'Example DB Setting 1';
```

## Related content

- [Azure SQL Database IP firewall rules](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure)
- [sp_set_firewall_rule (Azure SQL Database)](sp-set-firewall-rule-azure-sql-database.md)
- [sp_set_database_firewall_rule (Azure SQL Database)](sp-set-database-firewall-rule-azure-sql-database.md)
- [sys.database_firewall_rules](../system-catalog-views/sys-database-firewall-rules-azure-sql-database.md)
