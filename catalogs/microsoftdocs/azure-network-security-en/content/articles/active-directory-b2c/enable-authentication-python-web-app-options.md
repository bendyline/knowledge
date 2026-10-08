---
title: Enable Python web application options by using Azure Active Directory B2C
description:  This article shows you how to enable the use of Python web application options.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: b2c-support, devx-track-python


#Customer intent: As a Python web app developer, I want to enable and customize Azure AD B2C authentication in my application, so that I can provide a secure and personalized authentication experience for my users.

---

# Enable authentication options in a Python web app by using Azure AD B2C 

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article describes how to enable, customize, and enhance the Azure Active Directory B2C (Azure AD B2C) authentication experience for your Python web application. 

Before you start, it's important to familiarize yourself with how to [Configure authentication in a sample Python web app by using Azure AD B2C](configure-authentication-sample-python-web-app.md).

## Use a custom domain

By using a [custom domain](custom-domain.md), you can fully brand the authentication URL. From a user perspective, users remain on your domain during the authentication process, rather than being redirected to the Azure AD B2C b2clogin.com domain name.

To remove all references to "b2c" in the URL, you can also replace your B2C tenant name, contoso.onmicrosoft.com, in the authentication request URL with your tenant ID GUID. For example, you can change `https://fabrikamb2c.b2clogin.com/contoso.onmicrosoft.com/` to `https://account.contosobank.co.uk/<tenant ID GUID>/`.


To use a custom domain and your tenant ID in the authentication URL: 

1. Follow the guidance in [Enable custom domains](custom-domain.md).
1. In the *app_config.py* file, update the `authority_template` class member with your custom domain.

The following Python code shows the app settings before the change:

```python
authority_template = "https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{user_flow}"
```

The following Python code shows the app settings after the change:

```python
authority_template = "https://custom.domain.com/00000000-0000-0000-0000-000000000000/{user_flow}" 
```

## Prepopulate the sign-in name

During a sign-in user journey, your app might target a specific user. When an app targets a user, it can specify in the authorization request the `login_hint` query parameter with the user's sign-in name. Azure AD B2C automatically populates the sign-in name, and the user needs to provide only the password. 

To prepopulate the sign-in name, do the following:

1. If you're using a custom policy, add the required input claim as described in [Set up direct sign-in](direct-signin.md#prepopulate-the-sign-in-name). 
1. Find the `initiate_auth_code_flow` method, and then add the `login_hint` parameter with the identity provider domain name (for example, *facebook.com*).

```python
def _build_auth_code_flow(authority=None, scopes=None):
    return _build_msal_app(authority=authority).initiate_auth_code_flow(
        scopes or [],
        redirect_uri=url_for("authorized", _external=True),
        login_hint="bob@contoso.com")
```

## Preselect an identity provider

If you configured the sign-in journey for your application to include social accounts, such as Facebook, LinkedIn, or Google, you can specify the `domain_hint` parameter. This query parameter provides a hint to Azure AD B2C about the social identity provider that should be used for sign-in. For example, if the application specifies `domain_hint=facebook.com`, the sign-in flow goes directly to the Facebook sign-in page. 

To redirect users to an external identity provider, do the following:


1. Check the domain name of your external identity provider. For more information, see [Redirect sign-in to a social provider](direct-signin.md#redirect-sign-in-to-a-social-provider). 
1. Find the `initiate_auth_code_flow` method, and then add the `domain_hint` parameter with the login hint.

    ```python
    def _build_auth_code_flow(authority=None, scopes=None):
        return _build_msal_app(authority=authority).initiate_auth_code_flow(
            scopes or [],
            redirect_uri=url_for("authorized", _external=True),
            domain_hint="facebook.com")
    ```


## Next steps

- To learn more, see [MSAL for Python configuration options](https://github.com/AzureAD/microsoft-authentication-library-for-python/wiki).
