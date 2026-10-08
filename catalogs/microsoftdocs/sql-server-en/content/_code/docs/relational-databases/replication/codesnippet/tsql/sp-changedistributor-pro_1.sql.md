# Source code: docs/relational-databases/replication/codesnippet/tsql/sp-changedistributor-pro_1.sql

Complete source file; linked examples may select a region or line range.

```

-- Change the heartbeat interval at the Distributor to 5 minutes. 
USE master 
exec sp_changedistributor_property 
    @property = N'heartbeat_interval', 
    @value = 5;
GO
```
