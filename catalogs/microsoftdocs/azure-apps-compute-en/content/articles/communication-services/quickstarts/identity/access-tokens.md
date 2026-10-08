---
title: Create and manage access tokens for end users
titleSuffix: An Azure Communication Services guide
description: Manage identities and access tokens for end users using the Azure Communication Services Identity SDK.
author: soricos85
manager: dariagrigoriu
services: azure-communication-services
ms.author: dariac
ms.date: 11/17/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: identity
zone_pivot_groups: acs-azcli-js-csharp-java-python-portal-nocode
ms.custom: mode-other, devx-track-azurecli, devx-track-extended-java, devx-track-js, devx-track-python
---

# Create and manage access tokens for end users


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Access tokens enable Azure Communication Services SDKs to [authenticate](../../concepts/authentication.md) directly against Azure Communication Services as a particular identity. You need to create access tokens for end users if you want them to join a call or chat thread within your application. 

This article describes how to use the Azure Communication Services SDKs to create identities and manage your access tokens. For production use cases, we recommend that you generate access tokens on a server-side service as described in [Client and server architecture](../../concepts/identity-model.md#client-server-architecture-for-the-bring-your-own-identity-byoi-model).

**Applies to: platform-azcli**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md?#access-your-connection-strings-and-service-endpoints-using-azure-cli).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).

## Set up your environment

### Add the extension

Add the Azure Communication Services extension for Azure CLI using the `az extension` command.

```azurecli-interactive
az extension add --name communication
```

### Sign in to Azure CLI

You need to [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal, then provide your credentials.


### (Optional) Use Azure CLI identity operations without passing in a connection string

You can configure the `AZURE_COMMUNICATION_CONNECTION_STRING` environment variable to use Azure CLI identity operations without having to use `--connection_string` to pass in the connection string. To configure an environment variable, open a console window and select your operating system from the following tabs. Replace `<yourConnectionString>` with your actual connection string.

#### [Windows](#tab/windows)

Open a console window and enter the following command:

```console
setx AZURE_COMMUNICATION_CONNECTION_STRING "<yourConnectionString>"
```

After you add the environment variable, you might need to restart any running programs that need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [macOS](#tab/unix)

Edit your **`.zshrc`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you might need to close and reopen the editor, IDE, or shell in order to access the variable.

#### [Linux](#tab/linux)

Edit your **`.bash_profile`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you might need to close and reopen the editor, IDE, or shell in order to access the variable.

---

### Store your access token in an environment variable

To configure an environment variable, open a console window and select your operating system from the below tabs. Replace `<yourAccessToken>` with your actual access token.

#### [Windows](#tab/windows)

Open a console window and enter the following command:

```console
setx AZURE_COMMUNICATION_ACCESS_TOKEN "<yourAccessToken>"
```

After you add the environment variable, you might need to restart any running programs that need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [macOS](#tab/unix)

Edit your **`.zshrc`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_ACCESS_TOKEN="<yourAccessToken>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you might need to close and reopen the editor, IDE, or shell in order to access the variable.

#### [Linux](#tab/linux)

Edit your **`.bash_profile`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_ACCESS_TOKEN="<yourAccessToken>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you might need to close and reopen the editor, IDE, or shell in order to access the variable.

---

## Operations

### Create an identity

To create access tokens, you need an identity. Azure Communication Services maintains a lightweight identity directory for this purpose. Use the `user create` command to create a new entry in the directory with a unique `Id`. The identity is required later for issuing access tokens.

```azurecli-interactive
az communication identity user create --connection-string "<yourConnectionString>"
```

- Replace `<yourConnectionString>` with your connection string.

### Create an identity and issue an access token in the same request

Run the following command to create a Communication Services identity and issue an access token for it at the same time. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Authenticate to Azure Communication Services](../../concepts/authentication.md).

```azurecli-interactive
az communication identity token issue --scope chat --connection-string "<yourConnectionString>"
```

Make this replacement in the code:

- Replace `<yourConnectionString>` with your connection string.

### Issue access token

Run the following command to issue an access token for your Communication Services identity. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Authenticate to Azure Communication Services](../../concepts/authentication.md).

```azurecli-interactive
az communication identity token issue --scope chat --user "<userId>" --connection-string "<yourConnectionString>"
```

Make this replacement in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<userId>` with your userId.

Access tokens are short-lived credentials that need to be reissued. Not doing so might cause a disruption of your application users' experience. The `expires_on` response property indicates the lifetime of the access token.

### Issue access token with multiple scopes

Run the following command to issue an access token with multiple scopes for your Communication Services identity. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Identity model](../../concepts/identity-model.md#access-tokens).

```azurecli-interactive
az communication identity token issue --scope chat voip --user "<userId>" --connection-string "<yourConnectionString>"
```

Make this replacement in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<userId>` with your userId.

Access tokens are short-lived credentials that need to be reissued. Not doing so might cause a disruption of your application users' experience. The `expires_on` response property indicates the lifetime of the access token.

<a name='exchange-an-azure-ad-access-token-of-the-teams-user-for-a-communication-identity-access-token'></a>

### Exchange a Microsoft Entra access token of the Teams user for a Communication Identity access token

Use the `token get-for-teams-user` command to issue an access token for the Teams user that can be used with the Azure Communication Services SDKs.

```azurecli-interactive
az communication identity token get-for-teams-user --aad-token "<yourAadToken>" --client "<yourAadApplication>" --aad-user "<yourAadUser>" --connection-string "<yourConnectionString>"
```

Make this replacement in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<yourAadUser>` with your Microsoft Entra userId.
- Replace `<yourAadApplication>` with your Microsoft Entra application ID.
- Replace `<yourAadToken>` with your Microsoft Entra access token.

### Revoke access tokens

You might need to explicitly revoke an access token. For example, you would do so when application users change the password they use to authenticate to your service. The `token revoke` command invalidates all active access tokens that were issued to the identity.

```azurecli-interactive
az communication identity token revoke --user "<userId>" --connection-string "<yourConnectionString>"
```

Make this replacement in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<userId>` with your userId.

### Delete an identity

When you delete an identity, you revoke all active access tokens and prevent the further issuance of access tokens for the identity. Doing so also removes all persisted content associated with the identity.

```azurecli-interactive
az communication identity user delete --user "<userId>" --connection-string "<yourConnectionString>"
```

Make this replacement in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<userId>` with your userId.



**Applies to: programming-language-csharp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core) version for your operating system.
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

## Final code

Find the finalized code at [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/AccessTokensQuickstart).

## Set up your environment

### Create a new C# application

1. In a command prompt window, such as cmd, PowerShell, or Bash, run the `dotnet new` command to create a new console app with the name `AccessTokensQuickstart`. This command creates a simple Hello World C# project with a single source file, `Program.cs`.

   ```console
   dotnet new console -o AccessTokensQuickstart
   ```

2. Change your directory to the newly created app folder, and use the `dotnet build` command to compile your application.

   ```console
   cd AccessTokensQuickstart
   dotnet build
   ```

   A simple `Hello World` output displays. If it displays correctly, your setup is working and you can get started writing your Azure Communication Services code.

### Install the package

While you're still in the application directory, install the Azure Communication Services Identity library for .NET package by using the `dotnet add package` command.

```console
dotnet add package Azure.Communication.Identity
```

### Set up the app framework

In the project directory, complete the following steps:

1. Open the `Program.cs` file in a text editor.
1. Add a `using` directive to include the `Azure.Communication.Identity` namespace.
1. To support async code, update the `Main` method declaration.

To begin, run the following code:

```csharp
using System;
using Azure;
using Azure.Core;
using Azure.Communication.Identity;

namespace AccessTokensQuickstart
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Access Tokens Quickstart");

            // Quickstart code goes here
        }
    }
}
```

## Authenticate the client

Initialize `CommunicationIdentityClient` with your connection string. The following code, which you add to the `Main` method, retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. 

For more information, see [Create and manage Communication Services resources > Store your connection string](../create-communication-resource.md#store-your-connection-string).

```csharp
// This code demonstrates how to retrieve your connection string
// from an environment variable.
string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");
var client = new CommunicationIdentityClient(connectionString);
```

Alternatively, you can separate the endpoint and access key by running the following code:

```csharp
// This code demonstrates how to fetch your endpoint and access key
// from an environment variable.
string endpoint = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_ENDPOINT");
string accessKey = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_ACCESSKEY");
var client = new CommunicationIdentityClient(new Uri(endpoint), new AzureKeyCredential(accessKey));
```

If you already set up a Microsoft Entra application, you can [authenticate by using Microsoft Entra ID](service-principal.md).

```csharp
TokenCredential tokenCredential = new DefaultAzureCredential();
var client = new CommunicationIdentityClient(new Uri(endpoint), tokenCredential);
```

## Create an identity

To create access tokens, you need an identity. Azure Communication Services maintains a lightweight identity directory for this purpose. Use the `createUser` method to create a new entry in the directory with a unique `Id`. Use the identity later to issue access tokens.

```csharp
var identityResponse = await client.CreateUserAsync();
var identity = identityResponse.Value;
Console.WriteLine($"\nCreated an identity with ID: {identity.Id}");
```

Store the received identity with mapping to your application users (for example, by storing it in your application server database).

## (Preview) Create an identity with an associated customId

> **Important:**
> This feature is available starting with the SDK version `1.4.0-beta1`.

> **Note:**
> This feature is currently in preview.

You can create an identity with an associated `customId` to map your application's user identities with Azure Communication Services identities. If you call the `CreateUser` method again with the same `customId`, it will return the same `user.Id`. This eliminates the need to store the mapping yourself.

```csharp
Response<CommunicationUserIdentifier> user = await client.CreateUserAsync(customId: "alice@contoso.com");
Console.WriteLine($"\nCreated an identity with ID: {user.Id}");
```

## (Preview) Get identity details

> **Important:**
> This feature is available starting with the SDK version `1.4.0-beta1`.

> **Note:**
> This feature is currently in preview.

You can use the `GetUserDetail` method to retrieve information about a user, including the `customId` and the `lastTokenIssuedAt`.

```csharp
Response<CommunicationUserIdentifier> user = await client.CreateUserAsync(customId: "alice@contoso.com");
var userDetails = client.GetUserDetail(user);
Console.WriteLine($"User ID: {userDetails.Id}");
Console.WriteLine($"Custom ID: {userDetails.CustomId}");
Console.WriteLine($"Last token issued at: {userDetails.LastTokenIssuedAt}");
```

## Issue an access token

After you have a Communication Services identity, use the `GetToken` method to issue an access token for it. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Identity model](../../concepts/identity-model.md#access-tokens). You can also construct a new instance of `communicationUser` based on a string representation of an Azure Communication Service identity.

```csharp
// Issue an access token with a validity of 24 hours and the "voip" scope for an identity
var tokenResponse = await client.GetTokenAsync(identity, scopes: new [] { CommunicationTokenScope.VoIP });

