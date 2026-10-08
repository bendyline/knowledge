---
title: Set up and create access tokens for Teams users
titleSuffix: An Azure Communication Services quickstart
description: Building service providing access tokens for Teams users
author: tomaschladek
manager: nmurav
services: azure-communication-services
ms.author: tchladek
ms.date: 06/30/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: teams-interop
zone_pivot_groups: acs-js-csharp-java-python
ms.custom:
  - mode-other
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - has-azure-ad-ps-ref
  - sfi-ga-nochange
---
# Quickstart: Set up and manage access tokens for Teams users


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


In this quickstart, you'll build a .NET console application to authenticate a Microsoft 365 user by using the Microsoft Authentication Library (MSAL) and retrieving a Microsoft Entra user token. You'll then exchange that token for an access token of Teams user with the Azure Communication Services Identity SDK. The access token for Teams user can then be used by the Communication Services Calling SDK to integrate calling capability as Teams user.

> **Note:**
> When you're in a production environment, we recommend that you implement this exchange mechanism in back-end services, because requests for an exchange are signed with a secret.

## Prerequisites
- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Azure Communication Services resource and connection string. For more information, see [Create an Azure Communication Services resource](create-communication-resource.md).
- A Microsoft Entra instance with users that have a Teams license.  For more information, see [Teams License requirements](eligible-teams-licenses.md).

## Introduction

Teams identities are bound to tenants in Microsoft Entra ID. Your application can be used by users from the same or another tenant. In this quickstart, you'll work through a multitenant use case with multiple actors: users, developers, and administrators from fictional companies Contoso and Fabrikam. In this use case, Contoso is a company that's building software as a service (SaaS) for Fabrikam. 

The following sections will guide you through the steps for administrators, developers, and users. The diagrams demonstrate the multitenant use case. If you're working with a single tenant, execute all steps from Contoso and Fabrikam in a single tenant.

## Administrator actions

The Administrator role has extended permissions in Microsoft Entra ID. Members of this role can set up resources and can read information from the Azure portal. In the following diagram, you can see all actions that have to be executed by Administrators.

Administrator actions to enable Azure Communication Services support for Teams identities.

1. The Contoso Administrator creates or selects an existing *application* in Microsoft Entra ID. The property *Supported account types* defines whether users from various tenants can authenticate to the application. The property *Redirect URI* redirects a successful authentication request to the Contoso *server*.
1. The Contoso Administrator adds API permissions to `Teams.ManageCalls` and `Teams.ManageChats` from Communication Services. 
1. The Contoso Administrator allows public client flow for the application.
1. The Contoso Administrator creates or selects existing communication services, which will be used for authentication of the exchanging requests. Microsoft Entra user tokens will be exchanged for an access token of Teams user. For more information, see [Create and manage Communication Services resources](create-communication-resource.md).
1. The Fabrikam Administrator grants Communication Services `Teams.ManageCalls` and `Teams.ManageChats` permissions to the Contoso application. This step is required if only Fabrikam Administrator can grant access to the application with the `Teams.ManageCalls` and `Teams.ManageChats` permissions. 

<a name='step-1-create-an-azure-ad-application-registration-or-select-an-azure-ad-application'></a>

### Step 1: Create a Microsoft Entra application registration or select a Microsoft Entra application 

Users must be authenticated against Microsoft Entra applications with the Azure Communication Service Teams.ManageCalls and Teams.ManageChats permissions. If you don't have an existing application that you want to use for this quickstart, you can create a new application registration. 

The following application settings influence the experience:
- The *Supported account types* property defines whether the application is single tenant ("Accounts in this organizational directory only") or multitenant ("Accounts in any organizational directory"). For this scenario, you can use multitenant.
- *Redirect URI* defines the URI where the authentication request is redirected after authentication. For this scenario, you can use **Public client/native (mobile & desktop)** and enter **`http://localhost`** as the URI.

