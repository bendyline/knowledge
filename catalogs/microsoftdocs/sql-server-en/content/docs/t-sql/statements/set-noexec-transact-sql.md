---
title: "SET NOEXEC (Transact-SQL)"
description: SET NOEXEC (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "NOEXEC_TSQL"
  - "SET_NOEXEC_TSQL"
  - "SET NOEXEC"
  - "NOEXEC"
helpviewer_keywords:
  - "queries [SQL Server], compiling"
  - "SET NOEXEC statement"
  - "compiling queries [SQL Server]"
  - "NOEXEC option"
dev_langs:
  - "TSQL"
---
# SET NOEXEC (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Compiles each query but does not execute it.  
  
 
  
## Syntax  
  
```syntaxsql
  
SET NOEXEC { ON | OFF }  
```  
  
## Remarks  
 When SET NOEXEC is ON,  SQL Server 
 parses and compiles each batch of  Transact-SQL  statements but does not execute them. When SET NOEXEC is OFF, all batches are executed after compilation.  NOEXEC supports deferred name resolution; if one or more referenced objects in the batch don't exist, no error will be thrown.
  
 The execution of statements in  SQL Server 
 has two phases: compilation and execution. This setting is useful for having  SQL Server 
 validate the syntax and object names in  Transact-SQL  code when executing. It is also useful for debugging statements that would generally be part of a larger batch of statements.  
  
 The setting of SET NOEXEC is set at execute or run time and not at parse time.  
  
## Permissions  
 Requires membership in the public role.  
  
## Examples  
 The following example uses `NOEXEC` with a valid query, a query with an object name that is not valid, and a query with incorrect syntax.  
  
```sql
USE AdventureWorks2022;  
GO  
PRINT 'Valid query';  
GO  
-- SET NOEXEC to ON.  
SET NOEXEC ON;  
GO  
-- Inner join.  
SELECT e.BusinessEntityID, e.JobTitle, v.Name  
FROM HumanResources.Employee AS e   
   INNER JOIN Purchasing.PurchaseOrderHeader AS poh  
   ON e.BusinessEntityID = poh.EmployeeID  
   INNER JOIN Purchasing.Vendor AS v  
   ON poh.VendorID = v.BusinessEntityID;  
GO  
-- SET NOEXEC to OFF.  
SET NOEXEC OFF;  
GO  
  
PRINT 'Invalid object name';  
GO  
-- SET NOEXEC to ON.  
SET NOEXEC ON;  
GO  
-- Function name used is a reserved keyword.  
USE AdventureWorks2022;  
GO  
CREATE FUNCTION dbo.Values(@BusinessEntityID int)  
RETURNS TABLE  
AS  
RETURN (SELECT PurchaseOrderID, TotalDue  
   FROM dbo.PurchaseOrderHeader  
   WHERE VendorID = @BusinessEntityID);  
  
-- SET NOEXEC to OFF.  
SET NOEXEC OFF;  
GO  
  
PRINT 'Invalid syntax';  
GO  
-- SET NOEXEC to ON.  
SET NOEXEC ON;  
GO  
-- Built-in function incorrectly invoked.  
SELECT *  
FROM fn_helpcollations;  
-- Reset SET NOEXEC to OFF.  
SET NOEXEC OFF;  
GO  
```  
  
## Related content

- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
- [SET SHOWPLAN_ALL (Transact-SQL)](set-showplan-all-transact-sql.md)
- [SET SHOWPLAN_TEXT (Transact-SQL)](set-showplan-text-transact-sql.md)
