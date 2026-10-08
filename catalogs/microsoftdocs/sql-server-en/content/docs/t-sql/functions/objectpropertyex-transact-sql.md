---
title: "OBJECTPROPERTYEX (Transact-SQL)"
description: "OBJECTPROPERTYEX returns information about schema-scoped objects in the current database."
author: VanMSFT
ms.author: vanto
ms.date: 09/26/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "OBJECTPROPERTYEX"
  - "OBJECTPROPERTYEX_TSQL"
helpviewer_keywords:
  - "displaying schema-scoped object information"
  - "viewing schema-scoped object information"
  - "OBJECTPROPERTYEX function"
  - "schema-scoped objects [SQL Server]"
  - "objects [SQL Server], schema-scoped"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# OBJECTPROPERTYEX (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The `OBJECTPROPERTYEX` function returns information about schema-scoped objects in the current database. 

For a list of these objects, see [sys.objects (Transact-SQL)](../../relational-databases/system-catalog-views/sys-objects-transact-sql.md). `OBJECTPROPERTYEX` cannot be used for objects that are not schema-scoped, such as data definition language (DDL) triggers and event notifications.



## Syntax

```syntaxsql
OBJECTPROPERTYEX ( id , property )
```

## Arguments

#### *ID*

An expression that represents the ID of the object in the current database. *ID* is **int** and is assumed to be a schema-scoped object in the current database context.

#### *property*

An expression that contains the information to be returned for the object specified by ID. The return type is **sql_variant**. The following table shows the base data type for each property value.

> **Note:**
>  Unless noted otherwise, `NULL` is returned when *property* is not a valid property name, *ID* is not a valid object ID, *ID* is an unsupported object type for the specified *property*, or the caller does not have permission to view the object's metadata.

| Property name | Object type | Description and values returned |
| --- | --- | --- |
| `BaseType` | Any schema-scoped object | Identifies the base type of the object. When the specified object is a `SYNONYM`, the base type of the underlying object is returned.<br /><br /> Non-null = Object type<br /><br /> Base data type: **char(2)** |
| `CnstIsClustKey` | Constraint | `PRIMARY KEY` constraint with a clustered index.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `CnstIsColumn` | Constraint | `CHECK`, `DEFAULT`, or `FOREIGN KEY` constraint on a single column.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `CnstIsDeleteCascade` | Constraint | `FOREIGN KEY` constraint with the `ON DELETE CASCADE` option.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `CnstIsDisabled` | Constraint | Disabled constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `CnstIsNonclustKey` | Constraint | `PRIMARY KEY` constraint with a nonclustered index.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `CnstIsNotRepl` | Constraint | Constraint is defined by using the `NOT FOR REPLICATION` keywords.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `CnstIsNotTrusted` | Constraint | Constraint was enabled without checking existing rows. Therefore, the constraint might not hold for all rows.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `CnstIsUpdateCascade` | Constraint | `FOREIGN KEY` constraint with the `ON UPDATE CASCADE` option.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsAfterTrigger` | Trigger | `AFTER` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsAnsiNullsOn` | Transact-SQL  function,  Transact-SQL  procedure,  Transact-SQL  trigger, view | The setting of `ANSI_NULLS` at creation time.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsDeleteTrigger` | Trigger | `DELETE` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsFirstDeleteTrigger` | Trigger | The first trigger fired when a `DELETE` is executed against the table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsFirstInsertTrigger` | Trigger | The first trigger fired when an `INSERT` is executed against the table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsFirstUpdateTrigger` | Trigger | The first trigger fired when an `UPDATE` is executed against the table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsInsertTrigger` | Trigger | `INSERT` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsInsteadOfTrigger` | Trigger | `INSTEAD OF` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsLastDeleteTrigger` | Trigger | Last trigger fired when a `DELETE` is executed against the table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsLastInsertTrigger` | Trigger | Last trigger fired when an `INSERT` is executed against the table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsLastUpdateTrigger` | Trigger | Last trigger fired when an `UPDATE` is executed against the table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsQuotedIdentOn` | Transact-SQL  function,  Transact-SQL  procedure,  Transact-SQL  trigger, view | Setting of `QUOTED_IDENTIFIER` at creation time.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsStartup` | Procedure | Startup procedure.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsTriggerDisabled` | Trigger | Disabled trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsTriggerNotForRepl` | Trigger | Trigger defined as `NOT FOR REPLICATION`.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsUpdateTrigger` | Trigger | `UPDATE` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `ExecIsWithNativeCompilation` | Transact-SQL  Procedure | **Applies to**:  SQL Server 2014 (12.x) |
 | and later versions.<br /><br /> Procedure is natively compiled.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `HasAfterTrigger` | Table or view | Table or view has an `AFTER` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `HasDeleteTrigger` | Table or view | Table or view has a `DELETE` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `HasInsertTrigger` | Table or view | Table or view has an `INSERT` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `HasInsteadOfTrigger` | Table or view | Table or view has an `INSTEAD OF` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `HasUpdateTrigger` | Table or view | Table or view has an `UPDATE` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsAnsiNullsOn` | Transact-SQL  function,  Transact-SQL  procedure, table,  Transact-SQL  trigger, view | Specifies that the `ANSI NULLS` option setting for the table is `ON`, meaning all comparisons against a null value evaluate to `UNKNOWN`. This setting applies to all expressions in the table definition, including computed columns and constraints, for as long as the table exists.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsCheckCnst` | Any schema-scoped object | `CHECK` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsConstraint` | Any schema-scoped object | Constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsDefault` | Any schema-scoped object | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> Bound default.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsDefaultCnst` | Any schema-scoped object | `DEFAULT` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsDeterministic` | Scalar and table-valued functions, view | The determinism property of the function or view.<br /><br /> 1 = Deterministic<br /><br /> 0 = Not Deterministic<br /><br /> Base data type: **int** |
