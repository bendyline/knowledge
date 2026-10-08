---
title: Host filtering with ASP.NET Core Kestrel web server
author: tdykstra
description: Learn about using host filtering with Kestrel, the cross-platform web server for ASP.NET Core.
monikerRange: '>= aspnetcore-5.0'
ms.author: tdykstra
ms.date: 05/04/2020
uid: fundamentals/servers/kestrel/host-filtering
---

# Host filtering with ASP.NET Core Kestrel web server

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


While Kestrel supports configuration based on prefixes such as `http://example.com:5000`, Kestrel largely ignores the host name. Host `localhost` is a special case used for binding to loopback addresses. Any host other than an explicit IP address binds to all public IP addresses. `Host` headers aren't validated.

As a workaround, use host-filtering middleware. The middleware is added by [Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%252A), which calls [Microsoft.AspNetCore.Builder.HostFilteringServicesExtensions.AddHostFiltering%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HostFilteringServicesExtensions.AddHostFiltering%252A):

[Code example (complete source file; reference: samples-snapshot/2.x/KestrelSample/Program.cs?name=snippet_Program\&highlight=9)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples-snapshot/2.x/KestrelSample/Program.cs.md)

Host-filtering middleware is disabled by default. To enable the middleware, define an `AllowedHosts` key in `appsettings.json`/`appsettings.{Environment}.json`. The value is a semicolon-delimited list of host names without port numbers:

`appsettings.json`:

```json
{
  "AllowedHosts": "example.com;localhost"
}
```

> **Note:**
> [Forwarded headers middleware](../../../host-and-deploy/proxy-load-balancer.md) also has an [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.AllowedHosts](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.AllowedHosts) option. Forwarded headers middleware and host-filtering middleware have similar functionality for different scenarios. Setting `AllowedHosts` with forwarded headers middleware is appropriate when the `Host` header isn't preserved while forwarding requests with a reverse proxy server or load balancer. Setting `AllowedHosts` with host-filtering middleware is appropriate when Kestrel is used as a public-facing edge server or when the `Host` header is directly forwarded.
>
> For more information on forwarded headers middleware, see [host-and-deploy/proxy-load-balancer](../../../host-and-deploy/proxy-load-balancer.md).