// Get the token from the response
var token =  tokenResponse.Value.Token;
var expiresOn = tokenResponse.Value.ExpiresOn;
Console.WriteLine($"\nIssued an access token with 'voip' scope that expires at {expiresOn}:");
Console.WriteLine(token);
```

Access tokens are short-lived credentials that need to be reissued. Not doing so might cause a disruption of your application user experience. The `expiresOn` property indicates the lifetime of the access token.

## Set a custom token expiration time

The default token expiration time is 24 hours, but you can configure it by providing a value between an hour and 24 hours to the optional parameter `tokenExpiresIn`. When requesting a new token, specify the expected typical length of a communication session for the token expiration time.

```csharp
// Issue an access token with a validity of an hour and the "voip" scope for an identity 
TimeSpan tokenExpiresIn = TimeSpan.FromHours(1);
CommunicationTokenScope[] scopes = new[] { CommunicationTokenScope.VoIP };
var tokenResponse = await client.GetTokenAsync(identity, scopes, tokenExpiresIn);
```

## Create an identity and issue a token in the same request

You can use the `CreateUserAndTokenAsync` method to create a Communication Services identity and issue an access token for it at the same time. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Authenticate to Azure Communication Services](../../concepts/authentication.md).

```csharp
// Issue an identity and an access token with a validity of 24 hours and the "voip" scope for the new identity
var identityAndTokenResponse = await client.CreateUserAndTokenAsync(scopes: new[] { CommunicationTokenScope.VoIP });

