---
title: "Measure latency & validate connections (Transactional)"
description: Learn how to measure the latency and validate connections for a Transaction Publication in SQL Server using Replication Monitor in SQL Server Management Studio (SSMS), Transact-SQL (T-SQL), or Replication Management Objects (RMO).
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Replication Monitor, performance"
  - "tracer tokens [SQL Server replication]"
  - "latency [SQL Server replication]"
  - "transactional replication, tracer tokens"
  - "monitoring performance [SQL Server replication], tracer tokens"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Measure Latency and Validate Connections for Transactional Replication

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes how to measure latency and validate connections for transactional replication in  SQL Server 
 by using Replication Monitor,  Transact-SQL , or Replication Management Objects (RMO). Transactional replication provides the tracer token feature, which provides a convenient way to measure latency in transactional replication topologies and to validate the connections between the Publisher, Distributor and Subscribers. A token (a small amount of data) is written to the transaction log of the publication database, marked as though it were a typical replicated transaction, and sent through the system, allowing a calculation of:  
  
-   How much time elapses between a transaction being committed at the Publisher and the corresponding command being inserted in the distribution database at the Distributor.  
  
-   How much time elapses between a command being inserted in the distribution database and the corresponding transaction being committed at a Subscriber.  
  
 From these calculations, you can answer a number of questions, including:  
  
-   Which Subscribers take the longest to receive a change from the Publisher?  
  
-   Of the Subscribers expected to receive the tracer token, which, if any, have not received it?  
  
<a id="BeforeYouBegin"></a>

##  <a name="Restrictions"></a> Limitations and Restrictions
 Tracer tokens can also be useful when quiescing a system, which involves stopping all activity and verifying that all nodes have received all outstanding changes. For more information, see [Quiesce a Replication Topology (Replication Transact-SQL Programming)](../administration/quiesce-a-replication-topology-replication-transact-sql-programming.md).  
  
 To use tracer tokens, you must use certain versions of  Microsoft 
  SQL Server 
:  
  
-   The Distributor must be  Microsoft 
  SQL Server 2005 (9.x) 
 or later.  
  
-   The Publisher must be  SQL Server 2005 (9.x) 
 or later or be an Oracle Publisher.  
  
-   For push subscriptions, tracer token statistics are gathered from the Publisher, Distributor, and Subscribers if the Subscriber is  Microsoft 
  SQL Server 
 7.0 or later.  
  
-   For pull subscriptions, tracer token statistics are gathered from Subscribers only if the Subscriber is  SQL Server 2005 (9.x) 
 or later. If the Subscriber is  SQL Server 
 7.0 or  Microsoft 
  SQL Server 2000 (8.x) 
, statistics are gathered only from the Publisher and Distributor.  
  
 There are also a number of other issues and restrictions to be aware of:  
  
-   Subscriptions must be active to receive a tracer token. A subscription is active if it has been initialized.  
  
-   Reinitialization removes any pending tracer tokens for the relevant subscriptions.  
  
-   Subscribers only receive tracer tokens that were created after their initial synchronization.  
  
-   Tracer tokens are not forwarded by republishing Subscribers.  
  
-   After failover to a secondary, Replication Monitor is unable to adjust the name of the publishing instance of  SQL Server 
 and will continue to display replication information under the name of the original primary instance of  SQL Server 
. After failover, a tracer token cannot be entered by using the Replication Monitor, however a tracer token entered on the new publisher by using  Transact-SQL , is visible in Replication Monitor.  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Replication Monitor  
 For information about starting Replication Monitor, see [Start the Replication Monitor](start-the-replication-monitor.md).  
  
#### To insert a tracer token and view information on the token  
  
1.  Expand a Publisher group in the left pane, expand a Publisher, and then click a publication.  
  
2.  Click the **Tracer Tokens** tab.  
  
3.  Click **Insert Tracer**.  
  
4.  View elapsed time for the tracer token in the following columns: **Publisher to Distributor**, **Distributor to Subscriber**, **Total Latency**. A value of **Pending** indicates that the token has not reached a given point.  
  
#### To view information on a tracer token inserted previously  
  
1.  Expand a Publisher group in the left pane, expand a Publisher, and then click a publication.  
  
2.  Click the **Tracer Tokens** tab.  
  
3.  Select a time from the **Time inserted** dropdown list.  
  
4.  View elapsed time for the tracer token in the following columns: **Publisher to Distributor**, **Distributor to Subscriber**, **Total Latency**. A value of **Pending** indicates that the token has not reached a given point.  
  
    > **Note:**  
    >  Tracer token information is retained for the same time period as other historical data, which is governed by the history retention period of the distribution database. For information about changing distribution database properties, see [View and Modify Distributor and Publisher Properties](../view-and-modify-distributor-and-publisher-properties.md).  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
  
