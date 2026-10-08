---
title: Azure CLI script sample - Import to an App Configuration store
titleSuffix: Azure App Configuration
description: Use an Azure CLI script to import configuration into an Azure App Configuration store.
author: maud-lv
ms.service: azure-app-configuration
ms.devlang: azurecli
ms.topic: sample
ms.date: 9/1/2026
ms.author: malev 
ms.custom: devx-track-azurecli
ai-usage: ai-assisted
---

# Import to an Azure App Configuration store

This sample script imports key-value settings to an Azure App Configuration store.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/scripts/cli-import.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/scripts/cli-import.md)

- This sample requires version 2.0 or later of the Azure CLI. If you use Azure Cloud Shell, the latest version is already installed.

## Sample script

In the following example, replace the placeholder text _`<AppConfigurationStoreName>`_ with the name of your App Configuration store.

```azurecli-interactive
#!/bin/bash

# Import key-values from a file
az appconfig kv import --name <AppConfigurationStoreName> --source file --format json --path ~/Import.json
```

## Clean up deployment

After the sample script has been run, the following command can be used to remove the resource group and all resources associated with it.

```azurecli
az group delete --name myResourceGroup
```


## Script explanation

This script uses the following commands to import to an App Configuration store. Each command in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [az appconfig kv import](https://learn.microsoft.com/cli/azure/appconfig/kv#az-appconfig-kv-import) | Imports to an App Configuration store resource. |

## Next steps

For more information on the Azure CLI, see the [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

More App Configuration CLI script samples can be found in the [Azure App Configuration CLI samples](../cli-samples.md).
