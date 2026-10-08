---
title: Inter-process communication with gRPC
ai-usage: ai-assisted
author: jamesnk
description: Learn how to use gRPC for inter-process communication.
monikerRange: '>= aspnetcore-5.0'
ms.author: wpickett
ms.date: 07/07/2026
uid: grpc/interprocess
---
# Inter-process communication with gRPC

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


**Applies to: \>= aspnetcore-8.0**

Processes running on the same machine can be designed to communicate with each other. Operating systems provide technologies for enabling fast and efficient [inter-process communication (IPC)](https://wikipedia.org/wiki/Inter-process_communication). Popular examples of IPC technologies are Unix domain sockets and Named pipes.

.NET provides support for inter-process communication using gRPC.

Built-in support for Named pipes in ASP.NET Core requires .NET 8 or later.

## Get started

IPC calls are sent from a client to a server. To communicate between apps on a machine with gRPC, at least one app must host an ASP.NET Core gRPC server.

An ASP.NET Core gRPC server is usually created from the gRPC template. The project file created by the template uses `Microsoft.NET.SDK.Web` as the SDK:

[Code example (complete source file; reference: \~/grpc/interprocess/Server-web.csproj?highlight=1)](../../_code/aspnetcore/grpc/interprocess/Server-web.csproj.md)

The `Microsoft.NET.SDK.Web` SDK value automatically adds a reference to the ASP.NET Core framework. The reference allows the app to use ASP.NET Core types required to host a server.

It's also possible to add a server to existing non-ASP.NET Core projects, such as Windows Services, WPF apps, or WinForms apps. See [Host gRPC in non-ASP.NET Core projects](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23host-grpc-in-non-aspnet-core-projects) for more information.

## Inter-process communication (IPC) transports

gRPC calls between a client and server on different machines are usually sent over TCP sockets. TCP is a good choice for communicating across a network or the Internet. However, IPC transports offer advantages when communicating between processes on the same machine:

* Less overhead and faster transfer speeds.
* Integration with OS security features.
* Doesn't use TCP ports, which are a limited resource.

.NET supports multiple IPC transports:

* [Unix domain sockets (UDS)](https://wikipedia.org/wiki/Unix_domain_socket) is a widely supported IPC technology. UDS is the best choice for building cross-platform apps, and it's usable on Linux, macOS, and [Windows 10/Windows Server 2019 or later](https://devblogs.microsoft.com/commandline/af_unix-comes-to-windows/).
* [Named pipes](https://wikipedia.org/wiki/Named_pipe) are supported by all versions of Windows. Named pipes integrate well with [Windows security](https://learn.microsoft.com/windows/win32/ipc/named-pipe-security-and-access-rights), which can control client access to the pipe.
* Additional IPC transports by implementing [Microsoft.AspNetCore.Connections.IConnectionListenerFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.IConnectionListenerFactory) and registering the implementation at app startup.

Depending on the OS, cross-platform apps may choose different IPC transports. An app can check the OS on startup and choose the desired transport for that platform:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    if (OperatingSystem.IsWindows())
    {
        serverOptions.ListenNamedPipe("MyPipeName");
    }
    else
    {
        var socketPath = Path.Combine(Path.GetTempPath(), "socket.tmp");
        serverOptions.ListenUnixSocket(socketPath);
    }

    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http2;
    });
});
```

## Security considerations

IPC apps send and receive RPC calls. External communication is a potential attack vector for IPC apps and must be properly secured.

### Secure IPC server app against unexpected callers

The IPC server app hosts RPC services for other apps to call. Incoming callers should be authenticated to prevent untrusted clients from making RPC calls to the server.

Transport security is one option for securing a server. IPC transports, such as Unix domain sockets and named pipes, support limiting access based on operating system permissions:

* Named pipes supports securing a pipe with the [Windows access control model](https://learn.microsoft.com/windows/win32/ipc/named-pipe-security-and-access-rights). Access rights can be configured in .NET when a server is started using the [System.IO.Pipes.PipeSecurity](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeSecurity) class.
* Unix domain sockets support securing a socket with file permissions.

Another option for securing an IPC server is to use authentication and authorization built into ASP.NET Core. For example, the server could be configured to require [certificate authentication](../security/authentication/certauth.md). RPC calls made by client apps without the required certificate fail with an unauthorized response.

### Validate the server in the IPC client app

It's important for the client app to validate the identity of the server it is calling. Validation is necessary to protect against a malicious actor from stopping the trusted server, running their own, and accepting incoming data from clients.

Named pipes provides support for getting the account that a server is running under. A client can validate the server was launched by the expected account:

```cs
internal static bool CheckPipeConnectionOwnership(
    NamedPipeClientStream pipeStream, SecurityIdentifier expectedOwner)
{
    var remotePipeSecurity = pipeStream.GetAccessControl();
    var remoteOwner = remotePipeSecurity.GetOwner(typeof(SecurityIdentifier));
    return expectedOwner.Equals(remoteOwner);
}
```

Another option for validating the server is to [secure its endpoints with HTTPS](https://learn.microsoft.com/aspnet/core/fundamentals/servers/kestrel/endpoints#configure-https) inside ASP.NET Core. The client can configure `SocketsHttpHandler` to validate the server is using the expected certificate when the connection is established.

```cs
var socketsHttpHandler = new SocketsHttpHandler()
{
    SslOptions = new SslOptions()
    {
        RemoteCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) =>
        {
            if (sslPolicyErrors != SslPolicyErrors.None)
            {
                return false;
            }

            // Validate server cert thumbprint matches the expected thumbprint.
        }
    }
};
```

### Protect against named pipe privilege escalation

Named pipes supports a feature called [impersonation](https://learn.microsoft.com/windows/win32/ipc/impersonating-a-named-pipe-client). Using impersonation, the named pipes server can execute code with the privileges of the client user. This is a powerful feature but can allow a low-privilege server to impersonate a high-privilege caller and then run malicious code.

Client's can protect against this attack by not allowing impersonation when connecting to a server. Unless required by a server, a [System.Security.Principal.TokenImpersonationLevel](https://learn.microsoft.com/search/?terms=System.Security.Principal.TokenImpersonationLevel) value of `None` or `Anonymous` should be used when creating a client connection:

```cs
using var pipeClient = new NamedPipeClientStream(
    serverName: ".", pipeName: "testpipe", PipeDirection.In, PipeOptions.None, TokenImpersonationLevel.None);
