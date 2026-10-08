---
title: "sys.sp_addpullsubscription_agent (Transact-SQL)"
description: Adds a new scheduled agent job used to synchronize a pull subscription to a transactional publication.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_addpullsubscription_agent"
  - "sp_addpullsubscription_agent_TSQL"
helpviewer_keywords:
  - "sp_addpullsubscription_agent"
dev_langs:
  - "TSQL"
---
# sys.sp_addpullsubscription_agent (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Adds a new scheduled agent job used to synchronize a pull subscription to a transactional publication. This stored procedure is executed at the Subscriber on the subscription database.



## Syntax

```syntaxsql
sys.sp_addpullsubscription_agent
    [ @publisher = ] N'publisher'
    [ , [ @publisher_db = ] N'publisher_db' ]
    , [ @publication = ] N'publication'
    [ , [ @subscriber = ] N'subscriber' ]
    [ , [ @subscriber_db = ] N'subscriber_db' ]
    [ , [ @subscriber_security_mode = ] subscriber_security_mode ]
    [ , [ @subscriber_login = ] N'subscriber_login' ]
    [ , [ @subscriber_password = ] N'subscriber_password' ]
    [ , [ @distributor = ] N'distributor' ]
    [ , [ @distribution_db = ] N'distribution_db' ]
    [ , [ @distributor_security_mode = ] distributor_security_mode ]
    [ , [ @distributor_login = ] N'distributor_login' ]
    [ , [ @distributor_password = ] N'distributor_password' ]
    [ , [ @optional_command_line = ] N'optional_command_line' ]
    [ , [ @frequency_type = ] frequency_type ]
    [ , [ @frequency_interval = ] frequency_interval ]
    [ , [ @frequency_relative_interval = ] frequency_relative_interval ]
    [ , [ @frequency_recurrence_factor = ] frequency_recurrence_factor ]
    [ , [ @frequency_subday = ] frequency_subday ]
    [ , [ @frequency_subday_interval = ] frequency_subday_interval ]
    [ , [ @active_start_time_of_day = ] active_start_time_of_day ]
    [ , [ @active_end_time_of_day = ] active_end_time_of_day ]
    [ , [ @active_start_date = ] active_start_date ]
    [ , [ @active_end_date = ] active_end_date ]
    [ , [ @distribution_jobid = ] distribution_jobid OUTPUT ]
    [ , [ @encrypted_distributor_password = ] encrypted_distributor_password ]
    [ , [ @enabled_for_syncmgr = ] N'enabled_for_syncmgr' ]
    [ , [ @ftp_address = ] N'ftp_address' ]
    [ , [ @ftp_port = ] ftp_port ]
    [ , [ @ftp_login = ] N'ftp_login' ]
    [ , [ @ftp_password = ] N'ftp_password' ]
    [ , [ @alt_snapshot_folder = ] N'alt_snapshot_folder' ]
    [ , [ @working_directory = ] N'working_directory' ]
    [ , [ @use_ftp = ] N'use_ftp' ]
    [ , [ @publication_type = ] publication_type ]
    [ , [ @dts_package_name = ] N'dts_package_name' ]
    [ , [ @dts_package_password = ] N'dts_package_password' ]
    [ , [ @dts_package_location = ] N'dts_package_location' ]
    [ , [ @reserved = ] N'reserved' ]
    [ , [ @offloadagent = ] N'offloadagent' ]
    [ , [ @offloadserver = ] N'offloadserver' ]
    [ , [ @job_name = ] N'job_name' ]
    [ , [ @job_login = ] N'job_login' ]
    [ , [ @job_password = ] N'job_password' ]
    [ , [ @job_security_mode = ] job_security_mode ]
[ ; ]
```

## Arguments

#### [ @publisher = ] N'*publisher*'

The name of the Publisher. *@publisher* is **sysname**, with no default.

<!--SQL Server 2019 on Linux-->
**Applies to: \>= sql-server-linux-ver15 || >= sql-server-ver15**
> **Note:**  
> Server name can be specified as `<Hostname>,<PortNumber>` for a default instance or `<Hostname>\<InstanceName>,<PortNumber>` for a named instance. Specify the port number for your connection when  SQL Server 
 is deployed on Linux or Windows with a custom port, and the browser service is disabled. The use of custom port numbers for remote distributor applies to  SQL Server 2019 (15.x) 
 and later versions.



#### [ @publisher_db = ] N'*publisher_db*'

