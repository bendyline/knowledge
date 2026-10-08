# Source code: docs/relational-databases/indexes/codesnippet/tsql/modify-an-index_2.sql

Complete source file; linked examples may select a region or line range.

```
ALTER INDEX AK_SalesOrderHeader_SalesOrderNumber ON
    Sales.SalesOrderHeader
SET (
    STATISTICS_NORECOMPUTE = ON,
    IGNORE_DUP_KEY = ON,
    ALLOW_PAGE_LOCKS = ON
    )
;
```
