---
title: IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps
author: guardrex
description: Learn about IHttpContextAccessor and HttpContext in ASP.NET Core Blazor apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/httpcontext
---
# `IHttpContextAccessor`/`HttpContext` in ASP.NET Core Blazor apps

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


**Applies to: \>= aspnetcore-8.0**

[Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) generally should be avoided with interactive rendering because a valid [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) isn't always available.

[Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) can be used during static server-side rendering (static SSR), for example in statically-rendered root components, and when [using a token handler for web API calls](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23use-a-token-handler-for-web-api-calls) on the server. **We recommend avoiding [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) when static SSR or code running on the server can't be guaranteed.**

[Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) can be used as a [cascading parameter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.CascadingParameterAttribute) only in statically-rendered root components or during static SSR for general tasks, such as inspecting and modifying headers or other properties in the `App` component (`App.razor`). The value is `null` during interactive rendering.

```csharp
[CascadingParameter]
private HttpContext? HttpContext { get; set; }
```

For additional context in *advanced* edge cases&dagger;, see the discussion in the following articles:

* [HttpContext is valid in Interactive Server Rendering Blazor page (`dotnet/AspNetCore.Docs` #34301)](https://github.com/dotnet/AspNetCore.Docs/issues/34301)
* [Security implications of using IHttpContextAccessor in Blazor Server (`dotnet/aspnetcore` #45699)](https://github.com/dotnet/aspnetcore/issues/45699)

&dagger;Most developers building and maintaining Blazor apps don't need to delve into advanced concepts when the general guidance in this article is followed. The most important concept to keep in mind is that [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) is fundamentally a server-based, request-response feature that's only generally available on the server during static SSR and only created when a user's circuit is established.

## Don't set or modify headers after the response starts

Attempting to set or modify a header after the first rendering (after the response starts) results in an error:

> System.InvalidOperationException: 'Headers are read-only, response has already started.'

Examples of situations that result in this error include:

* Calling [Microsoft.AspNetCore.Identity.SignInManager%601.PasswordSignInAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInManager%25601.PasswordSignInAsync%252A), which must set headers for Identity to function correctly, while adopting [streaming rendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23streaming-rendering).
* Attempting to set or modify a header after the response has started during interactive rendering.

For guidance on setting headers before the response starts, see [blazor/fundamentals/startup#control-headers-in-c-code](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23control-headers-in-c-code).



**Applies to: < aspnetcore-8.0**

**Don't use [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor)/[Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) directly or indirectly in the Razor components of server-side Blazor apps.** Blazor apps run outside of the ASP.NET Core pipeline context. The [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) isn't guaranteed to be available within the [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor), and [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) isn't guaranteed to hold the context that started the Blazor app.

The recommended approach for passing request state to the Blazor app is through root component parameters during the app's initial rendering. Alternatively, the app can copy the data into a scoped service in the root component's initialization lifecycle event for use across the app. For more information, see [blazor/security/additional-scenarios#pass-tokens-to-a-server-side-blazor-app](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23pass-tokens-to-a-server-side-blazor-app).

A critical aspect of server-side Blazor security is that the user attached to a given circuit might become updated at some point after the Blazor circuit is established but the [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) ***isn't updated***. For more information on addressing this situation with custom services, see [blazor/security/additional-scenarios#circuit-handler-to-capture-users-for-custom-services](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23circuit-handler-to-capture-users-for-custom-services).



For guidance on [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) and [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) in ASP.NET Core SignalR, see [signalr/httpcontext](../../signalr/httpcontext.md).
