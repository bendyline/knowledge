---
title: Set up sign-up and sign-in with OpenID Connect
titleSuffix: Azure AD B2C
description: Set up sign-up and sign-in with any OpenID Connect identity provider (IdP) in Azure Active Directory B2C.

author: garrodonnell
manager: CelesteDG

ms.service: entra-id

ms.topic: how-to
ms.date: 12/28/2024
ms.author: godonnell
ms.subservice: b2c
zone_pivot_groups: b2c-policy-type

#Customer Intent: As a developer integrating Azure AD B2C with a custom OpenID Connect identity provider, I want to understand the steps to add the identity provider and configure the necessary settings, so that users can sign in securely using the custom identity provider.

---

# Set up sign-up and sign-in with generic OpenID Connect using Azure Active Directory B2C


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

***Before you begin***, use the **Choose a policy type** selector at the top of this page to choose the type of policy you’re setting up. Azure Active Directory B2C offers two methods to define how users interact with your applications: through predefined [user flows](user-flow-overview.md) or through fully configurable [custom policies](custom-policy-overview.md). The steps required in this article are different for each method. 	




[OpenID Connect](openid-connect.md) is an authentication protocol built on top of OAuth 2.0 that can be used for secure user sign-in. Most identity providers that use this protocol are supported in Azure AD B2C. 

This article explains how you can add custom OpenID Connect identity providers into your user flows.


> **Important:**
> Your endpoints must comply with the Azure AD B2C security requirements. Older TLS versions and ciphers are deprecated. For more information, see [Azure AD B2C TLS and cipher suite requirements](https-cipher-tls-requirements.md). 



## Prerequisites

**Applies to: b2c-user-flow**


* [Create a user flow](tutorial-create-user-flows.md) so users can sign up and sign in to your application.
* [Register a web application](tutorial-register-applications.md). 



**Applies to: b2c-custom-policy**


* Complete the steps in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md?pivots=b2c-custom-policy). This tutorial guides you how to update custom policy files to use your Azure AD B2C tenant configuration.  
* [Register a web application](tutorial-register-applications.md).


## Add the identity provider

**Applies to: b2c-user-flow**


