---
title: Configure options for the ASP.NET Core Kestrel web server
author: tdykstra
description: Learn about configuring options for Kestrel, the cross-platform web server for ASP.NET Core.
monikerRange: '>= aspnetcore-5.0'
ms.author: tdykstra
ms.date: 08/25/2025
uid: fundamentals/servers/kestrel/options
---
# Configure options for the ASP.NET Core Kestrel web server

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

The Kestrel web server has constraint configuration options that are especially useful in Internet-facing deployments. To configure Kestrel configuration options, call [Microsoft.AspNetCore.Hosting.WebHostBuilderKestrelExtensions.ConfigureKestrel%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderKestrelExtensions.ConfigureKestrel%252A) in `Program.cs`:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrel"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

Set constraints on the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Limits%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Limits%252A) property. This property holds an instance of the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits) class.

## General limits

### Keep-alive timeout

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.KeepAliveTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.KeepAliveTimeout) gets or sets the [keep-alive timeout](https://www.rfc-editor.org/rfc/rfc9112.html#name-keep-alive-connections):

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelLimitsKeepAliveTimeout" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

This timeout is not enforced when a debugger is attached to the Kestrel process.

### Maximum client connections

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentConnections](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentConnections) gets or sets the maximum number of open connections:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelLimitsMaxConcurrentConnections" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentUpgradedConnections](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentUpgradedConnections) gets or sets the maximum number of open, upgraded connections:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelLimitsMaxConcurrentUpgradedConnections" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

An upgraded connection is one that has been switched from HTTP to another protocol, such as WebSockets. After a connection is upgraded, it isn't counted against the `MaxConcurrentConnections` limit.

### Maximum request body size

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize) gets or sets the maximum allowed size of any request body in bytes.

The recommended approach to override the limit in an ASP.NET Core MVC app is to use the [Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute) attribute on an action method:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Controllers/SampleController.cs" id="snippet_RequestSizeLimit"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Controllers/SampleController.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Controllers/SampleController.cs.md)

The following example configures `MaxRequestBodySize` for all requests:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelLimitsMaxRequestBodySize" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The following example configures `MaxRequestBodySize` for a specific request using [Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature) in a custom middleware:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_IHttpMaxRequestBodySizeFeatureMiddleware"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

If the app attempts to configure the limit on a request after it starts to read the request, an exception is thrown. Use the [Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.IsReadOnly%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.IsReadOnly%252A) property to check if it's safe to set the `MaxRequestBodySize` property.

When an app runs [out-of-process](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23out-of-process-hosting-model) behind the [ASP.NET Core Module](../../../host-and-deploy/aspnet-core-module.md), IIS sets the limit and Kestrel's request body size limit is disabled.

### Minimum request body data rate

Kestrel checks every second if data is arriving at the specified rate in bytes/second. If the rate drops below the minimum, the connection is timed out. The grace period is the amount of time Kestrel allows the client to increase its send rate up to the minimum. The rate isn't checked during that time. The grace period helps avoid dropping connections that are initially sending data at a slow rate because of TCP slow-start. A minimum rate also applies to the response.

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate) gets or sets the request body minimum data rate in bytes/second. [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate) gets or sets the response minimum data rate in bytes/second.

The following example configures `MinRequestBodyDataRate` and `MinResponseDataRate` for all requests:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelLimitsMinDataRates" highlight="3-6"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The following example configures `MinRequestBodyDataRate` and `MinResponseDataRate` for a specific request using [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature) and [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature) in a custom middleware:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_DataRateFeaturesMiddleware"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

`IHttpMinResponseDataRateFeature` isn't present in [Microsoft.AspNetCore.Http.HttpContext.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Features) for HTTP/2 requests. Modifying rate limits on a per-request basis isn't generally supported for HTTP/2 because of the protocol's support for request multiplexing. However, `IHttpMinRequestBodyDataRateFeature` is still present in `HttpContext.Features` for HTTP/2 requests, because the read rate limit can still be *disabled entirely* on a per-request basis by setting [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate) to `null`, even for an HTTP/2 request. Attempts to read `IHttpMinRequestBodyDataRateFeature.MinDataRate` or attempts to set it to a value other than `null` result in a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) for HTTP/2 requests.

Server-wide rate limits configured via [Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions.Limits](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions.Limits) still apply to both HTTP/1.x and HTTP/2 connections.

### Request headers timeout

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout) gets or sets the maximum amount of time the server spends receiving request headers:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelLimitsRequestHeadersTimeout" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