For more detailed information, see [Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app#register-an-application). 

When the application is registered, you'll see an [identifier in the overview](../concepts/troubleshooting-info.md#get-an-application-id). This identifier, *Application (client) ID*, is used in the next steps.

### Step 2: Allow public client flows

On the **Authentication** pane of your application, you can see a configured platform for *Public client/native(mobile & desktop)* with a redirect URI pointing to *http://localhost*. At the bottom of the pane, you'll see an *Allow public client flows* toggle control, which for this quickstart should be set to **Yes**.

### Step 3: Add the Communication Services permissions in the application

The application must declare Teams.ManageCalls and Teams.ManageChats permissions to have access to Teams calling capabilities in the Tenant. Teams user would be requesting a Microsoft Entra user token with this permission for token exchange. 

1. Navigate to your Microsoft Entra app in the Azure portal and select **API permissions**
1. Select **Add Permissions**
1. In the **Add Permissions** menu, select **Azure Communication Services**
1. Select the permissions **Teams.ManageCalls** and **Teams.ManageChats**, then select **Add permissions**

Add Teams.ManageCalls and Teams.ManageChats permission to the Microsoft Entra application created in previous step.

### Step 4: Create or select a Communication Services resource

Your Communication Services resource is used to authenticate all requests for exchanging Microsoft Entra user token for an access token of Teams user. You can trigger this exchange by using the Communication Services Identity SDK, which you can authenticate with an access key, or by using Azure role-based access control (Azure RBAC). You can get the access key either in the Azure portal or by configuring Azure RBAC on the **Access control (IAM)** pane by Communication Services resource.

If you want to create a new Communication Services resource, see [Create and manage Communication Services resources](create-communication-resource.md).

### Step 5: Provide Administrator consent

Microsoft Entra tenant can be configured, to require Microsoft Entra administrator consent for the Teams.ManageCalls and Teams.ManageChats permissions of the application. In such a case, the Microsoft Entra Administrator must grant permissions to the Contoso application for Communication Services Teams.ManageCalls and Teams.ManageChats. The Fabrikam Microsoft Entra Administrator provides consent via a unique URL. 

The following roles can provide consent on behalf of a company:
- Global admin
- Application admin
- Cloud application admin

If you want to check roles in Azure portal, see [List Azure role assignments](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-list-portal).

To construct an Administrator consent URL, the Fabrikam Microsoft Entra Administrator does the following steps:

1. In the URL *https://login.microsoftonline.com/{Tenant_ID}/adminconsent?client_id={Application_ID}*, the Administrator replaces {Tenant_ID} with the Fabrikam [Tenant ID](../concepts/troubleshooting-info.md#get-a-directory-id), and replaces {Application_ID} with the Contoso [Application ID](../concepts/troubleshooting-info.md#get-an-application-id).
1. The Administrator logs in and grants permissions on behalf of the organization.

The service principal of the Contoso application in the Fabrikam tenant is created if consent is granted. The Fabrikam Administrator can review the consent in Microsoft Entra ID by doing the following steps:

1. Sign in to the Azure portal as an administrator.
1. Go to Microsoft Entra ID.
1. On the **Enterprise applications** pane, set the **Application type** filter to **All applications**.
1. In the field for filtering the applications, enter the name of the Contoso application.
1. Select **Apply**.
1. Select the service principal by using the required name. 
1. Go to the **Permissions** pane.

You can see that the status of the Communication Services Teams.ManageCalls and Teams.ManageChats permissions are *Granted for {Directory_name}*.


If you run into the issue "The app is trying to access a service '1fd5118e-2576-4263-8130-9503064c837a'(Azure Communication Services) that your organization '{GUID}' lacks a service principal for. Contact your IT Admin to review the configuration of your service subscriptions or consent to the application to create the required service principal." your Microsoft Entra tenant lacks a service principal for the Azure Communication Services application. To fix this issue, use PowerShell as a Microsoft Entra administrator to connect to your tenant. Replace `Tenant_ID` with an ID of your Microsoft Entra tenancy. 

You will require **Application.ReadWrite.All** as shown below.

[Screenshot showing Application Read Write All.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/media/graph-permissions.png#lightbox)


```script
Connect-MgGraph -TenantId "Tenant_ID" -Scopes Application.ReadWrite.All
```
If the command is not found, start PowerShell as an administrator and install the Microsoft Graph package.

```script
Install-Module Microsoft.Graph
```
Then execute the following command to add a service principal to your tenant. Do not modify the GUID of the App ID.

```script
New-MgServicePrincipal -AppId "1fd5118e-2576-4263-8130-9503064c837a"
```


## Developer actions

The Contoso developer needs to set up the *client application* to authenticate users. The developer then needs to create an endpoint on the back-end *server* to process the Microsoft Entra user token after redirection. When the Microsoft Entra user token is received, it's exchanged for the access token of Teams user and returned to the *client application*. 

The developer's required actions are shown in following diagram:

Diagram of developer actions to enable Azure Communication Services support for Teams identities.

1. The Contoso developer configures the Microsoft Authentication Library (MSAL) to authenticate the user for the application that was created earlier by the Administrator for Communication Services Teams.ManageCalls and Teams.ManageChats permissions.
1. The Contoso developer initializes the Communication Services Identity SDK and exchanges the incoming Microsoft Entra user token for the access token of Teams user via the identity SDK. The access token of Teams user is then returned to the *client application*.

By using the MSAL, developers can acquire Microsoft Entra user tokens from the Microsoft identity platform endpoint to authenticate users and access secure web APIs. It can be used to provide secure access to Communication Services. The MSAL supports many different application architectures and platforms, including .NET, JavaScript, Java, Python, Android, and iOS.

For more information about setting up environments in public documentation, see [Microsoft Authentication Library overview](https://learn.microsoft.com/entra/identity-platform/msal-overview).

> **Note:**
> The following sections describe how to exchange the Microsoft Entra access token for the access token of Teams user for the console application.

**Applies to: programming-language-csharp**


## Set up prerequisites

- The latest version [.NET SDK](https://dotnet.microsoft.com/download/dotnet) for your operating system.

## Final code
Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/ManageTeamsIdentityMobileAndDesktop).

## Set up

### Create a new C# application

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `CommunicationAccessTokensQuickstart`. This command creates a simple "Hello World" C# project with a single source file: **Program.cs**.

```console
dotnet new console -o CommunicationAccessTokensQuickstart
```

Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

```console
cd CommunicationAccessTokensQuickstart
dotnet build
```

### Install the package

While still in the application directory, install the Azure Communication Services Identity library for .NET package by using the `dotnet add package` command.

```console
dotnet add package Azure.Communication.Identity
dotnet add package Microsoft.Identity.Client
```

### Set up the app framework

From the project directory:

1. Open **Program.cs** file in a text editor
1. Add a `using` directive to include the `Azure.Communication.Identity` namespace
1. Update the `Main` method declaration to support async code

Use the following code to begin:

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Azure.Communication.Identity;
using Microsoft.Identity.Client;

namespace CommunicationAccessTokensQuickstart
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Teams Access Tokens Quickstart");

            // Quickstart code goes here
        }
    }
}
```

<a name='step-1-receive-the-azure-ad-user-token-and-object-id-via-the-msal-library'></a>

### Step 1: Receive the Microsoft Entra user token and object ID via the MSAL library

The first step in the token exchange flow is getting a token for your Teams user by using [Microsoft.Identity.Client](https://learn.microsoft.com/entra/identity-platform/reference-v2-libraries). The code below retrieves Microsoft Entra client ID and tenant ID from environment variables named `AAD_CLIENT_ID` and `AAD_TENANT_ID`. It's essential to configure the MSAL client with the correct authority, based on the `AAD_TENANT_ID` environment variable, to be able to retrieve the Object ID (`oid`) claim corresponding with a user in Fabrikam's tenant and initialize the `userObjectId` variable.

```csharp
// This code demonstrates how to fetch a Microsoft Entra ID client ID and tenant ID 
// from an environment variable.
string appId = Environment.GetEnvironmentVariable("AAD_CLIENT_ID");
string tenantId = Environment.GetEnvironmentVariable("AAD_TENANT_ID");
string authority = $"https://login.microsoftonline.com/{tenantId}";
string redirectUri = "http://localhost";

