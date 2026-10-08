---
title: Authenticate to Azure resources from .NET apps hosted on-premises
description: This article describes how to authenticate your application to Azure services when using the Azure SDK for .NET in on-premises hosted apps. 
ms.topic: how-to
ms.date: 03/20/2026
ms.custom:
  - devx-track-dotnet
  - engagement-fy23
  - sfi-image-nochange
---

# Authenticate to Azure resources from .NET apps hosted on-premises

Apps hosted outside of Azure, such as on-premises or in a third-party data center, should use an application service principal through [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/whatis) to authenticate to Azure services. In the sections ahead, you learn:

- How to register an application with Microsoft Entra to create a service principal
- How to assign roles to scope permissions
- How to authenticate using a service principal from your app code

Using dedicated application service principals allows you to adhere to the principle of least privilege when accessing Azure resources. Permissions are limited to the specific requirements of the app during development, preventing accidental access to Azure resources intended for other apps or services. This approach also helps avoid issues when the app is moved to production by ensuring it isn't over-privileged in the development environment.

A different app registration should be created for each environment the app is hosted in. This allows environment specific resource permissions to be configured for each service principal and make sure an app deployed to one environment doesn't talk to Azure resources that are part of another environment.

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/create-app-registration.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/on-premises-apps.md)

## Assign roles to the application service principal

Next, determine what roles (permissions) your app needs on what resources and assign those roles to the service principal you created. Roles can be assigned at the resource, resource group, or subscription scope. This example shows how to assign roles at the resource group scope, since most apps group all their Azure resources into a single resource group.

### [Azure portal](#tab/azure-portal)

1. In the Azure portal, navigate to the **Overview** page of the resource group that contains your app.
1. Select **Access control (IAM)** from the left navigation.
1. On the **Access control (IAM)** page, select **+ Add** and then choose **Add role assignment** from the drop-down menu. The **Add role assignment** page provides several tabs to configure and assign roles.
1. On the **Role** tab, use the search box to locate the role you want to assign. Select the role, and then choose **Next**.
1. On the **Members** tab:
    - For the **Assign access to** value, select **User, group, or service principal** .
    - For the **Members** value, choose **+ Select members** to open the **Select members** flyout panel.
    - Search for the service principal you created earlier and select it from the filtered results. Choose **Select** to select the group and close the flyout panel.
    - Select **Review + assign** at the bottom of the **Members** tab.

    A screenshot showing how to assign a role to the service principal.

1. On the **Review + assign** tab, select **Review + assign** at the bottom of the page.

### [Azure CLI](#tab/azure-cli)

1. Use the [az role definition list](https://learn.microsoft.com/cli/azure/role/definition#az-role-definition-list) command to get the names of the roles that a service principal can be assigned to:

    ```azurecli
    az role definition list \
        --query "sort_by([].{roleName:roleName, description:description}, &roleName)" \
        --output table
    ```

1. Use the [az role assignment create](https://learn.microsoft.com/cli/azure/role/assignment#az-role-assignment-create) command to assign a role to an application service principal:

    ```azurecli
    az role assignment create \
        --assignee "<app-Id>" \
        --role "<role-name>" \
        --resource-group "<resource-group-name>"
    ```

    For information on assigning permissions at the resource or subscription level using the Azure CLI, see [Assign Azure roles using the Azure CLI](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-cli).

---


## Set the app environment variables

At runtime, certain credentials from the [Azure Identity library](https://learn.microsoft.com/dotnet/api/azure.identity?view=azure-dotnet\&preserve-view=true), such as `DefaultAzureCredential`, `EnvironmentCredential`, and `ClientSecretCredential`, search for service principal information by convention in the environment variables. There are multiple ways to configure environment variables when working with .NET, depending on your tooling and environment.

Regardless of the approach you choose, configure the following environment variables for a service principal:

- `AZURE_CLIENT_ID`: Used to identify the registered app in Azure.
- `AZURE_TENANT_ID`: The ID of the Microsoft Entra tenant.
- `AZURE_CLIENT_SECRET`: The secret credential that was generated for the app.

### [Visual Studio](#tab/visual-studio)

In Visual Studio, environment variables can be set in the `launchsettings.json` file in the `Properties` folder of your project. These values are pulled in automatically when the app starts. However, these configurations don't travel with your app during deployment, so you need to set up environment variables on your target hosting environment.

```json
"profiles": {
    "SampleProject": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7177;http://localhost:5177",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "AZURE_CLIENT_ID": "<your-client-id>",
        "AZURE_TENANT_ID":"<your-tenant-id>",
        "AZURE_CLIENT_SECRET": "<your-client-secret>"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "AZURE_CLIENT_ID": "<your-client-id>",
        "AZURE_TENANT_ID":"<your-tenant-id>",
        "AZURE_CLIENT_SECRET": "<your-client-secret>"
      }
    }
  }
```

### [Visual Studio Code](#tab/vs-code)

In Visual Studio Code, environment variables can be set in the `launch.json` file of your project. These values are pulled in automatically when the app starts. However, these configurations don't travel with your app during deployment, so you need to set up environment variables on your target hosting environment.

```json
"configurations": [
{
    "env": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "AZURE_CLIENT_ID": "<your-client-id>",
        "AZURE_TENANT_ID":"<your-tenant-id>",
        "AZURE_CLIENT_SECRET": "<your-client-secret>"
    }
}
```

### [Windows](#tab/windows)

You can set environment variables for Windows from the command line. However, the values are accessible to all apps running on that operating system and could cause conflicts, so use caution with this approach. Environment variables can be set at the user or system level.

```bash
# Set user environment variables
setx ASPNETCORE_ENVIRONMENT "Development"
setx AZURE_CLIENT_ID "<your-client-id>"
setx AZURE_TENANT_ID "<your-tenant-id>"
setx AZURE_CLIENT_SECRET "<your-client-secret>"

# Set system environment variables - requires running as admin
setx ASPNETCORE_ENVIRONMENT "Development" /m
setx AZURE_CLIENT_ID "<your-client-id>" /m
setx AZURE_TENANT_ID "<your-tenant-id>" /m
setx AZURE_CLIENT_SECRET "<your-client-secret>" /m
```

PowerShell can also be used to set environment variables at the user or system level:

```powershell
# Set user environment variables
[Environment]::SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development", "User")
[Environment]::SetEnvironmentVariable("AZURE_CLIENT_ID", "<your-client-id>", "User")
[Environment]::SetEnvironmentVariable("AZURE_TENANT_ID", "<your-tenant-id>", "User")
[Environment]::SetEnvironmentVariable("AZURE_CLIENT_SECRET", "<your-client-secret>", "User")

# Set system environment variables - requires running as admin
[Environment]::SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development", "Machine")
[Environment]::SetEnvironmentVariable("AZURE_CLIENT_ID", "<your-client-id>", "Machine")
[Environment]::SetEnvironmentVariable("AZURE_TENANT_ID", "<your-tenant-id>", "Machine")
[Environment]::SetEnvironmentVariable("AZURE_CLIENT_SECRET", "<your-client-secret>", "Machine")
```

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
