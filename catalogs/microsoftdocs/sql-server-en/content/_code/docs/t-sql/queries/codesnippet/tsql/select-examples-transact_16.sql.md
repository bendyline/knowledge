# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_16.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT AVG(OrderQty) AS [Average Quantity],
    NonDiscountSales = (OrderQty * UnitPrice)
FROM Sales.SalesOrderDetail
GROUP BY (OrderQty * UnitPrice)
ORDER BY (OrderQty * UnitPrice) DESC;
GO

```
