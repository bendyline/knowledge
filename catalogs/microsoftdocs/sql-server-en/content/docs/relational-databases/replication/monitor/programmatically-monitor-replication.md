---
title: "Programmatically Monitor Replication"
description: Replication Monitor is a graphical tool. Use Replication Monitor to monitor a replication topology in SQL Server.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "sp_replmonitorhelppublisher"
  - "sp_replmonitorhelpmergesessiondetail"
  - "monitoring performance [SQL Server replication], publication status"
  - "sp_replmonitorhelpmergesession"
  - "sp_replmonitorhelppublicationthresholds"
  - "monitoring performance [SQL Server replication], subscription status"
  - "monitoring performance [SQL Server replication], Transact-SQL programming"
  - "sp_replmonitorsubscriptionpendingcmds"
  - "sp_replmonitorchangepublicationthreshold"
  - "transactional replication, monitoring"
  - "sp_replmonitorhelppublication"
  - "sp_replmonitorhelpsubscription"
  - "monitoring performance [SQL Server replication], thresholds and warnings"
  - "merge replication monitoring [SQL Server replication]"
  - "snapshot replication [SQL Server], monitoring"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Programmatically Monitor Replication

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  Replication Monitor is a graphical tool that allows you to monitor a replication topology. You can access the same monitoring data programmatically by using  Transact-SQL  replication stored procedures or replication management objects (RMO). These objects enable you to program the following tasks:  
  
-   Monitor the state of Publishers, publications, and subscriptions.  
  
-   Monitor Merge Agent sessions at one or more Subscribers.  
  
-   Monitor transactional commands waiting to be applied at one or more Subscribers.  
  
-   Define the threshold metrics that determine when a publication requires intervention.  
  
-   Monitor the status of tracer tokens.  
  
##  <a name="Tsql"></a> Transact-SQL  
  
#### To monitor Publishers, publications, and subscriptions from the Distributor  
  
1.  At the Distributor on the distribution database, execute [sp_replmonitorhelppublisher](../../system-stored-procedures/sp-replmonitorhelppublisher-transact-sql.md). This returns monitoring information for all Publishers using this Distributor. To limit the result set to a single Publisher, specify **\@publisher**.  
  
2.  At the Distributor on the distribution database, execute [sp_replmonitorhelppublication](../../system-stored-procedures/sp-replmonitorhelppublication-transact-sql.md). This returns monitoring information for all publications using this Distributor. To limit the result set to a single Publisher, publication, or published database, specify **\@publisher**, **\@publication**, or **\@publisher_db**, respectively.  
  
3.  At the Distributor on the distribution database, execute [sp_replmonitorhelpsubscription](../../system-stored-procedures/sp-replmonitorhelpsubscription-transact-sql.md). This returns monitoring information for all subscriptions using this Distributor. To limit the result set to subscriptions belonging to a single Publisher, publication, or published database, specify **\@publisher**, **\@publication**, or **\@publisher_db**, respectively.  
  
#### To monitor transactional commands waiting to be applied at the Subscriber  
  
1.  At the Distributor on the distribution database, execute [sp_replmonitorsubscriptionpendingcmds](../../system-stored-procedures/sp-replmonitorsubscriptionpendingcmds-transact-sql.md). This returns monitoring information for all commands pending for all subscriptions using this Distributor. To limit the result set to commands pending for subscriptions belonging to a single Publisher, Subscriber, publication, or published database, specify **\@publisher**, **\@subscriber**, **\@publication**, or **\@publisher_db**, respectively.  
  
#### To monitor merge changes waiting to be uploaded or downloaded  
  
1.  At the Publisher on the publication database, execute [sp_showpendingchanges](../../system-stored-procedures/sp-showpendingchanges-transact-sql.md). This returns a result set showing information on changes that are waiting to be replicated to Subscribers. To limit the result set to changes that belong to a single publication or article, specify **\@publication** or **\@article**, respectively.  
  
2.  At a Subscriber on the subscription database, execute [sp_showpendingchanges](../../system-stored-procedures/sp-showpendingchanges-transact-sql.md). This returns a result set showing information on changes that are waiting to be replicated to the Publisher. To limit the result set to changes that belong to a single publication or article, specify **\@publication** or **\@article**, respectively.  
  
#### To monitor Merge Agent sessions  
  
1.  At the Distributor on the distribution database, execute [sp_replmonitorhelpmergesession](../../system-stored-procedures/sp-replmonitorhelpmergesession-transact-sql.md). This returns monitoring information, including **Session_id**, on all Merge Agent sessions for all subscriptions using this Distributor. You can also obtain **Session_id** by querying the [MSmerge_sessions](../../system-tables/msmerge-sessions-transact-sql.md) system table.  
  
