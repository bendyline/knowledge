---
title: Format response data in ASP.NET Core Web API
ai-usage: ai-assisted
author: tdykstra
description: Learn how to format response data in ASP.NET Core Web API.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 03/22/2026
uid: web-api/advanced/formatting
---
# Format response data in ASP.NET Core Web API

<!--

This topic includes 7.0-versioned content at the end of the file.
Remove this comment and rotate the 7.0 content to the top at 7.0 GA.

-->

**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

ASP.NET Core MVC supports formatting response data, using specified formats or in response to a client's request.

## Format-specific Action Results

Some action result types are specific to a particular format, such as [Microsoft.AspNetCore.Mvc.JsonResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonResult) and [Microsoft.AspNetCore.Mvc.ContentResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ContentResult). Actions can return results that always use a specified format, ignoring a client's request for a different format. For example, returning `JsonResult` returns JSON-formatted data and returning `ContentResult` returns plain-text-formatted string data.

An action isn't required to return any specific type. ASP.NET Core supports any object return value. Results from actions that return objects that aren't [Microsoft.AspNetCore.Mvc.IActionResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.IActionResult) types are serialized using the appropriate [Microsoft.AspNetCore.Mvc.Formatters.IOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.IOutputFormatter) implementation. For more information, see [web-api/action-return-types](../action-return-types.md).

By default, the built-in helper method [Microsoft.AspNetCore.Mvc.ControllerBase.Ok%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Ok%252A) returns JSON-formatted data:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_Get"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

The sample code returns a list of todo items. Using the F12 browser developer tools or [http-repl](../http-repl/index.md) with the previous code displays:

* The response header containing **content-type:** `application/json; charset=utf-8`.
* The request headers. For example, the `Accept` header. The `Accept` header is ignored by the preceding code.

To return plain text formatted data, use [Microsoft.AspNetCore.Mvc.ContentResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ContentResult) and the [Microsoft.AspNetCore.Mvc.ControllerBase.Content%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Content%252A) helper:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_GetVersion"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

In the preceding code, the `Content-Type` returned is `text/plain`.

For actions with multiple return types, return `IActionResult`. For example, when returning different HTTP status codes based on the result of the operation.

## Content negotiation

