# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_11.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT p1.ProductModelID
FROM Production.Product AS p1
GROUP BY p1.ProductModelID
HAVING MAX(p1.ListPrice) >= (
    SELECT AVG(p2.ListPrice) * 2
    FROM Production.Product AS p2
    WHERE p1.ProductModelID = p2.ProductModelID
);
GO

```
