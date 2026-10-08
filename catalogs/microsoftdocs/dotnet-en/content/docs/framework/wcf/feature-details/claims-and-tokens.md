---
title: "Claims and Tokens"
description: "Learn more about: Claims and Tokens"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "claims [WCF], and tokens"
---
# Claims and Tokens

This topic describes the various claim types that Windows Communication Foundation (WCF) creates from the default tokens that it supports.

You can examine the claims of a client credential by using the [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) and [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) classes. The `ClaimSet` contains a collection of `Claim` objects. Each `Claim` has the following important members:

- The [System.IdentityModel.Claims.Claim.ClaimType](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.ClaimType) property returns a Uniform Resource Identifier (URI) that specifies the type of claim being made. For example, a claim type may be a thumbprint of a certificate, in which case the URI is `http://schemas.microsoft.com/ws/20005/05/identity/claims/thumprint`.

- The [System.IdentityModel.Claims.Claim.Right](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Right) property returns a URI that specifies the right of the claim. Predefined rights are found in the [System.IdentityModel.Claims.Rights](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights) class ([System.IdentityModel.Claims.Rights.Identity*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights.Identity*),  [System.IdentityModel.Claims.Rights.PossessProperty*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights.PossessProperty*)).

- The [System.IdentityModel.Claims.Claim.Resource](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Resource) property returns the resource associated with the claim.

Each [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) also has an [System.IdentityModel.Claims.ClaimSet.Issuer](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet.Issuer) property, which represents the [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) of the `Issuer`.

## Windows Accounts

Where a client credential maps to a Windows user account, the resulting [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) has the following values:

- The `Issuer` is the value returned by the static Windows property of the [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) class.

- The claims in the collection are:

  - A [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) with a [System.IdentityModel.Claims.Claim.ClaimType*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.ClaimType*) value of security identifier (SID), a [System.IdentityModel.Claims.Claim.Right](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Right) property value of `Identity`, and a [System.IdentityModel.Claims.Claim.Resource*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Resource*) that returns the actual SID value. A SID is a unique value the domain controller issues to every user. The SID is used to identify the user in interactions with Windows security.

  - A [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) with a [System.IdentityModel.Claims.Claim.ClaimType*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.ClaimType*) value of SID, a [System.IdentityModel.Claims.Claim.Right*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Right*) of `PossessProperty`, and a [System.IdentityModel.Claims.Claim.Resource*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Resource*) of the SID value.

  - A [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) with a [System.IdentityModel.Claims.Claim.ClaimType*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.ClaimType*) of [System.IdentityModel.Claims.ClaimTypes.Name*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes.Name*), a [System.IdentityModel.Claims.Claim.Right*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Right*) of `PossessProperty` and a [System.IdentityModel.Claims.Claim.Resource*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Resource*) of string containing the user name (for example, "MYMACHINE\Bob").

  - Additional SID claims with [System.IdentityModel.Claims.Rights.PossessProperty*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights.PossessProperty*) for the various groups the user belongs to.

## Certificates

Where the client credential is a certificate, the resulting [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) has the following values:

- For self-issued certificates, the `Issuer` is the [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) itself. The [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) returns a [System.IdentityModel.Claims.Claim.ClaimType*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.ClaimType*) of [System.IdentityModel.Claims.ClaimTypes.Thumbprint*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes.Thumbprint*), a [System.IdentityModel.Claims.Claim.Right*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Right*) of `Identity`, and a [System.IdentityModel.Claims.Claim.Resource*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Resource*) value that is a [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) array containing the thumbprint of the certificate.

- For a certificate issued by a certification authority, the issuer is the `ClaimSet` representing the certification authority’s certificate.

- The `Claims` in the collection include:

  - A `Claim` with a `ClaimType` of Thumbprint, a `Right` of PossessProperty, and a `Resource` that is a byte array containing the thumbprint of the certificate

  - Additional PossessProperty claims of various types, including X500DistinguishedName, Dns, Name, Upn, and Rsa, represent various properties of the certificate. The resource for the Rsa claim is the public key associated with the certificate.**Note** Where the client credential type is a certificate that the service maps to a Windows account, two `ClaimSet` objects are generated. The first contains all the claims related to the Windows account and the second contains all the claims related to the certificate.

## User Name/Password

Where the client credential is a user name/password (or equivalent) that does not map to a Windows account, the resulting `ClaimSet` is issued by the static [System.IdentityModel.Claims.ClaimSet.System](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet.System) property of the `ClaimSet` class. The `ClaimSet` contains an `Identity` claim of type [System.IdentityModel.Claims.ClaimTypes.Name*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes.Name*) whose resource is the user name the client provides. A corresponding claim has a `Right` of `PossessProperty`.

## RSA Keys

Where an RSA key not associated with a certificate is used, the resulting `ClaimSet` is self-issued and contains an `Identity` claim of type [System.IdentityModel.Claims.ClaimTypes.Rsa*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes.Rsa*) whose resource is the RSA key. A corresponding claim has a `Right` of `PossessProperty`.

## SAML

Where the client authenticates with a Security Assertions Markup Language (SAML) token, the resulting `ClaimSet` is issued by the entity that signed the SAML token, often the certificate of the security token service (STS) that issued the SAML token. The `ClaimSet` contains various claims as found in the SAML token. If the SAML token contains a `SamlSubject` with a non-`null` name, then an `Identity` claim with a type of [System.IdentityModel.Claims.ClaimTypes.NameIdentifier*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes.NameIdentifier*) and a resource type of [System.IdentityModel.Tokens.SamlNameIdentifierClaimResource](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SamlNameIdentifierClaimResource) are created.

## Identity Claims and ServiceSecurityContext.IsAnonymous

If none of the `ClaimSet` objects resulting from the client credentials contain a claim with a `Right` of `Identity`, then the [System.ServiceModel.ServiceSecurityContext.IsAnonymous](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceSecurityContext.IsAnonymous) property returns `true`. If one or more such claims are present, the `IsAnonymous` property returns `false`.

## See also

- [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet)
- [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim)
- [System.IdentityModel.Claims.Rights](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights)
- [System.IdentityModel.Claims.ClaimTypes](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes)
- [Managing Claims and Authorization with the Identity Model](managing-claims-and-authorization-with-the-identity-model.md)
