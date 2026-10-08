# Source code: docs/core/extensions/snippets/configuration/options-recursive-validation/appsettings.json

Complete source file; linked examples may select a region or line range.

```
{
  "ApplicationWithoutAttribute": {
    "ApplicationName": "My App",
    "Database": {
      "ConnectionString": "Server=localhost;Database=mydb",
      "MaxRetries": 5,
      "TimeoutSeconds": 60
    },
    "Servers": [
      {
        "HostName": "server1.example.com",
        "Port": 8080
      },
      {
        "HostName": "server2.example.com",
        "Port": 8081
      }
    ]
  },
  "ApplicationWithAttribute": {
    "ApplicationName": "My App",
    "Database": {
      "ConnectionString": "Server=localhost;Database=mydb",
      "MaxRetries": 5,
      "TimeoutSeconds": 60
    },
    "Servers": [
      {
        "HostName": "server1.example.com",
        "Port": 8080
      },
      {
        "HostName": "server2.example.com",
        "Port": 8081
      }
    ]
  }
}

```
