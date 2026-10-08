---
title: "Breaking change: AllowRenegotiation default is false"
description: Learn about the .NET 7 breaking change in networking where the default value of SslServerAuthenticationOptions.AllowRenegotiation has been changed to false.
ms.date: 03/16/2022
---
# AllowRenegotiation default is false

The default value of [System.Net.Security.SslServerAuthenticationOptions.AllowRenegotiation](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.AllowRenegotiation) has been changed to `false`.

## Previous behavior

In previous versions, client-side renegotiation was allowed by the server by default.

## New behavior

Starting in .NET 7, client-side renegotiation must be explicitly enabled on the server side.

## Version introduced

.NET 7

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility) and [source compatibility](../../categories.md#source-compatibility).

## Reason for change

Client-side renegotiation is viewed as insecure by the industry. For example, it has been removed from TLS 1.3 entirely. Therefore, we should disable it by default.

## Recommended action

If client-side renegotiation is required, set [System.Net.Security.SslServerAuthenticationOptions.AllowRenegotiation](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.AllowRenegotiation) to `true` when initializing the server side of the [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream).

## Affected APIs

- [System.Net.Security.SslServerAuthenticationOptions](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions)
- [System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate,System.Boolean,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate%2CSystem.Boolean%2CSystem.Boolean))
- [System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate,System.Boolean,System.Security.Authentication.SslProtocols,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate%2CSystem.Boolean%2CSystem.Security.Authentication.SslProtocols%2CSystem.Boolean))
- [System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate)](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate))
