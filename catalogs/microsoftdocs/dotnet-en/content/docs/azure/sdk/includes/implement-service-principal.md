---
ms.topic: include
ms.date: 02/12/2025
---


## Authenticate to Azure services from your app

The [Azure Identity library](https://learn.microsoft.com/dotnet/api/azure.identity?view=azure-dotnet\&preserve-view=true) provides various *credentials*&mdash;implementations of `TokenCredential` adapted to supporting different scenarios and Microsoft Entra authentication flows. The steps ahead demonstrate how to use [Azure.Identity.ClientSecretCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.ClientSecretCredential) when working with service principals locally and in production.


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
1. Configure `ClientSecretCredential` with the `tenantId`, `clientId`, and `clientSecret`.
1. Pass the `ClientSecretCredential` instance to the `UseCredential` method.

[language="csharp" source="../snippets/authentication/local-dev-service-principal/Program.cs" id="snippet_ClientSecretCredential_UseCredential"::: (complete source file; reference: ../snippets/authentication/local-dev-service-principal/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/local-dev-service-principal/Program.cs.md)

An alternative to the `UseCredential` method is to provide the credential to the service client directly:

[language="csharp" source="../snippets/authentication/local-dev-service-principal/Program.cs" id="snippet_ClientSecretCredential"::: (complete source file; reference: ../snippets/authentication/local-dev-service-principal/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/local-dev-service-principal/Program.cs.md)
