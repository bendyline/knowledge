---
title: Use Azure CLI to enable transparent data encryption
description: Enable transparent data encryption in Azure SQL Managed Instance using CLI and your own key.
author: MladjoA
ms.author: mlandzic
ms.reviewer: vanto
ms.date: 05/18/2022
ms.service: azure-sql-managed-instance
ms.subservice: security
ms.topic: how-to
ms.custom: kr2b-contr-experiment, devx-track-azurecli
ms.devlang: azurecli
---

# Azure CLI script to enable transparent data encryption using your own key



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This Azure CLI script example configures transparent data encryption (TDE) in Azure SQL Managed Instance, using a customer-managed key from Azure Key Vault. This is often referred to as a bring-your-own-key (BYOK) scenario for TDE. To learn more about TDE with customer-managed key, see [TDE Bring Your Own Key to Azure SQL](../../database/transparent-data-encryption-byok-overview.md).

This sample requires an existing managed instance, see [Use Azure CLI to create an Azure SQL Managed Instance](create-configure-managed-instance-cli.md).

If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


[Include unavailable in this source snapshot: ~/../reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/transparent-data-encryption-byok-sql-managed-instance-cli.md)

## Sample script


For this script, use Azure CLI locally as it takes too long to run in Cloud Shell. 

### Sign in to Azure

Use the following script to sign in using a specific subscription.

```azurecli-interactive
subscription="<subscriptionId>" # add subscription here

az account set -s $subscription # ...or use 'az login'
```

For more information, see [set active subscription](https://learn.microsoft.com/cli/azure/account#az-account-set) or [log in interactively](https://learn.microsoft.com/cli/azure/reference-index#az-login)


### Run the script

[Code reference unavailable in this source snapshot: ~/../azure_cli_scripts/sql-database/transparent-data-encryption/setup-tde-byok-sqlmi.sh](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/transparent-data-encryption-byok-sql-managed-instance-cli.md)

## Clean up resources


Use the following command to remove the resource group and all resources associated with it using the [az group delete](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-set) command - unless you have an ongoing need for these resources. Some of these resources may take a while to create, as well as to delete.


```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command specific documentation.

| Command | Description |
| --- | --- |
| [az sql db](https://learn.microsoft.com/cli/azure/sql/db) | Database commands. |
| [az sql failover-group](https://learn.microsoft.com/cli/azure/sql/failover-group) | Failover group commands. |

## Next steps

For more information on Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

Additional SQL Database CLI script samples can be found in the [Azure SQL Database documentation](../../database/az-cli-script-samples-content-guide.md).
