---
title: "Using threads and threading"
description: Learn about using threads and threading in .NET, so you can write applications to perform many operations at the same time (multithreading).
ms.date: 03/13/2026
ai-usage: ai-assisted
ms.custom: devdivchpfy22
helpviewer_keywords:
  - "threading [.NET], about threading"
  - "managed threading"
ms.assetid: 9b5ec2cd-121b-4d49-b075-222cf26f2344
---
# Using threads and threading

With .NET, you can write applications that perform multiple operations at the same time. Operations with the potential of holding up other operations can execute on separate threads, a process known as *multithreading* or *free threading*.

Applications that use multithreading are more responsive to user input because the user interface stays active as processor-intensive tasks execute on separate threads. Multithreading is also useful when you create scalable applications because you can add threads as the workload increases.

> **Note:**
> If you need more control over the behavior of the application's threads, you can manage the threads yourself. However, multithreaded programming is greatly simplified with the [System.Threading.Tasks.Parallel](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel) and [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) classes, [Parallel LINQ (PLINQ)](../parallel-programming/introduction-to-plinq.md), concurrent collection classes in the [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace, and a programming model that's based on the concept of tasks rather than threads. For more information, see [Parallel Programming](../parallel-programming/index.md) and [Task Parallel Library (TPL)](../parallel-programming/task-parallel-library-tpl.md).

## How to: Create and start a new thread

You create a new thread by creating a new instance of the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) class. You provide the name of the method that you want to execute on the new thread to the constructor. To start a created thread, call the [System.Threading.Thread.Start*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Start*) method. For more information and examples, see the [Creating threads and passing data at start time](creating-threads-and-passing-data-at-start-time.md) article and the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) API reference.

## How to: Stop a thread

To terminate the execution of a thread, use the [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken). It provides a unified way to stop threads cooperatively. For more information, see [Cancellation in managed threads](cancellation-in-managed-threads.md).

Sometimes it's not possible to stop a thread cooperatively because it runs third-party code not designed for cooperative cancellation. In this case, you might want to terminate its execution forcibly. In .NET Framework, you can use the [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) method, which raises a [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) on the target thread. For more information, see [Destroying threads](destroying-threads.md).

In .NET Core and .NET 5 and later versions, [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) at runtime. In .NET 5 and later, calling it also generates a compile-time obsoletion warning ([SYSLIB0006](../../fundamentals/syslib-diagnostics/syslib0006.md)). If you need to terminate the execution of third-party code forcibly in modern .NET implementations, run it in a separate process and use the [System.Diagnostics.Process.Kill*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Kill*) method.

The [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) isn't available before .NET Framework 4. To stop a thread in older .NET Framework versions, use the thread synchronization techniques to implement the cooperative cancellation manually. For example, you can create the volatile boolean field `shouldStop` and use it to request the code executed by the thread to stop. For more information, see [volatile](../../csharp/language-reference/keywords/volatile.md) in C# Reference and [System.Threading.Volatile](https://learn.microsoft.com/search/?terms=System.Threading.Volatile).

Use the [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*) method to make the calling thread wait for the termination of the thread being stopped.

## How to: Pause or interrupt a thread

You use the [System.Threading.Thread.Sleep*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep*) method to pause the current thread for a specified amount of time. You can interrupt a blocked thread by calling the [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) method. For more information, see [Pausing and interrupting threads](pausing-and-resuming-threads.md).

## Thread properties

The following table presents some of the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) properties:

| Property | Description |
| --- | --- |
| [System.Threading.Thread.IsAlive](https://learn.microsoft.com/search/?terms=System.Threading.Thread.IsAlive) | Returns `true` if a thread has been started and hasn't yet terminated normally or aborted. |
| [System.Threading.Thread.IsBackground](https://learn.microsoft.com/search/?terms=System.Threading.Thread.IsBackground) | Gets or sets a Boolean that indicates if a thread is a background thread. Background threads are like foreground threads. However, a background thread doesn't prevent a process from stopping. Once all foreground threads that belong to a process have stopped, the common language runtime ends the process by calling the [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) method on background threads that are still alive. For more information, see [Foreground and Background Threads](foreground-and-background-threads.md). |
| [System.Threading.Thread.Name*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Name*) | Gets or sets the name of a thread. Most frequently used to discover individual threads when you debug. |
| [System.Threading.Thread.Priority*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Priority*) | Gets or sets a [System.Threading.ThreadPriority](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPriority) value that's used by the operating system to prioritize thread scheduling. For more information, see [Scheduling threads](scheduling-threads.md) and the [System.Threading.ThreadPriority](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPriority) reference. |
| [System.Threading.Thread.ThreadState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ThreadState*) | Gets a [System.Threading.ThreadState](https://learn.microsoft.com/search/?terms=System.Threading.ThreadState) value containing the current states of a thread. |

## See also

- [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread)
- [Threads and Threading](threads-and-threading.md)
- [Parallel Programming](../parallel-programming/index.md)
