# Source code: docs/relational-databases/replication/codesnippet/tsql/administer-a-peer-to-pee_1.sql

Complete source file; linked examples may select a region or line range.

```
-- Create the new table at both nodes.
CREATE TABLE AdventureWorks2022.dbo.ProductTest (column1 int, Column2 int);
CREATE TABLE AdventureWorks2022Replica.dbo.ProductTest (column1 int, Column2 int);
GO
```
