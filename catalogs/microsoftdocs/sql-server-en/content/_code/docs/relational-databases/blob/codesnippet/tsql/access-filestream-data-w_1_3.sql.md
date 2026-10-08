# Source code: docs/relational-databases/blob/codesnippet/tsql/access-filestream-data-w_1_3.sql

Complete source file; linked examples may select a region or line range.

```
INSERT INTO Archive.dbo.Records
    VALUES (NEWID(), 3, 
      CAST ('Seismic Data' AS VARBINARY(MAX)));
GO
```
