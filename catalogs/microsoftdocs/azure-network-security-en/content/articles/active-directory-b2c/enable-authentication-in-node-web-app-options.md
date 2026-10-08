---
title: Enable Node.js web app authentication options using Azure Active Directory B2C
description:  This article discusses several ways to enable Node.js web app authentication options.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: b2c-support, devx-track-js


#Customer intent: As a Node.js web app developer, I want to enable and customize Azure Active Directory B2C authentication in my application, so that I can provide a secure and personalized authentication experience for my users.

---

# Enable authentication options in a Node.js web app by using Azure Active Directory B2C 

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article describes how to enable, customize, and enhance the Azure Active Directory B2C (Azure AD B2C) authentication experience for your Node.js web application. 

Before you start, it's important to familiarize yourself with the following articles: 

- [Configure authentication in a Node.js sample web app](configure-a-sample-node-web-app.md)
- [Enable authentication in your own Node.js web app](enable-authentication-in-node-web-app.md).

## Use a custom domain

By using a [custom domain](custom-domain.md), you can fully brand the authentication URL. From a user perspective, users remain on your domain during the authentication process, rather than being redirected to the Azure AD B2C b2clogin.com domain name.

To remove all references to "b2c" in the URL, you can also replace your B2C tenant name, contoso.onmicrosoft.com, in the authentication request URL with your tenant ID GUID. For example, you can change `https://fabrikamb2c.b2clogin.com/contoso.onmicrosoft.com/` to `https://account.contosobank.co.uk/<tenant ID GUID>/`.


To use a custom domain and your tenant ID in the authentication URL, follow the guidance in [Enable custom domains](custom-domain.md). Under the project root folder, open the *.env* file. This file contains information about your Azure AD B2C identity provider.

In the *.env* file, do the following:

