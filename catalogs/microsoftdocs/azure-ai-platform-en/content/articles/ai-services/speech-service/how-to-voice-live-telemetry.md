---
title: Enable telemetry and tracing for Voice Live
titleSuffix: Foundry Tools
description: Learn how to enable OpenTelemetry tracing for Voice Live SDK sessions to monitor performance, diagnose latency, and export traces to Azure Monitor.
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 04/28/2026
author: PatrickFarley
reviewer: PatrickFarley
ms.author: pafarley
ms.reviewer: pafarley
zone_pivot_groups: how-to-voice-live-telemetry
recommendations: false
ai-usage: ai-assisted
---

# Enable telemetry and tracing for Voice Live


The Voice Live SDK includes built-in [OpenTelemetry](https://opentelemetry.io/) instrumentation that automatically traces connection, send, and receive operations. Use telemetry to monitor session health, diagnose latency issues, and correlate Voice Live operations with your application traces.

## What gets traced

When you enable telemetry, the SDK automatically creates OpenTelemetry spans for:

| Operation | Span name prefix | Description |
| --- | --- | --- |
| WebSocket connect | `connect` | Connection establishment and lifecycle |
| Send events | `send` | Session updates, conversation items, response requests |
| Receive events | `recv` | Server events including responses, VAD, and errors |

## Prerequisites

- A working Voice Live setup. Complete one of the following quickstarts:
  - [Voice Live with Foundry models](voice-live-quickstart.md)
  - [Voice Live with Foundry agents](voice-live-agents-quickstart.md)



**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/overview/azure/ai-voicelive-readme) | [Package (PyPi)](https://pypi.org/project/azure-ai-voicelive/) | [Additional samples on GitHub](https://aka.ms/voicelive/github-python)


## Additional prerequisites

- `azure-ai-voicelive` package version 1.2.0 or later.
- Install the telemetry dependencies:

  ```bash
  pip install opentelemetry-sdk azure-core-tracing-opentelemetry
  ```

  For Azure Monitor export, install instead:

  ```bash
  pip install azure-monitor-opentelemetry
  ```

## Enable console tracing

Add the following code to your application before calling `connect()`. This is the smallest code change to start seeing Voice Live spans in your terminal.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-console.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-telemetry.md)

All `connect`, `send`, and `recv` operations now produce spans printed to stdout.

> 
> [Complete console tracing sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-console.py)

## Export traces to Azure Monitor

To send traces to Application Insights instead of the console, replace the console setup with Azure Monitor configuration. Set the `APPLICATIONINSIGHTS_CONNECTION_STRING` environment variable, then add the following code.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-azure-monitor.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-telemetry.md)

View the results in the **Tracing** tab in your Azure AI Foundry project page or in Application Insights.

> 
> [Complete Azure Monitor tracing sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-azure-monitor.py)

## Add custom span attributes

To correlate Voice Live traces with your application context (session IDs, user IDs, or request identifiers), create a custom `SpanProcessor`.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-custom-attributes.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-telemetry.md)

Register the custom processor with the global tracer provider after your standard telemetry setup:

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-custom-attributes.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-telemetry.md)

> 
> [Complete custom attributes sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-custom-attributes.py)

## Enable content recording

Content recording captures full message payloads (send and receive) in span events as `gen_ai.event.content` attributes. This is useful for debugging but can capture personal data.

> **Caution:**
> Content recording may capture personal data. Only enable in development or controlled environments.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-content-recording.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-voice-live-telemetry.md)

> 
> [Complete content recording sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-content-recording.py)



