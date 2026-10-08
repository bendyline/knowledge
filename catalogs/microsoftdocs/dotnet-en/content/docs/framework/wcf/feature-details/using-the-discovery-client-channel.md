---
description: "Learn more about: Using the Discovery Client Channel"
title: "Using the Discovery Client Channel"
ms.date: "03/30/2017"
ms.assetid: 1494242a-1d64-4035-8ecd-eb4f06c8d2ba
---
# Using the Discovery Client Channel

When writing a WCF client application you need to know the endpoint address of the service you are calling. In many situations the endpoint address of a service is not known in advance or the address of the service changes over time. The Discovery Client Channel allows you to write a WCF client application, describe the service you want to call, and the client channel automatically sends a probe request. When a service responds, the discovery client channel retrieves the endpoint address for the service from the probe response and uses it to call the service.

## Using the Discovery Client Channel

 To use the Discovery Client Channel, add an instance of the [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) to your client channel stack. Alternatively you can use the [System.ServiceModel.Discovery.DynamicEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DynamicEndpoint) and a [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) is automatically added to your binding if not already present.

> **Caution:**
> It is recommended that the [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) is the top-most element on your client channel stack. Any binding element that is added on top of the [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) must make sure that the [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory) or channel it creates does not use the endpoint address or `Via` address (passed to the `CreateChannel` method) because they may not contain the correct address.

 The [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) class contains two public properties:

1. [System.ServiceModel.Discovery.DiscoveryClientBindingElement.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement.FindCriteria), which is used to describe the service you want to call.

2. [System.ServiceModel.Discovery.DiscoveryClientBindingElement.DiscoveryEndpointProvider*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement.DiscoveryEndpointProvider*) which specifies the discovery endpoint to send discovery messages to.

 The [System.ServiceModel.Discovery.FindCriteria.%23ctor](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.%2523ctor) property allows you to specify the service contract you are searching for, any required scope URIs, and the maximum number of time to attempt to open the channel. The contract type is specified by calling the constructor  [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria). Scope URIs can be added to the [System.ServiceModel.Discovery.FindCriteria.Scopes](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.Scopes) property. The [System.ServiceModel.Discovery.FindCriteria.MaxResults](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.MaxResults) property allows you to specify the maximum number of results to which the client tries to connect to. When a probe response is received the client attempts to open the channel using the endpoint address from the probe response. If an exception occurs the client moves on to the next probe response, waiting for more responses to be received if necessary. It continues to do this until the channel is successfully opened or the maximum number of results is reached. For more information about these settings, see [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria).

 The [System.ServiceModel.Discovery.DiscoveryClientBindingElement.DiscoveryEndpointProvider](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement.DiscoveryEndpointProvider) property allows you to specify the discovery endpoint to use. Normally this is a [System.ServiceModel.Discovery.UdpDiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.UdpDiscoveryEndpoint), but it can be any valid endpoint.

 When you are creating the binding to use to communicate with the service, you must be careful to use the exact same binding as the service. The only difference is the client binding has a [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) on the top of the stack. If service is using one of the system-provided bindings, create a new [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding) and pass in the system-provided binding to the [System.ServiceModel.Channels.CustomBinding.%23ctor*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding.%2523ctor*) constructor. Then you can add the [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) by calling `Insert` on the [System.ServiceModel.Channels.CustomBinding.Elements](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding.Elements) property.

 Once you have added the [System.ServiceModel.Discovery.DiscoveryClientBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClientBindingElement) to your binding and configured it, you can create an instance of the WCF client class, open it, and call its methods. The following example uses the Discovery Client Channel to discover a WCF service that implements the `ICalculator` class (used in the Getting Started WCF tutorial) and calls its `Add` method.

```csharp
// Create the DiscoveryClientBindingElement
DiscoveryClientBindingElement bindingElement = new DiscoveryClientBindingElement();
// Search for a service that implements the ICalculator interface, attempting to open
// the channel a maximum of 2 times
bindingElement.FindCriteria = new FindCriteria(typeof(ICalculator)) { MaxResults = 2 };
// Use the UdpDiscoveryEndpoint
bindingElement.DiscoveryEndpoint = new UdpDiscoveryEndpoint();

// The service uses the BasicHttpBinding, so use that and insert the DiscoveryClientBindingElement at the
// top of the stack
CustomBinding binding = new CustomBinding(new BasicHttpBinding());
binding.Elements.Insert(0,bindingElement);

try
{
    // Create the WCF client and call a method
    CalculatorClient client = new CalculatorClient(binding, new EndpointAddress("http://schemas.microsoft.com/dynamic"));
    client.Open();
    client.Add(1, 1);
}
catch (EndpointNotFoundException ex)
{
    Console.WriteLine("An exception occurred: " + ex.Message);
}
```

## Security and the Discovery Client Channel

 When using the discovery client channel, two endpoints are being specified. One is used for discovery messages, usually [System.ServiceModel.Discovery.UdpDiscoveryEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.UdpDiscoveryEndpoint), and the other is the application endpoint. When implementing a secure service, care must be taken to secure both endpoints. For more information about security, see [Securing Services and Clients](securing-services-and-clients.md).
