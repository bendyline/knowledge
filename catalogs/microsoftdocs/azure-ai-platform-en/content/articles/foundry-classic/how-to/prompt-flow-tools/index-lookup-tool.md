---
title: "Index Lookup tool for flows in Microsoft Foundry portal (classic)"
description: "This article introduces you to the Index Lookup tool for flows in Microsoft Foundry portal. (classic)"
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

# Index Lookup tool for Microsoft Foundry (classic)


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




The prompt flow Index Lookup tool enables the use of common vector indices (such as Azure AI Search, Faiss, and Pinecone) for retrieval augmented generation in prompt flow. The tool automatically detects the indices in the workspace and you can select the index to use in the flow.

## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


## Build with the Index Lookup tool

1. Create or open a flow in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). For more information, see [Create a flow](../flow-develop.md).
1. Select **+ More tools** > **Index Lookup** to add the Index Lookup tool to your flow.

    Screenshot that shows the Index Lookup tool added to a flow in Foundry portal.

1. Enter values for the Index Lookup tool [input parameters](#inputs). The large language model [(LLM) tool](llm-tool.md) can generate the vector input.
1. Add more tools to your flow, as needed. Or select **Run** to run the flow.
1. For more information about the returned output, see the [Outputs table](#outputs).

## Inputs

The following input parameters are available.

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| mlindex_content | string | The type of index to use. The input depends on the index type. An example of an Azure AI Search index JSON appears after the table. | Yes |
| queries | string, `Union[string, List[String]]` | The text to query. | Yes |
| query_type | string | The type of query to perform. Options include Keyword, Semantic, Hybrid, and others. | Yes |
| top_k | integer | The number of top-scored entities to return. The default value is 3. | No |

Here's an example of an Azure AI Search index input:

```json
embeddings:
  api_base: <api_base>
  api_type: azure
  api_version: 2023-07-01-preview
  batch_size: '1'
  connection:
    id: /subscriptions/<subscription>/resourceGroups/<resource_group>/providers/Microsoft.MachineLearningServices/workspaces/<workspace> /connections/<AOAI_connection>
  connection_type: workspace_connection
  deployment: <embedding_deployment>
  dimension: <embedding_model_dimension>
  kind: open_ai
  model: <embedding_model>
  schema_version: <version>
index:
  api_version: 2023-07-01-Preview
  connection:
    id: /subscriptions/<subscription>/resourceGroups/<resource_group>/providers/Microsoft.MachineLearningServices/workspaces/<workspace> /connections/<cogsearch_connection>
  connection_type: workspace_connection
  endpoint: <cogsearch_endpoint>
  engine: azure-sdk
  field_mapping:
    content: id
    embedding: content_vector_open_ai
    metadata: id
  index: <index_name>
  kind: acs
  semantic_configuration_name: azureml-default
```

## Outputs

The following JSON format response is an example returned by the tool that includes the top-k scored entities. The entity follows a generic schema of vector search results provided by the `promptflow-vectordb` SDK. For the Vector Index Search, the following fields are populated:

| Field name | Type | Description |
| --- | --- | --- |
| metadata | dict | The customized key-value pairs you provide when creating the index. |
| page_content | string | The content of the vector chunk used in the lookup. |
| score | float | Depends on the index type defined in the Vector Index. If the index type is Faiss, the score is L2 distance. If the index type is Azure AI Search, the score is cosine similarity. |

```json
[
  {
    "metadata":{
      "answers":{},
      "captions":{
        "highlights":"sample_highlight1",
        "text":"sample_text1"
      },
      "page_number":44,
      "source":{
        "filename":"sample_file1.pdf",
        "mtime":1686329994,
        "stats":{
          "chars":4385,
          "lines":41,
          "tiktokens":891
        },
        "url":"sample_url1.pdf"
      },
      "stats":{
        "chars":4385,"lines":41,"tiktokens":891
      }
    },
    "page_content":"vector chunk",
    "score":0.021349556744098663
  },

  {
    "metadata":{
      "answers":{},
      "captions":{
        "highlights":"sample_highlight2",
        "text":"sample_text2"
      },
      "page_number":44,
      "source":{
        "filename":"sample_file2.pdf",
        "mtime":1686329994,
        "stats":{
          "chars":4385,
          "lines":41,
          "tiktokens":891
        },
        "url":"sample_url2.pdf"
      },
      "stats":{
        "chars":4385,"lines":41,"tiktokens":891
      }
    },
    "page_content":"vector chunk",
    "score":0.021349556744098663
  },
    
]

```

## Related content

- [Learn more about how to create a flow](../flow-develop.md)