- Replace all instances of `tenant-name.b2clogin.com` with your custom domain. For example, replace `tenant-name.b2clogin.com`, to `login.contoso.com`.
- Replace all instances of `tenant-name.onmicrosoft.com` with your [tenant ID]( tenant-management-read-tenant-name.md#get-your-tenant-id). For more information, see [Use tenant ID](custom-domain.md#optional-use-tenant-id).

The following configuration shows the app settings before the change: 

```text
#B2C sign up and sign in user flow/policy authority
SIGN_UP_SIGN_IN_POLICY_AUTHORITY=https://contoso.b2clogin.com/contoso.onmicrosoft.com/B2C_1_susi
#B2C password reset user flow/policy authority
RESET_PASSWORD_POLICY_AUTHORITY=https://contoso.b2clogin.com/contoso.onmicrosoft.com/B2C_1_passwordreset
#B2C edit profile user flow/policy authority
EDIT_PROFILE_POLICY_AUTHORITY=https://contoso.b2clogin.com/contoso.onmicrosoft.com/B2C_1_edit
#B2C authority domain
AUTHORITY_DOMAIN=https://contoso.b2clogin.com
#client redirect url
APP_REDIRECT_URI=http://localhost:3000/redirect
#Logout endpoint 
LOGOUT_ENDPOINT=https://contoso.b2clogin.com/contoso.onmicrosoft.com/B2C_1_susi/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:3000
```  

The following configuration shows the app settings after the change: 

```text
#B2C sign up and sign in user flow/policy authority
SIGN_UP_SIGN_IN_POLICY_AUTHORITY=https://login.contoso.com/12345678-0000-0000-0000-000000000000/B2C_1_susi
#B2C password reset user flow/policy authority
RESET_PASSWORD_POLICY_AUTHORITY=https://login.contoso.com/12345678-0000-0000-0000-000000000000/B2C_1_passwordreset
#B2C edit profile user flow/policy authority
EDIT_PROFILE_POLICY_AUTHORITY=https://login.contoso.com/12345678-0000-0000-0000-000000000000/B2C_1_edit
#B2C authority domain
AUTHORITY_DOMAIN=https://login.contoso.com
#client redirect url
APP_REDIRECT_URI=http://localhost:3000/redirect
#Logout endpoint 
LOGOUT_ENDPOINT=https://login.contoso.com/12345678-0000-0000-0000-000000000000/B2C_1_susi/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:3000
``` 

## Prepopulate the sign-in name

During a sign-in user journey, your app might target a specific user. When an app targets a user, it can specify in the authorization request the `login_hint` query parameter with the user's sign-in name. Azure AD B2C automatically populates the sign-in name, and the user needs to provide only the password. 

To prepopulate the sign-in name, do the following:

1. If you're using a custom policy, add the required input claim, as described in [Set up direct sign-in](direct-signin.md#prepopulate-the-sign-in-name). 
1. Find the `authCodeRequest` object, and set `loginHint` attribute with the login hint.

The following code snippets demonstrate how to pass the sign-in hint parameter. It uses bob@contoso.com as the attribute value.

```javascript
authCodeRequest.loginHint = "bob@contoso.com"

return confidentialClientApplication.getAuthCodeUrl(authCodeRequest)
        .then((response) => {
```

## Preselect an identity provider

If you configured the sign-in journey for your application to include social accounts, such as Facebook, LinkedIn, or Google, you can specify the `domain_hint` parameter. This query parameter provides a hint to Azure AD B2C about the social identity provider that should be used for sign-in. For example, if the application specifies `domain_hint=facebook.com`, the sign-in flow goes directly to the Facebook sign-in page. 

To redirect users to an external identity provider, do the following:


1. Check the domain name of your external identity provider. For more information, see [Redirect sign-in to a social provider](direct-signin.md#redirect-sign-in-to-a-social-provider).
1. Find the `authCodeRequest` object, and set `domainHint` attribute with the corresponding domain hint.

The following code snippets demonstrate how to pass the domain hint parameter. It uses facebook.com as the attribute value.

```javascript
authCodeRequest.domainHint = "facebook.com"

return confidentialClientApplication.getAuthCodeUrl(authCodeRequest)
        .then((response) => {
```

## Specify the UI language

Language customization in Azure AD B2C allows your user flow to accommodate a variety of languages to suit your customers' needs. For more information, see [Language customization](language-customization.md).

To set the preferred language, do the following:


1. [Configure language customization](language-customization.md).
1. Find the `authCodeRequest` object, and set `extraQueryParameters` attribute with the corresponding `ui_locales` extra parameter.

The following code snippets demonstrate how to pass the `ui_locales` parameter. It uses `es-es` as the attribute value.

```javascript
authCodeRequest.extraQueryParameters = {"ui_locales" : "es-es"}

return confidentialClientApplication.getAuthCodeUrl(authCodeRequest)
        .then((response) => {
```

## Pass a custom query string parameter

With custom policies, you can pass a custom query string parameter. A good use-case example is when you want to [dynamically change the page content](customize-ui-with-html.md?pivots=b2c-custom-policy#configure-dynamic-custom-page-content-uri).

To pass a custom query string parameter, do the following:

1. Configure the [ContentDefinitionParameters](customize-ui-with-html.md#configure-dynamic-custom-page-content-uri) element.
1. Find the `authCodeRequest` object, and set `extraQueryParameters` attribute with the corresponding extra parameter.

The following code snippets demonstrate how to pass the `campaignId` custom query string parameter. It uses `germany-promotion` as the attribute value.

```javascript
authCodeRequest.extraQueryParameters = {"campaignId" : "germany-promotion"}

return confidentialClientApplication.getAuthCodeUrl(authCodeRequest)
        .then((response) => {
```

## Pass an ID token hint

A relying party application can send an inbound JSON Web Token (JWT) as part of the OAuth2 authorization request.  The inbound token is a hint about the user or the authorization request. Azure AD B2C validates the token and then extracts the claim.

To include an ID token hint in the authentication request, do the following:

1. In your custom policy, define an [ID token hint technical profile](id-token-hint.md).
1. Find the `authCodeRequest` object, and set `extraQueryParameters` attribute with the corresponding `id_token_hint` extra parameter.

The following code snippets demonstrate how to define an ID token hint:

```javascript
authCodeRequest.extraQueryParameters = {"id_token_hint": idToken}

return confidentialClientApplication.getAuthCodeUrl(authCodeRequest)
```

## Configure logging

The MSAL library generates log messages that can help diagnose problems. The app can configure logging. The app can also give you custom control over the level of detail and whether personal and organizational data is logged. 

We recommend that you create an MSAL logging callback and provide a way for users to submit logs when they have authentication problems. MSAL provides these levels of logging detail:

- **Error**: Something has gone wrong, and an error was generated. This level is used for debugging and identifying problems.
- **Warning**: There hasn't necessarily been an error or failure, but the information is intended for diagnostics and pinpointing problems.
- **Info**: MSAL logs events that are intended for informational purposes and not necessarily for debugging.
- **Verbose**: This is the default level. MSAL logs the full details of library behavior.

By default, the MSAL logger doesn't capture any personal or organizational data. The library gives you the option to enable logging of personal and organizational data if you decide to do so.


To configure [logging](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/logging.md), in *index.js*, configure the following keys:

- `logLevel` lets you specify the level of logging. Possible values: `Error`, `Warning`, `Info`, and `Verbose`.
- `piiLoggingEnabled` enables the input of personal data. Possible values: `true` or `false`.
 
The following code snippet demonstrates how to configure MSAL logging:

```javascript
 const confidentialClientConfig = {
    ...
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};
```

## Next steps

Learn more about [MSAL.js configuration options](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md).
