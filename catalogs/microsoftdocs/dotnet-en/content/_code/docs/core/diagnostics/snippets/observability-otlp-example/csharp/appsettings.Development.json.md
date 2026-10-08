# Source code: docs/core/diagnostics/snippets/observability-otlp-example/csharp/appsettings.Development.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "OTEL_EXPORTER_OTLP_ENDPOINT": "http://localhost:4317",
  "OTEL_SERVICE_NAME": "OTLP-Example"
}

```
