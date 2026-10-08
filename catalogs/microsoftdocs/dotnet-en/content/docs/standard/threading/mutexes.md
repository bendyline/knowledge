---
description: "Learn how to use a Mutex from the System.Threading namespace."
title: "Mutexes"
ms.date: 07/19/2021
helpviewer_keywords:
  - "wait handles"
  - "threading [.NET], Mutex class"
  - "Mutex class, about Mutex class"
  - "threading [.NET], cross-process synchronization"
ms.assetid: 9dd06e25-12c0-4a9e-855a-452dc83803e2
---

# Mutexes

You can use a [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) object to provide exclusive access to a resource. The [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class uses more system resources than the [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor) class, but it can be marshalled across application domain boundaries, it can be used with multiple waits, and it can be used to synchronize threads in different processes. For a comparison of managed synchronization mechanisms, see [Overview of Synchronization Primitives](overview-of-synchronization-primitives.md).

For code examples, see the reference documentation for the [System.Threading.Mutex.%23ctor*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.%2523ctor*) constructors.

## Use mutexes

A thread calls the [System.Threading.WaitHandle.WaitOne*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitOne*) method of a mutex to request ownership. The call blocks until the mutex is available, or until the optional timeout interval elapses. The state of a mutex is signaled if no thread owns it.

A thread releases a mutex by calling its [System.Threading.Mutex.ReleaseMutex*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.ReleaseMutex*) method. Mutexes have thread affinity; that is, the mutex can be released only by the thread that owns it. If a thread releases a mutex it does not own, an [System.ApplicationException](https://learn.microsoft.com/search/?terms=System.ApplicationException) is thrown in the thread.

Because the [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class derives from [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle), you can also call the static [System.Threading.WaitHandle.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAll*) or [System.Threading.WaitHandle.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAny*) methods of [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) to request ownership of a [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) in combination with other wait handles.

If a thread owns a [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex), that thread can specify the same [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) in repeated wait-request calls without blocking its execution; however, it must release the [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) as many times to release ownership.

## Abandoned mutexes

If a thread terminates without releasing a [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex), the mutex is said to be abandoned. This often indicates a serious programming error because the resource the mutex is protecting might be left in an inconsistent state. An [System.Threading.AbandonedMutexException](https://learn.microsoft.com/search/?terms=System.Threading.AbandonedMutexException) is thrown in the next thread that acquires the mutex.

In the case of a system-wide mutex, an abandoned mutex might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager).

## Local and system mutexes

Mutexes are of two types: local mutexes and named system mutexes. If you create a [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) object using a constructor that accepts a name, it is associated with an operating-system object of that name. Named system mutexes are visible throughout the operating system and can be used to synchronize the activities of processes. You can create multiple [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) objects that represent the same named system mutex, and you can use the [System.Threading.Mutex.OpenExisting*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.OpenExisting*) method to open an existing named system mutex.

A local mutex exists only within your process. It can be used by any thread in your process that has a reference to the local [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) object. Each [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) object is a separate local mutex.

### Access control security for system mutexes

.NET Framework provides the ability to query and set Windows access control security for named system objects. Protecting system mutexes from the moment of creation is recommended because system objects are global and therefore can be locked by code other than your own.

For information on access control security for mutexes, see the [System.Security.AccessControl.MutexSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.MutexSecurity) and [System.Security.AccessControl.MutexAccessRule](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.MutexAccessRule) classes, the [System.Security.AccessControl.MutexRights](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.MutexRights) enumeration, the [System.Threading.Mutex.GetAccessControl*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.GetAccessControl*), [System.Threading.Mutex.SetAccessControl*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.SetAccessControl*), and [System.Threading.Mutex.OpenExisting*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.OpenExisting*) methods of the [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class, and the [System.Threading.Mutex.%23ctor%28System.Boolean%2CSystem.String%2CSystem.Boolean%40%2CSystem.Security.AccessControl.MutexSecurity%29](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.%2523ctor%2528System.Boolean%252CSystem.String%252CSystem.Boolean%2540%252CSystem.Security.AccessControl.MutexSecurity%2529) constructor.

> **Note:**
> Access control security for system mutexes is only available with .NET Framework, it's not available with .NET Core or .NET 5+.

## See also

- [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex)
- [System.Threading.Mutex.%23ctor*](https://learn.microsoft.com/search/?terms=System.Threading.Mutex.%2523ctor*)
- [System.Security.AccessControl.MutexSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.MutexSecurity)
- [System.Security.AccessControl.MutexAccessRule](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.MutexAccessRule)
- [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor)
- [Threading objects and features](threading-objects-and-features.md)
- [Threads and threading](threads-and-threading.md)
- [Threading](managed-threading-basics.md)
