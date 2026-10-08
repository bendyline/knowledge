---
title: Quickstart for adding feature flags to ASP.NET Core apps
titleSuffix: Azure App Configuration
description: Learn to implement feature flags in your ASP.NET Core application using feature management and Azure App Configuration. Dynamically manage feature rollouts, conduct A/B testing, and control feature visibility without redeploying the app.
services: azure-app-configuration
author: zhenlan
ms.service: azure-app-configuration
ms.devlang: csharp
ms.custom: devx-track-csharp, mode-other
ms.topic: quickstart
ms.date: 07/15/2026
ms.author: zhenlwa
#Customer intent: As an ASP.NET Core developer, I want to use feature flags to control feature availability quickly and confidently.
---

# Quickstart: Add feature flags to an ASP.NET Core app

In this quickstart, you'll create a feature flag in Azure App Configuration and use it to dynamically control the availability of a new web page in an ASP.NET Core app without restarting or redeploying it.

The feature management support extends the dynamic configuration feature in App Configuration. The example in this quickstart builds on the ASP.NET Core app introduced in the dynamic configuration tutorial. Before you continue, finish the [quickstart](quickstart-aspnet-core-app.md), and the [tutorial](enable-dynamic-configuration-aspnet-core.md) to create an ASP.NET Core app with dynamic configuration first.

## Prerequisites

Follow the documents to create an ASP.NET Core app with dynamic configuration.

- [Quickstart: Create an ASP.NET Core app with App Configuration](quickstart-aspnet-core-app.md)
- [Tutorial: Use dynamic configuration in an ASP.NET Core app](enable-dynamic-configuration-aspnet-core.md)

## Create a feature flag

