---
title: "sp_set_database_firewall_rule"
titleSuffix: Azure SQL Database
description: sp_set_database_firewall_rule creates or updates the database-level firewall rules for your Azure SQL database.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: azure-sql-database
ms.topic: "reference"
f1_keywords:
  - "sp_set_database_firewall_rule"
  - "sp_set_database_firewall_rule_TSQL"
  - "sys.sp_set_database_firewall_rule"
  - "sys.sp_set_database_firewall_rule_TSQL"
helpviewer_keywords:
  - "sp_set_database_firewall_rule"
  - "firewall_rules, setting database rules"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current"
---
# sp_set_database_firewall_rule (Azure SQL Database)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Creates or updates the database-level firewall rules for your  Azure SQL Database 
. Database firewall rules can be configured for the `master` database, and for user databases on  SQL Database
. Database firewall rules can be useful when using contained database users. For more information, see [Make your database portable by using contained databases](../security/contained-database-users-making-your-database-portable.md).

## Syntax

```syntaxsql
sp_set_database_firewall_rule
    [ @name = ] N'name'
    , [ @start_ip_address = ] 'start_ip_address'
    , [ @end_ip_address = ] 'end_ip_address'
[ ; ]
```

## Arguments

#### [ @name = ] N'*name*'

The name used to describe and distinguish the database-level firewall setting. *@name* is **nvarchar(128)** with no default.

#### [ @start_ip_address = ] '*start_ip_address*'

The lowest IP address in the range of the database-level firewall setting. IP addresses equal to or greater than this value can attempt to connect to the  SQL Database
 instance. The lowest possible IP address is `0.0.0.0`. *@start_ip_address* is **varchar(50)** with no default.

#### [ @end_ip_address = ] '*end_ip_address*'

The highest IP address in the range of the database-level firewall setting. IP addresses equal to or less than this value can attempt to connect to the  SQL Database
 instance. The highest possible IP address is `255.255.255.255`. *@end_ip_address* is **varchar(50)** with no default.

The following table demonstrates the supported arguments and options in  SQL Database
.

> **Note:**  
> Azure connection attempts are allowed when both this field and the *@start_ip_address* field equals `0.0.0.0`.

## Remarks

The names of database-level firewall settings for a database must be unique. If the name of the database-level firewall setting provided for the stored procedure already exists in the database-level firewall settings table, the starting and ending IP addresses are updated. Otherwise, a new database-level firewall setting is created.

When you add a database-level firewall setting where the beginning and ending IP addresses are equal to `0.0.0.0`, you enable access to your database in the  SQL Database
 server from any Azure resource. Provide a value to the *@name* parameter that helps you remember what the firewall setting is for.

## Permissions

Requires `CONTROL` permission on the database.

## Examples

The following code creates a database-level firewall setting called `Allow Azure` that enables access to your database from Azure.

```sql
EXECUTE sp_set_database_firewall_rule N'Allow Azure', '0.0.0.0', '0.0.0.0';
```

The following code creates a database-level firewall setting called `Example DB Setting 1` for only the IP address `0.0.0.4`. Then, the `sp_set_database firewall_rule` stored procedure is called again to update the end IP address to `0.0.0.6`, in that firewall setting. This example creates a range that allows IP addresses `0.0.0.4`, `0.0.0.5`, and `0.0.0.6` to access the database.

- Create database-level firewall setting for only IP 0.0.0.4:

  ```sql
  EXECUTE sp_set_database_firewall_rule N'Example DB Setting 1', '0.0.0.4', '0.0.0.4';
  ```

- Update database-level firewall setting to create a range of allowed IP addresses:

  ```sql
  EXECUTE sp_set_database_firewall_rule N'Example DB Setting 1', '0.0.0.4', '0.0.0.6';
  ```

## Related content

- [Azure SQL Database IP firewall rules](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure)
- [sp_set_firewall_rule (Azure SQL Database)](sp-set-firewall-rule-azure-sql-database.md)
- [sp_delete_database_firewall_rule (Azure SQL Database)](sp-delete-database-firewall-rule-azure-sql-database.md)
- [sys.database_firewall_rules](../system-catalog-views/sys-database-firewall-rules-azure-sql-database.md)
