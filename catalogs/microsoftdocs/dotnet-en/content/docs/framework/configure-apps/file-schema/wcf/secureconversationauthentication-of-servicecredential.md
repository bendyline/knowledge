---
description: "Learn more about: <secureConversationAuthentication> of <serviceCredential>"
title: "<secureConversationAuthentication> of <serviceCredential>"
ms.date: "03/30/2017"
ms.assetid: 0bd3fac7-befd-4a45-ba51-c200b33be0fd
---
# `<secureConversationAuthentication>` of `<serviceCredential>`

Specifies the settings for a secure conversation service.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.serviceModel>`](system-servicemodel.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<behaviors>`](behaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<serviceBehaviors>`](servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<behavior>`](behavior-of-servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<serviceCredentials>`](servicecredentials.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<secureConversationAuthentication>`

## Syntax

```xml
<secureConversationAuthentication securityStateEncoderType="String" />
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| `securityStateEncoderType` | A string that specifies the type of [System.ServiceModel.Security.SecurityStateEncoder](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.SecurityStateEncoder) to be used. |

### Child Elements

 None.

### Parent Elements

| Element | Description |
| --- | --- |
| [\<serviceCredentials>](servicecredentials.md) | Specifies the credential to be used in authenticating the service, and the client credential validation-related settings. |

## Remarks

 Use this configuration element to specify a list of known claim types for the Security Context Token (SCT) cookies serialization, as well as an encoder to encode and secure cookies information. For more information on SCT, see [System.ServiceModel.Security.SecureConversationServiceCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.SecureConversationServiceCredential).

## See also

- [System.ServiceModel.Configuration.SecureConversationServiceElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.SecureConversationServiceElement)
- [System.ServiceModel.Configuration.ServiceCredentialsElement.SecureConversationAuthentication*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.ServiceCredentialsElement.SecureConversationAuthentication*)
- [System.ServiceModel.Description.ServiceCredentials.SecureConversationAuthentication*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceCredentials.SecureConversationAuthentication*)
- [System.ServiceModel.Security.SecureConversationServiceCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.SecureConversationServiceCredential)
