---
title: Add a web API application - Azure Active Directory B2C  
description: Learn how to add a web API application to your Active Directory B2C tenant.

author: kengaderdus
manager: CelesteDG

ms.author: kengaderdus
ms.date: 10/11/2024
ms.custom: mvc
ms.topic: how-to
ms.service: entra-id
ms.subservice: b2c


#Customer intent: As a developer integrating a web API with Azure Active Directory B2C, I want to register my application in the Azure portal, so that it can accept and respond to requests from client applications with access tokens.

---

# Add a web API application to your Azure Active Directory B2C tenant


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article shows you how to register web API resources in your Azure Active Directory B2C (Azure AD B2C) tenant so that they can accept and respond to requests by client applications that present an access token.

To register an application in your Azure AD B2C tenant, you can use the following steps:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If you have access to multiple tenants, select the **Settings** icon in the top menu to switch to your Azure AD B2C tenant from the **Directories + subscriptions** menu.
1. In the left menu, select **Azure AD B2C**. Or, select **All services** and search for and select **Azure AD B2C**.
1. Select **App registrations**, and then select **New registration**.
1. Enter a **Name** for the application. For example, *webapi1*.
1. Under **Redirect URI**, select **Web**, and then enter an endpoint where Azure AD B2C should return any tokens that your application requests. In a production application, you might set the redirect URI an endpoint like `https://localhost:5000`. During development or testing, you can set it to `https://jwt.ms`, a Microsoft-owned web application that displays the decoded contents of a token (the contents of the token never leave your browser). You can add and modify redirect URIs in your registered applications at any time.
1. Select **Register**.
1. Record the **Application (client) ID** for use in your web API's code.

## Configure scopes

Scopes provide a way to govern access to protected resources. Scopes are used by the web API to implement scope-based access control. For example, users of the web API could have both read and write access, or users of the web API might have only read access. In this tutorial, you use scopes to define read and write permissions for the web API.


1. Select **App registrations**.
1. Select the *webapi1* application to open its **Overview** page.
1. Under **Manage**, select **Expose an API**.
1. Next to **Application ID URI**, select the **Add** link.
1. Replace the default value (a GUID) with `api`, and then select **Save**. The full URI is shown, and should be in the format `https://your-tenant-name.onmicrosoft.com/api`. When your web application requests an access token for the API, it should add this URI as the prefix for each scope that you define for the API.
1. Under **Scopes defined by this API**, select **Add a scope**.
1. Enter the following values to create a scope that defines read access to the API, then select **Add scope**:
    1. **Scope name**: `demo.read`
    1. **Admin consent display name**: `Read access to demo API`
    1. **Admin consent description**: `Allows read access to the demo API`
1. Select **Add a scope**, enter the following values to add a scope that defines write access to the API, and then select **Add scope**:
    1. **Scope name**: `demo.write`
    1. **Admin consent display name**: `Write access to demo API`
    1. **Admin consent description**: `Allows write access to the demo API`

## Grant permissions

To call a protected web API from an application, you need to grant your application permissions to the API. For example, in [Tutorial: Register an application in Azure Active Directory B2C](tutorial-register-applications.md), a web application named *webapp1* is registered in Azure AD B2C. You can use this application to call the web API.


1. Select **App registrations**, and then select the web application that should have access to the API. For example, *webapp1*.
1. Under **Manage**, select **API permissions**.
1. Under **Configured permissions**, select **Add a permission**.
1. Select the **My APIs** tab.
1. Select the API to which the web application should be granted access. For example, *webapi1*.
1. Under **Permission**, expand **demo**, and then select the scopes that you defined earlier. For example, *demo.read* and *demo.write*.
1. Select **Add permissions**.
1. Select **Grant admin consent for (your tenant name)**.
1. If you're prompted to select an account, select your currently signed-in administrator account, or sign in with an account in your Azure AD B2C tenant that's been assigned at least the *Cloud application administrator* role.
1. Select **Yes**.
1. Select **Refresh**, and then verify that "Granted for ..." appears under **Status** for both scopes.

Your application is registered to call the protected web API. A user authenticates with Azure AD B2C to use the application. The application obtains an authorization grant from Azure AD B2C to access the protected web API.
