# Source code: docs/relational-databases/replication/codesnippet/tsql/delete-a-pull-subscription_4.sql

Complete source file; linked examples may select a region or line range.

```
-- This script uses sqlcmd scripting variables. They are in the form
-- $(MyVariable). For information about how to use scripting variables  
-- on the command line and in SQL Server Management Studio, see the 
-- "Executing Replication Scripts" section in the topic
-- "Programming Replication Using System Stored Procedures".

-- This batch is executed at the Publisher to remove 
-- a pull or push subscription to a merge publication.
DECLARE @publication AS sysname;
DECLARE @subscriber AS sysname;
DECLARE @subscriptionDB AS sysname;
SET @publication = N'AdvWorksSalesOrdersMerge';
SET @subscriber = $(SubServer);
SET @subscriptionDB = N'AdventureWorks2022Replica';

USE [AdventureWorks2022]
EXEC sp_dropmergesubscription 
  @publication = @publication, 
  @subscriber = @subscriber, 
  @subscriber_db = @subscriptionDB;
GO
```
