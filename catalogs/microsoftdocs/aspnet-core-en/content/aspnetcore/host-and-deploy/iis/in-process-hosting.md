---
title: In-process hosting with IIS and ASP.NET Core
author: tdykstra
description: Learn about in-Process hosting with IIS and the ASP.NET Core Module.
monikerRange: '>= aspnetcore-5.0'
ms.author: tdykstra
ms.date: 4/4/2022
uid: host-and-deploy/iis/in-process-hosting
---
# In-process hosting with IIS and ASP.NET Core

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


**Applies to: \>= aspnetcore-6.0**

In-process hosting runs an ASP.NET Core app in the same process as its IIS worker process. In-process hosting provides improved performance over out-of-process hosting because requests aren't proxied over the loopback adapter, a network interface that returns outgoing network traffic back to the same machine.

The following diagram illustrates the relationship between IIS, the ASP.NET Core Module, and an app hosted in-process:

ASP.NET Core Module in the in-process hosting scenario

## Enable in-process hosting

Since ASP.NET Core 3.0, in-process hosting has been enabled by default for all app deployed to IIS.

To explicitly configure an app for in-process hosting, set the value of the `<AspNetCoreHostingModel>` property to `InProcess` in the project file (`.csproj`):

```xml
<PropertyGroup>
  <AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>
</PropertyGroup>
```

## General architecture

The general flow of a request is as follows:

1. A request arrives from the web to the kernel-mode HTTP.sys driver.
1. The driver routes the native request to IIS on the website's configured port, usually 80 (HTTP) or 443 (HTTPS).
1. The ASP.NET Core Module receives the native request and passes it to IIS HTTP Server (`IISHttpServer`). IIS HTTP Server is an in-process server implementation for IIS that converts the request from native to managed.

After the IIS HTTP Server processes the request:

1. The request is sent to the ASP.NET Core middleware pipeline.
1. The middleware pipeline handles the request and passes it on as an `HttpContext` instance to the app's logic.
1. The app's response is passed back to IIS through IIS HTTP Server.
1. IIS sends the response to the client that initiated the request.