// Retrieve the identity, token, and expiration date from the response
var identity = identityAndTokenResponse.Value.User;
var token = identityAndTokenResponse.Value.AccessToken.Token;
var expiresOn = identityAndTokenResponse.Value.AccessToken.ExpiresOn;
Console.WriteLine($"\nCreated an identity with ID: {identity.Id}");
Console.WriteLine($"\nIssued an access token with 'voip' scope that expires at {expiresOn}:");
Console.WriteLine(token);
```

### (Preview) Create and identity and issue a token in the same request with a custom ID

> **Important:**
> This feature is available starting with the SDK version `1.4.0-beta1`.

> **Note:**
> This feature is currently in preview.

You can pass your custom ID to the `CreateUserAndTokenAsync` method to create an identity and issue an access token in a single call.

```csharp
// Issue an identity and an access token with a validity of 24 hours and the "voip" scope for the new identity
Response<CommunicationUserIdentifierAndToken> identityAndTokenResponse = await client.CreateUserAndTokenAsync(customId: "bob@contoso.com", scopes: new[] { CommunicationTokenScope.VoIP });

// Retrieve the identity, token, and expiration date from the response
var identity = identityAndTokenResponse.User;
var token = identityAndTokenResponse.AccessToken.Token;
var expiresOn = identityAndTokenResponse.AccessToken.ExpiresOn;
Console.WriteLine($"\nCreated an identity with ID: {identity.Id}");
Console.WriteLine($"\nIssued an access token with 'voip' scope that expires at {expiresOn}:");
Console.WriteLine(token);
```

## Refresh an access token

To refresh an access token, pass an instance of the `CommunicationUserIdentifier` object into `GetTokenAsync`. If you stored this `Id` and need to create a new `CommunicationUserIdentifier`, you can do so by passing your stored `Id` into the `CommunicationUserIdentifier` constructor as follows:

```csharp
var identityToRefresh = new CommunicationUserIdentifier(identity.Id);
var tokenResponse = await client.GetTokenAsync(identityToRefresh, scopes: new [] { CommunicationTokenScope.VoIP });
```

## Revoke access tokens

You might need to explicitly revoke an access token. For example, when application users change the password they use to authenticate to your service. The `RevokeTokensAsync` method invalidates all active access tokens that were issued to the identity.

```csharp
await client.RevokeTokensAsync(identity);
Console.WriteLine($"\nSuccessfully revoked all access tokens for identity with ID: {identity.Id}");
```

## Delete an identity

When you delete an identity, you revoke all active access tokens and prevent the further issue of access tokens for the identity. Doing so also removes all persisted content associated with the identity.

```csharp
await client.DeleteUserAsync(identity);
Console.WriteLine($"\nDeleted the identity with ID: {identity.Id}");
```

## Run the code

When you finish creating the access token, you can run the application from your application directory using the `dotnet run` command.

```console
dotnet run
```

The app's output describes each completed action:

<!---cSpell:disable --->
```console
Azure Communication Services - Access Tokens Quickstart

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Issued an access token with 'voip' scope that expires at 10/11/2022 7:34:29 AM +00:00:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-1ce9-31b4-54b7-a43a0d006a52

Issued an access token with 'voip' scope that expires at 10/11/2022 7:34:29 AM +00:00:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Successfully revoked all access tokens for identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Deleted the identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502
```
<!---cSpell:enable --->



**Applies to: programming-language-javascript**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

## Final code

Find the finalized code at [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/access-tokens-quickstart).

## Set up your environment

### Create a new Node.js application

1. In a terminal or command prompt window, create a new directory for your app, and then open it.

   ```console
   mkdir access-tokens-quickstart && cd access-tokens-quickstart
   ```

2. Run `npm init -y` to create a `package.json` file with default settings.

   ```console
   npm init -y
   ```

### Install the package

Use the `npm install` command to install the Azure Communication Services Identity SDK for JavaScript.

```console
npm install @azure/communication-identity@latest --save
```

The `--save` option lists the library as a dependency in your `package.json` file.

## Set up the app framework

1. Create a file named `issue-access-token.js` in the project directory and add the following code:

    ```javascript
    const { CommunicationIdentityClient } = require('@azure/communication-identity');

    const main = async () => {
      console.log("Azure Communication Services - Access Tokens Quickstart")

      // Quickstart code goes here
    };

    main().catch((error) => {
      console.log("Encountered an error");
      console.log(error);
    })
    ```

## Authenticate the client

Instantiate `CommunicationIdentityClient` with your connection string. The following code, which you add to the `Main` method, retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. 

For more information, see [Create and manage Communication Services resources > Store your connection string](../create-communication-resource.md#store-your-connection-string).

```javascript
// This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];

