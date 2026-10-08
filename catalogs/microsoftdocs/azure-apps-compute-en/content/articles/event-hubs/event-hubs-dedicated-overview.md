---
title: Azure Event Hubs Dedicated Tier Overview
description: Discover Azure Event Hubs Dedicated tier, a single-tenant solution for enterprise-scale, low-latency event streaming. Evaluate its benefits for mission-critical workloads.
#customer intent: As an enterprise architect, I want to understand the benefits of Azure Event Hubs Dedicated tier so that I can evaluate its suitability for mission-critical workloads.  
ms.topic: concept-article
ms.date: 08/25/2026
ai-usage: ai-assisted
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:07/28/2025
  - ai-gen-description
---

# Azure Event Hubs Dedicated tier overview

Azure Event Hubs Dedicated tier is a single-tenant solution designed to meet the needs of enterprise-scale, mission-critical event streaming workloads. This article provides an overview of the Dedicated tier, highlighting its key features, benefits, and use cases, and shows how it supports high-performance, low-latency applications using Event Hubs SDK or Apache Kafka APIs.

## Benefits of dedicated clusters

The Dedicated tier of Event Hubs offers several benefits to customers who need to run mission-critical workloads at enterprise-level capacity.

### Low-latency event streaming

These clusters are optimized for low end-to-end latency and high performance. These clusters enable businesses to handle high-velocity and high-volume data streaming.

### Stream large volumes of data

Dedicated clusters can stream events at the scale of gigabytes per second or millions of events per second for most use cases. You can also scale these clusters to accommodate changes in event streaming volume.

### Guaranteed consistent performance

Event Hubs dedicated clusters minimize the latency jitter and ensure consistent performance with guaranteed capacity.

### Zero interference

Event Hubs dedicated clusters operate on a single-tenant architecture. This architecture ensures that the allocated resources aren't shared with any other tenants. Unlike other tiers, you don't see any cross-tenant interference in a dedicated cluster.

### Self-serve scaling

The dedicated cluster offers self-serve scaling capabilities that allow you to adjust the capacity of the cluster according to dynamic loads and to facilitate business operations. You can scale out during spikes in usage and scale in when the usage is low.

### High-end features and generous quotas

Dedicated clusters include all features of the Premium tier and more. The service also manages load balancing, operating system updates, security patches, and partitioning. You can spend less time on infrastructure maintenance and more time on building your event streaming applications.

### Supports streaming large messages

In most streaming scenarios, data is lightweight, typically less than 1 MB, and requires high throughput. There are instances where messages can't be divided into smaller segments. Self-serve dedicated clusters can accommodate events up to 20 MB of size at no extra cost. This capability allows Event Hubs to handle a wide range of message sizes to ensure uninterrupted business operations. For more information, see [Send and receive large messages with Azure Event Hubs](event-hubs-quickstart-stream-large-messages.md).

## Capacity units

Dedicated clusters are provisioned and billed by capacity units (CUs), which is a preallocated amount of CPU and memory resources.

How much you can ingest and stream per CU depends on factors such as the:

- Number of producers and consumers.
- Number of partitions.
- Producer and consumer configuration.
- Payload size.
- Egress rate.

To determine the necessary number of CUs, you should carry out your anticipated event streaming workload on an Event Hubs dedicated cluster while you observe the cluster's resource utilization. For more information, see [When should I scale my dedicated cluster](#when-should-i-scale-my-dedicated-cluster).

## Cluster provisioning and scaling

