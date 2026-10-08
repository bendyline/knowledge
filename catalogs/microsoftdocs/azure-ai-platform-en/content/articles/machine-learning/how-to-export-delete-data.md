---
title: Export or delete workspace data
titleSuffix: Azure Machine Learning
description: Learn how to export or delete your workspace with the Azure Machine Learning studio.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: mldata
ms.custom: devx-track-python
author: s-polly
ms.author: scottpolly
ms.reviewer: soumyapatro
ms.date: 08/01/2024
ms.topic: how-to
monikerRange: 'azureml-api-2 || azureml-api-1'
---

# Export or delete your Machine Learning service workspace data

In Azure Machine Learning, you can export or delete your workspace data with either the portal graphical interface or the Python SDK. This article describes both options.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/gdpr-dsr-and-stp-note.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-export-delete-data.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/gdpr-intro-sentence.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-export-delete-data.md)

## Control your workspace data

Azure Machine Learning stores in-product data that is available for export and deletion. You can export and delete data with Azure Machine Learning studio, the CLI, or the SDK. Additionally, you can access telemetry data through the Azure Privacy portal.

In Azure Machine Learning, personal data consists of user information in job history documents.

An Azure workspace relies on a **resource group** to hold the related resources for an Azure solution. When you create a workspace, you can either use an existing resource group, or you can create a new one. Visit [this resource](https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal) for more information about Azure resource groups.

## Delete high-level resources using the portal

When you create a workspace, Azure creates several resources within the resource group:

- The workspace itself
- A storage account
- A container registry
- An Applications Insights instance
- A key vault

To delete these resources, select them from the list, and choose **Delete**:

> **Important:**
> If the resource is configured for soft delete, the data won't actually delete unless you optionally select to delete the resource permanently. For more information, visit these resources:
> * [Azure log analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/delete-workspace)
> * [Azure Key Vault soft-delete](https://learn.microsoft.com/azure/key-vault/general/soft-delete-overview)
> * [Soft delete for blobs](https://learn.microsoft.com/azure/storage/blobs/soft-delete-blob-overview)
> * [Soft delete in Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-soft-delete-policy)
> * [Workspace soft-deletion](concept-soft-delete.md)

Screenshot of portal, with delete icon highlighted.

A confirmation dialog box opens, where you can confirm your choices.

Job history documents might contain personal user information. These documents are stored in the storage account in blob storage, in `/azureml` subfolders. You can download and delete the data from the portal. First, select the **Storage accounts** Azure services in the Azure portal, as shown in this screenshot:

Screenshot showing selection of Storage accounts in the Azure portal.

At the **Storage accounts** page, select the relevant storage account, as shown in this screenshot:

Screenshot showing selection of a specific storage account.

Select **Containers** as shown in this screenshot:

Screenshot showing selection of Containers at the storage account page.

Select a specific container, as shown in this screenshot:

Screenshot showing selection of a specific container.

In that container, select and delete the resource or resources you wish to delete, as shown in this screenshot:

Screenshot showing deletion of a specific resource.

## Export and delete machine learning resources using Azure Machine Learning studio

Azure Machine Learning studio provides a unified view of your machine learning resources - for example, data assets, models, notebooks, and jobs. Azure Machine Learning studio emphasizes preservation of a record of your data and experiments. You can delete computational resources - pipelines and compute resources - right in the browser. For these resources, navigate to the resource in question, and choose **Delete**.

You can unregister data assets and archive jobs, but these operations don't delete the data. To completely remove the data, data assets and job data require deletion at the storage level. Storage level deletion happens in the portal, as described earlier. Azure Machine Learning studio can handle individual deletion. Job deletion deletes the data of that job.

### Artifact and log downloads of jobs

Azure Machine Learning studio can handle training artifact and log downloads from experimental jobs. At the Azure Machine Learning studio main page, select **Jobs** as shown in this screenshot:

Screenshot showing selection of Jobs in Azure Machine Learning studio.

To show the available jobs, select the **All Jobs** tab, as shown in this screenshot:

Screenshot showing selection of the All Jobs tab.

Select a specific job, as shown in this screenshot:

Screenshot showing selection of a specific job.

Select **Download all**, as shown in this screenshot:

Screenshot showing how to start the job download process.

### Download a registered model

To download a registered model, select **Models** to open the **Model List** in Azure Machine Learning studio, and then select a specific model, as shown in this screenshot:

Screenshot showing selection of a specific model.

Select **Download all** to start the model download process, as shown in this screenshot:

Screenshot showing how to start the model download process.

**Applies to: azureml-api-1**

## Export and delete resources using the Python SDK v1


> **Important:**
> This article provides information on using the Azure Machine Learning SDK v1. SDK v1 is deprecated as of March 31, 2025. Support for it will end on June 30, 2026. You can install and use SDK v1 until that date. Your existing workflows using SDK v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the SDK v2 before June 30, 2026. For more information on SDK v2, see [What is Azure Machine Learning CLI and Python SDK v2?](https://learn.microsoft.com/azure/machine-learning/concept-v2) and the [SDK v2 reference](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).

You can download the outputs of a particular job using:

```python
# Retrieved from Azure Machine Learning web UI
run_id = 'aaaaaaaa-bbbb-cccc-dddd-0123456789AB'
experiment = ws.experiments['my-experiment']
run = next(run for run in ex.get_runs() if run.id == run_id)
metrics_output_port = run.get_pipeline_output('metrics_output')
model_output_port = run.get_pipeline_output('model_output')

metrics_output_port.download('.', show_progress=True)
model_output_port.download('.', show_progress=True)
```

You can delete these machine learning resources with the Python SDK:

| Type | Function Call | Notes |
| --- | --- | --- |
| `Workspace` | [`delete`](https://learn.microsoft.com/python/api/azureml-core/azureml.core.workspace\(class\)#azureml-core-workspace-delete) | Use `delete-dependent-resources` to cascade the delete |
| `Model` | [`delete`](https://learn.microsoft.com/python/api/azureml-core/azureml.core.workspace\(class\)#azureml-core-model-delete) |  |
| `ComputeTarget` | [`delete`](https://learn.microsoft.com/python/api/azureml-core/azureml.core.computetarget#azureml-core-computetarget-delete) |  |
| `WebService` | [`delete`](https://learn.microsoft.com/python/api/azureml-core/azureml.core.workspace\(class\)#azureml-core-webservice-delete) |  |



## Next steps

[Learn more about managing workspaces](how-to-manage-workspace.md)
