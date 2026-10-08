---
title: Tutorial - Web app accesses Microsoft Graph as the user | Azure
description: In this tutorial, you learn how to access data in Microsoft Graph for a signed-in user accessing an Azure App Service app.
author: cephalin
ms.author: cephalin
ms.service: azure-app-service
ms.topic: tutorial
ms.date: 04/02/2026
ms.devlang: csharp
ms.custom: azureday1, devx-track-js, AppServiceConnectivity
#Customer intent: As an application developer, I want to learn how to access data in Microsoft Graph for a signed-in user.
---

# Tutorial: Access Microsoft Graph from a secured JavaScript app as the user


Learn how to access Microsoft Graph from a web app running on Azure App Service.

Diagram that shows accessing Microsoft Graph.

You want to add access to Microsoft Graph from your web app and perform some action as the signed-in user. This section describes how to grant delegated permissions to the web app and get the signed-in user's profile information from Microsoft Entra ID.

In this tutorial, you learn how to:

> 
>
> - Grant delegated permissions to a web app.
> - Call Microsoft Graph from a web app for a signed-in user.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-connect-app-access-microsoft-graph-as-user-javascript.md)

## Prerequisites

- A web application running on Azure App Service that has the [App Service authentication/authorization module enabled](scenario-secure-app-authentication-app-service.md).

## Grant front-end access to call Microsoft Graph

After you enable authentication and authorization on your web app, the web app is registered with the Microsoft identity platform and is backed by a Microsoft Entra application. In this step, you give the web app permissions to access Microsoft Graph for the user.

> **Note:**
>
> Technically, you give the web app's Microsoft Entra application the permissions to access the Microsoft Graph Microsoft Entra application for the user.