The name of the Publisher database. *@publisher_db* is **sysname**, with a default of `NULL`. *@publisher_db* is ignored by Oracle Publishers.

#### [ @publication = ] N'*publication*'

The name of the publication. *@publication* is **sysname**, with no default.

#### [ @subscriber = ] N'*subscriber*'

The name of the Subscriber instance or the name of the AG listener if the subscriber database is in an availability group.
*@subscriber* is **sysname**, with a default of `NULL`.

> **Note:**  
> This parameter is deprecated and is maintained for backward compatibility of scripts.


When running `sp_addpullsubscription_agent` for a subscriber that is part of an AG, set *@subscriber* to the AG listener name. If you run  SQL Server 2016 (13.x) 
 and earlier versions, or  SQL Server 2017 (14.x) 
 before CU 16, the stored procedure executes without returning an error, but the *@subscriber* parameter on the [Replication Distribution Agent](../replication/agents/replication-distribution-agent.md) doesn't reference the AG listener name; the parameter is created with the subscriber server name on which the command is executed. To amend this issue, manually update the [Distribution Agent job](../replication/agents/replication-distribution-agent.md#arguments) *@subscriber* parameter with the AG listener name value.

#### [ @subscriber_db = ] N'*subscriber_db*'

The name of the subscription database. *@subscriber_db* is **sysname**, with a default of `NULL`.

> **Note:**  
> This parameter is deprecated and is maintained for backward compatibility of scripts.


#### [ @subscriber_security_mode = ] *subscriber_security_mode*

The security mode to use when connecting to a Subscriber when synchronizing. *@subscriber_security_mode* is **int**, with a default of `NULL`.

- `0` specifies  SQL Server 
 authentication
- `1` specifies Windows authentication

> **Note:**  
> This parameter is deprecated and is maintained for backward compatibility of scripts.
 The Distribution Agent always connects to the local Subscriber using Windows Authentication. If a value other than `NULL` or `1` is specified for this parameter, a warning message is returned.

#### [ @subscriber_login = ] N'*subscriber_login*'

The Subscriber login to use when connecting to a Subscriber when synchronizing. *@subscriber_login* is **sysname**, with a default of `NULL`.

> **Note:**  
> This parameter is deprecated and is maintained for backward compatibility of scripts.
 If a value is specified for this parameter, a warning message is returned, but the value is ignored.


#### [ @subscriber_password = ] N'*subscriber_password*'

The Subscriber password. *@subscriber_password* is required if *@subscriber_security_mode* is set to `0`. *@subscriber_password* is **sysname**, with a default of `NULL`. If a subscriber password is used, it's automatically encrypted.

> **Note:**  
> This parameter is deprecated and is maintained for backward compatibility of scripts.
 If a value is specified for this parameter, a warning message is returned, but the value is ignored.


#### [ @distributor = ] N'*distributor*'

The name of the Distributor. *@distributor* is **sysname**, with a default of the value specified by *@publisher*.

#### [ @distribution_db = ] N'*distribution_db*'

The name of the distribution database. *@distribution_db* is **sysname**, with a default of `NULL`.

#### [ @distributor_security_mode = ] *distributor_security_mode*


> **Note:**  
> [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/new-name) was previously known as Azure Active Directory (Azure AD).

The security mode to use when connecting to a Distributor when synchronizing. *@distributor_security_mode* is **int**, with a default of `1`. The following values define the security mode:

- `0` specifies  SQL Server 
 authentication.
- `1` specifies Windows authentication.
- `2` specifies Microsoft Entra password authentication starting with  SQL Server 2022 (16.x) 
 CU 6.
- `3` specifies Microsoft Entra integrated authentication starting with  SQL Server 2022 (16.x) 
 CU 6.
- `4` specifies Microsoft Entra token authentication starting with  SQL Server 2022 (16.x) 
 CU 6.

> **Important:**  
>  When possible, use Windows authentication. 


#### [ @distributor_login = ] N'*distributor_login*'

The Distributor login to use when connecting to a Distributor when synchronizing. *@distributor_login* is **sysname**, with a default of `NULL`. *@distributor_login* is required if *@distributor_security_mode* is set to `0`.

#### [ @distributor_password = ] N'*distributor_password*'

The Distributor password. *@distributor_password* is required if *@distributor_security_mode* is set to `0`. *@distributor_password* is **sysname**, with a default of `NULL`.

> **Important:**  
>  Do not use a blank password. Use a strong password. 
 When possible, prompt users to enter security credentials at runtime. If you must store credentials in a script file, you must secure the file to prevent unauthorized access.

