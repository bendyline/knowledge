---
title: "sys.sp_addlogreader_agent (Transact-SQL)"
description: Adds a Log Reader agent for a given database.
author: mashamsft
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_addlogreader_agent"
  - "sp_addlogreader_agent_TSQL"
helpviewer_keywords:
  - "sp_addlogreader_agent"
dev_langs:
  - "TSQL"
---
# sys.sp_addlogreader_agent (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Adds a Log Reader agent for a given database. This stored procedure is executed at the Publisher on the publication database.

> **Important:**  
> When configuring a Publisher with a remote Distributor, the values supplied for all parameters, including *@job_login* and *@job_password*, are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before executing this stored procedure. For more information, see [Configure SQL Server Database Engine for encrypting connections](../../database-engine/configure-windows/configure-sql-server-encryption.md).



## Syntax

```syntaxsql
sys.sp_addlogreader_agent
    [ [ @job_login = ] N'job_login' ]
    [ , [ @job_password = ] N'job_password' ]
    [ , [ @job_name = ] N'job_name' ]
    [ , [ @publisher_security_mode = ] publisher_security_mode ]
    [ , [ @publisher_login = ] N'publisher_login' ]
    [ , [ @publisher_password = ] N'publisher_password' ]
    [ , [ @publisher = ] N'publisher' ]
    [ , [ @job_security_mode = ] job_security_mode ]
[ ; ]
```

## Arguments

#### [ @job_login = ] N'*job_login*'

The login for the Windows account under which the agent runs. *@job_login* is **nvarchar(257)**, with a default of `NULL`. This Windows account is always used for agent connections to the Distributor. On Azure SQL Managed Instance, use a SQL Server account.

> **Note:**  
> For non- SQL Server 
 Publishers, this must be the same login specified in [sp_adddistpublisher](sp-adddistpublisher-transact-sql.md).

#### [ @job_password = ] N'*job_password*'

The password for the Windows account under which the agent runs. *@job_password* is **sysname**, with a default of `NULL`.

> **Important:**  
> Don't store authentication information in script files. For best security, login names and passwords should be supplied at runtime.

#### [ @job_name = ] N'*job_name*'

The name of an existing agent job. *@job_name* is **sysname**, with a default of `NULL`. This parameter is only specified when the agent is started using an existing job instead of a newly created job (the default).

#### [ @publisher_security_mode = ] *publisher_security_mode*


> **Note:**  
> [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/new-name) was previously known as Azure Active Directory (Azure AD).

The security mode used by the agent when connecting to the Publisher. *@publisher_security_mode* is **smallint**, with a default of `1`. A value of `0` must be specified for non- SQL Server 
 Publishers. The following values define the security mode:

- `0` specifies  SQL Server 
 authentication.
- `1` specifies Windows authentication.
- `2` specifies Microsoft Entra password authentication starting with  SQL Server 2022 (16.x) 
 CU 6.
- `3` specifies Microsoft Entra integrated authentication starting with  SQL Server 2022 (16.x) 
 CU 6.
- `4` specifies Microsoft Entra token authentication starting with  SQL Server 2022 (16.x) 
 CU 6.

#### [ @publisher_login = ] N'*publisher_login*'

The login used when connecting to the Publisher. *@publisher_login* is **sysname**, with a default of `NULL`. *@publisher_login* must be specified when *@publisher_security_mode* is `0`. If *@publisher_login* is `NULL` and *@publisher_security_mode* is `1`, then the Windows account specified in *@job_login* is used when connecting to the Publisher.

#### [ @publisher_password = ] N'*publisher_password*'

The password used when connecting to the Publisher. *@publisher_password* is **sysname**, with a default of `NULL`.

> **Important:**  
> Don't store authentication information in script files. For best security, login names and passwords should be supplied at runtime.

#### [ @publisher = ] N'*publisher*'

The name of the non- SQL Server 
 Publisher. *@publisher* is **sysname**, with a default of `NULL`.

> **Note:**  
> You shouldn't specify this parameter for a  SQL Server 
 Publisher.

#### [ @job_security_mode = ] *job_security_mode*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_addlogreader_agent` is used in transactional replication.

You must execute `sp_addlogreader_agent` to add a Log Reader agent if you upgraded a database that was enabled for replication to this version of  SQL Server 
 before a publication was created that used the database.

## Permissions

Only members of the **sysadmin** fixed server role or the **db_owner** fixed database role can execute `sp_addlogreader_agent`.

## Examples

[language="sql" source="../replication/codesnippet/tsql/sp-addlogreader-agent-tr_1.sql"::: (complete source file; reference: ../replication/codesnippet/tsql/sp-addlogreader-agent-tr_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/sp-addlogreader-agent-tr_1.sql.md)

## Related content

- [Create a publication](../replication/publish/create-a-publication.md)
- [sys.sp_addpublication (Transact-SQL)](sp-addpublication-transact-sql.md)
- [sys.sp_changelogreader_agent (Transact-SQL)](sp-changelogreader-agent-transact-sql.md)
- [Replication stored procedures (Transact-SQL)](replication-stored-procedures-transact-sql.md)
