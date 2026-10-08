---
description: "Learn more about: Client Channel-Level Programming"
title: "Client Channel-Level Programming"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 3b787719-4e77-4e77-96a6-5b15a11b995a
---
# Client Channel-Level Programming

This topic describes how to write a Windows Communication Foundation (WCF) client application without using the [System.ServiceModel.ClientBase`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%601) class and its associated object model.

## Sending Messages

 To be ready to send messages and receive and process replies, the following steps are required:

1. Create a binding.

2. Build a channel factory.

3. Create a channel.

4. Send a request and read the reply.

5. Close all channel objects.

#### Creating a Binding

 Similar to the receiving case (see [Service Channel-Level Programming](service-channel-level-programming.md)), sending messages starts by creating a binding. This example creates a new [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding) and adds an [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement) to its Elements collection.

#### Building a ChannelFactory

 Instead of creating a [System.ServiceModel.Channels.IChannelListener](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelListener), this time we create a [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601) by calling [System.ServiceModel.ChannelFactory.CreateFactory*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory.CreateFactory*) on the binding where the type parameter is [System.ServiceModel.Channels.IRequestChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IRequestChannel). While channel listeners are used by the side that waits for incoming messages, channel factories are used by the side that initiates the communication to create a channel. Just like channel listeners, channel factories must be opened first before they can be used.

#### Creating a Channel

 We then call [System.ServiceModel.ChannelFactory`1.CreateChannel*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601.CreateChannel*) to create an [System.ServiceModel.Channels.IRequestChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IRequestChannel). This call takes the address of the endpoint with which we want to communicate using the new channel being created. Once we have a channel, we call Open on it to put it in a state ready for communication. Depending on the nature of the transport, this call to Open may initiate a connection with the target endpoint or may do nothing at all on the network.

#### Sending a Request and Reading the Reply

 Once we have an opened channel, we can create a message and use the channel’s Request method to send the request and wait for the reply to come back. When this method returns, we have a reply message that we can read to find out what the endpoint’s reply was.

#### Closing Objects

 To avoid leaking resources, we close objects used in communications when they are no longer required.

 The following code example shows a basic client using the channel factory to send a message and read the reply.

 [ChannelProgrammingBasic#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/channelprogrammingbasic/cs/clientprogram.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/channelprogrammingbasic/cs/clientprogram.cs.md)
 [ChannelProgrammingBasic#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/channelprogrammingbasic/vb/clientprogram.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/channelprogrammingbasic/vb/clientprogram.vb.md)
