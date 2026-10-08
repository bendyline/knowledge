---
title: "sys.sp_adddistributor (Transact-SQL)"
description: Adds an entry in the sys.servers and marks the server entry as a Distributor, storing property information.
author: mashamsft
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 08/18/2026
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "sp_adddistributor"
  - "sp_adddistributor_TSQL"
helpviewer_keywords:
  - "sp_adddistributor"
dev_langs:
  - TSQL
---
# sys.sp_adddistributor (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Creates an entry in the [sys.servers](../system-catalog-views/sys-servers-transact-sql.md) table (if there isn't one), marks the server entry as a Distributor, and stores property information. This stored procedure is executed at the Distributor on the `master` database to register and mark the server as a distributor. In the case of a remote distributor, it's also executed at the Publisher from the `master` database to register the remote distributor.



## Syntax

```syntaxsql
sys.sp_adddistributor
    [ @distributor = ] N'distributor'
    [ , [ @heartbeat_interval = ] heartbeat_interval ]
    [ , [ @password = ] N'password' ]
    [ , [ @from_scripting = ] from_scripting ]
    [ , [ @security_mode = ] security_mode ]
    [ , [ @encrypt_distributor_connection = ] N'encrypt_distributor_connection' ]
    [ , [ @trust_distributor_certificate = ] N'trust_distributor_certificate' ]
    [ , [ @host_name_in_distributor_certificate = ] N'host_name_in_distributor_certificate' ]
    [ , [ @multi_subnet_failover = ] multi_subnet_failover ]
[ ; ]
```

## Arguments

#### [ @distributor = ] N'*distributor*'

The distribution server name. *@distributor* is **sysname**, with no default. This parameter is only used if setting up a remote Distributor. It adds entries for the Distributor properties in the `msdb..MSdistributor` table.

<!--SQL Server 2019 on Linux-->
**Applies to: \>= sql-server-linux-ver15 || >= sql-server-ver15**
> **Note:**  
> Server name can be specified as `<Hostname>,<PortNumber>` for a default instance or `<Hostname>\<InstanceName>,<PortNumber>` for a named instance. Specify the port number for your connection when  SQL Server 
 is deployed on Linux or Windows with a custom port, and the browser service is disabled. The use of custom port numbers for remote distributor applies to  SQL Server 2019 (15.x) 
 and later versions.




#### [ @heartbeat_interval = ] *heartbeat_interval*

The maximum number of minutes that an agent can go without logging a progress message. *@heartbeat_interval* is **int**, with a default of `10` minutes. A  SQL Server 
 Agent job is created that runs on this interval to check the status of the replication agents that are running.

#### [ @password = ] N'*password*'

The password of the **distributor_admin** login. *@password* is **sysname**, with a default of `NULL`. If the password is `NULL` or an empty string, *@password* is reset to a random value. The password must be configured when the first remote distributor is added. **distributor_admin** login and *@password* are stored for linked server entry used for a *@distributor* RPC connection, including local connections. If *@distributor* is local, the password for **distributor_admin** is set to a new value. For Publishers with a remote Distributor, the same value for *@password* must be specified when executing `sp_adddistributor` at both the Publisher and Distributor. [sp_changedistributor_password](sp-changedistributor-password-transact-sql.md) can be used to change the Distributor password.

> **Important:**  
> When possible, prompt users to enter security credentials at runtime. If you must store credentials in a script file, you must secure the file to prevent unauthorized access.

#### [ @from_scripting = ] *from_scripting*

*@from_scripting* is **bit**, with a default of `0`.  Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @security_mode = ] *security_mode*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @encrypt_distributor_connection = ] N'*encrypt_distributor_connection*'

**Applies to:**  SQL Server 2025 (17.x) 
 and later versions.

Determines whether the internal linked server connection from the publisher to distributor is encrypted. The values are mapped to the OLE DB provider's `Encrypt` property. *@encrypt_distributor_connection* is **nvarchar(10)**, and can't be `NULL`.

*@encrypt_distributor_connection* can be one of the following values:

- `mandatory` (default with Microsoft OLE DB provider 19)
- `no` or `false` (default with Microsoft OLE DB provider 18)
- `true` or `yes`
- `optional`
- `strict`

#### [ @trust_distributor_certificate = ] N'*trust_distributor_certificate*'

**Applies to:**  SQL Server 2025 (17.x) 
 and later versions.

