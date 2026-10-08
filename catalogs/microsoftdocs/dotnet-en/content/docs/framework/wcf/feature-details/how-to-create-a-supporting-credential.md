---
description: "Learn more about: How to: Create a Supporting Credential"
title: "How to: Create a Supporting Credential"
ms.date: "03/30/2017"
ms.assetid: d0952919-8bb4-4978-926c-9cc108f89806
---
# How to: Create a Supporting Credential

It is possible to have a custom security scheme that requires more than one credential. For example, a service may demand from the client not just a user name and password, but also a credential that proves the client is over the age of 18. The second credential is a *supporting credential*. This topic explains how to implement such credentials in an Windows Communication Foundation (WCF) client.

> **Note:**
> The specification for supporting credentials is part of the WS-SecurityPolicy specification. For more information, see [Web Services Security Specifications](https://learn.microsoft.com/previous-versions/dotnet/articles/ms951273\(v=msdn.10\)).

## Supporting Tokens

 In brief, when you use message security, a *primary credential* is always used to secure the message (for example, an X.509 certificate or a Kerberos ticket).

 As defined by the specification, a security binding uses *tokens* to secure the message exchange. A *token* is a representation of a security credential.

 The security binding uses a primary token identified in the security binding policy to create a signature. This signature is referred to as the *message signature*.

 Additional tokens can be specified to augment the claims provided by the token associated with the message signature.

## Endorsing, Signing, and Encrypting

 A supporting credential results in a *supporting token* transmitted inside the message. The WS-SecurityPolicy specification defines four ways to attach a supporting token to the message, as described in the following table.

| Purpose | Description |
| --- | --- |
| Signed | The supporting token is included in the security header and is signed by the message signature. |
| Endorsing | An *endorsing token* signs the message signature. |
| Signed and Endorsing | Signed, endorsing tokens sign the entire `ds:Signature` element produced from the message signature and are themselves signed by that message signature; that is, both tokens (the token used for the message signature and the signed endorsing token) sign each other. |
| Signed and Encrypting | Signed, encrypted supporting tokens are signed supporting tokens that are also encrypted when they appear in the `wsse:SecurityHeader`. |

## Programming Supporting Credentials

 To create a service that uses supporting tokens you must create a [\<customBinding>](../../configure-apps/file-schema/wcf/custombinding.md). (For more information, see [How to: Create a Custom Binding Using the SecurityBindingElement](how-to-create-a-custom-binding-using-the-securitybindingelement.md).)

 The first step when creating a custom binding is to create a security binding element, which can be one of three types:

- [System.ServiceModel.Channels.AsymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AsymmetricSecurityBindingElement)

- [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement)

- [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement)

 All classes inherit from the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement), which includes four relevant properties:

- [System.ServiceModel.Channels.SecurityBindingElement.EndpointSupportingTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.EndpointSupportingTokenParameters)

- [System.ServiceModel.Channels.SecurityBindingElement.OperationSupportingTokenParameters*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.OperationSupportingTokenParameters*)

- [System.ServiceModel.Channels.SecurityBindingElement.OptionalEndpointSupportingTokenParameters*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.OptionalEndpointSupportingTokenParameters*)

- [System.ServiceModel.Channels.SecurityBindingElement.OptionalOperationSupportingTokenParameters*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.OptionalOperationSupportingTokenParameters*)

#### Scopes

 Two scopes exist for supporting credentials:

- *Endpoint supporting tokens* support all operations of an endpoint. That is, the credential that the supporting token represents can be used whenever any endpoint operations are invoked.

- *Operation supporting tokens* support only a specific endpoint operation.

 As indicated by the property names, supporting credentials can be either required or optional. That is, if the supporting credential is used if it is present, although it is not necessary, but the authentication will not fail if it is not present.

## Procedures

#### To create a custom binding that includes supporting credentials

1. Create a security binding element. The example below creates a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) with the `UserNameForCertificate` authentication mode. Use the [System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameForCertificateBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameForCertificateBindingElement*) method.

2. Add the supporting parameter to the collection of types returned by the appropriate property (`Endorsing`, `Signed`, `SignedEncrypted`, or `SignedEndorsed`). The types in the [System.ServiceModel.Security.Tokens](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens) namespace include commonly used types, such as the [System.ServiceModel.Security.Tokens.X509SecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.X509SecurityTokenParameters).

## Example

### Description

 The following example creates an instance of the [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) and adds an instance of the [System.ServiceModel.Security.Tokens.KerberosSecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.KerberosSecurityTokenParameters) class to the collection the Endorsing property returned.

### Code

 [c_SupportingCredential#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_supportingcredential/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_supportingcredential/cs/source.cs.md)

## See also

- [How to: Create a Custom Binding Using the SecurityBindingElement](how-to-create-a-custom-binding-using-the-securitybindingelement.md)
