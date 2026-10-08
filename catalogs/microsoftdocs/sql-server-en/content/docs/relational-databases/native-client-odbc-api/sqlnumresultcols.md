---
title: "SQLNumResultCols"
description: "SQLNumResultCols"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLNumResultCols function"
apitype: "DLLExport"
---
# SQLNumResultCols

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  For executed statements, the  SQL Server 
 Native Client ODBC driver does not visit the server to report the number of columns in a result set. In this case, **SQLNumResultCols** does not cause a server roundtrip. Like [SQLDescribeCol](sqldescribecol.md) and [SQLColAttribute](sqlcolattribute.md), calling **SQLNumResultCols** on prepared but not executed statements generates a server roundtrip.  
  
 When a  Transact-SQL  statement or statement batch returns multiple result row sets, it is possible for the number of result set columns to change from one set to another. **SQLNumResultCols** should be called for each set. When the number of columns changes, the application should rebind data values prior to fetching row results. For more information about handling multiple result set returns, see [SQLMoreResults](sqlmoreresults.md).  
  
 Improvements in the database engine starting with  SQL Server 2012 (11.x) 
 allow SQLNumResultCols to obtain more accurate descriptions of the expected results. These more accurate results may differ from the values returned by SQLNumResultCols in previous versions of  SQL Server 
. For more information, see [Metadata Discovery](../native-client/features/metadata-discovery.md).  
  
## Related content

- [SQLNumResultCols Function](../../odbc/reference/syntax/sqlnumresultcols-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
