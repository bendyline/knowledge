# Source code: docs/relational-databases/replication/codesnippet/tsql/delete-a-publication_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publicationDB AS sysname;
DECLARE @publication AS sysname;
SET @publicationDB = N'AdventureWorks'; 
SET @publication = N'AdvWorksProductTran'; 

-- Remove a transactional publication.
USE [AdventureWorks2022]
EXEC sp_droppublication @publication = @publication;

-- Remove replication objects from the database.
USE [master]
EXEC sp_replicationdboption 
  @dbname = @publicationDB, 
  @optname = N'publish', 
  @value = N'false';
GO
```
