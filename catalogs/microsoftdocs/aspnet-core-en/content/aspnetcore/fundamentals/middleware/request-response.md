---
title: Request and Response operations in ASP.NET Core
author: tdykstra
description: Learn how to read the request body and write the response body in ASP.NET Core.
monikerRange: '>= aspnetcore-3.0'
ms.author: tdykstra
ms.date: 04/24/2025
uid: fundamentals/middleware/request-response
---
# Request and response operations in ASP.NET Core

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


By [Justin Kotalik](https://github.com/jkotalik)

This article explains how to read from the request body and write to the response body. Code for these operations might be required when writing middleware. Outside of writing middleware, custom code isn't generally required because the operations are handled by MVC and Razor Pages.

There are two abstractions for the request and response bodies: [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) and [System.IO.Pipelines.Pipe](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.Pipe). For request reading, [Microsoft.AspNetCore.Http.HttpRequest.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Body) is a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream), and `HttpRequest.BodyReader` is a [System.IO.Pipelines.PipeReader](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeReader). For response writing, [Microsoft.AspNetCore.Http.HttpResponse.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.Body) is a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream), and `HttpResponse.BodyWriter` is a [System.IO.Pipelines.PipeWriter](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeWriter).

[Pipelines](https://learn.microsoft.com/dotnet/standard/io/pipelines) are recommended over streams. Streams can be easier to use for some simple operations, but pipelines have a performance advantage and are easier to use in most scenarios. ASP.NET Core is starting to use pipelines instead of streams internally. Examples include:

* `FormReader`
* `TextReader`
* `TextWriter`
* `HttpResponse.WriteAsync`

Streams aren't being removed from the framework. Streams continue to be used throughout .NET:

* Many stream types don't have pipe equivalents, such as `FileStreams` and `ResponseCompression`.
* It's straightforward adding compression to a stream.

## Stream examples

<!-- see "fundamentals\middleware\request-response\static\TestPipes.JPG for testing sample -->

Suppose the goal is to create a middleware that reads the entire request body as a list of strings, splitting on new lines. A simple stream implementation might look like the following example:

> **Warning:**
> The following code:
> * Is used to demonstrate the problems with not using a pipe to read the request body.
> * Is not intended to be used in production apps.

[Code example (complete source file; reference: request-response/samples/3.x/RequestResponseSample/Startup.cs?name=GetListOfStringsFromStream)](../../../_code/aspnetcore/fundamentals/middleware/request-response/samples/3.x/RequestResponseSample/Startup.cs.md)

This code works, but there are some issues:

* Before appending to the `StringBuilder`, the example creates another string (`encodedString`) that is thrown away immediately. This process occurs for all bytes in the stream, so the result is extra memory allocation the size of the entire request body.
* The example reads the entire string before splitting on new lines. It's more efficient to check for new lines in the byte array.

Here's an example that fixes some of the preceding issues:

> **Warning:**
> The following code:
> * Is used to demonstrate the solutions to some problems in the preceding code while not solving all the problems.
> * Is not intended to be used in production apps.

[Code example (complete source file; reference: request-response/samples/3.x/RequestResponseSample/Startup.cs?name=GetListOfStringsFromStreamMoreEfficient)](../../../_code/aspnetcore/fundamentals/middleware/request-response/samples/3.x/RequestResponseSample/Startup.cs.md)

This preceding example:

* Doesn't buffer the entire request body in a `StringBuilder` unless there aren't any newline characters.
* Doesn't call `Split` on the string.

However, there are still a few issues:

* If newline characters are sparse, much of the request body is buffered in the string.
* The code continues to create strings (`remainingString`) and adds them to the string buffer, which results in an extra allocation.

These issues are fixable, but the code is becoming progressively more complicated with little improvement. Pipelines provide a way to solve these problems with minimal code complexity.

## Pipelines

The following example shows how the preceding stream scenario can be handled using a [PipeReader](https://learn.microsoft.com/dotnet/standard/io/pipelines#pipe):

[Code example (complete source file; reference: request-response/samples/3.x/RequestResponseSample/Startup.cs?name=GetListOfStringFromPipe)](../../../_code/aspnetcore/fundamentals/middleware/request-response/samples/3.x/RequestResponseSample/Startup.cs.md)

This example fixes many issues that the streams implementations had:

* There's no need for a string buffer because the `PipeReader` handles bytes that haven't been used.
* Encoded strings are directly added to the list of returned strings.
* Other than the `ToArray` call, and the memory used by the string, string creation is allocation free.

When writing directly to `HttpResponse.BodyWriter`, call `PipeWriter.FlushAsync` manually to ensure the data is flushed to the underlying response response body. Here's why:

* `HttpResponse.BodyWriter` is a `PipeWriter` that buffers data until a flush operation is triggered.
* Calling `FlushAsync` writes the buffered data to the underlying response body.

It's up to the developer to decide when to call `FlushAsync`, balancing factors such as buffer size, network write overhead, and whether the data should be sent in discrete chunks. For more information, see [System.IO.Pipelines in .NET](https://learn.microsoft.com/dotnet/standard/io/pipelines).

## Adapters

The `Body`, `BodyReader`, and `BodyWriter` properties are available for `HttpRequest` and `HttpResponse`. When you set `Body` to a different stream, a new set of adapters automatically adapt each type to the other. If you set `HttpRequest.Body` to a new stream, `HttpRequest.BodyReader` is automatically set to a new `PipeReader` that wraps `HttpRequest.Body`.

## StartAsync

`HttpResponse.StartAsync` is used to indicate that headers are unmodifiable and to run `OnStarting` callbacks. When using Kestrel as a server, calling `StartAsync` before using the `PipeReader` guarantees that memory returned by `GetMemory` belongs to Kestrel's internal [System.IO.Pipelines.Pipe](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.Pipe) rather than an external buffer.

## Additional resources

* [System.IO.Pipelines in .NET](https://learn.microsoft.com/dotnet/standard/io/pipelines)
* [fundamentals/middleware/write](write.md)

<!-- Test with Fiddler, .http files for Visual Studio, dotnet httprepl for CLI or other tool. See image in static directory. -->
