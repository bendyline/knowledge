# Source code: docs/relational-databases/replication/codesnippet/tsql/sp-helppublication-trans_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @myTranPub AS sysname
SET @myTranPub = N'AdvWorksProductTran' 

USE [AdventureWorks2022]
EXEC sp_helppublication @publication = @myTranPub
GO
```
