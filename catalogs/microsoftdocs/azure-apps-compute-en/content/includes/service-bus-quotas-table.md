---
title: Quotas and limits for Azure Service Bus 
description: Provides the list of quotas and limits for Azure Service Bus resources. 
author: spelluru
ms.service: azure-service-bus
ms.topic: include
ms.date: 03/17/2025
ms.author: spelluru
---

The following table lists quota information specific to Azure Service Bus messaging. For information about pricing and other quotas for Service Bus, see [Service Bus pricing](https://azure.microsoft.com/pricing/details/service-bus/).

### Common limits for all tiers

The following limits are common across all tiers. 

| Quota name | Value | Notes |
| --- | --- | --- |
| Maximum number of namespaces per Azure subscription per region | 1000 (default and maximum) | This limit is based on the `Microsoft.ServiceBus` provider, not based on the tier. Therefore, it's the total number of namespaces across all tiers. Subsequent requests for additional namespaces are rejected. |
| Number of concurrent connections on a namespace | Net Messaging: 1,000.<br /><br />AMQP: 5,000. | Subsequent requests for additional connections are rejected. REST operations don't count toward concurrent TCP connections. |
| Number of concurrent receive requests on a queue, topic, or subscription entity | 5,000 | Subsequent receive requests are rejected with a server busy error. This quota applies to the combined number of concurrent receive operations across all subscriptions on a topic. For more information, see [Throttling when concurrent receive requests exceed the limit](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-throttling#throttling-when-concurrent-receive-requests-exceed-the-limit). |
| Maximum size of any messaging entity path: queue or topic | 260 characters. | &nbsp; |
| Maximum size of any messaging entity name: namespace, subscription, or subscription rule | 50 characters. | &nbsp; |
| Maximum size of a message ID | 128 | &nbsp; |
| Maximum number of session states per messaging entity: queue or subscription | 1,000,000 | &nbsp; |
| Maximum size of a message session ID | 128 | &nbsp; |
| Message property size for a queue, topic, or subscription entity | <p>Maximum message property size for each property is 32 KB.</p><p>Cumulative size of all properties can't exceed 64 KB. This limit applies to the entire header of the brokered message, which has both user properties and system properties, such as sequence number, label, and message ID.</p><p>Maximum number of header properties in property bag: **byte/int.MaxValue**.</p> | The exception `SerializationException` is generated. |
| Number of SQL filters per topic | 2,000 | Subsequent requests for creation of additional filters on the topic are rejected, and the calling code receives an exception. |
| Number of correlation filters per topic | 100,000 | Subsequent requests for creation of additional filters on the topic are rejected, and the calling code receives an exception. |
| Size of SQL filters or actions | Maximum length of filter condition string: 1,024 (1 K).<br /><br />Maximum length of rule action string: 1,024 (1 K).<br /><br />Maximum number of expressions per rule action: 32. | Subsequent requests for creation of additional filters are rejected, and the calling code receives an exception. |
| Number of shared access authorization rules per namespace, queue, or topic | Maximum number of rules per entity type: 12. <br /><br /> Rules that are configured on a Service Bus namespace apply to all types: queues, topics. | Subsequent requests for creation of additional rules are rejected, and the calling code receives an exception. |
| Number of messages per transaction | 100 <br /><br /> For both **Send()** and **SendAsync()** operations. | Additional incoming messages are rejected, and the calling code receives an exception with the message: Can't send more than 100 messages in a single transaction. |
| Maximum number of messages deleted in DeleteMessagesAsync call | 500 | The DeleteMessagesAsync API supports deleting up to 500 messages per call. Requests exceeding this limit (e.g., 4000) will throw an ArgumentOutOfRangeException. |
| Maximum number of messages returned in PeekMessagesAsync call | 250 |
| Number of virtual network and IP filter rules | 128 | &nbsp; |







### Basic vs. standard vs. premium tiers


The following table shows limits that are different for Basic, Standard, and Premium tiers.


| Quota name | Basic | Standard | Premium | Notes |
| --- | --- | --- | --- | --- |
| Queue or topic size | 1, 2, 3, 4 GB, or 5 GB<br/><br/>80 GB, if partitioning is enabled. | 1, 2, 3, 4 GB, or 5 GB<br/><br/>80 GB, if partitioning is enabled. | 80 GB | You can **configure** and **update after creation** the maximum size. Choose from the supported values shown, up to a maximum of **80 GB**, which is the largest supported value and can't be increased beyond it. Sizes above 5 GB require [partitioning](../articles/service-bus-messaging/service-bus-partitioning.md) on the Basic and Standard tiers. The Premium tier supports 80 GB natively. <p>The total size of all entities in a namespace can't exceed the namespace size limit documented in the next row.</p><p>Subsequent incoming messages are rejected, and the calling code receives an exception.</p> <p>A large message (size \> 1 MB) sent to a queue is counted twice. A large message (size \> 1 MB) sent to a topic is counted X + 1 times, where X is the number of subscriptions whose filter condition matches the message. </p> |
| Namespace size | 400 GB | 400 GB | 1 TB per [messaging unit (MU)](../articles/service-bus-messaging/service-bus-premium-messaging.md). | Total size of all entities in a namespace can't exceed this limit. |
| Number of topics or queues per namespace | 10,000 | 10,000 | 1,000 per messaging unit (MU), up to 16,000 per namespace. | Subsequent requests for creation of a new topic or queue on the namespace are rejected. As a result, if configured through the Azure portal, an error message is generated. If called from the management API, the calling code receives an exception. |
| Number of [partitioned topics or queues](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-partitioning) per namespace | 100 | 100 | N/A | Each partitioned queue or topic counts toward the quota of 1,000 entities per namespace. <p>Subsequent requests for creation of a new partitioned topic or queue in the namespace are rejected. As a result, if configured through the Azure portal, an error message is generated. If called from the management API, the exception **QuotaExceededException** is received by the calling code.</p> <p>If you want to have more partitioned entities in a basic or a standard tier namespace, create additional namespaces.</p><p>The Premium tier uses [namespace-level partitioning](../articles/service-bus-messaging/enable-partitions-premium.md) instead, which is configured during namespace creation.</p> |
| Number of [Premium namespace partitions](../articles/service-bus-messaging/enable-partitions-premium.md) | N/A | N/A | 1, 2, or 4 | Set during namespace creation and can't be changed afterward. The number of messaging units must be a multiple of the number of partitions. MUs are distributed equally across partitions. For more information, see [Enable partitioning for a Premium namespace](../articles/service-bus-messaging/enable-partitions-premium.md). |
| Message size or batch size for a queue, topic, or subscription entity | 256 KB | 256 KB | AMQP protocol: Up to 100 MB for single message.<br/><br/>HTTP and SBMP protocols: Up to 1 MB for single message.<br/><br/>All protocols: Up to 1 MB for message batch. | The message size includes the size of properties (system and user) and the size of payload. The size of system properties varies depending on your scenario. Incoming messages that exceed these quotas are rejected, and the calling code receives an exception.<p>For Premium, the default maximum message size per entity is 1 MB. You can increase it up to 100 MB per queue or topic when using AMQP. For more information, see [Large messages support](../articles/service-bus-messaging/service-bus-premium-messaging.md#large-messages-support).</p> |
| Number of subscriptions per topic | 2,000 | 2,000 | 2,000 | Subsequent requests for creating additional subscriptions for the topic are rejected. As a result, if configured through the portal, an error message is shown. If called from the management API, the calling code receives an exception. |
| Operations per second | 1,000 | 1,000 | N/A | Premium doesn't have fixed limitations on the operations per second. The throughput varies depending on the [number of MUs](../articles/service-bus-messaging/service-bus-premium-messaging.md#how-many-messaging-units-are-needed) and the characteristics of the workload. For more information on how the workload impacts the throughput, and how to optimize this, see [Best Practices for performance improvements using Service Bus Messaging](../articles/service-bus-messaging/service-bus-performance-improvements.md). |