| `IsEncrypted` | Transact-SQL  function,  Transact-SQL  procedure, table,  Transact-SQL  trigger, view | Indicates that the original text of the module statement was converted to an obfuscated format. The output of the obfuscation is not directly visible in any of the catalog views in  SQL Server 2005 (9.x) |
| . Users without access to system tables or database files cannot retrieve the obfuscated text. However, the text is available to users that can either access system tables over the [Diagnostic connection for database administrators](../../database-engine/configure-windows/diagnostic-connection-for-database-administrators.md) or directly access database files. Also, users that can attach a debugger to the server process can retrieve the original procedure from memory at run time.<br /><br /> 1 = Encrypted<br /><br /> 0 = Not encrypted<br /><br /> Base data type: **int** |
| `IsExecuted` | Any schema-scoped object | Specifies the object can be executed (view, procedure, function, or trigger).<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsExtendedProc` | Any schema-scoped object | Extended procedure.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsForeignKey` | Any schema-scoped object | `FOREIGN KEY` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsIndexed` | Table or view | A table or view with an index.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsIndexable` | Table or view | A table or view on which an index might be created.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsInlineFunction` | Function | Inline function.<br /><br /> 1 = Inline function<br /><br /> 0 = Not inline function<br /><br /> Base data type: **int** |
| `IsMSShipped` | Any schema-scoped object | An object created during installation of  SQL Server |
| .<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsPrecise` | Computed column, function, user-defined type, view | Indicates whether the object contains an imprecise computation, such as floating point operations.<br /><br /> 1 = Precise<br /><br /> 0 = Imprecise<br /><br /> Base data type: **int** |
| `IsPrimaryKey` | Any schema-scoped object | `PRIMARY KEY` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsProcedure` | Any schema-scoped object | Procedure.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsQuotedIdentOn` | `CHECK` constraint, `DEFAULT` definition,  Transact-SQL  function,  Transact-SQL  procedure, table,  Transact-SQL  trigger, view | Specifies that the quoted identifier setting for the object is `ON`, meaning double quotation marks delimit identifiers in all expressions involved in the object definition.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsQueue` | Any schema-scoped object | Service Broker Queue<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsReplProc` | Any schema-scoped object | Replication procedure.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsRule` | Any schema-scoped object | Bound rule.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsScalarFunction` | Function | Scalar-valued function.<br /><br /> 1 = Scalar-valued function<br /><br /> 0 = Not scalar-valued function<br /><br /> Base data type: **int** |
| `IsSchemaBound` | Function, Procedure, view | A schema bound function or view created by using `SCHEMABINDING`.<br /><br /> 1 = Schema-bound<br /><br /> 0 = Not schema-bound<br /><br /> Base data type: **int** |
| `IsSystemTable` | Table | System table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsSystemVerified` | Computed column, function, user-defined type, view | The precision and determinism properties of the object can be verified by  SQL Server |
| .<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsTable` | Table | Table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsTableFunction` | Function | Table-valued function.<br /><br /> 1 = Table-valued function<br /><br /> 0 = Not table-valued function<br /><br /> Base data type: **int** |
| `IsTrigger` | Any schema-scoped object | Trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsUniqueCnst` | Any schema-scoped object | `UNIQUE` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsUserTable` | Table | User-defined table.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `IsView` | View | View.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `OwnerId` | Any schema-scoped object | Owner of the object.<br /><br /> **Note:** The schema owner is not necessarily the object owner. For example, child objects (those where `parent_object_id` is non-null) will always return the same owner ID as the parent.<br /><br /> Non-null = Database user ID of the object owner.<br /><br /> `NULL` = Unsupported object type, or object ID is not valid.<br /><br /> Base data type: **int** |
| `SchemaId` | Any schema-scoped object | The ID of the schema associated with the object.<br /><br /> Non-null = Schema ID of the object.<br /><br /> Base data type: **int** |
| `SystemDataAccess` | Function or view | Object accesses system data, system catalogs, or virtual system tables, in the local instance of  SQL Server |
| .<br /><br /> 0 = None<br /><br /> 1 = Read<br /><br /> Base data type: **int** |
| `TableDeleteTrigger` | Table | Table has a `DELETE` trigger.<br /><br /> >1 = ID of first trigger with the specified type.<br /><br /> Base data type: **int** |
| `TableDeleteTriggerCount` | Table | The table has the specified number of `DELETE` triggers.<br /><br /> Nonnull = Number of `DELETE` triggers<br /><br /> Base data type: **int** |
| `TableFullTextMergeStatus` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> Whether a table that has a full-text index that is currently in merging.<br /><br /> 0 = Table does not have a full-text index, or the full-text index is not in merging.<br /><br /> 1 = The full-text index is in merging. |
| `TableFullTextBackgroundUpdateIndexOn` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> The table has full-text background update index (autochange tracking) enabled.<br /><br /> 1 = TRUE<br /><br /> 0 = FALSE<br /><br /> Base data type: **int** |
| `TableFulltextCatalogId` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> ID of the full-text catalog in which the full-text index data for the table resides.<br /><br /> Nonzero = Full-text catalog ID, associated with the unique index that identifies the rows in a full-text indexed table.<br /><br /> 0 = Table does not have a full-text index.<br /><br /> Base data type: **int** |
| `TableFullTextChangeTrackingOn` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> Table has full-text change-tracking enabled.<br /><br /> 1 = TRUE<br /><br /> 0 = FALSE<br /><br /> Base data type: **int** |
| `TableFulltextDocsProcessed` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> Number of rows processed since the start of full-text indexing. In a table that is being indexed for full-text search, all the columns of one row are considered as part of one document to be indexed.<br /><br /> 0 = No active crawl or full-text indexing is completed.<br /><br /> > 0 = One of the following (A or B): A) The number of documents processed by insert or update operations since the start of full, incremental, or manual change tracking population; B) The number of rows processed by insert or update operations since change tracking with background update index population was enabled, the full-text index schema changed, the full-text catalog rebuilt, or the instance of  SQL Server |
 | restarted, and so on.<br /><br /> `NULL` = Table does not have a full-text index.<br /><br /> Base data type: **int**<br /><br /> **Note** This property does not monitor or count deleted rows. |
| `TableFulltextFailCount` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> The number of rows that full-text search did not index.<br /><br /> 0 = The population has completed.<br /><br /> >0 = One of the following (A or B): A) The number of documents that were not indexed since the start of Full, Incremental, and Manual Update change tracking population; B) For change tracking with background update index, the number of rows that were not indexed since the start of the population, or the restart of the population. This could be caused by a schema change, rebuild of the catalog, server restart, and so on<br /><br /> `NULL` = Table does not have a Full-Text index.<br /><br /> Base data type: **int** |
| `TableFulltextItemCount` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> Non-null = Number of rows that were full-text indexed successfully.<br /><br /> `NULL` = Table does not have a full-text index.<br /><br /> Base data type: **int** |
| `TableFulltextKeyColumn` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> ID of the column associated with the single-column unique index that is part of the definition of a full-text index and semantic index.<br /><br /> 0 = Table does not have a full-text index.<br /><br /> Base data type: **int** |
| `TableFulltextPendingChanges` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> Number of pending change tracking entries to process.<br /><br /> 0 = change tracking is not enabled.<br /><br /> `NULL` = Table does not have a full-text index.<br /><br /> Base data type: **int** |
| `TableFulltextPopulateStatus` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> 0 = Idle.<br /><br /> 1 = Full population is in progress.<br /><br /> 2 = Incremental population is in progress.<br /><br /> 3 = Propagation of tracked changes is in progress.<br /><br /> 4 = Background update index is in progress, such as autochange tracking.<br /><br /> 5 = Full-text indexing is throttled or paused.<br /><br /> 6 = An error has occurred. Examine the crawl log for details. For more information, see the **Troubleshooting Errors in a Full-Text Population (Crawl)** section of [Populate Full-Text Indexes](../../relational-databases/search/populate-full-text-indexes.md).<br /><br /> Base data type: **int** |
| `TableFullTextSemanticExtraction` | Table | **Applies to**:  SQL Server 2012 (11.x) |
 | and later versions.<br /><br /> Table is enabled for semantic indexing.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasActiveFulltextIndex` | Table | **Applies to**:  SQL Server 2008 (10.0.x) |
 | and later versions.<br /><br /> Table has an active full-text index.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasCheckCnst` | Table | Table has a `CHECK` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasClustIndex` | Table | Table has a clustered index.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasDefaultCnst` | Table | Table has a `DEFAULT` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasDeleteTrigger` | Table | Table has a `DELETE` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasForeignKey` | Table | Table has a `FOREIGN KEY` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasForeignRef` | Table | Table is referenced by a `FOREIGN KEY` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasIdentity` | Table | Table has an identity column.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasIndex` | Table | Table has an index of any type.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasInsertTrigger` | Table | Object has an `INSERT` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasNonclustIndex` | Table | The table has a nonclustered index.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasPrimaryKey` | Table | Table has a primary key.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasRowGuidCol` | Table | Table has a `ROWGUIDCOL` for a **uniqueidentifier** column.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasTextImage` | Table | Table has a **text**, **ntext**, or **image** column.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasTimestamp` | Table | Table has a **timestamp** column.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasUniqueCnst` | Table | Table has a `UNIQUE` constraint.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasUpdateTrigger` | Table | The object has an `UPDATE` trigger.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableHasVarDecimalStorageFormat` | Table | Table is enabled for **vardecimal** storage format.<br /><br /> 1 = True<br /><br /> 0 = False |
| `TableInsertTrigger` | Table | Table has an `INSERT` trigger.<br /><br /> >1 = ID of first trigger with the specified type.<br /><br /> Base data type: **int** |
| `TableInsertTriggerCount` | Table | The table has the specified number of `INSERT` triggers.<br /><br /> >0 = The number of `INSERT` triggers.<br /><br /> Base data type: **int** |
| `TableIsFake` | Table | Table is not real. It is materialized internally on demand by the  Database Engine |
| .<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableIsLockedOnBulkLoad` | Table | Table is locked because a **bcp** or `BULK INSERT` job.<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int** |
| `TableIsMemoryOptimized` | Table | **Applies to**:  SQL Server 2014 (12.x) |
 | and later versions.<br /><br /> Table is memory optimized<br /><br /> 1 = True<br /><br /> 0 = False<br /><br /> Base data type: **int**<br /><br /> For more information, see [In-Memory OLTP overview and usage scenarios](../../relational-databases/in-memory-oltp/overview-and-usage-scenarios.md). |
