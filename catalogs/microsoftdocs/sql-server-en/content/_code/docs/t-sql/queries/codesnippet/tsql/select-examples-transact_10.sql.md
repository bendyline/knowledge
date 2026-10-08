# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_10.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT DISTINCT p.LastName,
    p.FirstName
FROM Person.Person AS p
INNER JOIN HumanResources.Employee AS e
    ON e.BusinessEntityID = p.BusinessEntityID
WHERE 5000.00 IN (
    SELECT Bonus
    FROM Sales.SalesPerson AS sp
    WHERE e.BusinessEntityID = sp.BusinessEntityID
);
GO

```