await pipeClient.ConnectAsync();
```

`TokenImpersonationLevel.None` is the default value in `NamedPipeClientStream` constructors that don't have an `impersonationLevel` parameter.

## Configure client and server

The client and server must be configured to use an inter-process communication (IPC) transport. For more information about configuring Kestrel and [System.Net.Http.SocketsHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler) to use IPC:

* [Inter-process communication with gRPC and Unix domain sockets](interprocess-uds.md)
* [Inter-process communication with gRPC and Named pipes](interprocess-namedpipes.md)

> **Note:**
> Built-in support for Named pipes in ASP.NET Core requires .NET 8 or later.

> **Warning:**
> An IPC transport, such as Unix domain sockets or named pipes, requires the client to configure `SocketsHttpHandler.ConnectCallback` to create a connection to the custom endpoint. A channel that uses a `ConnectCallback` doesn't support client-side load balancing or connectivity state tracking, and the following features aren't available:
>
> * Client-side load balancing configured with `ServiceConfig.LoadBalancingConfigs`.
> * Connectivity state tracking with `GrpcChannel.State` and `GrpcChannel.WaitForStateChangedAsync`.
>
> Attempting to use these features on a channel configured for IPC throws an exception:
>
> ```output
> System.InvalidOperationException: Channel is configured with an HTTP transport doesn't support client-side load balancing or connectivity state tracking. The underlying HTTP transport must be a SocketsHttpHandler with no SocketsHttpHandler.ConnectCallback configured. The HTTP transport must be configured on the channel using GrpcChannelOptions.HttpHandler.
> ```



**Applies to: \>= aspnetcore-5.0 < aspnetcore-8.0**

Processes running on the same machine can be designed to communicate with each other. Operating systems provide technologies for enabling fast and efficient [inter-process communication (IPC)](https://wikipedia.org/wiki/Inter-process_communication). Popular examples of IPC technologies are Unix domain sockets and Named pipes.

.NET provides support for inter-process communication using gRPC.

> **Note:**
> Built-in support for Named pipes in ASP.NET Core requires .NET 8 or later.  
> For more information, see [the .NET 8 or later version of this topic](interprocess.md)

## Get started

gRPC calls are sent from a client to a server. To communicate between apps on a machine with gRPC, at least one app must host an ASP.NET Core gRPC server.

ASP.NET Core and gRPC can be hosted in any app using .NET Core 3.1 or later by adding the `Microsoft.AspNetCore.App` framework to the project.

[Code reference unavailable in this source snapshot: interprocess/includes/~/grpc/interprocess/Server.csproj?highlight=4-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/interprocess.md)

The preceding project file:

* Adds a framework reference to `Microsoft.AspNetCore.App`. The framework reference allows non-ASP.NET Core apps, such as Windows Services, WPF apps, or WinForms apps to use ASP.NET Core and host an ASP.NET Core server.
* Adds a NuGet package reference to [`Grpc.AspNetCore`](https://www.nuget.org/packages/Grpc.AspNetCore).
* Adds a `.proto` file.

## Configure Unix domain sockets

gRPC calls between a client and server on different machines are usually sent over TCP sockets. TCP was designed for communicating across a network. [Unix domain sockets (UDS)](https://wikipedia.org/wiki/Unix_domain_socket) are a widely supported IPC technology that's more efficient than TCP when the client and server are on the same machine. .NET provides built-in support for UDS in client and server apps.

Requirements:

* .NET 5 or later
* Linux, macOS, or [Windows 10/Windows Server 2019 or later](https://devblogs.microsoft.com/commandline/af_unix-comes-to-windows/)

### Server configuration

Unix domain sockets (UDS) are supported by [Kestrel](../fundamentals/servers/kestrel.md), which is configured in `Program.cs`:

```csharp
public static readonly string SocketPath = Path.Combine(Path.GetTempPath(), "socket.tmp");

