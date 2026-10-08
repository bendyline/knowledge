---
title: Azure Event Hubs Quotas and Limits Overview
description: This article provides limits and quotas for Azure Event Hubs. For example, number of namespaces per subscription, number of event hubs per namespace.
#customer intent: As a cloud architect, I want to understand the quotas and limits of Azure Event Hubs so that I can design scalable solutions.
ms.topic: article
ms.date: 02/05/2026
---

# Azure Event Hubs quotas and limits
The following tables provide quotas and limits specific to [Azure Event Hubs](https://azure.microsoft.com/services/event-hubs/). For information about Event Hubs pricing, see [Event Hubs pricing](https://azure.microsoft.com/pricing/details/event-hubs/).

## Common limits for all tiers

The following limits are common across all tiers. 

| Limit | Notes | Value |
| --- | --- | --- |
| Size of an event hub name | - | 256 characters |
| Size of a consumer group name | Kafka protocol doesn't require the creation of a consumer group. | <p>Kafka: 256 characters</p><p>Advanced Message Queuing Protocol (AMQP): 50 characters |
| Number of non-epoch receivers per consumer group | - | 5 |
| Number of authorization rules per namespace | Subsequent requests for authorization rule creation are rejected. | 12 |
| Number of calls to the GetRuntimeInformation method | - | 50 per second per consumer group |
| Number of virtual networks | - | 128 |
| Number of IP Config rules | - | 128 |
| Maximum length of a schema group name |  | 50 |
| Maximum length of a schema name |  | 100 |
| Size in bytes per schema |  | 1 MB |
| Number of properties per schema group |  | 1024 |
| Size in bytes per schema group property key |  | 256 |
| Size in bytes per schema group property value |  | 1024 |
| Number of concurrent receive requests on a hub/topic | Subsequent receive requests are throttled. This quota applies to the combined number of concurrent receive operations across all consumers/consumer groups | 5000 |


## Basic vs. standard vs. premium vs. dedicated tiers

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



## Next steps

You can learn more about Event Hubs by visiting the following links:

* [Event Hubs overview](event-hubs-about.md)
* [Auto-inflate](event-hubs-auto-inflate.md)
* [Event Hubs FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/event-hubs-faq.yml)
