---
title: What are tools in Azure Machine Learning prompt flow
titleSuffix: Azure Machine Learning
description: Learn about how tools are the fundamental building blocks of a flow in Azure Machine Learning prompt flow.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: prompt-flow
ms.custom:
  - ignite-2023
ms.topic: concept-article
author: lgayhardt
ms.author: lagayhar
ms.reviewer: sooryar
ms.date: 11/24/2025
ms.update-cycle: 365-days
---

# Tools in prompt flow?


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
> Prompt flow [migration guide](migrate-prompt-flow-to-agent-framework.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).


Tools are the fundamental building blocks of a flow in Azure Machine Learning prompt flow.

Each tool is a simple, executable unit with a specific function, allowing users to perform various tasks.
By combining different tools, users can create a flow that accomplishes a wide range of goals.

One of the key benefit of prompt flow tools is their seamless integration with third-party APIs and python open source packages.
This not only improves the functionality of large language models but also makes the development process more efficient for developers.

## Types of tools

Prompt flow provides different kinds of tools:
- LLM tool: The LLM tool allows you to write custom prompts and leverage large language models to achieve specific goals, such as summarizing articles, generating customer support responses, and more.
- Python tool: The Python tool enables you to write custom Python functions to perform various tasks, such as fetching web pages, processing intermediate data, calling third-party APIs, and more.
- Prompt tool: The prompt tool allows you to prepare a prompt as a string for more complex use cases or for use in conjunction with other prompt tools or python tools.

## Next steps

For more information on the tools and their usage, visit the following resources:

- [Prompt tool](tools-reference/prompt-tool.md)
- [LLM tool](tools-reference/llm-tool.md)
- [Python tool](tools-reference/python-tool.md)
