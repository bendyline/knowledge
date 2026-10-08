**Applies to: < aspnetcore-6.0**

In ASP.NET Core, background tasks can be implemented as *hosted services*. A hosted service is a class with background task logic that implements the [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService) interface. This article provides three hosted service examples:

* Background task that runs on a timer.
* Hosted service that activates a [scoped service](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes). The scoped service can use [dependency injection (DI)](../../../dependency-injection.md).
* Queued background tasks that run sequentially.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/host/hosted-services/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Worker Service template

The ASP.NET Core Worker Service template provides a starting point for writing long running service apps. An app created from the Worker Service template specifies the Worker SDK in its project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">
```

To use the template as a basis for a hosted services app:

# [Visual Studio](#tab/visual-studio)

1. Create a new project.
1. Select **Worker Service**. Select **Next**.
1. Provide a project name in the **Project name** field or accept the default project name. Select **Create**.
1. In the **Create a new Worker service** dialog, select **Create**.

# [.NET CLI](#tab/net-cli)

Use the Worker Service (`worker`) template with the [dotnet new](https://learn.microsoft.com/dotnet/core/tools/dotnet-new) command from a command shell. In the following example, a Worker Service app is created named `ContosoWorker`. A folder for the `ContosoWorker` app is created automatically when the command is executed.

```dotnetcli
dotnet new worker -o ContosoWorker
```

---


## Package

An app based on the Worker Service template uses the `Microsoft.NET.Sdk.Worker` SDK and has an explicit package reference to the [Microsoft.Extensions.Hosting](https://www.nuget.org/packages/Microsoft.Extensions.Hosting) package. For example, see the sample app's project file (`BackgroundTasksSample.csproj`).

For web apps that use the `Microsoft.NET.Sdk.Web` SDK, the [Microsoft.Extensions.Hosting](https://www.nuget.org/packages/Microsoft.Extensions.Hosting) package is referenced implicitly from the shared framework. An explicit package reference in the app's project file isn't required.

## IHostedService interface

The [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService) interface defines two methods for objects that are managed by the host:

* [StartAsync(CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService.StartAsync%252A)
* [StopAsync(CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService.StopAsync%252A)

### `StartAsync`

`StartAsync` contains the logic to start the background task. `StartAsync` is called *before*:

* The app's request processing pipeline is configured.
* The server is started and [IApplicationLifetime.ApplicationStarted](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IApplicationLifetime.ApplicationStarted%252A) is triggered.

The default behavior can be changed so that the hosted service's `StartAsync` runs after the app's pipeline has been configured and `ApplicationStarted` is called. To change the default behavior, add the hosted service (`VideosWatcher` in the following example) after calling `ConfigureWebHostDefaults`:

```csharp
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            })
            .ConfigureServices(services =>
            {
                services.AddHostedService<VideosWatcher>();
            });
}
```

### `StopAsync`

* [StopAsync(CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService.StopAsync%252A) is triggered when the host is performing a graceful shutdown. `StopAsync` contains the logic to end the background task. Implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and [finalizers (destructors)](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/destructors) to dispose of any unmanaged resources.

The cancellation token has a default five second timeout to indicate that the shutdown process should no longer be graceful. When cancellation is requested on the token:

* Any remaining background operations that the app is performing should be aborted.
* Any methods called in `StopAsync` should return promptly.

However, tasks aren't abandoned after cancellation is requested&mdash;the caller awaits all tasks to complete.

If the app shuts down unexpectedly (for example, the app's process fails), `StopAsync` might not be called. Therefore, any methods called or operations conducted in `StopAsync` might not occur.

To extend the default five second shutdown timeout, set:

* [Microsoft.Extensions.Hosting.HostOptions.ShutdownTimeout%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostOptions.ShutdownTimeout%252A) when using Generic Host. For more information, see [fundamentals/host/generic-host#shutdowntimeout](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23shutdowntimeout).
* Shutdown timeout host configuration setting when using Web Host. For more information, see [fundamentals/host/web-host#shutdown-timeout](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23shutdown-timeout).

The hosted service is activated once at app startup and gracefully shut down at app shutdown. If an error is thrown during background task execution, `Dispose` should be called even if `StopAsync` isn't called.

## BackgroundService base class

[Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) is a base class for implementing a long running [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService).

[ExecuteAsync(CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync%252A) is called to run the background service. The implementation returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that represents the entire lifetime of the background service. No further services are started until [ExecuteAsync becomes asynchronous](https://github.com/dotnet/extensions/issues/2149), such as by calling `await`. Avoid performing long, blocking initialization work in `ExecuteAsync`. The host blocks in [StopAsync(CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService.StopAsync%252A) waiting for `ExecuteAsync` to complete.

The cancellation token is triggered when [IHostedService.StopAsync](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService.StopAsync%252A) is called. Your implementation of `ExecuteAsync` should finish promptly when the cancellation token is fired in order to gracefully shut down the service. Otherwise, the service ungracefully shuts down at the shutdown timeout. For more information, see the [IHostedService interface](#ihostedservice-interface) section.

`StartAsync` should be limited to short running tasks because hosted services are run sequentially, and no further services are started until `StartAsync` runs to completion. Long running tasks should be placed in `ExecuteAsync`. For more information, see the source to [BackgroundService](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Hosting.Abstractions/src/BackgroundService.cs).

## Timed background tasks

A timed background task makes use of the [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer) class. The timer triggers the task's `DoWork` method. The timer is disabled on `StopAsync` and disposed when the service container is disposed on `Dispose`:

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/TimedHostedService.cs" id="snippet1" highlight="16-17,34,41"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/TimedHostedService.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/TimedHostedService.cs.md)

The [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer) doesn't wait for previous executions of `DoWork` to finish, so the approach shown might not be suitable for every scenario. [Interlocked.Increment](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked.Increment%252A) is used to increment the execution counter as an atomic operation, which ensures that multiple threads don't update `executionCount` concurrently.

The service is registered in `IHostBuilder.ConfigureServices` (`Program.cs`) with the `AddHostedService` extension method:

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs" id="snippet1"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs.md)

## Consuming a scoped service in a background task

To use [scoped services](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes) within a [BackgroundService](#backgroundservice-base-class), create a scope. No scope is created for a hosted service by default.

The scoped background task service contains the background task's logic. In the following example:

* The service is asynchronous. The `DoWork` method returns a `Task`. For demonstration purposes, a delay of ten seconds is awaited in the `DoWork` method.
* An [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) is injected into the service.

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/ScopedProcessingService.cs" id="snippet1"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/ScopedProcessingService.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/ScopedProcessingService.cs.md)

The hosted service creates a scope to resolve the scoped background task service to call its `DoWork` method. `DoWork` returns a `Task`, which is awaited in `ExecuteAsync`:

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/ConsumeScopedServiceHostedService.cs" id="snippet1" highlight="19,22-35"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/ConsumeScopedServiceHostedService.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/ConsumeScopedServiceHostedService.cs.md)

The services are registered in `IHostBuilder.ConfigureServices` (`Program.cs`). The hosted service is registered with the `AddHostedService` extension method:

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs" id="snippet2"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs.md)

## Queued background tasks

A background task queue is based on the .NET Framework 4.x [System.Web.Hosting.HostingEnvironment.QueueBackgroundWorkItem%2A](https://learn.microsoft.com/search/?terms=System.Web.Hosting.HostingEnvironment.QueueBackgroundWorkItem%252A):

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/BackgroundTaskQueue.cs" id="snippet1"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/BackgroundTaskQueue.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/BackgroundTaskQueue.cs.md)

In the following `QueueHostedService` example:

* The `BackgroundProcessing` method returns a `Task`, which is awaited in `ExecuteAsync`.
* Background tasks in the queue are dequeued and executed in `BackgroundProcessing`.
* Work items are awaited before the service stops in `StopAsync`.

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/QueuedHostedService.cs" id="snippet1" highlight="28-29,33"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/QueuedHostedService.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/QueuedHostedService.cs.md)

A `MonitorLoop` service handles enqueuing tasks for the hosted service whenever the `w` key is selected on an input device:

* The `IBackgroundTaskQueue` is injected into the `MonitorLoop` service.
* `IBackgroundTaskQueue.QueueBackgroundWorkItem` is called to enqueue a work item.
* The work item simulates a long-running background task:
  * Three 5-second delays are executed (`Task.Delay`).
  * A `try-catch` statement traps [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) if the task is cancelled.

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/MonitorLoop.cs" id="snippet_Monitor" highlight="7,33"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/MonitorLoop.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Services/MonitorLoop.cs.md)

The services are registered in `IHostBuilder.ConfigureServices` (`Program.cs`). The hosted service is registered with the `AddHostedService` extension method:

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs" id="snippet3"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs.md)

`MonitorLoop` is started in `Program.Main`:

[language="csharp" source="\~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs" id="snippet4"::: (complete source file; reference: \~/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs)](../../../../../_code/aspnetcore/fundamentals/host/hosted-services/samples/3.x/BackgroundTasksSample/Program.cs.md)

## Additional resources

* [Implement background tasks in microservices with IHostedService and the BackgroundService class](https://learn.microsoft.com/dotnet/standard/microservices-architecture/multi-container-microservice-net-applications/background-tasks-with-ihostedservice)
* [Run background tasks with WebJobs in Azure App Service](https://learn.microsoft.com/azure/app-service/webjobs-create)
* [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer)