// Instantiate the identity client
const identityClient = new CommunicationIdentityClient(connectionString);
```

Alternatively, you can separate the endpoint and access key by running the following code:

```javascript
// This code demonstrates how to fetch your endpoint and access key
// from an environment variable.
const endpoint = process.env["COMMUNICATION_SERVICES_ENDPOINT"];
const accessKey = process.env["COMMUNICATION_SERVICES_ACCESSKEY"];

// Create the credential
const tokenCredential = new AzureKeyCredential(accessKey);

// Instantiate the identity client
const identityClient = new CommunicationIdentityClient(endpoint, tokenCredential)
```

If you already set up a Microsoft Entra application, you can [authenticate by using Microsoft Entra ID](service-principal.md).

```javascript
const endpoint = process.env["COMMUNICATION_SERVICES_ENDPOINT"];
const tokenCredential = new DefaultAzureCredential();
const identityClient = new CommunicationIdentityClient(endpoint, tokenCredential);
```

## Create an identity

To create access tokens, you need an identity. Azure Communication Services maintains a lightweight identity directory for this purpose. Use the `createUser` method to create a new entry in the directory with a unique `Id`. You need the identity later to issue access tokens.

```javascript
let identityResponse = await identityClient.createUser();
console.log(`\nCreated an identity with ID: ${identityResponse.communicationUserId}`);
```

Store the received identity with mapping to your application's users (for example, by storing it in your application server database).

## (Preview) Create an identity with an associated custom ID

> **Important:**
> This feature is available starting with the SDK version `1.4.0-beta1`.

> **Note:**
> This feature is currently in preview.

You can create an identity with an associated `customId` to map your application's user identities to Azure Communication Services identities. When you call `createUser` with the same `customId`, the service returns the same `communicationUserId`. This eliminates the need to store the mapping yourself.

```javascript
const customId = "alice@contoso.com";
let user = await identityClient.createUser({ customId });
console.log(`\nCreated an identity with ID: ${user.communicationUserId}`);
```

## (Preview) Get identity details

> **Important:**
> This feature is available starting with the SDK version `1.4.0-beta1`.

> **Note:**
> This feature is currently in preview.

You can use the `getUserDetail` method to retrieve information about a user, including the `customId` and the `lastTokenIssuedAt`.

```javascript
const customId = "alice@contoso.com";
let user = await identityClient.createUser({ customId });
let userDetails = client.getUserDetail(user);
console.log(`\nUser ID: ${user.communicationUserId}`);
console.log(`\nCustom ID: ${userDetails.customId}`);
console.log(`\nLast token issued at: ${userDetails.lastTokenIssuedAt}`);
```

## Issue an access token

Use the `getToken` method to issue an access token for your Communication Services identity. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Identity model](../../concepts/identity-model.md#access-tokens). You can also construct a new instance of a `communicationUser` based on a string representation of the Azure Communication Service identity.

```javascript
// Issue an access token with a validity of 24 hours and the "voip" scope for an identity
let tokenResponse = await identityClient.getToken(identityResponse, ["voip"]);

// Get the token and its expiration date from the response
const { token, expiresOn } = tokenResponse;
console.log(`\nIssued an access token with 'voip' scope that expires at ${expiresOn}:`);
console.log(token);
```

Access tokens are short-lived credentials that need to be reissued. Not doing so might cause a disruption of your application user experience. The `expiresOn` property indicates the lifetime of the access token.

## Set a custom token expiration time

The default token expiration time is 24 hours (1440 minutes), but you can configure it by providing a value between 60 minutes and 1440 minutes to the optional parameter `tokenExpiresInMinutes`. When requesting a new token, specify the expected typical length of a communication session for the token expiration time.

```javascript
// Issue an access token with a validity of an hour and the "voip" scope for an identity
const tokenOptions: GetTokenOptions = { tokenExpiresInMinutes: 60 };
let tokenResponse = await identityClient.getToken
(identityResponse, ["voip"], tokenOptions);
```

## Create an identity and issue a token in one method call

You can use the `createUserAndToken` method to create a Communication Services identity and issue an access token for it at the same time. The `scopes` parameter defines a set of access token permissions and roles. Create it with the `voip` scope.

```javascript
// Issue an identity and an access token with a validity of 24 hours and the "voip" scope for the new identity
let identityTokenResponse = await identityClient.createUserAndToken(["voip"]);

// Get the token, its expiration date, and the user from the response
const { token, expiresOn, user } = identityTokenResponse;
console.log(`\nCreated an identity with ID: ${user.communicationUserId}`);
console.log(`\nIssued an access token with 'voip' scope that expires at ${expiresOn}:`);
console.log(token);
```

### (Preview) Create an identity and issue a token in one method call including a customId

> **Important:**
> This feature is available starting with the SDK version `1.4.0-beta1`.

> **Note:**
> This feature is currently in preview.

You can pass your custom ID to the `createUserAndToken` method to create an identity and issue an access token in a single call.

```javascript
// Issue an identity and an access token with a validity of 24 hours and the "voip" scope for the new identity
const customId = "bob@contoso.com";
let identityTokenResponse = await identityClient.createUserAndToken(["voip"], { customId });

