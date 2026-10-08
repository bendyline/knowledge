# Source code: docs/relational-databases/blob/codesnippet/tsql/create-a-table-for-stori_1.sql

Complete source file; linked examples may select a region or line range.

```
CREATE TABLE Archive.dbo.Records
(
	[Id] [uniqueidentifier] ROWGUIDCOL NOT NULL UNIQUE, 
	[SerialNumber] INTEGER UNIQUE,
	[Chart] VARBINARY(MAX) FILESTREAM NULL
);
GO
```