Add a feature flag called *Beta* to the App Configuration store (created in the [Prerequisites](quickstart-feature-flag-aspnet-core.md#prerequisites) steps), and leave **Label** and **Description** with their default values. For more information about how to add feature flags to a store using the Azure portal or the CLI, go to [Create a feature flag](manage-feature-flags.md#create-a-feature-flag).

> 
> Enable feature flag named Beta

## Use a feature flag

1. Navigate into the project's directory (created in the [Prerequisites](quickstart-feature-flag-aspnet-core.md#prerequisites) steps), and run the following command to add a reference to the [Microsoft.FeatureManagement.AspNetCore](https://www.nuget.org/packages/Microsoft.FeatureManagement.AspNetCore) NuGet package.

    ```dotnetcli
    dotnet add package Microsoft.FeatureManagement.AspNetCore
    ```

1. Open *Program.cs*, and add a call to the `UseFeatureFlags` method inside the `AddAzureAppConfiguration` call. You can connect to App Configuration using either Microsoft Entra ID (recommended) or a connection string. The following code snippet demonstrates using Microsoft Entra ID.

    ```csharp
    using Microsoft.Extensions.Configuration.AzureAppConfiguration;

    // Load configuration from Azure App Configuration
    builder.Configuration.AddAzureAppConfiguration(options =>
    {
        options.Connect(new Uri(endpoint), new DefaultAzureCredential())
                // Load all keys that start with `TestApp:` and have no label
                .Select("TestApp:*", LabelFilter.Null)
                // Configure to reload configuration if the registered sentinel key is modified
                .ConfigureRefresh(refreshOptions =>
                    refreshOptions.Register("TestApp:Settings:Sentinel", refreshAll: true));
        // Load all feature flags with no label
        options.UseFeatureFlags();
    });
    ```

    > **Tip:**
    > When no parameter is passed to the `UseFeatureFlags` method, it loads *all* feature flags with *no label* in your App Configuration store. The default refresh interval of feature flags is 30 seconds. You can customize this behavior via the `FeatureFlagOptions` parameter. For example, the following code snippet loads only feature flags that start with *TestApp:* in their *key name* and have the label *dev*. The code also changes the refresh interval time to 5 minutes. Note that this refresh interval time is separate from that for regular key-values.
    >
    > ```csharp
    > options.UseFeatureFlags(featureFlagOptions =>
    > {
    >     featureFlagOptions.Select("TestApp:*", "dev");
    >     featureFlagOptions.CacheExpirationInterval = TimeSpan.FromMinutes(5);
    > });
    > ```

1. Add feature management to the service collection of your app by calling `AddFeatureManagement`.

    Update *Program.cs* with the following code. 

    ```csharp
    // Existing code in Program.cs
    // ... ...

    builder.Services.AddRazorPages();

    // Add Azure App Configuration middleware to the container of services.
    builder.Services.AddAzureAppConfiguration();

    // Add feature management to the container of services.
    builder.Services.AddFeatureManagement();

    // Bind configuration "TestApp:Settings" section to the Settings object
    builder.Services.Configure<Settings>(builder.Configuration.GetSection("TestApp:Settings"));

    var app = builder.Build();

    // The rest of existing code in program.cs
    // ... ...
    ```

    Add `using Microsoft.FeatureManagement;` at the top of the file if it's not present.

    > **Note:**
    > For Blazor applications, see [instructions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/faq.yml#how-to-enable-feature-management-in-blazor-applications-or-as-scoped-services-in--net-applications) for enabling feature management as scoped services.

1. Add a new empty Razor page named **Beta** under the *Pages* directory. It includes two files *Beta.cshtml* and *Beta.cshtml.cs*.

    Open *Beta.cshtml*, and update it with the following markup:

    ```cshtml
    @page
    @model TestAppConfig.Pages.BetaModel
    @{
        ViewData["Title"] = "Beta Page";
    }

    <h1>This is the beta website.</h1>
    ```

    Open *Beta.cshtml.cs*, and add `FeatureGate` attribute to the `BetaModel` class. The `FeatureGate` attribute ensures the **Beta** page is accessible only when the *Beta* feature flag is enabled. If the *Beta* feature flag isn't enabled, the page will return 404 Not Found.

    ```csharp
    using Microsoft.AspNetCore.Mvc.RazorPages;
    using Microsoft.FeatureManagement.Mvc;

    namespace TestAppConfig.Pages
    {
        [FeatureGate("Beta")]
        public class BetaModel : PageModel
        {
            public void OnGet()
            {
            }
        }
    }   
    ```

1. Open *Pages/_ViewImports.cshtml*, and register the feature manager Tag Helper using an `@addTagHelper` directive.

    ```cshtml
    @addTagHelper *, Microsoft.FeatureManagement.AspNetCore
    ```

    The preceding code allows the `<feature>` Tag Helper to be used in the project's *.cshtml* files.

1. Open *_Layout.cshtml* in the *Pages/Shared* directory. Insert a new `<feature>` tag in between the *Home* and *Privacy* navbar items, as shown in the highlighted lines below.

    [language="html" source="../../includes/azure-app-configuration-navbar.md" range="15-38" highlight="13-17"::: (complete source file; reference: ../../includes/azure-app-configuration-navbar.md)](../../includes/azure-app-configuration-navbar.md)

    The `<feature>` tag ensures the **Beta** menu item is shown only when the *Beta* feature flag is enabled.

## Build and run the app locally

1. To build the app by using the .NET Core CLI, run the following command in the command shell:

    ```dotnetcli
    dotnet build
    ```

1. After the build successfully completes, run the following command to run the web app locally:

    ```dotnetcli
    dotnet run
    ```
1. Open a browser window, and go to the URL shown in the `dotnet run` output. Your browser should display a page similar to the image below.

    Feature flag before enabled


1. Sign in to the [Azure portal](https://portal.azure.com). Select **All resources**, and select the App Configuration store that you created previously. 

1. Select **Feature manager** and locate the *Beta* feature flag. Enable the flag by selecting the checkbox under **Enabled**.

1. Refresh the browser a few times. When the refresh interval time window passes, the page will show with updated content.

    Feature flag after enabled

1. Select the **Beta** menu. It will bring you to the beta website that you enabled dynamically.

    Feature flag beta page

## Clean up resources


If you don't want to continue using the resources created in this article, delete the resource group you created here to avoid charges.

> **Important:**
> Deleting a resource group is irreversible. The resource group and all the resources in it are permanently deleted. Ensure that you don't accidentally delete the wrong resource group or resources. If you created the resources for this article inside a resource group that contains other resources you want to keep, delete each resource individually from its respective pane instead of deleting the resource group.

1. Sign in to the [Azure portal](https://portal.azure.com), and select **Resource groups**.
1. In the **Filter by name** box, enter the name of your resource group.
1. In the result list, select the resource group name to see an overview.
1. Select **Delete resource group**.
1. You're asked to confirm the deletion of the resource group. Enter the name of your resource group to confirm, and select **Delete**.

After a few moments, the resource group and all its resources are deleted.


## Next steps

In this quickstart, you added feature management capability to an ASP.NET Core app on top of dynamic configuration. The [Microsoft.FeatureManagement.AspNetCore](https://www.nuget.org/packages/Microsoft.FeatureManagement.AspNetCore) library offers rich integration for ASP.NET Core apps, including feature management in MVC controller actions, razor pages, views, routes, and middleware. For the full feature rundown of the .NET feature management library, continue to the following document.

> 
> [.NET Feature Management](feature-management-dotnet-reference.md)

While a feature flag allows you to activate or deactivate functionality in your app, you may want to customize a feature flag based on your app's logic. Feature filters allow you to enable a feature flag conditionally. For more information, continue to the following tutorial.

> 
> [Enable conditional features with feature filters](howto-feature-filters.md)

Azure App Configuration offers built-in feature filters that enable you to activate a feature flag only during a specific period or to a particular targeted audience of your app. For more information, continue to the following tutorial.

> 
> [Enable features on a schedule](howto-timewindow-filter.md)

> 
> [Roll out features to targeted audiences](howto-targetingfilter.md)

To enable feature management capability for other types of apps, continue to the following tutorials.

> 
> [Use feature flags in .NET/.NET Framework console apps](quickstart-feature-flag-dotnet.md)

> 
> [Use feature flags in .NET background services](quickstart-feature-flag-dotnet-background-service.md)

> 
> [Use feature flags in Azure Functions](quickstart-feature-flag-azure-functions-csharp.md)

To learn more about managing feature flags in Azure App Configuration, continue to the following tutorial.

> 
> [Manage feature flags in Azure App Configuration](manage-feature-flags.md)
