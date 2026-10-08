---
title: "Reliability Best Practices"
description: See best practices for reliability in .NET host-based server applications, such as SQL Server. Prevent them from leaking resources or getting brought down.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "marking locks"
  - "rebooting databases"
  - "denial of service attacks"
  - "back-out code"
  - "SQL Server [.NET Framework], reliability"
  - "synchronization, reliability"
  - "single-threaded COM components"
  - "slow leaks"
  - "suspending threads"
  - "asynchronous exception handling"
  - "leaked resources [.NET Framework]"
  - "unmanaged memory"
  - "memory, reliability"
  - "threading [.NET Framework], reliability"
  - "process-wide domain shared states"
  - "shared states"
  - "SafeHandle class, reliability"
  - "reliability contracts [.NET Framework]"
  - "cleanup operations"
  - "constrained execution regions"
  - "CERs"
  - "finalizers, reliability"
  - "reliability [.NET Framework]"
  - "blocks, reliability"
  - "finally clauses"
  - "cross-application domain shared states"
  - "catch blocks"
  - "identifying locks"
  - "writing reliable code"
  - "impersonation"
  - "GC.KeepAlive method"
  - "managed threading"
  - "locks, reliability"
  - "STA-dependent features"
  - "fibers"
ms.assetid: cf624c1f-c160-46a1-bb2b-213587688da7
---

# Reliability Best Practices

The following reliability rules are oriented to SQL Server; however, they also apply to any host-based server application. It is extremely important that servers such as SQL Server not leak resources and not be brought down.  However, that cannot be done by writing back-out code for every method that alters an object’s state.  The goal is not to write 100 percent reliable managed code that will recover from any errors in every location with back-out code.  That would be a daunting task with little chance of success.  The common language runtime (CLR) cannot easily provide strong enough guarantees to managed code to make writing perfect code feasible.  Note that unlike ASP.NET, SQL Server uses only one process that cannot be recycled without taking a database down for an unacceptably long time.

With these weaker guarantees and running in a single process, reliability is based on terminating threads or recycling application domains when necessary and taking precautions to ensure operating system resources such as handles or memory are not leaked.  Even with this simpler reliability constraint, there is still a significant reliability requirement:

- Never leak operating system resources.

- Identify all managed locks in all forms to the CLR.

- Never break cross-application domain shared state, allowing [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) recycling to function smoothly.

