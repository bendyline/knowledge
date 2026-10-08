---
title: "Configure a Read-Scale Availability Group (SQL Server on Linux)"
description: Learn about configuring a SQL Server Always On Availability Group (AG) for read-scale workloads on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 07/03/2025
ms.service: sql
ms.subservice: linux
ms.topic: how-to
ms.custom:
  - linux-related-content
---
# Configure a SQL Server availability group for read-scale on Linux


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article explains how to create a [SQL Server Always On Availability Group (AG)](../../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md) on Linux *without* a cluster manager. This architecture provides read-scale only. It *doesn't* provide high availability.

There are two types of architectures for availability groups. An architecture for *high availability* uses a *cluster manager* to provide improved business continuity. To create the high-availability architecture, see [Configure SQL Server availability group for high availability on Linux](configure.md).

An availability group with `CLUSTER_TYPE = NONE` can include replicas hosted on different operating system platforms. It can't support high availability.

## Prerequisites

Before you create the availability group, complete the following steps:

- Set up your environment so that all the servers that host availability replicas can communicate.
- Install  SQL Server 
.

On Linux, you must create an availability group before you add it as a cluster resource for the cluster to manage. This article provides an example that creates the availability group.

1. Update the computer name for each host.

   Each  SQL Server 
 instance name must be:

   - 15 characters or fewer.
   - Unique within the network.

   To set the computer name, edit `/etc/hostname`. The following example shows how to edit `/etc/hostname` with **vi**:

   ```bash
   sudo vi /etc/hostname
   ```

1. Configure the hosts file.

   > **Note:**  
   > If the DNS server registers hostnames with their IP addresses, you don't need to complete the following steps. Validate that all the nodes intended to be part of the availability group configuration can communicate with each other. (A ping to the hostname should reply with the corresponding IP address.) Also, make sure that the `/etc/hosts` file doesn't contain a record that maps the localhost IP address 127.0.0.1 with the hostname of the node.

   The hosts file on every server contains the IP addresses and names of all servers that participate in the availability group.

   The following command returns the IP address of the current server:

   ```bash
   sudo ip addr show
   ```

   Update `/etc/hosts`. The following example shows how to edit `/etc/hosts` with **vi**:

   ```bash
   sudo vi /etc/hosts
   ```

   The following example shows `/etc/hosts` on `node1` with additions for `node1`, `node2`, and `node3`. In this sample, `node1` refers to the server that hosts the primary replica, and `node2` and `node3` refer to servers that host the secondary replicas.

   ```output
   127.0.0.1    localhost localhost4 localhost4.localdomain4
   ::1          localhost localhost6 localhost6.localdomain6
   10.128.18.12 node1
   10.128.16.77 node2
   10.128.15.33 node3
   ```

### Install SQL Server

Install  SQL Server 
. The following links point to  SQL Server 
 installation instructions for various distributions:

- [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](../../install-upgrade/quickstart-install-red-hat.md)
- [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](../../install-upgrade/quickstart-install-suse.md)
- [Quickstart: Install SQL Server and create a database on Ubuntu](../../install-upgrade/quickstart-install-ubuntu.md)

> **Note:**  
> Starting in  SQL Server 2025 (17.x) 
, SUSE Linux Enterprise Server (SLES) isn't supported.

## Enable Always On availability groups

Enable Always On availability groups for each node that hosts a  SQL Server 
 instance, and then restart `mssql-server`. Run the following script:

```bash
sudo /opt/mssql/bin/mssql-conf set hadr.hadrenabled 1
sudo systemctl restart mssql-server
```

## Enable an AlwaysOn_health event session

You can optionally enable Extended Events (XE) to help with root-cause diagnosis when you troubleshoot an availability group. Run the following command on each instance of  SQL Server 
:

```sql
ALTER EVENT SESSION AlwaysOn_health ON SERVER
WITH (STARTUP_STATE = ON);
GO
```

For more information about this XE session, see [Configure Extended Events for availability groups](../../../database-engine/availability-groups/windows/always-on-extended-events.md).

## Create a certificate

