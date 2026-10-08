---
title: HTTP client log enricher
description: Learn how to use the HTTP client log enricher in .NET.
ms.date: 02/12/2026
ai-usage: ai-assisted
---

# HTTP client log enricher

You can create a custom HTTP client log enricher by creating a class that implements the [Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher) interface. Unlike general-purpose log enrichers that enrich all logs in your application, HTTP client log enrichers specifically target outgoing HTTP client logs, allowing you to add contextual information based on the HTTP request, response, and any exceptions that occurred.

After the class is created, you register it with [Microsoft.Extensions.DependencyInjection.HttpClientLoggingServiceCollectionExtensions.AddHttpClientLogEnricher*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientLoggingServiceCollectionExtensions.AddHttpClientLogEnricher*). Once registered, the logging infrastructure automatically calls the `Enrich()` method exactly once on every registered enricher for each HTTP request/response produced by the HTTP client.

## Install the package

To get started, install the [📦 Microsoft.Extensions.Http.Diagnostics](https://www.nuget.org/packages/Microsoft.Extensions.Http.Diagnostics) NuGet package:

### [.NET CLI](#tab/dotnet-cli)

```dotnetcli
dotnet add package Microsoft.Extensions.Http.Diagnostics
```

Or, if you're using .NET 10+ SDK:

```dotnetcli
dotnet package add Microsoft.Extensions.Http.Diagnostics
```

### [PackageReference](#tab/package-reference)

```xml
<PackageReference Include="Microsoft.Extensions.Http.Diagnostics"
                  Version="*" /> <!-- Adjust version -->
```

---

## IHttpClientLogEnricher implementation

Your custom HTTP client log enricher needs to implement a single [Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher.Enrich(Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector,System.Net.Http.HttpRequestMessage,System.Net.Http.HttpResponseMessage,System.Exception)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher.Enrich(Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector%2CSystem.Net.Http.HttpRequestMessage%2CSystem.Net.Http.HttpResponseMessage%2CSystem.Exception)) method. During enrichment, this method is called and given an [Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector) instance, along with the HTTP request, response (if available), and exception (if any). The enricher then calls one of the overloads of the [Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String%2CSystem.Object)) method to record any properties it wants.

> **Note:**
> If your custom HTTP client log enricher calls [Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String%2CSystem.Object)),
> it's acceptable to send any type of argument to the `value` parameter as-is, because it's parsed into the actual type and serialized internally
> to be sent further down the logging pipeline.

[language="csharp" source="snippets/httpclientlogenricher/CustomHttpClientLogEnricher.cs" ::: (complete source file; reference: snippets/httpclientlogenricher/CustomHttpClientLogEnricher.cs)](../../../_code/docs/core/enrichment/snippets/httpclientlogenricher/CustomHttpClientLogEnricher.cs.md)

And you register it as shown in the following code using [Microsoft.Extensions.DependencyInjection.HttpClientLoggingServiceCollectionExtensions.AddHttpClientLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientLoggingServiceCollectionExtensions.AddHttpClientLogEnricher%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)):

```csharp
var builder = Host.CreateApplicationBuilder();

builder.Services.AddHttpClient();
builder.Services.AddExtendedHttpClientLogging();
builder.Services.AddHttpClientLogEnricher<CustomHttpClientLogEnricher>();
builder.Services.AddRedaction();
```

## Key differences from general log enrichers

HTTP client log enrichers differ from general-purpose log enrichers ([Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher)) in several important ways:

- **Scope**: HTTP client log enrichers only enrich logs produced by HTTP client requests, while general log enrichers enrich all logs in the application.
- **Context**: HTTP client log enrichers have access to the `HttpRequestMessage`, `HttpResponseMessage`, and any exceptions that occurred during the request, allowing for HTTP-specific enrichment.
- **Package**: HTTP client log enrichers require the `Microsoft.Extensions.Http.Diagnostics` package, while general log enrichers use the `Microsoft.Extensions.Telemetry.Abstractions` package.

## Remarks

- The `Enrich` method is called exactly once during the HTTP request/response lifecycle for each registered enricher to add custom tags to the HTTP client logs.
- The `request` parameter is always provided and will never be `null`.
- The `response` parameter might be `null` if the request failed before receiving a response.
- The `exception` parameter might be `null` if no exception occurred during the request processing.
- Multiple enrichers can be registered for the same HTTP client and will be executed in the order they were registered.
- HTTP client log enrichers are executed as part of the extended HTTP client logging infrastructure provided by the `Microsoft.Extensions.Http.Diagnostics` package.

## See also

- [HTTP client logging in .NET](../extensions/httpclient-logging.md)
