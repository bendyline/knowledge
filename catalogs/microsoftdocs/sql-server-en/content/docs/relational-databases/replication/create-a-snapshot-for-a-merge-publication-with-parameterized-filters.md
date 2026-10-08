---
title: "Create snapshot with parameterized filters (Merge)"
description: Learn how to create a snapshot for a Merge Publication using parameterized filters.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "parameterized filters [SQL Server replication], snapshots"
  - "snapshots [SQL Server replication], parameterized filters and"
  - "filters [SQL Server replication], parameterized"
---
# Create a Snapshot for a Merge Publication with Parameterized Filters
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
This topic describes how to create a snapshot for a merge publication with parameterized filters in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO).  

When parameterized row filters are used in merge publications, replication initializes each subscription with a two-part snapshot. First, a schema snapshot is created that contains all objects required by replication and the schema of the published objects, but not the data. Then, each subscription is initialized with a snapshot that includes the objects and schema from the schema snapshot and the data that belongs to the subscription's partition. If more than one subscription receives a given partition (in other words, they receive the same schema and data), the snapshot for that partition is created only once; multiple subscriptions are initialized from the same snapshot. For more information about parameterized row filters, see [Parameterized Row Filters](merge/parameterized-filters-parameterized-row-filters.md).  
  
 You can create snapshots for publications with parameterized filters in one of three ways:  
  
-   **Pre-generate snapshots for each partition.** Using this option allows you to control when snapshots are generated.    
     You can also choose to have the snapshots refreshed on a schedule. New Subscribers that subscribe to a partition for which a snapshot has been created will receive an up-to-date snapshot.   
-   **Allow Subscribers to request snapshot generation** and application the first time they synchronize. Using this option allows new Subscribers to synchronize without requiring intervention from an administrator ( SQL Server 
 Agent must be running at the Publisher to allow the snapshot to be generated).  
  
    > **Note:**  
    >  If the filtering for one or more articles in the publication yields non-overlapping partitions that are unique for each subscription, metadata is cleaned up whenever the Merge Agent runs. This means that the partitioned snapshot expires more quickly. When using this option, you should consider allowing Subscribers to initiate snapshot generation and delivery. For more information about filtering options, see [Parameterized Row Filters](merge/parameterized-filters-parameterized-row-filters.md).  
  
-   **Manually generate a snapshot for each Subscriber with the Snapshot Agent**. The Subscriber must then provide the snapshot location to the Merge Agent, so it can retrieve and apply the correct snapshot.  
  
    > **Note:**  
    >  This option is supported for backward compatibility and does not allow FTP snapshot shares.  
  
 The most flexible approach is to use a combination of pre-generated and Subscriber-requested snapshot options: snapshots are pre-generated and refreshed on a scheduled basis (usually during off-peak times), but a Subscriber can generate its own snapshot if a subscription that requires a new partition is created.  
  
 Consider  Adventure Works 
, which has a mobile work force that delivers inventory to individual stores. Each sales person receives a subscription based on their login, which retrieves the data for the stores they service. The administrator chooses to pre-generate snapshots and refresh them every Sunday. Occasionally a new user is added to the system and needs data for a partition that does not have a snapshot available. The administrator also chooses to allow Subscriber-initiated snapshots to avoid the situation where a Subscriber cannot subscribe to the publication because the snapshot is not yet available. When the new Subscriber connects for the first time, the snapshot is generated for the specified partition and applied at the Subscriber ( SQL Server 
 Agent must be running at the Publisher to allow the snapshot to be generated).  
  
 To create a snapshot for a publication with parameterized filters, see [Create a Snapshot for a Merge Publication with Parameterized Filters](#create-a-snapshot-for-a-merge-publication-with-parameterized-filters).  
  
## Security Settings for the Snapshot Agent  
 The Snapshot Agent creates snapshots for each partition. For pre-generated snapshots and snapshots requested by a Subscriber, the agent runs and makes connections under the credentials that were specified when the snapshot agent job for the publication was created (the job is created by the New Publication Wizard or **sp_addpublication_snapshot**). To change the credentials, use **sp_changedynamicsnapshot_job**. For more information, see [sp_changedynamicsnapshot_job (Transact-SQL)](../system-stored-procedures/sp-changedynamicsnapshot-job-transact-sql.md).  

  
##  <a name="Recommendations"></a> Recommendations  
  
-   When generating a snapshot for a merge publication using parameterized filters, you must first generate a standard (schema) snapshot that contains all of the published data and Subscriber metadata for the subscription. For more information, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md). After you have created the schema snapshot, you can generate the snapshot that contains the Subscriber-specific partition of the published data.  
  
