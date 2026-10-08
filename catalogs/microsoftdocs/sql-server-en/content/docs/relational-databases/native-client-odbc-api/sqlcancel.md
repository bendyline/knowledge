---
title: "SQLCancel"
description: "SQLCancel"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLCancel function"
---
# SQLCancel

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The [SQLCancel](../../odbc/reference/syntax/sqlcancel-function.md) topic says that in ODBC 2.x, if an application calls **SQLCancel** when no processing is being done on the statement, **SQLCancel** has the same effect as **SQLFreeStmt** with the **SQL_CLOSE** option; this behavior is defined only for completeness and applications should call **SQLFreeStmt** or **SQLCloseCursor** to close cursors. But even if your  SQL Server 
 Native Client application sets the ODBC API version to be 3.5.x or later, the **SQLCancel** function will use the ODBC 2.x behavior.  
  
## Related content

- [SQLCancel Function](../../odbc/reference/syntax/sqlcancel-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
