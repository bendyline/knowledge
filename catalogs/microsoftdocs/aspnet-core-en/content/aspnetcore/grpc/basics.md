---
title: gRPC Services with C#
author: jamesnk
description: Learn the basic concepts for writing gRPC services with C# in ASP.NET Core.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 04/24/2026
uid: grpc/basics

# customer intent: As an ASP.NET developer, I want to explore the basic concepts for working with gRPC services with C\# in ASP.NET Core, so I can write gRPC apps.
---
# gRPC services with C\#

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

This article provides an overview of the concepts required to write [gRPC](https://grpc.io/docs/guides/) apps in C#. The information presented applies to both [C-core](https://grpc.io/blog/grpc-stacks)-based and ASP.NET Core-based gRPC apps.

## Review the .proto file

gRPC uses a contract-first approach to API development. Protocol buffers (protobuf) are used as the Interface Definition Language (IDL) by default. The _.proto_ file contains:

* The definition of the gRPC service.
* The messages sent between clients and servers.

For more information on the syntax of protobuf files, see [Create Protobuf messages for .NET apps](protobuf.md).

Consider the _greet.proto_ file used in the tutorial, [Create a gRPC client and server in ASP.NET Core](../tutorials/grpc/grpc-start.md):

* The file defines a `Greeter` service.
* The `Greeter` service defines a `SayHello` call.
* The `SayHello` call sends a `HelloRequest` message and receives a `HelloReply` message.

The file contains the following code:

[Code reference unavailable in this source snapshot: ~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/Protos/greet.proto](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/basics.md)

## Add a .proto file to a C\# app

The _.proto_ file is included in a project by adding it to the `<Protobuf>` item group:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/GrpcGreeter.csproj?highlight=2\&range=10-12)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/GrpcGreeter.csproj.md)

By default, a `<Protobuf>` reference generates a concrete client and a service base class. The reference element's `GrpcServices` attribute can be used to limit C# asset generation. Valid `GrpcServices` options are:

* `Both` (default when not present)
* `Server`
* `Client`
* `None`

## C# tooling support for .proto files

The tooling package [Grpc.Tools](https://www.nuget.org/packages/Grpc.Tools/) is required to generate the C# assets from _.proto_ files.

The generated assets (files) have the following characteristics:

* They're generated on an as-needed basis each time the project is built.
* They aren't added to the project or checked into source control.
* They're a build artifact contained in the _obj_ directory.

Both the server and client projects require this package. The `Grpc.AspNetCore` metapackage includes a reference to `Grpc.Tools`. Server projects can add `Grpc.AspNetCore` by using the Package Manager in Visual Studio or by adding a `<PackageReference>` to the project file:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/GrpcGreeter.csproj?highlight=1\&range=15)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/GrpcGreeter.csproj.md)

Client projects should directly reference `Grpc.Tools` alongside the other packages required to use the gRPC client. The tooling package isn't required at runtime, so the dependency is marked with the `PrivateAssets="All"` setting:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeterClient/GrpcGreeterClient.csproj?highlight=3\&range=11-16)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeterClient/GrpcGreeterClient.csproj.md)

## Generated C# assets

The tooling package generates the C# types representing the messages defined in the included _.proto_ files.

For server-side assets, an abstract service base type is generated. The base type contains the definitions of all the gRPC calls contained in the _.proto_ file. Create a concrete service implementation that derives from this base type and implements the logic for the gRPC calls. For the _greet.proto_ file used in a [previous example](#review-the-proto-file), an abstract `GreeterBase` type that contains a virtual `SayHello` method is generated. A concrete implementation `GreeterService` overrides the method and implements the logic handling the gRPC call.

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/Services/GreeterService.cs?name=snippet)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/Services/GreeterService.cs.md)

For client-side assets, a concrete client type is generated. The gRPC calls in the _.proto_ file are translated into methods on the concrete type, which can be called. For the _greet.proto_ file used in a [previous example](#review-the-proto-file), a concrete `GreeterClient` type is generated. Call `GreeterClient.SayHelloAsync` to initiate a gRPC call to the server.

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeterClient/Program.cs?name=snippet)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeterClient/Program.cs.md)

By default, server and client assets are generated for each _.proto_ file included in the `<Protobuf>` item group. To ensure only the server assets are generated in a server project, the `GrpcServices` attribute is set to `Server`.

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/GrpcGreeter.csproj?highlight=2\&range=10-12)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/GrpcGreeter.csproj.md)

