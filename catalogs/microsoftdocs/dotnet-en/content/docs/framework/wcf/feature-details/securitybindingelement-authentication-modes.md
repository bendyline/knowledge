---
description: "Learn more about: SecurityBindingElement Authentication Modes"
title: "SecurityBindingElement Authentication Modes"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 12300bf4-c730-4405-9f65-d286f68b5a43
---
# SecurityBindingElement Authentication Modes

Windows Communication Foundation (WCF) provides several modes by which clients and services authenticate to one another. You can create security binding elements for these authentication modes by using static methods on the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) class or through configuration. This topic briefly describes the 18 authentication modes.

 For an example of using the element for one of the authentication modes, see [How to: Create a SecurityBindingElement for a Specified Authentication Mode](how-to-create-a-securitybindingelement-for-a-specified-authentication-mode.md).

## Basic Configuration Programming

 The following procedure describes how to set the authentication mode in a configuration file.

#### To set the authentication mode in configuration

1. To the [\<bindings>](../../configure-apps/file-schema/wcf/bindings.md) element, add a [\<customBinding>](../../configure-apps/file-schema/wcf/custombinding.md).

2. As a child element, add a [\<binding>](../../configure-apps/file-schema/wcf/bindings.md) element to the `<customBinding>` element.

3. Add a `<security>` element to the `<binding>` element.

4. Set the `authenticationMode` attribute to one of the values described below. For example, the following code sets the mode to `AnonymousForCertificate`.

    ```xml
    <bindings>
      <customBinding>
        <binding name="SecureCustomBinding">
         <security authenticationMode ="AnonymousForCertificate" />
        </binding>
      </customBinding>
    </bindings>
    ```

#### To set the mode programmatically

1. Determine the return type, which can be one of the following: [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement), [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement), [System.ServiceModel.Channels.AsymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AsymmetricSecurityBindingElement), or [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement).

2. Call the appropriate static method of the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) class. For example, the following code calls the [System.ServiceModel.Channels.SecurityBindingElement.CreateAnonymousForCertificateBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateAnonymousForCertificateBindingElement*) method.

     [c_CustomBindingsAuthMode#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombindingsauthmode/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombindingsauthmode/cs/source.cs.md)
     [c_CustomBindingsAuthMode#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_custombindingsauthmode/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_custombindingsauthmode/vb/source.vb.md)

3. Use the binding element to create the custom binding. For more information, see [Custom Bindings](../extending/custom-bindings.md).

## Mode Descriptions

### AnonymousForCertificate

 With this authentication mode, the client is anonymous and the service is authenticated using an X.509 certificate. The security binding element is a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateAnonymousForCertificateBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateAnonymousForCertificateBindingElement*) method. Alternatively, set the `authenticationMode` attribute of the `<security>` element to `AnonymousForCertificate`.

### AnonymousForSslNegotiated

 With this authentication mode, the client is anonymous and the service is authenticated using an X.509 certificate that is negotiated at runtime. The security binding element is a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateSslNegotiationBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateSslNegotiationBindingElement*) method when a value of `false` is passed for the first parameter. Alternatively, set the `authenticationMode` attribute to `AnonymousForSslNegotiated`.

### CertificateOverTransport

 With this authentication mode, the client authenticates using an X.509 certificate that appears at the SOAP layer as an endorsing supporting token; that is, a token that signs the message signature. The service is authenticated using an X.509 certificate at the transport layer. The security binding element is a [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement) returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateCertificateOverTransportBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateCertificateOverTransportBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `CertificateOverTransport`.

### IssuedToken

 With this authentication mode, the client does not authenticate to the service, as such; instead, the client authenticates to a security token service and receives a SAML token, which it then presents to the server to prove its knowledge of a shared key. The service is not authenticated to the client, as such, but the security token service encrypts the shared key as part of the issued token so that only the service can decrypt the key. The security binding element is a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `IssuedToken`.

### IssuedTokenForCertificate

 With this authentication mode, the client does not authenticate to the service, as such; instead, the client authenticates to a security token service and receives a SAML token, which it then presents to the server to prove its knowledge of a shared key. The issued token appears at the SOAP layer as either an endorsing supporting token or a bearer token; that is, a token that signs the message signature. The service authenticates to the client using an X.509 certificate. The security binding element is a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenForCertificateBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenForCertificateBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `IssuedTokenForCertificate`.

### IssuedTokenForSslNegotiated

 With this authentication mode, the client does not authenticate to the service, as such; instead, the client authenticates to a security token service and receives a SAML token, which it then presents to the server to prove its knowledge of a shared key. The issued token appears at the SOAP layer as either an endorsing supporting token or a bearer token; that is, a token that signs the message signature. The service is authenticated using an X.509 certificate. The security binding element is a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenForSslBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenForSslBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `IssuedTokenForSslNegotiated`.

### IssuedTokenOverTransport

 With this authentication mode, the client does not authenticate to the service, as such; instead, the client authenticates to a security token service and receives a SAML token, which it then presents to the server to prove its knowledge of a shared key. The issued token appears at the SOAP layer as either an endorsing supporting token or a bearer token; that is, a token that signs the message signature. The service is authenticated using an X.509 certificate at the transport layer. The security binding element is a `TransportSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenOverTransportBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateIssuedTokenOverTransportBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `IssuedTokenOverTransport`.

### Kerberos

 With this authentication mode, the client authenticates to the service using a Kerberos ticket. That same ticket also provides server authentication. The security binding element is a `SymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateKerberosBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateKerberosBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `Kerberos`.

