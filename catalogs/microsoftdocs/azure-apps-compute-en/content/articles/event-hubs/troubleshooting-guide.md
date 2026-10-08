---
title: Troubleshoot Azure Event Hubs connectivity issues
description: Diagnose and resolve permanent and transient connectivity issues with Azure Event Hubs, including firewall settings, connection strings, and network configuration.
ms.topic: troubleshooting-general
ms.date: 05/04/2026
#customer intent: As a developer or IT administrator, I want to troubleshoot Event Hubs connectivity issues so that I can restore access to my event hubs.
---

# Troubleshoot connectivity issues - Azure Event Hubs

If your client application can't connect to an event hub, use this article to diagnose and resolve the issue. Connectivity problems fall into two categories: permanent issues (the connection never succeeds) and transient issues (intermittent failures).

For **permanent issues**, check these settings and other options mentioned in the [Troubleshoot permanent connectivity issues](#troubleshoot-permanent-connectivity-issues) section:

- Connection string
- Your organization's firewall settings
- IP firewall settings
- Network security settings (service endpoints, private endpoints, and more)  

For **transient issues**, try the following options that can help with troubleshooting the issues. For more information, see [Troubleshoot transient connectivity problems](#troubleshoot-transient-connectivity-problems).

- Upgrade to latest version of the SDK
- Run commands to check dropped packets
- Obtain network traces. 

## Troubleshoot permanent connectivity issues
If the application can't connect to the event hub at all, follow the steps in this section to troubleshoot the issue. 

### Check if there's a service outage
Check for the Azure Event Hubs service outage on the [Azure service status site](https://azure.microsoft.com/status/).

### Verify the connection string 
Verify that the connection string you're using is correct. See [Get connection string](event-hubs-get-connection-string.md) to get the connection string by using the Azure portal, CLI, or PowerShell. 

For Kafka clients, verify that `producer.config` or `consumer.config` files are configured properly. For more information, see [Send and receive messages with Kafka in Event Hubs](event-hubs-quickstart-kafka-enabled-event-hubs.md#send-and-receive-messages-with-kafka-in-event-hubs).


### What protocols I can use to send and receive events? 
Producers or senders can use Advanced Messaging Queuing Protocol (AMQP), Kafka, or HTTPS protocols to send events to an event hub. 

Consumers or receivers use AMQP or Kafka to receive events from an event hub. Event Hubs supports only the pull model for consumers to receive events from it. Even when you use event handlers to handle events from an event hub, the event processor internally uses the pull model to receive events from the event hub.

#### AMQP
You can use the **AMQP 1.0** protocol to send events to and receive events from Azure Event Hubs. AMQP provides reliable, performant, and secure communication for both sending and receiving events. You can use it for high-performance and real-time streaming and is supported by most Azure Event Hubs SDKs.

#### HTTPS/REST API
You can only send events to Event Hubs using HTTP POST requests. Event Hubs doesn't support receiving events over HTTPS. It's suitable for lightweight clients where a direct TCP connection isn't feasible. 

#### Apache Kafka
Azure Event Hubs has a built-in Kafka endpoint that supports Kafka producers and consumers. Applications that are built using Kafka can use Kafka protocol (version 1.0 or later) to send and receive events from Event Hubs without any code changes. 

Azure SDKs abstract the underlying communication protocols and provide a simplified way to send and receive events from Event Hubs using languages like C#, Java, Python, JavaScript, etc.

### What ports do I need to open on the firewall? 
You can use the following protocols with Azure Event Hubs to send and receive events:

- Advanced Message Queuing Protocol 1.0 (AMQP)
- Hypertext Transfer Protocol 1.1 with Transport Layer Security (HTTPS)
- Apache Kafka

See the following table for the outbound ports you need to open to use these protocols to communicate with Azure Event Hubs. 

| Protocol | Ports | Details |
| --- | --- | --- |
| AMQP | 5671 and 5672 | See [AMQP protocol guide](../service-bus-messaging/service-bus-amqp-protocol-guide.md) |
| HTTPS | 443 | This port is used for the HTTP/REST API and for AMQP-over-WebSockets. |
| Kafka | 9093 | See [Use Event Hubs from Kafka applications](azure-event-hubs-apache-kafka-overview.md) |

The HTTPS port is required for outbound communication also when AMQP is used over port 5671, because several management operations performed by the client SDKs and the acquisition of tokens from Microsoft Entra ID (when used) run over HTTPS. 

The official Azure SDKs generally use the AMQP protocol for sending and receiving events from Event Hubs. The AMQP-over-WebSockets protocol option runs over port TCP 443 just like the HTTP API, but is otherwise functionally identical with plain AMQP. This option has higher initial connection latency because of extra handshake round trips and slightly more overhead as tradeoff for sharing the HTTPS port. If this mode is selected, TCP port 443 is sufficient for communication. The following options allow selecting the plain AMQP or AMQP WebSockets mode:

| Language | Option |
| --- | --- |
| .NET | [EventHubConnectionOptions.TransportType](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventhubconnectionoptions.transporttype) property with [EventHubsTransportType.AmqpTcp](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventhubstransporttype) or [EventHubsTransportType.AmqpWebSockets](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventhubstransporttype) |
| Java | [com.microsoft.azure.eventhubs.EventProcessorClientBuilder.transporttype](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/eventhubs/azure-messaging-eventhubs/src/main/java/com/azure/messaging/eventhubs/EventProcessorClientBuilder.java) with [AmqpTransportType.AMQP](https://learn.microsoft.com/java/api/com.azure.core.amqp.amqptransporttype) or [AmqpTransportType.AMQP_WEB_SOCKETS](https://learn.microsoft.com/java/api/com.azure.core.amqp.amqptransporttype) |
| Node | [EventHubConsumerClientOptions](https://learn.microsoft.com/javascript/api/@azure/event-hubs/eventhubconsumerclientoptions) has a `webSocketOptions` property. |
| Python | [EventHubConsumerClient.transport_type](https://learn.microsoft.com/python/api/azure-eventhub/azure.eventhub.eventhubconsumerclient) with [TransportType.Amqp](https://learn.microsoft.com/python/api/azure-eventhub/azure.eventhub.transporttype) or [TransportType.AmqpOverWebSocket](https://learn.microsoft.com/python/api/azure-eventhub/azure.eventhub.transporttype) |

### What IP addresses do I need to allow?
When you're working with Azure, sometimes you have to allow specific IP address ranges or URLs in your corporate firewall or proxy to access all Azure services you're using or trying to use. Verify that the traffic is allowed on IP addresses used by Event Hubs. For IP addresses used by Azure Event Hubs: see [Azure IP Ranges and Service Tags - Public Cloud](https://www.microsoft.com/download/details.aspx?id=56519).

Also, verify that the IP address for your namespace is allowed. To find the right IP addresses to allow for your connections, follow these steps:

1. Run the following command from a command prompt: 

    ```
    nslookup <YourNamespaceName>.servicebus.windows.net
    ```
2. Note down the IP address returned in `Non-authoritative answer`. 

If your namespace is **zone redundant**, the name in the **non-authoritative answer** section has a suffix of `-s1`, `-s2`, or `-s3` that identifies the availability zone instance. Run `nslookup` again for the other two suffixes (for example, `<yournamespace>-s2.servicebus.windows.net`) to get the IP addresses of the remaining availability zone instances.

> **Note:**
> The IP address returned by the `nslookup` command isn't a static IP address. However, it remains constant until the underlying deployment is deleted or moved to a different cluster.

### What client IPs are sending events to or receiving events from my namespace?
First, enable [IP filtering](event-hubs-ip-filtering.md) on the namespace. 

Then, Enable diagnostic logs for [Event Hubs virtual network connection events](monitor-event-hubs-reference.md#event-hubs-virtual-network-connection-event-schema) by following instructions in the [Enable diagnostic logs](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings). You see the IP address for which connection is denied.

```json
{
    "SubscriptionId": "0000000-0000-0000-0000-000000000000",
    "NamespaceName": "namespace-name",
    "IPAddress": "1.2.3.4",
    "Action": "Deny Connection",
    "Reason": "IPAddress doesn't belong to a subnet with Service Endpoint enabled.",
    "Count": "65",
    "ResourceId": "/subscriptions/0000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/microsoft.eventhub/namespaces/namespace-name",
    "Category": "EventHubVNetConnectionEvent"
}
```

> **Important:**
> Virtual network logs are generated only if the namespace allows access from **specific IP addresses** (IP filter rules). If you don't want to restrict access to your namespace using these features and still want to get virtual network logs to track IP addresses of clients connecting to the Event Hubs namespace, you could use the following workaround: [Enable IP filtering](event-hubs-ip-filtering.md), and add the total addressable IPv4 range (`0.0.0.0/1` - `128.0.0.0/1`) and IPv6 range (`::/1` - `8000::/1`). 

> **Note:**
> Currently, it's not possible to determine the source IP of an individual message or event. 


### Verify that Event Hubs service tag is allowed in your network security groups
If your application runs inside a subnet and there's an associated network security group, confirm whether the internet outbound traffic is allowed or Event Hubs service tag (`EventHub`) is allowed. See [Virtual network service tags](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/service-tags-overview.md) and search for `EventHub`.

### Check if the application needs to be running in a specific subnet of a virtual network
Confirm that your application runs in a virtual network subnet that has access to the namespace. If it doesn't, run the application in the subnet that has access to the namespace or add the IP address of the machine on which application is running to the [IP firewall](event-hubs-ip-filtering.md). 

When you create a virtual network service endpoint for an event hub namespace, the namespace accepts traffic only from the subnet that's bound to the service endpoint. There's an exception to this behavior. You can add specific IP addresses in the IP firewall to enable access to the event hub's public endpoint. For more information, see [Network service endpoints](event-hubs-service-endpoints.md).

### Check the IP firewall settings for your namespace
Check that the public IP address of the machine on which the application is running isn't blocked by the IP firewall.  

By default, Event Hubs namespaces are accessible from internet as long as the request comes with valid authentication and authorization. With IP firewall, you can restrict it further to only a set of IPv4 or IPv6 addresses or address ranges in [CIDR (Classless Inter-Domain Routing)](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation.

The IP firewall rules are applied at the Event Hubs namespace level. Therefore, the rules apply to all connections from clients using any supported protocol. Any connection attempt from an IP address that doesn't match an allowed IP rule on the Event Hubs namespace is rejected as unauthorized. The response doesn't mention the IP rule. IP filter rules are applied in order, and the first rule that matches the IP address determines the accept or reject action.

For more information, see [Configure IP firewall rules for an Azure Event Hubs namespace](event-hubs-ip-filtering.md). To check whether you have IP filtering, virtual network, or certificate chain issues, see [Troubleshoot network-related problems](#troubleshoot-network-related-problems).

### Check if the namespace can be accessed using only a private endpoint
If the Event Hubs namespace is configured to be accessible only via private endpoint, confirm that the client application is accessing the namespace over the private endpoint. 

[Azure Private Link service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-overview.md) enables you to access Azure Event Hubs over a **private endpoint** in your virtual network. A private endpoint is a network interface that connects you privately and securely to a service powered by Azure Private Link. The private endpoint uses a private IP address from your virtual network, effectively bringing the service into your virtual network. All traffic to the service can be routed through the private endpoint, so no gateways, NAT devices, ExpressRoute or VPN connections, or public IP addresses are needed. Traffic between your virtual network and the service traverses over the Microsoft backbone network, eliminating exposure from the public Internet. You can connect to an instance of an Azure resource, giving you the highest level of granularity in access control.

For more information, see [Configure private endpoints](private-link-service.md). See the **Validate that the private endpoint connection works** section to confirm that a private endpoint is used. 

### Troubleshoot network-related problems
To troubleshoot network-related problems with Event Hubs, follow these steps: 

Browse to or use [wget](https://www.gnu.org/software/wget/) to access `https://<yournamespacename>.servicebus.windows.net/`. This step helps you check whether you have IP filtering, virtual network, or certificate chain problems (most common when using Java SDK).

An example of **successful message**:

```xml
<feed xmlns="http://www.w3.org/2005/Atom"><title type="text">Publicly Listed Services</title><subtitle type="text">This is the list of publicly-listed services currently available.</subtitle><id>uuid:27fcd1e2-3a99-44b1-8f1e-3e92b52f0171;id=30</id><updated>2019-12-27T13:11:47Z</updated><generator>Service Bus 1.1</generator></feed>
```

An example of **failure error message**:

```json
<Error>
    <Code>400</Code>
    <Detail>
        Bad Request. To know more visit https://aka.ms/sbResourceMgrExceptions. . TrackingId:b786d4d1-cbaf-47a8-a3d1-be689cda2a98_G22, SystemTracker:NoSystemTracker, Timestamp:2019-12-27T13:12:40
    </Detail>
</Error>
```

## Troubleshoot transient connectivity problems
If you're experiencing intermittent connectivity problems, go through the following sections for troubleshooting tips. 

### Use the latest version of the client SDK
Later versions of the SDK might fix some transient connectivity problems. Make sure you're using the latest version of client SDKs in your applications. SDKs are continuously improved with new or updated features and bug fixes, so always test with the latest package. Check the release notes for fixed problems and added or updated features. 

For information about client SDKs, see the [Azure Event Hubs - Client SDKs](sdks.md) article. 

### Run the command to check dropped packets
When there are intermittent connectivity problems, run the following command to check if there are any dropped packets. This command tries to establish 25 different TCP connections every 1 second with the service. Then, you can check how many of them succeeded or failed and also see TCP connection latency. You can download the `psping` tool from [here](https://learn.microsoft.com/sysinternals/downloads/psping).

```shell
.\psping.exe -n 25 -i 1 -q <yournamespacename>.servicebus.windows.net:5671 -nobanner     
```
You can use equivalent commands if you're using other tools such as `tnc`, `ping`, and so on. 

Obtain a network trace if the previous steps don't help and analyze it using tools such as [Wireshark](https://www.wireshark.org/). Contact [Microsoft Support](https://support.microsoft.com/) if needed. 

### Service upgrades and restarts
Transient connectivity problems can happen because of backend service upgrades and restarts. When these problems happen, you might see the following symptoms: 

- Incoming messages or requests drop.
- The log file shows error messages.
- The applications disconnect from the service for a few seconds.
- Requests are momentarily throttled.

If your application code uses the SDK, it already has an active retry policy. The application reconnects without significant impact to the application or workflow. By catching these transient errors, backing off, and then retrying the call, you make sure your code can handle these transient problems.

## Next steps
See the following articles:

* [Troubleshoot authentication and authorization issues](troubleshoot-authentication-authorization.md)
