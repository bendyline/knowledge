---
title: Troubleshoot issues with the link
titleSuffix: Azure SQL Managed Instance
description: Learn how to troubleshoot common issues with a link between SQL Server and Azure SQL Managed Instance.
author: djordje-jeremic
ms.author: djjeremi
ms.reviewer: mathoma, danil
ms.date: 06/25/2026
ms.service: azure-sql-managed-instance
ms.subservice: data-movement
ms.custom: 
ms.topic: how-to
---
# Troubleshoot link - Azure SQL Managed Instance



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This article teaches you how to monitor and troubleshoot issues with a [link](managed-instance-link-feature-overview.md) between SQL Server and Azure SQL Managed Instance. 

You can check the state of the link with Transact-SQL (T-SQL), Azure PowerShell or the Azure CLI. If you encounter issues, you can use the error codes to troubleshoot the problem.

Many issues with creating the link can be resolved by [checking the network](#test-network-connectivity) between the two instances, and validating the [environment has been properly prepared](managed-instance-link-preparation.md) for the link. 

## Initial seeding

When establishing a link between SQL Server and Azure SQL Managed Instance, there's an initial seeding phase before data replication starts. The initial seeding phase is the longest and most expensive part of the operation. Once initial seeding completes data is synchronized, and only subsequent data changes are replicated. The time it takes for the initial seeding to complete depends on the size of data, workload intensity on the primary databases, and the speed of the link between networks of the primary and secondary replicas. 

If the speed of the link between the two instances is slower than what is necessary, the time to seed is likely to be noticeably affected. You can use the stated seeding speed, total size of data, and the link speed to estimate how long the initial seeding phase will take before data replication starts. For example, for a single 100-GB database, the initial seed phase would take about 1.2 hours if the link is capable of pushing 84 GB per hour, and if there are no other databases being seeded to a different link. If the link can only transfer 10 GB per hour, then seeding a 100-GB database can take about 10 hours. If there are multiple databases to replicate via multiple links, seeding will be executed in parallel, and, when combined with a slow link speed, the initial seeding phase might take considerably longer, especially if the parallel seeding of data from all databases exceeds the available link bandwidth.

The initial seeding phase isn't resilient to network interruptions and instance maintenance or failover operations. If bi-directional connectivity between SQL Server and SQL Managed Instance is temporarily lost, or if either SQL Server or SQL Managed instance is restarted or failed over during the initial seeding phase, seeding is restarted. 

> **Important:**
> The initial seeding phase can take days with extremely low-speed or busy links. In this case, creating the link can time out. Creating the link is automatically canceled after 6 days. 

## Check link state

If you run into issues with a link, you can use SQL Server Management Studio (SSMS), Transact-SQL (T-SQL), Azure PowerShell or the Azure CLI to get information about the current state of the link.

Use T-SQL for a quick status details of the link state, and then use Azure PowerShell or the Azure CLI for a comprehensive information about the current state of the link. 

### [SQL Server Management Studio (SSMS)](#tab/ssms)

Link monitoring is available starting with SQL Server Management Studio (SSMS) 21.0 (preview).

To check the link state in SSMS, follow these steps: 
1. Connect to a replica that hosts the link. 
1. In **Object Explorer**, expand **Always On High Availability**, and then expand **Availability Groups**.
1. Right-click the name of the link, and then select **Properties** to open the **Link properties** window: 

   Screenshot of the right-click menu on a link in SSMS, with properties highlighted.&#x20;

1. The **Link properties** window displays useful information about the link, such as replica information, link state, and the endpoint certificate expiration date: 


   Screenshot of the link properties window in SSMS.&#x20;

### [Transact-SQL (T-SQL)](#tab/tsql)

Use T-SQL to determine the state of the link during the seeding phase, or after data synchronization begins. The [sys.dm_hadr_physical_seeding_stats](https://learn.microsoft.com/sql/relational-databases/system-dynamic-management-views/sys-dm-hadr-physical-seeding-stats) DMV can be used to track the initial seeding status. The `estimate_time_complete_utc` column is based on the current `transfer_rate_bytes_per_second` and uncompressed remaining data size (when `is_compression_enabled` = 0). For Managed Instance link, data compression is used, so `estimate_time_complete_utc` is expected to be an overestimate.

Use the following T-SQL query to determine the status of the link during the seeding phase on the SQL Server or SQL Managed Instance that hosts the database seeded through the link: 

```sql
SELECT
    ag.local_database_name AS 'Local database name',
    ar.current_state AS 'Current state',
    ar.is_source AS 'Is source',
    ag.internal_state_desc AS 'Internal state desc',
    ag.database_size_bytes / 1024 / 1024 AS 'Database size MB',
    ag.transferred_size_bytes / 1024 / 1024 AS 'Transferred MB',
    ag.transfer_rate_bytes_per_second / 1024 / 1024 AS 'Transfer rate MB/s',
    ag.total_disk_io_wait_time_ms / 1000 AS 'Total Disk IO wait (sec)',
    ag.total_network_wait_time_ms / 1000 AS 'Total Network wait (sec)',
    ag.is_compression_enabled AS 'Compression',
    ag.start_time_utc AS 'Start time UTC',
    ag.estimate_time_complete_utc as 'Estimated time complete UTC',
    ar.completion_time AS 'Completion time',
    ar.number_of_attempts AS 'Attempt No'
FROM sys.dm_hadr_physical_seeding_stats AS ag
    INNER JOIN sys.dm_hadr_automatic_seeding AS ar
    ON local_physical_seeding_id = operation_id

-- Estimated seeding completion time
SELECT DISTINCT CONVERT(VARCHAR(8), DATEADD(SECOND, DATEDIFF(SECOND, start_time_utc, estimate_time_complete_utc) ,0), 108) as 'Estimated complete time'
FROM sys.dm_hadr_physical_seeding_stats
```

If the query returns no results, then the seeding process hasn't started or has already completed.

Use the following T-SQL query on the *primary* instance to check the health of the link once data synchronization begins:

```sql
DECLARE @link_name varchar(max) = '<DAGname>'
SELECT
   rs.synchronization_health_desc [Link sync health]
FROM
   sys.availability_groups ag 
   join sys.dm_hadr_availability_replica_states rs 
   on ag.group_id = rs.group_id 
WHERE 
   rs.is_local = 0 AND rs.role = 2 AND ag.is_distributed = 1 AND ag.name = @link_name 
GO
```

The query returns the following possible values: 

- no result: The query was executed on the secondary instance.
- `HEALTHY`: The link is healthy, and data is being synchronized between the replicas.
- `NOT_HEALTHY`: The link is unhealthy, and data is not synchronizing between the replicas.

### [PowerShell](#tab/powershell)

Use [Get-AzSqlInstanceLink](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlinstancelink) to get link state information with PowerShell. 

Run the following sample code in Azure Cloud Shell or install the [Az.SQL](https://learn.microsoft.com/powershell/module/az.sql) module locally. 

```powershell-interactive
$ManagedInstanceName = "<ManagedInstanceName>" # The name of your linked SQL Managed Instance
$DAGName = "<DAGName>" # distributed availability group name

# Find out the resource group name 
$ResourceGroupName = (Get-AzSqlInstance -InstanceName $ManagedInstanceName).ResourceGroupName 

# Show link state details 
(Get-AzSqlInstanceLink -ResourceGroupName $ResourceGroupName -InstanceName $ManagedInstanceName -Name $DAGName).Databases
```

### [Azure CLI](#tab/azure-cli)

Use [az sql mi link show](https://learn.microsoft.com/cli/azure/sql/mi/link#az-sql-mi-link-show) to get link state information with the Azure CLI.

```azurecli-interactive
# type "az" to use Azure CLI
managedInstanceName = "<ManagedInstanceName>" # The name of your linked SQL Managed Instance
dagName = "<DAGName>" # distributed availability group name
rgName = "<RGName>" # the resource group for the linked SQL Managed Instance  

# Print link state details 
az sql mi link show --resource-group $rgName --instance-name $managedInstanceName --name $dagName  
```

---

The *replicaState* value describes the current link. If the state also includes *Error* then an error occurred during the operation listed in the state. For example, *LinkCreationError* indicates that an error occurred while creating the link.

Some possible *replicaState* values are:  
- *CreatingLink*: Initial seeding
- *LinkSynchronizing*: Data replication is in progress
- *LinkFailoverInProgress*: Failover is in progress

For a complete list of link state properties, review the [Distributed Availability Groups - GET](https://learn.microsoft.com/rest/api/sql/distributed-availability-groups/get?view=rest-sql-2024-05-01-preview\&tabs=HTTP\&preserve-view=true#definitions) REST API command. 

## Planned failover times out

If the secondary replica is unable to keep up with the changes on the primary replica and lags behind, planned failover can time out and fail with an error. 

To resolve this issue, follow these steps: 
1. [Check replication lag](managed-instance-link-best-practices.md#monitor-replication-lag) between the two instances.
1. If replication lag is high, wait for the secondary replica to catch up with the primary replica. You might need to perform additional troubleshooting steps if the lag persists, such as pausing workloads on the primary replica, improving link network throughput between the two instances, or increasing resource capacity on the secondary replica.
   - The easiest way to stop workloads on a SQL Server primary replica is to cut application connections to the instance. 
1. Once the secondary replica has caught up with the primary replica, try planned failover again.

## Errors initializing a link 

The following error can occur when initializing a link (Link state: `LinkInitError`): 

- [Error 41962](https://learn.microsoft.com/sql/relational-databases/errors-events/mssqlserver-41962-database-engine-error): Operation aborted because the link wasn't initiated within 5 minutes. Check [network connectivity](#test-network-connectivity) and try again.
- [Error 41973](https://learn.microsoft.com/sql/relational-databases/errors-events/mssqlserver-41973-database-engine-error): Link can't be established because [endpoint certificate from SQL Server](managed-instance-link-configure-how-to-scripts.md#create-a-certificate-on-sql-server-and-import-its-public-key-to-sql-managed-instance) wasn't imported into Azure SQL Managed Instance correctly. 
- [Error 41974](https://learn.microsoft.com/sql/relational-databases/errors-events/mssqlserver-41974-database-engine-error): Link can't be established because [endpoint certificate from SQL Managed Instance](managed-instance-link-configure-how-to-scripts.md#get-the-certificate-public-key-from-sql-managed-instance-and-import-it-to-sql-server) wasn't imported into SQL Server correctly.
- [Error 41976](https://learn.microsoft.com/sql/relational-databases/errors-events/mssqlserver-41976-database-engine-error): The availability group isn't responding. Check names and configuration parameters and try again.
- [Error 41986](https://learn.microsoft.com/sql/relational-databases/errors-events/mssqlserver-41986-database-engine-error): Link can't be established because the connection failed or the secondary replica isn't responsive. Check names, configuration parameters, and [network connectivity](#test-network-connectivity) and then try again.
- [Error 47521](https://learn.microsoft.com/sql/relational-databases/errors-events/mssqlserver-47521-database-engine-error): Link can't be established because the secondary server didn't receive the request. Make sure the availability group and databases are healthy on the primary server and try again.

## Errors creating a link

The following errors can occur when creating a link (Link state: `LinkCreationError`):

- [Error 41977](https://learn.microsoft.com/sql/relational-databases/errors-events/mssqlserver-41977-database-engine-error): The target database isn't responsive. Check link parameters and try again.
- **Premature log truncation**: If the transaction log is truncated before the initial seeding finishes, you are likely to see one of the following errors: 
   - [Error 1408](https://learn.microsoft.com/sql/relational-databases/errors-events/database-engine-events-and-errors-1000-to-1999): Replication to remote database has failed and cannot be recovered due to a missing log file overlap between the primary and secondary replica. Delete the existing link and create a new link to restart the replication.
   - [Error 1412](https://learn.microsoft.com/sql/relational-databases/errors-events/database-engine-events-and-errors-1000-to-1999): Replication to remote database has failed and cannot be recovered due to a log file size mismatch with the primary replica. Delete the existing link and create a new link to restart the replication.
   
### Error 1412

When you first create a [link](managed-instance-link-feature-overview.md), the first part of the process seeds a full backup of the database from the primary replica to the secondary replica. After seeding of the full backup completes, the link starts to replicate data by applying differential data from the primary replica to the secondary replica. This process continues indefinitely until a failover command is issued, or the link is removed.

If a transaction log backup occurs on the primary replica during initial seeding of the full backup, the transaction log truncates. Link creation fails with error 1412 since the data in the transaction log necessary for initial seeding is no longer available. If you see error 1412 in the SQL Server error log on Azure SQL Managed Instance, then you must [drop](managed-instance-link-configure-how-to-ssms.md#drop-a-link) and recreate the link.

On builds that support it, use [trace flag 12381](#prevent-premature-log-truncation-with-trace-flag-12381) to prevent premature log truncation. On earlier builds, pause transaction log backups during the initial seeding phase.

If transaction log backups are necessary during the initial seeding phase, especially for very large databases, you can choose to [manually prevent log truncation](#manual-prevention-of-log-truncation) or automate the process with a T-SQL script to auto-pause log backups in critical phases, and when it's safe.

#### Prevent premature log truncation with trace flag 12381

On SQL Server builds that support trace flag `12381`, enable it before creating links, especially when seeding large databases or many databases in multiple-database link mode. Errors 1408 or 1412 in the SQL Managed Instance error log during seeding can indicate that required log records were truncated. Use the flag to prevent that truncation when recreating the affected link. It doesn't repair an already failed link or resolve unrelated replication errors.

While the flag is enabled, you can continue taking transaction log backups, but the required log records remain retained and aren't made reusable by log truncation. Log truncation is different from shrinking the physical log file.

> **Warning:**
> Monitor transaction log usage, growth rate, and free disk space on SQL Server while trace flag 12381 is enabled. Retained log records can fill the transaction log or its disk. Disable the flag as soon as seeding finishes for all links being created. Don't leave it enabled for ongoing replication.

Continue regular transaction log backups after seeding finishes. For instructions to enable and disable trace flags, see [DBCC TRACEON](https://learn.microsoft.com/sql/t-sql/database-console-commands/dbcc-traceon-transact-sql) and [DBCC TRACEOFF](https://learn.microsoft.com/sql/t-sql/database-console-commands/dbcc-traceoff-transact-sql).

#### Manual prevention of log truncation

The steps in this section demonstrate how to open a transaction against a dummy table to prevent log truncation during the initial seeding phase. This process requires manual monitoring of the seeding progress, and careful timing to ensure that log truncation is prevented until seeding completes.

1. Monitor seeding progress. You can use the following T-SQL query to monitor the progress of initial seeding:

   ```sql
   SELECT * FROM sys.dm_exec_requests WHERE database_id = @dbId AND command = 'VDI_CLIENT_WORKER'
   ```

1. When seeding nears 90% completion, issue a `BEGIN TRAN` command on a dummy table without a commit keep a transaction open and prevent log truncation. 
1. Carefully monitor transaction log disk space to ensure it doesn't exceed storage capacity while the transaction is open.
1. Once seeding reaches 100%, complete the transaction with `COMMIT TRAN`.

For example, any time before initial seeding reaches 90%, run the following command to create a dummy table for the purpose of avoiding error 1412:

```sql
-- Create table
CREATE TABLE Prevent1412
(
    Id        INT,
    CreatedAt DATETIME
);

```

Then, when seeding nears completion, run the following command to prevent log truncation:

```sql
BEGIN TRAN;

INSERT INTO Prevent1412 (Id, CreatedAt)
VALUES (1, GETDATE());
```

> **Caution:**
> After the transaction begins, the transaction log no longer truncates, so carefully monitor transaction log disk space to ensure it doesn't exceed storage capacity while the transaction is open.

Once seeding completes, you can commit the transaction to truncate the log: 

```sql
COMMIT TRAN;
```

After migration completes, you can drop the dummy table: 

```sql
DROP TABLE Prevent1412;
```

#### Automate auto-pause log backups

Alternatively, you can automate the process to auto-pause log backups in critical phases when it's safe with a T-SQL script. 

The following script can be executed before the migration begins: 

```sql
-- Get last backup date
SELECT TOP 1 @lastBackupTime = b.backup_finish_date
FROM master.sys.sysdatabases d 
LEFT OUTER JOIN msdb..backupSET b
ON b.database_name = d.name
AND b.type = 'L'
WHERE d.name = @dbName
ORDER BY backup_finish_date DESC
SELECT @diffInMins = DATEDIFF(minute, @lastBackupTime, CURRENT_TIMESTAMP);

-- Get database id and group database id
SELECT @agDbId = group_database_id, @dbId = database_id FROM sys.databases WHERE name = @dbName

-- If there is no group database id, no need for checks
IF (@agDbId IS NOT NULL)
BEGIN
              -- Get last seeding start time and check if backup (VDI client) is actually running
              SELECT TOP 1 @seedingStartTime = start_time, @state = current_state, @agDbId = ag_db_id FROM sys.dm_hadr_automatic_seeding ORDER BY start_time DESC

              IF (@state = 'PENDING' OR @state = 'CHECK_IF_SEEDING_NEEDED' OR @state = 'LIMIT_CONCURRENT_BACKUPS')
                             SET @seedingStarting = 1
              ELSE
                             SET @seedingStarting = 0
              
              SELECT @backupWorkers = COUNT(*) FROM sys.dm_exec_requests WHERE database_id = @dbId AND command = 'VDI_CLIENT_WORKER'

              -- Check if seeding is done by looking at remote replica state and health
              SELECT TOP 1 @db_state = synchronization_state_desc, @db_health = synchronization_health_desc FROM sys.dm_hadr_database_replica_states WHERE database_id = @dbId AND is_local = 0

              IF (@db_state = N'SYNCHRONIZING' AND @db_health = N'HEALTHY')
              SET @seedingDone = 1
              ELSE
              SET @seedingDone = 0
END

-- If X minutes has passed since last log backup, do it, we don't want to wait anymore
IF (@alreadyFailed = 1 or @diffInMins > {set_minutes})
BEGIN
              {do_log_backup}
              SET @alreadyFailed = 1
              CONTINUE;
END

-- If seeding has started and finished take log backups
IF ((@agDbId IS NOT NULL) AND (@seedingStartTime IS NOT NULL) AND (@startTime < @seedingStartTime) AND (@seedingDone = 1))
BEGIN
              {do_log_backup}
              SET @alreadyFailed = 1
              CONTINUE;
END

-- If database is not in ag or
-- If seeding has not started or
-- If seeding is ongoing 
-- Take log backups
IF ((@agDbId IS NULL) OR (@seedingStartTime IS NULL) OR (@startTime > @seedingStartTime) OR (@seedingStarting = 1) or (@backupWorkers > 0))
BEGIN
              {do_log_backup}
              CONTINUE;
END
```


## Inconsistent state after forced failover

Following a forced [failover](managed-instance-link-failover-how-to.md), you might encounter a split-brain scenario where both replicas are in the primary role, leaving the link in an inconsistent state. This can happen if you fail over to the secondary replica during a disaster, and then the primary replica comes back online.

First, confirm you're in a split-brain scenario. You can do so by using SQL Server Management Studio (SSMS) or Transact-SQL (T-SQL).

Connect to both SQL Server and SQL managed instance in SSMS, and then in **Object Explorer**, expand **Availability replicas** under the **Availability group** node in **Always On High Availability**. If two different replicas are listed as **(Primary)**, you're in a split-brain scenario. 

Alternatively, you can run the following T-SQL script on *both* SQL Server and SQL Managed Instance to check the role of the replicas:

```sql
-- Execute on SQL Server and SQL Managed Instance 
USE master
DECLARE @link_name varchar(max) = '<DAGName>'
SELECT
   ag.name [Link name], 
   rs.role_desc [Link role] 
FROM
   sys.availability_groups ag 
   JOIN sys.dm_hadr_availability_replica_states rs 
   ON ag.group_id = rs.group_id 
WHERE 
   rs.is_local = 1 AND ag.is_distributed = 1 AND ag.name = @link_name 
GO
```

If both instances list **PRIMARY** in **Link role** column, you're in a split-brain scenario.

To resolve the split brain state, first take a backup on whichever replica was the original primary. If the original primary was SQL Server, then take a [tail log backup](https://learn.microsoft.com/sql/relational-databases/backup-restore/tail-log-backups-sql-server). If the original primary was SQL Managed Instance, then take a [copy-only full backup](https://learn.microsoft.com/sql/relational-databases/backup-restore/copy-only-backups-sql-server). After the backup completes, set the distributed availability group to the secondary role for the replica that used to be the original primary but will now be the new secondary.
 
For example, in the event of a true disaster, assuming you've forced a failover of your SQL Server workload to Azure SQL Managed Instance, and you intend to continue running your workload on SQL Managed Instance, take a tail log backup on SQL Server, and then set the distributed availability group to the secondary role on SQL Server such as the following example:

```sql
--Execute on SQL Server 
USE master
ALTER AVAILABILITY GROUP [<DAGName>] 
SET (ROLE = SECONDARY) 
GO 
```

Next, execute a planned manual failover from SQL Managed Instance to SQL Server by using the link, such as the following example: 

```sql
--Execute on SQL Managed Instance 
USE master
ALTER AVAILABILITY GROUP [<DAGName>] FAILOVER 
GO 
```

## Expired certificate

It's possible for the certificate used for the link to expire. If the certificate expires, the link fails. To resolve this issue, [rotate the certificate](managed-instance-link-best-practices.md#rotate-certificate). 

## Database unavailable after server restart

In rare circumstances, your database might become temporarily unavailable on SQL Managed Instance after a server restart following the failover of the link. This known issue occurs when a link is dropped before Azure completes a full backup of the database after initial failover to SQL Managed Instance.

The database automatically recovers after Microsoft's intervention, but this recovery can take some time.

The following rare sequence of events leads to this issue:
1. You establish a link between SQL Server and SQL Managed Instance. 
1. You fail over the link to SQL Managed Instance, so it becomes the primary replica. 
1. You drop the link - without knowing that Azure didn't complete the first full backup of the database after failover, which is necessary to ensure the database is healthy and fully functional on SQL Managed Instance.
1. The database is initially accessible and available.
1. The server is restarted, such as for maintenance, a planned failover, or due to an unexpected outage.
1. The database becomes unavailable on SQL Managed Instance after the restart until Microsoft mitigates the issue.

To avoid this issue, wait for Azure to complete the first full backup of the database after failover before dropping the link. You can check the status of the backup by querying the `backupset` table in the `msdb` database on SQL Managed Instance by using the following T-SQL query: 

```sql
SELECT TOP (100)
    DB_NAME(DB_ID(bs.database_name)) AS [Database Name],
    CONVERT (BIGINT, bs.backup_size / 1048576) AS [Uncompressed Backup Size (MB)],
    CONVERT (BIGINT, bs.compressed_backup_size / 1048576) AS [Compressed Backup Size (MB)],
    CONVERT (NUMERIC (20, 2),
    CASE
        WHEN bs.compressed_backup_size > 0
        THEN CONVERT (FLOAT, bs.backup_size) / CONVERT (FLOAT, bs.compressed_backup_size)
        ELSE NULL
    END
    ) AS [Compression Ratio],
    bs.is_copy_only,
    -- bs.user_name, -- Applicable only for user-initiated COPY ONLY backups.
    bs.has_backup_checksums,
    DATEDIFF(SECOND, bs.backup_start_date, bs.backup_finish_date) AS [Backup Elapsed Time (sec)],
    bs.backup_finish_date AS [Backup Finish Date],
    bmf.physical_block_size
FROM msdb.dbo.backupset AS bs WITH (NOLOCK)
     INNER JOIN msdb.dbo.backupmediafamily AS bmf WITH (NOLOCK)
         ON bs.media_set_id = bmf.media_set_id
WHERE bs.[type] = 'D'
    -- AND bs.[is_copy_only] = 1  -- If you want to filter out for user initiated COPY ONLY backups.
ORDER BY bs.backup_finish_date DESC
OPTION (RECOMPILE); -- Optimize for ad hoc execution
```

## Known issues after migrating to SQL Managed Instance

Consider the following known issues after migrating to Azure SQL Managed Instance:


### Restore operation failures after migrating to SQL Managed Instance

If you migrate a database to Azure SQL Managed Instance from SQL Server 2019 and later versions with [accelerated database recovery](https://learn.microsoft.com/sql/relational-databases/accelerated-database-recovery-concepts) enabled, but configured with the persistent version store (PVS) set to something other than the `PRIMARY` file group, you can experience restore operation failures on the target SQL managed instance. 

To work around this issue, make sure you set the [persistent version store (PVS) to PRIMARY](https://learn.microsoft.com/sql/relational-databases/accelerated-database-recovery-management#change-the-pvs-filegroup) on the source SQL Server database before you migrate it to SQL Managed Instance. If you already migrated the database without setting the PVS to `PRIMARY`, you can set it on the source SQL Server database, and then re-migrate the database to SQL Managed Instance.

### Unable to use accelerated database recovery after migrating to SQL Managed Instance

Starting with SQL Server 2019, if you migrate a database to Azure SQL Managed Instance, and the source database has [accelerated database recovery](https://learn.microsoft.com/sql/relational-databases/accelerated-database-recovery-concepts) disabled, you can't use accelerated database recovery on the target SQL managed instance. 

To work around this issue, make sure you [enable accelerated database recovery](https://learn.microsoft.com/sql/relational-databases/accelerated-database-recovery-management#enable-accelerated-database-recovery) on the source SQL Server database before you migrate it to SQL Managed Instance. If you already migrated the database without enabling accelerated database recovery, you can enable it on the source SQL Server database, and then re-migrate the database to SQL managed instance.

SQL Server 2017 and earlier versions don't support accelerated database recovery, so this issue doesn't apply to databases migrated from those versions of SQL Server.

### Unable to use Service Broker after migrating to SQL Managed Instance

If you migrate a database to Azure SQL Managed Instance, and [Service Broker is disabled on the source database](https://learn.microsoft.com/sql/database-engine/service-broker/how-to-activate-service-broker-message-delivery-in-databases-transact-sql), you can't use Service Broker on the target SQL managed instance.

To work around this problem, make sure you enable Service Broker on the source SQL Server database before you migrate it to SQL Managed Instance. If you already migrated the database without enabling Service Broker, you can enable it on the source SQL Server database, and then re-migrate the database to SQL Managed Instance.

## Test network connectivity


Bidirectional network connectivity between SQL Server and SQL Managed Instance is necessary for the link to work. After you open ports on the SQL Server side and configure an NSG rule on the SQL Managed Instance side, test connectivity by using either SQL Server Management Studio (SSMS) or Transact-SQL. 

Test the network by creating a temporary SQL Agent job on both SQL Server and SQL Managed Instance to check the connection between the two instances. When you use **Network Checker** in SSMS, the job is automatically created for you, and deleted after the test completes. You need to manually delete the SQL Agent job if you test your network by using T-SQL. 

> **Note:**
> Executing PowerShell scripts by the SQL Server Agent on SQL Server on Linux is not currently supported, so it's not currently possible to execute `Test-NetConnection` from the SQL Server Agent job on SQL Server on Linux.

To use the SQL Agent to test network connectivity, you need the following requirements: 
- The user doing the test must have [permissions to create a job](https://learn.microsoft.com/sql/ssms/agent/configure-a-user-to-create-and-manage-sql-server-agent-jobs) (either as a **sysadmin** or belongs to the SQLAgentOperator role for `msdb`) for both SQL Server and SQL Managed Instance. 
- The SQL Server Agent service must be [running](https://learn.microsoft.com/sql/ssms/agent/start-stop-or-pause-the-sql-server-agent-service) on SQL Server. Since the Agent is on by default on SQL Managed Instance, no additional action is necessary.

Consider the following:
- To avoid false negatives, all firewalls along the network path must allow Internet Control Message Protocol (ICMP) traffic.
- To avoid false positives, all firewalls along the network path must allow traffic on the proprietary SQL Server UCS protocol. Blocking the protocol can lead to a successful connection test, but the link fails to create.
- Advanced firewall setups with packet-level guardrails in place need to be properly configured to properly allow traffic between SQL Server and SQL Managed Instance.


### [SSMS](#tab/ssms)

To test network connectivity between SQL Server and SQL Managed Instance in SSMS, follow these steps: 

1. Connect to the instance that will be the primary replica in SSMS. 
1. In **Object Explorer**, expand databases, and right-click the database you intend to link with the secondary. Select **Tasks** > **Azure SQL Managed Instance link** > **Test Connection** to open the **Network Checker** wizard: 

   Screenshot of object explorer in SSMS, with test connection selected in the database link right-click menu.

1. Select **Next** on the **Introduction** page of the **Network Checker** wizard.
1. If all requirements are met on the **Prerequisites** page, select **Next**. Otherwise resolve any unmet prerequisites, and then select **Re-run Validation**. 
1. On the **Login** page, select **Login** to connect to the other instance that will be the secondary replica. Select **Next**.
1. Check details on the **Specify Network Options** page and provide an IP address, if necessary. Select **Next**.
1. On the **Summary** page, review the actions the wizard takes and then select **Finish** to test the connection between the two replicas. 
1. Review the **Results** page to validate connectivity exists between the two replicas, and then select **Close** to finish. 

### [T-SQL](#tab/tsql)

To use T-SQL to test connectivity, you have to check the connection in both directions. First, test the connection from SQL Server to SQL Managed Instance, and then test the connection from SQL Managed Instance to SQL Server.

### Test connection from SQL Server to SQL Managed Instance

Use SQL Server Agent on SQL Server to run connectivity tests from SQL Server to SQL Managed Instance.

1. Connect to SQL Managed Instance, and run the following script to generate parameters you'll need later:

   ```sql
   SELECT 'DECLARE @serverName NVARCHAR(512) = N''' + value + ''''
   FROM sys.dm_hadr_fabric_config_parameters
   WHERE parameter_name = 'DnsRecordName'
   
   UNION
   
   SELECT 'DECLARE @node NVARCHAR(512) = N''' + NodeName + '.' + Cluster + ''''
   FROM (
       SELECT SUBSTRING(replica_address, 0, CHARINDEX('\', replica_address)) AS NodeName,
           RIGHT(service_name, CHARINDEX('/', REVERSE(service_name)) - 1) AppName,
           JoinCol = 1
       FROM sys.dm_hadr_fabric_partitions fp
       INNER JOIN sys.dm_hadr_fabric_replicas fr
           ON fp.partition_id = fr.partition_id
       INNER JOIN sys.dm_hadr_fabric_nodes fn
           ON fr.node_name = fn.node_name
       WHERE service_name LIKE '%ManagedServer%'
           AND replica_role = 2
   ) t1
   LEFT JOIN (
       SELECT value AS Cluster,
           JoinCol = 1
       FROM sys.dm_hadr_fabric_config_parameters
       WHERE parameter_name = 'ClusterName'
       ) t2
       ON (t1.JoinCol = t2.JoinCol)
   INNER JOIN (
       SELECT [value] AS AppName
       FROM sys.dm_hadr_fabric_config_parameters
       WHERE section_name = 'SQL'
           AND parameter_name = 'InstanceName'
       ) t3
       ON (t1.AppName = t3.AppName)
   
   UNION
   
   SELECT 'DECLARE @port NVARCHAR(512) = N''' + value + ''''
   FROM sys.dm_hadr_fabric_config_parameters
   WHERE parameter_name = 'HadrPort';
   ```

   Results should look like the following sample: 

   ```output
    DECLARE @node NVARCHAR(512) = N'DB123.tr123456.west-us.worker.database.windows.net'
    DECLARE @port NVARCHAR(512) = N'11002'
    DECLARE @serverName NVARCHAR(512) = N'contoso-instance.12345678.database.windows.net'
   ```

   Save the results to use the next steps. Since these parameters can change after any failover, be sure to generate them again, if necessary.

1. Connect to your SQL Server instance. 

1. Open a new query window and paste the following script:

   ```sql
   --START
   -- Parameters section
   DECLARE @node NVARCHAR(512) = N''
   DECLARE @port NVARCHAR(512) = N''
   DECLARE @serverName NVARCHAR(512) = N''
   
   --Script section
   IF EXISTS (
           SELECT job_id
           FROM msdb.dbo.sysjobs_view
           WHERE name = N'TestMILinkConnection'
           )
       EXEC msdb.dbo.sp_delete_job @job_name = N'TestMILinkConnection',
           @delete_unused_schedule = 1
   
   DECLARE @jobId BINARY (16),
       @cmd NVARCHAR(MAX)
   
   EXEC msdb.dbo.sp_add_job @job_name = N'TestMILinkConnection',
       @enabled = 1,
       @job_id = @jobId OUTPUT
   
   SET @cmd = (N'tnc ' + @serverName + N' -port 5022 | select ComputerName, RemoteAddress, TcpTestSucceeded | Format-List')
   
   EXEC msdb.dbo.sp_add_jobstep @job_id = @jobId,
       @step_name = N'Test Port 5022',
       @step_id = 1,
       @cmdexec_success_code = 0,
       @on_success_action = 3,
       @on_fail_action = 3,
       @subsystem = N'PowerShell',
       @command = @cmd,
       @database_name = N'master'
   
   SET @cmd = (N'tnc ' + @node + N' -port ' + @port + ' | select ComputerName, RemoteAddress, TcpTestSucceeded | Format-List')
   
   EXEC msdb.dbo.sp_add_jobstep @job_id = @jobId,
       @step_name = N'Test HADR Port',
       @step_id = 2,
       @cmdexec_success_code = 0,
       @subsystem = N'PowerShell',
       @command = @cmd,
       @database_name = N'master'
   
   EXEC msdb.dbo.sp_add_jobserver @job_id = @jobId,
       @server_name = N'(local)'
   GO
   
   EXEC msdb.dbo.sp_start_job @job_name = N'TestMILinkConnection'
   GO
   
   --Check status every 5 seconds
   DECLARE @RunStatus INT
   
   SET @RunStatus = 10
   
   WHILE (@RunStatus >= 4)
   BEGIN
       SELECT DISTINCT @RunStatus = run_status
       FROM [msdb].[dbo].[sysjobhistory] JH
       INNER JOIN [msdb].[dbo].[sysjobs] J
           ON JH.job_id = J.job_id
       WHERE J.name = N'TestMILinkConnection'
           AND step_id = 0
   
       WAITFOR DELAY '00:00:05';
   END
   
   --Get logs once job completes
   SELECT [step_name],
       SUBSTRING([message], CHARINDEX('TcpTestSucceeded', [message]), CHARINDEX('Process Exit', [message]) - CHARINDEX('TcpTestSucceeded', [message])) AS    TcpTestResult,
       SUBSTRING([message], CHARINDEX('RemoteAddress', [message]), CHARINDEX('TcpTestSucceeded', [message]) - CHARINDEX('RemoteAddress', [message])) AS    RemoteAddressResult,
       [run_status],
       [run_duration],
       [message]
   FROM [msdb].[dbo].[sysjobhistory] JH
   INNER JOIN [msdb].[dbo].[sysjobs] J
       ON JH.job_id = J.job_id
   WHERE J.name = N'TestMILinkConnection'
       AND step_id <> 0
       --END
   ```

1. Replace the `@node`, `@port`, and `@serverName` parameters with the values you got from the first step. 

1. Run the script and check the results. You should see results such as the following example:

   Screenshot that shows the output with the test results in SSMS.

1. Verify the results:

   - The outcome of each test at TcpTestSucceeded should be `TcpTestSucceeded : True`.
   - The RemoteAddresses should belong to the IP range for the SQL Managed Instance subnet.

   If the response is unsuccessful, verify the following network settings:
   - There are rules in both the network firewall *and* the SQL Server host OS (Windows/Linux) firewall that allows traffic to the entire *subnet IP range* of SQL Managed Instance.
   - There's an NSG rule that allows communication on port 5022 for the virtual network that hosts SQL Managed Instance.

### Test connection from SQL Managed Instance to SQL Server

To check that SQL Managed Instance can reach SQL Server, first create a test endpoint. Then you use the SQL Server Agent to run a PowerShell script with the `tnc` command pinging SQL Server on port 5022 from the SQL managed instance.

To create a test endpoint, connect to SQL Server and run the following T-SQL script:

```sql
-- Run on SQL Server
-- Create the certificate needed for the test endpoint
USE MASTER
CREATE CERTIFICATE TEST_CERT
WITH SUBJECT = N'Certificate for SQL Server',
EXPIRY_DATE = N'3/30/2051'
GO

-- Create the test endpoint on SQL Server
USE MASTER
CREATE ENDPOINT TEST_ENDPOINT
    STATE=STARTED
    AS TCP (LISTENER_PORT=5022, LISTENER_IP = ALL)
    FOR DATABASE_MIRRORING (
        ROLE=ALL,
        AUTHENTICATION = CERTIFICATE TEST_CERT,
        ENCRYPTION = REQUIRED ALGORITHM AES
    )
```

To verify that the SQL Server endpoint is receiving connections on port 5022, run the following PowerShell command on the host operating system of your SQL Server instance:

```powershell
tnc localhost -port 5022
```

A successful test shows `TcpTestSucceeded : True`. You can then proceed to create a SQL Server Agent job on the SQL managed instance to try testing the SQL Server test endpoint on port 5022 from the SQL managed instance.

Next, create a SQL Server Agent job on the SQL managed instance called `NetHelper` by running the following T-SQL script on the SQL managed instance. Replace:

- `<SQL_SERVER_IP_ADDRESS>` with the IP address of SQL Server that can be accessed from SQL managed instance.

```sql
-- Run on SQL managed instance
-- SQL_SERVER_IP_ADDRESS should be an IP address that could be accessed from the SQL Managed Instance host machine.
DECLARE @SQLServerIpAddress NVARCHAR(MAX) = '<SQL_SERVER_IP_ADDRESS>'; -- insert your SQL Server IP address in here
DECLARE @tncCommand NVARCHAR(MAX) = 'tnc ' + @SQLServerIpAddress + ' -port 5022 -InformationLevel Quiet';
DECLARE @jobId BINARY(16);

IF EXISTS (
        SELECT *
        FROM msdb.dbo.sysjobs
        WHERE name = 'NetHelper'
        ) THROW 70000,
    'Agent job NetHelper already exists. Please rename the job, or drop the existing job before creating it again.',
    1
    -- To delete NetHelper job run: EXEC msdb.dbo.sp_delete_job @job_name=N'NetHelper'
    EXEC msdb.dbo.sp_add_job @job_name = N'NetHelper',
        @enabled = 1,
        @description = N'Test SQL Managed Instance to SQL Server network connectivity on port 5022.',
        @category_name = N'[Uncategorized (Local)]',
        @owner_login_name = N'sa',
        @job_id = @jobId OUTPUT;

EXEC msdb.dbo.sp_add_jobstep @job_id = @jobId,
    @step_name = N'TNC network probe from SQL MI to SQL Server',
    @step_id = 1,
    @os_run_priority = 0,
    @subsystem = N'PowerShell',
    @command = @tncCommand,
    @database_name = N'master',
    @flags = 40;

EXEC msdb.dbo.sp_update_job @job_id = @jobId,
    @start_step_id = 1;

EXEC msdb.dbo.sp_add_jobserver @job_id = @jobId,
    @server_name = N'(local)';
```

> **Tip:**  
> If you need to modify the IP address of your SQL Server for the connectivity probe from SQL managed instance, delete NetHelper job by running `EXEC msdb.dbo.sp_delete_job @job_name=N'NetHelper'`, and re-create NetHelper job using the previous script.

Then, create a stored procedure `ExecuteNetHelper` that helps run the job, and obtains results from the network probe. Run the following T-SQL script on SQL managed instance:

```sql
-- Run on managed instance
IF EXISTS(SELECT * FROM sys.objects WHERE name = 'ExecuteNetHelper')
    THROW 70001, 'Stored procedure ExecuteNetHelper already exists. Rename or drop the existing procedure before creating it again.', 1
GO
CREATE PROCEDURE ExecuteNetHelper AS
-- To delete the procedure run: DROP PROCEDURE ExecuteNetHelper
BEGIN
    -- Start the job.
    DECLARE @NetHelperstartTimeUtc DATETIME = GETUTCDATE();
    DECLARE @stop_exec_date DATETIME = NULL;

    EXEC msdb.dbo.sp_start_job @job_name = N'NetHelper';

    -- Wait for job to complete and then see the outcome.
    WHILE (@stop_exec_date IS NULL)
    BEGIN
        -- Wait and see if the job has completed.
        WAITFOR DELAY '00:00:01'

        SELECT @stop_exec_date = sja.stop_execution_date
        FROM msdb.dbo.sysjobs sj
        INNER JOIN msdb.dbo.sysjobactivity sja
            ON sj.job_id = sja.job_id
        WHERE sj.name = 'NetHelper'

        -- If job has completed, get the outcome of the network test.
        IF (@stop_exec_date IS NOT NULL)
        BEGIN
            SELECT sj.name JobName,
                sjsl.date_modified AS 'Date executed',
                sjs.step_name AS 'Step executed',
                sjsl.log AS 'Connectivity status'
            FROM msdb.dbo.sysjobs sj
            LEFT JOIN msdb.dbo.sysjobsteps sjs
                ON sj.job_id = sjs.job_id
            LEFT JOIN msdb.dbo.sysjobstepslogs sjsl
                ON sjs.step_uid = sjsl.step_uid
            WHERE sj.name = 'NetHelper'
        END

        -- In case of operation timeout (90 seconds), print timeout message.
        IF (datediff(second, @NetHelperstartTimeUtc, getutcdate()) > 90)
        BEGIN
            SELECT 'NetHelper timed out during the network check. Please investigate SQL Agent logs for more information.'

            BREAK;
        END
    END
END;
```

Run the following query on SQL managed instance to execute the stored procedure that will execute the NetHelper agent job and show the resulting log:

```sql
-- Run on managed instance
EXEC ExecuteNetHelper;
```

If the connection was successful, the log shows `True`. If the connection was unsuccessful, the log shows `False`.

Screenshot that shows the expected output of the NetHelper SQL Agent job.

If the connection was unsuccessful, verify the following items:

- The firewall on the host SQL Server instance allows inbound and outbound communication on port 5022.
- An NSG rule for the virtual network that hosts SQL Managed Instance allows communication on port 5022.
- If your SQL Server instance is on an Azure VM, an NSG rule allows communication on port 5022 on the virtual network that hosts the VM.
- SQL Server is running.
- There exists test endpoint on SQL Server.

After resolving issues, rerun NetHelper network probe again by running `EXEC ExecuteNetHelper` on managed instance.

Finally, after the network test is successful, drop the test endpoint and certificate on SQL Server by using the following T-SQL commands:

```sql
-- Run on SQL Server
DROP ENDPOINT TEST_ENDPOINT;
GO
DROP CERTIFICATE TEST_CERT;
GO
```

---

> **Caution:**  
> Proceed with the next steps only if you've validated network connectivity between your source and target environments. Otherwise, troubleshoot network connectivity issues before proceeding.

## Related content

For more information on the link feature, review the following resources:

- [Managed Instance link overview](managed-instance-link-feature-overview.md)
- [Prepare your environment for Managed Instance link](managed-instance-link-preparation.md)
- [Configure link between SQL Server and SQL Managed instance with scripts](managed-instance-link-configure-how-to-scripts.md)
- [Disaster recovery with Managed Instance link](managed-instance-link-disaster-recovery.md)
- [Best practices for maintaining the link](managed-instance-link-best-practices.md)
