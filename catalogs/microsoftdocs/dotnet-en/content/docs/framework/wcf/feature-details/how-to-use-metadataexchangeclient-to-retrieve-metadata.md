---
description: "Learn more about: How to: Use MetadataExchangeClient to Retrieve Metadata"
title: "How to: Use MetadataExchangeClient to Retrieve Metadata"
ms.date: "03/30/2017"
ms.assetid: 0754e9dc-13c5-45c2-81b5-f3da466e5a87
---
# How to: Use MetadataExchangeClient to Retrieve Metadata

Use the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) class to download metadata using the WS-MetadataExchange (MEX) protocol. The retrieved metadata files are returned as a [System.ServiceModel.Description.MetadataSet](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSet) object. The returned [System.ServiceModel.Description.MetadataSet](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSet) object contains a collection of [System.ServiceModel.Description.MetadataSection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSection) objects, each of which contains a specific metadata dialect and an identifier. You can write the returned metadata to files or, if the returned metadata contains Web Services Description Language (WSDL) documents, you can import the metadata using the [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter).

 The [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) constructors that take an address use the binding on the [System.ServiceModel.Description.MetadataExchangeBindings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeBindings) static class that matches the Uniform Resource Identifier (URI) scheme of the address. You can alternatively use the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) constructor that allows you to explicitly specify the binding to use. The specified binding is used to resolve all metadata references.

 Just like any other Windows Communication Foundation (WCF) client, the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) type provides a constructor for loading client endpoint configurations using the endpoint configuration name. The specified endpoint configuration must specify the [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) contract. The address in the endpoint configuration is not loaded, so you must use one of the [System.ServiceModel.Description.MetadataExchangeClient.GetMetadata*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.GetMetadata*) overloads that take an address. When you specify the metadata address using an [System.ServiceModel.EndpointAddress](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointAddress) instance, the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) assumes that the address points to a MEX endpoint. If you specify the metadata address as a URL, then you need to also specify which [System.ServiceModel.Description.MetadataExchangeClientMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClientMode) to use, MEX or HTTP GET.

> **Important:**
> By default, the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) resolves all references for you, including WSDL and XML Schema imports and includes. You can disable this functionality by setting the [System.ServiceModel.Description.MetadataExchangeClient.ResolveMetadataReferences](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.ResolveMetadataReferences) property to `false`. You can control the maximum number of references to resolve using the [System.ServiceModel.Description.MetadataExchangeClient.MaximumResolvedReferences](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.MaximumResolvedReferences) property. You can use this property in conjunction with the `MaxReceivedMessageSize` property on the binding to control how much metadata is retrieved.

### To use MetadataExchangeClient to obtain metadata

1. Create a new [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) object by explicitly specifying a binding, an endpoint configuration name, or the address of the metadata.

2. Configure the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) to suit your needs. For example, you can specify credentials to use when requesting metadata, control how metadata references are resolved, and set the [System.ServiceModel.Description.MetadataExchangeClient.OperationTimeout](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.OperationTimeout) property to control how long the metadata request has to return before it times out.

3. Obtain the [System.ServiceModel.Description.MetadataSet](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSet) object that contains the retrieved metadata by calling one of the [System.ServiceModel.Description.MetadataExchangeClient.GetMetadata*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.GetMetadata*) methods. Note that you can only use the [System.ServiceModel.Description.MetadataExchangeClient.GetMetadata*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.GetMetadata*) overload that takes no arguments if you explicitly specified an address when constructing the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient).

## Example

 The following code example shows how to use [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) to download and enumerate metadata files.

 [MetadataResolver#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/metadataresolver/cs/client.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/metadataresolver/cs/client.cs.md)

## Compiling the Code

 To compile this code example, you must reference the System.ServiceModel.dll assembly and import the [System.ServiceModel.Description](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description) namespace.

## See also

- [System.ServiceModel.Description.MetadataResolver](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataResolver)
- [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient)
- [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter)
