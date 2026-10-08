---
description: "Learn more about: How to: Exchange Messages Within a Reliable Session"
title: "How to: Exchange Messages Within a Reliable Session"
ms.date: "03/30/2017"
ms.assetid: 87cd0e75-dd2c-44c1-8da0-7b494bbdeaea
---

# How to: Exchange Messages Within a Reliable Session

This topic outlines the steps required to enable a reliable session using one of the system-provided bindings that support such a session, but not by default. You enable a reliable session imperatively using code or declaratively in your configuration file. This procedure uses the client and service configuration files to enable the reliable session and to stipulate that the messages arrive in the same order in which they were sent.

The key part of this procedure is that the endpoint configuration element contain a `bindingConfiguration` attribute that references a binding configuration named `Binding1`. The [**\<binding>**](../../configure-apps/file-schema/wcf/bindings.md) configuration element references this name to enable reliable sessions by setting the `enabled` attribute of the [**\<reliableSession>**](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms731302\(v=vs.100\)) element to `true`. You specify the ordered delivery assurances for the reliable session by setting the `ordered` attribute to `true`.

For the source copy of this example, see [WS Reliable Session](../samples/ws-reliable-session.md).

### Configure the service with a WSHttpBinding to use a reliable session

1. Define a service contract for the type of service.

   [c_HowTo_UseReliableSession#1121 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/service.cs#1121)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/service.cs.md)

1. Implement the service contract in a service class. Note that the address or binding information isn't specified inside the implementation of the service. You aren't required to write code to retrieve the address or binding information from the configuration file.

   [c_HowTo_UseReliableSession#1122 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/service.cs#1122)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/service.cs.md)

1. Create a *Web.config* file to configure an endpoint for the `CalculatorService` that uses the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) with reliable session enabled and ordered delivery of messages required.

   [c_HowTo_UseReliableSession#2111 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/common/web.config#2111)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/common/web.config.md)

1. Create a *Service.svc* file that contains the line:

   ```aspx-csharp
   <%@ServiceHost language=c# Service="CalculatorService" %>
   ```

1. Place the *Service.svc* file in your Internet Information Services (IIS) virtual directory.

### Configure the client with a WSHttpBinding to use a reliable session

1. Use the [ServiceModel Metadata Utility Tool (*Svcutil.exe*)](../servicemodel-metadata-utility-tool-svcutil-exe.md) from the command line to generate code from service metadata:

   ```console
   Svcutil.exe <service's Metadata Exchange (MEX) address or HTTP GET address>
   ```

1. The generated client contains the `ICalculator` interface that defines the service contract that the client implementation must satisfy.

   [C_HowTo_UseReliableSession#1221 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/client.cs#1221)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/client.cs.md)

1. The generated client application also contains the implementation of the `ClientCalculator`. Note that the address and binding information isn't specified anywhere inside the implementation of the service. You aren't required to write code to retrieve the address or binding information from the configuration file.

   [C_HowTo_UseReliableSession#1222 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/client.cs#1222)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/client.cs.md)

1. *Svcutil.exe* also generates the configuration for the client that uses the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) class. Name the configuration file *App.config* when using Visual Studio.

   [C_HowTo_UseReliableSession#2211 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/common/app.config#2211)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/common/app.config.md)

1. Create an instance of the `ClientCalculator` in an application and call the service operations.

   [C_HowTo_UseReliableSession#1223 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/client.cs#1223)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/cs/client.cs.md)

1. Compile and run the client.

## Example

Several of the system-provided bindings support reliable sessions by default. These include:

- [System.ServiceModel.WSDualHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSDualHttpBinding)

- [System.ServiceModel.NetNamedPipeBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetNamedPipeBinding)

- [System.ServiceModel.MsmqIntegration.MsmqIntegrationBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.MsmqIntegration.MsmqIntegrationBinding)

For an example of how to create a custom binding that supports reliable sessions, see [How to: Create a Custom Reliable Session Binding with HTTPS](how-to-create-a-custom-reliable-session-binding-with-https.md).

## See also

- [Reliable Sessions](reliable-sessions.md)
