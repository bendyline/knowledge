---
title: HTTP logging in .NET and ASP.NET Core
author: tdykstra
description: Learn how to log HTTP requests and responses.
monikerRange: '>= aspnetcore-6.0'
ms.author: tdykstra
ms.date: 04/25/2025
uid: fundamentals/http-logging/index
---
# HTTP logging in ASP.NET Core

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


**Applies to: \>= aspnetcore-8.0**

HTTP logging is a middleware that logs information about incoming HTTP requests and HTTP responses. HTTP logging provides logs of:

* HTTP request information
* Common properties
* Headers
* Body
* HTTP response information

HTTP logging can:

* Log all requests and responses or only requests and responses that meet certain criteria.
* Select which parts of the request and response are logged.
* Allow you to redact sensitive information from the logs.

HTTP logging ***can reduce the performance of an app***, especially when logging the request and response bodies. Consider the performance impact when selecting fields to log. Test the performance impact of the selected logging properties.

> **Warning:**
> HTTP logging can potentially log personally identifiable information (PII). Consider the risk and avoid logging sensitive information.
> For more information about redaction, check [redacting sensitive data](#redacting-sensitive-data)

## Enable HTTP logging

HTTP logging is enabled by calling [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%252A) and [Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseHttpLogging%252A), as shown in the following example:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet2\&highlight=3,7)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

The empty lambda in the preceding example of calling `AddHttpLogging` adds the middleware with the default configuration. By default, HTTP logging logs common properties such as path, status-code, and headers for requests and responses.

Add the following line to the `appsettings.Development.json` file at the `"LogLevel": {` level so the HTTP logs are displayed:

```json
"Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
```

With the default configuration, a request and response is logged as a pair of messages similar to the following example:

```output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Protocol: HTTP/2
      Method: GET
      Scheme: https
      PathBase:
      Path: /
      Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
      Host: localhost:52941
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61
      Accept-Encoding: gzip, deflate, br
      Accept-Language: en-US,en;q=0.9
      Upgrade-Insecure-Requests: [Redacted]
      sec-ch-ua: [Redacted]
      sec-ch-ua-mobile: [Redacted]
      sec-ch-ua-platform: [Redacted]
      sec-fetch-site: [Redacted]
      sec-fetch-mode: [Redacted]
      sec-fetch-user: [Redacted]
      sec-fetch-dest: [Redacted]
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      StatusCode: 200
      Content-Type: text/plain; charset=utf-8
      Date: Tue, 24 Oct 2023 02:03:53 GMT
      Server: Kestrel
```

## HTTP logging options

To configure global options for the HTTP logging middleware, call [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%252A) in `Program.cs`, using the lambda to configure [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions).

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet_Addservices)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

> **Note:**
> In the preceding sample and following samples, `UseHttpLogging` is called after `UseStaticFiles`, so HTTP logging isn't enabled for static files. To enable static file HTTP logging, call `UseHttpLogging` before `UseStaticFiles`.

### `LoggingFields`

[`HttpLoggingOptions.LoggingFields`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.LoggingFields) is an enum flag that configures specific parts of the request and response to log. `LoggingFields` defaults to [Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPropertiesAndHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPropertiesAndHeaders) | [Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponsePropertiesAndHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponsePropertiesAndHeaders).

### `RequestHeaders` and `ResponseHeaders`

[Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders) and [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders) are sets of HTTP headers that are logged. Header values are only logged for header names that are in these collections. The following code adds `sec-ch-ua` to the [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders), so the value of the `sec-ch-ua` header is logged. And it adds `MyResponseHeader` to the [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders), so the value of the `MyResponseHeader` header is logged. If these lines are removed, the values of these headers are `[Redacted]`.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet_Addservices\&highlight=8,9)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

### `MediaTypeOptions`

[Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.MediaTypeOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.MediaTypeOptions) provides configuration for selecting which encoding to use for a specific media type.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet_Addservices\&highlight=10)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

