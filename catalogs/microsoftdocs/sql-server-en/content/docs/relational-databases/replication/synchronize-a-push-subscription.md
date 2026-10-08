---
title: "Synchronize a Push Subscription"
description: Learn how to synchronize a push subscription in SQL Server by using SQL Server Management Studio, replication agents, or Replication Management Objects.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "synchronization [SQL Server replication], push subscriptions"
  - "subscriptions [SQL Server replication], push"
  - "push subscriptions [SQL Server replication], synchronizing"
monikerRange: "=azuresqldb-current || >=sql-server-2017"
---
# Synchronize a Push Subscription

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  This topic describes how to synchronize a push subscription in  SQL Server 
 by using  SQL Server Management Studio 
, [replication agents](agents/replication-agents-overview.md), or Replication Management Objects (RMO).  
  
  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).


##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 Subscriptions are synchronized by the Distribution Agent (for snapshot and transactional replication) or the Merge Agent (for merge replication). Agents can run continuously, run on demand, or run on a schedule. For more information about specifying synchronization schedules, see [Specify Synchronization Schedules](specify-synchronization-schedules.md).  
  
 Synchronize a subscription on demand from the **Local Publications** and **Local Subscriptions** folders in  Microsoft 
  SQL Server Management Studio 
 and the **All Subscriptions** tab in Replication Monitor. Subscriptions to Oracle publications cannot be synchronized on demand from the Subscriber. For information about starting Replication Monitor, see [Start the Replication Monitor](monitor/start-the-replication-monitor.md).  
  
#### To synchronize a push subscription on demand in Management Studio (at the Publisher)  
  
1.  Connect to the Publisher in  Management Studio
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Publications** folder.  
  
3.  Expand the publication for which you want to synchronize subscriptions.  
  
4.  Right-click the subscription you want to synchronize, and then click **View Synchronization Status**.  
  
5.  In the **View Synchronization Status - \<Subscriber>:\<SubscriptionDatabase>** dialog box, click **Start**. When synchronization is complete, the message **Synchronization completed** is displayed.  
  
6.  Click **Close**.  

#### To synchronize a push subscription on demand in Management Studio (at the Subscriber)  
  
1.  Connect to the Subscriber in  Management Studio
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Subscriptions** folder.  
  
3.  Right-click the subscription you want to synchronize, and then click **View Synchronization Status**.  
  
4.  A message is displayed about establishing a connection to the Distributor. Click **OK**.  
  
5.  In the **View Synchronization Status - \<Subscriber>:\<SubscriptionDatabase>** dialog box, click **Start**. When synchronization is complete, the message **Synchronization completed** is displayed.  
  
6.  Click **Close**.  
  
#### To synchronize a push subscription on demand in Replication Monitor  
  
1.  In Replication Monitor, expand a Publisher group in the left pane, expand a Publisher, and then click a publication.  
  
2.  Click the **All Subscriptions** tab.  
  
3.  Right-click the subscription you want to synchronize, and then click **Start Synchronizing**.  
  
4.  To view synchronization progress, right-click the subscription, and then click **View Details**.  
  
##  <a name="ReplProg"></a> Using Replication Agents  
 Push subscriptions can be synchronized programmatically and on-demand by invoking the appropriate replication agent executable file from the command prompt. The replication agent executable file that is invoked will depend on the type of publication to which the push subscription belongs.  
  
#### To start the Distribution Agent to synchronize a push subscription to a transactional publication  
  
1.  From the command prompt or in a batch file at the Distributor, execute **distrib.exe**. Specify the following command-line arguments:  
  
    -   **-Publisher**  
  
    -   **-PublisherDB**  
  
    -   **-Distributor**  
  
    -   **-Subscriber**  
  
    -   **-SubscriberDB**  
  
    -   **-SubscriptionType = 0**  
  
     If you are using SQL Server Authentication, you must also specify the following arguments:  
  
    -   **-DistributorLogin**  
  
    -   **-DistributorPassword**  
  
    -   **-DistributorSecurityMode = 0**  
  
    -   **-PublisherLogin**  
  
    -   **-PublisherPassword**  
  
    -   **-PublisherSecurityMode = 0**  
  
    -   **-SubscriberLogin**  
  
    -   **-SubscriberPassword**  
  
    -   **-SubscriberSecurityMode = 0**  
  
        > **Important:**  
        >   When possible, use Windows authentication. 
  
  
