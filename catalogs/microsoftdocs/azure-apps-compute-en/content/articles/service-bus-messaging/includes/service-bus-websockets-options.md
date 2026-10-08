---
title: include file
description: include file
author: clemensv
ms.service: azure-service-bus
ms.topic: include
ms.date: 04/08/2021
ms.author: clemensv
ms.custom: sfi-ropc-nochange
---

The AMQP-over-WebSockets protocol option runs over port TCP 443 just like the HTTP/REST API, but is otherwise functionally identical with plain AMQP. This option has higher initial connection latency because of extra handshake roundtrips and slightly more overhead as tradeoff for sharing the HTTPS port. If this mode is selected, TCP port 443 is sufficient for communication. The following options allow selecting the AMQP WebSockets mode. 

| Language | Option |
| --- | --- |
| .NET (Azure.Messaging.ServiceBus) | Create [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.-ctor) using a constructor that takes [ServiceBusClientOptions](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclientoptions) as a parameter. Set [ServiceBusClientOptions.TransportType](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclientoptions.transporttype) to [ServiceBusTransportType.AmqpWebSockets](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebustransporttype) |
| .NET (Microsoft.Azure.ServiceBus) | When creating client objects, use constructors that take [TransportType](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.transporttype), [ServiceBusConnection](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.servicebusconnection), or [ServiceBusConnectionStringBuilder](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.servicebusconnectionstringbuilder) as parameters. <p>For the construction that takes `transportType` as a parameter, set the parameter to [TransportType.AmqpWebSockets](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.transporttype).</p> <p>For the constructor that takes `ServiceBusConnection` as a parameter, set the [ServiceBusConnection.TransportType](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.servicebusconnection.transporttype) to [TransportType.AmqpWebSockets](https://learn.microsoft.com/dotnet/api/microsoft.azure.servicebus.transporttype).</p> <p>If you use `ServiceBusConnectionStringBuilder`, use constructors that give you an option to specify the `transportType`.</p> |
| Java (com.azure.messaging.servicebus) | When creating clients, set [ServiceBusClientBuilder.transportType](https://learn.microsoft.com/java/api/com.azure.messaging.servicebus.servicebusclientbuilder.transporttype) to [AmqpTransportType.AMQP.AMQP_WEB_SOCKETS](https://learn.microsoft.com/java/api/com.azure.core.amqp.amqptransporttype) |
| Java (com.microsoft.azure.servicebus) | When creating clients, set `transportType` in [com.microsoft.azure.servicebus.ClientSettings](https://learn.microsoft.com/java/api/com.microsoft.azure.servicebus.clientsettings.clientsettings#com_microsoft_azure_servicebus_ClientSettings_ClientSettings_com_microsoft_azure_servicebus_security_TokenProvider_com_microsoft_azure_servicebus_primitives_RetryPolicy_java_time_Duration_com_microsoft_azure_servicebus_primitives_TransportType_)  to [com.microsoft.azure.servicebus.primitives.TransportType.AMQP_WEB_SOCKETS](https://learn.microsoft.com/java/api/com.microsoft.azure.servicebus.primitives.transporttype) |
| JavaScript | When creating Service Bus client objects, use the `webSocketOptions` property in [ServiceBusClientOptions](https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusclientoptions). |
| Python | When creating Service Bus clients, set [ServiceBusClient.transport_type](https://learn.microsoft.com/python/api/azure-servicebus/azure.servicebus.servicebusclient) to [TransportType.AmqpOverWebSocket](https://learn.microsoft.com/python/api/azure-servicebus/azure.servicebus.transporttype) |


> On 30 September 2026, we'll retire the Azure Service Bus SDK libraries WindowsAzure.ServiceBus, Microsoft.Azure.ServiceBus, and com.microsoft.azure.servicebus, which don't conform to Azure SDK guidelines. We'll also end support of the SBMP protocol, so you'll no longer be able to use this protocol after 30 September 2026. Migrate to the latest Azure SDK libraries, which offer critical security updates and improved capabilities, before that date.
>
>Although the older libraries can still be used beyond 30 September 2026, they'll no longer receive official support and updates from Microsoft. For more information, see the [support retirement announcement](https://azure.microsoft.com/updates/retirement-notice-update-your-azure-service-bus-sdk-libraries-by-30-september-2026/).