-   If the filtering for one or more articles in the publication yields non-overlapping partitions that are unique for each subscription, metadata is cleaned up whenever the Merge Agent runs. This means that the partitioned snapshot expires more quickly. When using this option, you should consider allowing Subscribers to initiate snapshot generation and delivery. 
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 Generate snapshots for partitions on the **Data Partitions** page of the **Publication Properties - \<Publication>** dialog box. For more information about accessing this dialog box, see [View and Modify Publication Properties](publish/view-and-modify-publication-properties.md). You can allow Subscribers to initiate snapshot generation and delivery and/or generate snapshots.  
  
 Before generating snapshots for one or more partitions, you must:  
  
1.  Create a merge publication with the New Publication Wizard, and specify one or more parameterized row filters on the **Add Filter** page of the wizard. For more information, see [Define and Modify a Parameterized Row Filter for a Merge Article](publish/define-and-modify-a-parameterized-row-filter-for-a-merge-article.md).  
  
2.  Generate a schema snapshot for the publication. By default, a schema snapshot is generated when you complete the New Publication Wizard; you can also generate a schema snapshot from  SQL Server Management Studio 
.  

#### To generate a schema snapshot  
  
1.  Connect to the Publisher in  Management Studio
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Publications** folder.  
  
3.  Right-click the publication for which you want to create a snapshot, and then click **View Snapshot Agent Status**.  
  
4.  In the **View Snapshot Agent Status - \<Publication>** dialog box, click **Start**.  
  
     When the Snapshot Agent finishes generating the snapshot, a message will be displayed, such as "[100%] A snapshot of 17 article(s) was generated."  
  
#### To allow Subscribers to initiate snapshot generation and delivery  
  
1.  On the **Data Partitions** page of the **Publication Properties - \<Publication>** dialog box, select **Automatically define a partition and generate a snapshot if needed when a new Subscriber tries to synchronize**.  
  
2.  Select **OK**.
  
#### To generate and refresh snapshots  
  
1.  On the **Data Partitions** page of the **Publication Properties - \<Publication>** dialog box, click **Add**.  
  
2.  Enter a value for the **HOST_NAME()** and/or **SUSER_SNAME()** value associated with the partition for which you want to create a snapshot.  
  
3.  Optionally specify a schedule for refreshing snapshots:  
  
    1.  Select **Schedule the Snapshot Agent for this partition to run at the following time(s)**  
  
    2.  Accept the default schedule for refreshing snapshots, or click **Change** to specify a different schedule.  
  
4.  Click **OK**, which returns you to the **Publication Properties - \<Publication>** dialog box.  
  
5.  Select the partition in the property grid, and then click **Generate the selected snapshots now**.  
  
6.  Select **OK**.
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 Using stored procedures and the Snapshot Agent, you can perform the following:  
  
-   Allow Subscribers to request snapshot generation and application the first time they synchronize.  
  
-   Pre-generate snapshots for each partition.  
  
-   Manually generate a snapshot for each Subscriber.  
  
    > **Important:**  
    >  When possible, prompt users to enter security credentials at runtime. If you must store credentials in a script file, you must secure the file to prevent unauthorized access.  
  
#### To create a publication that allows Subscribers to initiate snapshot generation and delivery  
  
1.  At the Publisher on the publication database, execute [sp_addmergepublication (Transact-SQL)](../system-stored-procedures/sp-addmergepublication-transact-sql.md). Specify the following parameters:  
  
    -   The name of the publication for **\@publication**.  
  
    -   A value of **true** for **\@allow_subscriber_initiated_snapshot**, which enables Subscribers to initiate the snapshot process.  
  
    -   (Optional) The number of dynamic snapshot processes that can run concurrently for **\@max_concurrent_dynamic_snapshots**. If the maximum number of processes is running and a Subscriber attempts to generate a snapshot, the process is placed in a queue. By default there is no limit to the number of concurrent processes.  
  
