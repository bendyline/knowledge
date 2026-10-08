---
description: "Learn more about: How to: Create a Custom Security Token Provider"
title: "How to: Create a Custom Security Token Provider"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "security [WCF], providing credentials"
ms.assetid: db8cb478-aa43-478b-bf97-c6489ad7c7fd
---
# How to: Create a Custom Security Token Provider

This topic shows how to create new token types with a custom security token provider and how to integrate the provider with a custom security token manager.  
  
> **Note:**
> Create a custom token provider if the system-provided tokens found in the [System.IdentityModel.Tokens](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens) namespace do not match your requirements.  
  
 The security token provider creates a security token representation based on information in the client or service credentials. To use the custom security token provider in Windows Communication Foundation (WCF) security, you must create custom credentials and security token manager implementations.  
  
 For more information about custom credentials and security token manager see the [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md).  
  
### To create a custom security token provider  
  
1. Define a new class derived from the [System.IdentityModel.Selectors.SecurityTokenProvider](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider) class.  
  
2. Implement the [System.IdentityModel.Selectors.SecurityTokenProvider.GetTokenCore%28System.TimeSpan%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider.GetTokenCore%2528System.TimeSpan%2529) method. The method is responsible for creating and returning an instance of the security token. The following example creates a class named `MySecurityTokenProvider`, and overrides the [System.IdentityModel.Selectors.SecurityTokenProvider.GetTokenCore%28System.TimeSpan%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider.GetTokenCore%2528System.TimeSpan%2529) method to return an instance of the [System.IdentityModel.Tokens.X509SecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.X509SecurityToken) class. The class constructor requires an instance of the [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) class.  
  
     [c_CustomTokenProvider#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtokenprovider/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtokenprovider/cs/source.cs.md)
     [c_CustomTokenProvider#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenprovider/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenprovider/vb/source.vb.md)  
  
### To integrate a custom security token provider with a custom security token manager  
  
1. Define a new class derived from the [System.IdentityModel.Selectors.SecurityTokenManager](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager) class. (The example below derives from the [System.ServiceModel.ClientCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager) class, which derives from the [System.IdentityModel.Selectors.SecurityTokenManager](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager) class.)  
  
2. Override the [System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenProvider%28System.IdentityModel.Selectors.SecurityTokenRequirement%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenProvider%2528System.IdentityModel.Selectors.SecurityTokenRequirement%2529) method if is not already overridden.  
  
     The [System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenProvider%28System.IdentityModel.Selectors.SecurityTokenRequirement%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenProvider%2528System.IdentityModel.Selectors.SecurityTokenRequirement%2529) method is responsible for returning an instance of the [System.IdentityModel.Selectors.SecurityTokenProvider](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider) class appropriate to the [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement) parameter passed to the method by the WCF security framework. Modify the method to return the custom security token provider implementation (created in the previous procedure) when the method is called with an appropriate security token parameter. For more information about the security token manager, see the [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md).  
  
3. Add custom logic to the method to enable it to return your custom security token provider based on the [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement) parameter. The following sample returns the custom security token provider if the token requirements are met. The requirements include an X.509 security token and the message direction (that the token is used for message output). For all other cases, the code calls the base class to maintain the system-provided behavior for other security token requirements.  
  
 [c_CustomTokenProvider#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtokenprovider/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtokenprovider/cs/source.cs.md)
 [c_CustomTokenProvider#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenprovider/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenprovider/vb/source.vb.md)  
  
## Example  

 The following shows a complete [System.IdentityModel.Selectors.SecurityTokenProvider](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider) implementation along with a corresponding [System.IdentityModel.Selectors.SecurityTokenManager](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager) implementation.  
  
 [c_CustomTokenProvider#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtokenprovider/cs/source.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtokenprovider/cs/source.cs.md)
 [c_CustomTokenProvider#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenprovider/vb/source.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenprovider/vb/source.vb.md)  
  
## See also

- [System.IdentityModel.Selectors.SecurityTokenProvider](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider)
- [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement)
- [System.IdentityModel.Selectors.SecurityTokenManager](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager)
- [System.IdentityModel.Tokens.X509SecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.X509SecurityToken)
- [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md)
- [How to: Create a Custom Security Token Authenticator](how-to-create-a-custom-security-token-authenticator.md)
