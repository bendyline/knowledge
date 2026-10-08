---
title: ASP.NET Core Blazor configuration
author: guardrex
description: Learn about Blazor app configuration, including app settings, authentication, and logging configuration.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/fundamentals/configuration
---
# ASP.NET Core Blazor configuration

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


This article explains how to configure Blazor apps, including app settings, authentication, and logging configuration.

**Applies to: \>= aspnetcore-8.0**

This guidance applies to client-side project configuration in a Blazor Web App or a standalone Blazor WebAssembly app.

Default behavior in Blazor Web Apps:

* For server-side configuration:
  * See [fundamentals/configuration/index](../../fundamentals/configuration/index.md) for guidance.
  * Only configuration in the project's root app settings files is loaded.
  * The remainder of this article only applies to client-side configuration in the `.Client` project. 
* For client-side configuration (`.Client` project), configuration is loaded from the following app settings files:
  * `wwwroot/appsettings.json`.
  * `wwwroot/appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's [runtime environment](../../fundamentals/environments.md).

In standalone Blazor WebAssembly apps, configuration is loaded from the following app settings files:

* `wwwroot/appsettings.json`.
* `wwwroot/appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's [runtime environment](../../fundamentals/environments.md).



**Applies to: < aspnetcore-8.0**

This guidance applies to the **`Client`** project of a hosted Blazor WebAssembly solution or a Blazor WebAssembly app.

For server-side ASP.NET Core app configuration in the **`Server`** project of a hosted Blazor WebAssembly solution, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

On the client, configuration is loaded from the following app settings files:

* `wwwroot/appsettings.json`.
* `wwwroot/appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's [runtime environment](../../fundamentals/environments.md).



> **Note:**
> Logging configuration placed into an app settings file in `wwwroot` isn't loaded by default. For more information, see the [Logging configuration](#logging-configuration) section later in this article.
>
> In some scenarios, such as with Azure services, it's important to use an environment file name segment that exactly matches the environment name. For example, use the file name `appsettings.Staging.json` with a capital "S" for the `Staging` environment. For recommended conventions, see the opening remarks of [blazor/fundamentals/environments](environments.md).

Other configuration providers registered by the app can also provide configuration, but not all providers or provider features are appropriate:

* [Azure Key Vault configuration provider](../../security/key-vault-configuration.md): The provider isn't supported for managed identity and application ID (client ID) with client secret scenarios. Application ID with a client secret isn't recommended for any ASP.NET Core app, especially client-side apps because the client secret can't be secured client-side to access the Azure Key Vault service.
* [Azure App configuration provider](https://learn.microsoft.com/azure/azure-app-configuration/quickstart-aspnet-core-app): The provider isn't appropriate for a client-side app because the app doesn't run on a server in Azure.

For more information on configuration providers, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

> **Warning:**
> Configuration and settings files in the web root (`wwwroot` folder) are visible to users on the client, and users can tamper with the data. **Don't store app secrets, credentials, or any other sensitive data in any web root file.**

## App settings configuration

Configuration in app settings files are loaded by default. In the following example, a UI configuration value is stored in an app settings file and loaded by the Blazor framework automatically. The value is read by a component.

`wwwroot/appsettings.json`:

```json
{
    "h1FontSize": "50px"
}
```

Inject an [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) instance into a component to access the configuration data.

`ConfigExample.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_WebAssembly/Pages/ConfigExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_WebAssembly/Pages/ConfigExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/configuration/ConfigExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/configuration/ConfigExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/configuration/ConfigExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/configuration/ConfigExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



Client security restrictions prevent direct access to files via user code, including settings files for app configuration. To read configuration files in addition to `appsettings.json`/`appsettings.{ENVIRONMENT}.json` from the `wwwroot` folder into configuration, use an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient).

> **Warning:**
> Configuration and settings files in the web root (`wwwroot` folder) are visible to users on the client, and users can tamper with the data. **Don't store app secrets, credentials, or any other sensitive data in any web root file.**

The following example reads a configuration file (`cars.json`) into the app's configuration.

`wwwroot/cars.json`:

```json
{
    "size": "tiny"
}
```

Add the namespace for [Microsoft.Extensions.Configuration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration) to the `Program` file:

```csharp
using Microsoft.Extensions.Configuration;
```

Modify the existing [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) service registration to use the client to read the file:

```csharp
var http = new HttpClient()
{
    BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
};

builder.Services.AddScoped(sp => http);

using var response = await http.GetAsync("cars.json");
using var stream = await response.Content.ReadAsStreamAsync();

builder.Configuration.AddJsonStream(stream);
```

The preceding example sets the base address with `builder.HostEnvironment.BaseAddress` ([Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%252A)), which gets the base address for the app and is typically derived from the `<base>` tag's `href` value in the host page.

## Memory Configuration Source

The following example uses a [Microsoft.Extensions.Configuration.Memory.MemoryConfigurationSource](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.Memory.MemoryConfigurationSource) in the `Program` file to supply additional configuration.

Add the namespace for [Microsoft.Extensions.Configuration.Memory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.Memory) to the `Program` file:

```csharp
using Microsoft.Extensions.Configuration.Memory;
```

In the `Program` file:

```csharp
var vehicleData = new Dictionary<string, string?>()
{
    { "color", "blue" },
    { "type", "car" },
    { "wheels:count", "3" },
    { "wheels:brand", "Blazin" },
    { "wheels:brand:type", "rally" },
    { "wheels:year", "2008" },
};

var memoryConfig = new MemoryConfigurationSource { InitialData = vehicleData };

builder.Configuration.Add(memoryConfig);
```

