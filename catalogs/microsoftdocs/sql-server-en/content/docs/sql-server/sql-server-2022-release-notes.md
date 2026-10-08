---
title: SQL Server 2022 Release Notes
description: Find information about SQL Server 2022 (16.x) limitations, known issues, help resources, and other release notes.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/23/2026
ms.service: sql
ms.subservice: release-landing
ms.topic: release-notes
monikerRange: ">=sql-server-2017"
---

# SQL Server 2022 release notes


**Applies to:**
 





This article describes requirements, limitations and known issues for  SQL Server 2022 (16.x) 
.

## Hardware and software requirements

For hardware and software requirements, see [Hardware and software requirements for SQL Server 2022](install/hardware-and-software-requirements-for-installing-sql-server-2022.md).

## Known issues

This section identifies known issues you might experience with this product. You can also review the Known Issues section of the [Cumulative Update](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2022/build-versions) articles.

### SQL Setup

#### Help

When you run `setup /HELP`, the information returned doesn't include the new `/AZUREEXTENSION` feature. Complete information for Setup is available at [Install, configure, or uninstall SQL Server on Windows from the command prompt](../database-engine/install-windows/install-sql-server-from-the-command-prompt.md).

#### Localized language interface

In certain localized languages, the Azure Extension configuration screen controls might be partially overwritten or missing. To resolve this issue, expand or maximize the Setup window from the default window sizing.

#### Software Assurance installation parameter

A new Setup command line installation parameter `/PRODUCTCOVEREDBYSA` indicates if the provided product key (`/PID=`) license is covered under a Software Assurance or SQL Server Subscription contract, or just a SQL Server license.

[Install, configure, or uninstall SQL Server on Windows from the command prompt](../database-engine/install-windows/install-sql-server-from-the-command-prompt.md) describes this parameter.

#### Deprecated feature parameters

The following features aren't available in Setup in  SQL Server 2022 (16.x) 
. If specified in command line installations or scripts, these previously supported parameters can fail.



     - `/PolyBaseJava`
     - `/SQL_INST_MR`
     - `/SQL_INST_JAVA`
     - `/SQL_INST_MPY`


     - `/SQLJAVADIR`
     - `/SQL_SHARED_MPY`
     - `/SNAC_SDK`
     - `/SQL_SHARED_MR`


     - `/SDK`
     - `/DREPLAY_CTLR`
     - `/TOOLS`
     - `/DREPLAY_CLT`



#### Restart requirement

When you install an initial  SQL Server 2022 (16.x) 
 instance on a Windows Server 2022 machine, if the computer doesn't have `VCRuntime140` version 14.29.30139 or a later version installed, Setup requires a restart.

Windows Server 2022 was released with VCRuntime version 14.28.29914.

### Query Store for secondary replicas

[Query Store for readable secondary replicas](../relational-databases/performance/query-store-for-secondary-replicas.md) is a preview feature in SQL Server 2022. Query Store for readable secondary replicas isn't supported for use in production environments.

### Known issues with Parameter Sensitive Plan optimization

