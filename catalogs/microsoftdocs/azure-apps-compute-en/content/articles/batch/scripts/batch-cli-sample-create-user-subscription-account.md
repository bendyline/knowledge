---
title: Azure CLI Script Example - Create Batch account - user subscription | Microsoft Docs
description: Learn how to create an Azure Batch account in user subscription mode. This account allocates compute nodes into your subscription.
ms.topic: sample
ms.date: 06/16/2026
ms.custom: devx-track-azurecli, seo-azure-cli
keywords: batch, azure cli samples, azure cli examples, azure cli code samples
# Customer intent: "As a cloud administrator, I want to create an Azure Batch account in user subscription mode, so that I can allocate compute nodes and manage resources within my subscription effectively."
---

# CLI example: Create a Batch account in user subscription mode

This script creates an Azure Batch account in user subscription mode. An account that allocates compute nodes into your subscription must be authenticated via a Microsoft Entra token. The compute nodes allocated count toward your subscription's vCPU (core) quota.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-user-subscription-account.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-user-subscription-account.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-user-subscription-account.md)

### Run the script

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/batch/create-account/create-account-user-subscription.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-user-subscription-account.md)

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/scripts/batch-cli-sample-create-user-subscription-account.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [az role assignment create](https://learn.microsoft.com/cli/azure/role) | Create a new role assignment for a user, group, or service principal. |
| [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) | Creates a resource group in which all resources are stored. |
| [az keyvault create](https://learn.microsoft.com/cli/azure/keyvault#az-keyvault-create) | Creates a key vault. |
| [az keyvault set-policy](https://learn.microsoft.com/cli/azure/keyvault#az-keyvault-set-policy) | Update the security policy of the specified key vault. |
| [az batch account create](https://learn.microsoft.com/cli/azure/batch/account#az-batch-account-create) | Creates the Batch account. |
| [az batch account login](https://learn.microsoft.com/cli/azure/batch/account#az-batch-account-login) | Authenticates against the specified Batch account for further CLI interaction. |
| [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) | Deletes a resource group including all nested resources. |

## Next steps

For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).
