# Source code: docs/azure/sdk/snippets/logging/appsettings.Development.json

Complete source file; linked examples may select a region or line range.

```
{
    "ConnectionStrings": {
        "ServiceBus": "<connection_string>"
    },
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning",
            "Azure.Messaging.ServiceBus": "Debug"
        }
    },
    "AllowedHosts": "*"
}

```
