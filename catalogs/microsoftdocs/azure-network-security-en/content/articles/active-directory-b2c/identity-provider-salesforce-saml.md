---
title: Set up sign-in with a Salesforce SAML provider by using SAML protocol
titleSuffix: Azure AD B2C
description: Set up sign-in with a Salesforce SAML provider by using SAML protocol in Azure Active Directory B2C.
author: garrodonnell
manager: CelesteDG
ms.service: entra-id
ms.topic: how-to
ms.date: 09/16/2021
ms.author: godonnell
ms.subservice: b2c
zone_pivot_groups: b2c-policy-type

#Customer Intent: As a developed using Azure Active Directory B2C, I want to set up sign-in with a Salesforce SAML provider, so that users from my Salesforce organization can sign in to Azure AD B2C using their Salesforce accounts.

---

# Set up sign-in with a Salesforce SAML provider by using SAML protocol in Azure Active Directory B2C


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

***Before you begin***, use the **Choose a policy type** selector at the top of this page to choose the type of policy you’re setting up. Azure Active Directory B2C offers two methods to define how users interact with your applications: through predefined [user flows](user-flow-overview.md) or through fully configurable [custom policies](custom-policy-overview.md). The steps required in this article are different for each method. 	



**Applies to: b2c-user-flow**

This feature is available only for custom policies. For setup steps, select **Custom policy** in the preceding selector.




**Applies to: b2c-custom-policy**


> **Note:**
> In Azure Active Directory B2C, [custom policies](user-flow-overview.md) are designed primarily to address complex scenarios. For most scenarios, we recommend that you use built-in [user flows](user-flow-overview.md). If you've not done so, learn about custom policy starter pack in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md).

This article shows you how to enable sign-in for users from a Salesforce organization using [custom policies](custom-policy-overview.md) in Azure Active Directory B2C (Azure AD B2C). You enable sign-in by adding a [SAML identity provider](identity-provider-generic-saml.md) to a custom policy.

## Prerequisites


* Complete the steps in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md?pivots=b2c-custom-policy). This tutorial guides you how to update custom policy files to use your Azure AD B2C tenant configuration.  
* If you haven't registered a web app, register one by using the steps in [register a web application](tutorial-register-applications.md). 


