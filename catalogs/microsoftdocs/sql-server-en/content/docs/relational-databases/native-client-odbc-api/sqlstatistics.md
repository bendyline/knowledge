---
title: "SQLStatistics"
description: "SQLStatistics"
author: markingmyname
ms.author: maghan
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLStatistics function"
apitype: "DLLExport"
---
# SQLStatistics

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  **SQLStatistics** can be executed on a static cursor. An attempt to execute **SQLStatistics** on an updatable (keyset-driven or dynamic) returns SQL_SUCCESS_WITH_INFO indicating the cursor type is changed.  
  
## Related content

- [SQLStatistics function](../../odbc/reference/syntax/sqlstatistics-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
