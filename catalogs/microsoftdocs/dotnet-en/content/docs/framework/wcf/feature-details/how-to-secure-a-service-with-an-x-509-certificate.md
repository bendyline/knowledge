---
description: "Learn more about: How to: Secure a Service with an X.509 Certificate"
title: "How to: Secure a Service with an X.509 Certificate"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 2d06c2aa-d0d7-4e5e-ad7e-77416aa1c10b
---
# How to: Secure a Service with an X.509 Certificate

Securing a service with an X.509 certificate is a basic technique that most bindings in Windows Communication Foundation (WCF) use. This topic walks through the steps of configuring a self-hosted service with an X.509 certificate.

 A prerequisite is a valid certificate that can be used to authenticate the server. The certificate must be issued to the server by a trusted certificate authority. If the certificate is not valid, any client trying to use the service will not trust the service, and consequently no connection will be made. For more information about using certificates, see [Working with Certificates](working-with-certificates.md).

### To configure a service with a certificate using code

1. Create the service contract and the implemented service. For more information, see [Designing and Implementing Services](../designing-and-implementing-services.md).

2. Create an instance of the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) class and set its security mode to [System.ServiceModel.SecurityMode.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.Message), as shown in the following code.

     [C_SecureWithCertificate#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

3. Create two [System.Type](https://learn.microsoft.com/search/?terms=System.Type) variables, one each for the contract type and the implemented contract, as shown in the following code.

     [C_SecureWithCertificate#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

4. Create an instance of the [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class for the base address of the service. Because the `WSHttpBinding` uses the HTTP transport, the Uniform Resource Identifier (URI) must begin with that schema, or Windows Communication Foundation (WCF) will throw an exception when the service is opened.

     [C_SecureWithCertificate#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

5. Create a new instance of the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) class with the implemented contract type variable and the URI.

     [C_SecureWithCertificate#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

6. Add a [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) to the service using the [System.ServiceModel.ServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint*) method. Pass the contract, binding, and an endpoint address to the constructor, as shown in the following code.

     [C_SecureWithCertificate#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

7. Optional. To retrieve metadata from the service, create a new [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) object and set the [System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior.HttpGetEnabled) property to `true`.

     [C_SecureWithCertificate#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

8. Use the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*) method of the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential) class to add the valid certificate to the service. The method can use one of several methods to find a certificate. This example uses the [System.Security.Cryptography.X509Certificates.X509FindType.FindBySubjectName](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509FindType.FindBySubjectName) enumeration. The enumeration specifies that the supplied value is the name of the entity that the certificate was issued to.

     [C_SecureWithCertificate#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

9. Call the [System.ServiceModel.Channels.CommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject.Open*) method to start the service listening. If you are creating a console application, call the [System.Console.ReadLine*](https://learn.microsoft.com/search/?terms=System.Console.ReadLine*) method to keep the service in the listening state.

     [C_SecureWithCertificate#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
     [C_SecureWithCertificate#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

## Example

 The following example uses the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*) method to configure a service with an X.509 certificate.

 [C_SecureWithCertificate#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securewithcertificate/cs/source.cs.md)
 [C_SecureWithCertificate#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securewithcertificate/vb/source.vb.md)

## Compiling the Code

 The following namespaces are required to compile the code:

- [System](https://learn.microsoft.com/search/?terms=System)

- [System.ServiceModel](https://learn.microsoft.com/search/?terms=System.ServiceModel)

- [System.ServiceModel.Channels](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels)

- [System.Web.Services.Description](https://learn.microsoft.com/search/?terms=System.Web.Services.Description)

- [System.Security.Cryptography.X509Certificates](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates)

- [System.Runtime.Serialization](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization)

## See also

- [Working with Certificates](working-with-certificates.md)
