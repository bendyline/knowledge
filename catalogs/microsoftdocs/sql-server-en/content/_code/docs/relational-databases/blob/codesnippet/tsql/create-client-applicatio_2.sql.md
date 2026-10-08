# Source code: docs/relational-databases/blob/codesnippet/tsql/create-client-applicatio_2.sql

Complete source file; linked examples may select a region or line range.

```
DECLARE @txContext VARBINARY(MAX);

BEGIN TRANSACTION;
SELECT @txContext = GET_FILESTREAM_TRANSACTION_CONTEXT();
PRINT @txContext;
COMMIT;
```
