---
title: "Quickstart: Create an Azure SQL Database server and database using Terraform"
description: In this article, you create an Azure SQL Database server and database using Terraform.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 01/23/2026
ms.service: azure-sql-database
ms.subservice: deployment-configuration
ms.topic: quickstart
ms.custom:
  - devx-track-terraform
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
---

# Quickstart: Create an Azure SQL Database server and database using Terraform


  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

Creating a [single database](single-database-overview.md) is the quickest and simplest option to create a database in Azure SQL Database. This quickstart shows you how to create a single database using Terraform.

[Include unavailable in this source snapshot: ~/../azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

In this article, you learn how to:

> 
> * Create a random value for the Azure resource group name using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet).
> * Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group).
> * Create a random value for the [logical server in Azure](logical-servers.md) using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet).
> * Create a random password for the [logical server in Azure](logical-servers.md) using [random_password](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password).
> * Create a [logical server in Azure](logical-servers.md) using [azurerm_mssql_server](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_server).
> * Create a database in Azure SQL Database using [azurerm_mssql_database](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_database).

## Prerequisites

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

> **Note:**  
> You can't change some configuration choices after you create the database. Review [Modifiable configuration reference](modifiable-configuration-reference.md) before you deploy.


### Permissions

**To create databases via Transact-SQL**: `CREATE DATABASE` permissions are necessary. To create a database a login must be either the server admin login (created when the Azure SQL Database logical server was provisioned), the Microsoft Entra admin of the server, a member of the dbmanager database role in `master`. For more information, see [CREATE DATABASE](https://learn.microsoft.com/sql/t-sql/statements/create-database-transact-sql?view=azuresqldb-current\&preserve-view=true).

**To create databases via the Azure portal, PowerShell, Azure CLI, or REST API**: Azure RBAC permissions are needed, specifically the Contributor, SQL DB Contributor, or SQL Server Contributor Azure RBAC role. For more information, see [Azure RBAC built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles).

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-sql-database). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart//101-sql-database/TestRecord.md).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code and make it the current directory.

1. Create a file named `providers.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/../terraform_samples/quickstart/101-sql-database//providers.tf](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

1. Create a file named `main.tf` and insert the following code:
        
    [Code reference unavailable in this source snapshot: ~/../terraform_samples/quickstart/101-sql-database//main.tf](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

    > **Important:**
> Do not include any personal, sensitive, or confidential information in the server admin login name field. Data entered in this field is not considered *customer data*.


1. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/../terraform_samples/quickstart/101-sql-database//variables.tf](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

1. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/../terraform_samples/quickstart/101-sql-database//outputs.tf](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/../azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/../azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/../azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

## Verify the results

#### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the new logical server name.

    ```console
   sql_server_name=$(terraform output -raw sql_server_name)
    ```

1. Run [az sql db list](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-list) to display the names of all the databases in your server.

    ```azurecli
    az sql db list \
    --resource-group $resource_group_name \
    --server $sql_server_name \
    --output table
    ```

#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the new logical server name.

    ```console
    $sql_server_name=$(terraform output -raw sql_server_name)
    ```

1. Run [Get-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabase) to display the names of all the databases in your server.

    ```azurepowershell
     Get-AzSqlDatabase -ResourceGroupName $resource_group_name `
                       -ServerName $sql_server_name `
                       | Format-Table
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/../azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/single-database-create-terraform-quickstart.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next step

> 
> [Create a server-level firewall rule](firewall-create-server-level-portal-quickstart.md)
