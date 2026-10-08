---
title: Use ASP.NET Core with HTTP/3 on IIS
author: tratcher
description: Learn how to use HTTP/3 features with IIS.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 09/09/2021
ms.reviewer: chrross
uid: host-and-deploy/iis/http3
---

# Use ASP.NET Core with HTTP/3 on IIS

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


By [Chris Ross](https://github.com/tratcher)

**Applies to: \>= aspnetcore-7.0**

[HTTP/3](https://datatracker.ietf.org/doc/rfc9114/) is fully supported with ASP.NET Core in the following IIS scenarios:

* In-process
* [Out-of-Process](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23out-of-process-hosting-model). In Out-of-Process, IIS responds to the client using HTTP/3, but the reverse proxy connection to the [Kestrel server](../../fundamentals/servers/kestrel.md) uses HTTP/1.1.

For more information on the in-process and out-of-process hosting models, see [host-and-deploy/aspnet-core-module](../aspnet-core-module.md).

The following requirements also need to be met:

* Windows Server 2022 / Windows 11 or later
* An `https` url binding is used.
* The [EnableHttp3 registry key](https://techcommunity.microsoft.com/t5/networking-blog/enabling-http-3-support-on-windows-server-2022/ba-p/2676880) is set.


For an in-process deployment when an HTTP/3 connection is established, [`HttpRequest.Protocol`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Protocol*) reports `HTTP/3`. For an out-of-process deployment when an HTTP/3 connection is established, [`HttpRequest.Protocol`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Protocol*) reports `HTTP/1.1` because that is how IIS proxies the requests to Kestrel.

## Alt-Svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the [`alt-svc`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Alt-Svc) header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. IIS doesn't automatically add the `alt-svc` header, it must be added by the application. The following code is a middleware example that adds the `alt-svc` response header.

```csharp
app.Use((context, next) =>
{
    context.Response.Headers.AltSvc = "h3=\":443\"";
    return next(context);
});
```

Place the preceding code early in the request pipeline.

IIS also supports sending an AltSvc HTTP/2 protocol message rather than a response header to notify the client that HTTP/3 is available. See the [EnableAltSvc registry key](https://techcommunity.microsoft.com/t5/networking-blog/enabling-http-3-support-on-windows-server-2022/ba-p/2676880). Note this requires netsh sslcert bindings that use host names rather than IP addresses.



**Applies to: \= aspnetcore-6.0**

[HTTP/3](https://datatracker.ietf.org/doc/rfc9114/) is supported with ASP.NET Core in the following IIS deployment scenarios:

* In-process
* [Out-of-Process](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23out-of-process-hosting-model). In Out-of-Process, IIS responds to the client using HTTP/3, but the reverse proxy connection to the [Kestrel server](../../fundamentals/servers/kestrel.md) uses HTTP/1.1.

For more information on the in-process and out-of-process hosting models, see [host-and-deploy/aspnet-core-module](../aspnet-core-module.md).

The following requirements also need to be met: 

* Windows Server 2022 / Windows 11 or later
* An `https` url binding is used.
* The [EnableHttp3 registry key](https://techcommunity.microsoft.com/t5/networking-blog/enabling-http-3-support-on-windows-server-2022/ba-p/2676880) is set.

For an in-process deployment when an HTTP/3 connection is established, [`HttpRequest.Protocol`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Protocol*) reports `HTTP/3`. For an out-of-process deployment when an HTTP/3 connection is established, [`HttpRequest.Protocol`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Protocol*) reports `HTTP/1.1` because that is how IIS proxies the requests to Kestrel.

## Alt-Svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the `alt-svc` header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. IIS doesn't automatically add the `alt-svc` header, it must be added by the application. The following code is a middleware example that adds the `alt-svc` response header.

```csharp
app.Use((context, next) =>
{
    context.Response.Headers.AltSvc = "h3=\":443\"";
    return next(context);
});
```

Place the preceding code early in the request pipeline.

IIS also supports sending an AltSvc HTTP/2 protocol message rather than a response header to notify the client that HTTP/3 is available. See the [EnableAltSvc registry key](https://techcommunity.microsoft.com/t5/networking-blog/enabling-http-3-support-on-windows-server-2022/ba-p/2676880). Note this requires netsh sslcert bindings that use host names rather than IP addresses.