// Get the token, its expiration date, and the user from the response
const { token, expiresOn, user } = identityTokenResponse;
console.log(`\nCreated an identity with ID: ${user.communicationUserId}`);
console.log(`\nIssued an access token with 'voip' scope that expires at ${expiresOn}:`);
console.log(token);
```

## Refresh an access token

As tokens expire, you need to refresh them. To refresh tokens, call `getToken` again with the same identity used to issue the tokens. You also need to provide the `scopes` of the refreshed tokens.

```javascript
// Value of identityResponse represents the Azure Communication Services identity stored during identity creation and then used to issue the tokens being refreshed
let refreshedTokenResponse = await identityClient.getToken(identityResponse, ["voip"]);
```

## Revoke access tokens

You might need to revoke an access token. For example, you do so when application users change the password they use to authenticate to your service. The `revokeTokens` method invalidates all active access tokens that were issued to the identity.

```javascript
await identityClient.revokeTokens(identityResponse);

console.log(`\nSuccessfully revoked all access tokens for identity with ID: ${identityResponse.communicationUserId}`);
```

## Delete an identity

When you delete an identity, you revoke all active access tokens and prevent the further issue of access tokens for the identity. Doing so also removes all persisted content associated with the identity.

```javascript
await identityClient.deleteUser(identityResponse);

console.log(`\nDeleted the identity with ID: ${identityResponse.communicationUserId}`);
```

## Run the code

From a console prompt, go to the directory that contains the *issue-access-token.js* file, and then execute the following `node` command to run the app:

```console
node ./issue-access-token.js
```

The app output describes each completed action:

<!---cSpell:disable --->
```console
Azure Communication Services - Access Tokens Quickstart

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Issued an access token with 'voip' scope that expires at 2022-10-11T07:34:29.9028648+00:00:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-1ce9-31b4-54b7-a43a0d006a52

Issued an access token with 'voip' scope that expires at 2022-10-11T07:34:29.9028648+00:00:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Successfully revoked all access tokens for identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Deleted the identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502
```
<!---cSpell:enable --->



**Applies to: programming-language-python**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python](https://www.python.org/downloads/) 3.8+.
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

## Final code

Find the finalized code at [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/access-tokens-quickstart).

## Set up your environment

### Create a new Python application

1. In a terminal or command prompt window, create a new directory for your app, and then open it.

   ```console
   mkdir access-tokens-quickstart && cd access-tokens-quickstart
   ```

2. Use a text editor to create a file called `issue-access-tokens.py` in the project root directory. Then add the structure for the program, including basic exception handling. You add all the source code to this file.

   ```python
   import os
   from datetime import timedelta
   from azure.communication.identity import CommunicationIdentityClient, CommunicationUserIdentifier

   try:
      print("Azure Communication Services - Access Tokens Quickstart")
      # Quickstart code goes here
   except Exception as ex:
      print("Exception:")
      print(ex)
   ```

### Install the package

While in the application directory, install the Azure Communication Services Identity SDK for Python package using the `pip install` command.

```console
pip install azure-communication-identity
```

## Authenticate the client

Instantiate a `CommunicationIdentityClient` with your connection string. The following code, which you add to the `try` block, retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. 

For more information, see [Create and manage Communication Services resources > Store your connection string](../create-communication-resource.md#store-your-connection-string).

```python
# This code demonstrates how to retrieve your connection string
# from an environment variable.
connection_string = os.environ["COMMUNICATION_SERVICES_CONNECTION_STRING"]

# Instantiate the identity client
client = CommunicationIdentityClient.from_connection_string(connection_string)
```

Alternatively, if you already set up a Microsoft Entra application, you can [authenticate by using Microsoft Entra ID](service-principal.md).

```python
endpoint = os.environ["COMMUNICATION_SERVICES_ENDPOINT"]
client = CommunicationIdentityClient(endpoint, DefaultAzureCredential())
```

## Create an identity

To create access tokens, you need an identity. Azure Communication Services maintains a lightweight identity directory for this purpose. Use the `create_user` method to create a new entry in the directory with a unique `Id`. The identity is required later to issue access tokens.

```python
identity = client.create_user()
print("\nCreated an identity with ID: " + identity.properties['id'])
```

Store the received identity with mapping to your application users (for example, by storing it in your application server database).

## Issue an access token

Use the `get_token` method to issue an access token for your Communication Services identity. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Identity model](../../concepts/identity-model.md#access-tokens). You can also construct a new instance of parameter `CommunicationUserIdentifier` based on a string representation of the Azure Communication Service identity.

```python
# Issue an access token with a validity of 24 hours and the "voip" scope for an identity
token_result = client.get_token(identity, ["voip"])
print("\nIssued an access token with 'voip' scope that expires at " + token_result.expires_on + ":")
print(token_result.token)
```

Access tokens are short-lived credentials that need to be reissued. Not doing so might cause a disruption of your application user experience. The `expires_on` response property indicates the lifetime of the access token.

## Set a custom token expiration time

The default token expiration time is 24 hours, but you can configure it by providing a value between an hour and 24 hours to the optional parameter `token_expires_in`. When requesting a new token, specify the expected typical length of a communication session for the token expiration time.

```python
# Issue an access token with a validity of an hour and the "voip" scope for an identity
token_expires_in = timedelta(hours=1)
token_result = client.get_token(identity, ["voip"], token_expires_in=token_expires_in)
```

## Create an identity and issue an access token in the same request

You can use the `create_user_and_token` method to create a Communication Services identity and issue an access token for it at the same time. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Authenticate to Azure Communication Services](../../concepts/authentication.md).

```python
# Issue an identity and an access token with a validity of 24 hours and the "voip" scope for the new identity
identity_token_result = client.create_user_and_token(["voip"])

