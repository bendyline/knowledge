---
title: Set up sign-up and sign-in with SAML identity provider
titleSuffix: Azure Active Directory B2C
description: Set up sign-up and sign-in with any SAML identity provider (IdP) in Azure Active Directory B2C.
author: garrodonnell
manager: CelesteDG
ms.service: entra-id
ms.topic: how-to
ms.date: 01/24/2024
ms.author: godonnell
ms.subservice: b2c
zone_pivot_groups: b2c-policy-type
ms.custom: sfi-image-nochange

#Customer Intent: As a developer integrating Azure AD B2C with a SAML identity provider, I want to configure the SAML technical profile and map the claims, so that users can sign in to my application using an existing social or enterprise identity.

---


# Set up sign-up and sign-in with SAML identity provider using Azure Active Directory B2C


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

Azure Active Directory B2C (Azure AD B2C) supports federation with SAML 2.0 identity providers. This article shows you how to enable sign-in with a SAML identity provider user account, allowing users to sign in with their existing social or enterprise identities, such as [ADFS](identity-provider-adfs.md) and [Salesforce](identity-provider-salesforce-saml.md).

***Before you begin***, use the **Choose a policy type** selector at the top of this page to choose the type of policy you’re setting up. Azure Active Directory B2C offers two methods to define how users interact with your applications: through predefined [user flows](user-flow-overview.md) or through fully configurable [custom policies](custom-policy-overview.md). The steps required in this article are different for each method. 	



**Applies to: b2c-user-flow**


This feature is available only for custom policies. For setup steps, select **Custom policy** in the preceding selector.




**Applies to: b2c-custom-policy**


## Scenario overview

You can configure Azure AD B2C to allow users to sign in to your application with credentials from external social or enterprise SAML identity providers (IdP). When Azure AD B2C federates with a SAML identity provider, it acts as a **service provider** initiating a SAML request to the SAML **identity provider**, and waiting for a SAML response. In the following diagram:

1. The application initiates an authorization request to Azure AD B2C. The application can be an [OAuth 2.0](protocols-overview.md) or [OpenId Connect](openid-connect.md) application, or a [SAML service provider](saml-service-provider.md). 
1. In the Azure AD B2C sign-in page, the user chooses to sign-in with a SAML identity provider account (for example, *Contoso*). Azure AD B2C initiates a SAML authorization request and takes the user to the SAML identity provider to complete the sign-in.
1. The SAML identity provider returns a SAML response.
1. Azure AD B2C validates the SAML token, extracts claims, issues its own token, and  takes the user back to the application.  

Sign in with SAML identity provider flow

## Prerequisites


* Complete the steps in [Get started with custom policies in Active Directory B2C](tutorial-create-user-flows.md?pivots=b2c-custom-policy). This tutorial guides you how to update custom policy files to use your Azure AD B2C tenant configuration.  
* If you haven't registered a web app, register one by using the steps in [register a web application](tutorial-register-applications.md). 



## Components of the solution

The following components required are for this scenario:

* A SAML **identity provider** with the ability to receive, decode, and respond to SAML requests from Azure AD B2C.
* A publicly available SAML **metadata endpoint** for your identity provider.
* An [Azure AD B2C tenant](tutorial-create-tenant.md).


> **Important:**
> Your endpoints must comply with the Azure AD B2C security requirements. Older TLS versions and ciphers are deprecated. For more information, see [Azure AD B2C TLS and cipher suite requirements](https-cipher-tls-requirements.md). 



## Create a policy key

To establish trust between Azure AD B2C and your SAML identity provider, you need to provide a valid X509 certificate with the private key. Azure AD B2C signs the SAML requests, using the private key of the certificate. The identity provider validates the request using the public key of the certificate. The public key is accessible through technical profile metadata. Alternatively, you can manually upload the .cer file to your SAML identity provider.

A self-signed certificate is acceptable for most scenarios. For production environments, it is recommended to use an X509 certificate that is issued by a certificate authority. Also, as described later in this document, for a non-production environment you can disable the SAML signing on both sides.

### Obtain a certificate


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


### Upload the certificate

You need to store your certificate in your Azure AD B2C tenant.

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. Choose **All services** in the top-left corner of the Azure portal, and then search for and select **Azure AD B2C**.
1. On the Overview page, select **Identity Experience Framework**.
1. Select **Policy Keys** and then select **Add**.
1. For **Options**, choose `Upload`.
1. Enter a **Name** for the policy key. For example, `SAMLSigningCert`. The prefix `B2C_1A_` is added automatically to the name of your key.
1. Browse to and select your certificate .pfx file with the private key.
1. Click **Create**.

## Configure the SAML technical profile

Define the SAML identity provider by adding it to the **ClaimsProviders** element in the extension file of your policy. The claims providers contains a SAML technical profile that determines the endpoints and the protocols needed to communicate with the SAML identity provider. To add a claims provider with a SAML technical profile:

