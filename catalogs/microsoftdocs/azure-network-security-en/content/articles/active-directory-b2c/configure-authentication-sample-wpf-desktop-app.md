---
title: Configure authentication in a sample WPF desktop application by using Azure Active Directory B2C
description:  This article discusses how to use Azure Active Directory B2C to sign in and sign up users in a WPF desktop application.

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


#Customer intent: As a developer creating a WPF desktop app, I want to configure authentication using Azure AD B2C, so that I can securely sign users into my application and call a protected web API.

---

# Configure authentication in a sample WPF desktop app by using Azure AD B2C

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article uses a sample [Windows Presentation Foundation (WPF) desktop](https://learn.microsoft.com/visualstudio/get-started/csharp/tutorial-wpf) application to illustrate how to add Azure Active Directory B2C (Azure AD B2C) authentication to your desktop apps.

## Overview

OpenID Connect (OIDC) is an authentication protocol built on OAuth 2.0. You can use OIDC to securely sign users in to an application. This desktop app sample uses the [Microsoft Authentication Library (MSAL)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/msal-overview.md) with OIDC authorization code Proof Key for Code Exchange (PKCE) flow. The MSAL is a Microsoft-provided library that simplifies adding authentication and authorization support to desktop apps. 

The sign-in flow involves following steps:

1. Users open the app and select **sign-in**.
1. The app opens the desktop device's system browser and starts an authentication request to Azure AD B2C.
1. Users [sign up or sign in](add-sign-up-and-sign-in-policy.md), [reset the password](add-password-reset-policy.md), or sign in with a [social account](add-identity-provider.md).
1. After users sign in successfully, Azure AD B2C returns an authorization code to the app.
1. The app takes the following actions:
    1. It exchanges the authorization code to an ID token, access token, and refresh token.
    1. It reads the ID token claims.
    1. It stores the tokens in an in-memory cache for later use.

### App registration overview

To enable your app to sign in with Azure AD B2C and call a web API, register two applications in the Azure AD B2C directory.  

- The **desktop application** registration enables your app to sign in with Azure AD B2C. During app registration, specify the *Redirect URI*. The redirect URI is the endpoint to which users are redirected by Azure AD B2C after they've authenticated with Azure AD B2C. The app registration process generates an *application ID*, also known as the *client ID*, which uniquely identifies your desktop app (for example, *App ID: 1*).

- The  **web API** registration enables your app to call a protected web API. The registration exposes the web API permissions (scopes). The app registration process generates an *application ID*, which uniquely identifies your web API (for example, *App ID: 2*). Grant your desktop app (App ID: 1) permissions to the web API scopes (App ID: 2). 

The application registration and architecture are illustrated in the following diagrams:

Diagram of the desktop app with web API, registrations, and tokens. 

### Call to a web API

After the authentication is completed, users interact with the app, which invokes a protected web API. The web API uses [bearer token](https://datatracker.ietf.org/doc/html/rfc6750) authentication. The bearer token is the access token that the app obtained from Azure AD B2C. The app passes the token in the authorization header of the HTTPS request. 
    
```http
Authorization: Bearer <access token>
```

If the access token's scope doesn't match the web API's scopes, the authentication library obtains a new access token with the correct scopes.


### The sign-out flow

The sign-out flow involves the following steps:

1. From the app, users sign out.
1. The app clears its session objects, and the authentication library clears its token cache.
1. The app takes users to the Azure AD B2C sign-out endpoint to terminate the Azure AD B2C session.
1. Users are redirected back to the app.


## Prerequisites

A computer that's running [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/) with .NET desktop development.

## Step 1: Configure your user flow

When users try to sign in to your app, the app starts an authentication request to the authorization endpoint via a [user flow](user-flow-overview.md). The user flow defines and controls the user experience. After users complete the user flow, Azure AD B2C generates a token and then redirects users back to your application.

If you haven't done so already, [create a user flow or a custom policy](add-sign-up-and-sign-in-policy.md). Repeat the steps to create three separate user flows as follows: 

- A combined **Sign in and sign up** user flow, such as `susi`. This user flow also supports the **Forgot your password** experience.
- A **Profile editing** user flow, such as `edit_profile`.
- A **Password reset** user flow, such as `reset_password`.

Azure AD B2C prepends `B2C_1_` to the user flow name. For example, `susi` becomes `B2C_1_susi`.


## Step 2: Register your applications

Create the desktop app and the web API application registration, and specify the scopes of your web API.

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



### Step 2.3: Register the desktop app

To create the desktop app registration, do the following:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select **App registrations**, and then select **New registration**.
1. Under **Name**, enter a name for the application (for example, *desktop-app1*).
1. Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**. 
1. Under **Redirect URI**, select **Public client/native (desktop & desktop)** and then, in the URL box, enter `https://your-tenant-name.b2clogin.com/oauth2/nativeclient`. Replace `your-tenant-name` with your [tenant name]( tenant-management-read-tenant-name.md#get-your-tenant-name). For more options, see [Configure redirect URI](enable-authentication-wpf-desktop-app-options.md#configure-the-redirect-uri).
1. Select **Register**.
1. After the app registration is completed, select **Overview**.
1. Record the **Application (client) ID** for later use, when you configure the desktop application.
    Screenshot highlighting the desktop application ID.  

### Step 2.4: Grant the desktop app permissions for the web API


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

## Step 3: Configure the sample web API

This sample acquires an access token with the relevant scopes that the desktop app can use for a web API.  To call a web API from code, do the following:

1. Use an existing web API, or create a new one. For more information, see [Enable authentication in your own web API using Azure AD B2C](enable-authentication-web-api.md).
1. After you configure the web API, copy the URI of the web API endpoint. You will use the web API endpoint in the next steps.

> **Tip:**
> If you don't have a web API, you can still run this sample. In this case, the app returns the access token but won't be able to call the web API. 

## Step 4: Get the WPF desktop app sample

1. [Download the .zip file](https://github.com/Azure-Samples/active-directory-b2c-dotnet-desktop), or clone the sample web application from the [GitHub repo](https://github.com/Azure-Samples/active-directory-b2c-dotnet-desktop). 

    ```bash
    git clone https://github.com/Azure-Samples/active-directory-b2c-dotnet-desktop.git
    ``` 

1. Open the **active-directory-b2c-wpf** solution (the *active-directory-b2c-wpf.sln* file) in Visual Studio.



## Step 5: Configure the sample desktop app

In the **active-directory-b2c-wpf** project, open the *App.xaml.cs* file. The `App.xaml.cs` class members contain information about your Azure AD B2C identity provider. The desktop app uses this information to establish a trust relationship with Azure AD B2C, sign users in and out, acquire tokens, and validate them. 

Update the following class members:

| Key | Value |
| --- | --- |
| `TenantName` | The first part of your Azure AD B2C [tenant name]( tenant-management-read-tenant-name.md#get-your-tenant-name) (for example, `contoso.b2clogin.com`). |
| `ClientId` | The desktop application ID from [step 2.3](#step-23-register-the-desktop-app). |
| `PolicySignUpSignIn` | The sign-up or sign-in user flow or custom policy that you created in [step 1](#step-1-configure-your-user-flow). |
| `PolicyEditProfile` | The edit profile user flow or custom policy that you created in [step 1](#step-1-configure-your-user-flow). |
| `ApiEndpoint` | (Optional) The web API endpoint that you created in [step 3](#step-3-configure-the-sample-web-api) (for example, `https://contoso.azurewebsites.net/hello`). |
| `ApiScopes` | The web API scopes that you created in [step 2.4](#step-24-grant-the-desktop-app-permissions-for-the-web-api). |
|  |  |

Your final *App.xaml.cs* file should look like the following C# code:

```csharp
public partial class App : Application
{

private static readonly string TenantName = "contoso";
private static readonly string Tenant = $"{TenantName}.onmicrosoft.com";
private static readonly string AzureAdB2CHostname = $"{TenantName}.b2clogin.com";
private static readonly string ClientId = "<web-api-app-application-id>";
private static readonly string RedirectUri = $"https://{TenantName}.b2clogin.com/oauth2/nativeclient";

public static string PolicySignUpSignIn = "b2c_1_susi";
public static string PolicyEditProfile = "b2c_1_edit_profile";
public static string PolicyResetPassword = "b2c_1_reset";

public static string[] ApiScopes = { $"https://{Tenant}//api/tasks.read" };
public static string ApiEndpoint = "https://contoso.azurewebsites.net/hello";
```

## Step 6: Run and test the desktop app

1. [Restore the NuGet packages](https://learn.microsoft.com/nuget/consume-packages/package-restore).
1. Select F5 to build and run the sample.
1. Select **Sign In**, and then sign up or sign in with your Azure AD B2C local or social account.

    Screenshot highlighting how to start the sign-in flow.

1. After a successful sign-up or sign-in, the token details are displayed on the lower pane of the WPF app.

    Screenshot highlighting the Azure AD B2C access token and user ID. 

1. Select **Call API** to call your web API.


## Next steps

Learn how to [Configure authentication options in a WPF desktop app by using Azure AD B2C](enable-authentication-wpf-desktop-app-options.md).
