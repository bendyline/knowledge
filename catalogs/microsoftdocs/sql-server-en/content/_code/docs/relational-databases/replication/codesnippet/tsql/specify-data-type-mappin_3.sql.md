# Source code: docs/relational-databases/replication/codesnippet/tsql/specify-data-type-mappin_3.sql

Complete source file; linked examples may select a region or line range.

```
EXEC sp_helpdatatypemap 
	@source_dbms = N'ORACLE', 
	@source_version = 9,
	@source_type = N'NUMBER',
	@defaults_only = 1;
GO
```
