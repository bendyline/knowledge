---
title: "How to: Create a Custom Token"
description: Learn how to create a custom security token in WCF using the SecurityToken class and how to integrate it with a security token provider and an authenticator.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "SecurityTokenParameters class"
  - "security [WCF], creating custom tokens"
  - "WSSecurityTokenSerializer class"
  - "SecurityToken class"
ms.assetid: 6d892973-1558-4115-a9e1-696777776125
---
# How to: Create a Custom Token

This topic shows how to create a custom security token using the [System.IdentityModel.Tokens.SecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken) class, and how to integrate it with a custom security token provider and authenticator. For a complete code example see the [Custom Token](../samples/custom-token.md) sample.

 A *security token* is essentially an XML element that is used by the Windows Communication Foundation (WCF) security framework to represent claims about a sender inside the SOAP message. WCF security provides various tokens for system-provided authentication modes. Examples include an X.509 certificate security token represented by the [System.IdentityModel.Tokens.X509SecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.X509SecurityToken) class or a Username security token represented by the [System.IdentityModel.Tokens.UserNameSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.UserNameSecurityToken) class.

 Sometimes an authentication mode or credential is not supported by the provided types. In that case, it is necessary to create a custom security token to provide an XML representation of the custom credential inside the SOAP message.

 The following procedures show how to create a custom security token and how to integrate it with the WCF security infrastructure. This topic creates a credit card token that is used to pass information about the client's credit card to the server.

 For more information about custom credentials and security token manager, see [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md).

 See the [System.IdentityModel.Tokens](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens) namespace for more classes that represent security tokens.

## Procedures

 A client application must be provided with a way to specify credit card information for the security infrastructure. This information is made available to the application by a custom client credentials class. The first step is to create a class to represent the credit card information for custom client credentials.

#### To create a class that represents credit card information inside client credentials

1. Define a new class that represents the credit card information for the application. The following example names the class `CreditCardInfo`.

