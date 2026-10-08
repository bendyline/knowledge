---
title: ASP.NET Core Blazor environments
author: guardrex
description: Learn about environments in Blazor, including how to set the environment.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/15/2026
uid: blazor/fundamentals/environments
---
# ASP.NET Core Blazor environments

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


This article explains how to configure and read the [environment](../../fundamentals/environments.md) in a Blazor app.

When running an app locally, the environment defaults to `Development`. When the app is published, the environment defaults to `Production`.
                
We recommend the following conventions:

* Always use the "`Development`" environment name for local development. This is because the ASP.NET Core framework expects exactly that name when configuring the app and tooling for local development runs of an app.

* For testing, staging, and production environments, always publish and deploy the app. You can use any environment naming scheme that you wish for published apps, but always use app setting file names with casing of the environment segment that exactly matches the environment name. For staging, use "`Staging`" (capital "S") as the environment name, and name the app settings file to match (`appsettings.Staging.json`). For production, use "`Production`" (capital "P") as the environment name, and name the app settings file to match (`appsettings.Production.json`).

## Set the environment

The environment is set using any of the following approaches:

**Applies to: \>= aspnetcore-10.0**

* Blazor Web App or Blazor Server: Use any of the approaches described in [fundamentals/environments](../../fundamentals/environments.md) for general ASP.NET Core apps.
* Any Blazor app: [Blazor start configuration](#set-the-client-side-environment-via-blazor-startup-configuration)
* Standalone Blazor WebAssembly: `<WasmApplicationEnvironmentName>` property

On the client for a Blazor Web App, the environment is determined from the server via an HTML comment that developers don't interact with:

```html
<!--Blazor-WebAssembly:{"environmentName":"Development", ...}-->
```

For a standalone Blazor WebAssembly app, set the environment with the `<WasmApplicationEnvironmentName>` MSBuild property in the app's project file (`.csproj`). The following example sets the `Staging` environment:

```xml
<WasmApplicationEnvironmentName>Staging</WasmApplicationEnvironmentName>
```

The default environments are `Development` for build and `Production` for publish.

There are several approaches for setting the environment in a standalone Blazor WebAssembly app during build/publish operations and one approach for an app starting or running on the client:

* Set the property value when `dotnet build` or `dotnet publish` is executed. The following example sets the environment to `Staging` when an app is published:

  ```dotnetcli
  dotnet publish -p:WasmApplicationEnvironmentName=Staging
  ```

* Set the property during build or publish based on the app's configuration in Visual Studio. The following property groups can be used in the app's project file or any publish configuration file (`.pubxml`). Add additional property groups for other build configurations in use.

  ```xml
  <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <WasmApplicationEnvironmentName>Development</WasmApplicationEnvironmentName>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)' == 'Release'">
    <WasmApplicationEnvironmentName>Production</WasmApplicationEnvironmentName>
  </PropertyGroup>
  ```

* The environment can be set based on the use of a publish profile. In the following example, the first condition sets the environment to `Development` when no publish profile is used (applies to both build and publish operations without a profile), while the second condition covers setting the environment to `Production` when any publish profile is used:

  ```xml
  <PropertyGroup Condition="'$(PublishProfile)' == ''">
    <WasmApplicationEnvironmentName>Development</WasmApplicationEnvironmentName>
  </PropertyGroup>

  <PropertyGroup Condition="'$(PublishProfile)' != ''">
    <WasmApplicationEnvironmentName>Production</WasmApplicationEnvironmentName>
  </PropertyGroup>
  ```

* Create a custom server-side web API endpoint. The standalone Blazor WebAssembly app requests its environment from the web API either at app startup or on-demand while it's running. The value should be passed to [`WebAssemblyStartOptions`](https://github.com/dotnet/aspnetcore/blob/main/src/Components/Web.JS/src/Platform/WebAssemblyStartOptions.ts#L7) or with [`withApplicationEnvironment`](https://github.com/dotnet/aspnetcore/blob/main/src/Components/dotnet-runtime-js/dotnet.d.ts#L110).

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).




**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

