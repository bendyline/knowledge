---
title: Configure authentication options in an Angular application by using Azure Active Directory B2C
description:  Enable the use of Angular application options in several ways.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: how-to
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: "b2c-support"


#Customer intent: As an Angular developer, I want to configure authentication options in my application using Azure Active Directory B2C, so that I can customize and enhance the authentication experience for my users.

---

# Configure authentication options in an Angular application by using Azure Active Directory B2C

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article describes how you can customize and enhance the Azure Active Directory B2C (Azure AD B2C) authentication experience for your Angular single-page application (SPA). 

## Prerequisites

Familiarize yourself with the article [Configure authentication in an Angular SPA](configure-authentication-sample-angular-spa-app.md) or [Enable authentication in your own Angular SPA](enable-authentication-angular-spa-app.md).


## Sign-in and sign-out behavior

You can configure your single-page application to sign in users with MSAL.js in two ways:

- **Pop-up window**: The authentication happens in a pop-up window, and the state of the application is preserved. Use this approach if you don't want users to move away from your application page during authentication.  However, there are known issues with pop-up windows on Internet Explorer.
  - To sign in with pop-up windows, in the `src/app/app.component.ts` class, use the `loginPopup` method.  
  - In the `src/app/app.module.ts` class, set the `interactionType` attribute to `InteractionType.Popup`.
  - To sign out with pop-up windows, in the `src/app/app.component.ts` class, use the `logoutPopup` method. You can also configure `logoutPopup` to redirect the main window to a different page, such as the home page or sign-in page, after sign-out is complete by passing `mainWindowRedirectUri` as part of the request.
- **Redirect**: The user is redirected to Azure AD B2C to complete the authentication flow. Use this approach if users have browser constraints or policies where pop-up windows are disabled. 
  - To sign in with redirection, in the `src/app/app.component.ts` class, use the `loginRedirect` method.  
  - In the `src/app/app.module.ts` class, set the `interactionType` attribute to `InteractionType.Redirect`.
  - To sign out with redirection, in the `src/app/app.component.ts` class, use the `logoutRedirect` method. Configure the URI to which it should redirect after a sign-out by setting `postLogoutRedirectUri`. You should add this URI as a redirect URI in your application registration.
  
The following sample demonstrates how to sign in and sign out:

#### [Pop-up](#tab/popup)


```typescript
//src/app/app.component.ts
login() {
  if (this.msalGuardConfig.authRequest){
    this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest);
  } else {
    this.authService.loginPopup();
  }
}

logout() { 
  this.authService.logoutPopup({
    mainWindowRedirectUri: '/',
  });
}
```

#### [Redirect](#tab/redirect)

```typescript
//src/app/app.component.ts
login() {
  if (this.msalGuardConfig.authRequest){
    this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
  } else {
    this.authService.loginRedirect();
  }
}

logout() { 
  this.authService.logoutRedirect({
    postLogoutRedirectUri: 'http://localhost:4200'
  });
}
```

---

The MSAL Angular library has three sign-in flows: interactive sign-in (where a user selects the sign-in button), MSAL Guard, and MSAL Interceptor. The MSAL Guard and MSAL Interceptor configurations take effect when a user tries to access a protected resource without a valid access token. In such cases, the MSAL library forces the user to sign in. 

The following samples demonstrate how to configure MSAL Guard and MSAL Interceptor for sign-in with a pop-up window or redirection: 

#### [Pop-up](#tab/popup)

```typescript
// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
    }
  },
  {
    interactionType: InteractionType.Popup,
    protectedResourceMap: new Map([
      [protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes]
    ])
  })
```

#### [Redirect](#tab/redirect)

```typescript
// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
    }
  },
  {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      [protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes]
    ])
  })
```

---

## Prepopulate the sign-in name

During a sign-in user journey, your app might target a specific user. When an app targets a user, it can specify in the authorization request the `login_hint` query parameter with the user's sign-in name. Azure AD B2C automatically populates the sign-in name, and the user needs to provide only the password. 

To prepopulate the sign-in name, do the following:

1. If you use a custom policy, add the required input claim as described in [Set up direct sign-in](direct-signin.md#prepopulate-the-sign-in-name). 
1. Create or use an existing `PopupRequest` or `RedirectRequest` MSAL configuration object.
1. Set the `loginHint` attribute with the corresponding sign-in hint. 

The following code snippets demonstrate how to pass the sign-in hint parameter. They use `bob@contoso.com` as the attribute value.

#### [Pop-up](#tab/popup)

```typescript
// src/app/app.component.ts
let authRequestConfig: PopupRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as PopupRequest
}

authRequestConfig.loginHint = "bob@contoso.com"

this.authService.loginPopup(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      loginHint: "bob@contoso.com"
    }
  },
```

#### [Redirect](#tab/redirect)

```typescript
// src/app/app.component.ts
let authRequestConfig: RedirectRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as RedirectRequest
}

authRequestConfig.loginHint = "bob@contoso.com"

this.authService.loginRedirect(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      loginHint: "bob@contoso.com"
    }
  },
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

```typescript
// src/app/app.component.ts
let authRequestConfig: PopupRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as PopupRequest
}

