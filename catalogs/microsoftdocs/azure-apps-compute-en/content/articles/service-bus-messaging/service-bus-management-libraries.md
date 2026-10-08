---
title: Programmatically manage Azure Service Bus namespaces and entities
description: This article explains how to dynamically or programmatically create Service Bus namespaces and entities.
ms.topic: article
ms.date: 12/04/2025
ms.devlang: csharp
# ms.devlang: csharp,java,javascript,python
ms.custom: devx-track-arm-template
---

# Dynamically create Service Bus namespaces and entities 
Azure Service Bus provides libraries to help dynamically create Service Bus namespaces and entities. It enables complex deployments and messaging scenarios and makes it possible to programmatically determine what entities to create.

## Overview
There are two approaches you can take to manage Azure Service Bus resources programmatically. The first is to use the [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)-based libraries, which allow you to manage namespaces, queues, topics, subscriptions, rules, and SAS policies. Azure Resource Manager-based libraries have support for authentication through Microsoft Entra ID, but not through connection strings. The second approach is to use the same Service Bus client libraries that you use to send and receive messages. The client libraries also provide APIs to help you manage queues, topics, subscriptions, and rules in an *existing* namespace. They have support for authentication with connection strings. When deciding which approach to take, consider the following points. 

The Azure Resource Manager-based libraries offer the same functionality as Azure portal, CLI, and PowerShell when it comes to managing Service Bus namespaces and entities like queues, topics, subscriptions, etc. If you have been using Azure portal, CLI, or PowerShell for your management operations and would like a dynamic way of doing that, then these libraries might be a better choice for you. 

However, if you're already using a Service Bus client library for service specific operations like send and receive messages and you need to manage Service Bus entities as well, then using the same library might be more convenient for you. The client libraries have a `ServiceBusAdministrationClient` (called `ServiceBusManagementClient` in the older libraries) that provides a subset of the management features provided by the Azure Resource Manager-based libraries. It must be emphasized that while the Azure Resource Manager-based libraries allow you to manage both Service Bus namespaces and entities, the client libraries only allow you to manage entities in an existing namespace but *not* the namespace itself.

## Manage using Azure Resource Manager-based libraries

The Azure Resource Manager-based libraries allow you to manage namespaces, queues, topics, subscriptions, rules, and SAS policies. They support authentication with Microsoft Entra ID *only*; they don't support connection strings. 

