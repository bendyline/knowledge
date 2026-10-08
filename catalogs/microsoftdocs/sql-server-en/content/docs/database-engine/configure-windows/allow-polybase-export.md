---
title: "Server Configuration: allow polybase export"
description: Set the configuration option to allow PolyBase export in SQL Server settings.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: hudequei, randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: polybase
ms.topic: how-to
---

# Server configuration: allow polybase export


**Applies to:**
 

 and later versions

The `allow polybase export` server configuration option allows the export of data out of  SQL Server 
. The functionality of this configuration option is different starting with  SQL Server 2022 (16.x) 
 compared to previous versions:

- In  SQL Server 2022 (16.x) 
 and later versions, the [CREATE EXTERNAL TABLE AS SELECT](../../t-sql/statements/create-external-table-as-select-transact-sql.md) (CETAS) statement requires that you enable `allow polybase export` using `sp_configure`. This setting allows for data to be exported to a CSV or Parquet file. For examples, see [Use CREATE EXTERNAL TABLE AS SELECT exporting data as parquet](../../t-sql/statements/create-external-table-as-select-transact-sql.md#d-use-create-external-table-as-select-exporting-data-as-parquet).

- In  SQL Server 2019 (15.x) 
 and earlier versions, enabling `allow polybase export` allows Hadoop to export data out of  SQL Server 
 to an external table. For more information, see [PolyBase connectors](../../relational-databases/polybase/overview.md#polybase-connectors) and [Export data](../../relational-databases/polybase/polybase-queries.md#export-data).

The possible values are described in the following table:

| Value | Meaning |
| --- | --- |
| `0` (default) | Disabled |
| `1` | Enabled |

This change takes effect immediately.

## Examples

The following example enables this setting.

```sql
EXECUTE sp_configure 'show advanced options', 1;
GO

RECONFIGURE;
GO

EXECUTE sp_configure 'allow polybase export', 1;
GO

RECONFIGURE;
GO
```

## Related content

- [Exporting data](../../relational-databases/polybase/polybase-configure-hadoop.md#exporting-data)
- [PolyBase overview](../../relational-databases/polybase/overview.md)
- [CREATE EXTERNAL TABLE AS SELECT (CETAS) (Transact-SQL)](../../t-sql/statements/create-external-table-as-select-transact-sql.md)
