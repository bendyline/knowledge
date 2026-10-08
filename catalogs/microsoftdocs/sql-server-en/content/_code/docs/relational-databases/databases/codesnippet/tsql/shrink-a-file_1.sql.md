# Source code: docs/relational-databases/databases/codesnippet/tsql/shrink-a-file_1.sql

Complete source file; linked examples may select a region or line range.

```
USE UserDB;
GO
DBCC SHRINKFILE (DataFile1, 7);
GO
```
