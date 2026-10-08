---
title: "Publishing Metadata"
description: Learn how WCF services publish metadata by publishing one or more metadata endpoints, making the metadata available using standard protocols.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "metadata [WCF], publishing"
ms.assetid: 3a56831a-cabc-45c0-bd02-12e2e9bd7313
---
# Publishing Metadata

Windows Communication Foundation (WCF) services publish metadata by publishing one or more metadata endpoints. Publishing service metadata makes the metadata available using standardized protocols, such as WS-MetadataExchange (MEX) and HTTP/GET requests. Metadata endpoints are similar to other service endpoints in that they have an address, a binding, and a contract, and they can be added to a service host through configuration or imperative code.

## Publishing Metadata Endpoints

 To publish metadata endpoints for a WCF service, you first must add the [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) service behavior to the service. Adding a [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) instance allows your service to expose metadata endpoints. Once you add the [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) service behavior, you can then expose metadata endpoints that support the MEX protocol or that respond to HTTP/GET requests.

 The [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) uses a [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter) to export metadata for all service endpoints in your service. For more information about exporting metadata from a service, see [Exporting and Importing Metadata](exporting-and-importing-metadata.md).

 The [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) adds a [System.ServiceModel.Description.ServiceMetadataExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataExtension) instance as an extension to your service host. The [System.ServiceModel.Description.ServiceMetadataExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataExtension) provides the implementation for the metadata publishing protocols. You can also use the [System.ServiceModel.Description.ServiceMetadataExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataExtension) to get the service's metadata at runtime by accessing the [System.ServiceModel.Description.ServiceMetadataExtension.Metadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataExtension.Metadata) property.

### MEX Metadata Endpoints

 To add metadata endpoints that use the MEX protocol, add service endpoints to your service host that use the `IMetadataExchange` service contract. WCF includes an [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange) interface with this service contract name that you can use as part of the WCF programming model. WS-MetadataExchange endpoints, or MEX endpoints, can use one of the four default bindings that the static factory methods expose on the [System.ServiceModel.Description.MetadataExchangeBindings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeBindings) class to match the default bindings used by WCF tools such as Svcutil.exe. You can also configure MEX metadata endpoints using your own custom binding.

### HTTP GET Metadata Endpoints

 To add a metadata endpoint to your service that responds to HTTP/GET requests, set the [System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled) property on the [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) to `true`. You can also configure a metadata endpoint that uses HTTPS by setting the [System.ServiceModel.Description.ServiceMetadataBehavior.HttpsGetEnabled](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior.HttpsGetEnabled) property on the [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) to `true`.

## In This Section

 [How to: Publish Metadata for a Service Using a Configuration File](how-to-publish-metadata-for-a-service-using-a-configuration-file.md)
 Demonstrates how to configure a WCF service to publish metadata so that clients can retrieve the metadata using a WS-MetadataExchange or an HTTP/GET request using the `?wsdl` query string.

 [How to: Publish Metadata for a Service Using Code](how-to-publish-metadata-for-a-service-using-code.md)
 Demonstrates how to enable metadata publishing for a WCF service in code so that clients can retrieve the metadata using a WS-MetadataExchange or an HTTP/GET request using the `?wsdl` query string.

## Reference

 [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior)

 [System.ServiceModel.Description.IMetadataExchange](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IMetadataExchange)

 [System.ServiceModel.Description.ServiceMetadataExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataExtension)

 [System.ServiceModel.Description.MetadataExchangeBindings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExchangeBindings)

## See also

- [Exporting and Importing Metadata](exporting-and-importing-metadata.md)
