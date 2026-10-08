---
title: "Breaking change: MulticastOption.Group doesn't accept a null value"
description: Learn about the breaking change in .NET 5 where MulticastOption.Group no longer accepts a null value.
ms.date: 08/18/2020
---
# MulticastOption.Group doesn't accept a null value

[System.Net.Sockets.MulticastOption.Group](https://learn.microsoft.com/search/?terms=System.Net.Sockets.MulticastOption.Group) no longer accepts a value of `null`. If you set the property to `null`, an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) is thrown.

## Version introduced

5.0

## Change description

In previous versions of .NET, you can set the [System.Net.Sockets.MulticastOption.Group](https://learn.microsoft.com/search/?terms=System.Net.Sockets.MulticastOption.Group) property to `null`. If the [System.Net.Sockets.MulticastOption](https://learn.microsoft.com/search/?terms=System.Net.Sockets.MulticastOption) is later passed to [System.Net.Sockets.Socket.SetSocketOption*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SetSocketOption*), the runtime throws a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException).

In .NET 5 and later, an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) is thrown if you set the property to `null`.

## Reason for change

To be consistent with the Framework Design Guidelines, the property has been updated to throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) if the value is `null`.

## Recommended action

Make sure that you don't set [System.Net.Sockets.MulticastOption.Group](https://learn.microsoft.com/search/?terms=System.Net.Sockets.MulticastOption.Group) to `null`.

## Affected APIs

- [System.Net.Sockets.MulticastOption.Group](https://learn.microsoft.com/search/?terms=System.Net.Sockets.MulticastOption.Group)

<!--

### Affected APIs

- `P:System.Net.Sockets.MulticastOption.Group`

### Category

Networking

-->