**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/ai.voicelive-readme) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.VoiceLive) | [Additional samples on GitHub](https://aka.ms/voicelive/github-csharp)


## Additional prerequisites

- `Azure.AI.VoiceLive` package version 1.1.0 or later.
- .NET 10.0 or later.
- Install the telemetry dependencies:

  ```dotnetcli
  dotnet add package OpenTelemetry
  dotnet add package OpenTelemetry.Exporter.Console
  ```

  For Azure Monitor export, install instead:

  ```dotnetcli
  dotnet add package Azure.Monitor.OpenTelemetry.Exporter
  ```

## Enable console tracing

Register an OpenTelemetry tracer provider that listens to the `Azure.AI.VoiceLive` activity source before you construct the `VoiceLiveClient`. The SDK emits spans automatically when a provider is present.

```csharp
using Azure.AI.VoiceLive;
using Azure.Identity;
using OpenTelemetry;
using OpenTelemetry.Trace;

// Register an OpenTelemetry provider before constructing the VoiceLive client.
using TracerProvider tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddSource("Azure.AI.VoiceLive")
    .AddConsoleExporter()
    .Build();

string endpoint = Environment.GetEnvironmentVariable("AZURE_VOICELIVE_ENDPOINT")!;
VoiceLiveClient client = new(new Uri(endpoint), new DefaultAzureCredential());

// All connect, send, and receive operations now produce spans on the console.
VoiceLiveSession session = await client.StartSessionAsync("gpt-realtime");
```

All connect, send, and receive operations now produce spans printed to stdout.

Reference: [OpenTelemetry .NET](https://opentelemetry.io/docs/languages/dotnet/) | [VoiceLiveClient](https://learn.microsoft.com/dotnet/api/azure.ai.voicelive.voiceliveclient)

> 
> [Complete console tracing sample](https://github.com/Azure/azure-sdk-for-net/tree/main/samples/voicelive/telemetry-tracing)

## Export traces to Azure Monitor

To send traces to Application Insights instead of the console, replace the console exporter with the Azure Monitor exporter. Set the `APPLICATIONINSIGHTS_CONNECTION_STRING` environment variable, then add the following code.

```csharp
using Azure.AI.VoiceLive;
using Azure.Identity;
using Azure.Monitor.OpenTelemetry.Exporter;
using OpenTelemetry;
using OpenTelemetry.Trace;

string connectionString = Environment.GetEnvironmentVariable("APPLICATIONINSIGHTS_CONNECTION_STRING")!;

using TracerProvider tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddSource("Azure.AI.VoiceLive")
    .AddAzureMonitorTraceExporter(options => options.ConnectionString = connectionString)
    .Build();

string endpoint = Environment.GetEnvironmentVariable("AZURE_VOICELIVE_ENDPOINT")!;
VoiceLiveClient client = new(new Uri(endpoint), new DefaultAzureCredential());
VoiceLiveSession session = await client.StartSessionAsync("gpt-realtime");
```

View the results in the **Tracing** tab in your Foundry project page or in Application Insights.

Reference: [Azure Monitor OpenTelemetry exporter for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/monitor.opentelemetry.exporter-readme)

## Add custom span attributes

To correlate Voice Live traces with your application context (session IDs, user IDs, or request identifiers), implement a processor that derives from `BaseProcessor<Activity>`.

```csharp
using System.Diagnostics;
using OpenTelemetry;

internal sealed class CustomAttributesProcessor : BaseProcessor<Activity>
{
    private readonly string _sessionId;
    private readonly string _userId;

    public CustomAttributesProcessor(string sessionId, string userId)
    {
        _sessionId = sessionId;
        _userId = userId;
    }

    public override void OnStart(Activity activity)
    {
        activity.SetTag("app.session_id", _sessionId);
        activity.SetTag("app.user_id", _userId);
    }
}
```

Register the custom processor with the tracer provider builder after adding the `Azure.AI.VoiceLive` source:

```csharp
using TracerProvider tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddSource("Azure.AI.VoiceLive")
    .AddProcessor(new CustomAttributesProcessor(sessionId: "sess-123", userId: "user-abc"))
    .AddConsoleExporter()
    .Build();
```

## Enable content recording

Content recording captures full message payloads (send and receive) on span events. This is useful for debugging but can capture personal data.

> **Caution:**
> Content recording may capture personal data. Only enable in development or controlled environments.

Set the `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` environment variable to `true` before starting your application. No code changes are required.

```bash
export OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true
```

When enabled, the SDK attaches event payloads as `gen_ai.event.content` attributes on the corresponding spans.



**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-voicelive-readme) | [Package (Maven)](https://central.sonatype.com/artifact/com.azure/azure-ai-voicelive/overview) | [Additional samples on GitHub](https://aka.ms/voicelive/github-java)


## Additional prerequisites

- `azure-ai-voicelive` package version 1.0.0 or later.
- Java Development Kit (JDK) version 8 or later.
- Add the OpenTelemetry dependencies to your `pom.xml`:

  ```xml
  <dependency>
      <groupId>io.opentelemetry</groupId>
      <artifactId>opentelemetry-sdk</artifactId>
      <version>1.45.0</version>
  </dependency>
  <dependency>
      <groupId>io.opentelemetry</groupId>
      <artifactId>opentelemetry-exporter-logging</artifactId>
      <version>1.45.0</version>
  </dependency>
  ```

  For Azure Monitor export, add:

  ```xml
  <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-monitor-opentelemetry-exporter</artifactId>
      <version>1.0.0-beta.31</version>
  </dependency>
  ```

## Enable console tracing

Register a global `OpenTelemetry` instance with a span exporter before constructing the `VoiceLiveAsyncClient`. The SDK defaults to `GlobalOpenTelemetry.getOrNoop()`, so tracing is picked up automatically once a global instance exists.

```java
import com.azure.ai.voicelive.VoiceLiveAsyncClient;
import com.azure.ai.voicelive.VoiceLiveClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;
import io.opentelemetry.exporter.logging.LoggingSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.SimpleSpanProcessor;

// 1. Register a global OpenTelemetry instance BEFORE building any client.
SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
    .addSpanProcessor(SimpleSpanProcessor.create(LoggingSpanExporter.create()))
    .build();

OpenTelemetrySdk.builder()
    .setTracerProvider(tracerProvider)
    .buildAndRegisterGlobal();

// 2. Build the client — it picks up GlobalOpenTelemetry automatically.
String endpoint = System.getenv("AZURE_VOICELIVE_ENDPOINT");
VoiceLiveAsyncClient client = new VoiceLiveClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildAsyncClient();
```

All connect, send, and receive operations now produce spans printed to stdout.

> **Tip:**
> If you attach the [OpenTelemetry Java agent](https://opentelemetry.io/docs/languages/java/automatic/) (`-javaagent:opentelemetry-javaagent.jar`), the global instance is registered automatically and no code changes are required.

Reference: [OpenTelemetry Java](https://opentelemetry.io/docs/languages/java/) | [VoiceLiveClientBuilder](https://learn.microsoft.com/java/api/com.azure.ai.voicelive.voiceliveclientbuilder)

> 
> [Complete console tracing sample (GlobalTracingSample.java)](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/voicelive/azure-ai-voicelive/src/samples/java/com/azure/ai/voicelive/telemetry/GlobalTracingSample.java)

## Export traces to Azure Monitor

To send traces to Application Insights instead of the console, replace the logging exporter with the Azure Monitor exporter. Set the `APPLICATIONINSIGHTS_CONNECTION_STRING` environment variable, then add the following code.

```java
import com.azure.ai.voicelive.VoiceLiveAsyncClient;
import com.azure.ai.voicelive.VoiceLiveClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.monitor.opentelemetry.exporter.AzureMonitorExporterBuilder;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;

String connectionString = System.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING");

SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
    .addSpanProcessor(BatchSpanProcessor.builder(
        new AzureMonitorExporterBuilder()
            .connectionString(connectionString)
            .buildTraceExporter())
        .build())
    .build();

OpenTelemetrySdk.builder()
    .setTracerProvider(tracerProvider)
    .buildAndRegisterGlobal();

String endpoint = System.getenv("AZURE_VOICELIVE_ENDPOINT");
VoiceLiveAsyncClient client = new VoiceLiveClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildAsyncClient();
```

View the results in the **Tracing** tab in your Foundry project page or in Application Insights.

Reference: [Azure Monitor OpenTelemetry exporter for Java](https://learn.microsoft.com/java/api/overview/azure/monitor-opentelemetry-exporter-readme)

## Add custom span attributes

To correlate Voice Live traces with your application context (session IDs, user IDs, or request identifiers), implement a custom `SpanProcessor` that adds attributes when each span starts.

```java
import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.context.Context;
import io.opentelemetry.sdk.trace.ReadWriteSpan;
import io.opentelemetry.sdk.trace.ReadableSpan;
import io.opentelemetry.sdk.trace.SpanProcessor;

final class CustomAttributesProcessor implements SpanProcessor {
    private final String sessionId;
    private final String userId;

    CustomAttributesProcessor(String sessionId, String userId) {
        this.sessionId = sessionId;
        this.userId = userId;
    }

    @Override
    public void onStart(Context parentContext, ReadWriteSpan span) {
        span.setAttribute(AttributeKey.stringKey("app.session_id"), sessionId);
        span.setAttribute(AttributeKey.stringKey("app.user_id"), userId);
    }

    @Override
    public boolean isStartRequired() { return true; }

    @Override
    public void onEnd(ReadableSpan span) { }

    @Override
    public boolean isEndRequired() { return false; }
}
```

Register the custom processor with the tracer provider before registering the global `OpenTelemetry` instance:

```java
SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
    .addSpanProcessor(new CustomAttributesProcessor("sess-123", "user-abc"))
    .addSpanProcessor(SimpleSpanProcessor.create(LoggingSpanExporter.create()))
    .build();

OpenTelemetrySdk.builder()
    .setTracerProvider(tracerProvider)
    .buildAndRegisterGlobal();
```

Reference: [OpenTelemetry Java](https://opentelemetry.io/docs/languages/java/)

## Enable content recording

Content recording captures full message payloads (send and receive) on span events. This is useful for debugging but can capture personal data.

> **Caution:**
> Content recording may capture personal data. Only enable in development or controlled environments.

Set the `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` environment variable to `true` before starting your application. No code changes are required.

```bash
export OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true
```

When enabled, the SDK attaches event payloads as `gen_ai.event.content` attributes on the corresponding spans.



**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-voicelive-readme) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-voicelive) | [Additional samples on GitHub](https://aka.ms/voicelive/github-javascript)


## Additional prerequisites

- `@azure/ai-voicelive` package version 1.0.0 or later.
- Node.js version 18 or later.
- Install the telemetry dependencies:

  ```bash
  npm install @opentelemetry/api @opentelemetry/sdk-trace-node @azure/core-tracing
  ```

  For Azure Monitor export, install instead:

  ```bash
  npm install @azure/monitor-opentelemetry-exporter
  ```

  For browser-based applications, use `@opentelemetry/sdk-trace-web` instead of `@opentelemetry/sdk-trace-node`.

## Enable console tracing

First register an OpenTelemetry provider, then bridge `@azure/core-tracing` into OpenTelemetry via `useInstrumenter()` so the SDK emits spans. Add this code before constructing the `VoiceLiveClient`.

```javascript
import {
  NodeTracerProvider,
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-node";
import { useInstrumenter } from "@azure/core-tracing";
import { trace, context } from "@opentelemetry/api";
import { VoiceLiveClient } from "@azure/ai-voicelive";
import { DefaultAzureCredential } from "@azure/identity";

// 1. Configure OpenTelemetry with a console exporter.
const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});
provider.register();

// 2. Bridge @azure/core-tracing into OpenTelemetry.
useInstrumenter({
  startSpan(name, spanOptions) {
    const ctx = spanOptions.tracingContext ?? context.active();
    const tracer = trace.getTracer(
      spanOptions.packageName ?? "@azure/ai-voicelive",
      spanOptions.packageVersion,
    );
    const span = tracer.startSpan(name, { attributes: spanOptions.spanAttributes, kind: 0 }, ctx);
    return {
      span: {
        end() { span.end(); },
        setStatus(s) {
          if (s.status === "error") span.setStatus({ code: 2, message: String(s.error ?? "") });
        },
        setAttribute(k, v) { span.setAttribute(k, v); },
        isRecording() { return span.isRecording(); },
        recordException(e) { span.recordException(e); },
      },
      tracingContext: trace.setSpan(ctx, span),
    };
  },
  withContext(ctx, fn, ...args) { return context.with(ctx, fn, undefined, ...args); },
  parseTraceparentHeader() { return undefined; },
  createRequestHeaders() { return {}; },
});

// 3. Use VoiceLive as normal — spans are emitted automatically.
const client = new VoiceLiveClient(
  process.env.AZURE_VOICELIVE_ENDPOINT,
  new DefaultAzureCredential(),
);
const session = client.createSession("gpt-realtime");
await session.connect();
```

All connect, send, and receive operations now produce spans printed to stdout.

> **Note:**
> The samples in this article use `useInstrumenter()` for ESM compatibility. If your app is CommonJS, you can use the standard `createAzureSdkInstrumentation()` from `@azure/opentelemetry-instrumentation-azure-sdk` instead.

Reference: [OpenTelemetry JavaScript SDK](https://opentelemetry.io/docs/languages/js/) | [VoiceLiveClient](https://learn.microsoft.com/javascript/api/@azure/ai-voicelive/voiceliveclient)

> 
> [Complete console tracing sample](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/voicelive/ai-voicelive/samples/telemetry)

## Export traces to Azure Monitor

To send traces to Application Insights instead of the console, replace the console exporter with `AzureMonitorTraceExporter`. Set the `APPLICATIONINSIGHTS_CONNECTION_STRING` environment variable, then add the following code. The `useInstrumenter()` bridge from the previous section is still required.

```javascript
import { NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

const exporter = new AzureMonitorTraceExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
});
const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});
provider.register();

// Register the same useInstrumenter() bridge shown in the console tracing section.
```

View the results in the **Tracing** tab in your Foundry project page or in Application Insights.

Reference: [Azure Monitor OpenTelemetry exporter for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/monitor-opentelemetry-exporter-readme)

## Add custom span attributes

To correlate Voice Live traces with your application context (session IDs, user IDs, or request identifiers), implement a custom `SpanProcessor` that adds attributes when each span starts.

```javascript
class CustomAttributesProcessor {
  constructor(sessionId, userId) {
    this._sessionId = sessionId;
    this._userId = userId;
  }

  onStart(span) {
    span.setAttribute("app.session_id", this._sessionId);
    span.setAttribute("app.user_id", this._userId);
  }

  onEnd() { }
  async shutdown() { }
  async forceFlush() { }
}
```

Register the custom processor on the tracer provider before calling `provider.register()`:

```javascript
const provider = new NodeTracerProvider({
  spanProcessors: [
    new CustomAttributesProcessor("sess-123", "user-abc"),
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
  ],
});
provider.register();
```

Reference: [OpenTelemetry JavaScript SDK](https://opentelemetry.io/docs/languages/js/)

## Enable browser tracing

For browser-based applications, use `WebTracerProvider` instead of `NodeTracerProvider`. The same `useInstrumenter()` bridge applies. Spans can be exported to an in-page element, the browser console, or any OpenTelemetry-compatible backend.

```javascript
import { WebTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-web";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { useInstrumenter } from "@azure/core-tracing";
import { trace, context } from "@opentelemetry/api";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const provider = new WebTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});
provider.register();

// Register the same useInstrumenter() bridge shown in the console tracing section.

// Browsers don't support DefaultAzureCredential. Use AzureKeyCredential instead.
const credential = { key: import.meta.env.VITE_VOICELIVE_API_KEY };
const client = new VoiceLiveClient(import.meta.env.VITE_VOICELIVE_ENDPOINT, credential);
const session = client.createSession("gpt-realtime");
await session.connect();
```

> **Note:**
> Browsers don't support `DefaultAzureCredential`. Use `AzureKeyCredential` or a bearer-token flow instead.

> 
> [Complete browser tracing sample](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/voicelive/ai-voicelive/samples/telemetry-browser)

## Enable content recording

Content recording captures full message payloads (send and receive) on span events. This is useful for debugging but can capture personal data.

> **Caution:**
> Content recording may capture personal data. Only enable in development or controlled environments.

Set the `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` environment variable to `true` before starting your application. No code changes are required.

```bash
export OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true
```

When enabled, the SDK attaches event payloads as `gen_ai.event.content` attributes on the corresponding spans.




## Production best practices

- **Batch export**: Use `BatchSpanProcessor` instead of `SimpleSpanProcessor` in production to reduce overhead.
- **Sampling**: Configure a sampling strategy to control trace volume at scale.
- **Sensitive data**: Don't enable content recording in production. Message payloads can contain personal data.
- **Correlation**: Use custom span attributes to add session or user identifiers so you can filter traces in your observability backend.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| No spans appear | Missing `AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING` env var | Set `AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING=true` |
| No spans appear | `VoiceLiveInstrumentor().instrument()` not called | Call `instrument()` before `connect()` |
| Spans missing in Azure Monitor | Missing or invalid connection string | Verify `APPLICATIONINSIGHTS_CONNECTION_STRING` is set correctly |
| Spans appear in console but not in Azure Monitor | Using `ConsoleSpanExporter` instead of Azure Monitor | Switch to `configure_azure_monitor()` |
| Custom attributes missing | Processor registered after spans are created | Register the custom processor before calling `connect()` |


## Related content

- [Voice Live quickstart](voice-live-quickstart.md)
- [Voice Live agents quickstart](voice-live-agents-quickstart.md)
- [Voice Live API reference](voice-live-api-reference-2026-04-10.md)
- [Voice Live SDK overview](voice-live-sdk.md)
