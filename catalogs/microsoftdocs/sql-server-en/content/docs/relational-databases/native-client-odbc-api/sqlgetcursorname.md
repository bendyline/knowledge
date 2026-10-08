---
title: "SQLGetCursorName"
description: "SQLGetCursorName"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLGetCursorName function"
apitype: "DLLExport"
---
# SQLGetCursorName

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  If the application does not specify a cursor name, the  SQL Server 
 Native Client ODBC driver generates one for the application upon cursor generation. The application can use **SQLGetCursorName** to retrieve the driver-defined cursor name for positioned UPDATE and DELETE statements. The application does not need to call **SQLSetCursorName** to take advantage of positioned data manipulation statements.  
  
## Related content

- [SQLGetCursorName Function](../../odbc/reference/syntax/sqlgetcursorname-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