Indicates whether the distributor's TLS certificate should be trusted without validation. The value is mapped to the OLE DB provider's `TrustServerCertificate` property, and is typically used in conjunction with the `Mandatory` encryption setting when using self-signed certificates. *@trust_distributor_certificate* is **nvarchar(5)**, and can't be `NULL`.

*@trust_distributor_certificate* can be one of the following values:

- `no` (default)
- `yes`

> **Note:**  
> Secure defaults pertain to the underlying OLEDB provider 19, which enhances security. The option to override the default is less secure than configuring your instance to use a trusted certificate. After overriding the default, you have the option to configure SQL Server to use a certificate, and then use the [sp_changedistributor_property](sp-changedistributor-property-transact-sql.md) stored procedure to set the `trust_distributor_certificate=no` property back to the secure default.


#### [ @host_name_in_distributor_certificate = ] N'*host_name_in_distributor_certificate*'

**Applies to:**  SQL Server 2025 (17.x) 
 and later versions.

Specifies the host name from the Distributor's certificate, when it's different from the Distributor name, such as when the IP address or DNS alias is used as the Distributor name. Leave the *@host_name_in_distributor_certificate* parameter empty if the host name in the certificate matches the Distributor name. *@host_name_in_distributor_certificate* is **nvarchar(255)** of any string value, with a default of `NULL`.

#### [ @multi_subnet_failover = ] *multi_subnet_failover*

**Applies to**:  SQL Server 2025 (17.x) 
 CU 8 and later versions.

Used to pass information for the creation of the dynamic linked server between publisher and remote distributor. *@multi_subnet_failover* is **bit**, with a default of `0`.

Set the parameter value to `1` in replication topologies with a remote distributor accessed through an Always On availability group listener, or a multi-subnet failover cluster instance. This setting helps replication agents reconnect faster after failover and prevents connection timeouts. For more information, see [Connecting with MultiSubnetFailover parameter](../../connect/oledb/features/oledb-driver-for-sql-server-support-for-high-availability-disaster-recovery.md#connecting-with-multisubnetfailover).

- If `0`, the dynamic linked server isn't created with the `MultiSubnetFailover` parameter.
- If `1`, the dynamic linked server is created with the `MultiSubnetFailover` parameter as `1`.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_adddistributor` is used in snapshot replication, transactional replication, and merge replication.

> **Note:**  
> For replication topologies with a remote distributor:
> - [Replication components can fail after an upgrade to SQL Server 2025 for instances with a remote distributor](../../database-engine/breaking-changes-to-database-engine-features-in-sql-server-2025.md#replication-components-fail-after-an-upgrade)
> - [Adding a remote distributor to a SQL Server 2025 publisher can fail](../../database-engine/breaking-changes-to-database-engine-features-in-sql-server-2025.md#adding-a-remote-replication-distributor-fails)


## Examples

[language="sql" source="../replication/codesnippet/tsql/sp-adddistributor-transa_1.sql"::: (complete source file; reference: ../replication/codesnippet/tsql/sp-adddistributor-transa_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/sp-adddistributor-transa_1.sql.md)

### Configure distributor to trust the self-signed certificate

To override the secure default of the OLEDB 19 provider and set `trust_distributor_certificate=yes` so the distributor trusts the self-signed certificate, use the following example:

```sql
EXECUTE sys.sp_adddistributor @trust_distributor_certificate = 'yes';
```

> **Note:**  
> Secure defaults pertain to the underlying OLEDB provider 19, which enhances security. The option to override the default is less secure than configuring your instance to use a trusted certificate. After overriding the default, you have the option to configure SQL Server to use a certificate, and then use the [sp_changedistributor_property](sp-changedistributor-property-transact-sql.md) stored procedure to set the `trust_distributor_certificate=no` property back to the secure default.


For more information, review the [remote distributor breaking change in SQL Server 2025](../../database-engine/breaking-changes-to-database-engine-features-in-sql-server-2025.md#adding-a-remote-replication-distributor-fails).

## Permissions

Only members of the **sysadmin** fixed server role can execute `sp_adddistributor`.

## Related content

- [Configure Publishing and Distribution](../replication/configure-publishing-and-distribution.md)
- [sys.sp_changedistributor_property (Transact-SQL)](sp-changedistributor-property-transact-sql.md)
- [sys.sp_dropdistributor (Transact-SQL)](sp-dropdistributor-transact-sql.md)
- [sys.sp_helpdistributor (Transact-SQL)](sp-helpdistributor-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [Configure Distribution](../replication/configure-distribution.md)
