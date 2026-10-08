---
title: Manage hub workspaces in portal
titleSuffix: Azure Machine Learning
description: Learn how to manage Azure Machine Learning hub workspaces in the Azure portal.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.author: scottpolly
author: s-polly
ms.reviewer: shshubhe
ms.date: 05/09/2024
ms.topic: how-to
---

# Manage Azure Machine Learning hub workspaces in the portal

In this article, you create, view, and delete [**Azure Machine Learning hub workspaces**](concept-hub-workspace.md) for [Azure Machine Learning](overview-what-is-azure-machine-learning.md), with the [Azure portal](https://portal.azure.com).

> **Tip:**
> An Azure Machine Learning hub workspace and a Microsoft Foundry hub are the same thing. Foundry brings multiple Azure AI resources together for a unified experience. Azure Machine Learning is one of the resources, and provides both Foundry hub and project workspaces. Hub and project workspaces can be used from both Azure Machine Learning studio and Foundry.

As your needs change or your automation requirements increase, you can manage workspaces [with the CLI](how-to-manage-workspace-cli.md), [Azure PowerShell](how-to-manage-workspace-powershell.md), or [via the Visual Studio Code extension](how-to-setup-vs-code.md).

## Prerequisites

* An Azure subscription. If you don't have an Azure subscription, create a free account before you begin. Try the [free or paid version of Azure Machine Learning](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) today.

## Limitations


- When you create a new workspace, you can either automatically create services needed by the workspace or use existing services. If you want to use existing services from a **different Azure subscription** than the workspace, you must register the Azure Machine Learning namespace in the subscription that contains those services. For example, if you create a workspace in subscription A that uses a storage account in subscription B, the Azure Machine Learning namespace must be registered in subscription B before the workspace can use the storage account.

  The resource provider for Azure Machine Learning is **Microsoft.MachineLearningServices**. For information on seeing whether it's registered or registering it, see [Azure resource providers and types](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types).

  > **Important:**
  > This information applies only to resources provided during workspace creation: Azure Storage Accounts, Azure Container Registry, Azure Key Vault, and Application Insights.


* For network isolation with online endpoints, you can use workspace-associated resources (Azure Container Registry (ACR), Storage account, Key Vault, and Application Insights) from a resource group different from your workspace. However, these resources must belong to the same subscription and tenant as your workspace. For information about the limitations that apply to securing managed online endpoints, using a workspace's managed virtual network, see [Network isolation with managed online endpoints](concept-secure-online-endpoint.md#limitations).

* Workspace creation also creates an Azure Container Registry (ACR) by default. Since ACR doesn't currently support unicode characters in resource group names, use a resource group that avoids these characters.

* Azure Machine Learning doesn't support hierarchical namespace (Azure Data Lake Storage Gen2 feature) for the default storage account of the workspace.


> **Tip:**
> An Azure Application Insights instance is created when you create the workspace. You can delete the Application Insights instance after cluster creation if you want. Deleting it limits the information gathered from the workspace, and might make it more difficult to troubleshoot problems. **If you delete the Application Insights instance created by the workspace, the only way to recreate it is to delete and recreate the workspace**.
>
> For more information on using the Application Insights instance, see [Monitor and collect data from Machine Learning web service endpoints](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-enable-app-insights.md).

## Create a hub

Use the following steps to create a hub from the Azure portal:

1. From the Azure portal, search for `Foundry` and create a new resource by selecting **+ New Azure AI**.
1. Enter your AI hub name, subscription, resource group, and location details.
1. For advanced settings, select **Next: Resources** to specify resources, networking, encryption, identity, and tags. 

    Screenshot of the option to set Azure AI hub basic information.

1. Select an existing **Foundry Tools** resource or create a new one. New Foundry Tools include multiple API endpoints for Speech, Content Safety and Azure OpenAI. You can also bring an existing Azure OpenAI resource. Optionally, choose an existing **Storage account**, **Key vault**, **Container Registry**, and **Application insights** to host artifacts generated when you use Foundry.

    > **Tip:**
    > You can skip selecting Foundry Tools if you plan to only work in Azure Machine Learning studio. Foundry Tools is required for Foundry, and provides access to pre-built AI models for use in prompt flow.

    Screenshot of the Create an Azure AI hub with the option to set resource information.

1. Set up Network isolation. Read more on [network isolation](https://learn.microsoft.com/azure/ai-studio/how-to/configure-managed-network). For a walkthrough of creating a secure Azure AI hub, see [Create a secure Azure AI hub](https://learn.microsoft.com/azure/ai-studio/how-to/create-secure-ai-hub).

    Screenshot of the Create an Azure AI hub with the option to set network isolation information.

1. Set up data encryption. You can either use **Microsoft-managed keys** or enable **Customer-managed keys**. 

    Screenshot of the Create an Azure AI hub with the option to select your encryption type.

1. By default, **System assigned identity** is enabled, but you can switch to **User assigned identity** if existing storage, key vault, and container registry are selected in Resources.

    Screenshot of the Create an Azure AI hub with the option to select a managed identity.
   
    >**Note:**
    >If you select **User assigned identity** and also selected a Foundry Tool, your identity needs to have the `Cognitive Services Contributor` role in order to successfully create a new Azure AI hub.
    
1. Add tags.

    Screenshot of the Create an Azure AI hub with the option to add tags.

1. Select **Review + create**

## Manage your hub from the Azure portal

### Manage access control

Manage role assignments from **Access control (IAM)** within the Azure portal. Learn more about hub [role-based access control](https://learn.microsoft.com/azure/ai-studio/concepts/rbac-ai-studio).

To add grant users permissions: 
1. Select **+ Add** to add users to your hub.

1. Select the **Role** you want to assign.

    Screenshot of the page to add a role within the Azure AI hub Azure portal view.

1. Select the **Members** you want to give the role to.  

    Screenshot of the add members page within the Azure AI hub Azure portal view.

1. **Review + assign**. It can take up to an hour for permissions to be applied to users.

### Networking

Hub networking settings can be set during resource creation or changed in the **Networking** tab in the Azure portal view. Creating a new hub invokes a managed virtual network. This streamlines and automates your network isolation configuration with a built-in managed virtual network. The managed virtual network settings are applied to all project workspaces created within a hub. 

At hub creation, select between the networking isolation modes: **Public**, **Private with Internet Outbound**, and **Private with Approved Outbound**. To secure your resource, select either **Private with Internet Outbound** or Private with Approved Outbound for your networking needs. For the private isolation modes, a private endpoint should be created for inbound access. For more information on network isolation, see [Managed virtual network isolation](https://learn.microsoft.com/azure/ai-studio/how-to/configure-managed-network). To create a secure hub, see [Create a secure Azure AI hub](https://learn.microsoft.com/azure/ai-studio/how-to/create-secure-ai-hub). 

At hub creation in the Azure portal, creation of associated Foundry Tools, Storage account, Key vault, Application insights, and Container registry is given. These resources are found on the Resources tab during creation. 

To connect to Foundry Tools (Azure OpenAI, Azure AI Search, and Azure AI Content Safety) or storage accounts in [Foundry portal](https://ai.azure.com/?cid=learnDocs), create a private endpoint in your virtual network. Ensure the public network access (PNA) flag is disabled when creating the private endpoint connection. For more about Foundry Tools connections, see [Foundry Tools and virtual networks](https://learn.microsoft.com/azure/ai-services/cognitive-services-virtual-networks). You can optionally bring your own (BYO) search, but this requires a private endpoint connection from your virtual network.

### Encryption

Projects that use the same hub, share their encryption configuration. Encryption mode can be set only at the time of hub creation between Microsoft-managed keys and Customer-managed keys. 

From the Azure portal view, navigate to the encryption tab, to find the encryption settings for your hub. 
For hubs that use customer-managed key encryption mode, you can update the encryption key to a new key version. This update operation is constrained to keys and key versions within the same Key Vault instance as the original key.

Screenshot of the Encryption page of the Azure AI hub in the Azure portal.

### Update Azure Application Insights and Azure Container Registry

To use custom environments for Prompt Flow, you're required to configure an Azure Container Registry for your AI hub. To use Azure Application Insights for Prompt Flow deployments, a configured Azure Application Insights resource is required for your AI hub.

You can configure your hub for these resources during creation or update after creation. To update Azure Application Insights from the Azure portal, navigate to the **Properties** for your hub in the Azure portal, then select **Change Application Insights**. You can also use the Azure SDK/CLI options or infrastructure-as-code templates to update both Azure Application Insights and Azure Container Registry for the AI Hub.

Screenshot of the properties page of the Azure AI resource in the Azure portal.

## Next steps

Once you have a workspace hub, you can Create a project using [Azure Machine Learning studio](how-to-manage-workspace.md?tabs=mlstudio), [Foundry](https://learn.microsoft.com/azure/ai-studio/how-to/create-projects), [Azure SDK](how-to-manage-workspace.md?tabs=python), or [Using automation templates](how-to-create-workspace-template.md).
