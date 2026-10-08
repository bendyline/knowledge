# Source code: docs/relational-databases/replication/codesnippet/tsql/sp-dropmergepublication-_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname
DECLARE @publicationDB    AS sysname
SET @publication = N'AdvWorksSalesOrdersMerge' 
SET @publicationDB = N'AdventureWorks'

-- Remove the merge publication.
USE [AdventureWorks]
EXEC sp_dropmergepublication @publication = @publication;

-- Remove replication objects from the database.
USE master
EXEC sp_replicationdboption 
  @dbname = @publicationDB, 
  @optname = N'merge publish', 
  @value = N'false'
GO
```
