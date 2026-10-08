---
title: Filter methods for Razor Pages in ASP.NET Core
author: tdykstra
description: Learn how to create filter methods for Razor Pages in ASP.NET Core.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 2/18/2020
uid: razor-pages/filter
---
# Filter methods for Razor Pages in ASP.NET Core

**Applies to: \>= aspnetcore-3.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT)

Razor Page filters [Microsoft.AspNetCore.Mvc.Filters.IPageFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter) and [Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter) allow Razor Pages to run code before and after a Razor Page handler is run. Razor Page filters are similar to [ASP.NET Core MVC action filters](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23action-filters), except they can't be applied to individual page handler methods.

Razor Page filters:

* Run code after a handler method has been selected, but before model binding occurs.
* Run code before the handler method executes, after model binding is complete.
* Run code after the handler method executes.
* Can be implemented on a page or globally.
* Cannot be applied to specific page handler methods.
* Can have constructor dependencies populated by [Dependency Injection](../fundamentals/dependency-injection.md) (DI). For more information, see [ServiceFilterAttribute](../mvc/controllers/filters.md#servicefilterattribute) and [TypeFilterAttribute](../mvc/controllers/filters.md#typefilterattribute).

While page constructors and middleware enable executing custom code before a handler method executes, only Razor Page filters enable access to [Microsoft.AspNetCore.Mvc.RazorPages.PageModel.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel.HttpContext) and the page. Middleware has access to the `HttpContext`, but not to the "page context". Filters have a [Microsoft.AspNetCore.Mvc.Filters.FilterContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.FilterContext) derived parameter, which provides access to `HttpContext`. Here's a sample for a page filter: [Implement a filter attribute](#ifa) that adds a header to the response, something that can't be done with constructors or middleware. Access to the page context, which includes access to the instances of the page and it's model, are only available when executing filters, handlers, or the body of a Razor Page.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/razor-pages/filter/3.1sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

Razor Page filters provide the following methods, which can be applied globally or at the page level:

* Synchronous methods:

  * [Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerSelected%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerSelected%252A) : Called after a handler method has been selected, but before model binding occurs.
  * [Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuting%252A) : Called before the handler method executes, after model binding is complete.
  * [Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuted%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuted%252A) : Called after the handler method executes, before the action result.

* Asynchronous methods:

  * [Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerSelectionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerSelectionAsync%252A) : Called asynchronously after the handler method has been selected, but before model binding occurs.
  * [Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerExecutionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerExecutionAsync%252A) : Called asynchronously before the handler method is invoked, after model binding is complete.

Implement **either** the synchronous or the async version of a filter interface, **not** both. The framework checks first to see if the filter implements the async interface, and if so, it calls that. If not, it calls the synchronous interface's methods. If both interfaces are implemented, only the async methods are called. The same rule applies to overrides in pages, implement the synchronous or the async version of the override, not both.

## Implement Razor Page filters globally

The following code implements `IAsyncPageFilter`:

[Main (complete source file; reference: filter/3.1sample/PageFilter/Filters/SampleAsyncPageFilter.cs?name=snippet1)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/Filters/SampleAsyncPageFilter.cs.md)

In the preceding code, `ProcessUserAgent.Write` is user supplied code that works with the user agent string.

The following code enables the `SampleAsyncPageFilter` in the `Startup` class:

[Main (complete source file; reference: filter/3.1sample/PageFilter/Startup.cs?name=snippet2)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/Startup.cs.md)

The following code calls [Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderApplicationModelConvention*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderApplicationModelConvention*) to apply the `SampleAsyncPageFilter` to only pages in */Movies*:

[Main (complete source file; reference: filter/3.1sample/PageFilter/Startup2.cs?name=snippet2)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/Startup2.cs.md)

The following code implements the synchronous `IPageFilter`:

[Main (complete source file; reference: filter/3.1sample/PageFilter/Filters/SamplePageFilter.cs?name=snippet1)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/Filters/SamplePageFilter.cs.md)

The following code enables the `SamplePageFilter`:

[Main (complete source file; reference: filter/3.1sample/PageFilter/StartupSync.cs?name=snippet2)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/StartupSync.cs.md)

## Implement Razor Page filters by overriding filter methods

The following code overrides the asynchronous Razor Page filters:

[Main (complete source file; reference: filter/3.1sample/PageFilter/Pages/Index.cshtml.cs?name=snippet)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/Pages/Index.cshtml.cs.md)

<a name="ifa"></a>

## Implement a filter attribute

The built-in attribute-based filter [Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter.OnResultExecutionAsync*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter.OnResultExecutionAsync*) filter can be subclassed. The following filter adds a header to the response:

[Main (complete source file; reference: filter/3.1sample/PageFilter/Filters/AddHeaderAttribute.cs)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/Filters/AddHeaderAttribute.cs.md)

The following code applies the `AddHeader` attribute:

[Main (complete source file; reference: filter/3.1sample/PageFilter/Pages/Movies/Test.cshtml.cs)](../../_code/aspnetcore/razor-pages/filter/3.1sample/PageFilter/Pages/Movies/Test.cshtml.cs.md)

Use a tool such as the browser developer tools to examine the headers. Under **Response Headers**, `author: Rick` is displayed.

See [Overriding the default order](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23overriding-the-default-order) for instructions on overriding the order.

See [Cancellation and short circuiting](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23cancellation-and-short-circuiting) for instructions to short-circuit the filter pipeline from a filter.

<a name="auth"></a>

## Authorize filter attribute

The [Authorize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) attribute can be applied to a `PageModel`:

[Main (complete source file; reference: filter/sample/PageFilter/Pages/ModelWithAuthFilter.cshtml.cs?highlight=7)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Pages/ModelWithAuthFilter.cshtml.cs.md)



**Applies to: < aspnetcore-3.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT)

