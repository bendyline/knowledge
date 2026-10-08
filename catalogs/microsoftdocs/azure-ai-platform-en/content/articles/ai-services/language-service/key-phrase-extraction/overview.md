---
title: What is key phrase extraction in Azure Language in Foundry Tools?
titleSuffix: Foundry Tools
description: An overview of key phrase extraction in Foundry Tools, which helps you identify main concepts in unstructured text
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: overview
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-key-phrase
---
<!-- markdownlint-disable MD025 -->
# What is key phrase extraction in Azure Language in Foundry Tools?

> **Important:**
> Key phrase extraction retires from Azure Language on **March 31, 2029**. To avoid production disruption, migrate existing workloads and direct all new projects to [Microsoft Foundry](../../../foundry/concepts/foundry-models-overview.md), which offers enhanced capabilities for natural language understanding and can be easily integrated into your applications. For guidance, see [**Transitioning from Azure Language features to Foundry models**](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/transitioning-from-azure-language-features-to-foundry-models/4524092).

Key phrase extraction is one of the features offered by [Azure Language in Foundry Tools](../overview.md). This capability is part of a suite of cloud-based machine learning and AI tools designed for building intelligent applications that process written language. Use key phrase extraction to quickly identify the main concepts in text. For example, in the text "*The food was delicious and the staff were wonderful.*", key phrase extraction returns the main topics: "*food*" and "*wonderful staff*."

This documentation contains the following types of articles:

* [**Quickstarts**](quickstart.md) are getting-started instructions to guide you through making requests to the service.
* [**How-to guides**](how-to/call-api.md) contain instructions for using the service in more specific or customized ways.

## Typical workflow

To use this feature, you submit data for analysis and handle the API output in your application. Analysis is performed as-is, with no added customization to the model used on your data.

1. Create an Azure Language in Foundry Tools resource, which grants you access to the features offered by Language. It generates a password (called a key) and an endpoint URL that you use to authenticate API requests.

2. Create a request using either the REST API or the client library for C#, Java, JavaScript, and Python. You can also send asynchronous calls with a batch request to combine API requests for multiple features into a single call.

3. Send the request containing your text data. Your key and endpoint are used for authentication.

4. Stream or store the response locally.



## Get started with Key phrase extraction

To use key phrase extraction, you submit raw unstructured text for analysis and handle the API output in your application. Analysis is performed as-is, with no additional customization to the model used on your data. There are two ways to use key phrase extraction:


| Development option | Description |
| --- | --- |
| Microsoft Foundry | Foundry is a web-based platform that lets you use entity linking with text examples with your own data when you sign up. For more information, see the [Foundry website](https://ai.azure.com/?cid=learnDocs) or [Foundry documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md). |
| REST API or Client library (Azure SDK) | Integrate key phrase extraction into your applications using the REST API, or the client library available in a variety of languages. For more information, see the [key phrase extraction quickstart](quickstart.md). |
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
 

## Responsible AI 

An AI system includes the technology, the individuals who operate the system, the people who experience its effects, and the broader environment where the system functions all play a role. Read the [transparency note for key phrase extraction](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note-key-phrase-extraction) to learn about responsible AI use and deployment in your systems. For more information, see the following articles:

* [Transparency note for Azure Language in Foundry Tools](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note)
* [Integration and responsible use](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/guidance-integration-responsible-use)
* [Data, privacy, and security](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/data-privacy)


## Next steps

There are two ways to get started using the entity linking feature:
* [Microsoft Foundry](../../../foundry/what-is-foundry.md) is a web-based platform that lets you use several Language features without needing to write code.
* The [quickstart article](quickstart.md) for instructions on making requests to the service using the REST API and client library SDK.
