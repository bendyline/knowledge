---
title: "Configure read-scale for an availability group"
description: "Learn how to configure your SQL Server Always On availability group for read-scale workloads on Windows."
author: MashaMSFT
ms.author: mathoma
ms.date: 05/24/2018
ms.service: sql
ms.subservice: availability-groups
ms.topic: how-to
---
# Configure read-scale for an Always On availability group


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

You can configure a SQL Server Always On availability group for read-scale workloads on Windows. There are two types of architecture for availability groups:
* An architecture for high availability that uses a cluster manager to provide improved business continuity and that can include readable-secondary replicas. To create this high-availability architecture, see [Create and configure availability groups on Windows](creation-and-configuration-of-availability-groups-sql-server.md). 
* An architecture that supports only read-scale workloads. 

This article explains how to create an availability group without a cluster manager for read-scale workloads. This architecture provides read-scale only. It doesn't provide high availability.

>**Note:**
>An availability group with `CLUSTER_TYPE = NONE` can include replicas that are hosted on a variety of operating system platforms. It cannot support high availability. For the Linux operating system, see [Configure a SQL Server availability group for read-scale on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-availability-group-configure-rs.md).


## Prerequisites

Before you create the availability group, you need to:

- Set your environment so that all the servers that will host availability replicas can communicate.
- Install SQL Server. See [SQL Server installation guide](../../install-windows/install-sql-server.md) for details.

## Enable Always On availability groups and restart mssql-server

> **Note:**  
> The following command utilizes cmdlets from the sqlserver module that's published in the PowerShell Gallery. You can install this module by using the `Install-Module` command.

Enable Always On availability groups on each replica that hosts a SQL Server instance. Then restart the SQL Server service. Run the following command to enable and then restart the SQL Server services:

```powershell
Enable-SqlAlwaysOn -ServerInstance <server\instance> -Force
```

## Enable an AlwaysOn_health event session

To help with root-cause diagnosis when you troubleshoot an availability group, you can optionally enable an Always On availability groups extended events (XEvents) session. To do so, run the following command on each instance of SQL Server:

```sql
ALTER EVENT SESSION AlwaysOn_health ON SERVER WITH (STARTUP_STATE = ON);
GO
```

For more information about this XEvents session, see [Configure Extended Events for availability groups](always-on-extended-events.md).

## Database-mirroring endpoint authentication

For synchronization to function properly, the replicas that are involved in the read-scale availability group need to authenticate over the endpoint. The two main scenarios that you can use for such authentication are covered in the next sections.

### Service account

In an Active Directory environment where all secondary replicas are joined to the same domain, SQL Server can authenticate by utilizing the service account. You must explicitly create a login for the service account on each SQL Server instance:

```sql
CREATE LOGIN [<domain>\service account] FROM WINDOWS;
```

### SQL login authentication

In environments where the secondary replicas might not be joined to an Active Directory domain, you must utilize SQL authentication. The following Transact-SQL script creates a login named `dbm_login` and a user named `dbm_user`. Replace `<password>` with a valid password. To create the database-mirroring endpoint user, run the following command on all SQL Server instances.

```sql
CREATE LOGIN dbm_login WITH PASSWORD = '<password>';
CREATE USER dbm_user FOR LOGIN dbm_login;
```

#### Certificate authentication

If you utilize a secondary replica that requires authentication with SQL authentication, use a certificate for authenticating between the mirroring endpoints.

The following Transact-SQL script creates a master key and a certificate. It then backs up the certificate and secures the file with a private key. Update the script with strong passwords. Run the script on the primary SQL Server instance to create the certificate:

```sql
CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<dmk-password>';
CREATE CERTIFICATE dbm_certificate WITH SUBJECT = 'dbm';

BACKUP CERTIFICATE dbm_certificate
TO FILE = 'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\dbm_certificate.cer'
    WITH PRIVATE KEY (
        FILE = 'c:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\dbm_certificate.pvk',
        ENCRYPTION BY PASSWORD = '<private-key-password>'
    );
```

