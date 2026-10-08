---
title: Create responses in Minimal API applications
author: brunolins16
description: Learn how to create responses for Minimal APIs in ASP.NET Core.
ms.author: wpickett
ms.reviewer: brolivei
monikerRange: '>= aspnetcore-7.0'
ms.date: 06/16/2026
uid: fundamentals/minimal-apis/responses
ai-usage: ai-assisted
---

# How to create responses in Minimal API apps

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


This article explains how to create responses for Minimal API endpoints in ASP.NET Core. Minimal APIs provide several ways to return data and HTTP status codes.

**Applies to: \>= aspnetcore-10.0**

Minimal endpoints support the following types of return values:

1. `string` - This includes `Task<string>` and `ValueTask<string>`.
1. `T` (Any other type) - This includes `Task<T>` and `ValueTask<T>`.
1. `IResult` based - This includes `Task<IResult>` and `ValueTask<IResult>`.

> **Important:**
> Starting with ASP.NET Core 10, known API endpoints no longer redirect to login pages when using cookie authentication. Instead, they return 401/403 status codes. For details, see [security/authentication/api-endpoint-auth](../../security/authentication/api-endpoint-auth.md).

## `string` return values

| Behavior | Content-Type |
| --- | --- |
| The framework writes the string directly to the response. | `text/plain` |

Consider the following route handler, which returns a `Hello world` text. 

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_01"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

The `200` status code is returned with `text/plain` Content-Type header and the following content.

```text
Hello World
```

## `T` (Any other type) return values

| Behavior | Content-Type |
| --- | --- |
| The framework JSON-serializes the response. | `application/json` |

Consider the following route handler, which returns an anonymous type containing a `Message` string property.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_02"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

The `200` status code is returned with `application/json` Content-Type header and the following content.

```json
{"message":"Hello World"}
```

## `IResult` return values

| Behavior | Content-Type |
| --- | --- |
| The framework calls [IResult.ExecuteAsync](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult.ExecuteAsync%252A). | Decided by the `IResult` implementation. |

The `IResult` interface defines a contract that represents the result of an HTTP endpoint. The static [Results](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/\[Microsoft.AspNetCore.Http.Results]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results\)) class and the static [TypedResults](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/\[Microsoft.AspNetCore.Http.TypedResults]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults\)) are used to create various `IResult` objects that represent different types of responses.

### `TypedResults` versus `Results`