2.  At the Distributor on the distribution database, execute [sp_replmonitorhelpmergesessiondetail](../../system-stored-procedures/sp-replmonitorhelpmergesessiondetail-transact-sql.md). Specify a **Session_id** value from step 1 for **\@session_id**. This displays detailed monitor information about the session.  
  
3.  Repeat step 2 for each session of interest.  
  
#### To monitor Merge Agent sessions for pull subscriptions from the Subscriber  
  
1.  At the Subscriber on the subscription database, execute [sp_replmonitorhelpmergesession](../../system-stored-procedures/sp-replmonitorhelpmergesession-transact-sql.md). For a given subscription, specify **\@publisher**, **\@publication**, and the name of the publication database for **\@publisher_db**. This returns monitoring information for the last five Merge Agent sessions for this subscription. Note the value of **Session_id** for sessions of interest in the result set.  
  
2.  At the Subscriber on the subscription database, execute [sp_replmonitorhelpmergesessiondetail](../../system-stored-procedures/sp-replmonitorhelpmergesessiondetail-transact-sql.md). Specify a **Session_id** value from step 1 for **\@session_id**. This displays detailed monitoring information about the session.  
  
3.  Repeat step 2 for each session of interest.  
  
#### To view and modify the monitor threshold metrics for a publication  
  
1.  At the Distributor on the distribution database, execute [sp_replmonitorhelppublicationthresholds](../../system-stored-procedures/sp-replmonitorhelppublicationthresholds-transact-sql.md). This returns the monitoring thresholds set for all publications using this Distributor. To limit the result set to monitor thresholds to publications belonging to a single Publisher or published database or to a single publication, specify **\@publisher**, **\@publisher_db**, or **\@publication**, respectively. Note the value of **Metric_id** for any thresholds that must be changed. For more information, see [Set Thresholds and Warnings in Replication Monitor](set-thresholds-and-warnings-in-replication-monitor.md).  
  
2.  At the Distributor on the distribution database, execute [sp_replmonitorchangepublicationthreshold](../../system-stored-procedures/sp-replmonitorchangepublicationthreshold-transact-sql.md). Specify the following as needed:  
  
    -   The **Metric_id** value obtained in step 1 for **\@metric_id**.  
  
    -   A new value for the monitor threshold metric for **\@value**.  
  
    -   A value of **1** for **\@shouldalert** for an alert to be logged when this threshold is reached, or a value of **0** if an alert is not needed.  
  
    -   A value of **1** for **\@mode** to enable the monitor threshold metric or a value of **2** to disable it.  
  
##  <a name="RMO"></a> Replication Management Objects (RMO)  
  
#### To monitor a subscription to a merge publication at the Subscriber  
  
1.  Create a connection to the Subscriber by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergeSubscriberMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor) class, and set the [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.Publisher%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.Publisher%252A), [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.Publication%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.Publication%252A), [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.PublisherDB%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.PublisherDB%252A), [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.SubscriberDB%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.SubscriberDB%252A) properties for the subscription, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) created in step 1.  
  
3.  Call one of the following methods to return information on Merge Agent sessions for this subscription:  
  
    -   [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionsSummary%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionsSummary%252A) - returns an array of [Microsoft.SqlServer.Replication.MergeSessionSummary](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionSummary) objects with information on up to the last five Merge Agent sessions. Note the [Microsoft.SqlServer.Replication.MergeSessionSummary.SessionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionSummary.SessionId%252A) value for any sessions of interest.  
  
    -   [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionsSummary%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionsSummary%252A) - returns an array of [Microsoft.SqlServer.Replication.MergeSessionSummary](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionSummary) objects with information on Merge Agent sessions that have occurred during the past number of hours passed in as the *hours* parameter (up to the last five sessions). Note the [Microsoft.SqlServer.Replication.MergeSessionSummary.SessionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionSummary.SessionId%252A) value for any sessions of interest.  
  
    -   [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetLastSessionSummary%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetLastSessionSummary%252A) - returns a [Microsoft.SqlServer.Replication.MergeSessionSummary](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionSummary) object with information on the last Merge Agent session. Note the [Microsoft.SqlServer.Replication.MergeSessionSummary.SessionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionSummary.SessionId%252A) value for this session.  
  
    -   [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionsSummaryDataSet%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionsSummaryDataSet%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object with information on up to the last five Merge Agent sessions, one in each row. Note the value of the **Session_id** column for any sessions of interest.  
  
    -   [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetLastSessionSummaryDataRow%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetLastSessionSummaryDataRow%252A) - returns a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) object with information on the last Merge Agent session. Note the value of the **Session_id** column for this session.  
  
4.  (Optional) Call [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.RefreshSessionSummary%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.RefreshSessionSummary%252A) to refresh the data for the [Microsoft.SqlServer.Replication.MergeSessionSummary](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionSummary) object passed as *mss,* or call [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.RefreshSessionSummary%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.RefreshSessionSummary%252A) to refresh the data in the [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) object passed as *drRefresh*.  
  