At this point, your primary SQL Server replica has a certificate at `c:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\dbm_certificate.cer` and a private key at `c:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\dbm_certificate.pvk`. Copy these two files to the same location on all servers that will host availability replicas.

On each secondary replica, ensure that the service account for the SQL Server instance has permissions to access the certificate.

#### Create the certificate on secondary servers

The following Transact-SQL script creates a master key and a certificate from the backup that you created on the primary SQL Server replica. The command also authorizes users to access the certificate. Update the script with strong passwords. The decryption password is the same password that you used to create the *.pvk* file in a previous step. To create the certificate, run the following script on all secondary replicas:

```sql
CREATE MASTER KEY ENCRYPTION BY PASSWORD= '<dmk-password>';

CREATE CERTIFICATE dbm_certificate
    AUTHORIZATION dbm_user
    FROM FILE = 'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\dbm_certificate.cer'
    WITH PRIVATE KEY (
        FILE = 'c:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\dbm_certificate.pvk',
        DECRYPTION BY PASSWORD = '<private-key-password>'
    );
```

## Create database-mirroring endpoints on all replicas

Database-mirroring endpoints use the Transmission Control Protocol (TCP) to send and receive messages between the server instances that participate in database-mirroring sessions or host availability replicas. The database-mirroring endpoint listens on a unique TCP port number.

The following Transact-SQL script creates a listening endpoint named `Hadr_endpoint` for the availability group. It starts the endpoint and gives connection permission to the service account or SQL login that you created in a previous step. Before you run the script, replace the values between `< ... >`. Optionally you can include an IP address, `LISTENER_IP = (0.0.0.0)`. The listener IP address must be an IPv4 address. You can also use `0.0.0.0`.

Update the following Transact-SQL script for your environment on all SQL Server instances:

```sql
CREATE ENDPOINT [Hadr_endpoint]
    AS TCP (LISTENER_PORT = **<5022>**)
    FOR DATABASE_MIRRORING (
        ROLE = ALL,
        AUTHENTICATION = CERTIFICATE dbm_certificate,
        ENCRYPTION = REQUIRED ALGORITHM AES
    );
ALTER ENDPOINT [Hadr_endpoint] STATE = STARTED;
GRANT CONNECT ON ENDPOINT::[Hadr_endpoint] TO [<service account or user>];
```

The TCP port on the firewall must be open for the listener port.

For more information, see [The database mirroring endpoint (SQL Server)](../../database-mirroring/the-database-mirroring-endpoint-sql-server.md).


## Create an availability group

Create an availability group. Set `CLUSTER_TYPE = NONE`. In addition, set each replica with `FAILOVER_MODE = NONE`. Client applications that run analytics or reporting workloads can directly connect to the secondary databases. You can also create a read-only routing list. Connections to the primary replica forward read connection requests to each of the secondary replicas from the routing list in a round-robin fashion.

The following Transact-SQL script creates an availability group named `ag1`. The script configures the availability group replicas with `SEEDING_MODE = AUTOMATIC`. This setting causes SQL Server to automatically create the database on each secondary server after it is added to the availability group. 

Update the following script for your environment. Replace the `<node1>` and `<node2>` values with the names of the SQL Server instances that host the replicas. Replace the `<5022>` value with the port that you set for the endpoint. Run the following Transact-SQL script on the primary SQL Server replica:

