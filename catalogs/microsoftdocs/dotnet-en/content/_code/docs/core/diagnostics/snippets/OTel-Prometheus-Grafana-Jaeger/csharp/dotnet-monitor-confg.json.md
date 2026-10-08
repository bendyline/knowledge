# Source code: docs/core/diagnostics/snippets/OTel-Prometheus-Grafana-Jaeger/csharp/dotnet-monitor-confg.json

Complete source file; linked examples may select a region or line range.

```
{
  "$schema": "https://aka.ms/dotnet-monitor-schema",
  "DefaultProcess": {
    "Filters": [
      {
        "Key": "ProcessName",
        "Value": "OTel-Prometheus-Graphana-Yaeger"
      }
    ]
  },
  "Metrics": {
    "IncludeDefaultProviders": true,
    "Providers": [
      {
        "ProviderName": "OtPrGrYa.Sample"
      },
      {
        "ProviderName": "Microsoft.AspNetCore.Hosting",
        "MetricType": "Meter"
      }
    ]
  }
}

```
