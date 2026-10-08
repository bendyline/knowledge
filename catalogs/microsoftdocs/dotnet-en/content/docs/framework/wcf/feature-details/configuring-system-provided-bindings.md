---
description: "Learn more about: Configuring System-Provided Bindings"
title: "Configuring System-Provided Bindings"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "Windows Communication Foundation [WCF], system-provided bindings"
  - "WCF [WCF], system-provided bindings"
  - "bindings [WCF], system-provided"
ms.topic: how-to
---
# Configuring System-Provided Bindings

Bindings specify the communication mechanism to use when talking to an endpoint and indicate how to connect to an endpoint. Bindings consist of elements that define how the Windows Communication Foundation (WCF) channels are layered up to provide the required communication features. A binding contains three types of elements:

- Protocol channel binding elements, which determine the security, reliability, context flow settings, or user-defined protocols to use with messages that are sent to the endpoint.

- Transport channel binding elements, which determine the underlying transport protocol to use when sending messages to the endpoint, for example, TCP or HTTP.

- Message encoding binding elements, which determine the wire encoding to use for messages that are sent to the endpoint, for example, text/XML, binary, or Message Transmission Optimization Mechanism (MTOM).

 This topic presents all of the system-provided Windows Communication Foundation (WCF) bindings. If none of these meets the exact requirements for your application, you can create a binding using the [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding) class. For more information about creating custom bindings, see [Custom Bindings](../extending/custom-bindings.md).

> **Important:**
> Select a binding that has security enabled. By default, all bindings, except the [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) binding, have security enabled. If you do not select a secure binding, or if you disable security, be sure your network exchanges are protected in some other manner, such as being in a secured data center or on an isolated network.

> **Important:**
> Do not use duplex contracts with bindings that do not support security, or that have security disabled, unless the network exchange is secured by some other means.

## System-Provided Bindings

 The following bindings are shipped with WCF.

| Binding | Configuration Element | Description |
| --- | --- | --- |
| [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) | [\<basicHttpBinding>](../../configure-apps/file-schema/wcf/basichttpbinding.md) | A binding that is suitable for communicating with WS-Basic Profile conformant Web services, for example, ASP.NET Web services (ASMX)-based services. This binding uses HTTP as the transport and text/XML as the default message encoding. |
| [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) | [\<wsHttpBinding>](../../configure-apps/file-schema/wcf/wshttpbinding.md) | A secure and interoperable binding that is suitable for non-duplex service contracts. |
| [System.ServiceModel.WS2007HttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WS2007HttpBinding) | [\<ws2007HttpBinding>](../../configure-apps/file-schema/wcf/ws2007httpbinding.md) | A secure and interoperable binding that provides support for the correct versions of the [System.ServiceModel.WSHttpBinding.Security*](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding.Security*), [System.ServiceModel.ReliableSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.ReliableSession), and [System.ServiceModel.WSHttpBindingBase.TransactionFlow*](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBindingBase.TransactionFlow*) binding elements. |
| [System.ServiceModel.WSDualHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSDualHttpBinding) | [\<wsDualHttpBinding>](../../configure-apps/file-schema/wcf/wsdualhttpbinding.md) | A secure and interoperable binding that is suitable for duplex service contracts or communication through SOAP intermediaries. |
| [System.ServiceModel.WSFederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSFederationHttpBinding) | [\<wsFederationHttpBinding>](../../configure-apps/file-schema/wcf/wsfederationhttpbinding.md) | A secure and interoperable binding that supports the WS-Federation protocol, enabling organizations that are in a federation to efficiently authenticate and authorize users. |
| [System.ServiceModel.WS2007FederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WS2007FederationHttpBinding) | [\<ws2007FederationHttpBinding>](../../configure-apps/file-schema/wcf/ws2007federationhttpbinding.md) | A secure and interoperable binding that derives from [System.ServiceModel.WS2007HttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WS2007HttpBinding) and supports federated security. |
| [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding) | [\<netTcpBinding>](../../configure-apps/file-schema/wcf/nettcpbinding.md) | A secure and optimized binding suitable for cross-machine communication between WCF applications. |
| [System.ServiceModel.NetNamedPipeBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetNamedPipeBinding) | [\<netNamedPipeBinding>](../../configure-apps/file-schema/wcf/netnamedpipebinding.md) | A secure, reliable, optimized binding that is suitable for on-machine communication between WCF applications. |
| [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding) | [\<netMsmqBinding>](../../configure-apps/file-schema/wcf/netmsmqbinding.md) | A queued binding that is suitable for cross-machine communication between WCF applications. |
| [System.ServiceModel.NetPeerTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetPeerTcpBinding) | [\<netPeerTcpBinding>](../../configure-apps/file-schema/wcf/netpeertcpbinding.md) | A binding that enables secure, multi-machine communication. |
| [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding) | [\<webHttpBinding>](../../configure-apps/file-schema/wcf/webhttpbinding.md) | A binding used to configure endpoints for WCF Web services that are exposed through HTTP requests instead of SOAP messages. |
| [System.ServiceModel.MsmqIntegration.MsmqIntegrationBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.MsmqIntegration.MsmqIntegrationBinding) | [\<msmqIntegrationBinding>](../../configure-apps/file-schema/wcf/msmqintegrationbinding.md) | A binding that is suitable for cross-machine communication between a WCF application and existing Message Queuing (also known as MSMQ) applications. |