- If you haven't already done so, sign up for a [free Developer Edition account](https://developer.salesforce.com/signup). This article uses the [Salesforce Lightning Experience](https://trailhead.salesforce.com/content/learn/trails/lex_admin_implementation).
- [Set up a My Domain](https://help.salesforce.com/s/articleView?id=domain_name_setup.htm&language=en_US&type=0) for your Salesforce organization.

## Set up Salesforce as an identity provider

1. [Sign in to Salesforce](https://login.salesforce.com/).
2. On the left menu, under **Settings**, expand **Identity**, and then select **Identity Provider**.
3. Select **Enable Identity Provider**.
4. Under **Select the certificate**, select the certificate you want Salesforce to use to communicate with Azure AD B2C. You can use the default certificate.
5. Click **Save**.

### Create a connected app in Salesforce

1. On the **Identity Provider** page, select **Service Providers are now created via Connected Apps. Click here.**
2. Under **Basic Information**,  enter the required values for your connected app.
3. Under **Web App Settings**, check the **Enable SAML** box.
4. In the **Entity ID** field, enter the following URL. Make sure that you replace the value for `your-tenant` with the name of your Azure AD B2C tenant.

      ```
      https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1A_TrustFrameworkBase
      ```

      When using a [custom domain](custom-domain.md), use the following format:

      ```
      https://your-domain-name/your-tenant.onmicrosoft.com/B2C_1A_TrustFrameworkBase
      ```

6. In the **ACS URL** field, enter the following URL. Make sure that you replace the value for `your-tenant` with the name of your Azure AD B2C tenant.

      ```
      https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1A_TrustFrameworkBase/samlp/sso/assertionconsumer
      ```

      When using a [custom domain](custom-domain.md), use the following format:

      ```
      https://your-domain-name/your-tenant.onmicrosoft.com/B2C_1A_TrustFrameworkBase/samlp/sso/assertionconsumer
      ```

7. Scroll to the bottom of the list, and then click **Save**.

### Get the metadata URL

1. On the overview page of your connected app, click **Manage**.
2. Copy the value for **Metadata Discovery Endpoint**, and then save it. You'll use it later in this article.

### Set up Salesforce users to federate

1. On the **Manage** page of your connected app, click **Manage Profiles**.
2. Select the profiles (or groups of users) that you want to federate with Azure AD B2C. As a system administrator, select the **System Administrator** check box, so that you can federate by using your Salesforce account.

## Create a self-signed certificate


If you don't already have a certificate, you can use a self-signed certificate. A self-signed certificate is a security certificate that is not signed by a certificate authority (CA) and doesn't provide the security guarantees of a certificate signed by a CA. 

# [Windows](#tab/windows)

On Windows, use the [New-SelfSignedCertificate](https://learn.microsoft.com/powershell/module/pki/new-selfsignedcertificate) cmdlet in PowerShell to generate a certificate.

1. Run the following PowerShell command to generate a self-signed certificate. Modify the `-Subject` argument as appropriate for your application and Azure AD B2C tenant name such as `contosowebapp.contoso.onmicrosoft.com`. You can also adjust the `-NotAfter` date to specify a different expiration for the certificate.

    ```PowerShell
    New-SelfSignedCertificate `
        -KeyExportPolicy Exportable `
        -Subject "CN=yourappname.yourtenant.onmicrosoft.com" `
        -KeyAlgorithm RSA `
        -KeyLength 2048 `
        -KeyUsage DigitalSignature `
        -NotAfter (Get-Date).AddMonths(12) `
        -CertStoreLocation "Cert:\CurrentUser\My"
    ```

1. On Windows computer, search for and select **Manage user certificates** 
1. Under **Certificates - Current User**, select **Personal** > **Certificates**>*yourappname.yourtenant.onmicrosoft.com*.
1. Select the certificate, and then select **Action** > **All Tasks** > **Export**.
1. Select **Next** > **Yes, export the private key** > **Next**.
1. Accept the defaults for **Export File Format**, and then select **Next**.
1. Enable **Password** option, enter a password for the certificate, and then select **Next**.
1. To specify a location to save your certificate, select **Browse** and navigate to a directory of your choice. 
1. On the **Save As** window, enter a **File name**, and then select **Save**.
1. Select **Next**>**Finish**.

For Azure AD B2C to accept the .pfx file password, the password must be encrypted with the TripleDES-SHA1 option in the Windows Certificate Store Export utility, as opposed to AES256-SHA256.

# [macOS](#tab/macos)

On macOS, use [Certificate Assistant](https://support.apple.com/guide/keychain-access/aside/glosa3ed0609/11.0/mac/11.0) in Keychain Access to generate a certificate.

1. Follow the instructions for how to [create self-signed certificates in Keychain Access on a Mac](https://support.apple.com/guide/keychain-access/kyca8916/mac).
1. In the Keychain Access app on your Mac, select the certificate that you created.
1. Select **File** > **Export Items**.
1. Select a file name to save your certificate. For example: **self-signed-certificate.p12**.
1. For **File Format**, select **Personal Information Exchange (.p12)**.
1. Select **Save**.
1. Enter a password in the **Password** and **Verify** boxes.
1. Replace the file extension to .pfx. For example: **self-signed-certificate.pfx**.

---


## Create a policy key

You need to store the certificate that you created in your Azure AD B2C tenant.

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Choose **All services** in the top-left corner of the Azure portal, and then search for and select **Azure AD B2C**.
1. On the Overview page, select **Identity Experience Framework**.
1. Select **Policy Keys** and then select **Add**.
1. For **Options**, choose `Upload`.
1. Enter a **Name** for the policy. For example, SAMLSigningCert. The prefix `B2C_1A_` is automatically added to the name of your key.
1. Browse to and select the B2CSigningCert.pfx certificate that you created.
1. Enter the **Password** for the certificate.
1. Click **Create**.

## Add a claims provider

If you want users to sign in using a Salesforce account, you need to define the account as a claims provider that Azure AD B2C can communicate with through an endpoint. The endpoint provides a set of claims that are used by Azure AD B2C to verify that a specific user has authenticated.

You can define a Salesforce account as a claims provider by adding it to the **ClaimsProviders** element in the extension file of your policy. For more information, see [define a SAML identity provider](identity-provider-generic-saml.md).

1. Open the *TrustFrameworkExtensions.xml*.
1. Find the **ClaimsProviders** element. If it does not exist, add it under the root element.
1. Add a new **ClaimsProvider** as follows:

    ```xml
    <ClaimsProvider>
      <Domain>salesforce.com</Domain>
      <DisplayName>Salesforce</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="Salesforce-SAML2">
          <DisplayName>Salesforce</DisplayName>
          <Description>Login with your Salesforce account</Description>
          <Protocol Name="SAML2"/>
          <Metadata>
            <Item Key="WantsEncryptedAssertions">false</Item>
            <Item Key="WantsSignedAssertions">false</Item>
            <Item Key="PartnerEntity">https://contoso-dev-ed.my.salesforce.com/.well-known/samlidp.xml</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="SamlMessageSigning" StorageReferenceId="B2C_1A_SAMLSigningCert"/>
          </CryptographicKeys>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="issuerUserId" PartnerClaimType="userId"/>
            <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name"/>
            <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="family_name"/>
            <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email"/>
            <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="username"/>
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication"/>
            <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="salesforce.com" />
          </OutputClaims>
          <OutputClaimsTransformations>
            <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>
            <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>
            <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>
            <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>
          </OutputClaimsTransformations>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-Saml-idp"/>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
    ```

1. Update the value of **PartnerEntity** with the Salesforce metadata URL you copied earlier.
1. Update the value of both instances of **StorageReferenceId** to the name of the key of your signing certificate. For example, B2C_1A_SAMLSigningCert.
1. Locate the `<ClaimsProviders>` section and add the following XML snippet. If your policy already contains the `SM-Saml-idp` technical profile, skip to the next step. For more information, see [single sign-on session management](custom-policy-reference-sso.md).

    ```xml
    <ClaimsProvider>
      <DisplayName>Session Management</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="SM-Saml-idp">
          <DisplayName>Session Management Provider</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.SSO.SamlSSOSessionProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="IncludeSessionIndex">false</Item>
            <Item Key="RegisterServiceProviders">false</Item>
          </Metadata>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
    ```
1. Save the file.

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
    <ClaimsProviderSelection TargetClaimsExchangeId="SalesforceExchange" />
  </ClaimsProviderSelections>
  ...
</OrchestrationStep>

<OrchestrationStep Order="2" Type="ClaimsExchange">
  ...
  <ClaimsExchanges>
    <ClaimsExchange Id="SalesforceExchange" TechnicalProfileReferenceId="Salesforce-SAML2" />
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
1. From the sign-up or sign-in page, select **Salesforce** to sign in with Salesforce account.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.
