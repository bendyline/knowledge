# Source code: docs/core/extensions/snippets/configuration/worker-service/appsettings.Production.json

Complete source file; linked examples may select a region or line range.

```
{
    "Logging": {
        "LogLevel": {
            "Default": "Error",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Warning"
        },
        "Debug": {
            "LogLevel": {
                "Default": "Information"
            }
        },
        "Console": {
            "IncludeScopes": true,
            "LogLevel": {
                "Microsoft.Extensions.Hosting": "Warning",
                "Default": "Information"
            }
        },
        "EventSource": {
            "LogLevel": {
                "Microsoft": "Information"
            }
        },
        "EventLog": {
            "LogLevel": {
                "Microsoft": "Information"
            }
        },
        "AzureAppServicesFile": {
            "IncludeScopes": true,
            "LogLevel": {
                "Default": "Warning"
            }
        },
        "AzureAppServicesBlob": {
            "IncludeScopes": true,
            "LogLevel": {
                "Microsoft": "Information"
            }
        },
        "ApplicationInsights": {
            "LogLevel": {
                "Default": "Information"
            }
        }
    }
}
```
