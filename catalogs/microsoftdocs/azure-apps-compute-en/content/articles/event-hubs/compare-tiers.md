---
title: Compare Azure Event Hubs tiers
description: Compare the Basic, Standard, Premium, and Dedicated tiers of Azure Event Hubs to choose the right tier for your workload.
ms.topic: product-comparison
ms.date: 08/25/2026
ai-usage: ai-assisted

#customer intent: As an architect evaluating Azure Event Hubs, I want to compare the features and quotas of each tier so that I can choose the tier that best fits my throughput, scale, and isolation needs.
---

# Compare Azure Event Hubs tiers

Azure Event Hubs is a big data streaming platform and event ingestion service. It offers four tiers that differ in features, performance, capacity, and isolation. This article compares those tiers so you can choose the one that best fits your workload.

This article compares the following tiers:

- **Basic**: A low-cost entry point for simple streaming scenarios that need only basic features.
- **Standard**: A general-purpose tier for most streaming workloads, with support for Event Hubs Capture, Apache Kafka, and geo-disaster recovery.
- **Premium**: A tier that provides resource isolation, higher performance, and enhanced security for mission-critical workloads. For more information, see [Overview of Event Hubs Premium](event-hubs-premium-overview.md).
- **Dedicated**: A single-tenant offering for the largest streaming workloads that need guaranteed capacity and the highest limits. For more information, see [Overview of Event Hubs Dedicated](event-hubs-dedicated-overview.md).

> **Note:**
> This article compares only the features and quotas of each tier. For pricing, see [Azure Event Hubs pricing](https://azure.microsoft.com/pricing/details/event-hubs/).

## Choose a tier

This section helps you narrow down the most likely tiers for your needs:

- Choose **Basic** for simple, low-volume streaming where you need a single consumer group and short retention.
- Choose **Standard** for most production workloads that need multiple consumer groups, Event Hubs Capture, Apache Kafka support, and geo-disaster recovery.
- Choose **Premium** when you need predictable performance through resource isolation, longer retention, customer-managed keys, or dynamic partition scale-out, without managing a dedicated cluster.
- Choose **Dedicated** for the largest, most demanding workloads that need a single-tenant cluster, the highest quotas, and the longest retention.

Use this list as a starting point, then use the following sections to compare the tiers in detail.

## Features


The following table shows the list of features that are available (or not available) in a specific tier of Azure Event Hubs.

| Feature | Basic | Standard | Premium | Dedicated |
| --- | --- | --- | --- | --- |
| Tenancy | Multitenant | Multitenant | Multitenant with resource isolation | Exclusive single tenant |
| Private link | N/A | Yes | Yes | Yes |
| Customer-managed key <br/>(bring your own key) | N/A | N/A | Yes | Yes |
| Capture | N/A | Priced separately | Included | Included |
| Dynamic partitions scale-out | N/A | N/A | Yes | Yes |
| Ingress events | Pay per million events | Pay per million events | Included | Included |
| Runtime audit logs | N/A | N/A | Yes | Yes |
| Availability zone | Yes | Yes | Yes | Yes |
| Geo-disaster recovery | N/A | Yes | Yes | Yes |
| Geo-replication | N/A | N/A | Yes | Yes |
| IP firewall | N/A | Yes | Yes | Yes |

> **Note:**
> *Included* in the table means the feature is available and there's no separate charge for using it.


## Quotas


The following table shows limits that are different for Basic, Standard, Premium, and Dedicated tiers.

> **Note:**
> - In the table, CU is [capacity unit](event-hubs-dedicated-overview.md), PU is [processing unit](event-hubs-scalability.md#processing-units), and TU is [throughput unit](event-hubs-scalability.md#throughput-units).
> - You can configure [TUs](enable-auto-inflate.md) for a Basic or Standard tier namespace or [PUs](configure-processing-units-premium-namespace.md) for a Premium tier namespace.
> - When you [create a dedicated cluster](event-hubs-dedicated-cluster-create-portal.md#create-an-event-hubs-dedicated-cluster), Azure Event Hubs assigns one CU to the cluster. You can scale out by increasing CUs or scale in by decreasing CUs for the cluster. For step-by-step instructions, see [Scale dedicated cluster](event-hubs-dedicated-cluster-create-portal.md#scale-a-dedicated-cluster). To scale beyond 10 CUs, [submit a support request](event-hubs-dedicated-cluster-create-portal.md#submit-a-support-request).

| Limit | Basic | Standard | Premium | Dedicated |
| --- | --- | --- | --- | --- |
| Maximum size of Event Hubs publication | 256 KB | 1 MB | 1 MB | 20 MB |
| Number of consumer groups per event hub | 1 | 20 | 100 | 1,000<br/>No limit per CU |
| Number of Kafka consumer groups per namespace | N/A | 1,000 | 1,000 | 1,000 |
| Number of brokered connections per namespace | 100 | 5,000 | 10,000 per PU<br/><br/>For example, if the namespace is assigned 4 PUs, the limit is 40,000. | 100,000 per CU |
| Maximum retention period of event data | 1 day | 7 days | 90 days | 90 days |
| Event storage for retention | 84 GB per TU | 84 GB per TU | 1 TB per PU | 10 TB per CU |
| Maximum TUs or PUs or CUs | 40 TUs | 40 TUs | 16 PUs | 10 CUs (more via support request) |
| Number of partitions per event hub | 32 | 32 | 100 per event hub, but there's a limit of 200 per PU at the namespace level.<br/><br/> For example, if a namespace is assigned 2 PUs, the limit for total number of partitions in all event hubs in the namespace is 2 * 200 = 400. | 1,024 per event hub<br/> 2,000 per CU |
| Number of namespaces per subscription per region | 1,000 (all tiers) | 1,000 (all tiers) | 1,000 (all tiers) | 1,000 (50 per CU) |
| Number of event hubs per namespace | 10 | 10 | 100 per PU | 1,000 |
| Capture | N/A | Pay per hour | Included | Included |
| Size of compacted event hub | N/A | 1 GB per partition | 250 GB per partition | 250 GB per partition |
| Size of the schema registry (namespace) in megabytes | N/A | 25 | 100 | 1,024 |
| Number of schema groups in a schema registry or namespace | N/A | 1: excluding the default group | 100 <br/>1 MB per schema | 1,000<br/>1 MB per schema |
| Number of schema versions across all schema groups | N/A | 25 | 1,000 | 10,000 |
| Throughput per unit | Ingress: 1 MB/sec or 1,000 events per second<br/>Egress: 2 MB/sec or 4,096 events per second | Ingress: 1 MB/sec or 1,000 events per second<br/>Egress: 2 MB/sec or 4,096 events per second | No limits per PU * | No limits per CU * |

\* Depends on factors such as resource allocation, number of partitions, and storage.

> **Note:**
> You can publish events individually or batched. The publication limit (according to tier) applies regardless of whether it's a single event or a batch. Publishing events larger than the maximum threshold is rejected.


## Related content

- [Azure Event Hubs pricing](https://azure.microsoft.com/pricing/details/event-hubs/)
- [Overview of Event Hubs Premium](event-hubs-premium-overview.md)
- [Overview of Event Hubs Dedicated](event-hubs-dedicated-overview.md)
- [Scalability with Event Hubs](event-hubs-scalability.md)