5.  Using the session ID obtained in step 3, call one of the following methods to return information on the details of a particular session:  
  
    -   [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionDetails%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionDetails%252A) - returns an array of [Microsoft.SqlServer.Replication.MergeSessionDetail](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSessionDetail) objects for the supplied *SessionId*.  
  
    -   [Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionDetailsDataSet%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscriberMonitor.GetSessionDetailsDataSet%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object with information for the specified *SessionId*.  
  
#### To monitor replication properties for all publications at a Distributor  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) created in step 1.  
  
4.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object.  
  
5.  Execute one or more of the following methods to return replication information for all Publishers that use this Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumDistributionAgents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumDistributionAgents%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all Distribution Agents at this Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumErrorRecords%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumErrorRecords%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about errors stored at the Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumLogReaderAgents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumLogReaderAgents%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all Log Reader Agents at the Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumMergeAgents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumMergeAgents%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all Merge Agents at the Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumMiscellaneousAgents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumMiscellaneousAgents%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all other replication agents at the Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumPublishers%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumPublishers%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all Publishers at this Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumPublishers2%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumPublishers2%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that returns the Publishers that use this Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumQueueReaderAgents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumQueueReaderAgents%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all Queue Reader Agents at the Distributor.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumQueueReaderAgentSessionDetails%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumQueueReaderAgentSessionDetails%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains details about the specified Queue Reader Agent and session.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumQueueReaderAgentSessions%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumQueueReaderAgentSessions%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains session information about the specified Queue Reader Agent.  
  
    -   [Microsoft.SqlServer.Replication.ReplicationMonitor.EnumSnapshotAgents%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.EnumSnapshotAgents%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all Snapshot Agents at the Distributor.  
  
#### To monitor publication properties for a specific Publisher at the Distributor  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Get a [Microsoft.SqlServer.Replication.PublisherMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor) object in one of these ways.  
  
    -   Create an instance of the [Microsoft.SqlServer.Replication.PublisherMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor) class. Set the [Microsoft.SqlServer.Replication.PublisherMonitor.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.Name%252A) property for the Publisher, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) created in step 1. Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the Publisher name was defined incorrectly or the publication does not exist.  
  
    -   From the [Microsoft.SqlServer.Replication.PublisherMonitorCollection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitorCollection) accessed by means of the [Microsoft.SqlServer.Replication.ReplicationMonitor.PublisherMonitors%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor.PublisherMonitors%252A) property of an existing [Microsoft.SqlServer.Replication.ReplicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationMonitor) object.  
  
3.  Execute one or more of the following methods to return replication information for all publications that belong to this Publisher.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumDistributionAgentSessionDetails%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumDistributionAgentSessionDetails%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains details about the specified Distribution Agent and session.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumDistributionAgentSessions%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumDistributionAgentSessions%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains session information about the specified Distribution Agent.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumErrorRecords%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumErrorRecords%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains error record information about the specified error.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumLogReaderAgentSessionDetails%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumLogReaderAgentSessionDetails%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains details for the specified Log Reader Agent and session.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumLogReaderAgentSessions%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumLogReaderAgentSessions%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains session information for the specified Log Reader Agent.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessionDetails%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessionDetails%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains details about the specified Merge Agent and session.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessionDetails2%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessionDetails2%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains additional details about the specified Merge Agent and session.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessions%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessions%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains session information for the specified Merge Agent.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessions2%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumMergeAgentSessions2%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains additional session information for the specified Merge Agent.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumPublications%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumPublications%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all publications at this Distributor.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumPublications2%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumPublications2%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains additional information about all publications at this Distributor.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumSnapshotAgentSessionDetails%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumSnapshotAgentSessionDetails%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains details about the specified Snapshot Agent and session.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumSnapshotAgentSessions%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumSnapshotAgentSessions%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains session information for the specified Snapshot Agent.  
  
    -   [Microsoft.SqlServer.Replication.PublisherMonitor.EnumSubscriptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.EnumSubscriptions%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all subscriptions to publications at this Distributor.  
  
#### To monitor properties for a specific publication at the Distributor  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Get a [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) object in one of these ways.  
  
    -   Create an instance of the [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) class. Set the [Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%252A), and [Microsoft.SqlServer.Replication.PublicationMonitor.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.Name%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) created in step 1. Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication properties were defined incorrectly or the publication does not exist.  
  
    -   From the [Microsoft.SqlServer.Replication.PublicationMonitorCollection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitorCollection) accessed by means of the [Microsoft.SqlServer.Replication.PublisherMonitor.PublicationMonitors%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.PublicationMonitors%252A) property of an existing [Microsoft.SqlServer.Replication.PublisherMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor) object.  
  
3.  Execute one or more of the following methods to return information about this publication.  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumErrorRecords%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumErrorRecords%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains error records about the specified error.  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumLogReaderAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumLogReaderAgent%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about the Log Reader Agent for this publication.  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumMonitorThresholds%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumMonitorThresholds%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about the monitor warning thresholds set for this publication.  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumQueueReaderAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumQueueReaderAgent%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about the Queue Reader Agent used by this publication.  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumSnapshotAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumSnapshotAgent%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about the Snapshot Agent for this publication.  
  
    -   [Microsoft.SqlServer.Replication.Publication.EnumSubscriptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.EnumSubscriptions%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about subscriptions to this publication.  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumSubscriptions2%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumSubscriptions2%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains additional information about subscriptions to this publication based on the supplied [Microsoft.SqlServer.Replication.SubscriptionResultOption](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.SubscriptionResultOption).  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokenHistory%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokenHistory%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains latency information for the specified tracer token.  
  
    -   [Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumTracerTokens%252A) - returns a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that contains information about all tracer tokens inserted into this publication.  
  
#### To monitor transactional commands that are waiting to be applied at the Subscriber  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Get a [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) object in one of these ways.  
  
    -   Create an instance of the [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) class. Set the [Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%252A), and [Microsoft.SqlServer.Replication.PublicationMonitor.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.Name%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) created in step 1. Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication properties were defined incorrectly or the publication does not exist.  
  
    -   From the [Microsoft.SqlServer.Replication.PublicationMonitorCollection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitorCollection) accessed by means of the [Microsoft.SqlServer.Replication.PublisherMonitor.PublicationMonitors%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.PublicationMonitors%252A) property of an existing [Microsoft.SqlServer.Replication.PublisherMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor) object.  
  
3.  Execute the [Microsoft.SqlServer.Replication.PublicationMonitor.TransPendingCommandInfo%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.TransPendingCommandInfo%252A) method, which returns a [Microsoft.SqlServer.Replication.PendingCommandInfo](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PendingCommandInfo) object.  
  
4.  Use the properties of this [Microsoft.SqlServer.Replication.PendingCommandInfo](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PendingCommandInfo) object to determine the estimated number of pending commands and the length of time it will take to complete the delivery of these commands.  
  
#### To set the monitor warning thresholds for a publication  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Get a [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) object in one of these ways.  
  
    -   Create an instance of the [Microsoft.SqlServer.Replication.PublicationMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor) class. Set the [Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.DistributionDBName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublisherName%252A), [Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.PublicationDBName%252A), and [Microsoft.SqlServer.Replication.PublicationMonitor.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.Name%252A) properties for the publication, and set the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property to the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) created in step 1. Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either the publication properties were defined incorrectly or the publication does not exist.  
  
    -   From the [Microsoft.SqlServer.Replication.PublicationMonitorCollection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitorCollection) accessed by means of the [Microsoft.SqlServer.Replication.PublisherMonitor.PublicationMonitors%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor.PublicationMonitors%252A) property of an existing [Microsoft.SqlServer.Replication.PublisherMonitor](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublisherMonitor) object.  
  
3.  Execute the [Microsoft.SqlServer.Replication.PublicationMonitor.EnumMonitorThresholds%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.EnumMonitorThresholds%252A) method. Note the current threshold settings in the returned [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) of [Microsoft.SqlServer.Replication.MonitorThreshold](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MonitorThreshold) objects.  
  
4.  Execute the [Microsoft.SqlServer.Replication.PublicationMonitor.ChangeMonitorThreshold%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationMonitor.ChangeMonitorThreshold%252A) method. Pass the following parameters:  
  
    -   *metricID* - an [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) value that represents the monitoring threshold metric from the following table:  
  
        | Value | Description |
        | --- | --- |
        | 1 | **expiration** - monitors for imminent expiration of subscriptions to transactional publications. |
        | 2 | **latency** - monitors for the performance of subscriptions to transactional publications. |
        | 4 | **mergeexpiration** - monitors for imminent expiration of subscriptions to merge publications. |
        | 5 | **mergeslowrunduration** - monitors the duration of merge synchronizations over low-bandwidth (dialup) connections. |
        | 6 | **mergefastrunduration** - monitors the duration of merge synchronizations over high-bandwidth (LAN) connections. |
        | 7 | **mergefastrunspeed** - monitors the synchronization rate of merge synchronizations over high-bandwidth (LAN) connections. |
        | 8 | **mergeslowrunspeed** - monitors the synchronization rate of merge synchronizations over low-bandwidth (dialup) connections. |
  
    -   *enable* - [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) value that indicates whether the metric is enabled for the publication.  
  
    -   *thresholdValue* - integer value that sets the threshold.  
  
    -   *shouldAlert* - integer that indicates whether this threshold should generate an alert.