2.  At the Publisher, execute [sp_addpublication_snapshot (Transact-SQL)](../system-stored-procedures/sp-addpublication-snapshot-transact-sql.md). Specify the publication name used in step 1 for **\@publication** and the  Microsoft 
 Windows credentials under which the [Replication Snapshot Agent](agents/replication-snapshot-agent.md) runs for **\@job_login** and **\@password**. If the agent will use  SQL Server 
 Authentication when connecting to the Publisher, you must also specify a value of **0** for **\@publisher_security_mode** and the  Microsoft 
  SQL Server 
 login information for **\@publisher_login** and **\@publisher_password**. This creates a Snapshot Agent job for the publication. For more information about generating an initial snapshot and defining a custom schedule for the Snapshot Agent, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md).  
  
    > **Important:**  
    >  When configuring a Publisher with a remote Distributor, the values supplied for all parameters, including *job_login* and *job_password*, are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before executing this stored procedure. For more information, see [Enable Encrypted Connections to the Database Engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
3.  Execute [sp_addmergearticle (Transact-SQL)](../system-stored-procedures/sp-addmergearticle-transact-sql.md) to add articles to the publication. This stored procedure must be executed once for each article in the publication. When using parameterized filters, you must specify a parameterized row filter for one or more articles using the **\@subset_filterclause** parameter. For more information, see [Define and Modify a Parameterized Row Filter for a Merge Article](publish/define-and-modify-a-parameterized-row-filter-for-a-merge-article.md).  
  
4.  If other articles will be filtered based on the parameterized row filter, execute [sp_addmergefilter (Transact-SQL)](../system-stored-procedures/sp-addmergefilter-transact-sql.md) to define the join or logical record relationships between articles. This stored procedure must be executed once for each relationship being defined. For more information, see [Define and Modify a Join Filter Between Merge Articles](publish/define-and-modify-a-join-filter-between-merge-articles.md).  
  
5.  When the Merge Agent requests the snapshot to initialize the Subscriber, the snapshot for the requesting subscription's partition is automatically generated.  
  
#### To create a publication and pre-generate or automatically refresh snapshots  
  
1.  Execute [sp_addmergepublication (Transact-SQL)](../system-stored-procedures/sp-addmergepublication-transact-sql.md) to create the publication. For more information, see [Create a Publication](publish/create-a-publication.md).  
  
2.  At the Publisher, execute [sp_addpublication_snapshot (Transact-SQL)](../system-stored-procedures/sp-addpublication-snapshot-transact-sql.md). Specify the publication name used in step 1 for **\@publication** and the Windows credentials under which the Snapshot Agent runs for **\@job_login** and **\@password**. If the agent will use  SQL Server 
 Authentication when connecting to the Publisher, you must also specify a value of **0** for **\@publisher_security_mode** and the  SQL Server 
 login information for **\@publisher_login** and **\@publisher_password**. This creates a Snapshot Agent job for the publication. For more information about generating an initial snapshot and defining a custom schedule for the Snapshot Agent, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md).  
  
    > **Important:**  
    >  When configuring a Publisher with a remote Distributor, the values supplied for all parameters, including *job_login* and *job_password*, are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before executing this stored procedure. For more information, see [Enable Encrypted Connections to the Database Engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
3.  Execute [sp_addmergearticle (Transact-SQL)](../system-stored-procedures/sp-addmergearticle-transact-sql.md) to add articles to the publication. This stored procedure must be executed once for each article in the publication. When using parameterized filters, you must specify a parameterized row filter for one article using the **\@subset_filterclause** parameter. For more information, see [Define and Modify a Parameterized Row Filter for a Merge Article](publish/define-and-modify-a-parameterized-row-filter-for-a-merge-article.md).  
  
4.  If other articles will be filtered based on the parameterized row filter, execute [sp_addmergefilter (Transact-SQL)](../system-stored-procedures/sp-addmergefilter-transact-sql.md) to define the join or logical record relationships between articles. This stored procedure must be executed once for each relationship being defined. For more information, see [Define and Modify a Join Filter Between Merge Articles](publish/define-and-modify-a-join-filter-between-merge-articles.md).  
  
5.  At the Publisher on the publication database, execute [sp_helpmergepublication (Transact-SQL)](../system-stored-procedures/sp-helpmergepublication-transact-sql.md), specifying the value of **\@publication** from step 1. Note the value of the **snapshot_jobid** in the result set.  
  
6.  Convert the value of the **snapshot_jobid** obtained in step 5 to **uniqueidentifier**.  
  
7.  At the Publisher on the **msdb** database, execute [sp_start_job (Transact-SQL)](../system-stored-procedures/sp-start-job-transact-sql.md), specifying the converted value obtained in step 6 for **\@job_id**.  
  
8.  At the Publisher on the publication database, execute [sp_addmergepartition (Transact-SQL)](../system-stored-procedures/sp-addmergepartition-transact-sql.md). Specify the name of the publication from step 1 for **\@publication** and the value used to define the partition for **\@suser_sname** if [SUSER_SNAME &#40;Transact-SQL&#41;](../../t-sql/functions/suser-sname-transact-sql.md) is used in the filter clause or for **\@host_name** if [HOST_NAME &#40;Transact-SQL&#41;](../../t-sql/functions/host-name-transact-sql.md) is used in the filter clause.  
  
9. At the publisher on the publication database, execute [sp_adddynamicsnapshot_job (Transact-SQL)](../system-stored-procedures/sp-adddynamicsnapshot-job-transact-sql.md). Specify the name of the publication from step 1 for **\@publication**, the value of **\@suser_sname** or **\@host_name** from step 8, and a schedule for the job. This creates the job that generates the parameterized snapshot for the specified partition. For more information, see [Specify Synchronization Schedules](specify-synchronization-schedules.md).  
  
    > **Note:**  
    >  This job runs using the same Windows account as the initial snapshot job defined in step 2. To remove the parameterized snapshot job and its related data partition, execute [sp_dropdynamicsnapshot_job (Transact-SQL)](../system-stored-procedures/sp-dropdynamicsnapshot-job-transact-sql.md).  
  
10. At the Publisher on the publication database, execute [sp_helpmergepartition (Transact-SQL)](../system-stored-procedures/sp-helpmergepartition-transact-sql.md), specifying the value of **\@publication** from step 1 and the value of **\@suser_sname** or **\@host_name** from step 8. Note the value of the **dynamic_snapshot_jobid** in the result set.  
  
11. At the Distributor on the **msdb** database, execute [sp_start_job (Transact-SQL)](../system-stored-procedures/sp-start-job-transact-sql.md), specifying the value obtained in step 9 for **\@job_id**. This starts the parameterized snapshot job for the partition.  
  
12. Repeat steps 8-11 to generate a partitioned snapshot for each subscription.  
  
#### To create a publication and manually create snapshots for each partition  
  
1.  Execute [sp_addmergepublication (Transact-SQL)](../system-stored-procedures/sp-addmergepublication-transact-sql.md) to create the publication. For more information, see [Create a Publication](publish/create-a-publication.md).  
  
2.  At the Publisher, execute [sp_addpublication_snapshot (Transact-SQL)](../system-stored-procedures/sp-addpublication-snapshot-transact-sql.md). Specify the publication name used in step 1 for **\@publication** and the Windows credentials under which the Snapshot Agent runs for **\@job_login** and **\@password**. If the agent will use  SQL Server 
 Authentication when connecting to the Publisher, you must also specify a value of **0** for **\@publisher_security_mode** and the  SQL Server 
 login information for **\@publisher_login** and **\@publisher_password**. This creates a Snapshot Agent job for the publication. For more information about generating an initial snapshot and defining a custom schedule for the Snapshot Agent, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md).  
  
    > **Important:**  
    >  When configuring a Publisher with a remote Distributor, the values supplied for all parameters, including *job_login* and *job_password*, are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before executing this stored procedure. For more information, see [Enable Encrypted Connections to the Database Engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
3.  Execute [sp_addmergearticle (Transact-SQL)](../system-stored-procedures/sp-addmergearticle-transact-sql.md) to add articles to the publication. This stored procedure must be executed once for each article in the publication. When using parameterized filters, you must specify a parameterized row filter for at least one article using the **\@subset_filterclause** parameter. For more information, see [Define and Modify a Parameterized Row Filter for a Merge Article](publish/define-and-modify-a-parameterized-row-filter-for-a-merge-article.md).  
  
4.  If other articles will be filtered based on the parameterized row filter, execute [sp_addmergefilter (Transact-SQL)](../system-stored-procedures/sp-addmergefilter-transact-sql.md) to define the join or logical record relationships between articles. This stored procedure must be executed once for each relationship being defined. For more information, see [Define and Modify a Join Filter Between Merge Articles](publish/define-and-modify-a-join-filter-between-merge-articles.md).  
  
5.  Start the snapshot job or run the Replication Snapshot Agent from the command prompt to generate the standard snapshot schema and other files. For more information, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md).  
  
6.  Run the Replication Snapshot Agent again from the command prompt to generate bulk copy (.bcp) files, specifying the location of the partitioned snapshot for **-DynamicSnapshotLocation** and one or both of the following properties that defines the partition:  
  
    -   **-DynamicFilterHostName** - the value if [HOST_NAME &#40;Transact-SQL&#41;](../../t-sql/functions/host-name-transact-sql.md) is used.  
  
    -   **-DynamicFilterLogin** - the value if [SUSER_SNAME &#40;Transact-SQL&#41;](../../t-sql/functions/suser-sname-transact-sql.md) is used.  
  
7.  Repeat step 6 to generate a partitioned snapshot for each subscription.  
  
8.  Run the Merge Agent for each subscription to apply the initial partitioned snapshot at the Subscribers, specifying the following properties:  
  
    -   **-Hostname** - the value used to define the partition if the actual value of HOST_NAME is being overridden.  
  
    -   **-DynamicSnapshotLocation** - the location of the dynamic snapshot for this partition.  
  
> **Note:**  
>  For more information about programming replication agents, see [Replication Agent Executables Concepts](concepts/replication-agent-executables-concepts.md).  
  
###  <a name="TsqlExample"></a> Examples (Transact-SQL)  
 This example creates a merge publication with parameterized filters where Subscribers initiate the snapshot generation process. Values for **\@job_login** and **\@job_password** are passed in using scripting variables.  
  
 [language="sql" source="codesnippet/tsql/create-a-snapshot-for-a-\_1.sql"::: (complete source file; reference: codesnippet/tsql/create-a-snapshot-for-a-\_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/create-a-snapshot-for-a-_1.sql.md)
  
 This example creates a publication using a parameterized filter where each Subscriber has its partition defined by executing [sp_addmergepartition](../system-stored-procedures/sp-addmergepartition-transact-sql.md) and the filtered snapshot job created by executing [sp_adddynamicsnapshot_job](../system-stored-procedures/sp-adddynamicsnapshot-job-transact-sql.md) passing the partitioning information. Values for **\@job_login** and **\@job_password** are passed in using scripting variables.  
  
 [language="sql" source="codesnippet/tsql/create-a-snapshot-for-a-\_2.sql"::: (complete source file; reference: codesnippet/tsql/create-a-snapshot-for-a-\_2.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/create-a-snapshot-for-a-_2.sql.md)
  
 This example creates a publication using a parameterized filter where each Subscriber must have its data partition and filtered snapshot job created by supplying the partitioning information. A Subscriber supplies partitioning information using command-line parameters when manually running the replication agents. This example assumes that a subscription to the publication has also been created.  
  
 [language="sql" source="codesnippet/tsql/create-a-snapshot-for-a-\_3.sql"::: (complete source file; reference: codesnippet/tsql/create-a-snapshot-for-a-\_3.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/create-a-snapshot-for-a-_3.sql.md)
  
```  
  
REM Line breaks are added to improve readability.   
REM In a batch file, commands must be made in a single line.  
REM Run the Snapshot agent from the command line to generate the standard snapshot   
REM schema and other files.   
SET DistPub=%computername%  
SET PubDB=AdventureWorks2022   
SET PubName=AdvWorksSalesPersonMerge  
  
"C:\Program Files\Microsoft SQL Server\120\COM\SNAPSHOT.EXE" -Publication %PubName%    
-Publisher %DistPub% -Distributor  %DistPub%  -PublisherDB %PubDB%  -ReplicationType 2    
-OutputVerboseLevel 1  -DistributorSecurityMode 1  
  
PAUSE  
  
```  
  
```  
  
REM Run the Snapshot agent from the command line, this time to generate   
REM the bulk copy (.bcp) data for each Subscriber partition.    
SET DistPub=%computername%  
SET PubDB=AdventureWorks2022   
SET PubName=AdvWorksSalesPersonMerge  
SET SnapshotDir=\\%DistPub%\repldata\unc\fernando  
  
MD %SnapshotDir%  
  
"C:\Program Files\Microsoft SQL Server\120\COM\SNAPSHOT.EXE" -Publication %PubName%    
-Publisher %DistPub%  -Distributor  %DistPub%  -PublisherDB %PubDB%  -ReplicationType 2    
-OutputVerboseLevel 1  -DistributorSecurityMode 1  -DynamicFilterHostName "adventure-works\Fernando"    
-DynamicSnapshotLocation %SnapshotDir%  
  
PAUSE  
  
```  
  
```  
  
REM Run the Merge Agent for each subscription to apply the partitioned   
REM snapshot for each Subscriber.    
SET Publisher = %computername%  
SET Subscriber = %computername%  
SET PubDB = AdventureWorks2022   
SET SubDB = AdventureWorks2022Replica   
SET PubName = AdvWorksSalesPersonMerge   
SET SnapshotDir=\\%DistPub%\repldata\unc\fernando  
  
"C:\Program Files\Microsoft SQL Server\120\COM\REPLMERG.EXE" -Publisher  %Publisher%    
-Subscriber  %Subscriber%  -Distributor %Publisher%  -PublisherDB %PubDB%    
-SubscriberDB %SubDB% -Publication %PubName%  -PublisherSecurityMode 1  -OutputVerboseLevel 3    
-Output -SubscriberSecurityMode 1  -SubscriptionType 3 -DistributorSecurityMode 1    
-Hostname "adventure-works\Fernando"  -DynamicSnapshotLocation %SnapshotDir%  
  
PAUSE  
  
```  
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 You can use Replication Management Objects (RMO) to generate partitioned snapshots programmatically in the following ways:  
  
-   Allow Subscribers to request snapshot generation and application the first time they synchronize.  
  
-   Pre-generate snapshots for each partition.  
  
-   Manually generate a snapshot for each Subscriber by running the Snapshot Agent.  
  
> **Note:**  
>  When filtering for an article yields non-overlapping partitions that are unique for each subscription (by specifying a value of F:Microsoft.SqlServer.Replication.PartitionOptions.NonOverlappingSingleSubscription for P:Microsoft.SqlServer.Replication.MergeArticle.PartitionOption when creating a merge article), metadata is cleaned up whenever the Merge Agent runs. This means that the partitioned snapshot expires more quickly. When you use this option, you should consider allowing Subscribers to request snapshot generation. For more information, see the section Using the Appropriate Filtering Options in the topic [Parameterized Row Filters](merge/parameterized-filters-parameterized-row-filters.md).  
  
> **Important:**  
>  When possible, prompt users to enter security credentials at runtime. If you must store credentials, use the [cryptographic services](https://learn.microsoft.com/previous-versions/aa719848\(v=vs.71\)) provided by the  Microsoft 
 Windows .NET Framework.  
  
#### To create a publication that allows Subscribers to initiate snapshot generation and delivery  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationDatabase) class for the publication database, set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the instance of [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1, and call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method. If [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) returns **false**, confirm that the database exists.  
  
3.  If [Microsoft.SqlServer.Replication.ReplicationDatabase.EnabledMergePublishing%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationDatabase.EnabledMergePublishing%252A) property is **false**, set it to **true** and call [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A).  
  
4.  Create an instance of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) class, and set the following properties for this object:  
  
    -   The [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1 for [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
    -   The name of the published database for [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A).  
  
    -   A name for the publication for [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A).  
  
    -   The maximum number of dynamic snapshot jobs to run for [Microsoft.SqlServer.Replication.MergePublication.MaxConcurrentDynamicSnapshots%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication.MaxConcurrentDynamicSnapshots%252A). Because Subscriber initiated snapshot requests can occur at any time, this property limits the number of Snapshot Agent jobs that can run simultaneously when multiple Subscribers request their partitioned snapshot at the same time. When the maximum number of jobs are running, additional partitioned snapshot requests are queued until one of the running jobs is completed.  
  
    -   Use the bitwise logical OR (**|** in Visual C# and **Or** in Visual Basic) operator to add the value [Microsoft.SqlServer.Replication.PublicationAttributes.AllowSubscriberInitiatedSnapshot](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes.AllowSubscriberInitiatedSnapshot) to [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A).  
  
    -   The [Microsoft.SqlServer.Replication.IProcessSecurityContext.Login%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.IProcessSecurityContext.Login%252A) and [Microsoft.SqlServer.Replication.IProcessSecurityContext.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.IProcessSecurityContext.Password%252A) fields of [Microsoft.SqlServer.Replication.Publication.SnapshotGenerationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.SnapshotGenerationAgentProcessSecurity%252A) to provide the credentials for the  Microsoft 
 Windows account under which the Snapshot Agent job runs.  
  
        > **Note:**  
        >  Setting [Microsoft.SqlServer.Replication.Publication.SnapshotGenerationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.SnapshotGenerationAgentProcessSecurity%252A) is recommended when the publication is created by a member of the **sysadmin** fixed server role. For more information, see [Replication Agent Security Model](security/replication-agent-security-model.md).  
  
5.  Call the [Microsoft.SqlServer.Replication.Publication.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Create%252A) method to create the publication.  
  
    > **Important:**  
    >  When configuring a Publisher with a remote Distributor, the values supplied for all properties, including [Microsoft.SqlServer.Replication.Publication.SnapshotGenerationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.SnapshotGenerationAgentProcessSecurity%252A), are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before calling the [Microsoft.SqlServer.Replication.Publication.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Create%252A) method. For more information, see [Enable Encrypted Connections to the Database Engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
6.  Use the [Microsoft.SqlServer.Replication.MergeArticle](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle) property to add articles to the publication. Specify the [Microsoft.SqlServer.Replication.MergeArticle.FilterClause%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle.FilterClause%252A) property for at least one article that defines the parameterized filter. (Optional) Create [Microsoft.SqlServer.Replication.MergeJoinFilter](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeJoinFilter) objects that define join filters between articles. For more information, see [Define an Article](publish/define-an-article.md).  
  
7.  If the value of [Microsoft.SqlServer.Replication.Publication.SnapshotAgentExists%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.SnapshotAgentExists%252A) is **false**, call [Microsoft.SqlServer.Replication.Publication.CreateSnapshotAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.CreateSnapshotAgent%252A) to create the initial Snapshot Agent job for this publication.  
  
8.  Call the [Microsoft.SqlServer.Replication.Publication.StartSnapshotGenerationAgentJob%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.StartSnapshotGenerationAgentJob%252A) method of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) object created in step 4. This starts the agent job that generates the initial snapshot. For more information about generating an initial snapshot and defining a custom schedule for the Snapshot Agent, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md).  
  
9. (Optional) Check for a value of **true** for the [Microsoft.SqlServer.Replication.MergePublication.SnapshotAvailable%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication.SnapshotAvailable%252A) property to determine when the initial snapshot is ready for use.  
  
10. When the Merge Agent for a Subscriber connects for the first time, a partitioned snapshot is generated automatically.  
  
#### To create a publication and pregenerate or automatically refresh snapshots  
  
1.  Use an instance of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) class to define a merge publication. For more information, see [Create a Publication](publish/create-a-publication.md).  
  
2.  Use the [Microsoft.SqlServer.Replication.MergeArticle](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle) property to add articles to the publication. Specify the [Microsoft.SqlServer.Replication.MergeArticle.FilterClause%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle.FilterClause%252A) property for at least one article that defines the parameterized filter, and create any [Microsoft.SqlServer.Replication.MergeJoinFilter](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeJoinFilter) objects that define join filters between articles. For more information, see [Define an Article](publish/define-an-article.md).  
  
3.  If the value of [Microsoft.SqlServer.Replication.Publication.SnapshotAgentExists%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.SnapshotAgentExists%252A) is **false**, call [Microsoft.SqlServer.Replication.Publication.CreateSnapshotAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.CreateSnapshotAgent%252A) to create the snapshot agent job for this publication.  
  
4.  Call the [Microsoft.SqlServer.Replication.Publication.StartSnapshotGenerationAgentJob%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.StartSnapshotGenerationAgentJob%252A) method of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) object created in step 1. This method starts the agent job that generates the initial snapshot. For more information on generating an initial snapshot and defining a custom schedule for the Snapshot Agent, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md).  
  
5.  Check for a value of **true** for the [Microsoft.SqlServer.Replication.MergePublication.SnapshotAvailable%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication.SnapshotAvailable%252A) property to determine when the initial snapshot is ready for use.  
  
6.  Create an instance of the [Microsoft.SqlServer.Replication.MergePartition](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePartition) class, and set the parameterized filtering criteria for the Subscriber by using one or both of the following properties:  
  
    -   If the Subscriber's partition is defined by the result of [SUSER_SNAME &#40;Transact-SQL&#41;](../../t-sql/functions/suser-sname-transact-sql.md), use [Microsoft.SqlServer.Replication.MergePartition.DynamicFilterLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePartition.DynamicFilterLogin%252A).  
  
    -   If the Subscriber's partition is defined by the result of [HOST_NAME &#40;Transact-SQL&#41;](../../t-sql/functions/host-name-transact-sql.md) or an overload of this function, use [Microsoft.SqlServer.Replication.MergePartition.DynamicFilterHostName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePartition.DynamicFilterHostName%252A).  
  
7.  Create an instance of the [Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob) class, and set the same property as in step 6.  
  
8.  Use the [Microsoft.SqlServer.Replication.ReplicationAgentSchedule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationAgentSchedule) class to define a schedule for generating the filtered snapshot for the Subscriber partition.  
  
9. Using the instance of [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) from step 1, call [Microsoft.SqlServer.Replication.MergePublication.AddMergePartition%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication.AddMergePartition%252A). Pass the [Microsoft.SqlServer.Replication.MergePartition](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePartition) object from step 6.  
  
10. Using the instance of [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) from step 1, call the [Microsoft.SqlServer.Replication.MergePublication.AddMergeDynamicSnapshotJob%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication.AddMergeDynamicSnapshotJob%252A) method. Pass the [Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob) object from step 7 and the [Microsoft.SqlServer.Replication.ReplicationAgentSchedule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationAgentSchedule) object from step 8.  
  
11. Call [Microsoft.SqlServer.Replication.MergePublication.EnumMergeDynamicSnapshotJobs%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication.EnumMergeDynamicSnapshotJobs%252A), and locate the [Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob) object for the newly added partitioned snapshot job in the returned array.  
  
12. Get the [Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeDynamicSnapshotJob.Name%252A) property for the job.  
  
13. Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
14. Create an instance of the SQL Server Management Objects (SMO) [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) class, passing the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object from step 13.  
  
15. Create an instance of the [Microsoft.SqlServer.Management.Smo.Agent.Job](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Agent.Job) class, passing the [Microsoft.SqlServer.Management.Smo.Server.JobServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.JobServer%252A) property of the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object from step 14 and the job name from step 12.  
  
16. Call the [Microsoft.SqlServer.Management.Smo.Agent.Job.Start%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Agent.Job.Start%252A) method to start the partitioned snapshot job.  
  
17. Repeat steps 6-16 for each Subscriber.  
  
#### To create a publication and manually create snapshots for each partition  
  
1.  Use an instance of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) class to define a merge publication. For more information, see [Create a Publication](publish/create-a-publication.md).  
  
2.  Use the [Microsoft.SqlServer.Replication.MergeArticle](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle) property to add articles to the publication Specify the [Microsoft.SqlServer.Replication.MergeArticle.FilterClause%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle.FilterClause%252A) property for at least one article that defines the parameterized filter, and create any [Microsoft.SqlServer.Replication.MergeJoinFilter](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeJoinFilter) objects that define join filters between articles. For more information, see [Define an Article](publish/define-an-article.md).  
  
3.  Generate the initial snapshot. For more information, see [Create and Apply the Initial Snapshot](create-and-apply-the-initial-snapshot.md).  
  
4.  Create an instance of the [Microsoft.SqlServer.Replication.SnapshotGenerationAgent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent) class, and set the following required properties:  
  
    -   [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.Publisher%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.Publisher%252A) - name of the Publisher  
  
    -   [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.PublisherDatabase%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.PublisherDatabase%252A) - name of the publication database  
  
    -   [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.Publication%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.Publication%252A) - name of the publication  
  
    -   [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.Distributor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.Distributor%252A) - name of the Distributor  
  
    -   [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.PublisherSecurityMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.PublisherSecurityMode%252A) - a value of [Microsoft.SqlServer.Replication.SecurityMode.Integrated](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SecurityMode.Integrated) to used Windows Integrated Authentication or a value of [Microsoft.SqlServer.Replication.SecurityMode.Standard](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SecurityMode.Standard) to use SQL Server Authentication.  
  
    -   [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.DistributorSecurityMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.DistributorSecurityMode%252A) - a value of [Microsoft.SqlServer.Replication.SecurityMode.Integrated](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SecurityMode.Integrated) to used Windows Integrated Authentication or a value of [Microsoft.SqlServer.Replication.SecurityMode.Standard](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SecurityMode.Standard) to use SQL Server Authentication.  
  
5.  Set a value of [Microsoft.SqlServer.Replication.ReplicationType.Merge](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationType.Merge) for [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.ReplicationType%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.ReplicationType%252A).  
  
6.  Set one or more of the following properties to define the partitioning parameters:  
  
    -   If the Subscriber's partition is defined by the result of [SUSER_SNAME &#40;Transact-SQL&#41;](../../t-sql/functions/suser-sname-transact-sql.md), use [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.DynamicFilterLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.DynamicFilterLogin%252A).  
  
    -   If the Subscriber's partition is defined by the result of [HOST_NAME &#40;Transact-SQL&#41;](../../t-sql/functions/host-name-transact-sql.md) or an overload of this function, use [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.DynamicFilterHostName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.DynamicFilterHostName%252A).  
  
7.  Call the [Microsoft.SqlServer.Replication.SnapshotGenerationAgent.GenerateSnapshot%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SnapshotGenerationAgent.GenerateSnapshot%252A) method.  
  
8.  Repeat steps 4-7 for each Subscriber.  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 This example creates a merge publication that allows Subscribers to requested snapshot generation.  
  
 [HowTo#rmo_CreateMergePub (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_createmergepub)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_CreateMergePub (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_createmergepub)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 This example manually creates the Subscriber partition and the filtered snapshot for a merge publication with parameterized row filters.  
  
 [HowTo#rmo_CreateMergePartition (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_createmergepartition)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_CreateMergePartition (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_createmergepartition)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 This example manually starts the Snapshot Agent to generate the filtered data snapshot for a Subscriber to a merge publication with parameterized row filters.  
  
 [HowTo#rmo_GenerateFilteredSnapshot (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_generatefilteredsnapshot)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_GenerateFilteredSnapshot (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_generatefilteredsnapshot)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
## Related content

- [Parameterized Filters - Parameterized Row Filters](merge/parameterized-filters-parameterized-row-filters.md)
- [Replication System Stored Procedures Concepts](concepts/replication-system-stored-procedures-concepts.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
