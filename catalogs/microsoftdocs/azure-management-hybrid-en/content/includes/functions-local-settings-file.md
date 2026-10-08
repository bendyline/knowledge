---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 08/04/2023
ms.author: glenga
---

## <a name="local-settings"></a>Work with app settings locally

When your function app runs in Azure, settings required by your functions are [stored encrypted in app settings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-how-to-use-azure-function-app-settings.md#settings). During local development, these settings are instead added to the `Values` collection in the *local.settings.json* file. The *local.settings.json* file also stores settings used by local development tools. 

Items in the `Values` collection in your project's *local.settings.json* file are intended to mirror items in your function app's [application settings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-how-to-use-azure-function-app-settings.md#settings) in Azure.
