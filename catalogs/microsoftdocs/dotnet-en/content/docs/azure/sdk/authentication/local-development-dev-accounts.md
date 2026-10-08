---
title: Authenticate .NET apps to Azure using developer accounts
description: Learn how to authenticate your application to Azure services when using the Azure SDK for .NET during local development using developer accounts.
ms.topic: how-to
ms.date: 11/25/2025
ms.custom:
  - devx-track-dotnet
  - engagement-fy23
  - devx-track-azurecli
  - sfi-image-nochange
---

# Authenticate .NET apps to Azure services during local development using developer accounts

During local development, applications need to authenticate to Azure to use different Azure services. Authenticate locally using one of these approaches:

- Use a developer account with one of the [developer tools supported by the Azure Identity library](#supported-developer-tools-for-authentication).
- Use a [broker](local-development-broker.md) to manage credentials.
- Use a [service principal](local-development-service-principal.md).

This article explains how to authenticate using a developer account with tools supported by the Azure Identity library. In the sections ahead, you learn:

- How to use Microsoft Entra groups to efficiently manage permissions for multiple developer accounts.
- How to assign roles to developer accounts to scope permissions.
- How to sign-in to supported local development tools.
- How to authenticate using a developer account from your app code.

## Supported developer tools for authentication

For an app to authenticate to Azure during local development using the developer's Azure credentials, the developer must be signed-in to Azure from one of the following developer tools:

- Azure CLI
- Azure Developer CLI
- Azure PowerShell
- Visual Studio
- Visual Studio Code

The Azure Identity library can detect that the developer is signed-in from one of these tools. The library can then obtain the Microsoft Entra access token via the tool to authenticate the app to Azure as the signed-in user.

This approach takes advantage of the developer's existing Azure accounts to streamline the authentication process. However, a developer's account likely has more permissions than required by the app, therefore exceeding the permissions the app runs with in production. As an alternative, you can [create application service principals to use during local development](local-development-service-principal.md), which can be scoped to have only the access needed by the app.

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/create-entra-group.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-dev-accounts.md)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/assign-group-roles.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-dev-accounts.md)

## Sign-in to Azure using developer tooling

Next, sign-in to Azure using one of several developer tools that can be used to perform authentication in your development environment. The account you authenticate should also exist in the Microsoft Entra group you created and configured earlier.

### [Visual Studio](#tab/sign-in-visual-studio)


Developers using Visual Studio 2017 or later can authenticate using their developer account through the IDE. Apps using [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) or [Azure.Identity.VisualStudioCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.VisualStudioCredential) can discover and use this account to authenticate app requests when running locally. This account is also used when you publish apps directly from Visual Studio to Azure.

> **Important:**
> You'll need to [install the **Azure development** workload](../../configure-visual-studio.md#install-azure-workloads) to enable Visual Studio tooling for Azure authentication, development, and deployment.

1. Inside Visual Studio, navigate to **Tools** > **Options** to open the options dialog.
1. In the **Search Options** box at the top, type *Azure* to filter the available options.
1. Under **Azure Service Authentication**, choose **Account Selection**.
1. Select the drop-down menu under **Choose an account** and choose to add a Microsoft account.
1. In the window that opens, enter the credentials for your desired Azure account, and then confirm your inputs.

    A screenshot showing how to sign-in to Azure using Visual Studio.

1. Select **OK** to close the options dialog.


### [Visual Studio Code](#tab/sign-in-visual-studio-code)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/sign-in-visual-studio-code.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-dev-accounts.md)

### [Azure CLI](#tab/sign-in-azure-cli)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/sign-in-azure-cli.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-dev-accounts.md)

### [Azure Developer CLI](#tab/sign-in-azure-developer-cli)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/sign-in-azure-developer-cli.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-dev-accounts.md)

### [Azure PowerShell](#tab/sign-in-azure-powershell)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/sign-in-azure-powershell.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-dev-accounts.md)

---

## Authenticate to Azure services from your app

The [Azure Identity library](https://learn.microsoft.com/dotnet/api/azure.identity?view=azure-dotnet\&preserve-view=true) provides implementations of [Azure.Core.TokenCredential](https://learn.microsoft.com/search/?terms=Azure.Core.TokenCredential) that support various scenarios and Microsoft Entra authentication flows. The steps ahead demonstrate how to use [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) or a specific development tool credential when working with user accounts locally.

### Implement the code

Complete the following steps:

1. Add references to the [Azure.Identity](https://www.nuget.org/packages/Azure.Identity) and the [Microsoft.Extensions.Azure](https://www.nuget.org/packages/Microsoft.Extensions.Azure) packages in your project:

    ```dotnetcli
    dotnet package add Azure.Identity
    dotnet package add Microsoft.Extensions.Azure
    ```

    > **Note:**
    > When using `VisualStudioCodeCredential`, you must also install the [Azure.Identity.Broker](https://www.nuget.org/packages/Azure.Identity.Broker) package:
    >
    > ```dotnetcli
    > dotnet package add Azure.Identity.Broker
    > ```

1. In `Program.cs`, add `using` directives for the `Azure.Identity` and `Microsoft.Extensions.Azure` namespaces.

1. Register the Azure service client using the corresponding `Add`-prefixed extension method.

    Azure services are accessed using specialized client classes from the Azure SDK client libraries. Register these client types so you can access them through dependency injection across your app.

1. Pass a `TokenCredential` instance to the `UseCredential` method. Common `TokenCredential` examples include:

    - A `DefaultAzureCredential` instance optimized for local development. This example sets environment variable `AZURE_TOKEN_CREDENTIALS` to `dev`. For more information, see [Exclude a credential type category](credential-chains.md#exclude-a-credential-type-category).

      [language="csharp" source="../snippets/authentication/local-dev-account/Program.cs" id="snippet_DefaultAzureCredentialDev"::: (complete source file; reference: ../snippets/authentication/local-dev-account/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/local-dev-account/Program.cs.md)

    - An instance of a credential corresponding to a specific development tool, such as `VisualStudioCredential`.

      [language="csharp" source="../snippets/authentication/local-dev-account/Program.cs" id="snippet_VisualStudioCredential"::: (complete source file; reference: ../snippets/authentication/local-dev-account/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/local-dev-account/Program.cs.md)

    > **Tip:**
    > When your team uses multiple development tools to authenticate with Azure, prefer a local development-optimized instance of `DefaultAzureCredential` over tool-specific credentials.
