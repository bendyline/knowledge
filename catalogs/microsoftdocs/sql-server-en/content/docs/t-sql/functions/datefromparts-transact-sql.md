---
title: "DATEFROMPARTS (Transact-SQL)"
description: "DATEFROMPARTS (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "07/29/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DATEFROMPARTS_TSQL"
  - "DATEFROMPARTS"
helpviewer_keywords:
  - "DATEFROMPARTS function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# DATEFROMPARTS (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



This function returns a **date** value that maps to the specified year, month, and day values.
  

  
## Syntax  
  
```syntaxsql
DATEFROMPARTS ( year, month, day )  
```  
  
## Arguments
*year*  
An integer expression that specifies a year.
  
*month*  
An integer expression that specifies a month, from 1 to 12.
  
*day*  
An integer expression that specifies a day.
  
## Return types
**date**
  
## Remarks  
`DATEFROMPARTS` returns a **date** value, with the date portion set to the specified year, month and day, and the time portion set to the default. For invalid arguments, `DATEFROMPARTS` will raise an error. `DATEFROMPARTS` returns null if at least one required argument has a null value.
  
This function can handle remoting to  SQL Server 2012 (11.x) 
 servers and above. It cannot handle remoting to servers with a version below  SQL Server 2012 (11.x) 
.
  
## Examples  
This example shows the `DATEFROMPARTS` function in action.
  
```sql
SELECT DATEFROMPARTS ( 2010, 12, 31 ) AS Result;  
```  
  
 Here's the result set. 

  
```
Result  
----------------------------------  
2010-12-31  
  
(1 row(s) affected)  
```  
  
## Related content

- [date (Transact-SQL)](../data-types/date-transact-sql.md)
