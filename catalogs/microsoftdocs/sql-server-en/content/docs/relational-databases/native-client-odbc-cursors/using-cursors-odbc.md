---
title: "Using Cursors (ODBC)"
description: ODBC supports a cursor model that allows several types of cursors, scrolling/positioning within a cursor, several concurrency options, and positioned updates.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client ODBC driver, cursors"
  - "ODBC cursors, about ODBC cursors"
  - "ODBC applications, cursors"
  - "cursors [ODBC]"
  - "ODBC cursors"
---
# Using Cursors (ODBC)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  ODBC supports a cursor model that allows:  
  
-   Several types of cursors.  
  
-   Scrolling and positioning within a cursor.  
  
-   Several concurrency options.  
  
-   Positioned updates.  
  
 ODBC applications rarely declare and open cursors or use any cursor-related  Transact-SQL  statements. ODBC automatically opens a cursor for every result set returned from a SQL statement. The characteristics of the cursors are controlled by statement attributes set with [SQLSetStmtAttr](../native-client-odbc-api/sqlsetstmtattr.md) before the SQL statement is executed. The ODBC API functions for processing result sets support the full range of cursor functionality, including fetching, scrolling, and positioned updates.  
  
 This is a comparison of how  Transact-SQL  scripts and ODBC applications work with cursors.  
  
| Action | Transact-SQL | ODBC |
| --- | --- | --- |
| Define cursor behavior | Specify through DECLARE CURSOR parameters | Set cursor attributes by using [SQLSetStmtAttr](../native-client-odbc-api/sqlsetstmtattr.md) |
| Open a cursor | DECLARE CURSOR OPEN *cursor_name* | **SQLExecDirect** or **SQLExecute** |
| Fetch rows | FETCH | **SQLFetch** or [SQLFetchScroll](../native-client-odbc-api/sqlfetchscroll.md) |
| Positioned update | WHERE CURRENT OF clause on UPDATE or DELETE | **SQLSetPos** |
| Close a cursor | CLOSE *cursor_name* DEALLOCATE | [SQLCloseCursor](../native-client-odbc-api/sqlclosecursor.md) |
  
 The server cursors implemented in  SQL Server 
 support the functionality of the ODBC cursor model. The  SQL Server 
 Native Client driver uses server cursors to support the cursor functionality of the ODBC API.  
  
## In This Section  
  
-   [How Cursors Are Implemented](implementation/how-cursors-are-implemented.md)  
  
-   [Cursor Types](cursor-types.md)  
  
-   [Cursor Behaviors](cursor-behaviors.md)  
  
-   [Cursor Properties](properties/cursor-properties.md)  
  
-   [Cursor Programming Details (ODBC)](programming/cursor-programming-details-odbc.md)  
  
-   [Scrolling and Fetching Rows](scrolling-and-fetching-rows.md)  
  
-   [Positioned Updates (ODBC)](positioned-updates-odbc.md)  
  
## Related content

- [SQL Server Native Client (ODBC)](../native-client/odbc/sql-server-native-client-odbc.md)
- [CLOSE (Transact-SQL)](../../t-sql/language-elements/close-transact-sql.md)
- [Cursors (SQL Server)](../cursors.md)
- [DEALLOCATE (Transact-SQL)](../../t-sql/language-elements/deallocate-transact-sql.md)
- [DECLARE CURSOR (Transact-SQL)](../../t-sql/language-elements/declare-cursor-transact-sql.md)
- [FETCH (Transact-SQL)](../../t-sql/language-elements/fetch-transact-sql.md)
- [OPEN (Transact-SQL)](../../t-sql/language-elements/open-transact-sql.md)
