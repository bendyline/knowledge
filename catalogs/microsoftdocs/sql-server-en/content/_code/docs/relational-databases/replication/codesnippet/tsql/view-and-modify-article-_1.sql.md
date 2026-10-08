# Source code: docs/relational-databases/replication/codesnippet/tsql/view-and-modify-article-_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
SET @publication = N'AdvWorksProductTran';

USE [AdventureWorks2022]
EXEC sp_helparticle
  @publication = @publication;
GO
```