The  SQL Server 
 service on Linux uses certificates to authenticate communication between the mirroring endpoints.

The following Transact-SQL (T-SQL) script creates a master key and a certificate. It then backs up the certificate and secures the file with a private key. Update the script with strong passwords. Connect to the primary  SQL Server 
 instance. To create the certificate, run the following T-SQL script:

```sql
CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<master-key-password>';

CREATE CERTIFICATE dbm_certificate
WITH SUBJECT = 'dbm';

BACKUP CERTIFICATE dbm_certificate
TO FILE = '/var/opt/mssql/data/dbm_certificate.cer'
WITH PRIVATE KEY (
    FILE = '/var/opt/mssql/data/dbm_certificate.pvk',
    ENCRYPTION BY PASSWORD = '<private-key-password>'
);
```

At this point, your primary  SQL Server 
 replica has a certificate at `/var/opt/mssql/data/dbm_certificate.cer` and a private key at `/var/opt/mssql/data/dbm_certificate.pvk`. Copy these two files to the same location on all servers that host availability replicas. Use the mssql user, or give permission to the mssql user to access these files.

For example, on the source server, the following command copies the files to the target machine. Replace the `<node2>` values with the names of the  SQL Server 
 instances that host the replicas.

```bash
cd /var/opt/mssql/data
scp dbm_certificate.* root@<node2>:/var/opt/mssql/data/
```

On each target server, give permission to the mssql user to access the certificate.

```bash
cd /var/opt/mssql/data
chown mssql:mssql dbm_certificate.*
```

## Create the certificate on secondary servers

The following T-SQL script creates a master key and a certificate from the backup that you created on the primary  SQL Server 
 replica. Update the script with strong passwords. The decryption password is the same password that you used to create the `.pvk` file in a previous step. To create the certificate, run the following script on all secondary servers:

```sql
CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<master-key-password>';

CREATE CERTIFICATE dbm_certificate
FROM FILE = '/var/opt/mssql/data/dbm_certificate.cer'
WITH PRIVATE KEY (
    FILE = '/var/opt/mssql/data/dbm_certificate.pvk',
    DECRYPTION BY PASSWORD = '<private-key-password>'
);
```

In the previous example, replace `<private-key-password>` with the same password you used when creating the certificate on the primary replica.

## Create the database mirroring endpoints on all replicas

Database mirroring endpoints use the Transmission Control Protocol (TCP) to send and receive messages between the server instances that participate in database mirroring sessions, or host availability replicas. The database mirroring endpoint listens on a unique TCP port number.

The following T-SQL script creates a listening endpoint named `Hadr_endpoint` for the availability group. It starts the endpoint and gives connection permission to the certificate that you created. Before you run the script, replace the values between `< ... >`. Optionally, you can include an IP address `LISTENER_IP = (0.0.0.0)`. The listener IP address must be an IPv4 address. You can also use `0.0.0.0`.

Update the following T-SQL script for your environment on all  SQL Server 
 instances:

```sql
CREATE ENDPOINT [Hadr_endpoint]
AS TCP (LISTENER_PORT = 5022)
FOR DATABASE_MIRRORING
(
    ROLE = ALL,
    AUTHENTICATION = CERTIFICATE dbm_certificate,
    ENCRYPTION = REQUIRED ALGORITHM AES
);

ALTER ENDPOINT [Hadr_endpoint]
STATE = STARTED;
```

> **Note:**  
> If you use  SQL Server 
 Express edition on one node to host a configuration-only replica, the only valid value for `ROLE` is `WITNESS`. Run the following script on  SQL Server 
 Express edition:

```sql
CREATE ENDPOINT [Hadr_endpoint]
AS TCP (LISTENER_PORT = 5022)
FOR DATABASE_MIRRORING
(
    ROLE = WITNESS,
    AUTHENTICATION = CERTIFICATE dbm_certificate,
    ENCRYPTION = REQUIRED ALGORITHM AES
);

ALTER ENDPOINT [Hadr_endpoint]
STATE = STARTED;
```

You must open the TCP port on the firewall for the listener port.

