---
title: "Certificate Validation Differences Between HTTPS, SSL over TCP, and SOAP Security"
description: Learn about certificates with message-layer (SOAP) security that WCF offers in addition to HTTPS or TCP, and how WCF validates such certificates.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "certificates [WCF], validation differences"
ms.assetid: 953a219f-4745-4019-9894-c70704f352e6
---
# Certificate Validation Differences Between HTTPS, SSL over TCP, and SOAP Security

You can use certificates in Windows Communication Foundation (WCF) with message-layer (SOAP) security in addition to transport-layer security (TLS) over HTTP (HTTPS) or TCP. This topic describes differences in the way such certificates are validated.

## Validation of HTTPS Client Certificates

 When using HTTPS to communicate between a client and a service, the certificate that the client uses to authenticate to the service must support chain trust. That is, it must chain to a trusted root certificate authority. If not, the HTTP layer raises a [System.Net.WebException](https://learn.microsoft.com/search/?terms=System.Net.WebException) with the message "The remote server returned an error: (403) Forbidden." WCF surfaces this exception as a [System.ServiceModel.Security.MessageSecurityException](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.MessageSecurityException).

## Validation of HTTPS Service Certificates

 When using HTTPS to communicate between a client and a service, the certificate that the server authenticates with must support chain trust by default. That is, it must chain to a trusted root certificate authority. No online check is performed to see whether the certificate has been revoked. You can override this behavior by registering a [System.Net.Security.RemoteCertificateValidationCallback](https://learn.microsoft.com/search/?terms=System.Net.Security.RemoteCertificateValidationCallback) callback, as shown in the following code.

 [c_CertificateValidationDifferences#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs.md)
 [c_CertificateValidationDifferences#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb.md)

 where the signature for `ValidateServerCertificate` is as follows:

 [c_CertificateValidationDifferences#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs.md)
 [c_CertificateValidationDifferences#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb.md)

 Implementing `ValidateServerCertificate` can perform any checks that the client application developer deems necessary to validate the service certificate.

## Validation of Client Certificates in SSL over TCP or SOAP Security

 When using Secure Sockets Layer (SSL) over TCP or message (SOAP) security, client certificates are validated according to the [System.ServiceModel.Security.X509ClientCertificateAuthentication.CertificateValidationMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ClientCertificateAuthentication.CertificateValidationMode) property value of the [System.ServiceModel.Security.X509ClientCertificateAuthentication](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ClientCertificateAuthentication) class. The property is set to one of the [System.ServiceModel.Security.X509CertificateValidationMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateValidationMode) values. Revocation checking is performed according to the values of the [System.ServiceModel.Security.X509ClientCertificateAuthentication.RevocationMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ClientCertificateAuthentication.RevocationMode) property value of the [System.ServiceModel.Security.X509ClientCertificateAuthentication](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ClientCertificateAuthentication) class. The property is set to one of the [System.Security.Cryptography.X509Certificates.X509RevocationMode](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509RevocationMode) values.

 [c_CertificateValidationDifferences#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs.md)
 [c_CertificateValidationDifferences#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb.md)

## Validation of Service Certificate in SSL over TCP and SOAP Security

 When using SSL over TCP or (SOAP) message security, service certificates are validated according to the [System.ServiceModel.Security.X509ServiceCertificateAuthentication.CertificateValidationMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ServiceCertificateAuthentication.CertificateValidationMode) property value of the [System.ServiceModel.Security.X509ServiceCertificateAuthentication](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ServiceCertificateAuthentication) class. The property is set to one of the [System.ServiceModel.Security.X509CertificateValidationMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateValidationMode) values.

 Revocation checking is performed according to the values of the [System.ServiceModel.Security.X509ServiceCertificateAuthentication.RevocationMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ServiceCertificateAuthentication.RevocationMode) property value of the [System.ServiceModel.Security.X509ServiceCertificateAuthentication](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509ServiceCertificateAuthentication) class. The property is set to one of the [System.Security.Cryptography.X509Certificates.X509RevocationMode](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509RevocationMode) values.

 [c_CertificateValidationDifferences#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_certificatevalidationdifferences/cs/source.cs.md)
 [c_CertificateValidationDifferences#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_certificatevalidationdifferences/vb/source.vb.md)

## See also

- [System.Net.Security.RemoteCertificateValidationCallback](https://learn.microsoft.com/search/?terms=System.Net.Security.RemoteCertificateValidationCallback)
- [Working with Certificates](working-with-certificates.md)