# Get the token details from the response
identity = identity_token_result[0]
token = identity_token_result[1].token
expires_on = identity_token_result[1].expires_on
print("\nCreated an identity with ID: " + identity.properties['id'])
print("\nIssued an access token with 'voip' scope that expires at " + expires_on + ":")
print(token)
```

## Refresh an access token

To refresh an access token, use the `CommunicationUserIdentifier` object to reissue a token by passing in the existing identity:

```python
# The existingIdentity value represents the Communication Services identity that's stored during identity creation
identity = CommunicationUserIdentifier(existingIdentity)
token_result = client.get_token(identity, ["voip"])
```

## Revoke access tokens

You might need to explicitly revoke an access token. For example, when application users change the password they use to authenticate to your service. The `revoke_tokens` method invalidates all active access tokens that were issued to the identity.

```python
client.revoke_tokens(identity)
print("\nSuccessfully revoked all access tokens for identity with ID: " + identity.properties['id'])
```

## Delete an identity

When you delete an identity, you revoke all active access tokens and prevent the further issuance of access tokens for the identity. Doing so also removes all persisted content associated with the identity.

```python
client.delete_user(identity)
print("\nDeleted the identity with ID: " + identity.properties['id'])
```

## Run the code

From a console prompt, go to the directory that contains the `issue-access-tokens.py` file, and then execute the following `python` command to run the app.

```console
python ./issue-access-tokens.py
```

The generated output describes each completed action:

<!---cSpell:disable --->
```console
Azure Communication Services - Access Tokens Quickstart

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Issued an access token with 'voip' scope that expires at 2022-10-11T07:34:29.9028648+00:00:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-1ce9-31b4-54b7-a43a0d006a52

Issued an access token with 'voip' scope that expires at 2022-10-11T07:34:29.9028648+00:00:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Successfully revoked all access tokens for identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Deleted the identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502
```
<!---cSpell:enable --->



**Applies to: programming-language-java**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://learn.microsoft.com/azure/developer/java/fundamentals/java-jdk-install) version 8 or later.
- [Apache Maven](https://maven.apache.org/download.cgi).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

## Final code

Find the finalized code at [GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/access-token-quickstart).

## Set up your environment

### Create a new Java application

In a terminal or command prompt window, go to the directory where you want to create your Java application. To generate a Java project from the maven-archetype-quickstart template, run the following code:

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

Notice that the `generate` task creates a directory with the same name as `artifactId`. Under this directory, the `src/main/java` directory contains the project source code, the `src/test/java` directory contains the test source, and the `pom.xml` file is the project's Project Object Model, or POM. This file is used for project configuration parameters.

### Install the Communication Services packages

Open the `pom.xml` file in your text editor. Add the following dependency element to the group of dependencies:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-identity</artifactId>
    <version>[1.4.0,)</version>
</dependency>
```

This code instructs Maven to install the Communication Services Identity SDK, which you need to use later.

### Set up the app framework

In the project directory, complete the following steps:

1. Go to the `/src/main/java/com/communication/quickstart` directory.
1. Open the `App.java` file in your editor.
1. Replace the `System.out.println("Hello world!");` statement.
1. Add `import` directives.

Use the following code to begin:

```java
package com.communication.quickstart;

import com.azure.communication.common.*;
import com.azure.communication.identity.*;
import com.azure.communication.identity.models.*;
import com.azure.core.credential.*;

import java.io.IOException;
import java.time.*;
import java.util.*;

public class App
{
    public static void main( String[] args ) throws IOException
    {
        System.out.println("Azure Communication Services - Access Tokens Quickstart");
        // Quickstart code goes here
    }
}
```

## Authenticate the client

Instantiate a `CommunicationIdentityClient` with your resource's access key and endpoint. For more information, see [Create and manage Communication Services resources > Store your connection string](../create-communication-resource.md#store-your-connection-string). 

You can also initialize the client with any custom HTTP client that implements the `com.azure.core.http.HttpClient` interface.

In the `App.java` file, add the following code to the `main` method:

```java
// You can find your endpoint and access key from your resource in the Azure portal
String endpoint = "https://<RESOURCE_NAME>.communication.azure.com";
String accessKey = "SECRET";

CommunicationIdentityClient communicationIdentityClient = new CommunicationIdentityClientBuilder()
        .endpoint(endpoint)
        .credential(new AzureKeyCredential(accessKey))
        .buildClient();
```

Instead of providing the endpoint and access key, you can provide the entire connection string by using the `connectionString()` method.

```java
// You can find your connection string from your Communication Services resource in the Azure portal
String connectionString = "<connection_string>";

CommunicationIdentityClient communicationIdentityClient = new CommunicationIdentityClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

If you already set up a Microsoft Entra application, you can [authenticate by using Microsoft Entra ID](service-principal.md).

```java
String endpoint = "https://<RESOURCE_NAME>.communication.azure.com";
TokenCredential credential = new DefaultAzureCredentialBuilder().build();

CommunicationIdentityClient communicationIdentityClient = new CommunicationIdentityClientBuilder()
        .endpoint(endpoint)
        .credential(credential)
        .buildClient();
