---
title: Factory-based middleware activation in ASP.NET Core
author: tdykstra
description: Learn how to use strongly-typed middleware with a factory-based activation implementation in ASP.NET Core.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 03/25/2022
uid: fundamentals/middleware/extensibility
---
# Factory-based middleware activation in ASP.NET Core

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

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory)/[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) is an extensibility point for [middleware](index.md) activation that offers the following benefits:

* Activation per client request (injection of scoped services)
* Strong typing of middleware

[Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A) extension methods check if a middleware's registered type implements [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware). If it does, the [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) instance registered in the container is used to resolve the [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) implementation instead of using the convention-based middleware activation logic. The middleware is registered as a [scoped or transient service](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes) in the app's service container.

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) is activated per client request (connection), so scoped services can be injected into the middleware's constructor.

## IMiddleware

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) defines middleware for the app's request pipeline. The [InvokeAsync(HttpContext, RequestDelegate)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware.InvokeAsync%252A) method handles requests and returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that represents the execution of the middleware.

Middleware activated by convention:

[language="csharp" source="extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs" id="snippet_Class"::: (complete source file; reference: extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs.md)

Middleware activated by [Microsoft.AspNetCore.Http.MiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.MiddlewareFactory):

[language="csharp" source="extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs" id="snippet_Class"::: (complete source file; reference: extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs.md)

Extensions are created for the middleware:

[language="csharp" source="extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs" id="snippet_Class"::: (complete source file; reference: extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs.md)

It isn't possible to pass objects to the factory-activated middleware with [Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A):

```csharp
public static IApplicationBuilder UseFactoryActivatedMiddleware(
    this IApplicationBuilder app, bool option)
{
    // Passing 'option' as an argument throws a NotSupportedException at runtime.
    return app.UseMiddleware<FactoryActivatedMiddleware>(option);
}
```

The factory-activated middleware is added to the built-in container in `Program.cs`:

[language="csharp" source="extensibility/samples/6.x/MiddlewareExtensibilitySample/Program.cs" id="snippet_Services" highlight="6"::: (complete source file; reference: extensibility/samples/6.x/MiddlewareExtensibilitySample/Program.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Program.cs.md)

Both middleware are registered in the request processing pipeline, also in `Program.cs`:

[language="csharp" source="extensibility/samples/6.x/MiddlewareExtensibilitySample/Program.cs" id="snippet_Middleware" highlight="3-4"::: (complete source file; reference: extensibility/samples/6.x/MiddlewareExtensibilitySample/Program.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Program.cs.md)

## IMiddlewareFactory

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) provides methods to create middleware. The middleware factory implementation is registered in the container as a scoped service.

The default [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) implementation, [Microsoft.AspNetCore.Http.MiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.MiddlewareFactory), is found in the [Microsoft.AspNetCore.Http](https://www.nuget.org/packages/Microsoft.AspNetCore.Http/) package.

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/middleware/extensibility/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [fundamentals/middleware/index](index.md)
* [fundamentals/middleware/extensibility-third-party-container](extensibility-third-party-container.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory)/[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) is an extensibility point for [middleware](index.md) activation.

[Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A) extension methods check if a middleware's registered type implements [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware). If it does, the [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) instance registered in the container is used to resolve the [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) implementation instead of using the convention-based middleware activation logic. The middleware is registered as a [scoped or transient service](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes) in the app's service container.

Benefits:

* Activation per client request (injection of scoped services)
* Strong typing of middleware

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) is activated per client request (connection), so scoped services can be injected into the middleware's constructor.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/middleware/extensibility/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## IMiddleware

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) defines middleware for the app's request pipeline. The [InvokeAsync(HttpContext, RequestDelegate)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware.InvokeAsync%252A) method handles requests and returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that represents the execution of the middleware.

Middleware activated by convention:

[language="csharp" source="extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs" id="snippet1"::: (complete source file; reference: extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs.md)

Middleware activated by [Microsoft.AspNetCore.Http.MiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.MiddlewareFactory):

[language="csharp" source="extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs" id="snippet1"::: (complete source file; reference: extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs.md)

Extensions are created for the middleware:

[language="csharp" source="extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs" id="snippet1"::: (complete source file; reference: extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/3.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs.md)

It isn't possible to pass objects to the factory-activated middleware with [Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A):

```csharp
public static IApplicationBuilder UseFactoryActivatedMiddleware(
    this IApplicationBuilder builder, bool option)
{
    // Passing 'option' as an argument throws a NotSupportedException at runtime.
    return builder.UseMiddleware<FactoryActivatedMiddleware>(option);
}
```

The factory-activated middleware is added to the built-in container in `Startup.ConfigureServices`:

[language="csharp" source="extensibility/samples/3.x/MiddlewareExtensibilitySample/Startup.cs" id="snippet1" highlight="6"::: (complete source file; reference: extensibility/samples/3.x/MiddlewareExtensibilitySample/Startup.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/3.x/MiddlewareExtensibilitySample/Startup.cs.md)

Both middleware are registered in the request processing pipeline in `Startup.Configure`:

[language="csharp" source="extensibility/samples/3.x/MiddlewareExtensibilitySample/Startup.cs" id="snippet2" highlight="12-13"::: (complete source file; reference: extensibility/samples/3.x/MiddlewareExtensibilitySample/Startup.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/3.x/MiddlewareExtensibilitySample/Startup.cs.md)

## IMiddlewareFactory

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) provides methods to create middleware. The middleware factory implementation is registered in the container as a scoped service.

The default [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) implementation, [Microsoft.AspNetCore.Http.MiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.MiddlewareFactory), is found in the [Microsoft.AspNetCore.Http](https://www.nuget.org/packages/Microsoft.AspNetCore.Http/) package.

## Additional resources

* [fundamentals/middleware/index](index.md)
* [fundamentals/middleware/extensibility-third-party-container](extensibility-third-party-container.md)



**Applies to: < aspnetcore-3.0**

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory)/[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) is an extensibility point for [middleware](index.md) activation.

[Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A) extension methods check if a middleware's registered type implements [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware). If it does, the [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) instance registered in the container is used to resolve the [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) implementation instead of using the convention-based middleware activation logic. The middleware is registered as a [scoped or transient service](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes) in the app's service container.

Benefits:

* Activation per client request (injection of scoped services)
* Strong typing of middleware

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) is activated per client request (connection), so scoped services can be injected into the middleware's constructor.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/middleware/extensibility/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## IMiddleware

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) defines middleware for the app's request pipeline. The [InvokeAsync(HttpContext, RequestDelegate)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware.InvokeAsync%252A) method handles requests and returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that represents the execution of the middleware.

Middleware activated by convention:

[language="csharp" source="extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs" id="snippet1"::: (complete source file; reference: extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/ConventionalMiddleware.cs.md)

Middleware activated by [Microsoft.AspNetCore.Http.MiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.MiddlewareFactory):

[language="csharp" source="extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs" id="snippet1"::: (complete source file; reference: extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs.md)

Extensions are created for the middleware:

[language="csharp" source="extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs" id="snippet1"::: (complete source file; reference: extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/2.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs.md)

It isn't possible to pass objects to the factory-activated middleware with [Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware%252A):

```csharp
public static IApplicationBuilder UseFactoryActivatedMiddleware(
    this IApplicationBuilder builder, bool option)
{
    // Passing 'option' as an argument throws a NotSupportedException at runtime.
    return builder.UseMiddleware<FactoryActivatedMiddleware>(option);
}
```

The factory-activated middleware is added to the built-in container in `Startup.ConfigureServices`:

[language="csharp" source="extensibility/samples/2.x/MiddlewareExtensibilitySample/Startup.cs" id="snippet1" highlight="6"::: (complete source file; reference: extensibility/samples/2.x/MiddlewareExtensibilitySample/Startup.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/2.x/MiddlewareExtensibilitySample/Startup.cs.md)

Both middleware are registered in the request processing pipeline in `Startup.Configure`:

[language="csharp" source="extensibility/samples/2.x/MiddlewareExtensibilitySample/Startup.cs" id="snippet2" highlight="13-14"::: (complete source file; reference: extensibility/samples/2.x/MiddlewareExtensibilitySample/Startup.cs)](../../../_code/aspnetcore/fundamentals/middleware/extensibility/samples/2.x/MiddlewareExtensibilitySample/Startup.cs.md)

## IMiddlewareFactory

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) provides methods to create middleware. The middleware factory implementation is registered in the container as a scoped service.

The default [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) implementation, [Microsoft.AspNetCore.Http.MiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.MiddlewareFactory), is found in the [Microsoft.AspNetCore.Http](https://www.nuget.org/packages/Microsoft.AspNetCore.Http/) package.

## Additional resources

* [fundamentals/middleware/index](index.md)
* [fundamentals/middleware/extensibility-third-party-container](extensibility-third-party-container.md)
