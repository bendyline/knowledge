---
ms.topic: include
ms.date: 11/10/2025
---


## Authenticate to Azure services from your app

The [Azure Identity library](https://learn.microsoft.com/dotnet/api/azure.identity?view=azure-dotnet\&preserve-view=true) provides various *credentials*&mdash;implementations of `TokenCredential` adapted to supporting different scenarios and Microsoft Entra authentication flows. Since managed identity is unavailable when running locally, the steps ahead demonstrate which credential to use in which scenario:

- **Local dev environment**: During **local development only**, use a class called [DefaultAzureCredential](../authentication/credential-chains.md#defaultazurecredential-overview) for an opinionated, preconfigured chain of credentials. `DefaultAzureCredential` discovers user credentials from your local tooling or IDE, such as the Azure CLI or Visual Studio. It also provides flexibility and convenience for retries, wait times for responses, and support for multiple authentication options. Visit the [Authenticate to Azure services during local development](../authentication/local-development-dev-accounts.md) article to learn more.
- **Azure-hosted apps**: When your app is running in Azure, use [ManagedIdentityCredential](https://learn.microsoft.com/dotnet/api/azure.identity.managedidentitycredential?view=azure-dotnet\&preserve-view=true) to safely discover the managed identity configured for your app. Specifying this exact type of credential prevents other available credentials from being picked up unexpectedly.


### Implement the code

Add the [Azure.Identity](https://learn.microsoft.com/dotnet/api/azure.identity) package. In an ASP.NET Core project, also install the [Microsoft.Extensions.Azure](https://learn.microsoft.com/dotnet/api/microsoft.extensions.azure) package:

### [Command Line](#tab/command-line)

In a terminal of your choice, navigate to the application project directory and run the following commands:

```dotnetcli
dotnet add package Azure.Identity
dotnet add package Microsoft.Extensions.Azure
```

### [NuGet Package Manager](#tab/nuget-package)

Right-click your project in the Visual Studio **Solution Explorer** window and select **Manage NuGet Packages**. Search for **Azure.Identity**, and install the matching package. Repeat this process for the **Microsoft.Extensions.Azure** package.

Install a package using the package manager.

---

Azure services are accessed using specialized client classes from the various Azure SDK client libraries. These classes and your own custom services should be registered for dependency injection so they can be used throughout your app. In `Program.cs`, complete the following steps to configure a client class for dependency injection and token-based authentication:

1. Include the `Azure.Identity` and `Microsoft.Extensions.Azure` namespaces via `using` directives.
1. Register the Azure service client using the corresponding `Add`-prefixed extension method.
1. Use an appropriate `TokenCredential` instance for the environment in which your app is running. When your app is running:
    - In Azure, pass an instance of `ManagedIdentityCredential` to the `UseCredential` method and configure either the client ID, resource ID, or object ID. `ManagedIdentityCredential` discovers your managed identity configurations to authenticate to other services automatically.
    - On your local development machine, an instance of `DefaultAzureCredential` is created on your behalf. Call `UseCredential` only if you want to [customize `DefaultAzureCredential`](../authentication/credential-chains.md#how-to-customize-defaultazurecredential) or use a different credential. `DefaultAzureCredential` looks in the environment variables for an application service principal or at locally installed developer tools, such as Visual Studio, for a set of developer credentials.

## [Client ID](#tab/client-id)

The client ID is used to identify a managed identity when configuring applications or services that need to authenticate using that identity.

1. Retrieve the client ID assigned to a user-assigned managed identity using the following command:

    ```azurecli
    az identity show \
        --resource-group <resource-group-name> \
        --name <identity-name> \
        --query 'clientId'
    ```

1. Configure `ManagedIdentityCredential` with the client ID:

    [language="csharp" source="../snippets/authentication/user-assigned-managed-identity/Program.cs" id="snippet_MIC_ClientId_UseCredential"::: (complete source file; reference: ../snippets/authentication/user-assigned-managed-identity/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/user-assigned-managed-identity/Program.cs.md)

## [Resource ID](#tab/resource-id)

The resource ID uniquely identifies the managed identity resource within your Azure subscription using the following structure:

`/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}`

Resource IDs can be built by convention, which makes them more convenient when working with a large number of user-assigned managed identities in your environment.

1. Retrieve the resource ID for a user-assigned managed identity using the following command:

    ```azurecli
    az identity show \
        --resource-group <resource-group-name> \
        --name <identity-name> \
        --query 'id'
    ```

1. Configure `ManagedIdentityCredential` with the resource ID:

    [language="csharp" source="../snippets/authentication/user-assigned-managed-identity/Program.cs" id="snippet_MIC_ResourceId_UseCredential"::: (complete source file; reference: ../snippets/authentication/user-assigned-managed-identity/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/user-assigned-managed-identity/Program.cs.md)

## [Object ID](#tab/object-id)

A principal ID is another name for an object ID.

1. Retrieve the object ID for a user-assigned managed identity using the following command:

    ```azurecli
    az identity show \
        --resource-group <resource-group-name> \
        --name <identity-name> \
        --query 'principalId'
    ```

1. Configure `ManagedIdentityCredential` with the object ID:

    [language="csharp" source="../snippets/authentication/user-assigned-managed-identity/Program.cs" id="snippet_MIC_ObjectId_UseCredential"::: (complete source file; reference: ../snippets/authentication/user-assigned-managed-identity/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/user-assigned-managed-identity/Program.cs.md)

---
