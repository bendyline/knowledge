---
title: "View & modify Distributor & Publisher properties"
description: Learn how to modify the properties for the Distributor and Publisher using SQL Server Management Studio (SSMS), Transact-SQL (T-SQL) or Replication Management Objects (RMO).
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "viewing replication properties"
  - "Distributors [SQL Server replication], modifying"
  - "modifying replication properties, Distributors"
  - "Distributors [SQL Server replication], properties"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# View and Modify Distributor and Publisher Properties

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes how to view and modify Distributor and Publisher properties in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO).  

<a id="BeforeYouBegin"></a>

##  <a name="Recommendations"></a> Recommendations
  
-   For Publishers running versions prior to  Microsoft 
  SQL Server 2005 (9.x) 
, a user in the **sysadmin** fixed server role can register Subscribers on the **Subscribers** page. Beginning with  SQL Server 2005 (9.x) 
, it is no longer necessary to explicitly register Subscribers for replication.  

<a id="Security"></a>

## Security

When possible, prompt users to enter security credentials at runtime.  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
  
#### To view and modify Distributor properties  
  
1.  Connect to the Distributor in  SQL Server Management Studio 
, and then expand the server node.  
  
2.  Right-click the **Replication** folder, and then click **Distributor Properties**.  
  
3.  View and modify properties in the **Distributor Properties - \<Distributor>** dialog box.  
  
    -   To view and modify properties for a distribution database, click the properties button (**...**) for the database on the **General** page of the dialog box.  
  
    -   To view and modify Publisher properties associated with the Distributor, click the properties button (**...**) for the Publisher on the **Publishers** page of the dialog box.  
  
    -   To access profiles for replication agents, click the **Profile Defaults** button on the **General** page of the dialog box. For more information, see [Replication Agent Profiles](agents/replication-agent-profiles.md).  
  
    -   To change the password for the account used when administrative stored procedures execute at the Publisher and update information at the Distributor, enter a new password in the **Password** and **Confirm password** boxes on the **Publishers** page of the dialog box. For more information, see [Secure the Distributor](security/secure-the-distributor.md).  
  
4.  Modify any properties if necessary, and then click **OK**.  
  
#### To view and modify Publisher properties  
  
1.  Connect to the Publisher in  SQL Server Management Studio 
, and then expand the server node.  
  
2.  Right-click the **Replication** folder, and then click **Publisher Properties**.  
  
3.  View and modify properties in the **Publisher Properties - < Publisher >** dialog box.  
  
    -   A user in the **sysadmin** fixed server role can enable databases for replication on the **Publication Databases** page. Enabling a database does not publish that database; rather, it allows any user in the **db_owner** fixed database role for that database to create one or more publications in the database.  
  
4.  Modify any properties if necessary, and then click **OK**.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 Publisher and Distributor properties can be viewed programmatically using replication stored procedures.  
  
#### To view Distributor and distribution database properties  
  
1.  Execute [sp_helpdistributor](../system-stored-procedures/sp-helpdistributor-transact-sql.md) to return information about the Distributor, distribution database, and working directory.  
  
2.  Execute [sp_helpdistributiondb](../system-stored-procedures/sp-helpdistributiondb-transact-sql.md) to return properties of a specified distribution database.  
  
#### To change Distributor and distribution database properties  
  
1.  At the Distributor, execute [sp_changedistributor_property](../system-stored-procedures/sp-changedistributor-property-transact-sql.md) to modify Distributor properties.  
  
2.  At the Distributor, execute [sp_changedistributiondb](../system-stored-procedures/sp-changedistributiondb-transact-sql.md) to modify distribution database properties.  
  
3.  At the Distributor, execute [sp_changedistributor_password](../system-stored-procedures/sp-changedistributor-password-transact-sql.md) to change the Distributor password.  
  
    > **Important:**  
    >  When possible, prompt users to enter security credentials at runtime. If you must store credentials in a script file, secure the file to prevent unauthorized access.  
  
4.  At the Distributor, execute [sp_changedistpublisher](../system-stored-procedures/sp-changedistpublisher-transact-sql.md) to change the properties of a Publisher using the Distributor.  
  
