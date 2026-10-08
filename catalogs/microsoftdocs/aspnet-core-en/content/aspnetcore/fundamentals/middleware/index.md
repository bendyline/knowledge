---
title: ASP.NET Core middleware
ai-usage: ai-assisted
author: tdykstra
description: ASP.NET Core middleware handles requests and responses through a configurable pipeline. Learn how to use Run, Map, and Use delegates, branch pipelines, and order middleware correctly.
monikerRange: '>= aspnetcore-3.0'
ms.author: tdykstra
ms.date: 08/19/2026
ms.reviewer: tdykstra
uid: fundamentals/middleware/index
---
# ASP.NET Core middleware

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


Middleware is software that's assembled into an app pipeline to handle requests and responses. Each middleware:

* Chooses whether to pass the request to the next middleware in the pipeline.
* Can perform work before and after the next middleware in the pipeline.

Request delegates are used to build the request pipeline. The request delegates handle each HTTP request.

Configure request delegates by using the [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A), [Microsoft.AspNetCore.Builder.MapExtensions.Map%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapExtensions.Map%252A), and [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A) extension methods. You can specify an individual request delegate inline as an anonymous method (called inline middleware) or define it in a reusable class. These inline anonymous methods or reusable classes are called *middleware* or *middleware components*. Each middleware in the request pipeline is responsible for invoking the next middleware in the pipeline or short-circuiting the pipeline. When a middleware short-circuits, it's called a *terminal middleware* because it prevents further middleware from processing the request.

For more information about the difference between request pipelines in ASP.NET Core and ASP.NET 4.x with additional middleware samples, see [migration/fx-to-core/areas/http-modules](../../migration/fx-to-core/areas/http-modules.md).

## Role of middleware by app type

Server-side Blazor, Razor Pages, and MVC process browser requests on the server with middleware. The guidance in this article applies to these types of apps.

Standalone Blazor WebAssembly apps run entirely on the client and don't process requests with a middleware pipeline. The guidance in this article doesn't apply to standalone Blazor WebAssembly apps.

## Middleware code analysis

For more information about ASP.NET Core's compiler platform analyzers that inspect app code for quality, see [diagnostics/code-analysis](../../diagnostics/code-analysis.md).

**Applies to: \>= aspnetcore-6.0**

## Create a middleware pipeline with `WebApplication`

The ASP.NET Core request pipeline consists of a sequence of request delegates, called one after the other. The following diagram demonstrates the concept. The thread of execution follows the black arrows.

Request processing pattern showing a request arriving, processing through three middlewares, and the response leaving the app. Each middleware runs its logic and hands off the request to the next middleware at the next() statement. After the third middleware processes the request, the request passes back through the prior two middlewares in reverse order for additional processing after their next() statements before leaving the app as a response to the client.

Each delegate can perform operations before and after the next delegate. Exception-handling delegates should be called early in the pipeline, so they can catch exceptions that occur in later stages of the pipeline.

> **Note:**
> To experiment locally with the code examples in this section, create an ASP.NET Core app using the **ASP.NET Core Empty** project template. If using the .NET CLI, the template short name is `web` (`dotnet new web`).

The simplest ASP.NET Core app calls [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) to set up a single terminal middleware as an anonymous function request delegate to handle requests without a request pipeline.

In the following example:

* The call to [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) is invoked on every request and writes "Hello world!" to the response.
* The call to [Microsoft.AspNetCore.Builder.WebApplication.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.Run%252A) at the end of the code block runs the app and blocks the calling thread until host shutdown.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello world!");
});

app.Run();
```

Response when accessing the app in a browser at its launch URL:

> Hello world!

Chain multiple request delegates together with [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A). The `next` parameter represents the next delegate in the pipeline. You can typically perform actions both before and after the `next` delegate.

The following example demonstrates:

* Two [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A) calls, each writing to the console:
  * Where work can be performed that can write to the response (`context.Response`, [Microsoft.AspNetCore.Http.HttpResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse)).
  * Where work can be performed that doesn't write to the response after the `next` parameter is invoked.
* A terminal request delegate with a call to [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) that writes "Hello world!" to the response.
* A final [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A) call, which never executes because it follows the [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) terminal request delegate.
* A call to [Microsoft.AspNetCore.Builder.WebApplication.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.Run%252A) at the end of the code block to run the app and block the calling thread until host shutdown.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =>
{
    Console.WriteLine("Work that can write to the response. (1)");
    await next.Invoke(context);
    Console.WriteLine("Work that doesn't write to the response. (1)");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("Work that can write to the response. (2)");
    await next.Invoke(context);
    Console.WriteLine("Work that doesn't write to the response. (2)");
});

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello world!");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("This statement isn't reached. (3)");
    await next.Invoke(context);
    Console.WriteLine("This statement isn't reached. (3)");
});

app.Run();
```

In the app's console window when the app is run:

<!-- DOC AUTHOR NOTE: Two spaces at the ends of the first three lines
                      for newlines in the rendered article. -->

> Work that can write to the response. (1)
> Work that can write to the response. (2)
> Work that doesn't write to the response. (2)
> Work that doesn't write to the response. (1)

*Short-circuiting* the request pipeline is often desirable because it avoids unnecessary work. For example, [static file middleware](../static-files.md) can act as a *terminal middleware* by processing a request for a static file and short-circuiting the rest of the pipeline. Middleware added to the pipeline before the terminal middleware still processes code after their `next.Invoke` statements. If you don't plan to call `next.Invoke` because your goal is to terminate the pipeline, use a [`Run` delegate](#run-delegate) instead of calling the [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A) extension method.

Don't call `next.Invoke` during or after the response is sent to the client. After an [Microsoft.AspNetCore.Http.HttpResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse) is started, changes result in an exception. For example, [setting headers or a response status code throw an exception](https://learn.microsoft.com/search/?terms=fundamentals%2Fbest-practices%23do-not-modify-the-status-code-or-headers-after-the-response-body-has-started) after the response starts. Writing to the response body after calling `next` may:

* Cause a protocol violation, such as writing more bytes to the response than the stated response's content length (`Content-Length` header value).
* Corrupt the body format, such as writing an HTML footer to a CSS file.

To determine if the response has started, check the value of [Microsoft.AspNetCore.Http.HttpResponse.HasStarted%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.HasStarted%252A).

