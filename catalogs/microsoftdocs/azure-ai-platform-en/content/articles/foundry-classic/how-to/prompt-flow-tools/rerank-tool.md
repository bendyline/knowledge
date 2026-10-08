---
title: "Rerank tool for flows in Microsoft Foundry portal (classic)"
description: "This article introduces you to the Rerank tool for flows in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.topic: concept-article
ms.date: 01/27/2026
ms.reviewer: jingyizhu
ms.author: lagayhar
author: lgayhardt
ms.custom: hub-only
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# Rerank tool for flows in Microsoft Foundry portal (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



The prompt flow Rerank tool improves the search quality of relevant documents given a query for retrieval-augment generation (RAG) in prompt flow. This tool works best with the [Index Look up tool](index-lookup-tool.md) as a ranker after the initial retrieval.


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




## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


## Use the Rerank tool

1. Create or open a flow in Microsoft Foundry portal. For more information, see [Create a flow](../flow-develop.md).
1. Select **+More tools** > **Rerank tool** to add the Rerank tool to your flow.

     Screenshot that shows the rerank tool added to a flow in Foundry portal.

1. Enter values for the Rerank tool input parameters.
1. Add more tools to your flow as needed, or select **Run** to run the flow.
1. For more information about the returned output, see [outputs](#outputs).

## Inputs

The following input parameters are available:

| Name | Type | Description |
| --- | --- | --- |
| `queries` | string | The question relevant to your input documents. |
| `ranker_parameters` | string | The type of ranking methods to use. |
| `result_groups` | object | The list of document chunks to rerank. |
| `top_k` | integer | The count of top-scored entities to return. Default value is 3. |

## Outputs

The following JSON format response is an example returned by the tool that includes the relevancy score returned by the type of ranking method you chose.

| Field Name | Description |
| --- | --- |
| `text` | Content of the document chunk. |
| `Metadata` | Metadata like file path and URL. |
| `additional_fields` | Metadata and rerank score. |

```json

 [ 
    { 
        "text": "sample text", 
        "metadata": 

        { 
            "filepath": "sample_file_path", 
            "metadata_json_string": "meta_json_string" 
            "title": "", 
            "url": "" 
        }, 

        "additional_fields": 

        { 
            "filepath": "sample_file_path", 
            "metadata_json_string": "meta_json_string" 
            "title": "", 
            "url": "", 
            "@promptflow_vectordb.reranker_score": 0.013795365 
        } 
    } 
  ] 

```
