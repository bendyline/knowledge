# Source code: docs/relational-databases/databases/codesnippet/tsql/add-data-or-log-files-to_1.sql

Complete source file; linked examples may select a region or line range.

```
USE master
GO
ALTER DATABASE AdventureWorks2022
ADD FILEGROUP Test1FG1;
GO
ALTER DATABASE AdventureWorks2022 
ADD FILE 
(
    NAME = test1dat3,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\t1dat3.ndf',
    SIZE = 5MB,
    MAXSIZE = 100MB,
    FILEGROWTH = 5MB
),
(
    NAME = test1dat4,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\t1dat4.ndf',
    SIZE = 5MB,
    MAXSIZE = 100MB,
    FILEGROWTH = 5MB
)
TO FILEGROUP Test1FG1;
GO
```
