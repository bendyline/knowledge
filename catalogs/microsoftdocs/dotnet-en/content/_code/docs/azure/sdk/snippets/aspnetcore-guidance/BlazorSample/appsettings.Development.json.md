# Source code: docs/azure/sdk/snippets/aspnetcore-guidance/BlazorSample/appsettings.Development.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Azure.Messaging.ServiceBus": "Debug"
    }
  },
  "AzureDefaults": {
    "Diagnostics": {
      "IsTelemetryDisabled": false,
      "IsLoggingContentEnabled": true
    },
    "Retry": {
      "MaxRetries": 3,
      "Mode": "Exponential"
    }
  },
  "KeyVault": {
    "VaultUri": "https://<your-key-vault-name>.vault.azure.net",
    "Retry": {
      "maxRetries": 10
    }
  },
  "ServiceBus": {
    "Namespace": "<your_service-bus_namespace>.servicebus.windows.net"
  },
  "Storage": {
    "ServiceUri": "https://<your-storage-account-name>.storage.windows.net"
  }
}

```
