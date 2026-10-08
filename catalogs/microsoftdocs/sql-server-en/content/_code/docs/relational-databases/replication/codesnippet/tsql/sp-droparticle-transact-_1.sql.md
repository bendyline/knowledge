# Source code: docs/relational-databases/replication/codesnippet/tsql/sp-droparticle-transact-_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
DECLARE @article AS sysname;
SET @publication = N'AdvWorksProductTran'; 
SET @article = N'Product'; 

-- Drop the transactional article.
USE [AdventureWorks2022]
EXEC sp_droparticle 
  @publication = @publication, 
  @article = @article,
  @force_invalidate_snapshot = 1;
GO
```
