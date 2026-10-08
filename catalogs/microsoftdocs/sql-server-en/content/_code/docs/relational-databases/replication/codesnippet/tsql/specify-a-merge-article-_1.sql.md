# Source code: docs/relational-databases/replication/codesnippet/tsql/specify-a-merge-article-_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
DECLARE @article AS sysname;
SET @publication = 'AdvWorksSalesOrdersMerge';
SET @article = 'Products';

EXEC sp_addmergearticle 
	@publication = @publication, 
	@article = @article, 
	@source_object = @article, 
	@article_resolver = 'Microsoft SQL Server Averaging Conflict Resolver', 
	@resolver_info = 'UnitPrice';
GO
```
