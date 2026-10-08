---
title: Use HttpContext in ASP.NET Core
author: jamesnk
description: How to use HttpContext in ASP.NET Core.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 07/09/2025
uid: fundamentals/use-httpcontext
---
<!-- ms.sfi.ropc: t -->

# Use HttpContext in ASP.NET Core

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


[Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) encapsulates all information about an individual HTTP request and response. An `HttpContext` instance is initialized when an HTTP request is received. The `HttpContext` instance is accessible by middleware and app frameworks such as Blazor Web Apps, Web API controllers, Razor Pages, SignalR, gRPC, and more.

## `HttpRequest`

[Microsoft.AspNetCore.Http.HttpContext.Request](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Request) provides access to [Microsoft.AspNetCore.Http.HttpRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest). `HttpRequest` has information about the incoming HTTP request, and it's initialized when an HTTP request is received by the server. `HttpRequest` isn't read-only, and middleware can change request values in the middleware pipeline.

Commonly used members on `HttpRequest` include:

|Property|Description|Example|
|--|--|--|--|
|[Microsoft.AspNetCore.Http.HttpRequest.Path](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Path)|The request path.|`/en/article/getstarted`|
|[Microsoft.AspNetCore.Http.HttpRequest.Method](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Method)|The request method.|`GET`|
|[Microsoft.AspNetCore.Http.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Headers)|A collection of request headers.|`user-agent=Edge`<br />`x-custom-header=MyValue`|
|[Microsoft.AspNetCore.Http.HttpRequest.RouteValues](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.RouteValues)|A collection of route values. The collection is set when the request is matched to a route.|`language=en`<br />`article=getstarted`|
|[Microsoft.AspNetCore.Http.HttpRequest.Query](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Query)|A collection of query values parsed from [Microsoft.AspNetCore.Http.HttpRequest.QueryString](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.QueryString).|`filter=hello`<br />`page=1`|
|[HttpRequest.ReadFormAsync()](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.ReadFormAsync\(System.Threading.CancellationToken\))|A method that reads the request body as a form and returns a form values collection. For information about why `ReadFormAsync` should be used to access form data, see [Prefer ReadFormAsync over Request.Form](https://learn.microsoft.com/search/?terms=fundamentals%2Fbest-practices%23prefer-readformasync-over-requestform).|`email=user@contoso.com`|
|[Microsoft.AspNetCore.Http.HttpRequest.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Body)|A [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) for reading the request body.|UTF-8 JSON payload|

### Get request headers

[Microsoft.AspNetCore.Http.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Headers) provides access to the request headers sent with the HTTP request. There are two ways to access headers using this collection:

* Provide the header name to the indexer on the header collection. The header name isn't case-sensitive. The indexer can access any header value.
* The header collection also has properties for getting and setting commonly used HTTP headers. The properties provide a fast, IntelliSense driven way to access headers.

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_RequestHeaders\&highlight=6-7)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

For information on efficiently handling headers that appear more than once, see [A brief look at StringValues](https://andrewlock.net/a-brief-look-at-stringvalues/).

### Read request body

An HTTP request can include a request body. The request body is data associated with the request, such as the content of an HTML form, UTF-8 JSON payload, or a file.

[Microsoft.AspNetCore.Http.HttpRequest.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Body) allows the request body to be read with [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream):

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_RequestBody\&highlight=9)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

`HttpRequest.Body` can be read directly or used with other APIs that accept stream.

> **Note:**
> [Minimal APIs](minimal-apis.md) supports binding [Microsoft.AspNetCore.Http.HttpRequest.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Body) directly to a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) parameter.

#### Enable request body buffering

The request body can only be read once, from beginning to end. Forward-only reading of the request body avoids the overhead of buffering the entire request body and reduces memory usage. However, in some scenarios, there's a need to read the request body multiple times. For example, middleware might need to read the request body and then rewind it so it's available for the endpoint.

The [Microsoft.AspNetCore.Http.HttpRequestRewindExtensions.EnableBuffering%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequestRewindExtensions.EnableBuffering%252A) extension method enables buffering of the HTTP request body and is the recommended way to enable multiple reads. Because a request can be any size, `EnableBuffering` supports options for buffering large request bodies to disk, or rejecting them entirely.

The middleware in the following example:

* Enables multiple reads with `EnableBuffering`. It must be called before reading the request body.
* Reads the request body.
* Rewinds the request body to the start so other middleware or the endpoint can read it.

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_RequestBuffering\&highlight=6)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

#### BodyReader

