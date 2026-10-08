---
description: "Learn more about: <add> of <allowedAudienceUris>"
title: "<add> of <allowedAudienceUris>"
ms.date: "03/30/2017"
ms.assetid: 4e7b7637-e0ea-4a91-988f-6b6ef28d9fc3
---
# `<add>` of `<allowedAudienceUris>`

Adds a target Uri for which the [System.IdentityModel.Tokens.SamlSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlSecurityToken) security token can be targeted for in order to be considered valid by a [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator) instance.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.serviceModel>`](system-servicemodel.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<behaviors>`](behaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<serviceBehaviors>`](servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<behavior>`](behavior-of-servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<serviceCredentials>`](servicecredentials.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<issuedTokenAuthentication>`](issuedtokenauthentication-of-servicecredentials.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<allowedAudienceUris>`](allowedaudienceuris.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<add>`

## Syntax

```xml
<allowedAudienceUris>
  <add allowedAudienceUri="String" />
</allowedAudienceUris>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| allowedAudienceUri | A string that contains a target Uri for which the [System.IdentityModel.Tokens.SamlSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlSecurityToken) security token can be targeted for in order to be considered valid by a [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator) instance. |

### Child Elements

 None.

### Parent Elements

| Element | Description |
| --- | --- |
| [\<allowedAudienceUris>](allowedaudienceuris.md) | Represents a collection of target URIs for which the [System.IdentityModel.Tokens.SamlSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlSecurityToken) security token can be targeted for in order to be considered valid by a [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator) instance. |

## Remarks

 You should use this collection in a federated application that utilizes a security token service (STS) that issues [System.IdentityModel.Tokens.SamlSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlSecurityToken) security tokens. When the STS issues the security token, it can specify the URI of the Web services for which the security token is intended by adding a [System.IdentityModel.Tokens.SamlAudienceRestrictionCondition](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlAudienceRestrictionCondition) to the security token. That allows the [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator) for the recipient Web service to verify that the issued security token is intended for this Web service by specifying that this check should happen by doing the following:

- Set the `audienceUriMode` attribute of `<issuedTokenAuthentication>` to [System.IdentityModel.Selectors.AudienceUriMode.Always](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.AudienceUriMode.Always) or [System.IdentityModel.Selectors.AudienceUriMode.BearerKeyOnly](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.AudienceUriMode.BearerKeyOnly).

- Specify the set of valid URIs, by adding the URIs to this collection.

 For more information, see [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator).

 For more information on using this configuration element, see [How to: Configure Credentials on a Federation Service](../../../wcf/feature-details/how-to-configure-credentials-on-a-federation-service.md).

## See also

- [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator)
- [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AllowedAudienceUris*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AllowedAudienceUris*)
- [System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AudienceUriMode*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SamlSecurityTokenAuthenticator.AudienceUriMode*)
- [System.ServiceModel.Configuration.IssuedTokenServiceElement.AllowedAudienceUris*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.IssuedTokenServiceElement.AllowedAudienceUris*)
- [System.ServiceModel.Configuration.AllowedAudienceUriElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.AllowedAudienceUriElementCollection)
- [System.ServiceModel.Configuration.AllowedAudienceUriElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.AllowedAudienceUriElement)
- [System.ServiceModel.Security.IssuedTokenServiceCredential.AllowedAudienceUris*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IssuedTokenServiceCredential.AllowedAudienceUris*)
- [\<allowedAudienceUris>](allowedaudienceuris.md)
- [\<issuedTokenAuthentication>](issuedtokenauthentication-of-servicecredentials.md)
- [Security Behaviors](../../../wcf/feature-details/security-behaviors-in-wcf.md)
- [Securing Services and Clients](../../../wcf/feature-details/securing-services-and-clients.md)
- [How to: Configure Credentials on a Federation Service](../../../wcf/feature-details/how-to-configure-credentials-on-a-federation-service.md)
