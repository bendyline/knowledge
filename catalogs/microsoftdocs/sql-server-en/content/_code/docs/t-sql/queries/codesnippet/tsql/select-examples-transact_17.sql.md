# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_17.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT ProductID,
    AVG(UnitPrice) AS [Average Price]
FROM Sales.SalesOrderDetail
WHERE OrderQty > 10
GROUP BY ProductID
ORDER BY AVG(UnitPrice);
GO

```
