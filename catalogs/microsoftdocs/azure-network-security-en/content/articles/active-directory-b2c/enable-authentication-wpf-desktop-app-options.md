---
title: Enable WPF desktop application options using Azure Active Directory B2C
description:  Enable the use of WPF desktop application options by using several ways.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: "b2c-support"


#Customer intent: As a developer creating a WPF desktop app, I want to enable authentication using Azure AD B2C, so that I can customize and enhance the authentication experience for my application.

---

# Enable authentication options in a WPF desktop app by using Azure AD B2C 

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article describes ways you can customize and enhance the Azure Active Directory B2C (Azure AD B2C) authentication experience for your Windows Presentation Foundation (WPF) desktop application. 

Before you start, familiarize yourself with the [Configure authentication in a sample WPF desktop app by using Azure AD B2C](configure-authentication-sample-wpf-desktop-app.md) article.


## Prepopulate the sign-in name

During a sign-in user journey, your app might target a specific user. When an app targets a user, it can specify in the authorization request the `login_hint` query parameter with the user's sign-in name. Azure AD B2C automatically populates the sign-in name, and the user needs to provide only the password. 

To prepopulate the sign-in name, do the following:

1. If you're using a custom policy, add the required input claim, as described in [Set up direct sign-in](direct-signin.md#prepopulate-the-sign-in-name). 
1. Look for your Microsoft Authentication Library (MSAL) configuration object, and then add the `withLoginHint()` method with the login hint.

```csharp
authResult = await app.AcquireTokenInteractive(App.ApiScopes)
    .WithParentActivityOrWindow(new WindowInteropHelper(this).Handle)
    .WithLoginHint("bob@contoso.com")
    .ExecuteAsync();
```

## Preselect an identity provider

If you configured the sign-in journey for your application to include social accounts, such as Facebook, LinkedIn, or Google, you can specify the `domain_hint` parameter. This query parameter provides a hint to Azure AD B2C about the social identity provider that should be used for sign-in. For example, if the application specifies `domain_hint=facebook.com`, the sign-in flow goes directly to the Facebook sign-in page. 

To redirect users to an external identity provider, do the following:


1. Check the domain name of your external identity provider. For more information, see [Redirect sign-in to a social provider](direct-signin.md#redirect-sign-in-to-a-social-provider). 
1. Create or use an existing `Dictionary` object to store extra query parameters.
1. Add the `domain_hint` parameter with the corresponding domain name to the dictionary (for example, `facebook.com`).
1. Pass the extra query parameters object into the MSAL configuration object's `WithExtraQueryParameters` method.

```csharp
Dictionary<string, string> extraQueryParameters = new Dictionary<string, string>();
extraQueryParameters.Add("domain_hint", "facebook.com");

authResult = await app.AcquireTokenInteractive(App.ApiScopes)
    .WithParentActivityOrWindow(new WindowInteropHelper(this).Handle)
    .WithExtraQueryParameters(extraQueryParameters)
    .ExecuteAsync();
```

## Specify the UI language

Language customization in Azure AD B2C allows your user flow to accommodate a variety of languages to suit your customers' needs. For more information, see [Language customization](language-customization.md).

To set the preferred language, do the following:


1. [Configure language customization](language-customization.md).
1. Create or use an existing `Dictionary` object to store extra query parameters.
1. Add the `ui_locales` parameter with the corresponding language code to the dictionary (for example, `en-us`).
1. Pass the extra query parameters object into the MSAL configuration object's `WithExtraQueryParameters` method.

```csharp
Dictionary<string, string> extraQueryParameters = new Dictionary<string, string>();
extraQueryParameters.Add("ui_locales", "en-us");

authResult = await app.AcquireTokenInteractive(App.ApiScopes)
    .WithParentActivityOrWindow(new WindowInteropHelper(this).Handle)
    .WithExtraQueryParameters(extraQueryParameters)
    .ExecuteAsync();
```

## Pass a custom query string parameter

With custom policies, you can pass a custom query string parameter. A good use-case example is when you want to [dynamically change the page content](customize-ui-with-html.md?pivots=b2c-custom-policy#configure-dynamic-custom-page-content-uri).

To pass a custom query string parameter, do the following:

1. Configure the [ContentDefinitionParameters](customize-ui-with-html.md#configure-dynamic-custom-page-content-uri) element.
1. Create or use an existing `Dictionary` object to store extra query parameters.
1. Add the custom query string parameter, such as `campaignId`. Set the parameter value (for example, `germany-promotion`).
1. Pass the extra query parameters object into the MSAL configuration object's `WithExtraQueryParameters` method.

```csharp
Dictionary<string, string> extraQueryParameters = new Dictionary<string, string>();
extraQueryParameters.Add("campaignId", "germany-promotion");

authResult = await app.AcquireTokenInteractive(App.ApiScopes)
    .WithParentActivityOrWindow(new WindowInteropHelper(this).Handle)
    .WithExtraQueryParameters(extraQueryParameters)
    .ExecuteAsync();
```

## Pass an ID token hint

A relying party application can send an inbound JSON Web Token (JWT) as part of the OAuth2 authorization request.  The inbound token is a hint about the user or the authorization request. Azure AD B2C validates the token and then extracts the claim.

To include an ID token hint in the authentication request, do the following:

1. In your custom policy, define an [ID token hint technical profile](id-token-hint.md).
1. In your code, generate or acquire an ID token, and then set the token to a variable (for example, `idToken`). 
1. Create or use an existing `Dictionary` object to store extra query parameters.
1. Add the `id_token_hint` parameter with the corresponding variable that stores the ID token.
1. Pass the extra query parameters object into the MSAL configuration object's `extraQueryParameters` attribute.

```csharp
Dictionary<string, string> extraQueryParameters = new Dictionary<string, string>();
extraQueryParameters.Add("id_token_hint", idToken);

authResult = await app.AcquireTokenInteractive(App.ApiScopes)
    .WithParentActivityOrWindow(new WindowInteropHelper(this).Handle)
    .WithExtraQueryParameters(extraQueryParameters)
    .ExecuteAsync();
```


## Configure logging

The MSAL library generates log messages that can help diagnose problems. The app can configure logging. The app can also give you custom control over the level of detail and whether personal and organizational data is logged. 

We recommend that you create an MSAL logging callback and provide a way for users to submit logs when they have authentication problems. MSAL provides these levels of logging detail:

- **Error**: Something has gone wrong, and an error was generated. This level is used for debugging and identifying problems.
- **Warning**: There hasn't necessarily been an error or failure, but the information is intended for diagnostics and pinpointing problems.
- **Info**: MSAL logs events that are intended for informational purposes and not necessarily for debugging.
- **Verbose**: This is the default level. MSAL logs the full details of library behavior.

By default, the MSAL logger doesn't capture any personal or organizational data. The library gives you the option to enable logging of personal and organizational data if you decide to do so.



The following code snippet demonstrates how to configure MSAL logging:

```csharp
PublicClientApp = PublicClientApplicationBuilder.Create(ClientId)
    .WithB2CAuthority(AuthoritySignUpSignIn)
    .WithRedirectUri(RedirectUri)
    .WithLogging(Log, LogLevel.Info, false) // don't log P(ersonally) I(dentifiable) I(nformation) details on a regular basis
    .Build();
```

## Configure the redirect URI

During the [desktop app registration](configure-authentication-sample-wpf-desktop-app.md#step-23-register-the-desktop-app) process, when you're choosing a redirect URI, keep in mind the following important considerations:

* **Development**: For development use in desktop apps, you can set the redirect URI to `http://localhost`, and Azure AD B2C will respect any port in the request. If the registered URI contains a port, Azure AD B2C will use that port only. For example, if the registered redirect URI is `http://localhost`, the redirect URI in the request can be `http://localhost:<randomport>`. If the registered redirect URI is `http://localhost:8080`, the redirect URI in the request must be `http://localhost:8080`.
* **Unique**: The scheme of the redirect URI must be unique for every application. In the example `com.onmicrosoft.contosob2c.exampleapp://oauth/redirect`, `com.onmicrosoft.contosob2c.exampleapp` is the scheme. This pattern should be followed. If two applications share the same scheme, users are given a choice of applications. If users choose incorrectly, the sign-in fails.
* **Complete**: The redirect URI must have a both a scheme and a path. The path must contain at least one slash character after the domain. For example, `//oauth/` works, and `//oauth` fails. Don't include special characters in the URI. For example, the underscore character (_) isn't allowed.

## Next steps

- To learn more, see [MSAL for .NET, UWP and NetCore configuration options](https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki).