If you use the [Parameter Sensitive Plan optimization](../relational-databases/performance/parameter-sensitive-plan-optimization.md) feature, review the guidance and mitigation for known issues that can result in exceptions during Query Store cleanup process. For more information, see [Access violation exception occurs in Query Store in SQL Server 2022 under certain conditions](../relational-databases/performance/parameter-sensitive-plan-optimization.md#access-violation-exception-occurs-in-query-store-in-sql-server-2022-under-certain-conditions).

### RPC calls fail with `Encrypt=Strict`

**Applies to**:  SQL Server 2022 (16.x) 
 RTM

An issue in the TDS 8.0 protocol implementation can cause RPC calls to fail if the `Encrypt` option is set to `Strict` in your connection string, for example when running the `sp_who` system stored procedure.

### Availability group replica manager

**Applies to**:  SQL Server 2022 (16.x) 
 RTM

**Error 35221** states that the Always On availability groups replica manager is disabled. This error might be encountered when attempting to add a file to a FILESTREAM filegroup or a memory-optimized filegroup, or when attempting to add additional transaction log files to a database.

The fix for this issue is released in [Cumulative Update 1](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2022/cumulativeupdate1#1993393) for  SQL Server 2022 (16.x) 
.

To work around this issue, you can use trace flag 12324 as either as startup trace flag, or at the session level (using `DBCC TRACEON`).

### SQL Server Agent errors when using contained Availability Group

You might encounter error messages in SQL Server Agent or Database Mail when using contained Availability Group feature of  SQL Server 2022 (16.x) 
.

Review the article [Errors occur after you apply a cumulative update to an instance of SQL Server that has a contained availability group](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2022/errors-apply-cu-contained-availability-group) for details on addressing the issue.

### SQL Server services are set to Automatic (Delayed Start) start mode

In  SQL Server 2022 (16.x) 
, setting the **Start Mode** for a  SQL Server 
 service to *Automatic* in Configuration Manager, configures that service to start in *Automatic (Delayed Start)* mode instead, even though the **Start Mode** shows as *Automatic*.

### MSOLEDBSQL19 and linked servers

Currently, MSOLEDBSQL19 prevents the creation of linked servers without encryption and a trusted certificate (a self-signed certificate is insufficient). If linked servers are required, use the existing supported version of MSOLEDBSQL.

### Linked server queries that use MSDASQL fail with error 7416

**Applies to**:  SQL Server 2022 (16.x) 
 starting with CU 24.


Linked server queries that use the Microsoft OLE DB Provider for ODBC (`MSDASQL`) and specify a provider string (*@provstr*) might fail with the following error:

```output
Msg 7416, Level 16
Access to the remote server is denied because no login-mapping exists.
```

This issue affects logins that aren't members of the **sysadmin** fixed server role. It can occur even when the linked server and login mappings are configured correctly.

In certain linked server configurations that use the `MSDASQL` provider, a stricter connection validation check in the Database Engine can reject connections that were allowed in previous builds.

For more information, see [Linked server queries that use MSDASQL fail with error 7416](https://learn.microsoft.com/troubleshoot/sql/database-engine/linked-servers/msdasql-query-error-7416).


### Transaction log growth for databases with In-Memory OLTP

You might notice excessive growth in the transaction log size for databases with the [In-Memory OLTP](../relational-databases/in-memory-oltp/overview-and-usage-scenarios.md) feature enabled. This might be coupled with `XTP_CHECKPOINT` as `log_reuse_wait_desc` in [sys.databases](../relational-databases/system-catalog-views/sys-databases-transact-sql.md).

For more information, review [Transaction log file grows for databases with In-Memory OLTP in SQL Server 2022](https://learn.microsoft.com/troubleshoot/sql/database-engine/general/transaction-log-file-grows-databases-in-memory-oltp).

### DBCC CHECKDB command reports inconsistency after dropping index

**Applies to**:  SQL Server 2022 (16.x) 
 databases that originated from Azure SQL Managed Instance

You might see the following error when you run the `DBCC CHECKDB` command on a  SQL Server 2022 (16.x) 
 database after you delete an index, or a table with an index, and the database originated from Azure SQL Managed Instance, such as after restoring a backup file, or from the [SQL Managed Instance link feature](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-feature-overview):

```output
Msg 8992, Level 16, State 1, Line <Line_Number>
Check Catalog Msg 3853, State 1: Attribute (%ls) of row (%ls) in sys.sysrowsetrefs does not have a matching row (%ls) in sys.indexes.
```

To work around the issue, first drop the index, or the table with the index, from the source database in Azure SQL Managed Instance, and then restore, or link, the database to  SQL Server 2022 (16.x) 
 again. If recreating the database from the source Azure SQL Managed Instance isn't possible, contact Microsoft support to help resolve this issue.

> **Caution:**  
> If you create a partitioned index on a table after dropping an index as described in this scenario, the table becomes inaccessible.

### Access violations in Windows Server 2025 with LPIM enabled


**Issue**: Under certain configurations on Windows Server 2025,  SQL Server 
 could trigger access violation (AV) dumps if the **Lock pages in memory** (LPIM) Windows policy is enabled.

If you see this text in your error log during system startup, and you can't reproduce these conditions on earlier versions of Windows Server, you might be affected.

```output
Using locked pages in the memory manager.
```

**Workaround**: Disable the **Lock pages in memory** policy for the  SQL Server 
 service account on Windows Server 2025.

For more information and product updates, see [Windows Server 2025 update history](https://support.microsoft.com/servicing/os/windows-server/2024/10/windows-server-2025-update-history).

For more information about LPIM, see [Server memory configuration options](../database-engine/configure-windows/server-memory-server-configuration-options.md).


## Build number

For information about  SQL Server 2022 (16.x) 
 build numbers, see [SQL Server 2022 build versions](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2022/build-versions).

## Related content

- [What's new in SQL Server 2022](what-s-new-in-sql-server-2022.md)
