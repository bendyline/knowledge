---
title: Push delivery in Event Grid namespaces
description: Learn how push delivery works in Azure Event Grid namespaces so that you can build applications that react to discrete events over HTTP.
ms.topic: concept-article
ms.custom:
  - ignite-2023
  - build-2024
ms.date: 08/27/2026
author: robece
ms.author: robece
ai-usage: ai-assisted
#customer intent: As a developer, I want to understand push delivery in Event Grid namespaces so that I can build applications that react to discrete events.
---

# Azure Event Grid namespaces - Push delivery

Push delivery is a delivery mode in which Event Grid namespaces send events to a destination as soon as they're published, so your applications can react to discrete events without polling. Over HTTP, Event Grid pushes each event to a supported event handler or a custom webhook that you configure.

This article explains how push delivery works in Event Grid namespaces and describes the supported event handlers, so you can decide whether it fits your application.

## Namespace topics and subscriptions

Events published to Event Grid namespaces land on a topic, which is a namespace subresource that logically contains all events. With namespace topics, you can create subscriptions with flexible consumption modes to push events to a particular destination or [pull events](pull-delivery-overview.md) at your pace.

Diagram showing a topic and associated event subscriptions.

## Supported event handlers

Event Grid supports the following event handlers:


- [Event Hubs](namespace-handler-event-hubs.md)
- [Webhooks](namespace-handler-webhook.md)



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


## Related content

- [Push delivery with HTTP for Event Grid basic](push-delivery-overview.md)
- [Choose the right Event Grid tier for your solution](choose-right-tier.md)
- [Create, view, and manage namespaces](create-view-manage-namespaces.md)
- [Quickstart: Publish and subscribe to app events using namespace topics](publish-events-using-namespace-topics.md)
- [Control plane and data plane SDKs](sdk-overview.md)
- [Quotas and limits](quotas-limits.md)
