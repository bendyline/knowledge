# Source code: docs/relational-databases/replication/codesnippet/tsql/define-a-logical-record-_1.sql

Complete source file; linked examples may select a region or line range.

```
SELECT f.* FROM sysmergesubsetfilters AS f 
INNER JOIN sysmergepublications AS p
ON f.pubid = p.pubid WHERE p.[name] = @publication;
```