#### To start the Merge Agent to synchronize a push subscription to a merge publication  
  
1.  From the command prompt or in a batch file at the Distributor, execute **replmerg.exe**. Specify the following command-line arguments:  
  
    -   **-Publisher**  
  
    -   **-PublisherDB**  
  
    -   **-Publication**  
  
    -   **-Distributor**  
  
    -   **-Subscriber**  
  
    -   **-SubscriberDB**  
  
    -   **-SubscriptionType = 0**  
  
     If you are using SQL Server Authentication, you must also specify the following arguments:  
  
    -   **-DistributorLogin**  
  
    -   **-DistributorPassword**  
  
    -   **-DistributorSecurityMode = 0**  
  
    -   **-PublisherLogin**  
  
    -   **-PublisherPassword**  
  
    -   **-PublisherSecurityMode = 0**  
  
    -   **-SubscriberLogin**  
  
    -   **-SubscriberPassword**  
  
    -   **-SubscriberSecurityMode = 0**  
  
        > **Important:**  
        >   When possible, use Windows authentication. 
  
  
###  <a name="TsqlExample"></a> Examples (Replication Agents)  
 The following example starts the Distribution Agent to synchronize a push subscription.  
  
```  
  
REM -- Declare the variables.  
SET Publisher=%instancename%  
SET Subscriber=%instancename%  
SET PublicationDB=AdventureWorks2022  
SET SubscriptionDB=AdventureWorks2022Replica   
SET Publication=AdvWorksProductsTran  
  
REM -- Start the Distribution Agent with four subscription streams.  
REM -- The following command must be supplied without line breaks.  
"C:\Program Files\Microsoft SQL Server\120\COM\DISTRIB.EXE" -Subscriber %Subscriber%   
-SubscriberDB %SubscriptionDB% -SubscriberSecurityMode 1 -Publication %Publication%   
-Publisher %Publisher% -PublisherDB %PublicationDB% -Distributor %Publisher%   
-DistributorSecurityMode 1 -Continuous -SubscriptionType 0 -SubscriptionStreams 4  
  
```  
  
 The following example starts the Merge Agent to synchronize a push subscription.  
  
```  
  
REM -- Declare the variables.  
SET Publisher=%instancename%  
SET Subscriber=%instancename%  
SET PublicationDB=AdventureWorks2022  
SET SubscriptionDB=AdventureWorks2022Replica   
SET Publication=AdvWorksSalesOrdersMerge  
  
REM -- Start the Merge Agent.  
REM -- The following command must be supplied without line breaks.  
"C:\Program Files\Microsoft SQL Server\120\COM\REPLMERG.EXE"  -Publisher %Publisher%   
-Subscriber  %Subscriber%  -Distributor %Publisher% -PublisherDB  %PublicationDB%   
-SubscriberDB %SubscriptionDB% -Publication %Publication% -PublisherSecurityMode 1   
-OutputVerboseLevel 3  -Output -SubscriberSecurityMode 1  -SubscriptionType 0   
-DistributorSecurityMode 1  
  
```  
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 You can synchronize push subscriptions programmatically by using Replication Management Objects (RMO) and managed code access to replication agent functionalities. The classes that you use to synchronize a push subscription depend on the type of publication to which the subscription belongs.  
  
> **Note:**
>  If you want to start a synchronization that runs autonomously without affecting your application, start the agent asynchronously. However, if you want to monitor the outcome of the synchronization and receive callbacks from the agent during the synchronization process (for example, if you want to display a progress bar), you should start the agent synchronously. For  Microsoft 
  SQL Server 2005 Express edition 
 Subscribers, you must start the agent synchronously.  
  