This timeout is not enforced when a debugger is attached to the Kestrel process.

## HTTP/2 limits

The limits in this section are set on [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.Http2](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.Http2).

### Maximum streams per connection

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxStreamsPerConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxStreamsPerConnection) limits the number of concurrent request streams per HTTP/2 connection. Excess streams are refused:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelHttp2LimitsMaxStreamsPerConnection" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### Header table size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.HeaderTableSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.HeaderTableSize) limits the size of the header compression tables, in octets, the HPACK encoder and decoder on the server can use. The HPACK decoder decompresses HTTP headers for HTTP/2 connections:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelHttp2LimitsHeaderTableSize" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### Maximum frame size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxFrameSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxFrameSize) indicates the size of the largest frame payload that is allowed to be received, in octets:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelHttp2LimitsMaxFrameSize" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### Maximum request header size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxRequestHeaderFieldSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxRequestHeaderFieldSize) indicates the size of the maximum allowed size of a request header field sequence. This limit applies to both name and value sequences in their compressed and uncompressed representations:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelHttp2LimitsMaxRequestHeaderFieldSize" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### Initial connection window size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialConnectionWindowSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialConnectionWindowSize) indicates how much request body data the server is willing to receive and buffer at a time aggregated across all requests (streams) per connection:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelHttp2LimitsInitialConnectionWindowSize" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

Requests are also limited by [`InitialStreamWindowSize`](#initial-stream-window-size).

### Initial stream window size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialStreamWindowSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialStreamWindowSize) indicates how much request body data the server is willing to receive and buffer at a time per stream:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelHttp2LimitsInitialStreamWindowSize" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

Requests are also limited by [`InitialConnectionWindowSize`](#initial-connection-window-size).

### HTTP/2 keep alive ping configuration

Kestrel can be configured to send HTTP/2 pings to connected clients. HTTP/2 pings serve multiple purposes:

* Keep idle connections alive. Some clients and proxy servers close connections that are idle. HTTP/2 pings are considered as activity on a connection and prevent the connection from being closed as idle.
* Close unhealthy connections. Connections where the client doesn't respond to the keep alive ping in the configured time are closed by the server.

There are two configuration options related to HTTP/2 keep alive pings:

* [Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingDelay](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingDelay) is a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) that configures the ping interval. The server sends a keep alive ping to the client if it doesn't receive any frames for this period of time. Keep alive pings are disabled when this option is set to [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue).
* [Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingTimeout) is a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) that configures the ping timeout. If the server doesn't receive any frames, such as a response ping, during this timeout then the connection is closed. Keep alive timeout is disabled when this option is set to [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue).

The following example sets `KeepAlivePingDelay` and `KeepAlivePingTimeout`:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelHttp2LimitsKeepAlivePings" highlight="3-4"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Other options

### Synchronous I/O

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.AllowSynchronousIO](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.AllowSynchronousIO) controls whether synchronous I/O is allowed for the request and response.

> **Warning:**
> A large number of blocking synchronous I/O operations can lead to thread pool starvation, which makes the app unresponsive. Only enable `AllowSynchronousIO` when using a library that doesn't support asynchronous I/O.

The following example enables synchronous I/O:

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelAllowSynchronousIO" highlight="3"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

For information about other Kestrel options and limits, see:

* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits)
* [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions)
    
## Behavior with debugger attached

The following timeout and rate limit options aren't enforced when a debugger is attached to a Kestrel process:

* [Microsoft.AspNetCore.Server.Kestrel.KestrelServerLimits.KeepAliveTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelServerLimits.KeepAliveTimeout)
* [Microsoft.AspNetCore.Server.Kestrel.KestrelServerLimits.RequestHeadersTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelServerLimits.RequestHeadersTimeout)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate)
* [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IConnectionTimeoutFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IConnectionTimeoutFeature)
* [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature)
* [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature)



**Applies to: < aspnetcore-6.0**

The Kestrel web server has constraint configuration options that are especially useful in Internet-facing deployments.

To provide more configuration after calling [Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults%252A), use [Microsoft.AspNetCore.Hosting.WebHostBuilderKestrelExtensions.ConfigureKestrel%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderKestrelExtensions.ConfigureKestrel%252A):

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.ConfigureKestrel(serverOptions =>
            {
                // Set properties and call methods on options
            })
            .UseStartup<Startup>();
        });