This approach can also be used to enable logging for data that isn't logged by default (for example, form data, which might have a media type such as `application/x-www-form-urlencoded` or `multipart/form-data`).

#### `MediaTypeOptions` methods

* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddText%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddText%252A)
* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddBinary%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddBinary%252A)
* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.Clear%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.Clear%252A)

### `RequestBodyLogLimit` and `ResponseBodyLogLimit`

* [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestBodyLogLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestBodyLogLimit)
* [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseBodyLogLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseBodyLogLimit)

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet_Addservices\&highlight=11-12)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

### `CombineLogs`

Setting [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.CombineLogs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.CombineLogs) to `true` configures the middleware to consolidate all of its enabled logs for a request and response into one log at the end. This includes the request, request body, response, response body, and duration.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet_Addservices\&highlight=13)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

## Endpoint-specific configuration

For endpoint-specific configuration in Minimal API apps, a [Microsoft.AspNetCore.Builder.HttpLoggingEndpointConventionBuilderExtensions.WithHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpLoggingEndpointConventionBuilderExtensions.WithHttpLogging%252A) extension method is available. The following example shows how to configure HTTP logging for one endpoint:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet6)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

For endpoint-specific configuration in apps that use controllers, the [`[HttpLogging]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingAttribute) is available. The attribute can also be used in Minimal API apps, as shown in the following example:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet5)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

## `IHttpLoggingInterceptor`

[Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor) is the interface for a service that can be implemented to handle per-request and per-response callbacks for customizing what details get logged. Any endpoint-specific log settings are applied first and can then be overridden in these callbacks. An implementation can:

* Inspect a request or response.
* Enable or disable any [Microsoft.AspNetCore.HttpLogging.HttpLoggingFields](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields).
* Adjust how much of the request or response body is logged.
* Add custom fields to the logs.

Register an [Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor) implementation by calling [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLoggingInterceptor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLoggingInterceptor%252A) in `Program.cs`. If multiple [Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor) instances are registered, they're run in the order registered.

The following example shows how to register an [Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor) implementation:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/Program.cs?name=snippet4\&highlight=7)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/Program.cs.md)

The following example is an [Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor) implementation that:

* Inspects the request method and disables logging for POST requests.
* For non-POST requests:
  * Redacts request path, request headers, and response headers.
  * Adds custom fields and field values to the request and response logs.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/8.x/SampleHttpLoggingInterceptor.cs)](../../../_code/aspnetcore/fundamentals/http-logging/samples/8.x/SampleHttpLoggingInterceptor.cs.md)

With this interceptor, a POST request doesn't generate any logs even if HTTP logging is configured to log [`HttpLoggingFields.All`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields). A GET request generates logs similar to the following example:

```output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Path: RedactedPath
      Accept: RedactedHeader
      Host: RedactedHeader
      User-Agent: RedactedHeader
      Accept-Encoding: RedactedHeader
      Accept-Language: RedactedHeader
      Upgrade-Insecure-Requests: RedactedHeader
      sec-ch-ua: RedactedHeader
      sec-ch-ua-mobile: RedactedHeader
      sec-ch-ua-platform: RedactedHeader
      sec-fetch-site: RedactedHeader
      sec-fetch-mode: RedactedHeader
      sec-fetch-user: RedactedHeader
      sec-fetch-dest: RedactedHeader
      RequestEnrichment: Stuff
      Protocol: HTTP/2
      Method: GET
      Scheme: https
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      Content-Type: RedactedHeader
      MyResponseHeader: RedactedHeader
      ResponseEnrichment: Stuff
      StatusCode: 200
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[4]
      ResponseBody: Hello World!
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[8]
      Duration: 2.2778ms
```

## Logging configuration order of precedence

The following list shows the order of precedence for logging configuration:

1. Global configuration from [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions), set by calling [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%252A).
1. Endpoint-specific configuration from the [`[HttpLogging]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingAttribute) or the [Microsoft.AspNetCore.Builder.HttpLoggingEndpointConventionBuilderExtensions.WithHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpLoggingEndpointConventionBuilderExtensions.WithHttpLogging%252A) extension method overrides global configuration.
1. [`IHttpLoggingInterceptor`](#ihttplogginginterceptor) is called with the results and can further modify the configuration per request.




**Applies to: \>= aspnetcore-6.0 <= aspnetcore-7.0**

HTTP Logging is a middleware that logs information about incoming HTTP requests and HTTP responses. HTTP logging provides logs of:

* HTTP request information
* Common properties
* Headers
* Body
* HTTP response information

HTTP Logging is valuable in several scenarios to:

* Record information about incoming requests and responses.
* Filter which parts of the request and response are logged.
* Filtering which headers to log.

HTTP Logging ***can reduce the performance of an app***, especially when logging the request and response bodies. Consider the performance impact when selecting fields to log. Test the performance impact of the selected logging properties.

> **Warning:**
> HTTP Logging can potentially log personally identifiable information (PII). Consider the risk and avoid logging sensitive information.

## Enabling HTTP logging

HTTP Logging is enabled with [Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseHttpLogging%252A), which adds HTTP logging middleware.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet2\\&highlight=5](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/http-logging/index.md)