Although it is theoretically possible to write managed code to handle [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException), [System.StackOverflowException](https://learn.microsoft.com/search/?terms=System.StackOverflowException), and [System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException) exceptions, expecting developers to write such robust code throughout an entire application is unreasonable.  For that reason, out-of-band exceptions result in the executing thread being terminated; and if the terminated thread was editing shared state, which can be determined by whether the thread holds a lock, then the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) is unloaded.  When a method that is editing shared state is terminated, the state will be corrupt because it is not possible to write reliable back-out code for updates to shared state.

In .NET Framework version 2.0, the only host that requires reliability is SQL Server.  If your assembly will be run on SQL Server you should do the reliability work for every part of that assembly, even if there are specific features that are disabled when running in the database.  This is required because the code analysis engine examines code at the assembly level and cannot differentiate disabled code. Another SQL Server programming consideration is that SQL Server runs everything in one process, and [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) recycling is used for cleaning up all resources such as memory and operating system handles.

You cannot depend on finalizers or destructors or `try/finally` blocks for back-out code. They might be interrupted or not called.

Asynchronous exceptions can be thrown in unexpected locations, possibly every machine instruction: [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException), [System.StackOverflowException](https://learn.microsoft.com/search/?terms=System.StackOverflowException), and [System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException).

Managed threads are not necessarily Win32 threads in SQL; they might be fibers.

Process-wide or cross-application domain mutable shared state is extremely difficult to alter safely and should be avoided whenever possible.

Out-of-memory conditions are not rare in SQL Server.

If libraries hosted in SQL Server do not correctly update their shared state, there is a high probability that the code will not recover until the database has been restarted.  Additionally, in some extreme cases, it is possible this might cause the SQL Server process to fail, causing the database to reboot.  Rebooting the database can take down a Web site or affect company operations, hurting availability.  A slow leak of operating system resources such as memory or handles may cause the server to eventually fail allocating handles with no possibility of recovery, or potentially the server may slowly degrade in performance and reduces a customer’s application availability.  Clearly we want to avoid these scenarios.

## Best practice rules

The introduction focused on what the code review for the managed code that runs in the server would have to catch to increase the stability and reliability of the framework. All these checks are good practice in general and an absolute must on the server.

In the face of a dead lock or resource constraint, SQL Server will abort a thread or tear down an [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain).  When this happens, only back-out code in a constrained execution region (CER) is guaranteed to be run.

### Use SafeHandle to avoid resource leaks

In the case of an [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) unload, you cannot depend on `finally` blocks or finalizers being executed, so it is important to abstract all operating system resource access through the [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) class rather than [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr), [System.Runtime.InteropServices.HandleRef](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.HandleRef), or similar classes. This allows the CLR to track and close the handles you use even in the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) tear-down case.  [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) will be using a critical finalizer which the CLR will always run.

The operating system handle is stored in the safe handle from the moment it is created until the moment it is released.  There is no window during which a [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) can occur to leak a handle.  Additionally, platform invoke will reference-count the handle, which allows close tracking of the lifetime of the handle, preventing a security issue with a race condition between `Dispose` and a method that is currently using the handle.

Most classes that currently have a finalizer to simply clean up an operating system handle will not need the finalizer anymore. Instead, the finalizer will be on the [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) derived class.

Note that [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) is not a replacement for [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*).  There are still potential resource contention and performance advantages to explicitly dispose operating system resources.  Just realize that `finally` blocks that do explicitly dispose of resources may not execute to completion.

[System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) allows you to implement your own [System.Runtime.InteropServices.SafeHandle.ReleaseHandle*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle.ReleaseHandle*) method that performs the work to free the handle, such as passing state to an operating system handle freeing routine or freeing a set of handles in a loop.  The CLR guarantees that this method is run.  It is the responsibility of the author of the [System.Runtime.InteropServices.SafeHandle.ReleaseHandle*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle.ReleaseHandle*) implementation to ensure that the handle is released in all circumstances. Failure to do so will cause the handle to be leaked, which often results in the leakage of native resources associated with the handle. Therefore it is critical to structure [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) derived classes such that the [System.Runtime.InteropServices.SafeHandle.ReleaseHandle*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle.ReleaseHandle*) implementation does not require the allocation of any resources that may not be available at invocation time. Note that it is permissible to call methods that may fail within the implementation of [System.Runtime.InteropServices.SafeHandle.ReleaseHandle*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle.ReleaseHandle*) provided that your code can handle such failures and complete the contract to release the native handle. For debugging purposes, [System.Runtime.InteropServices.SafeHandle.ReleaseHandle*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle.ReleaseHandle*) has a [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) return value which may be set to `false` if a catastrophic error is encountered which prevents release of the resource. Doing so will activate the [releaseHandleFailed](../debug-trace-profile/releasehandlefailed-mda.md) MDA, if enabled, to aid in identifying the problem. It does not affect the runtime in any other way; [System.Runtime.InteropServices.SafeHandle.ReleaseHandle*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle.ReleaseHandle*) will not be called again for the same resource and consequently the handle will be leaked.

[System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) is not appropriate in certain contexts.  Since the [System.Runtime.InteropServices.SafeHandle.ReleaseHandle*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle.ReleaseHandle*) method can be run on a [System.GC](https://learn.microsoft.com/search/?terms=System.GC) finalizer thread, any handles that are required to be freed on a particular thread should not be wrapped in a [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle).

Runtime callable wrappers (RCWs) can be cleaned by the CLR without additional code.  For code that uses platform invoke and treats a COM object as an `IUnknown*` or an [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr), the code should be rewritten to use an RCW.  [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) may not be adequate for this scenario due to the possibility of an unmanaged release method calling back into managed code.

#### Code analysis rule

Use [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) to encapsulate operating system resources. Do not use [System.Runtime.InteropServices.HandleRef](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.HandleRef) or fields of type [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr).

### Ensure finalizers do not have to run to prevent leaking operating system resources

Review your finalizers carefully to ensure that even if they do not run, a critical operating system resource is not leaked.  Unlike a normal [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) unload when the application is executing in a steady state or when a server such as SQL Server shuts down, objects are not finalized during an abrupt [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) unload.  Ensure resources are not leaked in the case of an abrupt unload, since an application's correctness cannot be guaranteed, but the integrity of the server must be maintained by not leaking resources.  Use [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) to free any operating system resources.

### Ensure that finally clauses do not have to run to prevent leaking operating system resources

`finally` clauses are not guaranteed to run outside of CERs, requiring library developers to not rely on code within a `finally` block to free unmanaged resources.  Using [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) is the recommended solution.

#### Code analysis rule

Use [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) for cleaning up operating system resources instead of `Finalize`. Do not use [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr); use [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) to encapsulate resources. If the finally clause must run, place it in a CER.

### All locks should go through existing managed locking code

The CLR must know when code is in a lock so that it will know to tear down the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) rather than just aborting the thread.  Aborting the thread could be dangerous as the data operated on by the thread could be left in an inconsistent state. Therefore, the entire [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) has to be recycled.  The consequences of failing to identify a lock can be either deadlocks or incorrect results. Use the methods [System.Threading.Thread.BeginCriticalRegion*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.BeginCriticalRegion*) and [System.Threading.Thread.EndCriticalRegion*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.EndCriticalRegion*) to identify lock regions.  They are static methods on the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) class that only apply to the current thread, helping to prevent one thread from editing another thread’s lock count.

