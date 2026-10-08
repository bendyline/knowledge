# Source code: docs/relational-databases/databases/codesnippet/tsql/change-the-configuration_1.sql

Complete source file; linked examples may select a region or line range.

```
USE master;
GO
ALTER DATABASE AdventureWorks2022 
SET RECOVERY FULL, PAGE_VERIFY CHECKSUM;
GO
```
