---
title: "How to: Create a Basic WCF Web HTTP Service"
description: Learn how to create a service that exposes a web endpoint in WCF. Web endpoints send data by using XML or JSON. There is no SOAP envelope.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 877662d3-d372-4e08-b417-51f66a0095cd
---
# How to: Create a Basic WCF Web HTTP Service

Windows Communication Foundation (WCF) allows you to create a service that exposes a Web endpoint. Web endpoints send data by XML or JSON, there is no SOAP envelope. This topic demonstrates how to expose such an endpoint.

> **Note:**
> The only way to secure a Web endpoint is to expose it through HTTPS, using transport security. When using message-based security, security information is usually placed in SOAP headers and because the messages sent to non-SOAP endpoints contain no SOAP envelope, there is nowhere to place the security information and you must rely on transport security.

## To create a Web endpoint

1. Define a service contract using an interface marked with the [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute), [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) and the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attributes.

     [htBasicService#0 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
     [htBasicService#0 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

    > **Note:**
    > By default, [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) maps POST calls to the operation. You can, however, specify the HTTP method (for example, HEAD, PUT, or DELETE) to map to the operation by specifying a "method=" parameter. [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) does not have a "method=" parameter and only maps GET calls to the service operation.

2. Implement the service contract.

     [htBasicService#1 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
     [htBasicService#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

## To host the service

1. Create a [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) object.

   [htBasicService#2 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
   [htBasicService#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

2. Add a [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) with the [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior).

   [htBasicService#3 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
   [htBasicService#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

   > **Note:**
   > If you do not add an endpoint, [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) automatically creates a default endpoint. [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) also adds [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior) and disables the HTTP Help page and the Web Services Description Language (WSDL) GET functionality so the metadata endpoint does not interfere with the default HTTP endpoint.
   >
   > Adding a non-SOAP endpoint with a URL of "" causes unexpected behavior when an attempt is made to call an operation on the endpoint. The reason for this is the listen URI of the endpoint is the same as the URI for the help page (the page that is displayed when you browse to the base address of a WCF service).

   You can do one of the following actions to prevent this from happening:

   - Always specify a non-blank URI for a non-SOAP endpoint.
   - Turn off the help page. This can be done with the following code:

   [htBasicService#4 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/snippets.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/snippets.cs.md)
   [htBasicService#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/snippets.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/snippets.vb.md)

3. Open the service host and wait until the user presses ENTER.

   [htBasicService#5 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/snippets.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/snippets.cs.md)
   [htBasicService#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/snippets.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/snippets.vb.md)

   This sample demonstrates how to host a Web-Style service with a console application. You can also host such a service within IIS. To do this, specify the [System.ServiceModel.Activation.WebServiceHostFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.WebServiceHostFactory) class in a .svc file as the following code demonstrates.

   ```text
   <%ServiceHost
       language=c#
       Debug="true"
       Service="Microsoft.Samples.Service"
       Factory=System.ServiceModel.Activation.WebServiceHostFactory%>
   ```

## To call service operations mapped to GET in a browser

1. Open a web browser, enter the URL "`http://localhost:8000/EchoWithGet?s=Hello, world!`", and then press <kbd>Enter</kbd>. The URL contains the base address of the service (`http://localhost:8000/`), the relative address of the endpoint (""), the service operation to call ("EchoWithGet"), and a question mark followed by a list of named parameters separated by an ampersand (&).

## To call service operations in code

1. Create an instance of [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601) within a `using` block.

     [htBasicService#6 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
     [htBasicService#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

2. Add [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior) to the endpoint the [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601) calls.

     [htBasicService#7 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
     [htBasicService#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

3. Create the channel and call the service.

     [htBasicService#8 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
     [htBasicService#8 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

4. Close the [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost).

     [htBasicService#9 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
     [htBasicService#9 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

## Example

The following is the full code listing for this example.

[htBasicService#10 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htbasicservice/cs/service.cs.md)
[htBasicService#10 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htbasicservice/vb/service.vb.md)

## Compiling the code

When compiling Service.cs reference System.ServiceModel.dll and System.ServiceModel.Web.dll.

## See also

- [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)
- [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute)
- [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute)
- [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost)
- [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior)
- [WCF Web HTTP Programming Model](wcf-web-http-programming-model.md)