2. Add appropriate properties to the class to allow an application set the necessary information required for the custom token. In this example, the class has three properties: `CardNumber`, `CardIssuer`, and `ExpirationDate`.

     [c_CustomToken#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

 Next, a class that represents the custom security token must be created. This class is used by the security token provider, authenticator, and serializer classes to pass information about the security token to and from the WCF security infrastructure.

#### To create a custom security token class

1. Define a new class derived from the [System.IdentityModel.Tokens.SecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken) class. This example creates a class named `CreditCardToken`.

2. Override the [System.IdentityModel.Tokens.SecurityToken.Id](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken.Id) property. This property is used to get the local identifier of the security token that is used to point to the security token XML representation from other elements inside the SOAP message. In this example, a token identifier can be either passed to it as a constructor parameter or a new random one is generated every time a security token instance is created.

3. Implement the [System.IdentityModel.Tokens.SecurityToken.SecurityKeys](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken.SecurityKeys) property. This property returns a collection of security keys that the security token instance represents. Such keys can be used by WCF to sign or encrypt parts of the SOAP message. In this example, the credit card security token cannot contain any security keys; therefore, the implementation always returns an empty collection.

4. Override the [System.IdentityModel.Tokens.SecurityToken.ValidFrom*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken.ValidFrom*) and [System.IdentityModel.Tokens.SecurityToken.ValidTo](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken.ValidTo) properties. These properties are used by WCF to determine the validity of the security token instance. In this example, the credit card security token has only an expiration date, so the `ValidFrom` property returns a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) that represents the date and time of the instance creation.

     [c_CustomToken#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

 When a new security token type is created, it requires an implementation of the [System.ServiceModel.Security.Tokens.SecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters) class. The implementation is used in the security binding element configuration to represent the new token type. The security token parameters class serves as a template that is used to match the actual security token instance to when a message is processed. The template provides additional properties that an application can use to specify criteria that the security token must match to be used or authenticated. The following example does not add any additional properties, so only the security token type is matched when the WCF infrastructure searches for a security token instance to use or to validate.

#### To create a custom security token parameters class

1. Define a new class derived from the [System.ServiceModel.Security.Tokens.SecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters) class.

2. Implement the [System.ServiceModel.Security.Tokens.SecurityTokenParameters.CloneCore*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters.CloneCore*) method. Copy all internal fields defined in your class, if any. This example does not define any additional fields.

3. Implement the [System.ServiceModel.Security.Tokens.SecurityTokenParameters.SupportsClientAuthentication*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters.SupportsClientAuthentication*) read-only property. This property returns `true` if the security token type represented by this class can be used to authenticate a client to a service. In this example, the credit card security token can be used to authenticate a client to a service.

4. Implement the [System.ServiceModel.Security.Tokens.SecurityTokenParameters.SupportsServerAuthentication*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters.SupportsServerAuthentication*) read-only property. This property returns `true` if the security token type represented by this class can be used to authenticate a service to a client. In this example, the credit card security token cannot be used to authenticate a service to a client.

5. Implement the [System.ServiceModel.Security.Tokens.SecurityTokenParameters.SupportsClientWindowsIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters.SupportsClientWindowsIdentity*) read-only property. This property returns `true` if the security token type represented by this class can be mapped to a Windows account. If so, the authentication result is represented by a [System.Security.Principal.WindowsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Principal.WindowsIdentity) class instance. In this example, the token cannot be mapped to a Windows account.

6. Implement the [System.ServiceModel.Security.Tokens.SecurityTokenParameters.CreateKeyIdentifierClause%28System.IdentityModel.Tokens.SecurityToken%2CSystem.ServiceModel.Security.Tokens.SecurityTokenReferenceStyle%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters.CreateKeyIdentifierClause%2528System.IdentityModel.Tokens.SecurityToken%252CSystem.ServiceModel.Security.Tokens.SecurityTokenReferenceStyle%2529) method. This method is called by WCF security framework when it requires a reference to the security token instance represented by this security token parameters class. Both the actual security token instance and [System.ServiceModel.Security.Tokens.SecurityTokenReferenceStyle](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenReferenceStyle) that specifies the type of the reference that is being requested are passed to this method as arguments. In this example, only internal references are supported by the credit card security token. The [System.IdentityModel.Tokens.SecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken) class has functionality to create internal references; therefore, the implementation does not require additional code.

7. Implement the [System.ServiceModel.Security.Tokens.SecurityTokenParameters.InitializeSecurityTokenRequirement%28System.IdentityModel.Selectors.SecurityTokenRequirement%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters.InitializeSecurityTokenRequirement%2528System.IdentityModel.Selectors.SecurityTokenRequirement%2529) method. This method is called by WCF to convert the security token parameters class instance into an instance of the [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement) class. The result is used by security token providers to create the appropriate security token instance.

     [c_CustomToken#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

 Security tokens are transmitted inside SOAP messages, which requires a translation mechanism between the in-memory security token representation and the on-the-wire representation. WCF uses a security token serializer to accomplish this task. Every custom token must be accompanied by a custom security token serializer that can serialize and deserialize the custom security token from the SOAP message.

> **Note:**
> Derived keys are enabled by default. If you create a custom security token and use it as the primary token, WCF derives a key from it. While doing so, it calls the custom security token serializer to write the [System.IdentityModel.Tokens.SecurityKeyIdentifierClause](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityKeyIdentifierClause) for the custom security token while serializing the `DerivedKeyToken` to the wire. On the receiving end, when deserializing the token off the wire, the `DerivedKeyToken` serializer expects a `SecurityTokenReference` element as the top-level child under itself. If the custom security token serializer did not add a `SecurityTokenReference` element while serializing its clause type, an exception is thrown.

#### To create a custom security token serializer

1. Define a new class derived from the [System.ServiceModel.Security.WSSecurityTokenSerializer](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.WSSecurityTokenSerializer) class.

2. Override the [System.ServiceModel.Security.WSSecurityTokenSerializer.CanReadTokenCore%28System.Xml.XmlReader%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.WSSecurityTokenSerializer.CanReadTokenCore%2528System.Xml.XmlReader%2529) method, which relies on an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) to read the XML stream. The method returns `true` if the serializer implementation can deserialize the security token based given its current element. In this example, this method checks whether the XML reader's current XML element has the correct element name and namespace. If it does not, it calls the base class implementation of this method to handle the XML element.

3. Override the [System.ServiceModel.Security.WSSecurityTokenSerializer.ReadTokenCore%28System.Xml.XmlReader%2CSystem.IdentityModel.Selectors.SecurityTokenResolver%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.WSSecurityTokenSerializer.ReadTokenCore%2528System.Xml.XmlReader%252CSystem.IdentityModel.Selectors.SecurityTokenResolver%2529) method. This method reads the XML content of the security token and constructs the appropriate in-memory representation for it. If it does not recognize the XML element on which the passed-in XML reader is standing, it calls the base class implementation to process the system-provided token types.

4. Override the [System.ServiceModel.Security.WSSecurityTokenSerializer.CanWriteTokenCore%28System.IdentityModel.Tokens.SecurityToken%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.WSSecurityTokenSerializer.CanWriteTokenCore%2528System.IdentityModel.Tokens.SecurityToken%2529) method. This method returns `true` if it can convert the in-memory token representation (passed in as an argument) to the XML representation. If it cannot convert, it calls the base class implementation.

5. Override the [System.ServiceModel.Security.WSSecurityTokenSerializer.WriteTokenCore%28System.Xml.XmlWriter%2CSystem.IdentityModel.Tokens.SecurityToken%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.WSSecurityTokenSerializer.WriteTokenCore%2528System.Xml.XmlWriter%252CSystem.IdentityModel.Tokens.SecurityToken%2529) method. This method converts an in-memory security token representation into an XML representation. If the method cannot convert, it calls the base class implementation.

     [c_CustomToken#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

 After completing the four previous procedures, integrate the custom security token with the security token provider, authenticator, manager, and client and service credentials.

#### To integrate the custom security token with a security token provider

1. The security token provider creates, modifies (if necessary), and returns an instance of the token. To create a custom provider for the custom security token, create a class that inherits from the [System.IdentityModel.Selectors.SecurityTokenProvider](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider) class. The following example overrides the [System.IdentityModel.Selectors.SecurityTokenProvider.GetTokenCore*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider.GetTokenCore*) method to return an instance of the `CreditCardToken`. For more information about custom security token providers, see [How to: Create a Custom Security Token Provider](how-to-create-a-custom-security-token-provider.md).

     [c_CustomToken#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

#### To integrate the custom security token with a security token authenticator

1. The security token authenticator validates the content of the security token when it is extracted from the message. To create a custom authenticator for the custom security token, create a class that inherits from the [System.IdentityModel.Selectors.SecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator) class. The following example overrides the [System.IdentityModel.Selectors.SecurityTokenAuthenticator.ValidateTokenCore*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator.ValidateTokenCore*) method. For more information about custom security token authenticators, see [How to: Create a Custom Security Token Authenticator](how-to-create-a-custom-security-token-authenticator.md).

     [c_CustomToken#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

     [c_CustomToken#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#12 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

#### To integrate the custom security token with a security token manager

1. The security token manager creates the appropriate token provider, security authenticator, and token serializer instances. To create a custom token manager, create a class that inherits from the [System.ServiceModel.ClientCredentialsSecurityTokenManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientCredentialsSecurityTokenManager) class. The primary methods of the class use a [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement) to create the appropriate provider and client or service credentials. For more information about custom security token managers, see [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md).

     [c_CustomToken#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

     [c_CustomToken#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

#### To integrate the custom security token with custom client and service credentials

1. The custom client and service credentials must be added to provide an API for the application to allow specifying custom token information that is used by the custom security token infrastructure created previously to provide and authenticate the custom security token content. The following samples show how this can be done. For more information about custom client and service credentials, see [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md).

     [c_CustomToken#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

     [c_customToken#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_customToken#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

 The custom security token parameters class created previously is used to tell the WCF security framework that a custom security token must be used when communicating with a service. The following procedure shows how this can be done.

#### To integrate the custom security token with the binding

1. The custom security token parameters class must be specified in one of the token parameters collections that are exposed on the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) class. The following example uses the collection returned by `SignedEncrypted`. The code adds the credit card custom token to every message sent from the client to the service with its content automatically signed and encrypted.

     [c_CustomToken#13 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs#13)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtoken/cs/source.cs.md)
     [c_CustomToken#13 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb#13)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtoken/vb/source.vb.md)

 This topic shows the various pieces of code necessary to implement and use a custom token. To see a complete example of how all these pieces of code fit together see, [Custom Token](../samples/custom-token.md).

## See also

- [System.IdentityModel.Tokens.SecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityToken)
- [System.ServiceModel.Security.Tokens.SecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters)
- [System.ServiceModel.Security.WSSecurityTokenSerializer](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.WSSecurityTokenSerializer)
- [System.IdentityModel.Selectors.SecurityTokenProvider](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenProvider)
- [System.IdentityModel.Selectors.SecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator)
- [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy)
- [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement)
- [System.IdentityModel.Selectors.SecurityTokenManager](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager)
- [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials)
- [System.ServiceModel.Description.ServiceCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials)
- [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement)
- [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md)
- [How to: Create a Custom Security Token Authenticator](how-to-create-a-custom-security-token-authenticator.md)
- [How to: Create a Custom Security Token Provider](how-to-create-a-custom-security-token-provider.md)
