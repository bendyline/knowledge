---
title: "Retrieve Result Set Information (ODBC)"
description: "Processing Results - Retrieve Result Set Information"
author: markingmyname
ms.author: maghan
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "result sets [ODBC]"
  - "result sets [ODBC], fetching"
---
# Processing Results - Retrieve Result Set Information

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





    
### To get information about a result set  
  
1.  Call [SQLNumResultCols](../native-client-odbc-api/sqlnumresultcols.md) to get the number of columns in the result set.  
  
2.  For each column in the result set:  
  
    -   Call [SQLDescribeCol](../native-client-odbc-api/sqldescribecol.md) to get information about the result column.  
  
     Or  
  
    -   Call [SQLColAttribute](../native-client-odbc-api/sqlcolattribute.md) to get specific descriptor information about the result column.  
  
## Related content

- [Processing Results - Process Results](processing-results-process-results.md)
- [Determining the Characteristics of a Result Set (ODBC)](../native-client-odbc-results/determining-the-characteristics-of-a-result-set-odbc.md)
