---
title: "How to: Expose a Contract to SOAP and Web Clients"
description: Learn how to make a WFC server endpoint available to both SOAP and non-SOAP clients. By default, endpoints are available only to SOAP clients.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: bb765a48-12f2-430d-a54d-6f0c20f2a23a
---
# How to: Expose a Contract to SOAP and Web Clients

By default, Windows Communication Foundation (WCF) makes endpoints available only to SOAP clients. In [How to: Create a Basic WCF Web HTTP Service](how-to-create-a-basic-wcf-web-http-service.md), an endpoint is made available to non-SOAP clients. There may be times when you want to make the same contract available both ways, as a Web endpoint and as a SOAP endpoint. This topic shows an example of how to do this.

## To define the service contract

1. Define a service contract using an interface marked with the [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute), [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) and the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attributes, as shown in the following code:

    [htSoapWeb#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
    [htSoapWeb#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

    > **Note:**
    > By default [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) maps POST calls to the operation. You can, however, specify the method to map to the operation by specifying a "method=" parameter. [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) does not have a "method=" parameter and only maps GET calls to the service operation.

2. Implement the service contract, as shown in the following code:

     [htSoapWeb#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
     [htSoapWeb#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

## To host the service

1. Create a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) object, as shown in the following code:

     [htSoapWeb#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
     [htSoapWeb#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

2. Add a [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) with [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding) for the SOAP endpoint, as shown in the following code:

     [htSoapWeb#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
     [htSoapWeb#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

3. Add a [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) with [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding) for the non-SOAP endpoint and add the [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior) to the endpoint, as shown in the following code:

     [htSoapWeb#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
     [htSoapWeb#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

4. Call `Open()` on a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) instance to open the service host, as shown in the following code:

     [htSoapWeb#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
     [htSoapWeb#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

## To call service operations mapped to GET in a browser

1. In a web browser, browse to "`http://localhost:8000/Web/EchoWithGet?s=Hello, world!`". The URL contains the base address of the service (`http://localhost:8000/`), the relative address of the endpoint (""), the service operation to call ("EchoWithGet"), and a question mark followed by a list of named parameters separated by an ampersand (&).

## To call service operations on the Web endpoint in code

1. Create an instance of [System.ServiceModel.Web.WebChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebChannelFactory%601) within a `using` block, as shown in the following code.

     [htSoapWeb#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
     [htSoapWeb#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

> **Note:**
> `Close()` is automatically called on the channel at the end of the `using` block.

1. Create the channel and call the service, as shown in the following code.

     [htSoapWeb#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
     [htSoapWeb#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

## To call service operations on the SOAP endpoint

1. Create an instance of [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory) within a `using` block, as shown in the following code.

    [htSoapWeb#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
    [htSoapWeb#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

2. Create the channel and call the service, as shown in the following code.

    [htSoapWeb#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
    [htSoapWeb#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

## To close the service host

1. Close the service host, as shown in the following code.

    [htSoapWeb#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
    [htSoapWeb#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

## Example

The following is the full code listing for this topic:

[htSoapWeb#13 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs#13)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htsoapweb/cs/program.cs.md)
[htSoapWeb#13 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb#13)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htsoapweb/vb/program.vb.md)

## Compiling the code

 When compiling Service.cs, reference System.ServiceModel.dll and System.ServiceModel.Web.dll.

## See also

- [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)
- [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute)
- [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute)
- [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost)
- [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory)
- [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior)
- [WCF Web HTTP Programming Model](wcf-web-http-programming-model.md)
