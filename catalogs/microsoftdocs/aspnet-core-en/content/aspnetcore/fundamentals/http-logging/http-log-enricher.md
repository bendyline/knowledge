---
title: Enrich HTTP request logs in ASP.NET Core
description: Learn how to enrich incoming HTTP request logs with custom data using the IHttpLogEnricher interface in ASP.NET Core.  
ai-usage: ai-assisted
author: mariamaziz
monikerRange: '>= aspnetcore-8.0'
ms.author: tdykstra
ms.reviewer: tdykstra
ms.date: 06/08/2026
uid: fundamentals/http-logging/http-log-enricher
---

# Enrich HTTP request logs in ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


**Applies to: \>= aspnetcore-8.0**

You can create a custom HTTP log enricher by creating a class that implements the [Microsoft.AspNetCore.Diagnostics.Logging.IHttpLogEnricher](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.IHttpLogEnricher) interface. Unlike general-purpose log enrichers that enrich all logs in your application, HTTP log enrichers specifically target incoming HTTP request logs in ASP.NET Core, allowing you to add contextual information based on the `HttpContext` of each request.

After the class is created, you register it with [Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLogEnricher%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)). Once registered, the logging infrastructure automatically calls the `Enrich()` method on every registered enricher for each incoming HTTP request processed by the ASP.NET Core pipeline.

> **Important:**
> The `IHttpLogEnricher` interface is experimental and requires the `EXTEXP0013` diagnostic ID suppression. For more information, see [Experimental features in .NET Extensions](https://aka.ms/dotnet-extensions-warnings/EXTEXP0013).

## Install the package

To get started, install the [Microsoft.AspNetCore.Diagnostics.Middleware](https://www.nuget.org/packages/Microsoft.AspNetCore.Diagnostics.Middleware) NuGet package:

### [.NET CLI](#tab/dotnet-cli)

```dotnetcli
dotnet add package Microsoft.AspNetCore.Diagnostics.Middleware
```

### [PackageReference](#tab/package-reference)

```xml
<PackageReference Include="Microsoft.AspNetCore.Diagnostics.Middleware"
                  Version="*" /> <!-- Adjust version -->
```

---

## IHttpLogEnricher implementation

Your custom HTTP log enricher needs to implement a single [Microsoft.AspNetCore.Diagnostics.Logging.IHttpLogEnricher.Enrich(Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector,Microsoft.AspNetCore.Http.HttpContext)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.Logging.IHttpLogEnricher.Enrich(Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector%2CMicrosoft.AspNetCore.Http.HttpContext)) method. During enrichment, this method is called and given an [Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector) instance along with the [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) for the incoming request. The enricher then calls one of the overloads of the [Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String%2CSystem.Object)) method to record any properties it wants.

> **Note:**
> If your custom HTTP log enricher calls [Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String%2CSystem.Object)),
> it's acceptable to send any type of argument to the `value` parameter as-is, because it's parsed into the actual type and serialized internally
> to be sent further down the logging pipeline.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/httplogging/httplogenricher/CustomHttpLogEnricher.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/http-logging/http-log-enricher.md)

And you register it as shown in the following code using [Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLogEnricher%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)):

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/httplogging/httplogenricher/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/http-logging/http-log-enricher.md)

## Key differences from general log enrichers

HTTP log enrichers differ from general-purpose log enrichers ([Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher)) in several important ways:

- **Scope**: HTTP log enrichers only enrich logs produced by incoming ASP.NET Core HTTP requests, while general log enrichers enrich all logs in the application.
- **Context**: HTTP log enrichers have access to the full `HttpContext`, including the request, response, user, connection, and any other context data associated with the incoming request.
- **Package**: HTTP log enrichers require the `Microsoft.AspNetCore.Diagnostics.Middleware` package, while general log enrichers use the `Microsoft.Extensions.Telemetry.Abstractions` package.
- **Direction**: HTTP log enrichers target **incoming** server-side requests, while [Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher) targets **outgoing** client-side HTTP requests.

## Remarks

- The `Enrich` method is called during the HTTP response phase of the request/response lifecycle, after the response has been processed.
- The `httpContext` parameter is always provided and will never be `null`.
- Multiple enrichers can be registered and will be executed in the order they were registered.
- If an enricher throws an exception, it's logged and execution continues with the remaining enrichers.
- The `IHttpLogEnricher` interface is marked as experimental with diagnostic ID `EXTEXP0013` and requires .NET 8 or later.
- Calling `AddHttpLogEnricher<T>()` automatically sets up the required HTTP logging redaction infrastructure by internally calling `AddHttpLoggingRedaction()`.
- You must still add the `UseHttpLogging()` middleware in the application pipeline for HTTP logs to be emitted.

## See also

- [View or download sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/httplogging/httplogenricher) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
- [HTTP logging in ASP.NET Core](index.md)