```sql
CREATE AVAILABILITY GROUP [ag1]
    WITH (CLUSTER_TYPE = NONE)
    FOR REPLICA ON
        N'<node1>' WITH (
            ENDPOINT_URL = N'tcp://<node1>:<5022>',
		    AVAILABILITY_MODE = ASYNCHRONOUS_COMMIT,
		    FAILOVER_MODE = MANUAL,
		    SEEDING_MODE = AUTOMATIC,
                    SECONDARY_ROLE (ALLOW_CONNECTIONS = ALL)
		    ),
        N'<node2>' WITH (
		    ENDPOINT_URL = N'tcp://<node2>:<5022>',
		    AVAILABILITY_MODE = ASYNCHRONOUS_COMMIT,
		    FAILOVER_MODE = MANUAL,
		    SEEDING_MODE = AUTOMATIC,
		    SECONDARY_ROLE (ALLOW_CONNECTIONS = ALL)
		    );

ALTER AVAILABILITY GROUP [ag1] GRANT CREATE ANY DATABASE;
```

### Join secondary SQL Server instances to the availability group

The following Transact-SQL script joins a server to an availability group named `ag1`. Update the script for your environment. To join the availability group, run the following Transact-SQL script on each secondary SQL Server replica:

```sql
ALTER AVAILABILITY GROUP [ag1] JOIN WITH (CLUSTER_TYPE = NONE);

ALTER AVAILABILITY GROUP [ag1] GRANT CREATE ANY DATABASE;
```


## Add a database to the availability group

Ensure that the database you add to the availability group is in the full recovery model and has a valid log backup. If the database is a test database or a newly created database, take a database backup. To create and back up a database called `db1`, run the following Transact-SQL script on the primary SQL Server instance:

```sql
CREATE DATABASE [db1];
ALTER DATABASE [db1] SET RECOVERY FULL;
BACKUP DATABASE [db1]
   TO DISK = N'c:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\Backup\db1.bak';
```

To add a database called `db1` to an availability group called `ag1`, run the following Transact-SQL script on the primary SQL Server replica:

```sql
ALTER AVAILABILITY GROUP [ag1] ADD DATABASE [db1];
```

### Verify that the database is created on the secondary servers

To see whether the `db1` database was created and is synchronized, run the following query on each secondary SQL Server replica:

```sql
SELECT * FROM sys.databases WHERE name = 'db1';
GO
SELECT DB_NAME(database_id) AS 'database', synchronization_state_desc FROM sys.dm_hadr_database_replica_states;
```


This availability group isn't a high-availability configuration. If you need high availability, follow the instructions at [Configure an Always On availability group for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-availability-group-configure-ha.md) or [Creation and Configuration of availability groups on Windows](creation-and-configuration-of-availability-groups-sql-server.md).

## Connect to read-only secondary replicas

You can connect to read-only secondary replicas in either of two ways:
* Applications can connect directly to the SQL Server instance that hosts the secondary replica and query the databases. For more information, see [Readable secondary replicas](active-secondaries-readable-secondary-replicas-always-on-availability-groups.md).
* Applications can also use read-only routing, which requires a listener. If you are deploying a read-scale scenario without a cluster manager, you can still create a listener that points to the IP address of the current primary replica and the same port as SQL Server listens on. You will need to recreate the listener to point to the new primary IP address after a failover. For more information, see [Read-only routing](listeners-client-connectivity-application-failover.md#ConnectToSecondary).

## Fail over the primary replica on a read-scale availability group

Each availability group has only one primary replica. The primary replica allows reads and writes. To change which replica is primary, you can fail over. In a typical availability group, the cluster manager automates the failover process. In an availability group with cluster type NONE, the failover process is manual.

There are two ways to fail over the primary replica in an availability group with cluster type NONE:

- Manual failover without data loss
- Forced manual failover with data loss


### Manual failover without data loss

Use this method when the primary replica is available, but you need to temporarily or permanently change which instance hosts the primary replica.
To avoid potential data loss, before you issue the manual failover, ensure that the target secondary replica is up to date.

To manually fail over without data loss:

1. Make the current primary and target secondary replica `SYNCHRONOUS_COMMIT`.

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] 
        MODIFY REPLICA ON N'<node2>' 
        WITH (AVAILABILITY_MODE = SYNCHRONOUS_COMMIT);
   ```

1. To identify that active transactions are committed to the primary replica and at least one synchronous secondary replica, run the following query:

   ```SQL
   SELECT ag.name, 
      drs.database_id, 
      drs.group_id, 
      drs.replica_id, 
      drs.synchronization_state_desc, 
      ag.sequence_number
   FROM sys.dm_hadr_database_replica_states drs, sys.availability_groups ag
   WHERE drs.group_id = ag.group_id; 
   ```

   The secondary replica is synchronized when `synchronization_state_desc` is `SYNCHRONIZED`.

1. Update `REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT` to 1.

   The following script sets `REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT` to 1 on an availability group named `ag1`. Before you run the following script, replace `ag1` with the name of your availability group:

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] 
        SET (REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT = 1);
   ```

   This setting ensures that every active transaction is committed to the primary replica and at least one synchronous secondary replica.
   >**Note:**
   >This setting is not specific to failover and should be set based on the requirements of the environment.

