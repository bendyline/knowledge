---
title: "Azure CLI example: Create a managed instance"
description: Use this Azure CLI example script to create a managed instance in Azure SQL Managed Instance.
author: urosmil
ms.author: urmilano
ms.reviewer: mathoma
ms.date: 02/26/2024
ms.service: azure-sql-managed-instance
ms.subservice: deployment-configuration
ms.topic: sample
ms.custom: devx-track-azurecli
ms.devlang: azurecli
---

# Create an Azure SQL Managed Instance using the Azure CLI



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This Azure CLI script example creates an Azure SQL Managed Instance in a dedicated subnet within a new virtual network. It also configures a route table and a network security group for the virtual network. Once the script has been successfully run, the managed instance can be accessed from within the virtual network or from an on-premises environment. See [Configure Azure VM to connect to an Azure SQL Managed Instance](../connect-vm-instance-configure.md) and [Configure a point-to-site connection to an Azure SQL Managed Instance from on-premises](../point-to-site-p2s-configure.md).

> **Important:**
> For limitations, see [supported regions](../resource-limits.md#supported-regions) and [supported subscription types](../resource-limits.md#supported-subscription-types).

If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


[Include unavailable in this source snapshot: ~/../reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/create-configure-managed-instance-cli.md)

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

[Code reference unavailable in this source snapshot: ~/../azure_cli_scripts/sql-database/managed-instance/create-managed-instance.sh](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/create-configure-managed-instance-cli.md)

## Clean up resources


Use the following command to remove the resource group and all resources associated with it using the [az group delete](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-set) command - unless you have an ongoing need for these resources. Some of these resources may take a while to create, as well as to delete.


```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command specific documentation.

| Command | Description |
| --- | --- |
| [az network vnet](https://learn.microsoft.com/cli/azure/network/vnet) | Virtual network commands. |
| [az network vnet subnet](https://learn.microsoft.com/cli/azure/network/vnet/subnet) | Virtual network subnet commands. |
| [az network route-table](https://learn.microsoft.com/cli/azure/network/route-table) | Network route table commands. |
| [az sql mi](https://learn.microsoft.com/cli/azure/sql/mi) | SQL Managed Instance commands. |
| [az sql midb](https://learn.microsoft.com/cli/azure/sql/midb) | Database commands for SQL Managed Instance. |

## Next steps

For more information on Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

Other SQL Database CLI script samples can be found in the [Azure SQL Database documentation](../../database/az-cli-script-samples-content-guide.md).
