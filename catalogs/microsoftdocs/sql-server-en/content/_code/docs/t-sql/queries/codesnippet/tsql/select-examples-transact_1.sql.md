# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_1.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT *
FROM Production.Product
ORDER BY Name ASC;

-- Alternate way.
USE AdventureWorks2025;
GO

SELECT p.*
FROM Production.Product AS p
ORDER BY Name ASC;
GO

```
