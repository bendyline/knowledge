---
title: "sp_stop_job (Transact-SQL)"
description: sp_stop_job instructs SQL Server Agent to stop the execution of a job.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_stop_job_TSQL"
  - "sp_stop_job"
helpviewer_keywords:
  - "sp_stop_job"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sp_stop_job (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Instructs  SQL Server 
 Agent to stop the execution of a job.



## Syntax

```syntaxsql
dbo.sp_stop_job
    [ [ @job_name = ] N'job_name' ]
    [ , [ @job_id = ] 'job_id' ]
    [ , [ @originating_server = ] N'originating_server' ]
    [ , [ @server_name = ] N'server_name' ]
[ ; ]
```

## Arguments

#### [ @job_name = ] N'*job_name*'

The name of the job to stop. *@job_name* is **sysname**, with a default of `NULL`.

#### [ @job_id = ] '*job_id*'

The identification number of the job to stop. *@job_id* is **uniqueidentifier**, with a default of `NULL`.

#### [ @originating_server = ] N'*originating_server*'

The name of the originating server. If specified, all multiserver jobs are stopped. *@originating_server* is **sysname**, with a default of `NULL`. Specify this parameter only when calling `sp_stop_job` at a target server.

The [Multi Server Administration (MSX/TSX) feature isn't supported on Azure SQL Managed Instance](https://learn.microsoft.com/azure/sql-database/sql-database-managed-instance-transact-sql-information#sql-server-agent).

> **Note:**  
> Only one of the first three parameters can be specified.

#### [ @server_name = ] N'*server_name*'

The name of the specific target server on which to stop a multiserver job. *@server_name* is **sysname**, with a default of `NULL`. Specify this parameter only when calling `sp_stop_job` at an originating server for a multiserver job.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sp_stop_job` sends a stop signal to the database. Some processes can be stopped immediately and some must reach a stable point (or an entry point to the code path) before they can stop. Some long-running  Transact-SQL  statements such as `BACKUP`, `RESTORE`, and some `DBCC` commands can take a long time to finish. When these commands are running, it might take a while before the job is canceled. Stopping a job causes a "Job Canceled" entry to be recorded in the job history.

If a job is currently executing a step of type **CmdExec** or **PowerShell**, the process being run (for example, MyProgram.exe) is forced to end prematurely. Premature ending can result in unpredictable behavior such as files in use by the process being held open. Thus, `sp_stop_job` should be used only in extreme circumstances if the job contains steps of type **CmdExec** or **PowerShell**.

This stored procedure shares the name of `sp_stop_job` with a similar object for the [Azure Elastic Jobs service for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/elastic-jobs-overview?view=azuresql-db\&preserve-view=true). For information about the elastic jobs version, see [jobs.sp_stop_job (Azure Elastic Jobs)](sp-stop-job-elastic-jobs-transact-sql.md?view=azuresql-db&preserve-view=true).

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


Other users must be granted one of the following  SQL Server 
 Agent fixed database roles in the `msdb` database:

- **SQLAgentUserRole**
- **SQLAgentReaderRole**
- **SQLAgentOperatorRole**

For details about the permissions of these roles, see [SQL Server Agent Fixed Database Roles](https://learn.microsoft.com/ssms/agent/sql-server-agent-fixed-database-roles).

Members of **SQLAgentUserRole** and **SQLAgentReaderRole** can only stop jobs that they own. Members of **SQLAgentOperatorRole** can stop all local jobs, including jobs that are owned by other users. Members of **sysadmin** can stop all local and multiserver jobs.

## Examples

The following example stops a job named `Weekly Sales Data Backup`.

```sql
USE msdb;
GO

EXECUTE dbo.sp_stop_job N'Weekly Sales Data Backup';
GO
```

## Related content

- [sp_delete_job (Transact-SQL)](sp-delete-job-transact-sql.md)
- [sp_help_job (Transact-SQL)](sp-help-job-transact-sql.md)
- [sp_start_job (Transact-SQL)](sp-start-job-transact-sql.md)
- [sp_update_job (Transact-SQL)](sp-update-job-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
