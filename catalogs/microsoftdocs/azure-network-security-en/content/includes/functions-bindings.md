---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 09/15/2026
ms.author: glenga
ms.custom: fasttrack-edit
---
This table shows the triggers and bindings available in Azure Functions:<sup>1</sup>

| Type | Trigger | Input | Output |
| --- | :---: | :---: | :---: |
| [Blob Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob.md) | ✔ | ✔ | ✔ |
| [Azure Cosmos DB](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-cosmosdb-v2.md) | ✔ | ✔ | ✔ |
| [Azure Data Explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-data-explorer.md) |  | ✔ | ✔ |
| [Azure SQL](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql.md) | ✔ | ✔ | ✔ |
| [Dapr](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-dapr.md)<sup>3</sup> | ✔ | ✔ | ✔ |
| [Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-grid.md) | ✔ |  | ✔ |
| [Event Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-hubs.md) | ✔ |  | ✔ |
| [HTTP and webhooks](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-http-webhook.md) | ✔ |  | ✔ |
| [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot.md) | ✔ |  |  |
| [Kafka](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-kafka.md)<sup>2</sup> | ✔ |  | ✔ |
| [Model Context Protocol](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-mcp.md) | ✔ |  |  |
| [Queue Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue.md) | ✔ |  | ✔ |
| [Redis](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-cache.md) | ✔ | ✔ | ✔ |
| [RabbitMQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-rabbitmq.md)<sup>2</sup> | ✔ |  | ✔ |
| [SendGrid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-sendgrid.md) |  |  | ✔ |
| [Service Bus](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-service-bus.md) | ✔ |  | ✔ |
| [Azure SignalR Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-signalr-service.md) | ✔ | ✔ | ✔ |
| [Table Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-table.md) |  | ✔ | ✔ |
| [Timer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-timer.md) | ✔ |  |  |
| [Twilio](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-twilio.md) |  |  | ✔ |
| [Managed connector](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-connectors-overview.md) | ✔ |  |  |

1. Register all bindings except HTTP and timer. See [Register Azure Functions binding extensions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-register.md).
1. Triggers aren't supported in the Consumption plan. This binding type requires [runtime-driven triggers](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-target-based-scaling.md#premium-plan-with-runtime-scale-monitoring-enabled).
1. This binding type is supported in Kubernetes, Azure IoT Edge, and other self-hosted modes only.
