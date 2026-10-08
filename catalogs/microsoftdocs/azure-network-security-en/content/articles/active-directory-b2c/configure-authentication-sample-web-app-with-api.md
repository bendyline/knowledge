---
title: Configure authentication in a sample web application that calls a web API by using Azure Active Directory B2C
description:  This article discusses using Azure Active Directory B2C to sign in and sign up users in an ASP.NET web application that calls a web API.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom:
  - "b2c-support"
  - sfi-image-nochange


#Customer intent: As a developer building a web application that calls a web API, I want to configure authentication using Azure AD B2C, so that I can securely sign users in to my application and call a secure web API.

---

# Configure authentication in a sample web app that calls a web API by using Azure AD B2C

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article uses a sample ASP.NET web application that calls a web API to illustrate how to add Azure Active Directory B2C (Azure AD B2C) authentication to your web applications.

> **Important:**
> The sample ASP.NET web app that's referenced in this article is used to call a web API with a bearer token. For a web app that doesn't call a web API, see [Configure authentication in a sample web application by using Azure AD B2C](configure-authentication-sample-web-app.md).  

## Overview

OpenID Connect (OIDC) is an authentication protocol that's built on OAuth 2.0. You can use OIDC to securely sign a user in to an application. This web app sample uses [Microsoft Identity Web](https://www.nuget.org/packages/Microsoft.Identity.Web). Microsoft Identity Web is a set of ASP.NET Core libraries that simplify adding authentication and authorization support to web apps that can call a secure web API. 

The sign-in flow involves the following steps:

1. Users go to the web app and select **Sign-in**.
1. The app initiates an authentication request and redirects users to Azure AD B2C.
1. Users [sign up or sign in](add-sign-up-and-sign-in-policy.md) and [reset the password](add-password-reset-policy.md). Alternatively, they can sign in with a [social account](add-identity-provider.md).
1. After users sign in, Azure AD B2C returns an authorization code to the app.
1. The app then does the following:
 
   a. It exchanges the authorization code to an ID token, access token, and refresh token.  
   b. It reads the ID token claims, and persists an application authorization cookie.  
   c. It stores the refresh token in an in-memory cache for later use.

### App registration overview

To enable your app to sign in with Azure AD B2C and call a web API, you register two applications in the Azure AD B2C directory.  

- The *web application* registration enables your app to sign in with Azure AD B2C. During the registration, you specify the *redirect URI*. The redirect URI is the endpoint to which users are redirected by Azure AD B2C after their authentication with Azure AD B2C is completed. The app registration process generates an *application ID*, also known as the *client ID*, which uniquely identifies your app. You also create a *client secret*, which your app uses to securely acquire the tokens.

- The  *web API* registration enables your app to call a secure web API. The registration includes the web API *scopes*. The scopes provide a way to manage permissions to protected resources, such as your web API. You grant the web application permissions to the web API scopes. When an access token is requested, your app specifies the desired permissions in the scope parameter of the request.  

The app architecture and registrations are illustrated in the following diagram:

Diagram of a web app with web API call registrations and tokens. 

### Call to a web API