1. Open the *TrustFrameworkExtensions.xml*.
1. Find the **ClaimsProviders** element. If it does not exist, add it under the root element.
1. Add a new **ClaimsProvider** as follows:

    ```xml
    <ClaimsProvider>
      <Domain>Contoso.com</Domain>
      <DisplayName>Contoso</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="Contoso-SAML2">
          <DisplayName>Contoso</DisplayName>
          <Description>Login with your SAML identity provider account</Description>
          <Protocol Name="SAML2"/>
          <Metadata>
            <Item Key="PartnerEntity">https://your-AD-FS-domain/federationmetadata/2007-06/federationmetadata.xml</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="SamlMessageSigning" StorageReferenceId="B2C_1A_SAMLSigningCert"/>
          </CryptographicKeys>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="issuerUserId" PartnerClaimType="assertionSubjectName" />
            <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="first_name" />
            <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="last_name" />
            <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="http://schemas.microsoft.com/identity/claims/displayname" />
            <OutputClaim ClaimTypeReferenceId="email"  />
            <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="contoso.com" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />
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

Update the following XML elements with the relevant value:

| XML element | Value |
| --- | --- |
| ClaimsProvider\Domain | The domain name that is used for [direct sign-in](direct-signin.md?pivots=b2c-custom-policy#redirect-sign-in-to-a-social-provider). Enter the domain name you want to use in the direct sign-in. For example, *Contoso.com*. |
| TechnicalProfile\DisplayName | This value will be displayed on the sign-in button on your sign-in screen. For example, *Contoso*. |
| Metadata\PartnerEntity | URL of the metadata of the SAML identity provider. Or you can copy the identity provider metadata and add it inside the CDATA element `<![CDATA[Your IDP metadata]]>`. |

## Map the claims

The **OutputClaims** element contains a list of claims returned by the SAML identity provider. Map the name of the claim defined in your policy to the assertion name defined in the identity provider. Check your identity provider for the list of claims (assertions). For more information, see [claims-mapping](identity-provider-generic-saml-options.md#claims-mapping).

In the example above, *Contoso-SAML2* includes the claims returned by a SAML identity provider:

* The **assertionSubjectName** claim is mapped to the **issuerUserId** claim.
* The **first_name** claim is mapped to the **givenName** claim.
* The **last_name** claim is mapped to the **surname** claim.
* The `http://schemas.microsoft.com/identity/claims/displayname` claim is mapped to the **displayName** claim.
* The **email** claim without name mapping.

The technical profile also returns claims that aren't returned by the identity provider:

* The **identityProvider** claim that contains the name of the identity provider.
* The **authenticationSource** claim with a default value of **socialIdpAuthentication**.
 
### Add the SAML session technical profile

If you don't already have the `SM-Saml-idp` SAML session technical profile, add one to your extension policy. Locate the `<ClaimsProviders>` section and add the following XML snippet. If your policy already contains the `SM-Saml-idp` technical profile, skip to the next step. For more information, see [single sign-on session management](custom-policy-reference-sso.md).

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
    <ClaimsExchange Id="ContosoExchange" TechnicalProfileReferenceId="Contoso-SAML2" />
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





## Configure your SAML identity provider

After your policy is configured, you need to configure your SAML identity provider with the Azure AD B2C SAML metadata. The SAML metadata is information used in the SAML protocol to expose the configuration of your policy, the **service provider**. It defines the location of the services, such as sign-in and sign-out, certificates, sign-in method, and more.

Each SAML identity provider has different steps for setting a service provider. Some SAML identity providers ask for the Azure AD B2C metadata, while others require you to go through the metadata file manually and provide the information. Refer to your identity provider’s documentation for guidance.

The following example shows a URL address for the SAML metadata of an Azure AD B2C technical profile:

```
https://<your-tenant-name>.b2clogin.com/<your-tenant-name>.onmicrosoft.com/<your-policy>/samlp/metadata?idptp=<your-technical-profile>
```

When using a [custom domain](custom-domain.md), use the following format:

```
https://your-domain-name/<your-tenant-name>.onmicrosoft.com/<your-policy>/samlp/metadata?idptp=<your-technical-profile>
```

Replace the following values:

- **your-tenant-name** with your tenant name, such as your-tenant.onmicrosoft.com.
- **your-domain-name** with your custom domain name, such as login.contoso.com.
- **your-policy** with your policy name. For example, B2C_1A_signup_signin_adfs.
- **your-technical-profile** with the name of your SAML identity provider technical profile. For example, Contoso-SAML2.

Open a browser and navigate to the URL. Make sure you type the correct URL and that you have access to the XML metadata file.

## Test your custom policy

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. In the Azure portal, search for and select **Azure AD B2C**.
1. Under **Policies**, select **Identity Experience Framework**
1. Select your relying party policy, for example `B2C_1A_signup_signin`.
1. For **Application**, select a web application that you [previously registered](tutorial-register-applications.md). The **Reply URL** should show `https://jwt.ms`.
1. Select the **Run now** button.
1. From the sign-up or sign-in page, select **Contoso** to sign in with Contoso account.

If the sign-in process is successful, your browser is redirected to `https://jwt.ms`, which displays the contents of the token returned by Azure AD B2C.

## Next steps

- [Configure SAML identity provider options with Azure Active Directory B2C](identity-provider-generic-saml-options.md)
