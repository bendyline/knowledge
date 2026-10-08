---
title: Handle errors in ASP.NET Core APIs
author: brunolins16
description: Learn about error handling in ASP.NET Core APIs with Minimal APIs and controller-based approaches.
ai-usage: ai-assisted
ms.author: wpickett
monikerRange: '>= aspnetcore-7.0'
ms.date: 03/04/2026
uid: fundamentals/error-handling-api
---

# Handle errors in ASP.NET Core APIs

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


#### [Minimal APIs](#tab/minimal-apis)

This article describes how to handle errors in ASP.NET Core APIs. Documentation for Minimal APIs is selected. To see documentation for controller-based APIs, select the **Controllers** tab. For Blazor error handling guidance, see [blazor/fundamentals/handle-errors](../blazor/fundamentals/handle-errors.md).

#### [Controllers](#tab/controllers)

This article describes how to handle errors in ASP.NET Core APIs. Documentation for Controller-based APIs is selected. To see documentation for **Minimal APIs**, select the **Minimal APIs** tab. For Blazor error handling guidance, see [blazor/fundamentals/handle-errors](../blazor/fundamentals/handle-errors.md).

---

## Developer Exception Page

The *Developer Exception Page* displays detailed information about unhandled request exceptions. It uses [Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware) to capture synchronous and asynchronous exceptions from the HTTP pipeline and to generate error responses. The developer exception page runs early in the middleware pipeline, so that it can catch unhandled exceptions thrown in middleware that follows.

ASP.NET Core apps enable the developer exception page by default when both:

* Running in the [`Development` environment](environments.md).
* The app was created with the current templates, that is, by using [Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder%252A).

Apps created using earlier templates, that is, by using [Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%252A), can enable the developer exception page by calling [`app.UseDeveloperExceptionPage`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage\(Microsoft.AspNetCore.Builder.IApplicationBuilder\)).

> **Warning:**
> Don't enable the Developer Exception Page **unless the app is running in the `Development` environment**. Don't share detailed exception information publicly when the app runs in production. For more information on configuring environments, see [fundamentals/environments](environments.md).

The Developer Exception Page can include the following information about the exception and the request:

* Stack trace
* Query string parameters, if any
* Cookies, if any
* Headers
* Endpoint metadata, if any

The Developer Exception Page isn't guaranteed to provide any information. Use [Logging](logging/index.md) for complete error information.

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


#### [Minimal APIs](#tab/minimal-apis)

To see the Developer Exception Page in a Minimal API:

* Run the sample app in the [`Development` environment](environments.md).
* Go to the `/exception` endpoint.

This section refers to the following sample app to demonstrate ways to handle exceptions in a Minimal API. It throws an exception when the endpoint `/exception` is requested:

