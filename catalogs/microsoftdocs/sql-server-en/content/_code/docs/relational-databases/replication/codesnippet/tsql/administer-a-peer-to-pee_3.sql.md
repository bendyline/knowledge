# Source code: docs/relational-databases/replication/codesnippet/tsql/administer-a-peer-to-pee_3.sql

Complete source file; linked examples may select a region or line range.

```
--- Add the article to the publication.
DECLARE @publication AS sysname;
DECLARE @newtable AS sysname;
SET @publication = N'AdvWorksProductTran';
SET @newtable = N'ProductTest';

USE AdventureWorks2022;

EXEC sp_addarticle 
  @publication = @publication,
  @article = @newtable,
  @source_object = @newtable,
  @destination_table = @newtable,
  @force_invalidate_snapshot = 0;
GO

```
