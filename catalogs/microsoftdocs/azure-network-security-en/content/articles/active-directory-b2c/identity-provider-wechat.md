---
title: Set up sign-up and sign-in with a WeChat account
titleSuffix: Azure AD B2C
description: Provide sign-up and sign-in to customers with WeChat accounts in your applications using Azure Active Directory B2C.
author: garrodonnell
manager: CelesteDG
ms.service: entra-id
ms.topic: how-to
ms.date: 09/16/2021
ms.author: godonnell
ms.subservice: b2c
zone_pivot_groups: b2c-policy-type
ms.custom: sfi-image-nochange

#Customer Intent: As a developer using Azure Active Directory B2C, I want to set up sign-up and sign-in with a WeChat account, so that users can authenticate using their WeChat credentials.

---

# Set up sign-up and sign-in with a WeChat account using Azure Active Directory B2C


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

***Before you begin***, use the **Choose a policy type** selector at the top of this page to choose the type of policy you’re setting up. Azure Active Directory B2C offers two methods to define how users interact with your applications: through predefined [user flows](user-flow-overview.md) or through fully configurable [custom policies](custom-policy-overview.md). The steps required in this article are different for each method. 	



> **Note:**
> This feature is in public preview.

## Prerequisites

**Applies to: b2c-user-flow**


* [Create a user flow](tutorial-create-user-flows.md) so users can sign up and sign in to your application.
* [Register a web application](tutorial-register-applications.md). 



**Applies to: b2c-custom-policy**


* Complete the steps in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md?pivots=b2c-custom-policy). This tutorial guides you how to update custom policy files to use your Azure AD B2C tenant configuration.  
* [Register a web application](tutorial-register-applications.md).

