---
title: Create a Queue Service
description: Learn how to create a queue service subclass of BackgroundService in .NET.
ms.date: 10/20/2025
ms.topic: tutorial
---

# Create a queue service

A queue service is a great example of a long-running service, where work items can be queued and worked on sequentially as previous work items are completed. Relying on the Worker Service template, you build out new functionality on top of the [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService).

In this tutorial, you learn how to:

> 
>
> - Create a queue service.
> - Delegate work to a task queue.
> - Register a console key-listener from [Microsoft.Extensions.Hosting.IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime) events.


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


## Create queuing services

You may be familiar with the [System.Web.Hosting.HostingEnvironment.QueueBackgroundWorkItem(System.Func{System.Threading.CancellationToken,System.Threading.Tasks.Task})](https://learn.microsoft.com/search/?terms=System.Web.Hosting.HostingEnvironment.QueueBackgroundWorkItem(System.Func%7BSystem.Threading.CancellationToken%2CSystem.Threading.Tasks.Task%7D)) functionality from the `System.Web.Hosting` namespace.

> **Tip:**
> The functionality of the `System.Web` namespace was intentionally not ported over to .NET, and remains exclusive to .NET Framework. For more information, see [Get started with incremental ASP.NET to ASP.NET Core migration](https://learn.microsoft.com/aspnet/core/migration/inc/start).

In .NET, to model a service that is inspired by the `QueueBackgroundWorkItem` functionality, start by adding an `IBackgroundTaskQueue` interface to the project:

[source="snippets/workers/queue-service/IBackgroundTaskQueue.cs"::: (complete source file; reference: snippets/workers/queue-service/IBackgroundTaskQueue.cs)](../../../_code/docs/core/extensions/snippets/workers/queue-service/IBackgroundTaskQueue.cs.md)

There are two methods, one that exposes queuing functionality, and another that dequeues previously queued work items. A *work item* is a `Func<CancellationToken, ValueTask>`. Next, add the default implementation to the project.

[source="snippets/workers/queue-service/DefaultBackgroundTaskQueue.cs"::: (complete source file; reference: snippets/workers/queue-service/DefaultBackgroundTaskQueue.cs)](../../../_code/docs/core/extensions/snippets/workers/queue-service/DefaultBackgroundTaskQueue.cs.md)

The preceding implementation relies on a [System.Threading.Channels.Channel`1](https://learn.microsoft.com/search/?terms=System.Threading.Channels.Channel%601) as a queue. The [System.Threading.Channels.BoundedChannelOptions.%23ctor(System.Int32)](https://learn.microsoft.com/search/?terms=System.Threading.Channels.BoundedChannelOptions.%2523ctor(System.Int32)) is called with an explicit capacity. Capacity should be set based on the expected application load and number of concurrent threads accessing the queue. [System.Threading.Channels.BoundedChannelFullMode.Wait](https://learn.microsoft.com/search/?terms=System.Threading.Channels.BoundedChannelFullMode.Wait) causes calls to [System.Threading.Channels.ChannelWriter`1.WriteAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Channels.ChannelWriter%601.WriteAsync*) to return a task, which completes only when space becomes available. Which leads to backpressure, in case too many publishers/calls start accumulating.

## Rewrite the Worker class

In the following `QueueHostedService` example:

- The `ProcessTaskQueueAsync` method returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) in `ExecuteAsync`.
- Background tasks in the queue are dequeued and executed in `ProcessTaskQueueAsync`.
- Work items are awaited before the service stops in `StopAsync`.

Replace the existing `Worker` class with the following C# code, and rename the file to *QueueHostedService.cs*.

[source="snippets/workers/queue-service/QueuedHostedService.cs" highlight="25-26,28"::: (complete source file; reference: snippets/workers/queue-service/QueuedHostedService.cs)](../../../_code/docs/core/extensions/snippets/workers/queue-service/QueuedHostedService.cs.md)

A `MonitorLoop` service handles enqueuing tasks for the hosted service whenever the `w` key is selected on an input device:

- The `IBackgroundTaskQueue` is injected into the `MonitorLoop` service.
- `IBackgroundTaskQueue.QueueBackgroundWorkItemAsync` is called to enqueue a work item.
- The work item simulates a long-running background task:
  - Three 5-second delays are executed [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*).
  - A `try-catch` statement traps [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) if the task is canceled.

[source="snippets/workers/queue-service/MonitorLoop.cs" highlight="4,26"::: (complete source file; reference: snippets/workers/queue-service/MonitorLoop.cs)](../../../_code/docs/core/extensions/snippets/workers/queue-service/MonitorLoop.cs.md)

Replace the existing `Program` contents with the following C# code:

[source="snippets/workers/queue-service/Program.cs" highlight="4-14"::: (complete source file; reference: snippets/workers/queue-service/Program.cs)](../../../_code/docs/core/extensions/snippets/workers/queue-service/Program.cs.md)

The services are registered in (*Program.cs*). The hosted service is registered with the `AddHostedService` extension method. `MonitorLoop` is started in *Program.cs* top-level statement:

[source="snippets/workers/queue-service/Program.cs" range="18-19"::: (complete source file; reference: snippets/workers/queue-service/Program.cs)](../../../_code/docs/core/extensions/snippets/workers/queue-service/Program.cs.md)

For more information on registering services, see [Dependency injection in .NET](dependency-injection/overview.md).

## Verify service functionality


To run the application from Visual Studio, select <kbd>F5</kbd> or select the **Debug** > **Start Debugging** menu option. If you're using the .NET CLI, run the `dotnet run` command from the working directory:

```dotnetcli
dotnet run
```

For more information on the .NET CLI run command, see [dotnet run](../tools/dotnet-run.md).


When prompted enter the `w` (or `W`) at least once to queue an emulated work item, as shown in the example output:

```Output
info: App.QueueService.MonitorLoop[0]
      MonitorAsync loop is starting.
info: App.QueueService.QueuedHostedService[0]
      QueuedHostedService is running.

      Tap W to add a work item to the background queue.

info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\queue-service
winfo: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is starting.
info: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is running. 1/3
info: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is running. 2/3
info: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is running. 3/3
info: App.QueueService.MonitorLoop[0]
      Queued Background Task 8453f845-ea4a-4bcb-b26e-c76c0d89303e is complete.
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: App.QueueService.QueuedHostedService[0]
      QueuedHostedService is stopping.
```


If running the application from within Visual Studio, select **Debug** > **Stop Debugging...**. Alternatively, select <kbd>Ctrl</kbd> + <kbd>C</kbd> from the console window to signal cancellation.


## See also

- [Worker Services in .NET](workers.md)
- [Use scoped services within a `BackgroundService`](scoped-service.md)
- [Create a Windows Service using `BackgroundService`](windows-service.md)
- [Implement the `IHostedService` interface](timer-service.md)
- [Web-Queue-Worker architectural style](https://learn.microsoft.com/azure/architecture/guide/architecture-styles/web-queue-worker)
