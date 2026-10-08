---
title: "Certificate Selection and Validation"
description: Find out about  several ways System.Net classes offer to select and validate certificates for SSL/TLS connections.
ms.date: "03/30/2017"
ms.assetid: c933aca2-4cd0-4ff1-9df9-267143f25a6f
---
# Certificate Selection and Validation

The [System.Net](https://learn.microsoft.com/search/?terms=System.Net) classes support several ways to select and validate [System.Security.Cryptography.X509Certificates](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates) for Secure Socket Layer (SSL) connections. A client can select one or more certificates to authenticate itself to a server. A server can require that a client certificate have one or more specific attributes for authentication.

## Definition

 A certificate is an ASCII byte stream that contains a public key, attributes (such as version number, serial number, and expiration date) and a digital signature from a Certificate Authority. Certificates are used to establish an encrypted connection or to authenticate a client to a server.

## Client Certificate Selection and Validation

 A client can select one or more certificates for a specific SSL connection. Client certificates can be associated with the SSL connection to a web server or an SMTP mail server. A client adds certificates to a collection of [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) or [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) class objects. Using email as an example, the certificate collection is an instance of a [System.Security.Cryptography.X509Certificates.X509CertificateCollection](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509CertificateCollection)) associated with the [System.Net.Mail.SmtpClient.ClientCertificates](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpClient.ClientCertificates) property of the [System.Net.Mail.SmtpClient](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpClient) class. The [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest) class has a similar [System.Net.HttpWebRequest.ClientCertificates](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest.ClientCertificates) property.

 The primary difference between the [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) and the [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) class is that the private key must reside in the certificate store for the [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) class.

 Even if certificates are added to a collection and associated with a specific SSL connection, no certificates will be sent to the server unless the server requests them. If multiple client certificates are set on a connection, the best one will be used based on an algorithm that considers the match between the list of certificate issuers provided by the server and the client certificate issuer name.

 The [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) class provides even more control over the SSL handshake. A client can specify a delegate to pick which client certificate to use.

 A remote server can verify that a client certificate is valid, current, and signed by the appropriate Certificate Authority. A delegate can be added to the [System.Net.ServicePointManager.ServerCertificateValidationCallback*](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.ServerCertificateValidationCallback*) to enforce certificate validation.

## Client Certificate Selection

 The .NET Framework selects the client certificate to present to the server in the following manner:

1. If a client certificate was presented previously to the server, the certificate is cached when first presented and is reused for subsequent client certificate requests.

2. If a delegate is present, always use the result from the delegate as the client certificate to select. Try to use a cached certificate when possible, but do not use cached anonymous credentials if the delegate has returned null and the certificate collection is not empty.

3. If this is the first challenge for a client certificate, the Framework enumerates the certificates in [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) or the [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) class objects associated with the connection, looking for a match between the list of certificate issuers provided by the server and the client certificate issuer name. The first certificate that matches is sent to the server. If no certificate matches or the certificate collection is empty, then an anonymous credential is sent to the server.

## Tools for Certificate Configuration

 A number of tools are available for client and server certificate configuration.

 The *Winhttpcertcfg.exe* tool can be used to configure client certificates. The *Winhttpcertcfg.exe* tool is provided as one of the tools with the Windows Server 2003 Resource Kit. This tool is also available as a download as part of the Windows Server 2003 Resource Kit Tools at [www.microsoft.com](https://www.microsoft.com).

The *HttpCfg.exe* tool can be used to configure server certificates for the [System.Net.HttpListener](https://learn.microsoft.com/search/?terms=System.Net.HttpListener) class. The *HttpCfg.exe* tool is provided as one of the support tools for Windows Server 2003 and Windows XP Service Pack 2. *HttpCfg.exe* and the other support tools are not installed by default on either Windows Server 2003 or Windows XP. On Windows Server 2003. the support tools are installed separately from the following folder and file on the Windows Server 2003 CD-ROM:

 \Support\Tools\Suptools.msi

 For use with Windows XP Service Pack 2, the Windows XP Support Tools are available as a download from [www.microsoft.com](https://www.microsoft.com).

 The source code to a version of the *HttpCfg.exe* tool is also provided as a sample with the Windows Server SDK. The source code to the *HttpCfg.exe* sample is installed by default with the networking samples as part of the Windows SDK under the following folder:

 *C:\Program Files\Microsoft SDKs\Windows\v1.0\Samples\NetDS\http\serviceconfig*

 In addition to these tools, the [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) and [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) classes provides methods for loading a certificate from the file system.

## See also

- [Security in Network Programming](security-in-network-programming.md)
- [Network programming in .NET](../../fundamentals/networking/overview.md)
