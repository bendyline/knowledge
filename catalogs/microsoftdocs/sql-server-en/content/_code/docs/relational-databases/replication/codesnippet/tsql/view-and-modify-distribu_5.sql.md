# Source code: docs/relational-databases/replication/codesnippet/tsql/view-and-modify-distribu_5.sql

Complete source file; linked examples may select a region or line range.

```
-- Change the password on the Distributor. 
-- To avoid storing the password in the script file, the value is passed 
-- into SQLCMD as a scripting variable. For information about how to use 
-- scripting variables on the command line and in SQL Server Management
-- Studio, see the "Executing Replication Scripts" section in the topic
-- "Programming Replication Using System Stored Procedures".
USE master
EXEC sp_changedistributor_password $(Password)
GO
```
