---
title: "View and Modify Push Subscription Properties"
description: "View and Modify Push Subscription Properties"
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
  - "push subscriptions [SQL Server replication], properties"
  - "subscriptions [SQL Server replication], push"
  - "push subscriptions [SQL Server replication], modifying"
  - "modifying replication properties, push subscriptions"
  - "modifying subscriptions, SQL Server Management Studio"
monikerRange: "=azuresqldb-current || >=sql-server-2017"
---
# View and Modify Push Subscription Properties

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  This topic describes how to view and modify push subscription properties in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO).  

  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).


  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 View and modify push subscription properties from the Publisher in:  
  
-   The **Subscription Properties - \<Publisher>: \<PublicationDatabase>** dialog box, which is available from  SQL Server Management Studio 
.  
  
-   The **All Subscriptions** tab, which is available in Replication Monitor. For information about starting Replication Monitor, see [Start the Replication Monitor](monitor/start-the-replication-monitor.md).  
  
#### To view and modify push subscription properties in Management Studio  
  
1.  Connect to the Publisher in  Management Studio
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Publications** folder.  
  
3.  Expand the appropriate publication, right-click a subscription, and then click **Properties**.  
  
4.  Modify any properties if necessary, and then click **OK**.  
  
#### To view and modify push subscription properties in Replication Monitor  
  
1.  Expand a Publisher group in the left pane of Replication Monitor, expand a Publisher, and then click a publication.  
  
2.  Click the **All Subscriptions** tab.  
  
3.  Right-click a subscription, and then click **Properties**.  
  
4.  Modify any properties if necessary, and then click **OK**.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 Push subscriptions can be modified and their properties accessed programmatically using replication stored procedures. The stored procedures used depend on the type of publication to which the subscription belongs.  
  
#### To view the properties of a push subscription to a snapshot or transactional publication  
  
1.  At the Publisher on the publication database, execute [sp_helpsubscription](../system-stored-procedures/sp-helpsubscription-transact-sql.md). Specify **\@publication**, **\@subscriber**, and a value of **all** for **\@article**.  
  
2.  At the Publisher on the publication database, execute [sp_helpsubscriberinfo](../system-stored-procedures/sp-helpsubscriberinfo-transact-sql.md), specifying **\@subscriber**.  
  
#### To change the properties of a push subscription to a snapshot or transactional publication  
  
1.  At the Publisher on the publication database, execute [sp_changesubscriber](../system-stored-procedures/sp-changesubscriber-transact-sql.md), specifying **\@subscriber** and any parameters for the Subscriber properties being changed.  
  
2.  At the Publisher on the publication database, execute [sp_changesubscription](../system-stored-procedures/sp-changesubscription-transact-sql.md). Specify **\@publication**, **\@subscriber**, **\@destination_db**, a value of **all** for **\@article**, the subscription property being changed as **\@property**, and the new value as **\@value**. This changes security settings for the push subscription.  
  
3.  (Optional) To change the Data Transformation Services (DTS) package properties of a subscription, execute [sp_changesubscriptiondtsinfo](../system-stored-procedures/sp-changesubscriptiondtsinfo-transact-sql.md) at the Subscriber on the subscription database. Specify the ID of the Distribution Agent job for **\@jobid** and the following DTS package properties:  
  
    -   **\@dts_package_name**  
  
    -   **\@dts_package_password**  
  
    -   **\@dts_package_location**  
  
     This changes the DTS package properties of a subscription.  
  
    > **Note:**  
    >  The job ID can be obtained by executing [sp_helpsubscription](../system-stored-procedures/sp-helpsubscription-transact-sql.md).  
  
#### To view the properties of a push subscription to a merge publication  
  
1.  At the Publisher on the publication database, execute [sp_helpmergesubscription](../system-stored-procedures/sp-helpmergesubscription-transact-sql.md). Specify **\@publication** and **\@subscriber**.  
  
2.  At the Publisher, execute [sp_helpsubscriberinfo](../system-stored-procedures/sp-helpsubscriberinfo-transact-sql.md), specifying **\@subscriber**.  
  
#### To change the properties of a push subscription to a merge publication  
  
1.  At the Publisher on the publication database, execute [sp_changemergesubscription](../system-stored-procedures/sp-changemergesubscription-transact-sql.md). Specify **\@publication**, **\@subscriber**, **\@subscriber_db**, the subscription property being changed as **\@property**, and the new value as **\@value**.  
  
###  <a name="TsqlExample"></a> Example (Transact-SQL)  
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 The RMO classes you use to view or modify push subscription properties depend on the type of publication to which the push subscription is subscribed.  
  
#### To view or modify properties of a push subscription to a snapshot or transactional publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSubscription) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Subscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.PublicationName%252A), [Microsoft.SqlServer.Replication.Subscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.DatabaseName%252A), [Microsoft.SqlServer.Replication.Subscription.SubscriberName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberName%252A), and [Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%252A) properties.  
  
4.  Set the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1 for the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property setting.  
  
5.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the subscription properties in step 3 were defined incorrectly or the subscription does not exist.  
  
6.  (Optional) To change properties, set a new value for one of the [Microsoft.SqlServer.Replication.TransSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSubscription) properties that can be set, and then call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method.  
  
7.  (Optional) To view the new settings, call the [Microsoft.SqlServer.Replication.ReplicationObject.Refresh%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.Refresh%252A) method to reload the properties for the subscription.  
  
#### To view or modify properties of a push subscription to a merge publication  
  
1.  Create a connection to the Subscriber by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergeSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscription) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Subscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.PublicationName%252A), [Microsoft.SqlServer.Replication.Subscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.DatabaseName%252A), [Microsoft.SqlServer.Replication.Subscription.SubscriberName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberName%252A), and [Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%252A) properties.  
  
4.  Set the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1 for the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property setting.  
  
5.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the subscription properties in step 3 were defined incorrectly or the subscription does not exist.  
  
6.  (Optional) To change properties, set a new value for one of the [Microsoft.SqlServer.Replication.MergeSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscription) properties that can be set, and then call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method.  
  
7.  (Optional) To view the new settings, call the [Microsoft.SqlServer.Replication.ReplicationObject.Refresh%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.Refresh%252A) method to reload the properties for the subscription.  
  
## Related content

- [View information and perform tasks using Replication Monitor](monitor/view-information-and-perform-tasks-replication-monitor.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
- [Subscribe to Publications](subscribe-to-publications.md)
