---
title: Use gRPC client with .NET Standard 2.0
author: jamesnk
description: Learn how to use the .NET gRPC client in apps and libraries that support .NET Standard 2.0.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 01/08/2025
uid: grpc/netstandard
---
# Use gRPC client with .NET Standard 2.0

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

This article discusses how to use the .NET gRPC client with .NET implementations that support [.NET Standard 2.0](https://learn.microsoft.com/dotnet/standard/net-standard).

## .NET implementations

The following .NET implementations (or later) support [Grpc.Net.Client](https://www.nuget.org/packages/Grpc.Net.Client/) but don't have full support for HTTP/2:

* .NET Core 2.1
* .NET Framework 4.6.1
* Mono 5.4
* Universal Windows Platform 10.0.16299
* Unity 2018.1

The .NET gRPC client can call services from these .NET implementations with some additional configuration.

## HttpHandler configuration

An HTTP provider must be configured using `GrpcChannelOptions.HttpHandler`. If a handler isn't configured, an error is thrown:

> `System.PlatformNotSupportedException`: gRPC requires extra configuration to successfully make RPC calls on .NET implementations that don't have support for gRPC over HTTP/2. An HTTP provider must be specified using `GrpcChannelOptions.HttpHandler`. The configured HTTP provider must either support HTTP/2 or be configured to use gRPC-Web.

.NET implementations that don't support HTTP/2, such as UWP and Unity, can use gRPC-Web as an alternative.

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001", new GrpcChannelOptions
    {
        HttpHandler = new GrpcWebHandler(new HttpClientHandler())
    });

var client = new Greeter.GreeterClient(channel);
var response = await client.SayHelloAsync(new HelloRequest { Name = ".NET" });
```

Clients can also be created using the [gRPC client factory](clientfactory.md). An HTTP provider is configured using the [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%252A) extension method.

```csharp
builder.Services
    .AddGrpcClient<Greet.GreeterClient>(options =>
    {
        options.Address = new Uri("https://localhost:5001");
    })
    .ConfigurePrimaryHttpMessageHandler(
        () => new GrpcWebHandler(new HttpClientHandler()));
```

For more information, see [Configure gRPC-Web with the .NET gRPC client](https://learn.microsoft.com/search/?terms=grpc%2Fgrpcweb%23configure-grpc-web-with-the-net-grpc-client).

> **Important:**
> gRPC-Web requires the client ***and*** server to support it. gRPC-Web can be [quickly configured by an ASP.NET Core gRPC server](https://learn.microsoft.com/search/?terms=grpc%2Fgrpcweb%23configure-grpc-web-in-aspnet-core). Other gRPC server implementations require a proxy to support gRPC-Web.

## .NET Framework

.NET Framework has limited support for gRPC over HTTP/2. To enable gRPC over HTTP/2 on .NET Framework, configure the channel to use [System.Net.Http.WinHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.WinHttpHandler).

Requirements and restrictions to using `WinHttpHandler`:

* Windows 11 or later, Windows Server 2019 or later.
  * gRPC client is fully supported on Windows 11 or later.
  * gRPC client is partially supported on Windows Server 2019 and Windows Server 2022. Unary and server streaming methods are supported. Client and bidirectional streaming methods are **_not_** supported.
* A reference to [`System.Net.Http.WinHttpHandler`](https://www.nuget.org/packages/System.Net.Http.WinHttpHandler/) version 6.0.1 or later.
* Configure `WinHttpHandler` on the channel using `GrpcChannelOptions.HttpHandler`.
* .NET Framework 4.6.1 or later.
* Only gRPC calls over TLS are supported.

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001", new GrpcChannelOptions
    {
        HttpHandler = new WinHttpHandler()
    });

var client = new Greeter.GreeterClient(channel);
var response = await client.SayHelloAsync(new HelloRequest { Name = ".NET" });
```

> **Note:**
> The gRPC client on .NET Framework is slower than on modern .NET versions. For improved gRPC performance, apps should be updated to use modern .NET.

## gRPC C# core-library

An alternative option for .NET Framework has been to use [gRPC C# core-library](https://grpc.io/docs/languages/csharp/quickstart/) to make gRPC calls. gRPC C# core-library is:

* A third party library that supports making gRPC calls over HTTP/2 on .NET Framework. 
* Not supported by Microsoft.
* In maintenance mode and will be [deprecated in favour of gRPC for .NET](https://grpc.io/blog/grpc-csharp-future/).
* Not recommended for new apps.

## Additional resources

* [grpc/client](client.md)
* [grpc/browser](browser.md)
* [gRPC C# core-library](https://grpc.io/docs/languages/csharp/quickstart/)
