---
title: "Azure Resource Manager: Create a single database"
description: Create a single database in Azure SQL Database using an Azure Resource Manager template.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 01/23/2026
ms.service: azure-sql-database
ms.subservice: deployment-configuration
ms.topic: quickstart
ms.custom:
  - subject-armqs sqldbrb=1
  - mode-arm
  - devx-track-arm-template
---

# Quickstart: Create a single database in Azure SQL Database using an ARM template



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

Creating a [single database](single-database-overview.md) is the quickest and simplest option for creating a database in Azure SQL Database. This quickstart shows you how to create a single database using an Azure Resource Manager template (ARM template).


An [ARM template](https://learn.microsoft.com/azure/azure-resource-manager/templates/overview) is a JavaScript Object Notation (JSON) file that defines the infrastructure and configuration for your project. The template uses declarative syntax. In declarative syntax, you describe your intended deployment without writing the sequence of programming commands to create the deployment.

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

[Deploy to Azure](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-quickstart-templates%2Fmaster%2Fquickstarts%2Fmicrosoft.sql%2Fsql-database%2Fazuredeploy.json)

## Prerequisites

If you don't have an Azure subscription, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

> **Note:**  
> You can't change some configuration choices after you create the database. Review [Modifiable configuration reference](modifiable-configuration-reference.md) before you deploy.


### Permissions

**To create databases via Transact-SQL**: `CREATE DATABASE` permissions are necessary. To create a database a login must be either the server admin login (created when the Azure SQL Database logical server was provisioned), the Microsoft Entra admin of the server, a member of the dbmanager database role in `master`. For more information, see [CREATE DATABASE](https://learn.microsoft.com/sql/t-sql/statements/create-database-transact-sql?view=azuresqldb-current\&preserve-view=true).

**To create databases via the Azure portal, PowerShell, Azure CLI, or REST API**: Azure RBAC permissions are needed, specifically the Contributor, SQL DB Contributor, or SQL Server Contributor Azure RBAC role. For more information, see [Azure RBAC built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles).

## Review the template

A single database has a defined set of compute, memory, IO, and storage resources using one of two [purchasing models](purchasing-models.md). When you create a single database, you also define a [server](logical-servers.md) to manage it and place it within [Azure resource group](https://learn.microsoft.com/azure/active-directory-b2c/overview) in a specified region.

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/sql-database/).

[Code reference unavailable in this source snapshot: ~/../quickstart-templates/quickstarts/microsoft.sql/sql-database/azuredeploy.json](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-arm-template-quickstart.md)

These resources are defined in the template:

- [**Microsoft.Sql/servers**](https://learn.microsoft.com/azure/templates/microsoft.sql/servers)
- [**Microsoft.Sql/servers/databases**](https://learn.microsoft.com/azure/templates/microsoft.sql/servers/databases)

More Azure SQL Database template samples can be found in [Azure Quickstart Templates](https://learn.microsoft.com/samples/browse/?expanded=azure\&products=azure-resource-manager\&terms=azure%20sql%20database).

## Deploy the template

Select **Try it** from the following PowerShell code block to open Azure Cloud Shell.

```azurepowershell-interactive
$projectName = Read-Host -Prompt "Enter a project name that is used for generating resource names"
$location = Read-Host -Prompt "Enter an Azure location (i.e. centralus)"
$adminUser = Read-Host -Prompt "Enter the SQL server administrator username"
$adminPassword = Read-Host -Prompt "Enter the SQL Server administrator password" -AsSecureString

$resourceGroupName = "${projectName}rg"

New-AzResourceGroup -Name $resourceGroupName -Location $location
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.sql/sql-database/azuredeploy.json" -administratorLogin $adminUser -administratorLoginPassword $adminPassword

Read-Host -Prompt "Press [ENTER] to continue ..."
```

> **Important:**
> Do not include any personal, sensitive, or confidential information in the server admin login name field. Data entered in this field is not considered *customer data*.


## Validate the deployment

To query the database, see [Query the database](single-database-create-quickstart.md#query-the-database).

## Clean up resources

Keep this resource group, server, and single database if you want. You can now connect and query your database using different methods.

1. Create a server-level firewall rule to connect to the single database from on-premises or remote tools. For more information, see [Create a server-level firewall rule](firewall-create-server-level-portal-quickstart.md).
1. After you create a server-level firewall rule, [connect and query](connect-query-content-reference-guide.md) your database using several different tools and languages:
   - [Connect and query using SQL Server Management Studio](connect-query-ssms.md)

If you want to delete the resource group:

```azurepowershell-interactive
$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"
Remove-AzResourceGroup -Name $resourceGroupName
```

## Related content

- To create a single database using the Azure CLI, see [Azure CLI samples](az-cli-script-samples-content-guide.md).
- To create a single database using Azure PowerShell, see [Azure PowerShell samples](powershell-script-content-guide.md).
- To learn how to create ARM templates, see [Create your first template](https://learn.microsoft.com/azure/azure-resource-manager/templates/template-tutorial-create-first-template).
