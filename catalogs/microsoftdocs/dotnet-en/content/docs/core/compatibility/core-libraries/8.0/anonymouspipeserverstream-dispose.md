---
title: ".NET 8 breaking change: AnonymousPipeServerStream.Dispose behavior for HandleInheritability.Inheritable"
description: Learn about the .NET 8 breaking change in core .NET libraries where the behavior of AnonymousPipeServerStream.Dispose has changed for servers that are created for out-of-proc communication.
ms.date: 01/30/2023
---
# AnonymousPipeServerStream.Dispose behavior for HandleInheritability.Inheritable

To avoid resource leaks, your code should call the [System.IO.Pipes.AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle) method after passing the client handle to the child process. The behavior of `AnonymousPipeServerStream.Dispose` has been improved to lower the chance of similar leaks for users who don't call [System.IO.Pipes.AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle).

## Previous behavior

Previously, the client handle owned by the [System.IO.Pipes.AnonymousPipeServerStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream) instance wasn't disposed by `AnonymousPipeServerStream.Dispose` unless the handle wasn't exposed at all.

## New behavior

Starting in .NET 8, the client handle owned by a server that was created for out-of-proc communication is disposed by `AnonymousPipeServerStream.Dispose` if it's not exposed by using the [System.IO.Pipes.AnonymousPipeServerStream.ClientSafePipeHandle](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream.ClientSafePipeHandle) property. (You create a server for out-of-proc communication by passing [System.IO.HandleInheritability.Inheritable](https://learn.microsoft.com/search/?terms=System.IO.HandleInheritability.Inheritable) to the [System.IO.Pipes.AnonymousPipeServerStream.%23ctor(System.IO.Pipes.PipeDirection,System.IO.HandleInheritability)](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream.%2523ctor(System.IO.Pipes.PipeDirection%2CSystem.IO.HandleInheritability)) constructor.)

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

This change was introduced to avoid a common resource leak.

## Recommended action

If a server was created for out-of-proc communication, don't reuse the client handle that's exposed as a string via the [System.IO.Pipes.AnonymousPipeServerStream.GetClientHandleAsString](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream.GetClientHandleAsString) method after the server instance has been disposed.

## Affected APIs

- [System.IO.Pipes.AnonymousPipeServerStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.AnonymousPipeServerStream) (specifically, `AnonymousPipeServerStream.Dispose()`)