`CreateDefaultBuilder` adds an [Microsoft.AspNetCore.Hosting.Server.IServer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.Server.IServer) instance by calling the [Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%252A) method to boot the [CoreCLR](https://learn.microsoft.com/dotnet/standard/glossary#coreclr) and host the app inside of the IIS worker process (`w3wp.exe` or `iisexpress.exe`). Performance tests indicate that hosting a .NET app in-process delivers significantly higher request throughput compared to hosting the app out-of-process and proxying requests to [Kestrel](../../fundamentals/servers/kestrel.md).

Apps published as a single file executable can't be loaded by the in-process hosting model.

## Application configuration

To configure IIS options, include a service configuration for [Microsoft.AspNetCore.Builder.IISServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IISServerOptions) in `Program.cs`. The following example disables [Microsoft.AspNetCore.Builder.IISServerOptions.AutomaticAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IISServerOptions.AutomaticAuthentication%252A):

[Code example (complete source file; reference: \~/host-and-deploy/iis/in-process-hosting/6.0samples/Program.cs?highlight=17-20)](../../../_code/aspnetcore/host-and-deploy/iis/in-process-hosting/6.0samples/Program.cs.md)

| Option | Default | Setting |
| --- | :---: | --- |
| `AutomaticAuthentication` | `true` | If `true`, IIS Server sets the `HttpContext.User` authenticated by [Windows Authentication](../../security/authentication/windowsauth.md). If `false`, the server only provides an identity for `HttpContext.User` and responds to challenges when explicitly requested by the `AuthenticationScheme`. Windows Authentication must be enabled in IIS for `AutomaticAuthentication` to function. For more information, see [Windows Authentication](../../security/authentication/windowsauth.md). |
| `AuthenticationDisplayName` | `null` | Sets the display name shown to users on login pages. |
| `AllowSynchronousIO` | `false` | Whether synchronous I/O is allowed for the `HttpContext.Request` and the `HttpContext.Response`. |
| `MaxRequestBodySize` | `30000000` | Gets or sets the max request body size for the `HttpRequest`. Note that IIS itself has the limit `maxAllowedContentLength` which will be processed before the `MaxRequestBodySize` set in the `IISServerOptions`. Changing the `MaxRequestBodySize` won't affect the `maxAllowedContentLength`. To increase `maxAllowedContentLength`, add an entry in the `web.config` to set `maxAllowedContentLength` to a higher value. For more details, see [Configuration](https://learn.microsoft.com/iis/configuration/system.webServer/security/requestFiltering/requestLimits/#configuration). |

## Differences between in-process and out-of-process hosting

The following characteristics apply when hosting in-process:

* IIS HTTP Server (`IISHttpServer`) is used instead of [Kestrel](../../fundamentals/servers/kestrel.md) server. For in-process, [`CreateDefaultBuilder`](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23default-builder-settings) calls [Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%252A) to:

  * Register the `IISHttpServer`.
  * Configure the port and base path the server should listen on when running behind the ASP.NET Core Module.
  * Configure the host to capture startup errors.

* The [`requestTimeout` attribute](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Fweb-config%23attributes-of-the-aspnetcore-element) doesn't apply to in-process hosting.

* Sharing an app pool among apps isn't supported. Use one app pool per app.

* The architecture (bitness) of the app and installed runtime (x64 or x86) must match the architecture of the app pool. For example, apps published for 32-bit (x86) must have 32-bit enabled for their IIS Application Pools. For more information, see the [Create the IIS site](https://learn.microsoft.com/search/?terms=tutorials%2Fpublish-to-iis%23create-the-iis-site) section.

* Client disconnects are detected. The [`HttpContext.RequestAborted`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.RequestAborted%252A) cancellation token is cancelled when the client disconnects.

* When hosting in-process, [Microsoft.AspNetCore.Authentication.AuthenticationService.AuthenticateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationService.AuthenticateAsync%252A) isn't called internally to initialize a user. Therefore, an [Microsoft.AspNetCore.Authentication.IClaimsTransformation](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.IClaimsTransformation) implementation used to transform claims after every authentication isn't activated by default. When transforming claims with an [Microsoft.AspNetCore.Authentication.IClaimsTransformation](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.IClaimsTransformation) implementation, call [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) to add authentication services:

[Code example (complete source file; reference: \~/host-and-deploy/iis/in-process-hosting/6.0samples/Program.cs?highlight=22-23)](../../../_code/aspnetcore/host-and-deploy/iis/in-process-hosting/6.0samples/Program.cs.md)
  
* [Web Package (single-file) deployments](https://learn.microsoft.com/aspnet/web-forms/overview/deployment/web-deployment-in-the-enterprise/deploying-web-packages) aren't supported.



**Applies to: \>= aspnetcore-8.0**

<a name="ihsrtf8"></a>

## Get timing information

See [Get detailed timing information with IHttpSysRequestTimingFeature](../../fundamentals/servers/httpsys.md).



**Applies to: \= aspnetcore-5.0**

In-process hosting runs an ASP.NET Core app in the same process as its IIS worker process. In-process hosting provides improved performance over out-of-process hosting because requests aren't proxied over the loopback adapter, a network interface that returns outgoing network traffic back to the same machine.

The following diagram illustrates the relationship between IIS, the ASP.NET Core Module, and an app hosted in-process:

ASP.NET Core Module in the in-process hosting scenario

## Enable in-process hosting

Since ASP.NET Core 3.0, in-process hosting has been enabled by default for all app deployed to IIS.

To explicitly configure an app for in-process hosting, set the value of the `<AspNetCoreHostingModel>` property to `InProcess` in the project file (`.csproj`):

```xml
<PropertyGroup>
  <AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>
</PropertyGroup>
```

## General architecture

The general flow of a request is as follows:

1. A request arrives from the web to the kernel-mode HTTP.sys driver.
1. The driver routes the native request to IIS on the website's configured port, usually 80 (HTTP) or 443 (HTTPS).
1. The ASP.NET Core Module receives the native request and passes it to IIS HTTP Server (`IISHttpServer`). IIS HTTP Server is an in-process server implementation for IIS that converts the request from native to managed.

After the IIS HTTP Server processes the request:

1. The request is sent to the ASP.NET Core middleware pipeline.
1. The middleware pipeline handles the request and passes it on as an `HttpContext` instance to the app's logic.
1. The app's response is passed back to IIS through IIS HTTP Server.
1. IIS sends the response to the client that initiated the request.

`CreateDefaultBuilder` adds an [Microsoft.AspNetCore.Hosting.Server.IServer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.Server.IServer) instance by calling the [Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%252A) method to boot the [CoreCLR](https://learn.microsoft.com/dotnet/standard/glossary#coreclr) and host the app inside of the IIS worker process (`w3wp.exe` or `iisexpress.exe`). Performance tests indicate that hosting a .NET app in-process delivers significantly higher request throughput compared to hosting the app out-of-process and proxying requests to [Kestrel](../../fundamentals/servers/kestrel.md).

Apps published as a single file executable can't be loaded by the in-process hosting model.

## Application configuration

To configure IIS options, include a service configuration for [Microsoft.AspNetCore.Builder.IISServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IISServerOptions) in [Microsoft.AspNetCore.Hosting.IStartup.ConfigureServices%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IStartup.ConfigureServices%252A). The following example disables AutomaticAuthentication:

```csharp
services.Configure<IISServerOptions>(options => 
{
    options.AutomaticAuthentication = false;
});
```

| Option | Default | Setting |
| --- | :---: | --- |
| `AutomaticAuthentication` | `true` | If `true`, IIS Server sets the `HttpContext.User` authenticated by [Windows Authentication](../../security/authentication/windowsauth.md). If `false`, the server only provides an identity for `HttpContext.User` and responds to challenges when explicitly requested by the `AuthenticationScheme`. Windows Authentication must be enabled in IIS for `AutomaticAuthentication` to function. For more information, see [Windows Authentication](../../security/authentication/windowsauth.md). |
| `AuthenticationDisplayName` | `null` | Sets the display name shown to users on login pages. |
| `AllowSynchronousIO` | `false` | Whether synchronous I/O is allowed for the `HttpContext.Request` and the `HttpContext.Response`. |
| `MaxRequestBodySize` | `30000000` | Gets or sets the max request body size for the `HttpRequest`. Note that IIS itself has the limit `maxAllowedContentLength` which will be processed before the `MaxRequestBodySize` set in the `IISServerOptions`. Changing the `MaxRequestBodySize` won't affect the `maxAllowedContentLength`. To increase `maxAllowedContentLength`, add an entry in the `web.config` to set `maxAllowedContentLength` to a higher value. For more details, see [Configuration](https://learn.microsoft.com/iis/configuration/system.webServer/security/requestFiltering/requestLimits/#configuration). |

## Differences between in-process and out-of-process hosting

The following characteristics apply when hosting in-process:

* IIS HTTP Server (`IISHttpServer`) is used instead of [Kestrel](../../fundamentals/servers/kestrel.md) server. For in-process, [`CreateDefaultBuilder`](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23default-builder-settings) calls [Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS%252A) to:

  * Register the `IISHttpServer`.
  * Configure the port and base path the server should listen on when running behind the ASP.NET Core Module.
  * Configure the host to capture startup errors.

* The [`requestTimeout` attribute](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Fweb-config%23attributes-of-the-aspnetcore-element) doesn't apply to in-process hosting.

* Sharing an app pool among apps isn't supported. Use one app pool per app.

* The architecture (bitness) of the app and installed runtime (x64 or x86) must match the architecture of the app pool. For example, apps published for 32-bit (x86) must have 32-bit enabled for their IIS Application Pools. For more information, see the [Create the IIS site](https://learn.microsoft.com/search/?terms=tutorials%2Fpublish-to-iis%23create-the-iis-site) section.

* Client disconnects are detected. The [`HttpContext.RequestAborted`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.RequestAborted%252A) cancellation token is cancelled when the client disconnects.

* When hosting in-process, [Microsoft.AspNetCore.Authentication.AuthenticationService.AuthenticateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationService.AuthenticateAsync%252A) isn't called internally to initialize a user. Therefore, an [Microsoft.AspNetCore.Authentication.IClaimsTransformation](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.IClaimsTransformation) implementation used to transform claims after every authentication isn't activated by default. When transforming claims with an [Microsoft.AspNetCore.Authentication.IClaimsTransformation](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.IClaimsTransformation) implementation, call [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) to add authentication services:

  ```csharp
  public void ConfigureServices(IServiceCollection services)
  {
      services.AddTransient<IClaimsTransformation, ClaimsTransformer>();
      services.AddAuthentication(IISServerDefaults.AuthenticationScheme);
  }

  public void Configure(IApplicationBuilder app)
  {
      app.UseAuthentication();
  }
  ```
  
* [Web Package (single-file) deployments](https://learn.microsoft.com/aspnet/web-forms/overview/deployment/web-deployment-in-the-enterprise/deploying-web-packages) aren't supported.
