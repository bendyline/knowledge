---
description: "Learn more about: How to: Publish Metadata for a Service Using Code"
title: "How to: Publish Metadata for a Service Using Code"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 51407e6d-4d87-42d5-be7c-9887b8652006
---
# How to: Publish Metadata for a Service Using Code

This is one of two how-to topics that discuss publishing metadata for a Windows Communication Foundation (WCF) service. There are two ways to specify how a service should publish metadata, using a configuration file and using code. This topic shows how to publish metadata for a service using a code.

> **Caution:**
> This topic shows how to publish metadata in an unsecure manner. Any client can retrieve the metadata from the service. If you require your service to publish metadata in a secure manner. see [Custom Secure Metadata Endpoint](../samples/custom-secure-metadata-endpoint.md).

 For more information about publishing metadata in a configuration file, see [How to: Publish Metadata for a Service Using a Configuration File](how-to-publish-metadata-for-a-service-using-a-configuration-file.md). Publishing metadata allows clients to retrieve the metadata using a WS-Transfer GET request or an HTTP/GET request using the `?wsdl` query string. To be sure that the code is working you must create a basic WCF service. A basic self-hosted service is provided in the following code.

 [htPublishMetadataCode#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
 [htPublishMetadataCode#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

### To publish metadata in code

1. Within the main method of a console application, instantiate a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) object by passing in the service type and the base address.

     [htPublishMetadataCode#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

2. Create a try block immediately below the code for step 1, this catches any exceptions that get thrown while the service is running.

     [htPublishMetadataCode#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

     [htPublishMetadataCode#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

3. Check to see whether the service host already contains a [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior), if not, create a new [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) instance.

     [htPublishMetadataCode#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

4. Set the [System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled) property to `true.`

     [htPublishMetadataCode#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

5. The [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) contains a [System.ServiceModel.Description.MetadataExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter) property. The [System.ServiceModel.Description.MetadataExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter) contains a [System.ServiceModel.Description.MetadataExporter.PolicyVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter.PolicyVersion) property. Set the value of the [System.ServiceModel.Description.MetadataExporter.PolicyVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter.PolicyVersion) property to [System.ServiceModel.Description.PolicyVersion.Policy15*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyVersion.Policy15*). The [System.ServiceModel.Description.MetadataExporter.PolicyVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter.PolicyVersion) property can also be set to [System.ServiceModel.Description.PolicyVersion.Policy12*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyVersion.Policy12*). When set to [System.ServiceModel.Description.PolicyVersion.Policy15*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyVersion.Policy15*) the metadata exporter generates policy information with the metadata that" conforms to WS-Policy 1.5. When set to [System.ServiceModel.Description.PolicyVersion.Policy12*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyVersion.Policy12*) the metadata exporter generates policy information that conforms to WS-Policy 1.2.

     [htPublishMetadataCode#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

6. Add the [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) instance to the service host's behaviors collection.

     [htPublishMetadataCode#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

7. Add the metadata exchange endpoint to the service host.

     [htPublishMetadataCode#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

8. Add an application endpoint to the service host.

     [htPublishMetadataCode#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

    > **Note:**
    > If you do not add any endpoints to the service, the runtime adds default endpoints for you. In this example, because the service has a [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) set to `true`, the service has publishing metadata enabled. For more information about default endpoints, see [Simplified Configuration](../simplified-configuration.md) and [Simplified Configuration for WCF Services](../samples/simplified-configuration-for-wcf-services.md).

9. Open the service host and wait for incoming calls. When the user presses ENTER, close the service host.

     [htPublishMetadataCode#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
     [htPublishMetadataCode#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

10. Build and run the console application.

11. Browse to the base address of the service (`http://localhost:8001/MetadataSample` in this sample) and verify that the metadata publishing is turned on. You should see a Web page displayed that says "Simple Service" at the top and immediately below "You have created a service." If not, a message at the top of the resulting page displays: "Metadata publishing for this service is currently disabled."

## Example

 The following code example shows the implementation of a basic WCF service that publishes metadata for the service in code.

 [htPublishMetadataCode#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htpublishmetadatacode/cs/program.cs.md)
 [htPublishMetadataCode#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htpublishmetadatacode/vb/program.vb.md)

## See also

- [How to: Host a WCF Service in a Managed Application](../how-to-host-a-wcf-service-in-a-managed-application.md)
- [Self-Host](../samples/self-host.md)
- [Metadata Architecture Overview](metadata-architecture-overview.md)
- [Using Metadata](using-metadata.md)
- [How to: Publish Metadata for a Service Using a Configuration File](how-to-publish-metadata-for-a-service-using-a-configuration-file.md)
