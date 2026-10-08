---
description: "Learn more about: Threading objects and features"
title: "Threading objects and features"
ms.date: "10/01/2018"
helpviewer_keywords: 
  - "threading [.NET], features"
  - "managed threading"
ms.assetid: 239b2e8d-581b-4ca3-992b-0e8525b9321c
---
# Threading objects and features

Along with the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) class, .NET provides a number of classes that help you develop multithreaded applications. The following articles provide overview of those classes:

| Title | Description |
| --- | --- |
| [The managed thread pool](the-managed-thread-pool.md) | Describes the [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) class, which provides a pool of worker threads that are managed by .NET. |
| [Timers](timers.md) | Describes .NET timers that can be used in a multithreaded environment. |
| [Overview of synchronization primitives](overview-of-synchronization-primitives.md) | Describes types that can be used to synchronize access to a shared resource or control thread interaction. |
| [EventWaitHandle](eventwaithandle.md) | Describes the [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) class, which represents a thread synchronization event. |
| [CountdownEvent](countdownevent.md) | Describes the [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) class, which represents a thread synchronization event that becomes set when its count is zero. |
| [Mutexes](mutexes.md) | Describes the [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class, which grants exclusive access to a shared resource. |
| [Semaphore and SemaphoreSlim](semaphore-and-semaphoreslim.md) | Describes the [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) class, which limits number of threads that can access a shared resource or a pool of resources concurrently. |
| [Barrier](barrier.md) | Describes the [System.Threading.Barrier](https://learn.microsoft.com/search/?terms=System.Threading.Barrier) class, which implements the barrier pattern for coordination of threads in phased operations. |
| [SpinLock](spinlock.md) | Describes the [System.Threading.SpinLock](https://learn.microsoft.com/search/?terms=System.Threading.SpinLock) structure, which is a lightweight alternative to the [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor) class for certain low-level locking scenarios. |
| [SpinWait](spinwait.md) | Describes the [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait) structure, which provides support for spin-based waiting. |

> **Note:**
> In .NET 9 and C# 13 or later, prefer a dedicated [System.Threading.Lock](https://learn.microsoft.com/search/?terms=System.Threading.Lock) instance with the C# `lock` statement for general locking scenarios. This approach improves performance and reduces mistakes from locking shared objects that weren't meant for synchronization. For details, see [Overview of synchronization primitives](overview-of-synchronization-primitives.md) and [The lock statement](../../csharp/language-reference/statements/lock.md). In Visual Basic, continue to use `SyncLock` with a dedicated private reference type.

## See also

- [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor)
- [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle)
- [System.ComponentModel.BackgroundWorker](https://learn.microsoft.com/search/?terms=System.ComponentModel.BackgroundWorker)
- [System.Threading.Tasks.Parallel](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel)
- [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)
- [Using threads and threading](using-threads-and-threading.md)
- [Asynchronous File I/O](../io/asynchronous-file-i-o.md)
- [Parallel Programming](../parallel-programming/index.md)
- [Task Parallel Library (TPL)](../parallel-programming/task-parallel-library-tpl.md)
