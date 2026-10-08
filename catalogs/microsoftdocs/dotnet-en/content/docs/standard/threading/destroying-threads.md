---
title: "Destroying threads"
description: Know your options when you need to destroy a thread in .NET, such as cooperative cancellation or the Thread.Abort method. Learn to handle ThreadAbortException.
ms.date: 03/13/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "destroying threads"
  - "threading [.NET], destroying threads"
ms.topic: how-to
---
# Destroy threads

To terminate the execution of the thread, you usually use the [cooperative cancellation model](cancellation-in-managed-threads.md). However, sometimes it's not possible to stop a thread cooperatively, because it runs third-party code not designed for cooperative cancellation. In .NET Framework apps, you can use the [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) method to terminate a managed thread forcibly. When you call [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*), the Common Language Runtime throws a [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) in the target thread, which the target thread can catch. (However, the .NET Framework runtime always automatically rethrows the exception after the `catch` block.) For more information, see [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*).

The [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) method throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) at runtime in .NET Core and .NET 5 and later versions. Starting in .NET 5, it's also marked obsolete ([SYSLIB0006](../../fundamentals/syslib-diagnostics/syslib0006.md)), so calling it generates a compile-time warning. If you need to terminate the execution of third-party code forcibly in modern .NET implementations, run it in the separate process and use [System.Diagnostics.Process.Kill*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Kill*).

> **Note:**
>
> - When you call [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) to abort a thread other than the current thread, you don't know what code has executed or failed to execute when the [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) is thrown. You also cannot be certain of the state of your application or any application and user state that it's responsible for preserving. For example, calling [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) may prevent the execution of static constructors or the release of managed or unmanaged resources.
> - If a thread is executing unmanaged code when its [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) method is called, the runtime marks it [System.Threading.ThreadState.AbortRequested](https://learn.microsoft.com/search/?terms=System.Threading.ThreadState.AbortRequested). The exception is thrown when the thread returns to managed code.

 Once a thread is aborted, it cannot be restarted.

 The [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) method does not cause the thread to abort immediately, because the target thread can catch the [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) and execute arbitrary amounts of code in a `finally` block. You can call [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*) if you need to wait until the thread has ended. [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*) is a blocking call that does not return until the thread has actually stopped executing or an optional timeout interval has elapsed. The aborted thread could call the [System.Threading.Thread.ResetAbort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ResetAbort*) method or perform unbounded processing in a `finally` block, so if you do not specify a timeout, the wait is not guaranteed to end.

 Threads that are waiting on a call to the [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*) method can be interrupted by other threads that call [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*).

## Handling ThreadAbortException

 If you expect your thread to be aborted, either as a result of calling [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) from your own code or as a result of unloading an application domain in which the thread is running ([System.AppDomain.Unload*](https://learn.microsoft.com/search/?terms=System.AppDomain.Unload*) uses [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) to terminate threads), your thread must handle the [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) and perform any final processing in a `finally` clause, as shown in the following code.

```vb
Try
    ' Code that is executing when the thread is aborted.
Catch ex As ThreadAbortException
    ' Clean-up code can go here.
    ' If there is no Finally clause, ThreadAbortException is
    ' re-thrown by the system at the end of the Catch clause.
Finally
    ' Clean-up code can go here.
End Try
' Do not put clean-up code here, because the exception
' is rethrown at the end of the Finally clause.
```

```csharp
try
{
    // Code that is executing when the thread is aborted.
}
catch (ThreadAbortException ex)
{
    // Clean-up code can go here.
    // If there is no Finally clause, ThreadAbortException is
    // re-thrown by the system at the end of the Catch clause.
}
// Do not put clean-up code here, because the exception
// is rethrown at the end of the Finally clause.
```

 Your clean-up code must be in the `catch` clause or the `finally` clause, because a [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) is rethrown by the system at the end of the `finally` clause, or at the end of the `catch` clause if there is no `finally` clause.

 You can prevent the system from rethrowing the exception by calling the [System.Threading.Thread.ResetAbort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ResetAbort*) method. However, you should do this only if your own code caused the [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException).

## See also

- [Thread.Abort is obsolete](../../core/compatibility/core-libraries/5.0/thread-abort-obsolete.md)
- [SYSLIB0006: Thread.Abort is not supported](../../fundamentals/syslib-diagnostics/syslib0006.md)
- [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException)
- [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread)
- [Using Threads and Threading](using-threads-and-threading.md)
