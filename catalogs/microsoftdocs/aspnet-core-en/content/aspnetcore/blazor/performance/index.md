---
title: ASP.NET Core Blazor performance best practices
author: guardrex
description: Guidance on ASP.NET Core Blazor metrics and tracing, improving app performance, and avoiding common performance problems.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/performance/index
---
# ASP.NET Core Blazor performance best practices

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


Blazor is optimized for high performance in most realistic application UI scenarios. However, the best performance depends on developers adopting the correct patterns and features.

> **Note:**
> The code examples in this node of articles adopt [nullable reference types (NRTs) and .NET compiler null-state static analysis](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23nullable-reference-types-nrts-and-net-compiler-null-state-static-analysis), which are supported in ASP.NET Core in .NET 6 or later.

**Applies to: \>= aspnetcore-6.0**

## Ahead-of-time (AOT) compilation

Ahead-of-time (AOT) compilation compiles a Blazor app's .NET code directly into native WebAssembly for direct execution by the browser. AOT-compiled apps result in larger apps that take longer to download, but AOT-compiled apps usually provide better runtime performance, especially for apps that execute CPU-intensive tasks. For more information, see [blazor/tooling/webassembly#ahead-of-time-aot-compilation](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%2Fwebassembly%23ahead-of-time-aot-compilation).



**Applies to: \>= aspnetcore-10.0**

## Metrics and tracing

Metrics and tracing capabilities help you monitor and diagnose app performance, track user interactions, and understand component behavior in production environments.

### Configuration

To enable Blazor metrics and tracing in your app, configure [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-dotnet) with the following meters and activity sources in the app's `Program` file where services are registered:

```csharp
builder.Services.ConfigureOpenTelemetryMeterProvider(meterProvider =>
{
    meterProvider.AddMeter("Microsoft.AspNetCore.Components");
    meterProvider.AddMeter("Microsoft.AspNetCore.Components.Lifecycle");
    meterProvider.AddMeter("Microsoft.AspNetCore.Components.Server.Circuits");
});

builder.Services.ConfigureOpenTelemetryTracerProvider(tracerProvider =>
{
    tracerProvider.AddSource("Microsoft.AspNetCore.Components");
    tracerProvider.AddSource("Microsoft.AspNetCore.Components.Server.Circuits");
});
```

### Performance meters

For more information on the following performance meters, see [metrics/built-in](../../metrics/built-in.md).

`Microsoft.AspNetCore.Components` meter:

* `aspnetcore.components.navigate`: Tracks the total number of route changes in the app.
* `aspnetcore.components.handle_event.duration`: Measures the duration of processing browser events, including business logic.

`Microsoft.AspNetCore.Components.Lifecycle` meter:

* `aspnetcore.components.update_parameters.duration`: Measures the duration of processing component parameters, including business logic.
* `aspnetcore.components.render_diff.duration`: Tracks the duration of rendering batches.
* `aspnetcore.components.render_diff.size`: Tracks the size of rendering batches.

`Microsoft.AspNetCore.Components.Server.Circuits` meter:

In server-side Blazor apps, additional circuit-specific metrics include:

* `aspnetcore.components.circuit.active`: Shows the number of active circuits currently in memory.
* `aspnetcore.components.circuit.connected`: Tracks the number of circuits connected to clients.
* `aspnetcore.components.circuit.duration`: Measures circuit lifetime duration and provides total circuit count.

### Blazor tracing

For more information on the following tracing activities, see [metrics/built-in](../../metrics/built-in.md).

The new activity tracing capabilities use the `Microsoft.AspNetCore.Components` activity source and provide three main types of tracing activities: circuit lifecycle, navigation, and event handling.

Circuit lifecycle tracing:

`Microsoft.AspNetCore.Components.StartCircuit`: Traces circuit initialization with the format `Circuit {circuitId}`.

Tags:

* `aspnetcore.components.circuit.id`: Unique circuit identifier.
* `error.type`: Exception type full name (optional)

Links:

* HTTP trace
* SignalR trace

Usage: Links other Blazor traces of the same session/circuit to HTTP and SignalR contexts.

Navigation tracing:

`Microsoft.AspNetCore.Components.Navigate`: Tracks route changes with the format `Route {route} -> {componentType}`.

Tags:

* `aspnetcore.components.route`: URL path pattern of the page.
* `aspnetcore.components.type`: Class name of the Razor component.
* `error.type`: Exception type full name (optional).

Links:

* HTTP trace
* SignalR trace
* Circuit trace

Usage: Which Blazor pages this session visited?

Event handling tracing:

`Microsoft.AspNetCore.Components.HandleEvent`: Traces event handling with the format `Event {attributeName} -> {componentType}.{methodName}`.

Tags:

* `aspnetcore.components.attribute.name`: Name of the HTML attribute that triggers the event (example: `onClick`).
* `code.function.name`: C# method name of the handler.
* `aspnetcore.components.type`: Full name of target C# component that receives the event.
* `error.type`: Exception type full name (optional).

Links:

* Circuit trace
* Route trace

Usages:

* Click to which component caused exception and on which page?
* In which linked circuit and with what HTTP context it happened?
