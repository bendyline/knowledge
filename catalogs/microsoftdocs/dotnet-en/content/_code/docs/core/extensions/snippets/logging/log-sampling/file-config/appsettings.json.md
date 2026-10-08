# Source code: docs/core/extensions/snippets/logging/log-sampling/file-config/appsettings.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug"
    }
  },

  "RandomProbabilisticSampler": {
    "Rules": [
      {
        "CategoryName": "Microsoft.AspNetCore.*",
        "Probability": 0.25,
        "LogLevel": "Information"
      },
      {
        "CategoryName": "System.*",
        "Probability": 0.1
      },
      {
        "EventId": 1001,
        "Probability": 0.05
      }
    ]
  }
}

```
