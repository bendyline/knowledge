---
title: "Batches of Statements"
description: "Batches of Statements"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "statements [ODBC], batches"
  - "batches [ODBC]"
  - "ODBC applications, statements"
  - "multiple statements, batches"
  - "SQLMoreResults function"
  - "SQLExecDirect function"
---
# Batches of Statements

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  A batch of  Transact-SQL  statements contains two or more statements, separated by a semicolon (;), built into a single string passed to **SQLExecDirect** or [SQLPrepare Function](../../../odbc/reference/syntax/sqlprepare-function.md). For example:  
  
```  
SQLExecDirect(hstmt,   
    "SELECT * FROM Authors; SELECT * FROM Titles",  
    SQL_NTS);  
```  
  
 Batches can be more efficient than submitting statements separately because network traffic is often reduced. Use [SQLMoreResults](../../native-client-odbc-api/sqlmoreresults.md) to get positioned on the next result set when finished with the current result set.  
  
 Batches can always be used when the ODBC cursor attributes are set to the defaults of a forward-only, read-only cursor with a rowset size of 1.  
  
 If a batch is executed when using server cursors against  SQL Server 
, the server cursor is implicitly converted to a default result set. **SQLExecDirect** or **SQLExecute** return SQL_SUCCESS_WITH_INFO, and a call to **SQLGetDiagRec** returns:  
  
```  
szSqlState = "01S02", pfNativeError = 0  
szErrorMsg = "[Microsoft][SQL Server Native Server Native Client]Cursor type changed."  
```  
  
## Related content

- [Executing Statements (ODBC)](executing-statements-odbc.md)
