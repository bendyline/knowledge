---
author: PatrickFarley
ms.author: pafarley
ms.service: azure-content-understanding-foundry-tools
ms.topic: include
ms.date: 07/20/2026
ai-usage: ai-assisted
---


Set up default model deployments for your Content Understanding resource. By setting defaults, you create a connection to the Microsoft Foundry models you use for Content Understanding requests. Choose one of the following methods:

# [Content Understanding Studio](#tab/cu-studio)


1. Go to the [Content Understanding settings page](https://contentunderstanding.ai.azure.com/settings).

1. Select the **+ Add resource** button in the upper left.

1. Select the Foundry resource that you want to use and select **Next** > **Save**.

   Ensure that the **Enable autodeployment for required models if no defaults are available** checkbox is selected. This selection allows Content Understanding Studio to deploy a standard model, a mini model, and an embeddings model for your resource. Different analyzers require different models. For the current list, see [Supported generative models](../service-limits.md#supported-generative-models).

By taking these steps, you set up a connection between Content Understanding and Foundry models in your Foundry resource.


# [REST API](#tab/rest-api)



> **Important:**
> API version `2026-06-01-preview` is in public preview. Previews are provided without a service-level agreement and aren't recommended for production workloads. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) and the [Microsoft Products and Services Data Protection Addendum](https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA) ("DPA").

By default, use GA API version `2025-11-01`. Use `2026-06-01-preview` only when you need preview features.

1. In your Foundry resource, deploy the models required by your analyzers. For the current list, see [Supported generative models](../service-limits.md#supported-generative-models). For deployment instructions, see [Create model deployments in Microsoft Foundry portal](https://learn.microsoft.com/azure/ai-foundry/foundry-models/how-to/create-model-deployments?pivots=ai-foundry-portal).

1. Define default model deployments at the resource level. Before you run the following `cURL` command, make the following changes to the HTTP request:

   1. Replace `{endpoint}` and `{key}` with the corresponding values from your Foundry instance in the Azure portal.

   1. Replace `api-version=2025-11-01` with `api-version=2026-06-01-preview` to use preview features. For the full preview feature list, see [What's new in Azure AI Content Understanding](../whats-new.md).

   1. Replace `{completionModelName}` and `{embeddingModelName}` with supported model names.

   1. Replace `{completionDeploymentName}` and `{embeddingDeploymentName}` with your model deployment names.



   ```bash
   curl -i -X PATCH "{endpoint}/contentunderstanding/defaults?api-version=2026-06-01-preview" \
     -H "Ocp-Apim-Subscription-Key: {key}" \
     -H "Content-Type: application/json" \
     -d '{
           "modelDeployments": {
             "{completionModelName}": "{completionDeploymentName}",
             "{embeddingModelName}": "{embeddingDeploymentName}"
           }
         }'
   ```


---