For more information, see [Short-circuit middleware after routing](https://learn.microsoft.com/search/?terms=fundamentals%2Frouting%23short-circuit-middleware-after-routing).

## `Run` delegate

A [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) delegate doesn't receive a `next` parameter. The first `Run` delegate always terminates the pipeline. `Run` is also a convention, and some middleware might expose `Run` methods that execute at the end of the pipeline.

Any [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A) or [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) delegates after the first [Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) delegate aren't called.

## Branch the middleware pipeline

[Microsoft.AspNetCore.Builder.MapExtensions.Map%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapExtensions.Map%252A) extensions are used as a convention to branch the request processing pipeline. [Microsoft.AspNetCore.Builder.MapExtensions.Map%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapExtensions.Map%252A) branches the request pipeline based on matches of the given request path. If the request path starts with the given path, the branch executes.

In the following example, `HandleMap1` is called for requests to `/map1`, and `HandleMap2` is called for requests to `/map2`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/map1", HandleMap1);
app.Map("/map2", HandleMap2);

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate!");
});

app.Run();

private static void HandleMap1(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        await context.Response.WriteAsync("Map 1");
    });
}

private static void HandleMap2(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        await context.Response.WriteAsync("Map 2");
    });
}
```

The following table shows the requests and responses using the preceding code.

| Request | Response |
| --- | --- |
| `/` | Hello from the non-Map delegate. |
| `/map1` | Map 1 |
| `/map2` | Map 2 |
| `/map3` | Hello from the non-Map delegate. |

When [Microsoft.AspNetCore.Builder.MapExtensions.Map%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapExtensions.Map%252A) is used, the matched path segments are removed from [Microsoft.AspNetCore.Http.HttpRequest.Path%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Path%252A) and appended to [Microsoft.AspNetCore.Http.HttpRequest.PathBase%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.PathBase%252A) for each request.

[Microsoft.AspNetCore.Builder.MapExtensions.Map%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapExtensions.Map%252A) can match multiple segments at once:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/map1/segment1", HandleMultipleSegments);

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate.");
});

app.Run();

private static void HandleMultipleSegments(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        await context.Response.WriteAsync("Processing '/map1/segment1'");
    });
}
```

The following table shows the requests and responses using the preceding code.

| Request | Response |
| --- | --- |
| `/` | Hello from the non-Map delegate. |
| `/map1/segment1` | Processing '/map1/segment1' |

[Microsoft.AspNetCore.Builder.MapExtensions.Map%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapExtensions.Map%252A) supports nesting:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/level1", level1App => {
    level1App.Map("/level2a", level2AApp => {
        level2AApp.Run(async context =>
        {
            await context.Response.WriteAsync("Processing '/level1/level2a'");
        });
    });
    level1App.Map("/level2b", level2BApp => {
        level2BApp.Run(async context =>
        {
            await context.Response.WriteAsync("Processing '/level1/level2b'");
        });
    });
});

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate!");
});

app.Run();
```

The following table shows the requests and responses using the preceding code.

| Request | Response |
| --- | --- |
| `/` | Hello from the non-Map delegate. |
| `/level1/level2a` | Processing '/level1/level2a' |
| `/level1/level2b` | Processing '/level1/level2b' |

[Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen%252A) branches the request pipeline based on the result of the given predicate. Any predicate of type `Func<HttpContext, bool>` can be used to map requests to a new branch of the pipeline. In the following example, a predicate is used to detect the presence of a query string variable named "`branch`":

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapWhen(context => context.Request.Query.ContainsKey("branch"), HandleBranch);

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate.");
});

app.Run();

private static void HandleBranch(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        var branchVer = context.Request.Query["branch"];
        await context.Response.WriteAsync($"Branch used = '{branchVer}'");
    });
}
```

The following table shows the requests and responses using the preceding code.

| Request | Response |
| --- | --- |
| `/` | Hello from the non-Map delegate. |
| `/?branch=main` | Branch used = 'main' |

[Microsoft.AspNetCore.Builder.UseWhenExtensions.UseWhen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseWhenExtensions.UseWhen%252A) can branch the request pipeline based on the result of the given predicate. Unlike [Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen%252A), the branch is rejoined to the main pipeline if it doesn't contain a terminal middleware:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseWhen(context => context.Request.Query.ContainsKey("branch"),
    appBuilder => HandleBranchAndRejoin(appBuilder));

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate.");
});

app.Run();

void HandleBranchAndRejoin(IApplicationBuilder app)
{
    var logger = app.ApplicationServices.GetRequiredService<ILogger<Program>>(); 

    app.Use(async (context, next) =>
    {
        var branchVer = context.Request.Query["branch"];
        logger.LogInformation("Branch used = {branchVer}", branchVer.ToString());

        Console.WriteLine("Work that can write to the response.");
        await next.Invoke(context);
        Console.WriteLine("Work that doesn't write to the response.");
    });
}
```

In the preceding example, a response of "Hello from the non-Map delegate." is written for all requests. If the request includes a query string variable named "`branch`," its value is logged before the main pipeline is rejoined.



**Applies to: < aspnetcore-6.0**

## Create a middleware pipeline with `IApplicationBuilder`

The ASP.NET Core request pipeline consists of a sequence of request delegates, called one after the other. The following diagram demonstrates the concept. The thread of execution follows the black arrows.

Request processing pattern showing a request arriving, processing through three middlewares, and the response leaving the app. Each middleware runs its logic and hands off the request to the next middleware at the next() statement. After the third middleware processes the request, the request passes back through the prior two middlewares in reverse order for additional processing after their next() statements before leaving the app as a response to the client.

Each delegate can perform operations before and after the next delegate. Exception-handling delegates should be called early in the pipeline, so they can catch exceptions that occur in later stages of the pipeline.

The simplest possible ASP.NET Core app sets up a single request delegate that handles all requests. This case doesn't include an actual request pipeline. Instead, a single anonymous function is called in response to every HTTP request.

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        app.Run(async context =>
        {
            await context.Response.WriteAsync("Hello, World!");
        });
    }
}
```

Chain multiple request delegates together with [Microsoft.AspNetCore.Builder.UseExtensions.Use%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseExtensions.Use%252A). The `next` parameter represents the next delegate in the pipeline. You can short-circuit the pipeline by *not* calling the *next* parameter. You can typically perform actions both before and after the next delegate, as the following example demonstrates:

```csharp
app.Use(async (context, next) =>
{
    // Do work that doesn't write to the Response.
    await next.Invoke();
    // Do logging or other work that doesn't write to the Response.
});
```

When a delegate doesn't pass a request to the next delegate, it's called *short-circuiting the request pipeline*. Short-circuiting is often desirable because it avoids unnecessary work. For example, [static file middleware](../static-files.md) can act as a *terminal middleware* by processing a request for a static file and short-circuiting the rest of the pipeline. Middleware added to the pipeline before the middleware that terminates further processing still processes code after their `next.Invoke` statements. However, see the following warning about attempting to write to a response that has already been sent.

