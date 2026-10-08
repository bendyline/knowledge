---
title: "Quickstart: Try Content Understanding Studio or Microsoft Foundry"
titleSuffix: Foundry Tools
description: Use Content Understanding Studio to try analyzers and create custom analyzers, or use Microsoft Foundry to run its available analyzers.
author: PatrickFarley 
ms.author: pafarley
manager: mcleans
ms.date: 07/16/2026
ai-usage: ai-assisted
ms.service: azure-content-understanding-foundry-tools
ms.topic: quickstart
ms.custom:
  - ignite-2024-understanding-release
  - references_regions
  - ignite-2025
  - dev-focus
---

# Quickstart: Try Content Understanding Studio or Microsoft Foundry

[Content Understanding Studio](https://contentunderstanding.ai.azure.com/) is the primary experience for trying prebuilt and search analyzers and creating custom analyzers. In this quickstart, use Studio or [Microsoft Foundry (new)](https://ai.azure.com/) to discover and run available analyzers.

## Prerequisites

To get started, make sure you have the following resources and permissions:

* An Azure subscription. If you don't have an Azure subscription, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A Microsoft Foundry resource, created in a [supported region](../language-region-support.md#region-support).

#### [Content Understanding Studio](#tab/cu-studio-prereq)


1. Go to the [Content Understanding settings page](https://contentunderstanding.ai.azure.com/settings).

1. Select the **+ Add resource** button in the upper left.

1. Select the Foundry resource that you want to use and select **Next** > **Save**.

   Ensure that the **Enable autodeployment for required models if no defaults are available** checkbox is selected. This selection allows Content Understanding Studio to deploy a standard model, a mini model, and an embeddings model for your resource. Different analyzers require different models. For the current list, see [Supported generative models](../service-limits.md#supported-generative-models).

By taking these steps, you set up a connection between Content Understanding and Foundry models in your Foundry resource.


#### [Microsoft Foundry (new)](#tab/foundry-new-prereq)

1. Go to [Microsoft Foundry](https://ai.azure.com/).

1. Navigate to the Content Understanding playground.

1. Select the gear icon to open the **Configure** panel. Select existing model deployments or deploy new models from the playground. Alternatively, go to the [model catalog](https://ai.azure.com/explore/models), deploy the [models supported by Content Understanding](../service-limits.md#supported-generative-models), and then return to the playground to select them.

#### [REST API](#tab/rest-api-prereq)



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

#### [Content Understanding Studio](#tab/cu-studio)

## Explore Content Understanding Studio

Open [Content Understanding Studio](https://contentunderstanding.ai.azure.com/) and sign in with your Azure account.

## Try out prebuilt analyzers

Get started by trying a prebuilt analyzer in Content Understanding Studio.

1. **Browse prebuilt analyzers**: Select the option to view all prebuilt analyzers from the Studio home page.
1. **Select a prebuilt analyzer**: Select an analyzer based on your data type and scenario.
1. **Test on sample data**: Explore how the analyzer performs on provided sample data.
    Screenshot of Content Understanding Studio showing the prebuilt analyzer selection and results interface.
1. **Try out on your own data**: To try out Content Understanding on your data, you need to select a deployment of both a chat completion model and an embeddings model. Learn more in [Connect your Content Understanding analyzer to Foundry model deployments](../concepts/models-deployments.md).
1. **Verify the results**: After running the analyzer, review the output in the results pane. You should see extracted fields, key-value pairs, or other structured data depending on the analyzer you selected. If the output matches your expectations, you've successfully tested the prebuilt analyzer.

## Create a custom analyzer (optional)

After you try a prebuilt analyzer, you can create an analyzer for your specific needs:

- **Create a custom analyzer**: Define a schema with the fields you want to extract. See [How to build a custom analyzer in Content Understanding Studio](../how-to/customize-analyzer-content-understanding-studio.md).
- **Classify data**: Route documents to different processing paths. See [How to classify and route with custom categories in Content Understanding Studio](../how-to/classification-content-understanding-studio.md).

#### [Microsoft Foundry (new)](#tab/foundry-new)


## Available analyzers

Foundry supports the Read and Layout content extraction analyzers and a subset of prebuilt analyzers. The analyzer dropdown shows the analyzers currently available in Foundry. For a full comparison, see [Content Understanding Studio and Microsoft Foundry](../foundry-vs-content-understanding-studio.md).

## Try an analyzer

1. Go to [Microsoft Foundry](https://ai.azure.com/) and select your project or create a new one.
1. Select **Build** in the upper right menu, then select **Models** on the left pane. This lets you access your own deployed models and any prebuilt models provided by Foundry Tools.
1. Select the **AI Services** tab, and then select the **Content Understanding Playground**.
1. Run the analyzer on the sample data provided, or upload your own content to see how the model performs. Examine the results, either formatted or as raw JSON data.
    Screenshot of the Content Understanding playground in Microsoft Foundry showing a document and Layout analyzer results.

---

## Related content

- [Content Understanding Studio and Microsoft Foundry](../foundry-vs-content-understanding-studio.md)
- [How to build a custom analyzer in Content Understanding Studio](../how-to/customize-analyzer-content-understanding-studio.md)
- [How to classify and route with custom categories in Content Understanding Studio](../how-to/classification-content-understanding-studio.md)
- [Connect your Content Understanding analyzer to Foundry model deployments](../concepts/models-deployments.md)
