---
title: 'Quickstart: New policy assignment with Terraform'
description: In this quickstart, you use Terraform and Hashicorp Configuration Language (HCL) syntax to create a policy assignment to identify noncompliant resources.
ms.date: 03/26/2025
ms.topic: quickstart
ms.tool: terraform
#customer intent: As a Terraform user, I want to see how to assign an Azure policy
content_well_notification: 
  - AI-contribution
ms.custom:
  - devx-track-terraform
  - sfi-image-nochange
---

# Quickstart: Create a policy assignment to identify noncompliant resources using Terraform

The first step in understanding compliance in Azure is to identify the status of your resources. This quickstart steps you through the process of creating a policy assignment to identify virtual
machines that are not using managed disks.


When assigning a built-in policy or initiative definition, it's optional to reference a version. Policy assignments of built-in definitions default to the latest version and automatically inherit minor version changes unless otherwise specified.


[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

In this article, you learn how to:

> 
> * Retrieve the current Azure client configuration.
> * Create a Azure resource group with the generated random name.
> * Create Subscription Policy Assignment to identify virtual machines that aren't using managed disks

## Prerequisites

- Create an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-policy). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-policy/TestRecord.md). See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `providers.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-policy/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

1. Create a file named `main.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-policy/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

1. Create a file named `variables.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-policy/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

1. Create a file named `outputs.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-policy/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

## Specify scope

A scope determines what resources or grouping of resources the policy assignment gets enforced on. It could range from a management group to an individual resource. To use any of the following scopes, update the `scope` variable in the `variables.tf` file. If you leave the `scope` variable value blank, the "subscription" scope is used.

- Subscription: `/subscriptions/<subscription_id>`
- Resource group: `/subscriptions/<subscription_id>/resourceGroups/<resource_group_name>`
- Resource: `/subscriptions/<subscription_id>/resourceGroups/<resource_group_name>/providers/<resource_provider_namespace>/[{parentResourcePath}/]`

## Initialize Terraform

> **Important:**
> If you are using the 4.x azurerm provider, you must [explicitly specify the Azure subscription ID](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/4.0-upgrade-guide#specifying-subscription-id-is-now-mandatory) to authenticate to Azure before running the Terraform commands.
>
> One way to specify the Azure subscription ID without putting it in the `providers` block is to specify the subscription ID in an environment variable named `ARM_SUBSCRIPTION_ID`.
>
> For more information, see the [Azure provider reference documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#argument-reference).

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

## Verify the results

1. Get the `_assignment\_id_` returned by `terraform apply`.

1. run the following command to view the resources that are not compliant under your new policy assignment.

    ```console
    armclient post "/subscriptions/<subscription_id>/providers/Microsoft.PolicyInsights/policyStates/latest/queryResults?api-version=2019-10-01&$filter=IsCompliant eq false and PolicyAssignmentId eq '<policyAssignmentID>'&$apply=groupby((ResourceId))" > <json file to direct the output with the resource IDs into>
    ```
    
1. The results are comparable to what you see listed under **Noncompliant resources** in the Azure portal view.

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps

> 
> [Tutorial: Create and manage policies to enforce compliance](tutorials/create-and-manage.md)
