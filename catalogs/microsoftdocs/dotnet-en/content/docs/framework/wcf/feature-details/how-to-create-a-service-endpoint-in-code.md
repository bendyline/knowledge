---
title: "How to: Create a Service Endpoint in Code"
description: Learn how to implement a service in a class and define its endpoint programmatically. In WCF, endpoints are usually defined in a configuration file.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 3fbb22fa-2930-48b8-b437-def1de87c6a0
---
# How to: Create a Service Endpoint in Code

In this example, an `ICalculator` contract is defined for a calculator service, the service is implemented in the `CalculatorService` class, and then its endpoint is defined in code, where it is specified that the service must use the [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) class.

 It is usually the best practice to specify the binding and address information declaratively in configuration rather than imperatively in code. Defining endpoints in code is usually not practical because the bindings and addresses for a deployed service are typically different from those used while the service is being developed. More generally, keeping the binding and addressing information out of the code allows them to change without having to recompile or redeploy the application.

#### To create a service endpoint in code

1. Create the interface that defines the service contract.

     [c_HowTo_CodeServiceBinding#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs.md)
     [c_HowTo_CodeServiceBinding#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb.md)

2. Implement the service contract defined in step 1.

     [c_HowTo_CodeServiceBinding#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs.md)
     [c_HowTo_CodeServiceBinding#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb.md)

3. In the hosting application, create the base address for the service and the binding to be used with the service.

     [c_HowTo_CodeServiceBinding#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs.md)
     [c_HowTo_CodeServiceBinding#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb.md)

4. Create the host and call [System.ServiceModel.ServiceHost.AddServiceEndpoint%28System.Type%2CSystem.ServiceModel.Channels.Binding%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint%2528System.Type%252CSystem.ServiceModel.Channels.Binding%252CSystem.String%2529) or one of the other overloads to add the service endpoint for the host.

     [c_HowTo_CodeServiceBinding#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs.md)
     [c_HowTo_CodeServiceBinding#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb.md)

     To specify the binding in code but to use the default endpoints provided by the runtime, pass the base address into the constructor when creating the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost), and do not call [System.ServiceModel.ServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint*).

     [c_HowTo_CodeServiceBinding#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howto_codeservicebinding/cs/source.cs.md)
     [c_HowTo_CodeServiceBinding#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_codeservicebinding/vb/source.vb.md)

     For more information about default endpoints, see [Simplified Configuration](../simplified-configuration.md) and [Simplified Configuration for WCF Services](../samples/simplified-configuration-for-wcf-services.md).

## See also

- [How to: Specify a Service Binding in Code](../how-to-specify-a-service-binding-in-code.md)
