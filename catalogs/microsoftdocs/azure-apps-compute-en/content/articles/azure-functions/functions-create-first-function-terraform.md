---
title: 'Quickstart: Create and deploy Azure Functions resources from Terraform'
description: In this quickstart article, you create a function app in a Flex Consumption plan, along with the resource group, storage account, and blob storage container required by the app.
ms.topic: quickstart
ms.date: 07/22/2025
ms.custom: devx-track-terraform
ms.service: azure-functions
#customer intent: As a Terraform user, I want to learn how to create a function app in a Flex Consumption plan along with required storage account and blob storage container used for deployments.
content_well_notification: 
  - AI-contribution
zone_pivot_groups: programming-languages-set-functions-no-go
---

# Quickstart: Create and deploy Azure Functions resources from Terraform

In this quickstart, you use Terraform to create a function app in a Flex Consumption plan in Azure Functions, along with other required Azure resources. The Flex Consumption plan provides serverless hosting that lets you run your code on demand without explicitly provisioning or managing infrastructure. The function app runs on Linux and is configured to use Azure Blob storage for code deployments.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

> 
> * Create an Azure resource group with a unique name.
> * Generate a random string of 13 lowercase letters to name resources.
> * Create a storage account in Azure.
> * Create a blob storage container in the storage account.
> * Create a Flex Consumption plan in Azure Functions.
> * Create a function app with a Flex Consumption plan in Azure.
> * Output the names of the resource group, storage account, service plan, function app, and Azure Functions Flex Consumption plan.

## Prerequisites

- Create an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).
- [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) to obtain the subscription ID or run in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview).

## Implement the Terraform code

The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-functions). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-functions/TestRecord.md). See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `main.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-functions/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

1. Create a file named `outputs.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-functions/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

1. Create a file named `providers.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-functions/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

1. Create a file named `variables.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-functions/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

1. Use this Azure CLI command to set the `ARM_SUBSCRIPTION_ID` environment variable to the ID of your current subscription:

    ```azurecli
    export ARM_SUBSCRIPTION_ID=$(az account show --query "id" --output tsv)
    ```

    You must have this variable set for Terraform to be able to authenticate to your Azure subscription.

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

## Create a Terraform execution plan

Run [terraform plan](https://www.terraform.io/docs/commands/plan.html) to create an execution plan.

**Applies to: programming-language-csharp**

```console
terraform plan -out main.tfplan -var="runtime_name=dotnet-isolated" -var="runtime_version=8"
```

**Applies to: programming-language-powershell**

```console
terraform plan -out main.tfplan -var="runtime_name=powershell" -var="runtime_version=7.6"
```

**Applies to: programming-language-python**

```console
terraform plan -out main.tfplan -var="runtime_name=python" -var="runtime_version=3.12"
```

**Applies to: programming-language-java**

```console
terraform plan -out main.tfplan -var="runtime_name=java" -var="runtime_version=21"
```

**Applies to: programming-language-javascript,programming-language-typescript**

```console
terraform plan -out main.tfplan -var="runtime_name=node" -var="runtime_version=20"
```



Make sure that `runtime_version` matches the language stack version you verified locally. Select your preferred language stack at the [top](#top) of the article.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-notes.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

## Verify the results

The `outputs.tf` file returns these values for your new function app:

| Value | Description |
| --- | --- |
| `resource_group_name` | The name of the resource group you created. |
| `sa_name` | The name of the Azure storage account required by the Functions host. |
| `asp_name` | The name of the Flex Consumption plan that hosts your new app. |
| `fa_name` | The name of your new function app. |
| `fa_url` | The URL of your new function app endpoint. |

Open a browser and browse to the URL location in `fa_url`. You can also use the [terraform output](https://developer.hashicorp.com/terraform/cli/commands/output) command to review these values at a later time.

Screenshot of Azure Functions app 'Welcome page'.

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps


You can now deploy a code project to the function app resources you created in Azure. 

You can create, verify, and deploy a code project to your new function app from these local environments:

### [Command prompt](#tab/core-tools)

1. [Create the local code project](functions-run-local.md#create-your-local-project)
1. [Verify locally](functions-run-local.md#run-a-local-function)
1. [Publish to Azure](functions-run-local.md#publish)

### [Visual Studio Code](#tab/vs-code)

1. [Create the local code project](functions-develop-vs-code.md#create-an-azure-functions-project)
1. [Verify locally](functions-develop-vs-code.md#run-functions-locally)
1. [Publish to Azure](functions-develop-vs-code.md#republish-project-files)
 
### [Visual Studio](#tab/vs)

1. [Create the local code project](functions-develop-vs.md#create-an-azure-functions-project)
1. [Verify locally](functions-develop-vs.md#run-functions-locally)
1. [Publish to Azure](functions-develop-vs.md#publish-to-azure)

---