public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
            webBuilder.ConfigureKestrel(options =>
            {
                if (File.Exists(SocketPath))
                {
                    File.Delete(SocketPath);
                }
                options.ListenUnixSocket(SocketPath, listenOptions =>
                {
                    listenOptions.Protocols = HttpProtocols.Http2;
                });
            });
        });
```

The preceding example:

* Configures Kestrel's endpoints in `ConfigureKestrel`.
* Calls [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) to listen to a UDS with the specified path.
* Creates a UDS endpoint that isn't configured to use HTTPS. For information about enabling HTTPS, see [Kestrel HTTPS endpoint configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23listenoptionsusehttps).

### Client configuration

`GrpcChannel` supports making gRPC calls over custom transports. When a channel is created, it can be configured with a `SocketsHttpHandler` that has a custom `ConnectCallback`. The callback allows the client to make connections over custom transports and then send HTTP requests over that transport.

Unix domain sockets connection factory example:

```csharp
public class UnixDomainSocketConnectionFactory
{
    private readonly EndPoint _endPoint;

    public UnixDomainSocketConnectionFactory(EndPoint endPoint)
    {
        _endPoint = endPoint;
    }

    public async ValueTask<Stream> ConnectAsync(SocketsHttpConnectionContext _,
        CancellationToken cancellationToken = default)
    {
        var socket = new Socket(AddressFamily.Unix, SocketType.Stream, ProtocolType.Unspecified);

        try
        {
            await socket.ConnectAsync(_endPoint, cancellationToken).ConfigureAwait(false);
            return new NetworkStream(socket, true);
        }
        catch
        {
            socket.Dispose();
            throw;
        }
    }
}
```

Using the custom connection factory to create a channel:

```csharp
public static readonly string SocketPath = Path.Combine(Path.GetTempPath(), "socket.tmp");

public static GrpcChannel CreateChannel()
{
    var udsEndPoint = new UnixDomainSocketEndPoint(SocketPath);
    var connectionFactory = new UnixDomainSocketConnectionFactory(udsEndPoint);
    var socketsHttpHandler = new SocketsHttpHandler
    {
        ConnectCallback = connectionFactory.ConnectAsync
    };

    return GrpcChannel.ForAddress("http://localhost", new GrpcChannelOptions
    {
        HttpHandler = socketsHttpHandler
    });
}
```

Channels created using the preceding code send gRPC calls over Unix domain sockets. Support for other IPC technologies can be implemented using the extensibility in Kestrel and `SocketsHttpHandler`.
