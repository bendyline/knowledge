---
author: PatrickFarley
ms.service: azure-ai-speech
ms.topic: include
ms.date: 04/28/2026
ms.author: pafarley
---


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

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-console.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/voice-live-telemetry/python.md)

All `connect`, `send`, and `recv` operations now produce spans printed to stdout.

> 
> [Complete console tracing sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-console.py)

## Export traces to Azure Monitor

To send traces to Application Insights instead of the console, replace the console setup with Azure Monitor configuration. Set the `APPLICATIONINSIGHTS_CONNECTION_STRING` environment variable, then add the following code.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-azure-monitor.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/voice-live-telemetry/python.md)

View the results in the **Tracing** tab in your Azure AI Foundry project page or in Application Insights.

> 
> [Complete Azure Monitor tracing sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-azure-monitor.py)

## Add custom span attributes

To correlate Voice Live traces with your application context (session IDs, user IDs, or request identifiers), create a custom `SpanProcessor`.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-custom-attributes.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/voice-live-telemetry/python.md)

Register the custom processor with the global tracer provider after your standard telemetry setup:

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-custom-attributes.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/voice-live-telemetry/python.md)

> 
> [Complete custom attributes sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-custom-attributes.py)

## Enable content recording

Content recording captures full message payloads (send and receive) in span events as `gen_ai.event.content` attributes. This is useful for debugging but can capture personal data.

> **Caution:**
> Content recording may capture personal data. Only enable in development or controlled environments.

[Code reference unavailable in this source snapshot: ~/voice-live-samples-code/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-content-recording.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/voice-live-telemetry/python.md)

> 
> [Complete content recording sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/python/voice-live-quickstarts/TelemetryQuickstart/telemetry-content-recording.py)
