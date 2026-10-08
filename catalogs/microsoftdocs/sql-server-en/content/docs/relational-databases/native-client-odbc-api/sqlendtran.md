---
title: "SQLEndTran"
description: "SQLEndTran"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLEndTran function"
apitype: "DLLExport"
---
# SQLEndTran

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  By default, the  SQL Server 
 Native Client ODBC driver closes a statement's associated cursor when **SQLEndTran** commits or rolls back an operation. Server cursors are closed unless they are static. When **SQLEndTran** commits or rolls back an operation, the behavior of the statement's associated cursor is determined by the value of the driver-specific ODBC connection attribute SQL_COPT_SS_PRESERVE_CURSORS, set by [SQLSetConnectAttr](sqlsetconnectattr.md).  
  
## Related content

- [ODBC API implementation details](odbc-api-implementation-details.md)
- [SQLEndTran Function](../../odbc/reference/syntax/sqlendtran-function.md)
