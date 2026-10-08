---
title: Migrate gRPC from C-core to gRPC for .NET
author: jamesnk
description: Learn how to move an existing C-core based gRPC app to run on top of gRPC for .NET.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 01/18/2022
uid: grpc/migration
---
# Migrate gRPC from C-core to gRPC for .NET

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


Due to the implementation of the underlying stack, not all features work in the same way between [C-core-based gRPC](https://grpc.io/blog/grpc-stacks) apps and gRPC for .NET. This document highlights the key differences for migrating between the two stacks.

> **Important:**
> gRPC C-core is in maintenance mode and [will be deprecated in favor of gRPC for .NET](https://grpc.io/blog/grpc-csharp-future/). gRPC C-core is not recommended for new apps.

## Platform support

gRPC C-core and gRPC for .NET have different platform support:

* **gRPC C-core**: A C++ gRPC implementation with its own TLS and HTTP/2 stacks. The `Grpc.Core` package is a .NET wrapper around gRPC C-core and contains a gRPC client and server. It supports .NET Framework, .NET Core, and .NET 5 or later.
* **gRPC for .NET**: Designed for .NET Core 3.x and .NET 5 or later. It uses TLS and HTTP/2 stacks built into modern .NET releases. The `Grpc.AspNetCore` package contains a gRPC server that is hosted in ASP.NET Core and requires .NET Core 3.x or .NET 5 or later. The `Grpc.Net.Client` package contains a gRPC client. The client in `Grpc.Net.Client` has limited support for .NET Framework using [System.Net.Http.WinHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.WinHttpHandler).

For more information, see [grpc/supported-platforms](supported-platforms.md).

## Configure server and channel

NuGet packages, configuration, and startup code must be modified when migrating from gRPC C-Core to gRPC for .NET.

gRPC for .NET has separate NuGet packages for its client and server. The packages added depend upon whether an app is hosting gRPC services or calling them:

* [**`Grpc.AspNetCore`**](https://www.nuget.org/packages/Grpc.AspNetCore): Services are hosted by ASP.NET Core. For server configuration information, see [grpc/aspnetcore](aspnetcore.md).
* [**`Grpc.Net.Client`**](https://www.nuget.org/packages/Grpc.Net.Client): Clients use `GrpcChannel`, which internally uses networking functionality built into .NET. For client configuration information, see [grpc/client](client.md).

When migration is complete, the `Grpc.Core` package should be removed from the app. `Grpc.Core` contains large native binaries, and removing the package reduces NuGet restore time and app size.

## Code generated services and clients

gRPC C-Core and gRPC for .NET share many APIs, and code generated from `.proto` files is compatible with both gRPC implementations. Most clients and service can be migrated from C-Core to gRPC for .NET without changes.

## gRPC service implementation lifetime

In the ASP.NET Core stack, gRPC services, by default, are created with a [scoped lifetime](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes). In contrast, gRPC C-core by default binds to a service with a [singleton lifetime](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes).

A scoped lifetime allows the service implementation to resolve other services with scoped lifetimes. For example, a scoped lifetime can also resolve `DbContext` from the DI container through constructor injection. Using scoped lifetime:

* A new instance of the service implementation is constructed for each request.
* It isn't possible to share state between requests via instance members on the implementation type.
* The expectation is to store shared states in a singleton service in the DI container. The stored shared states are resolved in the constructor of the gRPC service implementation.

For more information on service lifetimes, see [fundamentals/dependency-injection#service-lifetimes](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes).

### Add a singleton service

To facilitate the transition from a gRPC C-core implementation to ASP.NET Core, it's possible to change the service lifetime of the service implementation from scoped to singleton. This involves adding an instance of the service implementation to the DI container:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddGrpc();
    services.AddSingleton(new GreeterService());
}
```

However, a service implementation with a singleton lifetime is no longer able to resolve scoped services through constructor injection.

## Configure gRPC services options

In C-core-based apps, settings such as `grpc.max_receive_message_length` and `grpc.max_send_message_length` are configured with `ChannelOption` when [constructing the Server instance](https://grpc.io/grpc/csharp/api/Grpc.Core.Server.html#Grpc_Core_Server__ctor_System_Collections_Generic_IEnumerable_Grpc_Core_ChannelOption__).

In ASP.NET Core, gRPC provides configuration through the `GrpcServiceOptions` type. For example, a gRPC service's the maximum incoming message size can be configured via `AddGrpc`. The following example changes the default `MaxReceiveMessageSize` of 4 MB to 16 MB:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddGrpc(options =>
    {
        options.MaxReceiveMessageSize = 16 * 1024 * 1024; // 16 MB
    });
}
```

For more information on configuration, see [grpc/configuration](configuration.md).

## Logging

C-core-based apps rely on the `GrpcEnvironment` to [configure the logger](https://grpc.io/grpc/csharp/api/Grpc.Core.GrpcEnvironment.html?q=size#Grpc_Core_GrpcEnvironment_SetLogger_Grpc_Core_Logging_ILogger_) for debugging purposes. The ASP.NET Core stack provides this functionality through the [Logging API](../fundamentals/logging/index.md). For example, a logger can be added to the gRPC service.

Constructor injection:

```csharp
public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;

    public GreeterService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }
}
```

Primary constructor injection (.NET 8 or later):

```csharp
public class GreeterService(ILogger<GreeterService> logger) : Greeter.GreeterBase
{
    ...
}
```

For more information on gRPC logging and diagnostics, see [grpc/diagnostics](diagnostics.md).

## HTTPS

**Applies to: \>= aspnetcore-5.0**
C-core-based apps configure HTTPS through the [Server.Ports property](https://grpc.io/grpc/csharp/api/Grpc.Core.Server.html#Grpc_Core_Server_Ports). A similar concept is used to configure servers in ASP.NET Core. For example, Kestrel uses [endpoint configuration](../fundamentals/servers/kestrel/endpoints.md) for this functionality.


**Applies to: < aspnetcore-5.0**
C-core-based apps configure HTTPS through the [Server.Ports property](https://grpc.io/grpc/csharp/api/Grpc.Core.Server.html#Grpc_Core_Server_Ports). A similar concept is used to configure servers in ASP.NET Core. For example, Kestrel uses [endpoint configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23endpoint-configuration) for this functionality.


## gRPC Interceptors

ASP.NET Core [middleware](../fundamentals/middleware/index.md) offers similar functionalities compared to interceptors in C-core-based gRPC apps. Both are supported by ASP.NET Core gRPC apps, so there's no need to rewrite interceptors.

For more information on how these features compare to each other, see [gRPC Interceptors versus middleware](https://learn.microsoft.com/search/?terms=grpc%2Finterceptors%23grpc-interceptors-versus-middleware).

## Host gRPC in non-ASP.NET Core projects

A C-core-based server can be added to any project type. gRPC for .NET server requires ASP.NET Core. ASP.NET Core is usually available because the project file specifies `Microsoft.NET.SDK.Web` as the SDK.

A gRPC server can be hosted to non-ASP.NET Core projects by adding `<FrameworkReference Include="Microsoft.AspNetCore.App" />` to a project. The framework reference makes ASP.NET Core APIs available and they can be used to start an ASP.NET Core server.

For more information, see [Host gRPC in non-ASP.NET Core projects](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23host-grpc-in-non-aspnet-core-projects).

## Additional resources

* [grpc/index](index.md)
* [grpc/basics](basics.md)
* [grpc/aspnetcore](aspnetcore.md)
* [tutorials/grpc/grpc-start](../tutorials/grpc/grpc-start.md)
