---
title: Migrate ASP.NET Framework HttpContext to ASP.NET Core
description: Learn how to migrate from System.Web.HttpContext to Microsoft.AspNetCore.Http.HttpContext
author: twsouthwick
ms.author: wpickett
ms.date: 07/17/2025
ms.reviewer: tasou
uid: migration/fx-to-core/areas/http-context
---
# Migrate ASP.NET Framework HttpContext to ASP.NET Core

HttpContext is a fundamental component of web applications, providing access to HTTP request and response information. When migrating from ASP.NET Framework to ASP.NET Core, HttpContext presents unique challenges because the two frameworks have different APIs and approaches.

## Why HttpContext migration is complex

ASP.NET Framework and ASP.NET Core have fundamentally different HttpContext implementations:

* **ASP.NET Framework** uses [System.Web.HttpContext](https://learn.microsoft.com/search/?terms=System.Web.HttpContext) with built-in properties and methods
* **ASP.NET Core** uses [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) with a more modular, extensible design

These differences mean you can't simply move your HttpContext code from Framework to Core without changes.

## Migration strategies overview

You have two main approaches for handling HttpContext during migration:

1. **Complete rewrite** - Rewrite all HttpContext code to use ASP.NET Core's native HttpContext implementation
2. **System.Web adapters** - Use adapters to minimize code changes while migrating incrementally

For most applications, migrating to ASP.NET Core's native HttpContext provides the best performance and maintainability. However, larger applications or those with extensive HttpContext usage may benefit from using System.Web adapters during incremental migration.

## Choose your migration approach

You have two main options for migrating HttpContext from ASP.NET Framework to ASP.NET Core. Your choice depends on your migration timeline, whether you need to run both applications simultaneously, and how much code you're willing to rewrite.

### Quick decision guide

**Answer these questions to choose your approach:**

1. **Are you doing a complete rewrite or incremental migration?**
   * Complete rewrite → [Complete rewrite to ASP.NET Core HttpContext](#complete-rewrite-to-aspnet-core-httpcontext)
   * Incremental migration → Continue to question 2

2. **Do you have extensive HttpContext usage across shared libraries?** 
   * Yes, lots of shared code → [System.Web adapters](#systemweb-adapters)
   * No, isolated HttpContext usage → [Complete rewrite to ASP.NET Core HttpContext](#complete-rewrite-to-aspnet-core-httpcontext)

### Migration approaches comparison

| Approach | Code Changes | Performance | Shared Libraries | When to Use |
| --- | --- | --- | --- | --- |
| **[Complete rewrite](#complete-rewrite-to-aspnet-core-httpcontext)** | High - Rewrite all HttpContext code | Best | Requires updates | Complete rewrites, performance-critical apps |
| **[System.Web adapters](#systemweb-adapters)** | Low - Keep existing patterns | Good | Works with existing code | Incremental migrations, extensive HttpContext usage |

## Important differences

### HttpContext lifetime

The adapters are backed by [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) which cannot be used past the lifetime of a request. Thus, [System.Web.HttpContext](https://learn.microsoft.com/search/?terms=System.Web.HttpContext) when run on ASP.NET Core cannot be used past a request as well, while on ASP.NET Framework it would work at times. An [System.ObjectDisposedException](https://learn.microsoft.com/search/?terms=System.ObjectDisposedException) will be thrown in cases where it is used past a request end.

**Recommendation**: Store the values needed into a POCO and hold onto that.

### Request threading considerations

> **Warning:**
> ASP.NET Core does not guarantee thread affinity for requests. If your code requires thread-safe access to `HttpContext`, you must ensure proper synchronization.

In ASP.NET Framework, a request had thread-affinity and [System.Web.HttpContext.Current](https://learn.microsoft.com/search/?terms=System.Web.HttpContext.Current) would only be available if on that thread. ASP.NET Core does not have this guarantee so [System.Web.HttpContext.Current](https://learn.microsoft.com/search/?terms=System.Web.HttpContext.Current) will be available within the same async context, but no guarantees about threads are made.

**Recommendation**: If reading/writing to the [System.Web.HttpContext](https://learn.microsoft.com/search/?terms=System.Web.HttpContext), you must ensure you are doing so in a single-threaded way. You can force a request to never run concurrently on any async context by setting the `ISingleThreadedRequestMetadata`. This will have performance implications and should only be used if you can't refactor usage to ensure non-concurrent access. There is an implementation available to add to controllers with `SingleThreadedRequestAttribute`:

```csharp
[SingleThreadedRequest]
public class SomeController : Controller
{
    ...
} 
```

### Request stream buffering

By default, the incoming request is not always seekable nor fully available. In order to get behavior seen in .NET Framework, you can opt into prebuffering the input stream. This will fully read the incoming stream and buffer it to memory or disk (depending on settings). 

**Recommendation**: This can be enabled by applying endpoint metadata that implements the `IPreBufferRequestStreamMetadata` interface. This is available as an attribute `PreBufferRequestStreamAttribute` that can be applied to controllers or methods.

To enable this on all MVC endpoints, there is an extension method that can be used as follows:

```cs
app.MapDefaultControllerRoute()
    .PreBufferRequestStream();
```

### Response stream buffering

Some APIs on [System.Web.HttpContext.Response](https://learn.microsoft.com/search/?terms=System.Web.HttpContext.Response) require that the output stream is buffered, such as [System.Web.HttpResponse.Output](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.Output), [System.Web.HttpResponse.End](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.End), [System.Web.HttpResponse.Clear](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.Clear), and [System.Web.HttpResponse.SuppressContent](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.SuppressContent).

**Recommendation**: In order to support behavior for [System.Web.HttpContext.Response](https://learn.microsoft.com/search/?terms=System.Web.HttpContext.Response) that requires buffering the response before sending, endpoints must opt-into it with endpoint metadata implementing `IBufferResponseStreamMetadata`.

To enable this on all MVC endpoints, there is an extension method that can be used as follows:

```cs
app.MapDefaultControllerRoute()
    .BufferResponseStream();
```

## Complete rewrite to ASP.NET Core HttpContext

Choose this approach when you're performing a complete migration and can rewrite HttpContext-related code to use ASP.NET Core's native implementation.

ASP.NET Core's HttpContext provides a more modular and extensible design compared to ASP.NET Framework. This approach offers the best performance but requires more code changes during migration.

### Overview

`HttpContext` has significantly changed in ASP.NET Core. When migrating HTTP modules or handlers to middleware, you'll need to update your code to work with the new `HttpContext` API.

In ASP.NET Core middleware, the `Invoke` method takes a parameter of type `HttpContext`:

```csharp
public async Task Invoke(HttpContext context)
```

This `HttpContext` is different from the ASP.NET Framework version and requires different approaches to access request and response information.

### Property translations

This section shows how to translate the most commonly used properties of [System.Web.HttpContext](https://learn.microsoft.com/search/?terms=System.Web.HttpContext) to the equivalent [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) in ASP.NET Core.

#### HttpContext properties

* **[System.Web.HttpContext.Items](https://learn.microsoft.com/search/?terms=System.Web.HttpContext.Items)** → **[Microsoft.AspNetCore.Http.HttpContext.Items](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Items)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Items)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* ***No equivalent*** → **[Microsoft.AspNetCore.Http.HttpContext.TraceIdentifier](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.TraceIdentifier)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Trace)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)
  
  Unique request ID for logging

#### HttpRequest properties

* **[System.Web.HttpRequest.HttpMethod](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.HttpMethod)** → **[Microsoft.AspNetCore.Http.HttpRequest.Method](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Method)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Method)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.QueryString](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.QueryString)** → **[Microsoft.AspNetCore.Http.HttpRequest.QueryString](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.QueryString)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Query)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.Url](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.Url)** / **[System.Web.HttpRequest.RawUrl](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.RawUrl)** → **Multiple properties**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Url)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)
  
  Use Request.Scheme, Host, PathBase, Path, QueryString

* **[System.Web.HttpRequest.IsSecureConnection](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.IsSecureConnection)** → **[Microsoft.AspNetCore.Http.HttpRequest.IsHttps](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.IsHttps)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Secure)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.UserHostAddress](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.UserHostAddress)** → **[Microsoft.AspNetCore.Http.ConnectionInfo.RemoteIpAddress](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ConnectionInfo.RemoteIpAddress)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Host)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.Cookies](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.Cookies)** → **[Microsoft.AspNetCore.Http.HttpRequest.Cookies](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Cookies)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Cookies)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.RequestContext](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.RequestContext)** → **[Microsoft.AspNetCore.Routing.RoutingHttpContextExtensions.GetRouteData*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.RoutingHttpContextExtensions.GetRouteData*)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Route)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.Headers)** → **[Microsoft.AspNetCore.Http.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Headers)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Headers)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.UserAgent](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.UserAgent)** → **[Microsoft.AspNetCore.Http.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Headers)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Agent)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.UrlReferrer](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.UrlReferrer)** → **[Microsoft.AspNetCore.Http.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Headers)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Referrer)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.ContentType](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.ContentType)** → **[Microsoft.AspNetCore.Http.HttpRequest.ContentType](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.ContentType)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Type)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpRequest.Form](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.Form)** → **[Microsoft.AspNetCore.Http.HttpRequest.Form](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Form)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Form)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)
  
  **Warning**: Read form values only if content type is *x-www-form-urlencoded* or *form-data*