> **Warning:**
> Don't call `next.Invoke` after the response has been sent to the client. Changes to [Microsoft.AspNetCore.Http.HttpResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse) after the response has started throw an exception. For example, [setting headers and a status code throw an exception](https://learn.microsoft.com/search/?terms=fundamentals%2Fbest-practices%23do-not-modify-the-status-code-or-headers-after-the-response-body-has-started). Writing to the response body after calling `next`:
>
> * May cause a protocol violation. For example, writing more than the stated `Content-Length`.
> * May corrupt the body format. For example, writing an HTML footer to a CSS file.
>
> [Microsoft.AspNetCore.Http.HttpResponse.HasStarted%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse.HasStarted%252A) is a useful hint to indicate if headers have been sent or the body has been written to.

[Microsoft.AspNetCore.Builder.RunExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RunExtensions.Run%252A) delegates don't receive a `next` parameter. The first `Run` delegate is always terminal and terminates the pipeline. `Run` is a convention. Some middleware components may expose `Run[Middleware]` methods that run at the end of the pipeline:

```csharp
app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from 2nd delegate.");
});
```

In the preceding example, the `Run` delegate writes `"Hello from 2nd delegate."` to the response and then terminates the pipeline. If another `Use` or `Run` delegate is added after the `Run` delegate, it's not called.

## Branch the middleware pipeline

[Microsoft.AspNetCore.Builder.MapExtensions.Map%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapExtensions.Map%252A) extensions are used as a convention for branching the pipeline. `Map` branches the request pipeline based on matches of the given request path. If the request path starts with the given path, the branch executes.

```csharp
public class Startup
{
    private static void HandleMapTest1(IApplicationBuilder app)
    {
        app.Run(async context =>
        {
            await context.Response.WriteAsync("Map Test 1");
        });
    }

    private static void HandleMapTest2(IApplicationBuilder app)
    {
        app.Run(async context =>
        {
            await context.Response.WriteAsync("Map Test 2");
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        app.Map("/map1", HandleMapTest1);

        app.Map("/map2", HandleMapTest2);

        app.Run(async context =>
        {
            await context.Response.WriteAsync("Hello from non-Map delegate.");
        });
    }
}
```

The following table shows the requests and responses from `http://localhost:1234` using the previous code.

| Request | Response |
| --- | --- |
| localhost:1234 | Hello from non-Map delegate. |
| localhost:1234/map1 | Map Test 1 |
| localhost:1234/map2 | Map Test 2 |
| localhost:1234/map3 | Hello from non-Map delegate. |

When `Map` is used, the matched path segments are removed from `HttpRequest.Path` and appended to `HttpRequest.PathBase` for each request.

`Map` supports nesting, for example:

```csharp
app.Map("/level1", level1App => {
    level1App.Map("/level2a", level2AApp => {
        // "/level1/level2a" processing
    });
    level1App.Map("/level2b", level2BApp => {
        // "/level1/level2b" processing
    });
});
```

`Map` can also match multiple segments at once:

```csharp
public class Startup
{
    private static void HandleMultiSeg(IApplicationBuilder app)
    {
        app.Run(async context =>
        {
            await context.Response.WriteAsync("Map multiple segments.");
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        app.Map("/map1/seg1", HandleMultiSeg);

        app.Run(async context =>
        {
            await context.Response.WriteAsync("Hello from non-Map delegate.");
        });
    }
}
```

[Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen%252A) branches the request pipeline based on the result of the given predicate. You can use any predicate of type `Func<HttpContext, bool>` to map requests to a new branch of the pipeline. In the following example, a predicate detects the presence of a query string variable `branch`:

```csharp
public class Startup
{
    private static void HandleBranch(IApplicationBuilder app)
    {
        app.Run(async context =>
        {
            var branchVer = context.Request.Query["branch"];
            await context.Response.WriteAsync($"Branch used = {branchVer}");
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        app.MapWhen(context => context.Request.Query.ContainsKey("branch"),
                               HandleBranch);

        app.Run(async context =>
        {
            await context.Response.WriteAsync("Hello from non-Map delegate.");
        });
    }
}
```

The following table shows the requests and responses from `http://localhost:1234` using the previous code.

| Request | Response |
| --- | --- |
| localhost:1234 | Hello from non-Map delegate. |
| localhost:1234/?branch=main | Branch used = main |

[Microsoft.AspNetCore.Builder.UseWhenExtensions.UseWhen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.UseWhenExtensions.UseWhen%252A) also branches the request pipeline based on the result of the given predicate. Unlike with `MapWhen`, this branch is rejoined to the main pipeline if it doesn't short-circuit or contain a terminal middleware:

```csharp
public class Startup
{
    private void HandleBranchAndRejoin(IApplicationBuilder app, ILogger<Startup> logger)
    {
        app.Use(async (context, next) =>
        {
            var branchVer = context.Request.Query["branch"];
            logger.LogInformation("Branch used = {branchVer}", branchVer.ToString());

            // Do work that doesn't write to the Response.
            await next();
            // Do other work that doesn't write to the Response.
        });
    }

    public void Configure(IApplicationBuilder app, ILogger<Startup> logger)
    {
        app.UseWhen(context => context.Request.Query.ContainsKey("branch"),
                               appBuilder => HandleBranchAndRejoin(appBuilder, logger));

        app.Run(async context =>
        {
            await context.Response.WriteAsync("Hello from main pipeline.");
        });
    }
}
```

In the preceding example, a response of "Hello from main pipeline." is written for all requests. If the request includes a query string variable `branch`, its value is logged before the main pipeline is rejoined.



**Applies to: \>= aspnetcore-7.0**

## Middleware added automatically by `WebApplication`

**Applies to: \= aspnetcore-7.0**

[`WebApplication`](../minimal-apis/webapplication.md) automatically adds the following middleware in ASP.NET Core apps depending on certain conditions:
* [`UseDeveloperExceptionPage`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.diagnostics.developerexceptionpagemiddleware) is added first when the [`HostingEnvironment`](../environments.md) is `"Development"`.
* [`UseRouting`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.userouting) is added second if user code didn't already call `UseRouting` and if there are endpoints configured, for example `app.MapGet`.
* [`UseEndpoints`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.useendpoints) is added at the end of the middleware pipeline if any endpoints are configured.
* [`UseAuthentication`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authappbuilderextensions.useauthentication) is added immediately after `UseRouting` if user code didn't already call `UseAuthentication` and if [`IAuthenticationSchemeProvider`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.iauthenticationschemeprovider) can be detected in the service provider. `IAuthenticationSchemeProvider` is added by default when using [`AddAuthentication`](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.authenticationservicecollectionextensions.addauthentication), and services are detected using [`IServiceProviderIsService`](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.iserviceproviderisservice).
* [`UseAuthorization`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authorizationappbuilderextensions.useauthorization) is added next if user code didn't already call `UseAuthorization` and if [`IAuthorizationHandlerProvider`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authorization.iauthorizationhandlerprovider) can be detected in the service provider. `IAuthorizationHandlerProvider` is added by default when using [`AddAuthorization`](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.authenticationservicecollectionextensions.addauthentication), and services are detected using `IServiceProviderIsService`.
* User configured middleware and endpoints are added between `UseRouting` and `UseEndpoints`.

