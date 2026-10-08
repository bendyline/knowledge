---
title: "Overview of prompt flow tools in Microsoft Foundry portal (classic)"
description: "Learn about prompt flow tools that are available in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.custom:
  - build-2024
  - hub-only
ms.topic: article
ms.date: 01/27/2026
ms.reviewer: none
ms.author: lagayhar
author: lgayhardt
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# Overview of prompt flow tools in Microsoft Foundry portal (classic)


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




The following table provides an index of tools in prompt flow.

| Tool name | Description | Package name |
| --- | --- | --- |
| [LLM](llm-tool.md) | Use large language models (LLM) with Azure OpenAI in Microsoft Foundry Models for tasks such as text completion or chat. | [promptflow-tools](https://pypi.org/project/promptflow-tools/) |
| [Prompt](prompt-tool.md) | Craft a prompt by using Jinja as the templating language. | [promptflow-tools](https://pypi.org/project/promptflow-tools/) |
| [Python](python-tool.md) | Run Python code. | [promptflow-tools](https://pypi.org/project/promptflow-tools/) |
| [Azure OpenAI GPT-4 Turbo with Vision](azure-open-ai-gpt-4v-tool.md) | Use an Azure OpenAI GPT-4 Turbo with Vision model deployment to analyze images and provide textual responses to questions about them. | [promptflow-tools](https://pypi.org/project/promptflow-tools/) |
| [Content Safety (Text)](content-safety-tool.md) | Use Azure AI Content Safety to detect harmful content. | [promptflow-tools](https://pypi.org/project/promptflow-tools/) |
| [Embedding](embedding-tool.md) | Use Azure OpenAI embedding models to create an embedding vector that represents the input text. | [promptflow-tools](https://pypi.org/project/promptflow-tools/) |
| [Serp API](serp-api-tool.md) | Use Serp API to obtain search results from a specific search engine. | [promptflow-tools](https://pypi.org/project/promptflow-tools/) |
| [Index Lookup](index-lookup-tool.md)<sup>1</sup> | Search a vector-based query for relevant results using one or more text queries. | [promptflow-vectordb](https://pypi.org/project/promptflow-vectordb/) |
| [Rerank](rerank-tool.md) | Rerank documents based on the relevancy to a given query. | [promptflow-vectordb](https://pypi.org/project/promptflow-vectordb/) |

<sup>1</sup> The Index Lookup tool replaces the three deprecated legacy index tools: Vector Index Lookup, Vector DB Lookup, and Faiss Index Lookup.

> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


## Custom tools

To discover more custom tools developed by the open-source community, such as [Azure Language in Foundry Tools tools](https://pypi.org/project/promptflow-azure-ai-language/), see [More custom tools](https://microsoft.github.io/promptflow/integrations/tools/index.html).

- If existing tools don't meet your requirements, you can [develop your own custom tool and make a tool package](https://microsoft.github.io/promptflow/how-to-guides/develop-a-tool/create-and-use-tool-package.html).
- To install the custom tools, if you're using the automatic compute session, you can readily install the publicly released package by adding the custom tool package name in the `requirements.txt` file in the flow folder. Then select **Save and install** to start installation. After completion, the custom tools appear in the tool list. If you want to use a local or private feed package, build an image first, and then set up the compute session based on your image. To learn more, see [How to create and manage a compute session](../create-manage-compute-session.md).

   Screenshot that shows how to install packages on automatic compute session.

## Next steps

- [Create a flow](../flow-develop.md)
- [Get started building a chat app using the prompt flow SDK](../../quickstarts/get-started-code.md)
