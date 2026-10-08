---
title: Host ASP.NET Core SignalR in background services
author: wadepickett
description: Learn how to send messages to SignalR clients from .NET BackgroundService classes.
monikerRange: '>= aspnetcore-2.2'
ms.author: wpickett
ms.date: 11/12/2019
uid: signalr/background-services
---
# Host ASP.NET Core SignalR in background services

By [Dave Pringle](https://github.com/UncleDave) and [Brady Gaster](https://twitter.com/bradygaster)

This article provides guidance for:

* Hosting SignalR Hubs using a background worker process hosted with ASP.NET Core.
* Sending messages to connected clients from within a .NET [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService).

**Applies to: \>= aspnetcore-6.0**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/background-service/samples/6.0) [(how to download)](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)

## Enable SignalR at app startup


Hosting ASP.NET Core SignalR Hubs in the context of a background worker process is identical to hosting a Hub in an ASP.NET Core web app. In `Program.cs`, calling `builder.Services.AddSignalR` adds the required services to the ASP.NET Core Dependency Injection (DI) layer to support SignalR. The `MapHub` method is called on the `WebApplication` `app` to connect the Hub endpoints in the ASP.NET Core request pipeline.

[Program (complete source file; reference: background-service/samples/6.0/Server/Program.cs?name=Program)](../../_code/aspnetcore/signalr/background-service/samples/6.0/Server/Program.cs.md)

In the preceding example, the `ClockHub` class implements the `Hub<T>` class to create a strongly typed Hub. The `ClockHub` has been configured in `Program.cs` to respond to requests at the endpoint `/hubs/clock`.

For more information on strongly typed Hubs, see [Use hubs in SignalR for ASP.NET Core](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs).

> **Note:**
> This functionality isn't limited to the [Hub\<T>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub%601) class. Any class that inherits from [Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub), such as [DynamicHub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DynamicHub), works.

[ClockHub (complete source file; reference: background-service/samples/6.0/Server/ClockHub.cs?name=ClockHub)](../../_code/aspnetcore/signalr/background-service/samples/6.0/Server/ClockHub.cs.md)

The interface used by the strongly typed `ClockHub` is the `IClock` interface.

[IClock (complete source file; reference: background-service/samples/6.0/HubServiceInterfaces/IClock.cs?name=IClock)](../../_code/aspnetcore/signalr/background-service/samples/6.0/HubServiceInterfaces/IClock.cs.md)

## Call a SignalR Hub from a background service

During startup, the `Worker` class, a `BackgroundService`, is enabled using `AddHostedService`.

```csharp
builder.Services.AddHostedService<Worker>();
```

Since SignalR is also enabled up during the startup phase, in which each Hub is attached to an individual endpoint in ASP.NET Core's HTTP request pipeline, each Hub is represented by an `IHubContext<T>` on the server. Using ASP.NET Core's DI features, other classes instantiated by the hosting layer, like `BackgroundService` classes, MVC Controller classes, or Razor page models, can get references to server-side Hubs by accepting instances of `IHubContext<ClockHub, IClock>` during construction.

[Worker (complete source file; reference: background-service/samples/6.0/Server/Worker.cs?name=Worker)](../../_code/aspnetcore/signalr/background-service/samples/6.0/Server/Worker.cs.md)

As the `ExecuteAsync` method is called iteratively in the background service, the server's current date and time are sent to the connected clients using the `ClockHub`.

## React to SignalR events with background services

Like a Single Page App using the JavaScript client for SignalR, or a .NET desktop app using the [signalr/dotnet-client](dotnet-client.md), a `BackgroundService` or `IHostedService` implementation can also be used to connect to SignalR Hubs and respond to events.

The `ClockHubClient` class implements both the `IClock` interface and the `IHostedService` interface. This way it can be enabled during startup to run continuously and respond to Hub events from the server.

```csharp
public partial class ClockHubClient : IClock, IHostedService
{
}
```

During initialization, the `ClockHubClient` creates an instance of a `HubConnection` and enables the `IClock.ShowTime` method as the handler for the Hub's `ShowTime` event.

[The ClockHubClient constructor (complete source file; reference: background-service/samples/6.0/Clients.ConsoleTwo/ClockHubClient.cs?name=ClockHubClientCtor)](../../_code/aspnetcore/signalr/background-service/samples/6.0/Clients.ConsoleTwo/ClockHubClient.cs.md)

In the `IHostedService.StartAsync` implementation, the `HubConnection` is started asynchronously.

[StartAsync method (complete source file; reference: background-service/samples/6.0/Clients.ConsoleTwo/ClockHubClient.cs?name=StartAsync)](../../_code/aspnetcore/signalr/background-service/samples/6.0/Clients.ConsoleTwo/ClockHubClient.cs.md)

