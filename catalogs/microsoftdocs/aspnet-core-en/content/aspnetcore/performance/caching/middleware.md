---
title: Response caching middleware in ASP.NET Core
author: tdykstra
description: Learn how to configure and use response caching middleware in ASP.NET Core.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 1/1/2022
uid: performance/caching/middleware
---
# Response caching middleware in ASP.NET Core

By [John Luo](https://github.com/JunTaoLuo) and [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-6.0**

This article explains how to configure [response caching middleware](https://github.com/dotnet/aspnetcore/blob/main/src/Middleware/ResponseCaching/src/ResponseCachingMiddleware.cs) in an ASP.NET Core app. The middleware determines when responses are cacheable, stores responses, and serves responses from cache. For an introduction to HTTP caching and the [`[ResponseCache]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute) attribute, see [Response Caching](response.md).

The response caching middleware enables the caching of server responses based on [HTTP Cache-Control headers](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Cache-Control).

* Caching behavior implements standard HTTP caching semantics.

* Caching is based on HTTP cache headers similar to the method used by proxies.

* This form of caching is useful for public GET or HEAD API requests from clients where the [conditions for caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23cfc) are satisfied.

* For UI apps like Razor Pages, response caching isn't typically beneficial. Browsers commonly set request headers that prevent caching.

  [Output caching](output.md) (available in .NET 7 and later) is a better approach for UI apps. In this scenario, the configuration determines what to cache independent of HTTP headers.

To test response caching, use [Fiddler](https://www.telerik.com/fiddler) or another tool that can explicitly set request headers. Setting headers explicitly is preferred for testing caching. For more information, see [Response caching middleware > Troubleshooting](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23troubleshooting).

## Configuration

In `Program.cs`, add the response caching middleware services [Microsoft.Extensions.DependencyInjection.ResponseCachingServicesExtensions.AddResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ResponseCachingServicesExtensions.AddResponseCaching%252A) to the service collection and configure the app to use the middleware with the [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A) extension method. `UseResponseCaching` adds the middleware to the request processing pipeline:

[Code example (complete source file; reference: middleware/samples/6.x/ResponseCachingMiddleware/Program.cs?name=snippet2\&highlight=3,12)](../../../_code/aspnetcore/performance/caching/middleware/samples/6.x/ResponseCachingMiddleware/Program.cs.md)

> **Warning:**
> [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must be called before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A) when using [CORS middleware](../../security/cors.md).

The sample app adds headers to control caching on subsequent requests:

* [Cache-Control](https://www.rfc-editor.org/rfc/rfc9111#field.cache-control): Caches cacheable responses for up to 10 seconds.
* [Vary](https://www.rfc-editor.org/rfc/rfc9110#field.vary): Configures the middleware to serve a cached response only if the [Accept-Encoding](https://www.rfc-editor.org/rfc/rfc9110#field.accept-encoding) header of subsequent requests matches that of the original request.

[Code example (complete source file; reference: middleware/samples/6.x/ResponseCachingMiddleware/Program.cs?name=snippet1\&highlight=14-26)](../../../_code/aspnetcore/performance/caching/middleware/samples/6.x/ResponseCachingMiddleware/Program.cs.md)

The preceding headers are not written to the response and are overridden when a controller, action, or Razor Page:

* Has a [\[ResponseCache\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute) attribute. This applies even if a property isn't set. For example, omitting the [VaryByHeader](response.md#vary) property will cause the corresponding header to be removed from the response.

Response caching middleware only caches server responses that result in a 200 (OK) status code. Any other responses, including [error pages](../../fundamentals/error-handling.md), are ignored by the middleware.

> **Warning:**
> Responses containing content for authenticated clients must be marked as not cacheable to prevent the middleware from storing and serving those responses. See [Conditions for caching](#conditions-for-caching) for details on how the middleware determines if a response is cacheable.

The preceding code typically doesn't return a cached value to a browser. Use [Fiddler](https://www.telerik.com/fiddler) or another tool that can explicitly set request headers and is preferred for testing caching. For more information, see [Troubleshooting](#troubleshooting) in this article.

## Options

Response caching options are shown in the following table.

| Option | Description |
| --- | --- |
| [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize) | The largest cacheable size for the response body in bytes. The default value is `64 * 1024 * 1024` (64 MB). |
| [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit) | The size limit for the response cache middleware in bytes. The default value is `100 * 1024 * 1024` (100 MB). |
| [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.UseCaseSensitivePaths](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.UseCaseSensitivePaths) | Determines if responses are cached on case-sensitive paths. The default value is `false`. |

The following example configures the middleware to:

* Cache responses with a body size smaller than or equal to 1,024 bytes.
* Store the responses by case-sensitive paths. For example, `/page1` and `/Page1` are stored separately.

[Code example (complete source file; reference: middleware/samples/6.x/ResponseCachingMiddleware/Program.cs?name=snippet4\&highlight=3-7)](../../../_code/aspnetcore/performance/caching/middleware/samples/6.x/ResponseCachingMiddleware/Program.cs.md)

## VaryByQueryKeys

When using MVC, web API controllers, or Razor Pages page models, the [`[ResponseCache]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute) attribute specifies the parameters necessary for setting the appropriate headers for response caching. The only parameter of the `[ResponseCache]` attribute that strictly requires the middleware is [Microsoft.AspNetCore.Mvc.ResponseCacheAttribute.VaryByQueryKeys](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute.VaryByQueryKeys), which doesn't correspond to an actual HTTP header. For more information, see [performance/caching/response#responsecache-attribute](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fresponse%23responsecache-attribute).

When not using the `[ResponseCache]` attribute, response caching can be varied with `VaryByQueryKeys`. Use the [Microsoft.AspNetCore.ResponseCaching.ResponseCachingFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingFeature) directly from the [HttpContext.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Features):

```csharp
var responseCachingFeature = context.HttpContext.Features.Get<IResponseCachingFeature>();

if (responseCachingFeature != null)
{
    responseCachingFeature.VaryByQueryKeys = new[] { "MyKey" };
}
```

Using a single value equal to `*` in `VaryByQueryKeys` varies the cache by all request query parameters.

## HTTP headers used by response caching middleware

The following table provides information on HTTP headers that affect response caching.

| Header | Details |
| --- | --- |
| `Authorization` | The response isn't cached if the header exists. |
| `Cache-Control` | The middleware only considers caching responses marked with the `public` cache directive. Control caching with the following parameters:<ul><li>max-age</li><li>max-stale&#8224;</li><li>min-fresh</li><li>must-revalidate</li><li>no-cache</li><li>no-store</li><li>only-if-cached</li><li>private</li><li>public</li><li>s-maxage</li><li>proxy-revalidate&#8225;</li></ul>&#8224;If no limit is specified to `max-stale`, the middleware takes no action.<br>&#8225;`proxy-revalidate` has the same effect as `must-revalidate`.<br><br>For more information, see [RFC 9111: Request Directives](https://www.rfc-editor.org/rfc/rfc9111.html#name-request-directives). |
| `Pragma` | A `Pragma: no-cache` header in the request produces the same effect as `Cache-Control: no-cache`. This header is overridden by the relevant directives in the `Cache-Control` header, if present. Considered for backward compatibility with HTTP/1.0. |
| `Set-Cookie` | The response isn't cached if the header exists. Any middleware in the request processing pipeline that sets one or more cookies prevents the response caching middleware from caching the response (for example, the [cookie-based TempData provider](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata)). |
| `Vary` | The `Vary` header is used to vary the cached response by another header. For example, cache responses by encoding by including the `Vary: Accept-Encoding` header, which caches responses for requests with headers `Accept-Encoding: gzip` and `Accept-Encoding: text/plain` separately. A response with a header value of `*` is never stored. |
| `Expires` | A response deemed stale by this header isn't stored or retrieved unless overridden by other `Cache-Control` headers. |
| `If-None-Match` | The full response is served from cache if the value isn't `*` and the `ETag` of the response doesn't match any of the values provided. Otherwise, a 304 (Not Modified) response is served. |
| `If-Modified-Since` | If the `If-None-Match` header isn't present, a full response is served from cache if the cached response date is newer than the value provided. Otherwise, a *304 - Not Modified* response is served. |
| `Date` | When serving from cache, the `Date` header is set by the middleware if it wasn't provided on the original response. |
| `Content-Length` | When serving from cache, the `Content-Length` header is set by the middleware if it wasn't provided on the original response. |
| `Age` | The `Age` header sent in the original response is ignored. The middleware computes a new value when serving a cached response. |

## Caching respects request Cache-Control directives

The middleware respects the rules of [RFC 9111: HTTP Caching (Section 5.2. Cache-Control)](https://www.rfc-editor.org/rfc/rfc9111#field.cache-control). The rules require a cache to honor a valid `Cache-Control` header sent by the client. Under the specification, a client can make requests with a `no-cache` header value and force the server to generate a new response for every request. Currently, there's no developer control over this caching behavior when using the middleware because the middleware adheres to the official caching specification.

For more control over caching behavior, explore other caching features of ASP.NET Core. See the following topics:

* [performance/caching/memory](memory.md)
* [performance/caching/distributed](distributed.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)

## Troubleshooting

The [response caching middleware](https://github.com/dotnet/aspnetcore/blob/main/src/Middleware/ResponseCaching/src/ResponseCachingMiddleware.cs) uses [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache), which has a limited capacity. When the capacity is exceeded, the [memory cache is compacted (`TriggerOvercapacityCompaction`)](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Caching.Memory/src/MemoryCache.cs).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


If caching behavior isn't as expected, confirm that responses are cacheable and capable of being served from the cache. Examine the request's incoming headers and the response's outgoing headers. Enable [logging](../../fundamentals/logging/index.md) to help with debugging.

When testing and troubleshooting caching behavior, a browser typically sets request headers that prevent caching. For example, a browser may set the `Cache-Control` header to `no-cache` or `max-age=0` when refreshing a page. [Fiddler](https://www.telerik.com/fiddler) and other tools can explicitly set request headers and are preferred for testing caching.

<a name="cfc"></a>

### Conditions for caching

* The request must result in a server response with a 200 (OK) status code.
* The request method must be GET or HEAD.
* Response caching middleware must be placed before middleware that require caching. For more information, see [fundamentals/middleware/index](../../fundamentals/middleware/index.md).
* The `Authorization` header must not be present.
* `Cache-Control` header parameters must be valid, and the response must be marked `public` and not marked `private`.
* The `Pragma: no-cache` header must not be present if the `Cache-Control` header isn't present, as the `Cache-Control` header overrides the `Pragma` header when present.
* The `Set-Cookie` header must not be present.
* `Vary` header parameters must be valid and not equal to `*`.
* The `Content-Length` header value (if set) must match the size of the response body.
* The [Microsoft.AspNetCore.Http.Features.IHttpSendFileFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpSendFileFeature) isn't used.
* The response must not be stale as specified by the `Expires` header and the `max-age` and `s-maxage` cache directives.
* Response buffering must be successful. The size of the response must be smaller than the configured or default [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit). The body size of the response must be smaller than the configured or default [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize).
* The response must be cacheable according to [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111). For example, the `no-store` directive must not exist in request or response header fields. See [RFC 9111: HTTP Caching (Section 3: *Storing Responses in Caches*](https://www.rfc-editor.org/rfc/rfc9111#name-storing-responses-in-caches) for details.

> **Note:**
> The Antiforgery system for generating secure tokens to prevent Cross-Site Request Forgery (CSRF) attacks sets the `Cache-Control` and `Pragma` headers to `no-cache` so that responses aren't cached. For information on how to disable antiforgery tokens for HTML form elements, see [security/anti-request-forgery#aspnet-core-antiforgery-configuration](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23aspnet-core-antiforgery-configuration).

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/performance/caching/middleware/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [GitHub source for `IResponseCachingPolicyProvider`](https://github.com/dotnet/aspnetcore/blob/main/src/Middleware/ResponseCaching/src/Interfaces/IResponseCachingPolicyProvider.cs)
* [GitHub source for `IResponseCachingPolicyProvider`](https://github.com/dotnet/aspnetcore/blob/main/src/Middleware/ResponseCaching/src/Interfaces/IResponseCachingPolicyProvider.cs)
* [fundamentals/startup](../../fundamentals/startup.md)
* [fundamentals/middleware/index](../../fundamentals/middleware/index.md)
* [performance/caching/memory](memory.md)
* [performance/caching/distributed](distributed.md)
* [fundamentals/change-tokens](../../fundamentals/change-tokens.md)
* [performance/caching/response](response.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)



**Applies to: < aspnetcore-6.0**

This article explains how to configure response caching middleware in an ASP.NET Core app. The middleware determines when responses are cacheable, stores responses, and serves responses from cache. For an introduction to HTTP caching and the [`[ResponseCache]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute) attribute, see [Response Caching](response.md).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/performance/caching/middleware/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Configuration

Response caching middleware is implicitly available for ASP.NET Core apps via the shared framework.

In `Startup.ConfigureServices`, add the response caching middleware to the service collection:

[Code example (complete source file; reference: middleware/samples/3.x/ResponseCachingMiddleware/Startup.cs?name=snippet1\&highlight=3)](../../../_code/aspnetcore/performance/caching/middleware/samples/3.x/ResponseCachingMiddleware/Startup.cs.md)

Configure the app to use the middleware with the [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*) extension method, which adds the middleware to the request processing pipeline in `Startup.Configure`:

[Code example (complete source file; reference: middleware/samples/3.x/ResponseCachingMiddleware/Startup.cs?name=snippet2\&highlight=17)](../../../_code/aspnetcore/performance/caching/middleware/samples/3.x/ResponseCachingMiddleware/Startup.cs.md)

> **Warning:**
> [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must be called before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A) when using [CORS middleware](../../security/cors.md).

The sample app adds headers to control caching on subsequent requests:

* [Cache-Control](https://www.rfc-editor.org/rfc/rfc9111#field.cache-control): Caches cacheable responses for up to 10 seconds.
* [Vary](https://www.rfc-editor.org/rfc/rfc9110#field.vary): Configures the middleware to serve a cached response only if the [Accept-Encoding](https://www.rfc-editor.org/rfc/rfc9110#field.accept-encoding) header of subsequent requests matches that of the original request.

[Code example (complete source file; reference: middleware/samples_snippets/3.x/AddHeaders.cs)](../../../_code/aspnetcore/performance/caching/middleware/samples_snippets/3.x/AddHeaders.cs.md)

The preceding headers are not written to the response and are overridden when a controller, action, or Razor Page:

* Has a [\[ResponseCache\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute) attribute. This applies even if a property isn't set. For example, omitting the [VaryByHeader](response.md#vary) property will cause the corresponding header to be removed from the response.

Response caching middleware only caches server responses that result in a 200 (OK) status code. Any other responses, including [error pages](../../fundamentals/error-handling.md), are ignored by the middleware.

> **Warning:**
> Responses containing content for authenticated clients must be marked as not cacheable to prevent the middleware from storing and serving those responses. See [Conditions for caching](#conditions-for-caching) for details on how the middleware determines if a response is cacheable.

## Options

Response caching options are shown in the following table.

| Option | Description |
| --- | --- |
| [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize) | The largest cacheable size for the response body in bytes. The default value is `64 * 1024 * 1024` (64 MB). |
| [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit) | The size limit for the response cache middleware in bytes. The default value is `100 * 1024 * 1024` (100 MB). |
| [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.UseCaseSensitivePaths](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.UseCaseSensitivePaths) | Determines if responses are cached on case-sensitive paths. The default value is `false`. |

The following example configures the middleware to:

* Cache responses with a body size smaller than or equal to 1,024 bytes.
* Store the responses by case-sensitive paths. For example, `/page1` and `/Page1` are stored separately.

```csharp
services.AddResponseCaching(options =>
{
    options.MaximumBodySize = 1024;
    options.UseCaseSensitivePaths = true;
});
```

## VaryByQueryKeys

When using MVC / web API controllers or Razor Pages page models, the [`[ResponseCache]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute) attribute specifies the parameters necessary for setting the appropriate headers for response caching. The only parameter of the `[ResponseCache]` attribute that strictly requires the middleware is [Microsoft.AspNetCore.Mvc.ResponseCacheAttribute.VaryByQueryKeys](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ResponseCacheAttribute.VaryByQueryKeys), which doesn't correspond to an actual HTTP header. For more information, see [performance/caching/response#responsecache-attribute](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fresponse%23responsecache-attribute).

When not using the `[ResponseCache]` attribute, response caching can be varied with `VaryByQueryKeys`. Use the [Microsoft.AspNetCore.ResponseCaching.ResponseCachingFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingFeature) directly from the [HttpContext.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Features):

```csharp
var responseCachingFeature = context.HttpContext.Features.Get<IResponseCachingFeature>();

if (responseCachingFeature != null)
{
    responseCachingFeature.VaryByQueryKeys = new[] { "MyKey" };
}
```

Using a single value equal to `*` in `VaryByQueryKeys` varies the cache by all request query parameters.

## HTTP headers used by response caching middleware

The following table provides information on HTTP headers that affect response caching.

| Header | Details |
| --- | --- |
| `Authorization` | The response isn't cached if the header exists. |
| `Cache-Control` | The middleware only considers caching responses marked with the `public` cache directive. Control caching with the following parameters:<ul><li>max-age</li><li>max-stale&#8224;</li><li>min-fresh</li><li>must-revalidate</li><li>no-cache</li><li>no-store</li><li>only-if-cached</li><li>private</li><li>public</li><li>s-maxage</li><li>proxy-revalidate&#8225;</li></ul>&#8224;If no limit is specified to `max-stale`, the middleware takes no action.<br>&#8225;`proxy-revalidate` has the same effect as `must-revalidate`.<br><br>For more information, see [RFC 9111: Request Directives](https://www.rfc-editor.org/rfc/rfc9111.html#name-request-directives). |
| `Pragma` | A `Pragma: no-cache` header in the request produces the same effect as `Cache-Control: no-cache`. This header is overridden by the relevant directives in the `Cache-Control` header, if present. Considered for backward compatibility with HTTP/1.0. |
| `Set-Cookie` | The response isn't cached if the header exists. Any middleware in the request processing pipeline that sets one or more cookies prevents the response caching middleware from caching the response (for example, the [cookie-based TempData provider](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata)). |
| `Vary` | The `Vary` header is used to vary the cached response by another header. For example, cache responses by encoding by including the `Vary: Accept-Encoding` header, which caches responses for requests with headers `Accept-Encoding: gzip` and `Accept-Encoding: text/plain` separately. A response with a header value of `*` is never stored. |
| `Expires` | A response deemed stale by this header isn't stored or retrieved unless overridden by other `Cache-Control` headers. |
| `If-None-Match` | The full response is served from cache if the value isn't `*` and the `ETag` of the response doesn't match any of the values provided. Otherwise, a 304 (Not Modified) response is served. |
| `If-Modified-Since` | If the `If-None-Match` header isn't present, a full response is served from cache if the cached response date is newer than the value provided. Otherwise, a *304 - Not Modified* response is served. |
| `Date` | When serving from cache, the `Date` header is set by the middleware if it wasn't provided on the original response. |
| `Content-Length` | When serving from cache, the `Content-Length` header is set by the middleware if it wasn't provided on the original response. |
| `Age` | The `Age` header sent in the original response is ignored. The middleware computes a new value when serving a cached response. |

## Caching respects request Cache-Control directives

The middleware respects the rules of [RFC 9111: HTTP Caching (Section 5.2. Cache-Control)](https://www.rfc-editor.org/rfc/rfc9111#field.cache-control). The rules require a cache to honor a valid `Cache-Control` header sent by the client. Under the specification, a client can make requests with a `no-cache` header value and force the server to generate a new response for every request. Currently, there's no developer control over this caching behavior when using the middleware because the middleware adheres to the official caching specification.

For more control over caching behavior, explore other caching features of ASP.NET Core. See the following topics:

* [performance/caching/memory](memory.md)
* [performance/caching/distributed](distributed.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)

## Troubleshooting

If caching behavior isn't as expected, confirm that responses are cacheable and capable of being served from the cache. Examine the request's incoming headers and the response's outgoing headers. Enable [logging](../../fundamentals/logging/index.md) to help with debugging.

When testing and troubleshooting caching behavior, a browser may set request headers that affect caching in undesirable ways. For example, a browser may set the `Cache-Control` header to `no-cache` or `max-age=0` when refreshing a page. The following tools can explicitly set request headers and are preferred for testing caching:

* [Fiddler](https://www.telerik.com/fiddler)

### Conditions for caching

* The request must result in a server response with a 200 (OK) status code.
* The request method must be GET or HEAD.
* In `Startup.Configure`, response caching middleware must be placed before middleware that require caching. For more information, see [fundamentals/middleware/index](../../fundamentals/middleware/index.md).
* The `Authorization` header must not be present.
* `Cache-Control` header parameters must be valid, and the response must be marked `public` and not marked `private`.
* The `Pragma: no-cache` header must not be present if the `Cache-Control` header isn't present, as the `Cache-Control` header overrides the `Pragma` header when present.
* The `Set-Cookie` header must not be present.
* `Vary` header parameters must be valid and not equal to `*`.
* The `Content-Length` header value (if set) must match the size of the response body.
* The [Microsoft.AspNetCore.Http.Features.IHttpSendFileFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpSendFileFeature) isn't used.
* The response must not be stale as specified by the `Expires` header and the `max-age` and `s-maxage` cache directives.
* Response buffering must be successful. The size of the response must be smaller than the configured or default [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.SizeLimit). The body size of the response must be smaller than the configured or default [Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ResponseCaching.ResponseCachingOptions.MaximumBodySize).
* The response must be cacheable according to [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111). For example, the `no-store` directive must not exist in request or response header fields. See [RFC 9111: HTTP Caching (Section 3: *Storing Responses in Caches*](https://www.rfc-editor.org/rfc/rfc9111#name-storing-responses-in-caches) for details.

> **Note:**
> The Antiforgery system for generating secure tokens to prevent Cross-Site Request Forgery (CSRF) attacks sets the `Cache-Control` and `Pragma` headers to `no-cache` so that responses aren't cached. For information on how to disable antiforgery tokens for HTML form elements, see [security/anti-request-forgery#aspnet-core-antiforgery-configuration](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23aspnet-core-antiforgery-configuration).

## Additional resources

* [fundamentals/startup](../../fundamentals/startup.md)
* [fundamentals/middleware/index](../../fundamentals/middleware/index.md)
* [performance/caching/memory](memory.md)
* [performance/caching/distributed](distributed.md)
* [fundamentals/change-tokens](../../fundamentals/change-tokens.md)
* [performance/caching/response](response.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)
