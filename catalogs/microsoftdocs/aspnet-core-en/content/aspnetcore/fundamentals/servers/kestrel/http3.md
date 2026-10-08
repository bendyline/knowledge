---
title: Use HTTP/3 with the ASP.NET Core Kestrel web server
ai-usage: ai-assisted
author: wtgodbe
description: "HTTP/3 support in Kestrel: Discover how to configure ASP.NET Core for HTTP/3, improve performance, and optimize your web server setup."
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 04/14/2026
uid: fundamentals/servers/kestrel/http3
---

# Use HTTP/3 with the ASP.NET Core Kestrel web server

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


**Applies to: \>= aspnetcore-11.0**

[HTTP/3](https://datatracker.ietf.org/doc/rfc9114/) is an approved standard and the third major version of HTTP. This article discusses the requirements for HTTP/3. HTTP/3 is fully supported in .NET 7 or later.

> **Important:**
> Apps configured to take advantage of HTTP/3 should be designed to also support HTTP/1.1 and HTTP/2.

## HTTP/3 benefits

`HTTP/3`:

* Is the latest version of the Hypertext Transfer Protocol.
* Builds on the strengths of `HTTP/2` while addressing some of its limitations, particularly in terms of performance, latency, reliability, and security.

| Feature | `HTTP/2` | `HTTP/3` |
| --- | --- | --- |
| Transport | Uses [TCP](https://developer.mozilla.org/docs/Glossary/TCP) | Uses [QUIC](https://www.rfc-editor.org/rfc/rfc9000.html) |
| Connection | Slower due to TCP + TLS | Combines transport and encryption handshakes |
| Setup | handshake | handshakes |
| Head-of-Line | Affected by TCP-level | Eliminated with QUIC |
| Blocking | blocking | stream multiplexing |
| Encryption | TLS over TCP | TLS is built into QUIC |

The key differences from `HTTP/2` to `HTTP/3` are:

* **Transport Protocol**: `HTTP/3` uses QUIC instead of TCP. QUIC offers improved performance, lower latency, and better reliability, especially on mobile and lossy networks.
* **Head-of-Line Blocking**: `HTTP/2` can suffer from head-of-line blocking at the TCP level, where a delay in one stream can affect others. `HTTP/3`, with QUIC, provides independent streams, so packet loss in one stream doesn't stall others.
* **Connection Establishment**: `HTTP/3` with QUIC can establish connections faster, as it combines transport and encryption handshakes.
* **Encryption**: `HTTP/3` mandates TLS 1.3 encryption, providing enhanced security by default, whereas it's optional in `HTTP/2`.
* **Multiplexing**: While both support multiplexing, `HTTP/3`'s implementation with QUIC is more efficient and avoids the TCP-level head-of-line blocking issues.
* **Connection Migration**: QUIC in `HTTP/3` allows connections to persist even when a client's IP address changes (like switching from Wi-Fi to cellular), improving mobile user experience.

## Early request processing

Kestrel can process HTTP/3 requests without first waiting for the control stream and the initial SETTINGS frame. This optimization reduces first-request latency on new HTTP/3 connections.

In ASP.NET Core versions earlier than .NET 11, Kestrel waited to receive the QUIC control stream and its initial SETTINGS frame before processing any request streams. This requirement is no longer necessary, which means the first request on a new connection completes faster.

## HTTP/3 requirements

HTTP/3 uses QUIC as its transport protocol. The ASP.NET Core implementation of HTTP/3 depends on [MsQuic](https://github.com/microsoft/msquic) to provide QUIC functionality. As a result, ASP.NET Core support of HTTP/3 depends on MsQuic platform requirements. For more information on how to install **MsQuic**, see [QUIC Platform dependencies](https://learn.microsoft.com/dotnet/fundamentals/networking/quic/quic-overview#platform-dependencies). If the platform that Kestrel is running on doesn't have all the requirements for HTTP/3, Kestrel disables HTTP/3 and falls back to other HTTP protocols.

## Getting started

HTTP/3 isn't enabled by default. Add configuration to `Program.cs` to enable HTTP/3.

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Http3" highlight="7-8"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The preceding code configures port 5001 to:

* Use HTTP/3 alongside HTTP/1.1 and HTTP/2 by specifying `HttpProtocols.Http1AndHttp2AndHttp3`.
* Enable HTTPS by using `UseHttps`. HTTP/3 requires HTTPS.

Because not all routers, firewalls, and proxies properly support HTTP/3, configure HTTP/3 together with HTTP/1.1 and HTTP/2. Specify [`HttpProtocols.Http1AndHttp2AndHttp3`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http1AndHttp2AndHttp3) as an endpoint's supported protocols.

For more information, see [fundamentals/servers/kestrel/endpoints](endpoints.md).

## Configure QuicTransportOptions

Configure QUIC transport options by calling the [Microsoft.AspNetCore.Hosting.WebHostBuilderQuicExtensions.UseQuic%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderQuicExtensions.UseQuic%252A) extension method on [Microsoft.AspNetCore.Hosting.IWebHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostBuilder).

[language="csharp" source="samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_UseQuicWithOptions" highlight="3-8"::: (complete source file; reference: samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The following table describes the available [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions).

| Option | Default | Description |
| --- | --- | --- |
| [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxBidirectionalStreamCount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxBidirectionalStreamCount) | `100` | The maximum number of concurrent bidirectional streams per connection. |
| [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxUnidirectionalStreamCount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxUnidirectionalStreamCount) | `10` | The maximum number of concurrent inbound unidirectional streams per connection. |
| [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxReadBufferSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxReadBufferSize) | `1024 * 1024` (1 MB) | The maximum read buffer size in bytes. |
| [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxWriteBufferSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxWriteBufferSize) | `64 * 1024` (64 KB) | The maximum write buffer size in bytes. |
| [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.Backlog](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.Backlog) | `512` | The maximum length of the pending connection queue. |
| [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.DefaultStreamErrorCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.DefaultStreamErrorCode) | `0x010c` (H3_REQUEST_CANCELLED) | Error code used when the stream should abort the read or write side of the stream internally. |
| [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.DefaultCloseErrorCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.DefaultCloseErrorCode) | `0x100` (H3_NO_ERROR) | Error code used when an open connection is disposed. |


## Alt-svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the [`alt-svc`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Alt-Svc) header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. Kestrel automatically adds the `alt-svc` header if HTTP/3 is enabled.

## Localhost testing

* Browsers don't support self-signed certificates on HTTP/3, such as the Kestrel development certificate.
* Use `HttpClient` for localhost or loopback testing in .NET 6 or later. When you use `HttpClient` to make an HTTP/3 request, you need extra configuration:

  * Set [`HttpRequestMessage.Version`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) to 3.0, or
  * Set [`HttpRequestMessage.VersionPolicy`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.VersionPolicy) to [`HttpVersionPolicy.RequestVersionOrHigher`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpVersionPolicy.RequestVersionOrHigher).

For more information about how to use HTTP/3 with `HttpClient`, see [HTTP/3 with .NET](https://learn.microsoft.com/dotnet/core/extensions/httpclient-http3).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

[HTTP/3](https://datatracker.ietf.org/doc/rfc9114/) is an approved standard and the third major version of HTTP. This article discusses the requirements for HTTP/3. HTTP/3 is fully supported in .NET 7 or later.

> **Important:**
> Apps configured to take advantage of HTTP/3 should be designed to also support HTTP/1.1 and HTTP/2.

## HTTP/3 benefits

`HTTP/3`:

* Is the latest version of the Hypertext Transfer Protocol.
* Builds on the strengths of `HTTP/2` while addressing some of its limitations, particularly in terms of performance, latency, reliability, and security.

| Feature | `HTTP/2` | `HTTP/3` |
| --- | --- | --- |
| Transport | Uses [TCP](https://developer.mozilla.org/docs/Glossary/TCP) | Uses [QUIC](https://www.rfc-editor.org/rfc/rfc9000.html) |
| Connection | Slower due to TCP + TLS | Combines transport and encryption handshakes |
| Setup | handshake | handshakes |
| Head-of-Line | Affected by TCP-level | Eliminated with QUIC |
| Blocking | blocking | stream multiplexing |
| Encryption | TLS over TCP | TLS is built into QUIC |

The key differences from `HTTP/2` to `HTTP/3` are:

* **Transport Protocol**: `HTTP/3` uses QUIC instead of TCP. QUIC offers improved performance, lower latency, and better reliability, especially on mobile and lossy networks.
* **Head-of-Line Blocking**: `HTTP/2` can suffer from head-of-line blocking at the TCP level, where a delay in one stream can affect others. `HTTP/3`, with QUIC, provides independent streams, so packet loss in one stream doesn't stall others.
* **Connection Establishment**: `HTTP/3` with QUIC can establish connections faster, as it combines transport and encryption handshakes.
* **Encryption**: `HTTP/3` mandates TLS 1.3 encryption, providing enhanced security by default, whereas it's optional in `HTTP/2`.
* **Multiplexing**: While both support multiplexing, `HTTP/3`'s implementation with QUIC is more efficient and avoids the TCP-level head-of-line blocking issues.
* **Connection Migration**: QUIC in `HTTP/3` allows connections to persist even when a client's IP address changes (like switching from Wi-Fi to cellular), improving mobile user experience.

## HTTP/3 requirements

HTTP/3 uses QUIC as its transport protocol. The ASP.NET Core implementation of HTTP/3 depends on [MsQuic](https://github.com/microsoft/msquic) to provide QUIC functionality. As a result, ASP.NET Core support of HTTP/3 depends on MsQuic platform requirements. For more information on how to install **MsQuic**, see [QUIC Platform dependencies](https://learn.microsoft.com/dotnet/fundamentals/networking/quic/quic-overview#platform-dependencies). If the platform that Kestrel is running on doesn't have all the requirements for HTTP/3, then it's disabled, and Kestrel will fall back to other HTTP protocols.

## Getting started

HTTP/3 is not enabled by default. Add configuration to `Program.cs` to enable HTTP/3.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Http3" highlight="7-8"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The preceding code configures port 5001 to:

* Use HTTP/3 alongside HTTP/1.1 and HTTP/2 by specifying `HttpProtocols.Http1AndHttp2AndHttp3`.
* Enable HTTPS with `UseHttps`. HTTP/3 requires HTTPS.

Because not all routers, firewalls, and proxies properly support HTTP/3, HTTP/3 should be configured together with HTTP/1.1 and HTTP/2. This can be done by specifying [`HttpProtocols.Http1AndHttp2AndHttp3`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http1AndHttp2AndHttp3) as an endpoint's supported protocols.

For more information, see [fundamentals/servers/kestrel/endpoints](endpoints.md).

## Configure QuicTransportOptions

QUIC transport options can be configured by calling the [Microsoft.AspNetCore.Hosting.WebHostBuilderQuicExtensions.UseQuic%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderQuicExtensions.UseQuic%252A) extension method on [Microsoft.AspNetCore.Hosting.IWebHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostBuilder).

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_UseQuicWithOptions" highlight="3-8"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

For the full list of available QUIC transport options and their descriptions, see [Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions).

## Alt-svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the [`alt-svc`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Alt-Svc) header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. Kestrel automatically adds the `alt-svc` header if HTTP/3 is enabled.

## Localhost testing

* Browsers don't allow self-signed certificates on HTTP/3, such as the Kestrel development certificate.
* `HttpClient` can be used for localhost/loopback testing in .NET 6 or later. Extra configuration is required when using `HttpClient` to make an HTTP/3 request:

  * Set [`HttpRequestMessage.Version`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) to 3.0, or
  * Set [`HttpRequestMessage.VersionPolicy`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.VersionPolicy) to [`HttpVersionPolicy.RequestVersionOrHigher`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpVersionPolicy.RequestVersionOrHigher).

For more information on how to use HTTP/3 with `HttpClient`, see [HTTP/3 with .NET](https://learn.microsoft.com/dotnet/core/extensions/httpclient-http3).




**Applies to: \= aspnetcore-7.0**

[HTTP/3](https://datatracker.ietf.org/doc/rfc9114/) is a proposed standard and the third major version of HTTP. This article discusses requirements for HTTP/3. HTTP/3 is fully supported in .NET 7 or later.

> **Important:**
> Apps configured to take advantage of HTTP/3 should be designed to also support HTTP/1.1 and HTTP/2.

## HTTP/3 requirements

HTTP/3 has different requirements depending on the operating system. If the platform that Kestrel is running on doesn't have all the requirements for HTTP/3 then it's disabled, and Kestrel will fallback to other HTTP protocols.

### Windows

* Windows 11 Build 22000 or later OR Windows Server 2022.
* TLS 1.3 or later connection.

### Linux

* `libmsquic` package installed.

`libmsquic` is published via Microsoft's official Linux package repository at `packages.microsoft.com`. To install this package:

1. Add the `packages.microsoft.com` repository. See [Linux Software Repository for Microsoft Products](https://learn.microsoft.com/windows-server/administration/linux-package-repository-for-microsoft-software) for instructions.
2. Install the `libmsquic` package using the distro's package manager. For example, `apt install libmsquic=1.9*` on Ubuntu.

**Note:** .NET 6 is only compatible with the 1.9.x versions of libmsquic. Libmsquic 2.x is not compatible due to breaking changes. Libmsquic receives updates to 1.9.x when needed to incorporate security fixes.  

### macOS

HTTP/3 isn't currently supported on macOS and may be available in a future release.

## Getting started

HTTP/3 is not enabled by default. Add configuration to `Program.cs` to enable HTTP/3.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Http3" highlight="7-8"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The preceding code configures port 5001 to:

* Use HTTP/3 alongside HTTP/1.1 and HTTP/2 by specifying `HttpProtocols.Http1AndHttp2AndHttp3`.
* Enable HTTPS with `UseHttps`. HTTP/3 requires HTTPS.

Because not all routers, firewalls, and proxies properly support HTTP/3, HTTP/3 should be configured together with HTTP/1.1 and HTTP/2. This can be done by specifying [`HttpProtocols.Http1AndHttp2AndHttp3`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http1AndHttp2AndHttp3) as an endpoint's supported protocols.

For more information, see [fundamentals/servers/kestrel/endpoints](endpoints.md).

## Alt-svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the [`alt-svc`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Alt-Svc) header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. Kestrel automatically adds the `alt-svc` header if HTTP/3 is enabled.

## Localhost testing

* Browsers don't allow self-signed certificates on HTTP/3 such as the Kestrel development certificate.
* `HttpClient` can be used for localhost/loopback testing in .NET 6 or later. Extra configuration is required when using `HttpClient` to make an HTTP/3 request:

  * Set [`HttpRequestMessage.Version`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) to 3.0, or
  * Set [`HttpRequestMessage.VersionPolicy`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.VersionPolicy) to [`HttpVersionPolicy.RequestVersionOrHigher`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpVersionPolicy.RequestVersionOrHigher).

## HTTP/3 benefits

HTTP/3 uses the same semantics as HTTP/1.1 and HTTP/2: the same request methods, status codes, and message fields apply to all versions. The differences are in the underlying transport. Both HTTP/1.1 and HTTP/2 use TCP as their transport. HTTP/3 uses a new transport technology developed alongside HTTP/3 called [QUIC](https://datatracker.ietf.org/doc/html/draft-ietf-quic-transport-34).

HTTP/3 and QUIC have a number of benefits compared to HTTP/1.1 and HTTP/2:

* Faster response time of the first request. QUIC and HTTP/3 negotiates the connection in fewer round-trips between the client and the server. The first request reaches the server faster.
* Improved experience when there is connection packet loss. HTTP/2 multiplexes multiple requests via one TCP connection. Packet loss on the connection affects all requests. This problem is called "head-of-line blocking". Because QUIC provides native multiplexing, lost packets only impact the requests where data has been lost.
* Supports transitioning between networks. This feature is useful for mobile devices where it is common to switch between WIFI and cellular networks as a mobile device changes location. Currently HTTP/1.1 and HTTP/2 connections fail with an error when switching networks. An app or web browsers must retry any failed HTTP requests. HTTP/3 allows the app or web browser to seamlessly continue when a network changes. Kestrel doesn't support network transitions in .NET 6. It may be available in a future release.



**Applies to: \= aspnetcore-6.0**

[HTTP/3](https://datatracker.ietf.org/doc/rfc9114/) is the third and upcoming major version of HTTP. This article discusses requirements for HTTP/3 and how to configure Kestrel to use it.

> **Important:**
> HTTP/3 is available in .NET 6 as a *preview feature*. The HTTP/3 specification isn't finalized and behavioral or performance issues may exist in HTTP/3 with .NET 6.
> 
> For more information on preview feature support, see [the preview features supported section](https://github.com/dotnet/designs/blob/main/accepted/2021/preview-features/preview-features.md#are-preview-features-supported).
>
> Apps configured to take advantage of HTTP/3 should be designed to also support HTTP/1.1 and HTTP/2. If issues are identified in HTTP/3, we recommend disabling HTTP/3 until the issues are resolved in a future release of ASP.NET Core. Significant issues are reported at the [Announcements GitHub repository](https://github.com/aspnet/Announcements/issues).

## HTTP/3 requirements

HTTP/3 has different requirements depending on the operating system. If the platform that Kestrel is running on doesn't have all the requirements for HTTP/3 then it's disabled, and Kestrel will fallback to other HTTP protocols.

### Windows

* Windows 11 Build 22000 or later OR Windows Server 2022.
* TLS 1.3 or later connection.

### Linux

* `libmsquic` package installed.

`libmsquic` is published via Microsoft's official Linux package repository at `packages.microsoft.com`. To install this package:

1. Add the `packages.microsoft.com` repository. See [Linux Software Repository for Microsoft Products](https://learn.microsoft.com/windows-server/administration/linux-package-repository-for-microsoft-software) for instructions.
2. Install the `libmsquic` package using the distro's package manager. For example, `apt install libmsquic=1.9*` on Ubuntu.

**Note:** .NET 6 is only compatible with the 1.9.x versions of libmsquic. Libmsquic 2.x is not compatible due to breaking changes. Libmsquic receives updates to 1.9.x when needed to incorporate security fixes.  

### macOS

HTTP/3 isn't currently supported on macOS and may be available in a future release.

## Getting started

HTTP/3 is not enabled by default. Add configuration to `Program.cs` to enable HTTP/3.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Http3" highlight="7-8"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The preceding code configures port 5001 to:

* Use HTTP/3 alongside HTTP/1.1 and HTTP/2 by specifying `HttpProtocols.Http1AndHttp2AndHttp3`.
* Enable HTTPS with `UseHttps`. HTTP/3 requires HTTPS.

Because not all routers, firewalls, and proxies properly support HTTP/3, HTTP/3 should be configured together with HTTP/1.1 and HTTP/2. This can be done by specifying `HttpProtocols.Http1AndHttp2AndHttp3` as an endpoint's supported protocols.

For more information, see [fundamentals/servers/kestrel/endpoints](endpoints.md).

## Alt-svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the `alt-svc` header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. Kestrel automatically adds the `alt-svc` header if HTTP/3 is enabled.

## Localhost testing

* Browsers don't allow self-signed certificates on HTTP/3 such as the Kestrel development certificate.
* `HttpClient` can be used for localhost/loopback testing in .NET 6 or later. Extra configuration is required when using `HttpClient` to make an HTTP/3 request:

  * Set `HttpRequestMessage.Version` to 3.0, or
  * Set `HttpRequestMessage.VersionPolicy` to `HttpVersionPolicy.RequestVersionOrHigher`.

## Limitations

Some HTTPS scenarios are not yet supported for HTTP/3 in Kestrel. When calling `Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps` with [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions) while using HTTP/3, setting the following options on the [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions) is a no-op (it does nothing):
* [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.HandshakeTimeout)
* [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.OnAuthenticate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.OnAuthenticate)

Calling the following implementations of `Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps` throw an error when using HTTP/3:

* [UseHttps(this ListenOptions listenOptions, ServerOptionsSelectionCallback serverOptionsSelectionCallback, object state, TimeSpan handshakeTimeout)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps\(Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions%2CSystem.Net.Security.ServerOptionsSelectionCallback%2CSystem.Object%2CSystem.TimeSpan\))
* [UseHttps(this ListenOptions listenOptions, TlsHandshakeCallbackOptions callbackOptions)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps\(Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions%2CMicrosoft.AspNetCore.Server.Kestrel.Https.TlsHandshakeCallbackOptions\))

## HTTP/3 benefits

HTTP/3 uses the same semantics as HTTP/1.1 and HTTP/2: the same request methods, status codes, and message fields apply to all versions. The differences are in the underlying transport. Both HTTP/1.1 and HTTP/2 use TCP as their transport. HTTP/3 uses a new transport technology developed alongside HTTP/3 called [QUIC](https://datatracker.ietf.org/doc/html/draft-ietf-quic-transport-34).

HTTP/3 and QUIC have a number of benefits compared to HTTP/1.1 and HTTP/2:

* Faster response time of the first request. QUIC and HTTP/3 negotiates the connection in fewer round-trips between the client and the server. The first request reaches the server faster.
* Improved experience when there is connection packet loss. HTTP/2 multiplexes multiple requests via one TCP connection. Packet loss on the connection affects all requests. This problem is called "head-of-line blocking". Because QUIC provides native multiplexing, lost packets only impact the requests where data has been lost.
* Supports transitioning between networks. This feature is useful for mobile devices where it is common to switch between WIFI and cellular networks as a mobile device changes location. Currently HTTP/1.1 and HTTP/2 connections fail with an error when switching networks. An app or web browsers must retry any failed HTTP requests. HTTP/3 allows the app or web browser to seamlessly continue when a network changes. Kestrel doesn't support network transitions in .NET 6. It may be available in a future release.
