---
title: "How to: Use Anonymous Pipes for Local Interprocess Communication"
description: Learn how to use anonymous pipes for local interprocess communication on a local computer in .NET. Anonymous pipes require less overhead than named pipes.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "anonymous pipes [.NET]"
  - "parent-child communication [.NET]"
  - "pipes [.NET]"
  - "one-way communication [.NET]"
  - "local computer communication [.NET], pipes"
---
# How to: Use anonymous pipes for local interprocess communication

Anonymous pipes provide interprocess communication on a local computer. They offer less functionality than named pipes, but also require less overhead. You can use anonymous pipes to make interprocess communication on a local computer easier. You cannot use anonymous pipes for communication over a network.

 To implement anonymous pipes, use the [System.IO.Pipes.AnonymousPipeServerStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream) and [System.IO.Pipes.AnonymousPipeClientStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeClientStream) classes.

## Example 1

 The following example demonstrates a way to send a string from a parent process to a child process using anonymous pipes. This example creates an [System.IO.Pipes.AnonymousPipeServerStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream) object in a parent process with a [System.IO.Pipes.PipeDirection](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeDirection) value of [System.IO.Pipes.PipeDirection.Out](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeDirection.Out). The parent process then creates a child process by using a client handle to create an [System.IO.Pipes.AnonymousPipeClientStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeClientStream) object. The child process has a [System.IO.Pipes.PipeDirection](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeDirection) value of [System.IO.Pipes.PipeDirection.In](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeDirection.In).

 The parent process then sends a user-supplied string to the child process. The string is displayed to the console in the child process.

 The following example shows the server process.
 [System.IO.Pipes.AnonymousPipeServerStream_Sample#01 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeServerStream_Sample/cs/Program.cs#01)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeServerStream_Sample/cs/Program.cs.md)
 [System.IO.Pipes.AnonymousPipeServerStream_Sample#01 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeServerStream_Sample/vb/program.vb#01)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeServerStream_Sample/vb/program.vb.md)

## Example 2

 The following example shows the client process. The server process starts the client process and gives that process a client handle. The resulting executable from the client code should be named `pipeClient.exe` and be copied to the same directory as the server executable before running the server process.
 [System.IO.Pipes.AnonymousPipeClientStream_Sample#01 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeClientStream_Sample/cs/Program.cs#01)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeClientStream_Sample/cs/Program.cs.md)
 [System.IO.Pipes.AnonymousPipeClientStream_Sample#01 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeClientStream_Sample/vb/program.vb#01)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.IO.Pipes.AnonymousPipeClientStream_Sample/vb/program.vb.md)

## See also

- [Pipes](pipe-operations.md)
- [How to: Use Named Pipes for Network Interprocess Communication](how-to-use-named-pipes-for-network-interprocess-communication.md)
