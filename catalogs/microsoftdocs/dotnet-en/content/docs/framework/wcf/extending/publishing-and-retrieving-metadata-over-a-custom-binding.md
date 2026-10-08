---
description: "Learn more about: Publishing and Retrieving Metadata Over a Custom Binding"
title: "Publishing and Retrieving Metadata Over a Custom Binding"
ms.date: "03/30/2017"
ms.assetid: 904e11b4-d90e-45c6-9ee5-c3472c90008c
---
# Publishing and Retrieving Metadata Over a Custom Binding

The [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) provides support for adding metadata endpoint to a service. These metadata endpoints can respond to HTTP GET requests at a URL that has a `?wsdl` querystring and to WS-Transfer GET requests as defined in the WS-MetadataExchange (MEX) specification. MEX endpoints implement the [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) contract.

## Publishing Metadata Over a Custom Binding

 The HTTP GET metadata endpoints and HTTPS GET metadata endpoints are enabled by setting the [System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled*) or [System.ServiceModel.Description.ServiceMetadataBehavior.HttpsGetEnabled](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior.HttpsGetEnabled) properties to `true`. The bindings for these endpoints cannot be configured.

 The [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) contract, however, can be used with any endpoint, including those that use custom bindings, because [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) endpoints are identical to any other Windows Communication Foundation (WCF) service endpoint. If you know how to modify the configuration of a system-provided binding, or you know how to configure a [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding), then you can configure a binding for use with an [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) endpoint.

## Retrieving Metadata Over a Custom Binding

 Metadata can be retrieved from HTTP Get and HTTPS Get metadata endpoints using standard HTTP or HTTPS GET requests.

 To retrieve metadata from a MEX metadata endpoint you can generally use one of the standard MEX bindings supported by WCF. For more information, see [System.ServiceModel.Description.MetadataExchangeBindings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeBindings). The [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) type and the Svcutil.exe tool automatically select one of these standard MEX bindings based on the address of the specified metadata endpoint.

 If a MEX metadata endpoint uses a different binding than one of the standard MEX bindings, you can configure the binding used by the [System.ServiceModel.Description.MetadataExchangeClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeClient) using code or by providing an [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) client endpoint configuration. The Svcutil.exe tool automatically loads from its configuration file an [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) client endpoint configuration that has the same name as the URI scheme for the metadata endpoint address.

## Security

 When publishing metadata over a custom binding, ensure that the binding provides the security support that your metadata requires. For example, to prevent information disclosure and ensure your client has the right to obtain the metadata, you can make your metadata and your application more secure by configuring your [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) endpoint to require authentication and encryption. The sample [Custom Secure Metadata Endpoint](../samples/custom-secure-metadata-endpoint.md) demonstrates this scenario.

## See also

- [Securing Services](../securing-services.md)
- [WS-MetadataExchange Bindings](ws-metadataexchange-bindings.md)
- [How to: Configure a Custom WS-Metadata Exchange Binding](how-to-configure-a-custom-ws-metadata-exchange-binding.md)
- [How to: Retrieve Metadata Over a non-MEX Binding](how-to-retrieve-metadata-over-a-non-mex-binding.md)
