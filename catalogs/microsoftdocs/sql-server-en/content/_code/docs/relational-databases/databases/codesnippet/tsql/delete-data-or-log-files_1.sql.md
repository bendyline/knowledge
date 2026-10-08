# Source code: docs/relational-databases/databases/codesnippet/tsql/delete-data-or-log-files_1.sql

Complete source file; linked examples may select a region or line range.

```
USE master;
GO
ALTER DATABASE AdventureWorks2022
REMOVE FILE test1dat4;
GO
```