## Binding Features

 The next table shows some of the key features each of the system-provided bindings provided. The bindings are listed in the first column and information regarding the features is described in the table. The following table provides a key for the binding abbreviations used. To select a binding, determine which column satisfies all of the row features you need.

| Binding | Interoperability | Mode of Security (Default) | Session<br /><br /> (Default) | Transactions | Duplex |
| --- | --- | --- | --- | --- | --- |
| [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) | Basic Profile 1.1 | (None), Transport, Message, Mixed | None, (None) | (None) | n/a |
| [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) | WS | None, Transport, (Message), Mixed | (None), Transport, Reliable Session | (None), Yes | n/a |
| [System.ServiceModel.WS2007HttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WS2007HttpBinding) | WS-Security, WS-Trust, WS-SecureConversation, WS-SecurityPolicy | None, Transport, (Message), Mixed | (None), Transport, Reliable Session | (None), Yes | n/a |
| [System.ServiceModel.WSDualHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSDualHttpBinding) | WS | None, (Message) | (Reliable Session) | (None), Yes | Yes |
| [System.ServiceModel.WSFederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSFederationHttpBinding) | WS-Federation | None, (Message), Mixed | (None), Reliable Session | (None), Yes | No |
| [System.ServiceModel.WS2007FederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WS2007FederationHttpBinding) | WS-Federation | None, (Message), Mixed | (None), Reliable Session | (None), Yes | No |
| [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding) | .NET | None, (Transport), Message,<br /><br /> Mixed | Reliable Session, (Transport) | (None), Yes | Yes |
| [System.ServiceModel.NetNamedPipeBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetNamedPipeBinding) | .NET | None,<br /><br /> (Transport) | None, (Transport) | (None), Yes | Yes |
| [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding) | .NET | None, Message, (Transport), Both | (None) | (None), Yes | No |
| [System.ServiceModel.NetPeerTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetPeerTcpBinding) | Peer | None, Message, (Transport), Mixed | (None) | (None) | Yes |
| [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding) | .Net | None, Transport, TransportCredentialOnly | (None) | (None) | n/a |
| [System.ServiceModel.MsmqIntegration.MsmqIntegrationBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.MsmqIntegration.MsmqIntegrationBinding) | MSMQ | None, (Transport) | (None) | (None), Yes | n/a |

 The following table explains the features found in the previous table.

| Feature | Description |
| --- | --- |
| Interoperability Type | Names the protocol or technology with which the binding ensures interoperation. |
| Security | Specifies how the channel is secured:<br /><br /> -   None: The SOAP message is not secured and the client is not authenticated.<br />-   Transport: Security requirements are satisfied at the transport layer.<br />-   Message: Security requirements are satisfied at the message layer.<br />-   Mixed: This security mode is known as `TransportWithMessageCredentials`. It handles credentials at the message level, and integrity and confidentiality requirements are satisfied by the transport layer.<br />-   Both: Both message level and transport level security are used. This ability is unique to the [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding). |
| Session | Specifies whether this binding supports session contracts. |
| Transactions | Specifies whether transactions are enabled. |
| Duplex | Specifies whether duplex contracts are supported. Note this feature requires support for Sessions in the binding. |
| Streaming | Specifies whether the message streaming is supported. |

## See also

- [Endpoint Creation Overview](../endpoint-creation-overview.md)
- [Using Bindings to Configure Services and Clients](../using-bindings-to-configure-services-and-clients.md)
- [Basic WCF Programming](../basic-wcf-programming.md)
