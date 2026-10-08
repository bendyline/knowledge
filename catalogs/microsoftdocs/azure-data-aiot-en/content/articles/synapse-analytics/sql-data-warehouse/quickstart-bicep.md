---
title: Create an Azure Synapse Analytics dedicated SQL pool (formerly SQL DW) using Bicep
description: Learn how to create an Azure Synapse Analytics SQL pool using Bicep.
services: azure-resource-manager
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
tags: azure-resource-manager, bicep
ms.topic: quickstart
author: joannapea 
ms.author: joanpo
ms.date: 05/20/2022
ms.custom: subject-armqs, mode-arm, devx-track-bicep
---

# Quickstart: Create an Azure Synapse Analytics dedicated SQL pool (formerly SQL DW) using Bicep

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

This Bicep file will create a dedicated SQL pool (formerly SQL DW) with Transparent Data Encryption enabled. Dedicated SQL pool (formerly SQL DW) refers to the enterprise data warehousing features that are generally available in Azure Synapse.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/sql-data-warehouse/quickstart-bicep.md)

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/sql-data-warehouse-transparent-encryption-create/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.sql/sql-data-warehouse-transparent-encryption-create/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/sql-data-warehouse/quickstart-bicep.md)

The Bicep file defines one resource:

- [Microsoft.Sql/servers](https://learn.microsoft.com/azure/templates/microsoft.sql/servers)

## Deploy the Bicep file

1. Save the Bicep file as `main.bicep` to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters sqlAdministratorLogin=<admin-login> databasesName=<db-name> capacity=<int>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -sqlAdministratorLogin "<admin-login>" -databasesName "<db-name>" -capacity <int>
    ```

    ---

    > **Note:**
    > Replace **\<admin-login\>** with the administrator login username for the SQL server. Replace **\<db-name\>** with the name of the database. Replace **\<int\>** with the DW performance level. The minimum value is 900 and the maximum value is 54000. You'll also be prompted to enter **sqlAdministratorPassword**.

  When the deployment finishes, you should see a message indicating the deployment succeeded.

## Review deployed resources

Use the Azure portal, Azure CLI, or Azure PowerShell to list the deployed resources in the resource group.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

## Clean up resources

When no longer needed, use the Azure portal, Azure CLI, or Azure PowerShell to delete the resource group and its resources.

# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

## Next steps

In this quickstart, you created a dedicated SQL pool (formerly SQL DW) using Bicep and validated the deployment. To learn more about Azure Synapse Analytics and Bicep, see the articles below.

- Read an [Overview of Azure Synapse Analytics](sql-data-warehouse-overview-what-is.md)
- Learn more about [Bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/overview.md)
- [Quickstart: Create Bicep files with Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code.md)
