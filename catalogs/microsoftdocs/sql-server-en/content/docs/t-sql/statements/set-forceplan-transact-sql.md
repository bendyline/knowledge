---
title: "SET FORCEPLAN (Transact-SQL)"
description: SET FORCEPLAN (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "07/26/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "SET_FORCEPLAN_TSQL"
  - "SET FORCEPLAN"
  - "FORCEPLAN"
  - "FORCEPLAN_TSQL"
helpviewer_keywords:
  - "joins [SQL Server], overriding query optimizer process"
  - "FORCEPLAN option"
  - "SET FORCEPLAN statement"
  - "query optimizer [SQL Server], optimizing process"
  - "overriding query optimizer process"
dev_langs:
  - "TSQL"
---
# SET FORCEPLAN (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  When FORCEPLAN is set to ON, the  SQL Server 
 query optimizer processes a join in the same order as the tables appear in the FROM clause of a query. In addition, setting FORCEPLAN to ON forces the use of a nested loop join unless other types of joins are required to construct a plan for the query, or they are requested with join hints or query hints.  
  
 
  
## Syntax  
  
```syntaxsql
  
SET FORCEPLAN { ON | OFF }  
```  
  
## Remarks
 SET FORCEPLAN essentially overrides the logic used by the query optimizer to process a  Transact-SQL  SELECT statement. The data returned by the SELECT statement is the same regardless of this setting. The only difference is the way in which  SQL Server 
 processes the tables to satisfy the query.  
  
 Query optimizer hints can also be used in queries to affect how  SQL Server 
 processes the SELECT statement.  
  
 SET FORCEPLAN is applied at execute or run time and not at parse time.  
  
## Permissions  
 SET FORCEPLAN permissions default to all users.  
  
## Examples  
 The following example performs a join of four tables. The `SHOWPLAN_TEXT` setting is enabled, so  SQL Server 
 returns information about how it is processing the query differently after the `SET FORCE_PLAN` setting is enabled.  
  
```sql
USE AdventureWorks2022;  
GO  
-- Make sure FORCEPLAN is set to OFF.  
SET SHOWPLAN_TEXT OFF;  
GO  
SET FORCEPLAN OFF;  
GO  
SET SHOWPLAN_TEXT ON;  
GO  
-- Example where the query plan is not forced.  
SELECT p.LastName, p.FirstName, v.Name  
FROM Person.Person AS p  
   INNER JOIN HumanResources.Employee AS e  
   ON e.BusinessEntityID = p.BusinessEntityID  
   INNER JOIN Purchasing.PurchaseOrderHeader AS poh  
   ON e.BusinessEntityID = poh.EmployeeID  
   INNER JOIN Purchasing.Vendor AS v  
   ON poh.VendorID = v.BusinessEntityID;  
GO  
-- SET FORCEPLAN to ON.  
SET SHOWPLAN_TEXT OFF;  
GO  
SET FORCEPLAN ON;  
GO  
SET SHOWPLAN_TEXT ON;  
GO  
-- Reexecute inner join to see the effect of SET FORCEPLAN ON.  
SELECT p.LastName, p.FirstName, v.Name  
FROM Person.Person AS p  
   INNER JOIN HumanResources.Employee AS e   
   ON e.BusinessEntityID = p.BusinessEntityID  
   INNER JOIN Purchasing.PurchaseOrderHeader AS poh  
   ON e.BusinessEntityID = poh.EmployeeID  
   INNER JOIN Purchasing.Vendor AS v  
   ON poh.VendorID = v.BusinessEntityID;  
GO  
SET SHOWPLAN_TEXT OFF;  
GO  
SET FORCEPLAN OFF;  
GO  
```  
  
## Related content

- [SELECT (Transact-SQL)](../queries/select-transact-sql.md)
- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
- [SET SHOWPLAN_ALL (Transact-SQL)](set-showplan-all-transact-sql.md)
- [SET SHOWPLAN_TEXT (Transact-SQL)](set-showplan-text-transact-sql.md)