During the `IHostedService.StopAsync` method, the `HubConnection` is disposed of asynchronously.

[StopAsync method (complete source file; reference: background-service/samples/6.0/Clients.ConsoleTwo/ClockHubClient.cs?name=StopAsync)](../../_code/aspnetcore/signalr/background-service/samples/6.0/Clients.ConsoleTwo/ClockHubClient.cs.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/background-service/samples/3.x) [(how to download)](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)

## Enable SignalR in startup

Hosting ASP.NET Core SignalR Hubs in the context of a background worker process is identical to hosting a Hub in an ASP.NET Core web app. In the `Startup.ConfigureServices` method, calling `services.AddSignalR` adds the required services to the ASP.NET Core Dependency Injection (DI) layer to support SignalR. In `Startup.Configure`, the `MapHub` method is called in the `UseEndpoints` callback to connect the Hub endpoints in the ASP.NET Core request pipeline.

[Startup (complete source file; reference: background-service/samples/3.x/Server/Startup.cs?name=Startup)](../../_code/aspnetcore/signalr/background-service/samples/3.x/Server/Startup.cs.md)

In the preceding example, the `ClockHub` class implements the `Hub<T>` class to create a strongly typed Hub. The `ClockHub` has been configured in the `Startup` class to respond to requests at the endpoint `/hubs/clock`.

For more information on strongly typed Hubs, see [Use hubs in SignalR for ASP.NET Core](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs).

> **Note:**
> This functionality isn't limited to the [Hub\<T>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub%601) class. Any class that inherits from [Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub), such as [DynamicHub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DynamicHub), works.

[ClockHub (complete source file; reference: background-service/samples/3.x/Server/ClockHub.cs?name=ClockHub)](../../_code/aspnetcore/signalr/background-service/samples/3.x/Server/ClockHub.cs.md)

The interface used by the strongly typed `ClockHub` is the `IClock` interface.

[IClock (complete source file; reference: background-service/samples/3.x/HubServiceInterfaces/IClock.cs?name=IClock)](../../_code/aspnetcore/signalr/background-service/samples/3.x/HubServiceInterfaces/IClock.cs.md)

## Call a SignalR Hub from a background service

During startup, the `Worker` class, a `BackgroundService`, is enabled using `AddHostedService`.

```csharp
services.AddHostedService<Worker>();
```

Since SignalR is also enabled up during the `Startup` phase, in which each Hub is attached to an individual endpoint in ASP.NET Core's HTTP request pipeline, each Hub is represented by an `IHubContext<T>` on the server. Using ASP.NET Core's DI features, other classes instantiated by the hosting layer, like `BackgroundService` classes, MVC Controller classes, or Razor page models, can get references to server-side Hubs by accepting instances of `IHubContext<ClockHub, IClock>` during construction.

[Worker (complete source file; reference: background-service/samples/3.x/Server/Worker.cs?name=Worker)](../../_code/aspnetcore/signalr/background-service/samples/3.x/Server/Worker.cs.md)

As the `ExecuteAsync` method is called iteratively in the background service, the server's current date and time are sent to the connected clients using the `ClockHub`.

## React to SignalR events with background services

Like a Single Page App using the JavaScript client for SignalR, or a .NET desktop app using the [signalr/dotnet-client](dotnet-client.md), a `BackgroundService` or `IHostedService` implementation can also be used to connect to SignalR Hubs and respond to events.

The `ClockHubClient` class implements both the `IClock` interface and the `IHostedService` interface. This way it can be enabled during `Startup` to run continuously and respond to Hub events from the server.

```csharp
public partial class ClockHubClient : IClock, IHostedService
{
}
```

During initialization, the `ClockHubClient` creates an instance of a `HubConnection` and enables the `IClock.ShowTime` method as the handler for the Hub's `ShowTime` event.

[The ClockHubClient constructor (complete source file; reference: background-service/samples/3.x/Clients.ConsoleTwo/ClockHubClient.cs?name=ClockHubClientCtor)](../../_code/aspnetcore/signalr/background-service/samples/3.x/Clients.ConsoleTwo/ClockHubClient.cs.md)

In the `IHostedService.StartAsync` implementation, the `HubConnection` is started asynchronously.

[StartAsync method (complete source file; reference: background-service/samples/3.x/Clients.ConsoleTwo/ClockHubClient.cs?name=StartAsync)](../../_code/aspnetcore/signalr/background-service/samples/3.x/Clients.ConsoleTwo/ClockHubClient.cs.md)

During the `IHostedService.StopAsync` method, the `HubConnection` is disposed of asynchronously.

[StopAsync method (complete source file; reference: background-service/samples/3.x/Clients.ConsoleTwo/ClockHubClient.cs?name=StopAsync)](../../_code/aspnetcore/signalr/background-service/samples/3.x/Clients.ConsoleTwo/ClockHubClient.cs.md)



