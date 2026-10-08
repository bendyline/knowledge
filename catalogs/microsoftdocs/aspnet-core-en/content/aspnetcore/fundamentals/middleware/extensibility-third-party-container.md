---
title: Middleware activation with a third-party container in ASP.NET Core
author: tdykstra
description: Learn how to use strongly-typed middleware with factory-based activation and a third-party container in ASP.NET Core.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 09/22/2019
uid: fundamentals/middleware/extensibility-third-party-container
---
# Middleware activation with a third-party container in ASP.NET Core

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


**Applies to: \>= aspnetcore-3.0**

This article demonstrates how to use [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) and [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) as an extensibility point for [middleware](index.md) activation with a third-party container. For introductory information on `IMiddlewareFactory` and `IMiddleware`, see [fundamentals/middleware/extensibility](extensibility.md).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

The sample app demonstrates middleware activation by an `IMiddlewareFactory` implementation, `SimpleInjectorMiddlewareFactory`. The sample uses the [Simple Injector](https://simpleinjector.org) dependency injection (DI) container.

The sample's middleware implementation records the value provided by a query string parameter (`key`). The middleware uses an injected database context (a scoped service) to record the query string value in an in-memory database.

> **Note:**
> The sample app uses [Simple Injector](https://github.com/simpleinjector/SimpleInjector) purely for demonstration purposes. Use of Simple Injector isn't an endorsement. Middleware activation approaches described in the Simple Injector documentation and GitHub issues are recommended by the maintainers of Simple Injector. For more information, see the [Simple Injector documentation](https://simpleinjector.readthedocs.io/en/latest/index.html) and [Simple Injector GitHub repository](https://github.com/simpleinjector/SimpleInjector).

## IMiddlewareFactory

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) provides methods to create middleware.

In the sample app, a middleware factory is implemented to create a `SimpleInjectorActivatedMiddleware` instance. The middleware factory uses the Simple Injector container to resolve the middleware:

[Code example (complete source file; reference: extensibility-third-party-container/samples/3.x/SampleApp/Middleware/SimpleInjectorMiddlewareFactory.cs?name=snippet1\&highlight=5-8,12)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/3.x/SampleApp/Middleware/SimpleInjectorMiddlewareFactory.cs.md)

## IMiddleware

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) defines middleware for the app's request pipeline.

Middleware activated by an `IMiddlewareFactory` implementation (`Middleware/SimpleInjectorActivatedMiddleware.cs`):

[Code example (complete source file; reference: extensibility-third-party-container/samples/3.x/SampleApp/Middleware/SimpleInjectorActivatedMiddleware.cs?name=snippet1)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/3.x/SampleApp/Middleware/SimpleInjectorActivatedMiddleware.cs.md)

An extension is created for the middleware (`Middleware/MiddlewareExtensions.cs`):

[Code example (complete source file; reference: extensibility-third-party-container/samples/3.x/SampleApp/Middleware/MiddlewareExtensions.cs?name=snippet1)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/3.x/SampleApp/Middleware/MiddlewareExtensions.cs.md)

`Startup.ConfigureServices` must perform several tasks:

* Set up the Simple Injector container.
* Register the factory and middleware.
* Make the app's database context available from the Simple Injector container.

[Code example (complete source file; reference: extensibility-third-party-container/samples/3.x/SampleApp/Startup.cs?name=snippet1)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/3.x/SampleApp/Startup.cs.md)

The middleware is registered in the request processing pipeline in `Startup.Configure`:

[Code example (complete source file; reference: extensibility-third-party-container/samples/3.x/SampleApp/Startup.cs?name=snippet2\&highlight=12)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/3.x/SampleApp/Startup.cs.md)



**Applies to: < aspnetcore-3.0**

This article demonstrates how to use [Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) and [Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) as an extensibility point for [middleware](index.md) activation with a third-party container. For introductory information on `IMiddlewareFactory` and `IMiddleware`, see [fundamentals/middleware/extensibility](extensibility.md).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

The sample app demonstrates middleware activation by an `IMiddlewareFactory` implementation, `SimpleInjectorMiddlewareFactory`. The sample uses the [Simple Injector](https://simpleinjector.org) dependency injection (DI) container.

The sample's middleware implementation records the value provided by a query string parameter (`key`). The middleware uses an injected database context (a scoped service) to record the query string value in an in-memory database.

> **Note:**
> The sample app uses [Simple Injector](https://github.com/simpleinjector/SimpleInjector) purely for demonstration purposes. Use of Simple Injector isn't an endorsement. Middleware activation approaches described in the Simple Injector documentation and GitHub issues are recommended by the maintainers of Simple Injector. For more information, see the [Simple Injector documentation](https://simpleinjector.readthedocs.io/en/latest/index.html) and [Simple Injector GitHub repository](https://github.com/simpleinjector/SimpleInjector).

## IMiddlewareFactory

[Microsoft.AspNetCore.Http.IMiddlewareFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddlewareFactory) provides methods to create middleware.

In the sample app, a middleware factory is implemented to create a `SimpleInjectorActivatedMiddleware` instance. The middleware factory uses the Simple Injector container to resolve the middleware:

[Code example (complete source file; reference: extensibility-third-party-container/samples/2.x/SampleApp/Middleware/SimpleInjectorMiddlewareFactory.cs?name=snippet1\&highlight=5-8,12)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/2.x/SampleApp/Middleware/SimpleInjectorMiddlewareFactory.cs.md)

## IMiddleware

[Microsoft.AspNetCore.Http.IMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IMiddleware) defines middleware for the app's request pipeline.

Middleware activated by an `IMiddlewareFactory` implementation (`Middleware/SimpleInjectorActivatedMiddleware.cs`):

[Code example (complete source file; reference: extensibility-third-party-container/samples/2.x/SampleApp/Middleware/SimpleInjectorActivatedMiddleware.cs?name=snippet1)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/2.x/SampleApp/Middleware/SimpleInjectorActivatedMiddleware.cs.md)

An extension is created for the middleware (`Middleware/MiddlewareExtensions.cs`):

[Code example (complete source file; reference: extensibility-third-party-container/samples/2.x/SampleApp/Middleware/MiddlewareExtensions.cs?name=snippet1)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/2.x/SampleApp/Middleware/MiddlewareExtensions.cs.md)

`Startup.ConfigureServices` must perform several tasks:

* Set up the Simple Injector container.
* Register the factory and middleware.
* Make the app's database context available from the Simple Injector container.

[Code example (complete source file; reference: extensibility-third-party-container/samples/2.x/SampleApp/Startup.cs?name=snippet1)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/2.x/SampleApp/Startup.cs.md)

The middleware is registered in the request processing pipeline in `Startup.Configure`:

[Code example (complete source file; reference: extensibility-third-party-container/samples/2.x/SampleApp/Startup.cs?name=snippet2\&highlight=12)](../../../_code/aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/2.x/SampleApp/Startup.cs.md)



## Additional resources

* [Middleware](index.md)
* [Factory-based middleware activation](extensibility.md)
* [Simple Injector GitHub repository](https://github.com/simpleinjector/SimpleInjector)
* [Simple Injector documentation](https://simpleinjector.readthedocs.io/en/latest/index.html)
