---
title: Configure SQL Server Availability Group with Custom High Availability Logic
description: How to configure a SQL Server Always On availability group using custom high availability and failover logic.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: atsingh, amitkh-msft
ms.date: 02/04/2026
ms.service: sql
ms.subservice: linux
ms.topic: design-pattern
ms.custom:
  - linux-related-content
---
# Configure SQL Server availability group with custom high availability logic on Linux


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article explains how to configure a SQL Server Always On availability group (AG) on Linux using custom high availability and failover logic. This architecture uses `CLUSTER_TYPE = EXTERNAL` to allow manual or script-driven control over replica management. It's ideal for environments requiring tailored high availability and failover strategies. While data synchronization between replicas is handled by SQL Server, the high availability and failover mechanisms must be implemented externally.

## Types of availability group architectures

### High availability architecture

- Uses a *cluster manager* to provide automated failover and enhanced business continuity.

- Recommended for production environments requiring minimal downtime.

- To configure this setup, see [Configure SQL Server availability group for high availability on Linux](configure.md).

### Read-scale architecture

- Configured with `CLUSTER_TYPE = NONE`, this model **doesn't** use a cluster manager.

- Supports read-only workloads and can include replicas across different operating systems.

- Not suitable for high availability scenarios.

- For setup instructions, see [Configure a SQL Server availability group for read-scale on Linux](configure-read-scale.md).

### Custom high availability and failover logic

- Offers flexibility to implement **custom failover logic** using external scripts.
- Configured with `CLUSTER_TYPE = EXTERNAL`, allowing manual or scripted management of availability replicas.
- Ideal for environments with specialized high availability requirements or nonstandard clustering solutions.

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

Create the AG. Set `CLUSTER_TYPE = EXTERNAL`. In addition, set each replica with `FAILOVER_MODE = EXTERNAL`. Depending on the environment's requirements, set `AVAILABILITY_MODE` to either `SYNCHRONOUS_COMMIT` or `ASYNCHRONOUS_COMMIT`.

**Paxos protocol** plays a critical role in the internal communication and configuration consistency of Always On availability groups (AGs) in SQL Server, particularly in cluster-agnostic or external cluster configurations. Paxos maintains consistency of the AG configuration across replicas, prevents split-brain scenarios, and ensures only primary is responsible for configuration updates.

The following Transact-SQL (T-SQL) script creates an AG named `ag1`. The script configures the AG replicas with `SEEDING_MODE = MANUAL`. This setting requires you to manually initialize secondary replicas with a copy of the database before adding them to the AG. Update the following script for your environment. Replace the `<node1>`, `<node2>`, and `<node3>` values with the names of the SQL Server instances that host the replicas. This AG also configures the configuration only replica `<node3>`. The configuration only replica maintains configuration information about the availability group in the `master` database but doesn't contain the user databases in the availability group. Replace the `<5022>` value with the port you set for the endpoint. Run the following T-SQL script on the primary SQL Server replica:

```sql
CREATE availability group [ag1]
    WITH (CLUSTER_TYPE = EXTERNAL)
    FOR REPLICA ON
        N'<node1>' WITH (
            ENDPOINT_URL = N'tcp://<node1>:<5022>',
            AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
            FAILOVER_MODE = EXTERNAL,
            SEEDING_MODE = MANUAL,
                    SECONDARY_ROLE (ALLOW_CONNECTIONS = ALL)
        ),
        N'<node2>' WITH (
            ENDPOINT_URL = N'tcp://<node2>:<5022>',
            AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
            FAILOVER_MODE = EXTERNAL,
            SEEDING_MODE = MANUAL,
            SECONDARY_ROLE (ALLOW_CONNECTIONS = ALL)
        ),
        N'<node3>' WITH (
            ENDPOINT_URL = N'tcp://<node3>:<5022>',
            AVAILABILITY_MODE = CONFIGURATION_ONLY
        );

ALTER availability group [ag1] GRANT CREATE ANY DATABASE;
```

### Join secondary SQL Server instances to the AG

The following T-SQL script joins a server to an AG named `ag1`. Update the script for your environment. On each secondary SQL Server replica, run the following T-SQL script to join the AG:

```sql
ALTER availability group [ag1] JOIN WITH (CLUSTER_TYPE = EXTERNAL);

ALTER availability group [ag1] GRANT CREATE ANY DATABASE;
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


## Fail over the primary replica in a custom high availability and failover logic

Each availability group has only one primary replica. The primary replica allows reads and writes. To change which replica is primary, you can fail over. In a typical availability group, the cluster manager automates the failover process. In an availability group with cluster type `EXTERNAL`, with **custom failover logic** using external scripts or third-party tools the failover process can be manual or automated by implementing the custom health check and failover logic.

Manual fail over the primary replica can be done in two ways:

- Manual failover without data loss

- Forced manual failover with data loss

### Manual failover without data loss

Use this method when the primary replica is available, but you need to temporarily or permanently change which instance hosts the primary replica. To avoid potential data loss, before you issue the manual failover, ensure that the target secondary replica is up to date.

To manually fail over without data loss:

1. Make the current primary and target secondary replica `SYNCHRONOUS_COMMIT`.

   ```sql
   ALTER AVAILABILITY GROUP [ag1] MODIFY REPLICA ON N'<node2>' WITH (AVAILABILITY_MODE = SYNCHRONOUS_COMMIT);
   ```

1. To identify that active transactions are committed to the primary replica and at least one synchronous secondary replica, run the following query:

   ```sql
   SELECT AG.NAME,
          DRS.DATABASE_ID,
          DRS.GROUP_ID,
          DRS.REPLICA_ID,
          DRS.SYNCHRONIZATION_STATE_DESC,
          AG.SEQUENCE_NUMBER
   FROM SYS.DM_HADR_DATABASE_REPLICA_STATES AS DRS, SYS.AVAILABILITY_GROUPS AS AG
   WHERE DRS.GROUP_ID = AG.GROUP_ID;
   ```

   The secondary replica is synchronized when `synchronization_state_desc` is `SYNCHRONIZED`.

1. Set the primary replica and the secondary replicas not participating in the failover offline to prepare for the role change:

   ```sql
   ALTER AVAILABILITY GROUP [ag1] OFFLINE;
   ```

1. Promote the target secondary replica to primary

   ```sql
   ALTER AVAILABILITY GROUP ag1 FORCE_FAILOVER_ALLOW_DATA_LOSS;
   ```

1. Update the role of the old primary and other secondaries to `SECONDARY`, then run the following command on the SQL Server instance that hosts the old primary replica:

   ```sql
   ALTER availability group [ag1] SET (ROLE = SECONDARY);
   ```

1. Resume data movement, run the following command for every database in the availability group on the SQL Server instance that hosts the primary replica:

   ```sql
   ALTER DATABASE [db1]
       SET HADR RESUME;
   ```

### Forced manual failover with data loss

If the primary replica isn't available and can't immediately be recovered, then you need to force a failover to the secondary replica with data loss. However, if the original primary replica recovers after failover, it will assume the primary role. To avoid having each replica be in a different state, remove the original primary from the availability group after a forced failover with data loss. Once the original primary comes back online, remove the availability group from it entirely.

To force a manual failover with data loss from primary replica N1 to secondary replica N2, follow these steps:

1. On the secondary replica (N2), initiate the forced failover:

   ```sql
   ALTER AVAILABILITY GROUP [ag1] FORCE_FAILOVER_ALLOW_DATA_LOSS;
   ```

1. On the new primary replica (N2), remove the original primary (N1):

   ```sql
   ALTER AVAILABILITY GROUP [ag1] REMOVE REPLICA ON N'N1';
   ```

1. Validate that all application traffic is pointed to the listener and/or the new primary replica.

   ```sql
   ALTER AVAILABILITY GROUP [ag1] OFFLINE;
   ```

1. If there's data, or unsynchronized changes, preserve this data via backups or other data replicating options that suit your business needs.

1. Next, remove the availability group from the original primary (N1):

   ```sql
   DROP AVAILABILITY GROUP [ag1];
   ```

1. Drop the availability group database on original primary replica (N1)

   ```sql
   USE [master];
   GO

   DROP DATABASE [db1];
   GO
   ```

1. (Optional) If desired, you can now add N1 back as a new secondary replica to the availability group AG1.

## Related content

- [Distributed availability groups](../../../database-engine/availability-groups/windows/distributed-availability-groups.md)
- [What is an Always On availability group?](../../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md)
- [Perform a forced manual failover of an Always On availability group (SQL Server)](../../../database-engine/availability-groups/windows/perform-a-forced-manual-failover-of-an-availability-group-sql-server.md)
