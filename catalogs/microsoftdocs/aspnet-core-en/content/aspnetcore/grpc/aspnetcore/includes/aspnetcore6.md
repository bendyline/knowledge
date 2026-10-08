**Applies to: \= aspnetcore-6.0**
This document shows how to get started with gRPC services using ASP.NET Core.

## Prerequisites

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio 2022 for Mac (latest version)](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
  
  > **Important:**
> Microsoft has announced the retirement of Visual Studio for Mac. Visual Studio for Mac will no longer be supported starting August 31, 2024. Alternatives include:
>
> * Visual Studio Code with the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) and related extensions, such as [.NET MAUI](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui) and [Unity](https://marketplace.visualstudio.com/items?itemName=visualstudiotoolsforunity.vstuc).
> * Visual Studio IDE running on Windows in a VM on Mac.
> * Visual Studio IDE running on Windows in a [VM in the Cloud](https://aka.ms/devbox).
>
> For more information, see [Visual Studio for Mac retirement announcement](https://devblogs.microsoft.com/visualstudio/visual-studio-for-mac-retirement-announcement).


---

## Get started with gRPC service in ASP.NET Core

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/grpc/grpc-start/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

# [Visual Studio](#tab/visual-studio)

See [Get started with gRPC services](../../../tutorials/grpc/grpc-start.md) for detailed instructions on how to create a gRPC project.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Run `dotnet new grpc -o GrpcGreeter` from the command line.

---

## Add gRPC services to an ASP.NET Core app

gRPC requires the [Grpc.AspNetCore](https://www.nuget.org/packages/Grpc.AspNetCore) package.

### Configure gRPC

In `Program.cs`:

* gRPC is enabled with the `AddGrpc` method.
* Each gRPC service is added to the routing pipeline through the `MapGrpcService` method.

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/Program.cs?highlight=9,14)](../../../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample6/GrpcGreeter/Program.cs.md)

ASP.NET Core middleware and features share the routing pipeline, therefore an app can be configured to serve additional request handlers. The additional request handlers, such as MVC controllers, work in parallel with the configured gRPC services.

## Server options

gRPC services can be hosted by all built-in ASP.NET Core servers.

> 
>
> * Kestrel
> * TestServer
> * IIS&dagger;
> * HTTP.sys&dagger;

&dagger;Requires .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later.

For more information about choosing the right server for an ASP.NET Core app, see [fundamentals/servers/index](../../../fundamentals/servers/index.md).

## Kestrel

[Kestrel](../../../fundamentals/servers/kestrel.md) is a cross-platform web server for ASP.NET Core. Kestrel focuses on high performance and memory utilization, but it doesn't have some of the advanced features in HTTP.sys such as port sharing.

Kestrel gRPC endpoints:

* Require HTTP/2.
* Should be secured with [Transport Layer Security (TLS)](https://tools.ietf.org/html/rfc5246).

### HTTP/2

gRPC requires HTTP/2. gRPC for ASP.NET Core validates [HttpRequest.Protocol](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Protocol%252A) is `HTTP/2`.

Kestrel [supports HTTP/2](../../../fundamentals/servers/kestrel/http2.md) on most modern operating systems. Kestrel endpoints are configured to support HTTP/1.1 and HTTP/2 connections by default.

### TLS

Kestrel endpoints used for gRPC should be secured with TLS. In development, an endpoint secured with TLS is automatically created at `https://localhost:5001` when the ASP.NET Core development certificate is present. No configuration is required. An `https` prefix verifies the Kestrel endpoint is using TLS.

In production, TLS must be explicitly configured. In the following `appsettings.json` example, an HTTP/2 endpoint secured with TLS is provided:

[Code example (complete source file; reference: \~/grpc/aspnetcore/sample/appsettings.json?highlight=4)](../../../../_code/aspnetcore/grpc/aspnetcore/sample/appsettings.json.md)

Alternatively, Kestrel endpoints can be configured in `Program.cs`:

[Code example (complete source file; reference: \~/grpc/aspnetcore/sample-6/Program.cs?highlight=5\&name=snippet)](../../../../_code/aspnetcore/grpc/aspnetcore/sample-6/Program.cs.md)

For more information on enabling TLS with Kestrel, see [Kestrel HTTPS endpoint configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23listenoptionsusehttps).

### Protocol negotiation

TLS is used for more than securing communication. The TLS [Application-Layer Protocol Negotiation (ALPN)](https://tools.ietf.org/html/rfc7301#section-3) handshake is used to negotiate the connection protocol between the client and the server when an endpoint supports multiple protocols. This negotiation determines whether the connection uses HTTP/1.1 or HTTP/2.

If an HTTP/2 endpoint is configured without TLS, the endpoint's [ListenOptions.Protocols](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23listenoptionsprotocols) must be set to `HttpProtocols.Http2`. An endpoint with multiple protocols, such as `HttpProtocols.Http1AndHttp2` for example, can't be used without TLS because there's no negotiation. All connections to the unsecured endpoint default to HTTP/1.1, and gRPC calls fail.

For more information on enabling HTTP/2 and TLS with Kestrel, see [Kestrel endpoint configuration](../../../fundamentals/servers/kestrel/endpoints.md).

> **Note:**
> macOS doesn't support ASP.NET Core gRPC with TLS before .NET 8. Additional configuration is required to successfully run gRPC services on macOS when using .NET 7 or earlier. For more information, see [Unable to start ASP.NET Core gRPC app on macOS](https://learn.microsoft.com/search/?terms=grpc%2Ftroubleshoot%23unable-to-start-aspnet-core-grpc-app-on-macos).

## IIS

[Internet Information Services (IIS)](../../../host-and-deploy/iis/index.md) is a flexible, secure and manageable Web Server for hosting web apps, including ASP.NET Core. .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later are required to host gRPC services with IIS.

IIS must be configured to use TLS and HTTP/2. For more information, see [host-and-deploy/iis/protocols](../../../host-and-deploy/iis/protocols.md).

## HTTP.sys

[HTTP.sys](../../../fundamentals/servers/httpsys.md) is a web server for ASP.NET Core that only runs on Windows. .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later are required to host gRPC services with HTTP.sys.

HTTP.sys must be configured to use TLS and HTTP/2. For more information, see  [HTTP.sys web server HTTP/2 support](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fhttpsys%23http2-support).

## Host gRPC in non-ASP.NET Core projects

An ASP.NET Core gRPC server is typically created from the gRPC template. The project file created by the template uses `Microsoft.NET.SDK.Web` as the SDK:

[Code example (complete source file; reference: \~/grpc/aspnetcore/Server-web.csproj?highlight=1)](../../../../_code/aspnetcore/grpc/aspnetcore/Server-web.csproj.md)

The `Microsoft.NET.SDK.Web` SDK value automatically adds a reference to the ASP.NET Core framework. The reference allows the app to use ASP.NET Core types required to host a server.

You can add a gRPC server to non-ASP.NET Core projects with the following project file settings:

[Code example (complete source file; reference: \~/grpc/aspnetcore/Server.csproj?highlight=1,7)](../../../../_code/aspnetcore/grpc/aspnetcore/Server.csproj.md)

The preceding project file:

* Doesn't use `Microsoft.NET.SDK.Web` as the SDK.
* Adds a framework reference to `Microsoft.AspNetCore.App`.
  * The framework reference allows non-ASP.NET Core apps, such as Windows Services, WPF apps, or WinForms apps to use ASP.NET Core APIs.
  * The app can now use ASP.NET Core APIs to start an ASP.NET Core server.
* Adds gRPC requirements:
  * NuGet package reference to [`Grpc.AspNetCore`](https://www.nuget.org/packages/Grpc.AspNetCore).
  * `.proto` file.

For more information about using the `Microsoft.AspNetCore.App` framework reference, see [Use the ASP.NET Core shared framework](https://learn.microsoft.com/search/?terms=fundamentals%2Ftarget-aspnetcore%23use-the-aspnet-core-shared-framework).

## Integration with ASP.NET Core APIs

gRPC services have full access to the ASP.NET Core features such as [Dependency Injection](../../../fundamentals/dependency-injection.md) (DI) and [Logging](../../../fundamentals/logging/index.md). For example, the service implementation can resolve a logger service from the DI container via the constructor:

```csharp
public class GreeterService : Greeter.GreeterBase
{
    public GreeterService(ILogger<GreeterService> logger)
    {
    }
}
```

By default, the gRPC service implementation can resolve other DI services with any lifetime (Singleton, Scoped, or Transient).

### Resolve HttpContext in gRPC methods

The gRPC API provides access to some HTTP/2 message data, such as the method, host, header, and trailers. Access is through the `ServerCallContext` argument passed to each gRPC method:

[Code example (complete source file; reference: \~/grpc/aspnetcore/sample/GrcpService/GreeterService.cs?highlight=3-4\&name=snippet)](../../../../_code/aspnetcore/grpc/aspnetcore/sample/GrcpService/GreeterService.cs.md)

`ServerCallContext` doesn't provide full access to `HttpContext` in all ASP.NET APIs. The `GetHttpContext` extension method provides full access to the `HttpContext` representing the underlying HTTP/2 message in ASP.NET APIs:

[Code example (complete source file; reference: \~/grpc/aspnetcore/sample/GrcpService/GreeterService2.cs?highlight=6-7\&name=snippet)](../../../../_code/aspnetcore/grpc/aspnetcore/sample/GrcpService/GreeterService2.cs.md)

## Additional resources

* [tutorials/grpc/grpc-start](../../../tutorials/grpc/grpc-start.md)
* [grpc/index](../../index.md)
* [grpc/basics](../../basics.md)
* [fundamentals/servers/kestrel](../../../fundamentals/servers/kestrel.md)
