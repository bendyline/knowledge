---
title: Authenticate .NET apps to Azure services during local development using service principals
description: Learn how to authenticate your app to Azure services during local development using dedicated application service principals.
ms.topic: how-to
ms.date: 03/20/2026
ms.custom:
  - devx-track-dotnet
  - engagement-fy23
  - devx-track-azurecli
  - sfi-image-nochange
---

# Authenticate .NET apps to Azure services during local development using service principals

During local development, applications need to authenticate to Azure to access various Azure services. Two common approaches for local authentication are to [use a developer account](local-development-dev-accounts.md) or a service principal. This article explains how to use an application service principal. In the sections ahead, you learn:

- How to register an application with Microsoft Entra to create a service principal
- How to use Microsoft Entra groups to efficiently manage permissions
- How to assign roles to scope permissions
- How to authenticate using a service principal from your app code

Using dedicated application service principals allows you to adhere to the principle of least privilege when accessing Azure resources. Permissions are limited to the specific requirements of the app during development, preventing accidental access to Azure resources intended for other apps or services. This approach also helps avoid issues when the app is moved to production by ensuring it isn't over-privileged in the development environment.

A diagram showing how a local .NET app uses a service principal to connect to Azure resources.

When the app is registered in Azure, an application service principal is created. For local development:

- Create a separate app registration for each developer working on the app to ensure each developer has their own application service principal, avoiding the need to share credentials.
- Create a separate app registration for each app to limit the app's permissions to only what is necessary.

During local development, environment variables are set with the application service principal's identity. The Azure Identity library reads these environment variables to authenticate the app to the required Azure resources.

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/create-app-registration.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-service-principal.md)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/create-entra-group.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-service-principal.md)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/assign-group-roles.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-service-principal.md)


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


[Include unavailable in this source snapshot: <../includes/implement-service-principal.md>](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-service-principal.md)
