# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_9.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT DISTINCT Name
FROM Production.Product AS p
WHERE EXISTS (
    SELECT *
    FROM Production.ProductModel AS pm
    WHERE p.ProductModelID = pm.ProductModelID
        AND pm.Name LIKE 'Long-Sleeve Logo Jersey%'
);
GO

-- OR
USE AdventureWorks2025;
GO

SELECT DISTINCT Name
FROM Production.Product
WHERE ProductModelID IN (
    SELECT ProductModelID
    FROM Production.ProductModel AS pm
    WHERE p.ProductModelID = pm.ProductModelID
        AND Name LIKE 'Long-Sleeve Logo Jersey%'
);
GO

```