By default, HTTP Logging logs common properties such as path, status-code, and headers for requests and responses. Add the following line to the `appsettings.Development.json` file at the `"LogLevel": {` level so the HTTP logs are displayed:

```json
 "Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
 ```

The output is logged as a single message at `LogLevel.Information`.

Sample request output

## HTTP Logging options

To configure the HTTP logging middleware, call [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%252A) in `Program.cs`.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/http-logging/index.md)

> **Note:**
> In the preceding sample and following samples, `UseHttpLogging` is called after `UseStaticFiles`, so HTTP logging is not enabled for static file. To enable static file HTTP logging, call `UseHttpLogging` before `UseStaticFiles`.

### `LoggingFields`

[`HttpLoggingOptions.LoggingFields`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.LoggingFields) is an enum flag that configures specific parts of the request and response to log. ``HttpLoggingOptions.LoggingFields`` defaults to [Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPropertiesAndHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPropertiesAndHeaders) | [Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponsePropertiesAndHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponsePropertiesAndHeaders).

### `RequestHeaders`

[Microsoft.AspNetCore.Http.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Headers) are a set of HTTP Request Headers that are allowed to be logged. Header values are only logged for header names that are in this collection. The following code logs the request header `"sec-ch-ua"`. If `logging.RequestHeaders.Add("sec-ch-ua");` is removed, the value of the request header `"sec-ch-ua"` is redacted. The following highlighted code calls [`HttpLoggingOptions.RequestHeaders`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders) and [`HttpLoggingOptions.ResponseHeaders`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders) :

[Code reference unavailable in this source snapshot: includes/~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices\\&highlight=8,9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/http-logging/index.md)

### `MediaTypeOptions`

[Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.MediaTypeOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.MediaTypeOptions) provides configuration for selecting which encoding to use for a specific media type.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices\\&highlight=10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/http-logging/index.md)

This approach can also be used to enable logging for data that is not logged by default. For example, form data, which might have a media type such as `application/x-www-form-urlencoded` or `multipart/form-data`.

#### `MediaTypeOptions` methods

* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddText%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddText%252A)
* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddBinary%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddBinary%252A)
* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.Clear%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.Clear%252A)

### `RequestBodyLogLimit` and `ResponseBodyLogLimit`

* [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestBodyLogLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestBodyLogLimit)
* [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseBodyLogLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseBodyLogLimit)

[Code reference unavailable in this source snapshot: includes/~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices\\&highlight=11-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/http-logging/index.md)




**Applies to: \>= aspnetcore-9.0**

## Redacting sensitive data