* Get an approved Weixin Open Platform account at [https://kf.qq.com](https://kf.qq.com/faq/161220Brem2Q161220uUjERB.html).
* Get an approved application on Weixin Open Platform.

## Create a WeChat application

To enable sign-in for users with a WeChat account in Azure Active Directory B2C (Azure AD B2C), you need to create an application in [WeChat management center](https://open.weixin.qq.com/). If you don't already have a Weixin Open Platform account, you can get information at [https://kf.qq.com](https://kf.qq.com/faq/161220Brem2Q161220uUjERB.html). The Weixin Open Platform account and application must be approved to link WeChat as an identity provider to your user flow.

### Register a WeChat application

1. Sign in to [https://open.weixin.qq.com/](https://open.weixin.qq.com/) with your WeChat credentials.
1. Select **管理中心** (management center).
1. Follow the steps to register a new application.
1. In the **Development information** section, set the "Authorization callback domain" to `your-tenant-name.b2clogin.com`.
1. Ensure that the application status is "Approved".
1. At the top of **Application details**, copy the **APP ID** and **APP KEY**. You need both of them to configure the identity provider to your tenant.

**Applies to: b2c-user-flow**


## Configure WeChat as an identity provider

1. Sign in to the [Azure portal](https://portal.azure.com/) with an account that has at least [External Identity Provider Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#external-identity-provider-administrator) privileges.
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Choose **All services** in the top-left corner of the Azure portal, search for and select **Azure AD B2C**.
1. Select **Identity providers**, then select **WeChat (Preview)**.
1. Enter a **Name**. For example, *WeChat*.
1. For the **Client ID**, enter the APP ID of the WeChat application that you created earlier.
1. For the **Client secret**, enter the APP KEY that you recorded.
1. Select **Save**.

    Screenshot that shows the Configure social identity provider window, with completed form fields for social identity provider name, WeChat client ID, and app secret.

## Add WeChat identity provider to a user flow 

1. In your Azure AD B2C tenant, select **User flows**.
1. Click the user flow that you want to add the WeChat identity provider.
1. Under the **Social identity providers**, select **WeChat**.
1. Select **Save**.

   Screenshot showing WeChat as a selected identity provider in the Identity Providers section.

1. To test your policy, select **Run user flow**.
1. For **Application**, select the web application named *testapp1* that you previously registered. The **Reply URL** should show `https://jwt.ms`.
1. Select the **Run user flow** button.
1. From the sign-up or sign-in page, select **WeChat** to sign in with WeChat account.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.



**Applies to: b2c-custom-policy**


## Create a policy key

You need to store the client secret that you previously recorded in your Azure AD B2C tenant.

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Choose **All services** in the top-left corner of the Azure portal, and then search for and select **Azure AD B2C**.
1. On the Overview page, select **Identity Experience Framework**.
1. Select **Policy Keys** and then select **Add**.
1. For **Options**, choose `Manual`.
1. Enter a **Name** for the policy key. For example, `WeChatSecret`. The prefix `B2C_1A_` is added automatically to the name of your key.
1. In **Secret**, enter your client secret that you previously recorded.
1. For **Key usage**, select `Signature`.
1. Click **Create**.

## Configure WeChat as an identity provider

To enable users to sign in using a WeChat account, you need to define the account as a claims provider that Azure AD B2C can communicate with through an endpoint. The endpoint provides a set of claims that are used by Azure AD B2C to verify that a specific user has authenticated.

You can define a WeChat account as a claims provider by adding it to the **ClaimsProviders** element in the extension file of your policy.

1. Open the *TrustFrameworkExtensions.xml*.
2. Find the **ClaimsProviders** element. If it does not exist, add it under the root element.
3. Add a new **ClaimsProvider** as follows:

    ```xml
    <ClaimsProvider>
      <Domain>wechat.com</Domain>
      <DisplayName>WeChat (Preview)</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="WeChat-OAuth2">
          <DisplayName>WeChat</DisplayName>
          <Protocol Name="OAuth2" />
          <Metadata>
            <Item Key="ProviderName">wechat</Item>
            <Item Key="authorization_endpoint">https://open.weixin.qq.com/connect/qrconnect</Item>
            <Item Key="AccessTokenEndpoint">https://api.weixin.qq.com/sns/oauth2/access_token</Item>
            <Item Key="ClaimsEndpoint">https://api.weixin.qq.com/sns/userinfo</Item>
            <Item Key="scope">snsapi_login</Item>
            <Item Key="HttpBinding">GET</Item>
            <Item Key="AccessTokenResponseFormat">json</Item>
            <Item Key="ClientIdParamName">appid</Item>
            <Item Key="ClientSecretParamName">secret</Item>
            <Item Key="ExtraParamsInAccessTokenEndpointResponse">openid</Item>
            <Item Key="ExtraParamsInClaimsEndpointRequest">openid</Item>
            <Item Key="ResponseErrorCodeParamName">errcode</Item>
            <Item Key="external_user_identity_claim_id">unionid</Item>
          <Item Key="client_id">Your WeChat application ID</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="client_secret" StorageReferenceId="B2C_1A_WeChatSecret" />
          </CryptographicKeys>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="UserId" PartnerClaimType="unionid" />
            <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="wechat.com" AlwaysUseDefaultValue="true" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" AlwaysUseDefaultValue="true" />
          </OutputClaims>
          <OutputClaimsTransformations>
            <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />
            <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />
            <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />
            <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />
          </OutputClaimsTransformations>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
    ```

4. Set **client_id** to the application ID from the application registration.
5. Save the file.

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
    <ClaimsProviderSelection TargetClaimsExchangeId="WeChatExchange" />
  </ClaimsProviderSelections>
  ...
</OrchestrationStep>

<OrchestrationStep Order="2" Type="ClaimsExchange">
  ...
  <ClaimsExchanges>
    <ClaimsExchange Id="WeChatExchange" TechnicalProfileReferenceId="WeChat-OAuth2" />
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





## Test your custom policy

1. Select your relying party policy, for example `B2C_1A_signup_signin`.
1. For **Application**, select a web application that you [previously registered](tutorial-register-applications.md). The **Reply URL** should show `https://jwt.ms`.
1. Select the **Run now** button.
1. From the sign-up or sign-in page, select **WeChat** to sign in with WeChat account.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.