> **Important:**  
> The only authentication method supported for the database mirroring endpoint is `CERTIFICATE`. The `WINDOWS` option isn't available.

For more information, see [The database mirroring endpoint (SQL Server)](../../../database-engine/database-mirroring/the-database-mirroring-endpoint-sql-server.md).


## Create the availability group

Create the AG. Set `CLUSTER_TYPE = NONE`. In addition, set each replica with `FAILOVER_MODE = MANUAL`. Client applications running analytics or reporting workloads can directly connect to the secondary databases. You also can create a [read-only routing list](../../../database-engine/availability-groups/windows/listeners-client-connectivity-application-failover.md#ConnectToSecondary). Connections to the primary replica forward read connection requests to each of the secondary replicas from the routing list in a round-robin fashion.

The following Transact-SQL (T-SQL) script creates an AG named `ag1`. The script configures the AG replicas with `SEEDING_MODE = AUTOMATIC`. This setting causes SQL Server to automatically create the database on each secondary server after it's added to the AG. Update the following script for your environment. Replace the `<node1>` and `<node2>` values with the names of the SQL Server instances that host the replicas. Replace the `<5022>` value with the port you set for the endpoint. Run the following T-SQL script on the primary SQL Server replica:

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

### Join secondary SQL Server instances to the AG

The following T-SQL script joins a server to an AG named `ag1`. Update the script for your environment. On each secondary SQL Server replica, run the following T-SQL script to join the AG:

```sql
ALTER AVAILABILITY GROUP [ag1] JOIN WITH (CLUSTER_TYPE = NONE);

ALTER AVAILABILITY GROUP [ag1] GRANT CREATE ANY DATABASE;
```

## Add a database to the availability group

Ensure that the database you add to the availability group is in the full recovery model and has a valid log backup. If your database is a test database or a newly created database, take a database backup. On the primary  SQL Server 
, run the following  Transact-SQL  (Transact-SQL (T-SQL)) script to create and back up a database called `db1`:

```sql
CREATE DATABASE [db1];
GO

ALTER DATABASE [db1]
    SET RECOVERY FULL;
GO

BACKUP DATABASE [db1]
    TO DISK = N'/var/opt/mssql/data/db1.bak';
```

On the primary  SQL Server 
 replica, run the following T-SQL script to add a database called `db1` to an availability group called `ag1`:

```sql
ALTER AVAILABILITY GROUP [ag1] ADD DATABASE [db1];
```

### Verify that the database is created on the secondary servers

On each secondary  SQL Server 
 replica, run the following query to see if the `db1` database was created and is synchronized:

```sql
SELECT *
FROM sys.databases
WHERE name = 'db1';
GO

SELECT DB_NAME(database_id) AS 'database',
       synchronization_state_desc
FROM sys.dm_hadr_database_replica_states;
GO
```


This AG isn't a high-availability configuration. If you need high availability, follow the instructions at [Configure SQL Server availability group for high availability on Linux](configure.md). Specifically, create the AG with `CLUSTER_TYPE=WSFC` (in Windows) or `CLUSTER_TYPE=EXTERNAL` (in Linux). You can then integrate with a cluster manager, by using either Windows Server failover clustering on Windows, or Pacemaker on Linux.

## Connect to read-only secondary replicas

There are two ways to connect to read-only secondary replicas. Applications can connect directly to the SQL Server instance that hosts the secondary replica and query the databases. They also can use read-only routing, which requires a listener.

- [Offload read-only workload to secondary replica of an Always On availability group](../../../database-engine/availability-groups/windows/active-secondaries-readable-secondary-replicas-always-on-availability-groups.md)

## Fail over the primary replica on a read-scale AG

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


## Related content

- [Distributed availability groups](../../../database-engine/availability-groups/windows/distributed-availability-groups.md)
- [What is an Always On availability group?](../../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md)
- [Perform a forced manual failover of an Always On availability group (SQL Server)](../../../database-engine/availability-groups/windows/perform-a-forced-manual-failover-of-an-availability-group-sql-server.md)
