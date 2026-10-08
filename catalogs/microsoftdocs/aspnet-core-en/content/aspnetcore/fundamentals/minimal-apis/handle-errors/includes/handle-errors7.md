 **Applies to: \= aspnetcore-7.0**

This article describes how to handle errors in Minimal API apps.

## Exceptions

In a Minimal API app, there are two different built-in centralized mechanisms to handle unhandled exceptions:

* [Developer Exception Page middleware](#developer-exception-page) (For use in the **`Development` environment only**.)
* [Exception handler middleware](#exception-handler)

This section refers to the following Minimal API app to demonstrate ways to handle exceptions. It throws an exception when the endpoint `/exception` is requested:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/exception", () 
    => { throw new InvalidOperationException("Sample Exception"); });

app.Run();
```

### Developer Exception Page

The [Developer Exception Page](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23developer-exception-page) shows detailed stack traces for server errors. It uses [Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware) to capture synchronous and asynchronous exceptions from the HTTP pipeline and to generate error responses. 

ASP.NET Core apps enable the developer exception page by default when both:

* Running in the [`Development` environment](../../../environments.md).
* App is using [WebApplication.CreateBuilder](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.webapplication.createbuilder).

For more information on configuring middleware, see [Middleware in ASP.NET Core apps](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-added-automatically-by-webapplication).

Using the preceding Minimal API app, when the `Developer Exception Page` detects an unhandled exception, it generates a default plain-text response similar to the following example:

```console
HTTP/1.1 500 Internal Server Error
Content-Type: text/plain; charset=utf-8
Date: Thu, 27 Oct 2022 18:00:59 GMT
Server: Kestrel
Transfer-Encoding: chunked
 
    System.InvalidOperationException: Sample Exception
    at Program.<>c.<<Main>$>b__0_1() in ....:line 17
    at lambda_method2(Closure, Object, HttpContext)
    at Microsoft.AspNetCore.Routing.EndpointMiddleware.Invoke(HttpContext httpContext)
    --- End of stack trace from previous location ---
    at Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddlewareImpl.Invoke(HttpContext context)
HEADERS
=======
Accept: */*
Connection: keep-alive
Host: localhost:5239
Accept-Encoding: gzip, deflate, br
```

> **Warning:**
> Don't enable the Developer Exception Page **unless the app is running in the `Development` environment**. Don't share detailed exception information publicly when the app runs in production. For more information on configuring environments, see [fundamentals/environments](../../../environments.md).

### Exception handler

In non-development environments, use the [exception handler middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23exception-handler-page) to produce an error payload. To configure the `exception handler middleware`, call [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A). 

For example, the following code changes the app to respond with an [RFC 7807](https://tools.ietf.org/html/rfc7807)-compliant payload to the client. For more information, see [Problem Details](#problem-details) section.


```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseExceptionHandler(exceptionHandlerApp 
    => exceptionHandlerApp.Run(async context 
        => await Results.Problem()
                     .ExecuteAsync(context)));

app.Map("/exception", () 
    => { throw new InvalidOperationException("Sample Exception"); });

app.Run();
```

## Client and Server error responses

Consider the following Minimal API app.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/users/{id:int}", (int id) 
    => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)) );

app.Run();

public record User(int Id);
```

The `/users` endpoint produces `200 OK` with a `json` representation of `User` when `id` is greater than `0`, otherwise a `400 BAD REQUEST` status code without a response body. For more information about creating a response, see [Create responses in Minimal API apps](https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/responses).

The [`Status Code Pages middleware`](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23sestatuscodepages) can be configured to produce a common body content, **when empty**, for all HTTP client (`400`-`499`) or server (`500` -`599`) responses. The middleware is configured by calling the 
[UseStatusCodePages](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/handle-errors/includes/\[Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%2A]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%252A\)) extension method.

For example, the following example changes the app to respond with an [RFC 7807](https://tools.ietf.org/html/rfc7807)-compliant payload to the client for all client and server responses, including routing errors (for example, `404 NOT FOUND`). For more information, see the [Problem Details](#problem-details) section.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStatusCodePages(async statusCodeContext 
    =>  await Results.Problem(statusCode: statusCodeContext.HttpContext.Response.StatusCode)
                 .ExecuteAsync(statusCodeContext.HttpContext));

app.Map("/users/{id:int}", (int id) 
    => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)) );

app.Run();

public record User(int Id);
```

## Problem details

[Problem Details](https://www.rfc-editor.org/rfc/rfc7807.html) are not the only response format to describe an HTTP API error, however, they are commonly used to report errors for HTTP APIs.

The problem details service implements the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) interface, which supports creating problem details in ASP.NET Core. The [Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)) extension method on [Microsoft.Extensions.DependencyInjection.IServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceCollection) registers the default `IProblemDetailsService` implementation.

In ASP.NET Core apps, the following middleware generates problem details HTTP responses when `AddProblemDetails` is called, except when the [`Accept` request HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept) doesn't include one of the content types supported by the registered [Microsoft.AspNetCore.Http.IProblemDetailsWriter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsWriter) (default: `application/json`):

* [Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware): Generates a problem details response when a custom handler is not defined.
* [Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware): Generates a problem details response by default.
* [Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware): Generates a problem details response in development when the `Accept` request HTTP header doesn't include `text/html`.


Minimal API apps can be configured to generate problem details response for all HTTP client and server error responses that ***don't have a body content yet*** by using the `AddProblemDetails` extension method. 

The following code configures the app to generate problem details:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

app.Map("/users/{id:int}", (int id) 
    => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)) );

app.Map("/exception", () 
    => { throw new InvalidOperationException("Sample Exception"); });

app.Run();
```

For more information on using `AddProblemDetails`, see [Problem Details](https://learn.microsoft.com/aspnet/core/fundamentals/error-handling?view=aspnetcore-7.0\&preserve-view=true#pds7)