Inject an [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) instance into a component to access the configuration data.

`MemoryConfig.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_WebAssembly/Pages/MemoryConfig.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_WebAssembly/Pages/MemoryConfig.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/configuration/MemoryConfig.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/configuration/MemoryConfig.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/configuration/MemoryConfig.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/configuration/MemoryConfig.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/configuration.md)



Obtain a section of the configuration in C# code with [Microsoft.Extensions.Configuration.IConfiguration.GetSection%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration.GetSection%252A). The following example obtains the `wheels` section for the configuration in the preceding example:

```razor
@code {
    protected override void OnInitialized()
    {
        var wheelsSection = Configuration.GetSection("wheels");

        ...
    }
}
```

## Authentication configuration

Provide ***public*** authentication configuration in an app settings file.

`wwwroot/appsettings.json`:

```json
{
  "Local": {
    "Authority": "{AUTHORITY}",
    "ClientId": "{CLIENT ID}"
  }
}
```

Load the configuration for an Identity provider with [Microsoft.Extensions.Configuration.ConfigurationBinder.Bind%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.Bind%252A) in the `Program` file. The following example loads configuration for an [OIDC provider](../security/webassembly/standalone-with-authentication-library.md):

```csharp
builder.Services.AddOidcAuthentication(options =>
    builder.Configuration.Bind("Local", options.ProviderOptions));
```

> **Warning:**
> Configuration and settings files in the web root (`wwwroot` folder) are visible to users on the client, and users can tamper with the data. **Don't store app secrets, credentials, or any other sensitive data in any web root file.**

## Logging configuration

*This section applies to apps that configure logging via an app settings file in the `wwwroot` folder.*

Add the [`Microsoft.Extensions.Logging.Configuration` package](https://www.nuget.org/packages/Microsoft.Extensions.Logging.Configuration) to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


In the app settings file, provide logging configuration. The logging configuration is loaded in the `Program` file.

`wwwroot/appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

In the `Program` file:

```csharp
builder.Logging.AddConfiguration(
    builder.Configuration.GetSection("Logging"));
```

## Host builder configuration

Read host builder configuration from [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Configuration](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Configuration) in the `Program` file:

```csharp
var hostname = builder.Configuration["HostName"];
```

## Cached configuration

Configuration files are cached for offline use. With [Progressive Web Applications (PWAs)](../progressive-web-app/index.md), you can only update configuration files when creating a new deployment. Editing configuration files between deployments has no effect because:

* Users have cached versions of the files that they continue to use.
* The PWA's `service-worker.js` and `service-worker-assets.js` files must be rebuilt on compilation, which signal to the app on the user's next online visit that the app has been redeployed.

For more information on how background updates are handled by PWAs, see [blazor/progressive-web-app/index#background-updates](https://learn.microsoft.com/search/?terms=blazor%2Fprogressive-web-app%2Findex%23background-updates).

## Options configuration

[Options configuration](../../fundamentals/configuration/options.md) uses API in the [`Microsoft.Extensions.Options.ConfigurationExtensions`](https://www.nuget.org/packages/Microsoft.Extensions.Options.ConfigurationExtensions) NuGet package.

Example:

`OptionsExample.cs`:

```csharp
public class OptionsExample
{
    public string? Option1 { get; set; }
    public string? Option2 { get; set; }
}
```

In `appsettings.json`:

```json
"OptionsExample": {
  "Option1": "Option1 Value",
  "Option2": "Option2 Value"
}
```

```csharp
builder.Services.Configure<OptionsExample>(
    builder.Configuration.GetSection("OptionsExample"));
```

The following Razor component retrieves the settings with the [`@inject`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23inject) directive or [`[Inject]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.InjectAttribute).

`Options.razor`:

```razor
@page "/options"
@using Microsoft.Extensions.Options
@inject IOptions<OptionsExample>? OptionsExample1

<h1>Options</h1>

<h2>
    &commat;inject approach
</h2>

<ul>
    <li>@OptionsExample1?.Value.Option1</li>
    <li>@OptionsExample1?.Value.Option2</li>
</ul>

<h2>
    [Inject] approach
</h2>

<ul>
    <li>@OptionsExample2?.Value.Option1</li>
    <li>@OptionsExample2?.Value.Option2</li>
</ul>

@code {
    [Inject]
    public IOptions<OptionsExample>? OptionsExample2 { get; set; }
}
```

Not all of the ASP.NET Core Options features are supported in Razor components. For example, [Microsoft.Extensions.Options.IOptionsSnapshot%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsSnapshot%25601) and [Microsoft.Extensions.Options.IOptionsMonitor%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%25601) configuration is supported, but recomputing option values for these interfaces isn't supported outside of reloading the app by either requesting the app in a new browser tab or selecting the browser's reload button. Merely calling [`StateHasChanged`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23state-changes-statehaschanged) doesn't update snapshot or monitored option values when the underlying configuration changes.

**Applies to: \>= aspnetcore-11.0**

### Environment variables in Blazor WebAssembly configuration

Blazor WebAssembly applications access environment variables through [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration). This enables runtime configuration without rebuilding the app, making it easier to deploy the same build to different environments.

In the following example, the `API_ENDPOINT` and `ENABLE_FEATURE_X` environment variables are automatically included in configuration:

```csharp
var builder = WebAssemblyHostBuilder.CreateDefault(args);

var apiEndpoint = builder.Configuration["API_ENDPOINT"];
var featureFlag = builder.Configuration["ENABLE_FEATURE_X"];
```

Environment variables are loaded into the configuration system alongside other configuration sources, such as app settings (`appsettings.json`), providing a unified way to access configuration values regardless of their source.