###  <a name="TsqlExample"></a> Examples (Transact-SQL)  
 The following example  Transact-SQL  script returns information about the Distributor and distribution database.  
  
 [language="sql" source="codesnippet/tsql/view-and-modify-distribu_1.sql"::: (complete source file; reference: codesnippet/tsql/view-and-modify-distribu_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-distribu_1.sql.md)
  
 [language="sql" source="codesnippet/tsql/view-and-modify-distribu_2.sql"::: (complete source file; reference: codesnippet/tsql/view-and-modify-distribu_2.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-distribu_2.sql.md)
  
 This example changes retention periods for the Distributor, the password used when connecting to the Distributor, and the interval at which the Distributor checks the status of various replication agents (also known as the heartbeat interval).  
  
> **Important:**  
>  When possible, prompt users to enter security credentials at runtime. If you must store credentials in a script file, secure the file to prevent unauthorized access.  
  
 [language="sql" source="codesnippet/tsql/view-and-modify-distribu_3.sql"::: (complete source file; reference: codesnippet/tsql/view-and-modify-distribu_3.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-distribu_3.sql.md)
  
 [language="sql" source="codesnippet/tsql/view-and-modify-distribu_4.sql"::: (complete source file; reference: codesnippet/tsql/view-and-modify-distribu_4.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-distribu_4.sql.md)
  
 [language="sql" source="codesnippet/tsql/view-and-modify-distribu_5.sql"::: (complete source file; reference: codesnippet/tsql/view-and-modify-distribu_5.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-distribu_5.sql.md)
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
  
#### To view and modify Distributor properties  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) class. Pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object from step 1.  
  
3.  (Optional) Check the [Microsoft.SqlServer.Replication.ReplicationServer.IsDistributor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer.IsDistributor%252A) property to verify that the currently connected server is a Distributor.  
  
4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.Load%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.Load%252A) method to get the properties from the server.  
  
5.  (Optional) To change properties, set a new value for one or more of the Distributor properties that can be set on the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) object.  
  
6.  (Optional) If the [Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%252A) property on the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) object is set to **true**, call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method to commit the changes to the server.  
  
#### To view and modify distribution database properties  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.DistributionDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase) class. Specify the name property and pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object from step 1.  
  
3.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties from the server. If this method returns **false**, the database with the specified name does not exist on the server.  
  
4.  (Optional) To change properties, set a new value for one of the [Microsoft.SqlServer.Replication.DistributionDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase) properties that can be set.  
  
5.  (Optional) If the [Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%252A) property on the [Microsoft.SqlServer.Replication.DistributionDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionDatabase) object is set to **true**, call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method to commit the changes to the server.  
  
#### To view and modify Publisher properties  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.DistributionPublisher](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher) class. Specify the [Microsoft.SqlServer.Replication.DistributionPublisher.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher.Name%252A) property and pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object from step 1.  
  
3.  (Optional) To change properties, set a new value for one of the [Microsoft.SqlServer.Replication.DistributionPublisher](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher) properties that can be set.  
  
4.  (Optional) If the [Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%252A) property on the [Microsoft.SqlServer.Replication.DistributionPublisher](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.DistributionPublisher) object is set to **true**, call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method to commit the changes to the server.  
  
#### To change the password for the administrative connection from the Publisher to the Distributor  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.Load%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.Load%252A) method to get the properties of the object.  
  
5.  Call the [Microsoft.SqlServer.Replication.ReplicationServer.ChangeDistributorPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer.ChangeDistributorPassword%252A) method. Pass the new password value for the *password* parameter.  
  
    > **Important:**  
    >  When possible, prompt users to enter security credentials at runtime. If you must store credentials, use the [cryptographic services](https://learn.microsoft.com/previous-versions/aa719848\(v=vs.71\)) provided by the  Microsoft 
 Windows .NET Framework.  
  
6.  (Optional) Perform the following steps to change the password at each remote Publisher that uses this Distributor:  
  
    1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
    2.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) class.  
  
    3.  Set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 6a.  
  
    4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.Load%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.Load%252A) method to get the properties of the object.  
  
    5.  Call the [Microsoft.SqlServer.Replication.ReplicationServer.ChangeDistributorPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer.ChangeDistributorPassword%252A) method. Pass the new password value from Step 5 for the *password* parameter.  
  
###  <a name="PShellExample"></a> Example (RMO)  
 This example shows how to change Distribution and distribution database properties.  
  
> **Important:**  
>  To avoid storing credentials in the code, the new Distributor password is supplied at runtime.  
  
 [HowTo#rmo_ChangeDistPub (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_changedistpub)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_ChangeDistPub (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_changedistpub)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
## Related content

- [Replication Management Objects Concepts](concepts/replication-management-objects-concepts.md)
- [Disable Publishing and Distribution](disable-publishing-and-distribution.md)
- [Configure Distribution](configure-distribution.md)
- [Distributor and Publisher Information Script](administration/distributor-and-publisher-information-script.md)
- [Replication System Stored Procedures Concepts](concepts/replication-system-stored-procedures-concepts.md)
- [View information and perform tasks using Replication Monitor](monitor/view-information-and-perform-tasks-replication-monitor.md)
