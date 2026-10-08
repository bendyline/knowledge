---
description: "Learn more about: How to: Write an Extension for the ServiceContractGenerator"
title: "How to: Write an Extension for the ServiceContractGenerator"
ms.date: "03/30/2017"
ms.assetid: 876ca823-bd16-4bdf-9e0f-02092df90e51
---
# How to: Write an Extension for the ServiceContractGenerator

This topic describes how to write an extension for the [System.ServiceModel.Description.ServiceContractGenerator](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceContractGenerator). This can be done by implementing the [System.ServiceModel.Description.IOperationContractGenerationExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationContractGenerationExtension) interface on an operation behavior or implementing the [System.ServiceModel.Description.IServiceContractGenerationExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceContractGenerationExtension) interface on a contract behavior. This topic shows how to implement the [System.ServiceModel.Description.IServiceContractGenerationExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceContractGenerationExtension) interface on a contract behavior.  
  
 The [System.ServiceModel.Description.ServiceContractGenerator](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceContractGenerator) generates service contracts, client types, and client configurations from [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint), [System.ServiceModel.Description.ContractDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription), and [System.ServiceModel.Channels.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding) instances. Typically, you import [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint), [System.ServiceModel.Description.ContractDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription), and [System.ServiceModel.Channels.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding) instances from service metadata and then use these instances to generate code to call the service. In this example, an [System.ServiceModel.Description.IWsdlImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension) implementation is used to process WSDL annotations and then add code generation extensions to the imported contracts to generate comments on the generated code.  
  
### To write an extension for the ServiceContractGenerator  
  
1. Implement [System.ServiceModel.Description.IServiceContractGenerationExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceContractGenerationExtension). To modify the generated service contract, use the [System.ServiceModel.Description.ServiceContractGenerationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceContractGenerationContext) instance passed into the [System.ServiceModel.Description.IServiceContractGenerationExtension.GenerateContract%28System.ServiceModel.Description.ServiceContractGenerationContext%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceContractGenerationExtension.GenerateContract%2528System.ServiceModel.Description.ServiceContractGenerationContext%2529) method.  
  
    ```csharp
    public void GenerateContract(ServiceContractGenerationContext context)  
    {  
        Console.WriteLine("In generate contract.");  
        context.ContractType.Comments.AddRange(Formatter.FormatComments(commentText));  
    }  
    ```  
  
2. Implement [System.ServiceModel.Description.IWsdlImportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension) on the same class. The [System.ServiceModel.Description.IWsdlImportExtension.ImportContract%28System.ServiceModel.Description.WsdlImporter%2CSystem.ServiceModel.Description.WsdlContractConversionContext%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlImportExtension.ImportContract%2528System.ServiceModel.Description.WsdlImporter%252CSystem.ServiceModel.Description.WsdlContractConversionContext%2529) method can process a specific WSDL extension (WSDL annotations in this case) by adding a code generation extension to the imported [System.ServiceModel.Description.ContractDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription) instance.  
  
    ```csharp
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
    ```  
  
3. Add the WSDL importer to your client configuration.  
  
    ```xml  
    <metadata>  
      <wsdlImporters>  
        <extension type="Microsoft.WCF.Documentation.WsdlDocumentationImporter, WsdlDocumentation" />  
      </wsdlImporters>  
    </metadata>  
    ```  
  
4. In the client code, create a `MetadataExchangeClient` and call `GetMetadata`.  
  
    ```csharp
    var mexClient = new MetadataExchangeClient(metadataAddress);  
    mexClient.ResolveMetadataReferences = true;  
    MetadataSet metaDocs = mexClient.GetMetadata();  
    ```  
  
5. Create a `WsdlImporter` and call `ImportAllContracts`.  
  
    ```csharp
    var importer = new WsdlImporter(metaDocs);
    System.Collections.ObjectModel.Collection<ContractDescription> contracts = importer.ImportAllContracts();  
    ```  
  
6. Create a `ServiceContractGenerator` and call `GenerateServiceContractType` for each contract.  
  
    ```csharp
    var generator = new ServiceContractGenerator();  
    foreach (ContractDescription contract in contracts)  
    {  
       generator.GenerateServiceContractType(contract);  
    }  
    if (generator.Errors.Count != 0)  
       throw new Exception("There were errors during code compilation.");  
    ```  
  
7. [System.ServiceModel.Description.IServiceContractGenerationExtension.GenerateContract%28System.ServiceModel.Description.ServiceContractGenerationContext%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceContractGenerationExtension.GenerateContract%2528System.ServiceModel.Description.ServiceContractGenerationContext%2529) is called automatically for each contract behavior on a given contract that implements [System.ServiceModel.Description.IServiceContractGenerationExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceContractGenerationExtension). This method can then modify the [System.ServiceModel.Description.ServiceContractGenerationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceContractGenerationContext) passed in. In this example comments are added.  
  
## See also

- [Metadata](../feature-details/metadata.md)
- [How to: Import Custom WSDL](how-to-import-custom-wsdl.md)
