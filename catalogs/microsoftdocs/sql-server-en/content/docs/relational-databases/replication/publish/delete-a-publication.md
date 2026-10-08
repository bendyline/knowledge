---
title: "Delete a Publication"
description: Learn how to delete a publication in SQL Server by using SQL Server Management Studio, Transact-SQL, or Replication Management Objects.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "removing publications"
  - "publications [SQL Server replication], deleting"
  - "articles [SQL Server replication], deleting"
  - "deleting publications"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Delete a Publication

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes how to delete a publication in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO).  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 Delete publications from the **Local Publications** folder in  SQL Server Management Studio 
.  
  
#### To delete a publication  
  
1.  Connect to the Publisher in  Management Studio
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Publications** folder.  
  
3.  Right-click the publication you want to delete, and then click **Delete**.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 Publications can be deleted programmatically using replication stored procedures. The stored procedures that you use depend on the type of publication being deleted.  
  
> **Note:**  
>  Deleting a publication does not remove published objects from the publication database or the corresponding objects from the subscription database. Use the `DROP <object>` command to manually remove these objects if necessary.  
  
#### To delete a snapshot or transactional publication  
  
1.  Do one of the following:  
  
    -   To delete a single publication, execute [sp_droppublication](../../system-stored-procedures/sp-droppublication-transact-sql.md) at the Publisher on the publication database.  
  
    -   To delete all publications in and remove all replication objects from a published database, execute [sp_removedbreplication](../../system-stored-procedures/sp-removedbreplication-transact-sql.md) at the Publisher. Specify a value of **tran** for **\@type**. (Optional) If the Distributor cannot be accessed or if the status of the database is suspect or offline, specify a value of **1** for **\@force**. (Optional) Specify the name of the database for **\@dbname** if [sp_removedbreplication](../../system-stored-procedures/sp-removedbreplication-transact-sql.md) is not executed on the publication database.  
  
        > **Note:**  
        >  Specifying a value of **1** for **\@force** may leave replication-related publishing objects in the database.  
  
2.  (Optional) If this database has no other publications, execute [sp_replicationdboption (Transact-SQL)](../../system-stored-procedures/sp-replicationdboption-transact-sql.md) to disable publication of the current database using snapshot or transactional replication.  
  
3.  (Optional) At the Subscriber on the subscription database, execute [sp_subscription_cleanup](../../system-stored-procedures/sp-subscription-cleanup-transact-sql.md) to remove any remaining replication metadata in the subscription database.  
  
#### To delete a merge publication  
  
1.  Do one of the following:  
  
    -   To delete a single publication, execute [sp_dropmergepublication (Transact-SQL)](../../system-stored-procedures/sp-dropmergepublication-transact-sql.md) at the Publisher on the publication database.  
  
    -   To delete all publications in and remove all replication objects from a published database, execute [sp_removedbreplication](../../system-stored-procedures/sp-removedbreplication-transact-sql.md) at the Publisher. Specify a value of **merge** for **\@type**. (Optional) If the Distributor cannot be accessed or if the status of the database is suspect or offline, specify a value of **1** for **\@force**. (Optional) Specify the name of the database for **\@dbname** if [sp_removedbreplication](../../system-stored-procedures/sp-removedbreplication-transact-sql.md) is not executed on the publication database.  
  
        > **Note:**  
        >  Specifying a value of **1** for **\@force** may leave replication-related publishing objects in the database.  
  
2.  (Optional) If this database has no other publications, execute [sp_replicationdboption (Transact-SQL)](../../system-stored-procedures/sp-replicationdboption-transact-sql.md) to disable publication of the current database using merge replication.  
  
3.  (Optional) At the Subscriber on the subscription database, execute [sp_mergesubscription_cleanup (Transact-SQL)](../../system-stored-procedures/sp-mergesubscription-cleanup-transact-sql.md) to remove any remaining replication metadata in the subscription database.  
  
###  <a name="TsqlExample"></a> Examples (Transact-SQL)  
 This example shows how to remove a transactional publication and disable transactional publishing for a database. This example assumes that all subscriptions were previously removed. For more information, see [Delete a Pull Subscription](../delete-a-pull-subscription.md) or [Delete a Push Subscription](../delete-a-push-subscription.md).  
  
 [language="sql" source="../codesnippet/tsql/delete-a-publication_1.sql"::: (complete source file; reference: ../codesnippet/tsql/delete-a-publication_1.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/delete-a-publication_1.sql.md)
  
 This example shows how to remove a merge publication and disable merge publishing for a database. This example assumes that all subscriptions were previously removed. For more information, see [Delete a Pull Subscription](../delete-a-pull-subscription.md) or [Delete a Push Subscription](../delete-a-push-subscription.md).  
  
 [language="sql" source="../codesnippet/tsql/delete-a-publication_2.sql"::: (complete source file; reference: ../codesnippet/tsql/delete-a-publication_2.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/delete-a-publication_2.sql.md)
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 You can delete publications programmatically by using Replication Management Objects (RMO). The RMO classes that you use to remove a publication depend on the type of publication you remove.  
  
#### To remove a snapshot or transactional publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransPublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPublication) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A) and [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
4.  Check the [Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%252A) property to verify that the publication exists. If the value of this property is **false**, either the publication properties in step 3 were defined incorrectly or the publication does not exist.  
  
5.  Call the [Microsoft.SqlServer.Replication.Publication.Remove%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Remove%252A) method.  
  
6.  (Optional) If no other transactional publications exist for this database, the database can be disabled for transactional publishing as follows:  
  
    1.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationDatabase) class. Set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the instance of [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.  
  
    2.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method. If this method returns **false**, confirm that the database exists.  
  
    3.  Set the [Microsoft.SqlServer.Replication.ReplicationDatabase.EnabledTransPublishing%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationDatabase.EnabledTransPublishing%252A) property to **false**.  
  
    4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method.  
  
7.  Close the connections.  
  
#### To remove a merge publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A) and [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
4.  Check the [Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%252A) property to verify that the publication exists. If the value of this property is **false**, either the publication properties in step 3 were defined incorrectly or the publication does not exist.  
  
5.  Call the [Microsoft.SqlServer.Replication.Publication.Remove%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Remove%252A) method.  
  
6.  (Optional) If no other merge publications exist for this database, the database can be disabled for merge publishing as follows:  
  
    1.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationDatabase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationDatabase) class. Set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the instance of [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from Step 1.  
  
    2.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method. If this method returns **false**, verify that the database exists.  
  
    3.  Set the [Microsoft.SqlServer.Replication.ReplicationDatabase.EnabledMergePublishing%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationDatabase.EnabledMergePublishing%252A) property to **false**.  
  
    4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method.  
  
7.  Close the connections.  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 The following example deletes a transactional publication. If no other transactional publications exist for this database, transactional publishing is also disabled.  
  
 [HowTo#rmo_DropTranPub (complete source file; reference: ../../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_droptranpub)](../../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_DropTranPub (complete source file; reference: ../../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_droptranpub)](../../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 The following example deletes a merge publication. If no other merge publications exist for this database, merge publishing is also disabled.  
  
 [HowTo#rmo_DropMergePub (complete source file; reference: ../../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_dropmergepub)](../../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_DropMergePub (complete source file; reference: ../../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_dropmergepub)](../../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
## Related content

- [Replication System Stored Procedures Concepts](../concepts/replication-system-stored-procedures-concepts.md)
- [Publish Data and Database Objects](publish-data-and-database-objects.md)
