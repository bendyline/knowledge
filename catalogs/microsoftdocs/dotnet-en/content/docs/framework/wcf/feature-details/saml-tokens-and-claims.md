---
title: "SAML Tokens and Claims"
description: Learn how WFC uses SAML tokens to carry statements that are sets of claims made by one entity about another entity.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "WCF, federation"
  - "federation"
  - "issued tokens"
  - "SAML token"
ms.assetid: 930b6e34-9eab-4e95-826c-4e06659bb977
---
# SAML Tokens and Claims

Security Assertions Markup Language (SAML) *tokens* are XML representations of claims. By default, SAML tokens Windows Communication Foundation (WCF) uses in federated security scenarios are *issued tokens*.

 SAML tokens carry statements that are sets of claims made by one entity about another entity. For example, in federated security scenarios, the statements are made by a security token service about a user in the system. The security token service signs the SAML token to indicate the veracity of the statements contained in the token. In addition, the SAML token is associated with cryptographic key material that the user of the SAML token proves knowledge of. This proof satisfies the relying party that the SAML token was, in fact, issued to that user. For example, in a typical scenario:

1. A client requests a SAML token from a security token service, authenticating to that security token service by using Windows credentials.

2. The security token service issues a SAML token to the client. The SAML token is signed with a certificate associated with the security token service and contains a proof key encrypted for the target service.

3. The client also receives a copy of the *proof key*. The client then presents the SAML token to the application service (the *relying party*) and signs the message with that proof key.

4. The signature over the SAML token tells the relying party that the security token service issued the token. The message signature created with the proof key tells the relying party that the token was issued to the client.

## From Claims to SamlAttributes

 In WCF, statements in SAML tokens are modeled as [System.IdentityModel.Tokens.SamlAttribute](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlAttribute) objects, which can be populated directly from [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) objects, provided the [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) object has a [System.IdentityModel.Claims.Claim.Right](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Right) property of [System.IdentityModel.Claims.Rights.PossessProperty*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights.PossessProperty*) and the [System.IdentityModel.Claims.Claim.Resource](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Resource) property is of type [System.String](https://learn.microsoft.com/search/?terms=System.String). For example:

 [c_CreateSTS#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs.md)
 [c_CreateSTS#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb.md)

> **Note:**
> When SAML tokens are serialized in messages, either when they are issued by a security token service or when they are presented by clients to services as part of authentication, the maximum message size quota must be sufficiently large to accommodate the SAML token and the other message parts. In normal cases, the default message size quotas are sufficient. However, in cases where a SAML token is large because it contains hundreds of claims, you may need to increase the quotas to accommodate the serialized token. For more information, see [Security Considerations for Data](security-considerations-for-data.md).

## From SamlAttributes to Claims

 When SAML tokens are received in messages, the various statements in the SAML token are turned into [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy) objects that are placed into the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext). The claims from each SAML statement are returned by the [System.IdentityModel.Policy.AuthorizationContext.ClaimSets](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext.ClaimSets) property of the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) and can be examined to determine whether to authenticate and authorize the user.

## See also

- [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext)
- [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy)
- [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet)
- [Federation](federation.md)
- [How to: Create a Federated Client](how-to-create-a-federated-client.md)
- [How to: Configure Credentials on a Federation Service](how-to-configure-credentials-on-a-federation-service.md)
- [Managing Claims and Authorization with the Identity Model](managing-claims-and-authorization-with-the-identity-model.md)
- [Claims and Tokens](claims-and-tokens.md)
- [Claim Creation and Resource Values](claim-creation-and-resource-values.md)
- [How to: Create a Custom Claim](../extending/how-to-create-a-custom-claim.md)