1. Sign in to the [Azure portal](https://portal.azure.com/) with an account that has at least [External Identity Provider Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#external-identity-provider-administrator) privileges.
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Choose **All services** in the top-left corner of the Azure portal, search for and select **Azure AD B2C**.
1. Select **Identity providers**, and then select **New OpenID Connect provider**.
1. Enter a **Name**. For example, enter *Contoso*.



**Applies to: b2c-custom-policy**


Define the OpenId Connect identity provider by adding it to the **ClaimsProviders** element in the extension file of your policy.

1. Open the *TrustFrameworkExtensions.xml*.
2. Find the **ClaimsProviders** element. If it does not exist, add it under the root element.
3. Add a new **ClaimsProvider** as follows:

    ```xml
    <ClaimsProvider>
      <Domain>contoso.com</Domain>
      <DisplayName>Login with Contoso</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="Contoso-OpenIdConnect">
          <DisplayName>Contoso</DisplayName>
          <Description>Login with your Contoso account</Description>
          <Protocol Name="OpenIdConnect"/>
          <Metadata>
            <Item Key="METADATA">https://your-identity-provider.com/.well-known/openid-configuration</Item>
            <Item Key="client_id">00001111-aaaa-2222-bbbb-3333cccc4444</Item>
            <Item Key="response_types">code</Item>
            <Item Key="scope">openid profile</Item>
            <Item Key="response_mode">form_post</Item>
            <Item Key="HttpBinding">POST</Item>
            <Item Key="UsePolicyInRedirectUri">false</Item>
          </Metadata>
          <!-- <CryptographicKeys>
            <Key Id="client_secret" StorageReferenceId="B2C_1A_ContosoSecret"/>
          </CryptographicKeys> -->
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="issuerUserId" PartnerClaimType="oid"/>
            <OutputClaim ClaimTypeReferenceId="tenantId" PartnerClaimType="tid"/>
            <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />
            <OutputClaim ClaimTypeReferenceId="surName" PartnerClaimType="family_name" />
            <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />
            <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" AlwaysUseDefaultValue="true" />
            <OutputClaim ClaimTypeReferenceId="identityProvider" PartnerClaimType="iss" />
            <OutputClaim ClaimTypeReferenceId="objectId" PartnerClaimType="oid"/>
          </OutputClaims>
          <OutputClaimsTransformations>
            <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>
            <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>
            <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>
            <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>
          </OutputClaimsTransformations>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin"/>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
    ```



## Configure the identity provider

Every OpenID Connect identity provider describes a metadata document that contains most of the information required to perform sign-in. The metadata document includes information such as the URLs to use and the location of the service's public signing keys. The OpenID Connect metadata document is always located at an endpoint that ends in `.well-known/openid-configuration`. For the OpenID Connect identity provider you are looking to add, enter its metadata URL.

**Applies to: b2c-user-flow**


In the **Metadata url**, enter the URL of the OpenID Connect metadata document.



**Applies to: b2c-custom-policy**


In the `<Item Key="METADATA">` technical profile metadata, enter the URL of the OpenID Connect metadata document.



## Client ID and secret

To allow users to sign in, the identity provider requires developers to register an application in their service. This application has an ID that is referred to as the **client ID** and a **client secret**. 

The client secret is optional. However, you must provide a client secret if the [Response type](#response-type) is `code`, which uses the secret to exchange the code for the token.

**Applies to: b2c-user-flow**


To add the client ID and client secret, copy these values from the identity provider and enter them into the corresponding fields.



**Applies to: b2c-custom-policy**


In the `<Item Key="client_id">` technical profile metadata, enter the client ID.

### Create a policy key

If client secret is required, store the client secret that you previously recorded in your Azure AD B2C tenant.

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. Make sure you're using the directory that contains your Azure AD B2C tenant. Select the **Directory + subscription** filter in the portal toolbar.
3. On the **Portal settings | Directories + subscriptions** page, find your Azure AD B2C directory in the **Directory name** list, and then select **Switch**.
4. Choose **All services** in the top-left corner of the Azure portal, and then search for and select **Azure AD B2C**.
5. On the Overview page, select **Identity Experience Framework**.
6. Select **Policy Keys** and then select **Add**.
7. For **Options**, choose `Manual`.
8. Enter a **Name** for the policy key. For example, `ContosoSecret`. The prefix `B2C_1A_` is added automatically to the name of your key.
9. In **Secret**, enter your client secret that you previously recorded.
10. For **Key usage**, select `Signature`.
11. Click **Create**.
12. In the `CryptographicKeys` XML element, add the following element:
    
    ```xml
    <CryptographicKeys>
      <Key Id="client_secret" StorageReferenceId="B2C_1A_ContosoSecret"/>
    </CryptographicKeys>
    ```



## Scope

Scope defines the information and permissions you are looking to gather from your identity provider, for example `openid profile`. In order to receive the ID token from the identity provider, the `openid` scope must be specified. 

Without the ID token, users are not able to sign in to Azure AD B2C using the custom identity provider. Other scopes can be appended separated by space. Refer to the custom identity provider's documentation to see what other scopes may be available.

**Applies to: b2c-user-flow**


In the **Scope**, enter the scopes from the identity provider. For example, `openid profile`.



**Applies to: b2c-custom-policy**


In the `<Item Key="scope">` technical profile metadata, enter the scopes from the identity provider. For example, `openid profile`.



## Response type

The response type describes what kind of information is sent back in the initial call to the `authorization_endpoint` of the custom identity provider. The following response types can be used:

* `code`: As per the [authorization code flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth), a code will be returned back to Azure AD B2C. Azure AD B2C proceeds to call the `token_endpoint` to exchange the code for the token.
* `id_token`: An ID token is returned back to Azure AD B2C from the custom identity provider.

**Applies to: b2c-user-flow**


In the **Response type**, select `code`, or `id_token`,  according to your identity provider settings.



**Applies to: b2c-custom-policy**


In the `<Item Key="response_types">` technical profile metadata, select `code`, or `id_token` according to your identity provider settings.



## Response mode

The response mode defines the method that should be used to send the data back from the custom identity provider to Azure AD B2C. The following response modes can be used:

* `form_post`: This response mode is recommended for best security. The response is transmitted via the HTTP `POST` method, with the code or token being encoded in the body using the `application/x-www-form-urlencoded` format.
* `query`: The code or token is returned as a query parameter.

**Applies to: b2c-user-flow**


In the **Response mode**, select `form_post`, or `query`,  according to your identity provider settings.



**Applies to: b2c-custom-policy**


In the `<Item Key="response_mode">` technical profile metadata, select `form_post`, or `query`, according to your identity provider settings.



## Domain hint

The [domain hint](direct-signin.md) can be used to skip directly to the sign in page of the specified identity provider, instead of having the user make a selection among the list of available identity providers. 

To allow this kind of behavior, enter a value for the domain hint. To jump to the custom identity provider, append the parameter `domain_hint=<domain hint value>` to the end of your request when calling Azure AD B2C for sign in.

**Applies to: b2c-user-flow**


In the **Domain hint**, enter a domain name used in the domain hint.



**Applies to: b2c-custom-policy**


In the `<Domain>contoso.com</Domain>` technical profile XML element, enter a domain name used in the domain hint. For example, `contoso.com`.



## Claims mapping

After the custom identity provider sends an ID token back to Azure AD B2C, Azure AD B2C needs to be able to map the claims from the received token to the claims that Azure AD B2C recognizes and uses. For each of the following mappings, refer to the documentation of the custom identity provider to understand the claims that are returned back in the identity provider's tokens:

**Applies to: b2c-user-flow**


* **User ID**: Enter the claim that provides the *unique identifier* for the signed-in user.
* **Display Name**: Enter the claim that provides the *display name* or *full name* for the user.
* **Given Name**: Enter the claim that provides the *first name* of the user.
* **Surname**: Enter the claim that provides the *last name* of the user.
* **Email**: Enter the claim that provides the *email address* of the user.




**Applies to: b2c-custom-policy**


The `OutputClaims` element contains a list of claims returned by your identity provider. Map the name of the claim defined in your policy to the name defined in the identity provider. Under the `<OutputClaims>` element, configure the `PartnerClaimType` attribute with the corresponding claim name as defined by your identity provider. 

| ClaimTypeReferenceId | PartnerClaimType |
| --- | --- |
| `issuerUserId` | Enter the claim that provides the *unique identifier* for the signed-in user. |
| `displayName` | Enter the claim that provides the *display name* or *full name* for the user. |
| `givenName` | Enter the claim that provides the *first name* of the user. |
| `surName` | Enter the claim that provides the *last name* of the user. |
| `email` | Enter the claim that provides the *email address* of the user. |
| `identityProvider` | Enter the claim that provides the token issuer name. For example, `iss`. If the identity provider doesn't include the issuer claim in the token, set the `DefaultValue` attribute with a unique identifier of your identity provider. For example, `DefaultValue="contoso.com"`. |




**Applies to: b2c-user-flow**


## Add the identity provider to a user flow 

1. In your Azure AD B2C tenant, select **User flows**.
1. Click the user flow that you want to add the identity provider. 
1. Under the **Social identity providers**, select the identity provider you added. For example, *Contoso*.
1. Select **Save**.

## Test your user flow

1. To test your policy, select **Run user flow**.
1. For **Application**, select the web application named *testapp1* that you previously registered. The **Reply URL** should show `https://jwt.ms`.
1. Select the **Run user flow** button.
1. From the sign-up or sign-in page, select the identity provider you want to sign-in. For example, *Contoso*.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.



**Applies to: b2c-custom-policy**


## Add a user journey 

At this point, the identity provider has been set up, but it's not yet available in any of the sign-in pages. If you don't have your own custom user journey, create a duplicate of an existing template user journey, otherwise continue to the next step. 

1. Open the *TrustFrameworkBase.xml* file from the starter pack.
1. Find and copy the entire contents of the **UserJourney** element that includes `Id="SignUpOrSignIn"`.
1. Open the *TrustFrameworkExtensions.xml* and find the **UserJourneys** element. If the element doesn't exist, add one.
1. Paste the entire content of the **UserJourney** element that you copied as a child of the **UserJourneys** element.
1. Rename the Id of the user journey. For example, `Id="CustomSignUpSignIn"`.

## Add the identity provider to a user journey 

Now that you have a user journey, add the new identity provider to the user journey. You first add a sign-in button, then link the button to an action. The action is the technical profile you created earlier.

1. Find the orchestration step element that includes `Type="CombinedSignInAndSignUp"`, or `Type="ClaimsProviderSelection"` in the user journey. It's usually the first orchestration step. The **ClaimsProviderSelections** element contains a list of identity providers that a user can sign in with. The order of the elements controls the order of the sign-in buttons presented to the user. Add a **ClaimsProviderSelection** XML element. Set the value of **TargetClaimsExchangeId** to a friendly name.

1. In the next orchestration step, add a **ClaimsExchange** element. Set the **Id** to the value of the target claims exchange Id. Update the value of **TechnicalProfileReferenceId** to the Id of the technical profile you created earlier.

The following XML demonstrates the first two orchestration steps of a user journey with the identity provider:


```xml
<OrchestrationStep Order="1" Type="CombinedSignInAndSignUp" ContentDefinitionReferenceId="api.signuporsignin">
  <ClaimsProviderSelections>
    ...
    <ClaimsProviderSelection TargetClaimsExchangeId="ContosoExchange" />
  </ClaimsProviderSelections>
  ...
</OrchestrationStep>

<OrchestrationStep Order="2" Type="ClaimsExchange">
  ...
  <ClaimsExchanges>
    <ClaimsExchange Id="ContosoExchange" TechnicalProfileReferenceId="Contoso-OpenIdConnect" />
  </ClaimsExchanges>
</OrchestrationStep>
```

## Configure the relying party policy

The relying party policy, for example [SignUpSignIn.xml](https://github.com/Azure-Samples/active-directory-b2c-custom-policy-starterpack/blob/master/SocialAndLocalAccounts/SignUpOrSignin.xml), specifies the user journey which Azure AD B2C will execute. Find the **DefaultUserJourney** element within [relying party](relyingparty.md). Update the  **ReferenceId** to match the user journey ID, in which you added the identity provider. 

In the following example, for the `CustomSignUpSignIn` user journey, the **ReferenceId** is set to `CustomSignUpSignIn`:

```xml
<RelyingParty>
  <DefaultUserJourney ReferenceId="CustomSignUpSignIn" />
  ...
</RelyingParty>
```

### Upload the custom policy

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select the **Directory + Subscription** icon in the portal toolbar, and then select the directory that contains your Azure AD B2C tenant.
1. In the Azure portal, search for and select **Azure AD B2C**.
1. Under **Policies**, select **Identity Experience Framework**.
1. Select **Upload Custom Policy**, and then upload the two policy files that you changed, in the following order: the extension policy, for example `TrustFrameworkExtensions.xml`, then the relying party policy, such as `SignUpSignIn.xml`.





1. Select your relying party policy, for example `B2C_1A_signup_signin`.
1. For **Application**, select a web application that you [previously registered](tutorial-register-applications.md). The **Reply URL** should show `https://jwt.ms`.
1. Select the **Run now** button.
1. From the sign-up or sign-in page, select **Contoso** to sign in with Google account.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.

## Known Issues
* Azure AD B2C does not support JWE (JSON Web Encryption) for exchanging encrypted tokens with OpenID connect identity providers. 

## Next steps

Find more information see the [OpenId Connect technical profile](openid-connect-technical-profile.md) reference guide.
