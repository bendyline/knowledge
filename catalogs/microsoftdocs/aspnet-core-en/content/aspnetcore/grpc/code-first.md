---
title: Code-first gRPC services and clients with .NET
author: jamesnk
description: Learn the basic concepts when writing code-first gRPC with .NET.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 02/23/2022
uid: grpc/code-first
---
# Code-first gRPC services and clients with .NET

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


By [James Newton-King](https://twitter.com/jamesnk) and [Marc Gravell](https://twitter.com/marcgravell)

**Applies to: \>= aspnetcore-6.0**

Code-first gRPC uses .NET types to define service and message contracts.

Code-first is a good choice when an entire system uses .NET:

* .NET service and data contract types can be shared between the .NET server and clients.
* Avoids the need to define contracts in `.proto` files and code generation.

Code-first isn't recommended in polyglot systems with multiple languages. .NET service and data contract types can't be used with non-.NET platforms. To call a gRPC service written using code-first, other platforms must create a `.proto` contract that matches the service.

## protobuf-net.Grpc

> **Important:**
> For help with protobuf-net.Grpc, visit the [protobuf-net.Grpc website](https://protobuf-net.github.io/protobuf-net.Grpc/) or create an issue on the [protobuf-net.Grpc GitHub repository](https://github.com/protobuf-net/protobuf-net.Grpc).

[protobuf-net.Grpc](https://protobuf-net.github.io/protobuf-net.Grpc/) is a community project and isn't supported by Microsoft. It adds code-first support to `Grpc.AspNetCore` and `Grpc.Net.Client`. It uses .NET types annotated with attributes to define an app's gRPC services and messages.

The first step to creating a code-first gRPC service is defining the code contract:

* Create a new project that will be shared by the server and client.
* Add a [protobuf-net.Grpc](https://www.nuget.org/packages/protobuf-net.Grpc) package reference.
* Create service and data contract types.

[Code example (complete source file; reference: code-first/samples/6.x/Shared/Contracts.cs)](../../_code/aspnetcore/grpc/code-first/samples/6.x/Shared/Contracts.cs.md)

The preceding code:

* Defines `HelloRequest` and `HelloReply` messages.
* Defines the `IGreeterService` contract interface with the unary `SayHelloAsync` gRPC method.

The service contract is implemented on the server and called from the client.

Methods defined on service interfaces must match certain signatures depending on whether they're:

* Unary
* Server streaming
* Client streaming
* Bidirectional streaming

For more information on defining service contracts, see the [protobuf-net.Grpc getting started documentation](https://protobuf-net.github.io/protobuf-net.Grpc/gettingstarted).

## Create a code-first gRPC service

To add gRPC code-first service to an ASP.NET Core app:

* Add a [protobuf-net.Grpc.AspNetCore](https://www.nuget.org/packages/protobuf-net.Grpc.AspNetCore) package reference.
* Add a reference to the shared code-contract project.

  [Code example (complete source file; reference: code-first/samples/6.x/GrpcGreeter/GrpcGreeter.csproj?highlight=9-11,13-15)](../../_code/aspnetcore/grpc/code-first/samples/6.x/GrpcGreeter/GrpcGreeter.csproj.md)

* Create a new `GreeterService.cs` file and implement the `IGreeterService` service interface:

  [Code example (complete source file; reference: code-first/samples/6.x/GrpcGreeter/Services/GreeterService.cs?highlight=4)](../../_code/aspnetcore/grpc/code-first/samples/6.x/GrpcGreeter/Services/GreeterService.cs.md)

* Update the `Program.cs` file:

  [Code example (complete source file; reference: code-first/samples/6.x/GrpcGreeter/Program.cs?highlight=9,14)](../../_code/aspnetcore/grpc/code-first/samples/6.x/GrpcGreeter/Program.cs.md)

  The preceding highlighted code updates the following:

  * `AddCodeFirstGrpc` registers services that enable code-first.
  * `MapGrpcService<GreeterService>` adds the code-first service endpoint.

gRPC services implemented with code-first and `.proto` files can co-exist in the same app. All gRPC services use [gRPC service configuration](https://learn.microsoft.com/search/?terms=grpc%2Fconfiguration%23configure-services-options).

## Create a code-first gRPC client

A code-first gRPC client uses the service contract to call gRPC services.

* In the gRPC client `.csproj` file:

  * Add a [protobuf-net.Grpc](https://www.nuget.org/packages/protobuf-net.Grpc) package reference.
  * Add a [Grpc.Net.Client](https://www.nuget.org/packages/Grpc.Net.Client) package reference.
  * Add a reference to the shared code-contract project.

  [Code example (complete source file; reference: code-first/samples/6.x/GrpcGreeterClient/GrpcGreeterClient.csproj?highlight=10-13,15-17)](../../_code/aspnetcore/grpc/code-first/samples/6.x/GrpcGreeterClient/GrpcGreeterClient.csproj.md)

* Update the client `program.cs`

  [Code example (complete source file; reference: code-first/samples/6.x/GrpcGreeterClient/Program.cs?highlight=13,15-16)](../../_code/aspnetcore/grpc/code-first/samples/6.x/GrpcGreeterClient/Program.cs.md)

The preceding gRPC client `Program.cs` code:

* Creates a gRPC channel.
* Creates a code-first client from the channel with the `CreateGrpcService<IGreeterService>` extension method.
* Calls the gRPC service with `SayHelloAsync`.

A code-first gRPC client is created from a channel. Just like a regular client, a code-first client uses its [channel configuration](https://learn.microsoft.com/search/?terms=grpc%2Fconfiguration%23configure-client-options).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/grpc/code-first/samples/6.x) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Additional resources

* [protobuf-net.Grpc website](https://protobuf-net.github.io/protobuf-net.Grpc/)
* [protobuf-net.Grpc GitHub repository](https://github.com/protobuf-net/protobuf-net.Grpc)



**Applies to: < aspnetcore-6.0**

Code-first gRPC uses .NET types to define service and message contracts.

Code-first is a good choice when an entire system uses .NET:

* .NET service and data contract types can be shared between the .NET server and clients.
* Avoids the need to define contracts in `.proto` files and code generation.

Code-first isn't recommended in polyglot systems with multiple languages. .NET service and data contract types can't be used with non-.NET platforms. To call a gRPC service written using code-first, other platforms must create a `.proto` contract that matches the service.

## protobuf-net.Grpc

> **Important:**
> For help with protobuf-net.Grpc, visit the [protobuf-net.Grpc website](https://protobuf-net.github.io/protobuf-net.Grpc/) or create an issue on the [protobuf-net.Grpc GitHub repository](https://github.com/protobuf-net/protobuf-net.Grpc).

[protobuf-net.Grpc](https://protobuf-net.github.io/protobuf-net.Grpc/) is a community project and isn't supported by Microsoft. It adds code-first support to `Grpc.AspNetCore` and `Grpc.Net.Client`. It uses .NET types annotated with attributes to define an app's gRPC services and messages.

The first step to creating a code-first gRPC service is defining the code contract:

* Create a new project that will be shared by the server and client.
* Add a [protobuf-net.Grpc](https://www.nuget.org/packages/protobuf-net.Grpc) package reference.
* Create service and data contract types.

[Code example (complete source file; reference: code-first/samples/5.x/Shared/Contracts.cs?name=snippet)](../../_code/aspnetcore/grpc/code-first/samples/5.x/Shared/Contracts.cs.md)

The preceding code:

* Defines `HelloRequest` and `HelloReply` messages.
* Defines the `IGreeterService` contract interface with the unary `SayHelloAsync` gRPC method.

The service contract is implemented on the server and called from the client. Methods defined on service interfaces must match certain signatures depending on whether they're unary, server streaming, client streaming, or bidirectional streaming.

For more information on defining service contracts, see the [protobuf-net.Grpc getting started documentation](https://protobuf-net.github.io/protobuf-net.Grpc/gettingstarted).

## Create a code-first gRPC service

To add gRPC code-first service to an ASP.NET Core app:

* Add a [protobuf-net.Grpc.AspNetCore](https://www.nuget.org/packages/protobuf-net.Grpc.AspNetCore) package reference.
* Add a reference to the shared code-contract project.

Create a new `GreeterService.cs` file and implement the `IGreeterService` service interface:

[Code example (complete source file; reference: code-first/samples/5.x/GrpcGreeter/Services/GreeterService.cs?name=snippet\&highlight=1)](../../_code/aspnetcore/grpc/code-first/samples/5.x/GrpcGreeter/Services/GreeterService.cs.md)

Update the `Startup.cs` file:

[Code example (complete source file; reference: code-first/samples/5.x/GrpcGreeter/Startup.cs?name=snippet\&highlight=3,17)](../../_code/aspnetcore/grpc/code-first/samples/5.x/GrpcGreeter/Startup.cs.md)

In the preceding code:

* `AddCodeFirstGrpc` registers services that enable code-first.
* `MapGrpcService<GreeterService>` adds the code-first service endpoint.

gRPC services implemented with code-first and `.proto` files can co-exist in the same app. All gRPC services use [gRPC service configuration](https://learn.microsoft.com/search/?terms=grpc%2Fconfiguration%23configure-services-options).

## Create a code-first gRPC client

A code-first gRPC client uses the service contract to call gRPC services. To call a gRPC service using a code-first client:

* Add a [protobuf-net.Grpc](https://www.nuget.org/packages/protobuf-net.Grpc) package reference.
* Add a reference to the shared code-contract project.
* Add a [Grpc.Net.Client](https://www.nuget.org/packages/Grpc.Net.Client) package reference.

[Code example (complete source file; reference: code-first/samples/5.x/GrpcGreeterClient/Program.cs?name=snippet\&highlight=2,4-5)](../../_code/aspnetcore/grpc/code-first/samples/5.x/GrpcGreeterClient/Program.cs.md)

The preceding code:

* Creates a gRPC channel.
* Creates a code-first client from the channel with the `CreateGrpcService<IGreeterService>` extension method.
* Calls the gRPC service with `SayHelloAsync`.

A code-first gRPC client is created from a channel. Just like a regular client, a code-first client uses its [channel configuration](https://learn.microsoft.com/search/?terms=grpc%2Fconfiguration%23configure-client-options).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/grpc/code-first/samples/5.x) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Additional resources

* [protobuf-net.Grpc website](https://protobuf-net.github.io/protobuf-net.Grpc/)
* [protobuf-net.Grpc GitHub repository](https://github.com/protobuf-net/protobuf-net.Grpc)
