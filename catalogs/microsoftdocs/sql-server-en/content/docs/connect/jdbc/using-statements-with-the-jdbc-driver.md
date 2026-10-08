---
title: "Using statements with the JDBC driver"
description: "Learn how the Microsoft JDBC Driver for SQL Server can be used to execute SQL statements and stored procedures to perform database operations."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "08/12/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---
# Using statements with the JDBC driver



The  Microsoft JDBC Driver for SQL Server 
 can be used to work with data in a  SQL Server 
 database in a variety of ways. The JDBC driver can be used to run SQL statements against the database, or it can be used to call stored procedures in the database, using both input and output parameters. The JDBC driver also supports using SQL escape sequences, update counts, automatically generated keys, and performing updates within a batch operation.  
  
The JDBC driver provides three classes for retrieving data from a  SQL Server 
 database:  
  
1. [SQLServerStatement](reference/sqlserverstatement-class.md) - used for running SQL statements without parameters.  
  
2. [SQLServerPreparedStatement](reference/sqlserverpreparedstatement-class.md) - (inherited from SQLServerStatement), used for running compiled SQL statements that might contain IN parameters.  
  
3. [SQLServerCallableStatement](reference/sqlservercallablestatement-class.md) - (inherited from SQLServerPreparedStatement), used for running stored procedures that might contain IN parameters, OUT parameters, or both.  
  
 The topics in this section discuss how you can use each of the three statement classes to work with data in a  SQL Server 
 database.  
  
## In this section  

| Topic | Description |
| --- | --- |
| [Using statements with SQL](using-statements-with-sql.md) | Describes how to use SQL statements with the JDBC driver to work with data in a  SQL Server |
 | database. |
| [Using statements with stored procedures](using-statements-with-stored-procedures.md) | Describes how to use stored procedures with the JDBC driver to work with data in a  SQL Server |
 | database. |
| [Using multiple result sets](using-multiple-result-sets.md) | Describes how to use the JDBC driver to retrieve data from multiple result sets. |
| [Using SQL escape sequences](using-sql-escape-sequences.md) | Describes how to use SQL escape sequences, such as date and time literals and functions. |
| [Using auto generated keys](using-auto-generated-keys.md) | Describes how to use automatically generated keys. |
| [Performing batch operations](performing-batch-operations.md) | Describes how to use the JDBC driver to perform batch operations. |
| [Handling complex statements](handling-complex-statements.md) | Describes how to use the JDBC driver to run complex statements that perform a variety of tasks and might return different types of data. |
  
## Related content

- [Overview of the JDBC driver](overview-of-the-jdbc-driver.md)
