---
title: Azure CLI Script Sample - Calculate blob container size
description: Calculate the size of a container in Azure Blob storage by totaling the size of the blobs in the container.
services: storage
author: stevenmatthew
ms.service: azure-storage
ms.devlang: azurecli
ms.topic: sample
ms.date: 03/01/2022
ms.author: shaas 
ms.custom: devx-track-azurecli
# Customer intent: "As a cloud administrator, I want to calculate the size of a Blob storage container using a script, so that I can efficiently manage storage usage and monitor my resource consumption."
---

# Calculate the size of a Blob storage container

This script calculates the size of a container in Azure Blob storage by totaling the size of the blobs in the container.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-calculate-size-cli.md)

> **Important:**
> This CLI script provides an estimated size for the container and should not be used for billing calculations.
>
> The maximum number of blobs returned with a single listing call is 5000. If you need to return more than 5000 blobs, use a continuation token to request additional sets of results.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-calculate-size-cli.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-calculate-size-cli.md)

### Run the script

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/storage/calculate-container-size/calculate-container-size.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-calculate-size-cli.md)

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-blobs-container-calculate-size-cli.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands to calculate the size of the Blob storage container. Each item in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [az group create](https://learn.microsoft.com/cli/azure/group) | Creates a resource group in which all resources are stored. |
| [az storage blob upload](https://learn.microsoft.com/cli/azure/storage/account) | Uploads local files to an Azure Blob storage container. |
| [az storage blob list](https://learn.microsoft.com/cli/azure/storage/blob#az-storage-blob-list) | Lists the blobs in an Azure Blob storage container. |

## Next steps

For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

Additional storage CLI script samples can be found in the [Azure CLI samples for Azure Blob storage](../blobs/storage-samples-blobs-cli.md).
