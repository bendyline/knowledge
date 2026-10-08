# Source code: docs/core/diagnostics/snippets/OTLP-Example/csharp/appsettings.Development.json

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
    "OTEL_SERVICE_NAME": "OTLP-Example",
    "OTEL_RESOURCE_ATTRIBUTES": "service.instance.id=local-test",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_METRIC_EXPORT_INTERVAL":  1000
}

```