The [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes provide similar sets of results helpers. The `TypedResults` class is the *typed* equivalent of the `Results` class. However, the `Results` helpers' return type is [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult), while each `TypedResults` helper's return type is one of the `IResult` implementation types. The difference means that for `Results` helpers a conversion is needed when the concrete type is needed, for example, for unit testing. The implementation types are defined in the [Microsoft.AspNetCore.Http.HttpResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults) namespace.

Returning `TypedResults` rather than `Results` has the following advantages:

* `TypedResults` helpers return strongly typed objects, which can improve code readability, unit testing, and reduce the chance of runtime errors.
* The implementation type [automatically provides the response type metadata for OpenAPI](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types) to describe the endpoint.

Consider the following endpoint, for which a `200 OK` status code with the expected JSON response is produced.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_11b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

In order to document this endpoint correctly the extensions method `Produces` is called. However, it's not necessary to call `Produces` if `TypedResults` is used instead of `Results`, as shown in the following code. `TypedResults` automatically provides the metadata for the endpoint.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_112b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

For more information about describing a response type, see [OpenAPI support in Minimal APIs](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types-1).

For examples on testing result types, see the [Test documentation](https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/test-min-api#unit-test-iresult-implementation-types).

Because all methods on `Results` return `IResult` in their signature, the compiler automatically infers that as the request delegate return type when returning different results from a single endpoint. `TypedResults` requires the use of `Results<T1, TN>` from such delegates.

The following method compiles because both [`Results.Ok`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Ok%252A) and [`Results.NotFound`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.NotFound%252A) are declared as returning `IResult`, even though the actual concrete types of the objects returned are different:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1a"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

The following method does not compile, because `TypedResults.Ok` and `TypedResults.NotFound` are declared as returning different types and the compiler won't attempt to infer the best matching type:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_111"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

To use `TypedResults`, the return type must be fully declared; when the method is asynchronous, the declaration requires wrapping the return type in a `Task<>`. Using `TypedResults` is more verbose, but that's the trade-off for having the type information be statically available and thus capable of self-describing to OpenAPI:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

### Results<TResult1, TResultN>

Use [`Results<TResult1, TResultN>`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpresults.results-2) as the endpoint handler return type instead of `IResult` when:

* Multiple `IResult` implementation types are returned from the endpoint handler. 
* The static `TypedResult` class is used to create the `IResult` objects.

This alternative is better than returning `IResult` because the generic union types automatically retain the endpoint metadata. And since the `Results<TResult1, TResultN>` union types implement implicit cast operators, the compiler can automatically convert the types specified in the generic arguments to an instance of the union type. 

This has the added benefit of providing compile-time checking that a route handler actually only returns the results that it declares it does. Attempting to return a type that isn't declared as one of the generic arguments to `Results<>` results in a compilation error.

Consider the following endpoint, for which a `400 BadRequest` status code is returned when the `orderId` is greater than `999`. Otherwise, it produces a `200 OK` with the expected content.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_03"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

In order to document this endpoint correctly the extension method `Produces` is called. However, since the `TypedResults` helper automatically includes the metadata for the endpoint, you can return the `Results<T1, Tn>` union type instead, as shown in the following code.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_04"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

<a name="binr10"></a>

### Built-in results

Common result helpers exist in the [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes. Returning `TypedResults` is preferred to returning `Results`. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).


The following sections demonstrate the usage of the common result helpers.

#### JSON

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_05"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

[Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) is an alternative way to return JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasync"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

#### Custom Status Code

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_06"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

#### Internal Server Error

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_07"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

The preceding example returns a 500 status code.

#### Problem and ValidationProblem

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_12"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

#### Customize validation error responses using IProblemDetailsService

Customize error responses from Minimal API validation logic with an [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) implementation. Register this service in your application's service collection to enable more consistent and user-specific error responses. Support for Minimal API validation was introduced in ASP.NET Core in .NET 10.

To implement custom validation error responses:

* Implement [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) or use the default implementation
* Register the service in the DI container
* The validation system automatically uses the registered service to format validation error responses

The following example shows how to register and configure the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) to customize validation error responses:

[language="csharp" source="\~/fundamentals/minimal-apis/10.0-samples/MinApiIproblemDetailsService/Program.cs" id="snippet_register_IProblemDetailsService_implementation" ::: (complete source file; reference: \~/fundamentals/minimal-apis/10.0-samples/MinApiIproblemDetailsService/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/10.0-samples/MinApiIproblemDetailsService/Program.cs.md)

When a validation error occurs, the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) will be used to generate the error response, including any customizations added in the `CustomizeProblemDetails` callback.

For a complete app example, see the [Minimal API sample app](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/fundamentals/minimal-apis/10.0-samples/MinApiIproblemDetailsService/Program.cs) demonstrating how to customize validation error responses using the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) in ASP.NET Core Minimal APIs.

#### Text

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_08"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

<a name="stream7"></a>

#### Stream

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_stream)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

[`Results.Stream`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.results.stream?view=aspnetcore-7.0\&preserve-view=true) overloads allow access to the underlying HTTP response stream without buffering. The following example uses [ImageSharp](https://sixlabors.com/products/imagesharp) to return a reduced size of the specified image:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet)](../../../_code/aspnetcore/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs.md)

The following example streams an image from [Azure Blob storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction):

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_abs)](../../../_code/aspnetcore/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs.md)

The following example streams a video from an Azure Blob:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_video)](../../../_code/aspnetcore/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs.md)

#### Server-Sent Events (SSE)