#### To post a tracer token to a transactional publication  
  
1.  (Optional) At the Publisher on the publication database, execute [sp_helppublication (Transact-SQL)](../../system-stored-procedures/sp-helppublication-transact-sql.md). Verify that the publication exists and that the status is active.  
  
2.  (Optional) At the Publisher on the publication database, execute [sp_helpsubscription (Transact-SQL)](../../system-stored-procedures/sp-helpsubscription-transact-sql.md). Verify that the subscription exists and that the status is active.  
  
3.  At the Publisher on the publication database, execute [sp_posttracertoken (Transact-SQL)](../../system-stored-procedures/sp-posttracertoken-transact-sql.md), specifying **\@publication**. Note the value of the **\@tracer_token_id** output parameter.  
  
#### To determine latency and validate connections for a transactional publication  
  
1.  Post a tracer token to the publication using the previous procedure.  
  
2.  At the Publisher on the publication database, execute [sp_helptracertokens (Transact-SQL)](../../system-stored-procedures/sp-helptracertokens-transact-sql.md), specifying **\@publication**. This returns a list of all tracer tokens posted to the publication. Note the desired **tracer_id** in the result set.  
  
3.  At the Publisher on the publication database, execute [sp_helptracertokenhistory (Transact-SQL)](../../system-stored-procedures/sp-helptracertokenhistory-transact-sql.md), specifying **\@publication** and the tracer token ID from step 2 for **\@tracer_id**. This returns latency information for the selected tracer token.  
  
#### To remove tracer tokens  
  
1.  At the Publisher on the publication database, execute [sp_helptracertokens (Transact-SQL)](../../system-stored-procedures/sp-helptracertokens-transact-sql.md), specifying **\@publication**. This returns a list of all tracer tokens posted to the publication. Note the **tracer_id** for the tracer token to delete in the result set.  
  
2.  At the Publisher on the publication database, execute [sp_deletetracertokenhistory (Transact-SQL)](../../system-stored-procedures/sp-deletetracertokenhistory-transact-sql.md), specifying **\@publication** and the ID of the tracer to delete from step 2 for `@tracer_id`.  
  
###  <a name="TsqlExample"></a> Example (Transact-SQL)  
 This example posts a tracer token record and uses the returned ID of the posted tracer token to view latency information.  
  
 [language="sql" source="../codesnippet/tsql/measure-latency-and-vali_1.sql"::: (complete source file; reference: ../codesnippet/tsql/measure-latency-and-vali_1.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/measure-latency-and-vali_1.sql.md)
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
  
#### To post a tracer token to a transactional publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransPublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPublication) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A) and [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication properties in step 3 were defined incorrectly or the publication does not exist.  
  
5.  Call the [Microsoft.SqlServer.Replication.TransPublication.PostTracerToken%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPublication.PostTracerToken%252A) method. This method inserts a tracer token into the publication's transaction log.  
  
#### To determine latency and validate connections for a transactional publication  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.PublicationMonitor.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.Name%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%252A), and [Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%252A) properties, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication monitor properties in step 3 were defined incorrectly or the publication does not exist.  
  
5.  Call the [Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokens%252A) method. Cast the returned [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) object to an array of [Microsoft.SqlServer.Replication.TracerToken](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TracerToken) objects.  
  
6.  Call the [Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokenHistory%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokenHistory%252A) method. Pass a value of [Microsoft.SqlServer.Replication.TracerToken.TracerTokenId%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TracerToken.TracerTokenId%252A) for a tracer token from step 5. This returns latency information for the selected tracer token as a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object. If all tracer token information is returned, the connection between the Publisher and Distributor and the connection between the Distributor and the Subscriber both exist and the replication topology is functioning.  
  
#### To remove tracer tokens  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.PublicationMonitor.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.Name%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%252A), and [Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%252A) properties, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the connection created in step 1.  
  
4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication monitor properties in step 3 were defined incorrectly or the publication does not exist.  
  
5.  Call the [Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokens%252A) method. Cast the returned [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) object to an array of [Microsoft.SqlServer.Replication.TracerToken](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TracerToken) objects.  
  
6.  Call the [Microsoft.SqlServer.Replication.PublicationMonitor.CleanUpTracerTokenHistory%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.CleanUpTracerTokenHistory%252A) method. Pass one of the following values:  
  
    -   The [Microsoft.SqlServer.Replication.TracerToken.TracerTokenId%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TracerToken.TracerTokenId%252A) for a tracer token from step 5. This deletes information for a selected token.  
  
    -   A [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object. This deletes information for all tokens older than the specified date and time.
