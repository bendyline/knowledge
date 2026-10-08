# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_28.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

IF OBJECT_ID('dbo.Gloves', 'U') IS NOT NULL
DROP TABLE dbo.Gloves;
GO

-- Create Gloves table.
SELECT ProductModelID, Name
INTO dbo.Gloves
FROM Production.ProductModel
WHERE ProductModelID IN (3, 4);
GO

/* INCORRECT */
USE AdventureWorks2025;
GO

SELECT ProductModelID, Name
FROM Production.ProductModel
WHERE ProductModelID NOT IN (3, 4)
ORDER BY Name

UNION

SELECT ProductModelID, Name
FROM dbo.Gloves;
GO

/* CORRECT */
USE AdventureWorks2025;
GO

SELECT ProductModelID, Name
FROM Production.ProductModel
WHERE ProductModelID NOT IN (3, 4)

UNION

SELECT ProductModelID, Name
FROM dbo.Gloves
ORDER BY Name;
GO

```