// Create an instance of PublicClientApplication
var aadClient = PublicClientApplicationBuilder
                .Create(appId)
                .WithAuthority(authority)
                .WithRedirectUri(redirectUri)
                .Build();

List<string> scopes = new() {
    "https://auth.msft.communication.azure.com/Teams.ManageCalls",
    "https://auth.msft.communication.azure.com/Teams.ManageChats"
};

// Retrieve the Microsoft Entra ID token and object ID of a Teams user
var result = await aadClient
                        .AcquireTokenInteractive(scopes)
                        .ExecuteAsync();
string teamsUserAadToken =  result.AccessToken;
string userObjectId =  result.UniqueId;
```

### Step 2: Initialize the CommunicationIdentityClient

Initialize a `CommunicationIdentityClient` with your connection string. The code below retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. Learn how to [manage your resource's connection string](create-communication-resource.md#store-your-connection-string).

Add the following code to the `Main` method:

```csharp
// This code demonstrates how to fetch your connection string
// from an environment variable.
string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");
var client = new CommunicationIdentityClient(connectionString);
```

<a name='step-3-exchange-the-azure-ad-access-token-of-the-teams-user-for-a-communication-identity-access-token'></a>

### Step 3: Exchange the Microsoft Entra access token of the Teams User for a Communication Identity access token

Use the `GetTokenForTeamsUser` method to issue an access token for the Teams user that can be used with the Azure Communication Services SDKs.

```csharp
var options = new GetTokenForTeamsUserOptions(teamsUserAadToken, appId, userObjectId);
var accessToken = await client.GetTokenForTeamsUserAsync(options);
Console.WriteLine($"Token: {accessToken.Value.Token}");
```

## Run the code

Run the application from your application directory with the `dotnet run` command.

```console
dotnet run
```



**Applies to: programming-language-javascript**


## Set up prerequisites

- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended).

## Final code
Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/manage-teams-identity-mobile-and-desktop).

## Set up

### Create a new Node.js Application

Open your terminal or command window create a new directory for your app, and navigate to it.

```console
mkdir communication-access-tokens-quickstart && cd communication-access-tokens-quickstart
```

Run `npm init -y` to create a `package.json` file with default settings.

```console
npm init -y
```

### Install the package

Use the `npm install` command to install the Azure Communication Services Identity SDK for JavaScript.

```console

