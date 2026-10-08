# Source code: docs/relational-databases/replication/codesnippet/tsql/specify-a-merge-article-_2.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
DECLARE @article AS sysname;
SET @publication = 'AdvWorksSalesOrdersMerge';
SET @article = 'Products';

EXEC sp_changemergearticle 
	@publication = @publication, 
	@article = @article, 
	@property='article_resolver', 
	@value='Microsoft SQL Server Additive Conflict Resolver';

EXEC sp_changemergearticle 
	@publication = @publication, 
	@article = @article, 
	@property='resolver_info', 
	@value='UnitsOnOrder';
GO
```
