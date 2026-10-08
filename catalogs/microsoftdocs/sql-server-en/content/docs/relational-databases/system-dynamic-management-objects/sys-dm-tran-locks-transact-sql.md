---
title: "sys.dm_tran_locks (Transact-SQL)"
description: sys.dm_tran_locks returns information about currently active lock manager resources in the Database Engine.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: wiassaf
ms.date: 06/12/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "dm_tran_locks"
  - "sys.dm_tran_locks"
  - "sys.dm_tran_locks_TSQL"
  - "dm_tran_locks_TSQL"
helpviewer_keywords:
  - "sys.dm_tran_locks dynamic management view"
dev_langs:
  - TSQL
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.dm_tran_locks (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns information about currently active lock manager resources in  SQL Server 
. Each row represents a currently active request to the lock manager for a lock that has been granted or is waiting to be granted.

The columns in the result set are divided into two main groups: resource and request. The resource group describes the resource on which the lock request is being made, and the request group describes the lock request.

> **Note:**  
> To call this from  Azure Synapse Analytics , use the name `sys.dm_pdw_nodes_tran_locks`.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


| Column name | Data type | Description |
| --- | --- | --- |
| `resource_type` | **nvarchar(60)** | Represents the resource type. The value can be: <br/><br/>`DATABASE`<br/><br/>`FILE`<br/><br/>`OBJECT`<br/><br/>`PAGE`<br/><br/>`KEY`<br/><br/>`EXTENT`<br/><br/>`RID` (Row ID)<br/><br/>`APPLICATION`<br/><br/>`METADATA`<br/><br/>`HOBT` (Heap or B-tree)<br/><br/>`ALLOCATION_UNIT`<br/><br/>`XACT` (Transaction)<br/><br/>`OIB` (Online index build)<br/><br/>`ROW_GROUP` |
| `resource_subtype` | **nvarchar(60)** | Represents a subtype of `resource_type`. Acquiring a subtype lock without holding a non-subtyped lock of the parent type is technically valid. Different subtypes do not conflict with each other or with the non-subtyped parent type. Not all resource types have subtypes. |
| `resource_database_id` | **int** | ID of the database under which this resource is scoped. All resources handled by the lock manager are scoped by the database ID. |
| `resource_description` | **nvarchar(256)** | Description of the resource that contains only information that is not available from other resource columns. |
| `resource_associated_entity_id` | **bigint** | ID of the entity in a database with which a resource is associated. This can be an object ID, `HoBt` ID, or an Allocation Unit ID, depending on the resource type. |
| `resource_lock_partition` | **Int** | ID of the lock partition for a partitioned lock resource. The value for nonpartitioned lock resources is `0`. |
| `request_mode` | **nvarchar(60)** | Mode of the request. For granted requests, this is the granted mode; for waiting requests, this is the mode being requested.<br /><br />NULL = No access is granted to the resource. Serves as a placeholder.<br /><br />`Sch-S` (Schema stability) = Ensures that a schema element, such as a table or index, is not dropped while any session holds a schema stability lock on the schema element.<br /><br />`Sch-M` (Schema modification) = Must be held by any session that wants to change the schema of the specified resource. Ensures that no other sessions are referencing the indicated object.<br /><br />`S` (Shared) = The holding session is granted shared access to the resource.<br /><br />`U` (Update) = Indicates an update lock acquired on resources that might eventually be updated. It is used to prevent a common form of deadlock that occurs when multiple sessions lock resources for potential update in the future.<br /><br />`X` (Exclusive) = The holding session is granted exclusive access to the resource.<br /><br />`IS` (Intent Shared) = Indicates the intention to place S locks on some subordinate resource in the lock hierarchy.<br /><br />`IU` (Intent Update) = Indicates the intention to place U locks on some subordinate resource in the lock hierarchy.<br /><br />`IX` (Intent Exclusive) = Indicates the intention to place X locks on some subordinate resource in the lock hierarchy.<br /><br />`SIU` (Shared Intent Update) = Indicates shared access to a resource with the intent of acquiring update locks on subordinate resources in the lock hierarchy.<br /><br />`SIX` (Shared Intent Exclusive) = Indicates shared access to a resource with the intent of acquiring exclusive locks on subordinate resources in the lock hierarchy.<br /><br />`UIX` (Update Intent Exclusive) = Indicates an update lock hold on a resource with the intent of acquiring exclusive locks on subordinate resources in the lock hierarchy.<br /><br />`BU` = Used by bulk operations.<br /><br />`RangeS_S` (Shared Key-Range and Shared Resource lock) = Indicates serializable range scan.<br /><br />`RangeS_U` (Shared Key-Range and Update Resource lock) = Indicates serializable update scan.<br /><br />`RangeI_N` (Insert Key-Range and Null Resource lock) = Used to test ranges before inserting a new key into an index.<br /><br />`RangeI_S` = Key-Range Conversion lock, created by an overlap of `RangeI_N` and `S` locks.<br /><br />`RangeI_U` = Key-Range Conversion lock, created by an overlap of RangeI_N and U locks.<br /><br />`RangeI_X` = Key-Range Conversion lock, created by an overlap of `RangeI_N` and `X` locks.<br /><br />`RangeX_S` = Key-Range Conversion lock, created by an overlap of `RangeI_N` and `RangeS_S`. locks.<br /><br />`RangeX_U` = Key-Range Conversion lock, created by an overlap of `RangeI_N` and `RangeS_U` locks.<br /><br />`RangeX_X` (Exclusive Key-Range and Exclusive Resource lock) = This is a conversion lock used when updating a key in a range. |
| `request_type` | **nvarchar(60)** | Request type. The value is `LOCK`. |
| `request_status` | **nvarchar(60)** | Current status of this request. Possible values are `GRANTED`, `CONVERT`, `WAIT`, `LOW_PRIORITY_CONVERT`, `LOW_PRIORITY_WAIT`, or `ABORT_BLOCKERS`. For more information about low priority waits and abort blockers, see the *low_priority_lock_wait* section of [ALTER INDEX (Transact-SQL)](../../t-sql/statements/alter-index-transact-sql.md). |
| `request_reference_count` | **smallint** | Returns an approximate number of times the same requestor has requested this resource. |
| `request_lifetime` | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `request_session_id` | **int** | `session_id` that currently owns this request. The owning `session_id` can change for distributed and bound transactions. A value of `-2` indicates that the request belongs to an orphaned distributed transaction. A value of `-3` indicates that the request belongs to a deferred recovery transaction, such as, a transaction for which a rollback has been deferred at recovery because the rollback could not be completed successfully. |
| `request_exec_context_id` | **int** | Execution context ID of the process that currently owns this request. |
| `request_request_id` | **int** | `request_id` (batch ID) of the process that currently owns this request. This value changes every time that the active [Multiple Active Result Set (MARS)](../../connect/ado-net/sql/multiple-active-result-sets-mars.md) connection for a transaction changes. |
| `request_owner_type` | **nvarchar(60)** | Entity type that owns the request. Lock manager requests can be owned by a variety of entities. Possible values are:<br /><br />`TRANSACTION` = The request is owned by a transaction.<br /><br />`CURSOR` = The request is owned by a cursor.<br /><br />`SESSION` = The request is owned by a user session.<br /><br />`SHARED_TRANSACTION_WORKSPACE` = The request is owned by the shared part of the transaction workspace.<br /><br />`EXCLUSIVE_TRANSACTION_WORKSPACE` = The request is owned by the exclusive part of the transaction workspace.<br /><br />`NOTIFICATION_OBJECT` = The request is owned by an internal  SQL Server |
 | component. This component has requested the lock manager to notify it when another component is waiting to take the lock. The FileTable feature is a component that uses this value.<br /><br />**Note:** Work spaces are used internally to hold locks for enlisted sessions. |
| `request_owner_id` | **bigint** | ID of the specific owner of this request.<br /><br />When a transaction is the owner of the request, this value contains the transaction ID.<br /><br />When a FileTable is the owner of the request, `request_owner_id` has one of the following values:<br /><ul><li>`-4`: A FileTable has taken a database lock.</li><li>`-3`: A FileTable has taken a table lock.</li><li>**Other value**: The value represents a file handle. This value also appears as `fcb_id` in the dynamic management view [sys.dm_filestream_non_transacted_handles (Transact-SQL)](sys-dm-filestream-non-transacted-handles-transact-sql.md).</li></ul> |
| `request_owner_guid` | **uniqueidentifier** | GUID of the specific owner of this request. This value is only used by a distributed transaction where the value corresponds to the MS DTC GUID for that transaction. |
| `request_owner_lockspace_id` | **nvarchar(32)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 | This value represents the lockspace ID of the requestor. The lockspace ID determines whether two requestors are compatible with each other and can be granted locks in modes that would otherwise conflict with one another. |
| `lock_owner_address` | **varbinary(8)** | Memory address of the internal data structure that is used to track this request. This column can be joined the with `resource_address` column in `sys.dm_os_waiting_tasks`. |
| `pdw_node_id` | **int** | The identifier for the node that this distribution is on.<br /><br />**Applies to**:  Azure Synapse Analytics |

## Permissions

On  SQL Server 
 and SQL Managed Instance, `sys.dm_tran_locks` requires `VIEW SERVER STATE` permission.

On SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.   

In [SQL analytics endpoint
and Warehouse
in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
, membership in the Viewer workspace role is the minimum permission necessary to view `sys.dm_tran_locks`.

### Permissions for SQL Server 2022 and later

In SQL Server 2022 and later versions, `sys.dm_tran_locks` requires `VIEW SERVER PERFORMANCE STATE` permission on the server.

## Remarks

A granted request status indicates that a lock has been granted on a resource to the requestor. A waiting request indicates that the request has not yet been granted. The following waiting-request types are returned by the `request_status` column:

- A convert request status indicates that the requestor has already been granted a request for the resource and is currently waiting for an upgrade to the initial request to be granted.

- A wait request status indicates that the requestor does not currently hold a granted request on the resource.

Because `sys.dm_tran_locks` is populated from internal lock manager data structures, maintaining this information does not add extra overhead to regular processing. Materializing the view does require access to the lock manager internal data structures. This can have minor effects on the regular processing in the server. These effects should be unnoticeable and should only affect heavily used resources. Because the data in this view corresponds to live lock manager state, the data can change at any time, and rows are added and removed as locks are acquired and released. Applications querying this view might experience unpredictable performance due to the nature of protecting the integrity of lock manager structures. This view has no historical information.

Two requests operate on the same resource only if all the resource-group columns are equal.

You can control the locking of read operations by using the following tools:

- `SET TRANSACTION ISOLATION LEVEL` to specify the level of locking for a session. For more information, see [SET TRANSACTION ISOLATION LEVEL (Transact-SQL)](../../t-sql/statements/set-transaction-isolation-level-transact-sql.md).

- Locking table hints to specify the level of locking for an individual reference of a table in a `FROM` clause. For syntax and restrictions, see [Table Hints (Transact-SQL)](../../t-sql/queries/hints-transact-sql-table.md).

A resource that is running under one `session_id` can have more than one granted lock. Different entities that are running under one session can each own a lock on the same resource, and the information is displayed in the `request_owner_type` and `request_owner_id` columns that are returned by `sys.dm_tran_locks`. If multiple instances of the same `request_owner_type` exist, the `request_owner_id` column is used to distinguish each instance. For distributed transactions, the `request_owner_type` and the `request_owner_guid` columns show the different entity information.

For example, Session S1 owns a shared lock on `Table1`; and transaction T1, which is running under session S1, also owns a shared lock on `Table1`. In this case, the `resource_description` column that is returned by `sys.dm_tran_locks` shows two instances of the same resource. The `request_owner_type` column shows one instance as a session and the other as a transaction. Also, the `resource_owner_id` column has different values.

Multiple cursors that run under one session are indistinguishable and are treated as one entity.

Distributed transactions that are not associated with a `session_id` value are orphaned transactions and are assigned the `session_id` value of `-2`. For more information, see [KILL (Transact-SQL)](../../t-sql/language-elements/kill-transact-sql.md).

## Locks

Locks are held on  SQL Server 
 resources, such as rows read or modified during a transaction, to prevent concurrent use of resources by different transactions. For example, if an exclusive (X) lock is held on a row within a table by a transaction, no other transaction can modify that row until the lock is released. Minimizing locks increases concurrency, which can improve performance.

## Resource details

The following table lists the resources that are represented in the `resource_associated_entity_id` column.

| Resource type | Resource description | `resource_associated_entity_id` |
| --- | --- | --- |
| `DATABASE` | Represents a database. | Not applicable |
| `FILE` | Represents a database file. This file can be either a data or a log file. | Not applicable |
| `OBJECT` | Represents an object in a database. This object can be a data table, view, stored procedure, extended stored procedure, or any object that has an object ID. | Object ID |
| `PAGE` | Represents a single page in a data file. | `HoBt` ID. This value corresponds to `sys.partitions.hobt_id`. The `HoBt` ID is not always available for PAGE resources because the `HoBt` ID is extra information that can be provided by the caller, and not all callers can provide this information. |
| `KEY` | Represents a row in an index. | `HoBt` ID. This value corresponds to `sys.partitions.hobt_id`. |
| `EXTENT` | Represents a data file extent. An extent is a group of eight contiguous pages. | Not applicable |
| `RID` | Represents a physical row in a heap. | `HoBt` ID. This value corresponds to `sys.partitions.hobt_id`. The `HoBt` ID is not always available for RID resources because the `HoBt` ID is extra information that can be provided by the caller, and not all callers can provide this information. |
| `APPLICATION` | Represents an application specified resource. | Not applicable |
| `METADATA` | Represents metadata information. | Not applicable |
| `HOBT` | Represents a heap or a B-tree. These are the basic access path structures. | `HoBt` ID. This value corresponds to `sys.partitions.hobt_id`. |
| `OIB` | Represents online index (re)build. | `HoBt` ID. This value corresponds to `sys.partitions.hobt_id`. |
| `ALLOCATION_UNIT` | Represents a set of related pages, such as an index partition. Each allocation unit covers a single Index Allocation Map (IAM) chain. | Allocation Unit ID. This value corresponds to `sys.allocation_units.allocation_unit_id`. |
| `ROW_GROUP` | Represents a columnstore row group. |  |
| `XACT` | Represents a transaction. Occurs when [optimized locking](../performance/optimized-locking.md) is enabled. | There are two scenarios:<br /><br />***Scenario 1* (Owner)**<br />- **Resource type**: `XACT`.<br />- **Resource description**: When a `TID` lock is held, the `resource_description` is the `XACT` resource.<br />- **Resource associated entity ID**: `resource_associated_entity_id` is 0.<br /><br />***Scenario 2* (Waiter)**<br />- **Resource type**: `XACT`.<br />- **Resource description**: When a request waits for a TID lock, the `resource_description` is the `XACT` resource followed by the underlying `KEY` or `RID` resource.<br />- **Resource associated entity ID**: `resource_associated_entity_id` is the underlying `HoBt` ID. |

> **Note:**  
> Documentation uses the term B-tree generally in reference to indexes. In rowstore indexes, the Database Engine implements a B+ tree. This does not apply to columnstore indexes or indexes on memory-optimized tables. For more information, see the [SQL Server and Azure SQL index architecture and design guide](../sql-server-index-design-guide.md).


The following table lists the subtypes that are associated with each resource type.

| ResourceSubType | Synchronizes |
| --- | --- |
| `ALLOCATION_UNIT.BULK_OPERATION_PAGE` | Pre-allocated pages used for bulk operations. |
| `ALLOCATION_UNIT.PAGE_COUNT` | Allocation unit page count statistics during deferred drop operations. |
| `DATABASE.BULKOP_BACKUP_DB` | Database backups with bulk operations. |
| `DATABASE.BULKOP_BACKUP_LOG` | Database log backups with bulk operations. |
| `DATABASE.CHANGE_TRACKING_CLEANUP` | Change tracking cleanup tasks. |
| `DATABASE.CT_DDL` | Database and table-level change tracking DDL operations. |
| `DATABASE.CONVERSATION_PRIORITY` | Service Broker conversation priority operations such as CREATE BROKER PRIORITY. |
| `DATABASE.DDL` | Data definition language (DDL) operations with filegroup operations, such as drop. |
| `DATABASE.ENCRYPTION_SCAN` | TDE encryption synchronization. |
| `DATABASE.PLANGUIDE` | Plan guide synchronization. |
| `DATABASE.RESOURCE_GOVERNOR_DDL` | DDL operations for resource governor operations such as ALTER RESOURCE POOL. |
| `DATABASE.SHRINK` | Database shrink operations. |
| `DATABASE.STARTUP` | Used for database startup synchronization. |
| `FILE.SHRINK` | File shrink operations. |
| `HOBT.BULK_OPERATION` | Heap-optimized bulk load operations with concurrent scan, under these isolation levels: snapshot, read uncommitted, and read committed using row versioning. |
| `HOBT.INDEX_REORGANIZE` | Heap or index reorganization operations. |
| `OBJECT.COMPILE` | Stored procedure compile. |
| `OBJECT.INDEX_OPERATION` | Index operations. |
| `OBJECT.UPDSTATS` | Statistics updates on a table. |
| `METADATA.ASSEMBLY` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ASSEMBLY_CLR_NAME` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ASSEMBLY_TOKEN` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ASYMMETRIC_KEY` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AUDIT` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AUDIT_ACTIONS` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AUDIT_SPECIFICATION` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AVAILABILITY_GROUP` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CERTIFICATE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CHILD_INSTANCE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.COMPRESSED_FRAGMENT` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.COMPRESSED_ROWSET` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSTATION_ENDPOINT_RECV` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSTATION_ENDPOINT_SEND` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSATION_GROUP` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSATION_PRIORITY` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CREDENTIAL` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CRYPTOGRAPHIC_PROVIDER` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DATA_SPACE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DATABASE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DATABASE_PRINCIPAL` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DB_MIRRORING_SESSION` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DB_MIRRORING_WITNESS` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DB_PRINCIPAL_SID` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ENDPOINT` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ENDPOINT_WEBMETHOD` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.EXPR_COLUMN` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.EXPR_HASH` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_CATALOG` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_INDEX` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_STOPLIST` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.INDEX_EXTENSION_SCHEME` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.INDEXSTATS` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.INSTANTIATED_TYPE_HASH` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.MESSAGE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.METADATA_CACHE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PARTITION_FUNCTION` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PASSWORD_POLICY` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PERMISSIONS` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PLAN_GUIDE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PLAN_GUIDE_HASH` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PLAN_GUIDE_SCOPE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.QNAME` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.QNAME_HASH` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.REMOTE_SERVICE_BINDING` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ROUTE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SCHEMA` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SECURITY_CACHE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SECURITY_DESCRIPTOR` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SEQUENCE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVER_EVENT_SESSIONS` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVER_PRINCIPAL` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE_BROKER_GUID` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE_CONTRACT` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE_MESSAGE_TYPE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.STATS` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SYMMETRIC_KEY` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.USER_TYPE` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.XML_COLLECTION` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.XML_COMPONENT` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.XML_INDEX_QNAME` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |

The following table provides the format of the `resource_description` column for each resource type.

| Resource | Format | Description |
| --- | --- | --- |
| `DATABASE` | Not applicable | Database ID is already available in the `resource_database_id` column. |
| `FILE` | `<file_id>` | ID of the file that is represented by this resource. |
| `OBJECT` | `<object_id>` | ID of the object that is represented by this resource. This object can be any object listed in `sys.objects`, not just a table. |
| `PAGE` | `<file_id>:<page_in_file>` | Represents the file and page ID of the page that is represented by this resource. |
| `KEY` | `<hash_value>` | Represents a hash of the key columns from the row that is represented by this resource. |
| `EXTENT` | `<file_id>:<page_in_files>` | Represents the file and page ID of the extent that is represented by this resource. The extent ID is the same as the page ID of the first page in the extent. |
| `RID` | `<file_id>:<page_in_file>:<row_on_page>` | Represents the page ID and row ID of the row that is represented by this resource. If the associated object ID is 99, this resource represents one of the eight mixed page slots on the first IAM page of an IAM chain. |
| `APPLICATION` | `<DbPrincipalId>:<up to 32 characters>:(<hash_value>)` | Represents the ID of the database principal that is used for scoping this application lock resource. Also included are up to 32 characters from the resource string that corresponds to this application lock resource. In certain cases, only two characters can be displayed due to the full string no longer being available. This behavior occurs only at database recovery time for application locks that are reacquired as part of the recovery process. The hash value represents a hash of the full resource string that corresponds to this application lock resource. |
| `HOBT` | Not applicable | `HoBt` ID is included as the `resource_associated_entity_id`. |
| `ALLOCATION_UNIT` | Not applicable | Allocation Unit ID is included as the `resource_associated_entity_id`. |
| `XACT` | `<dbid>:<XdesId low>:<XdesId high>` | The `TID` (transaction ID) resource. Occurs when [optimized locking](../performance/optimized-locking.md) is enabled. |
| `XACT KEY` | `[XACT <dbid>:<XdesId low>:<XdesId High>] KEY (<hash_value>)` | The underlying resource the transaction is waiting on, with an index `KEY` object. Occurs when [optimized locking](../performance/optimized-locking.md) is enabled. |
| `XACT RID` | `[XACT <dbid>:<XdesId low>:<XdesId High>] RID (<file_id>:<page_in_file>:<row_on_page>)` | The underlying resource the transaction is waiting on, with a heap `RID` object. Occurs when [optimized locking](../performance/optimized-locking.md) is enabled. |
| `METADATA.ASSEMBLY` | `assembly_id = A` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ASSEMBLY_CLR_NAME` | `$qname_id = Q` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ASSEMBLY_TOKEN` | `assembly_id = A`, `$token_id` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ASSYMMETRIC_KEY` | `asymmetric_key_id = A` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AUDIT` | `audit_id = A` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AUDIT_ACTIONS` | `device_id = D`, `major_id = M` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AUDIT_SPECIFICATION` | `audit_specification_id = A` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.AVAILABILITY_GROUP` | `availability_group_id = A` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CERTIFICATE` | `certificate_id = C` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CHILD_INSTANCE` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.COMPRESSED_FRAGMENT` | `object_id = O , compressed_fragment_id = C` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.COMPRESSED_ROW` | `object_id = O` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSTATION_ENDPOINT_RECV` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSTATION_ENDPOINT_SEND` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSATION_GROUP` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CONVERSATION_PRIORITY` | `conversation_priority_id = C` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CREDENTIAL` | `credential_id = C` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.CRYPTOGRAPHIC_PROVIDER` | `provider_id = P` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DATA_SPACE` | `data_space_id = D` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DATABASE` | `database_id = D` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DATABASE_PRINCIPAL` | `principal_id = P` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DB_MIRRORING_SESSION` | `database_id = D` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DB_MIRRORING_WITNESS` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.DB_PRINCIPAL_SID` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ENDPOINT` | `endpoint_id = E` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ENDPOINT_WEBMETHOD` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_CATALOG` | `fulltext_catalog_id = F` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_INDEX` | `object_id = O` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.EXPR_COLUMN` | `object_id = O`, `column_id = C` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.EXPR_HASH` | `object_id = O`, `$hash = H` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_CATALOG` | `fulltext_catalog_id = F` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_INDEX` | `object_id = O` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.FULLTEXT_STOPLIST` | `fulltext_stoplist_id = F` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.INDEX_EXTENSION_SCHEME` | `index_extension_id = I` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.INDEXSTATS` | `object_id = O`, `index_id` or `stats_id` = `I` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.INSTANTIATED_TYPE_HASH` | `user_type_id = U`, `hash = H` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.MESSAGE` | `message_id = M` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.METADATA_CACHE` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PARTITION_FUNCTION` | `function_id = F` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PASSWORD_POLICY` | `principal_id = P` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PERMISSIONS` | `class = C` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PLAN_GUIDE` | `plan_guide_id = P` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PLAN_GUIDE_HASH` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.PLAN_GUIDE_SCOPE` | `scope_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.QNAME` | `$qname_id = Q` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.QNAME_HASH` | `$qname_scope_id = Q`, `$qname_hash = H` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.REMOTE_SERVICE_BINDING` | `remote_service_binding_id = R` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.ROUTE` | `route_id = R` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SCHEMA` | `schema_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SECURITY_CACHE` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SECURITY_DESCRIPTOR` | `sd_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SEQUENCE` | `$seq_type = S`, `object_id = O` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVER` | `server_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVER_EVENT_SESSIONS` | `event_session_id = E` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVER_PRINCIPAL` | `principal_id = P` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE` | `service_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE_BROKER_GUID` | `$hash = H1:H2:H3` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE_CONTRACT` | `service_contract_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SERVICE_MESSAGE_TYPE` | `message_type_id = M` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.STATS` | `object_id = O`, `stats_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.SYMMETRIC_KEY` | `symmetric_key_id = S` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.USER_TYPE` | `user_type_id = U` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.XML_COLLECTION` | `xml_collection_id = X` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.XML_COMPONENT` | `xml_component_id = X` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `METADATA.XML_INDEX_QNAME` | `object_id = O`, `$qname_id = Q` | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |

## Examples

### A. Use sys.dm_tran_locks with other tools

The following example works with a scenario in which an update operation is blocked by another transaction. By using `sys.dm_tran_locks` and other tools, information about locking resources is provided.

```sql
USE tempdb;
GO

-- Create test table and index.
CREATE TABLE t_lock
    (
    c1 int, c2 int
    );
GO

CREATE INDEX t_lock_ci on t_lock(c1);
GO

-- Insert values into test table
INSERT INTO t_lock VALUES (1, 1);
INSERT INTO t_lock VALUES (2, 2);
INSERT INTO t_lock VALUES (3, 3);
INSERT INTO t_lock VALUES (4, 4);
INSERT INTO t_lock VALUES (5, 5);
INSERT INTO t_lock VALUES (6, 6);
GO

-- Session 1
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

BEGIN TRAN
    SELECT c1
        FROM t_lock
        WITH(holdlock, rowlock);

-- Session 2
BEGIN TRAN
    UPDATE t_lock SET c1 = 10;
```

The following query displays lock information. The value for `<dbid>` should be replaced with the `database_id` from `sys.databases`.

```sql
SELECT resource_type, resource_associated_entity_id,
    request_status, request_mode,request_session_id,
    resource_description
    FROM sys.dm_tran_locks
    WHERE resource_database_id = <dbid>;
```

The following query returns object information by using `resource_associated_entity_id` from the previous query. This query must be executed while you are connected to the database that contains the object.

```sql
SELECT object_name(object_id), *
    FROM sys.partitions
    WHERE hobt_id=<resource_associated_entity_id> ;
```

The following query shows blocking information.

```sql
SELECT
    t1.resource_type,
    t1.resource_database_id,
    t1.resource_associated_entity_id,
    t1.request_mode,
    t1.request_session_id,
    t2.blocking_session_id
FROM sys.dm_tran_locks as t1
INNER JOIN sys.dm_os_waiting_tasks as t2
    ON t1.lock_owner_address = t2.resource_address;
```

Release the resources by rolling back the transactions.

```sql
-- Session 1
ROLLBACK;
GO

-- Session 2
ROLLBACK;
GO
```

### B. Link session information to operating system threads

The following example returns information that associates a `session_id` with a Windows thread ID. The performance of the thread can be monitored in the Windows Performance Monitor. This query does not return a `session_id` that is currently sleeping.

```sql
SELECT STasks.session_id, SThreads.os_thread_id
FROM sys.dm_os_tasks AS STasks
INNER JOIN sys.dm_os_threads AS SThreads
    ON STasks.worker_address = SThreads.worker_address
WHERE STasks.session_id IS NOT NULL
ORDER BY STasks.session_id;
GO
```

## Related content

- [sys.dm_tran_database_transactions (Transact-SQL)](sys-dm-tran-database-transactions-transact-sql.md)
- [Transaction locking and row versioning guide](../sql-server-transaction-locking-and-row-versioning-guide.md)
- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [Transaction Related Dynamic Management Views and Functions (Transact-SQL)](transaction-related-dynamic-management-views-and-functions-transact-sql.md)
- [SQL Server, Locks object](../performance-monitor/sql-server-locks-object.md)
