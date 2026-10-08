---
title: Security considerations in gRPC for ASP.NET Core
author: jamesnk
description: Learn about security considerations for gRPC for ASP.NET Core.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 07/07/2019
uid: grpc/security
---
# Security considerations in gRPC for ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


By [James Newton-King](https://twitter.com/jamesnk)

This article provides information on securing gRPC with .NET.

## Transport security

gRPC messages are sent and received using HTTP/2. We recommend:

* [Transport Layer Security (TLS)](https://tools.ietf.org/html/rfc5246) be used to secure messages in production gRPC apps.
* gRPC services should only listen and respond over secured ports.

**Applies to: \>= aspnetcore-5.0**
TLS is configured in Kestrel. For more information on configuring Kestrel endpoints, see [Kestrel endpoint configuration](../fundamentals/servers/kestrel/endpoints.md).


**Applies to: < aspnetcore-5.0**
TLS is configured in Kestrel. For more information on configuring Kestrel endpoints, see [Kestrel endpoint configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23endpoint-configuration).


A [TLS termination proxy](https://wikipedia.org/wiki/TLS_termination_proxy) can be combined with TLS. The benefits of using TLS termination should be considered against the security risks of sending unsecured HTTP requests between apps in the private network.

## Exceptions

Exception messages are generally considered sensitive data that shouldn't be revealed to a client. By default, gRPC doesn't send the details of an exception thrown by a gRPC service to the client. Instead, the client receives a generic message indicating an error occurred. Exception message delivery to the client can be overridden (for example, in development or test) with [EnableDetailedErrors](https://learn.microsoft.com/search/?terms=grpc%2Fconfiguration%23configure-services-options). Exception messages shouldn't be exposed to the client in production apps.

## Message size limits

Incoming messages to gRPC clients and services are loaded into memory. Message size limits are a mechanism to help prevent gRPC from consuming excessive resources.

gRPC uses per-message size limits to manage incoming and outgoing messages. By default, gRPC limits incoming messages to 4 MB. There is no limit on outgoing messages.

On the server, gRPC message limits can be configured for all services in an app with `AddGrpc`:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddGrpc(options =>
    {
        options.MaxReceiveMessageSize = 1 * 1024 * 1024; // 1 MB
        options.MaxSendMessageSize = 1 * 1024 * 1024; // 1 MB
    });
}
```

Limits can also be configured for an individual service using `AddServiceOptions<TService>`. For more information on configuring message size limits, see [gRPC configuration](configuration.md).

## Client certificate validation

[Client certificates](https://tools.ietf.org/html/rfc5246#section-7.4.4) are initially validated when the connection is established. By default, Kestrel doesn't perform additional validation of a connection's client certificate.

We recommend that gRPC services secured by client certificates use the [Microsoft.AspNetCore.Authentication.Certificate](../security/authentication/certauth.md) package. ASP.NET Core certification authentication will perform additional validation on a client certificate, including:

* Certificate has a valid extended key use (EKU)
* Is within its validity period
* Check certificate revocation
