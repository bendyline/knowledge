# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_7.sql

Complete source file; linked examples may select a region or line range.

```
USE tempdb;
GO

IF OBJECT_ID(N'#Bicycles', N'U') IS NOT NULL
DROP TABLE #Bicycles;
GO

SELECT *
INTO #Bicycles
FROM AdventureWorks2025.Production.Product
WHERE ProductNumber LIKE 'BK%';
GO

```
