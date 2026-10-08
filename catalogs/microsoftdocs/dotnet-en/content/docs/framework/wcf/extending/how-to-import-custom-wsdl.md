---
description: "Learn more about: How to: Import Custom WSDL"
title: "How to: Import Custom WSDL"
ms.date: "03/30/2017"
ms.assetid: ddc3718d-ce60-44f6-92af-a5c67477dd99
---
# How to: Import Custom WSDL

This topic describes how to import custom WSDL. To handle the custom WSDL, you must implement the [System.ServiceModel.Description.IWsdlImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension) interface.

### To import custom WSDL

1. Implement [System.ServiceModel.Description.IWsdlImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension). Implement the [System.ServiceModel.Description.IWsdlImportExtension.BeforeImport%28System.Web.Services.Description.ServiceDescriptionCollection%2CSystem.Xml.Schema.XmlSchemaSet%2CSystem.Collections.Generic.ICollection%7BSystem.Xml.XmlElement%7D%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension.BeforeImport%2528System.Web.Services.Description.ServiceDescriptionCollection%252CSystem.Xml.Schema.XmlSchemaSet%252CSystem.Collections.Generic.ICollection%257BSystem.Xml.XmlElement%257D%2529) method to modify the metadata before it is imported. Implement the [System.ServiceModel.Description.IWsdlImportExtension.ImportEndpoint%28System.ServiceModel.Description.WsdlImporter%2CSystem.ServiceModel.Description.WsdlEndpointConversionContext%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension.ImportEndpoint%2528System.ServiceModel.Description.WsdlImporter%252CSystem.ServiceModel.Description.WsdlEndpointConversionContext%2529) and [System.ServiceModel.Description.IWsdlImportExtension.ImportContract%28System.ServiceModel.Description.WsdlImporter%2CSystem.ServiceModel.Description.WsdlContractConversionContext%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension.ImportContract%2528System.ServiceModel.Description.WsdlImporter%252CSystem.ServiceModel.Description.WsdlContractConversionContext%2529) methods to modify contracts and endpoints imported from the metadata. To access the imported contract or endpoint, use the corresponding context object ([System.ServiceModel.Description.WsdlContractConversionContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlContractConversionContext) or [System.ServiceModel.Description.WsdlEndpointConversionContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlEndpointConversionContext)):

    ```csharp
    public class WsdlDocumentationImporter : IWsdlImportExtension
    {
        public void ImportContract(WsdlImporter importer, WsdlContractConversionContext context)
        {
            // Contract documentation
            if (context.WsdlPortType.Documentation != null)
            {
                context.Contract.Behaviors.Add(new WsdlDocumentationImporter(context.WsdlPortType.Documentation));
            }
            // Operation documentation
            foreach (Operation operation in context.WsdlPortType.Operations)
            {
                if (operation.Documentation != null)
                {
                    OperationDescription operationDescription = context.Contract.Operations.Find(operation.Name);
                    if (operationDescription != null)
                    {
                        operationDescription.Behaviors.Add(new WsdlDocumentationImporter(operation.Documentation));
                    }
                }
            }
        }

        public void BeforeImport(ServiceDescriptionCollection wsdlDocuments, XmlSchemaSet xmlSchemas, ICollection<XmlElement> policy)
        {
            Console.WriteLine("BeforeImport called.");
        }

        public void ImportEndpoint(WsdlImporter importer, WsdlEndpointConversionContext context)
        {
            Console.WriteLine("ImportEndpoint called.");
        }
    }
    ```

2. Configure the client application to use the custom WSDL importer. Note that if you are using Svcutil.exe, you should add this configuration to the configuration file for Svcutil.exe (Svcutil.exe.config):

    ```xml
    <system.serviceModel>
          <client>
            <endpoint
              address="http://localhost:8000/Fibonacci"
              binding="wsHttpBinding"
              contract="IFibonacci"
            />
            <metadata>
              <wsdlImporters>
                <extension type="Microsoft.WCF.Documentation.WsdlDocumentationImporter, WsdlDocumentation" />
              </wsdlImporters>
            </metadata>
          </client>
        </system.serviceModel>
    ```

3. Create a new [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter) instance (passing in the [System.ServiceModel.Description.MetadataSet](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSet) instance that contains the WSDL documents that you want to import), and call [System.ServiceModel.Description.WsdlImporter.ImportAllContracts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter.ImportAllContracts*):

    ```csharp
    WsdlImporter importer = new WsdlImporter(metaDocs);
    System.Collections.ObjectModel.Collection<ContractDescription> contracts = importer.ImportAllContracts();
    ```

## See also

- [Metadata](../feature-details/metadata.md)
- [Exporting and Importing Metadata](../feature-details/exporting-and-importing-metadata.md)
- [Custom WSDL Publication](../samples/custom-wsdl-publication.md)
