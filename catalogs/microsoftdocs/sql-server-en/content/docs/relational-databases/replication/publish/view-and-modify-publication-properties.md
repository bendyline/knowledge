---
title: "View and Modify Publication Properties"
description: Learn how to view and modify publication properties in SQL Server by using SQL Server Management Studio, Transact-SQL, or Replication Management Objects.
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
  - "modifying replication properties, articles"
  - "articles [SQL Server replication], modifying"
  - "publications [SQL Server replication], properties"
  - "articles [SQL Server replication], properties"
  - "modifying replication properties, publications"
  - "publications [SQL Server replication], modifying"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# View and Modify Publication Properties

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes how to view and modify publication properties in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO).  

<a id="BeforeYouBegin"></a>

##  <a name="Restrictions"></a> Limitations and Restrictions
  
-   Some properties cannot be modified after a publication has been created, and others cannot be modified if there are subscriptions to the publication. Properties that cannot be modified are displayed as read-only.  
  
##  <a name="Recommendations"></a> Recommendations
  
-   After a publication is created, some property changes require a new snapshot. If a publication has subscriptions, some changes also require all subscriptions to be reinitialized. For more information, see [Change Publication and Article Properties](change-publication-and-article-properties.md) and [Add Articles to and Drop Articles from Existing Publications](add-articles-to-and-drop-articles-from-existing-publications.md).  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 View and modify publication properties in the **Publication Properties - \<Publication>** dialog box, which is available in  SQL Server Management Studio 
 and Replication Monitor. For information about starting Replication Monitor, see [Start the Replication Monitor](../monitor/start-the-replication-monitor.md).  
  
 The **Publication Properties - \<Publication>** dialog box includes the following pages:  
  
-   The **General** page includes the publication name and description, the database name, the type of publication, and the subscription expiration settings.  
  
-   The **Articles** page corresponds to the **Articles** page in the New Publication Wizard. Use this page to add and delete articles, and to change properties and column filtering for articles.  
  
-   The **Filter Rows** page corresponds to the **Filter Table Rows** page in the New Publication Wizard. Use this page to add, edit, and delete static row filters for all types of publications, and to add, edit, and delete parameterized row filters and join filters for merge publications.  
  
-   The **Snapshot** page allows you to specify the format and location of the snapshot, whether the snapshot should be compressed, and scripts to run before and after the snapshot is applied.  
  
-   The **FTP Snapshot** page (for snapshot and transactional publications, and merge publications for Publishers running versions prior to SQL Server 2005) allows you to specify whether Subscribers can download snapshot files through File Transfer Protocol (FTP).  
  
-   The **FTP Snapshot and Internet** page (for merge publications from Publishers running SQL Server 2005 or later) allows you to specify whether Subscribers can download snapshot files through FTP, and whether Subscribers can synchronize subscriptions through HTTPS.  
  
-   The **Subscription Options** page allows you to set a number of options that apply to all subscriptions. The options differ depending on the type of publication.  
  
-   The **Publication Access List** page allows you to specify which logins and groups can access a publication.  
  
-   The **Agent Security** page allows you to access settings for the accounts under which the following agents run and make connections to the computers in a replication topology: the Snapshot Agent for all publications; the Log Reader Agent for all transactional publications; and the Queue Reader Agent for transactional publications that allow queued updating subscriptions.  
  
-   The **Data Partitions** page (for merge publications from Publishers running SQL Server 2005 or later) allows you to specify whether Subscribers to publications with parameterized filters can request a snapshot if one is not available. It also allows you to generate snapshots for one or more partitions, either once or on a recurring schedule.  
  
#### To view and modify publication properties in Management Studio  
  
1.  Connect to the Publisher in  Management Studio
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Publications** folder.  
  
3.  Right-click a publication, and then click **Properties**.  
  
4.  Modify any properties if necessary, and then click **OK**.  

#### To view and modify publication properties in Replication Monitor  
  
1.  Expand a Publisher group in the left pane of Replication Monitor, and then expand a Publisher.  
  
2.  Right-click a publication, and then click **Properties**.  
  
3.  Modify any properties if necessary, and then click **OK**.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 Publications can be modified and their properties returned programmatically using replication stored procedures. The stored procedures that you use will depend on the type of publication.  
  
#### To view the properties of a snapshot or transactional publication  
  
1.  Execute [sp_helppublication](../../system-stored-procedures/sp-helppublication-transact-sql.md), specifying the name of the publication for the **\@publication** parameter. If you do not specify this parameter, information on all publications at the Publisher is returned.  
  
#### To change the properties of a snapshot or transactional publication  
  
1.  Execute [sp_changepublication](../../system-stored-procedures/sp-changepublication-transact-sql.md), specifying the publication property to change in the **\@property** parameter and the new value of this property in the **\@value** parameter.  
  
    > **Note:**  
    >  If the change will require the generation of a new snapshot, you must also specify a value of **1** for **\@force_invalidate_snapshot**, and if the change will require that Subscribers be reinitialized, you must specify a value of **1** for **\@force_reinit_subscription**. For more information on the properties that, when changed, require a new snapshot or reinitialization, see [Change Publication and Article Properties](change-publication-and-article-properties.md).  
  
#### To view the properties of a merge publication  
  
1.  Execute [sp_helpmergepublication](../../system-stored-procedures/sp-helpmergepublication-transact-sql.md), specifying the name of the publication for the **\@publication** parameter. If you do not specify this parameter, information on all publications at the Publisher is returned.  
  
#### To change the properties of a merge publication  
  