An alternative way to read the request body is to use the [Microsoft.AspNetCore.Http.HttpRequest.BodyReader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.BodyReader) property. The `BodyReader` property exposes the request body as a [System.IO.Pipelines.PipeReader](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeReader). This API is from [I/O pipelines](https://learn.microsoft.com/dotnet/standard/io/pipelines), an advanced, high-performance way to read the request body.

The reader directly accesses the request body and manages memory on the caller's behalf. Unlike `HttpRequest.Body`, the reader doesn't copy request data into a buffer. However, a reader is more complicated to use than a stream and should be used with caution.

For information on how to read content from `BodyReader`, see [I/O pipelines PipeReader](https://learn.microsoft.com/dotnet/standard/io/pipelines#pipereader).

## `HttpResponse`

[Microsoft.AspNetCore.Http.HttpContext.Response](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Response) provides access to [Microsoft.AspNetCore.Http.HttpResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse). `HttpResponse` is used to set information on the HTTP response sent back to the client.

Commonly used members on `HttpResponse` include:

|Property|Description|Example|
|--|--|--|--|
|[Microsoft.AspNetCore.Http.HttpResponse.StatusCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.StatusCode)|The response code. Must be set before writing to the response body.|`200`|
|[Microsoft.AspNetCore.Http.HttpResponse.ContentType](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.ContentType)|The response `content-type` header. Must be set before writing to the response body.|`application/json`|
|[Microsoft.AspNetCore.Http.HttpResponse.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.Headers)|A collection of response headers. Must be set before writing to the response body.|`server=Kestrel`<br />`x-custom-header=MyValue`|
|[Microsoft.AspNetCore.Http.HttpResponse.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.Body)|A [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) for writing the response body.|Generated web page|

### Set response headers

[Microsoft.AspNetCore.Http.HttpResponse.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.Headers) provides access to the response headers sent with the HTTP response. There are two ways to access headers using this collection:

* Provide the header name to the indexer on the header collection. The header name isn't case-sensitive. The indexer can access any header value.
* Use the header collection properties for getting and setting commonly used HTTP headers. The properties provide a fast, IntelliSense driven way to access headers.

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_ResponseHeaders\&highlight=6-7)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

An app can't modify headers after the response has started. Once the response starts, the headers are sent to the client. A response is started by flushing the response body or calling [Microsoft.AspNetCore.Http.HttpResponse.StartAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.StartAsync(System.Threading.CancellationToken)). The [Microsoft.AspNetCore.Http.HttpResponse.HasStarted](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.HasStarted) property indicates whether the response has started. An error is thrown when attempting to modify headers after the response has started:

> System.InvalidOperationException: Headers are read-only, response has already started.

> **Note:**
> Unless response buffering is enabled, all write operations (for example, [Microsoft.AspNetCore.Http.HttpResponseWritingExtensions.WriteAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseWritingExtensions.WriteAsync%252A)) flush the response body internally and mark the response as started. Response buffering is disabled by default.

### Write response body

An HTTP response can include a response body. The response body is data associated with the response, such as generated web page content, UTF-8 JSON payload, or a file.

[Microsoft.AspNetCore.Http.HttpResponse.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.Body) allows the response body to be written with [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream):

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_ResponseBody\&highlight=9)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

`HttpResponse.Body` can be written directly or used with other APIs that write to a stream.

#### BodyWriter

An alternative way to write the response body is to use the [Microsoft.AspNetCore.Http.HttpResponse.BodyWriter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.BodyWriter) property. The `BodyWriter` property exposes the response body as a [System.IO.Pipelines.PipeWriter](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeWriter). This API is from [I/O pipelines](https://learn.microsoft.com/dotnet/standard/io/pipelines), and it's an advanced, high-performance way to write the response.

The writer provides direct access to the response body and manages memory on the caller's behalf. Unlike `HttpResponse.Body`, the write doesn't copy request data into a buffer. However, a writer is more complicated to use than a stream and writer code should be thoroughly tested.

For information on how to write content to `BodyWriter`, see [I/O pipelines PipeWriter](https://learn.microsoft.com/dotnet/standard/io/pipelines#pipewriter).

### Set response trailers

HTTP/2 and HTTP/3 support response trailers. Trailers are headers sent with the response after the response body is complete. Because trailers are sent after the response body, trailers can be added to the response at any time.

The following code sets trailers using [Microsoft.AspNetCore.Http.ResponseTrailerExtensions.AppendTrailer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ResponseTrailerExtensions.AppendTrailer%252A):

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_ResponseTrailers\&highlight=11)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

## `RequestAborted`

The [Microsoft.AspNetCore.Http.HttpContext.RequestAborted](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.RequestAborted) cancellation token can be used to notify that the HTTP request has been aborted by the client or server. The cancellation token should be passed to long-running tasks so they can be canceled if the request is aborted. For example, aborting a database query or HTTP request to get data to return in the response.

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_RequestAborted\&highlight=7-8)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

The `RequestAborted` cancellation token doesn't need to be used for request body read operations because reads always throw immediately when the request is aborted. The `RequestAborted` token is also usually unnecessary when writing response bodies, because writes immediately no-op when the request is aborted.

In some cases, passing the `RequestAborted` token to write operations can be a convenient way to force a write loop to exit early with an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException). However, it's typically better to pass the `RequestAborted` token into any asynchronous operations responsible for retrieving the response body content instead.

> **Note:**
> [Minimal APIs](minimal-apis.md) supports binding [Microsoft.AspNetCore.Http.HttpContext.RequestAborted](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.RequestAborted) directly to a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) parameter.

