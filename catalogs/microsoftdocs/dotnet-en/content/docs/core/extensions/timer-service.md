---
title: Implement the IHostedService interface
description: Learn how to implement a custom IHostedService interface in C#, much like the inbuilt .NET BackgroundService.
ms.date: 10/20/2025
ms.topic: tutorial
---

# Implement the `IHostedService` interface

When you need finite control beyond the provided [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService), you can implement your own [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService). The [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService) interface is the basis for all long running services in .NET. Custom implementations are registered with the [Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)) extension method.

In this tutorial, you learn how to:

> 
>
> - Implement the [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService), and [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interfaces.
> - Create a timer-based service.
> - Register the custom implementation with dependency injection and logging.


> **Tip:**
> All of the "Workers in .NET" example source code is available in the **Samples Browser** for download. For more information, see [Browse code samples: Workers in .NET](https://learn.microsoft.com/samples/dotnet/samples/csharp-workers-fundamentals).


## Prerequisites

- The [.NET 8.0 SDK or later](https://dotnet.microsoft.com/download/dotnet/8.0)
- A .NET integrated development environment (IDE)
  - Feel free to use [Visual Studio](https://visualstudio.microsoft.com)

<!-- ## Create a new project -->

## Create a new project

To create a new Worker Service project with Visual Studio, you'd select **File** > **New** > **Project...**. From the **Create a new project** dialog search for "Worker Service", and select Worker Service template. If you'd rather use the .NET CLI, open your favorite terminal in a working directory. Run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see [dotnet new worker](../tools/dotnet-new-sdk-templates.md#web-others).

> **Tip:**
> If you're using Visual Studio Code, you can run .NET CLI commands from the integrated terminal. For more information, see [Visual Studio Code: Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).


## Create timer service

The timer-based background service makes use of the [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer) class. The timer triggers the `DoWork` method. The timer is disabled on [Microsoft.Extensions.Hosting.IHostLifetime.StopAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostLifetime.StopAsync(System.Threading.CancellationToken)) and disposed when the service container is disposed on [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync):

Replace the contents of the `Worker` from the template with the following C# code, and rename the file to *TimerService.cs*:

[source="snippets/workers/timer-service/TimerService.cs" highlight="32,39-42"::: (complete source file; reference: snippets/workers/timer-service/TimerService.cs)](../../../_code/docs/core/extensions/snippets/workers/timer-service/TimerService.cs.md)

> **Important:**
> The `Worker` was a subclass of [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService). Now, the `TimerService` implements both the [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService), and [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interfaces.

The `TimerService` is `sealed`, and cascades the `DisposeAsync` call from its `_timer` instance. For more information on the "cascading dispose pattern", see [Implement a `DisposeAsync` method](../../standard/garbage-collection/implementing-disposeasync.md).

When [Microsoft.Extensions.Hosting.IHostedService.StartAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService.StartAsync*) is called, the timer is instantiated, thus starting the timer.

> **Tip:**
> The [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer) doesn't wait for previous executions of `DoWork` to finish, so the approach shown might not be suitable for every scenario. [System.Threading.Interlocked.Increment*](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked.Increment*) is used to increment the execution counter as an atomic operation, which ensures that multiple threads don't update `_executionCount` concurrently.

Replace the existing `Program` contents with the following C# code:

[source="snippets/workers/timer-service/Program.cs" highlight="4"::: (complete source file; reference: snippets/workers/timer-service/Program.cs)](../../../_code/docs/core/extensions/snippets/workers/timer-service/Program.cs.md)

The service is registered in (*Program.cs*) with the `AddHostedService` extension method. This is the same extension method you use when registering [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) subclasses, as they both implement the [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService) interface.

For more information on registering services, see [Dependency injection in .NET](dependency-injection/overview.md).

## Verify service functionality


To run the application from Visual Studio, select <kbd>F5</kbd> or select the **Debug** > **Start Debugging** menu option. If you're using the .NET CLI, run the `dotnet run` command from the working directory:

```dotnetcli
dotnet run
```

For more information on the .NET CLI run command, see [dotnet run](../tools/dotnet-run.md).


Let the application run for a bit to generate several execution count increments. You will see output similar to the following:

```Output
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is running.
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\timer-service
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 1
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 2
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 3
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 4
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is stopping.
```


If running the application from within Visual Studio, select **Debug** > **Stop Debugging...**. Alternatively, select <kbd>Ctrl</kbd> + <kbd>C</kbd> from the console window to signal cancellation.


## See also

There are several related tutorials to consider:

- [Worker Services in .NET](workers.md)
- [Create a Queue Service](queue-service.md)
- [Use scoped services within a `BackgroundService`](scoped-service.md)
- [Create a Windows Service using `BackgroundService`](windows-service.md)