| `TableIsPinned` | Table | Table is pinned to be held in the data cache.<br /><br /> 0 = False<br /><br /> This feature is not supported in  SQL Server 2005 (9.x) |
 | and later versions. |
| `TableTextInRowLimit` | Table | Table has text in row option set.<br /><br /> > 0 = Maximum bytes allowed for text in row.<br /><br /> 0 = text in row option is not set.<br /><br /> Base data type: **int** |
| `TableUpdateTrigger` | Table | Table has an `UPDATE` trigger.<br /><br /> > 1 = ID of first trigger with the specified type.<br /><br /> Base data type: **int** |
| `TableUpdateTriggerCount` | Table | Table has the specified number of `UPDATE` triggers.<br /><br /> > 0 = The number of `UPDATE` triggers.<br /><br /> Base data type: **int** |
| `UserDataAccess` | Function or view | Indicates the object accesses user data, user tables, in the local instance of  SQL Server |
| .<br /><br /> 1 = Read<br /><br /> 0 = None<br /><br /> Base data type: **int** |
| `TableHasColumnSet` | Table | Table has a column set.<br /><br /> 0 = False<br /><br /> 1 = True<br /><br /> For more information, see [Use column sets](../../relational-databases/tables/use-column-sets.md). |
| `Cardinality` | Table (system or user-defined), view, or index | **Applies to**:  SQL Server 2012 (11.x) |
 | and later versions.<br /><br /> The number of rows in the specified object. |