* Blazor Web App or Blazor Server: Use any of the approaches described in [fundamentals/environments](../../fundamentals/environments.md) for general ASP.NET Core apps.
* Any Blazor app:
  * [Blazor start configuration](#set-the-client-side-environment-via-blazor-startup-configuration)
  * [Azure App Service](#set-the-environment-for-azure-app-service)
* Blazor WebAssembly: [`Blazor-Environment` header](#set-the-client-side-environment-via-header)

On the client for a Blazor Web App, the environment is determined from the server via a middleware that communicates the environment to the browser via a header named `Blazor-Environment`. The header sets the environment when the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost) is created in the client-side `Program` file ([Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault%252A)).

For a standalone Blazor WebAssembly app running locally, the development server adds the `Blazor-Environment` header with the environment name obtained from the hosting environment. The hosting environment sets the environment from the `ASPNETCORE_ENVIRONMENT` environment variable established by the project's `Properties/launchSettings.json` file. The default value of the environment variable in a project created from the Blazor WebAssembly project template is `Development`. For more information, see the [Set the client-side environment via header](#set-the-client-side-environment-via-header) section.



**Applies to: < aspnetcore-8.0**

* Blazor Server: Use any of the approaches described in [fundamentals/environments](../../fundamentals/environments.md) for general ASP.NET Core apps.
* Blazor Server or Blazor WebAssembly:
  * [Blazor start configuration](#set-the-client-side-environment-via-blazor-startup-configuration)
  * [Azure App Service](#set-the-environment-for-azure-app-service)
* Blazor WebAssembly: [`Blazor-Environment` header](#set-the-client-side-environment-via-header)

On the client of a hosted Blazor WebAssembly app, the environment is determined from the server via a middleware that communicates the environment to the browser via a header named `Blazor-Environment`. The header sets the environment when the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost) is created in the client-side `Program` file ([Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault%252A)).

For a standalone Blazor WebAssembly app running locally, the development server adds the `Blazor-Environment` header with the environment name obtained from the hosting environment. The hosting environment sets the environment from the `ASPNETCORE_ENVIRONMENT` environment variable established by the project's `Properties/launchSettings.json` file. The default value of the environment variable in a project created from the Blazor WebAssembly project template is `Development`. For more information, see the [Set the client-side environment via header](#set-the-client-side-environment-via-header) section.



> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


For app's running locally in development, the app defaults to the `Development` environment. Publishing the app defaults the environment to `Production`.

For general guidance on ASP.NET Core environments, see [fundamentals/environments](../../fundamentals/environments.md). For server-side app configuration to serve static files in environments other than the [Microsoft.Extensions.Hosting.Environments.Development](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Environments.Development) environment during local development and testing (for example, [Microsoft.Extensions.Hosting.Environments.Staging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Environments.Staging)), see [fundamentals/static-files#static-files-in-non-development-environments](https://learn.microsoft.com/search/?terms=fundamentals%2Fstatic-files%23static-files-in-non-development-environments).

## Set the client-side environment via Blazor startup configuration

The following example starts Blazor in the `Staging` environment if the hostname includes `localhost`. Otherwise, the environment is set to its default value.

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  if (window.location.hostname.includes("localhost")) {
    Blazor.start({
      webAssembly: {
        environment: "Staging"
      }
    });
  } else {
    Blazor.start();
  }
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).

> **Note:**
> For Blazor Web Apps that set the `webAssembly` > `environment` property in `Blazor.start` configuration, it's wise to match the server-side environment to the environment set on the `environment` property. Otherwise, prerendering on the server operates under a different environment than rendering on the client, which results in arbitrary effects. For general guidance on setting the environment for a Blazor Web App, see [fundamentals/environments](../../fundamentals/environments.md).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Standalone Blazor WebAssembly:



**Applies to: < aspnetcore-11.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  if (window.location.hostname.includes("localhost")) {
    Blazor.start({
      environment: "Staging"
    });
  } else {
    Blazor.start();
  }
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



**Applies to: < aspnetcore-10.0**

Using the `environment` property overrides the environment set by the [`Blazor-Environment` header](#set-the-client-side-environment-via-header).

The preceding approach sets the client's environment without changing the `Blazor-Environment` header's value, nor does it change the server project's console logging of the startup environment for a Blazor Web App that has adopted global Interactive WebAssembly rendering.



To log the environment to the console in either a standalone Blazor WebAssembly app (all release versions) or the `.Client` project of a Blazor Web App (.NET 8 or later), place the following C# code in the `Program` file after the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost) is created with [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault%252A) and before the line that builds and runs the project (`await builder.Build().RunAsync();`):

```csharp
Console.WriteLine(
    $"Client Hosting Environment: {builder.HostEnvironment.Environment}");
```

For more information on Blazor startup, see [blazor/fundamentals/startup](startup.md).

**Applies to: < aspnetcore-10.0**

## Set the client-side environment via header

Blazor WebAssembly apps can set the environment with the `Blazor-Environment` header. Specifically, the response header must be set on the `_framework/blazor.boot.json` file, but there's no harm setting the header on file server responses for other Blazor file requests or the entire Blazor deployment.

Although the Blazor framework issues the header name in kebab case with mixed letter case (`Blazor-Environment`), you're welcome to use all-lower or all-upper kebab case (`blazor-environment`, `BLAZOR-ENVIRONMENT`).

For local development runs with Blazor's built-in development server, you can control the value of the `Blazor-Environment` header by setting the value of the `ASPNETCORE_ENVIRONMENT` environment variable in the project's `Properties/launchSettings.json` file. When running locally with the development server, the order of precedence for determining the app's environment is [`Blazor.start` configuration (`environment` key)](#set-the-client-side-environment-via-blazor-startup-configuration) > `Blazor-Environment` response header (`blazor.boot.json` file) > `ASPNETCORE_ENVIRONMENT` environment variable (`launchSettings.json`). You can't use the `ASPNETCORE_ENVIRONMENT` environment variable (`launchSettings.json`) approach for a deployed Blazor WebAssembly app. The technique only works with the development server on local runs of the app.

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


### IIS

In the following example for IIS, the custom header (`Blazor-Environment`) is added to the published `web.config` file. The `web.config` file is located in the `bin/Release/{TARGET FRAMEWORK}/publish` folder, where the `{TARGET FRAMEWORK}` placeholder is the target framework:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    ...
    <httpProtocol>
      <customHeaders>
        <add name="Blazor-Environment" value="Staging" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

> **Note:**
> To use a custom `web.config` file for IIS that isn't overwritten when the app is published to the `publish` folder, see [blazor/host-and-deploy/webassembly/iis#use-of-a-custom-webconfig](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fwebassembly%2Fiis%23use-of-a-custom-webconfig).

### Nginx

For Nginx servers, use the `add_header` directive from the `ngx_http_headers_module`:

```
http {
    server {
        ...
        location / {
            ...
            add_header Blazor-Environment "Staging";
        }
    }
}
```

For more information, see the following resources:

* [Nginx documentation](http://nginx.org/docs/http/ngx_http_headers_module.html)
* [blazor/host-and-deploy/webassembly/nginx](../host-and-deploy/webassembly/nginx.md)

### Apache

For Apache servers, use the `Header` directive from the `mod_headers` module:

```
<VirtualHost *:80>
    ...
    Header set Blazor-Environment "Staging"
    ...
</VirtualHost>
```

For more information, see the following resources:

* [Apache documentation (search the latest release for "`mod_headers`")](https://httpd.apache.org/docs/)
* [blazor/host-and-deploy/webassembly/apache](../host-and-deploy/webassembly/apache.md)

### Set the environment for Azure App Service

For a standalone Blazor WebAssembly app, you can set the environment manually via [start configuration](#set-the-client-side-environment-via-blazor-startup-configuration) or the [`Blazor-Environment` header](#set-the-client-side-environment-via-header).

For a server-side app, set the environment via an `ASPNETCORE_ENVIRONMENT` app setting in Azure:

1. ***Confirm that the casing of environment segments in app settings file names match their environment name casing exactly***. For example, the matching app settings file name for the `Staging` environment is `appsettings.Staging.json`. If the file name is `appsettings.staging.json` (lowercase "`s`"), the file isn't located, and the settings in the file aren't used in the `Staging` environment.

1. For Visual Studio deployment, confirm that the app is deployed to the correct deployment slot. For an app named `BlazorAzureAppSample`, the app is deployed to the `Staging` deployment slot.

1. In the Azure portal for the environment's deployment slot, set the environment with the `ASPNETCORE_ENVIRONMENT` app setting. For an app named `BlazorAzureAppSample`, the staging App Service Slot is named `BlazorAzureAppSample/Staging`. For the `Staging` slot's configuration, create an app setting for `ASPNETCORE_ENVIRONMENT` with a value of `Staging`. **Deployment slot setting** is enabled for the setting.

When requested in a browser, the `BlazorAzureAppSample/Staging` app loads in the `Staging` environment at `https://blazorazureappsample-staging.azurewebsites.net`.

When the app is loaded in the browser, the response header collection for `blazor.boot.json` indicates that the `Blazor-Environment` header value is `Staging`.

App settings from the `appsettings.{ENVIRONMENT}.json` file are loaded by the app, where the `{ENVIRONMENT}` placeholder is the app's environment. In the preceding example, settings from the `appsettings.Staging.json` file are loaded.



**Applies to: \>= aspnetcore-11.0**

## `EnvironmentView` component

<!-- UPDATE 11.0 - API Browser cross-links -->

Use the `EnvironmentView` component for conditional rendering based on the hosting environment. This component provides a consistent way to render content based on the current environment across both server-side and client-side hosting models.

The `EnvironmentView` component accepts `Include` and `Exclude` parameters for specifying environment names. The component performs case-insensitive matching.

```razor
@using Microsoft.AspNetCore.Components.Web

<EnvironmentView Include="Development">
    <div class="alert alert-warning">
        Debug mode enabled
    </div>
</EnvironmentView>

<EnvironmentView Include="Development,Staging">
    <p>Pre-production environment</p>
</EnvironmentView>

<EnvironmentView Exclude="Production">
    <p>@DateTime.Now</p>
</EnvironmentView>
```



## Read the environment in a Blazor WebAssembly app

Obtain the app's environment in a component by injecting [Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment) and reading the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.Environment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.Environment) property.

`ReadEnvironment.razor`:

```razor
@page "/read-environment"
@using Microsoft.AspNetCore.Components.WebAssembly.Hosting
@inject IWebAssemblyHostEnvironment Env

<h1>Environment example</h1>

<p>Environment: @Env.Environment</p>
```

**Applies to: \>= aspnetcore-8.0**

## Read the environment client-side in a Blazor Web App

Assuming that prerendering isn't disabled for a component or the app, a component in the `.Client` project is prerendered on the server. Because the server doesn't have a registered [Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment) service, it isn't possible to inject the service and use the service implementation's host environment extension methods and properties during server prerendering. Injecting the service into an Interactive WebAssembly or Interactive Auto component results in the following runtime error:

> There is no registered service of type 'Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment'.

To address this, create a custom service implementation for [Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment) on the server. For more information and an example implementation, see the [Custom service implementation on the server](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fprerender%23custom-service-implementation-on-the-server) section of the *Prerendering* article, which appears later in the Blazor documentation.



## Read the client-side environment during startup

During startup, the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder) exposes the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment) through the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.HostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.HostEnvironment) property, which enables environment-specific logic in host builder code.

In the `Program` file:

```csharp
if (builder.HostEnvironment.Environment == "Custom")
{
    ...
};
```

The following convenience extension methods provided through [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions) permit checking the current environment for `Development`, `Production`, `Staging`, and custom environment names:

* [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsDevelopment%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsDevelopment%252A)
* [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsProduction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsProduction%252A)
* [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsStaging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsStaging%252A)
* [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsEnvironment%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsEnvironment%252A)

In the `Program` file:

```csharp
if (builder.HostEnvironment.IsStaging())
{
    ...
};

if (builder.HostEnvironment.IsEnvironment("Custom"))
{
    ...
};
```

The [Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress) property can be used during startup when the [Microsoft.AspNetCore.Components.NavigationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager) service isn't available.

## Additional resources

* [blazor/fundamentals/startup](startup.md)
* [fundamentals/environments](../../fundamentals/environments.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))
