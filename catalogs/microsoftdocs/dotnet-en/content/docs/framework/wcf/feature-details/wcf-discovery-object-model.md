---
description: "Learn more about: WCF Discovery Object Model"
title: "WCF Discovery Object Model"
ms.date: "03/30/2017"
ms.assetid: 8365a152-eacd-4779-9130-bbc48fa5c5d9
---
# WCF Discovery Object Model

WCF Discovery consists of a set of types that provide a unified programming model that allows you to write services that are discoverable at runtime and clients that find and use these services.

## Making a Service Discoverable and Finding Services

 To make a WCF service discoverable, add a [System.ServiceModel.Discovery.ServiceDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryBehavior) to the [System.ServiceModel.Description.ServiceDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription) of the service host and add a discovery endpoint. If a service is configured to send announcement messages (by adding an [System.ServiceModel.Discovery.AnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementEndpoint)) the announcement is sent when the service host is opened and closed.

 A client that wants to listen for service announcement messages hosts an announcement service and adds one or more announcement endpoints. The announcement service receives announcement messages and raises announcement events.

 A client uses the [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) class to search for available services. The client application instantiates the [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) class, passing in a discovery endpoint that specifies where to send discovery messages. The client calls the [System.ServiceModel.Discovery.DiscoveryClient.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient.Find*) method, which sends a `Probe` request. Services listening for discovery messages receive this `Probe` request. If the service matches the criteria specified in the `Probe`, it sends a `ProbeMatch` message back to the client.

## Object Model

 The WCF Discovery API defines the following classes:

- [System.ServiceModel.Discovery.AnnouncementClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementClient)

- [System.ServiceModel.Discovery.AnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementEndpoint)

- [System.ServiceModel.Discovery.AnnouncementService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementService)

- [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient)

- [System.ServiceModel.Discovery.DiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryEndpoint)

- [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement)

- [System.ServiceModel.Discovery.DiscoveryMessageSequenceGenerator](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryMessageSequenceGenerator)

- [System.ServiceModel.Discovery.ServiceDiscoveryMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryMode)

- [System.ServiceModel.Discovery.DiscoveryProxy](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryProxy)

- [System.ServiceModel.Discovery.DiscoveryService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryService)

- [System.ServiceModel.Discovery.DiscoveryVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryVersion)

- [System.ServiceModel.Discovery.DynamicEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DynamicEndpoint)

- [System.ServiceModel.Discovery.EndpointDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryBehavior)

- [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata)

- [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria)

- [System.ServiceModel.Discovery.FindRequestContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindRequestContext)

- [System.ServiceModel.Discovery.FindResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindResponse)

- [System.ServiceModel.Discovery.ResolveCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCriteria)

- [System.ServiceModel.Discovery.ResolveResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveResponse)

- [System.ServiceModel.Discovery.ServiceDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryBehavior)

- [System.ServiceModel.Discovery.UdpAnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.UdpAnnouncementEndpoint)

- [System.ServiceModel.Discovery.UdpDiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.UdpDiscoveryEndpoint)

## AnnouncementClient

 The [System.ServiceModel.Discovery.AnnouncementClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementClient) class provides synchronous and asynchronous methods for sending announcement messages. There are two types of announcement messages, Hello and Bye. A Hello message is sent to indicate that a service has become available and a Bye message is sent to indicate that an existing service has become unavailable. The developer creates an [System.ServiceModel.Discovery.AnnouncementClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementClient) instance, passing an instance of [System.ServiceModel.Discovery.AnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementEndpoint) as a constructor parameter.

## AnnouncementEndpoint

 [System.ServiceModel.Discovery.AnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementEndpoint) represents a standard endpoint with a fixed announcement contract. It is used by a service or client to send and receive announcement messages. By default, the [System.ServiceModel.Discovery.AnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementEndpoint) class is set to use the WS_Discovery 11 protocol version.

## AnnouncementService

 [System.ServiceModel.Discovery.AnnouncementService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementService) is a system-provided implementation of an announcement service that receives and processes announcement messages. When a Hello or Bye message is received, the [System.ServiceModel.Discovery.AnnouncementService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementService) instance calls the appropriate virtual method [System.ServiceModel.Discovery.AnnouncementService.OnBeginOnlineAnnouncement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementService.OnBeginOnlineAnnouncement*) or [System.ServiceModel.Discovery.AnnouncementService.OnBeginOfflineAnnouncement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.AnnouncementService.OnBeginOfflineAnnouncement*), which raises announcement events.