#### To synchronize a push subscription to a snapshot or transactional publication  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSubscription) class and set the following properties:  
  
    -   The publication database name for [Microsoft.SqlServer.Replication.Subscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.DatabaseName%252A).  
  
    -   The name of the publication to which the subscription belongs for [Microsoft.SqlServer.Replication.Subscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.PublicationName%252A).  
  
    -   The name of the subscription database for [Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%252A).  
  
    -   The name of the Subscriber for [Microsoft.SqlServer.Replication.Subscription.SubscriberName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberName%252A).  
  
    -   The connection created in step 1 for [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
3.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the remaining subscription properties. If this method returns **false**, verify that the subscription exists.  
  
4.  Start the Distribution Agent at the Distributor in one of the following ways:  
  
    -   Call the [Microsoft.SqlServer.Replication.TransSubscription.SynchronizeWithJob%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSubscription.SynchronizeWithJob%252A) method on the instance of [Microsoft.SqlServer.Replication.TransSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSubscription) from step 2. This method starts the Distribution Agent asynchronously, and control immediately returns to your application while the agent job is running. You cannot call this method if the subscription was created with a value of **false** for [Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%252A).  
  
    -   Obtain an instance of the [Microsoft.SqlServer.Replication.TransSynchronizationAgent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent) class from the [Microsoft.SqlServer.Replication.TransSubscription.SynchronizationAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSubscription.SynchronizationAgent%252A) property, and call the [Microsoft.SqlServer.Replication.TransSynchronizationAgent.Synchronize%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.Synchronize%252A) method. This method starts the agent synchronously, and control remains with the running agent job. During synchronous execution you can handle the [Microsoft.SqlServer.Replication.TransSynchronizationAgent.Status](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.Status) event while the agent is running.  
  
#### To synchronize a push subscription to a merge publication  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergeSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscription) class, and set the following properties:  
  
    -   The publication database name for [Microsoft.SqlServer.Replication.Subscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.DatabaseName%252A).  
  
    -   The name of the publication to which the subscription belongs for [Microsoft.SqlServer.Replication.Subscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.PublicationName%252A).  
  
    -   The name of the subscription database for [Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%252A).  
  
    -   The name of the Subscriber for [Microsoft.SqlServer.Replication.Subscription.SubscriberName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberName%252A).  
  
    -   The connection created in step 1 for [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
3.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the remaining subscription properties. If this method returns **false**, verify that the subscription exists.  
  
4.  Start the Merge Agent at the Distributor in one of the following ways:  
  
    -   Call the [Microsoft.SqlServer.Replication.MergeSubscription.SynchronizeWithJob%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscription.SynchronizeWithJob%252A) method on the instance of [Microsoft.SqlServer.Replication.MergeSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscription) from step 2. This method starts the Merge Agent asynchronously, and control immediately returns to your application while the agent job is running. You cannot call this method if the subscription was created with a value of **false** for [Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%252A).  
  
    -   Obtain an instance of the [Microsoft.SqlServer.Replication.MergeSynchronizationAgent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent) class from the [Microsoft.SqlServer.Replication.MergeSubscription.SynchronizationAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscription.SynchronizationAgent%252A) property, and call the [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Synchronize%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Synchronize%252A) method. This method starts the Merge Agent synchronously, and control remains with the running agent job. During synchronous execution, you can handle the [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Status](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Status) event while the agent is running.  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 This example synchronizes a push subscription to a transactional publication, where the agent is started asynchronously using the agent job.  
  
 [HowTo#rmo_SyncTranPushSub_WithJob (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_synctranpushsub_withjob)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_SyncTranPushSub_WithJob (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_synctranpushsub_withjob)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 This example synchronizes a push subscription to a transactional publication, where the agent is started synchronously.  
  
 [HowTo#rmo_SyncTranPushSub (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_synctranpushsub)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_SyncTranPushSub (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_synctranpushsub)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 This example synchronizes a push subscription to a merge publication, where the agent is started asynchronously using the agent job.  
  
 [HowTo#rmo_SyncMergePushSub_WithJob (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_syncmergepushsub_withjob)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_SyncMergePushSub_WithJob (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_syncmergepushsub_withjob)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 This example synchronizes a push subscription to a merge publication, where the agent is started synchronously.  
  
 [HowTo#rmo_SyncMergePushSub (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_syncmergepushsub)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_SyncMergePushSub (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_syncmergepushsub)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
## Related content

- [Replication Management Objects Concepts](concepts/replication-management-objects-concepts.md)
- [Synchronize Data](synchronize-data.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
