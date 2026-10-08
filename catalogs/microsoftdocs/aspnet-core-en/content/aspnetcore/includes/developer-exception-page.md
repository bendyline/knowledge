The *Developer Exception Page* displays detailed information about unhandled request exceptions. It uses [Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware) to capture synchronous and asynchronous exceptions from the HTTP pipeline and to generate error responses. The developer exception page runs early in the middleware pipeline, so that it can catch unhandled exceptions thrown in middleware that follows.

ASP.NET Core apps enable the developer exception page by default when both:

* Running in the [`Development` environment](../fundamentals/environments.md).
* The app was created with the current templates, that is, by using [Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder%252A).

Apps created using earlier templates, that is, by using [Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%252A), can enable the developer exception page by calling [`app.UseDeveloperExceptionPage`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage\(Microsoft.AspNetCore.Builder.IApplicationBuilder\)).

> **Warning:**
> Don't enable the Developer Exception Page **unless the app is running in the `Development` environment**. Don't share detailed exception information publicly when the app runs in production. For more information on configuring environments, see [fundamentals/environments](../fundamentals/environments.md).

The Developer Exception Page can include the following information about the exception and the request:

* Stack trace
* Query string parameters, if any
* Cookies, if any
* Headers
* Endpoint metadata, if any

The Developer Exception Page isn't guaranteed to provide any information. Use [Logging](../fundamentals/logging/index.md) for complete error information.

The following image shows a sample developer exception page with animation to show the tabs and the information displayed:

Developer exception page animated to show each tab selected.

In response to a request with an `Accept: text/plain` header, the Developer Exception Page returns plain text instead of HTML. For example:

```text
Status: 500 Internal Server Error
Time: 9.39 msSize: 480 bytes
FormattedRawHeadersRequest
Body
text/plain; charset=utf-8, 480 bytes
System.InvalidOperationException: Sample Exception
   at WebApplicationMinimal.Program.<>c.<Main>b__0_0() in C:\Source\WebApplicationMinimal\Program.cs:line 12
   at lambda_method1(Closure, Object, HttpContext)
   at Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddlewareImpl.Invoke(HttpContext context)

HEADERS
=======
Accept: text/plain
Host: localhost:7267
traceparent: 00-0eab195ea19d07b90a46cd7d6bf2f
```
