---
description: "Learn more about: Creating a BindingElement"
title: "Creating a BindingElement"
ms.date: "03/30/2017"
ms.assetid: 01a35307-a41f-4ef6-a3db-322af40afc99
---
# Creating a BindingElement

Bindings and binding elements (objects that extend [System.ServiceModel.Channels.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding) and [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement), respectively) are the place where the Windows Communication Foundation (WCF) application model is associated with channel factories and channel listeners. Without bindings, using custom channels requires programming at the channel level as described in [Service Channel-Level Programming](service-channel-level-programming.md) and [Client Channel-Level Programming](client-channel-level-programming.md). This topic discusses the minimum requirement to enable using your channel in WCF, the development of a [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) for your channel, and enable use from the application as described in step 4 of [Developing Channels](developing-channels.md).

## Overview

 Creating a [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) for your channel enables developers to use it in an WCF application. [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) objects can be used from the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) class to connect an WCF application to your channel without having to the precise type information of your channel.

 Once a [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) has been created, you can enable more functionality depending upon your requirements by following the remaining channel development steps described in [Developing Channels](developing-channels.md).

## Adding a Binding Element

 To implement a custom [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement), write a class that inherits from [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement). For example, if you have developed a `ChunkingChannel` that can break up large messages into chunks and reassemble them on the other end, you can use this channel in any binding by implementing a [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) and configuring the binding to use it. The remainder of this topic uses the `ChunkingChannel` as an example to demonstrate the requirements of implementing a binding element.

 A `ChunkingBindingElement` is responsible for creating the `ChunkingChannelFactory` and `ChunkingChannelListener`. It overrides [System.ServiceModel.Channels.BindingElement.CanBuildChannelFactory*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.CanBuildChannelFactory*) and [System.ServiceModel.Channels.BindingElement.CanBuildChannelListener*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.CanBuildChannelListener*) implementations, and checks that the type parameter is [System.ServiceModel.Channels.IDuplexSessionChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IDuplexSessionChannel) (in our example this is the only channel shape supported by the `ChunkingChannel`) and that the other binding elements in the binding support this channel shape.

 [System.ServiceModel.Channels.BindingElement.BuildChannelFactory*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.BuildChannelFactory*) first checks that the requested channel shape can be built and then gets a list of message actions to be chunked. It then creates a new `ChunkingChannelFactory`, passing it the inner channel factory. (If you are creating a transport binding element, that element is the last one in the binding stack and therefore must create a channel listener or channel factory.)

 [System.ServiceModel.Channels.BindingElement.BuildChannelListener*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.BuildChannelListener*) has a similar implementation for creating `ChunkingChannelListener` and passing it the inner channel listener.

 As another example using a transport channel, the [Transport: UDP](../samples/transport-udp.md) sample provides the following override.

 In the sample, the binding element is `UdpTransportBindingElement`, which derives from [System.ServiceModel.Channels.TransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement). It overrides the following methods to build the factories associated with the channel.

```csharp
public IChannelFactory<TChannel> BuildChannelFactory<TChannel>(BindingContext context)
{
    return (IChannelFactory<TChannel>)(object)new UdpChannelFactory(this, context);
}

public IChannelListener<TChannel> BuildChannelListener<TChannel>(BindingContext context)
{
    return (IChannelListener<TChannel>)(object)new UdpChannelListener(this, context);
}
```

 It also contains members for cloning the `BindingElement` and returning our scheme (soap.udp).

#### Protocol Binding Elements

 New binding elements can replace or augment any of the included binding elements, adding new transports, encodings, or higher-level protocols. To create a new Protocol Binding Element, start by extending the [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) class. At a minimum, you must then implement the [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*) and implement the `ChannelProtectionRequirements` using [System.ServiceModel.Channels.IChannel.GetProperty*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannel.GetProperty*). This returns the [System.ServiceModel.Security.ChannelProtectionRequirements](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.ChannelProtectionRequirements) for this binding element.  For more information, see [System.ServiceModel.Security.ChannelProtectionRequirements](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.ChannelProtectionRequirements).

 [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*) should return a fresh copy of this binding element. As a best practice, we recommend that binding element authors implement [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*) by using a copy constructor that calls the base copy constructor, then clones any additional fields in this class.

#### Transport Binding Elements

 To create a new Transport Binding Element, extend the [System.ServiceModel.Channels.TransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement) interface. At a minimum, you must then implement the [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*) method and the [System.ServiceModel.Channels.TransportBindingElement.Scheme](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement.Scheme) property.

 [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*) – Should return a fresh copy of this Binding Element.  As a best practice, we recommend that Binding Element authors implement Clone by way of a copy constructor that calls the base copy constructor, then clones any additional fields in this class.

 [System.ServiceModel.Channels.TransportBindingElement.Scheme*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement.Scheme*) – The [System.ServiceModel.Channels.TransportBindingElement.Scheme*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement.Scheme*) get property returns the URI scheme for the transport protocol represented by the binding element. For example, the [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement) and the [System.ServiceModel.Channels.TcpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TcpTransportBindingElement) return "http" and "net.tcp" from their respective [System.ServiceModel.Channels.TransportBindingElement.Scheme](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement.Scheme) properties.

#### Encoding Binding Elements

 To create new Encoding Binding Elements, start by extending the [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) class and implementing the [System.ServiceModel.Channels.MessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncodingBindingElement) class. At a minimum, you must then implement the [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*), [System.ServiceModel.Channels.MessageEncodingBindingElement.CreateMessageEncoderFactory*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncodingBindingElement.CreateMessageEncoderFactory*) methods and the [System.ServiceModel.Channels.MessageEncodingBindingElement.MessageVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncodingBindingElement.MessageVersion) property.

- [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*). Returns a fresh copy of this binding element. As a best practice, we recommend that binding element authors implement [System.ServiceModel.Channels.BindingElement.Clone*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement.Clone*) by using a copy constructor that calls the base copy constructor, then clones any additional fields in this class.

- [System.ServiceModel.Channels.MessageEncodingBindingElement.CreateMessageEncoderFactory*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncodingBindingElement.CreateMessageEncoderFactory*). Returns a [System.ServiceModel.Channels.MessageEncoderFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncoderFactory), which provides a handle to the actual class that implements your new encoder and which should extend [System.ServiceModel.Channels.MessageEncoder](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncoder). For more information, see [System.ServiceModel.Channels.MessageEncoderFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncoderFactory) and [System.ServiceModel.Channels.MessageEncoder](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncoder).

- [System.ServiceModel.Channels.MessageEncodingBindingElement.MessageVersion*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncodingBindingElement.MessageVersion*). Returns the [System.ServiceModel.Channels.MessageVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageVersion) used in this encoding, which represents the versions of SOAP and WS-Addressing in use.

 For a complete listing of optional methods and properties for user-defined encoding binding elements, see [System.ServiceModel.Channels.MessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncodingBindingElement).

 For more information on creating a new binding element, see [Creating User-Defined Bindings](creating-user-defined-bindings.md).

 Once you have created a binding element for your channel, return to the [Developing Channels](developing-channels.md) topic to see whether you want to add configuration file support to your binding element, if and how to add metadata publication support, and whether and how to construct a user-defined binding that uses your binding element.

## See also

- [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement)
- [Developing Channels](developing-channels.md)
- [Transport: UDP](../samples/transport-udp.md)