Similarly, the attribute is set to `Client` in client projects.

## Related content

* [Overview for gRPC on .NET](index.md)
* [Create a .NET gRPC client and server in ASP.NET Core](../tutorials/grpc/grpc-start.md)
* [gRPC services with ASP.NET Core](aspnetcore.md)
* [Call gRPC services with the .NET client](client.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

This document outlines the concepts needed to write [gRPC](https://grpc.io/docs/guides/) apps in C#. The topics covered here apply to both [C-core](https://grpc.io/blog/grpc-stacks)-based and ASP.NET Core-based gRPC apps.

## proto file

gRPC uses a contract-first approach to API development. Protocol buffers (protobuf) are used as the Interface Definition Language (IDL) by default. The `.proto` file contains:

* The definition of the gRPC service.
* The messages sent between clients and servers.

For more information on the syntax of protobuf files, see [grpc/protobuf](protobuf.md).

For example, consider the *greet.proto* file used in [Get started with gRPC service](../tutorials/grpc/grpc-start.md):

* Defines a `Greeter` service.
* The `Greeter` service defines a `SayHello` call.
* `SayHello` sends a `HelloRequest` message and receives a `HelloReply` message:

[Code reference unavailable in this source snapshot: ~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/Protos/greet.proto](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/basics.md)

## Add a `.proto` file to a C\# app

The `.proto` file is included in a project by adding it to the `<Protobuf>` item group:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/GrpcGreeter.csproj?highlight=2\&range=7-9)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/GrpcGreeter.csproj.md)

By default, a `<Protobuf>` reference generates a concrete client and a service base class. The reference element's `GrpcServices` attribute can be used to limit C# asset generation. Valid `GrpcServices` options are:

* `Both` (default when not present)
* `Server`
* `Client`
* `None`

## C# Tooling support for `.proto` files

The tooling package [Grpc.Tools](https://www.nuget.org/packages/Grpc.Tools/) is required to generate the C# assets from `.proto` files. The generated assets (files):

* Are generated on an as-needed basis each time the project is built.
* Aren't added to the project or checked into source control.
* Are a build artifact contained in the *obj* directory.

This package is required by both the server and client projects. The `Grpc.AspNetCore` metapackage includes a reference to `Grpc.Tools`. Server projects can add `Grpc.AspNetCore` using the Package Manager in Visual Studio or by adding a `<PackageReference>` to the project file:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/GrpcGreeter.csproj?highlight=1\&range=12)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/GrpcGreeter.csproj.md)

Client projects should directly reference `Grpc.Tools` alongside the other packages required to use the gRPC client. The tooling package isn't required at runtime, so the dependency is marked with `PrivateAssets="All"`:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/GrpcGreeterClient.csproj?highlight=3\&range=9-14)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/GrpcGreeterClient.csproj.md)

## Generated C# assets

The tooling package generates the C# types representing the messages defined in the included `.proto` files.

For server-side assets, an abstract service base type is generated. The base type contains the definitions of all the gRPC calls contained in the `.proto` file. Create a concrete service implementation that derives from this base type and implements the logic for the gRPC calls. For the `greet.proto`, the example described previously, an abstract `GreeterBase` type that contains a virtual `SayHello` method is generated. A concrete implementation `GreeterService` overrides the method and implements the logic handling the gRPC call.

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/Services/GreeterService.cs?name=snippet)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/Services/GreeterService.cs.md)

For client-side assets, a concrete client type is generated. The gRPC calls in the `.proto` file are translated into methods on the concrete type, which can be called. For the `greet.proto`, the example described previously, a concrete `GreeterClient` type is generated. Call `GreeterClient.SayHelloAsync` to initiate a gRPC call to the server.

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs?name=snippet)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs.md)

By default, server and client assets are generated for each `.proto` file included in the `<Protobuf>` item group. To ensure only the server assets are generated in a server project, the `GrpcServices` attribute is set to `Server`.

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/GrpcGreeter.csproj?highlight=2\&range=7-9)](../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeter/GrpcGreeter.csproj.md)

Similarly, the attribute is set to `Client` in client projects.

## Related content

* [grpc/index](index.md)
* [tutorials/grpc/grpc-start](../tutorials/grpc/grpc-start.md)
* [grpc/aspnetcore](aspnetcore.md)
* [grpc/client](client.md)
