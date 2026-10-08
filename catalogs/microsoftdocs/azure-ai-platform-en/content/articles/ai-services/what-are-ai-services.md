---
title: What are Foundry Tools?
titleSuffix: Foundry Tools
description: Foundry Tools are cloud-based artificial intelligence (AI) services that help developers build cognitive intelligence into applications without having direct AI or data science skills or knowledge.
author: mattwojo
manager: mcleans
keywords: Foundry Tools, cognitive
ms.service: foundry-tools
ms.topic: overview
ms.date: 10/02/2025
ms.author: mattwoj
ms.custom:
  - build-2023
  - build-2023-dataai
  - ignite-2023
---

# What are Foundry Tools?


Foundry Tools help developers and organizations rapidly create intelligent, cutting-edge, market-ready, and responsible applications with out-of-the-box and prebuilt and customizable APIs and models. Example applications include natural language processing for conversations, search, monitoring, translation, speech, vision, and decision-making.

> **Tip:**
> Try Foundry Tools including Azure OpenAI, Content Safety, Speech, Vision, and more in the [Foundry portal](https://ai.azure.com/?cid=learnDocs). For more information, see [What is Foundry?](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md).

Most [Foundry Tools](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/index.yml) are available through REST APIs and client library SDKs in popular development languages. For more information, see each service's documentation.

## Available Foundry Tools

When building AI applications, use the following Foundry Tools:

| Service | Description |
| --- | --- |
| Speech icon [Speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/index.yml) | Speech to text, text to speech, translation, and speaker recognition. |
| Translator icon [Translator](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/translator/index.yml) | Use AI-powered translation technology to translate more than 100 in-use, at-risk, and endangered languages and dialects. |
| Language icon [Language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/index.yml) | Build apps with industry-leading natural language understanding capabilities. |
| Content Understanding icon [Content Understanding](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-understanding/index.yml) | Analyze and comprehend various media content types. |
| Document Intelligence icon [Document Intelligence](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/index.yml) | Turn documents into intelligent data-driven solutions. |
| Vision icon [Vision](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/index.yml) | Analyze content in images and videos. |
| Azure AI Search icon [Azure AI Search](https://learn.microsoft.com/azure/search/) | Bring AI-powered cloud search to your mobile and web apps. |
| Content Safety icon [Content Safety](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/index.yml) | An AI service that detects unwanted contents. |
| Custom Vision icon [Custom Vision](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/index.yml) | Customize image recognition for your business. |
| Immersive Reader icon [Immersive Reader](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/immersive-reader/index.yml) | Help users read and comprehend text. |

The following Foundry Tools are scheduled for retirement. These services are still available for existing applications but don't use them for new AI applications:

| Service | Description |
| --- | --- |
| Anomaly Detector icon [Anomaly Detector](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/Anomaly-Detector/index.yml) (retired) | Identify potential problems early on. |
| Content Moderator icon [Content Moderator](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/index.yml) (retired) | Detect potentially offensive or unwanted content. |
| Language Understanding icon [Language understanding](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/luis/index.yml) (retired) | Understand natural language in your apps. |
| Metrics Advisor icon [Metrics Advisor](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/metrics-advisor/index.yml) (retired) | An AI service that detects unwanted contents. |
| Personalizer icon [Personalizer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/personalizer/index.yml) (retired) | Create rich, personalized experiences for each user. |
| QnA Maker icon [QnA maker](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/qnamaker/index.yml) (retired) | Distill information into easy-to-navigate questions and answers. |

## Pricing tiers and billing

Pricing tiers (and the amount you get billed) are based on the number of transactions you send using your authentication information. Each pricing tier specifies the:
* Maximum number of allowed transactions per second (TPS).
* Service features enabled within the pricing tier.
* Cost for a predefined number of transactions. Going above this number causes an extra charge as specified in the [pricing details](https://azure.microsoft.com/pricing/details/cognitive-services/) for your service.

> **Note:**
> Many of the Foundry Tools have a free tier you can use to try the service. To use the free tier, use `F0` as the SKU for your resource.

## Development options

The tools that you can use to customize and configure models are different from tools that you use to call the Foundry Tools. Out of the box, most Foundry Tools allow you to send data and receive insights without any customization. For example:

* You can send an image to the Azure Vision in Foundry Tools service to detect words and phrases or count the number of people in the frame
* You can send an audio file to the Speech service and get transcriptions and translate the speech to text at the same time

Azure offers a wide range of tools that are designed for different types of users, many of which can be used with Foundry Tools. Designer-driven tools are the easiest to use, and are quick to set up and automate, but might have limitations when it comes to customization. Our REST APIs and client libraries provide users with more control and flexibility, but require more effort, time, and expertise to build a solution. If you use REST APIs and client libraries, there's an expectation that you're comfortable working with modern programming languages like C#, Java, Python, JavaScript, or another popular programming language.

Let's take a look at the different ways that you can work with the Foundry Tools.

### Client libraries and REST APIs

Foundry Tools client libraries and REST APIs provide direct access to your service. These tools provide programmatic access to the Foundry Tools, their baseline models, and in many cases allow you to programmatically customize your models and solutions.

* **Target user(s)**: Developers and data scientists.
* **Benefits**: Provides the greatest flexibility to call the services from any language and environment.
* **Subscription(s)**: Azure account + Foundry Tools resources.

If you want to learn more about available client libraries and REST APIs, use our [Foundry Tools overview](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/index.yml) to pick a service and get started with one of our quickstarts.

### Continuous integration and deployment

You can use Azure DevOps and GitHub Actions to manage your deployments. In the [following section](#continuous-integration-and-delivery-with-devops-and-github-actions), we have two examples of CI/CD integrations to train and deploy custom models for Speech and Azure Language Understanding (LUIS) service.

* **Target user(s)**: Developers, data scientists, and data engineers.
* **Benefits**: Allows you to continuously adjust, update, and deploy applications and models programmatically. There's significant benefit when regularly using your data to improve and update models for Speech, Vision, Language, and Decision.
* **Subscription(s)**: Azure account + Foundry Tools resource + GitHub account.

### Continuous integration and delivery with DevOps and GitHub Actions

Language Understanding and the Speech service offer continuous integration and continuous deployment solutions that are powered by Azure DevOps and GitHub Actions. These tools are used for automated training, testing, and release management of custom models.

* [CI/CD for Custom Speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-custom-speech-continuous-integration-continuous-deployment.md)
* [CI/CD for LUIS](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/luis/luis-concept-devops-automation.md)

### On-premises containers

Many of the Foundry Tools can be deployed in containers for on-premises access and use. Using these containers gives you the flexibility to bring Foundry Tools closer to your data for compliance, security, or other operational reasons. For a complete list of Azure AI containers, see [On-premises containers for Foundry Tools](cognitive-services-container-support.md?context=/azure/foundry-classic/context/context).

### Training models

Some services allow you to bring your own data, then train a model. Trained custom models allow you to extend the model using the service's data and algorithm with your own data. The output matches your needs. When you bring your own data, you might need to tag the data in a way specific to the service. For example, if you're training a model to identify flowers, you can provide a catalog of flower images along with the location of the flower in each image to train the model.

## Foundry Tools in the ecosystem

With Azure and Foundry Tools, you have access to a broad ecosystem, such as:

* Automation and integration tools like Logic Apps and Power Automate.
* Deployment options such as Azure Functions and the App Service.
* Foundry Tools Docker containers for secure access.
* Tools like Apache Spark, Azure Databricks, Azure Synapse Analytics, and Azure Kubernetes Service for big data scenarios.

## Regional availability

The APIs in Foundry Tools are hosted on a growing network of Microsoft-managed data centers. You can find the regional availability for each API in [Azure region list](https://azure.microsoft.com/regions "Azure region list").

## Language support

Foundry Tools support a wide range of cultural languages at the service level. You can find the language availability for each API in the [supported languages list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-support.md "Supported languages list").

## Security

Foundry Tools provide a layered security model, including [authentication](authentication.md "Authentication") with Microsoft Entra credentials, a valid resource key, and [Azure Virtual Networks](cognitive-services-virtual-networks.md "Azure Virtual Networks").

## Certifications and compliance

Foundry Tools awarded certifications include Cloud Security Alliance STAR Certification, FedRAMP Moderate, and HIPAA BAA.

To understand privacy and data management, go to the [Trust Center](https://servicetrust.microsoft.com/ "Trust Center").

## Help and support

Foundry Tools provide several support options to help you move forward with creating intelligent applications. Foundry Tools also have a strong community of developers that can help answer your specific questions. For a full list of support options available to you, see [Foundry Tools support and help options](cognitive-services-support-options.md).

## Related content

* Learn how to [get started with Azure](https://azure.microsoft.com/get-started/)
* [Try Foundry Tools and more in the Foundry portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md)
* [Plan and manage costs for Foundry Tools](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/plan-manage-costs.md)
