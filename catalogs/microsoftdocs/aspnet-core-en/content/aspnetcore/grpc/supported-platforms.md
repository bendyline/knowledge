---
title: gRPC on .NET supported platforms
ai-usage: ai-assisted
author: jamesnk
description: Learn about the supported platforms for gRPC on .NET.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 08/05/2026
uid: grpc/supported-platforms
---
# gRPC on .NET supported platforms

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


By [James Newton-King](https://twitter.com/jamesnk)

This article discusses the requirements and supported platforms for using gRPC with .NET. There are different requirements for the two major gRPC workloads:

* [Hosting gRPC services in ASP.NET Core](#aspnet-core-grpc-server-requirements)
* [Calling gRPC from .NET client apps](#net-grpc-client-requirements)

## Wire-formats

gRPC takes advantage of advanced features available in HTTP/2. HTTP/2 isn't supported everywhere, but a second wire-format using HTTP/1.1 is available for gRPC:

* [`application/grpc`](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md) - gRPC over HTTP/2 is how gRPC is typically used.
* [`application/grpc-web`](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md) - gRPC-Web modifies the gRPC protocol to be compatible with HTTP/1.1. gRPC-Web can be used in more places. gRPC-Web can be used by browser apps and in networks without complete support for HTTP/2. Two advanced gRPC features are no longer supported: client streaming and bidirectional streaming.

gRPC on .NET supports both wire-formats. `application/grpc` is used by default. gRPC-Web must be configured on the client and the server for successful gRPC-Web calls. For information on setting up gRPC-Web, see [grpc/grpcweb](grpcweb.md).

## ASP.NET Core gRPC server requirements

Hosting gRPC services with ASP.NET Core requires .NET Core 3.x or later.

> 
>
> * .NET 5 or later
> * .NET Core 3

ASP.NET Core gRPC services can be hosted on all operating systems that .NET supports.

**Applies to: \>= aspnetcore-8.0**

> 
>
> * Windows
> * Linux
> * macOS

> **Note:**
> macOS is supported for ASP.NET Core development, testing, continuous integration (CI), and local services without external access, but not for production server workloads. There is no server edition of macOS, and [Apple discontinued macOS Server](https://support.apple.com/101601). For production hosting, use Windows or Linux server distributions.



**Applies to: < aspnetcore-8.0**

> 
>
> * Windows
> * Linux
> * macOS&dagger;

&dagger;[macOS doesn't support hosting ASP.NET Core apps with HTTPS](https://learn.microsoft.com/search/?terms=grpc%2Ftroubleshoot%23unable-to-start-aspnet-core-grpc-app-on-macos).

> **Note:**
> macOS is supported for ASP.NET Core development, testing, continuous integration (CI), and local services without external access, but not for production server workloads. There is no server edition of macOS, and [Apple discontinued macOS Server](https://support.apple.com/101601). In addition, macOS [doesn't support hosting ASP.NET Core apps with HTTPS](https://learn.microsoft.com/search/?terms=grpc%2Ftroubleshoot%23unable-to-start-aspnet-core-grpc-app-on-macos). For production hosting, use Windows or Linux server distributions.



### Supported ASP.NET Core servers

All built-in ASP.NET Core servers are supported.

> 
>
> * Kestrel
> * TestServer
> * IIS&dagger;
> * HTTP.sys&dagger;

&dagger;Requires .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later.

For information about configuring ASP.NET Core servers to run gRPC, see [grpc/aspnetcore#server-options](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23server-options).

### Azure services

> 
>
> * [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/services/kubernetes-service/)
> * [Azure Container Apps](https://azure.microsoft.com/services/container-apps/)
> * [Azure App Service](https://azure.microsoft.com/services/app-service/)&dagger;

&dagger;gRPC requires a Linux-based environment on Azure App Service. See [How-to deploy a .NET 6 gRPC app on App Service](https://github.com/Azure/app-service-linux-docs/blob/master/HowTo/gRPC/Linux/.NET/use_gRPC_with_dotnet.md) for Azure App Service deployment information.

## .NET gRPC client requirements

The [Grpc.Net.Client](https://www.nuget.org/packages/Grpc.Net.Client/) package supports gRPC calls over HTTP/2 on .NET Core 3 and .NET 5 or later.

Limited support is available for gRPC over HTTP/2 on .NET Framework. Other .NET versions such as UWP and Unity don't have required HTTP/2 support, and must use gRPC-Web instead.

The following table lists .NET implementations and their gRPC client support.

| .NET implementation | gRPC over HTTP/2 | gRPC-Web |
| --- | --- | --- |
| .NET 5 or later | ✔️ | ✔️ |
| .NET Core 3 | ✔️ | ✔️ |
| .NET Core 2.1 | ❌ | ✔️ |
| .NET Framework 4.6.1 | ⚠️&dagger; | ✔️ |
| Blazor WebAssembly | ❌ | ✔️ |
| Mono 5.4 | ❌ | ✔️ |
| Universal Windows Platform 10.0.16299 | ❌ | ✔️ |
| Unity 2018.1 | ❌ | ✔️ |

&dagger;.NET Framework requires configuration of [System.Net.Http.WinHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.WinHttpHandler) and Windows 11 or later, Windows Server 2019 or later. For more information, see [Make gRPC calls on .NET Framework](https://learn.microsoft.com/search/?terms=grpc%2Fnetstandard%23net-framework).

Using `Grpc.Net.Client` with gRPC-Web requires additional configuration. For more information:

* [Configure gRPC-Web with the .NET gRPC client](https://learn.microsoft.com/search/?terms=grpc%2Fgrpcweb%23configure-grpc-web-with-the-net-grpc-client)
* [grpc/netstandard](netstandard.md)

> **Important:**
> gRPC-Web requires the client ***and*** server to support it. gRPC-Web can be [quickly configured by an ASP.NET Core gRPC server](https://learn.microsoft.com/search/?terms=grpc%2Fgrpcweb%23configure-grpc-web-in-aspnet-core). Other gRPC server implementations require a proxy to support gRPC-Web.

## Additional resources

* [grpc/netstandard](netstandard.md)
* [gRPC C# core-library](https://grpc.io/docs/languages/csharp/quickstart/)
