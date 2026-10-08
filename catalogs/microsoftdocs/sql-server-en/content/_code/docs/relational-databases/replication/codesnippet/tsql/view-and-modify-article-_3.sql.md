# Source code: docs/relational-databases/replication/codesnippet/tsql/view-and-modify-article-_3.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
SET @publication = N'AdvWorksSalesOrdersMerge';

USE [AdventureWorks2022]
EXEC sp_helpmergearticle
  @publication = @publication;
GO
```