```

## Create an identity

To create access tokens, you need an identity. Azure Communication Services maintains a lightweight identity directory for this purpose. Use the `createUser` method to create a new entry in the directory with a unique `Id`.

```java
CommunicationUserIdentifier user = communicationIdentityClient.createUser();
System.out.println("\nCreated an identity with ID: " + user.getId());
```

The created identity is required later to issue access tokens. Store the received identity with mapping to your application's users (for example, by storing it in your application server database). 

## Issue an access token

Use the `getToken` method to issue an access token for your Communication Services identity. The `scopes` parameter defines a set of access token permissions and roles. For more information, see the list of supported actions in [Identity model](../../concepts/identity-model.md#access-tokens). 

In the following code, use the user variable that you created in the preceding step to get a token.

```java
// Issue an access token with a validity of 24 hours and the "voip" scope for a user identity
List<CommunicationTokenScope> scopes = new ArrayList<>(Arrays.asList(CommunicationTokenScope.VOIP));
AccessToken accessToken = communicationIdentityClient.getToken(user, scopes);
OffsetDateTime expiresAt = accessToken.getExpiresAt();
String token = accessToken.getToken();
System.out.println("\nIssued an access token with 'voip' scope that expires at: " + expiresAt + ": " + token);
```

Access tokens are short-lived credentials that need to be reissued. Not doing so might cause a disruption of your application user experience. The `expiresAt` property indicates the lifetime of the access token.

## Set a custom token expiration time

The default token expiration time is 24 hours, but you can configure it by providing a value between an hour and 24 hours to the optional parameter `tokenExpiresIn`. When requesting a new token, specify the expected typical length of a communication session for the token expiration time.

```java
// Issue an access token with a validity of an hour and the "voip" scope for a user identity
List<CommunicationTokenScope> scopes = new ArrayList<>(Arrays.asList(CommunicationTokenScope.VOIP));
Duration tokenExpiresIn = Duration.ofHours(1);
AccessToken accessToken = communicationIdentityClient.getToken(user, scopes, tokenExpiresIn);
```

## Create an identity and issue a token in one request

Alternatively, you can use the 'createUserAndToken' method to create a new entry in the directory with a unique `Id` and issue an access token at the same time.

```java
//Create an identity and issue token with a validity of 24 hours in one call
List<CommunicationTokenScope> scopes = Arrays.asList(CommunicationTokenScope.CHAT);
CommunicationUserIdentifierAndToken result = communicationIdentityClient.createUserAndToken(scopes);
CommunicationUserIdentifier user = result.getUser();
System.out.println("\nCreated a user identity with ID: " + user.getId());
AccessToken accessToken = result.getUserToken();
OffsetDateTime expiresAt = accessToken.getExpiresAt();
String token = accessToken.getToken();
System.out.println("\nIssued an access token with 'chat' scope that expires at: " + expiresAt + ": " + token);
```

## Refresh an access token

To refresh an access token, use the `CommunicationUserIdentifier` object to reissue it:

```java
// existingIdentity represents the Communication Services identity that's stored during identity creation
CommunicationUserIdentifier identity = new CommunicationUserIdentifier(existingIdentity.getId());
AccessToken response = communicationIdentityClient.getToken(identity, scopes);
```

## Revoke an access token

You might need to explicitly revoke an access token. For example, you would do so when application users change the password they use to authenticate to your service. The `revokeTokens` method invalidates all active access tokens for a particular user. In the following code, you can use the previously created user.

```java
communicationIdentityClient.revokeTokens(user);
System.out.println("\nSuccessfully revoked all access tokens for user identity with ID: " + user.getId());
```

## Delete an identity

When you delete an identity, you revoke all active access tokens and prevent the further issuance of access tokens for the identity. Doing so also removes all persisted content associated with the identity.

```java
communicationIdentityClient.deleteUser(user);
System.out.println("\nDeleted the user identity with ID: " + user.getId());
```

## Run the code

1. Go to the directory that contains the `pom.xml` file.

2. Compile the project using the following `mvn` command:

   ```console
   mvn compile
   ```

3. build the package:

   ```console
   mvn package
   ```

4. Run the following `mvn` command to execute the app:

   ```console
   mvn exec:java -Dexec.mainClass="com.communication.quickstart.App" -Dexec.cleanupDaemonThreads=false
   ```

The output describes each completed action:

<!---cSpell:disable --->
```console
Azure Communication Services - Access Tokens Quickstart

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Issued an access token with 'voip' scope that expires at 2022-10-11T07:34:29.902864800Z:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Created an identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-1ce9-31b4-54b7-a43a0d006a52

Issued an access token with 'chat' scope that expires at 2022-10-11T07:34:29.902864800Z:
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMF8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjUzODcyNjkiLCJleHAiOjE2NjUzOTA4NjksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNjY1Mzg3MjY5fQ.kTXpQQtY7w6O82kByljZXrKtBvNNOleDE5m06LapzLeoWfRZCCpJQcDzBoLRA146mOhNzLZ0b5WMNTa5tD-0hWCiicDwgKLMASEGY9g0EvNQOidPff47g2hh6yqi9PKiDPp-t5siBMYqA6Nh6CQ-Oeh-35vcRW09VfcqFN38IgSSzJ7QkqBiY_QtfXz-iaj81Td0287KO4U1y2LJIGiyJLWC567F7A_p1sl6NmPKUmvmwM47tyCcQ1r_lfkRdeyDmcrGgY6yyI3XJZQbpxyt2DZqOTSVPB4PuRl7iyXxvppEa4Uo_y_BdMOOWFe6YTRB5O5lhI8m7Tf0LifisxX2sw

Successfully revoked all access tokens for identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502

