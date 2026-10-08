---
title: Write custom ASP.NET Core middleware
author: tdykstra
description: Learn how to write custom ASP.NET Core middleware.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 06/21/2025
uid: fundamentals/middleware/write
---
# Write custom ASP.NET Core middleware

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


**Applies to: \>= aspnetcore-6.0**

By [Fiyaz Hasan](https://twitter.com/FiyazBinHasan), [Rick Anderson](https://twitter.com/RickAndMSFT), and [Steve Smith](https://ardalis.com/)

Middleware is software that's assembled into an app pipeline to handle requests and responses. ASP.NET Core provides a rich set of built-in middleware components, but in some scenarios you might want to write a custom middleware.

This topic describes how to write *convention-based* middleware. For an approach that uses strong typing and per-request activation, see [fundamentals/middleware/extensibility](extensibility.md).

## Middleware class

Middleware is generally encapsulated in a class and exposed with an extension method. Consider the following inline middleware, which sets the culture for the current request from a query string:

[language="csharp" source="\~/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs" id="snippet_first" highlight="8-21"::: (complete source file; reference: \~/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs.md)

The preceding highlighted inline middleware is used to demonstrate creating a middleware component by calling [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A). The preceding `Use` extension method adds a middleware [delegate](https://learn.microsoft.com/dotnet/csharp/programming-guide/delegates/) defined in-line to the application's request pipeline.

There are two overloads available for the `Use` extension:

* One takes a [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) and a `Func<Task>`. Invoke the `Func<Task>` without any parameters.
* The other takes a `HttpContext` and a [Microsoft.AspNetCore.Http.RequestDelegate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.RequestDelegate). Invoke the `RequestDelegate` by passing the `HttpContext`.

Prefer using the later overload as it saves two internal per-request allocations that are required when using the other overload.

Test the middleware by passing in the culture. For example, request `https://localhost:5001/?culture=es-es`.

For ASP.NET Core's built-in localization support, see [fundamentals/localization](../localization.md).

<!--?culture=de-de ?culture=fr-fr /?culture=zh-hk -->

The following code moves the middleware delegate to a class:

[language="csharp" source="\~/fundamentals/middleware/write/6sample/WebMiddleware/RequestCultureMiddleware.cs" id="snippet_1"::: (complete source file; reference: \~/fundamentals/middleware/write/6sample/WebMiddleware/RequestCultureMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/RequestCultureMiddleware.cs.md)

The middleware class must include:

* A public constructor with a parameter of type [Microsoft.AspNetCore.Http.RequestDelegate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.RequestDelegate).
* A public method named `Invoke` or `InvokeAsync`. This method must:
  * Return a `Task`.
  * Accept a first parameter of type [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext).
  
Additional parameters for the constructor and `Invoke`/`InvokeAsync` are populated by [dependency injection (DI)](../dependency-injection.md).

Typically, an extension method is created to expose the middleware through [Microsoft.AspNetCore.Builder.IApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IApplicationBuilder):

[language="csharp" source="\~/fundamentals/middleware/write/6sample/WebMiddleware/RequestCultureMiddleware.cs" id="snippet_all" highlight="30-99"::: (complete source file; reference: \~/fundamentals/middleware/write/6sample/WebMiddleware/RequestCultureMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/RequestCultureMiddleware.cs.md)

The following code calls the middleware from `Program.cs`:

[language="csharp" source="\~/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs" id="snippet_2" highlight="9"::: (complete source file; reference: \~/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs.md)

## Middleware dependencies

Middleware should follow the [Explicit Dependencies Principle](https://learn.microsoft.com/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#explicit-dependencies) by exposing its dependencies in its constructor. Middleware is constructed once per *application lifetime*.

Middleware components can resolve their dependencies from [dependency injection (DI)](../dependency-injection.md) through constructor parameters. [Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A) can also accept additional parameters directly.

## Per-request middleware dependencies

Middleware is constructed at app startup and therefore has application life
time. [Scoped lifetime](https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes#scoped) services used by middleware constructors aren't shared with other dependency-injected types during each request. To share a *scoped* service between middleware and other types, add these services to the `InvokeAsync` method's signature. The `InvokeAsync` method can accept additional parameters that are populated by DI:

[language="csharp" source="\~/fundamentals/middleware/write/6sample/WebMiddleware/MyCustomMiddleware.cs"::: (complete source file; reference: \~/fundamentals/middleware/write/6sample/WebMiddleware/MyCustomMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/MyCustomMiddleware.cs.md)

[Lifetime and registration options](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23lifetime-and-registration-options) contains a complete sample of middleware with *scoped* lifetime services.

The following code is used to test the preceding middleware:

[language="csharp" source="\~/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs" id="snippet_3" highlight="4,10"::: (complete source file; reference: \~/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/Program.cs.md)

The `IMessageWriter` interface and implementation:

[language="csharp" source="\~/fundamentals/middleware/write/6sample/WebMiddleware/IMessageWriter.cs"::: (complete source file; reference: \~/fundamentals/middleware/write/6sample/WebMiddleware/IMessageWriter.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/IMessageWriter.cs.md)

## Additional resources

* [Sample code used in this article](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/middleware/write/6sample)
* [UseExtensions source on GitHub](https://github.com/dotnet/aspnetcore/blob/main/src/Http/Http.Abstractions/src/Extensions/UseExtensions.cs)
* [Lifetime and registration options](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23lifetime-and-registration-options) contains a complete sample of middleware with *scoped*, *transient*, and *singleton* lifetime services.
* [DEEP DIVE: HOW IS THE ASP.NET CORE MIDDLEWARE PIPELINE BUILT](https://www.stevejgordon.co.uk/how-is-the-asp-net-core-middleware-pipeline-built)
* [fundamentals/middleware/index](index.md)
* [test/middleware](../../test/middleware.md)
* [migration/fx-to-core/areas/http-modules](../../migration/fx-to-core/areas/http-modules.md)
* [fundamentals/startup](../startup.md)
* [fundamentals/request-features](../request-features.md)
* [fundamentals/middleware/extensibility](extensibility.md)
* [fundamentals/middleware/extensibility-third-party-container](extensibility-third-party-container.md)



**Applies to: < aspnetcore-6.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Steve Smith](https://ardalis.com/)

Middleware is software that's assembled into an app pipeline to handle requests and responses. ASP.NET Core provides a rich set of built-in middleware components, but in some scenarios you might want to write a custom middleware.

> **Note:**
> This topic describes how to write *convention-based* middleware. For an approach that uses strong typing and per-request activation, see [fundamentals/middleware/extensibility](extensibility.md).

## Middleware class

Middleware is generally encapsulated in a class and exposed with an extension method. Consider the following middleware, which sets the culture for the current request from a query string:

[language="csharp" source="write/snapshot/StartupCulture.cs"::: (complete source file; reference: write/snapshot/StartupCulture.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/snapshot/StartupCulture.cs.md)

The preceding sample code is used to demonstrate creating a middleware component. For ASP.NET Core's built-in localization support, see [fundamentals/localization](../localization.md).

Test the middleware by passing in the culture. For example, request `https://localhost:5001/?culture=no`.

The following code moves the middleware delegate to a class:

[language="csharp" source="write/snapshot/RequestCultureMiddleware.cs"::: (complete source file; reference: write/snapshot/RequestCultureMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/snapshot/RequestCultureMiddleware.cs.md)

The middleware class must include:

* A public constructor with a parameter of type [Microsoft.AspNetCore.Http.RequestDelegate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.RequestDelegate).
* A public method named `Invoke` or `InvokeAsync`. This method must:
  * Return a `Task`.
  * Accept a first parameter of type [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext).
  
Additional parameters for the constructor and `Invoke`/`InvokeAsync` are populated by [dependency injection (DI)](../dependency-injection.md).

## Middleware dependencies

Middleware should follow the [Explicit Dependencies Principle](https://learn.microsoft.com/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#explicit-dependencies) by exposing its dependencies in its constructor. Middleware is constructed once per *application lifetime*. See the [Per-request middleware dependencies](#per-request-middleware-dependencies) section if you need to share services with middleware within a request.

Middleware components can resolve their dependencies from [dependency injection (DI)](../dependency-injection.md) through constructor parameters. [Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A) can also accept additional parameters directly.

## Per-request middleware dependencies

Because middleware is constructed at app startup, not per-request, *scoped* lifetime services used by middleware constructors aren't shared with other dependency-injected types during each request. If you must share a *scoped* service between your middleware and other types, add these services to the `InvokeAsync` method's signature. The `InvokeAsync` method can accept additional parameters that are populated by DI:

```csharp
public class CustomMiddleware
{
    private readonly RequestDelegate _next;

    public CustomMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // IMyScopedService is injected into InvokeAsync
    public async Task InvokeAsync(HttpContext httpContext, IMyScopedService svc)
    {
        svc.MyProperty = 1000;
        await _next(httpContext);
    }
}
```

[Lifetime and registration options](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23lifetime-and-registration-options) contains a complete sample of middleware with *scoped* lifetime services.

## Middleware extension method

The following extension method exposes the middleware through [Microsoft.AspNetCore.Builder.IApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IApplicationBuilder):

[language="csharp" source="write/snapshot/RequestCultureMiddlewareExtensions.cs"::: (complete source file; reference: write/snapshot/RequestCultureMiddlewareExtensions.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/snapshot/RequestCultureMiddlewareExtensions.cs.md)

The following code calls the middleware from `Startup.Configure`:

[language="csharp" source="write/snapshot/Startup.cs" highlight="5"::: (complete source file; reference: write/snapshot/Startup.cs)](../../../_code/aspnetcore/fundamentals/middleware/write/snapshot/Startup.cs.md)

## Additional resources

* [Lifetime and registration options](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23lifetime-and-registration-options) contains a complete sample of middleware with *scoped*, *transient*, and *singleton* lifetime services.
* [fundamentals/middleware/index](index.md)
* [test/middleware](../../test/middleware.md)
* [migration/fx-to-core/areas/http-modules](../../migration/fx-to-core/areas/http-modules.md)
* [fundamentals/startup](../startup.md)
* [fundamentals/request-features](../request-features.md)
* [fundamentals/middleware/extensibility](extensibility.md)
* [fundamentals/middleware/extensibility-third-party-container](extensibility-third-party-container.md)
