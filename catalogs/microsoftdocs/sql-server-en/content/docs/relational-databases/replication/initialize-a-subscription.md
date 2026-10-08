---
title: "Initialize a Subscription"
description: "Initialize a Subscription"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "snapshot replication [SQL Server], initializing subscriptions"
  - "transactional replication, initializing subscriptions"
  - "initializing subscriptions [SQL Server replication]"
  - "subscriptions [SQL Server replication], initializing"
  - "initializing subscriptions [SQL Server replication], about initializing subscriptions"
  - "merge replication [SQL Server replication], initializing subscriptions"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Initialize a Subscription

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  Subscribers in a replication topology must be initialized, so that they have a copy of the schema from each article in the publication they have subscribed to and any replication objects that are required, such as stored procedures, triggers, and metadata tables. In addition, the Subscriber typically receives an initial dataset. The default initialization method uses a full snapshot that includes schema, replication objects, and data, but publications can also be initialized without a full snapshot.  
  
 For more information, see [Initialize a Subscription with a Snapshot](initialize-a-subscription-with-a-snapshot.md) and [Initialize a Transactional Subscription Without a Snapshot](initialize-a-transactional-subscription-without-a-snapshot.md).