Deleted the identity with ID: 8:acs:4ccc92c8-9815-4422-bddc-ceea181dc774_00000006-19e0-2727-80f5-8b3a0d003502
```
<!---cSpell:enable --->



**Applies to: platform-azportal**


## Prerequisites

- An [Azure Communication Services resource](../create-communication-resource.md).

## Create the access tokens

1. In the [Azure portal](https://portal.azure.com), navigate to the **Identities & User Access Tokens** blade in your Communication Services resource. 

2. Choose the scope of the access tokens. You can choose none, one, or multiple services. 

3. Select **Generate**.

   Screenshot that shows the scopes of the identity and access tokens where you select Generate.

   The system generates an identity and corresponding user access token.

4. Copy these strings and use them in the [sample apps](../../samples/overview.md) and other testing scenarios.

   Screenshot that shows the identity and access tokens with expiration date



**Applies to: platform-nocode**


## Prerequisites

- An Azure account with an active subscription. [Create an Azure account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An active Azure Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).

- An active Azure Logic Apps resource (logic app). [Create a Consumption logic app workflow with the trigger that you want to use](../../../logic-apps/quickstart-create-example-consumption-workflow.md). Currently, the Azure Communication Services Identity connector provides only actions, so your logic app requires a trigger, at minimum.

## Create user

Add a new step in your workflow using the Azure Communication Services Identity connector. Complete these steps in Power Automate with your Power Automate flow open in *edit* mode.

1. Open the designer. In the step where you want to add the new action, select **New step**. Alternatively, to add the new action between steps, hover over the arrow between those steps, select the plus sign (+), and select **Add an action**.

2. In the Choose an operation search box, enter Communication Services Identity. From the actions list, select **Create a user**.

    Screenshot that shows the Azure Communication Services Identity connector Create user action.

3. Provide the Connection String. You can find it in the [Microsoft Azure portal](https://portal.azure.com/), within your Azure Communication Service Resource. Select the Keys option in the left panel menu to view the Connection String.

    Screenshot that shows the Keys page within an Azure Communication Services Resource.

4. Provide a Connection Name.

5. Click **Create**

    This action generates a User ID, which is a Communication Services user identity.
    Additionally, if you click **Show advanced options** and select **Token Scope**, the action also generates an access token and its expiration time with the specified scope.

    Screenshot that shows the Azure Communication Services connector Create user action.

    Screenshot that shows the Azure Communication Services connector Create user action advanced options.

## Issue a user access token

After you have a Communication Services identity, you can issue an access token. Complete the following steps:

1. Add a new action and enter **Communication Services Identity** in the search box. From the actions list, select **Issue a user access token**.

    Screenshot that shows the Azure Communication Services Identity connector Issue access token action.

2. Now you can use the User ID output from the previous [Create a user](#create-user) step.

3. Specify the token scope: **VoIP** or **chat**. [Learn more about tokens and authentication](../../concepts/authentication.md).
 
    Screenshot that shows the Azure Communication Services Identity connector Issue access token action, specifying the token scope.

The system generates an access token and its expiration time with the specified scope.

## Revoke user access tokens

After you have a Communication Services identity, you can use the Issue a user access token action to revoke an access token. Complete following steps:

1. Add a new action and enter **Communication Services Identity** in the search box. From the actions list, select **Revoke user access tokens**.
 
    Screenshot that shows the Azure Communication Services Identity connector Revoke access token action.

2. Specify the User ID.

    Screenshot that shows the Azure Communication Services Identity connector Revoke access token action input.
 
The system revokes all user access tokens for the specified user, there are no outputs for this action.

## Delete a user

After you have a Communication Services identity, you can use the Issue a user access token action to delete an access token. Complete the following steps:

1. Add a new action and enter **Communication Services Identity** in the search box. From the actions list, select **Delete a user**.

    Screenshot that shows the Azure Communication Services Identity connector Delete user action.

2. Specify the User ID.
 
    Screenshot that shows the Azure Communication Services Identity connector Delete user action input.

The system removes the user and revokes all user access tokens for the specified user, there are no outputs for this action.

## Test your logic app

To manually start your workflow, from the designer toolbar select **Run**. The workflow creates a user, issues an access token for that user, then removes it and deletes the user.

For more information, see [how to run your workflow](../../../logic-apps/quickstart-create-example-consumption-workflow.md#run-workflow). You can check the outputs of these actions after the workflow runs successfully.



## Use identity for monitoring and metrics

The user ID acts as a primary key for logs and metrics collected through Azure Monitor. To view all of a user's calls, for example, you can set up your authentication to map a specific Azure Communication Services identity (or identities) to a single user.

For more information, see:
- [Authentication concepts](../../concepts/authentication.md)
- [Call diagnostics through log analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/concepts/analytics/log-analytics.md)
- [Metrics](../../concepts/metrics.md).

## Clean up resources

To clean up and remove a Communication Services subscription, delete the resource or resource group. Deleting a resource group also deletes any other resources associated with it. For more information, see [Create and manage Communication Services resources > Clean up resources](../create-communication-resource.md#clean-up-resources).

To clean up your logic app workflow and related resources, see [Create an example Consumption logic app workflow using the Azure portal > Clean up resources](../../../logic-apps/quickstart-create-example-consumption-workflow.md#clean-up-resources).

## Next steps

This article described how to create a user and delete a user. It also describes how to issue an access token to a user and remove a user access token using the Azure Communication Services Identity connector. For more information, see [Azure Communication Services Identity Connector](https://learn.microsoft.com/connectors/acsidentity/).

To see how tokens are use by other connectors, check out [how to send a chat message](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/chat/logic-app.md) from Power Automate using Azure Communication Services.

To learn more about how to send an email using the Azure Communication Services Email connector check [Send email message in Power Automate with Azure Communication Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/email/logic-app.md).

## Related articles

 - [Learn about authentication](../../concepts/authentication.md)
 - [Add chat to your app](../chat/get-started.md)
 - [Learn about client and server architecture](../../concepts/identity-model.md#client-server-architecture-for-the-bring-your-own-identity-byoi-model)
 - [Deploy trusted authentication service hero sample](../../samples/trusted-auth-sample.md)
