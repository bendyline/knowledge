---
title: Enable React application options by using Azure Active Directory B2C
description:  Enable the use of React application options in several ways.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: "b2c-support"


#Customer intent: As a React application developer, I want to configure authentication options using Azure Active Directory B2C, so that I can customize and enhance the authentication experience for my single-page application.

---

# Configure authentication options in a React application by using Azure Active Directory B2C

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article describes ways you can customize and enhance the Azure Active Directory B2C (Azure AD B2C) authentication experience for your React single-page application (SPA). Before you start, familiarize yourself with the article [Configure authentication in a React SPA](configure-authentication-sample-react-spa-app.md) or [Enable authentication in your own React SPA](enable-authentication-react-spa-app.md).


## Sign-in and sign-out behavior


You can configure your single-page application to sign in users with MSAL.js in two ways:

- **Pop-up window**: The authentication happens in a pop-up window, and the state of the application is preserved. Use this approach if you don't want users to move away from your application page during authentication. There are known issues with pop-up windows on Internet Explorer.
  - To sign in with pop-up windows, use the `loginPopup` method.  
  - To sign out with pop-up windows, use the `logoutPopup` method. 
- **Redirect**: The user is redirected to Azure AD B2C to complete the authentication flow. Use this approach if users have browser constraints or policies where pop-up windows are disabled. 
  - To sign in with redirection, use the `loginRedirect` method.  
  - To sign out with redirection, use the `logoutRedirect` method. 
  
The following sample demonstrates how to sign in and sign out:

#### [Pop-up](#tab/popup)


```javascript
// src/components/NavigationBar.jsx
instance.loginPopup(loginRequest)
            .catch((error) => console.log(error))

instance.logoutPopup({ postLogoutRedirectUri: "/", mainWindowRedirectUri: "/" })
```

#### [Redirect](#tab/redirect)

```javascript
// src/components/NavigationBar.jsx
instance.loginRedirect(loginRequest)

instance.logoutRedirect({ postLogoutRedirectUri: "/" })
```

---

## Use a custom domain

By using a [custom domain](custom-domain.md), you can fully brand the authentication URL. From a user perspective, users remain on your domain during the authentication process, rather than being redirected to the Azure AD B2C b2clogin.com domain name.

To remove all references to "b2c" in the URL, you can also replace your B2C tenant name, contoso.onmicrosoft.com, in the authentication request URL with your tenant ID GUID. For example, you can change `https://fabrikamb2c.b2clogin.com/contoso.onmicrosoft.com/` to `https://account.contosobank.co.uk/<tenant ID GUID>/`.


To use your custom domain for your tenant ID in the authentication URL, follow the guidance in [Enable custom domains](custom-domain.md). Open the `src/authConfig.js` MSAL configuration object and change `authorities` and `knownAuthorities` to use your custom domain name and tenant ID.  

The following JavaScript shows the MSAL configuration object before the change: 

```javascript
const msalConfig = {
    auth: {
      ...
      authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_susi",
      knownAuthorities: ["fabrikamb2c.b2clogin.com"],
      ...
    },
  ...
}
```  

The following JavaScript shows the MSAL configuration object after the change: 

```javascript
export const b2cPolicies = {
    names: {
        signUpSignIn: "b2c_1_susi",
        forgotPassword: "b2c_1_reset",
        editProfile: "b2c_1_edit_profile"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://custom.domain.com/00000000-0000-0000-0000-000000000000/b2c_1_susi",
        },
        forgotPassword: {
            authority: "https://custom.domain.com/00000000-0000-0000-0000-000000000000/b2c_1_reset",
        },
        editProfile: {
            authority: "https://custom.domain.com/00000000-0000-0000-0000-000000000000/b2c_1_edit_profile"
        }
    },
    authorityDomain: "custom.domain.com"
}
```

## Prepopulate the sign-in name

During a sign-in user journey, your app might target a specific user. When an app targets a user, it can specify in the authorization request the `login_hint` query parameter with the user's sign-in name. Azure AD B2C automatically populates the sign-in name, and the user needs to provide only the password. 

To prepopulate the sign-in name, do the following:

