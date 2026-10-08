---
title: "Pausing and interrupting threads"
description: Learn how to pause & interrupt threads in .NET. Learn how to use methods like Thread.Sleep & Thread.Interrupt, & exceptions such as ThreadInterruptedException.
ms.date: 03/13/2026
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "interrupting threads"
  - "threading [.NET], pausing"
  - "pausing threads"
ms.topic: how-to
ai-usage: ai-assisted
---
# Pausing and interrupting threads

The most common ways to synchronize the activities of threads are to block and release threads, or to lock objects or regions of code. For more information on these locking and blocking mechanisms, see [Overview of Synchronization Primitives](overview-of-synchronization-primitives.md).

 You can also have threads put themselves to sleep. When threads are blocked or sleeping, you can use a [System.Threading.ThreadInterruptedException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadInterruptedException) to break them out of their wait states.

## The Thread.Sleep method

 Calling the [System.Threading.Thread.Sleep*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep*) method causes the current thread to immediately block for the number of milliseconds or the time interval you pass to the method, and yields the remainder of its time slice to another thread. Once that interval elapses, the sleeping thread resumes execution.

 One thread cannot call [System.Threading.Thread.Sleep*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep*) on another thread.  [System.Threading.Thread.Sleep*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep*) is a static method that always causes the current thread to sleep.

 Calling [System.Threading.Thread.Sleep*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep*) with a value of [System.Threading.Timeout.Infinite](https://learn.microsoft.com/search/?terms=System.Threading.Timeout.Infinite) causes a thread to sleep until another thread calls the [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) method on the sleeping thread. The following example illustrates interrupting a sleeping thread.

[language="csharp" source="./snippets/pausing-and-resuming-threads/csharp/InterruptThread/Program.cs" id="Snippet1"::: (complete source file; reference: ./snippets/pausing-and-resuming-threads/csharp/InterruptThread/Program.cs)](../../../_code/docs/standard/threading/snippets/pausing-and-resuming-threads/csharp/InterruptThread/Program.cs.md)
[language="vb" source="./snippets/pausing-and-resuming-threads/vb/InterruptThread/Program.vb" id="Snippet1"::: (complete source file; reference: ./snippets/pausing-and-resuming-threads/vb/InterruptThread/Program.vb)](../../../_code/docs/standard/threading/snippets/pausing-and-resuming-threads/vb/InterruptThread/Program.vb.md)

The example calls [System.Threading.Thread.Join*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Join*) to block the calling thread until the interrupted thread finishes execution.

## Interrupting threads

 You can interrupt a waiting thread by calling the [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) method on the blocked thread to throw a [System.Threading.ThreadInterruptedException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadInterruptedException), which breaks the thread out of the blocking call. The thread should catch the [System.Threading.ThreadInterruptedException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadInterruptedException) and do whatever is appropriate to continue working. If the thread ignores the exception, the runtime catches the exception and stops the thread.

> **Note:**
> If the target thread is not blocked when [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) is called, the thread is not interrupted until it blocks. If the thread never blocks, it could complete without ever being interrupted.

 If a wait is a managed wait, then [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) wakes the thread immediately. If a wait is an unmanaged wait (for example, a platform invoke call to the Win32 [WaitForSingleObject](https://learn.microsoft.com/windows/desktop/api/synchapi/nf-synchapi-waitforsingleobject) function), [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) can't take control of the thread until it returns to or calls into managed code. In managed code, the behavior is as follows:

- [System.Threading.Thread.Interrupt*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Interrupt*) wakes a thread out of any wait it might be in and causes a [System.Threading.ThreadInterruptedException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadInterruptedException) to be thrown in the destination thread.

- .NET Framework only: [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) wakes a thread out of any wait it might be in and causes a [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) to be thrown on the thread. For details, see [Destroy threads](destroying-threads.md) and [SYSLIB0006: Thread.Abort is not supported](../../fundamentals/syslib-diagnostics/syslib0006.md).

## See also

- [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread)
- [System.Threading.ThreadInterruptedException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadInterruptedException)
- [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException)
- [Threading](managed-threading-basics.md)
- [Using Threads and Threading](using-threads-and-threading.md)
- [Overview of Synchronization Primitives](overview-of-synchronization-primitives.md)
- [Canceling threads cooperatively](canceling-threads-cooperatively.md)
