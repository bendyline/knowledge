---
title: "Azure OpenAI GPT-4 Turbo with Vision tool in Microsoft Foundry portal (classic)"
description: "This article introduces you to the Azure OpenAI GPT-4 Turbo with Vision tool for flows in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.custom:
  - build-2024
  - hub-only
ms.topic: concept-article
ms.date: 01/27/2026
ms.reviewer: none
ms.author: lagayhar
author: lgayhardt
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# Azure OpenAI GPT-4 Turbo with Vision tool in Microsoft Foundry portal (classic)


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




By using the prompt flow Azure OpenAI GPT-4 Turbo with Vision tool, you can use your Azure OpenAI GPT-4 Turbo with Vision model deployment to analyze images and provide textual responses to questions about them.

## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


- An Azure subscription. [You can create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry hub](../create-azure-ai-resource.md) with a GPT-4 Turbo with Vision model deployed in [one of the regions that support GPT-4 Turbo with Vision](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/foundry-models/concepts/models-sold-directly-by-azure.md#model-summary-table-and-region-availability). When you deploy from your project's **Deployments** page, select `gpt-4` as the model name and `vision-preview` as the model version.

## Build with the Azure OpenAI GPT-4 Turbo with Vision tool

1. Create or open a flow in [Foundry](https://ai.azure.com/?cid=learnDocs). For more information, see [Create a flow](../flow-develop.md).
1. Select **+ More tools** > **Azure OpenAI GPT-4 Turbo with Vision** to add the Azure OpenAI GPT-4 Turbo with Vision tool to your flow.

    Screenshot that shows the Azure OpenAI GPT-4 Turbo with Vision tool added to a flow in Foundry portal.

1. Select the connection to your Azure OpenAI in Foundry Models. For example, you can select the **Default_AzureOpenAI** connection. For more information, see [Prerequisites](#prerequisites).
1. Enter values for the Azure OpenAI GPT-4 Turbo with Vision tool input parameters described in the [Inputs table](#inputs). For example, you can use this example prompt:

    ```jinja
    # system:
    As an AI assistant, your task involves interpreting images and responding to questions about the image.
    Remember to provide accurate answers based on the information present in the image.
    
    # user:
    Can you tell me what the image depicts?
    ![image]({{image_input}})
    ```

1. Select **Validate and parse input** to validate the tool inputs.
1. Specify an image to analyze in the `image_input` input parameter. For example, you can upload an image or enter the URL of an image to analyze. Otherwise, you can paste or drag and drop an image into the tool.
1. Add more tools to your flow, as needed. Or select **Run** to run the flow.

The outputs are described in the [Outputs table](#outputs).

Here's an example output response:

```json
{
    "system_metrics": {
        "completion_tokens": 96,
        "duration": 4.874329,
        "prompt_tokens": 1157,
        "total_tokens": 1253
    },
    "output": "The image depicts a user interface for Azure's OpenAI GPT-4 service. It is showing a configuration screen where settings related to the AI's behavior can be adjusted, such as the model (GPT-4), temperature, top_p, frequency penalty, etc. There's also an area where users can enter a prompt to generate text, and an option to include an image input for the AI to interpret, suggesting that this particular interface supports both text and image inputs."
}
```

## Inputs

The following input parameters are available.

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| connection | AzureOpenAI | The Azure OpenAI connection to use in the tool. | Yes |
| deployment\_name | string | The language model to use. | Yes |
| prompt | string | The text prompt that the language model uses to generate its response. The Jinja template for composing prompts in this tool follows a similar structure to the chat API in the large language model (LLM) tool. To represent an image input within your prompt, use the syntax `![image]({{INPUT NAME}})`. You can pass image input in the `user`, `system`, and `assistant` messages. | Yes |
| max\_tokens | integer | The maximum number of tokens to generate in the response. Default is 512. | No |
| temperature | float | The randomness of the generated text. Default is 1. | No |
| stop | list | The stopping sequence for the generated text. Default is null. | No |
| top_p | float | The probability of using the top choice from the generated tokens. Default is 1. | No |
| presence\_penalty | float | The value that controls the model's behavior regarding repeating phrases. Default is 0. | No |
| frequency\_penalty | float | The value that controls the model's behavior regarding generating rare phrases. Default is 0. | No |

## Outputs

The following output parameters are available.

| Return type | Description |
| --- | --- |
| string | The text of one response of conversation |

## Next steps

- Learn more about [how to process images in prompt flow](../flow-process-image.md).
- Learn more about [how to create a flow](../flow-develop.md).
