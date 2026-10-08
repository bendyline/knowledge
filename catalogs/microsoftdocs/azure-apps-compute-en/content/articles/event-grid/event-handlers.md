---
title: Azure Event Grid Event Handlers Overview
description: Learn about supported event handlers in Azure Event Grid, including Azure Automation, Functions, Logic Apps, and more. Discover how to process events effectively.
#customer intent: As a developer, I want to understand the supported event handlers in Azure Event Grid so that I can choose the right one for my application.
ms.topic: concept-article
ms.date: 02/17/2026
---

# Event handlers in Azure Event Grid
An event handler is the destination for an event. The handler takes some action to process the event. Several Azure services are automatically configured to handle events. You can also use any webhook for handling events. The webhook doesn't need to be hosted in Azure to handle events. Event Grid only supports HTTPS webhook endpoints.

## Supported event handlers
Here are the supported event handlers: 


- [Webhooks](handler-webhooks.md). Azure Automation runbooks and Logic Apps are supported via webhooks.
- [Azure functions](handler-functions.md).
- [Event Hubs](handler-event-hubs.md).
- [Service Bus queues and topics](handler-service-bus.md).
- [Relay hybrid connections](handler-relay-hybrid-connections.md).
- [Storage queues](handler-storage-queues.md).
- [Azure Monitor alerts (from Azure Key Vault source only)](handler-azure-monitor-alerts.md).
- [Event Grid namespace topics](handler-event-grid-namespace-topic.md).


## Next steps
- For an introduction to Event Grid, see [About Event Grid](overview.md).
