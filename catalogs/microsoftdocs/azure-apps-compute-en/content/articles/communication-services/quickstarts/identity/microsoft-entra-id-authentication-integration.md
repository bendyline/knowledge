---
title: Set up and obtain access tokens for Microsoft Entra ID users
titleSuffix: An Azure Communication Services quickstart
description: Building client application providing access tokens for Microsoft Entra ID users
author: aigerimb
manager: soricos
services: azure-communication-services
ms.author: aigerimb
ms.date: 05/06/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: identity
ms.reviewer: dominikme, dariac, sanchezjuan
zone_pivot_groups: acs-js-csharp
ms.custom: mode-other, devx-track-js, has-azure-ad-ps-ref
---
# Quickstart: Set up and obtain access tokens for Microsoft Entra ID users


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


This quickstart demonstrates how to use the Communication Services Common SDK along with Azure Identity SDK in a console application to authenticate a Microsoft Entra ID user and obtain an Azure Communication Services access token. The resulting Azure Communication Services access token allows you to integrate calling features using the Communication Services Calling SDK. Messaging (Chat) via Microsoft Entra ID integration isn't supported in the public preview.

## Prerequisites
- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Azure Communication Services resource and endpoint URI. For more information, see [Create an Azure Communication Services resource](../create-communication-resource.md).
- A Microsoft Entra ID instance.  For more information, see [Microsoft Entra ID overview](https://learn.microsoft.com/entra/fundamentals/whatis?source=docs).

## Introduction

Your application can support users from either the same tenant or different tenants. In this quickstart, you'll explore a multitenant scenario involving users, developers, and administrators from the fictional companies Contoso and Fabrikam. In this example, Contoso is providing a software as a service (SaaS) solution for Fabrikam.

The following sections walk you through the steps required for administrators, developers, and users. The included diagrams illustrate the multitenant scenario. If you're working in a single-tenant environment, complete all steps for both Contoso and Fabrikam within the same tenant.

## Administrator actions

The Administrator role has extended permissions in Microsoft Entra ID. Members of this role can set up and manage resources. In the following diagram, you can see all actions that have to be executed by Administrators.

Diagram that shows administrator actions to enable Azure Communication Services support for Microsoft Entra ID users.

1. The Contoso Administrator creates a service principal for Communication Services Clients application in Contoso Microsoft Entra ID tenant. This step is required to allow the Contoso application to access Communication Services Clients application API permissions.
1. The Contoso Administrator creates or selects an existing *application* in Microsoft Entra ID. The property *Supported account types* defines whether users from various tenants can authenticate to the application. The property *Redirect URI* redirects a successful authentication request to the Contoso *client application*.
1. The Contoso Administrator adds required API permissions from Communication Services Clients application. For the full list of the permissions, see [Access tokens with Microsoft Entra ID](../../concepts/identity-model.md#access-tokens-with-microsoft-entra-id). (In the public preview, only VoIP-related permissions are available; Chat permissions are not yet supported.)
1. The Contoso Administrator creates or selects existing communication services. The Contoso Administrator grants Fabrikam Entra ID users access to Contoso Azure Communication Services resource. Azure Communication Services Common SDK will be used for  Microsoft Entra ID user authentication and in the background seamlessly obtain an Azure Communication Services access token for Microsoft Entra ID user.
1. The Fabrikam Administrator grants admin consent for the required Communication Services Clients application API permissions to the Contoso application.

<a name='step-1-create-a-service-principal-for-acs-clients-application'></a>

### Step 1: Create a service principal for Azure Communication Services Clients application
To enable the Contoso application to access Azure Communication Services Clients application API permissions, the Contoso Administrator must create a service principal for Azure Communication Services Clients application in the Contoso Microsoft Entra ID tenant.
The Contoso Administrator can create a service principal in Contoso tenant by one of the following methods:

- Use the [Microsoft Graph REST API](https://learn.microsoft.com/graph/api/serviceprincipal-post-serviceprincipals#request) to run the following request:

```http
POST https://graph.microsoft.com/v1.0/servicePrincipals
Content-Type: application/json
{
  "appId": "2a04943b-b6a7-4f65-8786-2bb6131b59f6"
}
```

  This request can also be executed in [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer/). Make sure to include your full tenant domain in the URL `https://developer.microsoft.com/graph/graph-explorer?tenant={tenant domain}`, sign in, and provide consent for `Application.ReadWrite.All` permission.

- Use the [Azure CLI](https://learn.microsoft.com/cli/azure/ad/sp#az-ad-sp-create) to run the following command:

```azurecli-interactive
az ad sp create --id 2a04943b-b6a7-4f65-8786-2bb6131b59f6
```

<a name='step-2-create-an-entra-application-registration-or-select-an-entra-application'></a>

### Step 2: Create a Microsoft Entra application registration or select a Microsoft Entra application 

Users must be authenticated against Microsoft Entra applications with Azure Communication Services Clients application API permissions. If you don't have an existing application that you want to use for this quickstart, you can create a new application registration. 

The following application settings influence the experience:
- The *Supported account types* property defines whether the application is single tenant ("Accounts in this organizational directory only") or multitenant ("Accounts in any organizational directory"). For this scenario, you can use multitenant.
- *Redirect URI* defines the URI where the authentication request is redirected after authentication.

For more detailed information, see [Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app#register-an-application). 


### Step 3: Add Azure Communication Services Clients permissions in the application

The application must declare Azure Communication Services Clients to have access to Azure Communication Services capabilities. Microsoft Entra ID user would be requesting a Microsoft Entra user token with these permissions.

> **Important:**
> Messaging (Chat) API permissions (`Chat`, `Chat.Join`, `Chat.Join.Limited`) are not available in the Microsoft Entra ID public preview. Only VoIP-related permissions (`VoIP`, `VoIP.Join`) can be granted and used via Entra ID integration during this preview period.

1. Navigate to your Microsoft Entra app in the Azure portal and select **API permissions**
1. Select **Add Permissions**
1. In the **Add Permissions** menu, select **APIs my organization uses**
1. Search for and select **Azure Communication Services Clients**
1. Select the **VoIP** permission (and any other VoIP-related permission such as **VoIP.Join** if required), then select **Add permissions**
1. Grant admin consent for all delegated permissions.

[Diagram that shows how to add Communication Services Clients permissions to the Microsoft Entra application created in previous step.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/media/entra-id/entra-id-add-permissions.png#lightbox)

### Step 4: Create or select a Communication Services resource and grant Entra ID users access to it 

The Azure Communication Services resource is used to authenticate all requests from Microsoft Entra ID users and to grant them access to the resource.

If you want to create a new Communication Services resource, see [Create and manage Communication Services resources](../create-communication-resource.md).

The Contoso administrator can provide Fabrikam Entra ID users with access to the Contoso Azure Communication Services resource through the Azure portal or by using the [Entra ID Assignment REST API](https://github.com/Azure/communication-preview/blob/master/Entra%20ID%20Support/entra-id-support-rest-api.md).

Currently, assigning access to Azure Communication Services resources via the Azure portal is a preview feature. To access it, launch the Azure portal using this URL - [Azure portal with Access Assignment Preview Enabled](https://portal.azure.com/?feature.canmodifystamps=true&Microsoft_Azure_CommunicationServices=entraIdAccess). In the Azure portal follow these steps:
1. Navigate to your Communication Services resource.
2. In the left pane, select **User access for Entra ID** under the **Settings** group.
3. Click the **Add** button to provide access to an Entra user, group, or entire tenant.
4. In the **Principal type** select the correct value. In this scenario Contoso Admin provides access for a group from Fabrikam tenant and chooses **Group**.
5. In the **Object ID** field, enter the object ID of the group from Fabrikam Microsoft Entra tenant.
6. In the **Tenant ID** field, enter the tenant ID of the Fabrikam Microsoft Entra tenant.
7. In the **Client ID** field, enter the client ID of Contoso application from [step 2](microsoft-entra-id-authentication-integration.md#step-2-create-a-microsoft-entra-application-registration-or-select-a-microsoft-entra-application).
8. Click **Save and exit** to apply the changes.

[Screenshot of providing Entra ID users with access to the Azure Communication Services resource through the Azure portal.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/media/entra-id/acs-resource-access-managing.png#lightbox)

### Step 5: Provide Administrator consent and group access to Azure Communication Services Clients application

Microsoft Entra tenant can be configured, to require Microsoft Entra administrator consent for Azure Communication Services Clients API permissions of the application. In such a case, the Microsoft Entra Administrator must grant permissions to the Contoso application for Azure Communication Services Clients API permissions. The Fabrikam Microsoft Entra Administrator provides consent via a unique URL. 

The following roles can provide consent on behalf of a company:
- Global admin
- Application admin
- Cloud application admin

If you want to check roles in Azure portal, see [List Azure role assignments](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-list-portal.md).

To construct an Administrator consent URL, the Fabrikam Microsoft Entra Administrator does the following steps:

1. In the URL *https://login.microsoftonline.com/{Tenant_ID}/adminconsent?client_id={Application_ID}*, the Administrator replaces {Tenant_ID} with the Fabrikam [Tenant ID](../../concepts/troubleshooting-info.md#get-a-directory-id), and replaces {Application_ID} with the Contoso [Application ID](../../concepts/troubleshooting-info.md#get-an-application-id).
1. The Administrator logs in and grants permissions on behalf of the organization.

The service principal of the Contoso application in the Fabrikam tenant is created if consent is granted. The Fabrikam Administrator can review the consent in Microsoft Entra ID by doing the following steps:

1. Sign in to the Azure portal as an administrator.
1. Go to **Microsoft Entra ID**.
1. On the **Enterprise applications** pane, set the **Application type** filter to **All applications**.
1. In the field for filtering the applications, enter the name of the Contoso application.
1. Select **Apply**.
1. Select the service principal by using the required name. 
1. Go to the **Permissions** pane.

You can see that the status of the Communication Services Clients application API permissions is *Granted for {Directory_name}*.


If you run into the issue "The app is trying to access a service '2a04943b-b6a7-4f65-8786-2bb6131b59f6'(Azure Communication Services Clients) that your organization '{GUID}' lacks a service principal for. You need to create a service principal for your tenant by following the instructions in the [Step 1: Create a service principal for Azure Communication Services Clients application](microsoft-entra-id-authentication-integration.md#step-1-create-a-service-principal-for-azure-communication-services-clients-application).

The group access to Azure Communication Services Clients application should be only provided if the Contoso Administrator provided a group access to the Contoso Azure Communication Services resource in the previous step. For the user or entire tenant access to the Azure Communication Services resource, the Fabrikam Administrator can skip this step.

Group-based assignment requires Microsoft Entra ID P1 or P2 edition. The Fabrikam Administrator can provide access to the group from Fabrikam tenant by using the [Microsoft Entra admin center](https://entra.microsoft.com).
To provide access to the group, the Fabrikam Administrator does the following steps:
1. Log in to [Microsoft Entra admin center](https://entra.microsoft.com) with **Global Administrator** or **Tenant Administrator** roles.
1. Navigate to **Identity > Applications > Enterprise applications** in the left panel menu.
1. In the search box, enter **Azure Communication Services Clients**, and then select the application from the search results.
1. In the left panel menu, select **Users and groups** and then select **Add user/group**.
1. On the **Add Assignment** pane, select **None Selected** under **Users and groups**.
1. Search for and select the group that you want to assign to the application.
1. Click on **Select** and then select **Assign** to assign the group to the application.

[Diagram that shows how to assign group access to Azure Communication Services Clients application.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/media/entra-id/entra-admin-center-group-application-assignment.png#lightbox)

## Developer actions

The Contoso developer needs to set up the *client application* to authenticate users. In the client application, the developer creates a credential using Communication Common SDK along with any implementation of the `TokenCredential` from Azure Identity SDK capable of authenticating users against the Microsoft Entra ID application. 

The developer's required actions are shown in following diagram:

Diagram of developer actions to enable Azure Communication Services support for Microsoft Entra ID users.

1. The Contoso developer initializes any implementation of `TokenCredential` from Azure Identity SDK which is capable of obtaining a Microsoft Entra user token for the application that was created earlier by the Contoso Administrator.
1. The Contoso developer initializes `AzureCommunicationTokenCredential` from Communication Services Common SDK with `TokenCredential` created in the step 1. The `AzureCommunicationTokenCredential` obtains an Azure Communication Services access token for Microsoft Entra ID user seamlessly in the background.

> **Note:**
> The following sections describe how to create `AzureCommunicationTokenCredential`.
**Applies to: programming-language-csharp**


## Set up prerequisites

- The latest version [.NET SDK](https://dotnet.microsoft.com/download/dotnet) for your operating system.
- [Azure Identify SDK for .NET](https://www.nuget.org/packages/Azure.Identity) to authenticate with Microsoft Entra ID.
- [Azure Communication Services Common SDK for .NET](https://www.nuget.org/packages/Azure.Communication.Common/) to obtain Azure Communication Services access tokens for Microsoft Entra ID user.

## Final code
Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/EntraIdUsersSupportQuickstart).

## Set up

### Create a new C# application

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `EntraIdUsersSupportQuickstart`. This command creates a simple "Hello World" C# project with a single source file: **Program.cs**.

```console
dotnet new console -o EntraIdUsersSupportQuickstart
```

Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

```console
cd EntraIdUsersSupportQuickstart
dotnet build
```

### Install the package

While still in the application directory, install the Azure Identity and Azure Communication Services Common library for .NET package by using the `dotnet add package` command. The Azure Communication Services Common SDK version should be `1.4.0` or later.

```console
dotnet add package Azure.Identity
dotnet add package Azure.Communication.Common
```

## Implement the credential flow

From the project directory:

1. Open **Program.cs** file in a text editor
1. Replace the contents of **Program.cs** with the following code:

```csharp
using Azure.Communication;
using Azure.Identity;

namespace EntraIdUsersSupportQuickstart
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Obtain Access Token for Entra ID User Quickstart");

            // Quickstart code goes here
        }
    }
}
```

<a name='step-1-obtain-entra-user-token-via-the-identity-library'></a>

### Step 1: Initialize implementation of TokenCredential from Azure Identity SDK

The first step in obtaining Communication Services access token for Entra ID user is getting an Entra ID access token for your Entra ID user by using [Azure.Identity](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme) SDK. The code below retrieves the Contoso Entra client ID and the Fabrikam tenant ID from environment variables named `ENTRA_CLIENT_ID` and `ENTRA_TENANT_ID`. To enable authentication for users across multiple tenants, initialize the `InteractiveBrowserCredential` class with the authority set to `https://login.microsoftonline.com/organizations`. For more information, see [Authority](https://learn.microsoft.com/entra/identity-platform/msal-client-application-configuration#authority).

```csharp
// This code demonstrates how to fetch your Microsoft Entra client ID and tenant ID from environment variables.
string clientId = Environment.GetEnvironmentVariable("ENTRA_CLIENT_ID");
string tenantId = Environment.GetEnvironmentVariable("ENTRA_TENANT_ID");

//Initialize InteractiveBrowserCredential for use with CommunicationTokenCredential.
var options = new InteractiveBrowserCredentialOptions
{
    TenantId = tenantId,
    ClientId = clientId,
};
var entraTokenCredential = new InteractiveBrowserCredential(options);

```

### Step 2: Initialize CommunicationTokenCredential

Instantiate a `CommunicationTokenCredential` with the TokenCredential created above and your Communication Services resource endpoint URI. The code below retrieves the endpoint for the resource from an environment variable named `COMMUNICATION_SERVICES_RESOURCE_ENDPOINT`.

Add the following code to the `Main` method:

```csharp
// This code demonstrates how to fetch your Azure Communication Services resource endpoint URI
// from an environment variable.
string resourceEndpoint = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_RESOURCE_ENDPOINT");

// Set up CommunicationTokenCredential to request a Communication Services access token for a Microsoft Entra ID user.
var entraTokenCredentialOptions = new EntraCommunicationTokenCredentialOptions(
    resourceEndpoint: resourceEndpoint,
    entraTokenCredential: entraTokenCredential)
{
    Scopes = new[] { "https://communication.azure.com/clients/VoIP" }
};

var credential = new CommunicationTokenCredential(entraTokenCredentialOptions);

```

Providing scopes is optional. When not specified, the `https://communication.azure.com/clients/.default` scope is automatically used, requesting all API permissions for Communication Services Clients that have been registered on the client application.

<a name='step-3-obtain-acs-access-token-of-the-entra-id-user'></a>

### Step 3: Obtain Azure Communication Services access token for Microsoft Entra ID user

Use the `GetTokenAsync` method to obtain an access token for the Entra ID user. The `CommunicationTokenCredential` can be used with the Azure Communication Services SDKs.

```csharp
// To obtain a Communication Services access token for Microsoft Entra ID call GetTokenAsync() method.
var accessToken = await credential.GetTokenAsync();
Console.WriteLine($"Token: {accessToken.Token}");
```

## Run the code

Run the application from your application directory with the `dotnet run` command.

```console
dotnet run
```



**Applies to: programming-language-javascript**


## Set up prerequisites

- [Node.js](https://nodejs.org/)
- [Azure Identity SDK for JavaScript](https://www.npmjs.com/package/@azure/identity) to authenticate with Microsoft Entra ID.
- [Azure Communication Services Common SDK for JavaScript](https://www.npmjs.com/package/@azure/communication-common) to obtain Azure Communication Services access tokens for Microsoft Entra ID user.

## Final code
Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/entra-id-users-support-quickstart).

## Set up

### Create a new Node.js Application

Open your terminal or command window create a new directory for your app, and navigate to it.

```console
mkdir entra-id-users-support-quickstart && cd entra-id-users-support-quickstart
```

Run `npm init -y` to create a `package.json` file with default settings.

```console
npm init -y
```

### Install the package

Use the `npm install` command to install the Azure Identity and Azure Communication Services Common SDKs for JavaScript. The Azure Communication Services Common SDK version should be `2.4.0` or later.

```console
npm install @azure/communication-common --save
npm install @azure/identity --save
npm install react react-dom --save
npm install vite --save
```

The `--save` option lists the library as a dependency in your **package.json** file.

Add these scripts to your package.json:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## Implement the credential flow

In this quickstart, you will create a simple React application that uses the Azure Common SDK to obtain an access token for a Microsoft Entra ID user.

From the project directory:

1. Create a `index.html` file with the following content:

    ```html
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Entra ID Support Client</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
        </body>
    </html>
    ```
1. Create a `src` directory and inside it create a `main.jsx` file with the following content:

    ```javascript
    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App";

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    ```
1. Create a `src/App.jsx` file with the following content and import the `AzureCommunicationTokenCredential` and `InteractiveBrowserCredential` classes from the Azure Communication Common and Azure Identity SDKs, respectively. Also make sure to update the `clientId`, `tenantId`, and `resourceEndpoint` variables with your Microsoft Entra client ID, tenant ID, and Azure Communication Services resource endpoint URI:

    ```javascript
    import React, { useState } from "react";
    import { AzureCommunicationTokenCredential } from "@azure/communication-common";    
    import { InteractiveBrowserCredential } from "@azure/identity";

    function App() {
        // Set your Microsoft Entra client ID and tenant ID, Azure Communication Services resource endpoint URI.
        const clientId = 'YOUR_ENTRA_CLIENT_ID';
        const tenantId = 'YOUR_ENTRA_TENANT_ID';
        const resourceEndpoint = 'YOUR_COMMUNICATION_SERVICES_RESOURCE_ENDPOINT';
        
        const [accessToken, setAccessToken] = useState("");
        const [error, setError] = useState("");
        
        const handleLogin = async () => {
            try {
                // Quickstart code goes here
                setError("");
            } catch (err) {
                console.error("Error obtaining token:", err);
                setError("Failed to obtain token: " + err.message);
            }
        };

        return (
            <div>
                <h2>Obtain Access Token for Entra ID User</h2>
                <button onClick={handleLogin}>Login and Get Access Token</button>
                {accessToken && (
                    <div>
                    <h4>Access Token:</h4>
                    <textarea value={accessToken} readOnly rows={6} cols={60} />
                    </div>
                )}
                {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
        );
    }

    export default App;
    ```
    You can import any implementation of the [TokenCredential](https://learn.microsoft.com/javascript/api/%40azure/core-auth/tokencredential) interface from the [Azure Identity SDK for JavaScript](https://www.npmjs.com/package/@azure/identity) to authenticate with Microsoft Entra ID. In this quickstart, we use the `InteractiveBrowserCredential` class, which is suitable for browser basic authentication scenarios. For a full list of the credentials offered, see [Credential Classes](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme#credential-classes).

<a name='step-1-obtain-entra-user-token-via-the-identity-library'></a>

### Step 1: Initialize implementation of TokenCredential from Azure Identity SDK

The first step in obtaining Communication Services access token for Entra ID user is getting  an Entra ID access token for your Entra ID user by using [Azure Identity](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme) SDK. To enable authentication for users across multiple tenants, initialize the `InteractiveBrowserCredential` class with the authority set to `https://login.microsoftonline.com/organizations`. For more information, see [Authority](https://learn.microsoft.com/entra/identity-platform/msal-client-application-configuration#authority).

```javascript
// Initialize InteractiveBrowserCredential for use with AzureCommunicationTokenCredential.
const entraTokenCredential = new InteractiveBrowserCredential({
    tenantId: tenantId,
    clientId: clientId,
    authorityHost: "https://login.microsoftonline.com/organizations",
});
```

### Step 2: Initialize AzureCommunicationTokenCredential

Instantiate a `AzureCommunicationTokenCredential` with the TokenCredential created above and your Communication Services resource endpoint URI.

```javascript
// Set up AzureCommunicationTokenCredential to request a Communication Services access token for a Microsoft Entra ID user.
const entraCommunicationTokenCredential = new AzureCommunicationTokenCredential({
    resourceEndpoint: resourceEndpoint,
    tokenCredential: entraTokenCredential,
});
```

Providing scopes is optional. When not specified, the `https://communication.azure.com/clients/.default` scope is automatically used, requesting all API permissions for Communication Services Clients that have been registered on the client application.

<a name='step-3-obtain-acs-access-token-of-the-entra-id-user'></a>

### Step 3: Obtain Azure Communication Services access token for Microsoft Entra ID user

Use the `getToken` method to obtain an access token for the Entra ID user. The `AzureCommunicationTokenCredential` can be used with the Azure Communication Services SDKs.

```javascript
// To obtain a Communication Services access token for Microsoft Entra ID call getToken() function.
let accessToken = await entraCommunicationTokenCredential.getToken();
setAccessToken(accessToken.token);
```

## Run the code

From a console prompt, navigate to the directory *entra-id-users-support-quickstart*, then execute the following `npm` command to run the app.

```console
npm run dev 
```




## User actions

The user represents the Fabrikam users of the Contoso application. The user experience is shown in the following diagram:

Diagram of user actions to enable Azure Communication Services support for Microsoft Entra ID users.

1. The Fabrikam user uses the Contoso *client application* and is prompted to authenticate.
1. The Contoso *client application* uses the Azure Identity SDK to authenticate the user against the Fabrikam Microsoft Entra tenant for the Contoso application with Communication Services Clients permissions. Authentication is redirected to the *client application*, as defined in the property *Redirect URI* in the Contoso application.
1. The Communication Common SDK seamlessly obtains an Azure Communication Services access token for Fabrikam Entra ID user in the background.

Developers can integrate the Communication Services Calling SDK by providing `AzureCommunicationTokenCredential`. (Chat SDK integration via Entra ID will be available when messaging support is added after the public preview.)

## Next steps

In this quickstart, you learned how to:

> 
> * Create and configure an application in Microsoft Entra ID.
> * Use Communication Services Common SDK and Azure Identity SDK to integrate Microsoft Entra ID users to Azure Communication Services.
Learn about the following concepts:

- [Support Microsoft Entra ID users in Azure Communication Services](../../concepts/identity-model.md#microsoft-entra-id-integrating-with-entra-id)
- [Tenancy in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/single-and-multi-tenant-apps)