## DiscoveryClient

 The [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) class is used by a client application to find and resolve available services. It provides synchronous and asynchronous methods for finding and resolving services based on the specified [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) and [System.ServiceModel.Discovery.ResolveCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCriteria) respectively. The developer creates a [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) instance and provides an instance of [System.ServiceModel.Discovery.DiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryEndpoint) as a constructor parameter.

 To find a service, the developer invokes the synchronous or asynchronous `Find` method, which provides a [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) instance that contains the search criteria to use. The [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) creates a `Probe` message with the appropriate headers, and sends the find request. Because there can be more than one outstanding `Find` request at any time, the client correlates the received responses and validates the response. It then delivers the results to the caller of the `Find` operation using [System.ServiceModel.Discovery.FindResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindResponse).

 To resolve a known service, the developer invokes the synchronous or asynchronous `Resolve` method that provides an instance of [System.ServiceModel.Discovery.ResolveCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCriteria) that contains the [System.ServiceModel.EndpointAddress](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointAddress) of the known service. The [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) creates the `Resolve` message with the appropriate headers and sends the resolve request. The received response is correlated against the outstanding resolve requests and the result is delivered to the caller of the `Resolve` operation using [System.ServiceModel.Discovery.ResolveResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveResponse).

 If a discovery proxy is present on the network and the [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) sends the discovery request in a multicast fashion, the discovery proxy can respond with the multicast suppression Hello message. The [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) raises the `ProxyAvailable` event when it receives Hello messages in response to outstanding `Find` or `Resolve` requests. The `ProxyAvailable` event contains the [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata) about the discovery proxy. It is up to the developer to use this information to switch from Ad hoc to Managed mode.

## DiscoveryEndpoint

 [System.ServiceModel.Discovery.DiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryEndpoint) represents a standard endpoint with a fixed discovery contract. It is used by a service or client to send or receive discovery messages. By default, [System.ServiceModel.Discovery.DiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryEndpoint) is set to use [System.ServiceModel.Discovery.ServiceDiscoveryMode.Managed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryMode.Managed) mode and the WSDiscovery11 WS-Discovery version.

## DiscoveryMessageSequenceGenerator

 [System.ServiceModel.Discovery.DiscoveryMessageSequenceGenerator](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryMessageSequenceGenerator) is used to generate a [System.ServiceModel.Discovery.DiscoveryMessageSequence](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryMessageSequence) when the service is sending out Discovery or Announcement messages.

## DiscoveryService

 The [System.ServiceModel.Discovery.DiscoveryService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryService) abstract class provides a framework for receiving and processing `Probe` and `Resolve` messages. When a `Probe` message is received, [System.ServiceModel.Discovery.DiscoveryService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryService) creates an instance of [System.ServiceModel.Discovery.FindRequestContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindRequestContext) based on the incoming message and invokes the [System.ServiceModel.Discovery.DiscoveryService.OnBeginFind*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryService.OnBeginFind*) virtual method. When a `Resolve` message is received, [System.ServiceModel.Discovery.DiscoveryService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryService) invokes the [System.ServiceModel.Discovery.DiscoveryService.OnBeginResolve*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryService.OnBeginResolve*) virtual method. You can inherit from this class to provide a custom Discovery Service implementation.

## DiscoveryProxy

 The [System.ServiceModel.Discovery.DiscoveryProxy](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryProxy) abstract class provides a framework for receiving and processing discovery and announcement messages. You inherit from this class when you are implementing a custom discovery proxy. When a `Probe` message is received over multicast, the [System.ServiceModel.Discovery.DiscoveryProxy](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryProxy) class calls the `BeginShouldRedirectFind` virtual method to determine whether a multicast suppression message should to be sent. If the developer decides not to send a multicast suppression message or if the `Probe` message was received over unicast, it creates an instance of the [System.ServiceModel.Discovery.FindRequestContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindRequestContext) class based on the incoming message and invokes the `OnBeginFind` virtual method. When a `Resolve` message is received over multicast, The [System.ServiceModel.Discovery.DiscoveryProxy](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryProxy) class calls the `ShouldRedirectResolve` virtual method to determine whether a multicast suppression message should to be sent. If the developer decides not to send a multicast suppression message or if the `Resolve` message was received over unicast, it creates an instance of the [System.ServiceModel.Discovery.ResolveCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCriteria) class based on the incoming message and invokes the `OnBeginResolve` virtual method. When a Hello or Bye message is received, [System.ServiceModel.Discovery.DiscoveryProxy](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryProxy) calls the appropriate virtual method (`OnBeginOnlineAnnouncement` or `OnBeingOfflineAnnouncement`), which raises announcement events.

## DiscoveryVersion

 The [System.ServiceModel.Discovery.DiscoveryVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryVersion) class represents the discovery protocol version to use.

