---
title: how to call the Key Phrase Extraction API
titleSuffix: Foundry Tools
description: How to extract key phrases by using the Key Phrase Extraction API.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-key-phrase
---
# How to use key phrase extraction 

The key phrase extraction feature can evaluate unstructured text, and for each document, return a list of key phrases.

This feature is useful if you need to quickly identify the main points in a collection of documents. For example, given input text "*The food was delicious and the staff was wonderful*", the service returns the main topics: "*food*" and "*wonderful staff*".

> **Tip:**
> If you want to start using this feature, you can follow the [quickstart article](../quickstart.md) to get started. You can also make requests using [Microsoft Foundry](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry//what-is-foundry.md) without needing to write code.

## Development options

To use key phrase extraction, you submit raw unstructured text for analysis and handle the API output in your application. Analysis is performed as-is, with no additional customization to the model used on your data. There are two ways to use key phrase extraction:


| Development option | Description |
| --- | --- |
| Microsoft Foundry | Foundry is a web-based platform that lets you use entity linking with text examples with your own data when you sign up. For more information, see the [Foundry website](https://ai.azure.com/?cid=learnDocs) or [Foundry documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md). |
| REST API or Client library (Azure SDK) | Integrate key phrase extraction into your applications using the REST API, or the client library available in a variety of languages. For more information, see the [key phrase extraction quickstart](../quickstart.md). |
| Docker container | Use the available Docker container to [deploy this feature on-premises](use-containers.md). These docker containers enable you to bring the service closer to your data for compliance, security, or other operational reasons. |


## Determine how to process the data (optional)

### Specify the key phrase extraction model

By default, key phrase extraction uses the latest available AI model on your text. You can also configure your API requests to use a specific [model version](../../concepts/model-lifecycle.md).

### Input languages

When you submit documents to be processed by key phrase extraction, you can specify which of [the supported languages](../language-support.md) they're written in. if you don't specify a language, key phrase extraction defaults to English. The API may return offsets in the response to support different [multilingual and emoji encodings](../../concepts/multilingual-emoji-support.md). 

## Submitting data

Key phrase extraction works best when you give it bigger amounts of text to work on. This is opposite from sentiment analysis, which performs better on smaller amounts of text. To get the best results from both operations, consider restructuring the inputs accordingly.

To send an API request, You need your Language resource endpoint and key.

> **Note:**
> You can find the key and endpoint for your Language resource on the Azure portal. They are located on the resource's **Key and endpoint** page, under **resource management**. 

Analysis is performed upon receipt of the request. Using the key phrase extraction feature synchronously is stateless. No data is stored in your account, and results are returned immediately in the response.

When [using this feature asynchronously](../../concepts/use-asynchronously.md), the API results are available for 24 hours from the time the request was ingested, and is indicated in the response. After this time period, the results are purged and are no longer available for retrieval.



## Getting key phrase extraction results

When you receive results from the API, the order of the returned key phrases is determined internally, by the model. You can stream the results to an application, or save the output to a file on the local system.

## Service and data limits

For information on the size and number of requests you can send per minute and second, see the [service limits](../../concepts/data-limits.md) article.


## Next steps

[Key Phrase Extraction overview](../overview.md)
