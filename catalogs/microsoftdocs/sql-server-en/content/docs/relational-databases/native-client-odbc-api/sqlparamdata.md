---
title: "SQLParamData"
description: "SQLParamData"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLParamData function"
---
# SQLParamData

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  When SQLParamData returns the *ValuePtrPtr* associated with a table-valued parameter, the application should call SQLPutData with *StrLen_Or_Ind*. If *StrLen_Or_Ind* has a value greater than 0, it means that the application is ready for  SQL Server 
 Native Client to gather parameter data for the next table-valued parameter row. If *StrLen_Or_Ind* has a value of 0, it means there are no more rows of data for the table-valued parameter. For more information, see [Binding and Data Transfer of Table-Valued Parameters and Column Values](../native-client-odbc-table-valued-parameters/binding-and-data-transfer-of-table-valued-parameters-and-column-values.md).  
  
 For more information about table-valued parameters, see [Table-Valued Parameters (ODBC)](../native-client-odbc-table-valued-parameters/table-valued-parameters-odbc.md).  
  
## Related content

- [SQLParamData Function](../../odbc/reference/syntax/sqlparamdata-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