When you create a dedicated cluster through the Azure portal or Azure Resource Manager templates (ARM templates), you get a self-serve scalable cluster that you can scale the number of CUs allocated to the cluster. To learn how to scale your dedicated cluster, see [Scale a dedicated cluster](event-hubs-dedicated-cluster-create-portal.md#scale-a-dedicated-cluster).

Approximately one CU provides *ingress capacity ranging from 100 MB/sec to 200 MB/sec*, although actual throughput might fluctuate depending on various factors.

You can purchase up to 10 CUs for a cluster in the Azure portal. You can scale clusters incrementally with CUs ranging from 1 to 10. If you need a cluster larger than 10 CUs, you can [submit a support request](event-hubs-dedicated-cluster-create-portal.md#submit-a-support-request) to scale up your cluster after its creation.

> **Important:**
> To enable availability zones on an Event Hubs dedicated cluster, you must provision the cluster with three or more CUs. Availability zone support is only available in [Azure regions with availability zones](https://learn.microsoft.com/azure/reliability/availability-zones-region-support). You can't currently create zone-redundant dedicated clusters through the Azure portal or ARM templates, so [submit a support request](event-hubs-dedicated-cluster-create-portal.md#submit-a-support-request) to create one.

## Quotas and limits

The Event Hubs Dedicated offering is billed at a fixed monthly price with a *minimum of four hours of usage*. The Dedicated tier offers all the features of the Premium plan, but with enterprise-scale capacity and limits for customers with demanding workloads.

For more information about quotas and limits, see [Event Hubs quotas and limits](event-hubs-quotas.md).

## FAQs


### Can I scale up or scale down my cluster?

Use the [self-serve experience](event-hubs-dedicated-cluster-create-portal.md#scale-a-dedicated-cluster) to scale out and scale in your dedicated cluster, as needed. You can scale up to 10 CUs. The performance of dedicated clusters depends on factors such as resource allocation, number of partitions, and storage. Test with a real workload to determine the required number of CUs.

If you need more than 10 CUs for your dedicated cluster, [submit a support request](event-hubs-dedicated-cluster-create-portal.md#submit-a-support-request) to scale out your cluster.

> **Warning:**
> You won't be able to delete the cluster for at least four hours after you create it. You're charged for a minimum of four hours of usage of the cluster. For more information on pricing, see [Event Hubs pricing](https://azure.microsoft.com/pricing/details/event-hubs/).

### When should I scale my dedicated cluster?

CPU consumption is the key indicator of the resource consumption of your dedicated cluster. When the overall CPU consumption begins to reach 70% (without observing any abnormal conditions, such as a high number of server errors or a low number of successful requests), that means your cluster is moving toward its maximum capacity. You can use this information as an indicator to consider whether you need to scale up your dedicated cluster or not.

To monitor the CPU usage of the dedicated cluster, follow these steps:

1. On the **Metrics** page of your Event Hubs dedicated cluster, select **Add metric**.
1. Select **CPU** as the metric and use **Max** as the aggregation.

    Screenshot that shows the Metrics page with the CPU metric.

1. Select **Add filter** and add a filter for the **Property** type **Role**. Use the equal operator and select all the values (**Backend** and **Gateway**) from the dropdown list.

    Screenshot that shows the Metrics page with CPU consumption metric and roles.

    Then you can monitor this metric to determine when you should scale your dedicated cluster. You can also set up [alerts](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-overview) against this metric to get notified when CPU usage reaches the thresholds you set.

### How does geo-disaster recovery work with my cluster?

You can geo-pair a namespace under a Dedicated-tier cluster with another namespace under a Dedicated-tier cluster. We don't encourage pairing a Dedicated-tier namespace with a namespace in the Standard offering because the throughput limit is incompatible and results in errors.

### Can I migrate my Standard or Premium namespaces to a Dedicated-tier cluster?

We don't currently support an automated migration process for migrating your Event Hubs data from a Standard or Premium namespace to a dedicated one.

### How do I create a zone-redundant dedicated cluster?

To provide zone redundancy for the Dedicated offering, all compute resources must have replicas across three datacenters in the same region.

You can't currently create zone-redundant dedicated clusters through the Azure portal or ARM templates. [Submit a support request](event-hubs-dedicated-cluster-create-portal.md#submit-a-support-request) to create one. Once a zone-redundant cluster is created, you can't scale it below 3 CUs.


## Related content

- [Create an Event Hubs Dedicated cluster through the Azure portal](event-hubs-dedicated-cluster-create-portal.md)
- [Scale an Event Hubs dedicated cluster](event-hubs-dedicated-cluster-create-portal.md#scale-a-dedicated-cluster)
- [Event Hubs quotas and limits](event-hubs-quotas.md)
- [Event Hubs Dedicated pricing](https://azure.microsoft.com/pricing/details/event-hubs/)
- [Event Hubs FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/event-hubs-faq.yml)
