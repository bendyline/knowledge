---
title: "sys.sp_adddistpublisher (Transact-SQL)"
description: "Configures a Publisher to use a specified distribution database."
author: mashamsft
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_adddistpublisher"
  - "sp_adddistpublisher_TSQL"
helpviewer_keywords:
  - "sp_adddistpublisher"
dev_langs:
  - "TSQL"
ms.custom: sfi-ropc-nochange
---
# sys.sp_adddistpublisher (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Configures a Publisher to use a specified distribution database. This stored procedure is executed at the Distributor on any database. The stored procedures [sp_adddistributor](sp-adddistributor-transact-sql.md) and [sp_adddistributiondb](sp-adddistributiondb-transact-sql.md) must have been run prior to using this stored procedure.



## Syntax

```syntaxsql
sys.sp_adddistpublisher
    [ @publisher = ] N'publisher'
    , [ @distribution_db = ] N'distribution_db'
    [ , [ @security_mode = ] security_mode ]
    [ , [ @login = ] N'login' ]
    [ , [ @password = ] N'password' ]
    [ , [ @working_directory = ] N'working_directory' ]
    [ , [ @trusted = ] N'trusted' ]
    [ , [ @encrypted_password = ] encrypted_password ]
    [ , [ @thirdparty_flag = ] thirdparty_flag ]
    [ , [ @publisher_type = ] N'publisher_type' ]
    [ , [ @storage_connection_string = ] N'storage_connection_string' ]
[ ; ]
```

## Arguments

#### [ @publisher = ] N'*publisher*'

The Publisher name. *@publisher* is **sysname**, with no default.

<!--SQL Server 2019 on Linux-->
**Applies to: \>= sql-server-linux-ver15 || >= sql-server-ver15**
> **Note:**  
> Server name can be specified as `<Hostname>,<PortNumber>` for a default instance or `<Hostname>\<InstanceName>,<PortNumber>` for a named instance. Specify the port number for your connection when  SQL Server 
 is deployed on Linux or Windows with a custom port, and the browser service is disabled. The use of custom port numbers for remote distributor applies to  SQL Server 2019 (15.x) 
 and later versions.



#### [ @distribution_db = ] N'*distribution_db*'

The name of the distribution database. *@distribution_db* is **sysname**, with no default. This parameter is used by replication agents to connect to the Publisher.

#### [ @security_mode = ] *security_mode*

The implemented security mode. This parameter is only used by replication agents to connect to the Publisher for queued updating subscriptions or with a non- SQL Server 
 Publisher. *@security_mode* is **int**, and can be one of these values.

| Value | Description |
| --- | --- |
| `0` | Replication agents at the Distributor use  SQL Server |
 | Authentication to connect to the Publisher. |
| `1` (default) | Replication agents at the Distributor use Windows Authentication to connect to the Publisher. |

#### [ @login = ] N'*login*'

The login. This parameter is required if *@security_mode* is `0`. *@login* is **sysname**, with a default of `NULL`. This parameter is used by replication agents to connect to the Publisher.

#### [ @password = ] N'*password*'

The password. *@password* is **sysname**, with a default of `NULL`. This parameter is used by replication agents to connect to the Publisher.

> **Important:**  
> Don't use a blank password. Use a strong password.

#### [ @working_directory = ] N'*working_directory*'

The name of the working directory used to store data and schema files for the publication. *@working_directory* is **nvarchar(255)**, and defaults to the `ReplData` folder for this instance of  SQL Server 
. For example, `C:\Program Files\Microsoft SQL Server\MSSQL\MSSQL.1\ReplData`. The name should be specified in UNC format.

For Azure SQL Database, use `\\<storage_account>.file.core.windows.net\<share>`.

#### [ @trusted = ] N'*trusted*'

*@trusted* is deprecated, and is provided for backward compatibility only. *@trusted* is **nvarchar(5)**, with a default of `false`. Setting this parameter to anything but `false` results in an error.

#### [ @encrypted_password = ] *encrypted_password*

Setting this parameter is no longer supported. *@encrypted_password* is **bit**, with a default of `0`. Setting this parameter to `1` results in an error.

#### [ @thirdparty_flag = ] *thirdparty_flag*

Specifies when the Publisher is  SQL Server 
. *@thirdparty_flag* is **bit**, and can be one of the following values.

| Value | Description |
| --- | --- |
| `0` (default) | SQL Server |
 | database. |
| `1` | Database other than  SQL Server |
| . |

#### [ @publisher_type = ] N'*publisher_type*'

Specifies the Publisher type when the Publisher isn't  SQL Server 
. *@publisher_type* is **sysname**, and can be one of the following values.

| Value | Description |
| --- | --- |
| `MSSQLSERVER` (default) | Specifies a  SQL Server |
 | Publisher. |
| `ORACLE` | Specifies a standard Oracle Publisher. |
| `ORACLE GATEWAY` | Specifies an Oracle Gateway Publisher. |

For more information about the differences between an Oracle Publisher and an Oracle Gateway Publisher, see [Configure an Oracle Publisher](../replication/non-sql/configure-an-oracle-publisher.md).

#### [ @storage_connection_string = ] N'*storage_connection_string*'

Required for Azure SQL Database. *@storage_connection_string* is **nvarchar(255)**, with a default of `NULL`. Use the access key from the Azure portal, under **Storage > Settings**.

> **Note:**  
> Publisher and distributor databases on  Azure SQL Database 
 require [SQL Managed Instance](https://learn.microsoft.com/azure/sql-database/sql-database-managed-instance). For more information, see [Replication to Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database).


## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_adddistpublisher` is used by snapshot replication, transactional replication, and merge replication.

## Examples

[language="sql" source="../replication/codesnippet/tsql/sp-adddistpublisher-tran_1.sql"::: (complete source file; reference: ../replication/codesnippet/tsql/sp-adddistpublisher-tran_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/sp-adddistpublisher-tran_1.sql.md)

## Permissions

Only members of the **sysadmin** fixed server role can execute `sp_adddistpublisher`.

## Related content

- [Configure Publishing and Distribution](../replication/configure-publishing-and-distribution.md)
- [sys.sp_changedistpublisher (Transact-SQL)](sp-changedistpublisher-transact-sql.md)
- [sys.sp_dropdistpublisher (Transact-SQL)](sp-dropdistpublisher-transact-sql.md)
- [sys.sp_helpdistpublisher (Transact-SQL)](sp-helpdistpublisher-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [Configure Distribution](../replication/configure-distribution.md)