> **Note:**
> In order to use this authentication mode, the service account must be associated with a service principal name (SPN). To do this, run the service under the NETWORK SERVICE account or the LOCAL SYSTEM account. Alternatively, use the SetSpn.exe tool to create an SPN for the service account. In either case, the client must use the correct SPN in the [\<servicePrincipalName>](../../configure-apps/file-schema/wcf/serviceprincipalname.md) element, or by using the [System.ServiceModel.EndpointAddress](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointAddress) constructor. For more information, see [Service Identity and Authentication](service-identity-and-authentication.md).

> **Note:**
> When the `Kerberos` authentication mode is used, the [System.Security.Principal.TokenImpersonationLevel.Anonymous](https://learn.microsoft.com/search/?terms=System.Security.Principal.TokenImpersonationLevel.Anonymous) and [System.Security.Principal.TokenImpersonationLevel.Delegation](https://learn.microsoft.com/search/?terms=System.Security.Principal.TokenImpersonationLevel.Delegation) impersonation levels are not supported.

### KerberosOverTransport

 With this authentication mode, the client authenticates to the service using a Kerberos ticket. The Kerberos token appears at the SOAP layer as an endorsing supporting token; that is, a token that signs the message signature. The service is authenticated using an X.509 certificate at the transport layer. The security binding element is a `TransportSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateKerberosOverTransportBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateKerberosOverTransportBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `KerberosOverTransport`.

> **Note:**
> In order to use this authentication mode, the service account must be associated with an SPN. To do this, run the service under the NETWORK SERVICE account or the LOCAL SYSTEM account. Alternatively, use the SetSpn.exe tool to create an SPN for the service account. In either case, the client must use the correct SPN in the [\<servicePrincipalName>](../../configure-apps/file-schema/wcf/serviceprincipalname.md) element, or by using the [System.ServiceModel.EndpointAddress](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointAddress) constructor. For more information, see [Service Identity and Authentication](service-identity-and-authentication.md).

### MutualCertificate

 With this authentication mode, the client authenticates using an X.509 certificate that appears at the SOAP layer as an endorsing supporting token; that is, a token that signs the message signature. The service is also authenticated using an X.509 certificate. The security binding element is a `SymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateMutualCertificateBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateMutualCertificateBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `MutualCertificate`.

### MutualCertificateDuplex

 With this authentication mode, the client authenticates using an X.509 certificate that appears at the SOAP layer as an endorsing supporting token; that is, a token that signs the message signature. The service is also authenticated using an X.509 certificate. The binding is a `AsymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateMutualCertificateDuplexBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateMutualCertificateDuplexBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `MutualCertificateDuplex`.

### MutualSslNegotiated

 With this authentication mode, the client and the service authenticate using X.509 certificates. The security binding element is a `SymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateSslNegotiationBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateSslNegotiationBindingElement*) method when a value of `true` is passed for the first parameter. Alternatively, set the `authenticationMode` attribute to `MutualSslNegotiated`.

### SecureConversation

 The security binding element is a `SymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateSecureConversationBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateSecureConversationBindingElement*) method. This method takes a [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) as a parameter, which is used during initialization to establish the secure session. Alternatively, set the `authenticationMode` attribute to `SecureConversation`.

 If no bootstrap binding is specified, then the `SspiNegotiated` authentication mode is used for bootstrap.

### SspiNegotiation

 With this authentication mode, a negotiation protocol is used to perform client and server authentication. Kerberos is used if possible; otherwise, NT LanMan (NTLM) is used. The security binding element is a `SymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateSspiNegotiationBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateSspiNegotiationBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `SspiNegotiated`.

### SspiNegotiatedOverTransport

 With this authentication mode, a negotiation protocol is used to perform client and server authentication. Kerberos protocol is used if possible; otherwise, NTLM is used. The resulting token appears at the SOAP layer as an endorsing supporting token; that is, a token that signs the message signature. The service is additionally authenticated at the transport layer by an X.509 certificate. The security binding element is a `TransportSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateSspiNegotiationOverTransportBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateSspiNegotiationOverTransportBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `SspiNegotiatedOverTransport`.

### UserNameForCertificate

 With this authentication mode, the client authenticates to the service using a Username Token that appears at the SOAP layer as a signed supporting token; that is, a token that is signed by the message signature. The service authenticates to the client using an X.509 certificate. The security binding element is a `SymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameForCertificateBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameForCertificateBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `UserNameForCertificate`.

 For the `UserNameForCertificate` authentication mode, both the client and service must be using WS-Security 1.1.

### UserNameForSslNegotiated

 With this authentication mode, the client is authenticates using a Username Token which appears at the SOAP layer as a signed supporting token; that is, a token that is signed by the message signature. The service is authenticated using an X.509 certificate. The security binding element is a `SymmetricSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameForSslBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameForSslBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `UserNameForSslNegotiated`.

### UserNameOverTransport

 With this authentication mode, the client authenticates using a Username Token that appears at the SOAP layer as a signed supporting token; that is, a token that is signed by the message signature. The service is authenticated using an X.509 certificate at the transport layer. The security binding element is a `TransportSecurityBindingElement` returned by the [System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameOverTransportBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateUserNameOverTransportBindingElement*) method. Alternatively, set the `authenticationMode` attribute to `UserNameOverTransport`.

## See also

- [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement)
- [How to: Create a SecurityBindingElement for a Specified Authentication Mode](how-to-create-a-securitybindingelement-for-a-specified-authentication-mode.md)
