---
title: Scheduling overview
description: Explore the scheduling overview in .NET Orleans.
ms.date: 03/30/2025
ms.topic: concept-article
---

# Scheduling overview

Two forms of scheduling in Orleans are relevant to grains:

1. **Request scheduling**: Scheduling incoming grain calls for execution according to rules discussed in [Request scheduling](../grains/request-scheduling.md).
1. **Task scheduling**: Scheduling synchronous blocks of code to execute in a *single-threaded* manner.

All grain code executes on the grain's task scheduler, meaning requests also execute on the grain's task scheduler. Even if request scheduling rules allow multiple requests to execute *concurrently*, they won't execute *in parallel* because the grain's task scheduler always executes tasks one by one and never executes multiple tasks in parallel.

## Task scheduling

To better understand scheduling, consider the following grain, `MyGrain`. It has a method called `DelayExecution()` that logs a message, waits some time, then logs another message before returning.

```csharp
public interface IMyGrain : IGrain
{
    Task DelayExecution();
}

public class MyGrain : Grain, IMyGrain
{
    private readonly ILogger<MyGrain> _logger;

    public MyGrain(ILogger<MyGrain> logger) => _logger = logger;

    public async Task DelayExecution()
    {
        _logger.LogInformation("Executing first task");

        await Task.Delay(1_000);

        _logger.LogInformation("Executing second task");
    }
}
```

When this method executes, the method body executes in two parts:

1. The first `_logger.LogInformation(...)` call and the call to `Task.Delay(1_000)`.
1. The second `_logger.LogInformation(...)` call.

The second task isn't scheduled on the grain's task scheduler until the `Task.Delay(1_000)` call completes. At that point, it schedules the *continuation* of the grain method.

Here's a graphical representation of how a request is scheduled and executed as two tasks:

Two-Task-based request execution example.

The description above isn't specific to Orleans; it describes how task scheduling works in .NET. The C# compiler converts asynchronous methods into an asynchronous state machine, and execution progresses through this state machine in discrete steps. Each step schedules on the current [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler) (accessed via [System.Threading.Tasks.TaskScheduler.Current](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.Current), defaulting to [System.Threading.Tasks.TaskScheduler.Default](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.Default)) or the current [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext). If a [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler) is used, each step in the method represents a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) instance passed to that [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler). Therefore, a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) in .NET can represent two conceptual things:

1. An asynchronous operation that can be awaited. The execution of the `DelayExecution()` method above is represented by a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that can be awaited.
1. A synchronous block of work. Each stage within the `DelayExecution()` method above is represented by a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task).

When `TaskScheduler.Default` is used, continuations schedule directly onto the .NET [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) and aren't wrapped in a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object. The wrapping of continuations in [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) instances occurs transparently, so developers rarely need to be aware of these implementation details.

### Task scheduling in Orleans

Each grain activation has its own [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler) instance responsible for enforcing the *single-threaded* execution model of grains. Internally, this [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler) is implemented via `ActivationTaskScheduler` and `WorkItemGroup`. `WorkItemGroup` keeps enqueued tasks in a [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601) (where `T` is internally a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)) and implements [System.Threading.IThreadPoolWorkItem](https://learn.microsoft.com/search/?terms=System.Threading.IThreadPoolWorkItem). To execute each currently enqueued [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), `WorkItemGroup` schedules *itself* on the .NET [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool). When the .NET [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) invokes the `WorkItemGroup`'s `IThreadPoolWorkItem.Execute()` method, the `WorkItemGroup` executes the enqueued [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) instances one by one.

Each grain has a scheduler that executes by scheduling itself on the .NET [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool):

Orleans grains scheduling themselves on the .NET ThreadPool.

Each scheduler contains a queue of tasks:

Scheduler queue of scheduled tasks.

The .NET [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) executes each work item enqueued to it. This includes *grain schedulers* as well as other work items, such as those scheduled via `Task.Run(...)`:

Visualization of the all schedulers running in the .NET ThreadPool.

> **Note:**
> A grain's scheduler can only execute on one thread at a time, but it doesn't always execute on the same thread. The .NET [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) is free to use a different thread each time the grain's scheduler executes. The grain's scheduler ensures it only executes on one thread at a time, implementing the *single-threaded* execution model of grains.
