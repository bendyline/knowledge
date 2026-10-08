---
title: 'Quickstart: Create a private endpoint - Terraform'
description: In this quickstart, you learn how to create a private endpoint using Terraform.
ms.topic: quickstart
ms.date: 03/25/2025
ms.custom: devx-track-terraform
ms.service: azure-private-link
author: asudbring
ms.author: allensu
content_well_notification: 
  - AI-contribution
#Customer intent: As someone who has a basic network background but is new to Azure, I want to create a private endpoint by using Terraform.
# Customer intent: As a network administrator new to Azure, I want to create a private endpoint using Terraform, so that I can securely connect my virtual network to an Azure SQL Database and ensure proper DNS resolution for improved data access and security.
---

# Quickstart: Create a private endpoint by using Terraform

In this quickstart, you use Terraform to create a private endpoint. The private endpoint connects to an Azure SQL Database. The private endpoint is associated with a virtual network and a private Domain Name System (DNS) zone. The private DNS zone resolves the private endpoint IP address. The virtual network contains a virtual machine that you use to test the connection of the private endpoint to the instance of the SQL Database.

The script generates a random password for the SQL server and a random SSH key for the virtual machine. The names of the created resources are output when the script is run. 

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

Diagram of resources created in private endpoint quickstart.

## Prerequisites

- You need an Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/201-private-link-sql-database).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code and make it the current directory.

1. Create a file named `main.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/201-private-link-sql-database/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

1. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/201-private-link-sql-database/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

1. Create a file named `provider.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/201-private-link-sql-database/provider.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

1. Create a file named `ssh.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/201-private-link-sql-database/ssh.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

1. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/201-private-link-sql-database/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)


## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

## Verify the results

#### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the SQL Server name.

    ```console
    sql_server=$(terraform output -raw sql_server)
    ```

1. Run [az sql server show](https://learn.microsoft.com/cli/azure/sql/server#az-sql-server-show) to display the details about the SQL Server private endpoint.

    ```azurecli
    az sql server show \
        --resource-group $resource_group_name \
        --name $sql_server --query privateEndpointConnections \
        --output tsv
    ```

#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the SQL Server name.

    ```console
    $sql_server=$(terraform output -raw sql_server_name)
    ```

1. Run [Get-AzPrivateEndpoint](https://learn.microsoft.com/powershell/module/az.network/get-azprivateendpoint) to display the details about the SQL Server private endpoint.

    ```azurepowershell
    $sql = @{
    ResourceGroupName = $resource_group_name
    }
    Get-AzPrivateEndpoint @sql
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure.](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

>  
> [Learn more about using Terraform in Azure](https://learn.microsoft.com/azure/terraform)