npm install @azure/communication-identity@latest --save
npm install @azure/msal-node --save
npm install express --save
npm install dotenv --save

```

The `--save` option lists the library as a dependency in your **package.json** file.

## Set up the app framework

From the project directory:

1. Open a new text file in your code editor
1. Add a `require` call to load the `CommunicationIdentityClient`
1. Create the structure for the program, including basic exception handling

    ```javascript
    const { CommunicationIdentityClient } = require('@azure/communication-identity');    
    const { PublicClientApplication, CryptoProvider } = require('@azure/msal-node');
    const express = require("express");

    // You will need to set environment variables in .env
    const SERVER_PORT = process.env.PORT || 80;
    const REDIRECT_URI = `http://localhost:${SERVER_PORT}/redirect`;
    const clientId = process.env['AAD_CLIENT_ID'];
    const tenantId = process.env['AAD_TENANT_ID'];

    // Quickstart code goes here
    
    app.listen(SERVER_PORT, () => console.log(`Communication access token application started on ${SERVER_PORT}!`))
    
    ```

1. Save the new file as `issue-communication-access-token.js` in the `access-tokens-quickstart` directory.

<a name='step-1-receive-the-azure-ad-user-token-and-object-id-via-the-msal-library'></a>

### Step 1: Receive the Microsoft Entra user token and object ID via the MSAL library

The first step in the token exchange flow is getting a token for your Teams user by using [Microsoft.Identity.Client](https://learn.microsoft.com/entra/identity-platform/reference-v2-libraries). The code below retrieves Microsoft Entra client ID and tenant ID from environment variables named `AAD_CLIENT_ID` and `AAD_TENANT_ID`. It's essential to configure the MSAL client with the correct authority, based on the `AAD_TENANT_ID` environment variable, to be able to retrieve the Object ID (`oid`) claim corresponding with a user in Fabrikam's tenant and initialize the `userObjectId` variable.

```javascript
// Create configuration object that will be passed to MSAL instance on creation.
const msalConfig = {
    auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
    }
};

// Create an instance of PublicClientApplication
const pca = new PublicClientApplication(msalConfig);
const provider = new CryptoProvider();

const app = express();

let pkceVerifier = "";
const scopes = [
            "https://auth.msft.communication.azure.com/Teams.ManageCalls",
            "https://auth.msft.communication.azure.com/Teams.ManageChats"
        ];

