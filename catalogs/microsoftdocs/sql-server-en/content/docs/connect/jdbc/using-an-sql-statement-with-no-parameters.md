---
title: Using a SQL statement with no parameters
description: Learn how to execute SQL statement with no parameters using the Microsoft JDBC Driver for SQL Server.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: 04/20/2021
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
---

# Using a SQL statement with no parameters



To work with data in a  SQL Server 
 database by using a SQL statement that contains no parameters, you can use the [executeQuery](reference/executequery-method-sqlserverstatement.md) method of the [SQLServerStatement](reference/sqlserverstatement-class.md) class to return a [SQLServerResultSet](reference/sqlserverresultset-class.md) that will contain the requested data. First create a SQLServerStatement object by using the [createStatement](reference/createstatement-method-sqlserverconnection.md) method of the [SQLServerConnection](reference/sqlserverconnection-class.md) class.

In the following example, an open connection to the  AdventureWorks2025  sample database is passed in to the `executeStatement` function. From there, a SQL statement is constructed and run. Finally, the results are read from the result set.

[language="java" source="codesnippet/Java/using-an-sql-statement-w_0_1.java"::: (complete source file; reference: codesnippet/Java/using-an-sql-statement-w_0_1.java)](../../../_code/docs/connect/jdbc/codesnippet/Java/using-an-sql-statement-w_0_1.java.md)

For more information about using result sets, see [Managing result sets with the JDBC driver](managing-result-sets-with-the-jdbc-driver.md).

## Related content

- [Using statements with SQL](using-statements-with-sql.md)