[language="csharp" source="\~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs" id="snippet_ThrowExceptions" highlight="4-7"::: (complete source file; reference: \~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/handle-errors/sample8/Program.cs.md)

#### [Controllers](#tab/controllers)

To see the Developer Exception Page in a controller-based API:

* Add the following controller action to a controller-based API. The action throws an exception when the endpoint is requested.

  [language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Controllers/ErrorsController.cs" id="snippet_Throw"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Controllers/ErrorsController.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Controllers/ErrorsController.cs.md)

* Run the app in the [development environment](environments.md).
* Go to the endpoint defined by the controller action.

---

## Exception handler

In non-development environments, use the [exception handler middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23exception-handler-page) to produce an error payload.

#### [Minimal APIs](#tab/minimal-apis)

To configure the `exception handler middleware`, call [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A). For example, the following code changes the app to respond with an [RFC 7807](https://tools.ietf.org/html/rfc7807)-compliant payload to the client. For more information, see the [Problem Details](#problem-details) section later in this article.

[language="csharp" source="\~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs" id="snippet_WithUseExceptionHandler" highlight="4-7"::: (complete source file; reference: \~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/handle-errors/sample8/Program.cs.md)

#### [Controllers](#tab/controllers)

1. In `Program.cs`, call [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A) to add the exception handling middleware:

    [language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Program.cs" id="snippet_Middleware" highlight="7"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Program.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Program.cs.md)

1. Configure a controller action to respond to the `/error` route:

    [language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Controllers/ErrorsController.cs" id="snippet_HandleError"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Controllers/ErrorsController.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Controllers/ErrorsController.cs.md)

The preceding `HandleError` action sends an [RFC 7807](https://tools.ietf.org/html/rfc7807)-compliant payload to the client.

> **Warning:**
> Don't mark the error handler action method with HTTP method attributes, such as `HttpGet`. Explicit verbs prevent some requests from reaching the action method.
>
> For web APIs that use [Swagger / OpenAPI](../tutorials/web-api-help-pages-using-swagger.md), mark the error handler action with the [\[ApiExplorerSettings\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorerSettingsAttribute) attribute and set its [Microsoft.AspNetCore.Mvc.ApiExplorerSettingsAttribute.IgnoreApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorerSettingsAttribute.IgnoreApi%252A) property to `true`. This attribute configuration excludes the error handler action from the app's OpenAPI specification:
>
> ```csharp
> [ApiExplorerSettings(IgnoreApi = true)]
> ```
>
> Allow anonymous access to the method if unauthenticated users should see the error.

---

## Client and Server error responses

#### [Minimal APIs](#tab/minimal-apis)

Consider the following Minimal API app.

[language="csharp" source="\~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs" id="snippet_ClientAndServerErrorResponses"::: (complete source file; reference: \~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/handle-errors/sample8/Program.cs.md)

The `/users` endpoint produces `200 OK` with a `json` representation of `User` when `id` is greater than `0`, otherwise a `400 BAD REQUEST` status code without a response body. For more information about creating a response, see [Create responses in Minimal API apps](https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/responses).

The [`Status Code Pages middleware`](#client-and-server-error-responses) can be configured to produce a common body content, **when empty**, for all HTTP client (`400`-`499`) or server (`500` -`599`) responses. The middleware is configured by calling the 
[UseStatusCodePages](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/\[Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%2A]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages%252A\)) extension method.

For example, the following example changes the app to respond with an [RFC 7807](https://tools.ietf.org/html/rfc7807)-compliant payload to the client for all client and server responses, including routing errors (for example, `404 NOT FOUND`). For more information, see the [Problem Details](#problem-details) section.

[language="csharp" source="\~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs" id="snippet_ClientAndServerErrorResponsesWithUseStatusCodePages" highlight="4-7"::: (complete source file; reference: \~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/handle-errors/sample8/Program.cs.md)

#### [Controllers](#tab/controllers)

For controller-based APIs, the error response can be configured in one of the following ways:

1. Use the [problem details service](#problem-details-service)
1. [Implement ProblemDetailsFactory](#implement-problemdetailsfactory)
1. [Use ApiBehaviorOptions.ClientErrorMapping](#use-apibehavioroptionsclienterrormapping)

An *error result* is defined as a result with an HTTP status code of 400 or higher. For web API controllers, MVC transforms an error result to produce a [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails).

The automatic creation of a `ProblemDetails` for error status codes is enabled by default.

---

## Problem details

[Problem Details](https://www.rfc-editor.org/rfc/rfc7807.html) are not the only response format to describe an HTTP API error, however, they are commonly used to report errors for HTTP APIs.

The problem details service implements the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) interface, which supports creating problem details in ASP.NET Core. The [Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)) extension method on [Microsoft.Extensions.DependencyInjection.IServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceCollection) registers the default `IProblemDetailsService` implementation.

In ASP.NET Core apps, the following middleware generates problem details HTTP responses when `AddProblemDetails` is called, except when the [`Accept` request HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept) doesn't include one of the content types supported by the registered [Microsoft.AspNetCore.Http.IProblemDetailsWriter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsWriter) (default: `application/json`):

* [Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware): Generates a problem details response when a custom handler is not defined.
* [Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware): Generates a problem details response by default.
* [Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware): Generates a problem details response in development when the `Accept` request HTTP header doesn't include `text/html`.


#### [Minimal APIs](#tab/minimal-apis)

Minimal API apps can be configured to generate problem details response for all HTTP client and server error responses that ***don't have body content yet*** by using the `AddProblemDetails` extension method.

The following code configures the app to generate problem details:

[language="csharp" source="\~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs" id="snippet_ProblemDetails" highlight="2"::: (complete source file; reference: \~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/handle-errors/sample8/Program.cs.md)

For more information on using `AddProblemDetails`, see [Problem Details](#problem-details)

### IProblemDetailsService fallback

In the following code, `httpContext.Response.WriteAsync("Fallback: An error occurred.")` returns an error if the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService) implementation isn't able to generate a [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails):

[language="csharp" source="\~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs" id="snippet_IProblemDetailsServiceWithExceptionFallback" highlight="15"::: (complete source file; reference: \~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/handle-errors/sample8/Program.cs.md)

The preceding code:

* Writes an error message with the fallback code if the `problemDetailsService` is unable to write a `ProblemDetails`. For example, an endpoint where the [Accept request header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept) specifies a media type that the `DefaultProblemDetailsWriter` does not support.
* Uses the [exception handler middleware](#exception-handler).

> **Note:**
> The `DefaultProblemDetailsWriter` supports the following media types in the `Accept` request header:
>
> * `application/json`
> * `application/problem+json`
> * Wildcard types such as `*/*` and `application/*`
>
> Non-JSON media types, such as `application/xml` or `text/html`, are **not** supported and trigger the fallback behavior.

The following sample is similar to the preceding except that it calls the [`Status Code Pages middleware`](#client-and-server-error-responses).

[language="csharp" source="\~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs" id="snippet_IProblemDetailsServiceWithStatusCodePageFallback" highlight="15"::: (complete source file; reference: \~/fundamentals/minimal-apis/handle-errors/sample8/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/handle-errors/sample8/Program.cs.md)

#### [Controllers](#tab/controllers)

### Problem details service

ASP.NET Core supports creating [Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457) using the [Microsoft.AspNetCore.Http.IProblemDetailsService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IProblemDetailsService).

The following code configures the app to generate a problem details response for all HTTP client and server error responses that ***don't have body content yet***:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling-api.md)

Consider the API controller from the preceding section, which returns [Microsoft.AspNetCore.Http.HttpResults.BadRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.BadRequest) when the input is invalid:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Controllers/ValuesController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling-api.md)

A problem details response is generated with the preceding code when any of the following conditions apply:

* An invalid input is supplied.
* The URI has no matching endpoint.
* An unhandled exception occurs.

#### Customize problem details with `CustomizeProblemDetails`

The following code uses [Microsoft.AspNetCore.Http.ProblemDetailsOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsOptions) to set [Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails):

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling-api.md)

### Implement `ProblemDetailsFactory`

MVC uses [Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory) to produce all instances of [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails) and [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails). This factory is used for:

* Client error responses
* Validation failure error responses
* [Microsoft.AspNetCore.Mvc.ControllerBase.Problem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Problem%252A) and [Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%252A)

To customize the problem details response, register a custom implementation of [Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory) in `Program.cs`:

[language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs" id="snippet_ReplaceProblemDetailsFactory"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs.md)

### Use `ApiBehaviorOptions.ClientErrorMapping`

Use the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.ClientErrorMapping%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.ClientErrorMapping%252A) property to configure the contents of the `ProblemDetails` response. For example, the following code in `Program.cs` updates the [Microsoft.AspNetCore.Mvc.ClientErrorData.Link%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ClientErrorData.Link%252A) property for 404 responses:

[language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs" id="snippet_ClientErrorMapping"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs.md)

---

## Additional error handling features

#### [Minimal APIs](#tab/minimal-apis)

### Migration from controllers to Minimal APIs

If you're migrating from controller-based APIs to Minimal APIs:

1. **Replace action filters** with endpoint filters or middleware
2. **Replace model validation** with manual validation or custom binding
3. **Replace exception filters** with exception handling middleware
4. **Configure problem details** using `AddProblemDetails()` for consistent error responses

### When to use controller-based error handling

Consider controller-based APIs if you need:

* Complex model validation scenarios
* Centralized exception handling across multiple controllers
* Fine-grained control over error response formatting
* Integration with MVC features like filters and conventions

For detailed information about controller-based error handling, including validation errors, problem details customization, and exception filters, see the [Controllers](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/error-handling-api.md?tabs=controllers) tab sections.

#### [Controllers](#tab/controllers)

### Validation failure error response

For web API controllers, MVC responds with a [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) response type when model validation fails. MVC uses the results of [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory) to construct the error response for a validation failure. The following example replaces the default factory with an implementation that also supports formatting responses as XML, in `Program.cs`:

[language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs" id="snippet_ConfigureInvalidModelStateResponseFactory"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs.md)

### Use exceptions to modify the response

The contents of the response can be modified from outside of the controller using a custom exception and an action filter:

1. Create a well-known exception type named `HttpResponseException`:

    [language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/HttpResponseException.cs" id="snippet_Class"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/HttpResponseException.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/HttpResponseException.cs.md)

1. Create an action filter named `HttpResponseExceptionFilter`:

    [language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/HttpResponseExceptionFilter.cs" id="snippet_Class"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/HttpResponseExceptionFilter.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/HttpResponseExceptionFilter.cs.md)

    The preceding filter specifies an `Order` of the maximum integer value minus 10. This `Order` allows other filters to run at the end of the pipeline.

1. In `Program.cs`, add the action filter to the filters collection:

    [language="csharp" source="\~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs" id="snippet_AddHttpResponseExceptionFilter"::: (complete source file; reference: \~/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs)](../../_code/aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/Program.cs.md)

### Key differences for controllers

* **Automatic model validation**: Controllers automatically validate model state and return `400 Bad Request` responses for validation failures
* **Exception filters**: Use action filters and exception filters for centralized error handling
* **Built-in problem details**: Configure `ApiBehaviorOptions` for standardized error responses
* **Custom error responses**: Override `InvalidModelStateResponseFactory` for custom validation error formatting

---

## Additional resources

* [How to Use ModelState Validation in ASP.NET Core Web API](https://code-maze.com/aspnetcore-modelstate-validation-web-api/)
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/middleware/problem-details-service)
* [Hellang.Middleware.ProblemDetails](https://www.nuget.org/packages/Hellang.Middleware.ProblemDetails/)
