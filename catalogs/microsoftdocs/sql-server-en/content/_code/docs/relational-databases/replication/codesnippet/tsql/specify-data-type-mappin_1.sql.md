# Source code: docs/relational-databases/replication/codesnippet/tsql/specify-data-type-mappin_1.sql

Complete source file; linked examples may select a region or line range.

```
EXEC sp_changearticlecolumndatatype 
	@publication = 'OraPublication', 
	@publisher = 'OraPublisher', 
	@article = 'OraArticle', 
	@column = 'OraArticleCol', 
	@type = 'numeric', 
	@scale = 38, 
	@precision = 38;
GO
```
