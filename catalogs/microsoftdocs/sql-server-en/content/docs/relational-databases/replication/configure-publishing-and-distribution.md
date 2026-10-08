---
title: "Configure Publishing and Distribution"
description: Learn how to configure publishing and distribution in SQL Server by using SQL Server Management Studio, Transact-SQL, or Replication Management Objects.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
helpviewer_keywords:
  - "replication [SQL Server], distribution"
  - "distribution configuration [SQL Server replication]"
  - "publishing [SQL Server replication], configuring"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
ms.custom:
  - updatefrequency5
  - sfi-ropc-nochange
---
# Configure Publishing and Distribution

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




 This topic describes how to configure publishing and distribution in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO).

<a id="BeforeYouBegin"></a>
<a id="Security"></a>

## Security

For more information, see [View and modify replication security settings](security/view-and-modify-replication-security-settings.md).

##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio 
Configure distribution using the New Publication Wizard or the Configure Distribution Wizard. After the Distributor is configured, view and modify properties in the **Distributor Properties - \<Distributor>** dialog box. Use the Configure Distribution Wizard if you want to configure a Distributor so that members of the `db_owner` fixed database roles can create publications, or because you want to configure a remote Distributor that is not a Publisher.

#### To configure distribution 

1. In  Microsoft 
  SQL Server Management Studio 
, connect to the server that will be the Distributor (in many cases, the Publisher and Distributor are the same server), and then expand the server node.

2. Right-click the **Replication** folder, and then click **Configure Distribution**.

3. Follow the Configure Distribution Wizard to: 

  - Select a Distributor. To use a local Distributor, select **ServerName will act as its own Distributor; SQL Server will create a distribution database and log**. To use a remote Distributor, select **Use the following server as the Distributor**, and then select a server. The server must already be configured as a Distributor, and the Publisher must be enabled to use the Distributor. For more information, see [Enable a Remote Publisher at a Distributor (SQL Server Management Studio)](enable-a-remote-publisher-at-a-distributor-sql-server-management-studio.md).

     If you select a remote Distributor, you must enter a password on the **Administrative Password** page for connections made from the Publisher to the Distributor. This password must match the password specified when the Publisher was enabled at the remote Distributor.

  - Specify a root snapshot folder (for a local Distributor). The snapshot folder is simply a directory that you have designated as a share; agents that read from and write to this folder must have sufficient permissions to access it. Each Publisher that uses this Distributor creates a folder under the root folder, and each publication creates folders under the Publisher folder in which to store snapshot files. For more information on securing the folder appropriately, see [Secure the Snapshot Folder](security/secure-the-snapshot-folder.md).

  - Specify the distribution database (for a local Distributor). The distribution database stores metadata and history data for all types of replication and transactions for transactional replication.

  - Optionally enable other Publishers to use the Distributor. If other Publishers are enabled to use the Distributor, you must enter a password on the **Distributor Password** page for connections made from these Publishers to the Distributor.

  - Optionally script configuration settings. For more information, see [Scripting Replication](scripting-replication.md).

##  <a name="TsqlProcedure"></a> Using Transact-SQL 
Replication publishing and distribution can be configured programmatically using replication stored procedures.
### To configure publishing using a local distributor
1. Execute [sp_get_distributor (Transact-SQL)](../system-stored-procedures/sp-get-distributor-transact-sql.md) to determine if the server is already configured as a Distributor.

  - If the value of `installed` in the result set is `0`, execute [sp_adddistributor (Transact-SQL)](../system-stored-procedures/sp-adddistributor-transact-sql.md) at the Distributor on the master database.

  - If the value of `distribution db installed` in the result set is `0`, execute [sp_adddistributiondb (Transact-SQL)](../system-stored-procedures/sp-adddistributiondb-transact-sql.md) at the Distributor on the master database. Specify the name of the distribution database for `@database`. Optionally, you can specify the maximum transactional retention period for `@max_distretention` and the history retention period for `@history_retention`. If a new database is being created, specify the desired database property parameters.

