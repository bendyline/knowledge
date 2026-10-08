# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_3.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT Name,
    ProductNumber,
    ListPrice AS Price
FROM Production.Product
WHERE ProductLine = 'R'
    AND DaysToManufacture < 4
ORDER BY Name ASC;
GO

```
