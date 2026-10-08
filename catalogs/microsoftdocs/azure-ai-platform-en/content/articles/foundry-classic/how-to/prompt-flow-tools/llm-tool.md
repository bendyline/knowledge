---
title: "LLM tool for flows in Microsoft Foundry portal (classic)"
description: "This article introduces you to the large language model (LLM) tool for flows in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.custom:
  - ignite-2023
  - build-2024
  - hub-only
ms.topic: article
ms.date: 01/27/2026
ms.reviewer: none
ms.author: lagayhar
author: lgayhardt
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# LLM tool for flows in Microsoft Foundry portal (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




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
> alternatives such as [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) before the retirement date. For migration guidance, see the Prompt flow [migration guide](../prompt-flow-migration-overview.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).




To use large language models (LLMs) for natural language processing, use the prompt flow LLM tool.

> **Tip:**
> For embeddings to convert text into dense vector representations for various natural language processing tasks, see [Embedding tool](embedding-tool.md).

## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


Prepare a prompt as described in the [Prompt tool](prompt-tool.md#prerequisites) documentation. The LLM tool and Prompt tool both support [Jinja](https://jinja.palletsprojects.com/en/stable/) templates. For more information and best practices, see [Prompt engineering techniques](../../openai/concepts/advanced-prompt-engineering.md).

## Build with the LLM tool

1. Create or open a flow in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). For more information, see [Create a flow](../flow-develop.md).
1. Select **+ LLM** to add the LLM tool to your flow.

    Screenshot that shows the LLM tool added to a flow in Foundry portal.

1. Select the connection to one of your provisioned resources. For example, select **Default_AzureOpenAI**.
1. From the **Api** dropdown list, select **chat** or **completion**.
1. Enter values for the LLM tool input parameters described in the [Text completion inputs table](#inputs). If you selected the **chat** API, see the [Chat inputs table](#chat-inputs). If you selected the **completion** API, see the [Text completion inputs table](#text-completion-inputs). For information about how to prepare the prompt input, see [Prerequisites](#prerequisites).
1. Add more tools to your flow, as needed. Or select **Run** to run the flow.
1. The outputs are described in the [Outputs table](#outputs).

## Inputs

The following input parameters are available.

### Text completion inputs

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| prompt | string | Text prompt for the language model. | Yes |
| model, deployment_name | string | The language model to use. | Yes |
| max\_tokens | integer | The maximum number of tokens to generate in the completion. Default is 16. | No |
| temperature | float | The randomness of the generated text. Default is 1. | No |
| stop | list | The stopping sequence for the generated text. Default is null. | No |
| suffix | string | The text appended to the end of the completion. | No |
| top_p | float | The probability of using the top choice from the generated tokens. Default is 1. | No |
| logprobs | integer | The number of log probabilities to generate. Default is null. | No |
| echo | boolean | The value that indicates whether to echo back the prompt in the response. Default is false. | No |
| presence\_penalty | float | The value that controls the model's behavior regarding repeating phrases. Default is 0. | No |
| frequency\_penalty | float | The value that controls the model's behavior regarding generating rare phrases. Default is 0. | No |
| best\_of | integer | The number of best completions to generate. Default is 1. | No |
| logit\_bias | dictionary | The logit bias for the language model. Default is empty dictionary. | No |

### Chat inputs

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| prompt | string | The text prompt that the language model should reply to. | Yes |
| model, deployment_name | string | The language model to use. | Yes |
| max\_tokens | integer | The maximum number of tokens to generate in the response. Default is inf. | No |
| temperature | float | The randomness of the generated text. Default is 1. | No |
| stop | list | The stopping sequence for the generated text. Default is null. | No |
| top_p | float | The probability of using the top choice from the generated tokens. Default is 1. | No |
| presence\_penalty | float | The value that controls the model's behavior regarding repeating phrases. Default is 0. | No |
| frequency\_penalty | float | The value that controls the model's behavior regarding generating rare phrases. Default is 0. | No |
| logit\_bias | dictionary | The logit bias for the language model. Default is empty dictionary. | No |

## Outputs

The output varies depending on the API you selected for inputs.

| API | Return type | Description |
| --- | --- | --- |
| Completion | string | The text of one predicted completion. |
| Chat | string | The text of one response of conversation. |

## Next steps

- [Learn more about how to create a flow](../flow-develop.md)
