---
title: "SQLExecute"
description: "SQLExecute"
author: markingmyname
ms.author: maghan
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLExecute function"
---
# SQLExecute

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  If the statement attribute SQL_SOPT_SS_PARAM_FOCUS is not set to 0, SQLExecute will return SQL_ERROR and generate a diagnostic record with SQLSTATE=HY024 and the message "Invalid attribute value, SQL_SOPT_SS_PARAM_FOCUS (must be zero at execution time)". For more information about SQL_SOPT_SS_PARAM_FOCUS, see [SQLSetStmtAttr](sqlsetstmtattr.md).  
  
## Remarks  
 For more information about table-valued parameters, see [Table-Valued Parameters (ODBC)](../native-client-odbc-table-valued-parameters/table-valued-parameters-odbc.md).  
  
## Related content

- [SQLExecute Function](../../odbc/reference/syntax/sqlexecute-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
