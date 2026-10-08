# Source code: docs/core/extensions/snippets/configuration/options-recursive-validation/appsettings-invalid.json

Complete source file; linked examples may select a region or line range.

```
{
  "ApplicationWithoutAttribute": {
    "ApplicationName": "My App",
    "Database": {
      "ConnectionString": "",
      "MaxRetries": 150,
      "TimeoutSeconds": 500
    },
    "Servers": [
      {
        "HostName": "invalid hostname with spaces",
        "Port": 0
      }
    ]
  },
  "ApplicationWithAttribute": {
    "ApplicationName": "My App",
    "Database": {
      "ConnectionString": "",
      "MaxRetries": 150,
      "TimeoutSeconds": 500
    },
    "Servers": [
      {
        "HostName": "invalid hostname with spaces",
        "Port": 0
      }
    ]
  }
}

```
