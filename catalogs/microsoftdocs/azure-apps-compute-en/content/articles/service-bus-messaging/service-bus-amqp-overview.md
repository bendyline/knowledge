---
title: Overview of AMQP 1.0 in Azure Service Bus
description: Learn how Azure Service Bus supports Advanced Message Queuing Protocol (AMQP), an open standard protocol.
ms.topic: concept-article
ms.date: 12/02/2024
# Customer intent: As an Azure Service Bus user, I want to know how Azure Service Bus supports the AMQP protocol. 
---

# Advanced Message Queueing Protocol (AMQP) 1.0 support in Service Bus
The Azure Service Bus cloud service uses the [AMQP 1.0](http://docs.oasis-open.org/amqp/core/v1.0/amqp-core-overview-v1.0.html) as its primary means of communication. Microsoft has been engaged with partners across the industry, both customers and vendors of competing messaging brokers, to develop and evolve AMQP over the past decade, with new extensions being developed in the [OASIS AMQP Technical Committee](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=amqp). AMQP 1.0 is an ISO and IEC standard ([ISO 19464:20149](https://www.iso.org/standard/64955.html)). 

AMQP enables you to build cross-platform, hybrid applications using a vendor-neutral and implementation-neutral, open standard protocol. You can construct applications using components that are built using different languages and frameworks, and that run on different operating systems. All these components can connect to Service Bus and seamlessly exchange structured business messages efficiently and at full fidelity.

## Introduction: What is AMQP 1.0 and why is it important?
Traditionally, message-oriented middleware products have used proprietary protocols for communication between client applications and brokers. It means that once you've selected a particular vendor's messaging broker, you must use that vendor's libraries to connect your client applications to that broker. It results in a degree of dependence on that vendor, since porting an application to a different product requires code changes in all the connected applications. In the Java community, language-specific API standards like Java Message Service (JMS) and the Spring Framework's abstractions have alleviated that pain somewhat, but have a narrow feature scope and exclude developers using other languages.

Furthermore, connecting messaging brokers from different vendors is tricky. It typically requires application-level bridging to move messages from one system to another and to translate between their proprietary message formats. It's a common requirement; for example, when you must provide a new unified interface to older disparate systems, or integrate IT systems following a merger. AMQP allows for interconnecting connecting brokers directly, for instance using routers like [Apache Qpid Dispatch Router](https://qpid.apache.org/components/dispatch-router/index.html) or broker-native "shovels" like the one of [RabbitMQ](service-bus-integrate-with-rabbitmq.md).

The software industry is a fast-moving business; new programming languages and application frameworks are introduced at a sometimes bewildering pace. Similarly, the requirements of IT systems evolve over time and developers want to take advantage of the latest platform features. However, sometimes the selected messaging vendor doesn't support these platforms. If messaging protocols are proprietary, it's not possible for others to provide libraries for these new platforms. Therefore, you must use approaches such as building gateways or bridges that enable you to continue to use the messaging product.

The development of the Advanced Message Queuing Protocol (AMQP) 1.0 was motivated by these issues. It originated at JP Morgan Chase, who, like most financial services firms, are heavy users of message-oriented middleware. The goal was simple: to create an open-standard messaging protocol that made it possible to build message-based applications using components built using different languages, frameworks, and operating systems, all using best-of-breed components from a range of suppliers.

## AMQP 1.0 technical features
AMQP 1.0 is an efficient, reliable, wire-level messaging protocol that you can use to build robust, cross-platform, messaging applications. The protocol has a simple goal: to define the mechanics of the secure, reliable, and efficient transfer of messages between two parties. The messages themselves are encoded using a portable data representation that enables heterogeneous senders and receivers to exchange structured business messages at full fidelity. Here's a summary of the most important features:

* **Efficient**: AMQP 1.0 is a connection-oriented protocol that uses a binary encoding for the protocol instructions and the business messages transferred over it. It incorporates sophisticated flow-control schemes to maximize the utilization of the network and the connected components. That said, the protocol was designed to strike a balance between efficiency, flexibility, and interoperability.
* **Reliable**: The AMQP 1.0 protocol allows messages to be exchanged with a range of reliability guarantees, from fire-and-forget to reliable, exactly once acknowledged delivery.
* **Flexible**: AMQP 1.0 is a flexible protocol that can be used to support different topologies. The same protocol can be used for client-to-client, client-to-broker, and broker-to-broker communications.
* **Broker-model independent**: The AMQP 1.0 specification doesn't make any requirements on the messaging model used by a broker. This means that it's possible to easily add AMQP 1.0 support to existing messaging brokers.

## AMQP 1.0 is a Standard (with a capital 'S')
AMQP 1.0 is an international standard, approved by ISO and IEC as ISO/IEC 19464:2014.

AMQP 1.0 has been in development since 2008 by a core group of more than 20 companies, both technology suppliers and end-user firms. During that time, user firms have contributed their real-world business requirements and the technology vendors have evolved the protocol to meet those requirements. Throughout the process, vendors have participated in workshops in which they collaborated to validate the interoperability between their implementations.

In October 2011, the development work transitioned to a technical committee within the Organization for the Advancement of Structured Information Standards (OASIS) and the OASIS AMQP 1.0 Standard was released in October 2012. The following firms participated in the technical committee during the development of the standard:

* **Technology vendors**: Axway Software, Huawei Technologies, IIT Software, INETCO Systems, Kaazing, Microsoft, Mitre Corporation, Primeton Technologies, Progress Software, Red Hat, SITA, Software AG, Solace Systems, VMware, WSO2, Zenika.
* **User firms**: Bank of America, Credit Suisse, Deutsche Boerse, Goldman Sachs, JPMorgan Chase.

The current chairs of the [OASIS AMQP Technical Committee](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=amqp) represent Red Hat and Microsoft.

Some of the commonly cited benefits of open standards include:

* Less chance of vendor lock-in
* Interoperability
* Broad availability of libraries and tooling
* Protection against obsolescence
* Availability of knowledgeable staff
* Lower and manageable risk

## AMQP 1.0 and Service Bus
AMQP 1.0 support in Azure Service Bus means that you can use the Service Bus queuing and publish/subscribe brokered messaging features from a range of platforms using an efficient binary protocol. Furthermore, you can build applications comprised of components built using a mix of languages, frameworks, and operating systems.

The following figure illustrates an example deployment in which Java clients running on Linux, written using the standard Java Message Service (JMS) API and .NET clients running on Windows, exchange messages via Service Bus using AMQP 1.0.

Diagram showing one Service Bus exchanging messages with two Linux environments and two Windows environments.

**Figure 1: Example deployment scenario showing cross-platform messaging using Service Bus and AMQP 1.0**

All supported Service Bus client libraries available via the Azure SDK use AMQP 1.0.

- [Azure Service Bus for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/service-bus?preserve-view=true)
- [Azure Service Bus libraries for Java](https://learn.microsoft.com/java/api/overview/azure/servicebus?preserve-view=true)
- [Azure Service Bus provider for Java JMS 2.0](how-to-use-java-message-service-20.md)
- [Azure Service Bus Modules for JavaScript and TypeScript](https://learn.microsoft.com/javascript/api/overview/azure/service-bus?preserve-view=true)
- [Azure Service Bus libraries for Python](https://learn.microsoft.com/python/api/overview/azure/servicebus?preserve-view=true)


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


In addition, you can use Service Bus from any AMQP 1.0 compliant protocol stack:


| Language | Library |
| --- | --- |
| Java | [Apache Qpid Proton-J](https://qpid.apache.org/proton/index.html) |
| C/C++ | [Azure uAMQP C](https://github.com/azure/azure-uamqp-c/), [Apache Qpid Proton-C](https://qpid.apache.org/proton/index.html) |
| Python | [Apache Qpid Proton Python](https://qpid.apache.org/releases/qpid-proton-0.40.0/proton/python/docs/index.html) |
| Ruby | [Apache Qpid Proton Ruby](https://github.com/apache/qpid-proton/tree/master/ruby) |
| Go | [Azure Go AMQP](https://github.com/Azure/go-amqp), [Apache Qpid Proton Go](https://github.com/apache/qpid-proton/tree/master/go/examples) |
| C#/F#/VB | [AMQP .NET Lite](https://github.com/Azure/amqpnetlite), [Apache NMS AMQP](https://github.com/apache/activemq-nms-amqp) |
| JavaScript/Node | [Rhea](https://github.com/amqp/rhea) |


## Related content
Ready to learn more? Visit the following links:

* [Using Service Bus from .NET with AMQP]
* [Using Service Bus from Java with AMQP]

[0]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-amqp-overview/service-bus-amqp-1.png
[Using Service Bus from .NET with AMQP]: service-bus-amqp-dotnet.md
[Using Service Bus from Java with AMQP]: service-bus-java-how-to-use-jms-api-amqp.md
