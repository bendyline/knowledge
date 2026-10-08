---
title: "Azure CLI Example: Copy Database to New Logical Server"
description: Use this Azure CLI example script to copy a database in Azure SQL Database to a new logical server
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 01/23/2026
ms.service: azure-sql-database
ms.subservice: data-movement
ms.topic: sample
ms.custom:
  - devx-track-azurecli
ms.devlang: azurecli
---

# Copy a database in Azure SQL Database to a new logical server using the Azure CLI



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This Azure CLI script example creates a copy of an existing database in a new Azure SQL Database logical server.

If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


[Include unavailable in this source snapshot: ~/../reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/scripts/copy-database-to-new-server-cli.md)

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

> **Important:**
> Do not include any personal, sensitive, or confidential information in the server admin login name field. Data entered in this field is not considered *customer data*.


[Code reference unavailable in this source snapshot: ~/../azure_cli_scripts/sql-database/copy-database-to-new-server/copy-database-to-new-server.sh](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/scripts/copy-database-to-new-server-cli.md)

## Clean up resources


Use the following command to remove the resource group and all resources associated with it using the [az group delete](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-set) command - unless you have an ongoing need for these resources. Some of these resources may take a while to create, as well as to delete.


```azurecli
az group delete --name $targetResourceGroup
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command specific documentation.

| Command | Description |
| --- | --- |
| [az sql db copy](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-copy) | Creates a copy of a database that uses the snapshot at the current time. |

## Related content

- [Azure CLI documentation](https://learn.microsoft.com/cli/azure)
- [Azure CLI samples for Azure SQL Database](../az-cli-script-samples-content-guide.md)