1.  Execute [sp_changemergepublication](../../system-stored-procedures/sp-changemergepublication-transact-sql.md), specifying the publication property being changed in the **\@property** parameter and the new value of this property in the **\@value** parameter.  
  
    > **Note:**  
    >  If the change will require the generation of a new snapshot, you must also specify a value of **1** for **\@force_invalidate_snapshot**, and if the change will require that Subscribers be reinitialized, you must specify a value of **1** for **\@force_reinit_subscription** For more information on the properties that, when changed, require a new snapshot or reinitialization, see [Change Publication and Article Properties](change-publication-and-article-properties.md).  
  
#### To view the properties of a snapshot  
  
1.  Execute [sp_helppublication_snapshot](../../system-stored-procedures/sp-helppublication-snapshot-transact-sql.md), specifying the name of the publication for the **\@publication** parameter.  
  
#### To change the properties of a snapshot  
  
1.  Execute [sp_changepublication_snapshot](../../system-stored-procedures/sp-changepublication-snapshot-transact-sql.md), specifying one or more of the new snapshot properties for the appropriate snapshot parameters.  
  
###  <a name="TsqlExample"></a> Examples (Transact-SQL)  
 This transactional replication example returns the properties of the publication.  
  
 [language="sql" source="../codesnippet/tsql/view-and-modify-publicat_1.sql"::: (complete source file; reference: ../codesnippet/tsql/view-and-modify-publicat_1.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-publicat_1.sql.md)
  
 This transactional replication example disables schema replication for the publication.  
  
 [language="sql" source="../codesnippet/tsql/view-and-modify-publicat_2.sql"::: (complete source file; reference: ../codesnippet/tsql/view-and-modify-publicat_2.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-publicat_2.sql.md)
  
 This merge replication example returns the properties of the publication.  
  
 [language="sql" source="../codesnippet/tsql/view-and-modify-publicat_3.sql"::: (complete source file; reference: ../codesnippet/tsql/view-and-modify-publicat_3.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-publicat_3.sql.md)
  
 This merge replication example disables schema replication for the publication.  
  
 [language="sql" source="../codesnippet/tsql/view-and-modify-publicat_4.sql"::: (complete source file; reference: ../codesnippet/tsql/view-and-modify-publicat_4.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/view-and-modify-publicat_4.sql.md)
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 You can modify publications and access their properties programmatically by using Replication Management Objects (RMO). The RMO classes that you use to view or modify publication properties depend on the type of publication.  
  
#### To view or modify properties of a snapshot or transactional publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransPublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPublication) class, set the [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A) and [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
3.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication properties in step 2 were defined incorrectly or the publication does not exist.  
  
4.  (Optional) To change properties, set a new value for one or more of the settable properties. Use the logical AND operator (**&** in Microsoft Visual C# and **And** in Microsoft Visual Basic) to determine if a given [Microsoft.SqlServer.Replication.PublicationAttributes](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes) value is set for the [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) property. Use the inclusive logical OR operator (**|** in Visual C# and **Or** in Visual Basic) and the exclusive logical OR operator (**^** in Visual C# and **Xor** in Visual Basic) to change the [Microsoft.SqlServer.Replication.PublicationAttributes](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes) values for the [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) property.  
  
5.  (Optional) If you specified a value of **true** for [Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%252A), call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method to commit changes on the server. If you specified a value of **false** for [Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%252A) (the default), changes are sent to the server immediately.  
  
#### To view or modify properties of a merge publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) class, set the [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A) and [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
3.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication properties in step 2 were defined incorrectly or the publication does not exist.  
  
4.  (Optional) To change properties, set a new value for one or more of the settable properties. Use the logical AND operator (**&** in Visual C# and **And** in Visual Basic) to determine if a given [Microsoft.SqlServer.Replication.PublicationAttributes](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes) value is set for the [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) property. Use the inclusive logical OR operator (**|** in Visual C# and **Or** in Visual Basic) and the exclusive logical OR operator (**^** in Visual C# and **Xor** in Visual Basic) to change the [Microsoft.SqlServer.Replication.PublicationAttributes](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes) values for the [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) property.  
  
5.  (Optional) If you specified a value of **true** for [Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%252A), call the [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) method to commit changes on the server. If you specified a value of **false** for [Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges%252A) (the default), changes are sent to the server immediately.  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 This example sets publication attributes for a transactional publication. The changes are cached until explicitly sent to the server.  
  
 [HowTo#rmo_ChangeTranPub_cached (complete source file; reference: ../../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_changetranpub_cached)](../../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_ChangeTranPub_cached (complete source file; reference: ../../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_changetranpub_cached)](../../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 This example disables DDL replication for a merge publication.  
  
 [HowTo#rmo_ChangeMergePub_ddl (complete source file; reference: ../../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_changemergepub_ddl)](../../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_ChangeMergePub_ddl (complete source file; reference: ../../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_changemergepub_ddl)](../../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
## Related content

- [Publish Data and Database Objects](publish-data-and-database-objects.md)
- [Change Publication and Article Properties](change-publication-and-article-properties.md)
- [Make Schema Changes on Publication Databases](make-schema-changes-on-publication-databases.md)
- [Replication System Stored Procedures Concepts](../concepts/replication-system-stored-procedures-concepts.md)
- [Add Articles to and Drop Articles from a Publication](add-articles-to-and-drop-articles-from-a-publication.md)
- [View information and perform tasks using Replication Monitor](../monitor/view-information-and-perform-tasks-replication-monitor.md)
- [View and Modify Article Properties](view-and-modify-article-properties.md)
