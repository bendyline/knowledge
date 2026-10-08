---
description: "Learn more about: Managed and unmanaged threading in Windows"
title: "Managed and Unmanaged Threading in Windows"
ms.date: 03/13/2026
ai-usage: ai-assisted
elpviewer_keywords:
  - "threading [.NET], unmanaged"
  - "threading [.NET], managed"
  - "threading [.NET], managed"
  - "threads and fibers [.NET]"
  - "managed threading"
ms.assetid: 4fb6452f-c071-420d-9e71-da16dee7a1eb
---
# Managed and unmanaged threading in Windows

Management of all threads is done through the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) class, including threads created by the common language runtime and those created outside the runtime that enter the managed environment to execute code. The runtime monitors all the threads in its process that have ever executed code within the managed execution environment. It does not track any other threads. Threads can enter the managed execution environment through COM interop (because the runtime exposes managed objects as COM objects to the unmanaged world), the COM [DllGetClassObject](https://learn.microsoft.com/windows/desktop/api/combaseapi/nf-combaseapi-dllgetclassobject) function, and platform invoke.

 When an unmanaged thread enters the runtime through, for example, a COM callable wrapper, the system checks the thread-local store of that thread to look for an internal managed [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) object. If one is found, the runtime is already aware of this thread. If it cannot find one, however, the runtime builds a new [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) object and installs it in the thread-local store of that thread.

 In managed threading, [System.Threading.Thread.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.GetHashCode*) is the stable managed thread identification. For the lifetime of your thread, it will not collide with the value from any other thread, regardless of the application domain from which you obtain this value.

## Mapping from Win32 threading to managed threading

 The following table maps Win32 threading elements to their approximate runtime equivalent. Note that this mapping does not represent identical functionality. For example, `TerminateThread` does not execute `finally` clauses or free up resources, and cannot be prevented. However, [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) executes all your rollback code, reclaims all the resources, and can be denied using [System.Threading.Thread.ResetAbort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ResetAbort*). Read the documentation closely before making assumptions about functionality.

> **Note:**
> [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) is only available in .NET Framework. In .NET 5 and later versions, it throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). For more information, see [SYSLIB0006: Thread.Abort is not supported](../../fundamentals/syslib-diagnostics/syslib0006.md).

