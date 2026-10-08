
## Push and pull delivery

Event Grid supports push and pull event delivery using HTTP. With **push delivery**, you define a destination in an event subscription, a webhook, or an Azure service, to which Event Grid sends events. With **pull delivery**, subscriber applications connect to Event Grid to consume events. Pull delivery is supported for topics in an Event Grid namespace.

> **Important:**
> Event Hubs is supported as a destination for subscriptions to namespace topics. In coming releases, Event Grid Namespaces will support all destinations currently available in Event Grid Basic along with additional destinations.

High-level diagram showing push delivery and pull delivery with the kind of resources involved.

### When to use push delivery vs. pull delivery

The following are general guidelines to help you decide when to use pull or push delivery.

#### Pull delivery

- You need full control as to when to receive events. For example, your application might not be up all the time, not stable enough, or you process data at certain times.
- You need full control over event consumption. For example, a downstream service or layer in your consumer application has a problem that prevents you from processing events. In that case, the pull delivery API allows the consumer app to release an already read event back to the broker so that it can be delivered later.
- You want to use [private links](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-endpoint-overview.md) when receiving events, which is possible only with the pull delivery, not the push delivery.
- You don't have the ability to expose an endpoint and use push delivery, but you can connect to Event Grid to consume events.

#### Push delivery

- You want to avoid constant polling to determine that a system state change has occurred. You rather use Event Grid to send events to you at the time state changes happen.
- You have an application that can't make outbound calls. For example, your organization might be concerned about data exfiltration. However, your application can receive events through a public endpoint.


## Original source metadata

```text
---
 title: Pull and push delivery
 description: Describes the differences between push and pull delivery models supported by Event Grid namespaces.
 author: robece
 ms.service: azure-event-grid
 ms.topic: include
 ms.date: 12/16/2024
 ms.author: robece
ms.custom:
  - include file
  - ignite-2023
---
```
