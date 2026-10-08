---
title: "Using SQL Server Default Result Sets"
description: "Using SQL Server Default Result Sets"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLSetStmtAttr function"
  - "ODBC cursors, default result sets"
  - "cursors [ODBC], default result sets"
  - "default result sets"
  - "result sets [ODBC], default"
  - "ODBC applications, cursors"
---
# Using SQL Server Default Result Sets

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The default ODBC cursor attributes are:  
  
```  
SQLSetStmtAttr(hstmt, SQL_ATTR_CURSOR_TYPE, SQL_CURSOR_FORWARD_ONLY, SQL_IS_INTEGER);  
SQLSetStmtAttr(hstmt, SQL_ATTR_CONCURRENCY, SQL_CONCUR_READ_ONLY, SQL_IS_INTEGER);  
SQLSetStmtAttr(hstmt, SQL_ATTR_ROW_ARRAY_SIZE, 1, SQL_IS_INTEGER);  
```  
  
 Whenever these attributes are set to their defaults, the  SQL Server 
 Native Client ODBC driver uses a  SQL Server 
 default result set. Default result sets can be used for any SQL statement supported by  SQL Server 
, and are the most efficient method of transferring an entire result set to the client.  
  
  SQL Server 2005 (9.x) 
 introduced support for multiple active result sets (MARS); applications can now have more than one active default result set per connection. MARS is not enabled by default.  
  
 Before  SQL Server 2005 (9.x) 
, default result sets did not support multiple active statements on the same connection. After a SQL statement is executed on a connection, the server does not accept commands (except a request to cancel the rest of the result set) from the client on that connection until all the rows in the result set have been processed. To cancel the remainder of a partially processed result set, call [SQLCloseCursor](../../native-client-odbc-api/sqlclosecursor.md) or [SQLFreeStmt](../../native-client-odbc-api/sqlfreestmt.md) with the *fOption* parameter set to SQL_CLOSE. To finish a partially processed result set and test for the presence of another result set, call [SQLMoreResults](../../native-client-odbc-api/sqlmoreresults.md). If an ODBC application attempts a command on a connection handle before a default result set has been completely processed, the call generates SQL_ERROR and a call to **SQLGetDiagRec** returns:  
  
```  
szSqlState: "HY000", pfNativeError: 0  
szErrorMsg: "[Microsoft][SQL Server Native Client]  
                Connection is busy with results for another hstmt."  
```  
  
## Related content

- [How Cursors Are Implemented](how-cursors-are-implemented.md)