#### [ @optional_command_line = ] N'*optional_command_line*'

An optional command prompt supplied to the Distribution Agent. For example, `-DefinitionFile C:\Distdef.txt` or `-CommitBatchSize 10`. *@optional_command_line* is **nvarchar(4000)**, with a default of an empty string.

#### [ @frequency_type = ] *frequency_type*

The frequency with which to schedule the Distribution Agent. *@frequency_type* is **int**, and can be one of the following values.

| Value | Description |
| --- | --- |
| `1` | One time |
| `2` (default) | On demand |
| `4` | Daily |
| `8` | Weekly |
| `16` | Monthly |
| `32` | Monthly relative |
| `64` | Autostart |
| `128` | Recurring |

> **Note:**  
> Specifying a value of `64` causes the Distribution Agent to run in continuous mode. This corresponds to setting the `-Continuous` parameter for the agent. For more information, see [Replication Distribution Agent](../replication/agents/replication-distribution-agent.md).

#### [ @frequency_interval = ] *frequency_interval*

The value to apply to the frequency set by *@frequency_type*. *@frequency_interval* is **int**, with a default of `1`.

#### [ @frequency_relative_interval = ] *frequency_relative_interval*

The date of the Distribution Agent. This parameter is used when *@frequency_type* is set to `32` (monthly relative). *@frequency_relative_interval* is **int**, and can be one of the following values.

| Value | Description |
| --- | --- |
| `1` (default) | First |
| `2` | Second |
| `4` | Third |
| `8` | Fourth |
| `16` | Last |

#### [ @frequency_recurrence_factor = ] *frequency_recurrence_factor*

The recurrence factor used by *@frequency_type*. *@frequency_recurrence_factor* is **int**, with a default of `1`.

#### [ @frequency_subday = ] *frequency_subday*

Specifies how often to reschedule during the defined period.
*@frequency_subday* is **int**, and can be one of the following values.

| Value | Description |
| --- | --- |
| `1` (default) | Once |
| `2` | Second |
| `4` | Minute |
| `8` | Hour |

#### [ @frequency_subday_interval = ] *frequency_subday_interval*

The interval for *@frequency_subday*. *@frequency_subday_interval* is **int**, with a default of `1`.

#### [ @active_start_time_of_day = ] *active_start_time_of_day*

The time of day when the Distribution Agent is first scheduled, formatted as `HHmmss`. *@active_start_time_of_day* is **int**, with a default of `0`.

#### [ @active_end_time_of_day = ] *active_end_time_of_day*

The time of day when the Distribution Agent stops being scheduled, formatted as `HHmmss`. *@active_end_time_of_day* is **int**, with a default of `0`.

#### [ @active_start_date = ] *active_start_date*

The date when the Distribution Agent is first scheduled, formatted as `yyyyMMdd`. *@active_start_date* is **int**, with a default of `0`.

#### [ @active_end_date = ] *active_end_date*

The date when the Distribution Agent stops being scheduled, formatted as `yyyyMMdd`. *@active_end_date* is **int**, with a default of `0`.

#### [ @distribution_jobid = ] *distribution_jobid* OUTPUT

The ID of the Distribution Agent for this job. *@distribution_jobid* is an `OUTPUT` parameter of type **binary(16)**, with a default of `NULL`.

#### [ @encrypted_distributor_password = ] *encrypted_distributor_password*

*@encrypted_distributor_password* is **bit**, with a default of `0`.

> **Note:**  
> Setting *@encrypted_distributor_password* is no longer supported. Attempting to set this **bit** parameter to `1` will result in an error.

#### [ @enabled_for_syncmgr = ] N'*enabled_for_syncmgr*'

Specifies whether the subscription can be synchronized through  Microsoft 
 Synchronization Manager. *@enabled_for_syncmgr* is **nvarchar(5)**, with a default of `false`.

- If `false`, the subscription isn't registered with Synchronization Manager.
- If `true`, the subscription is registered with Synchronization Manager and can be synchronized without starting  SQL Server Management Studio 
.

#### [ @ftp_address = ] N'*ftp_address*'

This parameter is deprecated and is maintained for backward compatibility of scripts.


#### [ @ftp_port = ] *ftp_port*

This parameter is deprecated and is maintained for backward compatibility of scripts.


#### [ @ftp_login = ] N'*ftp_login*'

This parameter is deprecated and is maintained for backward compatibility of scripts.


#### [ @ftp_password = ] N'*ftp_password*'

