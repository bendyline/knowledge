---
title: Set up sign-up and sign-in with an X account
titleSuffix: Azure AD B2C
description: Provide sign-up and sign-in to customers with X accounts in your applications using Azure Active Directory B2C.
author: garrodonnell
manager: CelesteDG
ms.service: entra-id
ms.topic: how-to
ms.date: 07/20/2022
ms.author: godonnell
ms.subservice: b2c
zone_pivot_groups: b2c-policy-type

#Customer Intent: As a developer setting up sign-up and sign-in with an X account using Azure Active Directory B2C, I want to configure X as an identity provider so that I can enable users to sign in with their X accounts.

---

# Set up sign-up and sign-in with an X account using Azure Active Directory B2C


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

***Before you begin***, use the **Choose a policy type** selector at the top of this page to choose the type of policy you’re setting up. Azure Active Directory B2C offers two methods to define how users interact with your applications: through predefined [user flows](user-flow-overview.md) or through fully configurable [custom policies](custom-policy-overview.md). The steps required in this article are different for each method. 	


**Applies to: b2c-custom-policy**


> **Note:**
> In Azure Active Directory B2C, [custom policies](user-flow-overview.md) are designed primarily to address complex scenarios. For most scenarios, we recommend that you use built-in [user flows](user-flow-overview.md). If you've not done so, learn about custom policy starter pack in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md).



## Prerequisites

**Applies to: b2c-user-flow**


* [Create a user flow](tutorial-create-user-flows.md) so users can sign up and sign in to your application.
* [Register a web application](tutorial-register-applications.md). 



**Applies to: b2c-custom-policy**


* Complete the steps in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md?pivots=b2c-custom-policy). This tutorial guides you how to update custom policy files to use your Azure AD B2C tenant configuration.  
* [Register a web application](tutorial-register-applications.md).


## Create an application

To enable sign-in for users with an X account in Azure AD B2C, you need to create an X application. If you don't already have an X account, you can sign up at [`https://x.com/signup`](https://x.com/signup). You also need to [Apply for a developer account](https://developer.x.com/). For more information, see [Apply for access](https://developer.x.com/en/portal/products).

**Applies to: b2c-custom-policy**

