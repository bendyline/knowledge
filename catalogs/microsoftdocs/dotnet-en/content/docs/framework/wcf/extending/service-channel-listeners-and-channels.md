---
description: "Learn more about: Service: Channel listeners and channels"
title: "Service: Channel listeners and channels"
ms.date: "03/30/2017"
ms.assetid: 8ccbe0e8-7e55-441d-80de-5765f67542fa
---
# Service: Channel listeners and channels

There are three categories of channel objects: channels, channel listeners, and channel factories. Channels are the interface between the application and the channel stack. Channel listeners are responsible for creating channels on the receive (or listen) side, typically in response to a new incoming message or connection. Channel factories are responsible for creating channels on the send side to initiate communication with an endpoint.

## Channel listeners and channels

Channel listeners are responsible for creating channels and receiving messages from the layer below or from the network. Received messages are delivered to the layer above using a channel that is created by the channel listener.

The following diagram illustrates the process of receiving messages and delivering them to the layer above.

Channel listeners and channels

A channel listener receiving messages and delivering to the layer above through channels.

The process can be conceptually modeled as a queue inside each channel although the implementation may not actually use a queue. The channel listener is responsible for receiving messages from the layer below or the network and putting them in the queue. The channel is responsible for getting messages from the queue and handing them to the layer above when that layer asks for a message, for example by calling `Receive` on the channel.

WCF provides base class helpers for this process. For a diagram of the channel helper classes discussed in this article, see [Channel Model Overview](channel-model-overview.md).

- The [System.ServiceModel.Channels.CommunicationObject](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject) class implements [System.ServiceModel.ICommunicationObject](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject) and enforces the state machine described in step 2 of [Developing Channels](developing-channels.md).

- The [System.ServiceModel.Channels.ChannelManagerBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelManagerBase) class implements [System.ServiceModel.Channels.CommunicationObject](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject) and provides a unified base class for [System.ServiceModel.Channels.ChannelFactoryBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelFactoryBase) and [System.ServiceModel.Channels.ChannelListenerBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelListenerBase). The [System.ServiceModel.Channels.ChannelManagerBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelManagerBase) class works in conjunction with [System.ServiceModel.Channels.ChannelBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelBase), which is a base class that implements [System.ServiceModel.Channels.IChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannel).

- The [System.ServiceModel.Channels.ChannelFactoryBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelFactoryBase) class implements [System.ServiceModel.Channels.ChannelManagerBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelManagerBase) and [System.ServiceModel.Channels.IChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelFactory) and consolidates the `CreateChannel` overloads into one `OnCreateChannel` abstract method.

- The [System.ServiceModel.Channels.ChannelListenerBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelListenerBase) class implements [System.ServiceModel.Channels.IChannelListener](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelListener). It takes care of basic state management.

The following discussion is based upon the [Transport: UDP](../samples/transport-udp.md) sample.

## Creating a channel listener

The `UdpChannelListener` that the sample implements derives from the [System.ServiceModel.Channels.ChannelListenerBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelListenerBase) class. It uses a single UDP socket to receive datagrams. The `OnOpen` method receives data using the UDP socket in an asynchronous loop. The data are then converted into messages using the message encoding system:

```csharp
message = UdpConstants.MessageEncoder.ReadMessage(
  new ArraySegment<byte>(buffer, 0, count),
  bufferManager
);
```

Because the same datagram channel represents messages that arrive from a number of sources, the `UdpChannelListener` is a singleton listener. There is at most one active [System.ServiceModel.Channels.IChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannel) associated with this listener at a time. The sample generates another one only if a channel that is returned by the [System.ServiceModel.Channels.ChannelListenerBase`1.AcceptChannel*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelListenerBase%601.AcceptChannel*) method is subsequently disposed. When a message is received, it's enqueued into this singleton channel.

### UdpInputChannel

The `UdpInputChannel` class implements [System.ServiceModel.Channels.IInputChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IInputChannel). It consists of a queue of incoming messages that is populated by the `UdpChannelListener`'s socket. These messages are dequeued by the [System.ServiceModel.Channels.IInputChannel.Receive*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IInputChannel.Receive*) method.
