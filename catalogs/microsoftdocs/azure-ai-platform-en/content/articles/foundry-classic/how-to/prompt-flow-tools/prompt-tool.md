---
title: "Prompt tool for flows in Microsoft Foundry portal (classic)"
description: "This article introduces you to the Prompt tool for flows in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.custom:
  - ignite-2023
  - build-2024
  - hub-only
ms.topic: concept-article
ms.date: 01/27/2026
ms.reviewer: none
ms.author: lagayhar
author: lgayhardt
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# Prompt tool for flows in Microsoft Foundry portal (classic)


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




The prompt flow Prompt tool offers a collection of textual templates that serve as a starting point for creating prompts. These templates, based on the [Jinja](https://jinja.palletsprojects.com/en/stable/) template engine, facilitate the definition of prompts. The tool proves useful when prompt tuning is required before the prompts are fed into the large language model (LLM) in the prompt flow.

## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


Prepare a prompt. Both the [LLM tool](llm-tool.md) and Prompt tool support [Jinja](https://jinja.palletsprojects.com/en/stable/) templates.

In this example, the prompt incorporates Jinja templating syntax to dynamically generate the welcome message and personalize it based on the user's name. It also presents a menu of options for the user to choose from. Depending on whether the `user_name` variable is provided, it either addresses the user by name or uses a generic greeting.
    
```jinja
Welcome to {{ website_name }}!
{% if user_name %}
    Hello, {{ user_name }}!
{% else %}
    Hello there!
{% endif %}
Please select an option from the menu below:
1. View your account
2. Update personal information
3. Browse available products
4. Contact customer support
```

For more information and best practices, see [Prompt engineering techniques](../../openai/concepts/advanced-prompt-engineering.md).

## Build with the Prompt tool

1. Create or open a flow in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). For more information, see [Create a flow](../flow-develop.md).
1. Select **+ Prompt** to add the Prompt tool to your flow.

    Screenshot that shows the Prompt tool added to a flow in Foundry portal.

1. Enter values for the Prompt tool input parameters described in the [Inputs table](#inputs). For information about how to prepare the prompt input, see [Prerequisites](#prerequisites).
1. Add more tools (such as the [LLM tool](llm-tool.md)) to your flow, as needed. Or select **Run** to run the flow.
1. The outputs are described in the [Outputs table](#outputs).

## Inputs

The following input parameters are available.

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| prompt | string | The prompt template in Jinja. | Yes |
| Inputs | - | The list of variables of a prompt template and its assignments. | - |

## Outputs

### Example 1

Inputs:

| Variable | Type | Sample value |
| --- | --- | --- |
| website_name | string | "Microsoft" |
| user_name | string | "Jane" |

Outputs:

```
Welcome to Microsoft! Hello, Jane! Please select an option from the menu below: 1. View your account 2. Update personal information 3. Browse available products 4. Contact customer support
```

### Example 2

Inputs:

| Variable | Type | Sample value |
| --- | --- | --- |
| website_name | string | "Bing" |
| user_name | string | " |

Outputs:

```
Welcome to Bing! Hello there! Please select an option from the menu below: 1. View your account 2. Update personal information 3. Browse available products 4. Contact customer support
```

## Next steps

- [Learn more about how to create a flow](../flow-develop.md)
