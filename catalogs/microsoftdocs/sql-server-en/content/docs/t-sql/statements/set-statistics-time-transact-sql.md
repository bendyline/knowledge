---
title: "SET STATISTICS TIME (Transact-SQL)"
description: SET STATISTICS TIME (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "SET_STATISTICS_TIME_TSQL"
  - "SET STATISTICS TIME"
helpviewer_keywords:
  - "statistical information [SQL Server], statement processing"
  - "time [SQL Server], statement processing statistics"
  - "SET STATISTICS TIME statement"
  - "STATISTICS TIME option"
  - "statements [SQL Server], statistical information"
  - "parsing [SQL Server], SET STATISTICS TIME statement"
  - "compile times [SQL Server]"
  - "execution processing time [SQL Server]"
dev_langs:
  - "TSQL"
---
# SET STATISTICS TIME (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)

	

  Displays the number of milliseconds required to parse, compile, and execute each statement.  
  
 
  
## Syntax  
  
```syntaxsql
  
SET STATISTICS TIME { ON | OFF }  
```  
  
## Remarks
 When SET STATISTICS TIME is ON, the time statistics for a statement are displayed. When OFF, the time statistics are not displayed.  
  
 The setting of SET STATISTICS TIME is set at execute or run time and not at parse time.  
  
 Microsoft  SQL Server 
 is unable to provide accurate statistics in fiber mode, which is activated when you enable the **lightweight pooling** configuration option.  
  
 The **cpu** column in the **sysprocesses** table is only updated when a query executes with SET STATISTICS TIME ON. When SET STATISTICS TIME is OFF, **0** is returned.  
  
 ON and OFF settings also affect the CPU column in the Process Info View for Current Activity in  SQL Server Management Studio 
.  
  
## Permissions  
 To use SET STATISTICS TIME, users must have the appropriate permissions to execute the  Transact-SQL  statement. The SHOWPLAN permission is not required.  
  
## Examples  
 This example shows the server execution, parse, and compile times.  
  
```sql
USE AdventureWorks2022;  
GO         
SET STATISTICS TIME ON;  
GO  
SELECT ProductID, StartDate, EndDate, StandardCost   
FROM Production.ProductCostHistory  
WHERE StandardCost < 500.00;  
GO  
SET STATISTICS TIME OFF;  
GO  
```  
  
 Here is the result set:  
  
```  
SQL Server parse and compile time:   
   CPU time = 0 ms, elapsed time = 1 ms.  
SQL Server parse and compile time:   
   CPU time = 0 ms, elapsed time = 1 ms.  
  
(269 row(s) affected)  
  
SQL Server Execution Times:  
   CPU time = 0 ms,  elapsed time = 2 ms.  
SQL Server parse and compile time:   
   CPU time = 0 ms, elapsed time = 1 ms.  
  
```  
  
## Related content

- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
- [SET STATISTICS IO (Transact-SQL)](set-statistics-io-transact-sql.md)
