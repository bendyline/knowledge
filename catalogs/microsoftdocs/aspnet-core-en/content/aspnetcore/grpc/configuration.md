---
title: gRPC for .NET configuration
author: jamesnk
description: Learn how to configure gRPC for .NET apps.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 11/23/2020
uid: grpc/configuration
---
# gRPC for .NET configuration

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


## Configure services options

gRPC services are configured with `AddGrpc` in `Startup.cs`. Configuration options are in the [`Grpc.AspNetCore.Server`](https://www.nuget.org/packages/Grpc.AspNetCore.Server) package.

The following table describes options for configuring gRPC services.

| Option | Default Value | Description |
| --- | --- | --- |
| `MaxSendMessageSize` | `null` | The maximum message size in bytes that can be sent from the server. Attempting to send a message that exceeds the configured maximum message size results in an exception. When set to `null`, the message size is unlimited. |
| `MaxReceiveMessageSize` | 4 MB | The maximum message size in bytes that can be received by the server. If the server receives a message that exceeds this limit, it throws an exception. Increasing this value allows the server to receive larger messages, but can negatively impact memory consumption. When set to `null`, the message size is unlimited. |
| `EnableDetailedErrors` | `false` | If `true`, detailed exception messages are returned to clients when an exception is thrown in a service method. The default is `false`. Setting `EnableDetailedErrors` to `true` can leak sensitive information. |
| `CompressionProviders` | gzip | A collection of compression providers used to compress and decompress messages. Custom compression providers can be created and added to the collection. The default configured providers support **gzip** compression. |
| `ResponseCompressionAlgorithm` | `null` | The compression algorithm used to compress messages sent from the server. The algorithm must match a compression provider in `CompressionProviders`. For the algorithm to compress a response, the client must indicate it supports the algorithm by sending it in the **grpc-accept-encoding** header. |
| `ResponseCompressionLevel` | `null` | The compress level used to compress messages sent from the server. |
| `Interceptors` | None | A collection of interceptors that are run with each gRPC call. Interceptors are run in the order they are registered. Globally configured interceptors are run before interceptors configured for a single service.<br/><br/>Interceptors have a per-request lifetime by default. The interceptor constructor is called and parameters are resolved from [dependency injection (DI)](../fundamentals/dependency-injection.md). An interceptor type can also be registered with DI to override how it is created and its lifetime.<br/><br/>Interceptors offer similar functionalities compared to ASP.NET Core middleware. For more information, see [gRPC Interceptors vs. middleware](https://learn.microsoft.com/search/?terms=grpc%2Fmigration%23grpc-interceptors-vs-middleware). |
| `IgnoreUnknownServices` | `false` | If `true`, calls to unknown services and methods don't return an **UNIMPLEMENTED** status, and the request passes to the next registered middleware in ASP.NET Core. |

Options can be configured for all services by providing an options delegate to the `AddGrpc` call in `Startup.ConfigureServices`:

[Code example (complete source file; reference: \~/grpc/configuration/sample/GrcpService/Startup.cs?name=snippet)](../../_code/aspnetcore/grpc/configuration/sample/GrcpService/Startup.cs.md)

Options for a single service override the global options provided in `AddGrpc` and can be configured using `AddServiceOptions<TService>`:

[Code example (complete source file; reference: \~/grpc/configuration/sample/GrcpService/Startup2.cs?name=snippet)](../../_code/aspnetcore/grpc/configuration/sample/GrcpService/Startup2.cs.md)

Service interceptors have a per-request lifetime by default. Registering the interceptor type with DI overrides how an interceptor is created and its lifetime.

[Code example (complete source file; reference: \~/grpc/configuration/sample/GrcpService/Startup3.cs?name=snippet)](../../_code/aspnetcore/grpc/configuration/sample/GrcpService/Startup3.cs.md)

### ASP.NET Core server options

`Grpc.AspNetCore.Server` is hosted by an ASP.NET Core web server. There are a number of options for ASP.NET Core servers, including Kestrel, IIS and HTTP.sys. Each server offers additional options for how HTTP requests are served.

The server used by an ASP.NET Core app is configured in app startup code. The default server is Kestrel.

For more information about the different servers and their configuration options, see:

* [fundamentals/servers/kestrel](../fundamentals/servers/kestrel.md)
* [fundamentals/servers/httpsys](../fundamentals/servers/httpsys.md)
* [host-and-deploy/iis/index](../host-and-deploy/iis/index.md)

## Configure client options

gRPC client configuration is set on `GrpcChannelOptions`. Configuration options are in the [`Grpc.Net.Client`](https://www.nuget.org/packages/Grpc.Net.Client) package.

The following table describes options for configuring gRPC channels.

| Option | Default Value | Description |
| --- | --- | --- |
| `HttpHandler` | New instance | The `HttpMessageHandler` used to make gRPC calls. A client can be set to configure a custom `HttpClientHandler` or add additional handlers to the HTTP pipeline for gRPC calls. If no `HttpMessageHandler` is specified, a new `HttpClientHandler` instance is created for the channel with automatic disposal. |
| `HttpClient` | `null` | The `HttpClient` used to make gRPC calls. This setting is an alternative to `HttpHandler`. |
| `DisposeHttpClient` | `false` | If set to `true` and an `HttpMessageHandler` or `HttpClient` is specified, then either the `HttpHandler` or `HttpClient`, respectively, is disposed when the `GrpcChannel` is disposed. |
| `LoggerFactory` | `null` | The `LoggerFactory` used by the client to log information about gRPC calls. A `LoggerFactory` instance can be resolved from dependency injection or created using `LoggerFactory.Create`. For examples of configuring logging, see [grpc/diagnostics#grpc-client-logging](https://learn.microsoft.com/search/?terms=grpc%2Fdiagnostics%23grpc-client-logging). |
| `MaxSendMessageSize` | `null` | The maximum message size in bytes that can be sent from the client. Attempting to send a message that exceeds the configured maximum message size results in an exception. When set to `null`, the message size is unlimited. |
| `MaxReceiveMessageSize` | 4 MB | The maximum message size in bytes that can be received by the client. If the client receives a message that exceeds this limit, it throws an exception. Increasing this value allows the client to receive larger messages, but can negatively impact memory consumption. When set to `null`, the message size is unlimited. |
| `Credentials` | `null` | A `ChannelCredentials` instance. Credentials are used to add authentication metadata to gRPC calls. |
| `CompressionProviders` | gzip | A collection of compression providers used to compress and decompress messages. Custom compression providers can be created and added to the collection. The default configured providers support **gzip** compression. |
| `ThrowOperationCanceledOnCancellation` | `false` | If set to `true`, clients throw [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) when a call is canceled or its deadline is exceeded. |
| `UnsafeUseInsecureChannelCallCredentials` | `false` | If set to `true`, `CallCredentials` are applied to gRPC calls made by an insecure channel. Sending authentication headers over an insecure connection has security implications and shouldn't be done in production environments. |
| `MaxRetryAttempts` | 5 | The maximum retry attempts. This value limits any retry and hedging attempt values specified in the service config. Setting this value alone doesn't enable retries. Retries are enabled in the service config, which can be done using `ServiceConfig`. A `null` value removes the maximum retry attempts limit. For more information about retries, see [grpc/retries](retries.md). |
| `MaxRetryBufferSize` | 16 MB | The maximum buffer size in bytes that can be used to store sent messages when retrying or hedging calls. If the buffer limit is exceeded, then no more retry attempts are made and all hedging calls but one will be canceled. This limit is applied across all calls made using the channel. A `null` value removes the maximum retry buffer size limit. |
| `MaxRetryBufferPerCallSize` | 1 MB | The maximum buffer size in bytes that can be used to store sent messages when retrying or hedging calls. If the buffer limit is exceeded, then no more retry attempts are made and all hedging calls but one will be canceled. This limit is applied to one call. A `null` value removes the maximum retry buffer size limit per call. |
| `ServiceConfig` | `null` | The service config for a gRPC channel. A service config can be used to configure [gRPC retries](retries.md). |

The following code:

* Sets the maximum send and receive message size on the channel.
* Creates a client.

[Code example (complete source file; reference: \~/grpc/configuration/sample/Program.cs?name=snippet\&highlight=3-8)](../../_code/aspnetcore/grpc/configuration/sample/Program.cs.md)

Note that client interceptors aren't configured with `GrpcChannelOptions`. Instead, client interceptors are configured using the `Intercept` extension method with a channel. This extension method is in the `Grpc.Core.Interceptors` namespace.

[Code example (complete source file; reference: \~/grpc/configuration/sample/Program2.cs?name=snippet\&highlight=4)](../../_code/aspnetcore/grpc/configuration/sample/Program2.cs.md)

### System.Net handler options

`Grpc.Net.Client` uses a HTTP transport derived from `HttpMessageHandler` to make HTTP requests. Each handler offers additional options for how HTTP requests are made.

The handler is configured on a channel and can be overridden by setting `GrpcChannelOptions.HttpHandler`. .NET Core 3 and .NET 5 or later uses [System.Net.Http.SocketsHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler) by default. gRPC client apps on .NET Framework [should configure WinHttpHandler](https://learn.microsoft.com/search/?terms=grpc%2Fnetstandard%23net-framework).

For more information about the different handlers and their configuration options, see:

* [System.Net.Http.SocketsHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler)
* [System.Net.Http.WinHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.WinHttpHandler)

## Additional resources

* [grpc/aspnetcore](aspnetcore.md)
* [grpc/client](client.md)
* [grpc/diagnostics](diagnostics.md)
* [tutorials/grpc/grpc-start](../tutorials/grpc/grpc-start.md)
