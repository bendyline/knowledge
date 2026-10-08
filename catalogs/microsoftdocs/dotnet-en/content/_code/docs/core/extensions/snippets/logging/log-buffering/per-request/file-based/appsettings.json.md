# Source code: docs/core/extensions/snippets/logging/log-buffering/per-request/file-based/appsettings.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.*": "None"
    },

    "PerIncomingRequestLogBuffering": {
      "AutoFlushDuration": "00:00:05",
      "Rules": [
        {
          "CategoryName": "PerRequestLogBufferingFileBased.*",
          "LogLevel": "Information"
        }
      ]
    }
  }
}

```