Razor Page filters [Microsoft.AspNetCore.Mvc.Filters.IPageFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter) and [Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter) allow Razor Pages to run code before and after a Razor Page handler is run. Razor Page filters are similar to [ASP.NET Core MVC action filters](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23action-filters), except they can't be applied to individual page handler methods.

Razor Page filters:

* Run code after a handler method has been selected, but before model binding occurs.
* Run code before the handler method executes, after model binding is complete.
* Run code after the handler method executes.
* Can be implemented on a page or globally.
* Cannot be applied to specific page handler methods.

Code can be run before a handler method executes using the page constructor or middleware, but only Razor Page filters have access to [Microsoft.AspNetCore.Mvc.RazorPages.PageModel.HttpContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel.HttpContext%252A). Filters have a [Microsoft.AspNetCore.Mvc.Filters.FilterContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.FilterContext) derived parameter, which provides access to `HttpContext`. For example, the [Implement a filter attribute](#ifa) sample adds a header to the response, something that can't be done with constructors or middleware.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/razor-pages/filter/sample/PageFilter) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

Razor Page filters provide the following methods, which can be applied globally or at the page level:

* Synchronous methods:

  * [Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerSelected%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerSelected%252A) : Called after a handler method has been selected, but before model binding occurs.
  * [Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuting%252A) : Called before the handler method executes, after model binding is complete.
  * [Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuted%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuted%252A) : Called after the handler method executes, before the action result.

* Asynchronous methods:

  * [Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerSelectionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerSelectionAsync%252A) : Called asynchronously after the handler method has been selected, but before model binding occurs.
  * [Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerExecutionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerExecutionAsync%252A) : Called asynchronously before the handler method is invoked, after model binding is complete.

> **Note:**
> Implement **either** the synchronous or the async version of a filter interface, not both. The framework checks first to see if the filter implements the async interface, and if so, it calls that. If not, it calls the synchronous interface's methods. If both interfaces are implemented, only the async methods are called. The same rule applies to overrides in pages, implement the synchronous or the async version of the override, not both.

## Implement Razor Page filters globally

The following code implements `IAsyncPageFilter`:

[Main (complete source file; reference: filter/sample/PageFilter/Filters/SampleAsyncPageFilter.cs?name=snippet1)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Filters/SampleAsyncPageFilter.cs.md)

In the preceding code, [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) is not required. It's used in the sample to provide trace information for the application.

The following code enables the `SampleAsyncPageFilter` in the `Startup` class:

[Main (complete source file; reference: filter/sample/PageFilter/Startup.cs?name=snippet2\&highlight=11)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Startup.cs.md)

The following code shows the complete `Startup` class:

[Main (complete source file; reference: filter/sample/PageFilter/Startup.cs?name=snippet1)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Startup.cs.md)

The following code calls `AddFolderApplicationModelConvention` to apply the `SampleAsyncPageFilter` to only pages in */subFolder*:

[Main (complete source file; reference: filter/sample/PageFilter/Startup2.cs?name=snippet2)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Startup2.cs.md)

The following code implements the synchronous `IPageFilter`:

[Main (complete source file; reference: filter/sample/PageFilter/Filters/SamplePageFilter.cs?name=snippet1)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Filters/SamplePageFilter.cs.md)

The following code enables the `SamplePageFilter`:

[Main (complete source file; reference: filter/sample/PageFilter/StartupSync.cs?name=snippet2\&highlight=11)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/StartupSync.cs.md)

## Implement Razor Page filters by overriding filter methods

The following code overrides the synchronous Razor Page filters:

[Main (complete source file; reference: filter/sample/PageFilter/Pages/Index.cshtml.cs)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Pages/Index.cshtml.cs.md)

<a name="ifa"></a>

## Implement a filter attribute

The built-in attribute-based filter [Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter.OnResultExecutionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter.OnResultExecutionAsync%252A) filter can be subclassed. The following filter adds a header to the response:

[Main (complete source file; reference: filter/sample/PageFilter/Filters/AddHeaderAttribute.cs)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Filters/AddHeaderAttribute.cs.md)

The following code applies the `AddHeader` attribute:

[Main (complete source file; reference: filter/sample/PageFilter/Pages/Contact.cshtml.cs?name=snippet1)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Pages/Contact.cshtml.cs.md)

See [Overriding the default order](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23overriding-the-default-order) for instructions on overriding the order.

See [Cancellation and short circuiting](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23cancellation-and-short-circuiting) for instructions to short-circuit the filter pipeline from a filter. 

<a name="auth"></a>

## Authorize filter attribute

The [Authorize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) attribute can be applied to a `PageModel`:

[Main (complete source file; reference: filter/sample/PageFilter/Pages/ModelWithAuthFilter.cshtml.cs?highlight=7)](../../_code/aspnetcore/razor-pages/filter/sample/PageFilter/Pages/ModelWithAuthFilter.cshtml.cs.md)
