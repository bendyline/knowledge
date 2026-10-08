# Source code: docs/relational-databases/replication/codesnippet/tsql/sp-reinitpullsubscriptio_1.sql

Complete source file; linked examples may select a region or line range.

```
-- This script uses sqlcmd scripting variables. They are in the form
-- $(MyVariable). For information about how to use scripting variables  
-- on the command line and in SQL Server Management Studio, see the 
-- "Executing Replication Scripts" section in the topic
-- "Programming Replication Using System Stored Procedures".

DECLARE @publicationDB AS sysname;
DECLARE @publication AS sysname;
SET @publicationDB = N'AdventureWorks2022';
SET @publication = N'AdvWorksProductTran';

USE [AdventureWorks2022Replica]

-- Execute at the Subscriber to reinitialize the pull subscription. 
EXEC sp_reinitpullsubscription 
    @publisher = $(PubServer),
    @publisher_db = @publicationDB,
    @publication = @publication;
GO

-- Start the Distribution Agent.

```
