# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_8.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

IF OBJECT_ID('dbo.NewProducts', 'U') IS NOT NULL
DROP TABLE dbo.NewProducts;
GO

ALTER DATABASE AdventureWorks2025 SET RECOVERY BULK_LOGGED;
GO

SELECT *
INTO dbo.NewProducts
FROM Production.Product
WHERE ListPrice > $25
    AND ListPrice < $100;
GO

ALTER DATABASE AdventureWorks2025 SET RECOVERY FULL;
GO

```
