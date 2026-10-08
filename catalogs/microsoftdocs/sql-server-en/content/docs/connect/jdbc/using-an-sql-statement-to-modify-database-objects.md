---
title: "Using a SQL statement to modify database objects"
description: "Using a SQL statement to modify database objects"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "08/12/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
---

# Using a SQL statement to modify database objects



To modify  SQL Server 
 database objects by using a SQL statement, you can use the [executeUpdate](reference/executeupdate-method-sqlserverstatement.md) method of the [SQLServerStatement](reference/sqlserverstatement-class.md) class. The executeUpdate method will pass the SQL statement to the database for processing, and then return a value of 0 because no rows were affected.

To do this, you must first create a SQLServerStatement object by using the [createStatement](reference/createstatement-method-sqlserverconnection.md) method of the [SQLServerConnection](reference/sqlserverconnection-class.md) class.

> **Note:**  
> SQL statements that modify objects within a database are called Data Definition Language (DDL) statements. These include statements such as `CREATE TABLE`, `DROP TABLE`, `CREATE INDEX`, and `DROP INDEX`. For more information about the types of DDL statements that are supported by  SQL Server 
, see  SQL Server 
 Books Online.

In the following example, an open connection to the  AdventureWorks2025  sample database is passed in to the function, a SQL statement is constructed that will create the simple TestTable in the database, and then the statement is run and the return value is displayed.

[!code[JDBC#UsingSQLToModifyDBObjects1](../../../_code/docs/connect/jdbc/codesnippet/Java/using-an-sql-statement-t_0_1.java.md)]

## Related content

- [Using statements with SQL](using-statements-with-sql.md)
