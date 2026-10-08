---
title: Azure CLI Script Sample - Delete containers by prefix
description: Delete Azure Storage blob containers based on a container name prefix, then clean up the deployment. See help links for commands used in the script sample.
services: storage
author: stevenmatthew
ms.service: azure-storage
ms.devlang: azurecli
ms.topic: sample
ms.date: 03/01/2022
ms.author: shaas 
ms.custom: devx-track-azurecli
# Customer intent: "As a cloud administrator, I want to execute a script that deletes blob containers based on a name prefix, so that I can efficiently manage storage resources and perform clean-up tasks without manual intervention."
---

# Use an Azure CLI script to delete containers based on container name prefix

This script first creates a few sample containers in Azure Blob storage, then deletes some of the containers based on a prefix in the container name.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-delete-by-prefix-cli.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-delete-by-prefix-cli.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-delete-by-prefix-cli.md)

### Run the script

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/storage/delete-containers-by-prefix/delete-containers-by-prefix.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-delete-by-prefix-cli.md)

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-delete-by-prefix-cli.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands to delete containers based on container name prefix. Each item in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [az group create](https://learn.microsoft.com/cli/azure/group) | Creates a resource group in which all resources are stored. |
| [az storage account create](https://learn.microsoft.com/cli/azure/storage/account) | Creates an Azure Storage account in the specified resource group. |
| [az storage container create](https://learn.microsoft.com/cli/azure/storage/container) | Creates a container in Azure Blob storage. |
| [az storage container list](https://learn.microsoft.com/cli/azure/storage/container) | Lists the containers in an Azure Storage account. |
| [az storage container delete](https://learn.microsoft.com/cli/azure/storage/container) | Deletes containers in an Azure Storage account. |

## Next steps

For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

Additional storage CLI script samples can be found in the [Azure CLI samples for Azure Storage](../blobs/storage-samples-blobs-cli.md).
