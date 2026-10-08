---
title: 'What is a workspace?'
titleSuffix: Azure Machine Learning
description: The workspace is the top-level resource for Azure Machine Learning. It keeps a history of all training runs, with logs, metrics, output, and a snapshot of your scripts.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.custom: build-2023
ms.topic: concept-article
ms.author: scottpolly
author: s-polly
ms.reviewer: deeikele
ms.date: 02/10/2026
monikerRange: 'azureml-api-2 || azureml-api-1'
#Customer intent: As a data scientist, I want to understand the purpose of a workspace for Azure Machine Learning.
---


# What is an Azure Machine Learning workspace?


Workspaces are places to collaborate with colleagues to create machine learning artifacts and group related work. For example, experiments, jobs, datasets, models, components, and inference endpoints. This article describes workspaces, how to manage access to them, and how to use them to organize your work.

Ready to get started? [Create a workspace](#create-a-workspace).

## Tasks performed within a workspace 

For machine learning teams, the workspace is a place to organize their work. Here are some of the tasks you can start from a workspace:

+ [Create jobs](how-to-train-model.md) - Jobs are training runs you use to build your models. You can group jobs into [experiments](how-to-log-view-metrics.md) to compare metrics.
+ [Author pipelines](concept-ml-pipelines.md) - Pipelines are reusable workflows for training and retraining your model.
+ [Register data assets](concept-data.md) - Data assets aid in management of the data you use for model training and pipeline creation.
+ [Register models](how-to-log-mlflow-models.md) - Once you have a model you want to deploy, you create a registered model.
**Applies to: azureml-api-2**
+ [Create online endpoints](concept-endpoints.md) - Use a registered model and a scoring script to create an online endpoint.

**Applies to: azureml-api-1**
+ [Deploy a model](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-deploy-and-where.md) - Use the registered model and a scoring script to deploy a model.


Besides grouping your machine learning results, workspaces also host resource configurations:

+ [Compute targets](concept-compute-target.md) are used to run your experiments.
+ [Datastores](how-to-datastore.md) define how you and others can connect to data sources when using data assets.
+ [Security settings](tutorial-create-secure-workspace.md) - Networking, identity and access control, and encryption settings.

## Organizing workspaces

For machine learning team leads and administrators, workspaces serve as containers for access management, cost management, and data isolation. Here are some tips for organizing workspaces:

+ **Use [user roles](how-to-assign-roles.md)** to manage permissions in the workspace between users. For example, use roles for a data scientist, a machine learning engineer, or an admin.
+ **Assign access to user groups**: By using Microsoft Entra user groups, you don't have to add individual users to each workspace. Use the same user groups to grant access to other resources.
+ **Create a workspace per project**: While a workspace can be used for multiple projects, limiting it to one project per workspace allows for cost reporting accrued to a project level. It also allows you to manage configurations like datastores in the scope of each project.
+ **Share Azure resources**: Workspaces require you to create several [associated resources](#associated-resources). Share these resources between workspaces to save repetitive setup steps.
+ **Enable self-serve**: Precreate and secure [associated resources](#associated-resources) as an IT admin, and use [user roles](how-to-assign-roles.md) to let data scientists create workspaces on their own.
+ **Share assets**: You can share assets between workspaces using [Azure Machine Learning registries](how-to-share-models-pipelines-across-workspaces-with-registries.md).
+ **Use hub workspaces for centralized governance**: A [hub workspace](concept-hub-workspace.md) groups multiple project workspaces with shared security settings, connections, and compute resources. Hub workspaces are the same resource type as Microsoft Foundry hubs, so you can use them from both Azure Machine Learning studio and Foundry.

## How is my content stored in a workspace?

Your workspace keeps a history of all training runs, with logs, metrics, output, lineage metadata, and a snapshot of your scripts. As you perform tasks in Azure Machine Learning, you generate artifacts. Their metadata and data are stored in the workspace and on its associated resources.

## Associated resources

When you create a new workspace, you must bring other Azure resources to store your data. If you don't provide these resources, Azure Machine Learning automatically creates them.

+ [Azure Storage account](https://azure.microsoft.com/services/storage/). Stores machine learning artifacts such as job logs. By default, the workspace uses this storage account when you upload data. Jupyter notebooks that you use with your Azure Machine Learning compute instances are stored here as well. 
  
  > **Important:**
  > You *can't* use an existing Azure Storage account if it is:
  > * An account of type BlobStorage
  > * A premium account (Premium_LRS and Premium_GRS) 
  > * An account with hierarchical namespace (used with Azure Data Lake Storage Gen2).
  >
  > You can use premium storage or hierarchical namespace as extra storage by [creating a datastore](how-to-datastore.md).
  >
  > Don't enable hierarchical namespace on the storage account after upgrading to general-purpose v2.
  >
  > If you bring an existing general-purpose v1 storage account, you can [upgrade to general-purpose v2](https://learn.microsoft.com/azure/storage/common/storage-account-upgrade) after the workspace is created.
**APPLIES TO:**


  
+ [Azure Container Registry (ACR)](https://azure.microsoft.com/services/container-registry/). Stores created docker containers, when you build custom environments via Azure Machine Learning. Deploying AutoML models and data profile triggers creation of custom environments.

    You *can* create workspaces without ACR as a dependency if you don't need to build custom docker containers. Azure Machine Learning can read from external container registries.

    ACR is automatically provisioned when you build custom docker images. Use [Azure role-based access control (Azure RBAC)](https://learn.microsoft.com/azure/role-based-access-control/overview) to prevent customer docker containers from being built.

    > **Important:**
    > If your subscription setting requires adding tags to resources under it, ACR created by Azure Machine Learning fails, since we can't set tags to ACR.

+ [Azure Application Insights](https://azure.microsoft.com/services/application-insights/). Helps you monitor and collect diagnostic information from your inference endpoints.
    **Applies to: azureml-api-2**
    For more information, see [Monitor online endpoints](how-to-monitor-online-endpoints.md).


+ [Azure Key Vault](https://azure.microsoft.com/services/key-vault/). Stores secrets that compute targets use and other sensitive information that the workspace needs.

## Create a workspace

You can create a workspace in many ways. To get started, use one of the following options:

* The [Azure Machine Learning studio](quickstart-create-resources.md) you can quickly create a workspace with default settings.
* [Azure portal](how-to-manage-workspace.md?tabs=azure-portal#create-a-workspace) for a point-and-click interface with more security options. 
* The [VS Code extension](how-to-manage-resources-vscode.md#create-a-workspace) if you work in Visual Studio Code.

To automate workspace creation using your preferred security settings:

**Applies to: azureml-api-2**
* [Azure Resource Manager / Bicep templates](how-to-create-workspace-template.md) provide a declarative syntax to deploy Azure resources. An alternative option is to use [Terraform](how-to-manage-workspace-terraform.md). Also see the [Bicep template](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/machine-learning-end-to-end-secure/) or [Terraform template](https://github.com/Azure/terraform/tree/master/quickstart/201-machine-learning-moderately-secure).
* Use the [Azure Machine Learning CLI](how-to-configure-cli.md) or [Azure Machine Learning SDK for Python](how-to-manage-workspace.md?tabs=python#create-a-workspace) for prototyping and as part of your [MLOps workflows](concept-model-management-and-deployment.md).
* Use [REST APIs](how-to-manage-rest.md) directly in scripting environment, for platform integration or in MLOps workflows.

**Applies to: azureml-api-1**
* [Azure Resource Manager / Bicep templates](how-to-create-workspace-template.md) provide a declarative syntax to deploy Azure resources. An alternative option is to use [Terraform](how-to-manage-workspace-terraform.md). Also see the [Bicep template](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/machine-learning-end-to-end-secure/) or [Terraform template](https://github.com/Azure/terraform/tree/master/quickstart/201-machine-learning-moderately-secure).
* Use the [Azure Machine Learning CLI v1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/reference-azure-machine-learning-cli.md) or [Azure Machine Learning SDK v1 for Python](how-to-manage-workspace.md?tabs=python#create-a-workspace) for prototyping and as part of your [MLOps workflows](concept-model-management-and-deployment.md).

    
> **Important:**
> This article provides information on using the Azure Machine Learning SDK v1. SDK v1 is deprecated as of March 31, 2025. Support for it will end on June 30, 2026. You can install and use SDK v1 until that date. Your existing workflows using SDK v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the SDK v2 before June 30, 2026. For more information on SDK v2, see [What is Azure Machine Learning CLI and Python SDK v2?](https://learn.microsoft.com/azure/machine-learning/concept-v2) and the [SDK v2 reference](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).

    
> **Important:**
> Some of the Azure CLI commands in this article use the `azure-cli-ml`, or v1, extension for Azure Machine Learning. Support for CLI v1 ended on September 30, 2025. Microsoft will no longer provide technical support or updates for this service. Your existing workflows using CLI v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the `ml`, or v2, extension as soon as possible. For more information on the v2 extension, see [Azure Machine Learning CLI extension and Python SDK v2](concept-v2.md).

* Use [REST APIs](how-to-manage-rest.md) directly in scripting environment, for platform integration or in MLOps workflows.


## Tools for workspace interaction and management

After you set up your workspace, you can interact with it in the following ways:

**Applies to: azureml-api-2**
+ On the web:
    + [Azure portal](https://portal.azure.com)
    + [Azure Machine Learning studio](https://ml.azure.com) 
    + [Azure Machine Learning designer](concept-designer.md) 
+ In any Python environment with the [Azure Machine Learning SDK](https://aka.ms/sdk-v2-install).
+ On the command line, by using the Azure Machine Learning [CLI extension v2](how-to-configure-cli.md).
+ [Azure Machine Learning VS Code Extension](how-to-manage-resources-vscode.md#workspaces)

**Applies to: azureml-api-1**
+ On the web:
    + [Azure Machine Learning studio](https://ml.azure.com) 
    + [Azure Machine Learning designer](concept-designer.md) 
+ In any Python environment with the [Azure Machine Learning SDK v1](https://learn.microsoft.com/python/api/overview/azure/ml/)
    
> **Important:**
> This article provides information on using the Azure Machine Learning SDK v1. SDK v1 is deprecated as of March 31, 2025. Support for it will end on June 30, 2026. You can install and use SDK v1 until that date. Your existing workflows using SDK v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the SDK v2 before June 30, 2026. For more information on SDK v2, see [What is Azure Machine Learning CLI and Python SDK v2?](https://learn.microsoft.com/azure/machine-learning/concept-v2) and the [SDK v2 reference](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).
+ On the command line, by using the Azure Machine Learning [CLI extension v1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/reference-azure-machine-learning-cli.md)
    
> **Important:**
> Some of the Azure CLI commands in this article use the `azure-cli-ml`, or v1, extension for Azure Machine Learning. Support for CLI v1 ended on September 30, 2025. Microsoft will no longer provide technical support or updates for this service. Your existing workflows using CLI v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the `ml`, or v2, extension as soon as possible. For more information on the v2 extension, see [Azure Machine Learning CLI extension and Python SDK v2](concept-v2.md).
+ [Azure Machine Learning VS Code Extension](how-to-manage-resources-vscode.md#workspaces)


Each interface provides the following workspace management tasks.

| Workspace management task | Portal | Studio | Python SDK | Azure CLI | VS Code |
| --- | --- | --- | --- | --- | --- |
| Create a workspace | **&check;** | **&check;** | **&check;** | **&check;** | **&check;** |
| Manage workspace access | **&check;** |  |  | **&check;** |  |
| Create and manage compute resources | **&check;** | **&check;** | **&check;** | **&check;** | **&check;** |
| Create a compute instance |  | **&check;** | **&check;** | **&check;** | **&check;** |

> **Warning:**
> You can't move your Azure Machine Learning workspace to a different subscription. You also can't move the owning subscription to a new tenant. These actions might cause errors.

## Subresources

When you create compute clusters and compute instances in Azure Machine Learning, you also create subresources.

* VMs: Provide computing power for compute instances and compute clusters. Use them to run jobs.
* Load Balancer: A network load balancer is created for each compute instance and compute cluster. It manages traffic even while the compute instance or cluster is stopped.
* Virtual Network: These help Azure resources communicate with one another, the internet, and other on-premises networks.
* Bandwidth: Encapsulates all outbound data transfers across regions.

## Next steps

To learn more about planning a workspace for your organization's requirements, see [Organize and set up Azure Machine Learning](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/ai-machine-learning-resource-organization).

To get started with Azure Machine Learning, see:

+ [What is Azure Machine Learning?](overview-what-is-azure-machine-learning.md)
+ [Create and manage a workspace](how-to-manage-workspace.md)
+ [Recover a workspace after deletion (soft-delete)](concept-soft-delete.md)
+ [Get started with Azure Machine Learning](quickstart-create-resources.md)
+ [Tutorial: Create your first classification model with automated machine learning](tutorial-first-experiment-automated-ml.md)
