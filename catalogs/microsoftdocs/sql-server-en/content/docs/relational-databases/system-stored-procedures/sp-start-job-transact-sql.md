---
title: "sp_start_job (Transact-SQL)"
description: sp_start_job instructs the SQL Server Agent to execute a job immediately.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_start_job"
  - "sp_start_job_TSQL"
helpviewer_keywords:
  - "sp_start_job"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sp_start_job (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Instructs  SQL Server 
 Agent to execute a job immediately.



## Syntax

```syntaxsql
dbo.sp_start_job
    { [ @job_name = ] N'job_name'
        | [ @job_id = ] 'job_id' }
    [ , [ @error_flag = ] error_flag ]
    [ , [ @server_name = ] N'server_name' ]
    [ , [ @step_name = ] N'step_name' ]
    [ , [ @output_flag = ] output_flag ]
[ ; ]
```

## Arguments

#### [ @job_name = ] N'*job_name*'

The name of the job to start. *@job_name* is **sysname**, with a default of `NULL`.

Either *@job_id* or *@job_name* must be specified, but both can't be specified.

#### [ @job_id = ] '*job_id*'

The identification number of the job to start. *@job_id* is **uniqueidentifier**, with a default of `NULL`.

Either *@job_id* or *@job_name* must be specified, but both can't be specified.

#### [ @error_flag = ] *error_flag*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @server_name = ] N'*server_name*'

The target server on which to start the job. *@server_name* is **sysname**, with a default of `NULL`. *@server_name* must be one of the target servers to which the job is currently targeted.

#### [ @step_name = ] N'*step_name*'

The name of the step at which to begin execution of the job. *@step_name* is **sysname**, with a default of `NULL`. Applies only to local jobs.

#### [ @output_flag = ] *output_flag*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

This stored procedure is in the `msdb` database.

This stored procedure shares the name of `sp_start_job` with a similar object for the [Azure Elastic Jobs service for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/elastic-jobs-overview?view=azuresql-db\&preserve-view=true). For information about the elastic jobs version, see [jobs.sp_start_job (Azure Elastic Jobs)](sp-start-job-elastic-jobs-transact-sql.md?view=azuresql-db&preserve-view=true).

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


Other users must be granted one of the following  SQL Server 
 Agent fixed database roles in the `msdb` database:

- **SQLAgentUserRole**
- **SQLAgentReaderRole**
- **SQLAgentOperatorRole**

For details about the permissions of these roles, see [SQL Server Agent Fixed Database Roles](https://learn.microsoft.com/ssms/agent/sql-server-agent-fixed-database-roles).

Members of **SQLAgentUserRole** and **SQLAgentReaderRole** can only start jobs that they own. Members of **SQLAgentOperatorRole** can start all local jobs, including jobs that are owned by other users. Members of **sysadmin** can start all local and multiserver jobs.

## Examples

The following example starts a job named `Weekly Sales Data Backup`.

```sql
USE msdb;
GO

EXECUTE dbo.sp_start_job N'Weekly Sales Data Backup';
GO
```

## Related content

- [sp_delete_job (Transact-SQL)](sp-delete-job-transact-sql.md)
- [sp_help_job (Transact-SQL)](sp-help-job-transact-sql.md)
- [sp_stop_job (Transact-SQL)](sp-stop-job-transact-sql.md)
- [sp_update_job (Transact-SQL)](sp-update-job-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
