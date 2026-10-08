---
description: "Learn more about: How to: Customize a System-Provided Binding"
title: "How to: Customize a System-Provided Binding"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: f8b97862-e8bb-470d-8b96-07733c21fe26
---
# How to: Customize a System-Provided Binding

Windows Communication Foundation (WCF) includes several system-provided bindings that allow you to configure some of the properties of the underlying binding elements, but not all of the properties. This topic demonstrates how to set properties on the binding elements to create a custom binding.

 For more information about how to directly create and configure binding elements without using the system-provided bindings, see [Custom Bindings](custom-bindings.md).

 For more information about creating and extending custom bindings, see [Extending Bindings](extending-bindings.md).

 In WCF all bindings are made up of *binding elements*. Each binding element derives from the [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) class. System-provided bindings such as [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) create and configure their own binding elements. This topic shows you how to access and change the properties of these binding elements, which are not directly exposed on the binding; specifically, the [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) class.

 The individual binding elements are contained in a collection represented by the [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) class and are added in this order: Transaction Flow, Reliable Session, Security, Composite Duplex, One-way, Stream Security, Message Encoding, and Transport. Note that not all the binding elements listed are required in every binding. User-defined binding elements can also appear in this binding element collection and must appear in the same order as previously described. For example, a user-defined transport must be the last element of the binding element collection.

 The [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) class contains three binding elements:

1. An optional security binding element, either the [System.ServiceModel.Channels.AsymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AsymmetricSecurityBindingElement) class used with the HTTP transport (message level security) or the [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement) class, which is used when the transport layer provides security, in which case the HTTPS transport is used.

2. A required message encoder binding element, either [System.ServiceModel.Channels.TextMessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TextMessageEncodingBindingElement) or [System.ServiceModel.Channels.MtomMessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MtomMessageEncodingBindingElement).

3. A required transport binding element, either [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement), or [System.ServiceModel.Channels.HttpsTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpsTransportBindingElement).

 In this example we create an instance of the binding, generate a *custom binding* from it, examine the binding elements in the custom binding, and when we find the HTTP binding element, we set its `KeepAliveEnabled` property to `false`. The `KeepAliveEnabled` property is not exposed directly on the `BasicHttpBinding`, so we must create a custom binding to navigate down to the binding element and set this property.

### To modify a system-provided binding

1. Create an instance of the [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) class and set its security mode to message-level.

     [C_HowTo_ChangeStandardBinding#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_changestandardbinding/cs/program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_changestandardbinding/cs/program.cs.md)
     [C_HowTo_ChangeStandardBinding#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_changestandardbinding/vb/program.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_changestandardbinding/vb/program.vb.md)

2. Create a custom binding from the binding and create a [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) class from one of the custom binding's properties.

     [C_HowTo_ChangeStandardBinding#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_changestandardbinding/cs/program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_changestandardbinding/cs/program.cs.md)
     [C_HowTo_ChangeStandardBinding#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_changestandardbinding/vb/program.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_changestandardbinding/vb/program.vb.md)

3. Loop through the [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) class, and when you find the [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement) class, set its [System.ServiceModel.Channels.HttpTransportBindingElement.KeepAliveEnabled](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement.KeepAliveEnabled) property to `false`.

     [C_HowTo_ChangeStandardBinding#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_changestandardbinding/cs/program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_changestandardbinding/cs/program.cs.md)
     [C_HowTo_ChangeStandardBinding#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_changestandardbinding/vb/program.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_changestandardbinding/vb/program.vb.md)

## See also

- [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement)
- [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding)
- [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding)
- [Custom Bindings](custom-bindings.md)
