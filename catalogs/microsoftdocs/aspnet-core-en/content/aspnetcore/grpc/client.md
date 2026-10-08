---
title: Call gRPC services with the .NET client
author: jamesnk
description: Learn how to call gRPC services with the .NET gRPC client.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 03/06/2025
uid: grpc/client
---
# Call gRPC services with the .NET client

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


A .NET gRPC client library is available in the [Grpc.Net.Client](https://www.nuget.org/packages/Grpc.Net.Client) NuGet package. This document explains how to:

* Configure a gRPC client to call gRPC services.
* Make gRPC calls to unary, server streaming, client streaming, and bi-directional streaming methods.

## Configure gRPC client

gRPC clients are concrete client types that are [generated from `.proto` files](https://learn.microsoft.com/search/?terms=grpc%2Fbasics%23generated-c-assets). The concrete gRPC client has methods that translate to the gRPC service in the `.proto` file. For example, a service called `Greeter` generates a `GreeterClient` type with methods to call the service.

A gRPC client is created from a channel. Start by using `GrpcChannel.ForAddress` to create a channel, and then use the channel to create a gRPC client:

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = new Greet.GreeterClient(channel);
```

A channel represents a long-lived connection to a gRPC service. When a channel is created, it's configured with options related to calling a service. For example, the `HttpClient` used to make calls, the maximum send and receive message size, and logging can be specified on `GrpcChannelOptions` and used with `GrpcChannel.ForAddress`. For a complete list of options, see [client configuration options](https://learn.microsoft.com/search/?terms=grpc%2Fconfiguration%23configure-client-options).

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001");

var greeterClient = new Greet.GreeterClient(channel);
var counterClient = new Count.CounterClient(channel);

// Use clients to call gRPC services
```

### Configure TLS

A gRPC client must use the same connection-level security as the called service. gRPC client Transport Layer Security (TLS) is configured when the gRPC channel is created. A gRPC client throws an error when it calls a service and the connection-level security of the channel and service don't match.

To configure a gRPC channel to use TLS, ensure the server address starts with `https`. For example, `GrpcChannel.ForAddress("https://localhost:5001")` uses HTTPS protocol. The gRPC channel automatically negotiates a connection secured by TLS and uses a secure connection to make gRPC calls.

> **Tip:**
> gRPC supports client certificate authentication over TLS. For information on configuring client certificates with a gRPC channel, see [grpc/authn-and-authz#client-certificate-authentication](https://learn.microsoft.com/search/?terms=grpc%2Fauthn-and-authz%23client-certificate-authentication).

To call unsecured gRPC services, ensure the server address starts with `http`. For example, `GrpcChannel.ForAddress("http://localhost:5000")` uses HTTP protocol. In .NET Core 3.1, additional configuration is required to [call insecure gRPC services with the .NET client](https://learn.microsoft.com/search/?terms=grpc%2Ftroubleshoot%23call-insecure-grpc-services-with-net-client).

### Client performance

Channel and client performance and usage:

* Creating a channel can be an expensive operation. Reusing a channel for gRPC calls provides performance benefits.
* A channel manages connections to the server. If the connection is closed or lost, the channel automatically reconnects the next time a gRPC call is made.
* gRPC clients are created with channels. gRPC clients are lightweight objects and don't need to be cached or reused.
* Multiple gRPC clients can be created from a channel, including different types of clients.
* A channel and clients created from the channel can safely be used by multiple threads.
* Clients created from the channel can make multiple simultaneous calls.

`GrpcChannel.ForAddress` isn't the only option for creating a gRPC client. If calling gRPC services from an ASP.NET Core app, consider [gRPC client factory integration](clientfactory.md). gRPC integration with `HttpClientFactory` offers a centralized alternative to creating gRPC clients.

When calling gRPC methods, prefer using [asynchronous programming with async and await](https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/). Making gRPC calls with blocking, such as using `Task.Result` or `Task.Wait()`, prevents other tasks from using a thread. This can lead to thread pool starvation and poor performance. It could cause the app to hang with a deadlock. For more information, see [Asynchronous calls in client apps](https://learn.microsoft.com/search/?terms=grpc%2Fperformance%23asynchronous-calls-in-client-apps).

## Make gRPC calls

A gRPC call is initiated by calling a method on the client. The gRPC client will handle message serialization and addressing the gRPC call to the correct service.

gRPC has different types of methods. How the client is used to make a gRPC call depends on the type of method called. The gRPC method types are:

* Unary
* Server streaming
* Client streaming
* Bi-directional streaming

### Unary call

A unary call starts with the client sending a request message. A response message is returned when the service finishes.

```csharp
var client = new Greet.GreeterClient(channel);
var response = await client.SayHelloAsync(new HelloRequest { Name = "World" });

Console.WriteLine("Greeting: " + response.Message);
// Greeting: Hello World
```

Each unary service method in the `.proto` file will result in two .NET methods on the concrete gRPC client type for calling the method: an asynchronous method and a blocking method. For example, on `GreeterClient` there are two ways of calling `SayHello`:

* `GreeterClient.SayHelloAsync` - calls the `Greeter.SayHello` service asynchronously. Can be awaited.
* `GreeterClient.SayHello` - calls the `Greeter.SayHello` service and blocks until complete. Don't use in asynchronous code. Can cause performance and reliability issues.

For more information, see [Asynchronous calls in client apps](https://learn.microsoft.com/search/?terms=grpc%2Fperformance%23asynchronous-calls-in-client-apps).

### Server streaming call

A server streaming call starts with the client sending a request message. `ResponseStream.MoveNext()` reads messages streamed from the service. The server streaming call is complete when `ResponseStream.MoveNext()` returns `false`.

```csharp
var client = new Greet.GreeterClient(channel);
using var call = client.SayHellos(new HelloRequest { Name = "World" });

while (await call.ResponseStream.MoveNext())
{
    Console.WriteLine("Greeting: " + call.ResponseStream.Current.Message);
    // "Greeting: Hello World" is written multiple times
}
```

When using C# 8 or later, the `await foreach` syntax can be used to read messages. The `IAsyncStreamReader<T>.ReadAllAsync()` extension method reads all messages from the response stream:

```csharp
var client = new Greet.GreeterClient(channel);
using var call = client.SayHellos(new HelloRequest { Name = "World" });

await foreach (var response in call.ResponseStream.ReadAllAsync())
{
    Console.WriteLine("Greeting: " + response.Message);
    // "Greeting: Hello World" is written multiple times
}
```

The type returned from starting a server streaming call implements `IDisposable`. Always dispose a streaming call to ensure it's stopped and all resources are cleaned up.

### Client streaming call

A client streaming call starts *without* the client sending a message. The client can choose to send messages with `RequestStream.WriteAsync`. When the client has finished sending messages, `RequestStream.CompleteAsync()` should be called to notify the service. The call is finished when the service returns a response message.

```csharp
var client = new Counter.CounterClient(channel);
using var call = client.AccumulateCount();

for (var i = 0; i < 3; i++)
{
    await call.RequestStream.WriteAsync(new CounterRequest { Count = 1 });
}
await call.RequestStream.CompleteAsync();

var response = await call;
Console.WriteLine($"Count: {response.Count}");
// Count: 3
```

The type returned from starting a client streaming call implements `IDisposable`. Always dispose a streaming call to ensure it's stopped and all resources are cleaned up.

### Bi-directional streaming call

A bi-directional streaming call starts *without* the client sending a message. The client can choose to send messages with `RequestStream.WriteAsync`. Messages streamed from the service are accessible with `ResponseStream.MoveNext()` or `ResponseStream.ReadAllAsync()`. The bi-directional streaming call is complete when the `ResponseStream` has no more messages.

```csharp
var client = new Echo.EchoClient(channel);
using var call = client.Echo();

Console.WriteLine("Starting background task to receive messages");
var readTask = Task.Run(async () =>
{
    await foreach (var response in call.ResponseStream.ReadAllAsync())
    {
        Console.WriteLine(response.Message);
        // Echo messages sent to the service
    }
});

Console.WriteLine("Starting to send messages");
Console.WriteLine("Type a message to echo then press enter.");
while (true)
{
    var result = Console.ReadLine();
    if (string.IsNullOrEmpty(result))
    {
        break;
    }

    await call.RequestStream.WriteAsync(new EchoMessage { Message = result });
}

Console.WriteLine("Disconnecting");
await call.RequestStream.CompleteAsync();
await readTask;
```

For best performance, and to avoid unnecessary errors in the client and service, try to complete bi-directional streaming calls gracefully. A bi-directional call completes gracefully when the server has finished reading the request stream and the client has finished reading the response stream. The preceding sample call is one example of a bi-directional call that ends gracefully. In the call, the client:

1. Starts a new bi-directional streaming call by calling `EchoClient.Echo`.
2. Creates a background task to read messages from the service using `ResponseStream.ReadAllAsync()`.
3. Sends messages to the server with `RequestStream.WriteAsync`.
4. Notifies the server it has finished sending messages with `RequestStream.CompleteAsync()`.
5. Waits until the background task has read all incoming messages.

During a bi-directional streaming call, the client and service can send messages to each other at any time. The best client logic for interacting with a bi-directional call varies depending upon the service logic.

The type returned from starting a bi-directional streaming call implements `IDisposable`. Always dispose a streaming call to ensure it's stopped and all resources are cleaned up.

## Access gRPC headers

gRPC calls return response headers. HTTP response headers pass name/value metadata about a call that isn't related the returned message.

Headers are accessible using `ResponseHeadersAsync`, which returns a collection of metadata. Headers are typically returned with the response message; therefore, you must await them.

```csharp
var client = new Greet.GreeterClient(channel);
using var call = client.SayHelloAsync(new HelloRequest { Name = "World" });

var headers = await call.ResponseHeadersAsync;
var myValue = headers.GetValue("my-trailer-name");

var response = await call.ResponseAsync;
```

`ResponseHeadersAsync` usage:

* Must await the result of `ResponseHeadersAsync` to get the headers collection.
* Doesn't have to be accessed before `ResponseAsync` (or the response stream when streaming). If a response has been returned, then `ResponseHeadersAsync` returns headers instantly.
* Will throw an exception if there was a connection or server error and headers weren't returned for the gRPC call.

## Access gRPC trailers

gRPC calls may return response trailers. Trailers are used to provide name/value metadata about a call. Trailers provide similar functionality to HTTP headers, but are received at the end of the call.

Trailers are accessible using `GetTrailers()`, which returns a collection of metadata. Trailers are returned after the response is complete. Therefore, you must await all response messages before accessing the trailers.

Unary and client streaming calls must await `ResponseAsync` before calling `GetTrailers()`:

```csharp
var client = new Greet.GreeterClient(channel);
using var call = client.SayHelloAsync(new HelloRequest { Name = "World" });
var response = await call.ResponseAsync;

Console.WriteLine("Greeting: " + response.Message);
// Greeting: Hello World

var trailers = call.GetTrailers();
var myValue = trailers.GetValue("my-trailer-name");
```

Server and bidirectional streaming calls must finish awaiting the response stream before calling `GetTrailers()`:

```csharp
var client = new Greet.GreeterClient(channel);
using var call = client.SayHellos(new HelloRequest { Name = "World" });

await foreach (var response in call.ResponseStream.ReadAllAsync())
{
    Console.WriteLine("Greeting: " + response.Message);
    // "Greeting: Hello World" is written multiple times
}

var trailers = call.GetTrailers();
var myValue = trailers.GetValue("my-trailer-name");
```

Trailers are also accessible from `RpcException`. A service may return trailers together with a non-OK gRPC status. In this situation, the trailers are retrieved from the exception thrown by the gRPC client:

```csharp
var client = new Greet.GreeterClient(channel);
string myValue = null;

try
{
    using var call = client.SayHelloAsync(new HelloRequest { Name = "World" });
    var response = await call.ResponseAsync;

    Console.WriteLine("Greeting: " + response.Message);
    // Greeting: Hello World

    var trailers = call.GetTrailers();
    myValue = trailers.GetValue("my-trailer-name");
}
catch (RpcException ex)
{
    var trailers = ex.Trailers;
    myValue = trailers.GetValue("my-trailer-name");
}
```

## Configure deadline

Configuring a gRPC call deadline is recommended because it provides an upper limit on how long a call can run for. It stops misbehaving services from running forever and exhausting server resources. Deadlines are a useful tool for building reliable apps.

Configure `CallOptions.Deadline` to set a deadline for a gRPC call:

[Code example (complete source file; reference: \~/grpc/deadlines-cancellation/deadline-client.cs?highlight=7,12)](../../_code/aspnetcore/grpc/deadlines-cancellation/deadline-client.cs.md)

For more information, see [grpc/deadlines-cancellation#deadlines](https://learn.microsoft.com/search/?terms=grpc%2Fdeadlines-cancellation%23deadlines).

## Additional resources

* [grpc/clientfactory](clientfactory.md)
* [grpc/deadlines-cancellation](deadlines-cancellation.md)
* [grpc/basics](basics.md)