## EndpointDiscoveryBehavior

 The [System.ServiceModel.Discovery.EndpointDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryBehavior) class is used to control the discoverability of an endpoint, specify the extensions, additional contract type names. and the scopes associated with that endpoint. This behavior is added to an application endpoint to configure its [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata). When [System.ServiceModel.Discovery.ServiceDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryBehavior) is added to the service host, all the application endpoints hosted by the service host by default become discoverable. The developer can turn off discovery for a specific endpoint by setting the [System.ServiceModel.Discovery.EndpointDiscoveryBehavior.Enabled](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryBehavior.Enabled) property to `false`.

## EndpointDiscoveryMetadata

 The [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata) class provides a version-independent representation of an endpoint published by the service. It contains endpoint addresses, listen URIs, contract type names, scopes, metadata version and extensions specified by the service developer. The [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) sent by the client during a `Probe` operation is matched against the [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata). If the criteria matches, then the [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata) is returned to the client. The endpoint address in [System.ServiceModel.Discovery.ResolveCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCriteria) is matched against the endpoint address of [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata). If the criteria matches, then the [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata) is returned to the client.

## FindCriteria

 The [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) class is a version-independent class used to specify the criteria used when finding a service. It fully supports the WS-Discovery-defined criteria for matching services. It also has extensions that developers can use to specify custom values that can be used during the matching process. The developer can provide the termination criteria for the `Find` operation by specifying the [System.ServiceModel.Discovery.FindCriteria.MaxResults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.MaxResults*), which specifies the total number of services the developer is looking for or that specifies the [System.ServiceModel.Discovery.FindCriteria.Duration*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.Duration*), which is the value that specifies how long the client waits for responses.

## FindRequestContext

 The [System.ServiceModel.Discovery.FindRequestContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindRequestContext) class is instantiated by the discovery service based on the `Probe` message it receives when a client initiates a `Find` operation. It contains an instance of [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) that was specified by the client.

## FindResponse

 The [System.ServiceModel.Discovery.FindResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindResponse) class is returned to the caller of [System.ServiceModel.Discovery.DiscoveryClient.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient.Find*) with the responses of the `Find` operation. It is also present in [System.ServiceModel.Discovery.FindCompletedEventArgs](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCompletedEventArgs). It contains a collection of [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata), which is the collection of discovered endpoints and a dictionary of [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata) and [System.ServiceModel.Discovery.DiscoveryMessageSequence](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryMessageSequence).

## ResolveCriteria

 The [System.ServiceModel.Discovery.ResolveCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCriteria) class is a version-independent class used to specify the criteria used when resolving an already known service. It contains the endpoint address of the known service. The developer can provide the termination criteria for the resolve operation by specifying the [System.ServiceModel.Discovery.ResolveCriteria.Duration*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCriteria.Duration*), which specifies how long the client waits for responses.

## ResolveResponse

 The [System.ServiceModel.Discovery.ResolveResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveResponse) is returned to the caller of the [System.ServiceModel.Discovery.DiscoveryClient.Resolve*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient.Resolve*) method with the response of the `Resolve` operation. It is also present in [System.ServiceModel.Discovery.ResolveCompletedEventArgs](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ResolveCompletedEventArgs). It contains an instance of [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata), which is the discovered endpoints and an instance of [System.ServiceModel.Discovery.DiscoveryMessageSequence](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryMessageSequence).

## ServiceDiscoveryBehavior

 The [System.ServiceModel.Discovery.ServiceDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryBehavior) class allows the developer to add the discovery feature to a service. You add this behavior to the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost). The [System.ServiceModel.Discovery.ServiceDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryBehavior) class iterates over the application endpoints added to the service host and creates a collection of [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata) from the discoverable endpoints. All endpoints are discoverable by default. The discoverability of a particular endpoint can be controlled by adding the [System.ServiceModel.Discovery.EndpointDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryBehavior) to that particular endpoint. If announcement endpoints are added to [System.ServiceModel.Discovery.ServiceDiscoveryBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryBehavior) then the announcement of all discoverable endpoints is sent over each of the announcement endpoints when the service host is opened or closed.

## UdpAnnouncementEndpoint

 The [System.ServiceModel.Discovery.UdpAnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.UdpAnnouncementEndpoint) class is a standard announcement endpoint that is pre-configured for announcement over a UDP multicast binding. By default, [System.ServiceModel.Discovery.UdpAnnouncementEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.UdpAnnouncementEndpoint) is set to use the WSApril2005 WS_Discovery version.

## UdpDiscoveryEndpoint

 The [System.ServiceModel.Discovery.UdpDiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.UdpDiscoveryEndpoint) class is a standard discovery endpoint that is pre-configured for discovery over a UDP multicast binding. By default, [System.ServiceModel.Discovery.DiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryEndpoint) is set to use the WSDiscovery11 WS-Discovery version and [System.ServiceModel.Discovery.ServiceDiscoveryMode.Adhoc](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.ServiceDiscoveryMode.Adhoc) mode.
