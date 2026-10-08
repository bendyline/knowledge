---
title: "Deploy Fine-Tuned Models with Managed Compute in Microsoft Foundry (classic)"
description: "Deploy fine-tuned models using managed compute in Microsoft Foundry portal. Step-by-step guide to fine-tune, train, and deploy custom models with GPU compute resources. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: how-to
ms.date: 03/31/2026
ms.reviewer: vkann
reviewer: kvijaykannan
ms.author: ssalgado
manager: mcleans
author: ssalgadodev
ms.custom: 
  - references_regions
  - hub-only
ai-usage: ai-assisted
#customer intent: As a data scientist using a managed compute, I want to learn how to fine-tune models to improve model performance for specific tasks. 
---

# Fine-tune models using managed compute (preview) (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Learn how to fine-tune and deploy models using managed compute in Microsoft Foundry. Adjust training parameters (learning rate, batch size, epochs) to optimize performance.

Fine-tuning a pretrained model for a related task is more efficient than training a new model from scratch.

Use the fine-tune settings in the portal to configure data, compute, and hyperparameters. After training completes you can evaluate and deploy the resulting model.

In this article, you learn how to:

- Select a foundation model.
- Configure compute and data splits.
- Tune hyperparameters safely.
- Submit and monitor a fine-tune job.
- Evaluate and deploy the fine-tuned model.

## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](hub-create-projects.md).


- Azure role-based access controls (Azure RBAC) are used to grant access to operations in Foundry portal. To perform the steps in this article, your user account must be assigned the __owner__ or __contributor__ role for the Azure subscription. For more information on permissions, see [Role-based access control in Foundry portal](../concepts/rbac-foundry.md).

## Fine-tune a foundation model using managed compute


> **Tip:**
> Because you can [customize the left pane](../what-is-foundry.md#customize-the-left-pane) in the Microsoft Foundry portal, you might see different items than shown in these steps. If you don't see what you're looking for, select **... More** at the bottom of the left pane.

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.




1. If you're not already in your project, select it. 
1. Select **Fine-tuning** from the left pane.

    1. Select **Fine-tune a model** and add the model that you want to fine-tune. This article uses _Phi-3-mini-4k-instruct_ for illustration.
    1. Select **Next** to see the available fine-tune options. Some foundation models support only the __Managed compute__ option.

1. Alternatively, you could select **Model catalog** from the left sidebar of your project and find the model card of the foundation model that you want to fine-tune.

    1. Select __Fine-tune__ on the model card to see the available fine-tune options. Some foundation models support only the __Managed compute__ option.

    Screenshot showing fine-tuning options for a foundation model in Foundry.

1. Select **Managed compute**. This opens **Basic settings**.

### Configure fine-tune settings

In this section, you go through the steps to configure fine-tuning for your model, using a managed compute.

1. Provide a model name (for example, `phi3mini-faq-v1`). Select **Next** for **Compute**.

1. Select a GPU VM size. Ensure quota for the chosen SKU.

    Screenshot showing settings for the compute to use for fine-tuning.

1. Select **Next** for **Training data**. Task type may be preset (for example, **Chat completion**). 

1. Provide training data (upload JSONL/CSV/TSV or select a registered dataset). Balance examples to reduce bias.

1. Select **Next** for **Validation data**. Keep **Automatic split** or supply a separate dataset.

1. Select **Next** for **Task parameters**. Adjust epochs, learning rate, batch size. Start conservative; iterate based on validation metrics.

1. Select **Next** for **Review**. Confirm counts and parameters.

1. Select **Submit** to start the job.

### Monitor and evaluate

- Track job status in the fine-tuning jobs list.
- Review logs for preprocessing or allocation issues.
- After completion, view generated evaluation metrics (if enabled) or run a separate evaluation comparing base vs fine-tuned model.

### Deploy the fine-tuned model

Deploy from the job summary. Use a deployment name like `faq-v1`. Record model version and dataset hash for reproducibility. Add tracing to monitor real requests.

### Troubleshooting

| Issue | Cause | Action |
| --- | --- | --- |
| Stuck in Queued | Insufficient GPU capacity | Try alternate SKU or region |
| Overfitting quickly | Too many epochs / small dataset | Reduce epochs or expand data |
| No metric improvement | Dataset noise / misaligned objective | Refine labeling or metric selection |
| Higher latency post deploy | Larger base model / adapter overhead | Consider smaller base model or tune batch size |

## Related content

- [Fine-tune models overview](../concepts/fine-tuning-overview.md)
- [Generate chat completions](../openai/api-version-lifecycle.md)
- [Featured models](../concepts/models-inference-examples.md)
