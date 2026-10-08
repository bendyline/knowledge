# Source code: docs/relational-databases/replication/codesnippet/tsql/view-and-modify-publicat_4.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
SET @publication = N'AdvWorksSalesOrdersMerge'; 

-- Disable DDL replication for the publication.
USE [AdventureWorks2022]
EXEC sp_changemergepublication 
  @publication = @publication, 
  @property = N'replicate_ddl', 
  @value = 0,
  @force_invalidate_snapshot = 0, 
  @force_reinit_subscription = 0;
GO
```
