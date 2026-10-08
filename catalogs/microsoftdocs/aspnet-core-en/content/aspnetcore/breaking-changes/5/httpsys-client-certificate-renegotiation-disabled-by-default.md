---
title: "Breaking change: HttpSys: Client certificate renegotiation disabled by default"
description: "Learn about the breaking change in ASP.NET Core 5.0 titled HttpSys: Client certificate renegotiation disabled by default"
ms.author: wpickett
ms.date: 10/01/2020
ms.custom: https://github.com/aspnet/Announcements/issues/422
---
# HttpSys: Client certificate renegotiation disabled by default

The option to renegotiate a connection and request a client certificate has been disabled by default. For discussion, see issue [dotnet/aspnetcore#23181](https://github.com/dotnet/aspnetcore/issues/23181).

## Version introduced

ASP.NET Core 5.0

## Old behavior

The connection can be renegotiated to request a client certificate.

## New behavior

Client certificates can only be requested during the initial connection handshake. For more information, see pull request [dotnet/aspnetcore#23162](https://github.com/dotnet/aspnetcore/pull/23162).

## Reason for change

Renegotiation caused a number of performance and deadlock issues. It's also not supported in HTTP/2. For additional context from when the option to control this behavior was introduced in ASP.NET Core 3.1, see issue [dotnet/aspnetcore#14806](https://github.com/dotnet/aspnetcore/issues/14806).

## Recommended action

Apps that require client certificates should use *netsh.exe* to set the `clientcertnegotiation` option to `enabled`. For more information, see [netsh http commands](https://learn.microsoft.com/windows-server/networking/technologies/netsh/netsh-http).

If you want client certificates enabled for only some parts of your app, see the guidance at [Optional client certificates](https://learn.microsoft.com/aspnet/core/security/authentication/certauth?view=aspnetcore-3.1#optional-client-certificates\&preserve-view=false).

If you need the old renegotiate behavior, set `HttpSysOptions.ClientCertificateMethod` to the old value `ClientCertificateMethod.AllowRenegotiate`. This isn't recommended for the reasons outlined above and in the linked guidance.

## Affected APIs

- [Microsoft.AspNetCore.Http.ConnectionInfo.ClientCertificate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ConnectionInfo.ClientCertificate%252A)
- [Microsoft.AspNetCore.Http.ConnectionInfo.GetClientCertificateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ConnectionInfo.GetClientCertificateAsync%252A)
- [Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.ClientCertificateMethod%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.ClientCertificateMethod%252A)

<!--

### Category

ASP.NET Core

### Affected APIs

- `Overload:Microsoft.AspNetCore.Http.ConnectionInfo.ClientCertificate`
- `Overload:Microsoft.AspNetCore.Http.ConnectionInfo.GetClientCertificateAsync`
- `Overload:Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.ClientCertificateMethod`

-->
