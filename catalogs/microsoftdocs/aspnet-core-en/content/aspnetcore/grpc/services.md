---
title: Create gRPC services and methods
author: jamesnk
description: Learn how to create gRPC services and methods.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 08/18/2022
uid: grpc/services
---
# Create gRPC services and methods

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

This document explains how to create gRPC services and methods in C#. Topics include:

* How to define services and methods in `.proto` files.
* Generated code using gRPC C# tooling.
* Implementing gRPC services and methods.

## Create new gRPC services

[gRPC services with C#](basics.md) introduced gRPC's contract-first approach to API development. Services and messages are defined in `.proto` files. C# tooling then generates code from `.proto` files. For server-side assets, an abstract base type is generated for each service, along with classes for any messages.

The following `.proto` file:

* Defines a `Greeter` service.
* The `Greeter` service defines a `SayHello` call.
* `SayHello` sends a `HelloRequest` message and receives a `HelloReply` message

[Code reference unavailable in this source snapshot: ~/grpc/services/Protos/greeter.proto](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/services.md)

C# tooling generates the C# `GreeterBase` base type:

[language="csharp" source="\~/grpc/services/GreeterBase.cs" id="snippet_GreeterBase" ::: (complete source file; reference: \~/grpc/services/GreeterBase.cs)](../../_code/aspnetcore/grpc/services/GreeterBase.cs.md)

By default the generated `GreeterBase` doesn't do anything. Its virtual `SayHello` method will return an `UNIMPLEMENTED` error to any clients that call it. For the service to be useful an app must create a concrete implementation of `GreeterBase`:

[language="csharp" source="\~/grpc/services/GreeterService.cs" id="snippet_GreeterService" ::: (complete source file; reference: \~/grpc/services/GreeterService.cs)](../../_code/aspnetcore/grpc/services/GreeterService.cs.md)

The `ServerCallContext` gives the context for a server-side call.

The service implementation is registered with the app. If the service is hosted by ASP.NET Core gRPC, it should be added to the routing pipeline with the `MapGrpcService` method.

[language="csharp" source="\~/grpc/services/Program.cs" id="snippet_MapGrpcService" ::: (complete source file; reference: \~/grpc/services/Program.cs)](../../_code/aspnetcore/grpc/services/Program.cs.md)

See [grpc/aspnetcore](aspnetcore.md) for more information.

## Implement gRPC methods

A gRPC service can have different types of methods. How messages are sent and received by a service depends on the type of method defined. The gRPC method types are:

* Unary
* Server streaming
* Client streaming
* Bi-directional streaming

Streaming calls are specified with the `stream` keyword in the `.proto` file. `stream` can be placed on a call's request message, response message, or both.

[Code reference unavailable in this source snapshot: ~/grpc/services/Protos/example.proto](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/services.md)

Each call type has a different method signature. Overriding generated methods from the abstract base service type in a concrete implementation ensures the correct arguments and return type are used.

### Unary method

A unary method has the request message as a parameter, and returns the response. A unary call is complete when the response is returned.

[language="csharp" source="\~/grpc/services/ExampleService.cs" id="snippet_UnaryCall" ::: (complete source file; reference: \~/grpc/services/ExampleService.cs)](../../_code/aspnetcore/grpc/services/ExampleService.cs.md)

Unary calls are the most similar to [actions on web API controllers](../web-api/index.md). One important difference gRPC methods have from actions is gRPC methods are not able to bind parts of a request to different method arguments. gRPC methods always have one message argument for the incoming request data. Multiple values can still be sent to a gRPC service by adding fields to the request message:

[Code reference unavailable in this source snapshot: ~/grpc/services/Protos/example.proto](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/services.md)

### Server streaming method

A server streaming method has the request message as a parameter. Because multiple messages can be streamed back to the caller, `responseStream.WriteAsync` is used to send response messages. A server streaming call is complete when the method returns.

[language="csharp" source="\~/grpc/services/ExampleService.cs" id="snippet_StreamingFromServer" ::: (complete source file; reference: \~/grpc/services/ExampleService.cs)](../../_code/aspnetcore/grpc/services/ExampleService.cs.md)

The client has no way to send additional messages or data once the server streaming method has started. Some streaming methods are designed to run forever. For continuous streaming methods, a client can cancel the call when it's no longer needed. When cancellation happens the client sends a signal to the server and the [ServerCallContext.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) is raised. The `CancellationToken` token should be used on the server with async methods so that:

* Any asynchronous work is canceled together with the streaming call.
* The method exits quickly.

[language="csharp" source="\~/grpc/services/ExampleService.cs" id="snippet_StreamingFromServerUsingCancellationToken" ::: (complete source file; reference: \~/grpc/services/ExampleService.cs)](../../_code/aspnetcore/grpc/services/ExampleService.cs.md)

### Client streaming method

A client streaming method starts *without* the method receiving a message. The `requestStream` parameter is used to read messages from the client. A client streaming call is complete when a response message is returned:

[language="csharp" source="\~/grpc/services/ExampleService.cs" id="snippet_StreamingFromClient" ::: (complete source file; reference: \~/grpc/services/ExampleService.cs)](../../_code/aspnetcore/grpc/services/ExampleService.cs.md)

### Bi-directional streaming method

A bi-directional streaming method starts *without* the method receiving a message. The `requestStream` parameter is used to read messages from the client. The method can choose to send messages with `responseStream.WriteAsync`. A bi-directional streaming call is complete when the method returns:

[language="csharp" source="\~/grpc/services/ExampleService.cs" id="snippet_StreamingBothWays" ::: (complete source file; reference: \~/grpc/services/ExampleService.cs)](../../_code/aspnetcore/grpc/services/ExampleService.cs.md)

The preceding code:

* Sends a response for each request.
* Is a basic usage of bi-directional streaming.

It is possible to support more complex scenarios, such as reading requests and sending responses simultaneously:

[language="csharp" source="\~/grpc/services/ExampleService.cs" id="snippet_StreamingBothWaysComplex" ::: (complete source file; reference: \~/grpc/services/ExampleService.cs)](../../_code/aspnetcore/grpc/services/ExampleService.cs.md)

In a bi-directional streaming method, the client and service can send messages to each other at any time. The best implementation of a bi-directional method varies depending upon requirements.

## Access gRPC request headers

A request message is not the only way for a client to send data to a gRPC service. Header values are available in a service using `ServerCallContext.RequestHeaders`.

[language="csharp" source="\~/grpc/services/ExampleService.cs" id="snippet_UnaryCallRequestHeaders" ::: (complete source file; reference: \~/grpc/services/ExampleService.cs)](../../_code/aspnetcore/grpc/services/ExampleService.cs.md)

## Multi-threading with gRPC streaming methods

There are important considerations to implementing gRPC streaming methods that use multiple threads.

### Reader and writer thread safety

`IAsyncStreamReader<TMessage>` and `IServerStreamWriter<TMessage>` can each be used by only one thread at a time. For a streaming gRPC method, multiple threads can't read new messages with `requestStream.MoveNext()` simultaneously. And multiple threads can't write new messages with `responseStream.WriteAsync(message)` simultaneously.

A safe way to enable multiple threads to interact with a gRPC method is to use the producer-consumer pattern with [System.Threading.Channels](https://learn.microsoft.com/dotnet/core/extensions/channels).

[language="csharp" source="\~/grpc/services/DownloadResults.cs" ::: (complete source file; reference: \~/grpc/services/DownloadResults.cs)](../../_code/aspnetcore/grpc/services/DownloadResults.cs.md)

The preceding gRPC server streaming method:

* Creates a bounded channel for producing and consuming `DataResult` messages.
* Starts a task to read messages from the channel and write them to the response stream.
* Writes messages to the channel from multiple threads.

> **Note:**
> Bidirectional streaming methods take `IAsyncStreamReader<TMessage>` and `IServerStreamWriter<TMessage>` as arguments. It's safe to use these types on separate threads from each other.

### Interacting with a gRPC method after a call ends

A gRPC call ends on the server once the gRPC method exits. The following arguments passed to gRPC methods aren't safe to use after the call has ended:

* `ServerCallContext`
* `IAsyncStreamReader<TMessage>`
* `IServerStreamWriter<TMessage>`

If a gRPC method starts background tasks that use these types, it must complete the tasks before the gRPC method exits. Continuing to use the context, stream reader, or stream writer after the gRPC method exists causes errors and unpredictable behavior.

In the following example, the server streaming method could write to the response stream after the call has finished:

[language="csharp" source="\~/grpc/services/PerformLongRunningWorkAsync.cs" id="snippet_StreamingFromServer" ::: (complete source file; reference: \~/grpc/services/PerformLongRunningWorkAsync.cs)](../../_code/aspnetcore/grpc/services/PerformLongRunningWorkAsync.cs.md)

For the previous example, the solution is to await the write task before exiting the method:

[language="csharp" source="\~/grpc/services/PerformLongRunningWorkAsync.cs" id="snippet_StreamingFromServerWriteTask" ::: (complete source file; reference: \~/grpc/services/PerformLongRunningWorkAsync.cs)](../../_code/aspnetcore/grpc/services/PerformLongRunningWorkAsync.cs.md)

## Additional resources

* [grpc/basics](basics.md)
* [grpc/client](client.md)
