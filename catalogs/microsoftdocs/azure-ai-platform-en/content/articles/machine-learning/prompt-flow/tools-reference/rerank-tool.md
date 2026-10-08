---
title: Rerank tool  in Azure Machine Learning prompt flow
titleSuffix: Azure Machine Learning
description: The prompt flow rerank tool enables you to rerank documents based on the relevancy to a given query. 
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: prompt-flow
ms.topic: reference
ms.date: 08/29/2024
ms.reviewer: sooryar
ms.author: lagayhar
author: lgayhardt
ms.update-cycle: 365-days
---

# Rerank tool (preview)


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
> Prompt flow [migration guide](../migrate-prompt-flow-to-agent-framework.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).


The prompt flow Rerank tool improves search quality of relevant documents given a query for retrieval-augment generation (RAG) in prompt flow. This tool works best with [Index Look up tool](index-lookup-tool.md) as a ranker after the initial retrieval.

> **Important:**
> Rerank tool is currently in public preview. This preview is provided without a service-level agreement, and is not recommended for production workloads. Certain features might not be supported or might have constrained capabilities.
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

## Use the Rerank tool

1. Create or open a flow in Microsoft Foundry portal. For more information, see [Create a flow](../how-to-develop-flow.md#create-and-develop-your-prompt-flow).
1. Select **+More tools** > **Rerank tool** to add the Rerank tool to your flow.

     Screenshot that shows the rerank tool added to a flow in Azure Machine Learning

1. Enter values for the Rerank tool input parameters.
1. Add more tools to your flow as needed, or select **Run** to run the flow.
1. To learn more about the returned output, see [outputs](#outputs).

## Inputs

The following are available input parameters:

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
| `Metadata` | Metadata like file path and url. |
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
