# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_20.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT ProductID,
    AVG(OrderQty) AS AverageQuantity,
    SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail
GROUP BY ProductID
HAVING SUM(LineTotal) > $1000000.00
    AND AVG(OrderQty) < 3;
GO

```