This parameter is deprecated and is maintained for backward compatibility of scripts.


#### [ @alt_snapshot_folder = ] N'*alt_snapshot_folder*'

Specifies the location of the alternate folder for the snapshot. *@alt_snapshot_folder* is **nvarchar(255)**, with a default of `NULL`.

#### [ @working_directory = ] N'*working_directory*'

The name of the working directory used to store data and schema files for the publication. *@working_directory* is **nvarchar(255)**, with a default of `NULL`. The name should be specified in UNC format.

#### [ @use_ftp = ] N'*use_ftp*'

Specifies the use of FTP instead of the regular protocol to retrieve snapshots. *@use_ftp* is **nvarchar(5)**, with a default of `false`.

#### [ @publication_type = ] *publication_type*

Specifies the replication type of the publication. *@publication_type* is **tinyint**, with a default of `0`.

- If `0`, publication is a transaction type.
- If `1`, publication is a snapshot type.
- If `2`, publication is a merge type.

#### [ @dts_package_name = ] N'*dts_package_name*'

Specifies the name of the DTS package. *@dts_package_name* is **sysname**, with a default of `NULL`. For example, to specify a package of `DTSPub_Package`, the parameter would be `@dts_package_name = N'DTSPub_Package'`.

#### [ @dts_package_password = ] N'*dts_package_password*'

Specifies the password on the package, if there is one. *@dts_package_password* is **sysname**, with a default of `NULL`, which means a password isn't on the package.

> **Note:**  
> You must specify a password if *@dts_package_name* is specified.

#### [ @dts_package_location = ] N'*dts_package_location*'

Specifies the package location. *@dts_package_location* is **nvarchar(12)**, with a default of `subscriber`. The location of the package can be `distributor` or `subscriber`.

#### [ @reserved = ] N'*reserved*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @offloadagent = ] N'*offloadagent*'

This parameter is deprecated and is maintained for backward compatibility of scripts.
 If a value is specified for this parameter, a warning message is returned, but the value is ignored.
 Setting *@offloadagent* to a value other than `false` generates an error.

#### [ @offloadserver = ] N'*offloadserver*'

This parameter is deprecated and is maintained for backward compatibility of scripts.
 If a value is specified for this parameter, a warning message is returned, but the value is ignored.
 Setting *@offloadserver* to a value other than `false` generates an error.

#### [ @job_name = ] N'*job_name*'

The name of an existing agent job. *@job_name* is **sysname**, with a default of `NULL`. This parameter is only specified when the subscription is synchronized using an existing job instead of a newly created job (the default). If you aren't a member of the **sysadmin** fixed server role, you must specify *@job_login* and *@job_password* when you specify *@job_name*.

#### [ @job_login = ] N'*job_login*'

The login for the Windows account under which the agent runs. *@job_login* is **nvarchar(257)**, with no default. This Windows account is always used for agent connections to the Subscriber.

#### [ @job_password = ] N'*job_password*'

The password for the Windows account under which the agent runs. *@job_password* is **sysname**, with no default.

> **Important:**  
>  Do not use a blank password. Use a strong password. 
 When possible, prompt users to enter security credentials at runtime. If you must store credentials in a script file, you must secure the file to prevent unauthorized access.

#### [ @job_security_mode = ] *job_security_mode*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_addpullsubscription_agent` is used in snapshot replication and transactional replication.

## Examples

[language="sql" source="../replication/codesnippet/tsql/sp-addpullsubscription-a_1.sql"::: (complete source file; reference: ../replication/codesnippet/tsql/sp-addpullsubscription-a_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/sp-addpullsubscription-a_1.sql.md)

## Permissions

Only members of the **sysadmin** fixed server role or **db_owner** fixed database role can execute `sp_addpullsubscription_agent`.

## Related content

- [Create a Pull Subscription](../replication/create-a-pull-subscription.md)
- [Subscribe to Publications](../replication/subscribe-to-publications.md)
- [sys.sp_addpullsubscription (Transact-SQL)](sp-addpullsubscription-transact-sql.md)
- [sys.sp_change_subscription_properties (Transact-SQL)](sp-change-subscription-properties-transact-sql.md)
- [sys.sp_droppullsubscription (Transact-SQL)](sp-droppullsubscription-transact-sql.md)
- [sys.sp_helppullsubscription (Transact-SQL)](sp-helppullsubscription-transact-sql.md)
- [sys.sp_helpsubscription_properties (Transact-SQL)](sp-helpsubscription-properties-transact-sql.md)
