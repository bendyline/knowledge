---
title: "Replication Monitor"
description: "Reference guide for replication monitor pages and dialog boxes in SQL Server, including monitoring Publishers, Distributors, publications, and subscriptions."
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 02/24/2026
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
ai-usage: ai-assisted
f1_keywords:
  - "sql13.rep.monitor.beta2.f1"
helpviewer_keywords:
  - "Replication Monitor, help"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Replication monitor


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





This section of the documentation includes information on the replication monitor. The pages and dialog boxes displayed in the monitor differ depending on the type of replication and the version of  Microsoft 
  SQL Server 
 that is monitored.

## Replication monitor overview

These pages provide the main monitoring interface and configuration options.

| Page | Description |
| --- | --- |
| [Replication monitor, main page](replication-monitor-main-page.md) | The primary interface for monitoring all replication activity on monitored Publishers and Distributors. |
| [Add publisher](add-publisher.md) | Adds a Publisher to be monitored in replication monitor. |
| [Distributor settings](distributor-settings.md) | Configures settings for how replication monitor connects to the Distributor. |
| [Distributor information, publications](distributor-information-publications.md) | Displays information about publications from the Distributor. The information that is displayed about the publications supported by the Distributor includes a column that contains the  SQL Server |
 | instance of the Publisher. |

## Publisher monitoring

These pages display information and settings for monitored Publishers.

| Page | Description |
| --- | --- |
| [Publisher settings](publisher-settings.md) | Configures connection and refresh settings for a monitored Publisher. |
| [Publisher information, publications](publisher-information-publications.md) | Displays a list of all publications on a Publisher with status and performance metrics. |
| [Publisher information, subscription watch list (Transactional publication)](publisher-information-subscription-watch-list-transactional.md) | Displays subscriptions that require attention for Transactional publications. |
| [Publisher information, subscription watch list (Merge publication)](publisher-information-subscription-watch-list-merge-publication.md) | Displays subscriptions that require attention for Merge publications. |
| [Publisher information, subscription watch list (Snapshot publication)](publisher-information-subscription-watch-list-snapshot.md) | Displays subscriptions that require attention for Snapshot publications. |
| [Publisher information, agents](publisher-information-agents.md) | Displays information about all replication agents associated with a Publisher. |

## Publication monitoring

These pages display detailed information about publications and their subscriptions.

| Page | Description |
| --- | --- |
| [Publication information, all subscriptions (Transactional publication)](publication-information-all-subscriptions-transactional-publication.md) | Displays all subscriptions for a Transactional publication with synchronization status. |
| [Publication information, all subscriptions (Merge publication)](publication-information-all-subscriptions-merge-publication.md) | Displays all subscriptions for a Merge publication with synchronization status. |
| [Publication information, all subscriptions (Snapshot publication)](publication-information-all-subscriptions-snapshot-publication.md) | Displays all subscriptions for a Snapshot publication with synchronization status. |
| [Publication information, warnings (Transactional publication)](publication-information-warnings-transactional-publication.md) | Displays and configures warnings for Transactional publications based on thresholds. |
| [Publication information, warnings (Merge publication)](publication-information-warnings-merge-publication-sql-server-2005-and-later.md) | Displays and configures warnings for Merge publications based on thresholds. |
| [Publication information, warnings (Snapshot publication)](publication-information-warnings-snapshot-publication-sql-server-2005-and-later.md) | Displays and configures warnings for Snapshot publications based on thresholds. |
| [Publication information, agents (Transactional publication)](publication-information-agents-transactional-publication.md) | Displays information about agents associated with a Transactional publication. |
| [Publication information, agents (Merge publication)](publication-information-agents-merge-publication.md) | Displays information about agents associated with a Merge publication. |
| [Publication information, agents (Snapshot publication)](publication-information-agents-snapshot-publication.md) | Displays information about agents associated with a Snapshot publication. |
| [Publication information, tracer tokens (Transactional publication)](publication-information-tracer-tokens-sql-server-2005-and-later.md) | Inserts and monitors tracer tokens to measure latency in transactional replication. |

## Subscription monitoring

These pages display detailed information about individual subscriptions.

| Page | Description |
| --- | --- |
| [Subscription, undistributed commands (Transactional subscription)](subscription-undistributed-commands-transactional-subscription.md) | Displays the number of commands in the distribution database that haven't been delivered to the Subscriber. |
| [Subscription, publisher to distributor history (Transactional subscription)](subscription-publisher-to-distributor-history-transactional-subscription.md) | Displays the history of transactions moving from Publisher to Distributor. |
| [Subscription, distributor to subscriber history (Transactional subscription)](subscription-distributor-to-subscriber-history-transactional-subscription.md) | Displays the history of commands being delivered from Distributor to Subscriber. |
| [Subscription, synchronization history (Merge subscription)](subscription-synchronization-history.md) | Displays the detailed synchronization history for a merge subscription. |
| [Subscription, distributor to subscriber history (Snapshot subscription)](subscription-distributor-to-subscriber-history-snapshot-subscription.md) | Displays the history of snapshot delivery from Distributor to Subscriber. |

## Replication agents

These pages display information about individual replication agents.

| Page | Description |
| --- | --- |
| [Log reader agent](log-reader-agent.md) | Displays status and history for the log reader agent that reads the transaction log. |
| [Queue reader agent](queue-reader-agent.md) | Displays status and history for the queue reader agent used with queued updating subscriptions. |
| [Snapshot agent](snapshot-agent.md) | Displays status and history for the snapshot agent that generates initial snapshots. |

## Filter and display options

These pages configure how data is filtered and displayed in Replication Monitor.

| Page | Description |
| --- | --- |
| [Filter settings](filter-settings.md) | Configures filter criteria for displaying subscriptions and other replication data. |
| [Sort columns](sort-columns.md) | Configures which columns are displayed and their sort order in replication monitor grids. |

## Related content

- [Start the Replication Monitor](monitor/start-the-replication-monitor.md)