* **[System.Web.HttpRequest.InputStream](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.InputStream)** → **[Microsoft.AspNetCore.Http.HttpRequest.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Body)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Input)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)
  
  **Warning**: Use only in handler middleware at end of pipeline. Body can only be read once per request

#### HttpResponse properties

* **[System.Web.HttpResponse.Status](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.Status)** / **[System.Web.HttpResponse.StatusDescription](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.StatusDescription)** → **[Microsoft.AspNetCore.Http.HttpResponse.StatusCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.StatusCode)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Status)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpResponse.ContentEncoding](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.ContentEncoding)** / **[System.Web.HttpResponse.ContentType](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.ContentType)** → **[Microsoft.AspNetCore.Http.HttpResponse.ContentType](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.ContentType)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_RespType)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpResponse.ContentType](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.ContentType)** → **[Microsoft.AspNetCore.Http.HttpResponse.ContentType](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.ContentType)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_RespTypeOnly)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpResponse.Output](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.Output)** → **[Microsoft.AspNetCore.Http.HttpResponseWritingExtensions.WriteAsync*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseWritingExtensions.WriteAsync*)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_Output)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)

* **[System.Web.HttpResponse.TransmitFile*](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.TransmitFile*)** → **See request features**
  
  Serving files is discussed in [fundamentals/request-features](../../../fundamentals/request-features.md)

