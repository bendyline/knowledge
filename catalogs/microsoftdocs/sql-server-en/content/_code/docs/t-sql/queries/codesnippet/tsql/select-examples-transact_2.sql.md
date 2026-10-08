# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_2.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT Name,
    ProductNumber,
    ListPrice AS Price
FROM Production.Product
ORDER BY Name ASC;
GO

```
