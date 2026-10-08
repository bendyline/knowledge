# Source code: docs/relational-databases/databases/codesnippet/tsql/set-a-database-to-single_1.sql

Complete source file; linked examples may select a region or line range.

```
USE master;
GO
ALTER DATABASE AdventureWorks2022
SET SINGLE_USER
WITH ROLLBACK IMMEDIATE;
GO
ALTER DATABASE AdventureWorks2022
SET READ_ONLY;
GO
ALTER DATABASE AdventureWorks2022
SET MULTI_USER;
GO
```
