---
title: Embedding tool in Azure Machine Learning prompt flow
titleSuffix: Azure Machine Learning
description: The prompt flow embedding tool uses OpenAI's embedding models to convert text into dense vector representations for various natural language processing tasks.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: prompt-flow
ms.custom:
  - ignite-2023
ms.topic: reference
author: lgayhardt
ms.author: lagayhar
ms.reviewer: sooryar
ms.date: 11/02/2023
ms.update-cycle: 365-days
---

# Embedding tool


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


OpenAI's embedding models convert text into dense vector representations for various natural language processing tasks. For more information, see the [OpenAI Embeddings API](https://platform.openai.com/docs/api-reference/embeddings).

## Prerequisites

Create OpenAI resources:

- **OpenAI**:

    - Sign up your account on the [OpenAI website](https://openai.com/).
    - Sign in and [find your personal API key](https://platform.openai.com/account/api-keys).

- **Azure OpenAI in Microsoft Foundry Models**:

    Create Azure OpenAI resources with [these instructions](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource).

## Connections

Set up connections to provide resources in the embedding tool.

| Type | Name | API key | API type | API version |
| --- | --- | --- | --- | --- |
| OpenAI | Required | Required | - | - |
| AzureOpenAI | Required | Required | Required | Required |

## Inputs

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| input | string | Input text to embed. | Yes |
| connection | string | Connection for the embedding tool used to provide resources. | Yes |
| model/deployment_name | string | Instance of the text-embedding engine to use. Fill in the model name if you use an OpenAI connection. Insert the deployment name if you use an Azure OpenAI connection. | Yes |

## Outputs

| Return type | Description |
| --- | --- |
| list | Vector representations for inputs |

Here's an example response that the embedding tool returns:

<details>
  <summary>Output</summary>
  
```
[-0.005744616035372019,
-0.007096089422702789,
-0.00563855143263936,
-0.005272455979138613,
-0.02355326898396015,
0.03955197334289551,
-0.014260607771575451,
-0.011810848489403725,
-0.023170066997408867,
-0.014739611186087132,
...]
```
</details>
