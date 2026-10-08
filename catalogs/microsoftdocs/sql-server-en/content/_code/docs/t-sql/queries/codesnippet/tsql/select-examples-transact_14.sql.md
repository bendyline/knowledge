# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_14.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT ProductID,
    SpecialOfferID,
    AVG(UnitPrice) AS [Average Price],
    SUM(LineTotal) AS SubTotal
FROM Sales.SalesOrderDetail
GROUP BY ProductID,
    SpecialOfferID
ORDER BY ProductID;
GO

```
