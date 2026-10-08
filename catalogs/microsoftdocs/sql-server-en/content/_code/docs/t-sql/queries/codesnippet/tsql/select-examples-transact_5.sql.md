# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_5.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT 'Total income is',
    ((OrderQty * UnitPrice) * (1.0 - UnitPriceDiscount)),
    ' for ',
    p.Name AS ProductName
FROM Production.Product AS p
INNER JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID
ORDER BY ProductName ASC;
GO

```
