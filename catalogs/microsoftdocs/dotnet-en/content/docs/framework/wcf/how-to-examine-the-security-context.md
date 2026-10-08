---
description: "Learn more about: How to: Examine the Security Context"
title: "How to: Examine the Security Context"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "ServiceSecurityContext class"
  - "WCF, security"
  - "Claimset class"
ms.assetid: 389b5a57-4175-4bc0-ada0-fc750d51149f
---
# How to: Examine the Security Context

When programming Windows Communication Foundation (WCF) services, the service security context enables you to determine details about the client credentials and claims used to authenticate with the service. This is done by using the properties of the [System.ServiceModel.ServiceSecurityContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext) class.

 For example, you can retrieve the identity of the current client by using the [System.ServiceModel.ServiceSecurityContext.PrimaryIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.PrimaryIdentity*) or the [System.ServiceModel.ServiceSecurityContext.WindowsIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.WindowsIdentity) property. To determine whether the client is anonymous, use the [System.ServiceModel.ServiceSecurityContext.IsAnonymous](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.IsAnonymous) property.

 You can also determine what claims are being made on behalf of the client by iterating through the collection of claims in the [System.ServiceModel.ServiceSecurityContext.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.AuthorizationContext) property.

### To get the current security context

- Access the static property [System.ServiceModel.ServiceSecurityContext.Current*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.Current*) to get the current security context. Examine any of the properties of the current context from the reference.

### To determine the identity of the caller

1. Print the value of the [System.ServiceModel.ServiceSecurityContext.PrimaryIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.PrimaryIdentity*) and [System.ServiceModel.ServiceSecurityContext.WindowsIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.WindowsIdentity) properties.

### To parse the claims of a caller

1. Return the current [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) class. Use the [System.ServiceModel.ServiceSecurityContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.Current) property to return the current service security context, then return the `AuthorizationContext` using the [System.ServiceModel.ServiceSecurityContext.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.AuthorizationContext) property.

2. Parse the collection of [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) objects returned by the [System.IdentityModel.Policy.AuthorizationContext.ClaimSets](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext.ClaimSets) property of the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) class.

## Example

 The following example prints the values of the [System.ServiceModel.ServiceSecurityContext.WindowsIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.WindowsIdentity*) and [System.ServiceModel.ServiceSecurityContext.PrimaryIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.PrimaryIdentity) properties of the current security context and the [System.IdentityModel.Claims.Claim.ClaimType](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.ClaimType) property, the resource value of the claim, and the [System.IdentityModel.Claims.Claim.Right](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Right) property of every claim in the current security context.

 [c_PrincipalPermissionAttribute#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_principalpermissionattribute/cs/source.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_principalpermissionattribute/cs/source.cs.md)
 [c_PrincipalPermissionAttribute#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_principalpermissionattribute/vb/source.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_principalpermissionattribute/vb/source.vb.md)

## Compiling the Code

 The code uses the following namespaces:

- [System](https://learn.microsoft.com/search/?terms=System)

- [System.ServiceModel](https://learn.microsoft.com/search/?terms=System.ServiceModel)

- [System.IdentityModel.Policy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy)

- [System.IdentityModel.Claims](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims)

## See also

- [Securing Services](securing-services.md)
- [Service Identity and Authentication](feature-details/service-identity-and-authentication.md)
