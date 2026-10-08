---
title: Monitor SQL Server
description: Learn about the monitoring capabilities of SQL Server enabled by Azure Arc.
author: lcwright
ms.author: lancewright
ms.reviewer: randolphwest
ms.date: 09/09/2024
ms.topic: how-to
ms.custom:
  - ignite-2023
---

# Monitor SQL Server enabled by Azure Arc (preview)


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

You can monitor 
 SQL Server 
 enabled by Azure Arc by using the performance dashboard in the Azure portal. Performance metrics are automatically collected from dynamic management view (DMV) datasets on eligible instances of 
 SQL Server 
 enabled by Azure Arc. The metrics are then sent to the Azure telemetry pipeline for near real-time processing.

> **Note:**
> As a preview feature, the technology presented in this article is subject to [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).
>
> The latest updates are available in the [release notes for
SQL Server
enabled by Azure Arc](release-notes.md).
>

During the feature preview, monitoring is available for free. Fees for this feature after general availability are to be determined.

To view metrics in the portal:

1. Select an instance of 
 SQL Server 
 enabled by Azure Arc.
1. Select **Monitoring** > **Performance Dashboard**.

Monitoring is automatic, assuming that you meet all prerequisites.

Screenshot of the performance dashboard for SQL Server enabled by Azure Arc.

## Prerequisites

To collect monitoring data for 
 SQL Server 
 enabled by Azure Arc and view the performance metrics in Azure, you must meet the following conditions:

- The version of Azure Extension for SQL Server (`WindowsAgent.SqlServer`) is v1.1.2504.99 or later.
- 
 SQL Server 
 enabled by Azure Arc is running on the Windows operating system.
  -  SQL Server 
 running on  Windows Server 2012 R2 
 and older versions aren't supported.

- 
 SQL Server 
 enabled by Azure Arc is a Standard or Enterprise edition.
- The SQL Server version is 2016 SP1 or later.

- The server has connectivity to `*.<region>.arcdataservices.com`. For more information, see the [network requirements](https://learn.microsoft.com/azure/azure-arc/servers/network-requirements?tabs=azure-cloud).
- The license type on 
 SQL Server 
 enabled by Azure Arc is Software Assurance or pay-as-you-go.
- You have an Azure role with the action `Microsoft.AzureArcData/sqlServerInstances/getTelemetry/`. You can use the following built-in role, which includes this action: *Azure Hybrid Database Administrator - Read Only Service Role*. For more information, see [Azure built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles).

### Current limitations

Failover cluster instances aren't supported at this time.

## Disable or enable collection

### Azure portal

- On the resource page for 
 SQL Server 
 enabled by Azure Arc, select **Performance Dashboard (preview)**.
- At the top of the **Performance Dashboard** pane, select **Configure**.
- On the **Configure monitoring settings** pane, use the toggle to turn off or turn on the collection of monitoring data.
- Select **Apply settings**.

### Azure CLI

To disable the collection of monitoring data for 
 SQL Server 
 enabled by Azure Arc, run the following command in the Azure CLI. Replace the placeholders for subscription ID, resource group, and resource name.

```azurecli
az resource update --ids "/subscriptions/<sub_id>/resourceGroups/<resource_group>/providers/Microsoft.AzureArcData/SqlServerInstances/<resource_name>" --set 'properties.monitoring.enabled=false' --api-version 2023-09-01-preview
```

To enable the collection of monitoring data for 
 SQL Server 
 enabled by Azure Arc, run the following command. Replace the placeholders for subscription ID, resource group, and resource name.

```azurecli
az resource update --ids "/subscriptions/<sub_id>/resourceGroups/<resource_group>/providers/Microsoft.AzureArcData/SqlServerInstances/<resource_name>" --set 'properties.monitoring.enabled=true' --api-version 2023-09-01-preview
```

The command to enable collection might run successfully, but the Azure portal will collect and show monitoring data only if you meet all the [prerequisites](#prerequisites) listed earlier.

## Collected data

The following lists reflect the monitoring data that the Azure portal collects from DMV datasets on 
 SQL Server 
 enabled by Azure Arc when you enable the monitoring feature. The portal doesn't collect any personal data or customer content.


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

- [Use activity logs with SQL Server enabled by Azure Arc](activity-logs.md)
- [Data collection and reporting for SQL Server enabled by Azure Arc](data-collection.md)
- [System dynamic management views and functions](../../relational-databases/system-dynamic-management-objects/system-dynamic-management-objects.md)
