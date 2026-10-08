# Source code: docs/relational-databases/indexes/codesnippet/tsql/set-index-options_2.sql

Complete source file; linked examples may select a region or line range.

```
ALTER INDEX ALL ON Production.Product
REBUILD WITH 
   (
       FILLFACTOR = 80
       , SORT_IN_TEMPDB = ON
       , STATISTICS_NORECOMPUTE = ON
   )
;
```
