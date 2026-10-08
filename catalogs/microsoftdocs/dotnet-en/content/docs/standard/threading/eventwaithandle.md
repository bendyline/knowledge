---
description: "Learn more about: EventWaitHandle"
title: "EventWaitHandle"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "threading [.NET], EventWaitHandle class"
  - "EventWaitHandle class"
  - "event wait handles [.NET]"
  - "threading [.NET], cross-process synchronization"
ms.assetid: 11ee0b38-d663-4617-b793-35eb6c64e9fc
---
# EventWaitHandle

The [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) class allows threads to communicate with each other by signaling and by waiting for signals. Event wait handles (also referred to simply as events) are wait handles that can be signaled in order to release one or more waiting threads. After it is signaled, an event wait handle is reset either manually or automatically. The [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) class can represent either a local event wait handle (local event) or a named system event wait handle (named event or system event, visible to all processes).

> **Note:**
> Event wait handles are not .NET [events](../events/index.md). There are no delegates or event handlers involved. The word "event" is used to describe them because they have traditionally been referred to as operating-system events, and because the act of signaling the wait handle indicates to waiting threads that an event has occurred.

 Both local and named event wait handles use system synchronization objects, which are protected by [Microsoft.Win32.SafeHandles.SafeWaitHandle](https://learn.microsoft.com/search/?terms=Microsoft.Win32.SafeHandles.SafeWaitHandle) wrappers to ensure that the resources are released. You can use the [System.Threading.WaitHandle.Dispose*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.Dispose*) method to free the resources immediately when you have finished using the object.

## Event Wait Handles That Reset Automatically

 You create an automatic reset event by specifying [System.Threading.EventResetMode.AutoReset](https://learn.microsoft.com/search/?terms=System.Threading.EventResetMode.AutoReset) when you create the [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) object. As its name implies, this synchronization event resets automatically when signaled, after releasing a single waiting thread. Signal the event by calling its [System.Threading.EventWaitHandle.Set*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Set*) method.

 Automatic reset events are usually used to provide exclusive access to a resource for a single thread at a time. A thread requests the resource by calling the [System.Threading.WaitHandle.WaitOne*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitOne*) method. If no other thread is holding the wait handle, the method returns `true` and the calling thread has control of the resource.

> **Important:**
> As with all synchronization mechanisms, you must ensure that all code paths wait on the appropriate wait handle before accessing a protected resource. Thread synchronization is cooperative.

 If an automatic reset event is signaled when no threads are waiting, it remains signaled until a thread attempts to wait on it. The event releases the thread and immediately resets, blocking subsequent threads.

## Event Wait Handles That Reset Manually

 You create a manual reset event by specifying [System.Threading.EventResetMode.ManualReset](https://learn.microsoft.com/search/?terms=System.Threading.EventResetMode.ManualReset) when you create the [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) object. As its name implies, this synchronization event must be reset manually after it has been signaled. Until it is reset, by calling its [System.Threading.EventWaitHandle.Reset*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Reset*) method, threads that wait on the event handle proceed immediately without blocking.

 A manual reset event acts like the gate of a corral. When the event is not signaled, threads that wait on it block, like horses in a corral. When the event is signaled, by calling its [System.Threading.EventWaitHandle.Set*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Set*) method, all waiting threads are free to proceed. The event remains signaled until its [System.Threading.EventWaitHandle.Reset*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Reset*) method is called. This makes the manual reset event an ideal way to hold up threads that need to wait until one thread finishes a task.

 Like horses leaving a corral, it takes time for the released threads to be scheduled by the operating system and to resume execution. If the [System.Threading.EventWaitHandle.Reset*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Reset*) method is called before all the threads have resumed execution, the remaining threads once again block. Which threads resume and which threads block depends on random factors like the load on the system, the number of threads waiting for the scheduler, and so on. This is not a problem if the thread that signals the event ends after signaling, which is the most common usage pattern. If you want the thread that signaled the event to begin a new task after all the waiting threads have resumed, you must block it until all the waiting threads have resumed. Otherwise, you have a race condition, and the behavior of your code is unpredictable.

## Features Common to Automatic and Manual Events

 Typically, one or more threads block on an [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) until an unblocked thread calls the [System.Threading.EventWaitHandle.Set*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.Set*) method, which releases one of the waiting threads (in the case of automatic reset events) or all of them (in the case of manual reset events). A thread can signal an [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) and then block on it, as an atomic operation, by calling the static [System.Threading.WaitHandle.SignalAndWait*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.SignalAndWait*) method.

 [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) objects can be used with the static [System.Threading.WaitHandle.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAll*) and [System.Threading.WaitHandle.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAny*) methods. Because the [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) and [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) classes both derive from [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle), you can use both classes with these methods.

### Named Events

 The Windows operating system allows event wait handles to have names. A named event is system wide. That is, once the named event is created, it is visible to all threads in all processes. Thus, named events can be used to synchronize the activities of processes as well as threads.

 You can create an [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) object that represents a named system event by using one of the constructors that specifies an event name.

> **Note:**
> Because named events are system wide, it is possible to have multiple [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) objects that represent the same named event. Each time you call a constructor, or the [System.Threading.EventWaitHandle.OpenExisting*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.OpenExisting*) method, a new [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) object is created. Specifying the same name repeatedly creates multiple objects that represent the same named event.

 Caution is advised in using named events. Because they are system wide, another process that uses the same name can block your threads unexpectedly. Malicious code executing on the same computer could use this as the basis of a denial-of-service attack.

 Use access control security to protect an [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) object that represents a named event, preferably by using a constructor that specifies an [System.Security.AccessControl.EventWaitHandleSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.EventWaitHandleSecurity) object. You can also apply access control security using the [System.Threading.EventWaitHandle.SetAccessControl*](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle.SetAccessControl*) method, but this leaves a window of vulnerability between the time the event wait handle is created and the time it is protected. Protecting events with access control security helps prevent malicious attacks, but it does not solve the problem of unintentional name collisions.

> **Note:**
> Unlike the [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle) class, the derived classes [System.Threading.AutoResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.AutoResetEvent) and [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) can represent only local wait handles. They cannot represent named system events.

## See also

- [System.Threading.EventWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.EventWaitHandle)
- [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle)
- [System.Threading.AutoResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.AutoResetEvent)
- [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent)
