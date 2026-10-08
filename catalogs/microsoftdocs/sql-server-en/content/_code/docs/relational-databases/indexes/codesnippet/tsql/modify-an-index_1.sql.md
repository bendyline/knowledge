# Source code: docs/relational-databases/indexes/codesnippet/tsql/modify-an-index_1.sql

Complete source file; linked examples may select a region or line range.

```
CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON)
;
```
