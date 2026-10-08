---
title: "Configure data collection parameters (T-SQL)"
description: Before you create a custom collection set, you must first configure data collection parameters.
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 12/28/2023
ms.service: sql
ms.subservice: supportability
ms.topic: how-to
helpviewer_keywords:
  - "data collection [SQL Server]"
---
# Configure data collection parameters (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Before you create a custom collection set, you must first configure data collection parameters. You can do this by using the stored procedures that are provided with the data collector. Accomplishing this task involves using Query Editor in  SQL Server Management Studio 
 to carry out the following procedure.

> **Note:**  
> You only configure data collection parameters once. After configuration, these parameters are used for any additional collection sets that you create.

### Configure data collection parameters

1. In  SQL Server Management Studio 
, connect to the database where you want to create a custom collection set.

1. In Query Editor, issue the following statements.

   ```sql
   USE msdb;
   GO

   EXEC sp_syscollector_set_warehouse_instance_name N'INSTANCE_NAME';-- where instance name is the name of the SQL Server instance
   EXEC sp_syscollector_set_warehouse_database_name N'MDW';
   EXEC sp_syscollector_set_cache_directory N'D:\tempdata';
   ```

## Related content

- [Data collection](data-collection.md)
- [Data collector stored procedures (Transact-SQL)](../system-stored-procedures/data-collector-stored-procedures-transact-sql.md)
