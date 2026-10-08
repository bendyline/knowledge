---
description: "Learn more about: How to: Export Metadata from Service Endpoints"
title: "How to: Export Metadata from Service Endpoints"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: b6c4dfd0-f270-43ec-961a-e16eb6af2f2c
---
# How to: Export Metadata from Service Endpoints

This topic explains how to export metadata from service endpoints.

### To export metadata from service endpoints

1. Create a new Visual Studio Console App Project. Add the code shown in the following steps in the generated Program.cs file within the main() method.

2. Create a [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter).

     [S_UEWsdlExporter#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs.md)
     [S_UEWsdlExporter#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb.md)

3. Set the [System.ServiceModel.Description.MetadataExporter.PolicyVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter.PolicyVersion) property to one of the values from the [System.ServiceModel.Description.PolicyVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyVersion) enumeration. This sample sets the value to [System.ServiceModel.Description.PolicyVersion.Policy15*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PolicyVersion.Policy15*) which corresponds to WS-Policy 1.5.

     [S_UEWsdlExporter#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs.md)
     [S_UEWsdlExporter#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb.md)

4. Create an array of [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) objects.

     [S_UEWsdlExporter#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs.md)
     [S_UEWsdlExporter#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb.md)

5. Export metadata for each service endpoint.

     [S_UEWsdlExporter#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs.md)
     [S_UEWsdlExporter#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb.md)

6. Check to make sure no errors occurred during the export process and retrieve the metadata.

     [S_UEWsdlExporter#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs.md)
     [S_UEWsdlExporter#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb.md)

7. You can now use the metadata, such as write it to a file by calling the [System.ServiceModel.Description.MetadataSet.WriteTo%28System.Xml.XmlWriter%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataSet.WriteTo%2528System.Xml.XmlWriter%2529) method.

## Example

 The following is the full code listing for this example.

 [S_UEWsdlExporter#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_uewsdlexporter/cs/program.cs.md)
 [S_UEWsdlExporter#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_uewsdlexporter/vb/program.vb.md)

## Compiling the Code

 When compiling Program.cs reference System.ServiceModel.dll.

## See also

- [Metadata Architecture Overview](metadata-architecture-overview.md)
- [Using Metadata](using-metadata.md)
- [Endpoints: Addresses, Bindings, and Contracts](endpoints-addresses-bindings-and-contracts.md)
