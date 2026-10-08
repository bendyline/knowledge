---
title: Enable Azure Static Web App authentication options using Azure Active Directory B2C
description:  This article discusses several ways to enable Azure Static Web App authentication options.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: "b2c-support"


#Customer intent: As a developer using Azure Static Web Apps, I want to enable and customize Azure AD B2C authentication, so that I can enhance the authentication experience for my web apps and use custom domains, external identity providers, language customization, and custom parameters.

---

# Enable authentication options in an Azure Static Web App by using Azure AD B2C 

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article describes how to enable, customize, and enhance the Azure Active Directory B2C (Azure AD B2C) authentication experience for your Azure Static Web Apps. 

Before you start, it's important to familiarize yourself with the [Configure authentication in an Azure Static Web App by using Azure AD B2C](configure-authentication-in-azure-static-app.md) article.

## Use a custom domain

By using a [custom domain](custom-domain.md), you can fully brand the authentication URL. From a user perspective, users remain on your domain during the authentication process, rather than being redirected to the Azure AD B2C b2clogin.com domain name.

To remove all references to "b2c" in the URL, you can also replace your B2C tenant name, contoso.onmicrosoft.com, in the authentication request URL with your tenant ID GUID. For example, you can change `https://fabrikamb2c.b2clogin.com/contoso.onmicrosoft.com/` to `https://account.contosobank.co.uk/<tenant ID GUID>/`.


To use a custom domain and your tenant ID in the authentication URL, follow the guidance in [Enable custom domains](custom-domain.md). Open the [configuration file](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/configuration.md). This file contains information about your Azure AD B2C identity provider.

In the configuration file, follow these steps:

1. Under the `customOpenIdConnectProviders` locate the `wellKnownOpenIdConfiguration` element.
1. Update the URL of your Azure AD B2C well-Known configuration endpoint with your custom domain and [tenant ID]( tenant-management-read-tenant-name.md#get-your-tenant-id). For more information, see [Use tenant ID](custom-domain.md#optional-use-tenant-id).

The following JSON shows the app settings before the change: 

```JSON
"openIdConnectConfiguration": {
    "wellKnownOpenIdConfiguration": "https://contoso.b2clogin.com/contoso.onmicrosoft.com/<POLICY_NAME>/v2.0/.well-known/openid-configuration"
    }
}
```  

The following JSON shows the app settings after the change: 

```JSON
"openIdConnectConfiguration": {
    "wellKnownOpenIdConfiguration": "https://login.contoso.com/00000000-0000-0000-0000-000000000000/<POLICY_NAME>/v2.0/.well-known/openid-configuration"
    }
``` 


## Preselect an identity provider

If you configured the sign-in journey for your application to include social accounts, such as Facebook, LinkedIn, or Google, you can specify the `domain_hint` parameter. This query parameter provides a hint to Azure AD B2C about the social identity provider that should be used for sign-in. For example, if the application specifies `domain_hint=facebook.com`, the sign-in flow goes directly to the Facebook sign-in page. 

To redirect users to an external identity provider, do the following:


1. Check the domain name of your external identity provider. For more information, see [Redirect sign-in to a social provider](direct-signin.md#redirect-sign-in-to-a-social-provider). 
1. Open the [configuration file](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/configuration.md).
1. Under the `login` element, locate the `loginParameterNames`.
1. Add the domain_hint parameter with its corresponding value, such as facebook.com. 

The following code snippets demonstrate how to pass the domain hint parameter. It uses facebook.com as the attribute value.
    
```json
"login": {
    "nameClaimType": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    "scopes": [],
    "loginParameterNames": ["domain_hint=facebook.com"]
}
```


## Specify the UI language

Language customization in Azure AD B2C allows your user flow to accommodate a variety of languages to suit your customers' needs. For more information, see [Language customization](language-customization.md).

To set the preferred language, do the following:


1. [Configure language customization](language-customization.md).
1. Open the [configuration file](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/configuration.md).
1. Under the `login` element, locate the `loginParameterNames`.
1. Add the ui_locales parameter with its corresponding value, such as `es-es`. 

The following code snippets demonstrate how to pass the `ui_locales` parameter. It uses `es-es` as the attribute value.

```json
"login": {
    "nameClaimType": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    "scopes": [],
    "loginParameterNames": ["ui_locales=es-es"]
}
```

## Pass a custom query string parameter

With custom policies, you can pass a custom query string parameter. A good use-case example is when you want to [dynamically change the page content](customize-ui-with-html.md?pivots=b2c-custom-policy#configure-dynamic-custom-page-content-uri).

To pass a custom query string parameter, do the following:

1. Configure the [ContentDefinitionParameters](customize-ui-with-html.md#configure-dynamic-custom-page-content-uri) element.
1. Open the [configuration file](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/configuration.md).
1. Under the `login` element, locate the `loginParameterNames`.
1. Add the custom parameter, such as `campaignId`. 

The following code snippets demonstrate how to pass the `campaignId` custom query string parameter. It uses `germany-promotion` as the attribute value.

```json
"login": {
    "nameClaimType": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    "scopes": [],
    "loginParameterNames": ["campaignId=germany-promotion"]
}
```

## Next steps

- Check out the [Azure Static App configuration overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/configuration-overview.md) article.
