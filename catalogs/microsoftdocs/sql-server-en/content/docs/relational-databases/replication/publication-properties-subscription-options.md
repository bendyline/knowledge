---
title: "Publication Properties, Subscription Options"
description: "Publication Properties, Subscription Options"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.newpubwizard.pubproperties.subscriptionoptions.f1"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Publication Properties, Subscription Options

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  The **Subscription Options** page of the **Publication Properties** dialog box allows you to view and set publication level properties associated with subscriptions. The properties are grouped into the following categories:  
  
-   Properties that apply to all publications.  
  
-   Properties that apply to snapshot and transactional publications (including those that allow updating subscriptions).  
  
-   Properties that apply to merge publications.  
  
> **Note:**  
>  Some properties are read-only; the reasons are covered in the property descriptions in this topic. Some property changes require a new snapshot for the publication, and some also require that all subscriptions be reinitialized. For more information, see [Change Publication and Article Properties](publish/change-publication-and-article-properties.md).  
  
## Options for all publications  
  
### Creation and Synchronization  
 **Allow anonymous subscriptions**  
 Determines whether to allow anonymous pull subscriptions. Anonymous subscriptions are supported for  Microsoft 
  SQL Server Compact 3.5 Service Pack 1 
,  Microsoft 
  SQL Server 2005 Mobile edition 
, and  Microsoft 
  SQL Server 
 for Windows CE. To use this option for snapshot and transactional publications, the option **Snapshot always available** must be set to **True**.  
  
 **Attachable subscription database**  
 Determines whether subscriptions can be created by attaching a copy of a subscription database (requires that the option **Snapshot always available** is set to **True** for snapshot and transactional publications).  
  
> **Important:**  
>  Attachable subscriptions will not be available in a future release. The feature is deprecated.  
  
 **Allow pull subscriptions**  
 Determines whether to allow Subscribers to create pull subscriptions to this publication. For more information, see [Subscribe to Publications](subscribe-to-publications.md).  
  
### Schema Replication  
 **Replicate schema changes**  
  Microsoft 
  SQL Server 2005 (9.x) 
 and later versions only. Determines whether to replicate schema changes (such as adding a column to a table or changing the data type of a column) to published objects. For more information, see [Make Schema Changes on Publication Databases](publish/make-schema-changes-on-publication-databases.md).  
  
## Options for snapshot and transactional publications  
  
### Creation and Synchronization  
 **Independent Distribution Agent**  
 Determines whether to use an agent that is independent of other publications from this database. This option is read-only; it is set to **True** by default for publications created with the New Publication Wizard and cannot be changed after the publication is created. For more information, see [Replication Agent Administration](agents/replication-agent-administration.md).  
  
 **Snapshot always available**  
 Determines whether snapshot files are created every time the Snapshot Agent runs (requires **Independent Distribution Agent**). This option is read-only; it is set to **True** if you select **Create a snapshot immediately and keep the snapshot available to initialize subscriptions** on the **Snapshot Agent** page of the New Publication Wizard (the default). For more information, see [Create and Apply the Snapshot](create-and-apply-the-initial-snapshot.md).  
  
 **Allow initialization from backup files**  
  SQL Server 2005 (9.x) 
 and later versions only. Determines whether to allow backup files to be used to initialize subscriptions. For more information, see [Initialize a Transactional Subscription Without a Snapshot](initialize-a-transactional-subscription-without-a-snapshot.md).  
  
 **Allow non-SQL Server Subscribers**  
  SQL Server 2005 (9.x) 
 and later versions only. Determines whether the publication supports non-  SQL Server 
 Subscribers. Setting this option to **True** sets other publication properties to support non-  SQL Server 
 Subscribers. This option is read-only if subscriptions exist; it cannot be set to **True** if **Allow immediate updating subscriptions**, **Allow queued updating subscriptions**, or **Allow peer-to-peer subscriptions** is set to **True**. For more information, see [Non-SQL Server Subscribers](non-sql/non-sql-server-subscribers.md).  
  
### Data Transformation  
 **Allow data transformations**  
 Determines whether to use Data Transformation Services (DTS) to transform data before distributing it to a Subscriber. This option is read-only; data transformations can be enabled only if a publication is created using stored procedures.  
  
> **Important:**  
>  Transformable subscriptions will not be available in a future release. The feature is deprecated.  
  