1. If you use a custom policy, add the required input claim as described in [Set up direct sign-in](direct-signin.md#prepopulate-the-sign-in-name). 
1. Create or use an existing `PopupRequest` or `RedirectRequest` MSAL configuration object.
1. Set the `loginHint` attribute with the corresponding sign-in hint. 

The following code snippets demonstrate how to pass the sign-in hint parameter. They use `bob@contoso.com` as the attribute value.

#### [Pop-up](#tab/popup)

```javascript
// src/components/NavigationBar.jsx
loginRequest.loginHint = "bob@contoso.com";
instance.loginPopup(loginRequest);
```

#### [Redirect](#tab/redirect)

```javascript
// src/components/NavigationBar.jsx
loginRequest.loginHint = "bob@contoso.com"; 
instance.loginRedirect(loginRequest);
```

---


## Preselect an identity provider

If you configured the sign-in journey for your application to include social accounts, such as Facebook, LinkedIn, or Google, you can specify the `domain_hint` parameter. This query parameter provides a hint to Azure AD B2C about the social identity provider that should be used for sign-in. For example, if the application specifies `domain_hint=facebook.com`, the sign-in flow goes directly to the Facebook sign-in page. 

To redirect users to an external identity provider, do the following:


1. Check the domain name of your external identity provider. For more information, see [Redirect sign-in to a social provider](direct-signin.md#redirect-sign-in-to-a-social-provider). 
1. Create or use an existing `PopupRequest` or `RedirectRequest` MSAL configuration object.
1. Set the `domainHint` attribute with the corresponding domain hint.

The following code snippets demonstrate how to pass the domain hint parameter. They use `facebook.com` as the attribute value.

#### [Pop-up](#tab/popup)

```javascript
// src/components/NavigationBar.jsx
loginRequest.domainHint = "facebook.com";
instance.loginPopup(loginRequest);
```

#### [Redirect](#tab/redirect)

```javascript
loginRequest.domainHint = "facebook.com";
instance.loginRedirect(loginRequest);
```

---

## Specify the UI language

Language customization in Azure AD B2C allows your user flow to accommodate a variety of languages to suit your customers' needs. For more information, see [Language customization](language-customization.md).

To set the preferred language, do the following:


1. [Configure Language customization](language-customization.md). 
1. Create or use an existing `PopupRequest` or `RedirectRequest` MSAL configuration object with `extraQueryParameters` attributes.
1. Add the `ui_locales` parameter with the corresponding language code to the `extraQueryParameters` attributes.

The following code snippets demonstrate how to pass the domain hint parameter. They use `es-es` as the attribute value.

#### [Pop-up](#tab/popup)

```javascript
// src/components/NavigationBar.jsx
loginRequest.extraQueryParameters = {"ui_locales" : "es-es"};
instance.loginPopup(loginRequest);
```

#### [Redirect](#tab/redirect)

```javascript
loginRequest.extraQueryParameters = {"ui_locales" : "es-es"};
instance.loginRedirect(loginRequest);
```

---
 

## Pass a custom query string parameter

With custom policies, you can pass a custom query string parameter. A good use-case example is when you want to [dynamically change the page content](customize-ui-with-html.md?pivots=b2c-custom-policy#configure-dynamic-custom-page-content-uri).

To pass a custom query string parameter, do the following:

1. Configure the [ContentDefinitionParameters](customize-ui-with-html.md#configure-dynamic-custom-page-content-uri) element.
1. Create or use an existing `PopupRequest` or `RedirectRequest` MSAL configuration object with `extraQueryParameters` attributes.
1. Add the custom query string parameter, such as `campaignId`. Set the parameter value. 

The following code snippets demonstrate how to pass a custom query string parameter. They use `germany-promotion` as the attribute value.


#### [Pop-up](#tab/popup)

```javascript
// src/components/NavigationBar.jsx
loginRequest.extraQueryParameters = {"campaignId": 'germany-promotion'};
instance.loginPopup(loginRequest);
```

#### [Redirect](#tab/redirect)

```javascript
loginRequest.extraQueryParameters = {"campaignId": 'germany-promotion'};
instance.loginRedirect(loginRequest);
```

---


## Pass an ID token hint

A relying party application can send an inbound JSON Web Token (JWT) as part of the OAuth2 authorization request.  The inbound token is a hint about the user or the authorization request. Azure AD B2C validates the token and then extracts the claim.

To include an ID token hint in the authentication request, do the following:

1. In your custom policy, define the [technical profile of an ID token hint](id-token-hint.md).
1. Create or use an existing `PopupRequest` or `RedirectRequest` MSAL configuration object with `extraQueryParameters` attributes.
1. Add the `id_token_hint` parameter with the corresponding variable that stores the ID token.

The following code snippets demonstrate how to define an ID token hint:

#### [Pop-up](#tab/popup)

```javascript
// src/components/NavigationBar.jsx
loginRequest.extraQueryParameters = {"id_token_hint": idToken};
instance.loginPopup(loginRequest);
```

#### [Redirect](#tab/redirect)

```javascript
loginRequest.extraQueryParameters = {"id_token_hint": idToken};
instance.loginRedirect(loginRequest);
```

---


## Configure logging

The MSAL library generates log messages that can help diagnose problems. The app can configure logging. The app can also give you custom control over the level of detail and whether personal and organizational data is logged. 

We recommend that you create an MSAL logging callback and provide a way for users to submit logs when they have authentication problems. MSAL provides these levels of logging detail:

- **Error**: Something has gone wrong, and an error was generated. This level is used for debugging and identifying problems.
- **Warning**: There hasn't necessarily been an error or failure, but the information is intended for diagnostics and pinpointing problems.
- **Info**: MSAL logs events that are intended for informational purposes and not necessarily for debugging.
- **Verbose**: This is the default level. MSAL logs the full details of library behavior.

By default, the MSAL logger doesn't capture any personal or organizational data. The library gives you the option to enable logging of personal and organizational data if you decide to do so.


To configure MSAL logging, in *src/authConfig.js*, configure the following keys:

- `loggerCallback` is the logger callback function. 
- `logLevel` lets you specify the level of logging. Possible values: `Error`, `Warning`, `Info`, and `Verbose`.
- `piiLoggingEnabled` enables the input of personal data. Possible values: `true` or `false`.
 
The following code snippet demonstrates how to configure MSAL logging:

```javascript
export const msalConfig = {
  ...
  system: {
    loggerOptions: {
        loggerCallback: (logLevel, message, containsPii) => {  
            console.log(message);
          },
          logLevel: LogLevel.Verbose,
          piiLoggingEnabled: false
      }
  }
  ...
}
```

## Next steps

- Learn more: [MSAL.js configuration options](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react/docs).
