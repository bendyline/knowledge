---
title: "DROP WORKLOAD GROUP (Transact-SQL)"
description: DROP WORKLOAD GROUP (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 01/02/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "DROP_WORKLOAD_GROUP_TSQL"
  - "DROP WORKLOAD GROUP"
helpviewer_keywords:
  - "DROP WORKLOAD GROUP statement"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest || =azuresqldb-mi-current"
---
# DROP WORKLOAD GROUP (Transact-SQL)

## Select a product

In the following row, select the product name you're interested in, and only that product's information is displayed.


**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017**



        **_\* SQL Server \*_** &nbsp;


        [SQL Managed Instance](drop-workload-group-transact-sql.md?view=azuresqldb-mi-current&preserve-view=true)


        [Azure Synapse<br />Analytics](drop-workload-group-transact-sql.md?view=azure-sqldw-latest&preserve-view=true)



&nbsp;

## SQL Server and SQL Managed Instance


Drops an existing user-defined resource governor workload group.

> **Note:**
> To modify resource governor configuration in Azure SQL Managed Instance, you must be in the context of the `master` database on the primary replica.



## Syntax

```syntaxsql
DROP WORKLOAD GROUP group_name
[;]
```

## Arguments

#### *group_name*

The name of an existing user-defined workload group.

## Remarks

The `DROP WORKLOAD GROUP` statement is not allowed on the resource governor built-in `internal` and `default` groups.

If a workload group contains active sessions, deleting the workload group fails when the `ALTER RESOURCE GOVERNOR RECONFIGURE` statement is executed to apply the change. To avoid this problem, you can take one of the following actions:

- Wait until all sessions in the affected group disconnect, and then execute the `ALTER RESOURCE GOVERNOR RECONFIGURE` statement.
- Explicitly stop sessions in the affected group by using the [KILL](../language-elements/kill-transact-sql.md) T-SQL command, and then execute the `ALTER RESOURCE GOVERNOR RECONFIGURE` statement. If you decide that you don't want to explicitly stop sessions, re-create the group by using the original name and settings.
- Restart the server. When the server restarts, the deleted group is deleted permanently.

For more information, see [Resource governor](../../relational-databases/resource-governor/resource-governor.md) and [Resource governor workload group](../../relational-databases/resource-governor/resource-governor-workload-group.md).

## Permissions

Requires the `CONTROL SERVER` permission.

## Examples

The following example drops the workload group named `adhoc`.

```sql
DROP WORKLOAD GROUP adhoc;

ALTER RESOURCE GOVERNOR RECONFIGURE;
```

## Related content

- [Resource governor](../../relational-databases/resource-governor/resource-governor.md)
- [Delete a workload group](../../relational-databases/resource-governor/delete-a-workload-group.md)
- [CREATE WORKLOAD GROUP (Transact-SQL)](create-workload-group-transact-sql.md)
- [ALTER WORKLOAD GROUP (Transact-SQL)](alter-workload-group-transact-sql.md)
- [CREATE RESOURCE POOL (Transact-SQL)](create-resource-pool-transact-sql.md)
- [ALTER RESOURCE POOL (Transact-SQL)](alter-resource-pool-transact-sql.md)
- [DROP RESOURCE POOL (Transact-SQL)](drop-resource-pool-transact-sql.md)
- [ALTER RESOURCE GOVERNOR (Transact-SQL)](alter-resource-governor-transact-sql.md)

  


**Applies to: \=azuresqldb-mi-current**



        [SQL Server](drop-workload-group-transact-sql.md?view=sql-server-ver15&preserve-view=true)


        **_\* SQL Managed Instance \*_** &nbsp;


        [Azure Synapse<br />Analytics](drop-workload-group-transact-sql.md?view=azure-sqldw-latest&preserve-view=true)



&nbsp;

## SQL Server and SQL Managed Instance


Drops an existing user-defined resource governor workload group.

> **Note:**
> To modify resource governor configuration in Azure SQL Managed Instance, you must be in the context of the `master` database on the primary replica.



## Syntax

```syntaxsql
DROP WORKLOAD GROUP group_name
[;]
```

## Arguments

#### *group_name*

The name of an existing user-defined workload group.

## Remarks

The `DROP WORKLOAD GROUP` statement is not allowed on the resource governor built-in `internal` and `default` groups.

If a workload group contains active sessions, deleting the workload group fails when the `ALTER RESOURCE GOVERNOR RECONFIGURE` statement is executed to apply the change. To avoid this problem, you can take one of the following actions:

- Wait until all sessions in the affected group disconnect, and then execute the `ALTER RESOURCE GOVERNOR RECONFIGURE` statement.
- Explicitly stop sessions in the affected group by using the [KILL](../language-elements/kill-transact-sql.md) T-SQL command, and then execute the `ALTER RESOURCE GOVERNOR RECONFIGURE` statement. If you decide that you don't want to explicitly stop sessions, re-create the group by using the original name and settings.
- Restart the server. When the server restarts, the deleted group is deleted permanently.

For more information, see [Resource governor](../../relational-databases/resource-governor/resource-governor.md) and [Resource governor workload group](../../relational-databases/resource-governor/resource-governor-workload-group.md).

## Permissions

Requires the `CONTROL SERVER` permission.

## Examples

The following example drops the workload group named `adhoc`.

```sql
DROP WORKLOAD GROUP adhoc;

ALTER RESOURCE GOVERNOR RECONFIGURE;
```

## Related content

- [Resource governor](../../relational-databases/resource-governor/resource-governor.md)
- [Delete a workload group](../../relational-databases/resource-governor/delete-a-workload-group.md)
- [CREATE WORKLOAD GROUP (Transact-SQL)](create-workload-group-transact-sql.md)
- [ALTER WORKLOAD GROUP (Transact-SQL)](alter-workload-group-transact-sql.md)
- [CREATE RESOURCE POOL (Transact-SQL)](create-resource-pool-transact-sql.md)
- [ALTER RESOURCE POOL (Transact-SQL)](alter-resource-pool-transact-sql.md)
- [DROP RESOURCE POOL (Transact-SQL)](drop-resource-pool-transact-sql.md)
- [ALTER RESOURCE GOVERNOR (Transact-SQL)](alter-resource-governor-transact-sql.md)




**Applies to: \=azure-sqldw-latest**



        [SQL Server](drop-workload-group-transact-sql.md?view=sql-server-ver15&preserve-view=true)


        [SQL Managed Instance](drop-workload-group-transact-sql.md?view=azuresqldb-mi-current&preserve-view=true)


        **_\* Azure Synapse<br />Analytics \*_** &nbsp;



&nbsp;

## Azure Synapse Analytics

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

Drops a workload group.  Once the statement completes, the settings are in effect.



## Syntax

```syntaxsql
DROP WORKLOAD GROUP group_name  
```

## Arguments

*group_name*  
Is the name of an existing user-defined workload group.

## Remarks

A workload group cannot be dropped if classifiers exist for the workload group.  Drop the classifiers before the workload group is dropped.  If there are active requests using resources from the workload group being dropped, the drop workload statement is blocked behind them.

## Examples

Use the following code example to determine which classifiers need to be dropped before the workload group can be dropped.

```sql
SELECT c.name as classifier_name
      ,'DROP WORKLOAD CLASSIFIER '+c.name as drop_command
  FROM sys.workload_management_workload_classifiers c
  JOIN sys.workload_management_workload_groups g
    ON c.group_name = g.name
  WHERE g.name = 'wgXYZ' --change the filter to the workload being dropped
```

## Permissions

Requires CONTROL DATABASE permission

## Related content

- [CREATE WORKLOAD GROUP (Transact-SQL)](create-workload-group-transact-sql.md)
- [ALTER WORKLOAD GROUP (Transact-SQL)](alter-workload-group-transact-sql.md)
- [sys.workload_management_workload_groups (Transact-SQL)](../../relational-databases/system-catalog-views/sys-workload-management-workload-groups-transact-sql.md)
- [sys.dm_workload_management_workload_groups_stats (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-workload-management-workload-group-stats-transact-sql.md)
- [Quickstart: Configure workload isolation using T-SQL](https://learn.microsoft.com/azure/sql-data-warehouse/quickstart-configure-workload-isolation-tsql)
