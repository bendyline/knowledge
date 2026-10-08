# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_19.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT ProductID
FROM Sales.SalesOrderDetail
WHERE UnitPrice < 25.00
GROUP BY ProductID
HAVING AVG(OrderQty) > 5
ORDER BY ProductID;
GO

```
