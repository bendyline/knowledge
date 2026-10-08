---
description: "Learn more about: Service Channel-Level Programming"
title: "Service Channel-Level Programming"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 8d8dcd85-0a05-4c44-8861-4a0b3b90cca9
---
# Service Channel-Level Programming

This topic describes how to write a Windows Communication Foundation (WCF) service application without using the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) and its associated object model.

## Receiving Messages

 To be ready to receive and process messages, the following steps are required:

1. Create a binding.

2. Build a channel listener.

3. Open the channel listener.

4. Read the request and send a reply.

5. Close all channel objects.

#### Creating a Binding

 The first step in listening for and receiving messages is creating a binding. WCF ships with several built-in or system-provided bindings that can be used directly by instantiating one of them. In addition, you can also create your own custom binding by instantiating a CustomBinding class which is what the code in listing 1 does.

 The code example below creates an instance of [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding) and adds an [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement) to its Elements collection which is a collection of binding elements that are used to build the channel stack. In this example, because the elements collection has only the [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement), the resulting channel stack has only the HTTP transport channel.

#### Building a ChannelListener

 After creating a binding, we call [System.ServiceModel.Channels.Binding.BuildChannelListener*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding.BuildChannelListener*) to build the channel listener where the type parameter is the channel shape to create. In this example we are using [System.ServiceModel.Channels.IReplyChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IReplyChannel) because we want to listen for incoming messages in a request/reply message exchange pattern.

 [System.ServiceModel.Channels.IReplyChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IReplyChannel) is used for receiving request messages and sending back reply messages. Calling [System.ServiceModel.Channels.IReplyChannel.ReceiveRequest*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IReplyChannel.ReceiveRequest*) returns an [System.ServiceModel.Channels.IRequestChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IRequestChannel), which can be used to receive the request message and to send back a reply message.

 When creating the listener, we pass the network address on which it listens, in this case `http://localhost:8080/channelapp`. In general, each transport channel supports one or possibly several address schemes, for example, the HTTP transport supports both http and https schemes.

 We also pass an empty [System.ServiceModel.Channels.BindingParameterCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingParameterCollection) when creating the listener. A binding parameter is a mechanism to pass parameters that control how the listener should be built. In our example, we are not using any such parameters so we pass an empty collection.

#### Listening for Incoming Messages

 We then call [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) on the listener and start accepting channels. The behavior of [System.ServiceModel.Channels.IChannelListener`1.AcceptChannel*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelListener%601.AcceptChannel*) depends on whether the transport is connection-oriented or connection-less. For connection-oriented transports, [System.ServiceModel.Channels.IChannelListener`1.AcceptChannel*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelListener%601.AcceptChannel*) blocks until a new connection request comes in at which point it returns a new channel that represents that new connection. For connection-less transports, such as HTTP, [System.ServiceModel.Channels.IChannelListener`1.AcceptChannel*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelListener%601.AcceptChannel*) returns immediately with the one and only channel that the transport listener creates.

 In this example, the listener returns a channel that implements [System.ServiceModel.Channels.IReplyChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IReplyChannel). To receive messages on this channel we first call [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) on it to place it in a state ready for communication. We then call [System.ServiceModel.Channels.IReplyChannel.ReceiveRequest*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IReplyChannel.ReceiveRequest*) which blocks until a message arrives.

#### Reading the Request and Sending a Reply

 When [System.ServiceModel.Channels.IReplyChannel.ReceiveRequest*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IReplyChannel.ReceiveRequest*) returns a [System.ServiceModel.Channels.RequestContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.RequestContext), we get the received message using its [System.ServiceModel.Channels.RequestContext.RequestMessage](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.RequestContext.RequestMessage) property. We write out the message’s action and body content, (which we assume is a string).

 To send a reply, we create a new reply message in this case passing back the string data we received in the request. We then call [System.ServiceModel.Channels.RequestContext.Reply*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.RequestContext.Reply*) to send the reply message.

#### Closing Objects

 To avoid leaking resources, it is very important to close objects used in communications when they are no longer required. In this example we close the request message, the request context, the channel and the listener.

 The following code example shows a basic service in which a channel listener receives only one message. A real service keeps accepting channels and receiving messages until the service exits.

 [ChannelProgrammingBasic#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/channelprogrammingbasic/cs/serviceprogram.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/channelprogrammingbasic/cs/serviceprogram.cs.md)
 [ChannelProgrammingBasic#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/channelprogrammingbasic/vb/serviceprogram.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/channelprogrammingbasic/vb/serviceprogram.vb.md)
