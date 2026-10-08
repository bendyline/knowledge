---
description: "Learn more about: Custom Credential and Credential Validation"
title: "Custom Credential and Credential Validation"
ms.date: "03/30/2017"
helpviewer_keywords: 
  - "credentials [WCF], custom"
  - "credentials [WCF]"
  - "custom credentials [WCF]"
  - "credential validation [WCF]"
  - "credentials [WCF], validation"
ms.assetid: da831bec-e281-4d44-b343-437b5eef688e
---
# Custom Credential and Credential Validation

Security in Windows Communication Foundation (WCF) is based on the exchange of credentials between services and clients. Most security scenarios can be satisfied using common credential types, such as Windows (Kerberos), username and passwords, and certificates. However, if a new type of credential is required, the topics in this section explain how to handle and validate new types.  
  
## In This Section  

 [How to: Create a Service that Employs a Custom Certificate Validator](how-to-create-a-service-that-employs-a-custom-certificate-validator.md)  
 Explains how to customize WCF validation by inheriting from the [System.IdentityModel.Selectors.X509CertificateValidator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.X509CertificateValidator) class.  
  
 [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md)  
 Demonstrates how to extend the [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials) and [System.ServiceModel.Description.ServiceCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials) classes to accommodate new credential types. This is first in a series of topics that enable creation of custom credential types.  
  
 [How to: Create a Custom Security Token Provider](how-to-create-a-custom-security-token-provider.md)  
 Explains how to create a security token provider to handle new credential types and return new tokens for the credential. This is the second topic in the series.  
  
 [How to: Create a Custom Security Token Authenticator](how-to-create-a-custom-security-token-authenticator.md)  
 Explains how to create a custom authenticator to authenticate a new credential type. This is the third topic in the series.  
  
## Reference  

 [System.ServiceModel.Security](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security)  
  
 [System.IdentityModel.Claims](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims)  
  
 [System.IdentityModel.Policy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy)  
  
 [System.IdentityModel.Tokens](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens)  
  
 [System.IdentityModel.Selectors](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors)  
  
 [System.IdentityModel.Selectors.X509CertificateValidator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.X509CertificateValidator)  
  
 [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials)  
  
 [System.ServiceModel.Description.ServiceCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials)  
  
## Related Sections  

 [Authentication](../feature-details/authentication-in-wcf.md)  
  
 [Federation and Issued Tokens](../feature-details/federation-and-issued-tokens.md)  
  
 [Authorization](../feature-details/authorization-in-wcf.md)  
  
## See also

- [Security](../feature-details/security.md)