```

Set constraints on the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Limits](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Limits) property of the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions) class. The `Limits` property holds an instance of the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits) class.

The following examples use the [Microsoft.AspNetCore.Server.Kestrel.Core](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core) namespace:

```csharp
using Microsoft.AspNetCore.Server.Kestrel.Core;
```

> **Note:**
> [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions) and [endpoint configuration](endpoints.md) are configurable from configuration providers. Remaining Kestrel configuration must be configured in C# code.

## General limits

### Keep-alive timeout

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.KeepAliveTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.KeepAliveTimeout)

Gets or sets the [keep-alive timeout](https://www.rfc-editor.org/rfc/rfc9112.html#name-keep-alive-connections). Defaults to 2 minutes.

[language="csharp" source="samples/5.x/KestrelSample/Program.cs" id="snippet_Limits" highlight="19-20"::: (complete source file; reference: samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

### Maximum client connections

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentConnections](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentConnections)<br>
[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentUpgradedConnections](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentUpgradedConnections)

The maximum number of concurrent open TCP connections can be set for the entire app with the following code:

[language="csharp" source="samples/5.x/KestrelSample/Program.cs" id="snippet_Limits" highlight="3"::: (complete source file; reference: samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

There's a separate limit for connections that have been upgraded from HTTP or HTTPS to another protocol (for example, on a WebSockets request). After a connection is upgraded, it isn't counted against the `MaxConcurrentConnections` limit.

[language="csharp" source="samples/5.x/KestrelSample/Program.cs" id="snippet_Limits" highlight="4"::: (complete source file; reference: samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

The maximum number of connections is unlimited (null) by default.

### Maximum request body size

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize)

The default maximum request body size is 30,000,000 bytes, which is approximately 28.6 MB.

The recommended approach to override the limit in an ASP.NET Core MVC app is to use the [Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute) attribute on an action method:

```csharp
[RequestSizeLimit(100000000)]
public IActionResult MyActionMethod()
```

The following example shows how to configure the constraint for the app on every request:

[language="csharp" source="samples/5.x/KestrelSample/Program.cs" id="snippet_Limits" highlight="5"::: (complete source file; reference: samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

Override the setting on a specific request in middleware:

[language="csharp" source="samples/5.x/KestrelSample/Startup.cs" id="snippet_Limits" highlight="3-4"::: (complete source file; reference: samples/5.x/KestrelSample/Startup.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Startup.cs.md)

An exception is thrown if the app configures the limit on a request after the app has started to read the request. There's an `IsReadOnly` property that indicates if the `MaxRequestBodySize` property is in read-only state, meaning it's too late to configure the limit.

When an app runs [out-of-process](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23out-of-process-hosting-model) behind the [ASP.NET Core Module](../../../host-and-deploy/aspnet-core-module.md), Kestrel's request body size limit is disabled. IIS already sets the limit.

### Minimum request body data rate

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate)<br>
[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate)

Kestrel checks every second if data is arriving at the specified rate in bytes/second. If the rate drops below the minimum, the connection is timed out. The grace period is the amount of time Kestrel allows the client to increase its send rate up to the minimum. The rate isn't checked during that time. The grace period helps avoid dropping connections that are initially sending data at a slow rate because of TCP slow-start.

The default minimum rate is 240 bytes/second with a 5-second grace period.

A minimum rate also applies to the response. The code to set the request limit and the response limit is the same except for having `RequestBody` or `Response` in the property and interface names.

Here's an example that shows how to configure the minimum data rates in `Program.cs`:

[language="csharp" source="samples/5.x/KestrelSample/Program.cs" id="snippet_Limits" highlight="6-11"::: (complete source file; reference: samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

Override the minimum rate limits per request in middleware:

[language="csharp" source="samples/5.x/KestrelSample/Startup.cs" id="snippet_Limits" highlight="6-21"::: (complete source file; reference: samples/5.x/KestrelSample/Startup.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Startup.cs.md)

The [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature) referenced in the prior sample isn't present in [Microsoft.AspNetCore.Http.HttpContext.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Features) for HTTP/2 requests. Modifying rate limits on a per-request basis isn't generally supported for HTTP/2 because of the protocol's support for request multiplexing. However, the [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature) is still present `HttpContext.Features` for HTTP/2 requests, because the read rate limit can still be *disabled entirely* on a per-request basis by setting [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate) to `null` even for an HTTP/2 request. Attempting to read `IHttpMinRequestBodyDataRateFeature.MinDataRate` or attempting to set it to a value other than `null` will result in a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) being thrown given an HTTP/2 request.

Server-wide rate limits configured via [Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions.Limits](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions.Limits) still apply to both HTTP/1.x and HTTP/2 connections.

### Request headers timeout

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout)

Gets or sets the maximum amount of time the server spends receiving request headers. Defaults to 30 seconds.

[language="csharp" source="samples/5.x/KestrelSample/Program.cs" id="snippet_Limits" highlight="21-22"::: (complete source file; reference: samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

## HTTP/2 limits

The limits in this section are set on [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.Http2](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.Http2).

### Maximum streams per connection

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxStreamsPerConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxStreamsPerConnection)

Limits the number of concurrent request streams per HTTP/2 connection. Excess streams are refused.

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.MaxStreamsPerConnection = 100;
});
```

