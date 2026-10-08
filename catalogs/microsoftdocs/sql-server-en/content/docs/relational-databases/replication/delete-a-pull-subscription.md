---
title: "Delete a Pull Subscription"
description: "Delete a Pull Subscription"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 02/03/2026
ai-usage: ai-assisted
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "removing subscriptions"
  - "deleting subscriptions"
  - "pull subscriptions [SQL Server replication], deleting"
  - "subscriptions [SQL Server replication], pull"
monikerRange: "=azuresqldb-mi-current || =azuresqldb-current || >=sql-server-2017"
---
# Delete a Pull Subscription

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 




  This topic describes how to delete a pull subscription in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO).  

##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 Delete a pull subscription at the Publisher (from the **Local Publications** folder in  SQL Server Management Studio 
) or the Subscriber (from the **Local Subscriptions** folder). Deleting a subscription does not remove objects or data from the subscription; they must be removed manually.

> **Note:**
> For information about a known issue that affects push subscriptions when using non-default ports, see [Delete a push subscription](delete-a-push-subscription.md#known-issue-port).  
  
#### To delete a pull subscription at the Publisher  
  
1.  Connect to the Publisher in  SQL Server Management Studio 
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Publications** folder.  
  
3.  Expand the publication associated with the subscription you want to delete.  
  
4.  Right-click the subscription, and then click **Delete**.  
  
5.  In the confirmation dialog box, select whether to connect to the Subscriber to delete subscription information. If you clear the **Connect to Subscriber** check box, you should connect to the Subscriber later to delete the information.  
  
#### To delete a pull subscription at the Subscriber  
  
1.  Connect to the Subscriber in  SQL Server Management Studio 
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Subscriptions** folder.  
  
3.  Right-click the subscription you want to delete, and then click **Delete**.  
  
4.  In the confirmation dialog box, select whether to connect to the Publisher to delete subscription information. If you clear the **Connect to Publisher** check box, you should connect to the Publisher later to delete the information.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 Pull subscriptions can be deleted programmatically using replication stored procedures. The stored procedures used will depend on the type of publication to which the subscription belongs.  
  
#### To delete a pull subscription to a snapshot or transactional publication  
  
1.  At the Subscriber on the subscription database, execute [sp_droppullsubscription (Transact-SQL)](../system-stored-procedures/sp-droppullsubscription-transact-sql.md). Specify **\@publication**, **\@publisher**, and **\@publisher_db**.  
  
2.  At the Publisher on the publication database, execute [sp_dropsubscription (Transact-SQL)](../system-stored-procedures/sp-dropsubscription-transact-sql.md). Specify **\@publication** and **\@subscriber**. Specify a value of **all** for **\@article**. (Optional) If the Distributor cannot be accessed, specify a value of **1** for **\@ignore_distributor** to delete the subscription without removing related objects at the Distributor.  
  
#### To delete a pull subscription to a merge publication  
  
1.  At the Subscriber on the subscription database, execute [sp_dropmergepullsubscription (Transact-SQL)](../system-stored-procedures/sp-dropmergepullsubscription-transact-sql.md). Specify **\@publication**, **\@publisher**, and **\@publisher_db**.  
  
2.  At the Publisher on the publication database, execute [sp_dropmergesubscription (Transact-SQL)](../system-stored-procedures/sp-dropmergesubscription-transact-sql.md). Specify **\@publication**, **\@subscriber**, and **\@subscriber_db**. Specify a value of **pull** for **\@subscription_type**. (Optional) If the Distributor cannot be accessed, specify a value of **1** for **\@ignore_distributor** to delete the subscription without removing related objects at the Distributor.  
  
###  <a name="TsqlExample"></a> Examples (Transact-SQL)  
 The following example deletes a pull subscription to a transactional publication. The first batch is executed at the Subscriber and the second is executed at the Publisher.  
  
 [language="sql" source="codesnippet/tsql/delete-a-pull-subscription_1.sql"::: (complete source file; reference: codesnippet/tsql/delete-a-pull-subscription_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/delete-a-pull-subscription_1.sql.md)
  
 [language="sql" source="codesnippet/tsql/delete-a-pull-subscription_2.sql"::: (complete source file; reference: codesnippet/tsql/delete-a-pull-subscription_2.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/delete-a-pull-subscription_2.sql.md)
  
 The following example deletes a pull subscription to a merge publication. The first batch is executed at the Subscriber and the second is executed at the Publisher.  
  
 [language="sql" source="codesnippet/tsql/delete-a-pull-subscription_3.sql"::: (complete source file; reference: codesnippet/tsql/delete-a-pull-subscription_3.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/delete-a-pull-subscription_3.sql.md)
  
 [language="sql" source="codesnippet/tsql/delete-a-pull-subscription_4.sql"::: (complete source file; reference: codesnippet/tsql/delete-a-pull-subscription_4.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/delete-a-pull-subscription_4.sql.md)
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 You can delete pull subscriptions programmatically by using Replication Management Objects (RMO). The RMO classes that you use to delete a pull subscription depend on the type of publication to which the pull subscription is subscribed.  
  
#### To delete a pull subscription to a snapshot or transactional publication  
  
1.  Create connections to both the Subscriber and Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) Class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransPullSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPullSubscription) class, and set the [Microsoft.SqlServer.Replication.PullSubscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationName%252A), [Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%252A), [Microsoft.SqlServer.Replication.PullSubscription.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublisherName%252A), and [Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%252A) properties. Use the Subscriber connection from step 1 to set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property.  
  
3.  Check the [Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%252A) property to verify that the subscription exists. If the value of this property is **false**, either the subscription properties in step 2 were defined incorrectly or the subscription does not exist.  
  
4.  Call the [Microsoft.SqlServer.Replication.PullSubscription.Remove%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.Remove%252A) method.  
  
5.  Create an instance of the [Microsoft.SqlServer.Replication.TransPublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPublication) class by using the Publisher connection from step 1. Specify [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A), [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A) and [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
6.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method. If this method returns **false**, either the properties specified in step 5 are incorrect or the publication does not exist on the server.  
  
7.  Call the [Microsoft.SqlServer.Replication.TransPublication.RemovePullSubscription%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPublication.RemovePullSubscription%252A) method. Specify the name of the Subscriber and the subscription database for the *subscriber* and *subscriberDB* parameters.  
  
#### To delete a pull subscription to a merge publication  
  
1.  Create connections to both the Subscriber and Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) Class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergePullSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePullSubscription) class, and set the [Microsoft.SqlServer.Replication.PullSubscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationName%252A), [Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%252A), [Microsoft.SqlServer.Replication.PullSubscription.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublisherName%252A), and [Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%252A) properties. Use the connection from step 1 to set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property.  
  
3.  Check the [Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%252A) property to verify that the subscription exists. If the value of this property is **false**, either the subscription properties in step 2 were defined incorrectly or the subscription does not exist.  
  
4.  Call the [Microsoft.SqlServer.Replication.PullSubscription.Remove%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.Remove%252A) method.  
  
5.  Create an instance of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) class by using the Publisher connection from step 1. Specify [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A), [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A) and [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
6.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method. If this method returns **false**, either the properties specified in step 5 are incorrect or the publication does not exist on the server.  
  
7.  Call the [Microsoft.SqlServer.Replication.MergePublication.RemovePullSubscription%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication.RemovePullSubscription%252A) method. Specify the name of the Subscriber and the subscription database for the *subscriber* and *subscriberDB* parameters.  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 This example deletes a pull subscription to a transactional publication and removes the subscription registration at the Publisher.  
  
 [language="csharp" source="../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs" range="rmo_droptranpullsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)

 [language="vb" source="../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb" range="rmo_vb_droptranpullsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)
  
 [language="csharp" source="../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs" range="rmo_dropmergepullsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)

 [language="vb" source="../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb" range="rmo_vb_dropmergepullsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)

## Related content

- [Subscribe to Publications](subscribe-to-publications.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
