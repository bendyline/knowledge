# Source code: docs/core/extensions/snippets/logging/log-sampling/appsettings.updated.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "RandomProbabilisticSampler": {
      "Rules": [
        {
          "Probability": 0.01,
          "LogLevel": "Information"
        }
      ]
    }
  }
}
```
