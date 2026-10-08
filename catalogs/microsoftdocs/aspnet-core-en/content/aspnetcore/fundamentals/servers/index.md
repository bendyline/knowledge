---
title: Web server implementations in ASP.NET Core
ai-usage: ai-assisted
author: tdykstra
description: Discover the web servers Kestrel and HTTP.sys for ASP.NET Core. Learn how to choose a server and when to use a reverse proxy server.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 08/04/2026
uid: fundamentals/servers/index
---
# Web server implementations in ASP.NET Core

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


By [Tom Dykstra](https://github.com/tdykstra), [Steve Smith](https://ardalis.com/), [Stephen Halter](https://twitter.com/halter73), and [Chris Ross](https://github.com/Tratcher)

An ASP.NET Core app runs with an in-process HTTP server implementation. The server implementation listens for HTTP requests and surfaces them to the app as a set of [request features](../request-features.md) composed into an [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext).

**Applies to: \>= aspnetcore-2.2**

# [Windows](#tab/windows)

ASP.NET Core ships with the following:

* [Kestrel server](kestrel.md) is the default, cross-platform HTTP server implementation. Kestrel provides the best performance and memory utilization, but it doesn't have some of the advanced features in HTTP.sys. For more information, see [Kestrel vs. HTTP.sys](index.md) in the Windows tab.
* IIS HTTP Server is an [in-process server](#hosting-models) for IIS.
* [HTTP.sys server](httpsys.md) is a Windows-only HTTP server based on the [HTTP.sys kernel driver and HTTP Server API](https://learn.microsoft.com/windows/desktop/Http/http-api-start-page).

When using [IIS](https://learn.microsoft.com/iis/get-started/introduction-to-iis/introduction-to-iis-architecture) or [IIS Express](https://learn.microsoft.com/iis/extensions/introduction-to-iis-express/iis-express-overview), the app either runs:

* In the same process as the IIS worker process (the [in-process hosting model](#hosting-models)) with the IIS HTTP Server. *In-process* is the recommended configuration.
* In a process separate from the IIS worker process (the [out-of-process hosting model](#hosting-models)) with the [Kestrel server](#kestrel).

The [ASP.NET Core Module](../../host-and-deploy/aspnet-core-module.md) is a native IIS module that handles native IIS requests between IIS and the in-process IIS HTTP Server or Kestrel. For more information, see [host-and-deploy/aspnet-core-module](../../host-and-deploy/aspnet-core-module.md).

## Kestrel vs. HTTP.sys

Kestrel has the following advantages over HTTP.sys:

  * Better performance and memory utilization.
  * Cross platform
  * Agility, it's developed and patched independent of the OS.
  * Programmatic port and TLS configuration
  * Extensibility that allows for protocols like [PPv2](https://www.haproxy.org/download/3.1/doc/proxy-protocol.txt) and alternate transports.

Http.Sys operates as a shared kernel mode component with the following features that kestrel does not have:

  * Port sharing
  * Kernel mode windows authentication. [Kestrel supports only user-mode authentication](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fwindowsauth%23kestrel).
  * Fast proxying via queue transfers
  * Direct file transmission
  * Response caching

## Hosting models

Several hosting models are available:

* Kestrel self-hosting: The Kestrel web server runs without requiring any other external web server such as IIS or HTTP.sys.

* HTTP.sys self-hosting is an alternative to Kestrel. Kestrel is recommended over HTTP.sys unless the app requires features not available in Kestrel.
  
* IIS in-process hosting: An ASP.NET Core app runs in the same process as its IIS worker process. IIS in-process hosting provides improved performance over IIS out-of-process hosting because requests aren't proxied over the loopback adapter, a network interface that returns outgoing network traffic back to the same machine. IIS handles process management with the [Windows Process Activation Service (WAS)](https://learn.microsoft.com/iis/manage/provisioning-and-managing-iis/features-of-the-windows-process-activation-service-was).

* IIS out-of-process hosting: ASP.NET Core apps run in a process separate from the IIS worker process, and the module handles process management. The module starts the process for the ASP.NET Core app when the first request arrives and restarts the app if it shuts down or crashes. This is essentially the same behavior as seen with apps that run in-process that are managed by the [Windows Process Activation Service (WAS)](https://learn.microsoft.com/iis/manage/provisioning-and-managing-iis/features-of-the-windows-process-activation-service-was). Using a separate process also enables hosting more than one app from the same app pool.

For more information, see the following:

* [Kestrel vs. HTTP.sys](#kestrel-vs-httpsys)
* [host-and-deploy/iis/index](../../host-and-deploy/iis/index.md)
* [host-and-deploy/aspnet-core-module](../../host-and-deploy/aspnet-core-module.md)

# [macOS](#tab/macos)

ASP.NET Core ships with [Kestrel server](kestrel.md), which is the default, cross-platform HTTP server.

> **Note:**
> macOS is supported for ASP.NET Core development, testing, continuous integration (CI), and local services without external access, but not for production server workloads. There is no server edition of macOS, and [Apple discontinued macOS Server](https://support.apple.com/101601). For production hosting, use Windows or Linux server distributions.

# [Linux](#tab/linux)

ASP.NET Core ships with [Kestrel server](kestrel.md), which is the default, cross-platform HTTP server.

---



## Kestrel

 [Kestrel server](kestrel.md) is the default, cross-platform HTTP server implementation. Kestrel provides the best performance and memory utilization, but it doesn't have some of the advanced features in HTTP.sys. For more information, see [Kestrel vs. HTTP.sys](#kestrel-vs-httpsys) in this document.

Use Kestrel:

* By itself as an edge server processing requests directly from a network, including the Internet.

  Kestrel communicates directly with the Internet without a reverse proxy server

* With a *reverse proxy server*, such as [Internet Information Services (IIS)](https://www.iis.net/), [Nginx](https://nginx.org), or [Apache](https://httpd.apache.org/). A reverse proxy server receives HTTP requests from the Internet and forwards them to Kestrel.

  Kestrel communicates indirectly with the Internet through a reverse proxy server, such as IIS, Nginx, or Apache

Either hosting configuration&mdash;with or without a reverse proxy server&mdash;is supported.

For Kestrel configuration guidance and information on when to use Kestrel in a reverse proxy configuration, see [fundamentals/servers/kestrel](kestrel.md).

**Applies to: < aspnetcore-2.2**

# [Windows](#tab/windows)

ASP.NET Core ships with the following:

* [Kestrel server](kestrel.md) is the default, cross-platform HTTP server.
* [HTTP.sys server](httpsys.md) is a Windows-only HTTP server based on the [HTTP.sys kernel driver and HTTP Server API](https://learn.microsoft.com/windows/desktop/Http/http-api-start-page).

When using [IIS](https://learn.microsoft.com/iis/get-started/introduction-to-iis/introduction-to-iis-architecture) or [IIS Express](https://learn.microsoft.com/iis/extensions/introduction-to-iis-express/iis-express-overview), the app runs in a process separate from the IIS worker process (*out-of-process*) with the [Kestrel server](#kestrel).

Because ASP.NET Core apps run in a process separate from the IIS worker process, the module handles process management. The module starts the process for the ASP.NET Core app when the first request arrives and restarts the app if it shuts down or crashes. This is essentially the same behavior as seen with apps that run in-process that are managed by the [Windows Process Activation Service (WAS)](https://learn.microsoft.com/iis/manage/provisioning-and-managing-iis/features-of-the-windows-process-activation-service-was).

The following diagram illustrates the relationship between IIS, the ASP.NET Core Module, and an app hosted out-of-process:

ASP.NET Core Module

Requests arrive from the web to the kernel-mode HTTP.sys driver. The driver routes the requests to IIS on the website's configured port, usually 80 (HTTP) or 443 (HTTPS). The module forwards the requests to Kestrel on a random port for the app, which isn't port 80 or 443.

The module specifies the port via an environment variable at startup, and the [IIS integration middleware](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23enable-the-iisintegration-components) configures the server to listen on `http://localhost:{port}`. Additional checks are performed, and requests that don't originate from the module are rejected. The module doesn't support HTTPS forwarding, so requests are forwarded over HTTP even if received by IIS over HTTPS.

After Kestrel picks up the request from the module, the request is pushed into the ASP.NET Core middleware pipeline. The middleware pipeline handles the request and passes it on as an `HttpContext` instance to the app's logic. Middleware added by IIS Integration updates the scheme, remote IP, and pathbase to account for forwarding the request to Kestrel. The app's response is passed back to IIS, which pushes it back out to the HTTP client that initiated the request.

For IIS and ASP.NET Core Module configuration guidance, see the following topics:

* [host-and-deploy/iis/index](../../host-and-deploy/iis/index.md)
* [host-and-deploy/aspnet-core-module](../../host-and-deploy/aspnet-core-module.md)

# [macOS](#tab/macos)

ASP.NET Core ships with [Kestrel server](kestrel.md), which is the default, cross-platform HTTP server.

> **Note:**
> macOS is supported for ASP.NET Core development, testing, continuous integration (CI), and local services without external access, but not for production server workloads. There is no server edition of macOS, and [Apple discontinued macOS Server](https://support.apple.com/101601). For production hosting, use Windows or Linux server distributions.

# [Linux](#tab/linux)

ASP.NET Core ships with [Kestrel server](kestrel.md), which is the default, cross-platform HTTP server.

---



### Nginx with Kestrel

For information on how to use Nginx on Linux as a reverse proxy server for Kestrel, see [host-and-deploy/linux-nginx](../../host-and-deploy/linux-nginx.md).

## HTTP.sys

If ASP.NET Core apps are run on Windows, HTTP.sys is an alternative to Kestrel. Kestrel is recommended over HTTP.sys unless the app requires features not available in Kestrel. For more information, see [fundamentals/servers/httpsys](httpsys.md).

HTTP.sys communicates directly with the Internet

HTTP.sys can also be used for apps that are only exposed to an internal network.

HTTP.sys communicates directly with the internal network

For HTTP.sys configuration guidance, see [fundamentals/servers/httpsys](httpsys.md).

## ASP.NET Core server infrastructure

The [Microsoft.AspNetCore.Builder.IApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IApplicationBuilder) available in the `Startup.Configure` method exposes the [Microsoft.AspNetCore.Builder.IApplicationBuilder.ServerFeatures](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IApplicationBuilder.ServerFeatures) property of type [Microsoft.AspNetCore.Http.Features.IFeatureCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IFeatureCollection). Kestrel and HTTP.sys only expose a single feature each, [Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature), but different server implementations may expose additional functionality.

`IServerAddressesFeature` can be used to find out which port the server implementation has bound at runtime.

## Custom servers

If the built-in servers don't meet the app's requirements, a custom server implementation can be created. The [Open Web Interface for .NET (OWIN) guide](../owin.md) demonstrates how to write a [Nowin](https://github.com/Bobris/Nowin)-based [Microsoft.AspNetCore.Hosting.Server.IServer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.Server.IServer) implementation. Only the feature interfaces that the app uses require implementation, though at a minimum [Microsoft.AspNetCore.Http.Features.IHttpRequestFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpRequestFeature) and [Microsoft.AspNetCore.Http.Features.IHttpResponseFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpResponseFeature) must be supported.

## Server startup

The server is launched when the Integrated Development Environment (IDE) or editor starts the app:

* [Visual Studio](https://visualstudio.microsoft.com): Launch profiles can be used to start the app and server with either [IIS Express](https://learn.microsoft.com/iis/extensions/introduction-to-iis-express/iis-express-overview)/[ASP.NET Core Module](../../host-and-deploy/aspnet-core-module.md) or the console.
* [Visual Studio Code](https://code.visualstudio.com/): The app and server are started by [Omnisharp](https://github.com/OmniSharp/omnisharp-vscode), which activates the CoreCLR debugger.

When launching the app from a command prompt in the project's folder, [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) launches the app and server (Kestrel and HTTP.sys only). The configuration is specified by the `-c|--configuration` option, which is set to either `Debug` (default) or `Release`.

A `launchSettings.json` file provides configuration when launching an app with `dotnet run` or with a debugger built into tooling, such as Visual Studio. If launch profiles are present in a `launchSettings.json` file, use the `--launch-profile {PROFILE NAME}` option with the `dotnet run` command or select the profile in Visual Studio. For more information, see [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) and [.NET distribution packaging](https://learn.microsoft.com/dotnet/core/build/distribution-packaging).

## HTTP/2 support

[HTTP/2](https://httpwg.org/specs/rfc7540.html) is supported with ASP.NET Core in the following deployment scenarios:

**Applies to: \>= aspnetcore-8.0**

* [Kestrel](kestrel/http2.md)
  * Operating system
    * Windows Server 2016/Windows 10 or later&dagger;
    * Linux with OpenSSL 1.0.2 or later (for example, Ubuntu 16.04 or later)
    * macOS 10.15 or later
  * Target framework: .NET Core 2.2 or later
* [HTTP.sys](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fhttpsys%23http2-support)
  * Windows Server 2016/Windows 10 or later
  * Target framework: Not applicable to HTTP.sys deployments.
* [IIS (in-process)](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23http2-support)
  * Windows Server 2016/Windows 10 or later; IIS 10 or later
  * Target framework: .NET Core 2.2 or later
* [IIS (out-of-process)](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23http2-support)
  * Windows Server 2016/Windows 10 or later; IIS 10 or later
  * Public-facing edge server connections use HTTP/2, but the reverse proxy connection to Kestrel uses HTTP/1.1.
  * Target framework: Not applicable to IIS out-of-process deployments.

&dagger;Kestrel has limited support for HTTP/2 on Windows Server 2012 R2 and Windows 8.1. Support is limited because the list of supported TLS cipher suites available on these operating systems is limited. A certificate generated using an Elliptic Curve Digital Signature Algorithm (ECDSA) may be required to secure TLS connections.



**Applies to: \>= aspnetcore-5.0 < aspnetcore-8.0**

* [Kestrel](kestrel/http2.md)
  * Operating system
    * Windows Server 2016/Windows 10 or later&dagger;
    * Linux with OpenSSL 1.0.2 or later (for example, Ubuntu 16.04 or later)
    * HTTP/2 will be supported on macOS in a future release.
  * Target framework: .NET Core 2.2 or later
* [HTTP.sys](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fhttpsys%23http2-support)
  * Windows Server 2016/Windows 10 or later
  * Target framework: Not applicable to HTTP.sys deployments.
* [IIS (in-process)](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23http2-support)
  * Windows Server 2016/Windows 10 or later; IIS 10 or later
  * Target framework: .NET Core 2.2 or later
* [IIS (out-of-process)](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23http2-support)
  * Windows Server 2016/Windows 10 or later; IIS 10 or later
  * Public-facing edge server connections use HTTP/2, but the reverse proxy connection to Kestrel uses HTTP/1.1.
  * Target framework: Not applicable to IIS out-of-process deployments.

&dagger;Kestrel has limited support for HTTP/2 on Windows Server 2012 R2 and Windows 8.1. Support is limited because the list of supported TLS cipher suites available on these operating systems is limited. A certificate generated using an Elliptic Curve Digital Signature Algorithm (ECDSA) may be required to secure TLS connections.



**Applies to: \>= aspnetcore-2.2 < aspnetcore-5.0**

* [Kestrel](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23http2-support)
  * Operating system
    * Windows Server 2016/Windows 10 or later&dagger;
    * Linux with OpenSSL 1.0.2 or later (for example, Ubuntu 16.04 or later)
    * HTTP/2 will be supported on macOS in a future release.
  * Target framework: .NET Core 2.2 or later
* [HTTP.sys](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fhttpsys%23http2-support)
  * Windows Server 2016/Windows 10 or later
  * Target framework: Not applicable to HTTP.sys deployments.
* [IIS (in-process)](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23http2-support)
  * Windows Server 2016/Windows 10 or later; IIS 10 or later
  * Target framework: .NET Core 2.2 or later
* [IIS (out-of-process)](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23http2-support)
  * Windows Server 2016/Windows 10 or later; IIS 10 or later
  * Public-facing edge server connections use HTTP/2, but the reverse proxy connection to Kestrel uses HTTP/1.1.
  * Target framework: Not applicable to IIS out-of-process deployments.

&dagger;Kestrel has limited support for HTTP/2 on Windows Server 2012 R2 and Windows 8.1. Support is limited because the list of supported TLS cipher suites available on these operating systems is limited. A certificate generated using an Elliptic Curve Digital Signature Algorithm (ECDSA) may be required to secure TLS connections.



**Applies to: < aspnetcore-2.2**

* [HTTP.sys](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fhttpsys%23http2-support)
  * Windows Server 2016/Windows 10 or later
  * Target framework: Not applicable to HTTP.sys deployments.
* [IIS (out-of-process)](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23http2-support)
  * Windows Server 2016/Windows 10 or later; IIS 10 or later
  * Public-facing edge server connections use HTTP/2, but the reverse proxy connection to Kestrel uses HTTP/1.1.
  * Target framework: Not applicable to IIS out-of-process deployments.



An HTTP/2 connection must use [Application-Layer Protocol Negotiation (ALPN)](https://tools.ietf.org/html/rfc7301#section-3) and TLS 1.2 or later. For more information, see the topics that pertain to your server deployment scenarios.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see [Enterprise web app patterns](https://learn.microsoft.com/azure/architecture/web-apps/guides/enterprise-app-patterns/overview). A complete production-quality sample web app that implements the patterns is available.


## Additional resources

* [fundamentals/servers/kestrel](kestrel.md)
* [host-and-deploy/aspnet-core-module](../../host-and-deploy/aspnet-core-module.md)
* [host-and-deploy/iis/index](../../host-and-deploy/iis/index.md)
* [host-and-deploy/azure-apps/index](../../host-and-deploy/azure-apps/index.md)
* [host-and-deploy/linux-nginx](../../host-and-deploy/linux-nginx.md)
* [fundamentals/servers/httpsys](httpsys.md)
