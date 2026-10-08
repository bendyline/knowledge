---
title: "Breaking change: Socket.LocalEndPoint is updated after calling SendToAsync"
description: Learn about the breaking change in .NET 5 where SendToAsync now updates the value of the local endpoint property to the socket's local address.
ms.date: 10/18/2020
---
# Socket.LocalEndPoint is updated after calling SendToAsync

[System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)) now updates the value of the [System.Net.Sockets.Socket.LocalEndPoint](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.LocalEndPoint) property to the socket's local address.

## Version introduced

5.0

## Change description

In previous .NET versions, [System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)) does not alter the value of the [System.Net.Sockets.Socket.LocalEndPoint](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.LocalEndPoint) property on the socket instance. Starting in .NET 5, when [System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)) successfully completes, the value of [System.Net.Sockets.Socket.LocalEndPoint](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.LocalEndPoint) is the implicitly bound socket's local address. This new behavior is consistent with the behavior of [System.Net.Sockets.Socket.SendTo(System.Byte\[\],System.Net.EndPoint)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendTo(System.Byte%5B%5D%2CSystem.Net.EndPoint)) and [System.Net.Sockets.Socket.BeginSendTo(System.Byte\[\],System.Int32,System.Int32,System.Net.Sockets.SocketFlags,System.Net.EndPoint,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.BeginSendTo(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.Net.Sockets.SocketFlags%2CSystem.Net.EndPoint%2CSystem.AsyncCallback%2CSystem.Object))/[System.Net.Sockets.Socket.EndSendTo(System.IAsyncResult)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.EndSendTo(System.IAsyncResult)).

## Reason for change

This change [fixes a bug](https://github.com/dotnet/runtime/issues/915) and makes the behavior consistent across `SendTo` variants.

## Recommended action

Alter any code that assumes that [System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)) won't alter the value of [System.Net.Sockets.Socket.LocalEndPoint](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.LocalEndPoint).

## Affected APIs

- [System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs))

<!--

### Affected APIs

- `M:System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)`

### Category

Networking

-->
