---
author: tdykstra
ms.author: tdykstra
ms.date: 09/25/2024
---

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

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet2\&highlight=5)](../../../../_code/aspnetcore/fundamentals/http-logging/samples/6.x/Program.cs.md)

By default, HTTP Logging logs common properties such as path, status-code, and headers for requests and responses. Add the following line to the `appsettings.Development.json` file at the `"LogLevel": {` level so the HTTP logs are displayed:

```json
 "Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
 ```

The output is logged as a single message at `LogLevel.Information`.

Sample request output

## HTTP Logging options

To configure the HTTP logging middleware, call [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%252A) in `Program.cs`.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices)](../../../../_code/aspnetcore/fundamentals/http-logging/samples/6.x/Program.cs.md)

> **Note:**
> In the preceding sample and following samples, `UseHttpLogging` is called after `UseStaticFiles`, so HTTP logging is not enabled for static file. To enable static file HTTP logging, call `UseHttpLogging` before `UseStaticFiles`.

### `LoggingFields`

[`HttpLoggingOptions.LoggingFields`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.LoggingFields) is an enum flag that configures specific parts of the request and response to log. ``HttpLoggingOptions.LoggingFields`` defaults to [Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPropertiesAndHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPropertiesAndHeaders) | [Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponsePropertiesAndHeaders](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponsePropertiesAndHeaders).

### `RequestHeaders`

[Microsoft.AspNetCore.Http.HttpRequest.Headers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Headers) are a set of HTTP Request Headers that are allowed to be logged. Header values are only logged for header names that are in this collection. The following code logs the request header `"sec-ch-ua"`. If `logging.RequestHeaders.Add("sec-ch-ua");` is removed, the value of the request header `"sec-ch-ua"` is redacted. The following highlighted code calls [`HttpLoggingOptions.RequestHeaders`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders) and [`HttpLoggingOptions.ResponseHeaders`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders) :

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices\&highlight=8,9)](../../../../_code/aspnetcore/fundamentals/http-logging/samples/6.x/Program.cs.md)

### `MediaTypeOptions`

[Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.MediaTypeOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.MediaTypeOptions) provides configuration for selecting which encoding to use for a specific media type.

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices\&highlight=10)](../../../../_code/aspnetcore/fundamentals/http-logging/samples/6.x/Program.cs.md)

This approach can also be used to enable logging for data that is not logged by default. For example, form data, which might have a media type such as `application/x-www-form-urlencoded` or `multipart/form-data`.

#### `MediaTypeOptions` methods

* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddText%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddText%252A)
* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddBinary%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddBinary%252A)
* [Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.Clear%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.Clear%252A)

### `RequestBodyLogLimit` and `ResponseBodyLogLimit`

* [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestBodyLogLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestBodyLogLimit)
* [Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseBodyLogLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseBodyLogLimit)

[Code example (complete source file; reference: \~/fundamentals/http-logging/samples/6.x/Program.cs?name=snippet_Addservices\&highlight=11-12)](../../../../_code/aspnetcore/fundamentals/http-logging/samples/6.x/Program.cs.md)
