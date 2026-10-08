# Source code: docs/relational-databases/replication/codesnippet/tsql/view-and-modify-distribu_4.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @distributionDB AS sysname;
SET @distributionDB = N'distribution';

-- Change the history retention period to 24 hours and the
-- maximum retention period to 48 hours.  
USE distribution
EXEC sp_changedistributiondb @distributionDB, N'history_retention', 24
EXEC sp_changedistributiondb @distributionDB, N'max_distretention', 48
GO 
```
