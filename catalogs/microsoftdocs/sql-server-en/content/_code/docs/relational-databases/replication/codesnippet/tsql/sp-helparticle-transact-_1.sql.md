# Source code: docs/relational-databases/replication/codesnippet/tsql/sp-helparticle-transact-_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
SET @publication = N'AdvWorksProductTran';

USE [AdventureWorks2022]
EXEC sp_helparticle
  @publication = @publication;
GO
```
