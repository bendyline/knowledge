---
description: "Learn more about: How to: Create a Custom Reliable Session Binding with HTTPS"
title: "How to: Create a Custom Reliable Session Binding with HTTPS"
ms.date: "03/30/2017"
ms.assetid: fa772232-da1f-4c66-8c94-e36c0584b549
---

# How to: Create a Custom Reliable Session Binding with HTTPS

This topic demonstrates the use of Secure Sockets Layer (SSL) transport security with reliable sessions. To use a reliable session over HTTPS, you must create a custom binding that uses a reliable session and the HTTPS transport. You enable the reliable session either imperatively by using code or declaratively in the configuration file. This procedure uses the client and service configuration files to enable the reliable session and the [**\<httpsTransport>**](../../configure-apps/file-schema/wcf/httpstransport.md) element.

The key part of this procedure is that the **\<endpoint>** configuration element contain a `bindingConfiguration` attribute that references a custom binding configuration named `reliableSessionOverHttps`. The [**\<binding>**](../../configure-apps/file-schema/wcf/bindings.md) configuration element references this name to specify that a reliable session and the HTTPS transport are used by including **\<reliableSession>** and **\<httpsTransport>** elements.

For the source copy of this example, see [Custom Binding Reliable Session over HTTPS](../samples/custom-binding-reliable-session-over-https.md).

### Configure the service with a CustomBinding to use a reliable session with HTTPS

1. Define a service contract for the type of service.

   [c_HowTo_CreateReliableSessionHTTPS#1121 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/service.cs#1121)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/service.cs.md)

1. Implement the service contract in a service class. Note that the address or binding information isn't specified inside the implementation of the service. You aren't required to write code to retrieve the address or binding information from the configuration file.

   [c_HowTo_CreateReliableSessionHTTPS#1122 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/service.cs#1122)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/service.cs.md)

1. Create a *Web.config* file to configure an endpoint for the `CalculatorService` with a custom binding named `reliableSessionOverHttps` that uses a reliable session and the HTTPS transport.

   [c_HowTo_CreateReliableSessionHTTPS#2111 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/common/web.config#2111)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/common/web.config.md)

1. Create a *Service.svc* file that contains the line:

   `<%@ServiceHost language=c# Service="CalculatorService" %>`

1. Place the *Service.svc* file in your Internet Information Services (IIS) virtual directory.

### Configure the client with a CustomBinding to use a reliable session with HTTPS

1. Use the [ServiceModel Metadata Utility Tool (*Svcutil.exe*)](../servicemodel-metadata-utility-tool-svcutil-exe.md) from the command line to generate code from service metadata.

   ```console
   Svcutil.exe <Metadata Exchange (MEX) address or HTTP GET address>
   ```

1. The client that's generated contains the `ICalculator` interface that defines the service contract that the client implementation must satisfy.

   [C_HowTo_CreateReliableSessionHTTPS#1221 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/client.cs#1221)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/client.cs.md)

1. The generated client application also contains the implementation of the `ClientCalculator`. Note that the address and binding information isn't specified inside the implementation of the service. You aren't required to write code to retrieve the address and binding information from the configuration file.

   [C_HowTo_CreateReliableSessionHTTPS#1222 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/client.cs#1222)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/client.cs.md)

1. Configure a custom binding named `reliableSessionOverHttps` to use the HTTPS transport and reliable sessions.

   [C_HowTo_CreateReliableSessionHTTPS#2211 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/common/app.config#2211)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/common/app.config.md)

1. Create an instance of the `ClientCalculator` in an application and then call the service operations.

   [C_HowTo_CreateReliableSessionHTTPS#1223 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/client.cs#1223)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_createreliablesessionhttps/cs/client.cs.md)

1. Compile and run the client.  

## .NET Framework security

Because the certificate used in this sample is a test certificate created with *Makecert.exe*, a security alert appears when you try to access an HTTPS address, such as `https://localhost/servicemodelsamples/service.svc`, from your browser.

## See also

- [Reliable Sessions](reliable-sessions.md)