authRequestConfig.domainHint = "facebook.com";

this.authService.loginPopup(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      domainHint: "facebook.com"
    }
  },
```

#### [Redirect](#tab/redirect)

```typescript
// src/app/app.component.ts
let authRequestConfig: RedirectRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as RedirectRequest
}

authRequestConfig.domainHint = "facebook.com";

this.authService.loginRedirect(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      domainHint: "facebook.com"
    }
  },
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

```typescript
// src/app/app.component.ts
let authRequestConfig: PopupRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as PopupRequest
}

authRequestConfig.extraQueryParameters = {"ui_locales" : "es-es"};

this.authService.loginPopup(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      extraQueryParameters: {"ui_locales" : "es-es"}
    }
  },
```

#### [Redirect](#tab/redirect)

```typescript
// src/app/app.component.ts
let authRequestConfig: RedirectRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as RedirectRequest
}

authRequestConfig.extraQueryParameters = {"ui_locales" : "es-es"};

this.authService.loginRedirect(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      extraQueryParameters: {"ui_locales" : "es-es"}
    }
  },
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

```typescript
// src/app/app.component.ts
let authRequestConfig: PopupRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as PopupRequest
}

authRequestConfig.extraQueryParameters = {"campaignId": 'germany-promotion'}

this.authService.loginPopup(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      extraQueryParameters: {"ui_locales" : "es-es"}
    }
  },
```

#### [Redirect](#tab/redirect)

```typescript
// src/app/app.component.ts
let authRequestConfig: RedirectRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as RedirectRequest
}

authRequestConfig.extraQueryParameters = {"campaignId": 'germany-promotion'}

this.authService.loginRedirect(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      extraQueryParameters: {"campaignId" : "germany-promotion"}
    }
  },
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

```typescript
// src/app/app.component.ts
let authRequestConfig: PopupRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as PopupRequest
}

authRequestConfig.extraQueryParameters = {"id_token_hint": idToken};

this.authService.loginPopup(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      extraQueryParameters: {"id_token_hint" : idToken}
    }
  },
```

#### [Redirect](#tab/redirect)

```typescript
// src/app/app.component.ts
let authRequestConfig: RedirectRequest;

if (this.msalGuardConfig.authRequest) {
  authRequestConfig = { ...this.msalGuardConfig.authRequest } as RedirectRequest
}

authRequestConfig.extraQueryParameters = {"id_token_hint": idToken};

this.authService.loginRedirect(authRequestConfig);

// src/app/app.module.ts
MsalModule.forRoot(new PublicClientApplication(msalConfig),
  {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: protectedResources.todoListApi.scopes,
      extraQueryParameters: {"id_token_hint" : idToken}
    }
  },
```

---

## Use a custom domain

By using a [custom domain](custom-domain.md), you can fully brand the authentication URL. From a user perspective, users remain on your domain during the authentication process, rather than being redirected to the Azure AD B2C b2clogin.com domain name.

To remove all references to "b2c" in the URL, you can also replace your B2C tenant name, contoso.onmicrosoft.com, in the authentication request URL with your tenant ID GUID. For example, you can change `https://fabrikamb2c.b2clogin.com/contoso.onmicrosoft.com/` to `https://account.contosobank.co.uk/<tenant ID GUID>/`.


To use your custom domain for your tenant ID in the authentication URL, follow the guidance in [Enable custom domains](custom-domain.md). Open the `src/app/auth-config.ts` MSAL configuration object and change `authorities` and `knownAuthorities` to use your custom domain name and tenant ID.  

The following JavaScript shows the MSAL configuration object before the change: 

```typescript
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

```typescript
const msalConfig = {
    auth: {
      ...
      authority: "https://custom.domain.com/00000000-0000-0000-0000-000000000000/B2C_1_susi",
      knownAuthorities: ["custom.domain.com"],
      ...
    },
  ...
}
```  


## Configure logging

The MSAL library generates log messages that can help diagnose problems. The app can configure logging. The app can also give you custom control over the level of detail and whether personal and organizational data is logged. 

We recommend that you create an MSAL logging callback and provide a way for users to submit logs when they have authentication problems. MSAL provides these levels of logging detail:

- **Error**: Something has gone wrong, and an error was generated. This level is used for debugging and identifying problems.
- **Warning**: There hasn't necessarily been an error or failure, but the information is intended for diagnostics and pinpointing problems.
- **Info**: MSAL logs events that are intended for informational purposes and not necessarily for debugging.
- **Verbose**: This is the default level. MSAL logs the full details of library behavior.

By default, the MSAL logger doesn't capture any personal or organizational data. The library gives you the option to enable logging of personal and organizational data if you decide to do so.


To configure Angular [logging](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/logging.md), in *src/app/auth-config.ts*, configure the following keys:

- `loggerCallback` is the logger callback function. 
- `logLevel` lets you specify the level of logging. Possible values: `Error`, `Warning`, `Info`, and `Verbose`.
- `piiLoggingEnabled` enables the input of personal data. Possible values: `true` or `false`.
 
The following code snippet demonstrates how to configure MSAL logging:

```typescript
export const msalConfig: Configuration = {
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

- Learn more: [MSAL.js configuration options](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md).
