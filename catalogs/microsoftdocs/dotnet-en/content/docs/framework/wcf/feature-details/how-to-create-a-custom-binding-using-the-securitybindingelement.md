---
description: "Learn more about: How to: Create a Custom Binding Using the SecurityBindingElement"
title: "How to: Create a Custom Binding Using the SecurityBindingElement"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "security [WCF], creating custom bindings"
ms.assetid: 203a9f9e-3a73-427c-87aa-721c56265b29
---
# How to: Create a Custom Binding Using the SecurityBindingElement

Windows Communication Foundation (WCF) includes several system-provided bindings that can be configured but do not provide full flexibility when configuring all the security options that WCF supports. This topic demonstrates how to create a custom binding directly from individual binding elements and highlights some of the security settings that can be specified when creating such a binding. For more information about creating custom bindings, see [Extending Bindings](../extending/extending-bindings.md).

> **Warning:**
> [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) does not support the [System.ServiceModel.Channels.IDuplexSessionChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IDuplexSessionChannel) channel shape, which is the default channel shape use by the TCP transport when [System.ServiceModel.TransferMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransferMode) is set to [System.ServiceModel.TransferMode.Buffered](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransferMode.Buffered). You must set [System.ServiceModel.TransferMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransferMode) to [System.ServiceModel.TransferMode.Streamed](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransferMode.Streamed) in order to use [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) in this scenario.

## Creating a Custom Binding

 In WCF all bindings are made up of *binding elements*. Each binding element derives from the [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) class. For the standard system-provided bindings, the binding elements are created and configured for you, although you can customize some of the property settings.

 In contrast, to create a custom binding, binding elements are created and configured and a [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding) is created from the binding elements.

 To do this, you add the individual binding elements to a collection represented by an instance of the [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) class, and then set the `Elements` property of the `CustomBinding` equal to that object. You must add the binding elements in the following order: Transaction Flow, Reliable Session, Security, Composite Duplex, One-way, Stream Security, Message Encoding, and Transport. Note that not all the binding elements listed are required in every binding.

## SecurityBindingElement

 Three binding elements relate to message level security, all of which derive from the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) class. The three are [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement), [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement), and [System.ServiceModel.Channels.AsymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AsymmetricSecurityBindingElement). The [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement) is used to provide Mixed mode security. The other two elements are used when the message layer provides security.

 Additional classes are used when transport level security is provided:

- [System.ServiceModel.Channels.HttpsTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpsTransportBindingElement)

- [System.ServiceModel.Channels.SslStreamSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SslStreamSecurityBindingElement)

- [System.ServiceModel.Channels.WindowsStreamSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.WindowsStreamSecurityBindingElement)

## Required Binding Elements

 There are a large number of possible binding elements that can be combined into a binding. Not all of these combinations are valid. This section describes the required elements that must be present in a security binding.

 Valid security bindings depend on many factors, including the following:

- Security mode.

- Transport protocol.

- The message exchange pattern (MEP) specified in the contract.

 The following table shows the valid binding element stack configurations for each combination of the preceding factors. Note that these are minimal requirements. You can add additional binding elements to the binding, such as message encoding binding elements, transaction binding elements, and other binding elements.

| Security Mode | Transport | Contract Message Exchange Pattern | Contract Message Exchange Pattern | Contract Message Exchange Pattern |
| --- | --- | --- | --- | --- |
|  |  | `Datagram` | `Request Reply` | `Duplex` |
| Transport | Https |  |  |  |
|  |  | OneWayBindingElement |  |  |
|  |  | HttpsTransportBindingElement | HttpsTransportBindingElement |  |
|  | TCP |  |  |  |
|  |  | OneWayBindingElement |  |  |
|  |  | SSL or Windows StreamSecurityBindingElement | SSL or Windows StreamSecurityBindingElement | SSL or Windows StreamSecurityBindingElement |
|  |  | TcpTransportBindingElement | TcpTransportBindingElement | TcpTransportBindingElement |
| Message | Http | SymmetricSecurityBindingElement | SymmetricSecurityBindingElement | SymmetricSecurityBindingElement (authentication mode = SecureConversation) |
|  |  |  |  | CompositeDuplexBindingElement |
|  |  | OneWayBindingElement |  | OneWayBindingElement |
|  |  | HttpTransportBindingElement | HttpTransportBindingElement | HttpTransportBindingElement |
|  | Tcp | SecurityBindingElement | SecurityBindingElement | SymmetricSecurityBindingElement (authentication mode = SecureConversation) |
|  |  | TcpTransportBindingElement | TcpTransportBindingElement | TcpTransportBindingElement |
| Mixed (transport with message credentials) | Https | TransportSecurityBindingElement | TransportSecurityBindingElement |  |
|  |  | OneWayBindingElement |  |  |
|  |  | HttpsTransportBindingElement | HttpsTransportBindingElement |  |
|  | TCP | TransportSecurityBindingElement | SymmetricSecurityBindingElement (authentication mode = SecureConversation) | SymmetricSecurityBindingElement (authentication mode = SecureConversation) |
|  |  | OneWayBindingElement |  |  |
|  |  | SSL or Windows StreamSecurityBindingElement | SSL or Windows StreamSecurityBindingElement | SSL or Windows StreamSecurityBindingElement |
|  |  | TcpTransportBindingElement | TcpTransportBindingElement | TcpTransportBindingElement |

 Note that there are many configurable settings on the SecurityBindingElements. For more information, see [SecurityBindingElement Authentication Modes](securitybindingelement-authentication-modes.md).

 For more information, see [Secure Conversations and Secure Sessions](secure-conversations-and-secure-sessions.md).

## Procedures

#### To create a custom binding that uses a SymmetricSecurityBindingElement

1. Create an instance of the [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) class with the name `outputBec`.

2. Call the static method `M:System.ServiceModel.Channels.SecurityBindingElement.CreateSspiNegotiationBindingElement(true)`, which returns an instance of the [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) class.

3. Add the [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) to the collection (`outputBec`) by calling the `Add` method of the [System.Collections.ObjectModel.Collection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%601) of [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) class.

4. Create an instance of the [System.ServiceModel.Channels.TextMessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TextMessageEncodingBindingElement) class and add it to the collection (`outputBec`). This specifies the encoding used by the binding.

5. Create a [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement) and add it to the collection (`outputBec`). This specifies that the binding uses the HTTP transport.

6. Create a new custom binding by creating an instance of the [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding) class and passing the collection `outputBec` to the constructor.

7. The resulting custom binding shares many of the same characteristics as the standard [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding). It specifies message-level security and Windows credentials but disables secure sessions, requires that the service credential be specified out-of-band, and does not encrypt signatures. The last can be controlled only by setting the [System.ServiceModel.Channels.SymmetricSecurityBindingElement.MessageProtectionOrder](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement.MessageProtectionOrder) property as shown in step 4. The other two can be controlled using settings on the standard binding.

## Example

### Description

 The following example provides a complete function to create a custom binding that uses a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement).

### Code

 [c_CustomBinding#20 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#20)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)
 [c_CustomBinding#20 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_custombinding/vb/source.vb#20)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_custombinding/vb/source.vb.md)

## See also

- [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement)
- [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement)
- [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement)
- [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding)
- [Extending Bindings](../extending/extending-bindings.md)
- [System-Provided Bindings](../system-provided-bindings.md)
