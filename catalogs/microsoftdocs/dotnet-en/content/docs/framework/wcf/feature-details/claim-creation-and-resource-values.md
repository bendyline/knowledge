---
description: "Learn more about: Claim Creation and Resource Values"
title: "Claim Creation and Resource Values"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "claims [WCF], creation and resource values"
ms.assetid: 30431f76-cbe7-4bad-bad7-8e43e23a82d4
---
# Claim Creation and Resource Values

The [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) class provides several methods for creating instances of built-in claims types. Of these methods, the following perform no semantic or format checking on the supplied resource:

- [System.IdentityModel.Claims.Claim.CreateDnsClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateDnsClaim*)

- [System.IdentityModel.Claims.Claim.CreateHashClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateHashClaim*) (does not check the length or content of the byte array)

- [System.IdentityModel.Claims.Claim.CreateNameClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateNameClaim*)

- [System.IdentityModel.Claims.Claim.CreateSpnClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateSpnClaim*)

- [System.IdentityModel.Claims.Claim.CreateThumbprintClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateThumbprintClaim*) (does not check the length or content of the byte array)

- [System.IdentityModel.Claims.Claim.CreateUpnClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateUpnClaim*)

 Care should be taken when calling the above methods to ensure that the resource values passed in are of the correct format or contain the correct kind of information (or both).

 The following methods take specific types:

- [System.IdentityModel.Claims.Claim.CreateDenyOnlyWindowsSidClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateDenyOnlyWindowsSidClaim*)

- [System.IdentityModel.Claims.Claim.CreateMailAddressClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateMailAddressClaim*)

- [System.IdentityModel.Claims.Claim.CreateRsaClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateRsaClaim*)

- [System.IdentityModel.Claims.Claim.CreateUriClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateUriClaim*)

- [System.IdentityModel.Claims.Claim.CreateWindowsSidClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateWindowsSidClaim*)

- [System.IdentityModel.Claims.Claim.CreateX500DistinguishedNameClaim*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.CreateX500DistinguishedNameClaim*)

## See also

- [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim)
- [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet)
- [Managing Claims and Authorization with the Identity Model](managing-claims-and-authorization-with-the-identity-model.md)