1. Set the primary replica and the secondary replica(s) not participating in the failover offline to prepare for the role change: 

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] OFFLINE
   ```

1. Promote the target secondary replica to primary.

   ```SQL
   ALTER AVAILABILITY GROUP AGRScale FORCE_FAILOVER_ALLOW_DATA_LOSS; 
   ```

1. Update the role of the old primary and other secondaries to `SECONDARY`, run the following command on the SQL Server instance that hosts the old primary replica:

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] 
        SET (ROLE = SECONDARY); 
   ```

   > **Note:**
   > To delete an availability group, use [DROP AVAILABILITY GROUP](../../../t-sql/statements/drop-availability-group-transact-sql.md). For an availability group that's created with cluster type NONE or EXTERNAL, execute the command on all replicas that are part of the availability group.

1. Resume data movement, run the following command for every database in the availability group on the SQL Server instance that hosts the primary replica:

   ```SQL
   ALTER DATABASE [db1]
        SET HADR RESUME
   ```

1. Re-create any listener you created for read-scale purposes and that isn't managed by a cluster manager. If the original listener points to the old primary, drop it and re-create it to point to the new primary.

### Forced manual failover with data loss

If the primary replica is not available and can't immediately be recovered, then you need to force a failover to the secondary replica with data loss. However, if the original primary replica recovers after failover, it will assume the primary role. To avoid having each replica be in a different state, remove the original primary from the availability group after a forced failover with data loss. Once the original primary comes back online, remove the availability group from it entirely. 

To force a manual failover with data loss from primary replica N1 to secondary replica N2, follow these steps: 

1. On the secondary replica (N2), initiate the forced failover: 

    ```SQL
    ALTER AVAILABILITY GROUP [AGRScale] FORCE_FAILOVER_ALLOW_DATA_LOSS;
    ```
    
1. On the new primary replica (N2), remove the original primary (N1): 

    ```SQL
    ALTER AVAILABILITY GROUP [AGRScale]
    REMOVE REPLICA ON N'N1';
    ```
    
1. Validate that all application traffic is pointed to the listener and/or the new primary replica. 
1. If the original primary (N1) comes online, immediately take availability group AGRScale offline on the original primary (N1):

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] OFFLINE
   ```
1. If there is data or unsynchronized changes, preserve this data via backups or other data replicating options that suit your business needs.     
1. Next, remove the availability group from the original primary (N1):

    ```SQL
    DROP AVAILABILITY GROUP [AGRScale];
    ```
1. Drop the availability group database on original primary replica (N1): 

    ```SQL
    USE [master]
    GO
    DROP DATABASE [AGDBRScale]
    GO
    ```
    
 1. (Optional) If desired, you can now add N1 back as a new secondary replica to the availability group AGRScale.


Note that if you are using a listener to connect, you will need to re-create the listener after performing the failover.

## Related content

- [Distributed availability groups](distributed-availability-groups.md)
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Perform a forced manual failover of an Always On availability group (SQL Server)](perform-a-forced-manual-failover-of-an-availability-group-sql-server.md)