* **[System.Web.HttpResponse.Headers](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.Headers)** → **[Microsoft.AspNetCore.Http.HttpResponse.OnStarting*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.OnStarting*)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_SetHeaders)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)
  
  Must use callback pattern to set headers before response starts

* **[System.Web.HttpResponse.Cookies](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.Cookies)** → **[Microsoft.AspNetCore.Http.HttpResponse.OnStarting*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.OnStarting*)**
  
  [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs?name=snippet_SetCookies)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/HttpContextDemoMiddleware.cs.md)
  
  Must use callback pattern to set cookies before response starts

* Setting response headers:
    
    ```csharp
    public async Task Invoke(HttpContext httpContext)
    {
        // Set callback to execute before response starts
        httpContext.Response.OnStarting(SetHeaders, state: httpContext);
        // ... rest of middleware logic
    }
    ```

* Setting response cookies:

```csharp
public async Task Invoke(HttpContext httpContext)
{
    // Set callbacks to execute before response starts
    httpContext.Response.OnStarting(SetCookies, state: httpContext);
    httpContext.Response.OnStarting(SetHeaders, state: httpContext);
    // ... rest of middleware logic
}
```

## System.Web adapters

> **Note:**
> This makes use of the [System.Web Adapters](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/migration/fx-to-core/includes/~/migration/fx-to-core/inc/systemweb-adapters.md) to simplify migration.


Choose this approach when you have extensive HttpContext usage across shared libraries or when performing an incremental migration where you want to minimize code changes.

The [System.Web adapters](../inc/systemweb-adapters.md) provide a compatibility layer that allows you to use familiar [System.Web.HttpContext](https://learn.microsoft.com/search/?terms=System.Web.HttpContext) APIs in ASP.NET Core applications. This approach is particularly useful when:

* You have shared libraries that use [System.Web.HttpContext](https://learn.microsoft.com/search/?terms=System.Web.HttpContext)
* You're performing an incremental migration
* You want to minimize code changes during the migration process

### Benefits of using System.Web adapters

* **Minimal code changes**: Keep your existing `System.Web.HttpContext` usage patterns
* **Shared libraries**: Libraries can work with both ASP.NET Framework and ASP.NET Core
* **Incremental migration**: Migrate applications piece by piece without breaking shared dependencies
* **Faster migration**: Reduce the time needed to migrate complex applications

### Considerations

* **Performance**: While good, adapters introduce some overhead compared to native ASP.NET Core APIs
* **Feature parity**: Not all [System.Web.HttpContext](https://learn.microsoft.com/search/?terms=System.Web.HttpContext) features are available through adapters
* **Long-term strategy**: Consider eventually migrating to native ASP.NET Core APIs for best performance

For more information about System.Web adapters, see the [System.Web adapters documentation](../inc/systemweb-adapters.md).

## Additional resources

* [HTTP Handlers and HTTP Modules Overview](https://learn.microsoft.com/iis/configuration/system.webserver/)
* [HttpContext in ASP.NET Core](../../../fundamentals/http-context.md)
* [Middleware](../../../fundamentals/middleware/index.md)
* [Configuration](../../../fundamentals/configuration/index.md)
* [System.Web adapters](../inc/systemweb-adapters.md)
