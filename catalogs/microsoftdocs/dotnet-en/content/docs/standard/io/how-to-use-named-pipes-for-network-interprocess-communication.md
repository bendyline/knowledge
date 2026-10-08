---
title: "How to: Use Named Pipes for Network Interprocess Communication"
description: See two examples of using named pipes for interprocess communication between a pipe server and one or more pipe clients in a network.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "message-based communication [.NET], named pipes"
  - "named pipes [.NET]"
  - "pipes [.NET]"
  - "multiple connections via named pipes"
  - "network communications [.NET], named pipes"
  - "impersonation [.NET], named pipes"
  - "full duplex communication [.NET], named pipes"
---
# How to: Use named pipes for network interprocess communication

Named pipes provide interprocess communication between a pipe server and one or more pipe clients. They offer more functionality than anonymous pipes, which provide interprocess communication on a local computer. Named pipes support full duplex communication over a network and multiple server instances, message-based communication, and client impersonation, which enables connecting processes to use their own set of permissions on remote servers.

> **Important:**
> .NET on Linux uses Unix Domain Sockets (UDS) for the implementation of these APIs.

> **Note:**
> Starting in .NET 11, when you create a [System.IO.Pipes.NamedPipeServerStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeServerStream) with [System.IO.Pipes.PipeOptions.CurrentUserOnly](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeOptions.CurrentUserOnly) on Unix, the underlying socket file is set to mode `0600` (owner read/write only) at bind time. Previously, the socket file inherited permissions from the process umask. For more information, see [NamedPipeServerStream with PipeOptions.CurrentUserOnly tightens Unix socket file permissions](../../core/compatibility/core-libraries/11/namedpipeserverstream-unix-permissions.md).

 To implement name pipes, use the [System.IO.Pipes.NamedPipeServerStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeServerStream) and [System.IO.Pipes.NamedPipeClientStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeClientStream) classes.

## Example 1

 The following example demonstrates how to create a named pipe by using the [System.IO.Pipes.NamedPipeServerStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeServerStream) class. In this example, the server process creates four threads. Each thread can accept a client connection. The connected client process then supplies the server with a file name. If the client has sufficient permissions, the server process opens the file and sends its contents back to the client.
 [System.IO.Pipes.NamedPipeServerStream_ImpersonationSample1#01 (complete source file; reference: ./snippets/how-to-use-named-pipes-for-network-interprocess-communication/csharp/NamedPipeServerStream_ImpersonationSample/Program.cs#01)](../../../_code/docs/standard/io/snippets/how-to-use-named-pipes-for-network-interprocess-communication/csharp/NamedPipeServerStream_ImpersonationSample/Program.cs.md)
 [System.IO.Pipes.NamedPipeServerStream_ImpersonationSample1#01 (complete source file; reference: ./snippets/how-to-use-named-pipes-for-network-interprocess-communication/vb/NamedPipeServerStream_ImpersonationSample/program.vb#01)](../../../_code/docs/standard/io/snippets/how-to-use-named-pipes-for-network-interprocess-communication/vb/NamedPipeServerStream_ImpersonationSample/program.vb.md)

## Example 2

 The following example shows the client process, which uses the [System.IO.Pipes.NamedPipeClientStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeClientStream) class. The client connects to the server process and sends a file name to the server. The example uses impersonation, so the identity that is running the client application must have permission to access the file. The server then sends the contents of the file back to the client. The file contents are then displayed to the console.

 [System.IO.Pipes.NamedPipeClientStream_ImpersonationSample1#01 (complete source file; reference: ./snippets/how-to-use-named-pipes-for-network-interprocess-communication/csharp/NamedPipeClientStream_ImpersonationSample/Program.cs#01)](../../../_code/docs/standard/io/snippets/how-to-use-named-pipes-for-network-interprocess-communication/csharp/NamedPipeClientStream_ImpersonationSample/Program.cs.md)
 [System.IO.Pipes.NamedPipeClientStream_ImpersonationSample1#01 (complete source file; reference: ./snippets/how-to-use-named-pipes-for-network-interprocess-communication/vb//NamedPipeClientStream_ImpersonationSample/program.vb#01)](../../../_code/docs/standard/io/snippets/how-to-use-named-pipes-for-network-interprocess-communication/vb/NamedPipeClientStream_ImpersonationSample/program.vb.md)

## Robust Programming

 The client and server processes in this example are intended to run on the same computer, so the server name provided to the [System.IO.Pipes.NamedPipeClientStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeClientStream) object is `"."`. If the client and server processes were on separate computers, `"."` would be replaced with the network name of the computer that runs the server process.

## See also

- [System.Security.Principal.TokenImpersonationLevel](https://learn.microsoft.com/search/?terms=System.Security.Principal.TokenImpersonationLevel)
- [System.IO.Pipes.NamedPipeServerStream.GetImpersonationUserName*](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeServerStream.GetImpersonationUserName*)
- [Pipes](pipe-operations.md)
- [How to: Use Anonymous Pipes for Local Interprocess Communication](how-to-use-anonymous-pipes-for-local-interprocess-communication.md)
