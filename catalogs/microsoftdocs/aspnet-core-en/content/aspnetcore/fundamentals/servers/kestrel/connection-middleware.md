---
title: Use connection middleware with the ASP.NET Core Kestrel web server
author: tdykstra
description: Learn about using connection middleware with Kestrel, the cross-platform web server for ASP.NET Core.
monikerRange: '>= aspnetcore-5.0'
ms.author: tdykstra
ms.date: 06/21/2023
uid: fundamentals/servers/kestrel/connection-middleware
---

# Connection middleware

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


Kestrel supports connection middleware. Connection middleware is software that is assembled into a connection pipeline and runs when Kestrel receives a new connection. Each component:

* Chooses whether to pass the request to the next component in the pipeline.
* Can perform work before and after the next component in the pipeline.

Connection delegates are used to build the connection pipeline. Connection delegates are configured with the [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions.Use%252A) method.

Connection middleware is different from [fundamentals/middleware/index](../../middleware/index.md). Connection middleware runs per-connection instead of per-request.

## Connection logging

Connection logging is connection middleware that is included with ASP.NET Core. Call [Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%252A) to emit Debug level logs for byte-level communication on a connection.

Connection logging is helpful for troubleshooting problems in low-level communication, such as during TLS encryption and behind proxies. If `UseConnectionLogging` is placed before `UseHttps`, encrypted traffic is logged. If `UseConnectionLogging` is placed after `UseHttps`, decrypted traffic is logged.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelUseConnectionLogging"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Create custom connection middleware

The following example shows a custom connection middleware that can filter TLS handshakes on a per-connection basis for specific ciphers if necessary. The middleware throws [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) for any cipher algorithm that the app doesn't support. Alternatively, define and compare [Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm%252A) to a list of acceptable cipher suites.

No encryption is used with a [System.Security.Authentication.CipherAlgorithmType.Null](https://learn.microsoft.com/search/?terms=System.Security.Authentication.CipherAlgorithmType.Null) cipher algorithm.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelMiddleware"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## See also

* [fundamentals/servers/kestrel/endpoints](endpoints.md)
