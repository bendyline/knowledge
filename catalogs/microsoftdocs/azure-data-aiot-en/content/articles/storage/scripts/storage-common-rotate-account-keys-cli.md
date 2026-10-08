---
title: Azure CLI Script Sample - Rotate storage account access keys
description: Create an Azure Storage account, then retrieve and rotate its account access keys.
services: storage
author: stevenmatthew
ms.service: azure-storage
ms.devlang: azurecli
ms.topic: sample
ms.date: 03/02/2022
ms.author: shaas 
ms.custom: devx-track-azurecli
# Customer intent: "As a cloud administrator, I want to create a storage account and rotate its access keys using scripts, so that I can securely manage access credentials and maintain compliance."
---

# Create a storage account and rotate its account access keys

This script creates an Azure Storage account, displays the new storage account's access keys, then renews (rotates) the keys.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-common-rotate-account-keys-cli.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-common-rotate-account-keys-cli.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-common-rotate-account-keys-cli.md)

### Run the script

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/storage/rotate-storage-account-keys/rotate-storage-account-keys.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-common-rotate-account-keys-cli.md)

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/scripts/storage-common-rotate-account-keys-cli.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands to create the storage account and retrieve and rotate its access keys. Each item in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [az group create](https://learn.microsoft.com/cli/azure/group) | Creates a resource group in which all resources are stored. |
| [az storage account create](https://learn.microsoft.com/cli/azure/storage/account) | Creates an Azure Storage account in the specified resource group. |
| [az storage account keys list](https://learn.microsoft.com/cli/azure/storage/account/keys) | Displays the storage account access keys for the specified account. |
| [az storage account keys renew](https://learn.microsoft.com/cli/azure/storage/account/keys) | Regenerates the primary or secondary storage account access key. |

## Next steps

For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

Additional storage CLI script samples can be found in the [Azure CLI samples for Azure Blob storage](../blobs/storage-samples-blobs-cli.md).
