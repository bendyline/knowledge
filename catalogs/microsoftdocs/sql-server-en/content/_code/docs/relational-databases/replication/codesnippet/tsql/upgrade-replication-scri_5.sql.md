# Source code: docs/relational-databases/replication/codesnippet/tsql/upgrade-replication-scri_5.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @publication AS sysname;
DECLARE @subscriber AS sysname;
DECLARE @subscriptionDB AS sysname;
SET @publication = N'NwdProductTran' 
SET @subscriber = N'MYSUBSERVER' 
SET @subscriptionDB = N'NorthwindReplica' 

-- Add a Subscriber, using the defaults.
USE [master]
EXEC sp_addsubscriber 
    @subscriber = @subscriber

-- Add a push subscription to a transactional publication.
USE [Northwind]
EXEC sp_addsubscription 
    @publication = @publication, 
    @subscriber = @subscriber, 
    @destination_db = @subscriptionDB, 
    @subscription_type = N'push'
GO
```
