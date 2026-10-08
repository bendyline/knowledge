# Source code: docs/relational-databases/replication/codesnippet/tsql/administer-a-peer-to-pee_2.sql

Complete source file; linked examples may select a region or line range.

```
REM Bulk insert data into both the publication and subscription databases.
REM The BCP format depends on the snapshot format (native or character).
REM Execute at the command prompt.

bcp AdventureWorks2022..ProductTest in NewTable.bcp -T -SMYPUBLISHER n/c
bcp AdventureWorks2022Replica..ProductTest in NewTable.bcp -T -SMYPUBLISHER n/c
```
