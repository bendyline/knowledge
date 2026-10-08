# Source code: docs/core/extensions/snippets/logging/log-buffering/per-request/file-based/appsettingsUpdated.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.*": "None"
    },

    "PerIncomingRequestLogBuffering": {
      "Rules": [
        {
          "LogLevel": "Information"
        }
      ]
    }
  }
}

```
