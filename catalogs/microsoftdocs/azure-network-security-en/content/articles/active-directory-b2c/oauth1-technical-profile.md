---
title: Define an OAuth1 technical profile in a custom policy
titleSuffix: Azure AD B2C
description: Define an OAuth 1.0 technical profile in a custom policy in Azure Active Directory B2C.

author: kengaderdus
manager: CelesteDG

ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c


#Customer intent: As a developer implementing Azure Active Directory B2C custom policies, I want to define an OAuth1 technical profile, so that I can federate with an OAuth1 based identity provider like X and allow users to sign in with their existing social or enterprise identities.

---

# Define an OAuth1 technical profile in an Azure Active Directory B2C custom policy


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

> **Note:**
> In Azure Active Directory B2C, [custom policies](user-flow-overview.md) are designed primarily to address complex scenarios. For most scenarios, we recommend that you use built-in [user flows](user-flow-overview.md). If you've not done so, learn about custom policy starter pack in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md).

Azure Active Directory B2C (Azure AD B2C) provides support for the [OAuth 1.0 protocol](https://tools.ietf.org/html/rfc5849) identity provider. This article describes the specifics of a technical profile for interacting with a claims provider that supports this standardized protocol. With an OAuth1 technical profile, you can federate with an OAuth1 based identity provider, such as X. Federating with the identity provider allows users to sign in with their existing social or enterprise identities.

## Protocol

The **Name** attribute of the **Protocol** element needs to be set to `OAuth1`. For example, the protocol for the **Twitter-OAUTH1** technical profile is `OAuth1`.

```xml
<TechnicalProfile Id="Twitter-OAUTH1">
  <DisplayName>X</DisplayName>
  <Protocol Name="OAuth1" />
  ...
```

## Input claims

The **InputClaims** and **InputClaimsTransformations**  elements are empty or absent.

## Output claims

The **OutputClaims** element contains a list of claims returned by the OAuth1 identity provider. You may need to map the name of the claim defined in your policy to the name defined in the identity provider. You can also include claims that aren't returned by the identity provider as long as you set the **DefaultValue** attribute.

The **OutputClaimsTransformations** element may contain a collection of **OutputClaimsTransformation** elements that are used to modify the output claims or generate new ones.

The following example shows the claims returned by the X identity provider:

- The **user_id** claim that is mapped to the **issuerUserId** claim.
- The **screen_name** claim that is mapped to the **displayName** claim.
- The **email** claim without name mapping.

The technical profile also returns claims that aren't returned by the identity provider:

- The **identityProvider** claim that contains the name of the identity provider.
- The **authenticationSource** claim with a default value of `socialIdpAuthentication`.

```xml
<OutputClaims>
  <OutputClaim ClaimTypeReferenceId="issuerUserId" PartnerClaimType="user_id" />
  <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="screen_name" />
  <OutputClaim ClaimTypeReferenceId="email" />
  <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="twitter.com" />
  <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />
</OutputClaims>
```

## Metadata

| Attribute | Required | Description |
| --- | --- | --- |
| client_id | Yes | The application identifier of the identity provider. |
| ProviderName | No | The name of the identity provider. |
| request_token_endpoint | Yes | The URL of the request token endpoint as per RFC 5849. |
| authorization_endpoint | Yes | The URL of the authorization endpoint as per RFC 5849. |
| access_token_endpoint | Yes | The URL of the token endpoint as per RFC 5849. |
| ClaimsEndpoint | No | The URL of the user information endpoint. |
| ClaimsResponseFormat | No | The claims response format. |

## Cryptographic keys

The **CryptographicKeys** element contains the following attribute:

| Attribute | Required | Description |
| --- | --- | --- |
| client_secret | Yes | The client secret of the identity provider application. |

## Redirect URI

When you configure the redirect URI of your identity provider, enter `https://{tenant-name}.b2clogin.com/{tenant-name}.onmicrosoft.com/{policy-id}/oauth1/authresp`. Make sure to replace `{tenant-name}` with your tenant's name (for example, contosob2c) and `{policy-id}` with the identifier of your policy (for example, b2c_1a_policy). The redirect URI needs to be in all lowercase. Add a redirect URL for all policies that use the identity provider login.

Examples:

- [Add X as an OAuth1 identity provider by using custom policies](identity-provider-twitter.md)
