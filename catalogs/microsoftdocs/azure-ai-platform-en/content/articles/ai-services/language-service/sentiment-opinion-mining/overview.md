---
title: What is sentiment analysis and opinion mining in Azure Language service?
titleSuffix: Foundry Tools
description: An overview of the sentiment analysis feature in Azure Language, which helps you find out what people think of a topic by mining text for clues.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: overview
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-sentiment-opinion-mining
---
<!-- markdownlint-disable MD025 -->
# What are sentiment analysis and opinion mining?

> **Important:**
> Sentiment analysis and opinion mining retire from Azure Language on **March 31, 2029**. To avoid production disruption, migrate existing workloads and direct all new projects to [Microsoft Foundry](../../../foundry/concepts/foundry-models-overview.md), which offers enhanced capabilities for natural language understanding and can be easily integrated into your applications. For guidance, see [**Transitioning from Azure Language features to Foundry models**](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/transitioning-from-azure-language-features-to-foundry-models/4524092).

Sentiment analysis and opinion mining are features offered by [Azure Language](../overview.md), a collection of machine learning and AI algorithms in the cloud for developing intelligent applications that involve written language. These features help you discover what people think about your brand or topic by analyzing text for signs of positive or negative sentiment. They can also link these sentiments to specific aspects of the text.

Both sentiment analysis and opinion mining work with various [written languages](language-support.md).

## Sentiment analysis

The sentiment analysis feature assigns sentiment labels, such as "negative," "neutral," and "positive." The service determines these labels using the highest confidence score. Sentiment is evaluated at both the sentence level and the document level. This feature also returns confidence scores between 0 and 1 for each document & sentences within it for positive, neutral, and negative sentiment.

## Opinion mining

Opinion mining is a feature of sentiment analysis, also known as aspect-based sentiment analysis in Natural Language Processing (NLP). This feature provides more granular information about the opinions related to words (such as the attributes of products or services) in text.

## Typical workflow

To use this feature, you submit data for analysis and handle the API output in your application. Analysis is performed as-is, with no added customization to the model used on your data.

1. Create an Azure Language in Foundry Tools resource, which grants you access to the features offered by Language. It generates a password (called a key) and an endpoint URL that you use to authenticate API requests.

2. Create a request using either the REST API or the client library for C#, Java, JavaScript, and Python. You can also send asynchronous calls with a batch request to combine API requests for multiple features into a single call.

3. Send the request containing your text data. Your key and endpoint are used for authentication.

4. Stream or store the response locally.


## Get started with sentiment analysis

To use sentiment analysis, you submit raw unstructured text for analysis and handle the API output in your application. Analysis is performed as-is, with no additional customization to the model used on your data. There are two ways to use sentiment analysis:


| Development option | Description |
| --- | --- |
| Microsoft Foundry | Foundry is a web-based platform that lets you use entity linking with text examples with your own data when you sign up. For more information, see the [Foundry website](https://ai.azure.com/?cid=learnDocs) or [Foundry documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md). |
| REST API or Client library (Azure SDK) | Integrate sentiment analysis into your applications using the REST API, or the client library available in a variety of languages. For more information, see the [sentiment analysis quickstart](quickstart.md). |
| Docker container | Use the available Docker container to [deploy this feature on-premises](how-to/use-containers.md). These docker containers enable you to bring the service closer to your data for compliance, security, or other operational reasons. |


## Reference documentation and code samples

As you use this feature in your applications, see the following reference documentation and samples for Azure Language in Foundry Tools:

| Development option / language | Reference documentation | Samples |
| --- | --- | --- |
| REST API | [REST API documentation](https://learn.microsoft.com/rest/api/language/) |  |
| C# | [C# documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet-preview\&preserve-view=true) | [C# samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics/samples) |
| Java | [Java documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-preview\&preserve-view=true) | [Java Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples) |
| JavaScript | [JavaScript documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme) | [JavaScript samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples/v1) |
| Python | [Python documentation](https://learn.microsoft.com/python/api/overview/azure/ai-textanalytics-readme?view=azure-python-preview\&preserve-view=true) | [Python samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) |


## Reference documentation

As you use sentiment analysis, see the following reference documentation and samples for Azure Language:

| Development option / language | Reference documentation | Samples |
| --- | --- | --- |
| REST APIs (Authoring) | [REST API documentation](https://aka.ms/ct-authoring-swagger) |  |
| REST APIs (Runtime) | [REST API documentation](https://aka.ms/ct-runtime-swagger) |  |

---

## Responsible AI

An AI system encompasses more than just the technology itself. An AI system includes the individuals who operate the system, the people who experience its effects, and the broader environment where the system functions all play a role. Read the [transparency note for sentiment analysis](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note-sentiment-analysis) to learn about responsible AI use and deployment in your systems. 

## Next steps

Get started with our quickstart articles with instructions on using the service for the first time: [Use sentiment analysis and opinion mining](quickstart.md)
