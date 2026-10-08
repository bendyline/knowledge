---
description: "Learn more about: Retrieving Metadata"
title: "Retrieving Metadata"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "metadata [WCF], retrieving"
ms.assetid: 18d8ba4c-af0f-4827-a50b-4202d767bacc
---
# Retrieving Metadata

Metadata retrieval is the process of requesting and retrieving metadata from a metadata endpoint, such as a WS-MetadataExchange (MEX) metadata endpoint or an HTTP/GET metadata endpoint.

## Retrieving Metadata from the Command Line Using Svcutil.exe

 You can retrieve service metadata using WS-MetadataExchange or HTTP/GET requests by using the [ServiceModel Metadata Utility Tool (Svcutil.exe)](../servicemodel-metadata-utility-tool-svcutil-exe.md) tool and passing the `/target:metadata` switch and an address. Svcutil.exe downloads the metadata at the specified address and saves the file to disk. Svcutil.exe uses a [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) instance internally and loads from configuration the [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) endpoint configuration whose name matches the scheme of the address passed to Svcutil.exe as input.

## Retrieving Metadata Programmatically Using the MetadataExchangeClient

 Windows Communication Foundation (WCF) can retrieve service metadata using standardized protocols such as WS-MetadataExchange and HTTP/GET requests. Both of these protocols are supported by the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) type. You retrieve service metadata using the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) type by providing an address for the metadata endpoint and an optional binding. The binding used by a [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) instance can be one of the default bindings from the [System.ServiceModel.Description.MetadataExchangeBindings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeBindings) static class, a user-supplied binding, or a binding loaded from an endpoint configuration for the `IMetadataExchange` contract. The [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) can also resolve HTTP URL references to metadata using the [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest) type.

 By default, a [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) instance is tied to a single [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory) instance. You can change or replace the [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory) instance used by a [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) by overriding the [System.ServiceModel.Description.MetadataExchangeClient.GetChannelFactory*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.GetChannelFactory*) virtual method. Similarly, you can change or replace the [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest) instance used by a [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) to make HTTP/GET requests by overriding the [System.ServiceModel.Description.MetadataExchangeClient.GetWebRequest*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient.GetWebRequest*) virtual method.

## In This Section

 [How to: Use Svcutil.exe to Download Metadata Documents](how-to-use-svcutil-exe-to-download-metadata-documents.md)
 Demonstrates how to use Svcutil.exe to download metadata documents.

 [How to: Use MetadataResolver to Obtain Binding Metadata Dynamically](how-to-use-metadataresolver-to-obtain-binding-metadata-dynamically.md)
 Demonstrates how to use the [System.ServiceModel.Description.MetadataResolver](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataResolver) to obtain binding metadata dynamically at runtime.

 [How to: Use MetadataExchangeClient to Retrieve Metadata](how-to-use-metadataexchangeclient-to-retrieve-metadata.md)
 Demonstrates how to use the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) class to download metadata files into a [System.ServiceModel.Description.MetadataSet](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSet) object that contains [System.ServiceModel.Description.MetadataSection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSection) objects to write to files or for other uses.

## See also

- [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient)