The following code is effectively what the automatic middleware being added to the app produces:

```csharp
if (isDevelopment)
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

if (isAuthenticationConfigured)
{
    app.UseAuthentication();
}

if (isAuthorizationConfigured)
{
    app.UseAuthorization();
}

// user middleware/endpoints
app.CustomMiddleware(...);
app.MapGet("/", () => "hello world");
// end user middleware/endpoints

app.UseEndpoints(e => {});
```

In some cases, the default middleware configuration isn't correct for the app and requires modification. For example, [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) should be called before [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A). The app needs to call `UseAuthentication` and `UseAuthorization` if `UseCors` is called:

```csharp
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

If middleware should be run before route matching occurs, [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) should be called and the middleware should be placed before the call to `UseRouting`. [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) isn't required in this case as it is automatically added as described previously:

```csharp
app.Use((context, next) =>
{
    return next(context);
});

app.UseRouting();

// other middleware and endpoints
```

When adding a terminal middleware:

* The middleware must be added after `UseEndpoints`.
* The app needs to call `UseRouting` and `UseEndpoints` so that the terminal middleware can be placed at the correct location.
```csharp
app.UseRouting();

app.MapGet("/", () => "hello world");

app.UseEndpoints(e => {});

app.Run(context =>
{
    context.Response.StatusCode = 404;
    return Task.CompletedTask;
});
```

Terminal middleware is middleware that runs if no endpoint handles the request.



**Applies to: \>= aspnetcore-8.0**

[WebApplication](../minimal-apis/webapplication.md) automatically adds the following middleware in ASP.NET Core apps depending on certain conditions:

* [UseDeveloperExceptionPage](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.diagnostics.developerexceptionpagemiddleware) is added first when the [HostingEnvironment](../environments.md) is `"Development"`.

* [UseRouting](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.userouting) is added second, if the user code didn't already call `UseRouting` and endpoints are configured, for example `app.MapGet`.

* [UseEndpoints](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.useendpoints) is added at the end of the middleware pipeline if endpoints are configured.

* [UseAuthentication](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authappbuilderextensions.useauthentication) is added immediately after `UseRouting`, if user code didn't already call `UseAuthentication` and if [IAuthenticationSchemeProvider](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.iauthenticationschemeprovider) can be detected in the service provider. `IAuthenticationSchemeProvider` is added by default when you use [AddAuthentication](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.authenticationservicecollectionextensions.addauthentication), and services are detected by using [IServiceProviderIsService](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.iserviceproviderisservice).

* [UseAuthorization](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authorizationappbuilderextensions.useauthorization) is added next, if user code didn't already call `UseAuthorization` and if [IAuthorizationHandlerProvider](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authorization.iauthorizationhandlerprovider) can be detected in the service provider. `IAuthorizationHandlerProvider` is added by default when you use [AddAuthorization](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.authenticationservicecollectionextensions.addauthentication), and services are detected by using `IServiceProviderIsService`.

* User configured middleware and endpoints are added between `UseRouting` and `UseEndpoints`.

The following code is effectively what the automatic middleware being added to the app produces:

```csharp
if (isDevelopment)
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

if (isAuthenticationConfigured)
{
    app.UseAuthentication();
}

if (isAuthorizationConfigured)
{
    app.UseAuthorization();
}

// User middleware/endpoints
app.CustomMiddleware(...);
app.MapGet("/", () => "hello world");
// End user middleware/endpoints

app.UseEndpoints(e => {});
```

In some cases, the default middleware configuration isn't correct for the app and requires modification. For example, [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) should be called before [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A). The app needs to call `UseAuthentication` and `UseAuthorization` if `UseCors` is called:

```csharp
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

If middleware should run before route matching occurs, [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) should be called and the middleware should be placed before the call to `UseRouting`. [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) isn't required in this case because it's automatically added as described earlier:

```csharp
app.Use((context, next) =>
{
    return next(context);
});

app.UseRouting();

// Other middleware and endpoints
```

When adding a terminal middleware:

* The middleware must be added after `UseEndpoints`.

* The app needs to call `UseRouting` and `UseEndpoints` so the terminal middleware can be placed at the correct location.

```csharp
app.UseRouting();

app.MapGet("/", () => "hello world");

app.UseEndpoints(e => {});

app.Run(context =>
{
    context.Response.StatusCode = 404;
    return Task.CompletedTask;
});
```

Terminal middleware is middleware that runs if no endpoint handles the request.

For information on antiforgery middleware in Minimal APIs, see [security/anti-request-forgery#afwma](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23afwma).






## Middleware order

**Applies to: \>= aspnetcore-8.0**

The order that middleware appears in the app's `Program` file defines the order in which middleware are invoked on a request with the reverse order for the response.

You have full control over the order of middleware and the ability to add custom middleware for request processing scenarios, keeping in mind that the order of middleware can be critical for security, performance, and functionality.

The following examples demonstrate middleware order for common app scenarios. Each middleware extension method is exposed on [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) through the [Microsoft.AspNetCore.Builder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder) namespace:

1. Exception and error handling
   * When the app runs in the `Development` environment:
     * Developer exception page middleware ([Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%252A)) reports app runtime errors.
     * Database error page middleware ([Microsoft.AspNetCore.Builder.DatabaseErrorPageExtensions.UseDatabaseErrorPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DatabaseErrorPageExtensions.UseDatabaseErrorPage%252A)) reports database runtime errors.
   * When the app runs in the `Production` environment:
     * Exception handler middleware ([Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A)) catches exceptions thrown in the following middlewares.
     * HTTP Strict Transport Security (HSTS) protocol middleware ([Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%252A)) adds the `Strict-Transport-Security` header.
1. HTTPS redirection middleware ([Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A)) redirects HTTP requests to HTTPS.
1. Static file middleware (if required, [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)) returns static files and short-circuits further request processing.
1. Cookie policy middleware ([Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A)) conforms the app to the EU General Data Protection Regulation (GDPR).
1. Routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) to route requests.
1. Authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)) attempts to authenticate the user before they're allowed access to secure resources.
1. Authorization middleware ([Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A)) authorizes a user to access secure resources.
1. Antiforgery middleware ([Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A)) adds antiforgery middleware to the pipeline [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) must be placed after calls to [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A).
1. Session middleware (Razor Pages and MVC only, [Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%252A)) establishes and maintains session state. If the app uses session state, call session middleware after cookie policy middleware and before Razor Pages/MVC middleware.
1. Endpoint routing middleware
  * [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) to add Razor component endpoints to the request pipeline.
  * [Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%252A) to add Razor Pages endpoints to the request pipeline.
  * [Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute%252A) to add controller endpoints to the request pipeline.


