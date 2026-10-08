---
title: "sys.sp_copy_data_in_batches (Transact-SQL)"
description: "Copies data from the source table to the target table after verifying that their schema is identical in terms of number of columns, column names and their data types."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-ver16 || >=sql-server-linux-ver16 || =fabric-sqldb"
---
# sys.sp_copy_data_in_batches (Transact-SQL)


**Applies to:**
 


 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


Copies data from the source table to the target table after verifying that their schema is identical in terms of number of columns, column names and their data types. `TRANSACTION ID`, `SEQUENCE NUMBER`, and `GENERATED ALWAYS` columns are ignored since they're system generated and this allows copying data from a regular table to a ledger table and vice versa. Indexes between the tables can be different but the target table can only be a heap or have a clustered index. The data is copied in batches in individual transactions. If the operation fails, the target table is partially populated.

For more information on database ledger, see [Ledger](https://learn.microsoft.com/azure/azure-sql/database/ledger-overview).



## Syntax

```syntaxsql
sp_copy_data_in_batches
     [ @source_table_name = ] N'source_table_name'
     , [ @target_table_name = ] N'target_table_name'
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### [ @source_table_name = ] N'*source_table_name*'

The name of the table to be used as the source of the data copy.

#### [ @target_table_name = ] N'*target_table_name*'

The name of the table to be used as the target of the data copy.

## Return code values

0 (success)

## Result set

None.

## Permissions

This operation requires **SELECT** on the source table, **INSERT** in the target table, and **ALTER** on the target table if there are foreign key or check constraints that will be disabled, or an identity column that will be adjusted.

## Related content

- [Ledger considerations and limitations](../security/ledger/ledger-limits.md)
- [Ledger overview](../security/ledger/ledger-overview.md)
- [Migrate data from regular tables to ledger tables](../security/ledger/ledger-how-to-migrate-data-to-ledger-tables.md)
