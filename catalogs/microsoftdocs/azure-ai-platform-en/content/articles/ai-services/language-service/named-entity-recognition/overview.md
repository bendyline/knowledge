---
title: What is the named entity recognition (NER) feature in Azure Language?
titleSuffix: Foundry Tools
description: An overview of the named entity recognition feature in Azure Language, which helps you extract categories of entities in text.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: overview
ms.date: 03/30/2026
ms.author: lajanuar
ms.custom: language-service-ner
---
<!-- markdownlint-disable MD025 -->
# What is named entity recognition (NER) in Azure Language?

Named entity recognition (NER) is an Azure Language prebuilt [core capability](../overview.md#core-capabilities). The NER feature can identify and categorize entities in unstructured text such as people, places, organizations, and quantities. The prebuilt NER feature has a preset list of [recognized entities](concepts/named-entity-categories.md). The custom NER feature allows you to train the model to recognize specialized entities specific to your use case.

* [**Quickstarts**](quickstart.md) are getting-started instructions to guide you through making requests to the service.
* [**How-to guides**](how-to-call.md) contain instructions for using the service in more specific or customized ways.
* The [**conceptual articles**](concepts/named-entity-categories.md) provide in-depth explanations of the service's functionality and features.

## Typical workflow

To use this feature, you submit data for analysis and handle the API output in your application. Analysis is performed as-is, with no added customization to the model used on your data.

1. Create an Azure Language in Foundry Tools resource, which grants you access to the features offered by Language. It generates a password (called a key) and an endpoint URL that you use to authenticate API requests.

2. Create a request using either the REST API or the client library for C#, Java, JavaScript, and Python. You can also send asynchronous calls with a batch request to combine API requests for multiple features into a single call.

3. Send the request containing your text data. Your key and endpoint are used for authentication.

4. Stream or store the response locally.


## Get started with named entity recognition

To use named entity recognition, you submit raw unstructured text for analysis and handle the API output in your application. Analysis is performed as-is, with no additional customization to the model used on your data. There are two ways to use named entity recognition:


| Development option | Description |
| --- | --- |
| Microsoft Foundry | Foundry is a web-based platform that lets you use named entity recognition with text examples with your own data when you sign up. For more information, see the [Foundry website](https://ai.azure.com/?cid=learnDocs) or [Foundry documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md). |
| REST API or Client library (Azure SDK) | Integrate named entity recognition into your applications using the REST API, or the client library available in a variety of languages. For more information, see the [named entity recognition quickstart](quickstart.md). |


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

An AI system consists of more than just its core technology. It also includes the people who operate it, the people its use affects, and the broader deployment context.
All these interconnected elements shape the effectiveness and outcomes of AI. Read the [transparency note for NER](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note-named-entity-recognition) to learn about responsible AI use and deployment in your systems. For more information, *see* the following articles:

* [Transparency note for Azure Language in Foundry Tools](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note)
* [Integration and responsible use](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/guidance-integration-responsible-use)
* [Data, privacy, and security](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/data-privacy)


## Scenarios

* **Enhance search capabilities and search indexing**. Customers can build knowledge graphs based on entities detected in documents to enhance document search as tags.
* **Automate business processes** - Insurance claims, recognized entities like name and location can be highlighted to facilitate review. Support tickets can be automatically generated with customer name and company from an email.
* **In-depth customer analysis**. Determine the most popular information conveyed by customers in reviews, emails, and calls to determine relevant topics and trends over time.

## Next steps

There are two ways to get started using the Named Entity Recognition (NER) feature:
* [Microsoft Foundry](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md) is a web-based platform that lets you use several Language features without needing to write code.
* The [quickstart article](quickstart.md) for instructions on making requests to the service using the REST API and client library SDK.
