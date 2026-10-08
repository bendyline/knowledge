---
title: What is entity linking in Azure Language in Foundry Tools?
titleSuffix: Foundry Tools
description: An overview of entity linking in Foundry Tools, which helps you extract entities from text, and provides links to an online knowledge base.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: overview
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-entity-linking
---
<!-- markdownlint-disable MD025 -->

# What is entity linking in Azure Language in Foundry Tools?

> **Important:**
> Entity Linking retires from Azure Language on **September 1, 2028**. To avoid production disruption, migrate existing workloads and direct all new projects to Azure Language [**Named Entity Recognition**](../named-entity-recognition/overview.md) or [Microsoft Foundry](../../../foundry/concepts/foundry-models-overview.md). These options provide enhanced natural language understanding capabilities and integrate directly into your applications. For guidance, see [**Transitioning from Azure Language features to Foundry models**](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/transitioning-from-azure-language-features-to-foundry-models/4524092).

Entity linking is one of the features offered by [Language](../overview.md), a collection of machine learning and AI algorithms in the cloud for developing intelligent applications that involve written language. Entity linking identifies and disambiguates the identity of entities found in text. For example, in the sentence "*We went to Seattle last week.*", the word "*Seattle*" would be identified, with a link to more information on Wikipedia.

This documentation contains the following types of articles:

* [**Quickstarts**](quickstart.md) are getting-started instructions to guide you through making requests to the service.
* [**How-to guides**](how-to/call-api.md) contain instructions for using the service in more specific ways.

## Get started with entity linking


<!-- markdownlint-disable MD041 -->

To use entity linking, you submit raw unstructured text for analysis and handle the API output in your application. Analysis is performed as-is, with no additional customization to the model used on your data. There are two ways to use entity linking:

| Development option | Description |
| --- | --- |
| Microsoft Foundry | Microsoft Foundry is a web-based platform that lets you try entity linking with text examples after you create a resource. For more information, see the [entity linking quickstart](quickstart.md). |
| REST API or client library (Azure SDK) | Integrate entity linking into your applications using the REST API, or the client library available in a variety of languages. For more information, see the [entity linking quickstart](quickstart.md). |


## Reference documentation and code samples

As you use this feature in your applications, see the following reference documentation and samples for Azure Language in Foundry Tools:

| Development option / language | Reference documentation | Samples |
| --- | --- | --- |
| REST API | [REST API documentation](https://learn.microsoft.com/rest/api/language/) |  |
| C# | [C# documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet-preview\&preserve-view=true) | [C# samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics/samples) |
| Java | [Java documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-preview\&preserve-view=true) | [Java Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples) |
| JavaScript | [JavaScript documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme) | [JavaScript samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples/v1) |
| Python | [Python documentation](https://learn.microsoft.com/python/api/overview/azure/ai-textanalytics-readme?view=azure-python-preview\&preserve-view=true) | [Python samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) |


## Responsible AI

An AI system includes not only the technology, but also the people who will use it, the people who will be affected by it, and the environment in which it is deployed. Read the [transparency note for entity linking](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note) to learn about responsible AI use and deployment in your systems.

* [Transparency note for Azure Language in Foundry Tools](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note)
* [Integration and responsible use](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/guidance-integration-responsible-use)
* [Data, privacy, and security](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/data-privacy)


## Next steps

There are two ways to get started using the entity linking feature:

* [Microsoft Foundry](https://ai.azure.com/), which is a web-based platform that enables you to try several Language features without needing to write code.
* The [quickstart article](quickstart.md) for instructions on making requests to the service using the REST API and client library SDK.