Typical Blazor Web App middleware pipeline:

```csharp
app.UseWebAssemblyDebugging(); // Development environment with client-side rendering
app.UseMigrationsEndPoint(); // Development environment with ASP.NET Core Identity

app.UseExceptionHandler("/Error", createScopeForErrors: true); // Non-Development environment
app.UseHsts(); // Non-Development environment with HTTPS protocol

app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);

app.UseHttpsRedirection(); // With HTTPS protocol

app.UseAntiforgery();

app.MapStaticAssets();

app.MapRazorComponents<App>(); // With additional extension methods for render modes

app.MapAdditionalIdentityEndpoints(); // With ASP.NET Core Identity

app.Run();
```

Typical Razor Pages/MVC middleware pipeline:

```csharp
app.UseMigrationsEndPoint(); // Development environment with ASP.NET Core Identity

app.UseExceptionHandler("/Error"); // Non-Development environment
app.UseHsts(); // Non-Development environment with HTTPS protocol

app.UseHttpsRedirection(); // With HTTPS protocol

// app.UseCookiePolicy();
app.UseRouting(); // If not called, runs at the beginning of the pipeline by default
// app.UseRateLimiter();
// app.UseRequestLocalization();
// app.UseCors();

// app.UseAuthentication(); // Called internally for ASP.NET Core Identity
app.UseAuthorization();
// app.UseSession();
// app.UseResponseCompression();
// app.UseResponseCaching();

app.MapStaticAssets();

app.MapControllerRoute(...); // For MVC controllers

app.MapRazorPages(); // For Razor Pages pages

app.MapControllers(); // With authentication in a Razor Pages app

app.Run();
```

In the preceding code:

* CORS middleware ([Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A)), authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)), and authorization middleware ([Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A)) must appear in the order shown.
* CORS middleware ([Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A)) must appear before response caching middleware ([Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A)) to add CORS headers on every request, including cached responses. For more information, see [It is not clear that UseCORS must come before UseResponseCaching (`dotnet/aspnetcore` #23218](https://github.com/dotnet/aspnetcore/issues/23218).
* Request localization middleware ([Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%252A)) must appear before any middleware that might check the request culture, for example, static file middleware ([Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)).
* Rate-limiting middleware ([Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%252A)) must be called after routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) when rate limiting endpoint-specific APIs are used. For example, if the [`[EnableRateLimiting]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.EnableRateLimitingAttribute) is used, rate-limiting middleware must be called after routing middleware. When calling only global limiters, rate-limiting middleware can be called before routing middleware.

In some scenarios, middleware has different ordering. For example, caching and compression ordering depends on the app's specification. In the following order, CPU usage might be reduced by caching the compressed response, but the app might end up caching multiple representations of a resource using different compression algorithms, such as Gzip or Brotli:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
```

Static assets are typically served early in the pipeline so that the app can short-circuit request processing to improve performance.

Authentication doesn't short-circuit unauthenticated requests. Although authentication middleware authenticates requests, authorization occurs after the framework selects a Razor component in a Blazor Web App, a page in a Razor Pages app, or a controller and action in an MVC app.



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

The following diagram shows the complete request processing pipeline for ASP.NET Core MVC and Razor Pages apps. You can see how, in a typical app, existing middlewares are ordered and where custom middlewares are added. You have full control over how to reorder existing middlewares or inject new custom middlewares as necessary for your scenarios.

ASP.NET Core middleware pipeline

The **Endpoint** middleware in the preceding diagram executes the filter pipeline for the corresponding app type&mdash;MVC or Razor Pages.

The preceding diagram shows the **Routing** middleware following **Static Files**. This order is how the project templates work by explicitly calling [app.UseRouting](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A). If you don't call `app.UseRouting`, the **Routing** middleware runs at the beginning of the pipeline by default. For more information, see [Routing](../routing.md).

The order you add middleware components in the `Program.cs` file defines the order in which the middleware components are invoked on requests and the reverse order for the response. The order is **critical** for security, performance, and functionality.

The following highlighted code in `Program.cs` adds security-related middleware components in the typical recommended order:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebMiddleware.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
// app.UseCookiePolicy();

app.UseRouting();
// app.UseRateLimiter();
// app.UseRequestLocalization();
// app.UseCors();

app.UseAuthentication();
app.UseAuthorization();
// app.UseSession();
// app.UseResponseCompression();
// app.UseResponseCaching();

app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();
```

In the preceding code:

* Commented out middleware isn't added when you create a new web app with [individual users accounts](../../security/authentication/identity.md).
* Not every middleware appears in this exact order, but many do. For example:
  * `UseCors`, `UseAuthentication`, and `UseAuthorization` must appear in the order shown.
  * `UseCors` currently must appear before `UseResponseCaching`. This requirement is explained in [GitHub issue dotnet/aspnetcore #23218](https://github.com/dotnet/aspnetcore/issues/23218).
  * `UseRequestLocalization` must appear before any middleware that might check the request culture, for example, `app.UseStaticFiles()`.
  * [Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%252A) must be called after `UseRouting` when rate limiting endpoint specific APIs are used. For example, if the [`[EnableRateLimiting]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.EnableRateLimitingAttribute) attribute is used, `UseRateLimiter` must be called after `UseRouting`. When calling only global limiters, `UseRateLimiter` can be called before `UseRouting`.

In some scenarios, middleware has different ordering. For example, caching and compression ordering is scenario specific, and there are multiple valid orderings. For example:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
```

With the preceding code, you could reduce CPU usage by caching the compressed response, but you might end up caching multiple representations of a resource using different compression algorithms such as Gzip or Brotli.

The following ordering combines static files to allow caching compressed static files:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
app.UseStaticFiles();
```

The following `Program.cs` code adds middleware components for common app scenarios:

1. Exception and error handling
   * When the app runs in the `Development` environment:
     * Developer exception page middleware ([Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%252A)) reports app runtime errors.
     * Database error page middleware ([Microsoft.AspNetCore.Builder.DatabaseErrorPageExtensions.UseDatabaseErrorPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DatabaseErrorPageExtensions.UseDatabaseErrorPage%252A)) reports database runtime errors.
   * When the app runs in the `Production` environment:
     * Exception handler middleware ([Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A)) catches exceptions thrown in the following middlewares.
     * HTTP Strict Transport Security (HSTS) protocol middleware ([Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%252A)) adds the `Strict-Transport-Security` header.
1. HTTPS redirection middleware ([Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A)) redirects HTTP requests to HTTPS.
1. Static file middleware ([Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)) returns static files and short-circuits further request processing.
1. Cookie policy middleware ([Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A)) conforms the app to the EU General Data Protection Regulation (GDPR) regulations.
1. Routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) to route requests.
1. Authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)) attempts to authenticate the user before they're allowed access to secure resources.
1. Authorization middleware ([Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A)) authorizes a user to access secure resources.
1. Session middleware ([Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%252A)) establishes and maintains session state. If the app uses session state, call session middleware after cookie policy middleware and before MVC middleware.
1. Endpoint routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) with [Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%252A)) to add Razor Pages endpoints to the request pipeline.

