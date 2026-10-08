---
title: Azure CLI Script Example - Create Batch account - Batch service | Microsoft Docs
description: Learn how to create a Batch account in Batch service mode with this Azure CLI script example. This script also shows how to query or update various properties of the account.
ms.topic: sample
ms.date: 06/16/2026
ms.custom: devx-track-azurecli, seo-azure-cli
keywords: batch, azure cli samples, azure cli code samples, azure cli script samples
# Customer intent: "As a cloud administrator, I want to create and manage a Batch account using CLI scripts, so that I can efficiently allocate compute resources and manage configurations for batch processing tasks."
---

# CLI example: Create a Batch account in Batch service mode

This script creates an Azure Batch account in Batch service mode and shows how to query or update various properties of the account. When you create a Batch account in the default Batch service mode, its compute nodes are assigned internally by the Batch
service. Allocated compute nodes are subject to a separate vCPU (core) quota and the account can be authenticated either via shared key credentials or a Microsoft Entra token.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-account.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-account.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-account.md)

### Run the script

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/batch/create-account/create-account.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-account.md)

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-account.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) | Creates a resource group in which all resources are stored. |
| [az batch account create](https://learn.microsoft.com/cli/azure/batch/account#az-batch-account-create) | Creates the Batch account. |
| [az storage account create](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-create) | Creates a storage account. |
| [az batch account set](https://learn.microsoft.com/cli/azure/batch/account#az-batch-account-set) | Updates properties of the Batch account. |
| [az batch account show](https://learn.microsoft.com/cli/azure/batch/account#az-batch-account-show) | Retrieves details of the specified Batch account. |
| [az batch account keys list](https://learn.microsoft.com/cli/azure/batch/account/keys#az-batch-account-keys-list) | Retrieves the access keys of the specified Batch account. |
| [az batch account login](https://learn.microsoft.com/cli/azure/batch/account#az-batch-account-login) | Authenticates against the specified Batch account for further CLI interaction. |
| [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) | Deletes a resource group including all nested resources. |

## Next steps

For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).