The [TypedResults.ServerSentEvents](https://source.dot.net/#Microsoft.AspNetCore.Http.Results/TypedResults.cs,051e6796e1492f84) API supports returning a [ServerSentEvents](https://learn.microsoft.com/search/?terms=System.Net.ServerSentEvents) result.

[Server-Sent Events](https://developer.mozilla.org/docs/Web/API/Server-sent_events) is a server push technology that allows a server to send a stream of event messages to a client over a single HTTP connection. In .NET, the event messages are represented as [`SseItem<T>`](https://learn.microsoft.com/dotnet/api/system.net.serversentevents.sseitem-1) objects, which may contain an event type, an ID, and a data payload of type `T`.

The [TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) class has a static method called [ServerSentEvents](https://source.dot.net/#Microsoft.AspNetCore.Http.Results/TypedResults.cs,ceb980606eb9e295) that can be used to return a `ServerSentEvents` result. The first parameter to this method is an `IAsyncEnumerable<SseItem<T>>` that represents the stream of event messages to be sent to the client.

The following example illustrates how to use the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as JSON objects to the client:

[language="csharp" source="\~/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs" id="snippet_item" ::: (complete source file; reference: \~/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs.md)

For more information, see the [Minimal API sample app](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs) using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.

#### Redirect

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_09"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

#### File

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_10"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

<a name="httpresultinterfaces7"></a>

### HttpResult interfaces

The following interfaces in the [Microsoft.AspNetCore.Http](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http) namespace provide a way to detect the `IResult` type at runtime, which is a common pattern in filter implementations:

* [Microsoft.AspNetCore.Http.IContentTypeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IContentTypeHttpResult)
* [Microsoft.AspNetCore.Http.IFileHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFileHttpResult)
* [Microsoft.AspNetCore.Http.INestedHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.INestedHttpResult)
* [Microsoft.AspNetCore.Http.IStatusCodeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IStatusCodeHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult%25601)

Here's an example of a filter that uses one of these interfaces:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs" id="snippet_filter"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs.md)

For more information, see [Filters in Minimal API apps](min-api-filters.md) and [IResult implementation types](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Ftest-min-api%23iresult-implementation-types).

## File result return values

When an API endpoint returns content other than JSON, or supports HTTP protocol features like conditional or range requests,
ASP.NET Core provides result types that handle the necessary HTTP protocol details for you.
These result types are referred to as "file results", but the functionality is useful for scenarios beyond serving files on disk.
There are file result types for both Minimal APIs and controller-based APIs, and they share a common underlying implementation and behavior.

To access this functionality, the API endpoint creates and returns a file result object - an instance of one of these file result types.
The file result object encapsulates the content to be sent, the content type, and any additional parameters like a download file name.
The result object implements a method -- `ExecuteAsync(HttpContext)` for Minimal APIs or `ExecuteResultAsync(ActionContext)` for controllers -- that the framework calls to write the response.
This method sets the `Content-Type` header and, when a file name is provided, the `Content-Disposition` header.
It also handles conditional request headers and range request headers when the appropriate parameters are set on the result object.

### File result types

In Minimal APIs, the most common and recommended way to create a file result is [`TypedResults.File`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults.File%252A), which accepts a `byte[]` or `Stream` and returns a [`FileContentHttpResult`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.FileContentHttpResult) or [`FileStreamHttpResult`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.FileStreamHttpResult).

Alternatives include [`TypedResults.Bytes`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults.Bytes%252A) for an explicit byte-array helper,
[`TypedResults.PhysicalFile`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults.PhysicalFile%252A) for serving files by absolute path, or
[`Results.File`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.File%252A) / [`Results.Bytes`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Bytes%252A) when you only need the `IResult` interface.

ASP.NET Core also provides [static files middleware](../static-files.md) that serves files relative to the web root (`wwwroot`) without requiring an explicit endpoint.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

In controller-based APIs, the [`ControllerBase.File()`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.File%252A) helper method accepts either a `byte[]` or `Stream` and returns the appropriate concrete result type ([`FileContentResult`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FileContentResult), [`FileStreamResult`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FileStreamResult)).

Alternatives include returning a [`VirtualFileResult`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.VirtualFileResult) for files relative to the web root, or a [`PhysicalFileResult`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.PhysicalFileResult) for files by absolute path, but these are less common as the static files middleware usually handles those scenarios.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

### OpenAPI support for file results

File result types don't automatically contribute response metadata to the generated OpenAPI document.
To get a proper response description in the OpenAPI document, you must specify this metadata explicitly.

In Minimal APIs, use the [`Produces<TResponse>()`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces%252A)
extension method to provide the OpenAPI metadata for the response. This metadata determines the status code, content type, and schema for the response in the OpenAPI document.
For a file result, it's important to specify the content type, such as `application/pdf`, and to use an appropriate `TResponse` to get the desired schema.
You can also specify the status code in the `Produces` extension method if it differs from the default of `200 OK`.
Common status codes are defined in the [`StatusCodes`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.StatusCodes) class, and common content types are defined in the [`MediaTypeNames`](https://learn.microsoft.com/search/?terms=System.Net.Mime.MediaTypeNames) class.
For example:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

Conceptually, `TResponse` represents the type of the response body, but the appropriate schema for a file result depends
more on the body content than the CLR type. Therefore, it may be necessary to specify a `TResponse` that doesn't match
the CLR type of the content in the file result in order to get the desired OpenAPI schema.

In particular, there are three common schemas for file results:

- **binary content**, such as PDFs, images, or videos, where the schema should be `type: string, format: binary`.
  The recommended `TResponse` for this case is `Stream`. The framework has special logic to map
  this type to the `binary` format in the OpenAPI schema.
  <!-- Hope we can change this to IBinaryContent if #67145 is approved and implemented -->
- **text content**, such as CSV or plain text. Here the schema should be simply `type: string` with no `format`. Use `string` as the `TResponse` for this case.
- **base64-encoded content**, where the schema should be `type: string, format: byte`. It's uncommon to base64-encode file content in an API response, but for legacy reasons this is the schema produced when the `TResponse` is `byte[]`.

In a controller-based app, use the [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) or the [`[ProducesResponseType]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute) attribute:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

As with Minimal APIs, you should choose the `Type` parameter of the `[Produces]` and `[ProducesResponseType]` attributes
that corresponds to the desired OpenAPI schema for your file result responses:
* **binary content**: Use `FileContentResult` or `FileStreamResult` to get the `binary` format in the OpenAPI schema.
* **text content**: Use `string` to get a simple `type: string` schema.
* **base64-encoded content**: Use `byte[]` to get the `byte` format in the OpenAPI schema, though this is uncommon for file results.

### File result support for conditional requests

File results support [conditional requests](https://www.rfc-editor.org/rfc/rfc9110#section-13) for cache validation. Set the `lastModified` and/or `entityTag` parameters when creating the result object, and the framework automatically inspects incoming `If-None-Match` and `If-Modified-Since` headers. If the resource hasn't changed, the framework returns `304 Not Modified` with no body — no additional code is needed.

| Parameter | Purpose |
| --- | --- |
| `lastModified` | Sets the `Last-Modified` response header. If the client sends `If-Modified-Since` and the file hasn't changed, the framework returns `304 Not Modified` with no body. |
| `entityTag` | Sets the `ETag` response header. If the client sends `If-None-Match` with a matching ETag, the framework returns `304 Not Modified` with no body. |

> **Note:**
> Precondition checks (`If-Match`, `If-Unmodified-Since`) typically require custom logic in the endpoint to verify preconditions *before* performing their function.

The following example demonstrates how to use file results to enable cache validation for a configuration endpoint.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

This example also illustrates how to document the `304 Not Modified` response in the OpenAPI document using the `Produces` extension method, and including the `if-none-match` and `if-modified-since` headers as parameters so they're included in the OpenAPI schema for the endpoint.

A controller-based API can achieve the same behavior using the `File` helper method and the `[ProducesResponseType]` attribute:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

### File result support for range requests

**Range requests** allow clients to request only a portion of a file rather than the entire content. A client sends a `Range` header specifying byte offsets, and the server responds with `206 Partial Content` containing just those bytes. This enables resumable downloads, parallel chunked downloads, and efficient seeking in media players.

Range requests can also be conditional: the client sends an `If-Range` header containing an ETag or date alongside the `Range` header, and the server returns the partial content only if the resource hasn't changed. If it has changed, the server ignores the range and returns the full resource instead. `If-Range` is only evaluated when `entityTag` or `lastModified` is also set on the file result.

Set `enableRangeProcessing` to `true` to enable range processing. The following examples enable range processing for a video streaming endpoint, and document the additional response types in the OpenAPI metadata.

**Minimal API:**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

**Controller:**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

With this configuration, the framework automatically handles the following HTTP interactions:

* **Full request**: Returns `200 OK` with the complete file.
* **Range request** (`Range: bytes=0-1023`): Returns `206 Partial Content` with the `Content-Range` header and only the requested bytes.
* **Invalid range**: Returns `416 Range Not Satisfiable`.

## Modifying Headers

Use the `HttpResponse` object to modify response headers:

```csharp
app.MapGet("/", (HttpContext context) => {
    // Set a custom header
    context.Response.Headers["X-Custom-Header"] = "CustomValue";

    // Set a known header
    context.Response.Headers.CacheControl = $"public,max-age=3600";

    return "Hello World";
});
```

## Customizing responses

Applications can control responses by implementing a custom [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) type. The following code is an example of an HTML result type:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/ResultsExtensions.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/ResultsExtensions.cs.md)

We recommend adding an extension method to [Microsoft.AspNetCore.Http.IResultExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResultExtensions) to make these custom results more discoverable.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_xtn)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

Also, a custom `IResult` type can provide its own annotation by implementing the [Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider) interface. For example, the following code adds an annotation to the preceding `HtmlResult` type that describes the response produced by the endpoint.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_IEndpointMetadataProvider\&highlight=1,17-20)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs.md)

The `ProducesHtmlMetadata` is an implementation of [Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata) that defines the produced response content type `text/html` and the status code `200 OK`.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_ProducesHtmlMetadata\&highlight=5,7)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs.md)

An alternative approach is using the [Microsoft.AspNetCore.Mvc.ProducesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) to describe the produced response. The following code changes the `PopulateMetadata` method to use `ProducesAttribute`.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_11"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

## Configure JSON serialization options

By default, Minimal API apps use [`Web defaults`](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-configure-options#web-defaults-for-jsonserializeroptions) options during JSON serialization and deserialization.

### Configure JSON serialization options globally

Options can be configured globally for an app by invoking [Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%252A). The following example includes public fields and formats JSON output.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_confighttpjsonoptions" highlight="3-6"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

Since fields are included, the preceding code reads `NameField` and includes it in the output JSON.

### Configure JSON serialization options for an endpoint

To configure serialization options for an endpoint, invoke [Microsoft.AspNetCore.Http.Results.Json%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Json%252A) and pass to it a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object, as shown in the following example:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_resultsjsonwithoptions" highlight="5-6,9"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

As an alternative, use an overload of [Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) that accepts a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object. The following example uses this overload to format the output JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasyncwithoptions" highlight="5-6,10"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

## Additional Resources

* [fundamentals/minimal-apis/security](security.md)



**Applies to: \= aspnetcore-9.0**

Minimal endpoints support the following types of return values:

1. `string` - This includes `Task<string>` and `ValueTask<string>`.
1. `T` (Any other type) - This includes `Task<T>` and `ValueTask<T>`.
1. `IResult` based - This includes `Task<IResult>` and `ValueTask<IResult>`.

## `string` return values

| Behavior | Content-Type |
| --- | --- |
| The framework writes the string directly to the response. | `text/plain` |

Consider the following route handler, which returns a `Hello world` text. 

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_01"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

The `200` status code is returned with `text/plain` Content-Type header and the following content.

```text
Hello World
```

## `T` (Any other type) return values

| Behavior | Content-Type |
| --- | --- |
| The framework JSON-serializes the response. | `application/json` |

Consider the following route handler, which returns an anonymous type containing a `Message` string property.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_02"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

The `200` status code is returned with `application/json` Content-Type header and the following content.

```json
{"message":"Hello World"}
```

## `IResult` return values

| Behavior | Content-Type |
| --- | --- |
| The framework calls [IResult.ExecuteAsync](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult.ExecuteAsync%252A). | Decided by the `IResult` implementation. |

The `IResult` interface defines a contract that represents the result of an HTTP endpoint. The static [Results](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/\[Microsoft.AspNetCore.Http.Results]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results\)) class and the static [TypedResults](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/\[Microsoft.AspNetCore.Http.TypedResults]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults\)) are used to create various `IResult` objects that represent different types of responses.

### `TypedResults` versus `Results`

The [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes provide similar sets of results helpers. The `TypedResults` class is the *typed* equivalent of the `Results` class. However, the `Results` helpers' return type is [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult), while each `TypedResults` helper's return type is one of the `IResult` implementation types. The difference means that for `Results` helpers a conversion is needed when the concrete type is needed, for example, for unit testing. The implementation types are defined in the [Microsoft.AspNetCore.Http.HttpResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults) namespace.

Returning `TypedResults` rather than `Results` has the following advantages:

* `TypedResults` helpers return strongly typed objects, which can improve code readability, unit testing, and reduce the chance of runtime errors.
* The implementation type [automatically provides the response type metadata for OpenAPI](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types) to describe the endpoint.

Consider the following endpoint, for which a `200 OK` status code with the expected JSON response is produced.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_11b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

In order to document this endpoint correctly the extensions method `Produces` is called. However, it's not necessary to call `Produces` if `TypedResults` is used instead of `Results`, as shown in the following code. `TypedResults` automatically provides the metadata for the endpoint.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_112b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

For more information about describing a response type, see [OpenAPI support in Minimal APIs](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types-1).

As mentioned previously, when using `TypedResults`, a conversion is not needed. Consider the following Minimal API which returns a `TypedResults` class

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/WebMinRouteGroup/TodoEndpointsV1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The following test checks for the full concrete type:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

Because all methods on `Results` return `IResult` in their signature, the compiler automatically infers that as the request delegate return type when returning different results from a single endpoint. `TypedResults` requires the use of `Results<T1, TN>` from such delegates.

The following method compiles because both [`Results.Ok`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Ok%252A) and [`Results.NotFound`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.NotFound%252A) are declared as returning `IResult`, even though the actual concrete types of the objects returned are different:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1a"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

The following method does not compile, because `TypedResults.Ok` and `TypedResults.NotFound` are declared as returning different types and the compiler won't attempt to infer the best matching type:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_111"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

To use `TypedResults`, the return type must be fully declared, which when asynchronous requires the `Task<>` wrapper. Using `TypedResults` is more verbose, but that's the trade-off for having the type information be statically available and thus capable of self-describing to OpenAPI:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

### Results<TResult1, TResultN>

Use [`Results<TResult1, TResultN>`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpresults.results-2) as the endpoint handler return type instead of `IResult` when:

* Multiple `IResult` implementation types are returned from the endpoint handler. 
* The static `TypedResult` class is used to create the `IResult` objects.

This alternative is better than returning `IResult` because the generic union types automatically retain the endpoint metadata. And since the `Results<TResult1, TResultN>` union types implement implicit cast operators, the compiler can automatically convert the types specified in the generic arguments to an instance of the union type. 

This has the added benefit of providing compile-time checking that a route handler actually only returns the results that it declares it does. Attempting to return a type that isn't declared as one of the generic arguments to `Results<>` results in a compilation error.

Consider the following endpoint, for which a `400 BadRequest` status code is returned when the `orderId` is greater than `999`. Otherwise, it produces a `200 OK` with the expected content.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_03"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

In order to document this endpoint correctly the extension method `Produces` is called. However, since the `TypedResults` helper automatically includes the metadata for the endpoint, you can return the `Results<T1, Tn>` union type instead, as shown in the following code.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_04"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

<a name="binr7"></a>

### Built-in results

Common result helpers exist in the [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes. Returning `TypedResults` is preferred to returning `Results`. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).


The following sections demonstrate the usage of the common result helpers.

#### JSON

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_05"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

[Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) is an alternative way to return JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasync"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

#### Custom Status Code

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_06"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

#### Internal Server Error

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_07"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

The preceding example returns a 500 status code.

#### Problem and ValidationProblem

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_12"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

#### Text

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_08"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

<a name="stream7"></a>

#### Stream

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_stream](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

[`Results.Stream`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.results.stream?view=aspnetcore-7.0\&preserve-view=true) overloads allow access to the underlying HTTP response stream without buffering. The following example uses [ImageSharp](https://sixlabors.com/products/imagesharp) to return a reduced size of the specified image:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The following example streams an image from [Azure Blob storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction):

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_abs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The following example streams a video from an Azure Blob:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_video](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

#### Redirect

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_09"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

#### File

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_10"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

<a name="httpresultinterfaces7"></a>

### HttpResult interfaces

The following interfaces in the [Microsoft.AspNetCore.Http](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http) namespace provide a way to detect the `IResult` type at runtime, which is a common pattern in filter implementations:

* [Microsoft.AspNetCore.Http.IContentTypeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IContentTypeHttpResult)
* [Microsoft.AspNetCore.Http.IFileHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFileHttpResult)
* [Microsoft.AspNetCore.Http.INestedHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.INestedHttpResult)
* [Microsoft.AspNetCore.Http.IStatusCodeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IStatusCodeHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult%25601)

Here's an example of a filter that uses one of these interfaces:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs" id="snippet_filter"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs.md)

For more information, see [Filters in Minimal API apps](min-api-filters.md) and [IResult implementation types](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Ftest-min-api%23iresult-implementation-types).

## Modifying Headers

Use the `HttpResponse` object to modify response headers:

```csharp
app.MapGet("/", (HttpContext context) => {
    // Set a custom header
    context.Response.Headers["X-Custom-Header"] = "CustomValue";

    // Set a known header
    context.Response.Headers.CacheControl = $"public,max-age=3600";

    return "Hello World";
});
```

## Customizing responses

Applications can control responses by implementing a custom [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) type. The following code is an example of an HTML result type:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/ResultsExtensions.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

We recommend adding an extension method to [Microsoft.AspNetCore.Http.IResultExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResultExtensions) to make these custom results more discoverable.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_xtn](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

Also, a custom `IResult` type can provide its own annotation by implementing the [Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider) interface. For example, the following code adds an annotation to the preceding `HtmlResult` type that describes the response produced by the endpoint.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_IEndpointMetadataProvider\\&highlight=1,17-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The `ProducesHtmlMetadata` is an implementation of [Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata) that defines the produced response content type `text/html` and the status code `200 OK`.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_ProducesHtmlMetadata\\&highlight=5,7](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

An alternative approach is using the [Microsoft.AspNetCore.Mvc.ProducesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) to describe the produced response. The following code changes the `PopulateMetadata` method to use `ProducesAttribute`.

[language="csharp" source="\~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs" id="snippet_11"::: (complete source file; reference: \~/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/9.0-samples/Snippets/Program.cs.md)

## Configure JSON serialization options

By default, Minimal API apps use [`Web defaults`](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-configure-options#web-defaults-for-jsonserializeroptions) options during JSON serialization and deserialization.

### Configure JSON serialization options globally

Options can be configured globally for an app by invoking [Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%252A). The following example includes public fields and formats JSON output.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_confighttpjsonoptions" highlight="3-6"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

Since fields are included, the preceding code reads `NameField` and includes it in the output JSON.

### Configure JSON serialization options for an endpoint

To configure serialization options for an endpoint, invoke [Microsoft.AspNetCore.Http.Results.Json%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Json%252A) and pass to it a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object, as shown in the following example:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_resultsjsonwithoptions" highlight="5-6,9"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

As an alternative, use an overload of [Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) that accepts a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object. The following example uses this overload to format the output JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasyncwithoptions" highlight="5-6,10"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

## Additional Resources

* [fundamentals/minimal-apis/security](security.md)





**Applies to: \>= aspnetcore-7.0 <= aspnetcore-8.0**

Minimal endpoints support the following types of return values:

1. `string` - This includes `Task<string>` and `ValueTask<string>`.
1. `T` (Any other type) - This includes `Task<T>` and `ValueTask<T>`.
1. `IResult` based - This includes `Task<IResult>` and `ValueTask<IResult>`.

## `string` return values

| Behavior | Content-Type |
| --- | --- |
| The framework writes the string directly to the response. | `text/plain` |

Consider the following route handler, which returns a `Hello world` text. 

```csharp
app.MapGet("/hello", () => "Hello World");
```

The `200` status code is returned with `text/plain` Content-Type header and the following content.

```text
Hello World
```

## `T` (Any other type) return values

| Behavior | Content-Type |
| --- | --- |
| The framework JSON-serializes the response. | `application/json` |

Consider the following route handler, which returns an anonymous type containing a `Message` string property.

```csharp
app.MapGet("/hello", () => new { Message = "Hello World" });
```

The `200` status code is returned with `application/json` Content-Type header and the following content.

```json
{"message":"Hello World"}
```

## `IResult` return values

| Behavior | Content-Type |
| --- | --- |
| The framework calls [IResult.ExecuteAsync](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult.ExecuteAsync%252A). | Decided by the `IResult` implementation. |

The `IResult` interface defines a contract that represents the result of an HTTP endpoint. The static [Results](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/\[Microsoft.AspNetCore.Http.Results]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results\)) class and the static [TypedResults](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/\[Microsoft.AspNetCore.Http.TypedResults]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults\)) are used to create various `IResult` objects that represent different types of responses.

### `TypedResults` versus `Results`

The [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes provide similar sets of results helpers. The `TypedResults` class is the *typed* equivalent of the `Results` class. However, the `Results` helpers' return type is [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult), while each `TypedResults` helper's return type is one of the `IResult` implementation types. The difference means that for `Results` helpers a conversion is needed when the concrete type is needed, for example, for unit testing. The implementation types are defined in the [Microsoft.AspNetCore.Http.HttpResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults) namespace.

Returning `TypedResults` rather than `Results` has the following advantages:

* `TypedResults` helpers return strongly typed objects, which can improve code readability, unit testing, and reduce the chance of runtime errors.
* The implementation type [automatically provides the response type metadata for OpenAPI](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types) to describe the endpoint.

Consider the following endpoint, for which a `200 OK` status code with the expected JSON response is produced.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_11b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

In order to document this endpoint correctly the extensions method `Produces` is called. However, it's not necessary to call `Produces` if `TypedResults` is used instead of `Results`, as shown in the following code. `TypedResults` automatically provides the metadata for the endpoint.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_112b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

For more information about describing a response type, see [OpenAPI support in Minimal APIs](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types-1).

As mentioned previously, when using `TypedResults`, a conversion is not needed. Consider the following Minimal API which returns a `TypedResults` class

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/WebMinRouteGroup/TodoEndpointsV1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The following test checks for the full concrete type:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

Because all methods on `Results` return `IResult` in their signature, the compiler automatically infers that as the request delegate return type when returning different results from a single endpoint. `TypedResults` requires the use of `Results<T1, TN>` from such delegates.

The following method compiles because both [`Results.Ok`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Ok%252A) and [`Results.NotFound`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.NotFound%252A) are declared as returning `IResult`, even though the actual concrete types of the objects returned are different:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1a"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

The following method does not compile, because `TypedResults.Ok` and `TypedResults.NotFound` are declared as returning different types and the compiler won't attempt to infer the best matching type:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_111"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

To use `TypedResults`, the return type must be fully declared, which when asynchronous requires the `Task<>` wrapper. Using `TypedResults` is more verbose, but that's the trade-off for having the type information be statically available and thus capable of self-describing to OpenAPI:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

### Results<TResult1, TResultN>

Use [`Results<TResult1, TResultN>`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpresults.results-2) as the endpoint handler return type instead of `IResult` when:

* Multiple `IResult` implementation types are returned from the endpoint handler. 
* The static `TypedResult` class is used to create the `IResult` objects.

This alternative is better than returning `IResult` because the generic union types automatically retain the endpoint metadata. And since the `Results<TResult1, TResultN>` union types implement implicit cast operators, the compiler can automatically convert the types specified in the generic arguments to an instance of the union type. 

This has the added benefit of providing compile-time checking that a route handler actually only returns the results that it declares it does. Attempting to return a type that isn't declared as one of the generic arguments to `Results<>` results in a compilation error.

Consider the following endpoint, for which a `400 BadRequest` status code is returned when the `orderId` is greater than `999`. Otherwise, it produces a `200 OK` with the expected content.

```csharp
app.MapGet("/orders/{orderId}", IResult (int orderId)
    => orderId > 999 ? TypedResults.BadRequest() : TypedResults.Ok(new Order(orderId)))
    .Produces(400)
    .Produces<Order>();
```

In order to document this endpoint correctly the extension method `Produces` is called. However, since the `TypedResults` helper automatically includes the metadata for the endpoint, you can return the `Results<T1, Tn>` union type instead, as shown in the following code.

```csharp
app.MapGet("/orders/{orderId}", Results<BadRequest, Ok<Order>> (int orderId) 
    => orderId > 999 ? TypedResults.BadRequest() : TypedResults.Ok(new Order(orderId)));
```

<a name="binr7"></a>

### Built-in results

Common result helpers exist in the [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes. Returning `TypedResults` is preferred to returning `Results`. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).


The following sections demonstrate the usage of the common result helpers.

#### JSON

```csharp
app.MapGet("/hello", () => Results.Json(new { Message = "Hello World" }));
```

[Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) is an alternative way to return JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasync"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

#### Custom Status Code

```csharp
app.MapGet("/405", () => Results.StatusCode(405));
```

#### Text

```csharp
app.MapGet("/text", () => Results.Text("This is some text"));
```

<a name="stream7"></a>

#### Stream

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_stream](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

[`Results.Stream`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.results.stream?view=aspnetcore-7.0\&preserve-view=true) overloads allow access to the underlying HTTP response stream without buffering. The following example uses [ImageSharp](https://sixlabors.com/products/imagesharp) to return a reduced size of the specified image:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The following example streams an image from [Azure Blob storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction):

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_abs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The following example streams a video from an Azure Blob:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_video](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

#### Redirect

```csharp
app.MapGet("/old-path", () => Results.Redirect("/new-path"));
```

#### File

```csharp
app.MapGet("/download", () => Results.File("myfile.text"));
```

<a name="httpresultinterfaces7"></a>

### HttpResult interfaces

The following interfaces in the [Microsoft.AspNetCore.Http](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http) namespace provide a way to detect the `IResult` type at runtime, which is a common pattern in filter implementations:

* [Microsoft.AspNetCore.Http.IContentTypeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IContentTypeHttpResult)
* [Microsoft.AspNetCore.Http.IFileHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFileHttpResult)
* [Microsoft.AspNetCore.Http.INestedHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.INestedHttpResult)
* [Microsoft.AspNetCore.Http.IStatusCodeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IStatusCodeHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult%25601)

Here's an example of a filter that uses one of these interfaces:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs" id="snippet_filter"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs.md)

For more information, see [Filters in Minimal API apps](min-api-filters.md) and [IResult implementation types](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Ftest-min-api%23iresult-implementation-types).

## Customizing responses

Applications can control responses by implementing a custom [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) type. The following code is an example of an HTML result type:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/ResultsExtensions.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

We recommend adding an extension method to [Microsoft.AspNetCore.Http.IResultExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResultExtensions) to make these custom results more discoverable.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_xtn](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

Also, a custom `IResult` type can provide its own annotation by implementing the [Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider) interface. For example, the following code adds an annotation to the preceding `HtmlResult` type that describes the response produced by the endpoint.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_IEndpointMetadataProvider\\&highlight=1,17-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

The `ProducesHtmlMetadata` is an implementation of [Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata) that defines the produced response content type `text/html` and the status code `200 OK`.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_ProducesHtmlMetadata\\&highlight=5,7](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/responses.md)

An alternative approach is using the [Microsoft.AspNetCore.Mvc.ProducesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) to describe the produced response. The following code changes the `PopulateMetadata` method to use `ProducesAttribute`.

```csharp
public static void PopulateMetadata(MethodInfo method, EndpointBuilder builder)
{
    builder.Metadata.Add(new ProducesAttribute(MediaTypeNames.Text.Html));
}
```

## Configure JSON serialization options

By default, Minimal API apps use [`Web defaults`](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-configure-options#web-defaults-for-jsonserializeroptions) options during JSON serialization and deserialization.

### Configure JSON serialization options globally

Options can be configured globally for an app by invoking [Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%252A). The following example includes public fields and formats JSON output.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_confighttpjsonoptions" highlight="3-6"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

Since fields are included, the preceding code reads `NameField` and includes it in the output JSON.

### Configure JSON serialization options for an endpoint

To configure serialization options for an endpoint, invoke [Microsoft.AspNetCore.Http.Results.Json%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Json%252A) and pass to it a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object, as shown in the following example:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_resultsjsonwithoptions" highlight="5-6,9"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

As an alternative, use an overload of [Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) that accepts a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object. The following example uses this overload to format the output JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasyncwithoptions" highlight="5-6,10"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

## Additional Resources

* [fundamentals/minimal-apis/security](security.md)