```csharp
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseDatabaseErrorPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCookiePolicy();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();
app.MapRazorPages();
```

In the preceding example code, each middleware extension method is exposed on [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) through the [Microsoft.AspNetCore.Builder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder) namespace.

[Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A) is the first middleware component added to the pipeline. Therefore, the exception handler middleware catches any exceptions that occur in later calls.

Static file middleware is called early in the pipeline so that it can handle requests and short-circuit without going through the remaining components. The static file middleware provides **no** authorization checks. Any files served by static file middleware, including those under *wwwroot*, are publicly available. For an approach to secure static files, see [fundamentals/static-files](../static-files.md).

If the request isn't handled by the static file middleware, it's passed on to the authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)), which performs authentication. Authentication doesn't short-circuit unauthenticated requests. Although authentication middleware authenticates requests, authorization (and rejection) occurs only after MVC selects a specific Razor Page or MVC controller and action.

The following example demonstrates a middleware order where requests for static files are handled by static file middleware before response compression middleware. Static files aren't compressed with this middleware order. The Razor Pages responses can be compressed.

```csharp
// Static files aren't compressed by static file middleware.
app.UseStaticFiles();

app.UseRouting();

app.UseResponseCompression();

app.MapRazorPages();
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

The following diagram shows the complete request processing pipeline for ASP.NET Core MVC and Razor Pages apps. You can see how, in a typical app, existing middlewares are ordered and where custom middlewares are added. You have full control over how to reorder existing middlewares or inject new custom middlewares as necessary for your scenarios.

ASP.NET Core middleware pipeline

The **Endpoint** middleware in the preceding diagram executes the filter pipeline for the corresponding app type&mdash;MVC or Razor Pages.

The preceding diagram shows the **Routing** middleware following **Static Files**. This order is how the project templates work by explicitly calling [app.UseRouting](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A). If you don't call `app.UseRouting`, the **Routing** middleware runs at the beginning of the pipeline by default. For more information, see [Routing](../routing.md).

The order you add middleware components in the `Program.cs` file defines the order in which the middleware components are invoked on requests and the reverse order for the response. The order is **critical** for security, performance, and functionality.

The following highlighted code in `Program.cs` adds security-related middleware components in the typical recommended order:

```csharp
using IndividualAccountsExample.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
// app.UseCookiePolicy();

app.UseRouting();
// app.UseRequestLocalization();
// app.UseCors();

app.UseAuthentication();
app.UseAuthorization();
// app.UseSession();
// app.UseResponseCompression();
// app.UseResponseCaching();

app.MapRazorPages();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

In the preceding code:

* Commented out middleware isn't added when you create a new web app with [individual users accounts](../../security/authentication/identity.md).
* Not every middleware appears in this exact order, but many do. For example:
  * `UseCors`, `UseAuthentication`, and `UseAuthorization` must appear in the order shown.
  * `UseCors` currently must appear before `UseResponseCaching`. This requirement is explained in [GitHub issue dotnet/aspnetcore #23218](https://github.com/dotnet/aspnetcore/issues/23218).
  * `UseRequestLocalization` must appear before any middleware that might check the request culture (for example, `app.UseMvcWithDefaultRoute()`).

In some scenarios, middleware has different ordering. For example, caching and compression ordering is scenario specific, and there are multiple valid orderings. For example:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
```

With the preceding code, you could reduce CPU usage by caching the compressed response, but you might end up caching multiple representations of a resource using different compression algorithms such as Gzip or Brotli.

The following ordering combines static files to allow caching compressed static files:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
app.UseStaticFiles();
```

The following `Program.cs` code adds middleware components for common app scenarios:

1. Exception and error handling
   * When the app runs in the `Development` environment:
     * Developer exception page middleware ([Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%252A)) reports app runtime errors.
     * Database error page middleware ([Microsoft.AspNetCore.Builder.DatabaseErrorPageExtensions.UseDatabaseErrorPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DatabaseErrorPageExtensions.UseDatabaseErrorPage%252A)) reports database runtime errors.
   * When the app runs in the `Production` environment:
     * Exception handler middleware ([Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A)) catches exceptions thrown in the following middlewares.
     * HTTP Strict Transport Security (HSTS) protocol middleware ([Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%252A)) adds the `Strict-Transport-Security` header.
1. HTTPS redirection middleware ([Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A)) redirects HTTP requests to HTTPS.
1. Static file middleware ([Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)) returns static files and short-circuits further request processing.
1. Cookie policy middleware ([Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A)) conforms the app to the EU General Data Protection Regulation (GDPR) regulations.
1. Routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) to route requests.
1. Authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)) attempts to authenticate the user before they're allowed access to secure resources.
1. Authorization middleware ([Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A)) authorizes a user to access secure resources.
1. Session middleware ([Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%252A)) establishes and maintains session state. If the app uses session state, call session middleware after cookie policy middleware and before MVC middleware.
1. Endpoint routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) with [Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%252A)) to add Razor Pages endpoints to the request pipeline.

```csharp
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseDatabaseErrorPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCookiePolicy();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();
app.MapRazorPages();
```

In the preceding example code, each middleware extension method is exposed on [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) through the [Microsoft.AspNetCore.Builder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder) namespace.

[Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A) is the first middleware component added to the pipeline. Therefore, the exception handler middleware catches any exceptions that occur in later calls.

Static file middleware is called early in the pipeline so that it can handle requests and short-circuit without going through the remaining components. The static file middleware provides **no** authorization checks. Any files served by static file middleware, including those under *wwwroot*, are publicly available. For an approach to secure static files, see [fundamentals/static-files](../static-files.md).

If the request isn't handled by the static file middleware, it's passed on to the authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)), which performs authentication. Authentication doesn't short-circuit unauthenticated requests. Although authentication middleware authenticates requests, authorization (and rejection) occurs only after MVC selects a specific Razor Page or MVC controller and action.

The following example demonstrates a middleware order where requests for static files are handled by static file middleware before response compression middleware. Static files aren't compressed with this middleware order. The Razor Pages responses can be compressed.

```csharp
// Static files aren't compressed by static file middleware.
app.UseStaticFiles();

app.UseRouting();

app.UseResponseCompression();

app.MapRazorPages();
```



