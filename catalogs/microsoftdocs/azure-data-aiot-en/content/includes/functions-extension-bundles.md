---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 03/17/2022
ms.author: glenga
---

The easiest way to install binding extensions is to enable [extension bundles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/extension-bundles.md). When you enable bundles, a predefined set of extension packages is automatically installed.

To enable extension bundles, open the host.json file and update its contents to match the following code:

```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[3.*, 4.0.0)"
    }
}
```