After the authentication is completed, users interact with the app, which invokes a protected web API. The web API uses [bearer token](https://datatracker.ietf.org/doc/html/rfc6750) authentication. The bearer token is the access token that the app obtained from Azure AD B2C. The app passes the token in the authorization header of the HTTPS request. 
    
```http
Authorization: Bearer <access token>
```

If the access token's scope doesn't match the web API's scopes, the authentication library obtains a new access token with the correct scopes.


### Sign-out

The sign-out flow involves the following steps:

1. From the app, users sign out.
1. The app clears its session objects, and the authentication library clears its token cache.
1. The app takes users to the Azure AD B2C sign-out endpoint to terminate the Azure AD B2C session.
1. Users are redirected back to the app.


## Prerequisites

A computer that's running either: 

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2022 17.0 or later](https://visualstudio.microsoft.com/downloads) with the **ASP.NET and web development** workload
* [.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet)

# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet)

---

## Step 1: Configure your user flow

When users try to sign in to your app, the app starts an authentication request to the authorization endpoint via a [user flow](user-flow-overview.md). The user flow defines and controls the user experience. After users complete the user flow, Azure AD B2C generates a token and then redirects users back to your application.

If you haven't done so already, [create a user flow or a custom policy](add-sign-up-and-sign-in-policy.md). Repeat the steps to create three separate user flows as follows: 

- A combined **Sign in and sign up** user flow, such as `susi`. This user flow also supports the **Forgot your password** experience.
- A **Profile editing** user flow, such as `edit_profile`.
- A **Password reset** user flow, such as `reset_password`.

Azure AD B2C prepends `B2C_1_` to the user flow name. For example, `susi` becomes `B2C_1_susi`.


## Step 2: Register web applications

In this step, you create the web app and the web API application registration, and specify the scopes of your web API.

### Step 2.1: Register the web API app


To create the web API app registration (**App ID: 2**), follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Make sure you're using the directory that contains your Azure AD B2C tenant. Select the **Directories + subscriptions** icon in the portal toolbar.
1. On the **Portal settings | Directories + subscriptions** page, find your Azure AD B2C directory in the **Directory name** list, and then select **Switch**.
1. In the Azure portal, search for and select **Azure AD B2C**.
1. Select **App registrations**, and then select **New registration**.
1. For **Name**, enter a name for the application (for example, **my-api1**). Leave the default values for **Redirect URI** and **Supported account types**.
1. Select **Register**.
1. After the app registration is completed, select **Overview**.
1. Record the **Application (client) ID** value for later use when you configure the web application.

    Screenshot that demonstrates how to get a web A P I application I D.


### Step 2.2: Configure web API app scopes

1. Select the **my-api1** application that you created (**App ID: 2**) to open its **Overview** page.

1. Under **Manage**, select **Expose an API**.
1. Next to **Application ID URI**, select the **Set** link. Replace the default value (GUID) with a unique name (for example, **tasks-api**), and then select  **Save**. 
 
   When your web application requests an access token for the web API, it should add this URI as the prefix for each scope that you define for the API.
1. Under **Scopes defined by this API**, select **Add a scope**.
1. To create a scope that defines read access to the API:

    1. For **Scope name**, enter **tasks.read**.  
    1. For **Admin consent display name**, enter **Read access to tasks API**.  
    1. For **Admin consent description**, enter **Allows read access to the tasks API**.

1. Select **Add scope**.

1. Select **Add a scope**, and then add a scope that defines write access to the API: 

    1. For **Scope name**, enter **tasks.write**.  
    1. For **Admin consent display name**, enter **Write access to tasks API**.
    1. For **Admin consent description**, enter **Allows write access to the tasks API**.
    
1. Select **Add scope**.



### Step 2.3: Register the web app

To create the web app registration, do the following:

1. Select **App registrations**, and then select **New registration**.
1. Under **Name**, enter a name for the application (for example, *webapp1*).
1. Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**. 
1. Under **Redirect URI**, select **Web** and then, in the URL box, enter `https://localhost:5000/signin-oidc`.
1. Under **Permissions**, select the **Grant admin consent to openid and offline access permissions** checkbox.
1. Select **Register**.
1. After the app registration is completed, select **Overview**.
1. Record the **Application (client) ID** for later use, when you configure the web application.

    Screenshot of the web app Overview page for recording your web application ID.  

### Step 2.4: Create a web app client secret

Create a client secret for the registered web application. The web application uses the client secret to prove its identity when it requests tokens.

1. Under **Manage**, select **Certificates & secrets**.
1. Select **New client secret**.
1. In the **Description** box, enter a description for the client secret (for example, *clientsecret1*).
1. Under **Expires**, select a duration for which the secret is valid, and then select **Add**.
1. Record the secret's **Value**. You'll use this value for configuration in a later step.


### Step 2.5: Grant the web app permissions for the web API


To grant your app (**App ID: 1**) permissions, follow these steps: 

1. Select **App registrations**, and then select the app that you created (**App ID: 1**).
1. Under **Manage**, select **API permissions**.
1. Under **Configured permissions**, select **Add a permission**.
1. Select the **My APIs** tab.
1. Select the API (**App ID: 2**) to which the web application should be granted access. For example, enter **my-api1**.
1. Under **Permission**, expand **tasks**, and then select the scopes that you defined earlier (for example, **tasks.read** and **tasks.write**).
1. Select **Add permissions**.
1. Select **Grant admin consent for \<*your tenant name*>**.
1. Select **Yes**.
1. Select **Refresh**, and then verify that **Granted for ...** appears under **Status** for both scopes.
1. From the **Configured permissions** list, select your scope, and then copy the scope full name. 

    Screenshot of the configured permissions pane, showing that read access permissions are granted.  

## Step 3: Get the web app sample

[Download the zip file](https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2/archive/refs/heads/master.zip), or run the following Bash command to clone the sample web application from GitHub. 

```bash
git clone https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2
```

Extract the sample file to a folder where the total length of the path is 260 or fewer characters.

## Step 4: Configure the sample web API

In the sample folder, in the *4-WebApp-your-API/4-2-B2C/TodoListService* folder, open the **TodoListService.csproj** project with Visual Studio or Visual Studio Code. 

Under the project root folder, open the *appsettings.json* file. This file contains information about your Azure AD B2C identity provider. The web API app uses this information to validate the access token that the web app passes as a bearer token. Update the following properties of the app settings:

| Section | Key | Value |
| --- | --- | --- |
| AzureAdB2C | Instance | The first part of your Azure AD B2C [tenant name]( tenant-management-read-tenant-name.md#get-your-tenant-name). For example, `https://contoso.b2clogin.com`. |
| AzureAdB2C | Domain | Your Azure AD B2C tenant full [tenant name]( tenant-management-read-tenant-name.md#get-your-tenant-name). For example, `contoso.onmicrosoft.com`. |
| AzureAdB2C | ClientId | The web API application ID from [step 2.1](#step-21-register-the-web-api-app). |
| AzureAdB2C | SignUpSignInPolicyId | The user flows, or custom policy you created in [step 1](#step-1-configure-your-user-flow). |
|  |  |  |

Your final configuration file should look like the following JSON file:

```json
{
  "AzureAdB2C": {
    "Instance": "https://contoso.b2clogin.com",
    "Domain": "contoso.onmicrosoft.com",
    "ClientId": "<web-api-app-application-id>",
    "SignedOutCallbackPath": "/signout/<your-sign-up-in-policy>",
    "SignUpSignInPolicyId": "<your-sign-up-in-policy>"
  },
  // More settings here
}
```

### Step 4.1: Set the permission policy

The web API verifies that the user authenticated with the bearer token, and the bearer token has the configured accepted scopes. If the bearer token doesn't have any of these accepted scopes, the web API returns HTTP status code 403 (Forbidden) and writes to the response body a message telling which scopes are expected in the token. 

To configure the accepted scopes, open the  `Controller/TodoListController.cs` class, and set the scope name, without the full URI.

```csharp
[RequiredScope("tasks.read")]
```

### Step 4.2: Run the sample web API app

To allow the web app to call the web API sample, run the web API by doing the  following:

1. If you're requested to do so, restore dependencies.
1. Build and run the project.
1. After the project is built, Visual Studio or Visual Studio Code starts the web API in the browsers with the following address: https://localhost:44332.

## Step 5: Configure the sample web app

In the sample folder, under the `4-WebApp-your-API/4-2-B2C/Client` folder, open the **TodoListClient.csproj** project with Visual Studio or Visual Studio Code. 

Under the project root folder, open the `appsettings.json` file. This file contains information about your Azure AD B2C identity provider. The web app uses this information to establish a trust relationship with Azure AD B2C, sign users in and out, acquire tokens, and validate them. Update the following properties of the app settings:

| Section | Key | Value |
| --- | --- | --- |
| AzureAdB2C | Instance | The first part of your Azure AD B2C [tenant name]( tenant-management-read-tenant-name.md#get-your-tenant-name) (for example, `https://contoso.b2clogin.com`). |
| AzureAdB2C | Domain | Your Azure AD B2C tenant full [tenant name]( tenant-management-read-tenant-name.md#get-your-tenant-name) (for example, `contoso.onmicrosoft.com`). |
| AzureAdB2C | ClientId | The web application ID from [step 2.3](#step-23-register-the-web-app). |
| AzureAdB2C | ClientSecret | The web application secret from [step 2.4](#step-24-create-a-web-app-client-secret). |
| AzureAdB2C | SignUpSignInPolicyId | The user flows or custom policy you created in [step 1](#step-1-configure-your-user-flow). |
| TodoList | TodoListScope | The web API scopes you created in [step 2.5](#step-25-grant-the-web-app-permissions-for-the-web-api). |
| TodoList | TodoListBaseAddress | The base URI of your web API (for example `https://localhost:44332`). |
|  |  |  |

Your final configuration file should look like the following JSON:

```json
{
  "AzureAdB2C": {
    "Instance": "https://contoso.b2clogin.com",
    "Domain": "contoso.onmicrosoft.com",
    "ClientId": "<web-app-application-id>",
    "ClientSecret": "<web-app-application-secret>",  
    "SignedOutCallbackPath": "/signout/<your-sign-up-in-policy>",
    "SignUpSignInPolicyId": "<your-sign-up-in-policy>"
  },
  "TodoList": {
    "TodoListScope": "https://contoso.onmicrosoft.com/api/demo.read",
    "TodoListBaseAddress": "https://localhost:44332"
  }
}
```


## Step 6: Run the sample web app

1. Build and run the project.
1. Browse to `https://localhost:5000`. 
1. Complete the sign-up or sign-in process.

After successful authentication, you'll see your display name in the navigation bar. To view the claims that Azure AD B2C token returns to your app, select **TodoList**.

Screenshot of the web app token claims.


## Deploy your application

In a production application, the app registration redirect URI is typically a publicly accessible endpoint where your app is running, such as `https://contoso.com/signin-oidc`. 

You can add and modify redirect URIs in your registered applications at any time. The following restrictions apply to redirect URIs:

* The reply URL must begin with the scheme `https`.
* The reply URL is case-sensitive. Its case must match the case of the URL path of your running application. 

### Token cache for a web app

The web app sample uses in-memory token cache serialization. This implementation is great in samples. It's also good in production applications, provided that you don't mind if the token cache is lost when the web app is restarted. 

For production environment, we recommend you use a distributed memory cache. For example, Redis cache, NCache, or a SQL Server cache. For details about the distributed memory cache implementations, see [Token cache serialization](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/msal-net-token-cache-serialization.md).


## Next steps

* Learn more [about the code sample](https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2/tree/master/1-WebApp-OIDC/1-5-B2C#about-the-code).
* Learn how to [Enable authentication in your own web application by using Azure AD B2C](enable-authentication-web-application.md).
* Learn how to [Enable authentication in your own web API](enable-authentication-web-api.md).
