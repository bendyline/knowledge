---
description: "Learn more about: Interop with Other Asynchronous Patterns and Types"
title: "Interop with Other Asynchronous Patterns and Types"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "asynchronous design patterns, .NET"
  - "TAP, .NET support for"
  - "Task-based Asynchronous Pattern, .NET support for"
  - ".NET, asynchronous design patterns"
ms.assetid: f120a5d9-933b-4d1d-acb6-f034a57c3749
---
# Interop with Other Asynchronous Patterns and Types

A brief history of asynchronous patterns in .NET:

- .NET Framework 1.0 introduced the [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) pattern, otherwise known as the [Asynchronous Programming Model (APM)](asynchronous-programming-model-apm.md), or the `Begin/End` pattern.
- .NET Framework 2.0 added the [Event-based Asynchronous Pattern (EAP)](event-based-asynchronous-pattern-eap.md).
- .NET Framework 4 introduced the [Task-based Asynchronous Pattern (TAP)](task-based-asynchronous-pattern-tap.md), which supersedes both APM and EAP and provides the ability to easily build migration routines from the earlier patterns.

## Tasks and the Asynchronous Programming Model (APM)

### From APM to TAP

 Because the [Asynchronous Programming Model (APM)](asynchronous-programming-model-apm.md) pattern is structured, it is quite easy to build a wrapper to expose an APM implementation as a TAP implementation. .NET Framework 4 and later versions include helper routines in the form of [System.Threading.Tasks.TaskFactory.FromAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.FromAsync*) method overloads to provide this translation.

 Consider the [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) class and its [System.IO.Stream.BeginRead*](https://learn.microsoft.com/search/?terms=System.IO.Stream.BeginRead*) and [System.IO.Stream.EndRead*](https://learn.microsoft.com/search/?terms=System.IO.Stream.EndRead*) methods, which represent the APM counterpart to the synchronous [System.IO.Stream.Read*](https://learn.microsoft.com/search/?terms=System.IO.Stream.Read*) method:

 [Conceptual.AsyncInterop#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Stream1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Stream1.cs.md)
 [Conceptual.AsyncInterop#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/stream1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/stream1.vb.md)
[Conceptual.AsyncInterop#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Stream1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Stream1.cs.md)
[Conceptual.AsyncInterop#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/stream1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/stream1.vb.md)
[Conceptual.AsyncInterop#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Stream1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Stream1.cs.md)
[Conceptual.AsyncInterop#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/stream1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/stream1.vb.md)

 You can use the [System.Threading.Tasks.TaskFactory`1.FromAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory%601.FromAsync*) method to implement a TAP wrapper for this operation as follows:

 [Conceptual.AsyncInterop#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wrap1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wrap1.cs.md)
 [Conceptual.AsyncInterop#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wrap1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wrap1.vb.md)

 This implementation is similar to the following:

 [Conceptual.AsyncInterop#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wrap2.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wrap2.cs.md)
 [Conceptual.AsyncInterop#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wrap2.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wrap2.vb.md)

### From TAP to APM

 If your existing infrastructure expects the APM pattern, you'll also want to take a TAP implementation and use it where an APM implementation is expected.  Because tasks can be composed and  the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class implements [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult), you can use a straightforward helper function to do this. The following code uses an extension of the [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) class, but you can use an almost identical function for non-generic tasks.

 [Conceptual.AsyncInterop#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM1.cs.md)
 [Conceptual.AsyncInterop#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM1.vb.md)

 Now, consider a case where you have the following TAP implementation:

 [Conceptual.AsyncInterop#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs.md)
 [Conceptual.AsyncInterop#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb.md)

 and you want to provide this APM implementation:

 [Conceptual.AsyncInterop#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs.md)
 [Conceptual.AsyncInterop#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb.md)
[Conceptual.AsyncInterop#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs.md)
[Conceptual.AsyncInterop#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb.md)

 The following example demonstrates one migration to APM:

 [Conceptual.AsyncInterop#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM2.cs.md)
 [Conceptual.AsyncInterop#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/APM2.vb.md)

## Tasks and the Event-based Asynchronous Pattern (EAP)

 Wrapping an [Event-based Asynchronous Pattern (EAP)](event-based-asynchronous-pattern-eap.md) implementation is more involved than wrapping an APM pattern, because the EAP pattern has more variation and less structure than the APM pattern.  To demonstrate, the following code wraps the `DownloadStringAsync` method.  `DownloadStringAsync` accepts a URI, raises the `DownloadProgressChanged` event while downloading in order to report multiple statistics on progress, and raises the `DownloadStringCompleted` event when it's done.  The final result is a string that contains the contents of the page at the specified URI.

 [Conceptual.AsyncInterop#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/EAP1.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/EAP1.cs.md)
 [Conceptual.AsyncInterop#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/EAP1.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/EAP1.vb.md)

## Tasks and Wait Handles

### From Wait Handles to TAP

 Although wait handles don't implement an asynchronous pattern, advanced developers may use the [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) class and the [System.Threading.ThreadPool.RegisterWaitForSingleObject*](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool.RegisterWaitForSingleObject*) method for asynchronous notifications when a wait handle is set.  You can wrap the [System.Threading.ThreadPool.RegisterWaitForSingleObject*](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool.RegisterWaitForSingleObject*) method to enable a task-based alternative to any synchronous wait on a wait handle:

 [Conceptual.AsyncInterop#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wait1.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wait1.cs.md)
 [Conceptual.AsyncInterop#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wait1.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wait1.vb.md)

 With this method, you can use existing [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) implementations in asynchronous methods.  For example, if you want to throttle the number of asynchronous operations that are executing at any particular time, you can utilize a semaphore (a [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) object).  You can throttle to *N* the number of operations that run concurrently by initializing the semaphore's count to *N*, waiting on the semaphore any time you want to perform an operation, and releasing the semaphore when you're done with an operation:

 [Conceptual.AsyncInterop#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Semaphore1.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Semaphore1.cs.md)
 [Conceptual.AsyncInterop#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Semaphore1.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Semaphore1.vb.md)

 You can also build an asynchronous semaphore that does not rely on wait handles and instead works completely with tasks. To do this, you can use techniques such as those discussed in [Consuming the Task-based Asynchronous Pattern](consuming-the-task-based-asynchronous-pattern.md) for building data structures on top of [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task).

### From TAP to Wait Handles

 As previously mentioned, the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class implements [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult), and that implementation exposes an [System.Threading.Tasks.Task.System%23IAsyncResult%23AsyncWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.System%2523IAsyncResult%2523AsyncWaitHandle) property that returns a wait handle that will be set when the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) completes.  You can get a [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) for a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) as follows:

 [Conceptual.AsyncInterop#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wait1.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Wait1.cs.md)
 [Conceptual.AsyncInterop#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wait1.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.AsyncInterop/vb/Wait1.vb.md)

## See also

- [Task-based Asynchronous Pattern (TAP)](task-based-asynchronous-pattern-tap.md)
- [Implementing the Task-based Asynchronous Pattern](implementing-the-task-based-asynchronous-pattern.md)
- [Consuming the Task-based Asynchronous Pattern](consuming-the-task-based-asynchronous-pattern.md)
