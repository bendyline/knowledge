---
description: "Learn more about: How to: Use Separate X.509 Certificates for Signing and Encryption"
title: "How to: Use Separate X.509 Certificates for Signing and Encryption"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "WCF, extensibility"
  - "ClientCredentials class"
  - "ClientCredentialsSecurityTokenManager class"
ms.assetid: 0b06ce4e-7835-4d82-8baf-d525c71a0e49
ms.custom: sfi-image-nochange
---
# How to: Use Separate X.509 Certificates for Signing and Encryption

This topic shows how to configure Windows Communication Foundation (WCF) to use different certificates for message signing and encryption on both the client and service.

To enable separate certificates to be used for signing and encryption, a custom client or service credentials (or both) must be created because WCF does not provide an API to set multiple client or service certificates. Additionally, a security token manager must be provided to leverage the multiple certificates' information and to create an appropriate security token provider for specified key usage and message direction.

The following diagram shows the main classes used, the classes they inherit from (shown by an upward-pointing arrow), and the return types of certain methods and properties.

- `MyClientCredentials` is a custom implementation of [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials).

  - Its properties shown in the diagram all return instances of [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2).

  - Its method [System.ServiceModel.Description.ClientCredentials.CreateSecurityTokenManager*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials.CreateSecurityTokenManager*) returns an instance of `MyClientCredentialsSecurityTokenManager`.

- `MyClientCredentialsSecurityTokenManager` is a custom implementation of [System.ServiceModel.ClientCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager).

  - Its method [System.ServiceModel.ClientCredentialsSecurityTokenManager.CreateSecurityTokenProvider*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager.CreateSecurityTokenProvider*) returns an instance of [System.IdentityModel.Selectors.X509SecurityTokenProvider](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.X509SecurityTokenProvider).

Chart showing how client credentials are used

For more information about custom credentials, see [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md).

In addition, you must create a custom identity verifier, and link it to a security binding element in a custom binding. You must also use the custom credentials instead of the default credentials.

The following diagram shows the classes involved in the custom binding, and how the custom identity verifier is linked. There are several binding elements involved, all of which inherit from [System.ServiceModel.Channels.BindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElement). The [System.ServiceModel.Channels.AsymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AsymmetricSecurityBindingElement) has the [System.ServiceModel.Channels.LocalClientSecuritySettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalClientSecuritySettings) property, which returns an instance of [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier), from which `MyIdentityVerifier` is customized.

Chart showing a custom binding element

For more information about creating a custom identity verifier, see How to: [How to: Create a Custom Client Identity Verifier](how-to-create-a-custom-client-identity-verifier.md).

### To use separate certificates for signing and encryption

1. Define a new client credentials class that inherits from the [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials) class. Implement four new properties to allow multiple certificates specification: `ClientSigningCertificate`, `ClientEncryptingCertificate`, `ServiceSigningCertificate`, and `ServiceEncryptingCertificate`. Also override the [System.ServiceModel.Description.ClientCredentials.CreateSecurityTokenManager*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials.CreateSecurityTokenManager*) method to return an instance of the customized [System.ServiceModel.ClientCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager) class that is defined in the next step.

     [c_FourCerts#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs.md)
     [c_FourCerts#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb.md)

2. Define a new client security token manager that inherits from the [System.ServiceModel.ClientCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager) class. Override the [System.ServiceModel.ClientCredentialsSecurityTokenManager.CreateSecurityTokenProvider*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager.CreateSecurityTokenProvider*) method to create an appropriate security token provider. The `requirement` parameter (a [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement)) provides the message direction and key usage.

     [c_FourCerts#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs.md)
     [c_FourCerts#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb.md)

3. Define a new service credentials class that inherits from the [System.ServiceModel.Description.ServiceCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials) class. Implement four new properties to allow multiple certificates specification: `ClientSigningCertificate`, `ClientEncryptingCertificate`, `ServiceSigningCertificate`, and `ServiceEncryptingCertificate`. Also override the [System.ServiceModel.Description.ServiceCredentials.CreateSecurityTokenManager*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials.CreateSecurityTokenManager*) method to return an instance of the customized [System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager) class that is defined in the next step.

     [c_FourCerts#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs.md)
     [c_FourCerts#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb.md)

4. Define a new service security token manager that inherits from the [System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager) class. Override the [System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager.CreateSecurityTokenProvider*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager.CreateSecurityTokenProvider*) method to create an appropriate security token provider given the passed-in message direction and key usage.

     [c_FourCerts#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs.md)
     [c_FourCerts#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb.md)

### To use multiple certificates on the client

1. Create a custom binding. The security binding element must operate in duplex mode to allow different security token providers to be present for requests and responses. One way to do this is to use a duplex-capable transport or to use the [System.ServiceModel.Channels.CompositeDuplexBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CompositeDuplexBindingElement) as shown in the following code. Link the customized [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier) which is defined in the next step to the security binding element. Replace the default client credentials with the customized client credentials previously created.

     [c_FourCerts#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs.md)
     [c_FourCerts#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb.md)

2. Define a custom [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier). The service has multiple identities because different certificates are used to encrypt the request and to sign the response.

    > **Note:**
    > In the following sample, the provided custom identity verifier does not perform any endpoint identity checking for demonstration purposes. This is not recommended practice for production code.

     [c_FourCerts#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs.md)
     [c_FourCerts#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb.md)

### To use multiple certificates on the service

1. Create a custom binding. The security binding element must operate in a duplex mode to allow different security token providers to be present for requests and responses. As with the client, use a duplex-capable transport or use [System.ServiceModel.Channels.CompositeDuplexBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CompositeDuplexBindingElement) as shown in the following code. Replace the default service credentials with the customized service credentials previously created.

     [c_FourCerts#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_fourcerts/cs/source.cs.md)
     [c_FourCerts#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_fourcerts/vb/source.vb.md)

## See also

- [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials)
- [System.ServiceModel.Description.ServiceCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials)
- [System.ServiceModel.ClientCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager)
- [System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.ServiceCredentialsSecurityTokenManager)
- [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier)
- [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md)
