---
title: Azure CLI Script Sample - Delete an Azure App Configuration Store
titleSuffix: Azure App Configuration
description: Delete an Azure App Configuration store using a sample Azure CLI script. See reference article links to commands used in the script.
services: azure-app-configuration
author: maud-lv

ms.service: azure-app-configuration
ms.devlang: azurecli
ms.topic: sample
ms.date: 04/12/2024
ms.author: malev 
ms.custom: devx-track-azurecli
---

# Delete an Azure App Configuration store with the Azure CLI

This sample script deletes an instance of Azure App Configuration using the Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/scripts/cli-delete-service.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/scripts/cli-delete-service.md)

 - This tutorial requires version 2.0 or later of the Azure CLI. If using Azure Cloud Shell, the latest version is already installed.

## Sample script

In the following example, replace the placeholder text _`<AppConfigurationStoreName>`_  and _`<ResourceGroupName>`_ with the name of the App Configuration store and the name of the resource group it belongs to.

```azurecli-interactive
#/bin/bash

# Delete an App Configuration store
az appconfig delete --name <AppConfigurationStoreName> --resource-group <ResourceGroupName>
```

## Clean up deployment

After the sample script has been run, the following command can be used to remove the resource group and all resources associated with it.

```azurecli
az group delete --name myResourceGroup
```


## Script explanation

This script uses the following commands to delete an App Configuration store. Each command in the table links to command specific documentation.

| Command | Notes |
| --- | --- |
| [az appconfig delete](https://learn.microsoft.com/cli/azure/appconfig#az-appconfig-delete) | Deletes an App Configuration store resource. |

## Next steps

For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

Additional App Configuration CLI script samples can be found in the [Azure App Configuration CLI samples](../cli-samples.md).
