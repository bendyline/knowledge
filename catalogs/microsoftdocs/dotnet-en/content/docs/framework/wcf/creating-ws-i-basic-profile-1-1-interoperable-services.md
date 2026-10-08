---
description: "Learn more about: Creating WS-I Basic Profile 1.1 Interoperable Services"
title: "Creating WS-I Basic Profile 1.1 Interoperable Services"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "configuration [WCF], interoperable services"
ms.assetid: 91b70a21-8f5c-4679-808c-2ed5fa6b2013
---
# Creating WS-I Basic Profile 1.1 Interoperable Services

To configure a WCF service endpoint to be interoperable with ASP.NET Web service clients:

- Use the [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) type as the binding type for your service endpoint.

- Do not use callback and session contract features or transaction behaviors on your service endpoint

You can optionally enable support for HTTPS and transport-level client authentication on the binding.

The following features of the [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) class require functionality beyond WS-I Basic Profile 1.1:

- Message Transmission Optimization Mechanism (MTOM) message encoding controlled by the [System.ServiceModel.BasicHttpBinding.MessageEncoding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding.MessageEncoding) property. Leave  this property at its default value, which is [System.ServiceModel.WSMessageEncoding.Text](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSMessageEncoding.Text) to not use MTOM.

- Message security controlled by the [System.ServiceModel.BasicHttpBinding.Security*](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding.Security*) value provides WS-Security support compliant with WS-I Basic Security Profile 1.0. Leave this property at its default value, which is [System.ServiceModel.SecurityMode.Transport](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.Transport) to not use WS-Security.

To make the metadata for a WCF service available to ASP.NET, use the Web service client generation tools: [Web Services Description Language Tool (Wsdl.exe)](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/7h3ystb6\(v=vs.100\)), [Web Services Discovery Tool (Disco.exe)](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/cy2a3ybs\(v=vs.100\)), and the **Add Web Reference** feature in Visual Studio. Enable metadata publication. For more information, see [Publishing Metadata Endpoints](publishing-metadata-endpoints.md).

## Example

### Description

 The following example code demonstrates how to add a WCF endpoint that is compatible with ASP.NET Web service clients in code and, alternatively, in a configuration file.

### Code

 [C_HowTo-WCFServiceAndASMXClient#0 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto-wcfserviceandasmxclient/cs/program.cs#0)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto-wcfserviceandasmxclient/cs/program.cs.md)
 [C_HowTo-WCFServiceAndASMXClient#0 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto-wcfserviceandasmxclient/vb/program.vb#0)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto-wcfserviceandasmxclient/vb/program.vb.md)
 [C_HowTo-WCFServiceAndASMXClient#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto-wcfserviceandasmxclient/common/app.config#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto-wcfserviceandasmxclient/common/app.config.md)

## See also

- [Interoperability with ASP.NET Web Services](feature-details/interop-with-aspnet-web-services.md)
