---
title: "Direct Execution"
description: "Direct Execution"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "ODBC applications, statements"
  - "direct execution [ODBC]"
  - "SQLExecDirect function"
  - "statements [ODBC], direct execution"
---
# Direct Execution

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  Direct execution is the most basic way to execute a statement. An application builds a character string containing a  Transact-SQL  statement and submits it for execution using the **SQLExecDirect** function. When the statement reaches the server,  SQL Server 
 compiles it into an execution plan and then immediately runs the execution plan.  
  
 Direct execution is commonly used by applications that build and execute statements at run time and is the most efficient method for statements that will be executed a single time. Its drawback with many databases is that the SQL statement must be parsed and compiled each time it is executed, which adds overhead if the statement is executed multiple times.  
  
  SQL Server 
 significantly improves the performance of direct execution of commonly executed statements in multiuser environments and using SQLExecDirect with parameter markers for commonly executed SQL statements can approach the efficiency of prepared execution.  
  
 When connected to an instance of  SQL Server 
, the  SQL Server 
 Native Client ODBC driver uses [sp_executesql](../../system-stored-procedures/sp-executesql-transact-sql.md) to transmit the SQL statement or batch specified on **SQLExecDirect**.  SQL Server 
 has logic to quickly determine if a SQL statement or batch executed with **sp_executesql** matches the statement or batch that generated an execution plan that already exists in memory. If a match is made,  SQL Server 
 simply reuses the existing plan rather than compile a new plan. This means that commonly executed SQL statements executed with **SQLExecDirect** in a system with many users will benefit from many of the plan-reuse benefits that were only available to stored procedures in earlier versions of  SQL Server 
.  
  
 This benefit of reusing execution plans only works when several users are executing the same SQL statement or batch. Follow these coding conventions to increase the probability that the SQL statements executed by different clients are similar enough to be able to reuse execution plans:  
  
-   Do not include data constants in the SQL statements; instead use parameter markers bound to program variables. For more information, see [Using Statement Parameters](../using-statement-parameters.md).  
  
-   Use fully qualified object names. Execution plans are not reused if object names are not qualified.  
  
-   Have application connections as possible use a common set of connection and statement options. Execution plans generated for a connection with one set of options (such as ANSI_NULLS) are not reused for a connection having another set of options. The  SQL Server 
 Native Client ODBC driver and the  SQL Server 
 Native Client OLE DB provider both have the same default settings for these options.  
  
 If all statements executed with **SQLExecDirect** are coded using these conventions,  SQL Server 
 can reuse execution plans when the opportunity arises.  
  
## Related content

- [Executing Statements (ODBC)](executing-statements-odbc.md)