2. At the Distributor, which is also the Publisher, execute [sp_adddistpublisher (Transact-SQL)](../system-stored-procedures/sp-adddistpublisher-transact-sql.md), specifying the UNC share that will be used as default snapshot folder for `@working_directory`.

   For a distributor on SQL Managed Instance, use an Azure storage account for `@working_directory` and the storage access key for `@storage_connection_string`. 

3. At the Publisher, execute [sp_replicationdboption (Transact-SQL)](../system-stored-procedures/sp-replicationdboption-transact-sql.md). Specify the database being published for `@dbname`, the type of replication for `@optname`, and a value of `true` for `@value`.

#### To configure publishing using a remote distributor 

1. Execute [sp_get_distributor (Transact-SQL)](../system-stored-procedures/sp-get-distributor-transact-sql.md) to determine if the server is already configured as a Distributor.

   - If the value of `installed` in the result set is `0`, execute [sp_adddistributor (Transact-SQL)](../system-stored-procedures/sp-adddistributor-transact-sql.md) at the Distributor on the master database. Specify a strong password for `@password`. This password for the `distributor_admin` account will be used by the Publisher when connecting to the Distributor.

   - If the value of `distribution db installed` in the result set is `0`, execute [sp_adddistributiondb (Transact-SQL)](../system-stored-procedures/sp-adddistributiondb-transact-sql.md) at the Distributor on the master database. Specify the name of the distribution database for `@database`. Optionally, you can specify the maximum transactional retention period for `@max_distretention` and the history retention period for `@history_retention`. If a new database is being created, specify the desired database property parameters.

2. At the Distributor, execute [sp_adddistpublisher (Transact-SQL)](../system-stored-procedures/sp-adddistpublisher-transact-sql.md), specifying the UNC share that will be used as default snapshot folder for `@working_directory`. If the Distributor will use  SQL Server 
 Authentication when connecting to the Publisher, you must also specify a value of `0` for `@security_mode` and the  Microsoft 
  SQL Server 
 login information for `@login` and `@password`.

   For a distributor on SQL Managed Instance, use an Azure storage account for `@working_directory` and the storage access key for `@storage_connection_string`. 

3. At the Publisher on the master database, execute [sp_adddistributor (Transact-SQL)](../system-stored-procedures/sp-adddistributor-transact-sql.md). Specify the strong password used in step 1 for `@password`. This password will be used by the Publisher when connecting to the Distributor.

4. At the Publisher, execute [sp_replicationdboption (Transact-SQL)](../system-stored-procedures/sp-replicationdboption-transact-sql.md). Specify the database being published for `@dbname`, the type of replication for `@optname`, and a value of true for `@value`.

###  <a name="TsqlExample"></a> Example (Transact-SQL) 
The following example demonstrates how to configure publishing and distribution programmatically. In this example, the name of the server that is being configured as a publisher and a local distributor is supplied using scripting variables. Replication publishing and distribution can be configured programmatically using replication stored procedures.

[language="sql" source="codesnippet/tsql/configure-publishing-and_1.sql"::: (complete source file; reference: codesnippet/tsql/configure-publishing-and_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/configure-publishing-and_1.sql.md)

##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO) 

#### To configure publishing and distribution on a single server 

1. Create a connection to the server by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.

2. Create an instance of the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) class. Pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.

3. Create an instance of the [Microsoft.SqlServer.Replication.DistributionDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase) class.

4. Set the [Microsoft.SqlServer.Replication.DistributionDatabase.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase.Name%252A) property to the database name and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.

5. Install the Distributor by calling the [Microsoft.SqlServer.Replication.ReplicationServer.InstallDistributor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer.InstallDistributor%252A) method. Pass the [Microsoft.SqlServer.Replication.DistributionDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase) object from step 3.

6. Create an instance of the [Microsoft.SqlServer.Replication.DistributionPublisher](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher) class.

