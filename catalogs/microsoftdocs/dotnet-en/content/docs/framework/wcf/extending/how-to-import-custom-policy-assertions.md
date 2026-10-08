---
description: "Learn more about: How to: Import Custom Policy Assertions"
title: "How to: Import Custom Policy Assertions"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 1f41d787-accb-4a10-bfc6-a807671d1581
---
# How to: Import Custom Policy Assertions

Policy assertions describe the capabilities and requirements of a service endpoint.  Client applications can use policy assertions in service metadata to configure the client binding or to customize the service contract for a service endpoint.

 Custom policy assertions are imported by implementing the [System.ServiceModel.Description.IPolicyImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyImportExtension) interface and passing that object to the metadata system or by registering the implementation type in your application configuration file.  Implementations of the [System.ServiceModel.Description.IPolicyImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyImportExtension) interface must provide a parameterless constructor.

### To import custom policy assertions

1. Implement the [System.ServiceModel.Description.IPolicyImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyImportExtension) interface on a class. See the following procedures.

2. Insert the custom policy importer either by:

3. Using a configuration file. See the following procedures.

4. Using a configuration file with [ServiceModel Metadata Utility Tool (Svcutil.exe)](../servicemodel-metadata-utility-tool-svcutil-exe.md). See the following procedures.

5. Programmatically inserting the policy importer. See the following procedures.

### To implement the System.ServiceModel.Description.IPolicyImportExtension interface on any class

1. In the [System.ServiceModel.Description.IPolicyImportExtension.ImportPolicy*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IPolicyImportExtension.ImportPolicy*) method, for each policy subject that you are interested in, find the policy assertions that you want to import by calling the appropriate method (depending upon the scope of the assertion that you want) on the [System.ServiceModel.Description.PolicyConversionContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyConversionContext) object passed to the method. The following code example shows how to use the [System.ServiceModel.Description.PolicyAssertionCollection.Remove*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyAssertionCollection.Remove*) method to locate the custom policy assertion and remove it from the collection in one step. If you use the remove method to locate and remove the assertion, you do not have to perform step 4.

     [CustomPolicySample#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/policyimporter.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/policyimporter.cs.md)
     [CustomPolicySample#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/custompolicysample/vb/policyimporter.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/custompolicysample/vb/policyimporter.vb.md)

2. Process the policy assertions. Note that the policy system does not normalize nested policies and `wsp:optional`. You must process these constructs in your policy import extension implementation.

3. Perform the customization to the binding or contract that supports the capability or requirement specified by the policy assertion. Typically assertions indicate that a binding requires a particular configuration or a specific binding element. Make these modifications by accessing the [System.ServiceModel.Description.PolicyConversionContext.BindingElements](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyConversionContext.BindingElements) property. Other assertions require that you modify the contract.  You can access and modify the contract using the [System.ServiceModel.Description.PolicyConversionContext.Contract](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyConversionContext.Contract) property.  Note that your policy importer may get called multiple times for the same binding and contract, but different policy alternatives if importing a policy alternative fails. Your code should be resilient to this behavior.

4. Remove the custom policy assertion from the assertion collection. If you do not remove the assertion Windows Communication Foundation (WCF) assumes that the policy import was unsuccessful and does not import the associated binding. If you used the [System.ServiceModel.Description.PolicyAssertionCollection.Remove*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyAssertionCollection.Remove*) method to locate the custom policy assertion and remove it from the collection in one step you do not have to perform this step.

### To insert the custom policy importer into the metadata System using a configuration file

1. Add the importer type to the `<extensions>` element inside the [\<policyImporters>](../../configure-apps/file-schema/wcf/policyimporters.md) element in the client configuration file.

     [CustomPolicySample#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/client.exe.config#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/client.exe.config.md)

2. In the client application, use the [System.ServiceModel.Description.MetadataResolver](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataResolver) or [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter) to resolve the metadata and the importer is invoked automatically.

     [CustomPolicySample#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/client.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/custompolicysample/cs/client.cs.md)
     [CustomPolicySample#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/custompolicysample/vb/client.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/custompolicysample/vb/client.vb.md)

### To insert the custom policy importer into the metadata system using Svcutil.exe

1. Add the importer type to the `<extensions>` element inside the [\<policyImporters>](../../configure-apps/file-schema/wcf/policyimporters.md) element in the Svcutil.exe.config configuration file. You can also point Svcutil.exe to load policy importer types registered in a different configuration file by using the `/svcutilConfig` option.

2. Use [ServiceModel Metadata Utility Tool (Svcutil.exe)](../servicemodel-metadata-utility-tool-svcutil-exe.md) to import the metadata and the importer is invoked automatically.

### To insert the custom policy importer into the metadata system programmatically

1. Add the importer to the [System.ServiceModel.Description.MetadataImporter.PolicyImportExtensions](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataImporter.PolicyImportExtensions) property (for example, if you are using the [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter)) prior to importing the metadata.

## See also

- [System.ServiceModel.Description.MetadataResolver](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataResolver)
- [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter)
- [System.ServiceModel.Description.MetadataResolver](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataResolver)
- [Extending the Metadata System](extending-the-metadata-system.md)