The default value is 100.

### Header table size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.HeaderTableSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.HeaderTableSize)

The HPACK decoder decompresses HTTP headers for HTTP/2 connections. `HeaderTableSize` limits the size of the header compression table that the HPACK decoder uses. The value is provided in octets and must be greater than zero (0).

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.HeaderTableSize = 4096;
});
```

The default value is 4096.

### Maximum frame size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxFrameSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxFrameSize)

Indicates the maximum allowed size of an HTTP/2 connection frame payload received or sent by the server. The value is provided in octets and must be between 2^14 (16,384) and 2^24-1 (16,777,215).

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.MaxFrameSize = 16384;
});
```

The default value is 2^14 (16,384).

### Maximum request header size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxRequestHeaderFieldSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxRequestHeaderFieldSize)

Indicates the maximum allowed size in octets of request header values. This limit applies to both name and value in their compressed and uncompressed representations. The value must be greater than zero (0).

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.MaxRequestHeaderFieldSize = 8192;
});
```

The default value is 8,192.

### Initial connection window size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialConnectionWindowSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialConnectionWindowSize)

Indicates the maximum request body data in bytes the server buffers at one time, aggregated across all requests (streams) per connection. Requests are also limited by `Http2.InitialStreamWindowSize`. The value must be greater than or equal to 65,535 and less than 2^31 (2,147,483,648).

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.InitialConnectionWindowSize = 131072;
});
```

The default value is 128 KB (131,072).

### Initial stream window size

[Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialStreamWindowSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialStreamWindowSize)

Indicates the maximum request body data in bytes the server buffers at one time per request (stream). Requests are also limited by [`InitialConnectionWindowSize`](#initial-connection-window-size). The value must be greater than or equal to 65,535 and less than 2^31 (2,147,483,648).

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.InitialStreamWindowSize = 98304;
});
```

The default value is 96 KB (98,304).

### HTTP/2 keep alive ping configuration

Kestrel can be configured to send HTTP/2 pings to connected clients. HTTP/2 pings serve multiple purposes:

* Keep idle connections alive. Some clients and proxy servers close connections that are idle. HTTP/2 pings are considered as activity on a connection and prevent the connection from being closed as idle.
* Close unhealthy connections. Connections where the client doesn't respond to the keep alive ping in the configured time are closed by the server.

There are two configuration options related to HTTP/2 keep alive pings:

* [Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingDelay](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingDelay) is a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) that configures the ping interval. The server sends a keep alive ping to the client if it doesn't receive any frames for this period of time. Keep alive pings are disabled when this option is set to [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue). The default value is [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue).
* [Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingTimeout) is a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) that configures the ping timeout. If the server doesn't receive any frames, such as a response ping, during this timeout then the connection is closed. Keep alive timeout is disabled when this option is set to [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue). The default value is 20 seconds.

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.KeepAlivePingDelay = TimeSpan.FromSeconds(30);
    serverOptions.Limits.Http2.KeepAlivePingTimeout = TimeSpan.FromSeconds(60);
});
```

## Other options

### Synchronous I/O

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.AllowSynchronousIO](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.AllowSynchronousIO) controls whether synchronous I/O is allowed for the request and response. The default value is `false`.

> **Warning:**
> A large number of blocking synchronous I/O operations can lead to thread pool starvation, which makes the app unresponsive. Only enable `AllowSynchronousIO` when using a library that doesn't support asynchronous I/O.

The following example enables synchronous I/O:

[language="csharp" source="samples/5.x/KestrelSample/Program.cs" id="snippet_SyncIO"::: (complete source file; reference: samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

For information about other Kestrel options and limits, see:

* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits)
* [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions)
