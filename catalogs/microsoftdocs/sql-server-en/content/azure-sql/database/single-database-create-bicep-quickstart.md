---
title: "Bicep: Create a single database"
description: Create a single database in Azure SQL Database using Bicep.
author: dimitri-furman
ms.author: dfurman
ms.reviewer: mathoma
ms.date: 01/23/2026
ms.service: azure-sql-database
ms.subservice: deployment-configuration
ms.topic: quickstart
ms.custom:
  - subject-armqs sqldbrb=1
  - mode-arm
  - devx-track-bicep
---

# Quickstart: Create a single database in Azure SQL Database using Bicep



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

Creating a [single database](single-database-overview.md) is the quickest and simplest option for creating a database in Azure SQL Database. This quickstart shows you how to create a single database using Bicep.

[Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep) is a domain-specific language (DSL) that uses declarative syntax to deploy Azure resources. It provides concise syntax, reliable type safety, and support for code reuse. Bicep offers the best authoring experience for your infrastructure-as-code solutions in Azure.

## Prerequisites

If you don't have an Azure subscription, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

### Permissions

**To create databases via Transact-SQL**: `CREATE DATABASE` permissions are necessary. To create a database a login must be either the server admin login (created when the Azure SQL Database logical server was provisioned), the Microsoft Entra admin of the server, a member of the dbmanager database role in `master`. For more information, see [CREATE DATABASE](https://learn.microsoft.com/sql/t-sql/statements/create-database-transact-sql?view=azuresqldb-current\&preserve-view=true).

**To create databases via the Azure portal, PowerShell, Azure CLI, or REST API**: Azure RBAC permissions are needed, specifically the Contributor, SQL DB Contributor, or SQL Server Contributor Azure RBAC role. For more information, see [Azure RBAC built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles).

> **Note:**  
> You can't change some configuration choices after you create the database. Review [Modifiable configuration reference](modifiable-configuration-reference.md) before you deploy.


[Include unavailable in this source snapshot: ~/../reusable-content/ce-skilling/azure/includes/databases/resource-naming-customer-data-note.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-bicep-quickstart.md)

## Review the Bicep file

A single database has a defined set of compute, memory, IO, and storage resources using one of two [purchasing models](purchasing-models.md). When you create a single database, you also define a [server](logical-servers.md) to manage it and place it within [Azure resource group](https://learn.microsoft.com/azure/active-directory-b2c/overview) in a specified region.

> **Important:**
> Do not include any personal, sensitive, or confidential information in the server admin login name field. Data entered in this field is not considered *customer data*.


The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/sql-database/).

[Code reference unavailable in this source snapshot: ~/../quickstart-templates/quickstarts/microsoft.sql/sql-database/main.bicep](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-bicep-quickstart.md)

The following resources are defined in the Bicep file:

- [**Microsoft.Sql/servers**](https://learn.microsoft.com/azure/templates/microsoft.sql/servers)
- [**Microsoft.Sql/servers/databases**](https://learn.microsoft.com/azure/templates/microsoft.sql/servers/databases)

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters administratorLogin=<admin-login>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -administratorLogin "<admin-login>"
    ```

    ---

> **Note:**
> Replace **\<admin-login\>** with the administrator username of the SQL logical server. You'll be prompted to enter **administratorLoginPassword**.


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

## Related content

- Create a server-level firewall rule to connect to the single database from on-premises or remote tools. For more information, see [Create a server-level firewall rule](firewall-create-server-level-portal-quickstart.md).
- After you create a server-level firewall rule, [connect and query](connect-query-content-reference-guide.md) your database using several different tools and languages.
  - [Connect and query using SQL Server Management Studio](connect-query-ssms.md)
- To create a single database using the Azure CLI, see [Azure CLI samples](az-cli-script-samples-content-guide.md).
- To create a single database using Azure PowerShell, see [Azure PowerShell samples](powershell-script-content-guide.md).
- To learn how to create Bicep files, see [Create Bicep files with Visual Studio Code](https://learn.microsoft.com/azure/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code).