7. Set the following properties of [Microsoft.SqlServer.Replication.DistributionPublisher](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher): 

  - [Microsoft.SqlServer.Replication.DistributionPublisher.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.Name%252A) - name of the Publisher.

  - [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) - the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.

  - [Microsoft.SqlServer.Replication.DistributionPublisher.DistributionDatabase%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.DistributionDatabase%252A) - the name of the database created in step 5.

  - [Microsoft.SqlServer.Replication.DistributionPublisher.WorkingDirectory%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.WorkingDirectory%252A) - the share used to access snapshot files.

  - [Microsoft.SqlServer.Replication.DistributionPublisher.PublisherSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.PublisherSecurity%252A) - the security mode used when connecting to the Publisher. [Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%252A) is recommended.

8. Call the [Microsoft.SqlServer.Replication.DistributionPublisher.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.Create%252A) method.

#### To configure publishing and distribution using a remote Distributor 

1. Create a connection to the remote Distributor server by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.

2. Create an instance of the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) class. Pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.

3. Create an instance of the [Microsoft.SqlServer.Replication.DistributionDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase) class.

4. Set the [Microsoft.SqlServer.Replication.DistributionDatabase.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase.Name%252A) property to the database name, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.

5. Install the Distributor by calling the [Microsoft.SqlServer.Replication.ReplicationServer.InstallDistributor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer.InstallDistributor%252A) method. Specify a secure password (used by the Publisher when connecting to the remote Distributor) and the [Microsoft.SqlServer.Replication.DistributionDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase) object from step 3. For more information, see [Secure the Distributor](security/secure-the-distributor.md).

   > **Important:**  
   > When possible, prompt users to enter security credentials at runtime. If you must store credentials, use the [cryptographic services](https://learn.microsoft.com/previous-versions/aa719848\(v=vs.71\)) provided by the  Microsoft 
 Windows .NET Framework.

6. Create an instance of the [Microsoft.SqlServer.Replication.DistributionPublisher](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher) class.

7. Set the following properties of [Microsoft.SqlServer.Replication.DistributionPublisher](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher): 

  - [Microsoft.SqlServer.Replication.DistributionPublisher.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.Name%252A) - name of the local Publisher server.

  - [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) - the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.

  - [Microsoft.SqlServer.Replication.DistributionPublisher.DistributionDatabase%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.DistributionDatabase%252A) - the name of the database created in step 5.

  - [Microsoft.SqlServer.Replication.DistributionPublisher.WorkingDirectory%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.WorkingDirectory%252A) - the share used to access snapshot files.

  - [Microsoft.SqlServer.Replication.DistributionPublisher.PublisherSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.PublisherSecurity%252A) - the security mode used when connecting to the Publisher. [Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%252A) is recommended.

8. Call the [Microsoft.SqlServer.Replication.DistributionPublisher.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.Create%252A) method.

9. Create a connection to the local Publisher server by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.

10. Create an instance of the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) class. Pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 9.

11. Call the [Microsoft.SqlServer.Replication.ReplicationServer.InstallDistributor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer.InstallDistributor%252A) method. Pass the name of the remote Distributor and the password for the remote Distributor specified in step 5.

> **Important:**
> When possible, prompt users to enter security credentials at runtime. If you must store credentials, use the [cryptographic services](https://learn.microsoft.com/previous-versions/aa719848\(v=vs.71\)) provided by the Windows .NET Framework.

###  <a name="PShellExample"></a> Example (RMO) 
You can programmatically configure replication publishing and distribution by using Replication Management Objects (RMO).

[HowTo#rmo_AddDistPub (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_adddistpub)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md) 

[HowTo#rmo_vb_AddDistPub (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_adddistpub)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md) 

## Related content

- [View and Modify Distributor and Publisher Properties](view-and-modify-distributor-and-publisher-properties.md)
- [Replication System Stored Procedures Concepts](concepts/replication-system-stored-procedures-concepts.md)
- [Configure Distribution](configure-distribution.md)
- [Replication Management Objects Concepts](concepts/replication-management-objects-concepts.md)
- [Configure replication with Always On availability groups](../../database-engine/availability-groups/windows/configure-replication-for-always-on-availability-groups-sql-server.md)
