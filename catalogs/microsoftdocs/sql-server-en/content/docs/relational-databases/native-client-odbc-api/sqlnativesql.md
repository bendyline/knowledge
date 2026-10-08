---
title: "SQLNativeSql"
description: "SQLNativeSql"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLNativeSql function"
apitype: "DLLExport"
---
# SQLNativeSql

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The  SQL Server 
 Native Client ODBC driver satisfies **SQLNativeSql** requests without visiting the server. The function efficiently tests the syntax of SQL statements. Syntax checking does not determine if identifiers or the results of expressions in the SQL statements are valid, and  SQL Server 
 native SQL returned by **SQLNativeSql** can fail to run.  
  
## Related content

- [SQLNativeSql Function](../../odbc/reference/syntax/sqlnativesql-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
