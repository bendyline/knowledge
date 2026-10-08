---
title: "Azure CLI Example: Scale an Elastic Pool"
description: Use an Azure CLI example script to scale an elastic pool in Azure SQL Database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 06/10/2025
ms.service: azure-sql-database
ms.subservice: elastic-pools
ms.topic: sample
ms.custom:
  - sqldbrb=1
  - devx-track-azurecli
ms.devlang: azurecli
---

# Scale an elastic pool in Azure SQL Database using the Azure CLI



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This Azure CLI script example creates elastic pools in Azure SQL Database, moves pooled databases, and changes elastic pool compute sizes.

If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


[Include unavailable in this source snapshot: ~/../reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/scripts/scale-pool-cli.md)

## Sample script


### Launch Azure Cloud Shell

The Azure Cloud Shell is a free interactive shell that you can use to run the steps in this article. It has common Azure tools preinstalled and configured to use with your account.

To open the Cloud Shell, select **Try it** from the upper right corner of a code block. You can also launch Cloud Shell in a separate browser tab by going to <https://shell.azure.com>.

When Cloud Shell opens, verify that **Bash** is selected for your environment. Subsequent sessions will use Azure CLI in a Bash environment. Select **Copy** to copy the blocks of code, paste it into the Cloud Shell, and press **Enter** to run it.

### Sign in to Azure

Cloud Shell is automatically authenticated under the initial account signed-in with. Use the following script to sign in using a different subscription, replacing `<Subscription ID>` with your Azure Subscription ID.  If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


```azurecli-interactive
subscription="<subscriptionId>" # add subscription here

az account set -s $subscription # ...or use 'az login'
```

For more information, see [set active subscription](https://learn.microsoft.com/cli/azure/account#az-account-set) or [log in interactively](https://learn.microsoft.com/cli/azure/reference-index#az-login)


### Run the script

[Code reference unavailable in this source snapshot: ~/../azure_cli_scripts/sql-database/scale-pool/scale-pool.sh](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/scripts/scale-pool-cli.md)

## Clean up resources


Use the following command to remove the resource group and all resources associated with it using the [az group delete](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-set) command - unless you have an ongoing need for these resources. Some of these resources may take a while to create, as well as to delete.


```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command-specific documentation.

| Command | Description |
| --- | --- |
| [az sql server](https://learn.microsoft.com/cli/azure/sql/server) | Server commands. |
| [az sql db](https://learn.microsoft.com/cli/azure/sql/db) | Database commands. |
| [az sql elastic-pools](https://learn.microsoft.com/cli/azure/sql/elastic-pool) | Elastic pool commands. |

## Related content

- [Azure CLI documentation](https://learn.microsoft.com/cli/azure)
- [Azure CLI samples for Azure SQL Database](../az-cli-script-samples-content-guide.md)
