---
title: "Constructing a SQL Statement (ODBC)"
description: Learn how the SQL Server Client ODBC driver deals with SQL statements, parsing some into Transact-SQL statements and passing others to the database unchanged.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client ODBC driver, statements"
  - "statements [ODBC], constructing"
  - "ODBC applications, statements"
---
# Constructing a SQL Statement (ODBC)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  ODBC applications perform almost all of their database access by executing  Transact-SQL  statements. The form of these statements depends on the application requirements. SQL statements can be constructed in the following ways:  
  
-   Hard-coded  
  
     Static statements performed by an application as a fixed task.  
  
-   Constructed at run time  
  
     SQL statements constructed at run time that enable the user to tailor the statement by using common clauses, such as SELECT, WHERE, and ORDER BY. This includes ad hoc queries entered by users.  
  
 The  SQL Server 
 Client ODBC driver parses SQL statements only for ODBC and ISO syntax not directly supported by the  Database Engine 
, which the driver transforms into  Transact-SQL . All other SQL syntax is passed to the  Database Engine 
 unchanged, where  SQL Server 
 will determine if it is valid  SQL Server 
. This approach yields two benefits:  
  
-   Reduced overhead  
  
     Processing overhead for the driver is minimized because it only has to scan for a small set of ODBC and ISO clauses.  
  
-   Flexibility  
  
     Programmers can tailor the portability of their applications. To enhance portability against multiple databases, use primarily ODBC and ISO syntax. To use enhancements specific to  SQL Server 
, use the appropriate  Transact-SQL  syntax. The  SQL Server 
 Native Client ODBC driver supports the complete  Transact-SQL  syntax so ODBC-based applications can take advantage of all the features in  SQL Server 
.  
  
 The column list in a SELECT statement should contain only the columns required to perform the current task. Not only does this reduce the amount of data sent across the network, but also it reduces the effect of database changes on the application. If an application does not reference a column from a table, then the application is not affected by any changes made to that column.  
  
## Related content

- [Executing Queries (ODBC)](executing-queries-odbc.md)
