---
title: "Using statements with SQL"
description: "Learn an overview of using different types of SQL statements with the Microsoft JDBC Driver for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "08/12/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---
# Using statements with SQL



When you work with data in a  SQL Server 
 database by using the  Microsoft JDBC Driver for SQL Server 
 and inline SQL statements, there are different classes that you can use. Which class you use depends on the type of SQL statement that you want to run.  
  
If your SQL statement contains no IN parameters, use the [SQLServerStatement](reference/sqlserverstatement-class.md) class, but if it does contain IN parameters, use the [SQLServerPreparedStatement](reference/sqlserverpreparedstatement-class.md) class.  
  
> **Note:**  
> If you need to use SQL statements that contain both IN and OUT parameters, you must implement them as stored procedures and call them by using the [SQLServerCallableStatement](reference/sqlservercallablestatement-class.md) class. For more information about using stored procedures, see [Using statements with stored procedures](using-statements-with-stored-procedures.md).  
  
The following sections describe the different scenarios for working with data in a  SQL Server 
 database by using SQL statements.  

## In This Section  

| Topic | Description |
| --- | --- |
| [Using a SQL statement with no parameters](using-an-sql-statement-with-no-parameters.md) | Describes how to use SQL statements that contain no parameters. |
| [Using a SQL statement with parameters](using-an-sql-statement-with-parameters.md) | Describes how to use SQL statements that contain parameters. |
| [Using a SQL statement to modify database objects](using-an-sql-statement-to-modify-database-objects.md) | Describes how to use SQL statements to modify database objects. |
| [Using a SQL statement to modify data](using-an-sql-statement-to-modify-data.md) | Describes how to use SQL statements to modify data in a database. |
  
## Related content

- [Using statements with the JDBC driver](using-statements-with-the-jdbc-driver.md)
