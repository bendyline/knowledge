# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_13.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT SalesOrderID,
    SUM(LineTotal) AS SubTotal
FROM Sales.SalesOrderDetail
GROUP BY SalesOrderID
ORDER BY SalesOrderID;
GO

```