Http logging with redaction can be enabled by calling [Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLoggingRedaction%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLoggingRedaction%252A):

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples-snapshot/9.x/Program.cs?name=snippet7\&highlight=9)](../../../_code/aspnetcore/fundamentals/http-logging/samples-snapshot/9.x/Program.cs.md)

For more information about .NET's data redaction library, see [Data redaction in .NET](https://learn.microsoft.com/dotnet/core/extensions/data-redaction).

## Logging redaction options

To configure options for logging with redaction, call [Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLoggingRedaction%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLoggingRedaction%252A) in `Program.cs` using the lambda to configure [Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions):

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/MyTaxonomyClassifications.cs)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/MyTaxonomyClassifications.cs.md)

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=6)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)

With the previous redaction configuration, the output is similar to the following:

```output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[9]
      Request and Response:
      server.address: localhost:61361
      Path: /
      http.request.header.accept:
      Protocol: HTTP/2
      Method: GET
      Scheme: https
      http.response.header.content-type:
      StatusCode: 200
      Duration: 8.4684
info: Microsoft.AspNetCore.Hosting.Diagnostics[2]
      Request finished HTTP/2 GET https://localhost:61361/ - 200 - text/plain;+charset=utf-8 105.5334ms
```

> **Note:**
> Request path `/home` isn't logged because it's included in the [`ExcludePathStartsWith` property](#excludepathstartswith). `http.request.header.accept` and `http.response.header.content-type` were redacted by [Microsoft.Extensions.Compliance.Redaction.ErasingRedactor](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Compliance.Redaction.ErasingRedactor).

### `RequestPathLoggingMode`

[Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestPathLoggingMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestPathLoggingMode%252A) determines how the request path is logged, whether `Formatted` or `Structured`, set by [Microsoft.AspNetCore.Diagnostics.Logging.IncomingPathLoggingMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.IncomingPathLoggingMode):

* `Formatted`: Logs the request path without parameters.
* `Structured`: Logs the request path with parameters included.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=9)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)

### `RequestPathParameterRedactionMode`

[Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestPathParameterRedactionMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestPathParameterRedactionMode%252A)
specifies how route parameters in the request path should be redacted, whether `Strict`, `Loose`, or `None`, set by [Microsoft.Extensions.Http.Diagnostics.HttpRouteParameterRedactionMode](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Http.Diagnostics.HttpRouteParameterRedactionMode):

* `Strict`: Request route parameters are considered sensitive, require explicit annotation with a data classification, and are redacted by default.
* `Loose`: All parameters are considered as non-sensitive and included as-is by default.
* `None`: Route parameters aren't redacted regardless of the presence of data classification annotations.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=8)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)

### `RequestHeadersDataClasses`

[Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestHeadersDataClasses%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestHeadersDataClasses%252A) maps request headers to their data classification, which determines how they are redacted:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=10)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)

### `ResponseHeadersDataClasses`

[Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.ResponseHeadersDataClasses%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.ResponseHeadersDataClasses%252A), similar to [Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestHeadersDataClasses%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestHeadersDataClasses%252A)`, but for response headers:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=11)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)

### `RouteParameterDataClasses`

[Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RouteParameterDataClasses%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RouteParameterDataClasses%252A) maps route parameters to their data classification:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=12,13,14,15)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)

### `ExcludePathStartsWith`

[Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.ExcludePathStartsWith%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.ExcludePathStartsWith%252A) specifies paths that should be excluded from logging entirely:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=16,17)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)

### `IncludeUnmatchedRoutes`

[Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.IncludeUnmatchedRoutes%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.IncludeUnmatchedRoutes%252A) allows reporting unmatched routes. If set to `true`, logs whole path of routes not identified by [Routing](../routing.md) instead of logging `Unknown` value for path attribute:

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/9.x/Program.cs?name=snippet_redactionOptions\&highlight=18)](../../../_code/aspnetcore/fundamentals/http-logging/samples/9.x/Program.cs.md)
