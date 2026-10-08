---
title: "View list of databases on SQL Server"
description: Learn how to view a list of databases on an instance of SQL Server by using SQL Server Management Studio or Transact-SQL.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 09/27/2024
ms.service: sql
ms.subservice: supportability
ms.topic: how-to
helpviewer_keywords:
  - "current databases"
  - "databases currently on server [SQL Server]"
  - "database list [SQL Server]"
  - "viewing database list"
  - "displaying database list"
  - "databases [SQL Server], viewing"
  - "servers [SQL Server], databases listed on"
  - "listing databases"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---

# View list of databases on SQL Server


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





This article describes how to view a list of databases on an instance of  SQL Server 
 by using  SQL Server Management Studio 
 or  Transact-SQL .

<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

If the caller of `sys.databases` is not the owner of the database and the database is not `master` or `tempdb`, the minimum permissions required to see the corresponding row are ALTER ANY DATABASE or VIEW ANY DATABASE server-level permission, or CREATE DATABASE permission in the `master` database. The database to which the caller is connected can always be viewed in `sys.databases`.

## <a name="SSMSProcedure"></a> Use SQL Server Management Studio

#### To view a list of databases on an instance of SQL Server

1. In **Object Explorer**, connect to an instance of the  SQL Server Database Engine 
, and then expand that instance.

1. To see a list of all databases on the instance, expand **Databases**.

## <a name="TsqlProcedure"></a> Use Transact-SQL

#### To view a list of databases on an instance of SQL Server

1. Connect to the  Database Engine 
.

1. From the Standard bar, select **New Query**.

1. Copy and paste the following example into the query window and select **Execute**. This example returns a list of databases on the instance of  SQL Server 
. The list includes the names of the databases, their database IDs, and the dates when the databases were created.

```sql
SELECT name, database_id, create_date
FROM sys.databases;
GO
```

## Related content

- [Databases and Files Catalog Views (Transact-SQL)](../system-catalog-views/databases-and-files-catalog-views-transact-sql.md)
- [sys.databases (Transact-SQL)](../system-catalog-views/sys-databases-transact-sql.md)