**Applies to: <= aspnetcore-2.2**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/background-service/samples/2.2) [(how to download)](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)

## Enable SignalR in startup

Hosting ASP.NET Core SignalR Hubs in the context of a background worker process is identical to hosting a Hub in an ASP.NET Core web app. In the `Startup.ConfigureServices` method, calling `services.AddSignalR` adds the required services to the ASP.NET Core Dependency Injection (DI) layer to support SignalR. In `Startup.Configure`, the `UseSignalR` method is called to connect the Hub endpoints in the ASP.NET Core request pipeline.

[Startup (complete source file; reference: background-service/samples/2.2/Server/Startup.cs?name=Startup)](../../_code/aspnetcore/signalr/background-service/samples/2.2/Server/Startup.cs.md)

In the preceding example, the `ClockHub` class implements the `Hub<T>` class to create a strongly typed Hub. The `ClockHub` has been configured in the `Startup` class to respond to requests at the endpoint `/hubs/clock`.

For more information on strongly typed Hubs, see [Use hubs in SignalR for ASP.NET Core](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs).

> **Note:**
> This functionality isn't limited to the [Hub\<T>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub%601) class. Any class that inherits from [Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub), such as [DynamicHub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DynamicHub), works.

[ClockHub (complete source file; reference: background-service/samples/2.2/Server/ClockHub.cs?name=ClockHub)](../../_code/aspnetcore/signalr/background-service/samples/2.2/Server/ClockHub.cs.md)

The interface used by the strongly typed `ClockHub` is the `IClock` interface.

[IClock (complete source file; reference: background-service/samples/2.2/HubServiceInterfaces/IClock.cs?name=IClock)](../../_code/aspnetcore/signalr/background-service/samples/2.2/HubServiceInterfaces/IClock.cs.md)

## Call a SignalR Hub from a background service

During startup, the `Worker` class, a `BackgroundService`, is enabled using `AddHostedService`.

```csharp
services.AddHostedService<Worker>();
```

Since SignalR is also enabled up during the `Startup` phase, in which each Hub is attached to an individual endpoint in ASP.NET Core's HTTP request pipeline, each Hub is represented by an `IHubContext<T>` on the server. Using ASP.NET Core's DI features, other classes instantiated by the hosting layer, like `BackgroundService` classes, MVC Controller classes, or Razor page models, can get references to server-side Hubs by accepting instances of `IHubContext<ClockHub, IClock>` during construction.

[Startup (complete source file; reference: background-service/samples/2.2/Server/Worker.cs?name=Worker)](../../_code/aspnetcore/signalr/background-service/samples/2.2/Server/Worker.cs.md)

As the `ExecuteAsync` method is called iteratively in the background service, the server's current date and time are sent to the connected clients using the `ClockHub`.

## React to SignalR events with background services

Like a Single Page App using the JavaScript client for SignalR, or a .NET desktop app using the [signalr/dotnet-client](dotnet-client.md), a `BackgroundService` or `IHostedService` implementation can also be used to connect to SignalR Hubs and respond to events.

The `ClockHubClient` class implements both the `IClock` interface and the `IHostedService` interface. This way it can be enabled during `Startup` to run continuously and respond to Hub events from the server.

```csharp
public partial class ClockHubClient : IClock, IHostedService
{
}
```

During initialization, the `ClockHubClient` creates an instance of a `HubConnection` and enables the `IClock.ShowTime` method as the handler for the Hub's `ShowTime` event.

[The ClockHubClient constructor (complete source file; reference: background-service/samples/2.2/Clients.ConsoleTwo/ClockHubClient.cs?name=ClockHubClientCtor)](../../_code/aspnetcore/signalr/background-service/samples/2.2/Clients.ConsoleTwo/ClockHubClient.cs.md)

In the `IHostedService.StartAsync` implementation, the `HubConnection` is started asynchronously.

[StartAsync method (complete source file; reference: background-service/samples/2.2/Clients.ConsoleTwo/ClockHubClient.cs?name=StartAsync)](../../_code/aspnetcore/signalr/background-service/samples/2.2/Clients.ConsoleTwo/ClockHubClient.cs.md)

During the `IHostedService.StopAsync` method, the `HubConnection` is disposed of asynchronously.

[StopAsync method (complete source file; reference: background-service/samples/2.2/Clients.ConsoleTwo/ClockHubClient.cs?name=StopAsync)](../../_code/aspnetcore/signalr/background-service/samples/2.2/Clients.ConsoleTwo/ClockHubClient.cs.md)



## Additional resources

* [Get started](../tutorials/signalr.md)
* [Hubs](hubs.md)
* [Publish to Azure](publish-to-azure-web-app.md)
* [Strongly typed Hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs)