| In Win32 | In the common language runtime |
| --- | --- |
| **CreateThread** | Combination of **Thread** and [System.Threading.ThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ThreadStart) |
| **TerminateThread** | [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) |
| **SuspendThread** | [System.Threading.Thread.Suspend*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Suspend*) |
| **ResumeThread** | [System.Threading.Thread.Resume*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Resume*) |
| **Sleep** | [System.Threading.Thread.Sleep*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep*) |
| **WaitForSingleObject** on the thread handle | [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*) |
| **ExitThread** | No equivalent |
| **GetCurrentThread** | [System.Threading.Thread.CurrentThread*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentThread*) |
| **SetThreadPriority** | [System.Threading.Thread.Priority*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Priority*) |
| No equivalent | [System.Threading.Thread.Name*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Name*) |
| No equivalent | [System.Threading.Thread.IsBackground](https://learn.microsoft.com/search/?terms=System.Threading.Thread.IsBackground) |
| Close to **CoInitializeEx** (OLE32.DLL) | [System.Threading.Thread.ApartmentState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ApartmentState*) |

## Managed threads and COM apartments

A managed thread can be marked to indicate that it will host a [single-threaded](https://learn.microsoft.com/windows/desktop/com/single-threaded-apartments) or [multithreaded](https://learn.microsoft.com/windows/desktop/com/multithreaded-apartments) apartment. (For more information on the COM threading architecture, see [Processes, Threads, and Apartments](https://learn.microsoft.com/windows/desktop/com/processes--threads--and-apartments).) The [System.Threading.Thread.GetApartmentState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.GetApartmentState*), [System.Threading.Thread.SetApartmentState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.SetApartmentState*), and [System.Threading.Thread.TrySetApartmentState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.TrySetApartmentState*) methods of the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) class return and assign the apartment state of a thread. If the state has not been set, [System.Threading.Thread.GetApartmentState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.GetApartmentState*) returns [System.Threading.ApartmentState.Unknown](https://learn.microsoft.com/search/?terms=System.Threading.ApartmentState.Unknown).

 The property can be set only when the thread is in the [System.Threading.ThreadState.Unstarted](https://learn.microsoft.com/search/?terms=System.Threading.ThreadState.Unstarted) state; it can be set only once for a thread.

 If the apartment state is not set before the thread is started, the thread is initialized as a multithreaded apartment (MTA). The finalizer thread and all threads controlled by [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) are MTA.

> **Important:**
> For application startup code, the only way to control apartment state is to apply the [System.MTAThreadAttribute](https://learn.microsoft.com/search/?terms=System.MTAThreadAttribute) or the [System.STAThreadAttribute](https://learn.microsoft.com/search/?terms=System.STAThreadAttribute) to the entry point procedure.

 Managed objects that are exposed to COM behave as if they had aggregated the free-threaded marshaller. In other words, they can be called from any COM apartment in a free-threaded manner. The only managed objects that do not exhibit this free-threaded behavior are those objects that derive from [System.EnterpriseServices.ServicedComponent](https://learn.microsoft.com/search/?terms=System.EnterpriseServices.ServicedComponent) or [System.Runtime.InteropServices.StandardOleMarshalObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.StandardOleMarshalObject).

 In the managed world, there is no support for the [System.Runtime.Remoting.Contexts.SynchronizationAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Remoting.Contexts.SynchronizationAttribute) unless you use contexts and context-bound managed instances. If you are using Enterprise Services, then your object must derive from [System.EnterpriseServices.ServicedComponent](https://learn.microsoft.com/search/?terms=System.EnterpriseServices.ServicedComponent) (which is itself derived from [System.ContextBoundObject](https://learn.microsoft.com/search/?terms=System.ContextBoundObject)).

 When managed code calls out to COM objects, it always follows COM rules. In other words, it calls through COM apartment proxies and COM+ 1.0 context wrappers as dictated by OLE32.

## Blocking issues

If a thread makes an unmanaged call into the operating system that has blocked the thread in unmanaged code, the runtime will not take control of it for [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) or [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*). In the case of [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*), the runtime marks the thread for **Abort** and takes control of it when it re-enters managed code. It is preferable for you to use managed blocking rather than unmanaged blocking. [System.Threading.WaitHandle.WaitOne*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitOne*),[System.Threading.WaitHandle.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAny*), [System.Threading.WaitHandle.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAll*), [System.Threading.Monitor.Enter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.Enter*), [System.Threading.Monitor.TryEnter*](https://learn.microsoft.com/search/?terms=System.Threading.Monitor.TryEnter*), [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*), [System.GC.WaitForPendingFinalizers*](https://learn.microsoft.com/search/?terms=System.GC.WaitForPendingFinalizers*), and so on are all responsive to [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) and to [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*). Also, if your thread is in a single-threaded apartment, all these managed blocking operations will correctly pump messages in your apartment while your thread is blocked.

## Threads and fibers

The .NET threading model does not support [fibers](https://learn.microsoft.com/windows/desktop/procthread/fibers). You should not call into any unmanaged function that is implemented by using fibers. Such calls may result in a crash of the .NET runtime.

## See also

- [System.Threading.Thread.ApartmentState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ApartmentState*)
- [System.Threading.ThreadState](https://learn.microsoft.com/search/?terms=System.Threading.ThreadState)
- [System.EnterpriseServices.ServicedComponent](https://learn.microsoft.com/search/?terms=System.EnterpriseServices.ServicedComponent)
- [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread)
- [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor)
