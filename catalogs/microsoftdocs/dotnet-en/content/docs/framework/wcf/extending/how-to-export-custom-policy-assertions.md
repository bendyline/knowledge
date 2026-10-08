---
description: "Learn more about: How to: Export Custom Policy Assertions"
title: "How to: Export Custom Policy Assertions"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 99030386-43b0-4f7b-866d-17ea307f5cbd
---
# How to: Export Custom Policy Assertions

Policy assertions describe the capabilities and requirements of a service endpoint. Service applications can use custom policy assertions in service metadata to communicate endpoint, binding or contract customization information to the client application. You can use Windows Communication Foundation (WCF) to export assertions in policy expressions attached in WSDL bindings at the endpoint, operation, or message subjects, depending upon the capabilities or requirements you are communicating.

 Custom policy assertions are exported by implementing the [System.ServiceModel.Description.IPolicyExportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyExportExtension) interface on a [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) and either inserting the binding element directly into the binding of the service endpoint or by registering the binding element in your application configuration file. Your policy export implementation should add your custom policy assertion as a [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement) instance to the appropriate [System.ServiceModel.Description.PolicyAssertionCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyAssertionCollection) on the [System.ServiceModel.Description.PolicyConversionContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyConversionContext) passed into the [System.ServiceModel.Description.IPolicyExportExtension.ExportPolicy*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyExportExtension.ExportPolicy*) method.

 In addition you must check the [System.ServiceModel.Description.MetadataExporter.PolicyVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter.PolicyVersion) property of the [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter) class and export nested policy expressions and policy framework attributes in the correct namespace based on the policy version specified.

 To import custom policy assertions, see [System.ServiceModel.Description.IPolicyImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyImportExtension) and [How to: Import Custom Policy Assertions](how-to-import-custom-policy-assertions.md).

### To export custom policy assertions

1. Implement the [System.ServiceModel.Description.IPolicyExportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyExportExtension) interface on a [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement). The following code example shows the implementation of a custom policy assertion at the binding level.

     [CustomPolicySample#14 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/policyexporter.cs#14)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/policyexporter.cs.md)
     [CustomPolicySample#14 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/custompolicysample/vb/policyexporter.vb#14)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/custompolicysample/vb/policyexporter.vb.md)

2. Insert the binding element into the endpoint binding either programmatically or using an application configuration file. See the following procedures.

### To insert a binding element using an application configuration file

1. Implement [System.ServiceModel.Configuration.BindingElementExtensionElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.BindingElementExtensionElement) for your custom policy assertion binding element.

2. Add the binding element extension to the configuration file using the [\<bindingElementExtensions>](../../configure-apps/file-schema/wcf/bindingelementextensions.md) element.

3. Build a custom binding using the [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding).

### To insert a binding element programmatically

1. Create a new [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement) and add it to a [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding).

2. Add the custom binding from step 1. to a new endpoint and add that new service endpoint to the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) by calling the [System.ServiceModel.ServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint*) method.

3. Open the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost). The following code example shows the creation of a custom binding and the programmatic insertion of binding elements.

     [s_imperative#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_imperative/cs/service.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_imperative/cs/service.cs.md)
     [s_imperative#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_imperative/vb/service.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_imperative/vb/service.vb.md)

## See also

- [System.ServiceModel.Description.IPolicyImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyImportExtension)
- [System.ServiceModel.Description.IPolicyExportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyExportExtension)
- [How to: Import Custom Policy Assertions](how-to-import-custom-policy-assertions.md)
