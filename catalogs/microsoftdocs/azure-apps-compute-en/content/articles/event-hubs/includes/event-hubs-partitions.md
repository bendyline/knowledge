---
title: Event Hubs partitions
description: Describes partitions in Azure Event Hubs. 
author: spelluru
ms.service: azure-event-hubs
ms.topic: include
ms.date: 12/12/2024
ms.author: spelluru
ms.custom: "include file"

---

Event Hubs organizes sequences of events sent to an event hub into one or more partitions. As newer events arrive, they're added to the end of this sequence. 

Image that shows an event hub with a few partitions.

A partition can be thought of as a commit log. Partitions hold event data that contains the following information:

- Body of the event
- User-defined property bag describing the event
- Metadata such as its offset in the partition, its number in the stream sequence
- Service-side timestamp at which it was accepted

Diagram that displays the older to newer sequence of events.

### Advantages of using partitions
Event Hubs is designed to help with processing of large volumes of events, and partitioning helps with that in two ways:

- Even though Event Hubs is a PaaS service, there's a physical reality underneath. Maintaining a log that preserves the order of events requires that these events are being kept together in the underlying storage and its replicas and that results in a throughput ceiling for such a log. Partitioning allows for multiple parallel logs to be used for the same event hub and therefore multiplying the available raw input-output (IO) throughput capacity.
- Your own applications must be able to keep up with processing the volume of events that are being sent into an event hub. It might be complex and requires substantial, scaled-out, parallel processing capacity. The capacity of a single process to handle events is limited, so you need several processes. Partitions are how your solution feeds those processes and yet ensures that each event has a clear processing owner. 

### Number of partitions
The number of partitions is specified at the time of creating an event hub. It must be between one and the maximum partition count allowed for each pricing tier. For the partition count limit for each tier, see [this article](../event-hubs-quotas.md#basic-vs-standard-vs-premium-vs-dedicated-tiers). 

We recommend that you choose at least as many partitions as you expect that are required during the peak load of your application for that particular event hub.

For tiers other than the premium and dedicated tiers, you can't change the partition count for an event hub after its creation. For an event hub in a premium or dedicated tier, you can [increase the partition count](../dynamically-add-partitions.md) after its creation, but you can't decrease them. The distribution of streams across partitions will change when it's done as the mapping of partition keys to partitions changes, so you should try hard to avoid such changes if the relative order of events matters in your application.

Setting the number of partitions to the maximum permitted value is tempting, but always keep in mind that your event streams need to be structured such that you can indeed take advantage of multiple partitions. If you need absolute order preservation across all events or only a handful of substreams, you might not be able to take advantage of many partitions. Also, many partitions make the processing side more complex. 

It doesn't matter how many partitions are in an event hub when it comes to pricing. It depends on the number of pricing units ([throughput units
(TUs)](../event-hubs-scalability.md#throughput-units) for the standard tier, [processing units (PUs)](../event-hubs-scalability.md#processing-units) for the premium tier, and [capacity units (CUs)](../event-hubs-dedicated-overview.md#capacity-units) for the dedicated tier) for the namespace or the dedicated cluster. For example, an event hub of the standard tier with 32 partitions or with one partition incur the exact same cost when the namespace is set to one TU capacity. Also, you can scale TUs or PUs on your namespace or CUs of your dedicated cluster independent of the partition count. 


A [partition](../event-hubs-features.md#partitions) is a data organization mechanism that enables parallel publishing and consumption. While it supports parallel processing and scaling, total capacity remains limited by the namespace's scaling allocation. Balance scaling units (throughput units for the standard tier, processing units for the premium tier, or capacity units for the dedicated tier) and partitions to achieve optimal scale.

Start with your workload profile: average payload size, events per second, and sensitivity to throughput drops or latency spikes. Use the per-partition throughput below as a starting point, then validate with load tests:

- **Standard tier**: ~1 MB/s ingress and ~2 MB/s egress per partition.
- **Premium and Dedicated tiers**: ~1-2 MB/s ingress and ~2-5 MB/s egress per partition.

Estimate partitions by dividing your expected ingress and egress by the applicable per-partition rates and taking the larger result. If observed throughput or latency doesn't meet expectations, increase partitions (Premium and Dedicated tiers only) and retest.

Partitions also set the ceiling for consumer parallelism. How that ceiling works depends on the consumer type:

- **Epoch (exclusive) consumers** — Used by `EventProcessorClient` (.NET, Java) and `EventHubConsumerClient` (Python, JavaScript), which is the recommended pattern for production AMQP workloads. Only one epoch consumer can own a given partition in a consumer group at a time. If you deploy more processor instances than partitions, the extra instances aren't assigned any partitions and sit idle until an existing owner releases one. If a new epoch consumer connects with a higher owner level, the service disconnects the current owner with a `ConsumerDisconnected` error, and the new consumer takes over.
- **Non-epoch consumers** — Up to 5 non-epoch receivers can read the same partition concurrently within a consumer group. Each receiver sees the same events (fan-out), so this mode doesn't increase processing throughput per partition. Connecting an epoch consumer to a partition disconnects all non-epoch consumers on that partition.
- **Kafka consumers** — Kafka consumers use the group coordination protocol (`group.id`) instead of AMQP epochs, but the partition-ownership model is equivalent: each partition is assigned to exactly one consumer member within a consumer group at a time. When a new member joins or an existing member leaves, the group rebalances and redistributes partition assignments. If there are more consumer members than partitions, the excess members receive no assignments and remain idle until a future rebalance frees up a partition. To reduce unnecessary rebalancing from transient disconnections, set a unique `group.instance.id` per consumer instance (static membership).

In practice, **the number of partitions equals the maximum number of parallel consumers per consumer group** regardless of whether you use AMQP epoch consumers or Kafka consumers. Factor this into your partition count when you plan for scale-out.

If your application has an affinity to a particular partition, increasing the number of partitions isn't beneficial. For more information, see [availability and consistency](../event-hubs-availability-and-consistency.md).


### Mapping of events to partitions
You can use a partition key to map incoming event data into specific partitions for the purpose of data organization. The partition key is a sender-supplied value passed into an event hub. It's processed through a static hashing function, which creates the partition assignment. If you don't specify a partition key when publishing an event, a round-robin assignment is used.

The event publisher is only aware of its partition key, not the partition to which the events are published. This decoupling of key and partition insulates the sender from needing to know too much about the downstream processing. A per-device or user unique identity makes a good partition key, but other attributes such as geography can also be used to group related events into a single partition.

Specifying a partition key enables keeping related events together in the same partition and in the exact order in which they arrived. The partition key is some string that is derived from your application context and identifies the interrelationship of the events. A sequence of events identified by a partition key is a *stream*. A partition is a multiplexed log store for many such streams. 

> **Note:**
> While you can send events directly to partitions, we don't recommend it, especially when high availability is important to you. It downgrades the availability of an event hub to partition-level. For more information, see [Availability and Consistency](../event-hubs-availability-and-consistency.md).
