---
title: Data collection and reporting
description: Explains data that Microsoft collects for reporting for SQL Server enabled by Azure Arc, and how to configure related settings.
author: pochiraju
ms.author: rajpo
ms.reviewer: randolphwest
ms.date: 07/17/2024
ms.topic: concept-article
ms.custom: references_regions
---

# Data collection and reporting for SQL Server enabled by Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

This article describes the data that 
 SQL Server 
 enabled by Azure Arc transmits to Microsoft. Specifically:

- 
 SQL Server 
 enabled by Azure Arc collects usage data as described in this article and at [Monitor Azure Arc-enabled  SQL Server 
](sql-monitoring.md). 
- Azure Connected Machine agent transmits this data to `*.<region>.arcdataservices.com` as outlined in [Connected Machine agent network requirements - URLs](https://learn.microsoft.com/azure/azure-arc/servers/network-requirements#urls).


 SQL Server 
 enabled by Azure Arc does not collect any personally identifiable information (PII) or end-user identifiable information or store any customer data.

## Related products


 SQL Server 
 enabled by Azure Arc uses the following products:

- Azure Arc-enabled servers

## SQL Server enabled by Azure Arc instance

The following data is collected for 
 SQL Server 
 enabled by Azure Arc instances:

| Description | Property name | Property type |
| :--- | :--- | :--- |
| SQL Server edition | `Edition` | `string` |
| Resource ID of the hosting Azure Arc for Servers resource | `ContainerResourceId` | `string` |
| Time when the resource was created | `CreateTime` | `string` |
| The number of logical processors used by the  SQL Server |
 | instance | `VCore` | `string` |
| Cloud connectivity status | `Status` | `string` |
| SQL Server update level | `PatchLevel` | `string` |
| SQL Server collation | `Collation` | `string` |
| SQL Server current version | `CurrentVersion` | `string` |
| SQL Server instance name | `InstanceName` | `string` |
| Dynamic TCP ports used by SQL Server | `TcpDynamicPorts` | `string` |
| Static TCP ports used by SQL Server | `TcpStaticPorts` | `string` |
| SQL Server product ID | `ProductId` | `string` |
| SQL Server |
 | provisioning state | `ProvisioningState` | `string` |

The following JSON document is an example of the  SQL Server 
 - Azure Arc resource

```json
{
    "name": "<server name>",
    "version": "SQL Server 2022",
    "edition": "Enterprise",
    "containerResourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/arc-eastasia/providers/Microsoft.HybridCompute/machines/<server name>",
    "vCore": "8",
    "status": "Connected",
    "patchLevel": "16.0.1000.6",
    "collation": "SQL_Latin1_General_CP1_CI_AS",
    "currentVersion": "16.0.1000.6",
    "instanceName": "<instance name>",
    "tcpDynamicPorts": "61394",
    "tcpStaticPorts": "",
    "productId": "00488-00010-05000-AB944",
    "licenseType": "PAYG",
    "azureDefenderStatusLastUpdated": "2023-02-08T07:57:37.5597421Z",
    "azureDefenderStatus": "Protected",
    "provisioningState": "Succeeded"
}
```

## SQL Server database - Azure Arc

| Description | Property name | Property type |
| :--- | :--- | :--- |
| Database name | `name` | `string` |
| Collation | `collationName` | `string` |
| Database creation date | `databaseCreationDate` | `System.DateTime` |
| Compatibility level | `compatibilityLevel` | `string` |
| Database state | `state` | `string` |
| Readonly mode | `isReadOnly` | `boolean` |
| Recovery mode | `recoveryMode` | `boolean` |
| Auto close enabled | `isAutoCloseOn` | `boolean` |
| Auto shrink enabled | `isAutoShrinkOn` | `boolean` |
| Auto create stats enabled | `isAutoCreateStatsOn` | `boolean` |
| Auto update stats enabled | `isAutoUpdateStatsOn` | `boolean` |
| Remote data archive enabled | `isRemoteDataArchiveEnabled` | `boolean` |
| Memory optimization enabled | `isMemoryOptimizationEnabled` | `boolean` |
| Encryption enabled | `isEncrypted` | `boolean` |
| Trustworthy mode enabled | `isTrustworthyOn` | `boolean` |
| Backup information | `backupInformation` | `object` |
| Provisioning state | `provisioningState` | `string` |

The following JSON document is an example of the  SQL Server 
 database - Azure Arc resource.

```json
{
    "name": "newDb80",
    "collationName": "SQL_Latin1_General_CP1_CI_AS",
    "databaseCreationDate": "2023-01-09T03:40:45Z",
    "compatibilityLevel": 150,
    "state": "Online",
    "isReadOnly": false,
    "recoveryMode": "Full",
    "databaseOptions": {
        "isAutoCloseOn": false,
        "isAutoShrinkOn": false,
        "isAutoCreateStatsOn": true,
        "isAutoUpdateStatsOn": true,
        "isRemoteDataArchiveEnabled": false,
        "isMemoryOptimizationEnabled": true,
        "isEncrypted": false,
        "isTrustworthyOn": false
    },
    "backupInformation": {},
    "provisioningState": "Succeeded"
}
```

## Extension logs

The extension sends logs to Azure about extension events.


The extension log file is at:

   `C:\ProgramData\GuestConfig\extension_logs\Microsoft.AzureData.WindowsAgent.SqlServer\`

The log file name depends on the version Azure Extension for SQL Server, for the latest version of Azure Extension for SQL Server, the log file is:

   `unifiedagent.log`

For extension version `1.1.24724.69` and earlier, the log file is:

   `ExtensionLog_0.log`

## Migration assessment metrics

Migration assessment automatically produces an assessment for migration to Azure. Learn more at [Select the optimal Azure SQL target using Migration assessment - SQL Server enabled by Azure Arc](migration-assessment.md).


- CPU utilization (%)
- Memory utilization (%)
- Read IO/s and Write IO/s (Data and Log files)
- Read MB/s and Write MB/s (Throughput)
- Latency of IO operations
- Total DB size and database file organizations


## Monitoring data

The agent automatically sends SQL Server monitoring data to Azure. You can disable monitoring data that is collected. See [Monitor SQL Server enabled by Azure Arc (preview)](sql-monitoring.md).

The following lists reflect the monitoring data that is collected from DMV datasets on 
 SQL Server 
 enabled by Azure Arc when the monitoring feature is enabled. No personally identifiable information (PII), end-user identifiable information (EUII), or customer content is collected.


### Active sessions

**Description:** Sessions that are running a request, have a blocker, or have an open transaction.

**Dataset name:** *SqlServerActiveSessions*

**Collection frequency:** 30 seconds

**Collected fields:**

- `connection_id`
- `database_id`
- `database_name`
- `machine_name`
- `sample_time_utc`
- `session_id`
- `session_status`
- `sql_server_instance_name`

### CPU utilization

**Description:** CPU utilization over time.

**Dataset name:** *SqlServerCPUUtilization*

**Collection frequency:** 10 seconds

**Collected fields:**

- `avg_cpu_percent`
- `idle_cpu_percent`
- `machine_name`
- `other_process_cpu_percent`
- `process_sample_time_utc`
- `sample_time_utc`
- `sql_process_cpu_percent`
- `sql_server_instance_name`

### Database properties

**Description:** Includes database options and other database metadata.

**Dataset name:** *SqlServerDatabaseProperties*

**Collection frequency:** 5 minutes

**Collected fields:**

- `collation_name`
- `collection_time_utc`
- `compatibility_level`
- `containment_desc`
- `count_suspect_pages`
- `create_date`
- `database_id`
- `database_name`
- `delayed_durability_desc`
- `force_last_good_plan_actual_state`
- `is_accelerated_database_recovery_on`
- `is_auto_create_stats_on`
- `is_auto_shrink_on`
- `is_auto_update_stats_async_on`
- `is_auto_update_stats_on`
- `is_broker_enabled`
- `is_cdc_enabled`
- `is_change_feed_enabled`
- `is_distributor`
- `is_encrypted`
- `is_in_standby`
- `is_ledger_on`
- `is_merge_published`
- `is_parameterization_forced`
- `is_primary_replica`
- `is_published`
- `is_read_committed_snapshot_on`
- `is_read_only`
- `is_subscribed`
- `last_good_checkdb_time`
- `log_reuse_wait_desc`
- `machine_name`
- `notable_db_scoped_configs`
- `page_verify_option_desc`
- `query_store_actual_state_desc`
- `query_store_query_capture_mode_desc`
- `recovery_model_desc`
- `sample_time_utc`
- `snapshot_isolation_state`
- `sql_server_instance_name`
- `state_desc`
- `updateability`
- `user_access_desc`

### Database storage utilization

**Description:** Includes storage usage and the persistent version store.

**Dataset name:** *SqlServerDatabaseStorageUtilization*

**Collection frequency:** 1 minute

**Collected fields:**

- `collection_time_utc`
- `count_data_files`
- `count_log_files`
- `data_size_allocated_mb`
- `data_size_used_mb`
- `database_id`
- `database_name`
- `is_primary_replica`
- `log_size_allocated_mb`
- `log_size_used_mb`
- `machine_name`
- `online_index_version_store_size_mb`
- `persistent_version_store_size_mb`
- `sample_time_utc`
- `sql_server_instance_name`

### Memory utilization

**Description:** Memory clerks and memory consumption by clerks.

**Dataset name:** *SqlServerMemoryUtilization*

**Collection frequency:** 10 seconds

**Collected fields:**

- `machine_name`
- `memory_size_mb`
- `memory_clerk_name`
- `memory_clerk_type`
- `sample_time_utc`
- `sql_server_instance_name`

### Performance counters (common)

**Description:** Includes common performance counters that SQL Server records.

**Dataset name:** *SqlServerPerformanceCountersCommon*

**Collection frequency:** 1 minute

**Collected counters:**

- Active Temp Tables
- Active Transactions
- Background writer pages/sec
- Batch Requests/sec
- Buffer cache hit ratio
- Cache Hit Ratio
- Checkpoint pages/sec
- Errors/sec
- Free Space in tempdb (KB)
- Granted Workspace Memory (KB)
- Latch Waits/sec
- Lazy writes/sec
- Lock Memory (KB)
- Locked page allocations (KB)
- Log Bytes Flushed/sec
- Log Flushes/sec
- Logical Connections
- Logins/sec
- Logouts/sec
- Number of Deadlocks/sec
- OS available physical memory (KB)
- Out of memory count
- Page life expectancy
- Page reads/sec
- Page writes/sec
- Process physical memory in use (KB)
- Process physical memory low
- Processes blocked
- Readahead pages/sec
- SQL Attention rate
- SQL Compilations/sec
- SQL Re-Compilations/sec
- System memory signal state high
- System memory signal state low
- Target Server Memory (KB)
- Temp Tables Creation Rate
- Total Server Memory (KB)
- Transactions/sec
- User Connections
- Write Transactions/sec

### Performance counters (detailed)

**Description:** Includes detailed performance counters that SQL Server records.

**Dataset name:** *SqlServerPerformanceCountersDetailed*

**Collection frequency:** 1 minute

**Collected counters:**

- Average Wait Time (ms)
- Backup/Restore Throughput/sec
- Bulk Copy Rows/sec
- Bulk Copy Throughput/sec
- Cache Object Counts
- Connection Memory (KB)
- Data File Size (KB)
- Database pages
- Errors/sec
- Failed Auto-Params/sec
- Free list stalls/sec
- Large page allocations (KB)
- Local node page lookups/sec
- Lock Timeouts (timeout > 0)/sec
- Log File Size (KB)
- Log File Used Size (KB)
- Log Flush Wait Time
- Log Growths
- Log Shrinks
- Optimizer Memory (KB)
- Page lookups/sec
- Percent Log Used
- Process virtual memory low
- Remote node page lookups/sec
- Shrink Data Movement Bytes/sec
- Temp Tables For Destruction
- Version Cleanup rate (KB/s)
- Version Generation rate (KB/s)
- Version Store Size (KB)
- XTP Memory Used (KB)

### Storage I/O

**Description:** Includes cumulative input/output per second (IOPS), throughput, and latency statistics.

**Dataset name:** *SqlServerStorageIO*

**Collection frequency:** 10 seconds

**Collected fields:**

- `database_id`
- `database_name`
- `file_id`
- `file_max_size_mb`
- `file_size_mb`
- `file_type`
- `io_stall_queued_read_ms`
- `io_stall_queued_write_ms`
- `io_stall_read_ms`
- `io_stall_write_ms`
- `machine_name`
- `num_of_bytes_read`
- `num_of_bytes_written`
- `num_of_reads`
- `num_of_writes`
- `sample_time_utc`
- `size_on_disk_bytes`
- `sql_server_instance_name`

### Wait statistics

> **Note:**  
> Wait statistics can't be visualized on the performance dashboard at this time.

**Description:** Includes wait types and wait statistics for the database engine instance.

**Dataset name:** *SqlServerWaitStats*

**Collection frequency:** 10 seconds

**Collected fields:**

- `machine_name`
- `max_wait_time_ms`
- `resource_wait_time_ms`
- `sample_time_utc`
- `signal_wait_time_ms`
- `sql_server_instance_name`
- `wait_category`
- `wait_time_ms`
- `wait_type`
- `waiting_tasks_count`


## Related content

- [Deployment options for SQL Server enabled by Azure Arc](deployment-options.md)
- [Protect SQL Server with Microsoft Defender for Cloud](configure-advanced-data-security.md)
- [Configure best practices assessment for SQL Server enabled by Azure Arc](assess.md)
