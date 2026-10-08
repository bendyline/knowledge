# Source code: docs/t-sql/queries/codesnippet/tsql/select-examples-transact_25.sql

Complete source file; linked examples may select a region or line range.

```
USE AdventureWorks2025;
GO

SELECT BusinessEntityID,
    JobTitle,
    HireDate,
    VacationHours,
    SickLeaveHours
FROM HumanResources.Employee AS e1

UNION

SELECT BusinessEntityID,
    JobTitle,
    HireDate,
    VacationHours,
    SickLeaveHours
FROM HumanResources.Employee AS e2
OPTION (MERGE UNION);
GO
```