1. Sign in to the [X Developer Portal](https://developer.x.com/portal/projects-and-apps) with your X account credentials.
1. Select **+ Create Project** button. 
1. Under **Project name** tab, enter a preferred name of your project, and then select **Next** button.
1. Under **Use case** tab, select your preferred use case, and then select **Next**. 
1. Under **Project description** tab, enter your project description, and then select **Next** button. 
1. Under **App name** tab, enter a name for your app, such as *azureadb2c*, and the select **Next** button.
1. Under **Keys & Tokens** tab, copy the value of **API Key** and **API Key Secret**. You will use these for configuration later. 
1. Select **App settings** to open the app settings. 
1. At the lower part of the page, under **User authentication settings**, select **Set up**. 
1. Under **Type of app**, select your appropriate app type such as *Web App*. 
1. Under **App Info**:
    1. For the **Callback URI/Redirect URL**, enter `https://your-tenant-name.b2clogin.com/your-tenant-name.onmicrosoft.com/your-policy-id/oauth1/authresp`. If you use a [custom domain](custom-domain.md), enter `https://your-domain-name/your-tenant-name.onmicrosoft.com/your-user-flow-Id/oauth1/authresp`. Use all lowercase letters when entering your tenant name and user flow ID even if they are defined with uppercase letters in Azure AD B2C. Replace:
        - `your-tenant-name` with the name of your tenant name.
        - `your-domain-name` with your custom domain.
        - `your-policy-id` with the identifier of your user flow. For example, `b2c_1a_signup_signin_x`.  
    1. For the **Website URL**, enter `https://your-tenant.b2clogin.com`. Replace `your-tenant` with the name of your tenant. For example, `https://contosob2c.b2clogin.com`. If you use a [custom domain](custom-domain.md), enter `https://your-domain-name`.
    1. (Optional) Enter a URL for the **Terms of service**, for example `http://www.contoso.com/tos`. The policy URL is a page you maintain to provide terms and conditions for your application.
    1. (Optional) Enter a URL for the **Privacy policy**, for example `http://www.contoso.com/privacy`. The policy URL is a page you maintain to provide privacy information for your application.
1. Select **Save**. 



**Applies to: b2c-user-flow**


1. Sign in to the [X Developer Portal](https://developer.x.com/portal/projects-and-apps) with your X account credentials.
1. Select **+ Create Project** button. 
1. Under **Project name** tab, enter a preferred name of your project, and then select **Next** button.
1. Under **Use case** tab, select your preferred use case, and then select **Next**. 
1. Under **Project description** tab, enter your project description, and then select **Next** button. 
1. Under **App name** tab, enter a name for your app, such as *azureadb2c*, and the select **Next** button.
1. Under **Keys & Tokens** tab, copy the value of **API Key** and **API Key Secret** for later. You use both of them to configure X as an identity provider in your Azure AD B2C tenant. 
1. Select **App settings** to open the app settings. 
1. At the lower part of the page, under **User authentication settings**, select **Set up**.
1. Under **Type of app**, select your appropriate app type such as *Web App*. 
1. Under **App Info**:
    1. For the **Callback URI/Redirect URL**, enter `https://your-tenant.b2clogin.com/your-tenant-name.onmicrosoft.com/your-user-flow-name/oauth1/authresp`. If you use a [custom domain](custom-domain.md), enter `https://your-domain-name/your-tenant-name.onmicrosoft.com/your-user-flow-Id/oauth1/authresp`. Use all lowercase letters when entering your tenant name and user flow ID even if they are defined with uppercase letters in Azure AD B2C. Replace:
        - `your-tenant-name` with the name of your tenant name.
        - `your-domain-name` with your custom domain.
        - `your-user-flow-name` with the identifier of your user flow. For example, `b2c_1_signup_signin_x`. 
    1. For the **Website URL**, enter `https://your-tenant.b2clogin.com`. Replace `your-tenant` with the name of your tenant. For example, `https://contosob2c.b2clogin.com`. If you use a [custom domain](custom-domain.md), enter `https://your-domain-name`.
    1. Enter a URL for the **Terms of service**, for example `http://www.contoso.com/tos`. The policy URL is a page you maintain to provide terms and conditions for your application.
    1. Enter a URL for the **Privacy policy**, for example `http://www.contoso.com/privacy`. The policy URL is a page you maintain to provide privacy information for your application.
1. Select **Save**. 
 


**Applies to: b2c-user-flow**


## Configure X as an identity provider

1. Sign in to the [Azure portal](https://portal.azure.com/) with an account that has at least [External Identity Provider Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#external-identity-provider-administrator) privileges.
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Choose **All services** in the top-left corner of the Azure portal, search for and select **Azure AD B2C**.
1. Select **Identity providers**, then select **Twitter**.
1. Enter a **Name**. For example, *X*.
1. For the **Client ID**, enter the *API Key* of the X application that you created earlier.
1. For the **Client secret**, enter the *API key secret* that you recorded.
1. Select **Save**.

## Add X identity provider to a user flow 

At this point, the X identity provider has been set up, but it's not yet available in any of the sign-in pages. To add the X identity provider to a user flow:

1. In your Azure AD B2C tenant, select **User flows**.
1. Select the user flow that you want to add the X identity provider.
1. Under the **Social identity providers**, select **Twitter**.
1. Select **Save**.

## Test your User Flow

1. To test your policy, select **Run user flow**.
1. For **Application**, select the web application named *testapp1* that you previously registered. The **Reply URL** should show `https://jwt.ms`.
1. Select the **Run user flow** button.
1. From the sign-up or sign-in page, select **Twitter** to sign in with X account.



**Applies to: b2c-custom-policy**


## Create a policy key

You need to store the secret key that you previously recorded for X app in your Azure AD B2C tenant.

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. In the Azure portal, search for and select **Azure AD B2C**.
1. On the left menu, under **Policies**, select **Identity Experience Framework**.
1. Select **Policy Keys** and then select **Add**.
1. For **Options**, choose `Manual`.
1. Enter a **Name** for the policy key. For example, `XSecret`. The prefix `B2C_1A_` is added automatically to the name of your key.
1. For **Secret**, enter your *API key secret* value that you previously recorded.
1. For **Key usage**, select `Signature`.
1. Click **Create**.

## Configure X as an identity provider

To enable users to sign in using an X account, you need to define the account as a claims provider that Azure AD B2C can communicate with through an endpoint. The endpoint provides a set of claims that are used by Azure AD B2C to verify that a specific user has authenticated.

You can define an X account as a claims provider by adding it to the **ClaimsProviders** element in the extension file of your policy. Refer to the custom policy starter pack that you downloaded in the Prerequisites of this article.

1. Open the *TrustFrameworkExtensions.xml*.
2. Find the **ClaimsProviders** element. If it does not exist, add it under the root element.
3. Add a new **ClaimsProvider** as follows:

    ```xml
    <ClaimsProvider>
      <Domain>x.com</Domain>
      <DisplayName>X</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="Twitter-OAuth1">
          <DisplayName>X</DisplayName>
          <Protocol Name="OAuth1" />
          <Metadata>
            <Item Key="ProviderName">Twitter</Item>
            <Item Key="authorization_endpoint">https://api.twitter.com/oauth/authenticate</Item>
            <Item Key="access_token_endpoint">https://api.twitter.com/oauth/access_token</Item>
            <Item Key="request_token_endpoint">https://api.twitter.com/oauth/request_token</Item>
            <Item Key="ClaimsEndpoint">https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true</Item>
            <Item Key="ClaimsResponseFormat">json</Item>
            <Item Key="client_id">Your X application API key</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="client_secret" StorageReferenceId="B2C_1A_TwitterSecret" />
          </CryptographicKeys>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="issuerUserId" PartnerClaimType="user_id" />
            <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="screen_name" />
            <OutputClaim ClaimTypeReferenceId="email" />
            <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="twitter.com" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />
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

4. Replace the value of **client_id** with the *API key* that you previously recorded.
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
    <ClaimsProviderSelection TargetClaimsExchangeId="TwitterExchange" />
  </ClaimsProviderSelections>
  ...
</OrchestrationStep>

<OrchestrationStep Order="2" Type="ClaimsExchange">
  ...
  <ClaimsExchanges>
    <ClaimsExchange Id="TwitterExchange" TechnicalProfileReferenceId="Twitter-OAuth1" />
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
1. From the sign-up or sign-in page, select **Twitter** to sign in with X account.


If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.

> **Tip:**
>  If you're facing `unauthorized` error while testing this identity provider, make sure you use the correct X API Key and API Key Secret, or try to apply for [elevated](https://developer.x.com/en/portal/products/elevated) access. Also, we recommend you've a look at [X's projects structure](https://developer.x.com/en/docs/projects/overview), if you registered your app before the feature was available.