## `Abort()`

The [Microsoft.AspNetCore.Http.HttpContext.Abort](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Abort) method can be used to abort an HTTP request from the server. Aborting the HTTP request immediately triggers the [Microsoft.AspNetCore.Http.HttpContext.RequestAborted](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.RequestAborted) cancellation token and sends a notification to the client that the server has aborted the request.

The middleware in the following example:

* Adds a custom check for malicious requests.
* Aborts the HTTP request if the request is malicious.

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_Abort\&highlight=9)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

## `User`

The [Microsoft.AspNetCore.Http.HttpContext.User](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.User) property is used to get or set the user, represented by [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal), for the request. The [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal) is typically set by [ASP.NET Core authentication](../security/authentication/index.md).

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_User\&highlight=6)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

> **Note:**
> [Minimal APIs](minimal-apis.md) supports binding [Microsoft.AspNetCore.Http.HttpContext.User](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.User) directly to a [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal) parameter.

## `Features`

The [Microsoft.AspNetCore.Http.HttpContext.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Features) property provides access to the collection of feature interfaces for the current request. Since the feature collection is mutable even within the context of a request, middleware can be used to modify the collection and add support for additional features. Some advanced features are only available by accessing the associated interface through the feature collection.

The following example:

* Gets [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature) from the features collection.
* Sets [Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate) to null. This removes the minimum data rate that the request body must be sent by the client for this HTTP request.

[Code example (complete source file; reference: use-http-context/samples/Program.cs?name=snippet_Features\&highlight=6)](../../_code/aspnetcore/fundamentals/use-http-context/samples/Program.cs.md)

For more information about using request features and `HttpContext`, see [fundamentals/request-features](request-features.md).

## HttpContext isn't thread safe

This article primarily discusses using `HttpContext` in request and response flow from Blazor Web App components, Razor Pages, controllers, middleware, and so forth. Consider the following when using `HttpContext` outside the request and response flow:

* The `HttpContext` is **NOT** thread safe. Accessing it from multiple threads can result in unpredictable results, such as exceptions and data corruption.
* The [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) interface should be used with caution. As always, the `HttpContext` must ***not*** be captured outside of the request flow. `IHttpContextAccessor`:
  * Relies on  [System.Threading.AsyncLocal%601](https://learn.microsoft.com/search/?terms=System.Threading.AsyncLocal%25601), which can have a negative performance impact on asynchronous calls.
  * Creates a dependency on "ambient state" which can make testing more difficult.
* [Microsoft.AspNetCore.Http.IHttpContextAccessor.HttpContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor.HttpContext%252A) might be `null` if accessed outside of the request flow.
* To access information from `HttpContext` outside the request flow, copy the information inside the request flow. Be careful to copy the actual data and not just references. For example, rather than copying a reference to an `IHeaderDictionary`, copy the relevant header values or copy the entire dictionary key by key before leaving the request flow.
* Don't capture `IHttpContextAccessor.HttpContext` in a constructor.

The following sample logs GitHub branches when requested from the `/branch` endpoint:

[Code example (complete source file; reference: \~/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/Program.cs?highlight=26-46)](../../_code/aspnetcore/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/Program.cs.md)

The GitHub API requires two headers. The `User-Agent` header is added dynamically by the `UserAgentHeaderHandler`:

[Code example (complete source file; reference: \~/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/Program.cs?highlight=10-20)](../../_code/aspnetcore/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/Program.cs.md)

The `UserAgentHeaderHandler`:

[Code example (complete source file; reference: \~/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/UserAgentHeaderHandler.cs?highlight=21-29)](../../_code/aspnetcore/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/UserAgentHeaderHandler.cs.md)

In the preceding code, when the `HttpContext` is `null`, the `userAgent` string is set to `"Unknown"`. If possible, `HttpContext` should be explicitly passed to the service. Explicitly passing in `HttpContext` data:

* Makes the service API more useable outside the request flow.
* Is better for performance.
* Makes the code easier to understand and reason about than relying on ambient state.

When the service must access `HttpContext`, it should account for the possibility of `HttpContext` being `null` when not called from a request thread.

The application also includes `PeriodicBranchesLoggerService`, which logs the open GitHub branches of the specified repository every 30 seconds:

[Code example (complete source file; reference: \~/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/PeriodicBranchesLoggerService.cs)](../../_code/aspnetcore/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/PeriodicBranchesLoggerService.cs.md)

`PeriodicBranchesLoggerService` is a [hosted service](host/hosted-services.md), which runs outside the request and response flow. Logging from the `PeriodicBranchesLoggerService` has a null `HttpContext`. The `PeriodicBranchesLoggerService` was written to not depend on the `HttpContext`.

[Code example (complete source file; reference: \~/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/Program.cs?highlight=8\&range=1-11)](../../_code/aspnetcore/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/Program.cs.md)

## Additional resources

For more information about accessing `HttpContext`, see [fundamentals/httpcontext](http-context.md).
