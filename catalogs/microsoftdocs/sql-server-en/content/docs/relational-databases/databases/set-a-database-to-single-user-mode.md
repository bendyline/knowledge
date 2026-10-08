---
title: "Set a database to single-user mode"
description: "Learn how to set a database to single-user mode."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 07/19/2024
ms.service: sql
ms.topic: how-to
helpviewer_keywords:
  - "single-user mode [SQL Server], database option"
---
# Set a database to single-user mode


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to set a user-defined database to single-user mode in  SQL Server 
 by using  SQL Server Management Studio 
 or  Transact-SQL . Single-user mode specifies that only one user at a time can access the database and is generally used for maintenance actions.  
  
## <a id="Restrictions"></a> Limitations
  
- If other users are connected to the database at the time that you set the database to single-user mode, their connections to the database will be closed without warning.
  
- The database remains in single-user mode even after the user that set the option is disconnected. At that point, a different user, but only one, can connect to the database.
  
## Prerequisites
  
-   Before you set the database to SINGLE_USER, verify that the AUTO_UPDATE_STATISTICS_ASYNC option is set to `OFF`. When this option is set to `ON`, the background thread that is used to update statistics takes a connection against the database, and you will be unable to access the database in single-user mode. For more information, see [ALTER DATABASE SET Options (Transact-SQL)](../../t-sql/statements/alter-database-transact-sql-set-options.md).  
  
<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

Requires ALTER permission on the database.  
  
## <a id="SSMSProcedure"></a> Use SQL Server Management Studio
  
 To set a database to single-user mode:
  
1. In **Object Explorer**, connect to an instance of the  SQL Server Database Engine 
, and then expand that instance.  
  
1. Right-click the database to change, and then select **Properties**.  
  
1. In the **Database Properties** dialog box, select the **Options** page.  
  
1. From the **Restrict Access** option, select **Single**.  
  
1. If other users are connected to the database, an **Open Connections** message will appear. To change the property and close all other connections, select **Yes**.  
  
 You can also set the database to **Multiple** or **Restricted** access by using this procedure. For more information about the Restrict Access options, see [Database Properties (Options Page)](database-properties-options-page.md).  
  
## <a id="TsqlProcedure"></a> Use Transact-SQL
  
 To set a database to single-user mode:
  
1. Connect to the  Database Engine 
.  
  
1. From the Standard bar, select **New Query**.  
  
1. Copy and paste the following example into the query window and select **Execute**. This example sets the database to `SINGLE_USER` mode to obtain exclusive access. The example then sets the state of the  `AdventureWorks2025`  database to `READ_ONLY` and returns access to the database to all users.

> **Warning:**
> To quickly obtain exclusive access, the code sample uses the termination option `WITH ROLLBACK IMMEDIATE`. This will cause all incomplete transactions to be rolled back and any other connections to the  `AdventureWorks2025`  database to be immediately disconnected.  
  
 [language="sql" source="codesnippet/tsql/set-a-database-to-single_1.sql"::: (complete source file; reference: codesnippet/tsql/set-a-database-to-single_1.sql)](../../../_code/docs/relational-databases/databases/codesnippet/tsql/set-a-database-to-single_1.sql.md)
  
## Related content

- [ALTER DATABASE (Transact-SQL)](../../t-sql/statements/alter-database-transact-sql.md)
- [Single-user mode for SQL Server](../../database-engine/configure-windows/start-sql-server-in-single-user-mode.md)
