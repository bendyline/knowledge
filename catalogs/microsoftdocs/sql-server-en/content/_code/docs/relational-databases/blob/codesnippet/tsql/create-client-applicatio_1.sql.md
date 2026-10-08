# Source code: docs/relational-databases/blob/codesnippet/tsql/create-client-applicatio_1.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @filePath VARCHAR(MAX);

SELECT @filePath = Chart.PathName()
FROM Archive.dbo.Records
WHERE SerialNumber = 3;

PRINT @filepath;
```
