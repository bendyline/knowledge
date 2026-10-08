---
title: "SQLFetchScroll"
description: "SQLFetchScroll"
author: markingmyname
ms.author: maghan
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLFetchScroll function"
apitype: "DLLExport"
---
# SQLFetchScroll

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  **SQLFetchScroll** returns one row set of data to the application. The size of the row set is set using [SQLSetStmtAttr](sqlsetstmtattr.md). The  SQL Server 
 Native Client ODBC driver supports all defined fetch instructions (for example, SQL_FETCH_RELATIVE) with the following limitations:  
  
-   If a forward-only cursor is defined for the statement, SQL_FETCH_NEXT is required and attempts to fetch in any other fashion will result in an error return.  
  
-   SQL_FETCH_BOOKMARK is supported for static and keyset-driven cursors only.  
  
## SQLFetchScroll Support for Enhanced Date and Time Features  
 Result column values of date/time types are converted as described in [Conversions from SQL to C](../native-client-odbc-date-time/datetime-data-type-conversions-from-sql-to-c.md).  
  
 For more information, see [Date and Time Improvements (ODBC)](../native-client-odbc-date-time/date-and-time-improvements-odbc.md).  
  
## SQLFetchScroll Support for Large CLR UDTs  
 **SQLFetchScroll** supports large CLR user-defined types (UDTs). For more information, see [Large CLR User-Defined Types (ODBC)](../native-client/odbc/large-clr-user-defined-types-odbc.md).  
  
## Related content

- [SQLFetchScroll Function](../../odbc/reference/syntax/sqlfetchscroll-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
