---
title: Asynchronous file access
description: Learn how to use the async feature to access files in C#. You can call into asynchronous methods without using callbacks or splitting your code across methods.
ms.date: 04/22/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Asynchronous file access (C#)

By using the async feature to access files, you can call into asynchronous methods without using callbacks or splitting your code across multiple methods or lambda expressions. To make synchronous code asynchronous, call an asynchronous method instead of a synchronous method and add a few keywords to the code.

Consider adding asynchrony to file access calls for these reasons:

> 
>
> - Asynchrony makes UI applications more responsive because the UI thread that launches the operation can perform other work. If the UI thread must execute code that takes a long time (for example, more than 50 milliseconds), the UI might freeze until the I/O is complete and the UI thread can again process keyboard and mouse input and other events.
> - Asynchrony improves the scalability of ASP.NET and other server-based applications by reducing the need for threads. If the application uses a dedicated thread per response and a thousand requests are being handled simultaneously, a thousand threads are needed. Asynchronous operations often don't need to use a thread during the wait. They use the existing I/O completion thread briefly at the end.
> - The latency of a file access operation might be very low under current conditions, but the latency might greatly increase in the future. For example, a file might be moved to a server that's across the world.
> - The added overhead of using the Async feature is small.
> - Multiple asynchronous I/O operations can run without blocking the calling thread.

## Use appropriate classes

The simple examples in this topic demonstrate [System.IO.File.WriteAllTextAsync*](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllTextAsync*) and [System.IO.File.ReadAllTextAsync*](https://learn.microsoft.com/search/?terms=System.IO.File.ReadAllTextAsync*). For fine control over the file I/O operations, use the [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) class, which has an option that causes asynchronous I/O to occur at the operating system level. By using this option, you can avoid blocking a thread pool thread in many cases. To enable this option, specify the `useAsync=true` or `options=FileOptions.Asynchronous` argument in the constructor call.

You can't use this option with [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) and [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) if you open them directly by specifying a file path. However, you can use this option if you provide them a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) that the [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) class opened. Asynchronous calls are faster in UI apps even if a thread pool thread is blocked, because the UI thread isn't blocked during the wait.

## Write text

The following examples write text to a file. At each await statement, the method immediately exits. When the file I/O is complete, the method resumes at the statement that follows the await statement. The async modifier is in the definition of methods that use the await statement.

### Simple example

[language="csharp" source="snippets/file-access/Program.cs" id="SimpleWrite"::: (complete source file; reference: snippets/file-access/Program.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/file-access/Program.cs.md)

### Finite control example

[language="csharp" source="snippets/file-access/Program.cs" id="WriteText"::: (complete source file; reference: snippets/file-access/Program.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/file-access/Program.cs.md)

The original example has the statement `await sourceStream.WriteAsync(encodedText, 0, encodedText.Length);`, which is a contraction of the following two statements:

```csharp
Task theTask = sourceStream.WriteAsync(encodedText, 0, encodedText.Length);
await theTask;
```

The first statement returns a task and causes file processing to start. The second statement with the await causes the method to immediately exit and return a different task. When the file processing later completes, execution returns to the statement that follows the await.

## Read text

The following examples read text from a file.

### Simple example

[language="csharp" source="snippets/file-access/Program.cs" id="SimpleRead"::: (complete source file; reference: snippets/file-access/Program.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/file-access/Program.cs.md)

### Finite control example

The text is buffered and, in this case, placed into a [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder). Unlike in the previous example, the evaluation of the await produces a value. The [System.IO.Stream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.ReadAsync*) method returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)\<[System.Int32](https://learn.microsoft.com/search/?terms=System.Int32)>, so the evaluation of the await produces an `Int32` value `numRead` after the operation completes. For more information, see [Async Return Types (C#)](async-return-types.md).

[language="csharp" source="snippets/file-access/Program.cs" id="ReadText"::: (complete source file; reference: snippets/file-access/Program.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/file-access/Program.cs.md)

## Multiple asynchronous I/O operations

The following examples start multiple async write operations. The runtime queues these operations, and the underlying implementation might use operating system (OS) async I/O or thread pool threads depending on the platform and configuration, so actual concurrency depends on OS and hardware.

### Simple example

[language="csharp" source="snippets/file-access/Program.cs" id="SimpleParallelWrite"::: (complete source file; reference: snippets/file-access/Program.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/file-access/Program.cs.md)

### Finite control example

For each file, the [System.IO.Stream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.WriteAsync*) method returns a task that's added to a list of tasks. The `await Task.WhenAll(tasks);` statement exits the method and resumes within the method when file processing is complete for all of the tasks.

The example closes all [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) instances in a `finally` block after the tasks are complete. If each `FileStream` was instead created in a `using` statement, the `FileStream` might be disposed of before the task was complete.

The async approach avoids blocking the calling thread while I/O is pending. In many cases, throughput improvements depend on the OS, the hardware, and, on some platforms, .NET runtime behavior such as thread pool limits and scheduling.

[language="csharp" source="snippets/file-access/Program.cs" id="ParallelWriteText"::: (complete source file; reference: snippets/file-access/Program.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/file-access/Program.cs.md)

When using the [System.IO.Stream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.WriteAsync*) and [System.IO.Stream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.ReadAsync*) methods, you can specify a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) to cancel the operation mid-stream. For more information, see [Cancellation in managed threads](../../standard/threading/cancellation-in-managed-threads.md).

## See also

- [Asynchronous programming with async and await (C#)](index.md)
- [Async return types (C#)](async-return-types.md)
