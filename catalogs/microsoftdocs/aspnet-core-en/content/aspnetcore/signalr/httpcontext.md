---
title: IHttpContextAccessor/HttpContext in ASP.NET Core SignalR
author: guardrex
description: Learn about IHttpContextAccessor and HttpContext in ASP.NET Core SignalR.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 01/30/2025
uid: signalr/httpcontext
---
# `IHttpContextAccessor`/`HttpContext` in ASP.NET Core SignalR

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


[Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor)/[Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) generally should be avoided with SignalR because a valid [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) isn't always available. In most cases, the context doesn't exist (`null`).

Even when an [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) instance is available, the context is dependent on the transport:

* WebSockets receives a single context as the result of the initial handshake.
* Long polling receives a new context per client "poll" request.
* A SignalR service receives a mocked/faked/shim context.

When working within a SignalR hub, you can access the [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) directly using the [Microsoft.AspNetCore.SignalR.GetHttpContextExtensions.GetHttpContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.GetHttpContextExtensions.GetHttpContext%252A) method. This method returns the [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) for the current connection or `null` if the connection isn't associated with an HTTP request. This is particularly useful for retrieving HTTP connection information, such as headers and query strings, directly within the hub. We recommend calling this method over [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) for accessing [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) in the hub. For more information, see [signalr/hubs#use-context-object-properties-and-methods](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-context-object-properties-and-methods).

For guidance on [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor)/[Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) in ASP.NET Core Blazor apps, see [blazor/components/httpcontext](../blazor/components/httpcontext.md).