[System.Threading.Monitor.Enter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Enter*) and [System.Threading.Monitor.Exit*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Exit*) have this CLR notification built in, so their usage is recommended as well as the use of the [lock Statement](../../csharp/language-reference/statements/lock.md), which uses these methods.

Other locking mechanisms such as spin locks and [System.Threading.AutoResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.AutoResetEvent) must call these methods to notify the CLR that a critical section is being entered.  These methods do not take any locks; they inform the CLR that code is executing in a critical section and aborting the thread could leave shared state inconsistent.  If you have defined your own lock type, such as a custom [System.Threading.ReaderWriterLock](https://learn.microsoft.com/search/?terms=System.Threading.ReaderWriterLock) class, use these lock count methods.

#### Code analysis rule

Mark and identify all locks using [System.Threading.Thread.BeginCriticalRegion*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.BeginCriticalRegion*) and [System.Threading.Thread.EndCriticalRegion*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.EndCriticalRegion*). Do not use [System.Threading.Interlocked.CompareExchange*](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked.CompareExchange*), [System.Threading.Interlocked.Increment*](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked.Increment*), and [System.Threading.Interlocked.Decrement*](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked.Decrement*) in a loop.  Do not do a platform invoke of the Win32 variants of these methods.  Do not use [System.Threading.Thread.Sleep*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep*) in a loop.  Do not use volatile fields.

### Cleanup code must be in a finally or a catch block, Not following a catch

Cleanup code should never follow a `catch` block; it should be in a `finally` or in the `catch` block itself. This should be a normal good practice. A `finally` block is generally preferred because it runs the same code both when an exception is thrown and when the end of the `try` block is normally encountered.  In the event of an unexpected exception being thrown, for example a [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException), the cleanup code will not run.  Any unmanaged resources that you would clean up in a `finally` should ideally be wrapped in a [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) to prevent leaks.  Note the C# `using` keyword can be used effectively to dispose of objects, including handles.

Although [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) recycling can clean up resources on the finalizer thread, it is still important to put cleanup code in the correct place. Note that if a thread receives an asynchronous exception without holding a lock, the CLR attempts to end the thread itself without having to recycle the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain).  Ensuring that resources are cleaned up sooner rather than later helps by making more resources available, and by better managing the lifetime. If you do not explicitly close a handle to a file in some error code path then wait for the [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) finalizer to clean it up, the next time your code runs it may fail trying to access the exact same file if the finalizer has not already run.  For this reason, ensuring that cleanup code exists and works correctly will help recover from failures more cleanly and quickly, even though it is not strictly necessary.

#### Code analysis rule

Cleanup code after `catch` needs to be in a `finally` block. Place calls to dispose in a finally block. `catch` blocks should end in a throw or rethrow. While there will be exceptions, such as code detecting whether a network connection can be established where you might get any of a large number of exceptions, any code that requires the catching of a number of exceptions under normal circumstances should give an indication that the code should be tested to see if it will succeed.

