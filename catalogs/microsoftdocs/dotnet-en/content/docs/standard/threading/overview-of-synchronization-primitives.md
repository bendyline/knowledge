---
title: "Overview of synchronization primitives"
description: "Learn about .NET thread synchronization primitives used to synchronize access to a shared resource or control thread interaction"
ms.date: "10/01/2018"
helpviewer_keywords:
  - "synchronization, threads"
  - "threading [.NET],synchronizing threads"
  - "managed threading"
ms.assetid: b782bcb8-da6a-4c6a-805f-2eb46d504309
---
# Overview of synchronization primitives

.NET provides a range of types that you can use to synchronize access to a shared resource or coordinate thread interaction.

> **Important:**
> Use the same synchronization primitive instance to protect access of a shared resource. If you use different synchronization primitive instances to protect the same resource, you'll circumvent the protection provided by a synchronization primitive.

## WaitHandle class and lightweight synchronization types

Multiple .NET synchronization primitives derive from the [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) class, which encapsulates a native operating system synchronization handle and uses a signaling mechanism for thread interaction. Those classes include:

- [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex), which grants exclusive access to a shared resource. The state of a mutex is signaled if no thread owns it.
- [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore), which limits the number of threads that can access a shared resource or a pool of resources concurrently. The state of a semaphore is set to signaled when its count is greater than zero, and nonsignaled when its count is zero.
- [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle), which represents a thread synchronization event and can be either in a signaled or unsignaled state.
- [System.Threading.AutoResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.AutoResetEvent), which derives from [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) and, when signaled, resets automatically to an unsignaled state after releasing a single waiting thread.
- [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent), which derives from [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) and, when signaled, stays in a signaled state until the [System.Threading.EventWaitHandle.Reset*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Reset*) method is called.

In .NET Framework, because [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) derives from [System.MarshalByRefObject](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject), these types can be used to synchronize the activities of threads across application domain boundaries.

In .NET Framework, .NET Core, and .NET 5+, some of these types can represent named system synchronization handles, which are visible throughout the operating system and can be used for the inter-process synchronization:

- [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex)
- [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) (on Windows)
- [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) (on Windows)

For more information, see the [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) API reference.

Lightweight synchronization types don't rely on underlying operating system handles and typically provide better performance. However, they cannot be used for the inter-process synchronization. Use those types for thread synchronization within one application.

Some of those types are alternatives to the types derived from [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle). For example, [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) is a lightweight alternative to [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore).

## Synchronization of access to a shared resource

.NET provides a range of synchronization primitives to control access to a shared resource by multiple threads.

### Monitor class

The [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor) class grants mutually exclusive access to a shared resource by acquiring or releasing a lock on the object that identifies the resource. While a lock is held, the thread that holds the lock can again acquire and release the lock. Any other thread is blocked from acquiring the lock and the [System.Threading.Monitor.Enter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Enter*) method waits until the lock is released. The [System.Threading.Monitor.Enter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Enter*) method acquires a released lock. You can also use the [System.Threading.Monitor.TryEnter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.TryEnter*) method to specify the amount of time during which a thread attempts to acquire a lock. Because the [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor) class has thread affinity, the thread that acquired a lock must release the lock by calling the [System.Threading.Monitor.Exit*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Exit*) method.

You can coordinate the interaction of threads that acquire a lock on the same object by using the [System.Threading.Monitor.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Wait*), [System.Threading.Monitor.Pulse*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Pulse*), and [System.Threading.Monitor.PulseAll*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.PulseAll*) methods.

For more information, see the [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor) API reference.

> **Note:**
> To synchronize access to a shared resource, use the [lock](../../csharp/language-reference/statements/lock.md) statement in C# and the [SyncLock](../../visual-basic/language-reference/statements/synclock-statement.md) statement in Visual Basic instead of using the [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor) class directly.
>
> In .NET 9 and C# 13 or later, use a dedicated [System.Threading.Lock](https://learn.microsoft.com/search/?terms=System.Threading.Lock) instance for best performance. In that case, `lock` uses [System.Threading.Lock.EnterScope](https://learn.microsoft.com/search/?terms=System.Threading.Lock.EnterScope).
>
> This approach is better than locking a general `object` because it uses a lock type designed for synchronization and reduces accidental reuse of unrelated objects.
>
> Visual Basic doesn't support `System.Threading.Lock` in `SyncLock`, so use a dedicated private reference type for `SyncLock`. For C# versions before 13, .NET versions before 9, and Visual Basic, these statements use [System.Threading.Monitor.Enter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Enter*) and [System.Threading.Monitor.Exit*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Exit*) with a `try…finally` block to ensure that the acquired lock is always released.

