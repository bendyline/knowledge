---
title: "Creating threads and passing data at start time"
description: Understand how to create threads and pass data at the start time of an operating system process in .NET.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "threading [.NET], creating"
  - "threading [.NET], passing data to threads"
  - "threading [.NET], retrieving data from threads"
ms.topic: how-to
---
# Create threads and pass data at start time

When an operating-system process is created, the operating system injects a thread to execute code in that process, including any original application domain. From that point on, application domains can be created and destroyed without any operating system threads necessarily being created or destroyed. If the code being executed is managed code, then a [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) object for the thread executing in the current application domain can be obtained by retrieving the static [System.Threading.Thread.CurrentThread](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentThread) property of type [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread). This topic describes thread creation and discusses alternatives for passing data to the thread procedure.

## Creating a thread

 Creating a new [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) object creates a new managed thread. The [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) class has constructors that take a [System.Threading.ThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ThreadStart) delegate or a [System.Threading.ParameterizedThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ParameterizedThreadStart) delegate; the delegate wraps the method that is invoked by the new thread when you call the [System.Threading.Thread.Start*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Start*) method. Calling [System.Threading.Thread.Start*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Start*) more than once causes a [System.Threading.ThreadStateException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadStateException) to be thrown.

 The [System.Threading.Thread.Start*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Start*) method returns immediately, often before the new thread has actually started. You can use the [System.Threading.Thread.ThreadState*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ThreadState*) and [System.Threading.Thread.IsAlive](https://learn.microsoft.com/search/?terms=System.Threading.Thread.IsAlive) properties to determine the state of the thread at any one moment, but these properties should never be used for synchronizing the activities of threads.

> **Note:**
> Once a thread is started, it is not necessary to retain a reference to the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) object. The thread continues to execute until the thread procedure ends.

 The following code example creates two new threads to call instance and static methods on another object.
 [System.Threading.ThreadStart2#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.ThreadStart2/CS/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.ThreadStart2/CS/source2.cs.md)
 [System.Threading.ThreadStart2#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.ThreadStart2/VB/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.ThreadStart2/VB/source2.vb.md)

## Passing data to threads

The [System.Threading.ParameterizedThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ParameterizedThreadStart) delegate provides an easy way to pass an object containing data to a thread when you call [System.Threading.Thread.Start(System.Object)](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Start(System.Object)). See [System.Threading.ParameterizedThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ParameterizedThreadStart) for a code example.

 Using the [System.Threading.ParameterizedThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ParameterizedThreadStart) delegate is not a type-safe way to pass data, because the [System.Threading.Thread.Start(System.Object)](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Start(System.Object)) method accepts any object. An alternative is to encapsulate the thread procedure and the data in a helper class and use the [System.Threading.ThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ThreadStart) delegate to execute the thread procedure. The following example demonstrates this technique:
 [System.Threading.ThreadStart2#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.ThreadStart2/CS/source3.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.ThreadStart2/CS/source3.cs.md)
 [System.Threading.ThreadStart2#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.ThreadStart2/VB/source3.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.ThreadStart2/VB/source3.vb.md)

Neither [System.Threading.ThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ThreadStart) nor [System.Threading.ParameterizedThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ParameterizedThreadStart) delegate has a return value, because there is no place to return the data from an asynchronous call. To retrieve the results of a thread method, you can use a callback method, as shown in the next section.

## Retrieving data from threads with callback methods

 The following example demonstrates a callback method that retrieves data from a thread. The constructor for the class that contains the data and the thread method also accepts a delegate representing the callback method; before the thread method ends, it invokes the callback delegate.
 [System.Threading.ThreadStart2#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.ThreadStart2/CS/source4.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.ThreadStart2/CS/source4.cs.md)
 [System.Threading.ThreadStart2#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.ThreadStart2/VB/source4.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.ThreadStart2/VB/source4.vb.md)

## See also

- [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread)
- [System.Threading.ThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ThreadStart)
- [System.Threading.ParameterizedThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ParameterizedThreadStart)
- [System.Threading.Thread.Start*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Start*)
- [Threading](managed-threading-basics.md)
- [Using Threads and Threading](using-threads-and-threading.md)