app.get('/', async (req, res) => {
    // Generate PKCE Codes before starting the authorization flow
    const {verifier, challenge} = await provider.generatePkceCodes();
    pkceVerifier = verifier;
    
    const authCodeUrlParameters = {
        scopes: scopes,
        redirectUri: REDIRECT_URI,
        codeChallenge: challenge, 
        codeChallengeMethod: "S256"
    };
    // Get url to sign user in and consent to scopes needed for application
    pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', async (req, res) => {
    // Create request parameters object for acquiring the Microsoft Entra ID token and object ID of a Teams user
    const tokenRequest = {
        code: req.query.code,
        scopes: scopes,
        redirectUri: REDIRECT_URI,
        codeVerifier: pkceVerifier,
    };
    // Retrieve the Microsoft Entra ID token and object ID of a Teams user
    pca.acquireTokenByCode(tokenRequest).then(async(response) => {
        console.log("Response:", response);
        let teamsUserAadToken = response.accessToken;
        let userObjectId = response.uniqueId;
        //TODO: the following code snippets go here
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});
```

### Step 2: Initialize the CommunicationIdentityClient

Instantiate a `CommunicationIdentityClient` with your connection string. The code below retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. Learn how to [manage your resource's connection string](create-communication-resource.md#store-your-connection-string).

Add the following code to the `then` method:

```javascript
// This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];

// Instantiate the identity client
const identityClient = new CommunicationIdentityClient(connectionString);
```

<a name='step-3-exchange-the-azure-ad-access-token-of-the-teams-user-for-a-communication-identity-access-token'></a>

### Step 3: Exchange the Microsoft Entra access token of the Teams User for a Communication Identity access token

Use the `getTokenForTeamsUser` method to issue an access token for the Teams user that can be used with the Azure Communication Services SDKs.

```javascript
//Exchange the Azure AD access token of the Teams User for a Communication Identity access token
let accessToken = await identityClient.getTokenForTeamsUser({
    teamsUserAadToken: teamsUserAadToken,
    clientId: clientId,
    userObjectId: userObjectId,
  });
console.log("Token:", accessToken);
```

## Run the code

From a console prompt, navigate to the directory containing the *issue-communication-access-token.js* file, then execute the following `node` command to run the app.

```console
node ./issue-communication-access-token.js
```



**Applies to: programming-language-python**


## Set up prerequisites

- [Python](https://www.python.org/downloads/) 3.8+.

## Final code
Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/manage-teams-identity-mobile-and-desktop).

## Set up

### Create a new Python application

1. Open your terminal or command window create a new directory for your app, and navigate to it.

   ```console
   mkdir communication-access-tokens-quickstart && cd communication-access-tokens-quickstart
   ```

1. Use a text editor to create a file called `exchange-communication-access-tokens.py` in the project root directory and add the structure for the program, including basic exception handling. You'll add all the source code for this quickstart to this file in the following sections.

   ```python
   import os
   from azure.communication.identity import CommunicationIdentityClient, CommunicationUserIdentifier
   from msal.application import PublicClientApplication

   try:
      print("Azure Communication Services - Access Tokens Quickstart")
      # Quickstart code goes here
   except Exception as ex:
      print(f"Exception: {ex}")
   ```

### Install the package

While still in the application directory, install the Azure Communication Services Identity SDK for Python package by using the `pip install` command.

```console
pip install azure-communication-identity
pip install msal
```

<a name='step-1-receive-the-azure-ad-user-token-and-object-id-via-the-msal-library'></a>

### Step 1: Receive the Microsoft Entra user token and object ID via the MSAL library

The first step in the token exchange flow is getting a token for your Teams user by using [Microsoft.Identity.Client](https://learn.microsoft.com/entra/identity-platform/reference-v2-libraries). In Azure portal, configure the Redirect URI of your "Mobile and Desktop application" as `http://localhost`. The code below retrieves Microsoft Entra client ID and tenant ID from environment variables named `AAD_CLIENT_ID` and `AAD_TENANT_ID`. It's essential to configure the MSAL client with the correct authority, based on the `AAD_TENANT_ID` environment variable, to be able to retrieve the Object ID (`oid`) claim corresponding with a user in Fabrikam's tenant and initialize the `user_object_id` variable.

```python
# This code demonstrates how to fetch your Azure AD client ID and tenant ID
# from an environment variable.
client_id = os.environ["AAD_CLIENT_ID"]
tenant_id = os.environ["AAD_TENANT_ID"]
authority = "https://login.microsoftonline.com/%s" % tenant_id

# Create an instance of PublicClientApplication
app = PublicClientApplication(client_id, authority=authority)

scopes = [ 
"https://auth.msft.communication.azure.com/Teams.ManageCalls",
"https://auth.msft.communication.azure.com/Teams.ManageChats"
 ]

# Retrieve the Microsoft Entra ID token and object ID of a Teams user
result = app.acquire_token_interactive(scopes)
aad_token =  result["access_token"]
user_object_id = result["id_token_claims"]["oid"] 
```

### Step 2: Initialize the CommunicationIdentityClient

Instantiate a `CommunicationIdentityClient` with your connection string. The code below retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. Learn how to [manage your resource's connection string](create-communication-resource.md#store-your-connection-string).

Add this code inside the `try` block:

```python
# This code demonstrates how to fetch your connection string
# from an environment variable.
connection_string = os.environ["COMMUNICATION_SERVICES_CONNECTION_STRING"]

# Instantiate the identity client
client = CommunicationIdentityClient.from_connection_string(connection_string)
```

<a name='step-3-exchange-the-azure-ad-access-token-of-the-teams-user-for-a-communication-identity-access-token'></a>

### Step 3: Exchange the Microsoft Entra access token of the Teams User for a Communication Identity access token

Use the `get_token_for_teams_user` method to issue an access token for the Teams user that can be used with the Azure Communication Services SDKs.

```python
# Exchange the Azure AD access token of the Teams User for a Communication Identity access token
token_result = client.get_token_for_teams_user(aad_token, client_id, user_object_id)
print("Token: " + token_result.token)
```

## Run the code

From a console prompt, navigate to the directory containing the *exchange-teams-access-tokens.py* file, then execute the following `python` command to run the app.

```console
python ./exchange-communication-access-tokens.py
```



**Applies to: programming-language-java**


## Set up prerequisites

- [Java Development Kit (JDK)](https://learn.microsoft.com/azure/developer/java/fundamentals/java-jdk-install) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).

## Final code
Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/ManageTeamsIdentityMobileAndDesktop).

## Set up

### Create a new Java application

Open your terminal or command window. Navigate to the directory where you'd like to create your Java application. Run the command below to generate the Java project from the `maven-archetype-quickstart` template.

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

You'll notice that the 'generate' task created a directory with the same name as the `artifactId`. Under this directory, the `src/main/java` directory contains the project source code, the `src/test/java directory` contains the test source, and the `pom.xml` file is the project's Project Object Model, or POM.

### Install the package

Open the `pom.xml` file in your text editor. Add the following dependency elements to the group of dependencies.

```xml
<dependencies>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-communication-identity</artifactId>
        <version>[1.2.0,)</version>
    </dependency>
    <dependency>
      <groupId>com.microsoft.azure</groupId>
      <artifactId>msal4j</artifactId>
      <version>1.11.0</version>
    </dependency>
</dependencies>
```

### Set up the app framework

From the project directory:

1. Navigate to the `/src/main/java/com/communication/quickstart` directory
1. Open the `App.java` file in your editor
1. Replace the `System.out.println("Hello world!");` statement
1. Add `import` directives

Use the following code to begin:

```java
package com.communication.quickstart;

import com.azure.communication.identity.CommunicationIdentityClient;
import com.azure.communication.identity.CommunicationIdentityClientBuilder;
import com.azure.communication.identity.models.GetTokenForTeamsUserOptions;
import com.azure.core.credential.AccessToken;
import com.microsoft.aad.msal4j.IAuthenticationResult;
import com.microsoft.aad.msal4j.InteractiveRequestParameters;
import com.microsoft.aad.msal4j.PublicClientApplication;

import java.net.URI;
import java.util.HashSet;
import java.util.Set;

public class App
{
    public static void main( String[] args ) throws Exception
    {
        System.out.println("Azure Communication Services - Communication access token Quickstart");
        // Quickstart code goes here
    }
}
```

<a name='step-1-receive-the-azure-active-directory-user-token-and-object-id-via-the-msal-library'></a>

### Step 1: Receive the Microsoft Entra user token and object ID via the MSAL library

The first step in the token exchange flow is getting a token for your Teams user by using [Microsoft.Identity.Client](https://learn.microsoft.com/entra/identity-platform/reference-v2-libraries). It's essential to configure the MSAL client with the correct authority, based on the `tenantId` variable, to be able to retrieve the Object ID (`oid`) claim corresponding with a user in Fabrikam's tenant and initialize the `userObjectId` variable.

```java
// You need to provide your Azure AD client ID and tenant ID
String appId = "<contoso_application_id>";
String tenantId = "<contoso_tenant_id>";
String authority = "https://login.microsoftonline.com/" + tenantId;

// Create an instance of PublicClientApplication
PublicClientApplication pca = PublicClientApplication.builder(appId)
        .authority(authority)
        .build();

String redirectUri = "http://localhost";
Set<String> scope = new HashSet<String>();
scope.add("https://auth.msft.communication.azure.com/Teams.ManageCalls");
scope.add("https://auth.msft.communication.azure.com/Teams.ManageChats");

// Create an instance of InteractiveRequestParameters for acquiring the Microsoft Entra ID token and object ID of a Teams user
InteractiveRequestParameters parameters = InteractiveRequestParameters
                    .builder(new URI(redirectUri))
                    .scopes(scope)
                    .build();

// Retrieve the Microsoft Entra ID token and object ID of a Teams user
IAuthenticationResult result = pca.acquireToken(parameters).get();
String teamsUserAadToken = result.accessToken();
String[] accountIds = result.account().homeAccountId().split("\\.");
String userObjectId = accountIds[0];
System.out.println("Teams token: " + teamsUserAadToken);
```

### Step 2: Initialize the CommunicationIdentityClient

Instantiate a `CommunicationIdentityClient` with your resource's access key and endpoint. Learn how to [manage your resource's connection string](create-communication-resource.md#store-your-connection-string). In addition, you can initialize the client with any custom HTTP client the implements the `com.azure.core.http.HttpClient` interface.

Add the following code to the `main` method:

```java
//You can find your connection string from your resource in the Azure portal
String connectionString = "<connection_string>";

// Instantiate the identity client
CommunicationIdentityClient communicationIdentityClient = new CommunicationIdentityClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

<a name='step-3-exchange-the-azure-ad-access-token-of-the-teams-user-for-a-communication-identity-access-token'></a>

### Step 3: Exchange the Microsoft Entra access token of the Teams User for a Communication Identity access token

Use the `getTokenForTeamsUser` method to issue an access token for the Teams user that can be used with the Azure Communication Services SDKs.

```java
// Exchange the Azure AD access token of the Teams User for a Communication Identity access token
GetTokenForTeamsUserOptions options = new GetTokenForTeamsUserOptions(teamsUserAadToken, appId, userObjectId);
var accessToken = communicationIdentityClient.getTokenForTeamsUser(options);
System.out.println("Token: " + accessToken.getToken());
```

## Run the code

Navigate to the directory containing the `pom.xml` file and compile the project by using the `mvn compile` command.

Then, build the package.

```console
mvn package
```

Run the following `mvn` command to execute the app.

```console
mvn exec:java -Dexec.mainClass="com.communication.quickstart.App" -Dexec.cleanupDaemonThreads=false
```




## User actions

The user represents the Fabrikam users of the Contoso application. The user experience is shown in the following diagram:

Diagram of user actions to enable Azure Communication Services support for Teams identities.

1. The Fabrikam user uses the Contoso *client application* and is prompted to authenticate.
1. The Contoso *client application* uses the MSAL to authenticate the user against the Fabrikam Microsoft Entra tenant for the Contoso application with Communication Services Teams.ManageCalls and Teams.ManageChats permissions. 
1. Authentication is redirected to the *server*, as defined in the property *Redirect URI* in the MSAL and the Contoso application.
1. The Contoso *server* exchanges the Microsoft Entra user token for the access token of Teams user by using the Communication Services Identity SDK and returns the access token of Teams user to the *client application*.

With a valid access token for Teams user in the *client application*, developers can integrate the Communication Services Calling SDK and manage calls as Teams user.

## Next steps

In this quickstart, you learned how to:

> 
> * Create and configure an application in Microsoft Entra ID.
> * Use the Microsoft Authentication Library (MSAL) to issue a Microsoft Entra user token.
> * Use the Communication Services Identity SDK to exchange the Microsoft Entra user token for an access token of Teams user.


> 
> [Build trusted authentication service for Teams users](../samples/trusted-auth-sample.md)
> [Make a call as a Teams users to a Teams user](voice-video-calling/get-started-with-voice-video-calling-custom-teams-client.md)

Learn about the following concepts:

- [Use cases for communication as a Teams user](../concepts/interop/custom-teams-endpoint-use-cases.md)
- [Azure Communication Services support Teams identities](../concepts/teams-endpoint.md)
- [Teams interoperability](../concepts/teams-interop.md)
- [Single-tenant and multitenant authentication for Teams users](../concepts/interop/custom-teams-endpoint-authentication-overview.md)
- [Create and manage Communication access tokens for Teams users in a single-page application (SPA)](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/manage-teams-identity-spa)