### Peer-to-Peer Replication  
 **Allow peer-to-peer subscriptions**  
 Applies to only  SQL Server 2005 (9.x) 
 and later versions. Determines whether the publication supports peer-to-peer replication. Setting this option to **True** sets other publication properties to support peer-to-peer replication. This option is read-only if subscriptions exist. This option cannot be set to **True** if **Allow immediate updating subscriptions** or **Allow queued updating subscriptions**, or **Allow non-SQL Server Subscribers** is set to **True**. For more information, see [Peer-to-Peer Transactional Replication](transactional/peer-to-peer-transactional-replication.md).  
  
 **Allow peer-to-peer conflict detection**  
 Applies to only  SQL Server 2008 (10.0.x) 
 and later versions. Specifies whether conflict detection is enabled for this publication. To use conflict detection, all nodes must be running  SQL Server 2008 (10.0.x) 
 or a later version; and detection must be enabled for all nodes. To use conflict detection, you must also specify a value for **Peer originator id**. For more information, see [Conflict Detection in Peer-to-Peer Replication](transactional/peer-to-peer-conflict-detection-in-peer-to-peer-replication.md).  
  
 **Peer originator id**  
 Applies to only  SQL Server 2008 (10.0.x) 
 and later versions. Specifies an ID for a node in a peer-to-peer topology. This ID is used for conflict detection if **Allow peer-to-peer conflict detection** is set to **True**. Specify a positive, nonzero ID that has never been used in the topology. For a list of IDs that have already been used, query the [Mspeer_originatorid_history](../system-tables/mspeer-originatorid-history-transact-sql.md) system table.  
  
### Updatable Subscriptions  
 **Allow immediate updating subscriptions**  
 Determines whether Subscriber data changes can be immediately replicated to the Publisher. This option is read-only; updating subscriptions can be enabled only when a publication is created. For more information, see [Updatable Subscriptions for Transactional Replication](transactional/updatable-subscriptions-for-transactional-replication.md).  
  
 **Allow queued updating subscriptions**  
 Determines whether Subscriber data changes can be queued and replicated to the Publisher at a later time. This option is read-only; updating subscriptions can be enabled only when a publication is created. For more information, see [Updatable Subscriptions for Transactional Replication](transactional/updatable-subscriptions-for-transactional-replication.md).  
  
 **Report conflicts centrally**  
 Determines whether to report conflicting data changes only at the Publisher or at both the Publisher and the Subscriber (requires the option **Allow queued updating subscriptions**). This option is read-only; it is set to **True** by default for publications created with the New Publication Wizard and cannot be changed after the publication is created. A value of **True** means conflicts are reported only at the Publisher. Conflicts can be viewed only where they are reported.  
  
 **Conflict resolution policy**  
 Specifies the action to take when a Subscriber change conflicts with a Publisher change (requires the option **Allow queued updating subscriptions**). For more information, see [Queued Updating Conflict Detection and Resolution](transactional/updatable-subscriptions-queued-updating-conflict-resolution.md).  
  
 **Queue type**  
 Determines whether to use a  SQL Server 
 queue or  Microsoft 
 Message Queuing (MSMQ) to queue changes at the Subscriber until they can be applied to the Publisher (requires the option **Allow queued updating subscriptions**). This option is relevant only for  SQL Server 2000 (8.x) 
; later versions always use  SQL Server 
 tables for queuing.  
  
## Options for merge publications  
  
### Conflict Reporting  
 **Report conflicts centrally**  
 Determines whether to report conflicting data changes only at the Publisher or at both the Publisher and the Subscriber. This option is read-only; it is set to **True** by default for publications created with the New Publication Wizard and cannot be changed after the publication is created. A value of **True** means conflicts are reported only at the Publisher. Conflicts can be viewed only where they are reported. For more information, see the "Viewing Conflicts" section of [Advanced Merge Replication Conflict Detection and Resolution](merge/advanced-merge-replication-conflict-detection-and-resolution.md).  
  
### Filtering  
 **Allow parameterized filters**  
 Set based on whether a publication uses parameterized filters. This option is always read-only. For more information, see [Parameterized Row Filters](merge/parameterized-filters-parameterized-row-filters.md).  
  
 **Validate Subscribers**  
 Determines which functions to use when validating that a Subscriber has the correct partition of data. Separate multiple values by commas. For more information, see [Validate Partition Information for a Merge Subscriber](validate-partition-information-for-a-merge-subscriber.md).  
  
 **Precompute partitions**  
  SQL Server 2005 (9.x) 
 and later versions only. Determines whether to optimize synchronization by computing in advance which data rows belong in which partitions. This setting defaults to **True** if the publication meets the criteria for precomputed partitions. For more information, see [Optimize Parameterized Filter Performance with Precomputed Partitions](merge/parameterized-filters-optimize-for-precomputed-partitions.md).  
  
 **Optimize synchronization**  
 Determines whether to optimize merge processing by storing additional metadata at each Subscriber. This optimization has been superseded by precomputed partitions; the **Optimize synchronization** option is only relevant if **Precompute partitions** is set to **False**. For more information, see [Parameterized Row Filters](merge/parameterized-filters-parameterized-row-filters.md).  
  
### Merge Processes  
 **Limit concurrent processes**  
 Determines whether to limit the number of Merge Agents that can run at the same time. This is typically used if a publication has lots of push subscriptions that might be synchronizing at the same time.  
  
 **Maximum concurrent processes**  
 The maximum number of Merge Agents that can run at the same time (requires **Limit concurrent processes**). If the number of agents synchronizing exceeds the maximum, agents are put in a queue until the number drops under the maximum.  
  
## Related content

- [Create a publication](publish/create-a-publication.md)
- [View and Modify Publication Properties](publish/view-and-modify-publication-properties.md)
- [Publish Data and Database Objects](publish/publish-data-and-database-objects.md)
