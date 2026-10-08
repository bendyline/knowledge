# Source code: docs/relational-databases/databases/codesnippet/tsql/increase-the-size-of-a-d_1.sql

Complete source file; linked examples may select a region or line range.

```
USE master;
GO
ALTER DATABASE AdventureWorks2022 
MODIFY FILE
    (NAME = test1dat3,
    SIZE = 20MB);
GO
```
