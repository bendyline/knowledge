
**Applies to: \= aspnetcore-8.0**

By [Tom Dykstra](https://github.com/tdykstra/)

This article covers common approaches to handling errors in ASP.NET Core web apps. See also [fundamentals/error-handling-api](../../error-handling-api.md).

## Developer exception page

The *Developer Exception Page* displays detailed information about unhandled request exceptions. ASP.NET Core apps enable the developer exception page by default when both:

* Running in the [`Development` environment](../../environments.md).
* App created with the current templates, that is, using [WebApplication.CreateBuilder](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.webapplication.createbuilder).  Apps created using the [`WebHost.CreateDefaultBuilder`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost.CreateDefaultBuilder) must enable the developer exception page by calling `app.UseDeveloperExceptionPage` in `Configure`.

The developer exception page runs early in the middleware pipeline, so that it can catch unhandled exceptions thrown in middleware that follows.

Detailed exception information shouldn't be displayed publicly when the app runs in the `Production` environment. For more information on configuring environments, see [fundamentals/environments](../../environments.md).

The Developer Exception Page can include the following information about the exception and the request:

* Stack trace
* Query string parameters, if any
* Cookies, if any
* Headers

The Developer Exception Page isn't guaranteed to provide any information. Use [Logging](../../logging/index.md) for complete error information.

## Exception handler page

To configure a custom error handling page for the [`Production` environment](../../environments.md), call [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A). This exception handling middleware:

* Catches and logs unhandled exceptions.
* Re-executes the request in an alternate pipeline using the path indicated. The request isn't re-executed if the response has started. The template-generated code re-executes the request using the `/Error` path.

> **Warning:**
> If the alternate pipeline throws an exception of its own, exception handling middleware rethrows the original exception.

Since this middleware can re-execute the request pipeline:

* Middlewares need to handle reentrancy with the same request. This normally means either cleaning up their state after calling `_next` or caching their processing on the `HttpContext` to avoid redoing it. When dealing with the request body, this either means buffering or caching the results like the Form reader.
* For the [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler(Microsoft.AspNetCore.Builder.IApplicationBuilder,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler(Microsoft.AspNetCore.Builder.IApplicationBuilder%2CSystem.String)) overload that is used in templates, only the request path is modified, and the route data is cleared. Request data such as headers, method, and items are all reused as-is.
* Scoped services remain the same.

In the following example, [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A) adds the exception handling middleware in non-`Development` environments:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Program.cs" id="snippet_UseExceptionHandler" highlight="3,5"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Program.cs.md)

The Razor Pages app template provides an Error page (`.cshtml`) and [Microsoft.AspNetCore.Mvc.RazorPages.PageModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel) class (`ErrorModel`) in the *Pages* folder. For an MVC app, the project template includes an `Error` action method and an Error view for the Home controller.

The exception handling middleware re-executes the request using the *original* HTTP method. If an error handler endpoint is restricted to a specific set of HTTP methods, it runs only for those HTTP methods. For example, an MVC controller action that uses the `[HttpGet]` attribute runs only for GET requests. To ensure that *all* requests reach the custom error handling page, don't restrict them to a specific set of HTTP methods.

To handle exceptions differently based on the original HTTP method:

* For Razor Pages, create multiple handler methods. For example, use `OnGet` to handle GET exceptions and use `OnPost` to handle POST exceptions.
* For MVC, apply HTTP verb attributes to multiple actions. For example, use `[HttpGet]` to handle GET exceptions and use `[HttpPost]` to handle POST exceptions.

To allow unauthenticated users to view the custom error handling page, ensure that it supports anonymous access.

### Access the exception

Use [Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature) to access the exception and the original request path in an error handler. The following example uses `IExceptionHandlerPathFeature` to get more information about the exception that was thrown:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Pages/Error.cshtml.cs" id="snippet_Class" highlight="15-27"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Pages/Error.cshtml.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Pages/Error.cshtml.cs.md)

> **Warning:**
> Do **not** serve sensitive error information to clients. Serving errors is a security risk.

## Exception handler lambda

An alternative to a [custom exception handler page](#exception-handler-page) is to provide a lambda to [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A). Using a lambda allows access to the error before returning the response.

The following code uses a lambda for exception handling:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_UseExceptionHandlerInline" highlight="5-29"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

> **Warning:**
> Do **not** serve sensitive error information to clients. Serving errors is a security risk.

## IExceptionHandler

[Microsoft.AspNetCore.Diagnostics.IExceptionHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandler) is an interface that gives the developer a callback for handling known exceptions in a central location.

`IExceptionHandler` implementations are registered by calling [`IServiceCollection.AddExceptionHandler<T>`](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.exceptionhandlerservicecollectionextensions.addexceptionhandler). The lifetime of an `IExceptionHandler` instance is singleton. Multiple implementations can be added, and they're called in the order registered.

> **Important:**
> Registering an `IExceptionHandler` implementation isn't sufficient on its own. Registered handlers are invoked by the exception handling middleware, so the app must also add that middleware by calling [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A). If `UseExceptionHandler` isn't called, the registered `IExceptionHandler` implementations are never called.

Exception handling middleware iterates through registered exception handlers in order until one returns `true` from `TryHandleAsync`, indicating that the exception has been handled. If an exception handler handles an exception, it can return `true` to stop processing. If an exception isn't handled by any exception handler, then control falls back to the default behavior and options from the middleware.

> **Note:**
> In .NET 8 and .NET 9, the exception handling middleware logs the exception and emits metrics even when an `IExceptionHandler` implementation returns `true` from `TryHandleAsync`. If the handler does its own logging, the exception is recorded twice: once under the `Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware` category and once under the handler's category. To log it only from the handler, filter out the middleware category in configuration:
>
> ```json
> {
>   "Logging": {
>     "LogLevel": {
>       "Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware": "None"
>     }
>   }
> }
> ```
>
> Starting in .NET 10, diagnostics are suppressed by default for handled exceptions. See [SuppressDiagnosticsCallback](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23suppressdiagnosticscallback).

The following example shows an `IExceptionHandler` implementation:

[language="csharp" source="\~/fundamentals/error-handling/samples/8.x/ErrorHandlingSample/CustomExceptionHandler.cs"::: (complete source file; reference: \~/fundamentals/error-handling/samples/8.x/ErrorHandlingSample/CustomExceptionHandler.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/8.x/ErrorHandlingSample/CustomExceptionHandler.cs.md)

The following example shows how to register an `IExceptionHandler` implementation for dependency injection and add the exception handling middleware that calls it:

[language="csharp" source="\~/fundamentals/error-handling/samples/8.x/ErrorHandlingSample/Program.cs" id="snippet_RegisterIExceptionHandler" highlight="7,13"::: (complete source file; reference: \~/fundamentals/error-handling/samples/8.x/ErrorHandlingSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/8.x/ErrorHandlingSample/Program.cs.md)

### Configure `UseExceptionHandler` when using `IExceptionHandler`

The exception handling middleware requires a fallback for exceptions that no `IExceptionHandler` handles. If none is configured, calling `app.UseExceptionHandler()` with no arguments throws at startup:

`System.InvalidOperationException: An error occurred when configuring the exception handler middleware. Either the 'ExceptionHandlingPath' or the 'ExceptionHandler' property must be set in 'UseExceptionHandler()'.`

Use any one of the following to satisfy the requirement:

* Specify an error path: `app.UseExceptionHandler("/Error");`
* Enable problem details: call `builder.Services.AddProblemDetails();` and then `app.UseExceptionHandler();`
* Supply a fallback handler: `app.UseExceptionHandler(exceptionHandlerApp => { ... });`

The `IExceptionHandler` implementations still run first in all of these cases. The configured path, problem details response, or fallback handler is used only when every `TryHandleAsync` returns `false`.

If an `IExceptionHandler` returns `true` without writing a response or setting a status code, the response ends up as `404 Not Found` and the middleware logs:

`The exception handler configured on ExceptionHandlerOptions produced a 404 status response.`

An `IExceptionHandler` that returns `true` should write the complete response, including the status code. For example, set `httpContext.Response.StatusCode` and write the body, or call `IProblemDetailsService.TryWriteAsync`. If a 404 response is intentional, set [Microsoft.AspNetCore.Builder.ExceptionHandlerOptions.AllowStatusCode404Response](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerOptions.AllowStatusCode404Response) to `true`.

When the preceding code runs in the `Development` environment:

* The `CustomExceptionHandler` is called first to handle an exception.
* After logging the exception, the `TryHandleAsync` method returns `false`, so the [developer exception page](#developer-exception-page) is shown.

In other environments:

* The `CustomExceptionHandler` is called first to handle an exception.
* After logging the exception, the `TryHandleAsync` method returns `false`, so the [`/Error` page](#exception-handler-page) is shown.

If `TryHandleAsync` returns `true` instead:

* The remaining `IExceptionHandler` implementations aren't called.
* The exception handler page, path, or lambda configured on `UseExceptionHandler` isn't used. The handler is responsible for writing the entire response.

<!-- links to this in other docs require sestatuscodepages -->
<a name="sestatuscodepages"></a>

## UseStatusCodePages

By default, an ASP.NET Core app doesn't provide a status code page for HTTP error status codes, such as *404 - Not Found*. When the app sets an HTTP 400-599 error status code that doesn't have a body, it returns the status code and an empty response body. To enable default text-only handlers for common error status codes, call [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%252A) in `Program.cs`:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_UseStatusCodePages" highlight="9"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

Call `UseStatusCodePages` before request handling middleware. For example, call `UseStatusCodePages` before the static file middleware and the endpoints middleware.

When `UseStatusCodePages` isn't used, navigating to a URL without an endpoint returns a browser-dependent error message indicating the endpoint can't be found. When `UseStatusCodePages` is called, the browser returns the following response:

```console
Status Code: 404; Not Found
```

`UseStatusCodePages` isn't typically used in production because it returns a message that isn't useful to users.

> **Note:**
> The status code pages middleware does **not** catch exceptions. To provide a custom error handling page, use the [exception handler page](#exception-handler-page).

### UseStatusCodePages with format string

To customize the response content type and text, use the overload of [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%252A) that takes a content type and format string:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_UseStatusCodePagesContent" highlight="10"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

In the preceding code, `{0}` is a placeholder for the error code.

`UseStatusCodePages` with a format string isn't typically used in production because it returns a message that isn't useful to users.

### UseStatusCodePages with lambda

To specify custom error-handling and response-writing code, use the overload of [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%252A) that takes a lambda expression:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_UseStatusCodePagesInline" highlight="9-16"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

`UseStatusCodePages` with a lambda isn't typically used in production because it returns a message that isn't useful to users.

### UseStatusCodePagesWithRedirects

The [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithRedirects%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithRedirects%252A) extension method:

* Sends a [302 - Found](https://developer.mozilla.org/docs/Web/HTTP/Status/302) status code to the client.
* Redirects the client to the error handling endpoint provided in the URL template. The error handling endpoint typically displays error information and returns HTTP 200.

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_UseStatusCodePagesRedirect" highlight="9"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

The URL template can include a `{0}` placeholder for the status code, as shown in the preceding code. If the URL template starts with `~` (tilde), the `~` is replaced by the app's `PathBase`. When specifying an endpoint in the app, create an MVC view or Razor page for the endpoint.

This method is commonly used when the app:

* Should redirect the client to a different endpoint, usually in cases where a different app processes the error. For web apps, the client's browser address bar reflects the redirected endpoint.
* Shouldn't preserve and return the original status code with the initial redirect response.

### UseStatusCodePagesWithReExecute

The [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%252A) extension method:

* Generates the response body by re-executing the request pipeline using an alternate path.
* Does not alter the status code before or after re-executing the pipeline.

The new pipeline execution may alter the response's status code, as the new pipeline has full control of the status code. If the new pipeline does not alter the status code, the original status code will be sent to the client.

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_UseStatusCodePagesReExecute" highlight="9"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

If an endpoint within the app is specified, create an MVC view or Razor page for the endpoint.

This method is commonly used when the app should:

* Process the request without redirecting to a different endpoint. For web apps, the client's browser address bar reflects the originally requested endpoint.
* Preserve and return the original status code with the response.

The URL template must start with `/` and may include a placeholder `{0}` for the status code. To pass the status code as a query-string parameter, pass a second argument into `UseStatusCodePagesWithReExecute`. For example:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_UseStatusCodePagesReExecuteQueryString"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

The endpoint that processes the error can get the original URL that generated the error, as shown in the following example:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Pages/StatusCode.cshtml.cs" id="snippet_Class" highlight="12-21"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Pages/StatusCode.cshtml.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Pages/StatusCode.cshtml.cs.md)

Since this middleware can re-execute the request pipeline:

* Middlewares need to handle reentrancy with the same request. This normally means either cleaning up their state after calling `_next` or caching their processing on the `HttpContext` to avoid redoing it. When dealing with the request body, this either means buffering or caching the results like the Form reader.
* Scoped services remain the same.

## Disable status code pages

To disable status code pages for an MVC controller or action method, use the [\[SkipStatusCodePages\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.SkipStatusCodePagesAttribute) attribute.

To disable status code pages for specific requests in a Razor Pages handler method or in an MVC controller, use [Microsoft.AspNetCore.Diagnostics.IStatusCodePagesFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IStatusCodePagesFeature):

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Pages/Index.cshtml.cs" id="snippet_OnGet"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Pages/Index.cshtml.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Pages/Index.cshtml.cs.md)

## Exception-handling code

Code in exception handling pages can also throw exceptions. Production error pages should be tested thoroughly and take extra care to avoid throwing exceptions of their own.

### Response headers

Once the headers for a response are sent:

* The app can't change the response's status code.
* Any exception pages or handlers can't run. The response must be completed or the connection aborted.

## Server exception handling

In addition to the exception handling logic in an app, the [HTTP server implementation](../../servers/index.md) can handle some exceptions. If the server catches an exception before response headers are sent, the server sends a `500 - Internal Server Error` response without a response body. If the server catches an exception after response headers are sent, the server closes the connection. Requests that aren't handled by the app are handled by the server. Any exception that occurs when the server is handling the request is handled by the server's exception handling. The app's custom error pages, exception handling middleware, and filters don't affect this behavior.

## Startup exception handling

Only the hosting layer can handle exceptions that take place during app startup. The host can be configured to [capture startup errors](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23capture-startup-errors) and [capture detailed errors](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23detailed-errors).

The hosting layer can show an error page for a captured startup error only if the error occurs after host address/port binding. If binding fails:

* The hosting layer logs a critical exception.
* The dotnet process crashes.
* No error page is displayed when the HTTP server is [Kestrel](../../servers/kestrel.md).

When running on [IIS](https://learn.microsoft.com/iis) (or Azure App Service) or [IIS Express](https://learn.microsoft.com/iis/extensions/introduction-to-iis-express/iis-express-overview), a *502.5 - Process Failure* is returned by the [ASP.NET Core Module](../../../host-and-deploy/aspnet-core-module.md) if the process can't start. For more information, see [test/troubleshoot-azure-iis](../../../test/troubleshoot-azure-iis.md).

## Database error page

The Database developer page exception filter [Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%252A) captures database-related exceptions that can be resolved by using Entity Framework Core migrations. When these exceptions occur, an HTML response is generated with details of possible actions to resolve the issue. This page is enabled only in the `Development` environment. The following code adds the Database developer page exception filter:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Program.cs" id="snippet_AddDatabaseDeveloperPageExceptionFilter" highlight="3"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Program.cs.md)

## Exception filters

In MVC apps, exception filters can be configured globally or on a per-controller or per-action basis. In Razor Pages apps, they can be configured globally or per page model. These filters handle any unhandled exceptions that occur during the execution of a controller action or another filter. For more information, see [mvc/controllers/filters#exception-filters](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23exception-filters).

Exception filters are useful for trapping exceptions that occur within MVC actions, but they're not as flexible as the built-in [exception handling middleware](https://github.com/dotnet/aspnetcore/blob/main/src/Middleware/Diagnostics/src/ExceptionHandler/ExceptionHandlerMiddleware.cs), [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A). We recommend using `UseExceptionHandler`, unless you need to perform error handling differently based on which MVC action is chosen.

## Model state errors

For information about how to handle model state errors, see [Model binding](../../../mvc/models/model-binding.md) and [Model validation](../../../mvc/models/validation.md).

<a name="pds7"></a>

## Problem details

[Problem Details](https://www.rfc-editor.org/rfc/rfc7807.html) are not the only response format to describe an HTTP API error, however, they are commonly used to report errors for HTTP APIs.

The problem details service implements the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) interface, which supports creating problem details in ASP.NET Core. The [Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)) extension method on [Microsoft.Extensions.DependencyInjection.IServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceCollection) registers the default `IProblemDetailsService` implementation.

In ASP.NET Core apps, the following middleware generates problem details HTTP responses when `AddProblemDetails` is called, except when the [`Accept` request HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept) doesn't include one of the content types supported by the registered [Microsoft.AspNetCore.Http.IProblemDetailsWriter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsWriter) (default: `application/json`):

* [Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware): Generates a problem details response when a custom handler is not defined.
* [Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware): Generates a problem details response by default.
* [Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware): Generates a problem details response in development when the `Accept` request HTTP header doesn't include `text/html`.


The following code configures the app to generate a problem details response for all HTTP client and server error responses that ***don't have a body content yet***:

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_AddProblemDetails" highlight="1"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

The next section shows how to customize the problem details response body.

<a name="cpd7"></a>

### Customize problem details

The automatic creation of a `ProblemDetails` can be customized using any of the following options:

1. Use [`ProblemDetailsOptions.CustomizeProblemDetails`](#customizeproblemdetails-operation)
2. Use a custom [`IProblemDetailsWriter`](#custom-iproblemdetailswriter)
3. Call the [`IProblemDetailsService` in a middleware](#problem-details-from-middleware)

#### `CustomizeProblemDetails` operation

The generated problem details can be customized using [Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails), and the customizations are applied to all auto-generated problem details.

The following code uses [Microsoft.AspNetCore.Http.ProblemDetailsOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsOptions) to set [Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails):

[language="csharp" source="\~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs" id="snippet_CustomizeProblemDetails" highlight="1-3"::: (complete source file; reference: \~/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Snippets/Program.cs.md)

For example, an [`HTTP Status 400 Bad Request`](https://developer.mozilla.org/docs/Web/HTTP/Status/400) endpoint result produces the following problem details response body:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "Bad Request",
  "status": 400,
  "nodeId": "my-machine-name"
}
```

#### Custom `IProblemDetailsWriter`

An [Microsoft.AspNetCore.Http.IProblemDetailsWriter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsWriter) implementation can be created for advanced customizations.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/SampleProblemDetailsWriter.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling/includes/error-handling8.md)

***Note:*** When using a custom `IProblemDetailsWriter`, the custom `IProblemDetailsWriter` must be registered before calling [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A), [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%252A), [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%252A), or [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddMvc%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddMvc%252A):

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling/includes/error-handling8.md)

#### Problem details from Middleware

An alternative approach to using [Microsoft.AspNetCore.Http.ProblemDetailsOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsOptions) with [Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails) is to set the [Microsoft.AspNetCore.Http.ProblemDetailsContext.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsContext.ProblemDetails) in middleware. A problem details response can be written by calling [`IProblemDetailsService.WriteAsync`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.iproblemdetailsservice.writeasync?view=aspnetcore-7.0\&preserve-view=true):

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling/includes/error-handling8.md)

In the preceding code, the Minimal API endpoints `/divide` and `/squareroot` return the expected custom problem response on error input.

The API controller endpoints return the default problem response on error input, not the custom problem response. The default problem response is returned because the API controller has written to the response stream, [Problem details for error status codes](https://learn.microsoft.com/aspnet/core/web-api/#problem-details-for-error-status-codes-1), before [`IProblemDetailsService.WriteAsync`](https://github.com/dotnet/aspnetcore/blob/ce2db7ea0b161fc5eb35710fca6feeafeeac37bc/src/Http/Http.Extensions/src/ProblemDetailsService.cs#L24) is called and the response is **not** written again.

The following `ValuesController` returns [Microsoft.AspNetCore.Mvc.BadRequestResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BadRequestResult), which writes to the response stream and therefore prevents the custom problem response from being returned.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Controllers/ValuesController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling/includes/error-handling8.md)

The following `Values3Controller` returns [`ControllerBase.Problem`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.problem) so the expected custom problem result is returned:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Controllers/ValuesController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling/includes/error-handling8.md)

## Produce a ProblemDetails payload for exceptions

Consider the following app:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling/includes/error-handling8.md)

In non-development environments, when an exception occurs, the following is a standard [ProblemDetails response](https://datatracker.ietf.org/doc/html/rfc7807) that is returned to the client:

```json
{
"type":"https://tools.ietf.org/html/rfc7231#section-6.6.1",
"title":"An error occurred while processing your request.",
"status":500,"traceId":"00-b644<snip>-00"
}
```

For most apps, the preceding code is all that's needed for exceptions. However, the following section shows how to get more detailed problem responses.

An alternative to a [custom exception handler page](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23exception-handler-page) is to provide a lambda to [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A). Using a lambda allows access to the error and writing a problem details response with [`IProblemDetailsService.WriteAsync`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.iproblemdetailsservice.writeasync?view=aspnetcore-7.0\&preserve-view=true):

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling/includes/error-handling8.md)

> **Warning:**
> Do **not** serve sensitive error information to clients. Serving errors is a security risk.

An alternative approach to generate problem details is to use the third-party NuGet package [Hellang.Middleware.ProblemDetails](https://www.nuget.org/packages/Hellang.Middleware.ProblemDetails/) that can be used to map exceptions and client errors to problem details.

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/error-handling/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [test/troubleshoot-azure-iis](../../../test/troubleshoot-azure-iis.md)
* [host-and-deploy/azure-iis-errors-reference](../../../host-and-deploy/azure-iis-errors-reference.md)
* [fundamentals/error-handling-api](../../error-handling-api.md)
* [fundamentals/error-handling-api](../../error-handling-api.md).
