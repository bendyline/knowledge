---
description: "Learn more about: How to: Configure a WCF Client to interoperate with WSE3.0 Services"
title: "How to: Configure a WCF Client to interoperate with WSE3.0 Services"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 3dadd7f1-d207-4ea5-a73b-3e8aa44407f8
---
# How to: Configure a WCF Client to interoperate with WSE3.0 Services

Windows Communication Foundation (WCF) clients are wire-level compatible with Web Services Enhancements 3.0 for Microsoft .NET (WSE) services when WCF clients are configured to use the August 2004 version of the WS-Addressing specification.

### To configure a WCF client to interoperate with a WSE 3.0 Web service

1. Run the [ServiceModel Metadata Utility Tool (Svcutil.exe)](../servicemodel-metadata-utility-tool-svcutil-exe.md) to create a WCF client for the WSE 3.0 Web service.

     For a WSE Web service, a WCF client class is created.

     For details about creating a WCF client, see the [How to: Create a Client](../how-to-create-a-wcf-client.md).

2. Create a class that represents a binding that can communicate with WSE 3.0 Web services.

     The following class is part of the [Interoperating with WSE](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms752257\(v=vs.90\)) sample.

    1. Create a class that derives from the [System.ServiceModel.Channels.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding) class.

         The following code example creates a class named `WseHttpBinding` that derives from the [System.ServiceModel.Channels.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding) class.

         [c_WCFClientToWSEService#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/wsehttpbinding.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/wsehttpbinding.cs.md)
         [c_WCFClientToWSEService#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/wsehttpbinding.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/wsehttpbinding.vb.md)

    2. Add properties to the class that specify the WSE turnkey assertion, whether derived keys are required, whether secure sessions are used, whether signature confirmations are required, and the message protection settings.

         The following code example defines the `SecurityAssertion`, `RequireDerivedKeys`, `EstablishSecurityContext`, and `MessageProtectionOrder` properties. They specify the WSE turnkey assertion, whether derived keys are required, whether secure sessions are used, whether signature confirmations are required, and the message protection settings, respectively.

         [c_WCFClientToWSEService#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/wsehttpbinding.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/wsehttpbinding.cs.md)
         [c_WCFClientToWSEService#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/wsehttpbinding.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/wsehttpbinding.vb.md)

    3. Override the [System.ServiceModel.Channels.Binding.CreateBindingElements*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding.CreateBindingElements*) method to set the binding properties.

         The following code example specifies the transport, message encoding, and message protection settings by getting the values of the `SecurityAssertion` and `MessageProtectionOrder` properties.

         [c_WCFClientToWSEService#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/wsehttpbinding.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/wsehttpbinding.cs.md)
         [c_WCFClientToWSEService#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/wsehttpbinding.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/wsehttpbinding.vb.md)

3. In the client application code, add code to set the binding properties.

     The following code example specifies that the WCF client must use message protection and authentication as defined by the WSE 3.0 `AnonymousForCertificate` turnkey security assertion. Additionally, secure sessions and derived keys are required.

     [c_WCFClientToWSEService#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/client.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/client.cs.md)
     [c_WCFClientToWSEService#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/client.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/client.vb.md)

## Example

 The following code example defines a custom binding that exposes properties that correspond to the properties of a WSE 3.0 turnkey security assertion. The custom binding, which is named `WseHttpBinding`, is then used to specify the binding properties for a WCF client.

[c_WCFClientToWSEService#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/client.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_wcfclienttowseservice/cs/client.cs.md)
[c_WCFClientToWSEService#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/client.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_wcfclienttowseservice/vb/client.vb.md)

## See also

- [System.ServiceModel.Channels.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding)
- [Interoperating with WSE](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms752257\(v=vs.90\))
