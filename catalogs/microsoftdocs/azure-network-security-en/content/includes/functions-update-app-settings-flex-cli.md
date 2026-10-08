---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 05/15/2025
ms.author: glenga
---

## Update application settings

To enable the Functions host to connect to the default storage account using shared secrets, you must replace the `AzureWebJobsStorage` connection string setting with a complex setting, prefixed with `AzureWebJobsStorage`, that uses the user-assigned managed identity to connect to the storage account.

1. Remove the existing `AzureWebJobsStorage` connection string setting:

    [Code reference unavailable in this source snapshot: ~/azure_cli_scripts/azure-functions/create-function-app-flex-plan-identities/create-function-app-flex-plan-identities.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-update-app-settings-flex-cli.md)

    The [az functionapp config appsettings delete](https://learn.microsoft.com/cli/azure/functionapp/config/appsettings#az-functionapp-config-appsettings-delete) command removes this setting from your app.

1. Add equivalent settings, with an `AzureWebJobsStorage__` prefix, that define a user-assigned managed identity connection to the default storage account:
 
    [Code reference unavailable in this source snapshot: ~/azure_cli_scripts/azure-functions/create-function-app-flex-plan-identities/create-function-app-flex-plan-identities.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-update-app-settings-flex-cli.md)
