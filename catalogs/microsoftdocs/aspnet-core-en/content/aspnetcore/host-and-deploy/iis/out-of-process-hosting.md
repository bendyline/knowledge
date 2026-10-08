---
title: Out-of-process hosting with IIS and ASP.NET Core
author: tdykstra
description: Learn about out-of-process Hosting with IIS and the ASP.NET Core Module.
monikerRange: '>= aspnetcore-5.0'
ms.author: tdykstra
ms.date: 02/07/2020
uid: host-and-deploy/iis/out-of-process-hosting
---
# Out-of-process hosting with IIS and ASP.NET Core 

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


Because ASP.NET Core apps run in a process separate from the IIS worker process, the ASP.NET Core Module handles process management. The module starts the process for the ASP.NET Core app when the first request arrives and restarts the app if it shuts down or crashes. This is essentially the same behavior as seen with apps that run in-process that are managed by the [Windows Process Activation Service (WAS)](https://learn.microsoft.com/iis/manage/provisioning-and-managing-iis/features-of-the-windows-process-activation-service-was).

The following diagram illustrates the relationship between IIS, the ASP.NET Core Module, and an app hosted out-of-process:

ASP.NET Core Module in the out-of-process hosting scenario

1. Requests arrive from the web to the kernel-mode HTTP.sys driver.
1. The driver routes the requests to IIS on the website's configured port. The configured port is usually 80 (HTTP) or 443 (HTTPS).
1. The module forwards the requests to Kestrel on a random port for the app. The random port isn't 80 or 443.

<!-- make this a bullet list -->
The ASP.NET Core Module specifies the port via an environment variable at startup. The [Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIISIntegration%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIISIntegration%252A) extension configures the server to listen on `http://localhost:{PORT}`. Additional checks are performed, and requests that don't originate from the module are rejected. The module doesn't support HTTPS forwarding. Requests are forwarded over HTTP even if received by IIS over HTTPS.

After Kestrel picks up the request from the module, the request is forwarded into the ASP.NET Core middleware pipeline. The middleware pipeline handles the request and passes it on as an `HttpContext` instance to the app's logic. Middleware added by IIS Integration updates the scheme, remote IP, and pathbase to account for forwarding the request to Kestrel. The app's response is passed back to IIS, which forwards it back to the HTTP client that initiated the request.

For ASP.NET Core Module configuration guidance, see [host-and-deploy/aspnet-core-module](../aspnet-core-module.md).

For more information on hosting, see [Host in ASP.NET Core](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23host).

## Application configuration

### Enable the IISIntegration components

When building a host in `CreateHostBuilder` (`Program.cs`), call [Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%252A) to enable IIS integration:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        ...
```

For more information on `CreateDefaultBuilder`, see [fundamentals/host/generic-host#default-builder-settings](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23default-builder-settings).


**Out-of-process hosting model**

To configure IIS options, include a service configuration for [Microsoft.AspNetCore.Builder.IISOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IISOptions) in [Microsoft.AspNetCore.Hosting.IStartup.ConfigureServices%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IStartup.ConfigureServices%252A). The following example prevents the app from populating `HttpContext.Connection.ClientCertificate`:

```csharp
services.Configure<IISOptions>(options => 
{
    options.ForwardClientCertificate = false;
});
```

| Option | Default | Setting |
| --- | :---: | --- |
| `AutomaticAuthentication` | `true` | If `true`, [IIS integration middleware](#enable-the-iisintegration-components) sets the `HttpContext.User` authenticated by [Windows Authentication](../../security/authentication/windowsauth.md). If `false`, the middleware only provides an identity for `HttpContext.User` and responds to challenges when explicitly requested by the `AuthenticationScheme`. Windows Authentication must be enabled in IIS for `AutomaticAuthentication` to function. For more information, see the [Windows Authentication](../../security/authentication/windowsauth.md) topic. |
| `AuthenticationDisplayName` | `null` | Sets the display name shown to users on login pages. |
| `ForwardClientCertificate` | `true` | If `true` and the `MS-ASPNETCORE-CLIENTCERT` request header is present, the `HttpContext.Connection.ClientCertificate` is populated. |


### Proxy server and load balancer scenarios

The [IIS integration middleware](#enable-the-iisintegration-components) and the ASP.NET Core Module are configured to forward the:

* Scheme (HTTP/HTTPS).
* Remote IP address where the request originated.

The [IIS integration middleware](#enable-the-iisintegration-components) configures forwarded headers middleware.

Additional configuration might be required for apps hosted behind additional proxy servers and load balancers. For more information, see [Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md).


### Out-of-process hosting model

To configure an app for out-of-process hosting, set the value of the `<AspNetCoreHostingModel>` property to `OutOfProcess` in the project file (`.csproj`):

```xml
<PropertyGroup>
  <AspNetCoreHostingModel>OutOfProcess</AspNetCoreHostingModel>
</PropertyGroup>
```

In-process hosting is set with `InProcess`, which is the default value.

The value of `<AspNetCoreHostingModel>` is case insensitive, so `inprocess` and `outofprocess` are valid values.

[Kestrel](../../fundamentals/servers/kestrel.md) server is used instead of IIS HTTP Server (`IISHttpServer`).

For out-of-process, [`CreateDefaultBuilder`](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23default-builder-settings) calls [Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIISIntegration%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIISIntegration%252A) to:

* Configure the port and base path the server should listen on when running behind the ASP.NET Core Module.
* Configure the host to capture startup errors.

### Process name

`Process.GetCurrentProcess().ProcessName` reports `w3wp`/`iisexpress` (in-process) or `dotnet` (out-of-process).

Many native modules, such as Windows Authentication, remain active. To learn more about IIS modules active with the ASP.NET Core Module, see [host-and-deploy/iis/modules](modules.md).

The ASP.NET Core Module can also:

* Set environment variables for the worker process.
* Log stdout output to file storage for troubleshooting startup issues.
* Forward Windows authentication tokens.