### Process-Wide mutable shared state between application domains should be eliminated or use a constrained execution region

As described in the introduction, it can be very difficult to write managed code that monitors process-wide shared state across application domains in a reliable manner.  Process-wide shared state is any sort of data structure shared between application domains, either in Win32 code, inside the CLR, or in managed code using remoting.  Any mutable shared state is very difficult to correctly write in managed code, and any static shared state might be done only with great care.  If you have process-wide or machine-wide shared state, find some way to eliminate it or protect the shared state using a constrained execution region (CER).  Note that any library with shared state that is not identified and corrected could cause a host, such as SQL Server, that requires clean [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) unloading to crash.

If code uses a COM object, avoid sharing that COM object between application domains.

### Locks do not work process-wide or between application domains.

In the past, [System.Threading.Monitor.Enter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Enter*) and the [lock Statement](../../csharp/language-reference/statements/lock.md) have been used to create global process locks.  For example, this occurs when locking on [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) agile classes, such as [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instances from non-shared assemblies, [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) objects, interned strings, and some strings shared across application domains using remoting.  These locks are no longer process-wide.  To identify the presence of a process-wide interapplication domain lock, determine if the code within the lock uses any external, persisted resource such as a file on disk or possibly a database.

Note that taking a lock within an [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) might cause problems if the protected code uses an external resource because that code may run simultaneously across multiple application domains.  This can be a problem when writing to one log file or binding to a socket for the entire process.  These changes mean there is no easy way, using managed code, to get a process-global lock, other than using a named [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) or [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) instance.  Create code that does not run in two application domains simultaneously, or use the [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) or [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) classes.  If existing code cannot be changed, do not use a Win32 named mutex to achieve this synchronization because running in fiber mode means you cannot guarantee the same operating system thread will acquire and release a mutex.  You must use the managed [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class, or a named [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent), [System.Threading.AutoResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.AutoResetEvent), or a [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) to synchronize the code lock in a manner that the CLR is aware of instead of synchronizing the lock using unmanaged code.

#### Avoid lock(typeof(MyType))

Private and public [System.Type](https://learn.microsoft.com/search/?terms=System.Type) objects in shared assemblies with only one copy of the code shared across all application domains also present problems.  For shared assemblies, there is only one instance of a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) per process, meaning that multiple application domains share the exact same [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance.  Taking a lock on a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance takes a lock that affects the entire process, not just the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain).  If one [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) takes a lock on a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object then that thread gets abruptly aborted, it will not release the lock.  This lock then may cause other application domains to deadlock.

A good way to take locks in static methods involves adding a static internal synchronization object to the code.  This could be initialized in the class constructor if one is present, but if not it can be initialized like this:

```csharp
private static Object s_InternalSyncObject;
private static Object InternalSyncObject
{
    get
    {
        if (s_InternalSyncObject == null)
        {
            Object o = new Object();
            Interlocked.CompareExchange(
                ref s_InternalSyncObject, o, null);
        }
        return s_InternalSyncObject;
    }
}
```

Then when taking a lock, use the `InternalSyncObject` property to obtain an object to lock on.  You do not need to use the property if you have initialized the internal synchronization object in your class constructor.  The double checking lock initialization code should look like this example:

```csharp
public static MyClass SingletonProperty
{
    get
    {
        if (s_SingletonProperty == null)
        {
            lock(InternalSyncObject)
            {
                // Do not use lock(typeof(MyClass))
                if (s_SingletonProperty == null)
                {
                    MyClass tmp = new MyClass(…);
                    // Do all initialization before publishing
                    s_SingletonProperty = tmp;
                }
            }
        }
        return s_SingletonProperty;
    }
}
```

#### A note about lock(this)

It is generally acceptable to take a lock on an individual object that is publicly accessible.  However, if the object is a singleton object that might cause an entire subsystem to deadlock, consider using the above design pattern as well.  For example, a lock on the one [System.Security.SecurityManager](https://learn.microsoft.com/search/?terms=System.Security.SecurityManager) object could cause a deadlock within the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) making the entire [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) unusable. It is good practice to not take a lock on a publicly accessible object of this type.  However a lock on an individual collection or array should generally not present a problem.

#### Code analysis rule

Do not take locks on types that might be used across application domains or do not have a strong sense of identity. Do not call [System.Threading.Monitor.Enter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Enter*) on a [System.Type](https://learn.microsoft.com/search/?terms=System.Type), [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo), [System.Reflection.PropertyInfo](https://learn.microsoft.com/search/?terms=System.Reflection.PropertyInfo), [System.String](https://learn.microsoft.com/search/?terms=System.String), [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType), [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread), or any object that derives from [System.MarshalByRefObject](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject).

### Remove GC.KeepAlive calls

A significant amount of existing code either does not use [System.GC.KeepAlive*](https://learn.microsoft.com/search/?terms=System.GC.KeepAlive*) when it should or uses it when it is not appropriate.  After converting to [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle), classes do not need to call [System.GC.KeepAlive*](https://learn.microsoft.com/search/?terms=System.GC.KeepAlive*), assuming they do not have a finalizer but rely on [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) to finalize the operating system handles.  While the performance cost of retaining a call to [System.GC.KeepAlive*](https://learn.microsoft.com/search/?terms=System.GC.KeepAlive*) may be negligible, the perception that a call to [System.GC.KeepAlive*](https://learn.microsoft.com/search/?terms=System.GC.KeepAlive*) is either necessary or sufficient to solve a lifetime issue that may no longer exist makes the code more difficult to maintain.  However, when using the COM interop CLR callable wrappers (RCWs), [System.GC.KeepAlive*](https://learn.microsoft.com/search/?terms=System.GC.KeepAlive*) is still required by code.

#### Code analysis rule

Remove [System.GC.KeepAlive*](https://learn.microsoft.com/search/?terms=System.GC.KeepAlive*).

### Use the HostProtection Attribute

The [System.Security.Permissions.HostProtectionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionAttribute) (HPA) provides the use of declarative security actions to determine host protection requirements, allowing the host to prevent even fully trusted code from calling certain methods which are inappropriate for the given host, such as [System.Environment.Exit*](https://learn.microsoft.com/search/?terms=System.Environment.Exit*) or [System.Windows.Forms.MessageBox.Show*](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MessageBox.Show*) for SQL Server.

The HPA affects only unmanaged applications that host the common language runtime and implement host protection, such as SQL Server. When applied, the security action results in the creation of a link demand based on the host resources the class or method exposes. If the code is run in a client application or on a server that is not host-protected, the attribute "evaporates"; it is not detected and therefore not applied.

> **Important:**
> The purpose of this attribute is to enforce host-specific programming model guidelines, not security behavior.  Although a link demand is used to check for conformance to programming model requirements, the [System.Security.Permissions.HostProtectionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionAttribute) is not a security permission.

If the host does not have programming model requirements, the link demands do not occur.

This attribute identifies the following:

- Methods or classes that do not fit the host programming model, but are otherwise benign.

- Methods or classes that do not fit the host programming model and could lead to destabilizing server-managed user code.

- Methods or classes that do not fit the host programming model and could lead to a destabilization of the server process itself.

> **Note:**
> If you are creating a class library that is to be called by applications that may execute in a host protected environment, you should apply this attribute to members that expose [System.Security.Permissions.HostProtectionResource](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource) resource categories. The .NET Framework class library members with this attribute cause only the immediate caller to be checked.  Your library member must also cause a check of its immediate caller in the same manner.

Please find more information on HPA in [System.Security.Permissions.HostProtectionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionAttribute).

#### Code analysis rule

For SQL Server, all methods used to introduce synchronization or threading must identified with the HPA. This includes methods that share state, are synchronized, or manage external processes. The [System.Security.Permissions.HostProtectionResource](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource) values that impact SQL Server are [System.Security.Permissions.HostProtectionResource.SharedState](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource.SharedState), [System.Security.Permissions.HostProtectionResource.Synchronization](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource.Synchronization), and [System.Security.Permissions.HostProtectionResource.ExternalProcessMgmt](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource.ExternalProcessMgmt). However, any method that exposes any [System.Security.Permissions.HostProtectionResource](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource) should be identified by a HPA, not just those using resources affecting SQL.

### Do not block indefinitely in unmanaged code

Blocking in unmanaged code instead of in managed code can cause a denial of service attack because the CLR is not able to abort the thread.  A blocked thread prevents the CLR from unloading the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain), at least without doing some extremely unsafe operations.  Blocking using a Windows synchronization primitive is a clear example of something we cannot allow.  Blocking in a call to `ReadFile` on a socket should be avoided if possible — ideally the Windows API should provide a mechanism for an operation like this to time out.

Any method that calls into native should ideally use a Win32 call with a reasonable, finite timeout.  If the user is allowed to specify the timeout, the user should not be allowed to specify an infinite timeout without some specific security permission.  As a guideline, if a method will block for more than ~10 seconds, you need to be using a version that supports timeouts or you need additional CLR support.

Here are some examples of problematic APIs.  Pipes (both anonymous and named) can be created with a timeout; however, code must ensure it never calls `CreateNamedPipe` nor `WaitNamedPipe` with NMPWAIT_WAIT_FOREVER.  Additionally, there can be unexpected blocking even if a timeout is specified.  Calling `WriteFile` on an anonymous pipe will block until all bytes are written, meaning if the buffer has unread data in it, the `WriteFile` call will block until the reader has freed up space in the pipe’s buffer.  Sockets should always use some API that honors a timeout mechanism.

#### Code analysis rule

Blocking without a timeout in unmanaged code is a denial of service attack. Do not perform platform invoke calls to `WaitForSingleObject`, `WaitForSingleObjectEx`, `WaitForMultipleObjects`, `MsgWaitForMultipleObjects`, and `MsgWaitForMultipleObjectsEx`.  Do not use NMPWAIT_WAIT_FOREVER.

### Identify any STA-Dependent features

Identify any code that uses COM single-threaded apartments (STAs).  STAs are disabled in the SQL Server process.  Features that depend on `CoInitialize`, such as performance counters or the clipboard, must be disabled within SQL Server.

### Ensure finalizers are free of synchronization problems

Multiple finalizer threads might exist in future versions of the .NET Framework, meaning the finalizers for different instances of the same type run simultaneously.  They do not have to be completely thread safe; the garbage collector guarantees that only one thread will run the finalizer for a given object instance.  However, the finalizers must be coded to avoid race conditions and deadlocks when running simultaneously on multiple different object instances.  When using any external state, such as writing to a log file, in a finalizer, threading issues must be handled.  Do not rely on finalization to provide thread safety. Do not use thread local storage, managed or native, to store state on the finalizer thread.

#### Code analysis rule

Finalizers must be free of synchronization problems. Do not use a static mutable state in a finalizer.

### Avoid unmanaged memory if possible

Unmanaged memory can be leaked, just like an operating system handle. If possible, try to use memory on the stack using [stackalloc](../../csharp/language-reference/operators/stackalloc.md) or a pinned managed object such as the [fixed statement](../../csharp/language-reference/statements/fixed.md) or a [System.Runtime.InteropServices.GCHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.GCHandle) using a byte[]. The [System.GC](https://learn.microsoft.com/search/?terms=System.GC) eventually cleans these up. However, if you must allocate unmanaged memory, consider using a class that derives from [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) to wrap the memory allocation.

Note that there is at least one case where [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) is not adequate. For COM method calls that allocate or free memory, it is common for one DLL to allocate memory via `CoTaskMemAlloc` then another DLL frees that memory with `CoTaskMemFree`.  Using [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) in these places would be inappropriate since it will attempt to tie the lifetime of the unmanaged memory to the lifetime of the [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) instead of allowing the other DLL control the lifetime of the memory.

### Review all uses of catch(Exception)

Catch blocks that catch all exceptions instead of one specific exception will now catch the asynchronous exceptions as well. Examine every catch(Exception) block, looking for no important resource releasing or backout code that might be skipped, as well as potentially incorrect behavior within the catch block itself for handling a [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException), [System.StackOverflowException](https://learn.microsoft.com/search/?terms=System.StackOverflowException), or [System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException).  Note that it is possible this code might be logging or making some assumptions that it may only see certain exceptions, or that whenever an exception happens it failed for exactly one particular reason.  These assumptions may need to be updated to include [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException).

Consider changing all places that catch all exceptions to catching a specific type of exception that you expect will be thrown, such as a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) from string formatting methods.  This prevents the catch block from running on unexpected exceptions and will help ensure the code does not hide bugs by catching unexpected exceptions.  As a general rule never handle an exception in library code (code that requires you to catch an exception may indicate a design flaw in the code you are calling).  In some cases you may want to catch an exception and throw a different exception type to provide more data.  Use nested exceptions in this case, storing the real cause of the failure in the [System.Exception.InnerException](https://learn.microsoft.com/search/?terms=System.Exception.InnerException) property of the new exception.

#### Code analysis rule

Review all catch blocks in managed code that catch all objects or catch all exceptions.  In C#, this means flagging both `catch` {} and `catch(Exception)` {}.  Consider making the exception type very specific, or review the code to ensure it does not act in a bad way if it catches an unexpected exception type.

### Do not assume a managed thread is a Win32 thread – It is a Fiber

Using managed thread local storage does work, but you may not use unmanaged thread local storage or assume the code will run on the current operating system thread again. Do not change settings like the thread’s locale. Do not call `InitializeCriticalSection` or `CreateMutex` via platform invoke because they require the operating system thread that enters a lock also exit the lock. Since this will not be the case when using fibers, Win32 critical sections and mutexes cannot be used in SQL directly.  Note that the managed [System.Threading.Mutex](https://learn.microsoft.com/search/?terms=System.Threading.Mutex) class does not handle these thread affinity concerns.

You can safely use most of the state on a managed [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) object, including managed thread local storage and the thread’s current UI culture. You can also use the [System.ThreadStaticAttribute](https://learn.microsoft.com/search/?terms=System.ThreadStaticAttribute), which makes the value of an existing static variable accessible only by the current managed thread (this is another way of doing fiber local storage in the CLR). For programming model reasons, you can not change the current culture of a thread when running in SQL.

#### Code analysis rule

SQL Server runs in fiber mode; do not use thread local storage. Avoid platform invoke calls to `TlsAlloc`, `TlsFree`, `TlsGetValue`, and `TlsSetValue.`

### Let SQL Server handle impersonation

Since impersonation operates on the thread level and SQL can run in fiber mode, managed code should not impersonate users, and should not call `RevertToSelf`.

#### Code analysis rule

Let SQL Server handle impersonation. Do not use `RevertToSelf`, `ImpersonateAnonymousToken`, `DdeImpersonateClient`, `ImpersonateDdeClientWindow`, `ImpersonateLoggedOnUser`, `ImpersonateNamedPipeClient`, `ImpersonateSelf`, `RpcImpersonateClient`, `RpcRevertToSelf`, `RpcRevertToSelfEx`, or `SetThreadToken`.

### Do not call Thread::Suspend

The ability to suspend a thread may appear a simple operation, but it can cause deadlocks.  If a thread holding a lock gets suspended by a second thread and then the second thread tries taking the same lock, a deadlock occurs.  [System.Threading.Thread.Suspend*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Suspend*) can interfere with security, class loading, remoting, and reflection currently.

#### Code analysis rule

Do not call [System.Threading.Thread.Suspend*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Suspend*). Consider using a real synchronization primitive instead, such as a [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) or [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) .

### Protect critical operations with constrained execution regions and reliability contracts

When performing a complex operation that updates a shared status or that needs to deterministically either fully succeed or fully fail, be sure that it is protected by a constrained execution region (CER). This guarantees that the code runs in every case, even an abrupt thread abort or an abrupt [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) unload.

A CER is a particular `try/finally` block immediately preceded by a call to [System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegions*](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegions*).

Doing so instructs the just-in-time compiler to prepare all the code in the finally block before running the `try` block. This guarantees that the code in the finally block is built and will run in all cases. It is not uncommon in a CER to have an empty `try` block. Using a CER protects against asynchronous thread aborts and out-of-memory exceptions. See [System.Runtime.CompilerServices.RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup*](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup*) for a form of a CER that additionally handles stack overflows for exceedingly deep code.

## See also

- [System.Runtime.ConstrainedExecution](https://learn.microsoft.com/search/?terms=System.Runtime.ConstrainedExecution)
- [SQL Server Programming and Host Protection Attributes](sql-server-programming-and-host-protection-attributes.md)
