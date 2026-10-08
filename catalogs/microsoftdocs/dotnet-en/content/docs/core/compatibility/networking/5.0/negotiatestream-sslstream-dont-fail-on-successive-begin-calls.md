---
title: "Breaking change: NegotiateStream and SslStream allow successive Begin operations"
description: Learn about the breaking change in .NET 5 where error cases on security streams are handled differently, and successive calls to BeginAuthenticateAsServer or BeginAuthenticateAsClient may no longer fail.
ms.date: 10/18/2020
---
# NegotiateStream and SslStream allow successive Begin operations

Error cases on security streams are handled differently, and successive calls to `BeginAuthenticateAsServer` or `BeginAuthenticateAsClient` may no longer fail.

## Version introduced

5.0

## Change description

In previous .NET versions, calling `BeginAuthenticateAsServer` or `BeginAuthenticateAsClient` successively without first calling `EndAuthenticateAsServer` or `EndAuthenticateAsClient` results in a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException). Starting in .NET 5, successive calls to `BeginAuthenticateAsServer` or `BeginAuthenticateAsClient` no longer result in a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException), because these APIs are backed by a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)-based implementation.

## Reason for change

Switching the internal implementation from asynchronous programming model (APM) to [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)-based improves performance and decreases code complexity.

## Recommended action

No action is required on the part of the developer.

## Affected APIs

- [System.Net.Security.SslStream.BeginAuthenticateAsServer*](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.BeginAuthenticateAsServer*)
- [System.Net.Security.SslStream.BeginAuthenticateAsClient*](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.BeginAuthenticateAsClient*)
- [System.Net.Security.NegotiateStream.BeginAuthenticateAsServer*](https://learn.microsoft.com/search/?terms=System.Net.Security.NegotiateStream.BeginAuthenticateAsServer*)
- [System.Net.Security.NegotiateStream.BeginAuthenticateAsClient*](https://learn.microsoft.com/search/?terms=System.Net.Security.NegotiateStream.BeginAuthenticateAsClient*)

<!--

### Affected APIs

- `Overload:M:System.Net.Security.SslStream.BeginAuthenticateAsServer`
- `Overload:M:System.Net.Security.SslStream.BeginAuthenticateAsClient`
- `Overload:M:System.Net.Security.NegotiateStream.BeginAuthenticateAsServer`
- `Overload:M:System.Net.Security.NegotiateStream.BeginAuthenticateAsClient`

### Category

Networking

-->