| `TableTemporalType` | Table | **Applies to**:  SQL Server 2016 (13.x) |
 | and later versions.<br /><br /> Specifies the type of table.<br /><br /> 0 = non-temporal table<br /><br /> 1 = history table for system-versioned table<br /><br /> 2 = system-versioned temporal table |

## Return types

**sql_variant**

## Exceptions

 Returns `NULL` on error or if a caller does not have permission to view the object.

 A user can only view the metadata of securables that the user owns or on which the user has been granted permission. This means that metadata-emitting, built-in functions such as OBJECTPROPERTYEX might return `NULL` if the user does not have any permission on the object. For more information, see [Metadata visibility configuration](../../relational-databases/security/metadata-visibility-configuration.md).

## Remarks

 The  Database Engine 
 assumes that *object_id* is in the current database context. A query that references an *object_id* in another database returns `NULL` or incorrect results. For example, in the following query, the current database context is the `master` database. The  Database Engine 
 tries to return the property value for the specified *object_id* in that database instead of the database that is specified in the query. The query returns incorrect results because the view `vEmployee` is not in the `master` database.

```sql
USE master;
GO
SELECT OBJECTPROPERTYEX(OBJECT_ID(N'AdventureWorks2022.HumanResources.vEmployee'), 'IsView');
GO
```

 `OBJECTPROPERTYEX(view_id, 'IsIndexable')` might consume significant computer resources because evaluation of IsIndexable property requires the parsing of view definition, normalization, and partial optimization. Although the IsIndexable property identifies tables or views that can be indexed, the actual creation of the index still might fail if certain index key requirements are not met. For more information, see [CREATE INDEX (Transact-SQL)](../statements/create-index-transact-sql.md).

 `OBJECTPROPERTYEX (table_id, 'TableHasActiveFulltextIndex')` returns a value of 1 (true) when at least one column of a table is added for indexing. Full-text indexing becomes active for population as soon as the first column is added for indexing.

 Restrictions on metadata visibility are applied to the result set. For more information, see [Metadata visibility configuration](../../relational-databases/security/metadata-visibility-configuration.md).

