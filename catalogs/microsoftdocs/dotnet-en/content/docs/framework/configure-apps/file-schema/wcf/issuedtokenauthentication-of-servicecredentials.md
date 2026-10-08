---
description: "Learn more about: <issuedTokenAuthentication> of <serviceCredentials>"
title: "<issuedTokenAuthentication> of <serviceCredentials>"
ms.date: "03/30/2017"
ms.assetid: 5c2e288f-f603-4d13-839a-0fd6d1981bec
---
# `<issuedTokenAuthentication>` of `<serviceCredentials>`

Specifies a custom token issued as a service credential.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.serviceModel>`](system-servicemodel.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<behaviors>`](behaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<serviceBehaviors>`](servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<behavior>`](behavior-of-servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<serviceCredentials>`](servicecredentials.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<issuedTokenAuthentication>`

## Syntax

```xml
<issuedTokenAuthentication allowUntrustedRsaIssuers="Boolean"
                           audienceUriMode="Always/BearerKeyOnly/Never"
                           customCertificateValidatorType="namespace.typeName, [,AssemblyName] [,Version=version number] [,Culture=culture] [,PublicKeyToken=token]"
                           certificateValidationMode="ChainTrust/None/PeerTrust/PeerOrChainTrust/Custom"
                           revocationMode="NoCheck/Online/Offline"
                           samlSerializer="String"
                           trustedStoreLocation="CurrentUser/LocalMachine">
  <allowedAudienceUris>
    <add allowedAudienceUri="String" />
  </allowedAudienceUris>
  <knownCertificates>
    <add findValue="String"
         storeLocation="CurrentUser/LocalMachine"
         storeName=" CurrentUser/LocalMachine"
         x509FindType="FindByThumbprint/FindBySubjectName/FindBySubjectDistinguishedName/FindByIssuerName/FindByIssuerDistinguishedName/FindBySerialNumber/FindByTimeValid/FindByTimeNotYetValid/FindBySerialNumber/FindByTimeExpired/FindByTemplateName/FindByApplicationPolicy/FindByCertificatePolicy/FindByExtension/FindByKeyUsage/FindBySubjectKeyIdentifier" />
  </knownCertificates>
</issuedTokenAuthentication>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements

### Attributes

| Attribute | Description |
| --- | --- |
| `allowedAudienceUris` | Gets the set of target URIs for which the [System.IdentityModel.Tokens.SamlSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlSecurityToken) security token can be targeted for in order to be considered valid by a [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator) instance. For more information on using this attribute, see [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AllowedAudienceUris*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AllowedAudienceUris*). |
| `allowUntrustedRsaIssuers` | A Boolean value that specifies if untrusted RSA certificate issuers are allowed.<br /><br /> Certificates are signed by certification authorities (CAs) to verify authenticity. An untrusted issuer is a CA that is not specified to be trusted to sign certificates. |
| `audienceUriMode` | Gets a value that specifies whether the [System.IdentityModel.Tokens.SamlSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlSecurityToken) security token's [System.IdentityModel.Tokens.SamlAudienceRestrictionCondition](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlAudienceRestrictionCondition) should be validated. This value is of type [System.IdentityModel.Selectors.AudienceUriMode](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.AudienceUriMode). For more information on using this attribute, see [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AudienceUriMode*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AudienceUriMode*). |
| `certificateValidationMode` | Sets the certificate validation mode. One of the valid values of [System.ServiceModel.Security.X509CertificateValidationMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateValidationMode). If set to `Custom`, then a `customCertificateValidator` must also be supplied. The default is `ChainTrust`. |
| `customCertificateValidatorType` | Optional string. A type and assembly used to validate a custom type. This attribute must be set when `certificateValidationMode` is set to `Custom`. |
| `revocationMode` | Sets the revocation mode that specifies whether a revocation check occurs, and if it is performed online or offline. This attribute is of type [System.Security.Cryptography.X509Certificates.X509RevocationMode](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509RevocationMode). |
| `samlSerializer` | An optional string attribute that specifies the type of SamlSerializer that is used for the service credential. The default is an empty string. |
| `trustedStoreLocation` | Optional enumeration. One of the two system store locations: `LocalMachine` or `CurrentUser`. |

### Child Elements

| Element | Description |
| --- | --- |
| `knownCertificates` | Specifies a collection of [System.ServiceModel.Configuration.X509CertificateTrustedIssuerElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.X509CertificateTrustedIssuerElement) elements that specifies trusted issuers for the service credential. |

### Parent Elements

| Element | Description |
| --- | --- |
| [\<serviceCredentials>](servicecredentials.md) | Specifies the credential to be used in authenticating the service, and the client credential validation-related settings. |

## Remarks

 The issued token scenario has three stages. In the first stage, a client trying to access a service is referred to a *secure token service*. The secure token service then authenticates the client and subsequently issues the client a token, typically a Security Assertions Markup Language (SAML) token. The client then returns to the service with the token. The service examines the token for data that allows the service to authenticate the token and therefore the client. To authenticate the token, the certificate the secure token service uses must be known to the service.

 This element is the repository for any such secure token service certificates. To add certificates, use the [\<knownCertificates>](knowncertificates.md). Insert an [\<add>](add-of-knowncertificates.md) for each certificate, as shown in the following example.

```xml
<issuedTokenAuthentication>
  <knownCertificates>
    <add findValue="www.contoso.com"
         storeLocation="LocalMachine"
         storeName="My"
         X509FindType="FindBySubjectName" />
  </knownCertificates>
</issuedTokenAuthentication>
```

 By default, the certificates must be obtained from a secure token service. These "known" certificates ensure that only legitimate clients can access a service.

 For more information on using this configuration element, see [How to: Configure Credentials on a Federation Service](../../../wcf/feature-details/how-to-configure-credentials-on-a-federation-service.md).

## See also

- [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator)
- [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AllowedAudienceUris*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AllowedAudienceUris*)
- [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AudienceUriMode*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AudienceUriMode*)
- [System.ServiceModel.Configuration.ServiceCredentialsElement.IssuedTokenAuthentication](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.ServiceCredentialsElement.IssuedTokenAuthentication)
- [System.ServiceModel.Configuration.IssuedTokenServiceElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.IssuedTokenServiceElement)
- [System.ServiceModel.Description.ServiceCredentials.IssuedTokenAuthentication](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials.IssuedTokenAuthentication)
- [System.ServiceModel.Security.IssuedTokenServiceCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IssuedTokenServiceCredential)
- [Securing Services and Clients](../../../wcf/feature-details/securing-services-and-clients.md)
- [How to: Configure Credentials on a Federation Service](../../../wcf/feature-details/how-to-configure-credentials-on-a-federation-service.md)
