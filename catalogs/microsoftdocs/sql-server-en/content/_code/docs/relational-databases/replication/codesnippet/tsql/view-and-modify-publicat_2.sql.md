# Source code: docs/relational-databases/replication/codesnippet/tsql/view-and-modify-publicat_2.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname
SET @publication = N'AdvWorksProductTran' 

-- Turn off DDL replication for the transactional publication.
USE [AdventureWorks2022]
EXEC sp_changepublication 
  @publication = @publication, 
  @property = N'replicate_ddl', 
  @value = 0
GO
```
