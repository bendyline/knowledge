---
title: Request decompression in ASP.NET Core
author: tdykstra
description: Learn how to use the request decompression middleware in ASP.NET Core
monikerRange: '>= aspnetcore-7.0'
ms.author: tdykstra
ms.date: 06/30/2026
uid: fundamentals/middleware/request-decompression
ai-usage: ai-assisted
---
# Request decompression in ASP.NET Core

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


By [David Acker](https://github.com/david-acker)

Request decompression middleware:

* Enables API endpoints to accept requests with compressed content.
* Uses the [`Content-Encoding`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Encoding) HTTP header to automatically identify and decompress requests which contain compressed content.
* Eliminates the need to write code to handle compressed requests.

When the `Content-Encoding` header value on a request matches one of the available decompression providers, the middleware:

* Uses the matching provider to wrap the [Microsoft.AspNetCore.Http.HttpRequest.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Body) in an appropriate decompression stream.
* Removes the `Content-Encoding` header, indicating that the request body is no longer compressed.

Requests that don't include a `Content-Encoding` header are ignored by the request decompression middleware.

Decompression:

* Occurs when the body of the request is read. That is, decompression occurs at the endpoint on model binding. The request body isn't decompressed eagerly.
**Applies to: \>= aspnetcore-7.0 < aspnetcore-11.0**

* When attempting to read the decompressed request body with invalid compressed data for the specified `Content-Encoding`, an exception is thrown. Brotli can throw [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException): Decoder ran into invalid data. Deflate and GZip can throw [System.IO.InvalidDataException](https://learn.microsoft.com/search/?terms=System.IO.InvalidDataException): The archive entry was compressed using an unsupported compression method.



**Applies to: \>= aspnetcore-11.0**

* When attempting to read the decompressed request body with invalid compressed data for the specified `Content-Encoding`, an exception is thrown. Brotli can throw [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException): Decoder ran into invalid data. Deflate, GZip, and Zstandard can throw [System.IO.InvalidDataException](https://learn.microsoft.com/search/?terms=System.IO.InvalidDataException): The archive entry was compressed using an unsupported compression method.



If the middleware encounters a request with compressed content but is unable to decompress it, the request is passed to the next delegate in the pipeline. For example, a request with an unsupported `Content-Encoding` header value or multiple `Content-Encoding` header values is passed to the next delegate in the pipeline.

## Configuration

The following code uses [Microsoft.Extensions.DependencyInjection.RequestDecompressionServiceExtensions.AddRequestDecompression(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RequestDecompressionServiceExtensions.AddRequestDecompression(Microsoft.Extensions.DependencyInjection.IServiceCollection)) and [Microsoft.AspNetCore.Builder.RequestDecompressionBuilderExtensions.UseRequestDecompression%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RequestDecompressionBuilderExtensions.UseRequestDecompression%252A) to enable request decompression for the [default](#default) `Content-Encoding` types:

[Code example (complete source file; reference: samples/request-decompression/7.x/Program.cs?name=snippet_WithDefaultProviders\&highlight=3,7)](../../../_code/aspnetcore/fundamentals/middleware/samples/request-decompression/7.x/Program.cs.md)

<a name="default"></a>

## Default decompression providers

The `Content-Encoding` header values that the request decompression middleware supports by default are listed in the following table:

**Applies to: \>= aspnetcore-7.0 < aspnetcore-11.0**

| [`Content-Encoding`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Encoding) header values | Description |
| --- | --- |
| `br` | [Brotli compressed data format](https://tools.ietf.org/html/rfc7932) |
| `deflate` | [DEFLATE compressed data format](https://tools.ietf.org/html/rfc1951) |
| `gzip` | [Gzip file format](https://tools.ietf.org/html/rfc1952) |



**Applies to: \>= aspnetcore-11.0**

| [`Content-Encoding`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Encoding) header values | Description |
| --- | --- |
| `br` | [Brotli compressed data format](https://tools.ietf.org/html/rfc7932) |
| `deflate` | [DEFLATE compressed data format](https://tools.ietf.org/html/rfc1951) |
| `gzip` | [Gzip file format](https://tools.ietf.org/html/rfc1952) |
| `zstd` | [Zstandard compressed data format](https://tools.ietf.org/html/rfc8878) |



## Custom decompression providers

Support for custom encodings can be added by creating custom decompression provider classes that implement [Microsoft.AspNetCore.RequestDecompression.IDecompressionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RequestDecompression.IDecompressionProvider):

[Code example (complete source file; reference: samples/request-decompression/7.x/CustomDecompressionProvider.cs?name=snippet_CustomDecompressionProvider)](../../../_code/aspnetcore/fundamentals/middleware/samples/request-decompression/7.x/CustomDecompressionProvider.cs.md)

Custom decompression providers are registered with [Microsoft.AspNetCore.RequestDecompression.RequestDecompressionOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RequestDecompression.RequestDecompressionOptions) along with their corresponding `Content-Encoding` header values:

[Code example (complete source file; reference: samples/request-decompression/7.x/Program.cs?name=snippet_WithCustomProvider\&highlight=3-6,10)](../../../_code/aspnetcore/fundamentals/middleware/samples/request-decompression/7.x/Program.cs.md)

## Request size limits

In order to protect against [zip bombs or decompression bombs](https://en.wikipedia.org/wiki/Zip_bomb):

* The maximum size of the decompressed request body is limited to the request body size limit enforced by the endpoint or server.
* If the number of bytes read from the decompressed request body stream exceeds the limit, an [InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) is thrown to prevent additional bytes from being read from the stream.

In order of precedence, the maximum request size for an endpoint is set by:

1. [Microsoft.AspNetCore.Http.Metadata.IRequestSizeLimitMetadata.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IRequestSizeLimitMetadata.MaxRequestBodySize), such as [Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute) or [Microsoft.AspNetCore.Mvc.DisableRequestSizeLimitAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DisableRequestSizeLimitAttribute) for MVC endpoints.
2. The global server size limit [Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.MaxRequestBodySize). `MaxRequestBodySize` can be overridden per request with [Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.MaxRequestBodySize), but defaults to the limit configured for the web server implementation.

| Web server implementation | `MaxRequestBodySize` configuration |
| --- | --- |
| [HTTP.sys](../servers/httpsys.md) | [Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.MaxRequestBodySize) |
| [IIS](../../host-and-deploy/iis/index.md) | [Microsoft.AspNetCore.Builder.IISServerOptions.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IISServerOptions.MaxRequestBodySize) |
| [Kestrel](../servers/kestrel.md) | [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize) |


> **Warning:**
> Disabling the request body size limit poses a security risk in regards to uncontrolled resource consumption, particularly if the request body is being buffered. Ensure that safeguards are in place to mitigate the risk of [denial-of-service](https://www.cisa.gov/uscert/ncas/tips/ST04-015) (DoS) attacks.

## Additional Resources

* [fundamentals/middleware/index](index.md)
* [Mozilla Developer Network: Content-Encoding](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Encoding)
* [Brotli Compressed Data Format](https://www.rfc-editor.org/rfc/rfc7932)
* [DEFLATE Compressed Data Format Specification version 1.3](https://www.rfc-editor.org/rfc/rfc1951)
* [GZIP file format specification version 4.3](https://www.rfc-editor.org/rfc/rfc1952)
* [RFC 8878: Zstandard Compression for HTTP](https://www.rfc-editor.org/rfc/rfc8878)
