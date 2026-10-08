# Source code: docs/relational-databases/blob/codesnippet/tsql/access-filestream-data-w_1_4.sql

Complete source file; linked examples may select a region or line range.

```
UPDATE Archive.dbo.Records
SET [Chart] = CAST('Xray 1' AS VARBINARY(MAX))
WHERE [SerialNumber] = 2;
```