**Applies to: < aspnetcore-6.0**

The following diagram shows the complete request processing pipeline for ASP.NET Core MVC and Razor Pages apps. You can see how, in a typical app, existing middlewares are ordered and where custom middlewares are added. You have full control over how to reorder existing middlewares or inject new custom middlewares as necessary for your scenarios.

ASP.NET Core middleware pipeline

The **Endpoint** middleware in the preceding diagram executes the filter pipeline for the corresponding app type&mdash;MVC or Razor Pages.

The order that middleware components are added in the `Startup.Configure` method defines the order in which the middleware components are invoked on requests and the reverse order for the response. The order is **critical** for security, performance, and functionality.

The following `Startup.Configure` method adds security-related middleware components in the typical recommended order:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseDatabaseErrorPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    // app.UseCookiePolicy();

    app.UseRouting();
    // app.UseRequestLocalization();
    // app.UseCors();

    app.UseAuthentication();
    app.UseAuthorization();
    // app.UseSession();
    // app.UseResponseCompression();
    // app.UseResponseCaching();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

In the preceding code:

* Commented out middleware isn't added when you create a new web app with [individual users accounts](../../security/authentication/identity.md).
* Not every middleware appears in this exact order, but many do. For example:
  * `UseCors`, `UseAuthentication`, and `UseAuthorization` must appear in the order shown.
  * `UseCors` currently must appear before `UseResponseCaching` due to [this bug](https://github.com/dotnet/aspnetcore/issues/23218).
  * `UseRequestLocalization` must appear before any middleware that might check the request culture (for example, `app.UseMvcWithDefaultRoute()`).

In some scenarios, middleware has different ordering. For example, caching and compression ordering is scenario specific, and there's multiple valid orderings. For example:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
```

With the preceding code, CPU could be saved by caching the compressed response, but you might end up caching multiple representations of a resource using different compression algorithms such as Gzip or Brotli.

The following ordering combines static files to allow caching compressed static files:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
app.UseStaticFiles();
```

The following `Startup.Configure` method adds middleware components for common app scenarios:

1. Exception and error handling
   * When the app runs in the `Development` environment:
     * Developer exception page middleware ([Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%252A)) reports app runtime errors.
     * Database error page middleware reports database runtime errors.
   * When the app runs in the `Production` environment:
     * Exception handler middleware ([Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A)) catches exceptions thrown in the following middlewares.
     * HTTP Strict Transport Security (HSTS) protocol middleware ([Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%252A)) adds the `Strict-Transport-Security` header.
1. HTTPS redirection middleware ([Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A)) redirects HTTP requests to HTTPS.
1. Static file middleware ([Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)) returns static files and short-circuits further request processing.
1. Cookie policy middleware ([Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A)) conforms the app to the EU General Data Protection Regulation (GDPR) regulations.
1. Routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) to route requests.
1. Authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)) attempts to authenticate the user before they're allowed access to secure resources.
1. Authorization middleware ([Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A)) authorizes a user to access secure resources.
1. Session middleware ([Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession%252A)) establishes and maintains session state. If the app uses session state, call session middleware after cookie policy middleware and before MVC middleware.
1. Endpoint routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) with [Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%252A)) to add Razor Pages endpoints to the request pipeline.

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseDatabaseErrorPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseCookiePolicy();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseSession();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
    });
}
```

In the preceding example code, each middleware extension method is exposed on [Microsoft.AspNetCore.Builder.IApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.IApplicationBuilder) through the [Microsoft.AspNetCore.Builder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder) namespace.

[Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A) is the first middleware component added to the pipeline. Therefore, the exception handler middleware catches any exceptions that occur in later calls.

Static file middleware is called early in the pipeline so that it can handle requests and short-circuit without going through the remaining components. The static file middleware provides **no** authorization checks. Any files served by static file middleware, including those under *wwwroot*, are publicly available. For an approach to secure static files, see [fundamentals/static-files](../static-files.md).

If the request isn't handled by the static file middleware, it's passed on to the authentication middleware ([Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A)), which performs authentication. Authentication doesn't short-circuit unauthenticated requests. Although authentication middleware authenticates requests, authorization (and rejection) occurs only after MVC selects a specific Razor Page or MVC controller and action.

The following example demonstrates a middleware order where requests for static files are handled by static file middleware before response compression middleware. Static files aren't compressed with this middleware order. The Razor Pages responses can be compressed.

```csharp
public void Configure(IApplicationBuilder app)
{
    // Static files aren't compressed by static file middleware.
    app.UseStaticFiles();

    app.UseRouting();

    app.UseResponseCompression();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
    });
}
```

For Single Page Applications (SPAs), the SPA middleware [Microsoft.Extensions.DependencyInjection.SpaStaticFilesExtensions.UseSpaStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SpaStaticFilesExtensions.UseSpaStaticFiles%252A) usually comes last in the middleware pipeline. The SPA middleware comes last:

* To allow all other middleware to respond to matching requests first.
* To allow SPAs with client-side routing to run for all routes that the server app doesn't recognize.

For more details on SPAs, see the guides for the [React](../../client-side/spa/react.md) and [Angular](../../client-side/spa/angular.md) project templates.



For information about Single Page Applications, see the guides for the [React](../../client-side/spa/react.md) and [Angular](../../client-side/spa/angular.md) project templates.

## `UseCors` and `UseStaticFiles` order

For more information on ordering [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A), see [security/cors#usecors-and-usestaticfiles-order](https://learn.microsoft.com/search/?terms=security%2Fcors%23usecors-and-usestaticfiles-order).

## Forwarded headers middleware order

Run forwarded headers middleware before other middleware to ensure that the middleware relying on forwarded headers information can consume the header values for processing. To run forwarded headers middleware after diagnostics and error handling middleware, see [forwarded headers middleware order](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fproxy-load-balancer%23forwarded-headers-middleware-order).

## Built-in middleware

The latest release of ASP.NET Core includes the following middleware. The *UI stack* column shows the typical UI stack where the middleware is used: [All, Blazor Web App (BWA), Razor Pages and MVC (RP/MVC)]. The *Order* column provides notes on middleware placement in the request processing pipeline and under what conditions the middleware might stop request processing. When a middleware short-circuits the request processing pipeline and prevents further downstream middleware from processing a request, it's called a *terminal middleware*. For more information about short-circuiting, see the [Create a middleware pipeline with `WebApplication`](#create-a-middleware-pipeline-with-webapplication) section.

<!-- REVIEWER NOTE: I have "All" for the *UI stack* entries except:
                    
                    MVC: RP/MVC
                    OWIN: RP/MVC
                    Output Caching: RP/MVC
                    Response Caching: RP/MVC
                    Session: RP/MVC
                    Blazor WebAssembly Debugging: Blazor Web App (CSR)
-->

| Middleware | Description | UI stack | Order |
| --- | --- | --- | --- |
| [Antiforgery](../../security/anti-request-forgery.md) | Provides anti-request-forgery support. | All | After authentication and authorization, before endpoints. |
| [Authentication](../../security/authentication/identity.md) | Provides authentication support. | All | Before `HttpContext.User` is required. Terminal for OAuth callbacks. |
| [Authorization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) | Provides authorization support. | All | Immediately after the authentication middleware. |
| [Cookie Policy](../../security/gdpr.md) | Tracks consent from users for storing personal information and enforces minimum standards for cookie fields, such as `secure` and `SameSite`. | All | Before middleware that issues cookies. Examples: Authentication, Session, MVC (TempData). |
| [CORS](../../security/cors.md) | Configures Cross-Origin Resource Sharing. | All | Before middleware that use CORS. [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must go before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A). For more information, see [It is not clear that UseCORS must come before UseResponseCaching (`dotnet/aspnetcore` #23218](https://github.com/dotnet/aspnetcore/issues/23218). |
| [Developer Exception Page](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware) | Generates a page with error information that's intended for use only in the `Development` environment. | All | Before middleware that generate errors. The project templates automatically register this middleware as the first middleware in the pipeline when the environment is `Development`. |
| [Diagnostics](../error-handling.md) | Several separate middlewares that provide a developer exception page, exception handling, status code pages, and the default web page for new apps. | All | Before middleware that generate errors. Terminal for exceptions or serving the default web page for new apps. |
| [Forwarded Headers](../../host-and-deploy/proxy-load-balancer.md) | Forwards proxied headers onto the current request. | All | Before middleware that consume the updated fields. Examples: scheme, host, client IP, method. |
| [Health Check](../../host-and-deploy/health-checks.md) | Checks the health of an ASP.NET Core app and its dependencies, such as checking database availability. | All | Terminal if a request matches a health check endpoint. |
| [Header Propagation](https://learn.microsoft.com/search/?terms=fundamentals%2Fhttp-requests%23header-propagation-middleware) | Propagates HTTP headers from the incoming request to the outgoing HTTP Client requests. |
| All |
| [HTTP Logging](../http-logging/index.md) | Logs HTTP Requests and Responses. | All | At the beginning of the middleware pipeline. |
| [HTTP Method Override](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpMethodOverrideExtensions) | Allows an incoming POST request to override the method. | All | Before middleware that consume the updated method. |
| [HTTPS Redirection](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23require-https) | Redirects all HTTP requests to HTTPS. | All | Before middleware that consume the URL. |
| [HTTP Strict Transport Security (HSTS)](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol) | Security enhancement middleware that adds a special response header. | All | Before responses are sent and after middleware that modify requests. Examples: Forwarded Headers, URL Rewriting. |
| [MVC](../../mvc/overview.md) | Processes requests with MVC and Razor Pages. | RP/MVC | Terminal if a request matches a route. |
| [OWIN](../owin.md) | Interop with OWIN-based apps, servers, and middleware. | RP/MVC | Terminal if the OWIN middleware fully processes the request. |
| [Output Caching](../../performance/caching/output.md) | Provides support for caching responses based on configuration. | RP/MVC | Before middleware that require caching. [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A), [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A), [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A), and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) must come before [Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache%252A). |
| [Response Caching](../../performance/caching/middleware.md) | Provides support for caching responses. This middleware requires client participation to work. Use output caching for complete server control. | RP/MVC | Before middleware that require caching. [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must come before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A). Response caching isn't typically beneficial for UI apps, such as Razor Pages, because browsers generally set request headers that prevent caching. [Output caching](../../performance/caching/output.md) benefits UI apps. |
| [Request Decompression](request-decompression.md) | Provides support for decompressing requests. | All | Before middleware that read the request body. |
| [Response Compression](../../performance/response-compression.md) | Provides support for compressing responses. | All | Before middleware that require compression. |
| [Request Localization](../localization.md) | Provides localization support. | All | Before localization sensitive middleware. Must appear after routing middleware when using [Microsoft.AspNetCore.Localization.Routing.RouteDataRequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.Routing.RouteDataRequestCultureProvider). |
| [Request Timeouts](../../performance/timeouts.md) | Provides support for configuring request timeouts, global and per endpoint. | All | [Microsoft.AspNetCore.Builder.RequestTimeoutsIApplicationBuilderExtensions.UseRequestTimeouts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RequestTimeoutsIApplicationBuilderExtensions.UseRequestTimeouts%252A) must come after [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A), [Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%252A), and [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A). |
| [Endpoint Routing](../routing.md). | Defines and constrains request routes. | All | Terminal for matching routes. |
| [SPA](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.SpaApplicationBuilderExtensions.UseSpa%252A) | Handles all requests from this point in the middleware chain by returning the default page for the Single Page Application (SPA). | All | Appears late in the pipeline, so other middleware for serving static files, such as MVC actions, take precedence. |
| [Session](../app-state.md) | Provides support for managing user sessions. | RP/MVC | Before middleware that require Session. |
| [Static File](../static-files.md) | Provides support for serving static files and directory browsing. | All | Terminal if a request matches a file. |
| [URL Rewrite](../url-rewriting.md) | Provides support for rewriting URLs and redirecting requests. | All | Before middleware that consume the URL. |
| [W3C Logging](../w3c-logger/index.md) | Generates server access logs in the [W3C Extended Log File Format](https://www.w3.org/TR/WD-logfile.html). | All | At the beginning of the middleware pipeline. |
| [Blazor WebAssembly Debugging](../../blazor/debug.md) | Debugs Blazor Web Apps that use client-side rendering (CSR) inside Chromium developer tools. | BWA | At the beginning of the middleware pipeline. |
| [WebSockets](../websockets.md) | Enables the WebSockets protocol. | All | Before middleware that are required to accept WebSocket requests. |

## Additional resources

* [Lifetime and registration options (includes middleware sample)](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23lifetime-and-registration-options)
* [fundamentals/middleware/write](write.md)
* [test/middleware](../../test/middleware.md)
* [Configure gRPC-Web in ASP.NET Core](https://learn.microsoft.com/search/?terms=grpc%2Fbrowser%23configure-grpc-web-in-aspnet-core)
* [migration/fx-to-core/areas/http-modules](../../migration/fx-to-core/areas/http-modules.md)
* [fundamentals/startup](../startup.md)
* [fundamentals/request-features](../request-features.md)
* [fundamentals/middleware/extensibility](extensibility.md)
* [fundamentals/middleware/extensibility-third-party-container](extensibility-third-party-container.md)
* [fundamentals/apis](../apis.md)