| Language | Package | Documentation | Samples |
| --- | --- | --- | --- |
| .NET | [Azure.ResourceManager.ServiceBus](https://www.nuget.org/packages/Azure.ResourceManager.ServiceBus/) | [API reference for Microsoft.Azure.Management.ServiceBus](https://learn.microsoft.com/dotnet/api/azure.resourcemanager.servicebus) | [.NET](https://github.com/Azure/azure-sdk-for-net/tree/Azure.ResourceManager.ServiceBus_1.0.0/sdk/servicebus/Azure.ResourceManager.ServiceBus/samples) |
| Java | [azure-resourcemanager-servicebus](https://central.sonatype.com/artifact/com.azure.resourcemanager/azure-resourcemanager-servicebus) | [API reference for com.azure.resourcemanager.servicebus](https://learn.microsoft.com/java/api/com.azure.resourcemanager.servicebus) | [Java](https://github.com/Azure-Samples/service-bus-java-manage-publish-subscribe-with-basic-features/tree/e4718a825e8fcfe58e5921770ff8084da67ccd89) |
| JavaScript | [@Azure/arm-servicebus](https://www.npmjs.com/package/@azure/arm-servicebus) | [API reference for @Azure/arm-servicebus](https://learn.microsoft.com/javascript/api/@azure/arm-servicebus/) |  |
| Python | [azure-mgmt-servicebus](https://pypi.org/project/azure-mgmt-servicebus/) | [API reference for azure-mgmt-servicebus](https://learn.microsoft.com/python/api/azure-mgmt-servicebus/azure.mgmt.servicebus) |  |


### Fluent .NET and Java libraries
There's a Fluent version of the Azure Resource Manager-based libraries. 

| Language | Package | Documentation |
| --- | --- | --- |
| .NET | [Microsoft.Azure.Management.ServiceBus.Fluent](https://www.nuget.org/packages/Microsoft.Azure.Management.ServiceBus.Fluent/) | [API reference for Microsoft.Azure.Management.ServiceBus.Fluent](https://learn.microsoft.com/dotnet/api/microsoft.azure.management.servicebus.fluent) |
| Java | [azure-resourcemanager-servicebus](https://central.sonatype.com/artifact/com.azure.resourcemanager/azure-resourcemanager-servicebus) | [API reference for com.azure.resourcemanager.servicebus.fluent](https://learn.microsoft.com/java/api/com.azure.resourcemanager.servicebus.fluent) |

## Manage using Service Bus client libraries 

Service Bus client libraries that are used for operations like send and receive messages can also be used to manage queues, topics, subscriptions, and rules in an *existing* Service Bus namespace. This feature is available via the `ServiceBusAdministrationClient` in the latest libraries and via the `ServiceBusManagementClient` in the older libraries. 

### Latest Service Bus libraries
| Language | Package | Documentation | Samples |
| --- | --- | --- | --- |
| .NET | [Azure.Messaging.ServiceBus](https://www.nuget.org/packages/Azure.Messaging.ServiceBus) | [ServiceBusAdministrationClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.administration.servicebusadministrationclient) | [.NET](https://learn.microsoft.com/samples/azure/azure-sdk-for-net/azuremessagingservicebus-samples/) |
| Java | [azure-messaging-servicebus](https://central.sonatype.com/artifact/com.azure/azure-messaging-servicebus) | [ServiceBusAdministrationAsyncClient](https://learn.microsoft.com/java/api/com.azure.messaging.servicebus.administration.servicebusadministrationasyncclient), [ServiceBusAdministrationClient](https://learn.microsoft.com/java/api/com.azure.messaging.servicebus.administration.servicebusadministrationclient) | [Java](https://learn.microsoft.com/samples/azure/azure-sdk-for-java/servicebus-samples/) |
| JavaScript | [@Azure/service-bus](https://www.npmjs.com/package/@azure/service-bus) | [ServiceBusAdministrationClient](https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusadministrationclient) | [JavaScript](https://learn.microsoft.com/samples/azure/azure-sdk-for-js/service-bus-javascript/)/[TypeScript](https://learn.microsoft.com/samples/azure/azure-sdk-for-js/service-bus-typescript/) |
| Python | [azure-servicebus](https://pypi.org/project/azure-servicebus/) | [ServiceBusAdministrationClient](https://learn.microsoft.com/python/api/azure-servicebus/azure.servicebus.management.servicebusadministrationclient) | [Python](https://learn.microsoft.com/samples/azure/azure-sdk-for-python/servicebus-samples/) |

### Legacy Service Bus libraries
| Language | Package | Documentation | Samples |
| --- | --- | --- | --- |
| .NET | [Microsoft.Azure.ServiceBus](https://www.nuget.org/packages/Microsoft.Azure.ServiceBus/) | [ManagementClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.management.managementclient) | [.NET](https://github.com/Azure/azure-service-bus/tree/master/samples/DotNet/Microsoft.Azure.ServiceBus) |
| Java | [azure-mgmt-servicebus](https://central.sonatype.com/artifact/com.microsoft.azure/azure-mgmt-servicebus) | [ManagementClientAsync](https://learn.microsoft.com/java/api/com.microsoft.azure.servicebus.management.managementclientasync), [ManagementClient](https://learn.microsoft.com/java/api/com.microsoft.azure.servicebus.management.managementclient) | [Java](https://github.com/Azure/azure-service-bus/tree/master/samples/Java) |


> On 30 September 2026, we'll retire the Azure Service Bus SDK libraries WindowsAzure.ServiceBus, Microsoft.Azure.ServiceBus, and com.microsoft.azure.servicebus, which don't conform to Azure SDK guidelines. We'll also end support of the SBMP protocol, so you'll no longer be able to use this protocol after 30 September 2026. Migrate to the latest Azure SDK libraries, which offer critical security updates and improved capabilities, before that date.
>
>Although the older libraries can still be used beyond 30 September 2026, they'll no longer receive official support and updates from Microsoft. For more information, see the [support retirement announcement](https://azure.microsoft.com/updates/retirement-notice-update-your-azure-service-bus-sdk-libraries-by-30-september-2026/).

## Next steps
- Send messages to and receive messages from queue using the latest Service Bus library: [.NET](service-bus-dotnet-get-started-with-queues.md#send-messages-to-the-queue), [Java](service-bus-java-how-to-use-queues.md), [JavaScript](service-bus-nodejs-how-to-use-queues.md), [Python](service-bus-python-how-to-use-queues.md)
- Send messages to topic and receive messages from subscription using the latest Service Bus library: .[NET](service-bus-dotnet-how-to-use-topics-subscriptions.md),  [Java](service-bus-java-how-to-use-topics-subscriptions.md), [JavaScript](service-bus-nodejs-how-to-use-topics-subscriptions.md), [Python](service-bus-python-how-to-use-topics-subscriptions.md)
