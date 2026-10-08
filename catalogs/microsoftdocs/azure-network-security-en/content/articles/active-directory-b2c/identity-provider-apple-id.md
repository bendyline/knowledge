---
title: Set up sign-up and sign-in with an Apple ID
titleSuffix: Azure AD B2C
description: Provide sign-up and sign-in to customers with Apple ID in your applications using Azure Active Directory B2C.
author: garrodonnell
manager: CelesteDG
ms.service: entra-id
ms.topic: how-to
ms.date: 11/02/2021
ms.author: godonnell
ms.subservice: b2c
zone_pivot_groups: b2c-policy-type

#Customer Intent: As a developer using Azure Active Directory B2C, I want to set up sign-up and sign-in with an Apple ID, so that users can authenticate using their Apple ID.

---

# Set up sign-up and sign-in with an Apple ID  using Azure Active Directory B2C


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


## Create an Apple ID application

To enable sign-in for users with an Apple ID in Azure Active Directory B2C (Azure AD B2C), you need to create an application in [https://developer.apple.com](https://developer.apple.com). For more information, see [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/get-started/). If you don't already have an Apple developer account, you can sign up at [Apple Developer Program](https://developer.apple.com/programs/enroll/).

1. Sign in to the [Apple Developer Portal](https://developer.apple.com/account) with your account credentials.
1. From the menu, select **Certificates, IDs, & Profiles**, and then select **(+)**.
1. For **Register a New Identifier**, select **App IDs**, and then select **Continue**.
1. For **Select a type**, select **App**, and then select **Continue**.
1. For **Register an App ID**:
    1. Enter a **Description** 
    1. Enter the **Bundle ID**, such as `com.contoso.azure-ad-b2c`. 
    1. For **Capabilities**, select **Sign in with Apple** from the capabilities list. 
    1. Take note of your **Team ID** (App ID Prefix) from this step. You'll need it later.
    1. Select **Continue** and then **Register**.
1. From the menu, select **Certificates, IDs, & Profiles**, and then select **(+)**.
1. For **Register a New Identifier**, select **Services IDs**, and then select **Continue**.
1. For **Register a Services ID**:
    1. Enter a **Description**. The description is shown to the user on the consent screen.
    1. Enter the **Identifier**, such as `com.consoto.azure-ad-b2c-service`. Take note of your **Service ID** identifier. The identifier is your **Client ID** for the OpenID Connect flow.
    1. Select **Continue**, and then select **Register**.
1. From **Identifiers**, select the identifier you created.
1. Select **Sign In with Apple**, and then select **Configure**.
    1. Select the **Primary App ID** you want to configure Sign in with Apple with.
    1. In **Domains and Subdomains**, enter `your-tenant-name.b2clogin.com`. Replace your-tenant-name with the name of your tenant. If you use a [custom domain](custom-domain.md), enter `https://your-domain-name`.
    1. In **Return URLs**, enter `https://your-tenant-name.b2clogin.com/your-tenant-name.onmicrosoft.com/oauth2/authresp`. If you use a [custom domain](custom-domain.md), enter `https://your-domain-name/your-tenant-name.onmicrosoft.com/oauth2/authresp`. Replace `your-tenant-name` with the name of your tenant, and `your-domain-name` with your custom domain. The Return URL needs to be in all lower-case.
    1. Select **Next**, and then select **Done**.
    1. When the pop-up window is closed, select **Continue**, and then select **Save**.

## Creating an Apple client secret

1. From the Apple Developer portal menu, select **Keys**, and then select **(+)**.
1. For **Register a New Key**:
    1. Type a **Key Name**.
    1. Select **Sign in with Apple**, and then select **Configure**.
    1. For the **Primary App ID**, select the app you created previously, and the select **Save**.
    1. Select **Configure**, and then select **Register** to finish the key registration process. Take note of the **Key ID**. This key is required when you configure user flows.
1. For **Download Your Key**, select **Download** to download a .p8 file that contains your key.


**Applies to: b2c-user-flow**


## Configure Apple as an identity provider

1. Sign in to the [Azure portal](https://portal.azure.com/) with an account that has at least [External Identity Provider Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#external-identity-provider-administrator) privileges.
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Under **Azure services**, select **Azure AD B2C**. Or use the search box to find and select **Azure AD B2C**.
1. Select **Identity providers**, then select **Apple**.
1. For the **Name**, enter **Sign in with Apple**. 
1. Enter the **Apple developer ID (Team ID)**.
1. Enter the **Apple service ID (Client ID)**.
1. Enter the **Apple key ID** from step [Creating an Apple client secret](#creating-an-apple-client-secret).
1. Select and upload the **Apple certificate data**.
1. Select **Save**.


> **Important:** 
> - Sign in with Apple requires the Admin to renew their client secret every 6 months. 
> - The Apple client secret will be automatically renewed when it expires. If you need to manually renew the secret, open Azure AD B2C in the Azure portal, go to **Identity providers** > **Apple**, and select **Renew secret**.
> - Follow the guidelines how to [offer Sign in with Apple button](#customize-your-user-interface).

## Add the Apple identity provider to a user flow

To enable users to sign in using an Apple ID, you need to add the Apple identity provider to a user flow. Sign in with Apple can be configured only for the **recommended** version of user flows. To add the Apple identity provider to a user flow:

1. In your Azure AD B2C tenant, select **User flows**.
1. Select a user flow for which you want to add the Apple identity provider. 
1. Under **Social identity providers**, select **Apple**.
1. Select **Save**.
1. To test your policy, select **Run user flow**.
1. For **Application**, select the web application named *testapp1* that you previously registered. The **Reply URL** should show `https://jwt.ms`.
1. Select the **Run user flow** button.
1. From the sign-up or sign-in page, select **Apple** to sign in with Apple ID.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.



**Applies to: b2c-custom-policy**


## Signing the client secret

Use the .p8 file you downloaded previously to sign the client secret into a JWT. There are many libraries that can create and sign the JWT for you. Use the [Azure Function that creates a token](https://github.com/azure-ad-b2c/samples/tree/master/policies/sign-in-with-apple/azure-function) for you. 

1. Create an [Azure Function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-function-app-portal.md).
1. Under **Developer**, select **Code + Test**. 
1. Copy the content of the [run.csx](https://github.com/azure-ad-b2c/samples/blob/master/policies/sign-in-with-apple/azure-function/run.csx) file, and paste it in the editor.
1. Select **Save**.
1. Make an HTTP `POST` request, and  provide the following information:

    - **appleTeamId**: Your Apple Developer Team ID
    - **appleServiceId**: The Apple Service ID (client ID)
    - **appleKeyId**: The 10 digit Key ID stored in the JWT Header (required by Apple)
    - **p8key**: The PEM format key. You can obtain this by opening the .p8 file in a text editor and copying everything between 
    `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` without line breaks.
 
The following json is an example of a call to the Azure function:

```json
{
    "appleTeamId": "ABC123DEFG",
    "appleServiceId": "com.yourcompany.app1",
    "appleKeyId": "URKEYID001",
    "p8key": "MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg+s07NiAcuGEu8rxsJBG7ttupF6FRe3bXdHxEipuyK82gCgYIKoZIzj0DAQehRANCAAQnR1W/KbbaihTQayXH3tuAXA8Aei7u7Ij5OdRy6clOgBeRBPy1miObKYVx3ki1msjjG2uGqRbrc1LvjLHINWRD"
}
```

The Azure function responds with a properly formatted and signed client secret JWT in a response, for example:

```json
{
    "token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb20ueW91cmNvbXBhbnkuYXBwMSIsIm5iZiI6MTU2MDI2OTY3NSwiZXhwIjoxNTYwMzU2MDc1LCJpc3MiOiJBQkMxMjNERUZHIiwiYXVkIjoiaHR0cHM6Ly9hcHBsZWlkLmFwcGxlLmNvbSJ9.Dt9qA9NmJ_mk6tOqbsuTmfBrQLFqc9BnSVKR6A-bf9TcTft2XmhWaVODr7Q9w1PP3QOYShFXAnNql5OdNebB4g"
}
```

## Create a policy key

You need to store the client secret that you previously recorded in your Azure AD B2C tenant.

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Under **Azure services**, select **Azure AD B2C**. Or use the search box to find and select **Azure AD B2C**.
1. On the **Overview** page, select **Identity Experience Framework**.
1. Select **Policy Keys**, and then select **Add**.
1. For **Options**, choose **Manual**.
1. Enter a **Name** for the policy key. For example, "AppleSecret". The prefix "B2C_1A_" is added automatically to the name of your key.
1. In **Secret**, enter the value of a token returned by the Azure Function (a JWT).
1. For **Key usage**, select **Signature**.
1. Select **Create**.

> **Important:** 
> - Sign in with Apple requires the Admin to renew their client secret every 6 months.
> - You'll need to manually renew the Apple client secret if it expires and store the new value in the policy key.
> - We recommend you set your own reminder within 6 months to generate a new client secret. 
> - Follow the guidelines how to [offer Sign in with Apple button](#customize-your-user-interface).

## Configure Apple as an identity provider

To enable users to sign in using an Apple ID, you need to define the account as a claims provider that Azure AD B2C can communicate with through an endpoint. The endpoint provides a set of claims that are used by Azure AD B2C to verify that a specific user is authenticated.

You can define an Apple ID as a claims provider by adding it to the **ClaimsProviders** element in the extension file of your policy.

1. Open the *TrustFrameworkExtensions.xml*.
2. Find the **ClaimsProviders** element. If it does not exist, add it under the root element.
3. Add a new **ClaimsProvider** as follows:

    ```xml
    <ClaimsProvider>
      <Domain>apple.com</Domain>
      <DisplayName>Apple</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="Apple-OIDC">
          <DisplayName>Sign in with Apple</DisplayName>
          <Protocol Name="OpenIdConnect" />
          <Metadata>
            <Item Key="ProviderName">apple</Item>
            <Item Key="authorization_endpoint">https://appleid.apple.com/auth/authorize</Item>
            <Item Key="AccessTokenEndpoint">https://appleid.apple.com/auth/token</Item>
            <Item Key="JWKS">https://appleid.apple.com/auth/keys</Item>
            <Item Key="issuer">https://appleid.apple.com</Item>
            <Item Key="scope">name email openid</Item>
            <Item Key="HttpBinding">POST</Item>
            <Item Key="response_types">code</Item>
            <Item Key="external_user_identity_claim_id">sub</Item>
            <Item Key="response_mode">form_post</Item>
            <Item Key="ReadBodyClaimsOnIdpRedirect">user.name.firstName user.name.lastName user.email</Item>
            <Item Key="client_id">You Apple ID</Item>
            <Item Key="UsePolicyInRedirectUri">false</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="client_secret" StorageReferenceId="B2C_1A_AppleSecret"/>
          </CryptographicKeys>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="issuerUserId" PartnerClaimType="sub" />
            <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="https://appleid.apple.com" AlwaysUseDefaultValue="true" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" AlwaysUseDefaultValue="true" />
            <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="user.name.firstName"/>
            <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="user.name.lastName"/>
            <OutputClaim ClaimTypeReferenceId="email" />
          </OutputClaims>
          <OutputClaimsTransformations>
            <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>
            <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>
            <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>
            <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>
          </OutputClaimsTransformations>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
    ```

4. Set **client_id** to the service identifier. For example, `com.consoto.azure-ad-b2c-service`.
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
    <ClaimsProviderSelection TargetClaimsExchangeId="AppleExchange" />
  </ClaimsProviderSelections>
  ...
</OrchestrationStep>

<OrchestrationStep Order="2" Type="ClaimsExchange">
  ...
  <ClaimsExchanges>
    <ClaimsExchange Id="AppleExchange" TechnicalProfileReferenceId="Apple-OIDC" />
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
1. From the sign-up or sign-in page, select **Apple** to sign in with Apple ID.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.



## Customize your user interface

Follow the guidelines how to [offer Sign in with Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple). Apple provides several **Sign in with Apple** buttons you can use to let people set up an account and sign in. If necessary, create a custom button to offer Sign in with Apple. Learn how to [display a Sign in with Apple button](https://developer.apple.com/design/human-interface-guidelines/buttons).

To align with the Apple user interface guidelines:

- [Customize the user interface with HTML templates](customize-ui-with-html.md)
- [Localize](language-customization.md) the identity provider name.
