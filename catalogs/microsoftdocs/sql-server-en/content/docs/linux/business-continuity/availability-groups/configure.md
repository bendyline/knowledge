---
title: Configure an Availability Group for High Availability
titleSuffix: SQL Server on Linux
description: Learn about creating a SQL Server Always On availability group (AG) for high availability on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 09/14/2026
ms.service: sql
ms.subservice: linux
ms.topic: how-to
ms.custom:
  - linux-related-content
---
# Configure SQL Server availability group for high availability on Linux


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article describes how to create a SQL Server Always On availability group (AG) for high availability on Linux. There are two configuration types for AGs. A *high availability* configuration uses a cluster manager to provide business continuity. This configuration can also include read-scale replicas. This article explains how to create the AG for high availability.

You can also create an AG without a cluster manager for *read-scale*. The AG for read scale only provides read-only replicas for performance scale-out. It doesn't provide high availability. To create an AG for read-scale, see [Configure a SQL Server availability group for read-scale on Linux](configure-read-scale.md).

Configurations that guarantee high availability and data protection require either two or three synchronous commit replicas. With three synchronous replicas, the AG can automatically recover even if one server isn't available. For more information, see [High availability and data protection for availability group configurations](high-availability.md).

All servers must be either physical or virtual, and virtual servers must be on the same virtualization platform. This requirement exists because the fencing agents are platform specific. See [Policies for Guest Clusters](https://access.redhat.com/articles/2912891#guest_policies).

## Installation steps

The steps to create an AG on Linux servers for high availability differ from the steps on a Windows Server failover cluster. The following list describes the high-level steps:

1. [Installation guidance for SQL Server on Linux](../../install-upgrade/setup.md).

   > **Important:**  
   > All three servers in the AG need to be on the same platform - physical or virtual - because Linux high availability uses fencing agents to isolate resources on servers. The fencing agents are specific for each platform.

1. Create the AG. This step is covered in this current article.

1. Configure a cluster resource manager, like Pacemaker.

   The way to configure a cluster resource manager depends on the specific Linux distribution. See the following links for distribution specific instructions:

   - [RHEL](cluster-pacemaker.md?tabs=rhel)
   - [SUSE](cluster-pacemaker.md?tabs=sles)
   - [Ubuntu](cluster-pacemaker.md?tabs=ubuntu)

   > **Important:**  
   > Production environments require a fencing agent for high availability. The examples in this article don't use fencing agents. They're for testing and validation only.
   >
   > A Pacemaker cluster uses fencing to return the cluster to a known state. The way to configure fencing depends on the distribution and the environment. Currently, fencing isn't available in some cloud environments. For more information, see [Support Policies for RHEL High Availability Clusters - Virtualization Platforms](https://access.redhat.com/articles/2912891).
   >
   > For SLES, see [SUSE Linux Enterprise High Availability Extension](https://documentation.suse.com/sle-ha/12-SP5/#redirectmsg).

1. Add the AG as a resource in the cluster.

   The way to add the AG as a resource in the cluster depends on the Linux distribution. See the following links for distribution specific instructions:

   - [RHEL](cluster-pacemaker.md?tabs=rhel#create-availability-group-resource)
   - [SLES](cluster-pacemaker.md?tabs=sles#configure-the-cluster-resources-for-sql-server)
   - [Ubuntu](cluster-pacemaker.md?tabs=ubuntu#create-availability-group-resource)

### Considerations for multiple network interfaces (NICs)

For information on setting up an availability group for servers with multiple NICs, see the relevant sections for:

- [RHEL](cluster-pacemaker.md?tabs=rhel#considerations-for-multiple-network-interfaces-nics)
- [SLES](cluster-pacemaker.md?tabs=sles#considerations-for-multiple-network-interfaces-nics)
- [Ubuntu](cluster-pacemaker.md?tabs=ubuntu#considerations-for-multiple-network-interfaces-nics)

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


## Create the AG

The examples in this section explain how to create the availability group using Transact-SQL (T-SQL). You can also use the SQL Server Management Studio Availability Group Wizard. When you create an AG using the wizard, it returns an error when you join the replicas to the AG. To fix this error, grant `ALTER`, `CONTROL`, and `VIEW DEFINITION` to the Pacemaker user on the AG on all replicas. Once you grant permissions on the primary replica, join the nodes to the AG through the wizard, but for HA to function properly, grant permission on all replicas.

For a high availability configuration that ensures automatic failover, the AG requires at least three replicas. Either of the following configurations can support high availability:

- [Three synchronous replicas](high-availability.md#threeSynch)

- [Two synchronous replicas plus a configuration replica](high-availability.md#twoSynch)

For more information, see [High availability and data protection for availability group configurations](high-availability.md).

> **Note:**  
> The availability groups can include additional synchronous or asynchronous replicas.

Create the AG for high availability on Linux. Use the [CREATE AVAILABILITY GROUP](../../../t-sql/statements/create-availability-group-transact-sql.md) statement with `CLUSTER_TYPE = EXTERNAL`.

- Availability group: `CLUSTER_TYPE = EXTERNAL`.

   Specifies that an external cluster entity manages the AG. Pacemaker is an example of an external cluster entity.

- Set primary and secondary replicas: `FAILOVER_MODE = EXTERNAL`.

  Specifies that the replica interacts with an external cluster manager, like Pacemaker.

The following T-SQL scripts create an AG for high availability named `ag1`. The script configures the AG replicas with `SEEDING_MODE = AUTOMATIC`. This setting causes SQL Server to automatically create the database on each secondary server. Update the following script for your environment. Replace the `<node1>`, `<node2>`, or `<node3>` values with the names of the SQL Server instances that host the replicas. Replace the `<5022>` with the port you set for the data mirroring endpoint. To create the AG, run the following T-SQL on the SQL Server instance that hosts the primary replica.

Run **only one** of the following scripts:

- [Create availability group with three synchronous replicas](#threeSynch)
- [Create availability group with two synchronous replicas and a configuration replica](#configOnly)
- [Create availability group with two synchronous replicas](#readScale)

### Match the node name to the ServerName property

In the current implementation of the SQL Server resource agent, the node name must match the `ServerName` property from your instance. For example, if your node name is `node1`, make sure `SERVERPROPERTY('ServerName')` returns `node1` in your SQL Server instance. If there's a mismatch, your replicas go into a resolving state after the Pacemaker resource is created.

This rule is important when you use fully qualified domain names. For example, if you use `node1.contoso.onmicrosoft.com` as the node name during cluster setup, make sure `SERVERPROPERTY('ServerName')` returns `node1.contoso.onmicrosoft.com`, and not just `node1`. To fix this problem, you can:

- Rename your host name to the FQDN and use the `sp_dropserver` and `sp_addserver` stored procedures to ensure the metadata in SQL Server matches the change.
- Use the `addr` option in the `pcs cluster auth` command to match the node name to the `SERVERPROPERTY('ServerName')` value and use a static IP as the node address.

<a id="threeSynch"></a>

### Create availability group with three synchronous replicas

Create an AG with three synchronous replicas:

```sql
CREATE AVAILABILITY GROUP [ag1]
      WITH (DB_FAILOVER = ON, CLUSTER_TYPE = EXTERNAL)
      FOR REPLICA ON
         N'<node1>'
               WITH (
            ENDPOINT_URL = N'tcp://<node1>:<5022>',
            AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
            FAILOVER_MODE = EXTERNAL,
            SEEDING_MODE = AUTOMATIC
            ),
         N'<node2>'
         WITH (
            ENDPOINT_URL = N'tcp://<node2>:<5022>',
            AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
            FAILOVER_MODE = EXTERNAL,
            SEEDING_MODE = AUTOMATIC
            ),
         N'<node3>'
         WITH(
            ENDPOINT_URL = N'tcp://<node3>:<5022>',
            AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
            FAILOVER_MODE = EXTERNAL,
            SEEDING_MODE = AUTOMATIC
            );

ALTER AVAILABILITY GROUP [ag1] GRANT CREATE ANY DATABASE;
```

> **Important:**  
> After you run the preceding script to create an AG with three synchronous replicas, don't run the following script:

<a id="configOnly"></a>

### Create availability group with two synchronous replicas and a configuration replica

Create an AG with two synchronous replicas and a configuration replica:

> **Important:**  
> This architecture allows any edition of SQL Server to host the third replica. For example, the third replica can be hosted on SQL Server Express Edition. On Express Edition, the only valid endpoint type is `WITNESS`.

```sql
CREATE AVAILABILITY GROUP [ag1]
   WITH (CLUSTER_TYPE = EXTERNAL)
   FOR REPLICA ON
      N'<node1>' WITH (
         ENDPOINT_URL = N'tcp://<node1>:<5022>',
         AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
         FAILOVER_MODE = EXTERNAL,
         SEEDING_MODE = AUTOMATIC
         ),
      N'<node2>' WITH (
         ENDPOINT_URL = N'tcp://<node2>:<5022>',
         AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
         FAILOVER_MODE = EXTERNAL,
         SEEDING_MODE = AUTOMATIC
         ),
      N'<node3>' WITH (
         ENDPOINT_URL = N'tcp://<node3>:<5022>',
         AVAILABILITY_MODE = CONFIGURATION_ONLY
         );
ALTER AVAILABILITY GROUP [ag1] GRANT CREATE ANY DATABASE;
```

<a id="readScale"></a>

### Create availability group with two synchronous replicas

Create an AG with two synchronous replicas.

Include two replicas with synchronous availability mode. For example, the following script creates an AG called `ag1`. `node1` and `node2` host replicas in synchronous mode, with automatic seeding and automatic failover.

> **Important:**  
> Only run the following script to create an AG with two synchronous replicas. Don't run the following script if you ran either preceding script.

```sql
CREATE AVAILABILITY GROUP [ag1]
   WITH (CLUSTER_TYPE = EXTERNAL)
   FOR REPLICA ON
   N'node1' WITH (
      ENDPOINT_URL = N'tcp://node1:5022',
      AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
      FAILOVER_MODE = EXTERNAL,
      SEEDING_MODE = AUTOMATIC
   ),
   N'node2' WITH (
      ENDPOINT_URL = N'tcp://node2:5022',
      AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
      FAILOVER_MODE = EXTERNAL,
      SEEDING_MODE = AUTOMATIC
   );

ALTER AVAILABILITY GROUP [ag1] GRANT CREATE ANY DATABASE;
```

You can also configure an AG with `CLUSTER_TYPE=EXTERNAL` using SQL Server Management Studio or PowerShell.

### Join secondary replicas to the AG

The Pacemaker user needs `ALTER`, `CONTROL`, and `VIEW DEFINITION` permissions on the availability group on all replicas. To grant these permissions, run the following T-SQL script after creating the availability group on the primary replica. Run the script on each secondary replica immediately after adding them to the availability group. Before running the script, replace `<pacemakerLogin>` with the name of the Pacemaker user account. If you don't have a login for Pacemaker, [create a SQL Server login for Pacemaker](cluster-pacemaker.md?tabs=ubuntu#create-a-sql-server-login-for-pacemaker).

```sql
GRANT ALTER, CONTROL, VIEW DEFINITION ON AVAILABILITY GROUP::ag1 TO <pacemakerLogin>
GRANT VIEW SERVER STATE TO <pacemakerLogin>
```

The following T-SQL script joins a SQL Server instance to an AG named `ag1`. Update the script for your environment. On each SQL Server instance that hosts a secondary replica, run the following T-SQL to join the AG.

```sql
ALTER AVAILABILITY GROUP [ag1] JOIN WITH (CLUSTER_TYPE = EXTERNAL);

ALTER AVAILABILITY GROUP [ag1] GRANT CREATE ANY DATABASE;
```

> **Note:**  
> For a configuration replica, only the join step is needed.

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


After you create the AG, you must configure integration with a cluster technology like Pacemaker for high availability. For a read-scale configuration using AGs, starting with  SQL Server 2017 (14.x) 
, setting up a cluster isn't required.

If you followed the steps in this article, you have an AG that isn't yet clustered. The next step is to add the cluster. This configuration is valid for read-scale and load balancing scenarios, but it's not complete for high availability. For high availability, you need to add the AG as a cluster resource. See [Related content](#related-content) for instructions.

## Remarks

After you configure the cluster and add the AG as a cluster resource, you can't use T-SQL to fail over the AG resources. SQL Server cluster resources on Linux aren't coupled as tightly with the operating system as they are on a Windows Server Failover Cluster (WSFC). The SQL Server service isn't aware of the presence of the cluster. All orchestration is done through the cluster management tools. In RHEL or Ubuntu, use `pcs`. In SLES, use `crm`.

If the AG is a cluster resource, there's a known issue in the current release where forced failover with data loss to an asynchronous replica doesn't work. This issue will be fixed in an upcoming release. Manual or automatic failover to a synchronous replica succeeds.

## Related content

- [Configure a Red Hat Enterprise Linux Pacemaker cluster for SQL Server availability groups](cluster-pacemaker.md?tabs=rhel)
- [Configure a SUSE Linux Enterprise Server Pacemaker cluster for SQL Server availability groups](cluster-pacemaker.md?tabs=sles)
- [Configure an Ubuntu Pacemaker cluster for SQL Server availability groups](cluster-pacemaker.md?tabs=ubuntu)
