---
title: Get started with RAG using a prompt flow sample (preview)
titleSuffix: Azure Machine Learning
description: Set up a prompt flow using the samples gallery.
services: machine-learning
ms.author: scottpolly
author: s-polly
ms.reviewer: balapv
ms.service: azure-machine-learning
ms.subservice: core
ms.date: 08/31/2026
ms.topic: how-to
ms.custom: prompt
ms.collection: ce-skilling-ai-copilot 
ai-usage: ai-assisted
---

# Get started with RAG using a prompt flow sample


> **Warning:**
> Prompt flow in Microsoft Foundry and Azure Machine Learning will be retired on April 20, 2027. Prompt flow is no longer 
> recommended for new development. Migrate existing Prompt flow applications and deployments to Microsoft Agent Framework before 
> April 20, 2027.
>  
> Prompt flow container images are no longer receiving updates, including security and package updates. This applies to Prompt 
> flow runtime images, including `promptflow-runtime`, `promptflow-runtime-stable`, and `promptflow-python`.
>  
> After April 20, 2027, Prompt flow, including the web authoring experience in Microsoft Foundry and Azure Machine Learning, the 
> VS Code extensions, and related Prompt flow container images, will no longer be supported or available.
> 
> If your application depends on Prompt flow deployments or runtime images, plan to move those workloads to supported 
> alternatives such as [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) before the retirement date. For migration guidance, see the
> Prompt flow [migration guide](prompt-flow/migrate-prompt-flow-to-agent-framework.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).


In this article, you learn how to use retrieval-augmented generation (RAG) by creating a prompt flow. [Prompt flow](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/harness-the-power-of-large-language-models-with-azure-machine-learning-prompt-fl/3828459) is the interactive editor in Azure Machine Learning for prompt engineering. To get started, create a prompt flow sample that uses RAG from the samples gallery, and use it to learn how Vector Index works in a prompt flow.


> **Important:**
> This feature is currently in public preview. This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).



## Prerequisites

* An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* An Azure Machine Learning workspace. If you don't have one, [create a workspace](quickstart-create-resources.md) before you begin.

* Access to Azure OpenAI in Microsoft Foundry Models.

* Prompt flow enabled in your Azure Machine Learning workspace.

> **Note:**
> To enable prompt flow, turn on **Build AI solutions with Prompt flow** in the **Manage preview features** pane of your Azure Machine Learning workspace.


## Create a prompt flow using the samples gallery

1. Select **Prompt flow** on the left menu.

2. Select **Create**.

3. In the **Explore gallery** menu, select **View Detail** on the _Q&A on Your Data_ sample.

Screenshot showing view details button on the prompt flow sample.

4. Read the instructions and select **Clone** to create a prompt flow in your workspace.

Screenshot showing instructions and clone button on the prompt flow sample.

5. The cloned prompt flow opens, which you can run in your workspace and explore.

Screenshot showing the prompt flow sample.


## Related content

[Use Azure Machine Learning pipelines with no code to construct RAG pipelines (preview)](how-to-use-pipelines-prompt-flow.md)

[How to create vector index in Azure Machine Learning prompt flow (preview)](how-to-create-vector-index.md)

[Use Vector Stores with Azure Machine Learning (preview)](concept-vector-stores.md)