## Examples

<a id="a-finding-the-base-type-of-an-object"></a>

### A. Find the base type of an object

 The following example creates a `SYNONYM` `MyEmployeeTable` for the `Employee` table in the  `AdventureWorks2025`  database and then returns the base type of the `SYNONYM`.

```sql
USE AdventureWorks2022;
GO
CREATE SYNONYM MyEmployeeTable FOR HumanResources.Employee;
GO
SELECT OBJECTPROPERTYEX ( object_id(N'MyEmployeeTable'), N'BaseType')AS [Base Type];
GO
```

 The result set shows that the base type of the underlying object, the `Employee` table, is a user table.

```output
Base Type
--------
U
```

<a id="b-returning-a-property-value"></a>

### B. Return a property value

 The following example returns the number of `UPDATE` triggers on the specified table.

```sql
USE AdventureWorks2022;
GO
SELECT OBJECTPROPERTYEX(OBJECT_ID(N'HumanResources.Employee'), N'TABLEUPDATETRIGGERCOUNT');
GO
```

<a id="c-finding-tables-that-have-a-foreign-key-constraint"></a>

### C. Find tables that have a FOREIGN KEY constraint

 The following example uses the `TableHasForeignKey` property to return all the tables that have a `FOREIGN KEY` constraint.

```sql
USE AdventureWorks2022;
GO
SELECT name, object_id, schema_id, type_desc
FROM sys.objects
WHERE OBJECTPROPERTYEX(object_id, N'TableHasForeignKey') = 1
ORDER BY name;
GO
```

## Examples:  Azure Synapse Analytics 

### D: Finding the base type of an object

 The following example returns the base type of `dbo.DimReseller` object.

```sql
-- Uses AdventureWorks

SELECT OBJECTPROPERTYEX ( object_id(N'dbo.DimReseller'), N'BaseType')AS BaseType;
```

 The result set shows that the base type of the underlying object, the `dbo.DimReseller` table, is a user table.

```output
BaseType
--------
U
```

## Related content

- [CREATE SYNONYM (Transact-SQL)](../statements/create-synonym-transact-sql.md)
- [Metadata functions (Transact-SQL)](metadata-functions-transact-sql.md)
- [OBJECT_DEFINITION (Transact-SQL)](object-definition-transact-sql.md)
- [OBJECT_ID (Transact-SQL)](object-id-transact-sql.md)
- [OBJECT_NAME (Transact-SQL)](object-name-transact-sql.md)
- [sys.objects (Transact-SQL)](../../relational-databases/system-catalog-views/sys-objects-transact-sql.md)
- [ALTER AUTHORIZATION (Transact-SQL)](../statements/alter-authorization-transact-sql.md)
- [TYPEPROPERTY (Transact-SQL)](typeproperty-transact-sql.md)
