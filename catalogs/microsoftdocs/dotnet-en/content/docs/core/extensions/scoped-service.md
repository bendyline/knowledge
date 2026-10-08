---
title: Use scoped services within a BackgroundService
description: Learn how to use scoped services within a BackgroundService in .NET.
ms.date: 05/27/2026
ms.topic: tutorial
---

# Use scoped services within a `BackgroundService`

When you register implementations of [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService) using any of the [Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*) extension methods, the service is registered as a singleton. There might be scenarios where you'd like to rely on a scoped service. For more information, see [Service lifetimes](dependency-injection/service-lifetimes.md).

In this tutorial, you learn how to:

> 
>
> - Correctly resolve scoped dependencies in a singleton [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService).
> - Delegate work to a scoped service.
> - Implement an `override` of [Microsoft.Extensions.Hosting.BackgroundService.StopAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService.StopAsync(System.Threading.CancellationToken)).


> **Tip:**
> All of the "Workers in .NET" example source code is available in the **Samples Browser** for download. For more information, see [Browse code samples: Workers in .NET](https://learn.microsoft.com/samples/dotnet/samples/csharp-workers-fundamentals).


## Prerequisites

- The [.NET 8.0 SDK or later](https://dotnet.microsoft.com/download/dotnet/8.0)
- A .NET integrated development environment (IDE), for example, [Visual Studio](https://visualstudio.microsoft.com)

<!-- ## Create a new project -->

## Create a new project

To create a new Worker Service project with Visual Studio, you'd select **File** > **New** > **Project...**. From the **Create a new project** dialog search for "Worker Service", and select Worker Service template. If you'd rather use the .NET CLI, open your favorite terminal in a working directory. Run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see [dotnet new worker](../tools/dotnet-new-sdk-templates.md#web-others).

> **Tip:**
> If you're using Visual Studio Code, you can run .NET CLI commands from the integrated terminal. For more information, see [Visual Studio Code: Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).


## Create scoped services

To use [scoped services](dependency-injection/service-lifetimes.md#scoped) within a `BackgroundService`, create an async scope with the [Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.CreateAsyncScope*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.CreateAsyncScope*) API. No scope is created for a hosted service by default. The scoped background service contains the background task's logic.

[source="snippets/workers/scoped-service/IScopedProcessingService.cs"::: (complete source file; reference: snippets/workers/scoped-service/IScopedProcessingService.cs)](../../../_code/docs/core/extensions/snippets/workers/scoped-service/IScopedProcessingService.cs.md)

The preceding interface defines a single `DoWorkAsync` method. Create an implementation in a new class named *DefaultScopedProcessingService.cs*:

[source="snippets/workers/scoped-service/DefaultScopedProcessingService.cs"::: (complete source file; reference: snippets/workers/scoped-service/DefaultScopedProcessingService.cs)](../../../_code/docs/core/extensions/snippets/workers/scoped-service/DefaultScopedProcessingService.cs.md)

- An [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) is injected into the service using a primary constructor.
- The `DoWorkAsync` method returns a `Task` and accepts the [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken).
  - The method logs the instance identifier—the `_instanceId` is assigned whenever the class is instantiated.

## Rewrite the Worker class

Replace the existing `Worker` class with the following C# code, and rename the file to *ScopedBackgroundService.cs*:

[source="snippets/workers/scoped-service/ScopedBackgroundService.cs" highlight="14-24"::: (complete source file; reference: snippets/workers/scoped-service/ScopedBackgroundService.cs)](../../../_code/docs/core/extensions/snippets/workers/scoped-service/ScopedBackgroundService.cs.md)

In the preceding code, while the `stoppingToken` isn't canceled, the `IServiceScopeFactory` is used to create an async scope. From the `AsyncServiceScope`, the `IScopedProcessingService` is resolved. The `DoWorkAsync` method is awaited, and the `stoppingToken` is passed to the method. Finally, the execution is delayed for 10 seconds and the loop continues. Each time the `DoWorkAsync` method is called, a new instance of the `DefaultScopedProcessingService` is created and the instance identifier is logged.

Replace the template *Program.cs* file contents with the following C# code:

[source="snippets/workers/scoped-service/Program.cs" highlight="4-5"::: (complete source file; reference: snippets/workers/scoped-service/Program.cs)](../../../_code/docs/core/extensions/snippets/workers/scoped-service/Program.cs.md)

The services are registered in (*Program.cs*). The hosted service is registered with the [Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*) extension method.

For more information on registering services, see [Dependency injection in .NET](dependency-injection/overview.md).

## Verify service functionality


To run the application from Visual Studio, select <kbd>F5</kbd> or select the **Debug** > **Start Debugging** menu option. If you're using the .NET CLI, run the `dotnet run` command from the working directory:

```dotnetcli
dotnet run
```

For more information on the .NET CLI run command, see [dotnet run](../tools/dotnet-run.md).


Let the application run for a bit to generate several calls to `DoWorkAsync`, thus logging new instance identifiers. You see output similar to the following logs:

```Output
info: App.ScopedService.ScopedBackgroundService[0]
      ScopedBackgroundService is running.
info: App.ScopedService.DefaultScopedProcessingService[0]
      DefaultScopedProcessingService doing work, instance ID: 8986a86f-b444-4139-b9ea-587daae4a6dd
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\scoped-service
info: App.ScopedService.DefaultScopedProcessingService[0]
      DefaultScopedProcessingService doing work, instance ID: 07a4a760-8e5a-4c0a-9e73-fcb2f93157d3
info: App.ScopedService.DefaultScopedProcessingService[0]
      DefaultScopedProcessingService doing work, instance ID: c847f432-acca-47ee-8720-1030859ce354
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: App.ScopedService.ScopedBackgroundService[0]
      ScopedBackgroundService is stopping.
```


If running the application from within Visual Studio, select **Debug** > **Stop Debugging...**. Alternatively, select <kbd>Ctrl</kbd> + <kbd>C</kbd> from the console window to signal cancellation.


## See also

- [Worker Services in .NET](workers.md)
- [Create a Queue Service](queue-service.md)
- [Create a Windows Service using `BackgroundService`](windows-service.md)
- [Implement the `IHostedService` interface](timer-service.md)