1. In the [Microsoft Entra admin center](https://entra.microsoft.com), select **Entra ID**.

1. Select **App registrations** > **Owned applications** > **View all applications in this directory**. Select your web app name, and then select **API permissions**.

1. Select **Add a permission**, and then select **Microsoft APIs**, then **Microsoft Graph**.

1. Select **Delegated permissions**, and then select **User.Read** from the list. Select **Add permissions**.

## Configure App Service to return a usable access token

The web app now has the required permissions to access Microsoft Graph as the signed-in user. In this section, you configure App Service authentication and authorization to give you a usable access token for accessing Microsoft Graph. For this step, you need to add the `User.Read` scope for the downstream service (Microsoft Graph): `https://graph.microsoft.com/User.Read`.

> **Important:**
> If you don't configure App Service to return a usable access token, you receive a `CompactToken parsing failed with error code: 80049217` error when you call Microsoft Graph APIs in your code.

# [Azure Resource Explorer](#tab/azure-resource-explorer)
Go to [Azure Resource Explorer](https://rc.portal.azure.com/#view/Microsoft_Azure_Resources/ResourceExplorer.ReactView) and using the resource tree, locate your web app. The resource URL should be similar to `https://management.azure.com/subscriptions/subscriptionId/resourceGroups/SecureWebApp/providers/Microsoft.Web/sites/SecureWebApp20200915115914`.

The Azure Resource Explorer is now opened with your web app selected in the resource tree.

1. At the top of the page, select **Edit** to enable editing of your Azure resources.

1. In the left browser, drill down to **config** > **authsettingsV2**.

1. In the **authsettingsV2** view, select **Edit**.
1. Find the **login** section of **identityProviders** > **azureActiveDirectory** and add the following **loginParameters** settings: `"loginParameters":[ "response_type=code id_token","scope=openid offline_access profile https://graph.microsoft.com/User.Read" ]`.

    ```json
    "identityProviders": {
        "azureActiveDirectory": {
          "enabled": true,
          "login": {
            "loginParameters":[
              "response_type=code id_token",
              "scope=openid offline_access profile https://graph.microsoft.com/User.Read"
            ]
          }
        }
      }
    },
    ```

1. Save your settings by selecting **PUT**.

This setting can take several minutes to take effect. Your web app is now configured to access Microsoft Graph with a proper access token. If you don't, Microsoft Graph returns an error saying that the format of the compact token is incorrect.

# [Azure CLI](#tab/azure-cli)

Use the Azure CLI to call the App Service Web App REST APIs to [get](https://learn.microsoft.com/rest/api/appservice/web-apps/get-auth-settings) and [update](https://learn.microsoft.com/rest/api/appservice/web-apps/update-auth-settings) the auth configuration settings so your web app can call Microsoft Graph.

1. Open a command window and sign in to Azure CLI:

    ```azurecli
    az login
    ```

1. Get your existing 'config/authsettingsv2' settings and save to a local *authsettings.json* file.
    
    ```azurecli
    az rest --method GET --url '/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/{RESOURCE_GROUP}/providers/Microsoft.Web/sites/{WEBAPP_NAME}/config/authsettingsv2/list?api-version=2020-06-01' > authsettings.json
    ```

1. Open the *authsettings.json* file using your preferred text editor.
1. Find the **login** section of **identityProviders** > **azureActiveDirectory**.
1. Add the following **loginParameters** settings: `"loginParameters":[ "response_type=code id_token","scope=openid offline_access profile https://graph.microsoft.com/User.Read" ]` .

    ```json
    "identityProviders": {
        "azureActiveDirectory": {
          "enabled": true,
          "login": {
            "loginParameters":[
              "response_type=code id_token",
              "scope=openid offline_access profile https://graph.microsoft.com/User.Read"
            ]
          }
        }
      }
    },
    ```

1. Save your changes to the *authsettings.json* file and upload the local settings to your web app:

    ```azurecli
    az rest --method PUT --url '/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/{RESOURCE_GROUP}/providers/Microsoft.Web/sites/{WEBAPP_NAME}/config/authsettingsv2?api-version=2020-06-01' --body @./authsettings.json
    ```
---


## Call Microsoft Graph from Node.js

Your web app now has the required permissions. It also adds Microsoft Graph's client ID to the login parameters.

### Install client library packages

Install the [@azure/identity](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md) and the [@microsoft/microsoft-graph-client](https://www.npmjs.com/package/@microsoft/microsoft-graph-client?activeTab=readme) packages in your project with npm.

```bash
npm install @microsoft/microsoft-graph-client
```

### Configure authentication information

Create an object to hold the authentication settings:

```javascript
// partial code in app.js
const appSettings = {
    appCredentials: {
        clientId: process.env.WEBSITE_AUTH_CLIENT_ID, // Enter the client Id here,
        tenantId: "common", // Enter the tenant info here,
        clientSecret: process.env.MICROSOFT_PROVIDER_AUTHENTICATION_SECRET // Enter the client secret here,
    },
    authRoutes: {
        redirect: "/.auth/login/aad/callback", // Enter the redirect URI here
        error: "/error", // enter the relative path to error handling route
        unauthorized: "/unauthorized" // enter the relative path to unauthorized route
    },
    protectedResources: {
        graphAPI: {
            endpoint: "https://graph.microsoft.com/v1.0/me", // resource endpoint
            scopes: ["User.Read"] // resource scopes
        },
    },
}
```

### Call Microsoft Graph on behalf of the user

The following code shows how to call Microsoft Graph controller as the app and get some user information.

```javascript
// controllers/graphController.js

// get the name of the app service instance from environment variables
const appServiceName = process.env.WEBSITE_SITE_NAME;

const graphHelper = require('../utils/graphHelper');

exports.getProfilePage = async(req, res, next) => {

    try {
        // get user's access token scoped to Microsoft Graph from session
        // use token to create Graph client
        const graphClient = graphHelper.getAuthenticatedClient(req.session.protectedResources["graphAPI"].accessToken);

        // return user's profile
        const profile = await graphClient
            .api('/me')
            .get();

        res.render('profile', { isAuthenticated: req.session.isAuthenticated, profile: profile, appServiceName: appServiceName });   
    } catch (error) {
        next(error);
    }
}
```

The previous code relies on the following getAuthenticatedClient function to return Microsoft Graph client.

```javascript
// utils/graphHelper.js

const graph = require('@microsoft/microsoft-graph-client');

getAuthenticatedClient = (accessToken) => {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate requests
        authProvider: (done) => {
            done(null, accessToken);
        }
    });

    return client;
}
```

## Clean up resources


If you completed all the steps in this multipart tutorial, you created an App Service, App Service hosting plan, and a storage account in a resource group. You also created an app registration in Microsoft Entra ID. If you chose external configuration, you might have created a new external tenant. When no longer needed, delete these resources and app registration so that you don't continue to accrue charges.

In this tutorial, you learn how to:

> 
>
> - Delete the Azure resources created while following the tutorial.

### Delete the resource group

1. In the [Azure portal](https://portal.azure.com), from the Azure portal menu, select **Resource groups**.
1. Select the resource group that contains your App Service and App Service plan.
1. Select **Delete resource group** to delete the resource group and all the resources.

   Screenshot that shows deleting the resource group.

This action might take several minutes.

### Delete the app registration

1. In the [Microsoft Entra admin center](https://entra.microsoft.com), select **App registrations**. Then select the application you created.

   Screenshot that shows selecting app registration.

1. In the app registration overview, select **Delete**.

   Screenshot that shows deleting the app registration.

### Delete the external tenant

If you created a new external tenant, you can [delete it](https://learn.microsoft.com/entra/external-id/customers/how-to-delete-external-tenant-portal).  

1. In the [Microsoft Entra admin center](https://entra.microsoft.com), browse to **Entra ID** > **Overview** > **Manage tenants**.

1. Select the tenant you want to delete, and then select **Delete**.

   You might need to complete required actions before you can delete the tenant. For example, you might need to delete all user flows and app registrations in the tenant.

1. If you're ready to delete the tenant, select **Delete**.


## Next steps

In this tutorial, you learned how to:

> 
>
> - Grant delegated permissions to a web app.
> - Call Microsoft Graph from a web app for a signed-in user.

> 
> [App service accesses Microsoft Graph as the app](scenario-secure-app-access-microsoft-graph-as-app.md)
