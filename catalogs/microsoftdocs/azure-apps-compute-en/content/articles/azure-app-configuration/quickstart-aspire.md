---
title: Quickstart for Azure App Configuration with Aspire
description: Create an Aspire solution with Azure App Configuration to centralize storage and management of application settings.
services: azure-app-configuration
author: zhiyuanliang-ms
ms.service: azure-app-configuration
ms.devlang: csharp
ms.custom: devx-track-csharp, mode-other
ms.topic: quickstart
ms.date: 09/04/2026
zone_pivot_groups: appconfig-aspire
ms.author: zhiyuanliang
#Customer intent: As an Aspire developer, I want to learn the centralized configuration cloud-native solution for Aspire.
---

# Quickstart: Create an Aspire solution with Azure App Configuration

In this quickstart, you use Azure App Configuration to externalize storage and management of your app settings for an [Aspire](https://aspire.dev/get-started/what-is-aspire/) project. You use Azure App Configuration Aspire integration libraries to provision an App Configuration resource and use App Configuration in each distributed app.

## Prerequisites

- An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Set up the development environment](https://aspire.dev/get-started/prerequisites/) for Aspire. A C# AppHost requires the .NET 10 SDK.
- [Install the Aspire CLI](https://aspire.dev/get-started/install-cli/).
- [Create a new Aspire solution](https://aspire.dev/get-started/first-app/?lang=csharp) using the Aspire Starter template.
- For the emulator steps, an OCI-compliant container runtime such as [Docker Desktop](https://www.docker.com/products/docker-desktop).

## Test the app locally

The Aspire Starter template includes a frontend web app that communicates with a Minimal API project. The API project provides fake weather data to the frontend. The frontend app uses service discovery to connect to the API project. An [AppHost](https://aspire.dev/get-started/app-host/) orchestrates all resources in the Aspire solution.

1. From the solution root, run the AppHost:

    ```bash
    aspire run
    ```

    You see the Aspire dashboard in your browser.

    Screenshot of the Aspire dashboard with web frontend and API service resources.

1. Click the URL of the web frontend. You see a page with a welcome message.

    Screenshot of a web app with a welcome message.

**Applies to: azure**


## Add Azure App Configuration to the Aspire solution

1. Go to the AppHost directory. Run the following command to add the [`Aspire.Hosting.Azure.AppConfiguration`](https://www.nuget.org/packages/Aspire.Hosting.Azure.AppConfiguration) NuGet package.

    ```bash
    aspire add Aspire.Hosting.Azure.AppConfiguration
    ```

    For more information, see [`aspire add`](https://aspire.dev/reference/cli/commands/aspire-add/) and [Azure App Configuration Hosting integration](https://aspire.dev/integrations/cloud/azure/azure-app-configuration/azure-app-configuration-host/).

1. Open the *AppHost.cs* file and add the following code.

    ```csharp
    var builder = DistributedApplication.CreateBuilder(args);

    // Add an Azure App Configuration resource
    var appConfiguration = builder.AddAzureAppConfiguration("appconfiguration");
    ```

    > **Important:**
    > When you call `AddAzureAppConfiguration`, you instruct the app to generate Azure resources dynamically during app startup. The app must configure the appropriate subscription and location. For more information, see [Local Azure provisioning](https://aspire.dev/integrations/cloud/azure/local-provisioning/#configuration).
    > If you are using the latest Aspire SDK, you can configure the subscription information through the Aspire dashboard.
    > Screenshot of the Aspire dashboard Change Azure context dialog.

    > **Note:**
    > You must have either the **Owner** or **User Access Administrator** role assigned on the Azure subscription. These roles are required to create role assignments as part of the provisioning process.

    > **Tip:**
    > Reference an existing App Configuration store by passing its name and resource group as parameters to `AsExisting()`:
    >
    > ```csharp
    > var storeName = builder.AddParameter("appConfigurationName");
    > var resourceGroup = builder.AddParameter("appConfigurationResourceGroup");
    >
    > var appConfiguration = builder.AddAzureAppConfiguration("appconfiguration")
    >     .AsExisting(storeName, resourceGroup);
    > ```
    >
    > For more information, see [Use existing Azure resources](https://aspire.dev/integrations/cloud/azure/overview/#use-existing-azure-resources).

1. Add the reference of App Configuration resource and configure the `webfrontend` project to wait for it.

    ```csharp
    builder.AddProject<Projects.AspireApp_Web>("webfrontend")
        .WithExternalHttpEndpoints()
        .WithHttpHealthCheck("/health")
        .WithReference(apiService)
        .WaitFor(apiService)
        .WithReference(appConfiguration) // reference the App Configuration resource
        .WaitFor(appConfiguration); // wait for the App Configuration resource to enter the Running state before starting the resource
    ```

1. From the solution root, run `aspire run`. You see the Azure App Configuration resource being provisioned.

    Screenshot of Aspire dashboard provisioning Azure App Configuration resource.

1. Wait for a few minutes and you see the Azure App Configuration resource is provisioned and is running.

    Screenshot of Aspire dashboard with Azure App Configuration resource running.

1. Go to the Azure portal by clicking the deployment URL on the Aspire dashboard. You see the deployment is complete and you can go to your Azure App Configuration resource.

    Screenshot of Azure portal showing the App Configuration deployment is complete.

## Add a key-value

Add the following key-value to your App Configuration store and leave **Label** and **Content Type** with their default values. For more information about how to add key-values to a store using the Azure portal or the CLI, go to [Create a key-value](quickstart-azure-app-configuration-create.md#create-a-key-value).

| Key | Value |
| --- | --- |
| *TestApp:Settings:Message* | *Hello from Azure App Configuration!* |



**Applies to: emulator**


## Add Azure App Configuration to the Aspire solution

1. Go to the **AppHost** directory. Run the following command to add the [`Aspire.Hosting.Azure.AppConfiguration`](https://www.nuget.org/packages/Aspire.Hosting.Azure.AppConfiguration) NuGet package.

    ```bash
    aspire add Aspire.Hosting.Azure.AppConfiguration
    ```

    For more information, see [`aspire add`](https://aspire.dev/reference/cli/commands/aspire-add/) and [Azure App Configuration Hosting integration](https://aspire.dev/integrations/cloud/azure/azure-app-configuration/azure-app-configuration-host/).

1. Open the *AppHost.cs* file and add the following code.

    ```csharp
    var builder = DistributedApplication.CreateBuilder(args);

    // Add an Azure App Configuration resource
    var appConfiguration = builder.AddAzureAppConfiguration("appconfiguration")
        .RunAsEmulator(emulator => { // use the App Configuration emulator
            emulator.WithDataBindMount();
        });
    ```

    > **Important:**
    > When you call `RunAsEmulator`, it pulls the [App Configuration emulator image](https://mcr.microsoft.com/artifact/mar/azure-app-configuration/app-configuration-emulator/about) and runs a container as the App Configuration resource. Make sure that you have an OCI compliant container runtime on your machine. For more information, go to [Aspire Container Runtime](https://aspire.dev/get-started/prerequisites/#install-an-oci-compliant-container-runtime).

    > **Tip:**
    > You can call `WithDataBindMount` or `WithDataVolume` to configure the emulator resource for persistent container storage so that you don't need to recreate key values each time.

1. Add the reference of App Configuration resource and configure the `webfrontend` project to wait for it.

    ```csharp
    builder.AddProject<Projects.AspireApp_Web>("webfrontend")
        .WithExternalHttpEndpoints()
        .WithHttpHealthCheck("/health")
        .WithReference(apiService)
        .WaitFor(apiService)
        .WithReference(appConfiguration) // reference the App Configuration resource
        .WaitFor(appConfiguration); // wait for the App Configuration resource to enter the Running state before starting the resource
    ```

1. Start your container runtime. In this tutorial, we use Docker Desktop.

1. From the solution root, run `aspire run`. Go to the Aspire dashboard. You see the App Configuration emulator resource is running.

    Screenshot of the Aspire dashboard showing the App Configuration emulator resource.

   A container is started to run the App Configuration emulator.

   Screenshot of the docker desktop running a container.

## Add a key-value

1. Click the URL of the `appconfiguration` resource. You see the App Configuration emulator UI.

1. Click the `Create` button on the upper-right corner.

    Screenshot of the App Configuration emulator UI.

1. Add the following key-value.

    | Key | Value |
    | --- | --- |
    | *TestApp:Settings:Message* | *Hello from Azure App Configuration!* |

1. Click the `Save` button.

    Screenshot of the App Configuration emulator UI of creating a new key value.



## Use App Configuration in the web application

1. Go to the `Web` project's directory. Run the following command to add the [`Aspire.Microsoft.Extensions.Configuration.AzureAppConfiguration`](https://www.nuget.org/packages/Aspire.Microsoft.Extensions.Configuration.AzureAppConfiguration) NuGet package.

    ```dotnetcli
    dotnet add package Aspire.Microsoft.Extensions.Configuration.AzureAppConfiguration
    ```

1. Open the *Program.cs* file and add the following code.

    ```csharp
    var builder = WebApplication.CreateBuilder(args);

    // Use Azure App Configuration
    builder.AddAzureAppConfiguration("appconfiguration"); // use the resource name defined in the AppHost project
    ```

1. Open the *Components/Pages/Home.razor* file and update it with the following code.

    ```cs
    @page "/"

    @inject IConfiguration Configuration

    <PageTitle>Home</PageTitle>

    <h1>Hello, world!</h1>

    @if (!string.IsNullOrWhiteSpace(message))
    {
        <div class="alert alert-info">@message</div>
    }
    else
    {
        <div class="alert alert-info">Welcome to your new app.</div>
    }

    @code {
        private string? message;

        protected override void OnInitialized()
        {
            string? msg = Configuration["TestApp:Settings:Message"];
            message = string.IsNullOrWhiteSpace(msg) ? null : msg;
        }
    }
    ```

1. Stop the current `aspire run` process, run `aspire run` again, and then select the web frontend URL in the Aspire dashboard.

    Screenshot of Aspire dashboard showing resources.

1. You see a page with a welcome message from Azure App Configuration.

    Screenshot of a web app with a welcome message from Azure App Configuration.

For more information about how consuming applications receive and use the App Configuration endpoint, see [Connect to Azure App Configuration](https://aspire.dev/integrations/cloud/azure/azure-app-configuration/azure-app-configuration-connect/).

## Next steps

In this quickstart, you:

* Added an Azure App Configuration resource in an Aspire solution.
* Read your key-values from Azure App Configuration with the App Configuration Aspire integration library.
* Displayed a web page using the settings you configured in your App Configuration.

To learn how to configure your Aspire app to dynamically refresh configuration settings, continue to the next tutorial.

> 
> [Enable dynamic configuration](enable-dynamic-configuration-aspire.md)

To learn how to use feature flags in your Aspire app, continue to the next tutorial.

> 
> [Use feature flags in Aspire](quickstart-feature-flag-aspire.md)

To learn more about the Azure App Configuration emulator, continue to the following document.

> 
> [Azure App Configuration emulator overview](emulator-overview.md)
