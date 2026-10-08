---
title: What is language detection in Azure Language?
titleSuffix: Foundry Tools
description: An overview of language detection in Azure Language, which helps you detect the language that text is written in by returning language codes.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: overview
ms.date: 03/30/2026
ms.author: lajanuar
ms.custom: language-service-language-detection
---
<!-- markdownlint-disable MD025 -->
# What is language detection in Azure Language?

Language detection is an Azure Language prebuilt [core capability](../overview.md#core-capabilities). Language detection can identify more than 100 languages in their primary script. In addition, the service offers [script detection](how-to/call-api.md#script-name-and-script-code) for each detected language using [ISO 15924 standard](https://wikipedia.org/wiki/ISO_15924) for a [select number of languages](language-support.md#script-detection).
This documentation contains the following types of articles:

* [**Quickstarts**](quickstart.md) are getting-started instructions to guide you through making requests to the service.
* [**How-to guides**](how-to/call-api.md) contain instructions for using the service in more specific or customized ways.

## Language detection features

* Language detection: For each document, returns the main language, its ISO 639-1 code, readable name, confidence score, script name, and ISO 15924 script code.

* Script detection: To distinguish between multiple scripts used to write certain languages, such as Kazakh, language detection returns a script name and script code according to the ISO 15924 standard.

* Ambiguous content handling: To help disambiguate language based on the input, you can specify an ISO 3166-1 alpha-2 country/region code. For example, the word "communication" is common to both English and French. Specifying the origin of the text as France can help the language detection model determine the correct language.

## Typical workflow

To use this feature, you submit data for analysis and handle the API output in your application. Analysis is performed as-is, with no added customization to the model used on your data.

1. Create an Azure Language in Foundry Tools resource, which grants you access to the features offered by Language. It generates a password (called a key) and an endpoint URL that you use to authenticate API requests.

2. Create a request using either the REST API or the client library for C#, Java, JavaScript, and Python. You can also send asynchronous calls with a batch request to combine API requests for multiple features into a single call.

3. Send the request containing your text data. Your key and endpoint are used for authentication.

4. Stream or store the response locally.


## Get started with language detection

To use language detection, you submit raw unstructured text for analysis and handle the API output in your application. Analysis is performed as-is, with no additional customization to the model used on your data. There are three ways to use language detection:


| Development option | Description |
| --- | --- |
| [**Microsoft Foundry (new)**](https://ai.azure.com/) portal | Foundry (new) is a cloud-based AI platform that provides streamlined access to Foundry models, agents, and tools through Foundry projects. |
| [**Foundry (classic)**](https://ai.azure.com/) portal | Foundry (classic) is a cloud-based platform that supports hub-based projects and other resource types. When you sign up, you can use your own data to detect more than 100 languages in their primary script. |
| [**REST API or Client library (Azure SDK)**](https://learn.microsoft.com/rest/api/language/analyze-text/analyze-text/analyze-text) | Integrate language detection into your applications using the REST API, or the client library available in various languages. |
| **Docker container** | Use the available Docker container to [deploy this feature on-premises](how-to/use-containers.md). Docker containers enable you to bring the service closer to your data for compliance, security, or other operational considerations. |


## Responsible AI

An AI system includes not only the technology, but also individuals who operate the system, people who experience its effects, and the broader environment where the system functions. Read the [transparency note for language detection](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note-language-detection) to learn about responsible AI use and deployment in your systems.

* [Transparency note for Azure Language in Foundry Tools](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note)
* [Integration and responsible use](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/guidance-integration-responsible-use)
* [Data, privacy, and security](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/data-privacy)


## Next steps

There are two ways to get started using the language detection feature:

* [Microsoft Foundry](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md) is a web-based platform that lets you use several Language features without needing to write code.
* The [quickstart article](quickstart.md) for instructions on making requests to the service using the REST API and client library SDK.