### Mutex class

The [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class, like [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor), grants exclusive access to a shared resource. Use one of the [Mutex.WaitOne](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/threading/\[System.Threading.WaitHandle.WaitOne*]\(https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitOne*\)) method overloads to request the ownership of a mutex. Like [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor), [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) has thread affinity and the thread that acquired a mutex must release it by calling the [System.Threading.Mutex.ReleaseMutex*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.ReleaseMutex*) method.

Unlike [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor), the [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class can be used for inter-process synchronization. To do that, use a named mutex, which is visible throughout the operating system. To create a named mutex instance, use a [Mutex constructor](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/threading/\[System.Threading.Mutex.%23ctor*]\(https://learn.microsoft.com/search/?terms=System.Threading.Mutex.%2523ctor*\)) that specifies a name. You can also call the [System.Threading.Mutex.OpenExisting*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.OpenExisting*) method to open an existing named system mutex.

For more information, see the [Mutexes](mutexes.md) article and the [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) API reference.

### SpinLock structure

The [System.Threading.SpinLock](https://learn.microsoft.com/search/?terms=System.Threading.SpinLock) structure, like [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor), grants exclusive access to a shared resource based on the availability of a lock. When [System.Threading.SpinLock](https://learn.microsoft.com/search/?terms=System.Threading.SpinLock) attempts to acquire a lock that is unavailable, it waits in a loop, repeatedly checking until the lock becomes available.

For more information about the benefits and drawbacks of using spin lock, see the [SpinLock](spinlock.md) article and the [System.Threading.SpinLock](https://learn.microsoft.com/search/?terms=System.Threading.SpinLock) API reference.

### ReaderWriterLockSlim class

The [System.Threading.ReaderWriterLockSlim](https://learn.microsoft.com/search/?terms=System.Threading.ReaderWriterLockSlim) class grants exclusive access to a shared resource for writing and allows multiple threads to access the resource simultaneously for reading. You might want to use [System.Threading.ReaderWriterLockSlim](https://learn.microsoft.com/search/?terms=System.Threading.ReaderWriterLockSlim) to synchronize access to a shared data structure that supports thread-safe read operations, but requires exclusive access to perform write operation. When a thread requests exclusive access (for example, by calling the [System.Threading.ReaderWriterLockSlim.EnterWriteLock*](https://learn.microsoft.com/search/?terms=System.Threading.ReaderWriterLockSlim.EnterWriteLock*) method), subsequent reader and writer requests block until all existing readers have exited the lock, and the writer has entered and exited the lock.

For more information, see the [System.Threading.ReaderWriterLockSlim](https://learn.microsoft.com/search/?terms=System.Threading.ReaderWriterLockSlim) API reference.

### Semaphore and SemaphoreSlim classes

The [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) and [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) classes limit the number of threads that can access a shared resource or a pool of resources concurrently. Additional threads that request the resource wait until any thread releases the semaphore. Because the semaphore doesn't have thread affinity, a thread can acquire the semaphore and another one can release it.

[System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) is a lightweight alternative to [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) and can be used only for synchronization within a single process boundary.

On Windows, you can use [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) for the inter-process synchronization. To do that, create a [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) instance that represents a named system semaphore by using one of the [Semaphore constructors](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/threading/\[System.Threading.Semaphore.%23ctor*]\(https://learn.microsoft.com/search/?terms=System.Threading.Semaphore.%2523ctor*\)) that specifies a name or the [System.Threading.Semaphore.OpenExisting*](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore.OpenExisting*) method. [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) doesn't support named system semaphores.

For more information, see the [Semaphore and SemaphoreSlim](semaphore-and-semaphoreslim.md) article and the [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) or [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) API reference.

## Thread interaction, or signaling

Thread interaction (or thread signaling) means that a thread must wait for notification, or a signal, from one or more threads in order to proceed. For example, if thread A calls the [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*) method of thread B, thread A is blocked until thread B completes. The synchronization primitives described in the preceding section provide a different mechanism for signaling: by releasing a lock, a thread notifies another thread that it can proceed by acquiring the lock.

This section describes additional signaling constructs provided by .NET.

### EventWaitHandle, AutoResetEvent, ManualResetEvent, and ManualResetEventSlim classes

The [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) class represents a thread synchronization event.

A synchronization event can be either in an unsignaled or signaled state. When the state of an event is unsignaled, a thread that calls the event's [System.Threading.WaitHandle.WaitOne*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitOne*) overload is blocked until an event is signaled. The [System.Threading.EventWaitHandle.Set*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Set*) method sets the state of an event to signaled.

The behavior of an [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) that has been signaled depends on its reset mode:

- An [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) created with the [System.Threading.EventResetMode.AutoReset](https://learn.microsoft.com/search/?terms=System.Threading.EventResetMode.AutoReset) flag resets automatically after releasing a single waiting thread. It's like a turnstile that allows only one thread through each time it's signaled. The [System.Threading.AutoResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.AutoResetEvent) class, which derives from [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle), represents that behavior.
- An [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) created with the [System.Threading.EventResetMode.ManualReset](https://learn.microsoft.com/search/?terms=System.Threading.EventResetMode.ManualReset) flag remains signaled until its [System.Threading.EventWaitHandle.Reset*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Reset*) method is called. It's like a gate that is closed until signaled and then stays open until someone closes it. The [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) class, which derives from [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle), represents that behavior. The [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim) class is a lightweight alternative to [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent).

On Windows, you can use [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) for the inter-process synchronization. To do that, create an [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) instance that represents a named system synchronization event by using one of the [EventWaitHandle constructors](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/threading/\[System.Threading.EventWaitHandle.%23ctor*]\(https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.%2523ctor*\)) that specifies a name or the [System.Threading.EventWaitHandle.OpenExisting*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.OpenExisting*) method.

For more information, see the [EventWaitHandle](eventwaithandle.md) article. For the API reference, see [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle), [System.Threading.AutoResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.AutoResetEvent), [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent), and [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim).

### CountdownEvent class

The [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) class represents an event that becomes set when its count is zero. While [System.Threading.CountdownEvent.CurrentCount](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.CurrentCount) is greater than zero, a thread that calls [System.Threading.CountdownEvent.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.Wait*) is blocked. Call [System.Threading.CountdownEvent.Signal*](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.Signal*) to decrement an event's count.

In contrast to [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) or [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim), which you can use to unblock multiple threads with a signal from one thread, you can use [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) to unblock one or more threads with signals from multiple threads.

For more information, see the [CountdownEvent](countdownevent.md) article and the [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) API reference.

### Barrier class

The [System.Threading.Barrier](https://learn.microsoft.com/search/?terms=System.Threading.Barrier) class represents a thread execution barrier. A thread that calls the [System.Threading.Barrier.SignalAndWait*](https://learn.microsoft.com/search/?terms=System.Threading.Barrier.SignalAndWait*) method signals that it reached the barrier and waits until other participant threads reach the barrier. When all participant threads reach the barrier, they proceed and the barrier is reset and can be used again.

You might use [System.Threading.Barrier](https://learn.microsoft.com/search/?terms=System.Threading.Barrier) when one or more threads require the results of other threads before proceeding to the next computation phase.

For more information, see the [Barrier](barrier.md) article and the [System.Threading.Barrier](https://learn.microsoft.com/search/?terms=System.Threading.Barrier) API reference.

## Interlocked class

The [System.Threading.Interlocked](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked) class provides static methods that perform simple atomic operations on a variable. Those atomic operations include addition, increment and decrement, exchange and conditional exchange that depends on a comparison, and read operation of a 64-bit integer value.

For more information, see the [System.Threading.Interlocked](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked) API reference.

## SpinWait structure

The [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait) structure provides support for spin-based waiting. You might want to use it when a thread has to wait for an event to be signaled or a condition to be met, but when the actual wait time is expected to be less than the waiting time required by using a wait handle or by otherwise blocking the thread. By using [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait), you can specify a short period of time to spin while waiting, and then yield (for example, by waiting or sleeping) only if the condition was not met in the specified time.

For more information, see the [SpinWait](spinwait.md) article and the [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait) API reference.

## See also

- [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent)
- [Thread-safe collections](../collections/thread-safe/index.md)
- [Threading objects and features](threading-objects-and-features.md)