Content negotiation occurs when the client specifies an [Accept header](https://www.rfc-editor.org/rfc/rfc9110#field.accept). The default format used by ASP.NET Core is [JSON](https://json.org/). Content negotiation is:

* Implemented by [Microsoft.AspNetCore.Mvc.ObjectResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ObjectResult).
* Built into the status code-specific action results returned from the helper methods. The action results helper methods are based on `ObjectResult`.

When a model type is returned, the return type is `ObjectResult`.

The following action method uses the `Ok` and `NotFound` helper methods:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_GetById" highlight="8,11"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

By default, ASP.NET Core supports the following media types:

* `application/json`
* `text/json`
* `text/plain`

Tools such as [Fiddler](https://www.telerik.com/fiddler) or curl can set the `Accept` request header to specify the return format. When the `Accept` header contains a type the server supports, that type is returned. The next section shows how to add additional formatters.

Controller actions can return POCOs (Plain Old CLR Objects). When a POCO is returned, the runtime automatically creates an `ObjectResult` that wraps the object. The client gets the formatted serialized object. If the object being returned is `null`, a `204 No Content` response is returned.

The following example returns an object type:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_GetById"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

In the preceding code, a request for a valid todo item returns a `200 OK` response. A request for an invalid todo item returns a `204 No Content` response.

### The Accept header

Content *negotiation* takes place when an `Accept` header appears in the request. When a request contains an accept header, ASP.NET Core:

* Enumerates the media types in the accept header in preference order.
* Tries to find a formatter that can produce a response in one of the formats specified.

If no formatter is found that can satisfy the client's request, ASP.NET Core:

* Returns `406 Not Acceptable` if [Microsoft.AspNetCore.Mvc.MvcOptions.ReturnHttpNotAcceptable](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.ReturnHttpNotAcceptable) is set to `true`, or -
* Tries to find the first formatter that can produce a response.

If no formatter is configured for the requested format, the first formatter that can format the object is used. If no `Accept` header appears in the request:

* The first formatter that can handle the object is used to serialize the response.
* There isn't any negotiation taking place. The server is determining what format to return.

If the Accept header contains `*/*`, the Header is ignored unless `RespectBrowserAcceptHeader` is set to true on [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions).

### Browsers and content negotiation

Unlike typical API clients, web browsers supply `Accept` headers. Web browsers specify many formats, including wildcards. By default, when the framework detects that the request is coming from a browser:

* The `Accept` header is ignored.
* The content is returned using the first registered output formatter that can handle the response type, unless otherwise configured.

This approach provides a more consistent experience across browsers when consuming APIs.

To configure an app to respect browser accept headers, set the [Microsoft.AspNetCore.Mvc.MvcOptions.RespectBrowserAcceptHeader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.RespectBrowserAcceptHeader) property to `true`:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_RespectBrowserAcceptHeader" highlight="5"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs.md)

### Configure formatters

Apps that need to support extra formats can add the appropriate NuGet packages and configure support. There are separate formatters for input and output. Input formatters are used by [Model Binding](../../mvc/models/model-binding.md). Output formatters are used to format responses. For information on creating a custom formatter, see [Custom Formatters](custom-formatters.md).

### Add XML format support

To configure XML formatters implemented using [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer), call [Microsoft.Extensions.DependencyInjection.MvcXmlMvcBuilderExtensions.AddXmlSerializerFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcXmlMvcBuilderExtensions.AddXmlSerializerFormatters%252A):

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_AddXmlSerializerFormatters" highlight="4"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs.md)

When using the preceding code, controller methods return the appropriate format based on the request's `Accept` header.

### Configure `System.Text.Json`-based formatters

To configure features for the `System.Text.Json`-based formatters, use [Microsoft.AspNetCore.Mvc.JsonOptions.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonOptions.JsonSerializerOptions). The following highlighted code configures PascalCase formatting instead of the default camelCase formatting:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_JsonSerializerOptions" highlight="4-7"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs.md)

The following action method calls [Microsoft.AspNetCore.Mvc.ControllerBase.Problem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Problem%252A) to create a [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails) response:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_GetError" highlight="3"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

A `ProblemDetails` response is always camelCase, even when the app sets the format to PascalCase. `ProblemDetails` follows [RFC 7807](https://tools.ietf.org/html/rfc7807#appendix-A), which specifies lowercase.

To configure output serialization options for specific actions, use `JsonResult`. For example:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_Get"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

### Add `Newtonsoft.Json`-based JSON format support

The default JSON formatters use `System.Text.Json`. To use the `Newtonsoft.Json`-based formatters, install the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package and configure it in `Program.cs`:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_AddNewtonsoftJson" highlight="4"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs.md)

In the preceding code, the call to `AddNewtonsoftJson` configures the following Web API, MVC, and Razor Pages features to use `Newtonsoft.Json`:

* Input and output formatters that read and write JSON
* [Microsoft.AspNetCore.Mvc.JsonResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonResult)
* [JSON Patch](../jsonpatch.md)
* [Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper)
* [TempData](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata)

Some features may not work well with `System.Text.Json`-based formatters and require a reference to the `Newtonsoft.Json`-based formatters. Continue using the `Newtonsoft.Json`-based formatters when the app:

* Uses `Newtonsoft.Json` attributes. For example, `[JsonProperty]` or `[JsonIgnore]`.
* Customizes the serialization settings.
* Relies on features that `Newtonsoft.Json` provides.

To configure features for the `Newtonsoft.Json`-based formatters, use [Microsoft.AspNetCore.Mvc.MvcNewtonsoftJsonOptions.SerializerSettings%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcNewtonsoftJsonOptions.SerializerSettings%252A):

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_AddNewtonsoftJsonSerializerSettings" highlight="4"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs.md)

To configure output serialization options for specific actions, use `JsonResult`. For example:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_GetNewtonsoftJson"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

### Specify a format

To restrict the response formats, apply the [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) filter. Like most [Filters](../../mvc/controllers/filters.md), `[Produces]` can be applied at the action, controller, or global scope:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_ClassDeclaration" highlight="3"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

The preceding [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) filter:

* Forces all actions within the controller to return JSON-formatted responses for POCOs (Plain Old CLR Objects) or [Microsoft.AspNetCore.Mvc.ObjectResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ObjectResult) and its derived types.
* Return JSON-formatted responses even if other formatters are configured and the client specifies a different format.

For more information, see [Filters](../../mvc/controllers/filters.md).

### Special case formatters

Some special cases are implemented using built-in formatters. By default, `string` return types are formatted as *text/plain* (*text/html* if requested via the `Accept` header). This behavior can be deleted by removing the [Microsoft.AspNetCore.Mvc.Formatters.StringOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.StringOutputFormatter). Formatters are removed in `Program.cs`. Actions that have a model object return type return `204 No Content` when returning `null`. This behavior can be deleted by removing the [Microsoft.AspNetCore.Mvc.Formatters.HttpNoContentOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.HttpNoContentOutputFormatter). The following code removes the `StringOutputFormatter` and `HttpNoContentOutputFormatter`.

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_RemoveOutputFormatters" highlight="6-7"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Program.cs.md)

Without the `StringOutputFormatter`, the built-in JSON formatter formats `string` return types. If the built-in JSON formatter is removed and an XML formatter is available, the XML formatter formats `string` return types. Otherwise, `string` return types return `406 Not Acceptable`.

Without the `HttpNoContentOutputFormatter`, null objects are formatted using the configured formatter. For example:

* The JSON formatter returns a response with a body of `null`.
* The XML formatter returns an empty XML element with the attribute `xsi:nil="true"` set.

## Response format URL mappings

Clients can request a particular format as part of the URL, for example:

* In the query string or part of the path.
* By using a format-specific file extension such as .xml or .json.

The mapping from request path should be specified in the route the API is using. For example:

[language="csharp" source="formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/FormatFilter/TodoItemsController.cs" id="snippet_ClassGet" highlight="3,11"::: (complete source file; reference: formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/FormatFilter/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/6.x/ResponseFormattingSample/Snippets/Controllers/FormatFilter/TodoItemsController.cs.md)

The preceding route allows the requested format to be specified using an optional file extension. The [`[FormatFilter]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FormatFilterAttribute) attribute checks for the existence of the format value in the `RouteData` and maps the response format to the appropriate formatter when the response is created.

| Route | Formatter |
| --- | --- |
| `/api/todoitems/5` | The default output formatter |
| `/api/todoitems/5.json` | The JSON formatter (if configured) |
| `/api/todoitems/5.xml` | The XML formatter (if configured) |

## Polymorphic deserialization

Built-in features provide a limited range of polymorphic serialization but no support for deserialization at all. Deserialization requires a custom converter. See [Polymorphic deserialization](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-converters-how-to?pivots=dotnet-6-0#support-polymorphic-deserialization) for a complete sample of polymorphic deserialization.

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/formatting/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))



**Applies to: < aspnetcore-6.0**

ASP.NET Core MVC has support for formatting response data. Response data can be formatted using specific formats or in response to client requested format.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/formatting/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Format-specific Action Results

Some action result types are specific to a particular format, such as [Microsoft.AspNetCore.Mvc.JsonResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonResult) and [Microsoft.AspNetCore.Mvc.ContentResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ContentResult). Actions can return results that are formatted in a particular format, regardless of client preferences. For example, returning `JsonResult` returns JSON-formatted data. Returning `ContentResult` or a string returns plain-text-formatted string data.

An action isn't required to return any specific type. ASP.NET Core supports any object return value. Results from actions that return objects that aren't [Microsoft.AspNetCore.Mvc.IActionResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.IActionResult) types are serialized using the appropriate [Microsoft.AspNetCore.Mvc.Formatters.IOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.IOutputFormatter) implementation. For more information, see [web-api/action-return-types](../action-return-types.md).

The built-in helper method [Microsoft.AspNetCore.Mvc.ControllerBase.Ok%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Ok%252A) returns JSON-formatted data:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs" id="snippet_get"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs.md)

The sample download returns the list of authors. Using the F12 browser developer tools or [http-repl](../http-repl/index.md) with the previous code:

* The response header containing **content-type:** `application/json; charset=utf-8` is displayed.
* The request headers are displayed. For example, the `Accept` header. The `Accept` header is ignored by the preceding code.

To return plain text formatted data, use [Microsoft.AspNetCore.Mvc.ContentResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ContentResult) and the [Microsoft.AspNetCore.Mvc.ControllerBase.Content%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Content%252A) helper:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs" id="snippet_about"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs.md)

In the preceding code, the `Content-Type` returned is `text/plain`. Returning a string delivers `Content-Type` of `text/plain`:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs" id="snippet_string"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs.md)

For actions with multiple return types, return `IActionResult`. For example, returning different HTTP status codes based on the result of operations performed.

## Content negotiation

Content negotiation occurs when the client specifies an [Accept header](https://www.rfc-editor.org/rfc/rfc9110#field.accept). The default format used by ASP.NET Core is [JSON](https://json.org/). Content negotiation is:

* Implemented by [Microsoft.AspNetCore.Mvc.ObjectResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ObjectResult).
* Built into the status code-specific action results returned from the helper methods. The action results helper methods are based on `ObjectResult`.

When a model type is returned, the return type is `ObjectResult`.

The following action method uses the `Ok` and `NotFound` helper methods:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs" id="snippet_search"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs.md)

By default, ASP.NET Core supports `application/json`, `text/json`, and `text/plain` media types. Tools such as [Fiddler](https://www.telerik.com/fiddler) or [http-repl](../http-repl/index.md) can set the `Accept` request header to specify the return format. When the `Accept` header contains a type the server supports, that type is returned. The next section shows how to add additional formatters.

Controller actions can return POCOs (Plain Old CLR Objects). When a POCO is returned, the runtime automatically creates an `ObjectResult` that wraps the object. The client gets the formatted serialized object. If the object being returned is `null`, a `204 No Content` response is returned.

Returning an object type:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs" id="snippet_alias"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/AuthorsController.cs.md)

In the preceding code, a request for a valid author alias returns a `200 OK` response with the author's data. A request for an invalid alias returns a `204 No Content` response.

### The Accept header

Content *negotiation* takes place when an `Accept` header appears in the request. When a request contains an accept header, ASP.NET Core:

* Enumerates the media types in the accept header in preference order.
* Tries to find a formatter that can produce a response in one of the formats specified.

If no formatter is found that can satisfy the client's request, ASP.NET Core:

* Returns `406 Not Acceptable` if [Microsoft.AspNetCore.Mvc.MvcOptions.ReturnHttpNotAcceptable](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.ReturnHttpNotAcceptable) is set to `true`, or -
* Tries to find the first formatter that can produce a response.

If no formatter is configured for the requested format, the first formatter that can format the object is used. If no `Accept` header appears in the request:

* The first formatter that can handle the object is used to serialize the response.
* There isn't any negotiation taking place. The server is determining what format to return.

If the Accept header contains `*/*`, the Header is ignored unless `RespectBrowserAcceptHeader` is set to true on [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions).

### Browsers and content negotiation

Unlike typical API clients, web browsers supply `Accept` headers. Web browsers specify many formats, including wildcards. By default, when the framework detects that the request is coming from a browser:

* The `Accept` header is ignored.
* The content is returned using the first registered output formatter that can handle the response type, unless otherwise configured.

This approach provides a more consistent experience across browsers when consuming APIs.

To configure an app to honor browser accept headers, set
[Microsoft.AspNetCore.Mvc.MvcOptions.RespectBrowserAcceptHeader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.RespectBrowserAcceptHeader) to `true`:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/StartupRespectBrowserAcceptHeader.cs" id="snippet"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/StartupRespectBrowserAcceptHeader.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/StartupRespectBrowserAcceptHeader.cs.md)

### Configure formatters

Apps that need to support additional formats can add the appropriate NuGet packages and configure support. There are separate formatters for input and output. Input formatters are used by [Model Binding](../../mvc/models/model-binding.md). Output formatters are used to format responses. For information on creating a custom formatter, see [Custom Formatters](custom-formatters.md).

### Add XML format support

XML formatters implemented using [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) are configured by calling [Microsoft.Extensions.DependencyInjection.MvcXmlMvcBuilderExtensions.AddXmlSerializerFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcXmlMvcBuilderExtensions.AddXmlSerializerFormatters%252A):

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Startup.cs" id="snippet"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Startup.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Startup.cs.md)

The preceding code serializes results using `XmlSerializer`.

When using the preceding code, controller methods return the appropriate format based on the request's `Accept` header.

### Configure `System.Text.Json` based formatters

Features for the `System.Text.Json` based formatters can be configured using [Microsoft.AspNetCore.Mvc.JsonOptions.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonOptions.JsonSerializerOptions). The default formatting is camelCase. The following highlighted code sets PascalCase formatting:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/StartupPascalCase.cs" id="snippet" highlight="4-5"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/StartupPascalCase.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/StartupPascalCase.cs.md)

The following action method calls [Microsoft.AspNetCore.Mvc.ControllerBase.Problem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Problem%252A) to create a [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails) response:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/WeatherForecastController.cs" id="snippet_Problem" highlight="4"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/WeatherForecastController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/WeatherForecastController.cs.md)

With the preceding code:

* `https://localhost:5001/WeatherForecast/temperature` returns PascalCase.
* `https://localhost:5001/WeatherForecast/error` returns camelCase. The error response is always camelCase, even when the app sets the format to PascalCase. `ProblemDetails` follows [RFC 7807](https://tools.ietf.org/html/rfc7807#appendix-A), which specifies lower case

The following code sets PascalCase and adds a custom converter:

```csharp
services.AddControllers().AddJsonOptions(options =>
{
    // Use the default property (Pascal) casing.
    options.JsonSerializerOptions.PropertyNamingPolicy = null;

    // Configure a custom converter.
    options.JsonSerializerOptions.Converters.Add(new MyCustomJsonConverter());
});
```

Output serialization options, on a per-action basis, can be configured using `JsonResult`. For example:

```csharp
public IActionResult Get()
{
    return Json(model, new JsonSerializerOptions
    {
        WriteIndented = true,
    });
}
```

### Add Newtonsoft.Json-based JSON format support

The default JSON formatters are based on `System.Text.Json`. Support for `Newtonsoft.Json` based formatters and features is available by installing the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package and configuring it in `Startup.ConfigureServices`.

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/StartupNewtonsoftJson.cs" id="snippet"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/StartupNewtonsoftJson.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/StartupNewtonsoftJson.cs.md)

In the preceding code, the call to `AddNewtonsoftJson` configures the following Web API, MVC, and Razor Pages features to use `Newtonsoft.Json`:

* Input and output formatters that read and write JSON
* [Microsoft.AspNetCore.Mvc.JsonResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonResult)
* [JSON Patch](../jsonpatch.md)
* [Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper)
* [TempData](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata)

Some features may not work well with `System.Text.Json`-based formatters and require a reference to the `Newtonsoft.Json`-based formatters. Continue using the `Newtonsoft.Json`-based formatters when the app:

* Uses `Newtonsoft.Json` attributes. For example, `[JsonProperty]` or `[JsonIgnore]`.
* Customizes the serialization settings.
* Relies on features that `Newtonsoft.Json` provides.

Features for the `Newtonsoft.Json`-based formatters can be configured using `Microsoft.AspNetCore.Mvc.MvcNewtonsoftJsonOptions.SerializerSettings`:

```csharp
services.AddControllers().AddNewtonsoftJson(options =>
{
    // Use the default property (Pascal) casing
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();

    // Configure a custom converter
    options.SerializerSettings.Converters.Add(new MyCustomJsonConverter());
});
```

Output serialization options, on a per-action basis, can be configured using `JsonResult`. For example:

```csharp
public IActionResult Get()
{
    return Json(model, new JsonSerializerSettings
    {
        Formatting = Formatting.Indented,
    });
}
```

### Specify a format

To restrict the response formats, apply the [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) filter. Like most [Filters](../../mvc/controllers/filters.md), `[Produces]` can be applied at the action, controller, or global scope:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/WeatherForecastController.cs" id="snippet"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/WeatherForecastController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/WeatherForecastController.cs.md)

The preceding [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) filter:

* Forces all actions within the controller to return JSON-formatted responses for POCOs (Plain Old CLR Objects) or [Microsoft.AspNetCore.Mvc.ObjectResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ObjectResult) and its derived types.
* If other formatters are configured and the client specifies a different format, JSON is returned.

For more information, see [Filters](../../mvc/controllers/filters.md).

### Special case formatters

Some special cases are implemented using built-in formatters. By default, `string` return types are formatted as *text/plain* (*text/html* if requested via the `Accept` header). This behavior can be deleted by removing the [Microsoft.AspNetCore.Mvc.Formatters.StringOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.StringOutputFormatter). Formatters are removed in the `ConfigureServices` method. Actions that have a model object return type return `204 No Content` when returning `null`. This behavior can be deleted by removing the [Microsoft.AspNetCore.Mvc.Formatters.HttpNoContentOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.HttpNoContentOutputFormatter). The following code removes the `StringOutputFormatter` and `HttpNoContentOutputFormatter`.

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/StartupStringOutputFormatter.cs" id="snippet"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/StartupStringOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/StartupStringOutputFormatter.cs.md)

Without the `StringOutputFormatter`, the built-in JSON formatter formats `string` return types. If the built-in JSON formatter is removed and an XML formatter is available, the XML formatter formats `string` return types. Otherwise, `string` return types return `406 Not Acceptable`.

Without the `HttpNoContentOutputFormatter`, null objects are formatted using the configured formatter. For example:

* The JSON formatter returns a response with a body of `null`.
* The XML formatter returns an empty XML element with the attribute `xsi:nil="true"` set.

## Response format URL mappings

Clients can request a particular format as part of the URL, for example:

* In the query string or part of the path.
* By using a format-specific file extension such as .xml or .json.

The mapping from request path should be specified in the route the API is using. For example:

[language="csharp" source="formatting/samples/3.x/ResponseFormattingSample/Controllers/ProductsController.cs" id="snippet"::: (complete source file; reference: formatting/samples/3.x/ResponseFormattingSample/Controllers/ProductsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/ProductsController.cs.md)

The preceding route allows the requested format to be specified as an optional file extension. The [`[FormatFilter]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FormatFilterAttribute) attribute checks for the existence of the format value in the `RouteData` and maps the response format to the appropriate formatter when the response is created.

| Route | Formatter |
| --- | --- |
| `/api/products/5` | The default output formatter |
| `/api/products/5.json` | The JSON formatter (if configured) |
| `/api/products/5.xml` | The XML formatter (if configured) |



**Applies to: \>= aspnetcore-7.0**

ASP.NET Core MVC supports formatting response data, using specified formats or in response to a client's request.

## Format-specific Action Results

Some action result types are specific to a particular format, such as [Microsoft.AspNetCore.Mvc.JsonResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonResult) and [Microsoft.AspNetCore.Mvc.ContentResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ContentResult). Actions can return results that always use a specified format, ignoring a client's request for a different format. For example, returning `JsonResult` returns JSON-formatted data and returning `ContentResult` returns plain-text-formatted string data.

An action isn't required to return any specific type. ASP.NET Core supports any object return value. Results from actions that return objects that aren't [Microsoft.AspNetCore.Mvc.IActionResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.IActionResult) types are serialized using the appropriate [Microsoft.AspNetCore.Mvc.Formatters.IOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.IOutputFormatter) implementation. For more information, see [web-api/action-return-types](../action-return-types.md).

By default, the built-in helper method [Microsoft.AspNetCore.Mvc.ControllerBase.Ok%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Ok%252A) returns JSON-formatted data:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_Get"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

The sample code returns a list of todo items. Using the F12 browser developer tools or [http-repl](../http-repl/index.md) with the previous code displays:

* The response header containing **content-type:** `application/json; charset=utf-8`.
* The request headers. For example, the `Accept` header. The `Accept` header is ignored by the preceding code.

To return plain text formatted data, use [Microsoft.AspNetCore.Mvc.ContentResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ContentResult) and the [Microsoft.AspNetCore.Mvc.ControllerBase.Content%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Content%252A) helper:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_GetVersion"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

In the preceding code, the `Content-Type` returned is `text/plain`.

For actions with multiple return types, return `IActionResult`. For example, when returning different HTTP status codes based on the result of the operation.

## Content negotiation

Content negotiation occurs when the client specifies an [Accept header](https://www.rfc-editor.org/rfc/rfc9110#field.accept). The default format used by ASP.NET Core is [JSON](https://json.org/). Content negotiation is:

* Implemented by [Microsoft.AspNetCore.Mvc.ObjectResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ObjectResult).
* Built into the status code-specific action results returned from the helper methods. The action results helper methods are based on `ObjectResult`.

When a model type is returned, the return type is `ObjectResult`.

The following action method uses the `Ok` and `NotFound` helper methods:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_GetById" highlight="8,11"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

By default, ASP.NET Core supports the following media types:

* `application/json`
* `text/json`
* `text/plain`

Tools such as [Fiddler](https://www.telerik.com/fiddler) or [http-repl](../http-repl/index.md) can set the `Accept` request header to specify the return format. When the `Accept` header contains a type the server supports, that type is returned. The next section shows how to add additional formatters.

Controller actions can return POCOs (Plain Old CLR Objects). When a POCO is returned, the runtime automatically creates an `ObjectResult` that wraps the object. The client gets the formatted serialized object. If the object being returned is `null`, a `204 No Content` response is returned.

The following example returns an object type:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_GetById"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

In the preceding code, a request for a valid todo item returns a `200 OK` response. A request for an invalid todo item returns a `204 No Content` response.

### The Accept header

Content *negotiation* takes place when an `Accept` header appears in the request. When a request contains an accept header, ASP.NET Core:

* Enumerates the media types in the accept header in preference order.
* Tries to find a formatter that can produce a response in one of the formats specified.

If no formatter is found that can satisfy the client's request, ASP.NET Core:

* Returns `406 Not Acceptable` if [Microsoft.AspNetCore.Mvc.MvcOptions.ReturnHttpNotAcceptable](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.ReturnHttpNotAcceptable) is set to `true`, or -
* Tries to find the first formatter that can produce a response.

If no formatter is configured for the requested format, the first formatter that can format the object is used. If no `Accept` header appears in the request:

* The first formatter that can handle the object is used to serialize the response.
* There isn't any negotiation taking place. The server is determining what format to return.

If the Accept header contains `*/*`, the Header is ignored unless `RespectBrowserAcceptHeader` is set to true on [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions).

### Browsers and content negotiation

Unlike typical API clients, web browsers supply `Accept` headers. Web browsers specify many formats, including wildcards. By default, when the framework detects that the request is coming from a browser:

* The `Accept` header is ignored.
* The content is returned using the first registered output formatter that can handle the response type, unless otherwise configured.

This approach provides a more consistent experience across browsers when consuming APIs.

To configure an app to respect browser accept headers, set the [Microsoft.AspNetCore.Mvc.MvcOptions.RespectBrowserAcceptHeader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.RespectBrowserAcceptHeader) property to `true`:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_RespectBrowserAcceptHeader" highlight="5"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

## Configure formatters

Apps that need to support extra formats can add the appropriate NuGet packages and configure support. There are separate formatters for input and output. Input formatters are used by [Model Binding](../../mvc/models/model-binding.md). Output formatters are used to format responses. For information on creating a custom formatter, see [Custom Formatters](custom-formatters.md).

### Add XML format support

To configure XML formatters implemented using [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer), call [Microsoft.Extensions.DependencyInjection.MvcXmlMvcBuilderExtensions.AddXmlSerializerFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcXmlMvcBuilderExtensions.AddXmlSerializerFormatters%252A):

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_AddXmlSerializerFormatters" highlight="4"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

When using the preceding code, controller methods return the appropriate format based on the request's `Accept` header.

### Configure `System.Text.Json`-based formatters

To configure features for the `System.Text.Json`-based formatters, use [Microsoft.AspNetCore.Mvc.JsonOptions.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonOptions.JsonSerializerOptions). The following highlighted code configures PascalCase formatting instead of the default camelCase formatting:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_JsonSerializerOptions" highlight="4-7"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

To configure output serialization options for specific actions, use [Microsoft.AspNetCore.Mvc.JsonResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonResult). For example:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_Get"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

### Add `Newtonsoft.Json`-based JSON format support

The default JSON formatters use `System.Text.Json`. To use the `Newtonsoft.Json`-based formatters, install the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package and configure it in `Program.cs`:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_AddNewtonsoftJson" highlight="4"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

In the preceding code, the call to `AddNewtonsoftJson` configures the following Web API, MVC, and Razor Pages features to use `Newtonsoft.Json`:

* Input and output formatters that read and write JSON
* [Microsoft.AspNetCore.Mvc.JsonResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.JsonResult)
* [JSON Patch](../jsonpatch.md)
* [Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper)
* [TempData](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata)

Some features may not work well with `System.Text.Json`-based formatters and require a reference to the `Newtonsoft.Json`-based formatters. Continue using the `Newtonsoft.Json`-based formatters when the app:

* Uses `Newtonsoft.Json` attributes. For example, `[JsonProperty]` or `[JsonIgnore]`.
* Customizes the serialization settings.
* Relies on features that `Newtonsoft.Json` provides.

To configure features for the `Newtonsoft.Json`-based formatters, use [Microsoft.AspNetCore.Mvc.MvcNewtonsoftJsonOptions.SerializerSettings%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcNewtonsoftJsonOptions.SerializerSettings%252A):

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_AddNewtonsoftJsonSerializerSettings" highlight="4"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

To configure output serialization options for specific actions, use `JsonResult`. For example:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_GetNewtonsoftJson"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

### Format `ProblemDetails` and `ValidationProblemDetails` responses

The following action method calls [Microsoft.AspNetCore.Mvc.ControllerBase.Problem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.Problem%252A) to create a [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails) response:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs" id="snippet_GetError" highlight="3"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Controllers/TodoItemsController.cs.md)

A `ProblemDetails` response is always camelCase, even when the app sets the format to PascalCase. `ProblemDetails` follows [RFC 7807](https://tools.ietf.org/html/rfc7807#appendix-A), which specifies lowercase.

When the [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute is applied to a controller class, the controller creates a [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) response when [Model Validation](../../mvc/models/validation.md) fails. This response includes a dictionary that uses the model's property names as error keys, unchanged. For example, the following model includes a single property that requires validation:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Models/SampleModel.cs" id="snippet_Class"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Models/SampleModel.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Models/SampleModel.cs.md)

By default, the `ValidationProblemDetails` response returned when the `Value` property is invalid uses an error key of `Value`, as shown in the following example:

[language="csharp" source="formatting/samples_snapshot/7.x/ValidationProblemDetailsDefault.json" highlight="7"::: (complete source file; reference: formatting/samples_snapshot/7.x/ValidationProblemDetailsDefault.json)](../../../_code/aspnetcore/web-api/advanced/formatting/samples_snapshot/7.x/ValidationProblemDetailsDefault.json.md)

To format the property names used as error keys, add an implementation of [Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.IMetadataDetailsProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.IMetadataDetailsProvider) to the [Microsoft.AspNetCore.Mvc.MvcOptions.ModelMetadataDetailsProviders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.ModelMetadataDetailsProviders%252A) collection. The following example adds a `System.Text.Json`-based implementation, `SystemTextJsonValidationMetadataProvider`, which formats property names as camelCase by default:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_SystemTextJsonValidationMetadataProvider"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

`SystemTextJsonValidationMetadataProvider` also accepts an implementation of [System.Text.Json.JsonNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy) in its constructor, which specifies a custom naming policy for formatting property names.

To set a custom name for a property within a model, use the [\[JsonPropertyName\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute on the property:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Models/Formatted/SampleModel.cs" id="snippet_Class"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Models/Formatted/SampleModel.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Models/Formatted/SampleModel.cs.md)

The `ValidationProblemDetails` response returned for the preceding model when the `Value` property is invalid uses an error key of `sampleValue`, as shown in the following example:

[language="csharp" source="formatting/samples_snapshot/7.x/ValidationProblemDetailsCustom.json" highlight="7"::: (complete source file; reference: formatting/samples_snapshot/7.x/ValidationProblemDetailsCustom.json)](../../../_code/aspnetcore/web-api/advanced/formatting/samples_snapshot/7.x/ValidationProblemDetailsCustom.json.md)

To format the `ValidationProblemDetails` response using `Newtonsoft.Json`, use `NewtonsoftJsonValidationMetadataProvider`:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_NewtonsoftJsonValidationMetadataProvider"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

By default, `NewtonsoftJsonValidationMetadataProvider` formats property names as camelCase. `NewtonsoftJsonValidationMetadataProvider` also accepts an implementation of `NamingPolicy` in its constructor, which specifies a custom naming policy for formatting property names. To set a custom name for a property within a model, use the `[JsonProperty]` attribute.

## Specify a format

To restrict the response formats, apply the [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) filter. Like most [Filters](../../mvc/controllers/filters.md), `[Produces]` can be applied at the action, controller, or global scope:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs" id="snippet_ClassDeclaration" highlight="3"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/TodoItemsController.cs.md)

The preceding [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) filter:

* Forces all actions within the controller to return JSON-formatted responses for POCOs (Plain Old CLR Objects) or [Microsoft.AspNetCore.Mvc.ObjectResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ObjectResult) and its derived types.
* Return JSON-formatted responses even if other formatters are configured and the client specifies a different format.

For more information, see [Filters](../../mvc/controllers/filters.md).

## Special case formatters

Some special cases are implemented using built-in formatters. By default, `string` return types are formatted as *text/plain* (*text/html* if requested via the `Accept` header). This behavior can be deleted by removing the [Microsoft.AspNetCore.Mvc.Formatters.StringOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.StringOutputFormatter). Formatters are removed in `Program.cs`. Actions that have a model object return type return `204 No Content` when returning `null`. This behavior can be deleted by removing the [Microsoft.AspNetCore.Mvc.Formatters.HttpNoContentOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.HttpNoContentOutputFormatter). The following code removes the `StringOutputFormatter` and `HttpNoContentOutputFormatter`.

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs" id="snippet_RemoveOutputFormatters" highlight="6-7"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Program.cs.md)

Without the `StringOutputFormatter`, the built-in JSON formatter formats `string` return types. If the built-in JSON formatter is removed and an XML formatter is available, the XML formatter formats `string` return types. Otherwise, `string` return types return `406 Not Acceptable`.

Without the `HttpNoContentOutputFormatter`, null objects are formatted using the configured formatter. For example:

* The JSON formatter returns a response with a body of `null`.
* The XML formatter returns an empty XML element with the attribute `xsi:nil="true"` set.

## Response format URL mappings

Clients can request a particular format as part of the URL, for example:

* In the query string or part of the path.
* By using a format-specific file extension such as .xml or .json.

The mapping from request path should be specified in the route the API is using. For example:

[language="csharp" source="formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/FormatFilter/TodoItemsController.cs" id="snippet_ClassGet" highlight="3,11"::: (complete source file; reference: formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/FormatFilter/TodoItemsController.cs)](../../../_code/aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/FormatFilter/TodoItemsController.cs.md)

The preceding route allows the requested format to be specified using an optional file extension. The [`[FormatFilter]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FormatFilterAttribute) attribute checks for the existence of the format value in the `RouteData` and maps the response format to the appropriate formatter when the response is created.

| Route | Formatter |
| --- | --- |
| `/api/todoitems/5` | The default output formatter |
| `/api/todoitems/5.json` | The JSON formatter (if configured) |
| `/api/todoitems/5.xml` | The XML formatter (if configured) |

## Polymorphic deserialization

Built-in features provide a limited range of polymorphic serialization but no support for deserialization at all. Deserialization requires a custom converter. See [Polymorphic deserialization](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-converters-how-to?pivots=dotnet-6-0#support-polymorphic-deserialization) for a complete sample of polymorphic deserialization.

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/formatting/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
