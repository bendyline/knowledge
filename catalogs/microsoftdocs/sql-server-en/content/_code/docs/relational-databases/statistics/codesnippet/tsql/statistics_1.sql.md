# Source code: docs/relational-databases/statistics/codesnippet/tsql/statistics_1.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2022;
GO
IF EXISTS ( SELECT name FROM sys.stats
    WHERE name = 'BikeWeights'
    AND object_ID = OBJECT_ID ('Production.Product'))
DROP STATISTICS Production.Product.BikeWeights;
GO
CREATE STATISTICS BikeWeights
    ON Production.Product (Weight)
WHERE ProductSubcategoryID IN (1,2,3);
GO
```
